-- Migration: Create NFC Tags Table for Business Card Networking
-- This table maps hardware NFC tags to a user's digital business card URL

CREATE TABLE IF NOT EXISTS public.nfc_tags (
    id text PRIMARY KEY,
    team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
    target_url text NOT NULL,
    status text DEFAULT 'active',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.nfc_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read of NFC tags (required for the redirect API)
CREATE POLICY "Public can view active NFC tags" 
ON public.nfc_tags FOR SELECT 
USING (status = 'active');

-- Owners/Admins can manage their team's NFC tags
CREATE POLICY "Team owners and admins can manage NFC tags" 
ON public.nfc_tags 
USING (
  EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_members.team_id = nfc_tags.team_id 
    AND team_members.user_id = auth.uid() 
    AND team_members.role = ANY (ARRAY['owner'::text, 'admin'::text])
  )
);
