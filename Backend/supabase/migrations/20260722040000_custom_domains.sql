-- Migration: Create Custom Domains table for White-Label Elite feature
-- Description: Stores user's custom domains for serving invoices.

CREATE TABLE public.custom_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    domain_name TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'active', 'failed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.custom_domains ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own custom domains" 
ON public.custom_domains 
FOR ALL USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- System needs to read domains for middleware rewriting without user context (service_role or anon if public)
CREATE POLICY "System can read custom domains" 
ON public.custom_domains 
FOR SELECT USING (status = 'active');

-- Triggers for updated_at
CREATE TRIGGER handle_domains_updated_at BEFORE UPDATE ON public.custom_domains 
  FOR EACH ROW EXECUTE PROCEDURE public.set_nfc_updated_at();
