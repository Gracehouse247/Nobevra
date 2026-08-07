-- ============================================================
-- Migration: Add advanced analytics tracking to identity tables
-- ============================================================

-- 1. Add 'source' column to scan_logs
ALTER TABLE public.scan_logs
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'qr_code';

-- 2. Add 'status', 'company', and 'source' to identity_leads
ALTER TABLE public.identity_leads
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'web_form';

-- 3. Create an index on the new columns for faster aggregation
CREATE INDEX IF NOT EXISTS idx_scan_logs_source ON public.scan_logs(source);
CREATE INDEX IF NOT EXISTS idx_identity_leads_status ON public.identity_leads(status);
