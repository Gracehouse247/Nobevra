-- Migration: Create API Keys and Webhooks tables for Elite Tier
-- Description: Core architecture for API access and Webhook dispatching

CREATE TABLE public.api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    key_hash TEXT UNIQUE NOT NULL,
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    endpoint_url TEXT NOT NULL,
    secret TEXT NOT NULL,
    events TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;

-- API Keys Policies
CREATE POLICY "Users can manage their own API keys" 
ON public.api_keys 
FOR ALL USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Webhooks Policies
CREATE POLICY "Users can manage their own webhooks" 
ON public.webhooks 
FOR ALL USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER handle_api_keys_updated_at BEFORE UPDATE ON public.api_keys 
  FOR EACH ROW EXECUTE PROCEDURE public.set_nfc_updated_at();

CREATE TRIGGER handle_webhooks_updated_at BEFORE UPDATE ON public.webhooks 
  FOR EACH ROW EXECUTE PROCEDURE public.set_nfc_updated_at();
