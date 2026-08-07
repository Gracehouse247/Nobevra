-- Add new fields for Profile Details and Localization
ALTER TABLE "public"."profiles"
ADD COLUMN IF NOT EXISTS "bio" text,
ADD COLUMN IF NOT EXISTS "website" text,
ADD COLUMN IF NOT EXISTS "timezone" text;
