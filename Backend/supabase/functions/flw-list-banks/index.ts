import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "*";
  return {
    ...corsHeaders,
    "Access-Control-Allow-Origin": origin,
  };
}

function jsonResponse(req: Request, data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
  });
}

function jsonError(req: Request, message: string, status = 400) {
  return jsonResponse(req, { error: message }, status);
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: getCorsHeaders(req) });
  }

  try {
    // 1. Authenticate the calling user (only logged-in users can fetch banks)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonError(req, "Missing Authorization header", 401);
    }

    const supabaseClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    
    const { data: { user }, error: authErr } = await supabaseClient.auth.getUser();
    if (authErr || !user) {
      return jsonError(req, "Unauthorized", 401);
    }

    // 2. Extract country code from URL params
    const url = new URL(req.url);
    const country = url.searchParams.get("country")?.toUpperCase() || "NG";
    
    // Flutterwave supports fetching banks for NG, GH, KE, UG, ZA, TZ
    const supportedCountries = ["NG", "GH", "KE", "UG", "ZA", "TZ", "US"];
    if (!supportedCountries.includes(country)) {
        // Return empty list if unsupported country, so UI can handle it gracefully
        return jsonResponse(req, { status: "success", message: "Unsupported country", data: [] });
    }

    // 3. Fetch from Flutterwave API
    const flwRes = await fetch(`https://api.flutterwave.com/v3/banks/${country}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!flwRes.ok) {
      const errorText = await flwRes.text();
      console.error("Flutterwave API Error:", errorText);
      return jsonError(req, "Failed to fetch banks from Flutterwave", 500);
    }

    const flwData = await flwRes.json();
    return jsonResponse(req, flwData);

  } catch (error: any) {
    console.error("Unexpected error:", error);
    return jsonError(req, "Internal Server Error: " + error.message, 500);
  }
});
