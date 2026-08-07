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

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

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
    const { invite_id } = await req.json();
    if (!invite_id) throw new Error('Missing required field: invite_id');

    // ── 3. Fetch the existing invitation ──────────────────────────────────────
    const { data: invite, error: fetchErr } = await supabase
      .from('pending_invitations')
      .select('*')
      .eq('id', invite_id)
      .single();

    if (fetchErr || !invite) throw new Error(`Invite not found: ${fetchErr?.message ?? ''}`);

    // ── 4. Verify caller owns the team this invite belongs to ─────────────────
    const { data: team, error: teamErr } = await supabase
      .from('teams')
      .select('id, owner_id')
      .eq('id', invite.team_id)
      .single();

    if (teamErr || !team) throw new Error(`Team lookup failed: ${teamErr?.message ?? ''}`);

    if (team.owner_id !== user.id) {
      const { data: memberCheck } = await supabase
        .from('team_members')
        .select('role')
        .eq('team_id', invite.team_id)
        .eq('user_id', user.id)
        .in('role', ['owner', 'admin'])
        .maybeSingle();

      if (!memberCheck) throw new Error('You do not have permission to resend this invitation.');
    }

    // ── 5. Refresh the expiry date (extend by another 7 days from now) ────────
    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    const { error: updateErr } = await supabase
      .from('pending_invitations')
      .update({ expires_at: newExpiresAt.toISOString() })
      .eq('id', invite_id);

    if (updateErr) throw new Error(`Failed to refresh invite expiry: ${updateErr.message}`);

    // ── 6. Re-send the invitation email via SMTP ──────────────────────────────
    const SMTP_HOST     = Deno.env.get('SMTP_HOST')     ?? 'mail.noblesworld.com.ng';
    const SMTP_PORT     = parseInt(Deno.env.get('SMTP_PORT') ?? '465');
    const SMTP_USER     = Deno.env.get('SMTP_USER')     ?? 'invoice@noblesworld.com.ng';
    const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') ?? '123NobleWORLD!@#';
    const SMTP_FROM     = Deno.env.get('SMTP_FROM')     ?? 'invoice@noblesworld.com.ng';
    const APP_URL       = Deno.env.get('NEXT_PUBLIC_APP_URL') ?? 'https://nobleinvoice.com';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr><td align="center">
              <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <tr>
                  <td style="background:#166FBB;padding:32px 40px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">NobleInvoice</h1>
                    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Team Invitation (Reminder)</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px;">
                    <h2 style="color:#0f172a;font-size:20px;margin:0 0 16px;">You still have a pending invitation!</h2>
                    <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">
                      This is a reminder that you have been invited to join a workspace on <strong>NobleInvoice</strong> as a <strong style="color:#166FBB;text-transform:capitalize;">${invite.role}</strong>.
                    </p>
                    <div style="text-align:center;margin:32px 0;">
                      <a href="${APP_URL}/invite?email=${encodeURIComponent(invite.email)}"
                         style="background:#166FBB;color:#ffffff;padding:14px 36px;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;">
                        Accept Invitation
                      </a>
                    </div>
                    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:24px 0 0;line-height:1.6;">
                      This invitation has been extended and will now expire in <strong>7 days</strong>.<br>
                      If you did not expect this invitation, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
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
      to: invite.email,
      subject: `Reminder: You have a pending invitation on NobleInvoice`,
      content: 'auto',
      html: emailHtml,
    });
    await smtpClient.close();
    console.log(`[resend-team-invite] ✅ Reminder email sent to ${invite.email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Invitation resent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('[resend-team-invite] Fatal error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
