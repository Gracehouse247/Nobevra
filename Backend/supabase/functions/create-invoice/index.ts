// supabase/functions/create-invoice/index.ts
//
// Enterprise-Grade Invoice Creation Edge Function
//
// Architecture:
//   Layer 1 — Validation: Auth, subscription limits, client, inventory
//   Layer 2 — Calculation: Pricing, discounts, taxes, processing fees
//   Layer 3 — Transaction: Calls create_invoice_transaction RPC (atomic DB write)
//   Layer 4 — Response: Returns invoice ID + payment link if enabled
//
// The actual background side-effects (email, WhatsApp, push notifications,
// analytics, CRM update) are handled asynchronously by the invoice-event-worker
// function, which is triggered by a Supabase Webhook on the invoice_events table.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Environment ───────────────────────────────────────────────────────────────
const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY         = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FLUTTERWAVE_SECRET_KEY    = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

// ── CORS ──────────────────────────────────────────────────────────────────────
import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

// ── Types ─────────────────────────────────────────────────────────────────────
interface InvoiceItem {
  description: string;
  quantity:    number;
  unit_price:  number;
  product_id?: number | null;
  total?:      number;
}

interface InvoicePayload {
  // Core
  client_id:      number;
  items:          InvoiceItem[];
  due_date:       string;
  status:         "draft" | "pending" | "sent";
  invoice_type?:  string;
  issue_date?:    string;
  currency_code?: string;
  notes?:         string;
  // Financials
  tax_rate?:       number;
  tax_type?:       "exclusive" | "inclusive";
  discount_type?:  "none" | "flat" | "percentage";
  discount_value?: number;
  // Metadata / Features
  metadata?: {
    pass_fees?:          boolean;
    enable_flutterwave?: boolean;
    frequency?:          string;
    custom_prefix?:      string;
    [key: string]:       unknown;
  };
}

// ── Main Handler ──────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  try {
    // ── Layer 1A: Authenticate User ─────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonError("Missing Authorization header", 401);

    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authErr } = await supabaseUser.auth.getUser();
    if (authErr || !user) return jsonError("Unauthorized", 401);

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ── Layer 1B: Parse & Basic Validate Request ────────────────────────────
    let payload: InvoicePayload;
    try {
      payload = await req.json();
    } catch {
      return jsonError("Invalid JSON body", 400);
    }

    if (!payload.client_id)                  return jsonError("client_id is required", 400);
    if (!payload.items || payload.items.length === 0) return jsonError("At least one line item is required", 400);
    if (!payload.due_date)                   return jsonError("due_date is required", 400);

    // ── Layer 1C: Resolve User's Team & Entitlements ─────────────────────────
    const { data: team, error: teamErr } = await supabaseAdmin
      .from("teams")
      .select("id, subscription_tier")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    const teamId = team?.id ?? null;
    const subscriptionTier = team?.subscription_tier || "explorer";
    if (!teamId) return jsonError("No team found for this user. Please complete onboarding.", 403);

    // ── Layer 1D: Validate Subscription Quota via Entitlement Engine ──────────
    let maxInvoices: number | null = 10; // Default starter limit
    try {
      const { data: entitlements } = await supabaseAdmin
        .rpc('resolve_team_entitlements', { p_team_id: teamId });
      if (entitlements && 'invoice.create' in entitlements) {
        maxInvoices = entitlements['invoice.create']; // null = unlimited
      }
    } catch (e) {
      console.warn('Could not resolve entitlements, defaulting to starter limits:', e);
    }

    if (maxInvoices !== null) {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const { count, error: countErr } = await supabaseAdmin
        .from("invoices")
        .select("id", { count: "exact", head: true })
        .eq("team_id", teamId)
        .gte("created_at", monthStart.toISOString());

      if (countErr) return jsonError("Failed to check quota", 500);
      if ((count ?? 0) >= maxInvoices) {
        return jsonError(
          `You have reached your monthly invoice limit of ${maxInvoices}. Please upgrade your plan to create unlimited invoices.`,
          429
        );
      }
    }

    // ── Layer 1E: Validate Client ───────────────────────────────────────────
    const { data: client, error: clientErr } = await supabaseAdmin
      .from("clients")
      .select("id, name, email, phone")
      .eq("id", payload.client_id)
      .eq("team_id", teamId)
      .single();

    if (clientErr || !client) return jsonError("Client not found or does not belong to your team", 404);

    // ── Layer 1F: Validate Products & Inventory ─────────────────────────────
    const productIds = payload.items
      .map((i) => i.product_id)
      .filter((id): id is number => id != null && id > 0);

    if (productIds.length > 0) {
      const { data: products, error: prodErr } = await supabaseAdmin
        .from("products")
        .select("id, name, track_inventory, quantity")
        .in("id", productIds)
        .eq("team_id", teamId);

      if (prodErr) return jsonError("Failed to validate products", 500);

      for (const item of payload.items) {
        if (!item.product_id) continue;
        const product = products?.find((p) => p.id === item.product_id);
        if (!product) return jsonError(`Product ID ${item.product_id} not found`, 404);
        if (product.track_inventory && product.quantity < item.quantity) {
          return jsonError(
            `Insufficient stock for "${product.name}". Available: ${product.quantity}, Requested: ${item.quantity}`,
            422
          );
        }
      }
    }

    // ── Layer 2: Calculations ───────────────────────────────────────────────
    const metadata    = payload.metadata ?? {};
    const invoiceType = payload.invoice_type ?? "standard";
    const taxRate     = payload.tax_rate     ?? 0;
    const taxType     = payload.tax_type     ?? "exclusive";
    const discType    = payload.discount_type  ?? "none";
    const discValue   = payload.discount_value ?? 0;
    const currency    = (payload.currency_code ?? "NGN").toUpperCase();

    // 2a. Inject processing fee line item if pass_fees enabled
    const finalItems: InvoiceItem[] = [...payload.items];
    if (metadata.pass_fees === true) {
      const rawSubtotal = finalItems.reduce((s, i) => s + i.quantity * i.unit_price, 0);
      const feeRate     = currency === "NGN" ? 0.014 : 0.038;
      const fee         = rawSubtotal * feeRate;
      if (fee > 0) {
        finalItems.push({
          description: `Payment Processing Fee (${(feeRate * 100).toFixed(1)}%)`,
          quantity:    1,
          unit_price:  fee,
        });
      }
    }

    // 2b. Compute subtotal
    let subtotal = finalItems.reduce((s, i) => s + i.quantity * i.unit_price, 0);

    // 2c. Apply discount
    let discountAmount = 0;
    if (discType === "flat")       discountAmount = discValue;
    else if (discType === "percentage") discountAmount = subtotal * (discValue / 100);
    subtotal -= discountAmount;

    // 2d. Apply tax
    let taxAmount = 0;
    let totalAmount: number;
    if (taxType === "exclusive") {
      taxAmount   = subtotal * (taxRate / 100);
      totalAmount = subtotal + taxAmount;
    } else {
      // Inclusive: tax is embedded in subtotal
      taxAmount   = subtotal - subtotal / (1 + taxRate / 100);
      totalAmount = subtotal;
    }

    // Stamp totals on each item
    for (const item of finalItems) {
      item.total = item.quantity * item.unit_price;
    }

    // 2e. Generate invoice number
    const now = new Date();
    const prefix = metadata.custom_prefix ?? "INV";
    const paddedMonth = String(now.getMonth() + 1).padStart(2, "0");
    const randSuffix  = crypto.randomUUID().split("-")[0].substring(0, 4).toUpperCase();
    const invoiceNumber = `${prefix}-${now.getFullYear()}${paddedMonth}-${randSuffix}`;

    // 2f. Recurring next_generation_date
    if (invoiceType === "recurring" && metadata.frequency) {
      metadata.next_generation_date = calcNextDate(now, metadata.frequency as string);
    }

    // ── Layer 3: Atomic Database Transaction (via RPC) ──────────────────────
    const { data: txResult, error: txErr } = await supabaseAdmin.rpc(
      "create_invoice_transaction",
      {
        p_user_id:         user.id,
        p_team_id:         teamId,
        p_client_id:       payload.client_id,
        p_invoice_number:  invoiceNumber,
        p_invoice_type:    invoiceType,
        p_status:          payload.status ?? "draft",
        p_issue_date:      payload.issue_date ? new Date(payload.issue_date).toISOString().split("T")[0] : now.toISOString().split("T")[0],
        p_due_date:        new Date(payload.due_date).toISOString().split("T")[0],
        p_currency_code:   currency,
        p_tax_rate:        taxRate,
        p_tax_type:        taxType,
        p_tax_amount:      parseFloat(taxAmount.toFixed(2)),
        p_discount_type:   discType,
        p_discount_value:  discValue,
        p_discount_amount: parseFloat(discountAmount.toFixed(2)),
        p_subtotal:        parseFloat(subtotal.toFixed(2)),
        p_total_amount:    parseFloat(totalAmount.toFixed(2)),
        p_notes:           payload.notes ?? null,
        p_metadata:        { ...metadata, was_premium: subscriptionTier !== "explorer" },
        p_items:           finalItems,
      }
    );

    if (txErr) {
      console.error("[create-invoice] RPC failed:", txErr);
      return jsonError(`Transaction failed: ${txErr.message}`, 500);
    }

    const invoiceId = (txResult as { invoice_id: number }).invoice_id;

    // ── Layer 4: Generate Payment Link (synchronous, if enabled) ───────────
    let paymentLink: string | null = null;
    if (metadata.enable_flutterwave === true && payload.status !== "draft") {
      try {
        paymentLink = await generateFlutterwaveLink({
          invoiceId,
          invoiceNumber,
          totalAmount: parseFloat(totalAmount.toFixed(2)),
          currency,
          client,
          supabaseAdmin,
          baseMetadata: { ...metadata, was_premium: subscriptionTier !== "explorer" }
        });
      } catch (e) {
        // Non-fatal: log but don't block invoice creation
        console.error("[create-invoice] Flutterwave link generation failed:", e);
      }
    }

    // ── Respond ─────────────────────────────────────────────────────────────
    return new Response(
      JSON.stringify({
        success:        true,
        invoice_id:     invoiceId,
        invoice_number: invoiceNumber,
        status:         payload.status,
        total_amount:   parseFloat(totalAmount.toFixed(2)),
        currency_code:  currency,
        payment_link:   paymentLink,
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (e) {
    console.error("[create-invoice] Unhandled error:", e);
    return jsonError(String(e), 500);
  }
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcNextDate(from: Date, frequency: string): string {
  const d = new Date(from);
  switch (frequency.toLowerCase()) {
    case "weekly":    d.setDate(d.getDate() + 7);   break;
    case "bi-weekly": d.setDate(d.getDate() + 14);  break;
    case "monthly":   d.setMonth(d.getMonth() + 1); break;
    case "quarterly": d.setMonth(d.getMonth() + 3); break;
    case "yearly":    d.setFullYear(d.getFullYear() + 1); break;
    default:          d.setMonth(d.getMonth() + 1);
  }
  return d.toISOString().split("T")[0];
}

async function generateFlutterwaveLink(opts: {
  invoiceId:     number;
  invoiceNumber: string;
  totalAmount:   number;
  currency:      string;
  client:        { email: string; name: string; phone?: string };
  // deno-lint-ignore no-explicit-any
  supabaseAdmin: any;
  baseMetadata: Record<string, any>;
}): Promise<string> {
  const { invoiceId, invoiceNumber, totalAmount, currency, client, baseMetadata } = opts;
  const txRef = `INV-${invoiceId}-${Date.now()}`;

  const fwRes = await fetch("https://api.flutterwave.com/v3/payments", {
    method:  "POST",
    headers: {
      Authorization:  `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref:       txRef,
      amount:       totalAmount,
      currency,
      redirect_url: `${SUPABASE_URL}/functions/v1/view-invoice?invoice_id=${invoiceId}`,
      customer: {
        email:       client.email,
        name:        client.name,
        phonenumber: client.phone,
      },
      customizations: {
        title:       `Invoice #${invoiceNumber}`,
        description: `Secure payment for Invoice #${invoiceNumber}`,
        logo:        "https://iyvikdxzcpcjivmbiwik.supabase.co/storage/v1/object/public/branding/logo.png",
      },
      meta: { invoice_id: invoiceId },
    }),
  });

  const fwData = await fwRes.json();
  if (fwData.status !== "success") throw new Error(fwData.message ?? "Flutterwave failed");

  // Persist the payment link back to the invoice metadata, merging with existing metadata
  await opts.supabaseAdmin
    .from("invoices")
    .update({ metadata: { ...baseMetadata, payment_link: fwData.data.link, flw_tx_ref: txRef } })
    .eq("id", invoiceId);

  return fwData.data.link as string;
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
