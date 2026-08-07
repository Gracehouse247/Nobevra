import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple currency formatter
function formatCurrency(amount: number, currencyCode = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // ── 1. Verify caller is authenticated ─────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error(`Unauthorized: ${authError?.message ?? 'no user'}`);

    // ── 2. Parse body ─────────────────────────────────────────────────────────
    const { invoiceId, toEmail } = await req.json();
    if (!invoiceId) {
      throw new Error('Missing required field: invoiceId');
    }

    // ── 3. Fetch invoice and client data ──────────────────────────────────────
    const { data: invoice, error: invoiceErr } = await supabase
      .from('invoices')
      .select(`
        *,
        clients:client_id (*)
      `)
      .eq('id', invoiceId)
      .eq('user_id', user.id) // Ensure security: user must own the invoice
      .single();

    if (invoiceErr) throw new Error(`Invoice lookup failed: ${invoiceErr.message}`);
    if (!invoice) throw new Error('Invoice not found or unauthorized');

    const client = invoice.clients;
    const recipientEmail = toEmail || client?.email;
    if (!recipientEmail) throw new Error('No client email address found to send to.');

    // ── 4. Build Email Template ───────────────────────────────────────────────
    const SMTP_HOST     = Deno.env.get('SMTP_HOST')     ?? 'mail.noblesworld.com.ng';
    const SMTP_PORT     = parseInt(Deno.env.get('SMTP_PORT') ?? '465');
    const SMTP_USER     = Deno.env.get('SMTP_USER')     ?? 'invoice@noblesworld.com.ng';
    const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') ?? '123NobleWORLD!@#';
    const SMTP_FROM     = Deno.env.get('SMTP_FROM')     ?? 'invoice@noblesworld.com.ng';
    const APP_URL       = Deno.env.get('NEXT_PUBLIC_APP_URL') ?? 'https://nobleinvoice.com';

    const amt = formatCurrency(invoice.total_amount || 0, invoice.currency_code);
    const portalUrl = `${APP_URL}/portal/${invoice.id}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr><td align="center">
              <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <!-- Header -->
                <tr>
                  <td style="background:#166FBB;padding:32px 40px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">NobleInvoice</h1>
                    <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Invoice #${invoice.invoice_number}</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="color:#0f172a;font-size:20px;margin:0 0 16px;">Hello ${client?.name || 'Customer'},</h2>
                    <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">
                      This is a notification that a new invoice (<strong>#${invoice.invoice_number}</strong>) has been generated for you.
                    </p>
                    
                    <div style="background:#f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: center;">
                       <p style="color:#64748b; font-size:13px; margin: 0 0 8px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Amount Due</p>
                       <h3 style="color:#0f172a; font-size:32px; margin: 0; font-weight: 900;">${amt}</h3>
                       <p style="color:#64748b; font-size:13px; margin: 8px 0 0;">Due by: ${invoice.due_date || 'Upon Receipt'}</p>
                    </div>

                    <div style="text-align:center;margin:32px 0;">
                      <a href="${portalUrl}"
                         style="background:#166FBB;color:#ffffff;padding:14px 36px;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;display:inline-block;">
                        View & Pay Invoice
                      </a>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                    <p style="color:#94a3b8;font-size:12px;margin:0;">© ${new Date().getFullYear()} NobleInvoice. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `;

    // ── 5. Send Email via SMTP ──────────────────────────────────────────────
    try {
      const smtpClient = new SMTPClient({
        connection: {
          hostname: SMTP_HOST,
          port: SMTP_PORT,
          tls: true,
          auth: {
            username: SMTP_USER,
            password: SMTP_PASSWORD,
          },
        },
      });
      await smtpClient.send({
        from: `NobleInvoice <${SMTP_FROM}>`,
        to: recipientEmail,
        subject: `Invoice #${invoice.invoice_number} from NobleInvoice`,
        content: 'auto',
        html: emailHtml,
      });
      await smtpClient.close();
      console.log(`[send-invoice-email] ✅ SMTP email sent to ${recipientEmail}`);
    } catch (smtpErr: any) {
      console.error('[send-invoice-email] SMTP error:', smtpErr.message);
      throw new Error(`Failed to send email: ${smtpErr.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Invoice sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('[send-invoice-email] Fatal error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
