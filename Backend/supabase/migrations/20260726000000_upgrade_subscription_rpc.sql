-- =============================================================================
-- Migration: Upgrade User Subscription RPC Update
-- Purpose: Create billing_cycle records when a user upgrades via Flutterwave
-- =============================================================================

CREATE OR REPLACE FUNCTION public.upgrade_user_subscription(target_user_id uuid, target_tier text, is_yearly boolean)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  expiry_interval INTERVAL;
  v_team_id UUID;
BEGIN
  -- Validate tier
  IF target_tier NOT IN ('pulse', 'elite') THEN
    RAISE EXCEPTION 'Invalid subscription tier: %', target_tier;
  END IF;

  IF is_yearly THEN
    expiry_interval := INTERVAL '1 year';
  ELSE
    expiry_interval := INTERVAL '1 month';
  END IF;

  -- 1. Update profiles table
  UPDATE public.profiles
  SET
    subscription_tier       = target_tier,
    subscription_expires_at = NOW() + expiry_interval,
    is_yearly_plan          = is_yearly,
    updated_at              = NOW()
  WHERE id = target_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found: %', target_user_id;
  END IF;

  -- 2. Establish Billing Cycle
  -- Find the user's primary team
  SELECT id INTO v_team_id FROM public.teams WHERE owner_id = target_user_id ORDER BY created_at ASC LIMIT 1;

  IF v_team_id IS NOT NULL THEN
    -- Cancel any active billing cycle for this team
    UPDATE public.billing_cycles
    SET status = 'canceled', updated_at = NOW()
    WHERE team_id = v_team_id AND status = 'active';

    -- Create new active billing cycle
    INSERT INTO public.billing_cycles (team_id, plan_id, start_date, end_date, status)
    VALUES (v_team_id, target_tier, NOW(), NOW() + expiry_interval, 'active');
  END IF;

END;
$function$;
