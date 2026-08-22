import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// ── Simple in-memory rate limiter (resets on cold start) ──────────────────────
// Industry standard: max 10 checks per IP per minute to prevent enumeration.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return false;
    }
    entry.count += 1;
    if (entry.count > RATE_LIMIT) return true;
    return false;
}

export async function GET(request: Request) {
    // ── Rate limit by IP ──────────────────────────────────────────────────────
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { exists: false, error: 'Too many requests. Please wait a moment.' },
            { status: 429 }
        );
    }

    // ── Validate input ────────────────────────────────────────────────────────
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get('email');
    if (!raw) return NextResponse.json({ exists: false });

    const email = raw.toLowerCase().trim();
    // Basic email format guard
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ exists: false });
    }

    // ── Check via Admin API (server-side only — service role never sent to browser) ──
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
        return NextResponse.json({ exists: false });
    }

    try {
        const adminClient = createClient(
            supabaseUrl,
            serviceRoleKey,
            { auth: { persistSession: false } }
        );

        const { data, error } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
        if (error) {
            console.error('[check-email] Admin list error:', error.message);
            return NextResponse.json({ exists: false });
        }

    const match = data?.users?.find((u) => u.email === email);
    if (!match) {
        return NextResponse.json({ exists: false });
    }

    // ── Determine provider hint (used by login page only, not register) ───────
    // Industry standard: never enumerate the exact provider on the register page.
    // On the login page, we hint "Try Google" if the user has ONLY a Google identity.
    const identities = match.identities ?? [];
    const hasPassword = identities.some((i) => i.provider === 'email');
    const hasGoogle = identities.some((i) => i.provider === 'google');

    let hint: 'email' | 'google' | 'both' = 'email';
    if (hasGoogle && !hasPassword) hint = 'google';
    else if (hasGoogle && hasPassword) hint = 'both';

    // Never expose the hint on the register page endpoint call.
    // The login page will pass ?context=login to receive the hint.
    const context = searchParams.get('context');
    const providerHint = context === 'login' ? hint : undefined;

        return NextResponse.json({
            exists: true,
            ...(providerHint ? { provider: providerHint } : {}),
        });
    } catch (err) {
        console.error('[check-email] Exception:', err);
        return NextResponse.json({ exists: false });
    }
}
