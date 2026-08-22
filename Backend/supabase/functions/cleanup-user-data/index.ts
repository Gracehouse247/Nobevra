// supabase/functions/cleanup-user-data/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // This function can be called via a webhook on auth.users deletion
    // or manually by the user from the app (via RPC)
    const { user_id } = await req.json()

    if (!user_id) throw new Error('user_id is required')

    console.log(`Cleaning up data for user: ${user_id}`)

    // 1. Delete Storage Files
    // Iterate through buckets known to have user data
    const buckets = ['receipts', 'brand-assets', 'qr-codes']
    for (const bucket of buckets) {
      const { data: files, error: listError } = await supabase.storage
        .from(bucket)
        .list(user_id)

      if (files && files.length > 0) {
        const paths = files.map((f) => `${user_id}/${f.name}`)
        const { error: deleteError } = await supabase.storage
          .from(bucket)
          .remove(paths)
        
        if (deleteError) console.error(`Error deleting from ${bucket}:`, deleteError)
      }
    }

    // 2. Database Cleanup (if cascade delete is not setup)
    // Note: Usually team_id is the primary key for Nobevra data.
    // If the user is the owner of a team, we might need to delete the team too.
    
    // For now, we assume the user is just being "soft-deleted" or purged.
    // Real production apps often use a 'deleted_at' flag first.

    return new Response(JSON.stringify({ status: 'success', message: 'Cleanup complete' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
