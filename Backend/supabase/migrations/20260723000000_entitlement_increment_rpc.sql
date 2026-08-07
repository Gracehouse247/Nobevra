-- =============================================================================
-- Migration: Entitlement Platform Increment Usage RPC
-- Purpose: Adds the missing increment_team_usage function for Edge Functions
-- =============================================================================

CREATE OR REPLACE FUNCTION public.increment_team_usage(
    p_team_id UUID,
    p_feature_id TEXT,
    p_period_start DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.team_usage (team_id, feature_id, period_start, used_amount)
    VALUES (p_team_id, p_feature_id, p_period_start, 1)
    ON CONFLICT (team_id, feature_id, period_start)
    DO UPDATE SET 
        used_amount = public.team_usage.used_amount + 1,
        updated_at = NOW();
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_team_usage(UUID, TEXT, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_team_usage(UUID, TEXT, DATE) TO service_role;
