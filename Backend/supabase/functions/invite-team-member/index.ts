import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const errors: string[] = [];

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    // Always use service role so we bypass RLS for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // ── 1. Verify caller is authenticated ─────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error(`Unauthorized: ${authError?.message ?? 'no user'}`);

    // ── 2. Parse body ─────────────────────────────────────────────────────────
    const { email, role, team_id } = await req.json();
    if (!email || !role || !team_id) {
      throw new Error('Missing required fields: email, role, team_id');
    }

    // ── 3. Verify caller owns this team ───────────────────────────────────────
    const { data: team, error: teamErr } = await supabase
      .from('teams')
      .select('id, owner_id')
      .eq('id', team_id)
      .single();

    if (teamErr) throw new Error(`Team lookup failed: ${teamErr.message}`);
    if (!team) throw new Error('Team not found');
    if (team.owner_id !== user.id) {
      // Fallback: check team_members for owner/admin role
      const { data: memberCheck } = await supabase
        .from('team_members')
        .select('role')
        .eq('team_id', team_id)
        .eq('user_id', user.id)
        .in('role', ['owner', 'admin'])
        .maybeSingle();

      if (!memberCheck) {
        throw new Error('You do not have permission to invite members to this team.');
      }
    }

    // ── 4. Get the inviter's profile id (invited_by FK → profiles.id) ─────────
    // profiles.id is the same as auth.users.id in most Supabase setups
    // but the FK might point to a separate profiles table. We try profiles first,
    // then fall back to using user.id directly if profiles table doesn't exist.
    let invitedById: string = user.id;
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (profile) {
      invitedById = profile.id;
    }

    // ── 5. Insert pending invitation ──────────────────────────────────────────
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const { data: insertedInvite, error: inviteError } = await supabase
      .from('pending_invitations')
      .insert({
        team_id,
        email,
        role,
        invited_by: invitedById,
        expires_at: expiresAt.toISOString(),
      })
      .select('id')
      .single();

    if (inviteError) {
      if (inviteError.code === '23505') {
        throw new Error('An invitation has already been sent to this email for this team.');
      }
      throw new Error(`DB insert failed: ${inviteError.message} (code: ${inviteError.code})`);
    }

    // ── 6. Send branded invitation email via SMTP ─────────────────────────────
    const SMTP_HOST     = Deno.env.get('SMTP_HOST')     ?? 'mail.noblesworld.com.ng';
    const SMTP_PORT     = parseInt(Deno.env.get('SMTP_PORT') ?? '465');
    const SMTP_USER     = Deno.env.get('SMTP_USER')     ?? 'invoice@noblesworld.com.ng';
    const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') ?? '123NobleWORLD!@#';
    const SMTP_FROM     = Deno.env.get('SMTP_FROM')     ?? 'invoice@noblesworld.com.ng';
    const APP_URL       = Deno.env.get('NEXT_PUBLIC_APP_URL') ?? 'https://nobleinvoice.com';

    // Build the invite link with the invite ID for secure lookup
    const inviteLink = `${APP_URL}/invite?id=${insertedInvite.id}&email=${encodeURIComponent(email)}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr><td align="center">
              <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <!-- Header -->
                <tr>
                  <td style="background:#166FBB;padding:32px 40px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">NobleInvoice</h1>
                    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Team Invitation</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="color:#0f172a;font-size:20px;margin:0 0 16px;">You've been invited to join a team!</h2>
                    <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">
                      You have been invited to join a workspace on <strong>NobleInvoice</strong> as a <strong style="color:#166FBB;text-transform:capitalize;">${role}</strong>.
                    </p>
                    <div style="text-align:center;margin:32px 0;">
                      <a href="${inviteLink}"
                         style="background:#166FBB;color:#ffffff;padding:14px 36px;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;">
                        Accept Invitation
                      </a>
                    </div>
                    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:24px 0 0;line-height:1.6;">
                      This invitation will expire in <strong>7 days</strong>.<br>
                      If you did not expect this invitation, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                    <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 NobleInvoice. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `;

    try {
      const smtpClient = new SMTPClient({
        connection: {
          hostname: SMTP_HOST,
          port: SMTP_PORT,
          tls: true,
          auth: {
            username: SMTP_USER,
            password: SMTP_PASSWORD,
          },
        },
      });
      await smtpClient.send({
        from: `NobleInvoice <${SMTP_FROM}>`,
        to: email,
        subject: `You're invited to join a team on NobleInvoice`,
        content: 'auto',
        html: emailHtml,
      });
      await smtpClient.close();
      console.log(`[invite-team-member] ✅ SMTP email sent to ${email}`);
    } catch (smtpErr: any) {
      // Log SMTP failure but don't fail the whole request — invite is already saved in DB
      errors.push(`SMTP warning: ${smtpErr.message}`);
      console.error('[invite-team-member] SMTP error:', smtpErr.message);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Invitation sent successfully', warnings: errors }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('[invite-team-member] Fatal error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
