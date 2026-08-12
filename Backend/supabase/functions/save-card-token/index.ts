// supabase/functions/save-card-token/index.ts
//
// Industry-standard card tokenization endpoint.
//
// Called AFTER a successful Flutterwave payment (any type: subscription, PAYG, preauth).
// Verifies the transaction with Flutterwave, then extracts the card token
// from the verification response (data.card.token) and stores it securely.
//
// The frontend sends: { transaction_id, tx_ref }
// This function:
//   1. Verifies the transaction is real with Flutterwave
//   2. Extracts token, last4, brand, expiry from data.card
//   3. Upserts into payment_methods table (deduped by user+token)
//
// References:
//   https://developer.flutterwave.com/docs/direct-charge/card-tokenization
//   Token field: response.data.card.token
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

import { CORS_HEADERS } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Authenticate user
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

  // Parse body
  let body: { transaction_id: string | number; tx_ref?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (!body.transaction_id) {
    return json({ error: "Missing required field: transaction_id" }, 400);
  }

  // ── 1. Verify with Flutterwave ────────────────────────────────────────────
  let flwData: Record<string, unknown>;
  try {
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${body.transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    flwData = await verifyRes.json() as Record<string, unknown>;
  } catch (e) {
    console.error("Flutterwave verify API failed:", e);
    return json({ error: "Failed to reach Flutterwave API" }, 502);
  }

  const flwStatus = (flwData.status as string)?.toLowerCase();
  const flwTxData = flwData.data as Record<string, unknown> | null;

  if (flwStatus !== "success" || !flwTxData) {
    return json({ error: "Transaction not verified by Flutterwave" }, 402);
  }

  const verifiedStatus = (flwTxData.status as string)?.toLowerCase();
  if (verifiedStatus !== "successful") {
    return json({ error: `Transaction status is '${verifiedStatus}', not successful` }, 402);
  }

  // ── 2. Extract card token from verification response ──────────────────────
  // Per Flutterwave docs: token is at data.card.token
  const cardData = flwTxData.card as Record<string, string> | null;

  if (!cardData?.token) {
    // Not all payment methods yield a card token (e.g. bank transfers, USSD)
    return json({
      status: "no_token",
      message: "No card token available for this transaction type",
    }, 200);
  }

  const token = cardData.token;
  const brand = cardData.type || cardData.card_type || "CARD";
  const last4 = cardData.last_4digits || cardData.last4 || "****";
  const expiry = (cardData.expiry || "").split("/");
  const exp_month = expiry[0]?.trim() || null;
  const exp_year = expiry[1]?.trim() || null;
  const card_holder = (flwTxData.customer as Record<string, string>)?.name || null;

  // ── 3. Upsert card into payment_methods (deduped by user_id + token) ──────
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: existingCards } = await supabaseAdmin
    .from("payment_methods")
    .select("id")
    .eq("user_id", user.id);

  const isFirstCard = !existingCards || existingCards.length === 0;

  const { data: upserted, error: upsertError } = await supabaseAdmin
    .from("payment_methods")
    .upsert({
      user_id: user.id,
      token,
      brand: brand.toUpperCase(),
      last4,
      exp_month,
      exp_year,
      card_holder,
      is_default: isFirstCard, // First card auto-becomes default
    }, {
      onConflict: "user_id,token", // Don't duplicate same card
    })
    .select()
    .single();

  if (upsertError) {
    console.error("Error saving card token:", upsertError);
    return json({ error: "Failed to save payment method" }, 500);
  }

  console.log(`✅ Card token saved for user ${user.id}: ${brand} ****${last4}`);

  return json({
    status: "saved",
    payment_method: {
      id: upserted.id,
      brand: upserted.brand,
      last4: upserted.last4,
      exp_month: upserted.exp_month,
      exp_year: upserted.exp_year,
      is_default: upserted.is_default,
    },
  }, 200);
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
