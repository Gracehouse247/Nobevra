-- Migration: Ensure clients table has all required columns for the frontend form
-- Date: 2026-07-08

-- Add missing columns if they don't exist
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS company_name TEXT;

-- Ensure country columns exist (may already exist from 20260426 migration)
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT '+234';

-- Ensure the clients_insert_policy and clients_select_policy are using a robust check
-- that works even if the user is the solo owner (no team_members record)
-- This replaces the strict team_members-only check with one that also allows the user directly
DROP POLICY IF EXISTS "clients_insert_policy" ON public.clients;
DROP POLICY IF EXISTS "clients_select_policy" ON public.clients;
DROP POLICY IF EXISTS "clients_update_policy" ON public.clients;
DROP POLICY IF EXISTS "clients_delete_policy" ON public.clients;

-- Flexible policy: allow if user_id matches OR if they are a team member
CREATE POLICY "clients_select_policy" ON public.clients
FOR SELECT USING (
  user_id = auth.uid()
  OR public.check_team_access(team_id)
);

CREATE POLICY "clients_insert_policy" ON public.clients
FOR INSERT WITH CHECK (
  user_id = auth.uid()
  OR public.check_team_access(team_id)
);

CREATE POLICY "clients_update_policy" ON public.clients
FOR UPDATE USING (
  user_id = auth.uid()
  OR public.check_team_access(team_id)
) WITH CHECK (
  user_id = auth.uid()
  OR public.check_team_access(team_id)
);

CREATE POLICY "clients_delete_policy" ON public.clients
FOR DELETE USING (
  user_id = auth.uid()
  OR public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role])
);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
