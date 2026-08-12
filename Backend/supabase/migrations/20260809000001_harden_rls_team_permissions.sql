-- 20260809000001_harden_rls_team_permissions.sql
-- Description: Hardens RLS to ensure only team members with the right role
-- can update/delete records. Removes all references to non-existent user_id columns
-- on invoices and clients tables.

-- ── 1. Invoices ───────────────────────────────────────────────────────────────
-- invoices has: team_id (UUID), no user_id column.

DROP POLICY IF EXISTS "invoices_update_policy" ON public.invoices;
DROP POLICY IF EXISTS "invoices_delete_policy" ON public.invoices;
DROP POLICY IF EXISTS "Team invoice access" ON public.invoices;

CREATE POLICY "invoices_select" ON public.invoices
FOR SELECT USING (
  public.check_team_access(team_id)
);

CREATE POLICY "invoices_insert" ON public.invoices
FOR INSERT WITH CHECK (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
);

CREATE POLICY "invoices_update_policy" ON public.invoices
FOR UPDATE USING (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
) WITH CHECK (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
);

CREATE POLICY "invoices_delete_policy" ON public.invoices
FOR DELETE USING (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]::public.team_role[])
);

-- ── 2. Invoice Items ──────────────────────────────────────────────────────────
-- invoice_items has: invoice_id -> invoices (which has team_id). No user_id.

DROP POLICY IF EXISTS "invoice_items_all_policy" ON public.invoice_items;
DROP POLICY IF EXISTS "invoice_items_select_insert" ON public.invoice_items;
DROP POLICY IF EXISTS "invoice_items_select" ON public.invoice_items;
DROP POLICY IF EXISTS "invoice_items_insert" ON public.invoice_items;
DROP POLICY IF EXISTS "invoice_items_update" ON public.invoice_items;
DROP POLICY IF EXISTS "invoice_items_delete" ON public.invoice_items;
DROP POLICY IF EXISTS "Invoice items access" ON public.invoice_items;

CREATE POLICY "invoice_items_select" ON public.invoice_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND public.check_team_access(invoices.team_id)
  )
);

CREATE POLICY "invoice_items_insert" ON public.invoice_items
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND public.check_team_access(invoices.team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
  )
);

CREATE POLICY "invoice_items_update" ON public.invoice_items
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND public.check_team_access(invoices.team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
  )
);

CREATE POLICY "invoice_items_delete" ON public.invoice_items
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.invoices
    WHERE invoices.id = invoice_items.invoice_id
    AND public.check_team_access(invoices.team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]::public.team_role[])
  )
);

-- ── 3. Clients ────────────────────────────────────────────────────────────────
-- clients has: team_id (UUID), no user_id column.

DROP POLICY IF EXISTS "Team access for clients" ON public.clients;
DROP POLICY IF EXISTS "Client management" ON public.clients;
DROP POLICY IF EXISTS "Team client access" ON public.clients;
DROP POLICY IF EXISTS "clients_select" ON public.clients;
DROP POLICY IF EXISTS "clients_insert" ON public.clients;
DROP POLICY IF EXISTS "clients_update" ON public.clients;
DROP POLICY IF EXISTS "clients_delete" ON public.clients;

CREATE POLICY "clients_select" ON public.clients
FOR SELECT USING (
  public.check_team_access(team_id)
);

CREATE POLICY "clients_insert" ON public.clients
FOR INSERT WITH CHECK (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
);

CREATE POLICY "clients_update" ON public.clients
FOR UPDATE USING (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role, 'staff'::public.team_role, 'accountant'::public.team_role])
);

CREATE POLICY "clients_delete" ON public.clients
FOR DELETE USING (
  public.check_team_access(team_id, ARRAY['owner'::public.team_role, 'admin'::public.team_role]::public.team_role[])
);

-- ── 4. Billing History ────────────────────────────────────────────────────────
-- billing_history has: user_id (UUID), no team_id column.

DROP POLICY IF EXISTS "Service role manages billing" ON public.billing_history;
DROP POLICY IF EXISTS "Users read own billing history" ON public.billing_history;
DROP POLICY IF EXISTS "Users see own billing" ON public.billing_history;
DROP POLICY IF EXISTS "billing_select" ON public.billing_history;

CREATE POLICY "billing_select" ON public.billing_history
FOR SELECT USING (
  user_id = auth.uid()
);

-- Billing history should only be inserted/updated by the system (service_role).
-- No INSERT/UPDATE/DELETE policy for authenticated users = blocked by default.
