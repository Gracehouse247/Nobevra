-- Migration: Add geolocation & activity tracking fields to profiles
-- Non-breaking: all columns are nullable with safe defaults

-- ── Currency geo-detection fields ────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS detected_country TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS currency_set_by TEXT DEFAULT NULL;
-- 'auto' = geo-detected automatically, 'user' = manually changed by user
-- NULL = not yet determined (triggers geo detection on next login)

-- Remove the hardcoded 'NGN' default so NULL signals "not yet detected"
-- Existing rows with 'NGN' that were auto-set will keep their value but new rows start NULL
ALTER TABLE profiles ALTER COLUMN preferred_currency DROP DEFAULT;
ALTER TABLE profiles ALTER COLUMN preferred_currency SET DEFAULT NULL;

-- ── User activity tracking for smart welcome messages ────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_login_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_tour_completed BOOLEAN DEFAULT FALSE;
-- Note: onboarding_completed already exists (for wizard completion)
-- onboarding_tour_completed is for the dashboard tour/checklist

-- Back-fill first_login_at for existing users (use created_at as proxy)
UPDATE profiles
SET first_login_at = created_at
WHERE first_login_at IS NULL AND created_at IS NOT NULL;

-- Add index for fast queries on last_login_at (used for "returning user" detection)
CREATE INDEX IF NOT EXISTS profiles_last_login_at_idx ON profiles(last_login_at);
