-- Migration for GDPR Data Export and Account Deletion

-- 1. Create data_exports table
CREATE TABLE IF NOT EXISTS "public"."data_exports" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "user_id" uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "export_name" text NOT NULL,
    "status" text NOT NULL DEFAULT 'completed',
    "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE "public"."data_exports" ENABLE ROW LEVEL SECURITY;

-- Policy for data_exports
CREATE POLICY "Users can view their own exports" ON "public"."data_exports"
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exports" ON "public"."data_exports"
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. Add deletion tracking to profiles
ALTER TABLE "public"."profiles"
ADD COLUMN IF NOT EXISTS "pending_deletion" boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS "deletion_scheduled_at" timestamp with time zone;
