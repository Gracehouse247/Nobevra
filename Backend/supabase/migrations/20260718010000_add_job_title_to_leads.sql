-- ============================================================
-- Migration: Add job_title to identity_leads
-- ============================================================

ALTER TABLE public.identity_leads
ADD COLUMN IF NOT EXISTS job_title TEXT;

