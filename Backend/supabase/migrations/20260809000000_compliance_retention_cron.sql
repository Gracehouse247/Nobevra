-- 20260809000000_compliance_retention_cron.sql
-- Description: Enforces GDPR/NDPA data retention limits using pg_cron.
-- Features:
-- 1. Purges QR scan device_info older than 90 days
-- 2. Purges AI usage logs older than 1 year
-- 3. Purges Audit logs older than 1 year
-- 4. Hard-deletes users whose deletion_scheduled_at has passed

CREATE EXTENSION IF NOT EXISTS pg_cron;

DO $outer$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    RAISE NOTICE 'pg_cron extension not found — skipping cron schedules. Enable pg_cron in the Supabase dashboard to activate.';
    RETURN;
  END IF;

  -- 1. Purge old QR scan analytics (Keep only 90 days)
  -- The policy says QR analytics should only be kept as long as reasonably necessary.
  PERFORM cron.schedule(
    'purge_old_qr_scans',
    '0 1 * * *',
    $cmd$
    UPDATE public.qr_scans
    SET device_info = NULL, location = NULL
    WHERE created_at < NOW() - INTERVAL '90 days';
    $cmd$
  );

  -- 2. Purge old AI usage logs (Keep only 1 year)
  PERFORM cron.schedule(
    'purge_old_ai_logs',
    '0 2 * * *',
    $cmd$
    DELETE FROM public.ai_usage_logs
    WHERE created_at < NOW() - INTERVAL '1 year';
    $cmd$
  );

  -- 3. Purge old audit logs (Keep only 1 year)
  PERFORM cron.schedule(
    'purge_old_audit_logs',
    '0 3 * * *',
    $cmd$
    DELETE FROM public.audit_logs
    WHERE created_at < NOW() - INTERVAL '1 year';
    $cmd$
  );

  -- 4. Process Hard Deletions
  -- Deletes auth.users where profiles.deletion_scheduled_at < NOW()
  -- auth.users deletion cascades to profiles, invoices, clients, etc.
  PERFORM cron.schedule(
    'process_hard_deletions',
    '0 4 * * *',
    $cmd$
    DELETE FROM auth.users
    WHERE id IN (
      SELECT id FROM public.profiles
      WHERE pending_deletion = true
      AND deletion_scheduled_at < NOW()
    );
    $cmd$
  );

END
$outer$;
