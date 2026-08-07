-- Migration: Harden Invoices RLS
-- Description: Removes the ability for authenticated users to directly INSERT into the invoices table.
-- This forces all invoice creation through the create-invoice Edge Function and create_invoice_transaction RPC,
-- ensuring that Quota Checks and Client Validation are strictly enforced on the server.

BEGIN;

DROP POLICY IF EXISTS "invoices_insert_policy" ON public.invoices;

-- Note: No new INSERT policy is created for 'authenticated' users. 
-- RLS will default to DENY for INSERTs.
-- The create_invoice_transaction RPC and Edge Function use 'postgres' or 'service_role' 
-- which bypass RLS automatically.

COMMIT;
