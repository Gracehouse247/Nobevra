-- ============================================================================
-- Migration: 20260820120000_nobevra_backend_rebrand.sql
-- Description: Rebrand SEO settings defaults and feature labels to Nobevra
-- Safety: Non-destructive, idempotent data & column default updates.
-- ============================================================================

DO $$
BEGIN
    -- 1. Update features table display name for settings.whitelabel
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'features'
    ) THEN
        UPDATE public.features 
        SET name = 'Remove Nobevra Branding'
        WHERE id = 'settings.whitelabel';
    END IF;

    -- 2. Update existing rows and column defaults in seo_settings
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'seo_settings'
    ) THEN
        -- Update existing default record if present
        UPDATE public.seo_settings 
        SET 
            default_meta_title = 'Nobevra - The Intelligent Business Operating System',
            og_defaults = jsonb_set(
                COALESCE(og_defaults, '{}'::jsonb), 
                '{og:site_name}', 
                '"Nobevra"'::jsonb
            ),
            updated_at = NOW()
        WHERE default_meta_title LIKE '%NobleInvoice%' 
           OR og_defaults->>'og:site_name' = 'NobleInvoice';

        -- Update column default values for future rows
        ALTER TABLE public.seo_settings 
            ALTER COLUMN default_meta_title SET DEFAULT 'Nobevra - The Intelligent Business Operating System',
            ALTER COLUMN og_defaults SET DEFAULT '{"og:type": "website", "og:locale": "en_US", "og:site_name": "Nobevra"}'::jsonb;
    END IF;
END $$;
