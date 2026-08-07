-- Migration: Fix invoice_id type mismatch in database functions
-- Date: 2026-07-08
-- Problem: invoices.id and invoice_items.invoice_id are BIGINT.
--          But recalculate_invoice_totals() and update_invoice_with_items() declared invoice_id as UUID.
--          This throws a type mismatch error "invalid input syntax for type uuid: '29'" during inserts.

-- 1. Fix recalculate_invoice_totals trigger function
CREATE OR REPLACE FUNCTION public.recalculate_invoice_totals()
RETURNS trigger AS $$
DECLARE
    v_invoice_id BIGINT; -- Fixed: Changed from UUID to BIGINT
    v_subtotal NUMERIC := 0;
    v_tax_rate NUMERIC := 0;
    v_tax_type TEXT;
    v_discount_type TEXT;
    v_discount_value NUMERIC := 0;
    
    v_calculated_discount NUMERIC := 0;
    v_calculated_tax NUMERIC := 0;
    v_calculated_total NUMERIC := 0;
BEGIN
    -- Determine the invoice_id based on the operation
    IF TG_OP = 'DELETE' THEN
        v_invoice_id := OLD.invoice_id;
    ELSE
        v_invoice_id := NEW.invoice_id;
    END IF;

    -- Calculate the new subtotal from all items belonging to this invoice
    SELECT COALESCE(SUM(quantity * COALESCE(unit_price, 0)), 0)
    INTO v_subtotal
    FROM public.invoice_items
    WHERE invoice_id = v_invoice_id;

    -- Fetch the tax and discount settings from the parent invoice
    SELECT 
        COALESCE(tax_rate, 0), 
        COALESCE(tax_type, 'exclusive'), 
        COALESCE(discount_type, 'none'), 
        COALESCE(discount_value, 0)
    INTO v_tax_rate, v_tax_type, v_discount_type, v_discount_value
    FROM public.invoices
    WHERE id = v_invoice_id;

    -- Calculate discount
    IF v_discount_type = 'percentage' THEN
        v_calculated_discount := (v_subtotal * v_discount_value) / 100;
    ELSIF v_discount_type = 'flat' THEN
        v_calculated_discount := v_discount_value;
    END IF;

    -- Calculate tax based on subtotal minus discount
    IF v_tax_type = 'exclusive' THEN
        v_calculated_tax := ((v_subtotal - v_calculated_discount) * v_tax_rate) / 100;
    ELSIF v_tax_type = 'inclusive' THEN
        v_calculated_tax := (v_subtotal - v_calculated_discount) - ((v_subtotal - v_calculated_discount) / (1 + (v_tax_rate / 100)));
    END IF;

    -- Calculate total
    IF v_tax_type = 'exclusive' THEN
        v_calculated_total := v_subtotal - v_calculated_discount + v_calculated_tax;
    ELSE
        -- Inclusive tax is already part of the subtotal
        v_calculated_total := v_subtotal - v_calculated_discount;
    END IF;

    -- Update the parent invoice (disable trigger execution during this update to prevent recursion)
    ALTER TABLE public.invoices DISABLE TRIGGER USER;
    
    UPDATE public.invoices
    SET 
        subtotal = v_subtotal,
        discount_amount = v_calculated_discount,
        tax_amount = v_calculated_tax,
        total_amount = v_calculated_total,
        updated_at = NOW()
    WHERE id = v_invoice_id;

    ALTER TABLE public.invoices ENABLE TRIGGER USER;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. Fix update_invoice_with_items function (drop old signature first since parameter type changes)
DROP FUNCTION IF EXISTS update_invoice_with_items(UUID, JSONB, JSONB);

CREATE OR REPLACE FUNCTION update_invoice_with_items(
    p_invoice_id BIGINT, -- Fixed: Changed from UUID to BIGINT
    p_invoice_data JSONB,
    p_items JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_updated_invoice JSONB;
BEGIN
    -- Update the invoice record
    UPDATE invoices
    SET
        client_id = (p_invoice_data->>'client_id')::BIGINT,
        invoice_number = p_invoice_data->>'invoice_number',
        invoice_type = p_invoice_data->>'invoice_type',
        issue_date = (p_invoice_data->>'issue_date')::DATE,
        due_date = (p_invoice_data->>'due_date')::DATE,
        status = p_invoice_data->>'status',
        currency_code = p_invoice_data->>'currency_code',
        tax_rate = (p_invoice_data->>'tax_rate')::NUMERIC,
        tax_type = p_invoice_data->>'tax_type',
        tax_amount = (p_invoice_data->>'tax_amount')::NUMERIC,
        discount_type = p_invoice_data->>'discount_type',
        discount_value = (p_invoice_data->>'discount_value')::NUMERIC,
        discount_amount = (p_invoice_data->>'discount_amount')::NUMERIC,
        subtotal = (p_invoice_data->>'subtotal')::NUMERIC,
        total_amount = (p_invoice_data->>'total_amount')::NUMERIC,
        notes = p_invoice_data->>'notes',
        metadata = p_invoice_data->'metadata',
        updated_at = NOW()
    WHERE id = p_invoice_id;

    -- Return the updated invoice row
    SELECT row_to_json(i) INTO v_updated_invoice
    FROM invoices i
    WHERE id = p_invoice_id;

    IF v_updated_invoice IS NULL THEN
        RAISE EXCEPTION 'Invoice not found';
    END IF;

    -- Delete existing items
    DELETE FROM invoice_items WHERE invoice_id = p_invoice_id;

    -- Insert new items if provided
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
            (item->>'product_id')::BIGINT,
            item->>'description',
            (item->>'quantity')::NUMERIC,
            (item->>'unit_price')::NUMERIC,
            (item->>'total')::NUMERIC
        FROM jsonb_array_elements(p_items) AS item;
    END IF;

    RETURN v_updated_invoice;
END;
$$;

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
