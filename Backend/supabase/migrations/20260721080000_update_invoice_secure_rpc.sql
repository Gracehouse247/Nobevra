-- Migration: update_invoice_secure
-- Description: Atomic RPC called exclusively by the update-invoice Edge Function.
--              Performs all DB writes in a single transaction:
--                1. Verifies the invoice still belongs to the team (double-check)
--                2. Updates the invoice header row
--                3. Replaces all invoice_items atomically
--                4. Adjusts inventory quantities (net delta from old → new items)
--                5. Returns the fully updated invoice row as JSONB
--
-- Security: SECURITY DEFINER runs as postgres (service role level).
--           Auth + team ownership is enforced upstream in the Edge Function.
--           This function must NOT be called directly from the client — it is
--           only invoked by the update-invoice Edge Function via service_role key.
--
-- Closes audit finding B09.

-- Drop old version if it exists to allow signature changes
DROP FUNCTION IF EXISTS update_invoice_secure(
  BIGINT, UUID, BIGINT, TEXT, TEXT, TEXT, DATE, DATE,
  TEXT, NUMERIC, TEXT, NUMERIC, TEXT, NUMERIC, NUMERIC,
  NUMERIC, NUMERIC, TEXT, JSONB, JSONB
);

CREATE OR REPLACE FUNCTION update_invoice_secure(
    p_invoice_id     BIGINT,
    p_team_id        UUID,
    p_client_id      BIGINT,
    p_invoice_number TEXT,
    p_invoice_type   TEXT,
    p_status         TEXT,
    p_issue_date     DATE,
    p_due_date       DATE,
    p_currency_code  TEXT,
    p_tax_rate       NUMERIC,
    p_tax_type       TEXT,
    p_tax_amount     NUMERIC,
    p_discount_type  TEXT,
    p_discount_value NUMERIC,
    p_discount_amount NUMERIC,
    p_subtotal       NUMERIC,
    p_total_amount   NUMERIC,
    p_notes          TEXT,
    p_metadata       JSONB,
    p_items          JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_invoice_number    TEXT;
    v_updated_invoice   JSONB;
    v_old_item          RECORD;
    v_new_item          JSONB;
    v_product_id        BIGINT;
    v_old_qty           NUMERIC;
    v_new_qty           NUMERIC;
    v_delta             NUMERIC;
BEGIN
    -- ── Safety: verify invoice belongs to the team ──────────────────────────
    IF NOT EXISTS (
        SELECT 1 FROM invoices
        WHERE id = p_invoice_id AND team_id = p_team_id
    ) THEN
        RAISE EXCEPTION 'Invoice % not found or does not belong to team %', p_invoice_id, p_team_id;
    END IF;

    -- ── Resolve invoice number (keep existing if not provided) ──────────────
    SELECT COALESCE(NULLIF(p_invoice_number, ''), invoice_number)
    INTO v_invoice_number
    FROM invoices
    WHERE id = p_invoice_id;

    -- ── Step 1: Update invoice header ───────────────────────────────────────
    UPDATE invoices SET
        client_id       = p_client_id,
        invoice_number  = v_invoice_number,
        invoice_type    = p_invoice_type,
        status          = p_status,
        issue_date      = p_issue_date,
        due_date        = p_due_date,
        currency_code   = p_currency_code,
        tax_rate        = p_tax_rate,
        tax_type        = p_tax_type,
        tax_amount      = p_tax_amount,
        discount_type   = p_discount_type,
        discount_value  = p_discount_value,
        discount_amount = p_discount_amount,
        subtotal        = p_subtotal,
        total_amount    = p_total_amount,
        notes           = p_notes,
        -- Merge metadata: existing keys are preserved, new keys override
        metadata        = COALESCE(
                            (SELECT metadata FROM invoices WHERE id = p_invoice_id), '{}'::JSONB
                          ) || p_metadata,
        updated_at      = NOW()
    WHERE id = p_invoice_id AND team_id = p_team_id;

    -- ── Step 2: Inventory reconciliation (net delta per product) ───────────
    -- Build a temporary map of old product quantities for this invoice
    FOR v_old_item IN
        SELECT product_id, SUM(quantity)::NUMERIC AS qty
        FROM invoice_items
        WHERE invoice_id = p_invoice_id AND product_id IS NOT NULL
        GROUP BY product_id
    LOOP
        -- Check what the new quantity will be for this product
        SELECT COALESCE(SUM((item->>'quantity')::NUMERIC), 0)
        INTO v_new_qty
        FROM jsonb_array_elements(p_items) AS item
        WHERE (item->>'product_id')::BIGINT = v_old_item.product_id;

        v_delta := v_new_qty - v_old_item.qty;

        -- If net delta is negative, restore stock; if positive, deduct more
        IF v_delta <> 0 THEN
            UPDATE products
            SET quantity = quantity - v_delta
            WHERE id = v_old_item.product_id
              AND track_inventory = TRUE
              AND team_id = p_team_id;
        END IF;
    END LOOP;

    -- Also handle brand new products added in this update (not in old items)
    FOR v_new_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
        v_product_id := (v_new_item->>'product_id')::BIGINT;
        CONTINUE WHEN v_product_id IS NULL OR v_product_id = 0;

        -- Only deduct if this product was NOT already in the old items (handled above)
        IF NOT EXISTS (
            SELECT 1 FROM invoice_items
            WHERE invoice_id = p_invoice_id AND product_id = v_product_id
        ) THEN
            v_new_qty := (v_new_item->>'quantity')::NUMERIC;
            UPDATE products
            SET quantity = quantity - v_new_qty
            WHERE id = v_product_id
              AND track_inventory = TRUE
              AND team_id = p_team_id;
        END IF;
    END LOOP;

    -- ── Step 3: Replace all invoice items atomically ────────────────────────
    DELETE FROM invoice_items WHERE invoice_id = p_invoice_id;

    IF jsonb_array_length(p_items) > 0 THEN
        INSERT INTO invoice_items (
            invoice_id,
            product_id,
            description,
            quantity,
            unit_price,
            total
        )
        SELECT
            p_invoice_id,
            NULLIF((item->>'product_id')::TEXT, '')::BIGINT,
            item->>'description',
            (item->>'quantity')::NUMERIC,
            (item->>'unit_price')::NUMERIC,
            (item->>'total')::NUMERIC
        FROM jsonb_array_elements(p_items) AS item;
    END IF;

    -- ── Step 4: Return full updated invoice row as JSONB ───────────────────
    SELECT row_to_json(i)::JSONB
    INTO v_updated_invoice
    FROM invoices i
    WHERE id = p_invoice_id;

    RETURN v_updated_invoice;
END;
$$;

-- Revoke direct client access — only service_role (Edge Function) may call this
REVOKE ALL ON FUNCTION update_invoice_secure(
    BIGINT, UUID, BIGINT, TEXT, TEXT, TEXT, DATE, DATE,
    TEXT, NUMERIC, TEXT, NUMERIC, TEXT, NUMERIC, NUMERIC,
    NUMERIC, NUMERIC, TEXT, JSONB, JSONB
) FROM anon, authenticated;

GRANT EXECUTE ON FUNCTION update_invoice_secure(
    BIGINT, UUID, BIGINT, TEXT, TEXT, TEXT, DATE, DATE,
    TEXT, NUMERIC, TEXT, NUMERIC, TEXT, NUMERIC, NUMERIC,
    NUMERIC, NUMERIC, TEXT, JSONB, JSONB
) TO service_role;
