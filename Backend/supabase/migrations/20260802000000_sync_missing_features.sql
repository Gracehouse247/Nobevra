-- =============================================================================
-- Migration: Sync Missing Features and Adjust Plan Limits
-- Purpose: Adds missing features for frontend parity, bumps Explorer invoice limit to 50,
-- and unlocks wallet.payments for the Explorer tier.
-- =============================================================================

-- 1. Ensure starter plan exists
INSERT INTO public.subscription_plans (id, name, price_monthly, price_yearly) VALUES
('starter', 'Explorer', 0, 0),
('pulse', 'Noble Pulse', 9.99, 99.00),
('elite', 'Noble Elite', 24.99, 249.00)
ON CONFLICT (id) DO NOTHING;

-- 2. Add missing feature IDs
INSERT INTO public.features (id, name, is_metered) VALUES
('brand.whitelabel', 'White-Label Branding', false),
('brand.customdomain', 'Custom Domain', false),
('invoice.recurring', 'Recurring Invoices', false),
('invoice.reminders', 'Auto Payment Reminders', false),
('networking.nfc', 'NFC & QR Business Cards', false),
('products.catalog', 'Product Catalog & Inventory', false),
('products.passport', 'Digital Product Passports', false),
('reports.export', 'Report Export (CSV/PDF)', false),
('reports.tax', 'Advanced Tax Reporting', false),
('wallet.multicurrency', 'Multi-Currency Invoicing', false),
('team.contracts', 'Contracts & E-Signature', false),
('contracts.create', 'Create Contracts', false),
('crm.livechat', 'Client Portal Live Chat', false),
('crm.full', 'Full CRM Suite', false),
('vendor.management', 'Vendor Management', false),
('settings.team', 'Team Settings (alias)', false),
('developer.api', 'API Access (alias)', false),
('expenses.receipt_scan', 'Receipt Scanning', true),
('ai.receipt', 'AI Receipt Scanning (alias)', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Update Explorer (Starter) Entitlements
-- Set missing features to 0
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('starter', 'brand.whitelabel', 0),
('starter', 'brand.customdomain', 0),
('starter', 'invoice.recurring', 0),
('starter', 'invoice.reminders', 0),
('starter', 'networking.nfc', 0),
('starter', 'products.catalog', 0),
('starter', 'products.passport', 0),
('starter', 'reports.export', 0),
('starter', 'reports.tax', 0),
('starter', 'wallet.multicurrency', 0),
('starter', 'team.contracts', 0),
('starter', 'contracts.create', 0),
('starter', 'crm.livechat', 0),
('starter', 'crm.full', 0),
('starter', 'vendor.management', 0),
('starter', 'settings.team', 0),
('starter', 'developer.api', 0),
('starter', 'expenses.receipt_scan', 0),
('starter', 'ai.receipt', 0)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- Adjust limits for Explorer
UPDATE public.plan_entitlements SET limit_value = 50 WHERE plan_id = 'starter' AND feature_id = 'invoice.create';
UPDATE public.plan_entitlements SET limit_value = 1 WHERE plan_id = 'starter' AND feature_id = 'wallet.payments'; -- Open payments

-- 3. Update Pulse Entitlements
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('pulse', 'brand.whitelabel', 1),
('pulse', 'brand.customdomain', 0),
('pulse', 'invoice.recurring', 1),
('pulse', 'invoice.reminders', 1),
('pulse', 'networking.nfc', 1),
('pulse', 'products.catalog', 1),
('pulse', 'products.passport', 1),
('pulse', 'reports.export', 0),
('pulse', 'reports.tax', 0),
('pulse', 'wallet.multicurrency', 1), -- Moved down to Pulse
('pulse', 'team.contracts', 0),
('pulse', 'contracts.create', 0),
('pulse', 'crm.livechat', 1),
('pulse', 'crm.full', 1),
('pulse', 'vendor.management', 0),
('pulse', 'settings.team', 0),
('pulse', 'developer.api', 0),
('pulse', 'expenses.receipt_scan', 1),
('pulse', 'ai.receipt', 1)
ON CONFLICT (plan_id, feature_id) DO NOTHING;

-- 4. Update Elite Entitlements
INSERT INTO public.plan_entitlements (plan_id, feature_id, limit_value) VALUES
('elite', 'brand.whitelabel', 1),
('elite', 'brand.customdomain', 1),
('elite', 'invoice.recurring', 1),
('elite', 'invoice.reminders', 1),
('elite', 'networking.nfc', 1),
('elite', 'products.catalog', 1),
('elite', 'products.passport', 1),
('elite', 'reports.export', 1),
('elite', 'reports.tax', 1),
('elite', 'wallet.multicurrency', 1),
('elite', 'team.contracts', 1),
('elite', 'contracts.create', 1),
('elite', 'crm.livechat', 1),
('elite', 'crm.full', 1),
('elite', 'vendor.management', 1),
('elite', 'settings.team', 1),
('elite', 'developer.api', 1),
('elite', 'expenses.receipt_scan', 1),
('elite', 'ai.receipt', 1)
ON CONFLICT (plan_id, feature_id) DO NOTHING;
