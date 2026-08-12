// supabase/functions/stripe-connect/index.ts
//
// Endpoint to generate Stripe Connect Express onboarding links.
// Currently a placeholder returning a mock "Coming Soon" URL.
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Placeholder logic for Stripe Connect Express onboarding
    // Will use stripe API to create an account link: stripe.accountLinks.create(...)

    return new Response(
      JSON.stringify({
        success: true,
        url: "#coming-soon",
        message: "Stripe Connect onboarding link will be generated here.",
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
