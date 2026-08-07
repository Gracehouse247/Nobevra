-- Migration: Add extra fields for products to support the new UI

ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS unit TEXT,
    ADD COLUMN IF NOT EXISTS cost_price NUMERIC(15,2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS min_stock_alert INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN public.products.unit IS 'Unit of measurement (e.g. pcs, hr, kg)';
COMMENT ON COLUMN public.products.cost_price IS 'Cost price for the item';
COMMENT ON COLUMN public.products.min_stock_alert IS 'Minimum stock level to trigger low stock warning';
COMMENT ON COLUMN public.products.tags IS 'Array of tags for organization';
COMMENT ON COLUMN public.products.image_url IS 'URL of the product image';
