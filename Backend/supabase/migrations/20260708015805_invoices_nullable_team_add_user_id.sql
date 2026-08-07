-- Migration: Make invoices.team_id nullable and add user_id column
-- Date: 2026-07-08
-- Problem: invoices.team_id is NOT NULL and has a FK to teams(id).
--          Solo users don't have a teams record so inserts fail with FK violation.

-- 1. Add user_id column to invoices if it doesn't exist
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Make team_id nullable so solo users can create invoices without a team
ALTER TABLE public.invoices ALTER COLUMN team_id DROP NOT NULL;

-- 3. Create an index on user_id for performance
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);

-- 4. Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
