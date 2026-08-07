// supabase/functions/process-recurring-invoices/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FLUTTERWAVE_SECRET_KEY = Deno.env.get("FLUTTERWAVE_SECRET_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

serve(async (_req) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // 1. Fetch recurring TEMPLATES due for generation
    const { data: templates, error: fetchErr } = await supabase
      .from("invoices")
      .select("*, invoice_items(*)")
      .eq("invoice_type", "recurring")
      .eq("status", "draft")
      .not("metadata->>next_generation_date", "is", null)
      .lte("metadata->>next_generation_date", today);

    if (fetchErr) throw fetchErr;

    if (!templates || templates.length === 0) {
      return new Response(JSON.stringify({ created: 0, status: "No invoices due today" }), { status: 200 });
    }

    const newInvoicesToInsert: any[] = [];
    const newItemsToInsert: any[] = [];
    
    // Batch processing
    for (const template of templates) {
      // ENFORCE SUBSCRIPTION GATING
      const { data: entitlements } = await supabase.rpc('resolve_team_entitlements', { p_team_id: template.team_id });
      // We assume Pulse/Elite tiers have active entitlements. If not, skip generation.
      if (!entitlements) {
          console.log(`Skipping template ${template.id} due to inactive subscription.`);
          continue;
      }

      const meta = template.metadata || {};
      const interval = meta.frequency || meta.recurring_interval || "Monthly";

      // 1. Generate unique invoice number and UUID
      const ts = new Date();
      const code = Math.random().toString(36).substring(7).toUpperCase();
      const invoiceNumber = `REC-${ts.getFullYear()}${String(ts.getMonth() + 1).padStart(2, '0')}-${code}`;
      const newInvoiceId = crypto.randomUUID();

      // 2. Fetch Client for Tokenized Billing
      const { data: client } = await supabase
        .from("clients")
        .select("payment_token, email, name")
        .eq("id", template.client_id)
        .single();

      let autoCharged = false;
      let fwDetails = {};

      // 3. ATTEMPT AUTO-CHARGE
      if (meta.auto_charge === true && client?.payment_token) {
        try {
          const platformFeeRate = 0.01; 
          const platformCommission = template.total_amount * platformFeeRate;

          const { data: team } = await supabase
            .from("teams")
            .select("flw_subaccount_id")
            .eq("id", template.team_id)
            .single();

          const chargeRes = await fetch("https://api.flutterwave.com/v3/tokenized-charges", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: client.payment_token,
              currency: template.currency_code || "NGN",
              amount: template.total_amount,
              email: client.email,
              tx_ref: `AUTO-${invoiceNumber}`,
              customer_name: client.name,
              subaccounts: team?.flw_subaccount_id ? [
                {
                  id: team.flw_subaccount_id,
                  transaction_charge_type: "flat",
                  transaction_charge: platformCommission
                }
              ] : [],
            }),
          });

          const chargeData = await chargeRes.json();
          if (chargeData.status === "success") {
            autoCharged = true;
            fwDetails = {
              flutterwave_tx_id: chargeData.data.id,
              auto_charged_at: new Date().toISOString(),
              platform_commission: platformCommission,
              linked_subaccount: team?.flw_subaccount_id || 'none'
            };
          }
        } catch (ce) {
          console.error(`Auto-charge execution error: ${ce}`);
        }
      }

      // 4. Prepare NEW invoice instance for batch insert
      newInvoicesToInsert.push({
        id: newInvoiceId,
        team_id: template.team_id,
        user_id: template.user_id,
        client_id: template.client_id,
        invoice_number: invoiceNumber,
        status: autoCharged ? "paid" : "pending",
        invoice_type: "standard",
        issue_date: today,
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        currency_code: template.currency_code,
        tax_rate: template.tax_rate,
        tax_type: template.tax_type,
        tax_amount: template.tax_amount,
        discount_type: template.discount_type,
        discount_value: template.discount_value,
        discount_amount: template.discount_amount,
        subtotal: template.subtotal,
        total_amount: template.total_amount,
        notes: template.notes,
        metadata: { 
          generated_from: template.id,
          was_auto_charged: autoCharged,
          pass_fees: meta.pass_fees,
          ...fwDetails
        }
      });

      // 5. Prepare invoice items for batch insert
      if (template.invoice_items && template.invoice_items.length > 0) {
        for (const item of template.invoice_items) {
          newItemsToInsert.push({
            invoice_id: newInvoiceId,
            description: item.description || '',
            quantity: item.quantity || 1,
            unit_price: item.unit_price || 0,
            product_id: item.product_id || null,
            total: (item.quantity || 1) * (item.unit_price || 0)
          });
        }
      }

      // 6. Update the TEMPLATE for the next generation cycle (immediate async, no await inside loop)
      const nextDate = calculateNextDate(today, interval);
      supabase
        .from("invoices")
        .update({
          metadata: { ...meta, next_generation_date: nextDate, last_generated: today }
        })
        .eq("id", template.id)
        .then();
    }

    // BATCH INSERTS - Eliminates N+1 DB calls
    if (newInvoicesToInsert.length > 0) {
      const { error: batchInvErr } = await supabase.from("invoices").insert(newInvoicesToInsert);
      if (batchInvErr) console.error("Batch Invoice Insert Error:", batchInvErr);
    }

    if (newItemsToInsert.length > 0) {
      const { error: batchItemErr } = await supabase.from("invoice_items").insert(newItemsToInsert);
      if (batchItemErr) console.error("Batch Item Insert Error:", batchItemErr);
    }

    return new Response(JSON.stringify({ created: newInvoicesToInsert.length, status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(`Recurring process error: ${e}`);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});

function calculateNextDate(from: string, interval: string): string {
  const d = new Date(from);
  const freq = interval.toLowerCase();
  
  if (freq === "weekly") d.setDate(d.getDate() + 7);
  else if (freq === "bi-weekly") d.setDate(d.getDate() + 14);
  else if (freq === "monthly") d.setMonth(d.getMonth() + 1);
  else if (freq === "quarterly") d.setMonth(d.getMonth() + 3);
  else if (freq === "annually") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1); 

  return d.toISOString().split("T")[0];
}
