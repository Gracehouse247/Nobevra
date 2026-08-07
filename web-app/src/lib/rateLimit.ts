/**
 * Lightweight sliding-window in-memory rate limiter.
 * No external dependencies required — uses a simple Map keyed by identifier.
 * 
 * For production at high scale, replace with Upstash Redis:
 * https://github.com/upstash/ratelimit
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
});

/**
 * DB-backed sliding-window rate limiter for Vercel Serverless/Edge functions.
 * Closes SEC-05: Solves the issue where in-memory Maps reset on every cold start.
 * 
 * @param identifier - Unique key (e.g. IP address, user ID)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean, remaining: number, resetMs: number }
 */
export async function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetMs: number }> {
  try {
    const windowSecs = Math.max(1, Math.floor(windowMs / 1000));
    
    // Call the atomic rate limiter RPC
    const { data, error } = await supabaseAdmin.rpc('check_rate_limit', {
        p_identifier: identifier,
        p_limit: limit,
        p_window_secs: windowSecs
    });

    if (error || !data || data.length === 0) {
        console.error('[rateLimit] RPC failed, failing open for safety:', error);
        return { allowed: true, remaining: limit, resetMs: 0 };
    }

    const result = data[0];
    const resetTime = new Date(result.reset_at).getTime();
    const resetMs = Math.max(0, resetTime - Date.now());

    return { 
        allowed: result.allowed, 
        remaining: result.remaining, 
        resetMs 
    };
  } catch (err) {
    console.error('[rateLimit] Unexpected error:', err);
    return { allowed: true, remaining: limit, resetMs: 0 };
  }
}

/**
 * Get the real client IP from a Next.js request, handling proxies.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Build a standard 429 rate limit response.
 */
export function rateLimitResponse(resetMs: number): Response {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please slow down.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil(resetMs / 1000)),
        'X-RateLimit-Limit': '0',
      },
    }
  );
}
