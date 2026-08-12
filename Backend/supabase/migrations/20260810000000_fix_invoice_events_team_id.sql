-- =============================================================================
-- Migration: Fix invoice_events team_id and create_invoice_transaction
-- =============================================================================

-- 1. Alter invoice_events team_id from TEXT to UUID
ALTER TABLE public.invoice_events
  ALTER COLUMN team_id TYPE UUID USING NULLIF(team_id, '')::UUID;

-- 2. Drop the old function since we are changing the parameter types
DROP FUNCTION IF EXISTS public.create_invoice_transaction(
  UUID, TEXT, BIGINT, TEXT, TEXT, TEXT, DATE, DATE, TEXT,
  NUMERIC, TEXT, NUMERIC, TEXT, NUMERIC, NUMERIC, NUMERIC, NUMERIC, TEXT, JSONB, JSONB
);

-- 3. Recreate the function with p_team_id as UUID
CREATE OR REPLACE FUNCTION public.create_invoice_transaction(
  p_user_id         UUID,
  p_team_id         UUID,
  p_client_id       BIGINT,
  p_invoice_number  TEXT,
  p_invoice_type    TEXT,
  p_status          TEXT,
  p_issue_date      DATE,
  p_due_date        DATE,
  p_currency_code   TEXT,
  p_tax_rate        NUMERIC,
  p_tax_type        TEXT,
  p_tax_amount      NUMERIC,
  p_discount_type   TEXT,
  p_discount_value  NUMERIC,
  p_discount_amount NUMERIC,
  p_subtotal        NUMERIC,
  p_total_amount    NUMERIC,
  p_notes           TEXT,
  p_metadata        JSONB,
  p_items           JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_invoice_id      BIGINT;
  v_item            JSONB;
  v_product_id      BIGINT;
  v_quantity        NUMERIC;
  v_stock_entries   JSONB := '[]'::JSONB;
  v_client_balance  NUMERIC;
  v_ledger_amount   NUMERIC;
  v_ledger_type     TEXT;
BEGIN
  -- ── Step 1: Insert Invoice Header ─────────────────────────────────────────
  INSERT INTO public.invoices (
    user_id, team_id, client_id, invoice_number, invoice_type,
    status, issue_date, due_date, currency_code,
    tax_rate, tax_type, tax_amount,
    discount_type, discount_value, discount_amount,
    subtotal, total_amount, notes, metadata
  ) VALUES (
    p_user_id, p_team_id, p_client_id, p_invoice_number, p_invoice_type,
    p_status, p_issue_date, p_due_date, p_currency_code,
    p_tax_rate, p_tax_type, p_tax_amount,
    p_discount_type, p_discount_value, p_discount_amount,
    p_subtotal, p_total_amount, p_notes, p_metadata
  )
  RETURNING id INTO v_invoice_id;

  -- ── Step 2: Insert Invoice Line Items ─────────────────────────────────────
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO public.invoice_items (
      invoice_id, product_id, description, quantity, unit_price, total
    ) VALUES (
      v_invoice_id,
      NULLIF((v_item->>'product_id'), '')::BIGINT,
      v_item->>'description',
      (v_item->>'quantity')::NUMERIC,
      (v_item->>'unit_price')::NUMERIC,
      (v_item->>'total')::NUMERIC
    );
  END LOOP;

  -- ── Step 3: Ledger & Inventory (only for non-draft invoices) ──────────────
  IF p_status NOT IN ('draft') THEN

    -- 3a. Deduct Stock for any product-linked line items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
      v_product_id := NULLIF((v_item->>'product_id'), '')::BIGINT;
      v_quantity   := (v_item->>'quantity')::NUMERIC;

      IF v_product_id IS NOT NULL THEN
        INSERT INTO public.stock_ledger (
          team_id, product_id, change_amount, reason, reference_id
        ) VALUES (
          p_team_id, v_product_id, -v_quantity, 'Invoice Sale', v_invoice_id::TEXT
        );
      END IF;
    END LOOP;

    -- 3b. Update Client Balance Ledger
    IF p_client_id IS NOT NULL THEN
      SELECT COALESCE(current_balance, 0)
        INTO v_client_balance
        FROM public.clients
       WHERE id = p_client_id;

      -- Credit memos reduce the balance; all other types increase it
      v_ledger_type   := CASE WHEN p_invoice_type = 'credit_memo' THEN 'credit_memo' ELSE 'invoice' END;
      v_ledger_amount := CASE WHEN p_invoice_type = 'credit_memo' THEN -p_total_amount ELSE p_total_amount END;

      INSERT INTO public.client_ledger (
        team_id, client_id, invoice_id, transaction_type,
        amount, balance_before, balance_after
      ) VALUES (
        p_team_id, p_client_id, v_invoice_id, v_ledger_type,
        v_ledger_amount, v_client_balance, v_client_balance + v_ledger_amount
      );
    END IF;
  END IF;

  -- ── Step 4: Audit Log ─────────────────────────────────────────────────────
  INSERT INTO public.audit_logs (
    action, actor, resource, type, metadata
  ) VALUES (
    'invoice.created', p_user_id::TEXT, v_invoice_id::TEXT, 'system',
    jsonb_build_object('status', p_status, 'total_amount', p_total_amount, 'currency', p_currency_code, 'team_id', p_team_id)
  );

  -- ── Step 5: Publish InvoiceCreated Domain Event ───────────────────────────
  INSERT INTO public.invoice_events (
    event_type, invoice_id, team_id, user_id, payload
  ) VALUES (
    'InvoiceCreated',
    v_invoice_id,
    p_team_id,
    p_user_id,
    jsonb_build_object(
      'invoice_id',     v_invoice_id,
      'status',         p_status,
      'client_id',      p_client_id,
      'total_amount',   p_total_amount,
      'currency_code',  p_currency_code,
      'invoice_number', p_invoice_number,
      'enable_flutterwave', COALESCE((p_metadata->>'enable_flutterwave')::BOOLEAN, false),
      'invoice_type',   p_invoice_type
    )
  );

  -- Return the created invoice ID and event confirmation
  RETURN jsonb_build_object(
    'invoice_id',     v_invoice_id,
    'invoice_number', p_invoice_number,
    'status',         p_status
  );

EXCEPTION
  WHEN OTHERS THEN
    -- The transaction will automatically roll back on exception.
    RAISE EXCEPTION 'create_invoice_transaction failed: %', SQLERRM;
END;
$$;

-- Grant to service_role only (Edge Functions call with service_role key)
GRANT EXECUTE ON FUNCTION public.create_invoice_transaction(
  UUID, UUID, BIGINT, TEXT, TEXT, TEXT, DATE, DATE, TEXT,
  NUMERIC, TEXT, NUMERIC, TEXT, NUMERIC, NUMERIC, NUMERIC, NUMERIC, TEXT, JSONB, JSONB
) TO service_role;

COMMENT ON FUNCTION public.create_invoice_transaction IS
  'Atomic invoice creation RPC. Inserts header, items, ledger entries, audit log, and domain event in a single transaction. Called exclusively by the create-invoice Edge Function.';
