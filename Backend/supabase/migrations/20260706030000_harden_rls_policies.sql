-- ==============================================================================
-- Migration: 20260706030000_harden_rls_policies.sql
-- Description: Hardens RLS policies across all core tables to enforce strict
--              tenant isolation. Drops loose FOR ALL policies and replaces them 
--              with explicit SELECT/INSERT/UPDATE/DELETE policies that use
--              both USING and WITH CHECK to prevent team_id spoofing.
-- ==============================================================================

-- 1. Ensure `check_team_access` is robust (already SECURITY DEFINER, but let's reinforce it)
CREATE OR REPLACE FUNCTION public.check_team_access(t_id uuid, required_roles public.team_role[] DEFAULT ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = t_id 
    AND user_id = auth.uid() 
    AND role = ANY(required_roles)
  );
END;
$function$;

-- 2. Harden `invoices` table
DROP POLICY IF EXISTS "Team invoice access" ON public.invoices;
DROP POLICY IF EXISTS "invoices_select_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_insert_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_update_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_delete_policy" ON public.invoices;

CREATE POLICY "invoices_select_policy" ON public.invoices 
FOR SELECT USING (public.check_team_access(team_id));

CREATE POLICY "invoices_insert_policy" ON public.invoices 
FOR INSERT WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "invoices_update_policy" ON public.invoices 
FOR UPDATE USING (public.check_team_access(team_id)) WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "invoices_delete_policy" ON public.invoices 
FOR DELETE USING (public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]));

-- 3. Harden `clients` table
DROP POLICY IF EXISTS "Team client access" ON public.clients;
DROP POLICY IF EXISTS "clients_select_policy" ON public.clients;
DROP POLICY IF EXISTS "clients_insert_policy" ON public.clients;
DROP POLICY IF EXISTS "clients_update_policy" ON public.clients;
DROP POLICY IF EXISTS "clients_delete_policy" ON public.clients;

CREATE POLICY "clients_select_policy" ON public.clients 
FOR SELECT USING (public.check_team_access(team_id));

CREATE POLICY "clients_insert_policy" ON public.clients 
FOR INSERT WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "clients_update_policy" ON public.clients 
FOR UPDATE USING (public.check_team_access(team_id)) WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "clients_delete_policy" ON public.clients 
FOR DELETE USING (public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]));

-- 4. Harden `expenses` table
DROP POLICY IF EXISTS "Team expense access" ON public.expenses;
DROP POLICY IF EXISTS "expenses_select_policy" ON public.expenses;
DROP POLICY IF EXISTS "expenses_insert_policy" ON public.expenses;
DROP POLICY IF EXISTS "expenses_update_policy" ON public.expenses;
DROP POLICY IF EXISTS "expenses_delete_policy" ON public.expenses;

CREATE POLICY "expenses_select_policy" ON public.expenses 
FOR SELECT USING (public.check_team_access(team_id));

CREATE POLICY "expenses_insert_policy" ON public.expenses 
FOR INSERT WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "expenses_update_policy" ON public.expenses 
FOR UPDATE USING (public.check_team_access(team_id)) WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "expenses_delete_policy" ON public.expenses 
FOR DELETE USING (public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]));

-- 5. Harden `products` table
DROP POLICY IF EXISTS "Team product access" ON public.products;
DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_insert_policy" ON public.products;
DROP POLICY IF EXISTS "products_update_policy" ON public.products;
DROP POLICY IF EXISTS "products_delete_policy" ON public.products;

CREATE POLICY "products_select_policy" ON public.products 
FOR SELECT USING (public.check_team_access(team_id));

CREATE POLICY "products_insert_policy" ON public.products 
FOR INSERT WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "products_update_policy" ON public.products 
FOR UPDATE USING (public.check_team_access(team_id)) WITH CHECK (public.check_team_access(team_id));

CREATE POLICY "products_delete_policy" ON public.products 
FOR DELETE USING (public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]));

-- 6. Ensure RLS is actually enabled
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
