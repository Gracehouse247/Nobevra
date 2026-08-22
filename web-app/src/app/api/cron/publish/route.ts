import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';

export const dynamic = 'force-dynamic';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cugomxoyeyeytyedgclj.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build'
  );
}

// Module-level Twitter singleton — created once, not inside the per-post loop
const twitterClient = process.env.TWITTER_API_KEY ? new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
}) : null;

export async function GET(req: NextRequest) {
  // Verify Cron Secret to prevent unauthorized publishing
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    // 1. Fetch pending posts scheduled for <= NOW
    const { data: posts, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString());

    if (error) throw error;
    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: 'No pending posts' });
    }

    const results = [];

    // 2. Iterate and publish
    for (const post of posts) {
      try {
        let platformPostId = null;

        if (post.platform === 'twitter') {
          if (!twitterClient) throw new Error('Twitter API keys not configured on server');

          // Check if content is a JSON array (thread)
          let content = post.content_text;
          try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) content = parsed;
          } catch(e) {}

          if (Array.isArray(content)) {
            const result = await twitterClient.v2.tweetThread(content);
            platformPostId = result[0].data.id;
          } else {
            const result = await twitterClient.v2.tweet(content);
            platformPostId = result.data.id;
          }

        } else if (post.platform === 'linkedin') {
            // For LinkedIn, we need to fetch the admin token from social_accounts table
            const { data: accounts } = await supabase.from('social_accounts').select('access_token').eq('platform', 'linkedin').limit(1);
            if (!accounts || accounts.length === 0) {
                throw new Error("No connected LinkedIn account found.");
            }
            const accessToken = accounts[0].access_token;
            
            const meResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const sub = meResponse.data.sub;

            const postBody = {
                author: `urn:li:person:${sub}`,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: { text: post.content_text },
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
            platformPostId = liResult.data.id;
        }

        // 3. Mark as Published
        await supabase.from('scheduled_posts').update({ 
          status: 'published',
          platform_post_id: platformPostId,
          updated_at: new Date().toISOString()
        }).eq('id', post.id);

        results.push({ id: post.id, status: 'published' });
      } catch (err: any) {
        // Mark as Failed
        await supabase.from('scheduled_posts').update({ 
          status: 'failed',
          error_message: err?.response?.data?.detail || err.message,
          updated_at: new Date().toISOString()
        }).eq('id', post.id);

        results.push({ id: post.id, status: 'failed', error: err.message });
      }
    }

    return NextResponse.json({ success: true, processed: results.length, results });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message || 'Cron failed' }, { status: 500 });
  }
}
