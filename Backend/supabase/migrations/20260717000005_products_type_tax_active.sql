-- Migration: Add type, tax_rate, and is_active columns to products table
-- These columns are needed for the Products & Services page to function correctly.

ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'product' CHECK (type IN ('product', 'service')),
    ADD COLUMN IF NOT EXISTS tax_rate NUMERIC(5,2) DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

-- Add a comment for clarity
COMMENT ON COLUMN public.products.type IS 'product or service';
COMMENT ON COLUMN public.products.tax_rate IS 'Tax rate percentage (e.g. 7.5 for 7.5%)';
COMMENT ON COLUMN public.products.is_active IS 'Whether this item is active in the catalog';
