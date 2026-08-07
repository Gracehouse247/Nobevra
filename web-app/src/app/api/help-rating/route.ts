import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

// Use anon key — RLS policy controls public write access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(req: Request) {
    // ── Rate Limiting (5 ratings per minute per IP) ───────────────────
    const ip = getClientIp(req);
    const { allowed, resetMs } = await rateLimit(`help-rating:${ip}`, 5, 60_000);
    if (!allowed) return rateLimitResponse(resetMs);

    try {
        const body = await req.json();
        const { articleSlug, categorySlug, helpful } = body;

        if (!articleSlug || !categorySlug || typeof helpful !== 'boolean') {
            return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
        }

        if (supabase) {
            const { error } = await supabase
                .from('help_center_ratings')
                .insert([{
                    article_slug: articleSlug,
                    category_slug: categorySlug,
                    helpful: helpful
                }]);

            if (error) {
                console.error('Supabase error inserting rating:', error);
                return NextResponse.json({ error: 'Database error' }, { status: 500 });
            }
        } else {
            console.warn('Supabase not configured. Rating logged to console:', { articleSlug, categorySlug, helpful });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing help rating:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
