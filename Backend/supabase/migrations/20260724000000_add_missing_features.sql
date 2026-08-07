-- =============================================================================
-- Migration: Add Missing Features to Entitlement Platform
-- Purpose: Adds brand.studio and wallet.payments feature IDs used by the frontend
-- =============================================================================

-- Add missing feature IDs
INSERT INTO public.features (id, name, is_metered) VALUES
('brand.studio', 'Brand Identity Studio', false),
('wallet.payments', 'Wallet & Payments', false)
ON CONFLICT (id) DO NOTHING;

-- Starter: No access to brand studio or wallet
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('starter', 'brand.studio', 0),
('starter', 'wallet.payments', 0)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- Pulse: Has access to brand studio and wallet
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('pulse', 'brand.studio', 1),
('pulse', 'wallet.payments', 1)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- Elite: Has access to brand studio and wallet
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('elite', 'brand.studio', 1),
('elite', 'wallet.payments', 1)
ON CONFLICT (plan_id, feature_id) DO NOTHING;
