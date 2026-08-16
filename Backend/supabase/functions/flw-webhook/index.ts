// supabase/functions/flw-webhook/index.ts
//
// CANONICAL Flutterwave Webhook Handler
// Configure this URL in Flutterwave Dashboard:
//   Settings → Webhooks → https://<project>.supabase.co/functions/v1/flw-webhook
//
// Handles these tx_ref formats:
//   sub_{planId}_{userId}_{shortId}       — Subscription payment (e.g. sub_pulse_550e8400..._a1b2c3)
//   INV-{invoiceId}-{timestamp}            — Invoice payment
//   payg-bundle-{userId}-{timestamp}       — PAYG bundle top-up
//   transfer-{transferId}-{timestamp}      — FLW Payout/withdrawal confirmation
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

// ── Flutterwave Transaction Double-Verification ───────────────────────────────
// Prevents forged webhooks — even if an attacker knows the secret hash, the
// transaction must independently exist and match on Flutterwave's servers.
async function verifyFlutterwaveTransaction(transactionId: number): Promise<{
  valid: boolean;
  status: string;
  amount: number;
  currency: string;
}> {
  try {
    const res = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      { headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}` } }
    );
    const body = await res.json();
    if (body.status !== "success" || !body.data) {
      return { valid: false, status: "", amount: 0, currency: "" };
    }
    return {
      valid: true,
      status:   body.data.status,
      amount:   body.data.amount,
      currency: (body.data.currency ?? "").toUpperCase(),
    };
  } catch (e) {
    console.error("[flw-webhook] verifyFlutterwaveTransaction failed:", e);
    return { valid: false, status: "", amount: 0, currency: "" };
  }
}

// ── Fee Constants ─────────────────────────────────────────────────────────────
// Option A: Fees are passed to the payer on top of the invoice amount.
// The client pays invoice_total + gateway_fee.
// The webhook receives amount = invoice_total + gateway_fee.
// The webhook receives amount = invoice_total + gateway_fee.
// We then extract: net_to_vendor = invoice_total - platform_commission.
// Platform fee rate is now dynamic based on plan tier (2% for starter, 1% for pulse/elite).
// Local NGN gateway fee rate (1.4%). International is 3.8%.
// We use this to determine the true invoice total from the paid amount.
const LOCAL_GATEWAY_RATE  = 0.014;
const INTL_GATEWAY_RATE   = 0.038;
function getAmountTolerance(currency: string): number {
  return currency.toUpperCase() === "NGN" ? 500.0 : 2.0;
}

// ── Server-side price book ────────────────────────────────────────────────────
import { PRICE_BOOK } from "../_shared/price_book.ts";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // ── 1. Signature Verification ─────────────────────────────────────────────
  const signature = req.headers.get("verif-hash");
  const secretHash = Deno.env.get("FLUTTERWAVE_SECRET_HASH") || "NobleInvoice_Secure_2026";

  if (!signature || signature !== secretHash) {
    console.error("Invalid webhook signature. Got:", signature);
    await safeLog(supabase, payload, req.headers);
    return json({ error: "Unauthorized" }, 401);
  }

  // ── 2. Log the raw webhook ────────────────────────────────────────────────
  await safeLog(supabase, payload, req.headers);

  const data = payload.data as Record<string, unknown>;
  if (!data) {
    return json({ error: "No data in payload" }, 400);
  }

  const { status, tx_ref, amount, currency, id: transactionId } = data as {
    status: string;
    tx_ref: string;
    amount: number;
    currency: string;
    id: number;
  };

  const event = (payload.event as string) ?? "";
  const verifiedCurrency = (currency ?? "").toUpperCase();

  // ── 3. Handle transfer.completed / transfer.failed (payout confirmations) ─
  if (event === "transfer.completed" || event === "transfer.failed") {
    return await handleTransferUpdate(supabase, data, event);
  }

  if (status !== "successful") {
    console.log(`Ignored non-successful transaction: status=${status}, ref=${tx_ref}`);
    return json({ message: "Ignored — not successful" }, 200);
  }

  // ── 3.5. Strict Idempotency Check (Prevent Replay Attacks) ────────────────
  if (transactionId) {
    const { error: idempotencyErr } = await supabase.from('processed_webhooks').insert({
      transaction_id: String(transactionId),
      event_type: event || 'payment',
      provider: 'flutterwave'
    });

    if (idempotencyErr) {
      if (idempotencyErr.code === '23505') { // Postgres Unique Violation
        console.warn(`Idempotency: Transaction ${transactionId} already processed. Ignoring replay.`);
        return json({ message: "Transaction already processed" }, 200);
      }
      console.error("Idempotency insert failed:", idempotencyErr);
      return json({ error: "Idempotency lock failed" }, 500);
    }
  }

  // ── 4. Route by tx_ref prefix ────────────────────────────────────────────

  // SUBSCRIPTION: sub_{planId}_{userId}_{shortId}
  if (tx_ref?.startsWith("sub_")) {
    // ── Double-verify the transaction with FLW before any DB write ──────────
    const verified = await verifyFlutterwaveTransaction(transactionId);
    if (!verified.valid || verified.status !== "successful") {
      console.error(`[flw-webhook] FLW verification failed for tx ${transactionId}:`, verified);
      return json({ error: "Transaction verification failed" }, 402);
    }
    return await handleSubscription(supabase, tx_ref, verified.amount, verified.currency, transactionId);
  }

  // INVOICE PAYMENT: INV-{invoiceId}-{timestamp}
  if (tx_ref?.startsWith("INV-")) {
    // ── Double-verify the transaction with FLW before any DB write ──────────
    const verified = await verifyFlutterwaveTransaction(transactionId);
    if (!verified.valid || verified.status !== "successful") {
      console.error(`[flw-webhook] FLW verification failed for tx ${transactionId}:`, verified);
      return json({ error: "Transaction verification failed" }, 402);
    }
    return await handleInvoicePayment(supabase, tx_ref, verified.amount, verified.currency, transactionId);
  }

  // PAYG BUNDLE: payg-bundle-{userId}-{timestamp}
  if (tx_ref?.startsWith("payg-bundle-")) {
    // ── Double-verify the transaction with FLW before any DB write ──────────
    const verified = await verifyFlutterwaveTransaction(transactionId);
    if (!verified.valid || verified.status !== "successful") {
      console.error(`[flw-webhook] FLW verification failed for tx ${transactionId}:`, verified);
      return json({ error: "Transaction verification failed" }, 402);
    }
    return await handlePaygBundle(supabase, tx_ref, verified.amount, verified.currency, transactionId);
  }

  console.warn("Unknown tx_ref format:", tx_ref);
  return json({ message: "Unknown tx_ref format, ignored" }, 200);
});

// ── Invoice Payment Handler ───────────────────────────────────────────────────
async function handleInvoicePayment(
  supabase: ReturnType<typeof createClient>,
  tx_ref: string,
  amount: number,
  currency: string,
  transactionId: number
) {
  console.log("Processing invoice payment:", tx_ref);

  // Format: INV-{invoiceId}-{timestamp}
  const parts = tx_ref.split("-");
  const invoiceId = parts[1];

  if (!invoiceId) {
    console.error("Cannot parse invoice ID from tx_ref:", tx_ref);
    return json({ error: "Malformed invoice tx_ref" }, 400);
  }

  // Fetch invoice with owner info
  const { data: invoice, error: fetchErr } = await supabase
    .from("invoices")
    .select("id, user_id, total_amount, currency_code, status, invoice_number, teams(subscription_tier)")
    .eq("id", invoiceId)
    .single();

  if (fetchErr || !invoice) {
    console.error("Invoice not found for id:", invoiceId, fetchErr);
    return json({ error: "Invoice not found" }, 404);
  }

  // Idempotency: skip already-paid invoices
  if (invoice.status === "paid") {
    console.warn(`Invoice ${invoiceId} already marked as paid. Idempotent skip.`);
    return json({ message: "Invoice already paid — idempotent skip" }, 200);
  }

  // Currency cross-check
  const invoiceCurrency = (invoice.currency_code ?? "USD").toUpperCase();
  if (currency !== invoiceCurrency) {
    console.error(`Currency mismatch on invoice ${invoiceId}: invoice=${invoiceCurrency}, paid=${currency}`);
    return json({ error: `Currency mismatch: invoice is ${invoiceCurrency} but payment arrived in ${currency}` }, 402);
  }

  // Amount validation: the client paid invoice_total + gateway_fee (Option A).
  // So `amount` from FLW = invoice_total * (1 + gateway_rate).
  // We back-calculate the invoice_total and validate.
  const gatewayRate = currency === "NGN" ? LOCAL_GATEWAY_RATE : INTL_GATEWAY_RATE;
  const invoiceTotal = Number(invoice.total_amount);
  const expectedChargedAmount = parseFloat((invoiceTotal * (1 + gatewayRate)).toFixed(2));

  if (amount < expectedChargedAmount - AMOUNT_TOLERANCE) {
    console.error(`Underpayment on invoice ${invoiceId}: expected ~${expectedChargedAmount}, got ${amount}`);
    return json({ error: `Underpayment detected. Expected ~${expectedChargedAmount} ${currency}.` }, 402);
  }

  // Calculate the fees to log
  const gatewayFee      = parseFloat((invoiceTotal * gatewayRate).toFixed(2));
  
  // Dynamic Platform Fee: 2% for free/starter, 1% for pro/elite
  // Fallback to starter if unknown
  const userTier        = (invoice.teams as any)?.subscription_tier || "starter";
  const platformFeeRate = userTier === "starter" ? 0.02 : 0.01;
  const platformFee     = parseFloat((invoiceTotal * platformFeeRate).toFixed(2));

  // ── 1. Mark invoice as paid ───────────────────────────────────────────────
  const { error: updateErr } = await supabase
    .from("invoices")
    .update({
      status:                 "paid",
      paid_at:                new Date().toISOString(),
      updated_at:             new Date().toISOString(),
      payment_gateway:        "flutterwave",
      gateway_transaction_id: String(transactionId ?? ""),
    })
    .eq("id", invoiceId);

  if (updateErr) {
    console.error("Failed to mark invoice as paid:", updateErr);
    return json({ error: updateErr.message }, 500);
  }

  // ── 2. Credit vendor wallet via safe RPC ─────────────────────────────────
  const { data: walletResult, error: walletErr } = await supabase.rpc("credit_wallet", {
    p_user_id:       invoice.user_id,
    p_currency_code: invoiceCurrency,
    p_gross_amount:  amount,
    p_gateway_fee:   gatewayFee,
    p_platform_fee:  platformFee,
    p_reference:     tx_ref,
    p_description:   `Payment for Invoice #${invoice.invoice_number}`,
  });

  if (walletErr) {
    // Wallet credit failed — invoice is already marked paid, but log the error critically
    console.error("CRITICAL: Invoice marked paid but wallet credit failed:", walletErr);
    // Don't return an error to FLW (it would retry and double-mark). Log for manual resolution.
    return json({ status: "Invoice Paid", warning: "Wallet credit failed — manual review needed" }, 200);
  }

  // ── 3. Dispatch Webhooks ─────────────────────────────────────────────────
  // Fetch the team_id for the invoice to route webhooks
  const { data: teamData } = await supabase.from('teams').select('id').eq('owner_id', invoice.user_id).single();
  const teamId = teamData?.id || invoice.user_id;

  await supabase.functions.invoke('dispatch-webhooks', {
    body: {
      team_id: teamId,
      event_type: 'invoice.paid',
      payload: {
        invoice_id: invoiceId,
        invoice_number: invoice.invoice_number,
        amount: invoice.total_amount,
        currency: invoice.currency_code,
      }
    }
  }).catch(err => console.error("Webhook dispatch failed:", err));

  console.log(`✅ Invoice ${invoiceId} paid. Wallet credited:`, walletResult);
  return json({ status: "Invoice Paid", invoice_id: invoiceId, wallet: walletResult }, 200);
}

// Helper removed because transactionId is now passed explicitly

// ── PAYG Bundle Handler ───────────────────────────────────────────────────────
async function handlePaygBundle(
  supabase: ReturnType<typeof createClient>,
  tx_ref: string,
  amount: number,
  currency: string,
  flw_id: number
) {
  console.log("Processing PAYG bundle:", tx_ref);

  // Format: payg-bundle-{uuid}-{timestamp}
  // The UUID is 36 chars. We need to extract it from the tx_ref.
  // e.g. payg-bundle-550e8400-e29b-41d4-a716-446655440000-1714000000000
  const withoutPrefix = tx_ref.replace("payg-bundle-", "");
  // The UUID ends at position 36, the rest is the timestamp with a leading dash
  const userId = withoutPrefix.substring(0, 36);

  if (!userId || userId.length < 32) {
    console.error("Could not parse user ID from PAYG tx_ref:", tx_ref);
    return json({ error: "Invalid PAYG tx_ref" }, 400);
  }

  // Server-side amount validation
  const priceKey = `payg_bundle_${currency}`;
  const expectedAmount = PRICE_BOOK[priceKey];

  if (expectedAmount === undefined) {
    console.error(`No price found for key: ${priceKey}. Blocking PAYG top-up.`);
    return json({ error: `Unsupported price combination: ${priceKey}` }, 400);
  }

  const amountDiff = Math.abs(amount - expectedAmount);
  if (amountDiff > AMOUNT_TOLERANCE) {
    console.error(`Amount mismatch for ${priceKey}: expected ${expectedAmount} ${currency}, got ${amount} ${currency}`);
    return json({
      error: `Amount mismatch. Expected ~${expectedAmount} ${currency}, received ${amount} ${currency}.`,
    }, 402);
  }

  // Atomically upsert credits using RPC to avoid race conditions
  const { error: upsertErr } = await supabase.rpc("increment_payg_credits", {
    p_user_id: userId,
    p_invoice_credits:       1,
    p_business_card_credits: 1,
    p_qr_code_credits:       1,
    p_client_slots:          1,
  });

  if (upsertErr) {
    // Fallback: manual upsert
    const { data: existing } = await supabase
      .from("payg_entitlements")
      .select("invoice_credits, business_card_credits, qr_code_credits, client_slots")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      await supabase.from("payg_entitlements").update({
        invoice_credits:       existing.invoice_credits + 1,
        business_card_credits: existing.business_card_credits + 1,
        qr_code_credits:       existing.qr_code_credits + 1,
        client_slots:          existing.client_slots + 1,
      }).eq("user_id", userId);
    } else {
      await supabase.from("payg_entitlements").insert({
        user_id:               userId,
        invoice_credits:       1,
        business_card_credits: 1,
        qr_code_credits:       1,
        client_slots:          1,
      });
    }
  }

  await supabase.from("billing_history").insert({
    user_id:         userId,
    amount,
    currency,
    plan:            "payg_bundle",
    transaction_ref: tx_ref,
    transaction_id:  String(flw_id),
    status:          "success",
  });

  console.log(`✅ PAYG bundle credited to user ${userId}`);
  return json({ status: "success", user_id: userId }, 200);
}

// ── Subscription Handler ──────────────────────────────────────────────────────
async function handleSubscription(
  supabase: ReturnType<typeof createClient>,
  tx_ref: string,
  amount: number,
  currency: string,
  flw_transaction_id: number
) {
  console.log("Processing subscription:", tx_ref);

  // Format: sub_{planId}_{userId}_{shortId}
  // The upgrade page generates: sub_{planId}_{userId}_{shortId}
  // planId can be e.g. "pulse", "elite", "pulse_monthly", "elite_yearly"
  // We must extract the userId (UUID = 36 chars) reliably.
  // Strategy: find the UUID by regex scan of the whole tx_ref.
  const uuidMatch = tx_ref.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  if (!uuidMatch) {
    console.error("Cannot extract userId UUID from subscription tx_ref:", tx_ref);
    return json({ error: "Cannot parse userId from tx_ref: " + tx_ref }, 400);
  }

  const userId = uuidMatch[1];

  // Extract tier from the prefix before the UUID
  const prefixPart = tx_ref.substring(0, tx_ref.indexOf(userId) - 1); // e.g. "sub_pulse_monthly" or "sub_elite"
  const parts = prefixPart.split("_"); // ["sub", "pulse", "monthly"] or ["sub", "elite", "yearly"]
  let parsedTier = parts[1]?.toLowerCase() ?? "";
  const parsedPeriod = (parts[2]?.toLowerCase() === "yearly" || parts[2]?.toLowerCase() === "monthly")
    ? parts[2].toLowerCase() as "monthly" | "yearly"
    : "monthly"; // default to monthly if not present
  
  const isEarlyBird = parts[3]?.toLowerCase() === "earlybird";

  // Normalise legacy alias
  if (parsedTier === "pro") parsedTier = "pulse";

  if (!["pulse", "elite"].includes(parsedTier)) {
    console.error("Invalid tier parsed from tx_ref:", tx_ref, "tier:", parsedTier);
    return json({ error: "Invalid tier: " + parsedTier }, 400);
  }

  // Server-side amount validation
  const priceKey = isEarlyBird 
    ? `${parsedTier}_early_bird_${currency}` 
    : `${parsedTier}_${parsedPeriod}_${currency}`;
  const expectedAmount = PRICE_BOOK[priceKey];

  if (expectedAmount === undefined) {
    console.error(`No price found for key: ${priceKey}. Blocking upgrade.`);
    return json({ error: `Unsupported price combination: ${priceKey}` }, 400);
  }

  const amountDiff = Math.abs(amount - expectedAmount);
  if (amountDiff > AMOUNT_TOLERANCE) {
    console.error(`Amount mismatch for ${priceKey}: expected ${expectedAmount} ${currency}, got ${amount} ${currency}`);
    return json({
      error: `Amount mismatch. Expected ~${expectedAmount} ${currency}, received ${amount} ${currency}.`,
    }, 402);
  }

  const isYearly = parsedPeriod === "yearly";

  console.log(`Upgrading user ${userId} → ${parsedTier} (${parsedPeriod})`);

  const { error: rpcError } = await supabase.rpc("upgrade_user_subscription", {
    target_user_id: userId,
    target_tier:    parsedTier,
    is_yearly:      isYearly,
  });

  if (rpcError) {
    console.error("RPC upgrade_user_subscription failed:", rpcError);
    return json({ error: rpcError.message }, 500);
  }

  await supabase.from("billing_history").insert({
    user_id:         userId,
    amount,
    currency,
    plan:            parsedTier,
    billing_period:  isYearly ? "yearly" : "monthly",
    transaction_ref: tx_ref,
    transaction_id:  String(flw_transaction_id),
    status:          "success",
  });

  console.log(`✅ Subscription upgraded: ${userId} → ${parsedTier} (${parsedPeriod})`);
  return json({ status: "Subscription Upgraded", tier: parsedTier, user: userId }, 200);
}

// ── Transfer Update Handler (Withdrawal Confirmations) ───────────────────────
async function handleTransferUpdate(
  supabase: ReturnType<typeof createClient>,
  data:     Record<string, unknown>,
  event:    string
) {
  const reference = data.reference as string;
  const status = event === "transfer.completed" ? "completed" : "failed";

  console.log(`Processing transfer ${event}: reference=${reference}`);

  if (!reference) {
    return json({ error: "No reference in transfer event" }, 400);
  }

  const { data: result, error } = await supabase.rpc("confirm_withdrawal", {
    p_reference: reference,
    p_status:    status,
  });

  if (error) {
    console.error("confirm_withdrawal RPC failed:", error);
    return json({ error: error.message }, 500);
  }

  console.log(`✅ Transfer ${reference} marked as ${status}:`, result);
  return json({ status: "Transfer Updated", reference, result }, 200);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function safeLog(
  supabase: ReturnType<typeof createClient>,
  payload:  unknown,
  headers:  Headers
) {
  try {
    await supabase.from("webhook_logs").insert({
      payload,
      headers: Object.fromEntries(headers.entries()),
    });
  } catch (e) {
    console.warn("webhook_logs insert failed:", e);
  }
}
