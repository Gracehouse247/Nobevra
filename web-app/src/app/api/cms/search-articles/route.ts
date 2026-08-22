import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

// Cap query length to prevent expensive wildcard abuse
const MAX_QUERY_LENGTH = 200;

export async function GET(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cugomxoyeyeytyedgclj.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build';
  const supabase = createClient(supabaseUrl, supabaseKey);
  // ── Rate Limiting (20 searches per minute per IP) ─────────────────
  const ip = getClientIp(req);
  const { allowed, resetMs } = await rateLimit(`search-articles:${ip}`, 20, 60_000);
  if (!allowed) return rateLimitResponse(resetMs);

  const { searchParams } = new URL(req.url);
  const rawQ = searchParams.get('q');

  if (!rawQ) {
    return NextResponse.json({ articles: [] });
  }

  // Sanitize: trim and cap length to prevent large DB scans
  const q = rawQ.trim().slice(0, MAX_QUERY_LENGTH);

  if (q.length < 2) {
    return NextResponse.json({ articles: [] });
  }

  try {
    const { data, error } = await supabase
      .from('seo_articles')
      .select('id, title, slug, excerpt')
      .eq('status', 'published')  // Enforce: only return published articles
      .ilike('title', `%${q}%`)
      .limit(10);

    if (error) {
      throw error;
    }

    return NextResponse.json({ articles: data }, {
      headers: {
        // Cache identical searches for 60s at CDN, stale-while-revalidate for 5 min
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
