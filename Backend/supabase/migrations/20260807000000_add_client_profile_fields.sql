-- =============================================================================
-- Migration: Add missing client profile fields
-- Purpose: Add position and website columns to the clients table.
--          The frontend edit form sends these fields but they were missing
--          from the schema, causing all client update saves to fail with
--          "Failed to save changes" (Supabase returns an error for unknown columns).
-- =============================================================================

ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS website  TEXT;

-- Refresh PostgREST schema cache so the new columns are immediately available
NOTIFY pgrst, 'reload schema';
