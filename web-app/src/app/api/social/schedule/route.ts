import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit';

// Service-role client for the actual DB write
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // ── 1. Auth Gate ──────────────────────────────────────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── 2. Rate Limiting (10 schedules per minute per user) ───────────
  const { allowed, resetMs } = await rateLimit(`social-schedule:${user.id}`, 10, 60_000);
  if (!allowed) return rateLimitResponse(resetMs);

  try {
    const { articleId, platform, content, scheduledFor } = await req.json();

    if (!platform || !content || !scheduledFor) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate scheduledFor is a valid date and not more than 1 year in the future
    const scheduleDate = new Date(scheduledFor);
    const maxFuture = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    if (isNaN(scheduleDate.getTime()) || scheduleDate < new Date() || scheduleDate > maxFuture) {
      return NextResponse.json(
        { error: 'scheduledFor must be a valid future date within the next year' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.from('scheduled_posts').insert({
      article_id: articleId || null,
      platform,
      content_text: typeof content === 'string' ? content : JSON.stringify(content),
      scheduled_for: scheduleDate.toISOString(),
      status: 'pending',
      user_id: user.id,
    }).select().single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Schedule Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to schedule post' }, { status: 500 });
  }
}
