// supabase/functions/update-invoice/index.ts
//
// Enterprise-Grade Invoice Update Edge Function
//
// Architecture:
//   Layer 1 — Auth: Validate the JWT, resolve user + team ownership
//   Layer 1B — Ownership: Confirm the invoice belongs to the user's team
//   Layer 1C — Entitlements: Check feature flags (recurring, templates, etc.)
//   Layer 1D — Inventory: Re-validate stock for updated line items
//   Layer 2 — Calculation: Recompute subtotal, discount, tax, total
//   Layer 3 — Transaction: Calls update_invoice_secure RPC (atomic DB write)
//   Layer 4 — Response: Returns updated invoice data
//
// Closes audit finding B09 — updateInvoice previously bypassed all quota/inventory checks.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Environment ────────────────────────────────────────────────────────────────
const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY         = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ── CORS ───────────────────────────────────────────────────────────────────────
import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

// ── Types ──────────────────────────────────────────────────────────────────────
interface InvoiceItem {
  description: string;
  quantity:    number;
  unit_price:  number;
  product_id?: number | null;
  total?:      number;
}

interface UpdateInvoicePayload {
  invoice_id:     number;
  client_id:      number;
  items:          InvoiceItem[];
  due_date:       string;
  issue_date?:    string;
  status:         "draft" | "pending" | "sent";
  invoice_type?:  string;
  currency_code?: string;
  notes?:         string;
  invoice_number?: string;
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
    bank_name?:          string;
    account_name?:       string;
    account_number?:     string;
    signature_url?:      string;
    [key: string]:       unknown;
  };
  // Optimistic concurrency control
  last_updated_at?: string;
}

// ── Main Handler ───────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  try {
    // ── Layer 1: Authenticate User ─────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonError("Missing Authorization header", 401);

    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authErr } = await supabaseUser.auth.getUser();
    if (authErr || !user) return jsonError("Unauthorized", 401);

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // ── Parse & Basic Validate Request ────────────────────────────────────
    let payload: UpdateInvoicePayload;
    try {
      payload = await req.json();
    } catch {
      return jsonError("Invalid JSON body", 400);
    }

    if (!payload.invoice_id) return jsonError("invoice_id is required", 400);
    if (!payload.client_id)  return jsonError("client_id is required", 400);
    if (!payload.items || payload.items.length === 0)
      return jsonError("At least one line item is required", 400);
    if (!payload.due_date) return jsonError("due_date is required", 400);

    // ── Layer 1B: Resolve User's Team ──────────────────────────────────────
    const { data: team } = await supabaseAdmin
      .from("teams")
      .select("id")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    const teamId = team?.id ?? null;
    if (!teamId) return jsonError("No team found for this user. Please complete onboarding.", 403);

    // ── Layer 1B2: Confirm Invoice Belongs to Team ─────────────────────────
    const { data: existingInvoice, error: invoiceFetchErr } = await supabaseAdmin
      .from("invoices")
      .select("id, team_id, metadata, updated_at, status")
      .eq("id", payload.invoice_id)
      .single();

    if (invoiceFetchErr || !existingInvoice) {
      return jsonError("Invoice not found", 404);
    }
    if (existingInvoice.team_id !== teamId) {
      return jsonError("Forbidden: Invoice does not belong to your team", 403);
    }

    // ── Optimistic Concurrency Control ────────────────────────────────────
    if (payload.last_updated_at) {
      const serverTs = new Date(existingInvoice.updated_at).getTime();
      const clientTs = new Date(payload.last_updated_at).getTime();
      if (serverTs > clientTs) {
        return jsonError(
          "Conflict: This invoice was modified by another session. Please reload and try again.",
          409
        );
      }
    }

    // ── Layer 1C: Validate Feature Entitlements ────────────────────────────
    // If updating to recurring type, check if that feature is enabled
    const invoiceType = payload.invoice_type ?? "standard";
    if (invoiceType === "recurring") {
      try {
        const { data: entitlements } = await supabaseAdmin
          .rpc("resolve_team_entitlements", { p_team_id: teamId });
        const canRecur = entitlements?.["invoice.recurring"] ?? false;
        if (!canRecur) {
          return jsonError(
            "Recurring invoices are not available on your current plan. Please upgrade to enable this feature.",
            403
          );
        }
      } catch (e) {
        console.warn("[update-invoice] Could not resolve entitlements:", e);
      }
    }

    // ── Layer 1D: Validate Client Belongs to Team ──────────────────────────
    const { data: client, error: clientErr } = await supabaseAdmin
      .from("clients")
      .select("id, name, email, phone")
      .eq("id", payload.client_id)
      .eq("team_id", teamId)
      .single();

    if (clientErr || !client) {
      return jsonError("Client not found or does not belong to your team", 404);
    }

    // ── Layer 1E: Validate Products & Inventory ────────────────────────────
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

      // For updates: we need to account for items that were already on this invoice
      // so we compare against the current saved items to compute the net quantity delta
      const { data: existingItems } = await supabaseAdmin
        .from("invoice_items")
        .select("product_id, quantity")
        .eq("invoice_id", payload.invoice_id);

      const existingQtyMap: Record<number, number> = {};
      for (const ei of existingItems ?? []) {
        if (ei.product_id) {
          existingQtyMap[ei.product_id] = (existingQtyMap[ei.product_id] || 0) + Number(ei.quantity);
        }
      }

      for (const item of payload.items) {
        if (!item.product_id) continue;
        const product = products?.find((p) => p.id === item.product_id);
        if (!product) return jsonError(`Product ID ${item.product_id} not found`, 404);

        if (product.track_inventory) {
          const previousQty = existingQtyMap[item.product_id] || 0;
          const netChange   = item.quantity - previousQty; // how many MORE we need
          if (netChange > 0 && product.quantity < netChange) {
            return jsonError(
              `Insufficient stock for "${product.name}". Available: ${product.quantity}, Additional Required: ${netChange}`,
              422
            );
          }
        }
      }
    }

    // ── Layer 2: Calculations ──────────────────────────────────────────────
    const metadata    = payload.metadata ?? {};
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
    if (discType === "flat")            discountAmount = discValue;
    else if (discType === "percentage") discountAmount = subtotal * (discValue / 100);
    subtotal -= discountAmount;

    // 2d. Apply tax
    let taxAmount = 0;
    let totalAmount: number;
    if (taxType === "exclusive") {
      taxAmount   = subtotal * (taxRate / 100);
      totalAmount = subtotal + taxAmount;
    } else {
      taxAmount   = subtotal - subtotal / (1 + taxRate / 100);
      totalAmount = subtotal;
    }

    // Stamp totals on each item
    for (const item of finalItems) {
      item.total = item.quantity * item.unit_price;
    }

    // 2e. Recurring next_generation_date
    if (invoiceType === "recurring" && metadata.frequency) {
      metadata.next_generation_date = calcNextDate(new Date(), metadata.frequency as string);
    }

    // Merge metadata — always preserve existing keys (e.g. payment_link, flw_tx_ref)
    const mergedMetadata = {
      ...(existingInvoice.metadata || {}),
      ...metadata,
    };

    // ── Layer 3: Atomic Database Transaction (via secure RPC) ──────────────
    const { data: txResult, error: txErr } = await supabaseAdmin.rpc(
      "update_invoice_secure",
      {
        p_invoice_id:     payload.invoice_id,
        p_team_id:        teamId,
        p_client_id:      payload.client_id,
        p_invoice_number: payload.invoice_number ?? null,
        p_invoice_type:   invoiceType,
        p_status:         payload.status ?? "draft",
        p_issue_date:     payload.issue_date ?? new Date().toISOString().split("T")[0],
        p_due_date:       new Date(payload.due_date).toISOString().split("T")[0],
        p_currency_code:  currency,
        p_tax_rate:       taxRate,
        p_tax_type:       taxType,
        p_tax_amount:     parseFloat(taxAmount.toFixed(2)),
        p_discount_type:  discType,
        p_discount_value: discValue,
        p_discount_amount:parseFloat(discountAmount.toFixed(2)),
        p_subtotal:       parseFloat(subtotal.toFixed(2)),
        p_total_amount:   parseFloat(totalAmount.toFixed(2)),
        p_notes:          payload.notes ?? null,
        p_metadata:       mergedMetadata,
        p_items:          finalItems,
      }
    );

    if (txErr) {
      console.error("[update-invoice] RPC failed:", txErr);
      return jsonError(`Transaction failed: ${txErr.message}`, 500);
    }

    // ── Respond ────────────────────────────────────────────────────────────
    return new Response(
      JSON.stringify({
        success:      true,
        invoice_id:   payload.invoice_id,
        status:       payload.status,
        total_amount: parseFloat(totalAmount.toFixed(2)),
        currency_code: currency,
        invoice:      txResult,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (e) {
    console.error("[update-invoice] Unhandled error:", e);
    return jsonError(String(e), 500);
  }
});

// ── Helpers ────────────────────────────────────────────────────────────────────

function calcNextDate(from: Date, frequency: string): string {
  const d = new Date(from);
  switch (frequency.toLowerCase()) {
    case "weekly":    d.setDate(d.getDate() + 7);        break;
    case "bi-weekly": d.setDate(d.getDate() + 14);       break;
    case "monthly":   d.setMonth(d.getMonth() + 1);      break;
    case "quarterly": d.setMonth(d.getMonth() + 3);      break;
    case "yearly":    d.setFullYear(d.getFullYear() + 1); break;
    default:          d.setMonth(d.getMonth() + 1);
  }
  return d.toISOString().split("T")[0];
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
