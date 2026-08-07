-- =============================================================================
-- Migration: Payment Methods Table
-- Stores Flutterwave card tokens per user (PCI-compliant tokenization).
-- Industry standard: Never store raw card data. Only Flutterwave tokens.
-- Tokens are extracted from data.card.token in the transaction verify response.
-- =============================================================================

CREATE TABLE IF NOT EXISTS "public"."payment_methods" (
  "id"          uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id"     uuid NOT NULL,
  "token"       text NOT NULL, -- Flutterwave card token e.g. flw-t1nf-xxxxx
  "brand"       text,          -- VISA, MASTERCARD, VERVE, etc.
  "last4"       text,          -- Last 4 digits of the card
  "exp_month"   text,          -- Expiry month e.g. "12"
  "exp_year"    text,          -- Expiry year e.g. "28"
  "card_holder" text,          -- Cardholder name
  "is_default"  boolean NOT NULL DEFAULT false,
  "created_at"  timestamptz DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES auth.users(id) ON DELETE CASCADE,
  UNIQUE ("user_id", "token")  -- Prevent duplicate tokens per user
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON public.payment_methods(user_id);

-- Enable Row Level Security
ALTER TABLE "public"."payment_methods" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own payment methods
CREATE POLICY "payment_methods_select_own"
  ON "public"."payment_methods" FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only insert their own payment methods
CREATE POLICY "payment_methods_insert_own"
  ON "public"."payment_methods" FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own payment methods (e.g. toggle default)
CREATE POLICY "payment_methods_update_own"
  ON "public"."payment_methods" FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only delete their own payment methods
CREATE POLICY "payment_methods_delete_own"
  ON "public"."payment_methods" FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role has full access (for Edge Functions using service key)
CREATE POLICY "payment_methods_service_role_all"
  ON "public"."payment_methods" FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."payment_methods" TO authenticated;
GRANT ALL ON TABLE "public"."payment_methods" TO service_role;
