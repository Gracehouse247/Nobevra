// supabase/functions/verify-and-upgrade-subscription/index.ts
//
// Called from the Flutter app AFTER Flutterwave's charge() returns success.
// This is the PRIMARY trust point — we call Flutterwave's verify API to
// confirm the transaction is real before upgrading the subscription.
//
// The webhook (flw-webhook) is the SECONDARY/backup path for async payments.
//
// tx_ref format for subscriptions: sub_{tier}_{period}_{userId}_{shortId}
//   e.g. sub_pulse_monthly_550e8400-..._a1b2c3d4
//        sub_elite_yearly_550e8400-..._a1b2c3d4
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

// ── Server-side price book ────────────────────────────────────────────────────
// Key: `${tier}_${billingPeriod}_${currency}`
// Value: Expected amount charged.
// This is the ONLY source of truth for what a valid payment amount should be.
// Never trust the client to supply this value.
import { PRICE_BOOK } from "../_shared/price_book.ts";

// Tolerance: Currency-aware tolerance to account for minor FX or rounding.
// E.g. $2.00 for USD, ₦500.00 for NGN.
function getAmountTolerance(currency: string): number {
  return currency.toUpperCase() === "NGN" ? 500.0 : 2.0;
}

serve(async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Verify the caller is an authenticated Supabase user
  const authHeader = req.headers.get("Authorization");
  const supabaseUser = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader ?? "" } } }
  );

  const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
  if (authError || !user) {
    return json({ error: "Unauthorized" }, 401);
  }

  // Parse request body
  let body: {
    transaction_id: string;
    tx_ref: string;
    user_id: string;
  };

  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { transaction_id, tx_ref, user_id } = body;

  // Security: Ensure the authenticated user can only upgrade themselves
  if (user.id !== user_id) {
    console.error(`Auth mismatch: JWT user ${user.id} != requested user_id ${user_id}`);
    return json({ error: "Forbidden" }, 403);
  }

  if (!transaction_id || !tx_ref || !user_id) {
    return json({ error: "Missing required fields: transaction_id, tx_ref, user_id" }, 400);
  }

  // ── 1. Parse tier & billing period from tx_ref ──────────────────────────────
  // Format: sub_{tier}_{period}_{userId}_{shortId}
  // period can be 'monthly', 'yearly', or 'yearly_earlybird'
  const txRefMatch = tx_ref.match(/^sub_([a-z]+)_(monthly|yearly(?:_earlybird)?)_([0-9a-f-]{36})_([a-z0-9]+)$/i);
  if (!txRefMatch) {
    console.error("tx_ref format invalid:", tx_ref);
    return json({ error: "Invalid tx_ref format" }, 400);
  }

  let parsedTier = txRefMatch[1].toLowerCase();
  const periodStr = txRefMatch[2].toLowerCase();
  const isEarlyBird = periodStr.includes("earlybird");
  const parsedPeriod = isEarlyBird ? "early_bird" : (periodStr as "monthly" | "yearly");
  const txRefUserId = txRefMatch[3];

  // Extra security: user_id in tx_ref must match authenticated user
  if (txRefUserId !== user_id) {
    console.error(`tx_ref userId mismatch: ${txRefUserId} vs jwt ${user_id}`);
    return json({ error: "tx_ref user mismatch — possible fraud attempt" }, 403);
  }

  // Normalise legacy alias
  if (parsedTier === "pro") parsedTier = "pulse";

  if (!["pulse", "elite"].includes(parsedTier)) {
    return json({ error: `Invalid tier in tx_ref: ${parsedTier}` }, 400);
  }

  // ── 2. Verify with Flutterwave API ───────────────────────────────────────
  console.log(`Verifying transaction ${transaction_id} for user ${user_id}`);

  let flwData: Record<string, unknown>;
  try {
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
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
    console.error("Flutterwave verification returned non-success:", flwData);
    return json({ error: "Transaction not verified by Flutterwave", details: flwData }, 402);
  }

  // ── 3. Validate transaction details ────────────────────────────────────
  const verifiedStatus = (flwTxData.status as string)?.toLowerCase();
  const verifiedTxRef = flwTxData.tx_ref as string;
  const verifiedAmount = flwTxData.amount as number;
  const verifiedCurrency = (flwTxData.currency as string)?.toUpperCase();

  if (verifiedStatus !== "successful") {
    console.warn(`Transaction not successful. Status: ${verifiedStatus}`);
    return json({ error: `Transaction status is '${verifiedStatus}'` }, 402);
  }

  if (verifiedTxRef !== tx_ref) {
    console.error(`tx_ref mismatch: expected ${tx_ref}, got ${verifiedTxRef}`);
    return json({ error: "tx_ref mismatch — possible fraud attempt" }, 402);
  }

  // ── 4. Server-side amount validation against price book ─────────────────
  const priceKey = isEarlyBird
    ? `${parsedTier}_early_bird_${verifiedCurrency}`
    : `${parsedTier}_${parsedPeriod}_${verifiedCurrency}`;
  const expectedAmount = PRICE_BOOK[priceKey];

  if (expectedAmount === undefined) {
    console.error(`No price found for key: ${priceKey}`);
    return json({
      error: `Unsupported tier/period/currency combination: ${priceKey}. Contact support.`,
    }, 400);
  }

  const tolerance = getAmountTolerance(verifiedCurrency);
  const amountDiff = Math.abs(verifiedAmount - expectedAmount);
  if (amountDiff > tolerance) {
    console.error(
      `Amount mismatch for ${priceKey}: expected ${expectedAmount} ${verifiedCurrency}, got ${verifiedAmount} ${verifiedCurrency}`
    );
    return json({
      error: `Amount mismatch. Expected ~${expectedAmount} ${verifiedCurrency}, received ${verifiedAmount} ${verifiedCurrency}.`,
    }, 402);
  }

  // ── 5. Upgrade subscription in database ─────────────────────────────────
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const isYearly = parsedPeriod === "yearly";

  const { error: rpcError } = await supabaseAdmin.rpc("upgrade_user_subscription", {
    target_user_id: user_id,
    target_tier: parsedTier,
    is_yearly: isYearly,
  });

  if (rpcError) {
    console.error("upgrade_user_subscription RPC failed:", rpcError);
    return json({ error: rpcError.message }, 500);
  }

  // ── 6. Log to billing_history ────────────────────────────────────────────
  await supabaseAdmin.from("billing_history").insert({
    user_id: user_id,
    amount: verifiedAmount,
    currency: verifiedCurrency,
    plan: parsedTier,
    billing_period: isYearly ? "yearly" : "monthly",
    transaction_ref: tx_ref,
    transaction_id: String(transaction_id),
    status: "success",
    verified_at: new Date().toISOString(),
  });

  console.log(`✅ Subscription upgraded: user ${user_id} → ${parsedTier} (${parsedPeriod})`);
  return json({
    status: "upgraded",
    tier: parsedTier,
    is_yearly: isYearly,
  }, 200);
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
