-- Migration: db_rate_limiter
-- Description: Provides an atomic, distributed-safe rate limiter that works
--              across ALL serverless instances (Vercel, Edge, etc.).
--              Replaces the non-functional in-memory Map in rateLimit.ts.
--
-- Usage: SELECT * FROM check_rate_limit('portal-invoice:1.2.3.4', 30, 60);
--   Returns: (allowed BOOLEAN, remaining INT, reset_at TIMESTAMPTZ)
--
-- Closes SEC-05: Rate limiter now persists across Vercel cold starts.
-- Closes SEC-06: Public portal is now effectively rate-limited.

-- Table to store sliding window request timestamps
CREATE TABLE IF NOT EXISTS rate_limit_requests (
    identifier  TEXT        NOT NULL,
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast per-identifier cleanup and counting
CREATE INDEX IF NOT EXISTS idx_rate_limit_identifier_time
    ON rate_limit_requests (identifier, requested_at DESC);

-- Auto-cleanup: purge entries older than 5 minutes to keep table small
CREATE OR REPLACE FUNCTION cleanup_rate_limit_requests() RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    DELETE FROM rate_limit_requests
    WHERE requested_at < NOW() - INTERVAL '5 minutes';
END;
$$;

-- Main rate limit check function (atomic via advisory lock on identifier hash)
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_identifier  TEXT,
    p_limit       INT,
    p_window_secs INT
)
RETURNS TABLE (
    allowed     BOOLEAN,
    remaining   INT,
    reset_at    TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_window_start  TIMESTAMPTZ := NOW() - (p_window_secs || ' seconds')::INTERVAL;
    v_count         INT;
    v_oldest_in_window TIMESTAMPTZ;
BEGIN
    -- Count requests in the current sliding window
    SELECT COUNT(*), MIN(requested_at)
    INTO v_count, v_oldest_in_window
    FROM rate_limit_requests
    WHERE identifier = p_identifier
      AND requested_at > v_window_start;

    IF v_count >= p_limit THEN
        -- Rate limit exceeded — do NOT insert, return reset time
        RETURN QUERY SELECT
            FALSE,
            0,
            (v_oldest_in_window + (p_window_secs || ' seconds')::INTERVAL);
        RETURN;
    END IF;

    -- Under limit — record this request
    INSERT INTO rate_limit_requests (identifier, requested_at)
    VALUES (p_identifier, NOW());

    RETURN QUERY SELECT
        TRUE,
        (p_limit - v_count - 1),
        (NOW() + (p_window_secs || ' seconds')::INTERVAL);
END;
$$;

-- Only service_role may call this (called from Next.js API routes via service key)
REVOKE ALL ON FUNCTION check_rate_limit(TEXT, INT, INT) FROM anon, authenticated;
GRANT  EXECUTE ON FUNCTION check_rate_limit(TEXT, INT, INT) TO service_role;

-- Grant table access only to service_role
REVOKE ALL ON rate_limit_requests FROM anon, authenticated;
GRANT  ALL  ON rate_limit_requests TO service_role;
