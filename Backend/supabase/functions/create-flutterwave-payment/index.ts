// supabase/functions/create-flutterwave-payment/index.ts
//
// Creates a Flutterwave payment link for an invoice.
//
// Fee Strategy: Option A — Gateway fee is passed to the payer.
//   A ₦100,000 invoice is presented to the client as ₦101,400 (+ 1.4% local fee).
//   The vendor's wallet ultimately receives: ₦100,000 - 1% platform commission = ₦99,000.
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL             = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FLUTTERWAVE_SECRET_KEY   = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

// ── Fee rates ─────────────────────────────────────────────────────────────────
// The gateway fee is passed TO the payer on top of the invoice amount.
const LOCAL_GATEWAY_RATE = 0.014;  // Nigerian NGN local transactions
const INTL_GATEWAY_RATE  = 0.038;  // International / USD transactions

import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ── 1. Authenticate the calling user ─────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonError("Missing Authorization header", 401);
    }

    const supabaseUser = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authErr } = await supabaseUser.auth.getUser();
    if (authErr || !user) {
      return jsonError("Unauthorized", 401);
    }

    // ── 2. Parse invoice_id from request ─────────────────────────────────────
    let invoice_id: string | null = null;
    if (req.method === "POST") {
      const body = await req.json();
      invoice_id = body.invoice_id ?? null;
    } else {
      const url = new URL(req.url);
      invoice_id = url.searchParams.get("invoice_id");
    }

    if (!invoice_id) {
      return jsonError("Missing invoice_id", 400);
    }

    // ── 3. Fetch invoice, client info ─────────────────────────────────────────
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: invoice, error: invErr } = await supabaseAdmin
      .from("invoices")
      .select("*, clients(*), teams(id, flw_subaccount_id)")
      .eq("id", invoice_id)
      .single();

    if (invErr || !invoice) {
      console.error("Invoice fetch error:", invErr);
      return jsonError("Invoice not found", 404);
    }

    // ── 4. Authorisation check (POST only) ────────────────────────────────────
    if (req.method === "POST" && invoice.user_id !== user.id) {
      const { data: membership } = await supabaseAdmin
        .from("team_members")
        .select("id")
        .eq("team_id", invoice.team_id)
        .eq("user_id", user.id)
        .single();

      if (!membership) {
        return jsonError("Forbidden: you do not own this invoice", 403);
      }
    }

    // ── 5. Calculate fees — Option A: Fee passed to payer ────────────────────
    const invoiceTotal: number = Number(invoice.total_amount);
    const currency: string     = (invoice.currency_code || "NGN").toUpperCase();
    const gatewayRate          = currency === "NGN" ? LOCAL_GATEWAY_RATE : INTL_GATEWAY_RATE;
    const gatewayFee           = parseFloat((invoiceTotal * gatewayRate).toFixed(2));

    // The client is charged: invoice total + gateway fee
    const amountToCharge = parseFloat((invoiceTotal + gatewayFee).toFixed(2));

    // ── 6. Build Flutterwave payload ──────────────────────────────────────────
    const txRef = `INV-${invoice_id}-${Date.now()}`;

    const payload: Record<string, unknown> = {
      tx_ref:       txRef,
      amount:       amountToCharge,
      currency,
      redirect_url: `${SUPABASE_URL}/functions/v1/view-invoice?token=${invoice.tracking_token}`,
      customer: {
        email:       invoice.clients?.email ?? "",
        name:        invoice.clients?.name ?? "Customer",
        phonenumber: invoice.clients?.phone ?? undefined,
      },
      customizations: {
        title:       `Invoice #${invoice.invoice_number}`,
        description: `Secure payment for Invoice #${invoice.invoice_number} (includes ${(gatewayRate * 100).toFixed(1)}% processing fee)`,
        logo:        "https://iyvikdxzcpcjivmbiwik.supabase.co/storage/v1/object/public/branding/logo.png",
      },
      meta: {
        invoice_id,
        original_amount: invoiceTotal,
        gateway_fee:     gatewayFee,
        gateway_rate:    gatewayRate,
      },
    };

    // ── 7. Initiate payment with Flutterwave ──────────────────────────────────
    const fwRes = await fetch("https://api.flutterwave.com/v3/payments", {
      method:  "POST",
      headers: {
        Authorization:  `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const fwData = await fwRes.json();

    if (fwData.status !== "success") {
      console.error("Flutterwave initiation failed:", fwData);
      throw new Error(fwData.message || "Flutterwave initiation failed");
    }

    const paymentLink: string = fwData.data.link;

    // ── 8. Respond ────────────────────────────────────────────────────────────
    if (req.method === "GET") {
      return new Response(null, {
        status:  302,
        headers: { ...corsHeaders, Location: paymentLink },
      });
    }

    return new Response(
      JSON.stringify({
        payment_link: paymentLink,
        tx_ref:       txRef,
        amount_to_charge: amountToCharge,
        invoice_total:    invoiceTotal,
        gateway_fee:      gatewayFee,
        currency,
      }),
      {
        status:  200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (e) {
    console.error("create-flutterwave-payment error:", e);
    return jsonError(String(e), 500);
  }
});

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
