// supabase/functions/paypal-link/index.ts
//
// Endpoint to handle linking a PayPal account for payouts.
// Currently a placeholder.
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    return new Response(
      JSON.stringify({
        success: true,
        message: "PayPal integration coming soon.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
