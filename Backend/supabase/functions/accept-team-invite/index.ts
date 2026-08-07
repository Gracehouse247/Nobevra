import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';

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

    // Service role client — bypasses RLS for admin operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // ── 1. Verify caller is authenticated ─────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await adminClient.auth.getUser(token);
    if (authError || !user) throw new Error(`Unauthorized: ${authError?.message ?? 'no user'}`);

    // ── 2. Parse body ─────────────────────────────────────────────────────────
    const { invite_id } = await req.json();
    if (!invite_id) throw new Error('Missing required field: invite_id');

    // ── 3. Fetch and validate the invitation ──────────────────────────────────
    const { data: invite, error: fetchErr } = await adminClient
      .from('pending_invitations')
      .select('*')
      .eq('id', invite_id)
      .single();

    if (fetchErr || !invite) throw new Error('Invitation not found or already used.');

    // Check email matches the logged-in user
    if (invite.email.toLowerCase() !== user.email?.toLowerCase()) {
      throw new Error(`This invitation was sent to ${invite.email}. Please log in with that email address.`);
    }

    // Check expiry
    if (new Date(invite.expires_at) < new Date()) {
      throw new Error('This invitation has expired. Please ask the workspace owner to send a new invite.');
    }

    // ── 4. Check if user is already a member ──────────────────────────────────
    const { data: existingMember } = await adminClient
      .from('team_members')
      .select('id')
      .eq('team_id', invite.team_id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingMember) {
      // Already a member — clean up the invite and return success
      await adminClient.from('pending_invitations').delete().eq('id', invite_id);
      return new Response(
        JSON.stringify({ success: true, message: 'You are already a member of this team.', team_id: invite.team_id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // ── 5. Add user to team_members ───────────────────────────────────────────
    const { error: insertErr } = await adminClient
      .from('team_members')
      .insert({
        team_id: invite.team_id,
        user_id: user.id,
        role: invite.role,
      });

    if (insertErr) throw new Error(`Failed to join team: ${insertErr.message}`);

    // ── 6. Delete the used invitation ─────────────────────────────────────────
    await adminClient.from('pending_invitations').delete().eq('id', invite_id);

    console.log(`[accept-team-invite] ✅ User ${user.email} joined team ${invite.team_id} as ${invite.role}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully joined the team!', team_id: invite.team_id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('[accept-team-invite] Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
