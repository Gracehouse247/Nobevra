// supabase/functions/payment-methods/index.ts
//
// Manages saved Flutterwave card tokens for a user.
//
// Endpoints:
//   GET    → List all saved payment methods for the authenticated user
//   DELETE → Remove a specific payment method by id
//   PATCH  → Set a specific payment method as default
//
// Card tokens are extracted from Flutterwave verification responses
// (data.card.token) and stored server-side for PCI compliance.
// See: https://developer.flutterwave.com/docs/direct-charge/card-tokenization
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  // Authenticate the user
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return json({ error: "Unauthorized" }, 401);
  }

  const supabaseUser = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
  if (authError || !user) {
    return json({ error: "Unauthorized" }, 401);
  }

  // Admin Supabase client (bypasses RLS for server-side ops)
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // ── GET: List payment methods ─────────────────────────────────────────────
    if (req.method === "GET") {
      const { data, error } = await supabaseAdmin
        .from("payment_methods")
        .select("id, brand, last4, exp_month, exp_year, card_holder, is_default, created_at")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching payment methods:", error);
        return json({ error: "Failed to fetch payment methods", details: error }, 500);
      }

      return json({ data: data || [] }, 200);
    }

    // ── DELETE: Remove a payment method ──────────────────────────────────────
    if (req.method === "DELETE") {
      let body: { id: string };
      try {
        body = await req.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }

      if (!body.id) {
        return json({ error: "Missing required field: id" }, 400);
      }

      // Verify ownership before deleting
      const { data: existing, error: fetchError } = await supabaseAdmin
        .from("payment_methods")
        .select("id, user_id")
        .eq("id", body.id)
        .eq("user_id", user.id)
        .single();

      if (fetchError || !existing) {
        return json({ error: "Payment method not found or access denied" }, 404);
      }

      const { error: deleteError } = await supabaseAdmin
        .from("payment_methods")
        .delete()
        .eq("id", body.id)
        .eq("user_id", user.id);

      if (deleteError) {
        console.error("Error deleting payment method:", deleteError);
        return json({ error: "Failed to delete payment method" }, 500);
      }

      return json({ status: "deleted", id: body.id }, 200);
    }

    // ── PATCH: Set default payment method ────────────────────────────────────
    if (req.method === "PATCH") {
      let body: { id: string };
      try {
        body = await req.json();
      } catch {
        return json({ error: "Invalid JSON body" }, 400);
      }

      if (!body.id) {
        return json({ error: "Missing required field: id" }, 400);
      }

      // Verify ownership
      const { data: existing, error: fetchError } = await supabaseAdmin
        .from("payment_methods")
        .select("id, user_id")
        .eq("id", body.id)
        .eq("user_id", user.id)
        .single();

      if (fetchError || !existing) {
        return json({ error: "Payment method not found or access denied" }, 404);
      }

      // 1) Remove default from all user's cards
      await supabaseAdmin
        .from("payment_methods")
        .update({ is_default: false })
        .eq("user_id", user.id);

      // 2) Set the selected card as default
      const { error: updateError } = await supabaseAdmin
        .from("payment_methods")
        .update({ is_default: true })
        .eq("id", body.id)
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Error setting default payment method:", updateError);
        return json({ error: "Failed to set default" }, 500);
      }

      return json({ status: "updated", default_id: body.id }, 200);
    }

    return json({ error: "Method not allowed" }, 405);
  } catch (err: any) {
    return json({ error: "Uncaught Exception", message: err.message, stack: err.stack }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
