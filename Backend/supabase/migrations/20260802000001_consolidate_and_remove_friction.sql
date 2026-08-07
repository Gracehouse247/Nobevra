-- =============================================================================
-- Migration: Consolidate RPCs and Remove Punitive Triggers
-- Purpose: 
-- 1. Drops legacy check_insert limits and edit quotas.
-- 2. Ensures resolve_team_entitlements has a fallback.
-- =============================================================================

-- 1. Drop Punitive Edit Quota Triggers
DROP TRIGGER IF EXISTS trg_track_client_edit_quota ON public.clients;
DROP FUNCTION IF EXISTS public.track_client_edit_quota();

DROP TRIGGER IF EXISTS trg_track_invoice_edit_quota ON public.invoices;
DROP FUNCTION IF EXISTS public.track_invoice_edit_quota();

-- 2. Drop overlapping old insert limit triggers (replaced by zero-trust ones in 20260725)
DROP TRIGGER IF EXISTS trg_check_invoice_insert_limit ON public.invoices;
DROP FUNCTION IF EXISTS public.check_invoice_insert_limit();

DROP TRIGGER IF EXISTS trg_check_client_insert_limit ON public.clients;
DROP FUNCTION IF EXISTS public.check_client_insert_limit();

-- 3. Modify resolve_team_entitlements to fallback to 'starter' plan if team has no active billing cycle
CREATE OR REPLACE FUNCTION public.resolve_team_entitlements(p_team_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_plan_id TEXT;
    v_features JSONB;
BEGIN
    -- Get the active plan for the team
    SELECT plan_id INTO v_plan_id
    FROM public.billing_cycles
    WHERE team_id = p_team_id AND status = 'active'
    ORDER BY end_date DESC
    LIMIT 1;

    -- Fallback to starter (Explorer) if no active billing cycle
    IF v_plan_id IS NULL THEN
        v_plan_id := 'starter';
    END IF;

    -- Aggregate entitlements for this plan
    SELECT jsonb_object_agg(feature_id, limit_value)
    INTO v_features
    FROM public.plan_entitlements
    WHERE plan_id = v_plan_id;

    RETURN v_features;
END;
$$ LANGUAGE plpgsql;
