-- Migration: Fix invoices and invoice_items RLS to allow solo owners
-- Date: 2026-07-08
-- Problem: is_team_member() only checks team_members table.
--          Solo owners (no team_members record) are blocked from inserting invoice_items.
-- Fix: Update is_team_member() to also allow the team owner directly,
--      and fix invoice_items RLS to allow insert when the parent invoice belongs to the user.

-- 1. Upgrade is_team_member() to also accept the team owner
CREATE OR REPLACE FUNCTION public.is_team_member(team_id_to_check uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN (
    -- User is directly a team member
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_id_to_check
      AND user_id = auth.uid()
    )
    OR
    -- User is the team owner
    EXISTS (
      SELECT 1 FROM public.teams
      WHERE id = team_id_to_check
      AND owner_id = auth.uid()
    )
    OR
    -- User's own user_id is being used as the team_id (solo user mode)
    team_id_to_check = auth.uid()
  );
END;
$function$;

-- 2. Fix invoices RLS policies to also allow by user_id
DROP POLICY IF EXISTS "invoices_insert_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_select_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_update_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_delete_policy" ON public.invoices;
DROP POLICY IF EXISTS "Invoice management" ON public.invoices;
DROP POLICY IF EXISTS "Team access for invoices" ON public.invoices;

CREATE POLICY "invoices_select_policy" ON public.invoices
FOR SELECT USING (
  public.is_team_member(team_id)
  OR user_id = auth.uid()
);

CREATE POLICY "invoices_insert_policy" ON public.invoices
FOR INSERT WITH CHECK (
  public.is_team_member(team_id)
  OR user_id = auth.uid()
);

CREATE POLICY "invoices_update_policy" ON public.invoices
FOR UPDATE USING (
  public.is_team_member(team_id)
  OR user_id = auth.uid()
) WITH CHECK (
  public.is_team_member(team_id)
  OR user_id = auth.uid()
);

CREATE POLICY "invoices_delete_policy" ON public.invoices
FOR DELETE USING (
  public.is_team_member(team_id)
  OR user_id = auth.uid()
);

-- 3. Fix invoice_items RLS — derive access from parent invoice ownership
DROP POLICY IF EXISTS "Invoice items management" ON public.invoice_items;
DROP POLICY IF EXISTS "Team access for invoice_items" ON public.invoice_items;

DROP POLICY IF EXISTS "invoice_items_all_policy" ON public.invoice_items; CREATE POLICY "invoice_items_all_policy" ON public.invoice_items
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND (
      public.is_team_member(invoices.team_id)
      OR invoices.user_id = auth.uid()
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND (
      public.is_team_member(invoices.team_id)
      OR invoices.user_id = auth.uid()
    )
  )
);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';
