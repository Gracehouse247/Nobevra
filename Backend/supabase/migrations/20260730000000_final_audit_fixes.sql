-- =============================================================================
-- Migration: Final Audit Fixes
-- Purpose: Set-based dashboard stats, secure storage receipts, and audit trails.
-- =============================================================================

-- 1. Dashboard Stats Optimization (Set-based)
CREATE OR REPLACE FUNCTION public.get_dashboard_stats(p_team_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_revenue NUMERIC;
    v_outstanding NUMERIC;
    v_paid_count INT;
    v_clients_count INT;
BEGIN
    SELECT COUNT(*) INTO v_clients_count FROM public.clients WHERE team_id = p_team_id;
    
    SELECT 
        COALESCE(SUM(total_amount) FILTER (WHERE status = 'paid'), 0),
        COALESCE(SUM(total_amount) FILTER (WHERE status IN ('pending', 'sent', 'unpaid', 'overdue')), 0),
        COUNT(*) FILTER (WHERE status = 'paid')
    INTO v_total_revenue, v_outstanding, v_paid_count
    FROM public.invoices
    WHERE team_id = p_team_id AND status != 'draft';
    
    RETURN jsonb_build_object(
        'totalRevenue', v_total_revenue,
        'outstanding', v_outstanding,
        'paidCount', v_paid_count,
        'clientsCount', v_clients_count
    );
END;
$$;

-- 2. Storage Receipts RLS Harden
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public receipts' AND tablename = 'objects' AND schemaname = 'storage') THEN
        DROP POLICY "Public receipts" ON storage.objects;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can read their receipts' AND tablename = 'objects' AND schemaname = 'storage') THEN
        CREATE POLICY "Authenticated users can read their receipts"
            ON storage.objects FOR SELECT
            USING (bucket_id = 'receipts' AND auth.uid() = owner);
    END IF;
END $$;

-- 3. Invoice Events Audit Logging
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'invoice_events') THEN
        ALTER TABLE public.invoice_events ADD COLUMN IF NOT EXISTS action_by_uid UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    END IF;
END $$;
