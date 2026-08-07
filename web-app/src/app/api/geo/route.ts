import { NextResponse } from 'next/server';

/**
 * Server-side geolocation API route.
 * Detects the user's country via ipapi.co and returns country + currency code.
 * Results are cached for 24 hours at the CDN/browser level.
 * 
 * Usage: GET /api/geo → { country: 'GB', currency: 'GBP', country_name: 'United Kingdom' }
 */
export async function GET(request: Request) {
    try {
        // Get IP from forwarded header (works behind proxies/Vercel)
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : '';

        // Skip private/local IPs in development
        const isLocalIp = !ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.');

        if (isLocalIp) {
            return NextResponse.json(
                { country: null, currency: 'USD', country_name: null, source: 'local_dev' },
                { headers: { 'Cache-Control': 'no-store' } }
            );
        }

        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
            headers: { 'User-Agent': 'NobleInvoice/1.0' },
            next: { revalidate: 86400 } // Cache for 24h
        });

        if (!geoRes.ok) throw new Error(`ipapi.co error: ${geoRes.status}`);

        const data = await geoRes.json();

        if (data.error) throw new Error(data.reason || 'geo lookup failed');

        return NextResponse.json(
            {
                country: data.country_code || null,
                currency: data.currency || 'USD',
                country_name: data.country_name || null,
                source: 'ipapi'
            },
            {
                headers: {
                    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
                }
            }
        );
    } catch (err) {
        console.warn('[/api/geo] Geo detection failed, using USD fallback:', err);
        return NextResponse.json(
            { country: null, currency: 'USD', country_name: null, source: 'error_fallback' },
            { headers: { 'Cache-Control': 'no-store' } }
        );
    }
}
