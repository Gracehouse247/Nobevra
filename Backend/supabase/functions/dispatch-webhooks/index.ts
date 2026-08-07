import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { team_id, event_type, payload } = await req.json();

    if (!team_id || !event_type) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Fetch active webhooks for the team
    const { data: webhooks, error: webhookErr } = await supabaseAdmin
      .from("webhooks")
      .select("url, secret")
      .eq("team_id", team_id)
      .eq("active", true);

    if (webhookErr) throw webhookErr;
    if (!webhooks || webhooks.length === 0) {
      return new Response(JSON.stringify({ message: "No active webhooks" }), { status: 200, headers: corsHeaders });
    }

    const timestamp = Date.now().toString();
    const payloadStr = JSON.stringify({
      event: event_type,
      timestamp,
      data: payload,
    });

    const dispatchPromises = webhooks.map(async (wh) => {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "X-NobleInvoice-Event": event_type,
          "X-NobleInvoice-Timestamp": timestamp,
        };

        if (wh.secret) {
          const signature = hmac("sha256", wh.secret, payloadStr, "utf8", "hex");
          headers["X-NobleInvoice-Signature"] = signature as string;
        }

        await fetch(wh.url, {
          method: "POST",
          headers,
          body: payloadStr,
        });
      } catch (err) {
        console.error(`[dispatch-webhooks] Failed to dispatch to ${wh.url}:`, err);
      }
    });

    await Promise.all(dispatchPromises);

    return new Response(JSON.stringify({ success: true, dispatched: webhooks.length }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[dispatch-webhooks] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
