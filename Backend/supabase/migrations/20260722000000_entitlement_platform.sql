-- =============================================================================
-- Migration: Entitlement Platform (Phase 1)
-- Purpose: Introduces the Core Enterprise Architecture for Feature Entitlements
-- separating billing plans from actual application features.
-- =============================================================================

-- 1. features table
CREATE TABLE IF NOT EXISTS public.features (
    id TEXT PRIMARY KEY, -- e.g., 'invoice.create', 'ai.voice'
    name TEXT NOT NULL,
    description TEXT,
    is_metered BOOLEAN DEFAULT false, -- If true, uses limits. If false, it's boolean (has access).
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Features are viewable by all" ON public.features FOR SELECT USING (true);

-- 2. subscription_plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id TEXT PRIMARY KEY, -- e.g., 'starter', 'pulse', 'elite'
    name TEXT NOT NULL,
    description TEXT,
    price_monthly NUMERIC(10,2) NOT NULL DEFAULT 0,
    price_yearly NUMERIC(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plans are viewable by all" ON public.subscription_plans FOR SELECT USING (true);

-- 3. plan_entitlements table
CREATE TABLE IF NOT EXISTS public.plan_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id) ON DELETE CASCADE,
    feature_id TEXT NOT NULL REFERENCES public.features(id) ON DELETE CASCADE,
    limit_value INTEGER, -- NULL means unlimited or not applicable (if boolean). -1 could also mean unlimited. Let's use NULL for unlimited.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(plan_id, feature_id)
);
ALTER TABLE public.plan_entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plan entitlements are viewable by all" ON public.plan_entitlements FOR SELECT USING (true);

-- 4. team_entitlements table (Consumable Ledger / PAYG)
-- This maps specific organizations/teams to feature limits, acting as a ledger of overrides.
CREATE TABLE IF NOT EXISTS public.team_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    feature_id TEXT NOT NULL REFERENCES public.features(id) ON DELETE CASCADE,
    limit_override INTEGER, -- Hard limit override (e.g. they bought +5 AI uses). If it's a consumable, this represents the total capacity.
    expires_at TIMESTAMPTZ, -- For one-time purchases that expire
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, feature_id)
);
ALTER TABLE public.team_entitlements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams view their own entitlements" ON public.team_entitlements FOR SELECT USING (
    team_id IN (SELECT id FROM public.teams WHERE owner_id = auth.uid() OR id IN (SELECT team_id FROM public.team_members WHERE user_id = auth.uid()))
);

-- 5. team_usage table (Unified Usage Tracking)
CREATE TABLE IF NOT EXISTS public.team_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    feature_id TEXT NOT NULL REFERENCES public.features(id) ON DELETE CASCADE,
    period_start DATE NOT NULL, -- e.g., 2026-07-01
    used_amount INTEGER DEFAULT 0 NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, feature_id, period_start)
);
ALTER TABLE public.team_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams view their own usage" ON public.team_usage FOR SELECT USING (
    team_id IN (SELECT id FROM public.teams WHERE owner_id = auth.uid() OR id IN (SELECT team_id FROM public.team_members WHERE user_id = auth.uid()))
);

-- 6. Seed Core Data
INSERT INTO public.subscription_plans (id, name, price_monthly, price_yearly) VALUES
('starter', 'Starter', 0, 0),
('pulse', 'Noble Pulse', 9.99, 99.00),
('elite', 'Noble Elite', 24.99, 249.00)
ON CONFLICT (id) DO NOTHING;

-- Base Features (Granular)
INSERT INTO public.features (id, name, is_metered) VALUES
('invoice.create', 'Create Invoices', true),
('client.create', 'Create Clients', true),
('template.basic', 'Basic Invoice Templates', true),
('template.premium', 'Premium Invoice Templates', true),
('ai.voice', 'AI Voice Assistant', true),
('receipt.scan', 'Receipt Scanning', true),
('storage.documents.mb', 'Document Vault Storage (MB)', true),
('estimates.create', 'Create Estimates', true),
('invoice.watermark', 'Remove Watermark', false),
('crm.portal', 'Client Portal', false),
('api.access', 'API Access', false),
('team.members', 'Team Members', true),
('invoice.advanced_editing', 'Advanced Editing & Versioning', false)
ON CONFLICT (id) DO NOTHING;

-- Seed Plan Entitlements
-- Starter
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('starter', 'invoice.create', 10),
('starter', 'client.create', 5),
('starter', 'template.basic', 5),
('starter', 'template.premium', 0),
('starter', 'ai.voice', 0),
('starter', 'receipt.scan', 0),
('starter', 'storage.documents.mb', 100),
('starter', 'estimates.create', 3),
('starter', 'invoice.watermark', 0), -- 0 means false
('starter', 'crm.portal', 0),
('starter', 'api.access', 0),
('starter', 'team.members', 0),
('starter', 'invoice.advanced_editing', 0)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- Pulse
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('pulse', 'invoice.create', NULL), -- Unlimited
('pulse', 'client.create', NULL),
('pulse', 'template.basic', NULL),
('pulse', 'template.premium', NULL),
('pulse', 'ai.voice', 5),
('pulse', 'receipt.scan', 5),
('pulse', 'storage.documents.mb', 1000), -- 1GB
('pulse', 'estimates.create', 10),
('pulse', 'invoice.watermark', 1), -- 1 means true
('pulse', 'crm.portal', 1),
('pulse', 'api.access', 0),
('pulse', 'team.members', 0),
('pulse', 'invoice.advanced_editing', 1)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- Elite
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('elite', 'invoice.create', NULL),
('elite', 'client.create', NULL),
('elite', 'template.basic', NULL),
('elite', 'template.premium', NULL),
('elite', 'ai.voice', 15),
('elite', 'receipt.scan', 15),
('elite', 'storage.documents.mb', 5000), -- 5GB
('elite', 'estimates.create', NULL),
('elite', 'invoice.watermark', 1),
('elite', 'crm.portal', 1),
('elite', 'api.access', 1),
('elite', 'team.members', NULL),
('elite', 'invoice.advanced_editing', 1)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- =============================================================================
-- 7. The Core Entitlement RPC (resolve_team_entitlements)
-- =============================================================================
-- This RPC takes a team_id and returns a complete map of available features and limits.
CREATE OR REPLACE FUNCTION public.resolve_team_entitlements(p_team_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_owner_id UUID;
    v_plan_id TEXT;
    v_entitlements JSONB := '{}'::JSONB;
    v_rec RECORD;
BEGIN
    -- 1. Find the team owner and their plan
    SELECT owner_id INTO v_owner_id FROM public.teams WHERE id = p_team_id;
    
    SELECT COALESCE(subscription_tier, 'starter') INTO v_plan_id
    FROM public.profiles WHERE id = v_owner_id;

    -- Ensure plan_id is valid, default to starter
    IF v_plan_id NOT IN ('starter', 'pulse', 'elite') THEN
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
        -- If it's a metered feature, add to the base limit. If boolean, overwrite.
        IF v_entitlements ? v_rec.feature_id THEN
            IF (v_entitlements->>v_rec.feature_id) IS NOT NULL THEN
                v_entitlements := jsonb_set(v_entitlements, ARRAY[v_rec.feature_id], to_jsonb(((v_entitlements->>v_rec.feature_id)::INTEGER) + v_rec.total_override));
            ELSE
                -- Base was unlimited (NULL), so keep it NULL
                CONTINUE;
            END IF;
        ELSE
            -- Didn't exist in base plan, set it
            v_entitlements := jsonb_set(v_entitlements, ARRAY[v_rec.feature_id], to_jsonb(v_rec.total_override));
        END IF;
    END LOOP;

    RETURN v_entitlements;
END;
$$;
GRANT EXECUTE ON FUNCTION public.resolve_team_entitlements(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.resolve_team_entitlements(UUID) TO service_role;


-- =============================================================================
-- 8. PAYG Migration Script (One-Time Execution)
-- =============================================================================
-- Migrates existing payg_entitlements into the new team_entitlements ledger
DO $$
DECLARE
    v_payg RECORD;
    v_team_id UUID;
    v_template TEXT;
BEGIN
    FOR v_payg IN SELECT * FROM public.payg_entitlements LOOP
        -- Get the user's primary team (or create one if we had a function, assuming they have one)
        SELECT id INTO v_team_id FROM public.teams WHERE owner_id = v_payg.user_id ORDER BY created_at ASC LIMIT 1;
        
        IF v_team_id IS NOT NULL THEN
            -- Migrate Client Slots
            IF COALESCE(v_payg.client_slots, 0) > 0 THEN
                INSERT INTO public.team_entitlements (team_id, feature_id, limit_override)
                VALUES (v_team_id, 'client.create', v_payg.client_slots)
                ON CONFLICT (team_id, feature_id) DO UPDATE SET limit_override = public.team_entitlements.limit_override + EXCLUDED.limit_override;
            END IF;

            -- Migrate DPP Credits (Assume 3 images per credit = mapped to storage mb or just a custom feature)
            -- For now, let's map it to storage (e.g. 10MB per credit)
            IF COALESCE(v_payg.dpp_credits, 0) > 0 THEN
                INSERT INTO public.team_entitlements (team_id, feature_id, limit_override)
                VALUES (v_team_id, 'storage.documents.mb', v_payg.dpp_credits * 10)
                ON CONFLICT (team_id, feature_id) DO UPDATE SET limit_override = public.team_entitlements.limit_override + EXCLUDED.limit_override;
            END IF;

            -- Migrate Unlocked Invoices (Templates)
            IF v_payg.unlocked_invoices IS NOT NULL AND jsonb_array_length(v_payg.unlocked_invoices) > 0 THEN
                -- In the new system, template unlocks are boolean (limit_override = 1) for specific features.
                -- We'd need generic feature IDs for templates, e.g., 'template.premium.modern'
                -- For now, we will add generic 'template.premium' credits.
                INSERT INTO public.team_entitlements (team_id, feature_id, limit_override)
                VALUES (v_team_id, 'template.premium', jsonb_array_length(v_payg.unlocked_invoices))
                ON CONFLICT (team_id, feature_id) DO UPDATE SET limit_override = public.team_entitlements.limit_override + EXCLUDED.limit_override;
            END IF;
        END IF;
    END LOOP;
END;
$$;

-- =============================================================================
-- 9. Version History Tables (To Prevent Abuse of Unlimited Edits)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.invoice_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id BIGINT NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    snapshot JSONB NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.invoice_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams view their own invoice versions" ON public.invoice_versions FOR SELECT USING (
    team_id IN (SELECT id FROM public.teams WHERE owner_id = auth.uid() OR id IN (SELECT team_id FROM public.team_members WHERE user_id = auth.uid()))
);

CREATE OR REPLACE FUNCTION public.snapshot_invoice_on_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_version INTEGER;
BEGIN
    -- Only snapshot if major fields changed
    IF ROW(OLD.client_id, OLD.amount_due, OLD.status, OLD.items) IS DISTINCT FROM ROW(NEW.client_id, NEW.amount_due, NEW.status, NEW.items) THEN
        SELECT COALESCE(MAX(version_number), 0) + 1 INTO v_version
        FROM public.invoice_versions WHERE invoice_id = NEW.id;

        INSERT INTO public.invoice_versions (invoice_id, team_id, version_number, snapshot, created_by)
        VALUES (NEW.id, NEW.team_id, v_version, to_jsonb(OLD), auth.uid());
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_snapshot_invoice_on_update ON public.invoices;
CREATE TRIGGER trg_snapshot_invoice_on_update
    AFTER UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION public.snapshot_invoice_on_update();

