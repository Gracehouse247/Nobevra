import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify requesting user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) throw new Error('Unauthorized')

    const user_id = user.id

    // 1. Flag profile as pending_deletion
    const deletionDate = new Date()
    deletionDate.setDate(deletionDate.getDate() + 30) // 30 days from now

    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        pending_deletion: true,
        deletion_scheduled_at: deletionDate.toISOString()
      })
      .eq('id', user_id)

    if (profileError) throw profileError

    // 2. Ban the user at the auth level to log them out immediately and prevent login
    // Banning for 876000 hours (~100 years)
    const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(
      user_id,
      { ban_duration: '876000h' }
    )

    if (banError) throw banError

    return new Response(JSON.stringify({ 
        status: 'success', 
        message: 'Account banned and scheduled for permanent deletion in 30 days.',
        deletion_scheduled_at: deletionDate.toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
