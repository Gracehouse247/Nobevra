import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response("<h1>Access Denied</h1><p>Missing tracking token.</p>", {
        status: 400,
        headers: { "Content-Type": "text/html" },
      });
    }

    // 1. Fetch Invoice Details using Tracking Token
    const { data: invoice, error: invErr } = await supabase
      .from("invoices")
      .select("*, clients(*), invoice_items(*)")
      .eq("tracking_token", token)
      .single();

    if (invErr || !invoice) {
      return new Response("<h1>Invoice Not Found</h1>", {
        status: 404,
        headers: { "Content-Type": "text/html" },
      });
    }

    // 2. Fetch Business Profile (Branding)
    // We use the user_id from the invoice to find the owner's profile
    const { data: profile, error: profErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", invoice.user_id)
      .single();

    const biz = profile || {};

    // 3. Update Tracking Metrics (Automated Read Receipt)
    const isFirstView = !invoice.opened_at;
    await supabase
      .from("invoices")
      .update({
        opened_at: invoice.opened_at || new Date().toISOString(),
        view_count: (invoice.view_count || 0) + 1,
      })
      .eq("id", invoice.id);

    // 4. Formatting Helpers
    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
    const formatCurrency = (amount: number, code: string) => new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code || "USD",
    }).format(amount);

    // 5. Render HTML Template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${invoice.invoice_number} - ${biz.business_name || 'Nobevra'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${biz.brand_color || '#2563EB'};
            --primary-soft: ${biz.brand_color ? biz.brand_color + '15' : '#EEF2FF'};
            --bg: #F8FAFC;
            --text: #0F172A;
            --text-light: #64748B;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; line-height: 1.6; }
        .container { max-width: 850px; margin: 0 auto; background: white; padding: 60px; border-radius: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.04); position: relative; overflow: hidden; }
        .container::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: var(--primary); }
        
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 80px; }
        .logo { max-width: 180px; max-height: 80px; object-fit: contain; }
        .business-info h2 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        
        .invoice-title-block h1 { font-size: 42px; font-weight: 800; margin: 0; color: var(--text); letter-spacing: -2px; line-height: 1; }
        .status-badge { display: inline-flex; align-items: center; padding: 8px 16px; border-radius: 12px; font-size: 13px; font-weight: 800; text-transform: uppercase; margin-top: 16px; letter-spacing: 0.5px; }
        .status-pending { background: #FFF7ED; color: #C2410C; }
        .status-paid { background: #F0FDF4; color: #15803D; }
        .status-overdue { background: #FEF2F2; color: #B91C1C; }

        .details-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; margin-bottom: 60px; padding: 40px; background: #F1F5F930; border-radius: 24px; }
        .section-title { font-size: 12px; font-weight: 800; color: var(--text-light); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
        .info-text { font-size: 15px; margin-bottom: 6px; color: #334155; }
        .info-bold { font-weight: 700; color: var(--text); }

        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        th { text-align: left; font-size: 12px; font-weight: 800; color: var(--text-light); text-transform: uppercase; padding: 20px 0; border-bottom: 2px solid #F1F5F9; letter-spacing: 1px; }
        td { padding: 24px 0; border-bottom: 1px solid #F1F5F9; font-size: 15px; color: #334155; }
        .text-right { text-align: right; }

        .summary { display: flex; justify-content: flex-end; margin-top: 20px; }
        .summary-box { width: 320px; background: #F8FAFC; padding: 24px; border-radius: 20px; }
        .summary-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 15px; font-weight: 500; }
        .summary-total { border-top: 2px solid #E2E8F0; margin-top: 16px; padding-top: 16px; font-size: 24px; font-weight: 800; color: var(--primary); }

        .signature-section { margin-top: 60px; display: flex; flex-direction: column; align-items: flex-start; }
        .signature-line { width: 240px; height: 1px; background: #E2E8F0; margin-bottom: 16px; }
        .signature-img { max-width: 200px; max-height: 80px; margin-bottom: 8px; filter: grayscale(1) contrast(1.2); }
        .signature-label { font-size: 13px; color: var(--text-light); font-weight: 600; }

        .actions { display: flex; gap: 20px; margin-top: 80px; padding-top: 40px; border-top: 1px solid #F1F5F9; }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 18px 36px; border-radius: 16px; font-weight: 800; text-decoration: none; cursor: pointer; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); border: none; font-size: 16px; }
        .btn-primary { background: var(--primary); color: white; flex: 2; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .btn-secondary { background: #F1F5F9; color: var(--text); flex: 1; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.15); opacity: 0.95; }

        .footer { text-align: center; margin-top: 60px; font-size: 13px; color: var(--text-light); border-top: 1px solid #F1F5F9; padding-top: 40px; }

        @media (max-width: 700px) {
            body { padding: 0; }
            .container { border-radius: 0; padding: 40px 24px; }
            .header { flex-direction: column; gap: 40px; }
            .details-grid { grid-template-columns: 1fr; gap: 32px; padding: 24px; }
            .actions { flex-direction: column; }
        }
        @media print {
            .actions, .container::before { display: none; }
            body { padding: 0; background: white; }
            .container { box-shadow: none; border-radius: 0; padding: 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="business-info">
                ${biz.brand_logo_url ? `<img src="${biz.brand_logo_url}" class="logo" alt="Logo">` : `<h2>${biz.business_name || 'Nobevra'}</h2>`}
                <div class="info-text" style="margin-top: 16px;"><span class="info-bold">${biz.business_name || 'Nobevra'}</span></div>
                <div class="info-text">${biz.business_address || ''}</div>
                <div class="info-text">${biz.business_email || ''}</div>
            </div>
            <div class="invoice-title-block text-right">
                <h1>INVOICE</h1>
                <div class="info-text info-bold" style="font-size: 18px; margin-top: 8px;">#${invoice.invoice_number}</div>
                <div class="status-badge status-${invoice.status}">${invoice.status}</div>
            </div>
        </div>

        <div class="details-grid">
            <div>
                <div class="section-title">Client Information</div>
                <div class="info-text info-bold" style="font-size: 18px;">${invoice.clients.name}</div>
                <div class="info-text">${invoice.clients.email}</div>
                <div class="info-text">${invoice.clients.address || ''}</div>
                ${invoice.clients.phone ? `<div class="info-text">${invoice.clients.phone}</div>` : ''}
            </div>
            <div class="text-right">
                <div class="section-title">Payment Schedule</div>
                <div class="info-text"><span class="info-bold">Issue Date:</span> ${formatDate(invoice.issue_date)}</div>
                <div class="info-text"><span class="info-bold">Due Date:</span> ${formatDate(invoice.due_date)}</div>
                ${invoice.currency_code ? `<div class="info-text"><span class="info-bold">Currency:</span> ${invoice.currency_code}</div>` : ''}
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th style="width: 60%">Service / Item Description</th>
                    <th class="text-right">Quantity</th>
                    <th class="text-right">Unit Price</th>
                    <th class="text-right">Line Total</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.invoice_items.map(item => `
                    <tr>
                        <td>
                            <div class="info-bold">${item.description}</div>
                        </td>
                        <td class="text-right">${item.quantity}</td>
                        <td class="text-right">${formatCurrency(item.unit_price, invoice.currency_code)}</td>
                        <td class="text-right info-bold">${formatCurrency(item.total, invoice.currency_code)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="summary">
            <div class="summary-box">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${formatCurrency(invoice.subtotal, invoice.currency_code)}</span>
                </div>
                ${invoice.tax_amount > 0 ? `
                <div class="summary-row">
                    <span>Tax (${invoice.tax_rate}%)</span>
                    <span>${formatCurrency(invoice.tax_amount, invoice.currency_code)}</span>
                </div>` : ''}
                ${invoice.discount_amount > 0 ? `
                <div class="summary-row" style="color: #166534">
                    <span>Discount Applied</span>
                    <span>-${formatCurrency(invoice.discount_amount, invoice.currency_code)}</span>
                </div>` : ''}
                <div class="summary-row summary-total">
                    <span>Amount Due</span>
                    <span>${formatCurrency(invoice.total_amount, invoice.currency_code)}</span>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 40px;">
            <div style="flex: 1; min-width: 300px;">
                ${invoice.notes ? `
                <div style="margin-top: 40px;">
                    <div class="section-title">Terms & Notes</div>
                    <div class="info-text" style="white-space: pre-wrap; font-size: 14px;">${invoice.notes}</div>
                </div>` : ''}
            </div>

            ${invoice.metadata?.signature ? `
            <div class="signature-section">
                <img src="${invoice.metadata.signature}" class="signature-img" alt="Authorised Signature">
                <div class="signature-line"></div>
                <div class="signature-label">Authorised Signature</div>
                ${invoice.metadata.signed_at ? `<div style="font-size: 10px; color: var(--text-light); margin-top: 4px;">Signed on: ${formatDate(invoice.metadata.signed_at)}</div>` : ''}
            </div>` : ''}
        </div>

        <div class="actions">
            ${invoice.status !== 'paid' ? `
                <a href="${SUPABASE_URL}/functions/v1/create-flutterwave-payment?invoice_id=${invoice.id}" class="btn btn-primary">
                    Pay ${formatCurrency(invoice.total_amount, invoice.currency_code)} Online
                </a>
            ` : ''}
            <button onclick="window.print()" class="btn btn-secondary">Download as PDF</button>
        </div>

        <div class="footer">
            <p>${biz.invoice_footer || 'Thank you for your business! We appreciate your partnership.'}</p>
            <p style="opacity: 0.5; font-weight: 700; margin-top: 20px;">Nobevra Enterprise - Secure Client Portal</p>
        </div>
    </div>
</body>
</html>
    `;

    return new Response(html, {
      headers: { ...corsHeaders, "Content-Type": "text/html" },
    });
  } catch (e) {
    console.error(e);
    return new Response("<h1>Critical Error</h1><p>Unable to load invoice.</p>", {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
});
