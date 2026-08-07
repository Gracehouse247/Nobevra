-- ============================================================
-- Help Center Ratings Table
-- Created: 2026-07-06
-- Purpose: Tracks user feedback on Help Center articles.
--          Ratings are submitted anonymously from public pages
--          and viewed by admins in the NobleInvoice admin panel.
-- ============================================================

-- Create the table
CREATE TABLE IF NOT EXISTS public.help_center_ratings (
    id             UUID                     PRIMARY KEY DEFAULT gen_random_uuid(),
    article_slug   TEXT                     NOT NULL,
    category_slug  TEXT                     NOT NULL,
    helpful        BOOLEAN                  NOT NULL,
    user_id        UUID                     REFERENCES auth.users(id) ON DELETE SET NULL,  -- NULL for anonymous visitors
    session_id     TEXT,                                                                   -- Optional: prevent duplicate votes
    created_at     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Table comment (visible in Supabase Studio)
COMMENT ON TABLE public.help_center_ratings IS 'Tracks user feedback (helpful/not helpful) on Help Center articles submitted from the public-facing Help Center.';

-- Indexes for fast admin queries
CREATE INDEX IF NOT EXISTS idx_help_ratings_article   ON public.help_center_ratings (article_slug);
CREATE INDEX IF NOT EXISTS idx_help_ratings_category  ON public.help_center_ratings (category_slug);
CREATE INDEX IF NOT EXISTS idx_help_ratings_created   ON public.help_center_ratings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_help_ratings_helpful   ON public.help_center_ratings (helpful);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE public.help_center_ratings ENABLE ROW LEVEL SECURITY;

-- 1. Anyone (including anonymous visitors) can INSERT a rating.
--    This allows unauthenticated Help Center users to submit feedback.
DROP POLICY IF EXISTS "help_ratings_public_insert" ON public.help_center_ratings;
CREATE POLICY "help_ratings_public_insert"
    ON public.help_center_ratings
    FOR INSERT
    WITH CHECK (true);

-- 2. Only authenticated admin users can SELECT ratings.
--    The Next.js API route uses the service_role key which bypasses RLS,
--    so this policy governs direct Supabase Studio or client-side reads.
DROP POLICY IF EXISTS "help_ratings_admin_select" ON public.help_center_ratings;
CREATE POLICY "help_ratings_admin_select"
    ON public.help_center_ratings
    FOR SELECT
    USING (
        -- Must be a logged-in user with an admin/superadmin role in profiles
        EXISTS (
            SELECT 1
            FROM public.profiles p
            WHERE p.id = auth.uid()
            AND (
                p.is_superadmin = TRUE
                OR p.role IN ('super_admin', 'support_staff', 'seo_manager')
            )
        )
    );

-- 3. No one can UPDATE or DELETE ratings (immutable audit log).
--    If you ever need to clean up, do it directly via the service_role key.
