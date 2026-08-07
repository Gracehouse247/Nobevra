import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

// Strictly use service role key — never fall back to anon key for this route
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    // ── Rate Limiting (30 requests per minute per IP) ─────────────────
    const ip = getClientIp(request);
    const { allowed, resetMs } = await rateLimit(`portal-invoice:${ip}`, 30, 60_000);
    if (!allowed) return rateLimitResponse(resetMs);

    try {
        const { token } = await params;

        if (!token) {
            return NextResponse.json({ error: 'Missing tracking token' }, { status: 400 });
        }

        // Fetch the invoice using the admin client with scoped field selection
        // We deliberately exclude sensitive team fields (api keys, config, etc.)
        const { data: invoice, error: invoiceError } = await supabaseAdmin
            .from('invoices')
            .select(`
                *,
                clients(id, name, email, phone, address, city, country),
                invoice_items(*),
                teams(id, name, logo_url, preferred_currency)
            `)
            .eq('tracking_token', token)
            .single();

        if (invoiceError || !invoice) {
            return NextResponse.json({ error: 'Invoice not found or invalid token' }, { status: 404 });
        }

        // Asynchronously update view tracking without blocking the response
        if (invoice.status === 'sent') {
            supabaseAdmin
                .from('invoices')
                .update({ 
                    status: 'viewed', 
                    view_count: (invoice.view_count || 0) + 1,
                    opened_at: new Date().toISOString()
                })
                .eq('id', invoice.id)
                .then(({ error }) => {
                    if (error) console.error('[API Portal] Failed to update view status:', error);
                });
        } else {
            supabaseAdmin
                .from('invoices')
                .update({ 
                    view_count: (invoice.view_count || 0) + 1,
                    opened_at: invoice.opened_at || new Date().toISOString()
                })
                .eq('id', invoice.id)
                .then(({ error }) => {
                    if (error) console.error('[API Portal] Failed to update view count:', error);
                });
        }

        return NextResponse.json({ invoice }, {
            status: 200,
            headers: {
                // Prevent CDN caching of private invoice data
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        });

    } catch (error: any) {
        console.error('[API Portal] Unexpected error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
