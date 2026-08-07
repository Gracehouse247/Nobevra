-- Migration: Create NFC Cards mapping table
-- Description: Maps a physical NFC hardware serial number to a user's digital profile URL.

CREATE TABLE public.nfc_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    profile_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.nfc_cards ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can resolve active NFC cards" 
ON public.nfc_cards FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can read own nfc cards" 
ON public.nfc_cards FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own nfc cards" 
ON public.nfc_cards FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger using a self-contained PL/pgSQL function
CREATE OR REPLACE FUNCTION public.set_nfc_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER handle_nfc_updated_at
  BEFORE UPDATE ON public.nfc_cards
  FOR EACH ROW EXECUTE PROCEDURE public.set_nfc_updated_at();
