-- =============================================================================
-- Migration: Zero-Trust Entitlement Triggers & Billing Cycles
-- Purpose: Enforce subscription limits at the database level and track billing cycles.
-- =============================================================================

-- 1. Create billing_cycles table
CREATE TABLE IF NOT EXISTS public.billing_cycles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_date TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup of active cycles
CREATE INDEX IF NOT EXISTS idx_billing_cycles_team_active ON public.billing_cycles(team_id, status);

-- 2. Add missing features to features table
INSERT INTO public.features (id, name, is_metered) VALUES
('settings.custom_domain', 'Custom Domain', false),
('settings.whitelabel', 'Remove NobleInvoice Branding', false),
('api.access', 'API Access', false),
('api.webhooks', 'Webhooks', false),
('storage.documents.mb', 'Document Storage (MB)', true),
('crm.portal.chat', 'Client Portal Live Chat', false),
('vendors.manage', 'Vendor Management', false),
('invoice.recurring', 'Recurring Invoices', false),
('estimates.create', 'Create Estimates/Quotes', true),
('invoice.advanced_editing', 'Advanced Invoice Editing', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Assign limits to Starter plan
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('starter', 'settings.custom_domain', 0),
('starter', 'settings.whitelabel', 0),
('starter', 'api.access', 0),
('starter', 'api.webhooks', 0),
('starter', 'storage.documents.mb', 100), -- 100MB
('starter', 'crm.portal.chat', 0),
('starter', 'vendors.manage', 0),
('starter', 'invoice.recurring', 0),
('starter', 'estimates.create', 3),
('starter', 'invoice.advanced_editing', 0)
ON CONFLICT (plan_id, feature_id) DO UPDATE SET limit_value = EXCLUDED.limit_value;

-- 4. Assign limits to Pulse plan
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('pulse', 'settings.custom_domain', 0),
('pulse', 'settings.whitelabel', 1),
('pulse', 'api.access', 0),
('pulse', 'api.webhooks', 0),
('pulse', 'storage.documents.mb', 1000), -- 1GB
('pulse', 'crm.portal.chat', 1),
('pulse', 'vendors.manage', 0),
('pulse', 'invoice.recurring', 1),
('pulse', 'estimates.create', 10),
('pulse', 'invoice.advanced_editing', 1)
ON CONFLICT (plan_id, feature_id) DO UPDATE SET limit_value = EXCLUDED.limit_value;

-- 5. Assign limits to Elite plan
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('elite', 'settings.custom_domain', 1),
('elite', 'settings.whitelabel', 1),
('elite', 'api.access', 1),
('elite', 'api.webhooks', 1),
('elite', 'storage.documents.mb', 5000), -- 5GB
('elite', 'crm.portal.chat', 1),
('elite', 'vendors.manage', 1),
('elite', 'invoice.recurring', 1),
('elite', 'estimates.create', NULL), -- Unlimited
('elite', 'invoice.advanced_editing', 1)
ON CONFLICT (plan_id, feature_id) DO UPDATE SET limit_value = EXCLUDED.limit_value;

-- =============================================================================
-- Zero-Trust Triggers for Enforcement
-- =============================================================================

-- Invoices Trigger
CREATE OR REPLACE FUNCTION public.check_invoice_limit()
RETURNS TRIGGER AS $$
DECLARE
    v_entitlements JSONB;
    v_limit INT;
    v_usage INT;
BEGIN
    -- Only check limit if it's a new invoice
    IF TG_OP = 'INSERT' THEN
        -- Resolve team entitlements
        v_entitlements := public.resolve_team_entitlements(NEW.team_id);
        
        -- If no entitlements found, deny
        IF v_entitlements IS NULL OR NOT (v_entitlements ? 'invoice.create') THEN
            RAISE EXCEPTION 'Access Denied: Unable to verify invoice limits.';
        END IF;

        -- Extract limit
        v_limit := (v_entitlements->>'invoice.create')::INT;

        -- If limit is NULL, it means unlimited
        IF v_limit IS NULL THEN
            RETURN NEW;
        END IF;

        -- Check usage for current month
        SELECT COALESCE(COUNT(*), 0) INTO v_usage
        FROM public.invoices
        WHERE team_id = NEW.team_id
          AND created_at >= date_trunc('month', NOW());

        IF v_usage >= v_limit THEN
            RAISE EXCEPTION 'Limit Exceeded: You have reached your monthly limit of % invoices.', v_limit;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_invoice_limit ON public.invoices;
CREATE TRIGGER trg_check_invoice_limit
    BEFORE INSERT ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION public.check_invoice_limit();


-- Clients Trigger
CREATE OR REPLACE FUNCTION public.check_client_limit()
RETURNS TRIGGER AS $$
DECLARE
    v_entitlements JSONB;
    v_limit INT;
    v_usage INT;
BEGIN
    IF TG_OP = 'INSERT' THEN
        v_entitlements := public.resolve_team_entitlements(NEW.team_id);
        
        IF v_entitlements IS NULL OR NOT (v_entitlements ? 'client.create') THEN
            RAISE EXCEPTION 'Access Denied: Unable to verify client limits.';
        END IF;

        v_limit := (v_entitlements->>'client.create')::INT;

        IF v_limit IS NULL THEN
            RETURN NEW;
        END IF;

        -- Clients are usually an absolute limit, not per-month
        SELECT COALESCE(COUNT(*), 0) INTO v_usage
        FROM public.clients
        WHERE team_id = NEW.team_id;

        IF v_usage >= v_limit THEN
            RAISE EXCEPTION 'Limit Exceeded: You have reached your limit of % clients.', v_limit;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_client_limit ON public.clients;
CREATE TRIGGER trg_check_client_limit
    BEFORE INSERT ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.check_client_limit();

