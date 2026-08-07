-- =============================================================================
-- Migration: Rename Starter to Explorer
-- Purpose: Canonically rename the 'starter' plan to 'explorer' everywhere.
-- =============================================================================

-- 1. Insert new 'explorer' plan
INSERT INTO public.subscription_plans (id, name, price_monthly, price_yearly)
SELECT 'explorer', 'Explorer', price_monthly, price_yearly
FROM public.subscription_plans WHERE id = 'starter'
ON CONFLICT (id) DO NOTHING;

-- 2. Copy entitlements from 'starter' to 'explorer'
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value)
SELECT 'explorer', feature_id, limit_value
FROM public.plan_entitlements WHERE plan_id = 'starter'
ON CONFLICT (plan_id, feature_id) DO UPDATE SET limit_value = EXCLUDED.limit_value;

-- 3. Update references
UPDATE public.billing_cycles SET plan_id = 'explorer' WHERE plan_id = 'starter';
UPDATE public.profiles SET subscription_tier = 'explorer' WHERE subscription_tier = 'starter';

-- 4. Delete old 'starter' plan (will cascade to its plan_entitlements)
DELETE FROM public.subscription_plans WHERE id = 'starter';

-- 5. Update resolve_team_entitlements to default to 'explorer' instead of 'starter'
CREATE OR REPLACE FUNCTION public.resolve_team_entitlements(p_team_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_owner_id UUID;
    v_plan_id TEXT;
    v_result JSONB;
BEGIN
    SELECT owner_id INTO v_owner_id FROM public.teams WHERE id = p_team_id;

    IF v_owner_id IS NULL THEN
        RETURN NULL;
    END IF;

    SELECT COALESCE(subscription_tier, 'explorer') INTO v_plan_id
    FROM public.profiles
    WHERE id = v_owner_id;

    IF v_plan_id NOT IN ('explorer', 'pulse', 'elite') THEN
        v_plan_id := 'explorer';
    END IF;

    SELECT jsonb_object_agg(pe.feature_id, 
        COALESCE(te.limit_override, pe.limit_value))
    INTO v_result
    FROM public.plan_entitlements pe
    LEFT JOIN public.team_entitlements te 
        ON pe.feature_id = te.feature_id AND te.team_id = p_team_id
    WHERE pe.plan_id = v_plan_id;

    RETURN v_result;
END;
$$;
