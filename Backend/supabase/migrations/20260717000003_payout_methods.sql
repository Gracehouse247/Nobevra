-- Migration: Create payout_methods table

-- 1. Create enum for payout providers if not exists
DO $$ BEGIN
    CREATE TYPE payout_provider AS ENUM ('flutterwave', 'stripe', 'paypal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create enum for payout status if not exists
DO $$ BEGIN
    CREATE TYPE payout_status AS ENUM ('active', 'pending', 'restricted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Create the payout_methods table
CREATE TABLE IF NOT EXISTS public.payout_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider payout_provider NOT NULL,
    status payout_status NOT NULL DEFAULT 'pending',
    is_default BOOLEAN NOT NULL DEFAULT false,
    provider_account_id TEXT, -- e.g., Stripe Account ID, PayPal Email, or FLW Beneficiary ID
    metadata JSONB DEFAULT '{}'::jsonb, -- e.g., bank_name, account_last4
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_payout_methods_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_payout_methods_updated_at_trigger ON public.payout_methods;
CREATE TRIGGER update_payout_methods_updated_at_trigger
    BEFORE UPDATE ON public.payout_methods
    FOR EACH ROW
    EXECUTE FUNCTION update_payout_methods_updated_at();

-- 5. Set up Row Level Security (RLS)
ALTER TABLE public.payout_methods ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own payout methods
DROP POLICY IF EXISTS "Users can view their own payout methods" ON public.payout_methods;
CREATE POLICY "Users can view their own payout methods" 
ON public.payout_methods FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert their own payout methods
DROP POLICY IF EXISTS "Users can insert their own payout methods" ON public.payout_methods;
CREATE POLICY "Users can insert their own payout methods" 
ON public.payout_methods FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own payout methods
DROP POLICY IF EXISTS "Users can update their own payout methods" ON public.payout_methods;
CREATE POLICY "Users can update their own payout methods" 
ON public.payout_methods FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own payout methods
DROP POLICY IF EXISTS "Users can delete their own payout methods" ON public.payout_methods;
CREATE POLICY "Users can delete their own payout methods" 
ON public.payout_methods FOR DELETE 
USING (auth.uid() = user_id);

-- 6. Grant access to authenticated and service_role
GRANT ALL ON TABLE public.payout_methods TO authenticated;
GRANT ALL ON TABLE public.payout_methods TO service_role;
