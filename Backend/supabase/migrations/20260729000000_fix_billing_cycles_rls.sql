-- =============================================================================
-- Migration: Enable RLS on billing_cycles
-- Purpose: Fix Critical Security Vulnerability (rls_disabled_in_public)
-- =============================================================================

ALTER TABLE public.billing_cycles ENABLE ROW LEVEL SECURITY;

-- 1. Users can view their own billing cycles
CREATE POLICY "Users can view their own billing cycles" 
ON public.billing_cycles FOR SELECT
USING (
    team_id IN (
        SELECT id FROM public.teams WHERE owner_id = auth.uid()
    )
);

-- Note: No INSERT, UPDATE, or DELETE policies are granted to the public.
-- Billing cycles are managed strictly by the backend Service Role / Edge Functions.
