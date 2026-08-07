-- Migration: gamification
-- Description: Creates the user_gamification table to track XP, badges, and streaks.

CREATE TABLE IF NOT EXISTS public.user_gamification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    unlocked_badges TEXT[] NOT NULL DEFAULT '{}',
    tasks_completed INTEGER NOT NULL DEFAULT 0,
    habits_logged INTEGER NOT NULL DEFAULT 0,
    notes_created INTEGER NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    last_action_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE public.user_gamification ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own gamification data" ON public.user_gamification;
CREATE POLICY "Users can view own gamification data"
    ON public.user_gamification
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert gamification data" ON public.user_gamification;
CREATE POLICY "System can insert gamification data"
    ON public.user_gamification
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can update gamification data" ON public.user_gamification;
CREATE POLICY "System can update gamification data"
    ON public.user_gamification
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Trigger to create gamification record on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_gamification()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_gamification (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_gamification ON auth.users;
CREATE TRIGGER on_auth_user_created_gamification
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_gamification();
