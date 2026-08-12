// supabase/functions/invoice-event-worker/index.ts
//
// Async Background Worker for Invoice Domain Events
//
// This function is triggered by a Supabase Webhook whenever a new row is
// inserted into the `invoice_events` table. It processes the `InvoiceCreated`
// event and fans out to all downstream integrations in parallel:
//
//   - 📧 Email Notification  (via SMTP)
//   - 💬 WhatsApp Message    (wa.me click-to-chat link — opened by user on client)
//   - 🔔 Push Notification   (TODO: integrate FCM/APNs)
//   - 📊 Analytics           (TODO: integrate PostHog/Mixpanel)
//   - 🔍 Search Indexing     (TODO: integrate Algolia/Meilisearch)
//   - 📝 CRM Timeline Update (marks event on client's activity feed)
//   - 📈 Dashboard Refresh   (handled client-side via Supabase Realtime)

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// ── Environment ───────────────────────────────────────────────────────────────
const SUPABASE_URL              = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// SMTP config — Using values from your Auth SMTP settings.
// IMPORTANT: You still need to set SMTP_PASSWORD as a secret in the Edge Functions settings!
const SMTP_HOST     = Deno.env.get("SMTP_HOST")     ?? "mail.noblesworld.com.ng";
const SMTP_PORT     = parseInt(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USER     = Deno.env.get("SMTP_USER")     ?? "invoice@noblesworld.com.ng";
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD") ?? "123NobleWORLD!@#";
const SMTP_FROM     = Deno.env.get("SMTP_FROM")     ?? "invoice@noblesworld.com.ng";
const NOBLE_NAME    = "NobleInvoice - The Smart Workspace For Freelancers & Agencies";

import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let webhookBody: { type: string; record: Record<string, unknown> };
  try {
    webhookBody = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (webhookBody.type !== "INSERT") {
    return new Response(JSON.stringify({ skipped: true, reason: "Not an INSERT" }), { status: 200 });
  }

  const event        = webhookBody.record;
  const eventType    = event.event_type as string;
  const eventId      = event.id as number;
  const eventPayload = event.payload as Record<string, unknown>;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    switch (eventType) {
      case "InvoiceCreated":
        await handleInvoiceCreated(supabase, eventPayload);
        break;
      default:
        console.log(`[invoice-event-worker] No handler for event type: ${eventType}`);
    }

    await supabase
      .from("invoice_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("id", eventId);

    return new Response(JSON.stringify({ success: true, event_id: eventId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error(`[invoice-event-worker] Handler failed for event ${eventId}:`, e);
    await supabase
      .from("invoice_events")
      .update({ error: String(e) })
      .eq("id", eventId);

    return new Response(JSON.stringify({ success: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// ── Event Handlers ────────────────────────────────────────────────────────────

// deno-lint-ignore no-explicit-any
async function handleInvoiceCreated(supabase: any, payload: Record<string, unknown>) {
  const invoiceId    = payload.invoice_id    as number;
  const clientId     = payload.client_id     as number;
  const userId       = payload.user_id       as string;
  const teamId       = payload.team_id       as string;
  const totalAmount  = payload.total_amount  as number;
  const currencyCode = payload.currency_code as string;
  const invoiceNum   = payload.invoice_number as string;
  const status       = payload.status         as string;

  // Only send notifications for non-draft invoices
  if (status === "draft") {
    console.log(`[invoice-event-worker] Invoice ${invoiceId} is a draft. Skipping notifications.`);
    return;
  }

  const [clientRes, profileRes] = await Promise.all([
    supabase.from("clients").select("name, email, phone").eq("id", clientId).single(),
    supabase.from("profiles").select("full_name, business_name").eq("id", userId).single(),
  ]);

  const client  = clientRes.data;
  const profile = profileRes.data;

  if (!client) {
    console.warn(`[invoice-event-worker] Client ${clientId} not found. Skipping notifications.`);
    return;
  }

  const senderName = profile?.business_name ?? profile?.full_name ?? "Noble Invoice";

  // Fan out to all integrations in parallel
  await Promise.allSettled([
    sendSmtpEmail({ client, invoiceNum, totalAmount, currencyCode, senderName, invoiceId }),
    updateCrmTimeline({ supabase, clientId, teamId, invoiceId, invoiceNum, totalAmount, currencyCode }),
    // TODO: sendPushNotification(...)
    // TODO: addToAnalytics(...)
    // TODO: indexInSearch(...)
    // NOTE: WhatsApp is user-initiated via wa.me link on the client app (web & mobile).
    //       No server-side WhatsApp API key is needed — the user clicks "Send via WhatsApp"
    //       and it opens WhatsApp pre-filled with the invoice message. See invoice detail
    //       pages on both web and mobile for the implementation.
  ]);
}

// ── SMTP Email ────────────────────────────────────────────────────────────────
async function sendSmtpEmail(opts: {
  client:       { name: string; email: string };
  invoiceNum:   string;
  totalAmount:  number;
  currencyCode: string;
  senderName:   string;
  invoiceId:    number;
}) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn("[invoice-event-worker] SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in secrets.");
    return;
  }
  if (!opts.client.email) {
    console.warn("[invoice-event-worker] Client has no email. Skipping.");
    return;
  }

  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency", currency: opts.currencyCode, minimumFractionDigits: 2,
  }).format(opts.totalAmount);

  const invoiceUrl = `${SUPABASE_URL}/functions/v1/view-invoice?invoice_id=${opts.invoiceId}`;

  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <div style="background:linear-gradient(135deg,#6C63FF 0%,#4F46E5 100%);padding:32px 40px;">
        <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Invoice #${opts.invoiceNum}</h1>
        <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">From ${opts.senderName}</p>
      </div>
      <div style="padding:32px 40px;">
        <p style="color:#1a1a2e;font-size:15px;margin:0 0 8px;">Hi <strong>${opts.client.name}</strong>,</p>
        <p style="color:#4a4a6a;font-size:14px;line-height:1.6;margin:0 0 24px;">
          You have a new invoice waiting for you. Please review it and make your payment at your earliest convenience.
        </p>
        <div style="background:#f8f7ff;border-radius:12px;padding:20px 24px;margin-bottom:28px;border-left:4px solid #6C63FF;">
          <p style="margin:0;font-size:12px;color:#6C63FF;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Amount Due</p>
          <p style="margin:6px 0 0;font-size:28px;font-weight:800;color:#1a1a2e;">${formatted}</p>
        </div>
        <a href="${invoiceUrl}" style="display:inline-block;background:linear-gradient(135deg,#6C63FF,#4F46E5);color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.3px;">
          View &amp; Pay Invoice →
        </a>
      </div>
      <div style="padding:20px 40px;border-top:1px solid #f0f0f8;">
        <p style="color:#9999b3;font-size:12px;margin:0;">Powered by <strong>Noble Invoice</strong> · Sent on behalf of ${opts.senderName}</p>
      </div>
    </div>
  `;

  const client = new SmtpClient();
  await client.connectTLS({ hostname: SMTP_HOST, port: SMTP_PORT, username: SMTP_USER, password: SMTP_PASSWORD });

  await client.send({
    from:    `${opts.senderName} via Noble Invoice <${SMTP_FROM}>`,
    to:      opts.client.email,
    subject: `Invoice #${opts.invoiceNum} — ${formatted}`,
    content: `Hi ${opts.client.name},\n\nYou have a new invoice for ${formatted} from ${opts.senderName}.\n\nView and pay here:\n${invoiceUrl}\n\nThank you!`,
    html:    htmlBody,
  });

  await client.close();
  console.log(`[invoice-event-worker] SMTP email sent to ${opts.client.email}`);
}

// ── CRM Timeline Update ───────────────────────────────────────────────────────
async function updateCrmTimeline(opts: {
  // deno-lint-ignore no-explicit-any
  supabase:     any;
  clientId:     number;
  teamId:       string;
  invoiceId:    number;
  invoiceNum:   string;
  totalAmount:  number;
  currencyCode: string;
}) {
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency", currency: opts.currencyCode, minimumFractionDigits: 2,
  }).format(opts.totalAmount);

  const { error } = await opts.supabase.from("client_crm_timeline").insert({
    client_id:    opts.clientId,
    team_id:      opts.teamId,
    event_type:   "invoice_created",
    title:        `Invoice #${opts.invoiceNum} Created`,
    description:  `An invoice for ${formatted} was created and sent.`,
    reference_id: opts.invoiceId.toString(),
    metadata:     { invoice_id: opts.invoiceId, amount: opts.totalAmount },
  });

  if (error) {
    console.error("[invoice-event-worker] CRM timeline update failed:", error.message);
  } else {
    console.log(`[invoice-event-worker] CRM timeline updated for client ${opts.clientId}`);
  }
}


// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // This endpoint is called by a Supabase Webhook. It sends the record as JSON.
  let webhookBody: { type: string; record: Record<string, unknown> };
  try {
    webhookBody = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Only process INSERT events on invoice_events
  if (webhookBody.type !== "INSERT") {
    return new Response(JSON.stringify({ skipped: true, reason: "Not an INSERT" }), { status: 200 });
  }

  const event     = webhookBody.record;
  const eventType = event.event_type as string;
  const eventId   = event.id as number;
  const eventPayload = event.payload as Record<string, unknown>;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Route to the correct handler based on event type
    switch (eventType) {
      case "InvoiceCreated":
        await handleInvoiceCreated(supabase, eventPayload);
        break;
      default:
        console.log(`[invoice-event-worker] No handler for event type: ${eventType}`);
    }

    // Mark the event as processed
    await supabase
      .from("invoice_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("id", eventId);

    return new Response(JSON.stringify({ success: true, event_id: eventId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error(`[invoice-event-worker] Handler failed for event ${eventId}:`, e);
    // Record the error but do not mark as processed so it can be retried
    await supabase
      .from("invoice_events")
      .update({ error: String(e) })
      .eq("id", eventId);

    return new Response(JSON.stringify({ success: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// ── Event Handlers ────────────────────────────────────────────────────────────

// deno-lint-ignore no-explicit-any
async function handleInvoiceCreated(supabase: any, payload: Record<string, unknown>) {
  const invoiceId    = payload.invoice_id    as number;
  const clientId     = payload.client_id     as number;
  const userId       = payload.user_id       as string;
  const teamId       = payload.team_id       as string;
  const totalAmount  = payload.total_amount  as number;
  const currencyCode = payload.currency_code as string;
  const invoiceNum   = payload.invoice_number as string;
  const status       = payload.status         as string;

  // Only send notifications for non-draft invoices
  if (status === "draft") {
    console.log(`[invoice-event-worker] Invoice ${invoiceId} is a draft. Skipping notifications.`);
    return;
  }

  // Fetch client & profile data needed for notifications
  const [clientRes, profileRes] = await Promise.all([
    supabase.from("clients").select("name, email, phone").eq("id", clientId).single(),
    supabase.from("profiles").select("full_name, business_name").eq("id", userId).single(),
  ]);

  const client  = clientRes.data;
  const profile = profileRes.data;

  if (!client) {
    console.warn(`[invoice-event-worker] Client ${clientId} not found. Skipping notifications.`);
    return;
  }

  const senderName = profile?.business_name ?? profile?.full_name ?? "Noble Invoice";

  // ── Fan out to all integrations in parallel ────────────────────────────────
  await Promise.allSettled([
    sendEmailNotification({ client, invoiceNum, totalAmount, currencyCode, senderName, invoiceId }),
    updateCrmTimeline({ supabase, clientId, teamId, invoiceId, invoiceNum, totalAmount, currencyCode }),
    // TODO: addToAnalytics(...)
    // TODO: indexInSearch(...)
    // TODO: sendWhatsAppNotification(...)
    // TODO: sendPushNotification(...)
  ]);
}

// ── Email Notification (Resend) ───────────────────────────────────────────────
async function sendEmailNotification(opts: {
  client:        { name: string; email: string };
  invoiceNum:    string;
  totalAmount:   number;
  currencyCode:  string;
  senderName:    string;
  invoiceId:     number;
}) {
  if (!RESEND_API_KEY) {
    console.warn("[invoice-event-worker] RESEND_API_KEY not configured. Skipping email.");
    return;
  }
  if (!opts.client.email) {
    console.warn("[invoice-event-worker] Client has no email. Skipping email.");
    return;
  }

  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency", currency: opts.currencyCode, minimumFractionDigits: 2,
  }).format(opts.totalAmount);

  const res = await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from:    `${opts.senderName} via Noble Invoice <invoices@nobleinvoice.com>`,
      to:      [opts.client.email],
      subject: `Invoice #${opts.invoiceNum} — ${formatted}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 32px; color: #1a1a2e;">
          <h2 style="color: #6C63FF;">Invoice #${opts.invoiceNum}</h2>
          <p>Hi ${opts.client.name},</p>
          <p>You have received a new invoice from <strong>${opts.senderName}</strong> for <strong>${formatted}</strong>.</p>
          <p>Please review and make your payment at your earliest convenience.</p>
          <a href="${SUPABASE_URL}/functions/v1/view-invoice?invoice_id=${opts.invoiceId}"
             style="display:inline-block;background:#6C63FF;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px;">
            View Invoice
          </a>
          <p style="margin-top:32px; color: #999; font-size:12px;">Powered by Noble Invoice</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[Resend] Email failed: ${err}`);
  }

  console.log(`[invoice-event-worker] Email sent to ${opts.client.email} for invoice ${opts.invoiceNum}`);
}

// ── CRM Timeline Update ───────────────────────────────────────────────────────
async function updateCrmTimeline(opts: {
  // deno-lint-ignore no-explicit-any
  supabase:     any;
  clientId:     number;
  teamId:       string;
  invoiceId:    number;
  invoiceNum:   string;
  totalAmount:  number;
  currencyCode: string;
}) {
  const formatted = new Intl.NumberFormat("en-NG", {
    style: "currency", currency: opts.currencyCode, minimumFractionDigits: 2,
  }).format(opts.totalAmount);

  const { error } = await opts.supabase.from("client_crm_timeline").insert({
    client_id:    opts.clientId,
    team_id:      opts.teamId,
    event_type:   "invoice_created",
    title:        `Invoice #${opts.invoiceNum} Created`,
    description:  `An invoice for ${formatted} was created and sent.`,
    reference_id: opts.invoiceId.toString(),
    metadata:     { invoice_id: opts.invoiceId, amount: opts.totalAmount },
  });

  if (error) {
    console.error("[invoice-event-worker] CRM timeline update failed:", error.message);
  } else {
    console.log(`[invoice-event-worker] CRM timeline updated for client ${opts.clientId}`);
  }
}
