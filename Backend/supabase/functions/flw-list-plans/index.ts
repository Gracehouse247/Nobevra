// Supabase Edge Function: flw-list-plans
// Diagnostic tool: lists all payment plans from Flutterwave to verify plan IDs are valid
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

serve(async (req) => {
  // Only allow GET
  if (req.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Require authenticated user
  const authHeader = req.headers.get("Authorization");
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader ?? "" } } }
  );
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return json({ error: "Unauthorized" }, 401);
  }

  if (!FLUTTERWAVE_SECRET_KEY) {
    return json({ error: "FLUTTERWAVE_SECRET_KEY not set in Supabase secrets" }, 500);
  }

  try {
    // Fetch all payment plans from Flutterwave
    const res = await fetch("https://api.flutterwave.com/v3/payment-plans", {
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    // Also fetch specific plans we care about
    const planIds = [160676, 160677, 160678, 160679, 160680, 165726];
    const planChecks: Record<string, any> = {};

    for (const id of planIds) {
      try {
        const planRes = await fetch(`https://api.flutterwave.com/v3/payment-plans/${id}`, {
          headers: {
            Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        });
        planChecks[id] = await planRes.json();
      } catch (e) {
        planChecks[id] = { error: String(e) };
      }
    }

    return json({
      allPlans: data,
      specificPlanChecks: planChecks,
      secretKeyPrefix: FLUTTERWAVE_SECRET_KEY.substring(0, 20) + "...",
    }, 200);
  } catch (e) {
    return json({ error: "Failed to reach Flutterwave API", details: String(e) }, 502);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
