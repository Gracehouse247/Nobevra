import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cugomxoyeyeytyedgclj.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build'
  );
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error: `OAuth Error: ${error}` }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
  }

  try {
    // 1. Exchange auth code for access token
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, expires_in } = tokenResponse.data;

    // 2. Fetch User Profile to get URN identifier
    const meResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    const accountId = meResponse.data.sub;
    const accountName = meResponse.data.name;

    // 3. Save to Supabase `social_accounts` table
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    const { error: dbError } = await supabase.from('social_accounts').upsert({
      platform: 'linkedin',
      account_id: accountId,
      account_name: accountName,
      access_token: access_token,
      token_expires_at: expiresAt,
      updated_at: new Date().toISOString()
    }, { onConflict: 'platform, account_id' });

    if (dbError) throw dbError;

    // 4. Redirect back to CMS Settings or show success
    return new NextResponse(`
      <html><body>
        <h2>LinkedIn Authenticated Successfully!</h2>
        <p>Your Nobevra CMS can now post to LinkedIn.</p>
        <button onclick="window.close()">Close Window</button>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' }});

  } catch (err: any) {
    console.error('LinkedIn Callback Error:', err.response?.data || err.message);
    return NextResponse.json({ error: 'Failed to authenticate with LinkedIn' }, { status: 500 });
  }
}
