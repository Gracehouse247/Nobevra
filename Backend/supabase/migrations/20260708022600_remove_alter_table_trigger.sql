-- Migration: Remove ALTER TABLE trigger disable from recalculate_invoice_totals
-- Date: 2026-07-08
-- Problem: recalculate_invoice_totals trigger function attempts to DISABLE/ENABLE triggers on invoices.
--          Altering a table's triggers requires an ACCESS EXCLUSIVE lock.
--          This fails during active queries with "cannot ALTER TABLE because it is being used by active queries".
-- Fix: Remove the DISABLE/ENABLE trigger statements. Trigger recursion is not a risk here because
--      the trigger is on invoice_items, not invoices, so updating invoices does not trigger recursion.

CREATE OR REPLACE FUNCTION public.recalculate_invoice_totals()
RETURNS trigger AS $$
DECLARE
    v_invoice_id BIGINT;
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

    -- Update the parent invoice directly (no need to disable triggers as there's no circular trigger loop)
    UPDATE public.invoices
    SET 
        subtotal = v_subtotal,
        discount_amount = v_calculated_discount,
        tax_amount = v_calculated_tax,
        total_amount = v_calculated_total,
        updated_at = NOW()
    WHERE id = v_invoice_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
