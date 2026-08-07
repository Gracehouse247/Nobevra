-- =============================================================================
-- Migration: Subscription Quotas & Usage Tracking (Industry Standard Enforcement)
-- Purpose: Upgrades `resolve_user_limits` to the new pricing tiers and implements
-- PostgreSQL Triggers for ZERO-TRUST feature gating at the database level.
-- =============================================================================

-- 1. Refactor resolve_user_limits RPC
CREATE OR REPLACE FUNCTION public.resolve_user_limits(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_tier TEXT;
    v_payg RECORD;
    v_result JSONB;
BEGIN
    SELECT COALESCE(subscription_tier, 'explorer') INTO v_tier
    FROM public.profiles
    WHERE id = p_user_id;

    IF v_tier IS NULL THEN
        v_tier := 'explorer';
    END IF;

    SELECT * INTO v_payg
    FROM public.payg_entitlements
    WHERE user_id = p_user_id;

    -- Define JSON based on Tier
    IF v_tier = 'elite' THEN
        v_result := jsonb_build_object(
            'tier', 'elite',
            'limits', jsonb_build_object(
                'max_invoices_per_month', -1,
                'max_clients', -1,
                'edit_clients_per_month', -1,
                'edit_invoices_per_month', -1,
                'ai_voice_limit', 15,
                'receipt_scan_limit', 15,
                'document_vault_size_mb', 5000, -- 5GB
                'estimates_limit', -1,
                'allowed_templates', jsonb_build_array('*'),
                'dpp_image_limit', -1
            ),
            'features', jsonb_build_object(
                'recurring_invoices', true,
                'inventory_management', true,
                'analytics_and_reports', true,
                'multi_user', true,
                'contracts_and_esignature', true,
                'dpp_enabled', true,
                'ai_voice_assistant', true,
                'wallet_payments', true,
                'marketing_networking', true,
                'brand_identity_studio', true,
                'autonomous_seo', true,
                'api_and_webhooks', true,
                'advanced_tax_reporting', true,
                'watermark_pdf', true,
                'dedicated_account_manager', true,
                'vendor_management', true,
                'multi_currency', true
            )
        );
    ELSIF v_tier = 'pulse' THEN
        v_result := jsonb_build_object(
            'tier', 'pulse',
            'limits', jsonb_build_object(
                'max_invoices_per_month', -1,
                'max_clients', -1,
                'edit_clients_per_month', 5,
                'edit_invoices_per_month', 5,
                'ai_voice_limit', 5,
                'receipt_scan_limit', 5,
                'document_vault_size_mb', 1000, -- 1GB (requested reduction)
                'estimates_limit', 10,
                'allowed_templates', jsonb_build_array('*'),
                'dpp_image_limit', -1
            ),
            'features', jsonb_build_object(
                'recurring_invoices', true,
                'inventory_management', true,
                'analytics_and_reports', true,
                'multi_user', false,
                'contracts_and_esignature', false,
                'dpp_enabled', true,
                'ai_voice_assistant', true,
                'wallet_payments', true,
                'marketing_networking', true,
                'brand_identity_studio', true,
                'autonomous_seo', false,
                'api_and_webhooks', false,
                'advanced_tax_reporting', false,
                'watermark_pdf', false,
                'dedicated_account_manager', false,
                'vendor_management', true,
                'multi_currency', true
            )
        );
    ELSE
        -- Free (Starter) / PAYG
        v_result := jsonb_build_object(
            'tier', 'explorer',
            'limits', jsonb_build_object(
                'max_invoices_per_month', 10,
                'max_clients', 5 + COALESCE(v_payg.client_slots, 0),
                'edit_clients_per_month', 0,
                'edit_invoices_per_month', 0,
                'ai_voice_limit', 0,
                'receipt_scan_limit', 0,
                'document_vault_size_mb', 100, -- 100MB
                'estimates_limit', 3,
                'allowed_templates', COALESCE(to_jsonb(v_payg.unlocked_invoices), '[]'::jsonb),
                'dpp_image_limit', (COALESCE(v_payg.dpp_credits, 0) * 3)
            ),
            'features', jsonb_build_object(
                'recurring_invoices', false,
                'inventory_management', false,
                'analytics_and_reports', false,
                'multi_user', false,
                'contracts_and_esignature', false,
                'dpp_enabled', (COALESCE(v_payg.dpp_credits, 0) > 0),
                'ai_voice_assistant', false,
                'wallet_payments', false,
                'marketing_networking', false,
                'brand_identity_studio', false,
                'autonomous_seo', false,
                'api_and_webhooks', false,
                'advanced_tax_reporting', false,
                'watermark_pdf', false,
                'dedicated_account_manager', false,
                'vendor_management', false,
                'multi_currency', false
            )
        );
    END IF;

    RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.resolve_user_limits(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.resolve_user_limits(UUID) TO service_role;


-- =============================================================================
-- 2. ENFORCEMENT TRIGGERS (Zero Trust Quotas)
-- =============================================================================

-- Ensure usage_metrics can track "edits"
ALTER TABLE public.usage_metrics ADD COLUMN IF NOT EXISTS clients_edited_this_month INTEGER DEFAULT 0;
ALTER TABLE public.usage_metrics ADD COLUMN IF NOT EXISTS invoices_edited_this_month INTEGER DEFAULT 0;

-- Function: Enforce Invoice Creation Limit
CREATE OR REPLACE FUNCTION public.check_invoice_insert_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_limits JSONB;
    v_max_invoices INTEGER;
    v_current_count INTEGER;
BEGIN
    -- Get user limits via team owner
    v_limits := public.resolve_user_limits((SELECT owner_id FROM public.teams WHERE id = NEW.team_id));
    v_max_invoices := (v_limits->'limits'->>'max_invoices_per_month')::INTEGER;

    IF v_max_invoices != -1 THEN
        -- Count invoices created this month
        SELECT COUNT(*) INTO v_current_count
        FROM public.invoices
        WHERE team_id = NEW.team_id
          AND created_at >= date_trunc('month', CURRENT_DATE);

        IF v_current_count >= v_max_invoices THEN
            RAISE EXCEPTION 'Invoice creation limit reached for your subscription plan. Upgrade to create more.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_check_invoice_insert_limit ON public.invoices;
CREATE TRIGGER trg_check_invoice_insert_limit
    BEFORE INSERT ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION public.check_invoice_insert_limit();


-- Function: Enforce Client Creation Limit
CREATE OR REPLACE FUNCTION public.check_client_insert_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_limits JSONB;
    v_max_clients INTEGER;
    v_current_count INTEGER;
BEGIN
    v_limits := public.resolve_user_limits((SELECT owner_id FROM public.teams WHERE id = NEW.team_id));
    v_max_clients := (v_limits->'limits'->>'max_clients')::INTEGER;

    IF v_max_clients != -1 THEN
        SELECT COUNT(*) INTO v_current_count
        FROM public.clients
        WHERE team_id = NEW.team_id;

        IF v_current_count >= v_max_clients THEN
            RAISE EXCEPTION 'Client limit reached for your subscription plan. Upgrade to add more clients.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_check_client_insert_limit ON public.clients;
CREATE TRIGGER trg_check_client_insert_limit
    BEFORE INSERT ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.check_client_insert_limit();


-- Function: Track and Enforce "Client Edits"
CREATE OR REPLACE FUNCTION public.track_client_edit_quota()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_owner_id UUID;
    v_limits JSONB;
    v_edit_limit INTEGER;
    v_current_usage INTEGER;
BEGIN
    -- Only trigger on actual data changes
    IF ROW(OLD.*) IS NOT DISTINCT FROM ROW(NEW.*) THEN
        RETURN NEW;
    END IF;

    SELECT owner_id INTO v_owner_id FROM public.teams WHERE id = NEW.team_id;
    v_limits := public.resolve_user_limits(v_owner_id);
    v_edit_limit := (v_limits->'limits'->>'edit_clients_per_month')::INTEGER;

    IF v_edit_limit != -1 THEN
        -- Check and update usage_metrics
        SELECT clients_edited_this_month INTO v_current_usage
        FROM public.usage_metrics 
        WHERE user_id = v_owner_id AND month_year = to_char(CURRENT_DATE, 'YYYY-MM');

        IF v_current_usage IS NULL THEN
            v_current_usage := 0;
            INSERT INTO public.usage_metrics (user_id, month_year, clients_edited_this_month)
            VALUES (v_owner_id, to_char(CURRENT_DATE, 'YYYY-MM'), 0)
            ON CONFLICT DO NOTHING;
        END IF;

        IF v_current_usage >= v_edit_limit THEN
            RAISE EXCEPTION 'You have reached your limit of editing % clients this month. Upgrade your plan.', v_edit_limit;
        END IF;

        -- Increment usage
        UPDATE public.usage_metrics
        SET clients_edited_this_month = clients_edited_this_month + 1,
            updated_at = NOW()
        WHERE user_id = v_owner_id AND month_year = to_char(CURRENT_DATE, 'YYYY-MM');
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_track_client_edit_quota ON public.clients;
CREATE TRIGGER trg_track_client_edit_quota
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.track_client_edit_quota();


-- Function: Track and Enforce "Invoice Edits"
CREATE OR REPLACE FUNCTION public.track_invoice_edit_quota()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_owner_id UUID;
    v_limits JSONB;
    v_edit_limit INTEGER;
    v_current_usage INTEGER;
BEGIN
    -- Ignore status updates (e.g. paid) so we only bill for content edits
    IF OLD.status IS DISTINCT FROM NEW.status AND 
       OLD.invoice_number = NEW.invoice_number AND
       OLD.amount_due = NEW.amount_due THEN
        RETURN NEW;
    END IF;

    SELECT owner_id INTO v_owner_id FROM public.teams WHERE id = NEW.team_id;
    v_limits := public.resolve_user_limits(v_owner_id);
    v_edit_limit := (v_limits->'limits'->>'edit_invoices_per_month')::INTEGER;

    IF v_edit_limit != -1 THEN
        SELECT invoices_edited_this_month INTO v_current_usage
        FROM public.usage_metrics 
        WHERE user_id = v_owner_id AND month_year = to_char(CURRENT_DATE, 'YYYY-MM');

        IF v_current_usage IS NULL THEN
            v_current_usage := 0;
            INSERT INTO public.usage_metrics (user_id, month_year, invoices_edited_this_month)
            VALUES (v_owner_id, to_char(CURRENT_DATE, 'YYYY-MM'), 0)
            ON CONFLICT DO NOTHING;
        END IF;

        IF v_current_usage >= v_edit_limit THEN
            RAISE EXCEPTION 'You have reached your limit of editing % invoices this month. Upgrade your plan.', v_edit_limit;
        END IF;

        UPDATE public.usage_metrics
        SET invoices_edited_this_month = invoices_edited_this_month + 1,
            updated_at = NOW()
        WHERE user_id = v_owner_id AND month_year = to_char(CURRENT_DATE, 'YYYY-MM');
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_track_invoice_edit_quota ON public.invoices;
CREATE TRIGGER trg_track_invoice_edit_quota
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION public.track_invoice_edit_quota();
