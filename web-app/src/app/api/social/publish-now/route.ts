import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

// Initialize Twitter Client if keys are present
const twitterClient = process.env.TWITTER_API_KEY ? new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
}) : null;

export async function POST(req: NextRequest) {
  // ── 1. Auth Gate ──────────────────────────────────────────────────
  const supabaseResponse = NextResponse.next();
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

  // ── 2. Rate Limiting (5 publishes per minute per user) ────────────
  const { allowed, remaining, resetMs } = await rateLimit(`social-publish:${user.id}`, 5, 60_000);
  if (!allowed) return rateLimitResponse(resetMs);

  try {
    const { platform, content, accessToken } = await req.json();

    if (!platform || !content) {
      return NextResponse.json({ error: 'Platform and content are required' }, { status: 400 });
    }

    if (platform === 'twitter') {
      if (!twitterClient) {
        return NextResponse.json({ error: 'Twitter API keys not configured on server' }, { status: 500 });
      }

      // Twitter API v2 Tweet
      // If content is an array, we post a thread. Otherwise a single tweet.
      const tweets = Array.isArray(content) ? content : [content];
      
      let result;
      if (tweets.length > 1) {
        result = await twitterClient.v2.tweetThread(tweets);
      } else {
        result = await twitterClient.v2.tweet(tweets[0]);
      }

      return NextResponse.json({ success: true, result }, {
        headers: { 'X-RateLimit-Remaining': String(remaining) }
      });

    } else if (platform === 'linkedin') {
      if (!accessToken) {
        return NextResponse.json({ error: 'LinkedIn Access Token required' }, { status: 400 });
      }
      
      const meResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const sub = meResponse.data.sub;

      const postBody = {
        author: `urn:li:person:${sub}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: content },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };

      const liResult = await axios.post('https://api.linkedin.com/v2/ugcPosts', postBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json'
        }
      });

      return NextResponse.json({ success: true, result: liResult.data }, {
        headers: { 'X-RateLimit-Remaining': String(remaining) }
      });
    }

    return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });
  } catch (error: any) {
    console.error('Publish Error:', error);
    const msg = error?.response?.data?.detail || error.message || 'Failed to publish';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
