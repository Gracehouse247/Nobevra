-- Migration: Create Contracts table for E-Signatures
-- Description: Core architecture for creating and signing digital contracts

CREATE TABLE public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    client_id BIGINT REFERENCES public.clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'signed', 'void')),
    terms_html TEXT,
    signature_data TEXT, -- Can be base64 image or signature name
    signed_at TIMESTAMPTZ,
    signed_by TEXT,
    signed_ip TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Contracts Policies
CREATE POLICY "Users can manage their own contracts" 
ON public.contracts 
FOR ALL USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view sent contracts for signing" 
ON public.contracts 
FOR SELECT USING (status IN ('sent', 'signed'));

CREATE POLICY "Public can sign sent contracts" 
ON public.contracts 
FOR UPDATE USING (status = 'sent')
WITH CHECK (status = 'signed');

-- Triggers for updated_at
CREATE TRIGGER handle_contracts_updated_at BEFORE UPDATE ON public.contracts 
  FOR EACH ROW EXECUTE PROCEDURE public.set_nfc_updated_at();
