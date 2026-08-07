-- =============================================================================
-- Migration: PAYG Metadata Ledger & Dual RPC Cleanup
-- Purpose:
-- 1. Drops legacy resolve_user_limits RPC to fix dual-RPC bug.
-- 2. Adds metadata ledger column to team_entitlements.
-- 3. Updates resolve_team_entitlements to include metadata.
-- 4. Migrates existing template purchases.
-- =============================================================================

-- 1. Drop Legacy RPC
DROP FUNCTION IF EXISTS public.resolve_user_limits(UUID);

-- 2. Add metadata column to team_entitlements
ALTER TABLE public.team_entitlements ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- 3. Update resolve_team_entitlements to include metadata
CREATE OR REPLACE FUNCTION public.resolve_team_entitlements(p_team_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_owner_id UUID;
    v_plan_id TEXT;
    v_entitlements JSONB := '{}'::JSONB;
    v_metadata JSONB := '{}'::JSONB;
    v_rec RECORD;
BEGIN
    -- 1. Get the active plan for the team from billing_cycles
    SELECT plan_id INTO v_plan_id
    FROM public.billing_cycles
    WHERE team_id = p_team_id AND status = 'active'
    ORDER BY end_date DESC
    LIMIT 1;

    -- Fallback to starter (Explorer) if no active billing cycle
    IF v_plan_id IS NULL THEN
        v_plan_id := 'starter';
    END IF;

    -- 2. Build the baseline entitlements from the plan
    FOR v_rec IN 
        SELECT f.id AS feature_id, pe.limit_value
        FROM public.plan_entitlements pe
        JOIN public.features f ON f.id = pe.feature_id
        WHERE pe.plan_id = v_plan_id
    LOOP
        v_entitlements := jsonb_set(v_entitlements, ARRAY[v_rec.feature_id], to_jsonb(v_rec.limit_value));
    END LOOP;

    -- 3. Overlay team-specific overrides/consumables (PAYG)
    FOR v_rec IN
        SELECT feature_id, SUM(limit_override) AS total_override
        FROM public.team_entitlements
        WHERE team_id = p_team_id AND (expires_at IS NULL OR expires_at > NOW())
        GROUP BY feature_id
    LOOP
        IF v_entitlements ? v_rec.feature_id THEN
            IF (v_entitlements->>v_rec.feature_id) IS NOT NULL THEN
                v_entitlements := jsonb_set(v_entitlements, ARRAY[v_rec.feature_id], to_jsonb(((v_entitlements->>v_rec.feature_id)::INTEGER) + COALESCE(v_rec.total_override, 0)));
            END IF;
        ELSE
            v_entitlements := jsonb_set(v_entitlements, ARRAY[v_rec.feature_id], to_jsonb(COALESCE(v_rec.total_override, 0)));
        END IF;
    END LOOP;

    -- 4. Aggregate metadata from team_entitlements (e.g. unlocked_templates)
    FOR v_rec IN
        SELECT feature_id, metadata
        FROM public.team_entitlements
        WHERE team_id = p_team_id AND metadata IS NOT NULL AND metadata != '{}'::jsonb
    LOOP
        -- If we have an array for unlocked templates, merge it
        IF v_rec.feature_id = 'template.premium' AND (v_rec.metadata ? 'unlocked_templates') THEN
            IF NOT (v_metadata ? 'unlocked_templates') THEN
                v_metadata := jsonb_set(v_metadata, ARRAY['unlocked_templates'], v_rec.metadata->'unlocked_templates');
            ELSE
                -- Merge arrays (Postgres 12+ concatenation)
                v_metadata := jsonb_set(v_metadata, ARRAY['unlocked_templates'], (v_metadata->'unlocked_templates') || (v_rec.metadata->'unlocked_templates'));
            END IF;
        END IF;
        
        -- Could handle other metadata types here in the future
    END LOOP;

    -- If there's metadata, attach it to the root of the entitlements JSON
    IF v_metadata != '{}'::jsonb THEN
        v_entitlements := jsonb_set(v_entitlements, ARRAY['metadata'], v_metadata);
    END IF;

    RETURN v_entitlements;
END;
$$;
GRANT EXECUTE ON FUNCTION public.resolve_team_entitlements(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.resolve_team_entitlements(UUID) TO service_role;

-- 4. Migrate existing PAYG unlocked_invoices array into the new metadata ledger
DO $$
DECLARE
    v_payg RECORD;
    v_team_id UUID;
BEGIN
    FOR v_payg IN SELECT * FROM public.payg_entitlements WHERE unlocked_invoices IS NOT NULL AND array_length(unlocked_invoices, 1) > 0 LOOP
        -- Find the primary team for the user
        SELECT id INTO v_team_id FROM public.teams WHERE owner_id = v_payg.user_id ORDER BY created_at ASC LIMIT 1;
        
        IF v_team_id IS NOT NULL THEN
            -- We update the team_entitlements row that corresponds to template.premium for this team
            UPDATE public.team_entitlements
            SET metadata = jsonb_set(COALESCE(metadata, '{}'::jsonb), ARRAY['unlocked_templates'], to_jsonb(v_payg.unlocked_invoices))
            WHERE team_id = v_team_id AND feature_id = 'template.premium';
            
            -- If no row was updated (meaning they had the array but no row was created during the previous migration somehow), insert it
            IF NOT FOUND THEN
                INSERT INTO public.team_entitlements (team_id, feature_id, limit_override, metadata)
                VALUES (v_team_id, 'template.premium', array_length(v_payg.unlocked_invoices, 1), jsonb_build_object('unlocked_templates', to_jsonb(v_payg.unlocked_invoices)));
            END IF;
        END IF;
    END LOOP;
END;
$$;
