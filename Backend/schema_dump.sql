


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."payout_provider" AS ENUM (
    'flutterwave',
    'stripe',
    'paypal'
);


ALTER TYPE "public"."payout_provider" OWNER TO "postgres";


CREATE TYPE "public"."payout_status" AS ENUM (
    'active',
    'pending',
    'restricted'
);


ALTER TYPE "public"."payout_status" OWNER TO "postgres";


CREATE TYPE "public"."seo_article_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."seo_article_status" OWNER TO "postgres";


CREATE TYPE "public"."seo_keyword_intent" AS ENUM (
    'Informational',
    'Transactional',
    'Commercial',
    'Navigational',
    'Local'
);


ALTER TYPE "public"."seo_keyword_intent" OWNER TO "postgres";


CREATE TYPE "public"."seo_keyword_status" AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed'
);


ALTER TYPE "public"."seo_keyword_status" OWNER TO "postgres";


CREATE TYPE "public"."sub_tier" AS ENUM (
    'solo',
    'pro',
    'squad'
);


ALTER TYPE "public"."sub_tier" OWNER TO "postgres";


CREATE TYPE "public"."team_role" AS ENUM (
    'owner',
    'admin',
    'staff',
    'accountant'
);


ALTER TYPE "public"."team_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_insert_rate_limit"("p_table_name" "text", "p_identity_id" "uuid", "p_max_per_minute" integer) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_count INT;
BEGIN
  IF p_table_name = 'identity_leads' THEN
    SELECT COUNT(*) INTO v_count
      FROM public.identity_leads
     WHERE identity_id = p_identity_id
       AND created_at >= NOW() - INTERVAL '1 minute';
  ELSIF p_table_name = 'scan_logs' THEN
    SELECT COUNT(*) INTO v_count
      FROM public.scan_logs
     WHERE identity_id = p_identity_id
       AND scanned_at >= NOW() - INTERVAL '1 minute';
  ELSE
    RETURN FALSE;
  END IF;

  RETURN v_count < p_max_per_minute;
END;
$$;


ALTER FUNCTION "public"."check_insert_rate_limit"("p_table_name" "text", "p_identity_id" "uuid", "p_max_per_minute" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_is_member"("t_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_members.team_id = t_id 
    AND team_members.user_id = auth.uid()
  );
END;
$$;


ALTER FUNCTION "public"."check_is_member"("t_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_is_owner"("t_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.teams 
    WHERE teams.id = t_id 
    AND teams.owner_id = auth.uid()
  );
END;
$$;


ALTER FUNCTION "public"."check_is_owner"("t_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_team_access"("t_id" "uuid", "required_roles" "public"."team_role"[] DEFAULT ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role", 'staff'::"public"."team_role", 'accountant'::"public"."team_role"]) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_id = t_id 
    AND user_id = auth.uid() 
    AND role = ANY(required_roles::text[])
  );
END;
$$;


ALTER FUNCTION "public"."check_team_access"("t_id" "uuid", "required_roles" "public"."team_role"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_team_membership"("team_id" "uuid", "user_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.team_members 
    WHERE team_members.team_id = $1 
    AND team_members.user_id = $2
  );
END;
$_$;


ALTER FUNCTION "public"."check_team_membership"("team_id" "uuid", "user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."compute_level"("xp" integer) RETURNS integer
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
DECLARE
    new_level INTEGER := 1;
BEGIN
    IF xp >= 99999 THEN new_level := 11;
    ELSIF xp >= 6500 THEN new_level := 10;
    ELSIF xp >= 5000 THEN new_level := 9;
    ELSIF xp >= 3800 THEN new_level := 8;
    ELSIF xp >= 2800 THEN new_level := 7;
    ELSIF xp >= 2000 THEN new_level := 6;
    ELSIF xp >= 1400 THEN new_level := 5;
    ELSIF xp >= 900 THEN new_level := 4;
    ELSIF xp >= 500 THEN new_level := 3;
    ELSIF xp >= 200 THEN new_level := 2;
    END IF;
    RETURN new_level;
END;
$$;


ALTER FUNCTION "public"."compute_level"("xp" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."confirm_withdrawal"("p_reference" character varying, "p_status" character varying) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_tx    public.wallet_transactions%ROWTYPE;
BEGIN
    SELECT * INTO v_tx
    FROM public.wallet_transactions
    WHERE reference = p_reference AND type = 'WITHDRAWAL'
    LIMIT 1;

    IF v_tx.id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Withdrawal transaction not found');
    END IF;

    IF v_tx.status != 'pending' THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Transaction already resolved: ' || v_tx.status);
    END IF;

    UPDATE public.wallet_transactions
    SET status = p_status
    WHERE id = v_tx.id;

    -- If the transfer FAILED, refund the balance
    IF p_status = 'failed' THEN
        UPDATE public.wallets
        SET balance    = balance + v_tx.amount,
            updated_at = NOW()
        WHERE id = v_tx.wallet_id;
    END IF;

    RETURN jsonb_build_object('success', TRUE, 'status', p_status);
END;
$$;


ALTER FUNCTION "public"."confirm_withdrawal"("p_reference" character varying, "p_status" character varying) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_invoice_transaction"("p_user_id" "uuid", "p_team_id" "text", "p_client_id" bigint, "p_invoice_number" "text", "p_invoice_type" "text", "p_status" "text", "p_issue_date" "date", "p_due_date" "date", "p_currency_code" "text", "p_tax_rate" numeric, "p_tax_type" "text", "p_tax_amount" numeric, "p_discount_type" "text", "p_discount_value" numeric, "p_discount_amount" numeric, "p_subtotal" numeric, "p_total_amount" numeric, "p_notes" "text", "p_metadata" "jsonb", "p_items" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_invoice_id      BIGINT;
  v_item            JSONB;
  v_product_id      BIGINT;
  v_quantity        NUMERIC;
  v_stock_entries   JSONB := '[]'::JSONB;
  v_client_balance  NUMERIC;
  v_ledger_amount   NUMERIC;
  v_ledger_type     TEXT;
BEGIN
  -- ── Step 1: Insert Invoice Header ─────────────────────────────────────────
  INSERT INTO public.invoices (
    user_id, team_id, client_id, invoice_number, invoice_type,
    status, issue_date, due_date, currency_code,
    tax_rate, tax_type, tax_amount,
    discount_type, discount_value, discount_amount,
    subtotal, total_amount, notes, metadata
  ) VALUES (
    p_user_id, p_team_id, p_client_id, p_invoice_number, p_invoice_type,
    p_status, p_issue_date, p_due_date, p_currency_code,
    p_tax_rate, p_tax_type, p_tax_amount,
    p_discount_type, p_discount_value, p_discount_amount,
    p_subtotal, p_total_amount, p_notes, p_metadata
  )
  RETURNING id INTO v_invoice_id;

  -- ── Step 2: Insert Invoice Line Items ─────────────────────────────────────
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO public.invoice_items (
      invoice_id, product_id, description, quantity, unit_price, total
    ) VALUES (
      v_invoice_id,
      NULLIF((v_item->>'product_id'), '')::BIGINT,
      v_item->>'description',
      (v_item->>'quantity')::NUMERIC,
      (v_item->>'unit_price')::NUMERIC,
      (v_item->>'total')::NUMERIC
    );
  END LOOP;

  -- ── Step 3: Ledger & Inventory (only for non-draft invoices) ──────────────
  IF p_status NOT IN ('draft') THEN

    -- 3a. Deduct Stock for any product-linked line items
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
      v_product_id := NULLIF((v_item->>'product_id'), '')::BIGINT;
      v_quantity   := (v_item->>'quantity')::NUMERIC;

      IF v_product_id IS NOT NULL THEN
        INSERT INTO public.stock_ledger (
          team_id, product_id, change_amount, reason, reference_id
        ) VALUES (
          p_team_id, v_product_id, -v_quantity, 'Invoice Sale', v_invoice_id::TEXT
        );
      END IF;
    END LOOP;

    -- 3b. Update Client Balance Ledger
    IF p_client_id IS NOT NULL THEN
      SELECT COALESCE(current_balance, 0)
        INTO v_client_balance
        FROM public.clients
       WHERE id = p_client_id;

      -- Credit memos reduce the balance; all other types increase it
      v_ledger_type   := CASE WHEN p_invoice_type = 'credit_memo' THEN 'credit_memo' ELSE 'invoice' END;
      v_ledger_amount := CASE WHEN p_invoice_type = 'credit_memo' THEN -p_total_amount ELSE p_total_amount END;

      INSERT INTO public.client_ledger (
        team_id, client_id, invoice_id, transaction_type,
        amount, balance_before, balance_after
      ) VALUES (
        p_team_id, p_client_id, v_invoice_id, v_ledger_type,
        v_ledger_amount, v_client_balance, v_client_balance + v_ledger_amount
      );
    END IF;
  END IF;

  -- ── Step 4: Audit Log ─────────────────────────────────────────────────────
  INSERT INTO public.audit_logs (
    user_id, team_id, action, resource_type, resource_id, metadata
  ) VALUES (
    p_user_id, p_team_id, 'invoice.created', 'invoice', v_invoice_id::TEXT,
    jsonb_build_object('status', p_status, 'total_amount', p_total_amount, 'currency', p_currency_code)
  );

  -- ── Step 5: Publish InvoiceCreated Domain Event ───────────────────────────
  INSERT INTO public.invoice_events (
    event_type, invoice_id, team_id, user_id, payload
  ) VALUES (
    'InvoiceCreated',
    v_invoice_id,
    p_team_id,
    p_user_id,
    jsonb_build_object(
      'invoice_id',     v_invoice_id,
      'status',         p_status,
      'client_id',      p_client_id,
      'total_amount',   p_total_amount,
      'currency_code',  p_currency_code,
      'invoice_number', p_invoice_number,
      'enable_flutterwave', COALESCE((p_metadata->>'enable_flutterwave')::BOOLEAN, false),
      'invoice_type',   p_invoice_type
    )
  );

  -- Return the created invoice ID and event confirmation
  RETURN jsonb_build_object(
    'invoice_id',     v_invoice_id,
    'invoice_number', p_invoice_number,
    'status',         p_status
  );

EXCEPTION
  WHEN OTHERS THEN
    -- The transaction will automatically roll back on exception.
    RAISE EXCEPTION 'create_invoice_transaction failed: %', SQLERRM;
END;
$$;


ALTER FUNCTION "public"."create_invoice_transaction"("p_user_id" "uuid", "p_team_id" "text", "p_client_id" bigint, "p_invoice_number" "text", "p_invoice_type" "text", "p_status" "text", "p_issue_date" "date", "p_due_date" "date", "p_currency_code" "text", "p_tax_rate" numeric, "p_tax_type" "text", "p_tax_amount" numeric, "p_discount_type" "text", "p_discount_value" numeric, "p_discount_amount" numeric, "p_subtotal" numeric, "p_total_amount" numeric, "p_notes" "text", "p_metadata" "jsonb", "p_items" "jsonb") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."create_invoice_transaction"("p_user_id" "uuid", "p_team_id" "text", "p_client_id" bigint, "p_invoice_number" "text", "p_invoice_type" "text", "p_status" "text", "p_issue_date" "date", "p_due_date" "date", "p_currency_code" "text", "p_tax_rate" numeric, "p_tax_type" "text", "p_tax_amount" numeric, "p_discount_type" "text", "p_discount_value" numeric, "p_discount_amount" numeric, "p_subtotal" numeric, "p_total_amount" numeric, "p_notes" "text", "p_metadata" "jsonb", "p_items" "jsonb") IS 'Atomic invoice creation RPC. Inserts header, items, ledger entries, audit log, and domain event in a single transaction. Called exclusively by the create-invoice Edge Function.';



CREATE OR REPLACE FUNCTION "public"."credit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_gross_amount" numeric, "p_gateway_fee" numeric, "p_platform_fee" numeric, "p_reference" character varying, "p_description" "text" DEFAULT NULL::"text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_wallet_id     UUID;
    v_net_amount    DECIMAL(15, 2);
    v_total_fee     DECIMAL(15, 2);
BEGIN
    v_total_fee  := p_gateway_fee + p_platform_fee;
    v_net_amount := p_gross_amount - v_total_fee;

    IF v_net_amount < 0 THEN
        RAISE EXCEPTION 'Net amount cannot be negative: gross=%, fees=%', p_gross_amount, v_total_fee;
    END IF;

    -- Upsert the wallet (create if it doesn't exist)
    INSERT INTO public.wallets (user_id, currency_code, balance)
    VALUES (p_user_id, p_currency_code, 0.00)
    ON CONFLICT (user_id, currency_code) DO NOTHING;

    -- Atomic balance increment — avoids JS read-then-write race conditions
    UPDATE public.wallets
    SET balance    = balance + v_net_amount,
        updated_at = NOW()
    WHERE user_id = p_user_id AND currency_code = p_currency_code
    RETURNING id INTO v_wallet_id;

    -- Insert audit trail
    INSERT INTO public.wallet_transactions (
        wallet_id, user_id, type, amount, fee, net_amount,
        currency_code, status, reference, description, metadata
    )
    VALUES (
        v_wallet_id, p_user_id, 'INVOICE_PAYMENT',
        p_gross_amount, v_total_fee, v_net_amount,
        p_currency_code, 'completed', p_reference, p_description,
        jsonb_build_object(
            'gateway_fee',  p_gateway_fee,
            'platform_fee', p_platform_fee
        )
    );

    RETURN jsonb_build_object(
        'success',     TRUE,
        'wallet_id',   v_wallet_id,
        'net_credited', v_net_amount
    );
END;
$$;


ALTER FUNCTION "public"."credit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_gross_amount" numeric, "p_gateway_fee" numeric, "p_platform_fee" numeric, "p_reference" character varying, "p_description" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."debit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_amount" numeric, "p_transfer_fee" numeric, "p_reference" character varying, "p_description" "text" DEFAULT NULL::"text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_wallet_id     UUID;
    v_current_bal   DECIMAL(15, 2);
    v_net_amount    DECIMAL(15, 2);
BEGIN
    v_net_amount := p_amount - p_transfer_fee;

    -- Lock wallet row to prevent concurrent withdrawals
    SELECT id, balance INTO v_wallet_id, v_current_bal
    FROM public.wallets
    WHERE user_id = p_user_id AND currency_code = p_currency_code
    FOR UPDATE;

    IF v_wallet_id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Wallet not found');
    END IF;

    IF v_current_bal < p_amount THEN
        RETURN jsonb_build_object(
            'success', FALSE,
            'error',   'Insufficient balance',
            'balance', v_current_bal
        );
    END IF;

    -- Atomic debit
    UPDATE public.wallets
    SET balance    = balance - p_amount,
        updated_at = NOW()
    WHERE id = v_wallet_id;

    -- Insert audit trail
    INSERT INTO public.wallet_transactions (
        wallet_id, user_id, type, amount, fee, net_amount,
        currency_code, status, reference, description, metadata
    )
    VALUES (
        v_wallet_id, p_user_id, 'WITHDRAWAL',
        p_amount, p_transfer_fee, v_net_amount,
        p_currency_code, 'pending', p_reference, p_description,
        jsonb_build_object('transfer_fee', p_transfer_fee)
    );

    RETURN jsonb_build_object(
        'success',       TRUE,
        'wallet_id',     v_wallet_id,
        'amount_debited', p_amount,
        'net_received',  v_net_amount
    );
END;
$$;


ALTER FUNCTION "public"."debit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_amount" numeric, "p_transfer_fee" numeric, "p_reference" character varying, "p_description" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_advanced_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_team_id UUID;
  v_result  JSONB;
  v_period_length INTERVAL;
  v_prev_start_date TIMESTAMPTZ;
  v_prev_end_date TIMESTAMPTZ;
BEGIN
  -- Resolve team for user
  SELECT id INTO v_team_id FROM public.teams WHERE owner_id = p_user_id LIMIT 1;
  IF v_team_id IS NULL THEN v_team_id := p_user_id; END IF;

  -- Calculate Previous Period for Growth Rate
  v_period_length := p_end_date - p_start_date;
  v_prev_end_date := p_start_date - INTERVAL '1 second';
  v_prev_start_date := v_prev_end_date - v_period_length;

  SELECT jsonb_build_object(
    -- 1. Current Period KPIs
    'current_period', (
      SELECT jsonb_build_object(
        'total_revenue',   COALESCE(SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END), 0),
        'total_invoices',  COUNT(*),
        'paid_count',      COUNT(CASE WHEN status = 'paid' THEN 1 END),
        'active_clients',  COUNT(DISTINCT client_id),
        'avg_invoice_value', COALESCE(AVG(CASE WHEN status = 'paid' THEN total_amount END), 0)
      )
      FROM public.invoices
      WHERE team_id = v_team_id
        AND created_at >= p_start_date
        AND created_at <= p_end_date
    ),

    -- 2. Previous Period KPIs (for growth rate calculations)
    'previous_period', (
      SELECT jsonb_build_object(
        'total_revenue',   COALESCE(SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END), 0),
        'total_invoices',  COUNT(*),
        'paid_count',      COUNT(CASE WHEN status = 'paid' THEN 1 END),
        'active_clients',  COUNT(DISTINCT client_id),
        'avg_invoice_value', COALESCE(AVG(CASE WHEN status = 'paid' THEN total_amount END), 0)
      )
      FROM public.invoices
      WHERE team_id = v_team_id
        AND created_at >= v_prev_start_date
        AND created_at <= v_prev_end_date
    ),

    -- 3. Time Series Data (Daily/Weekly/Monthly depending on range)
    -- Using date_trunc('day') for high granularity. The frontend can format it nicely.
    'time_series', (
      SELECT jsonb_agg(bucket ORDER BY bucket_date)
      FROM (
        SELECT
          to_char(date_trunc('day', created_at), 'Mon DD') AS label,
          date_trunc('day', created_at)                    AS bucket_date,
          SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS revenue,
          COUNT(*) AS invoices
        FROM public.invoices
        WHERE team_id = v_team_id
          AND created_at >= p_start_date
          AND created_at <= p_end_date
        GROUP BY 1, 2
      ) bucket
    ),

    -- 4. Top Clients by Revenue
    'top_clients', (
      SELECT COALESCE(jsonb_agg(c ORDER BY c_revenue DESC), '[]'::jsonb)
      FROM (
        SELECT
          cl.name                                                      AS name,
          SUM(CASE WHEN i.status = 'paid' THEN i.total_amount ELSE 0 END) AS c_revenue,
          COUNT(i.id)                                                  AS invoice_count
        FROM public.invoices i
        JOIN public.clients cl ON cl.id = i.client_id
        WHERE i.team_id = v_team_id
          AND i.created_at >= p_start_date
          AND i.created_at <= p_end_date
        GROUP BY cl.name
        ORDER BY c_revenue DESC
        LIMIT 5
      ) c
    ),

    -- 5. Invoice Status Overview (Donut Chart Data)
    'status_overview', (
      SELECT COALESCE(jsonb_agg(s ORDER BY amount DESC), '[]'::jsonb)
      FROM (
        SELECT
          status,
          SUM(total_amount) AS amount,
          COUNT(*)          AS count
        FROM public.invoices
        WHERE team_id = v_team_id
          AND created_at >= p_start_date
          AND created_at <= p_end_date
        GROUP BY status
      ) s
    ),

    -- 6. Payment Methods Distribution (Donut Chart Data)
    'payment_methods', (
      SELECT COALESCE(jsonb_agg(pm ORDER BY amount DESC), '[]'::jsonb)
      FROM (
        SELECT
          COALESCE(payment_gateway, 'Others') AS method,
          SUM(total_amount)                   AS amount,
          COUNT(*)                            AS count
        FROM public.invoices
        WHERE team_id = v_team_id
          AND status = 'paid'
          AND created_at >= p_start_date
          AND created_at <= p_end_date
        GROUP BY COALESCE(payment_gateway, 'Others')
      ) pm
    )
  )
  INTO v_result;

  RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."get_advanced_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_client_portal_data"("p_token" "uuid") RETURNS json
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  client_record RECORD;
  invoices_data JSON;
  ledger_data JSON;
  result JSON;
BEGIN
  -- Get the client securely
  SELECT * INTO client_record FROM clients WHERE portal_token = p_token;
  
  -- If token doesn't match any client, return NULL
  IF NOT FOUND THEN 
    RETURN NULL; 
  END IF;

  -- Fetch their invoices
  SELECT COALESCE(json_agg(i), '[]'::json) INTO invoices_data 
  FROM invoices i 
  WHERE i.client_id = client_record.id;
  
  -- Fetch their ledger / payment history
  SELECT COALESCE(json_agg(l), '[]'::json) INTO ledger_data 
  FROM client_ledger l 
  WHERE l.client_id = client_record.id;

  -- Package it all into a single JSON response
  result := json_build_object(
    'client', row_to_json(client_record),
    'invoices', invoices_data,
    'ledger', ledger_data
  );

  RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_client_portal_data"("p_token" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_platform_stats"() RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_caller_id UUID := auth.uid();
  v_is_super  BOOLEAN;
  v_result    JSONB;
BEGIN
  -- Verify caller is a superadmin
  SELECT is_superadmin INTO v_is_super
    FROM public.profiles
   WHERE id = v_caller_id;

  IF NOT FOUND OR NOT v_is_super THEN
    RAISE EXCEPTION 'Forbidden: superadmin access required';
  END IF;

  SELECT jsonb_build_object(
    'total_users',          (SELECT COUNT(*) FROM public.profiles),
    'active_subscriptions', (SELECT COUNT(*) FROM public.profiles WHERE subscription_status = 'active'),
    'total_revenue',        (SELECT COALESCE(SUM(amount), 0) FROM public.billing_history WHERE status = 'success'),
    'revenue_this_month',   (
      SELECT COALESCE(SUM(amount), 0)
        FROM public.billing_history
       WHERE status = 'success'
         AND created_at >= date_trunc('month', NOW())
    ),
    'new_users_this_week',  (
      SELECT COUNT(*)
        FROM public.profiles
       WHERE created_at >= NOW() - INTERVAL '7 days'
    ),
    'new_users_today',      (
      SELECT COUNT(*)
        FROM public.profiles
       WHERE created_at >= date_trunc('day', NOW())
    ),
    'total_invoices',       (SELECT COUNT(*) FROM public.invoices),
    'paid_invoices',        (SELECT COUNT(*) FROM public.invoices WHERE status = 'paid'),
    'pending_invoices',     (SELECT COUNT(*) FROM public.invoices WHERE status IN ('sent', 'overdue')),
    'total_teams',          (SELECT COUNT(*) FROM public.teams),
    'superadmin_count',     (SELECT COUNT(*) FROM public.profiles WHERE is_superadmin = true),
    'plan_distribution', (
      SELECT jsonb_agg(
        jsonb_build_object('tier', subscription_tier, 'count', cnt)
        ORDER BY cnt DESC
      )
      FROM (
        SELECT COALESCE(subscription_tier, 'explorer') AS subscription_tier,
               COUNT(*) AS cnt
          FROM public.profiles
         GROUP BY 1
      ) sub
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."get_platform_stats"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_team_id UUID;
  v_result  JSONB;
BEGIN
  -- Resolve team for user
  SELECT id INTO v_team_id FROM public.teams WHERE owner_id = p_user_id LIMIT 1;
  IF v_team_id IS NULL THEN v_team_id := p_user_id; END IF;

  SELECT jsonb_build_object(
    'total_revenue',   COALESCE(SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END), 0),
    'total_invoices',  COUNT(*),
    'paid_count',      COUNT(CASE WHEN status = 'paid' THEN 1 END),
    'active_clients',  COUNT(DISTINCT client_id),
    'avg_invoice_value', COALESCE(AVG(CASE WHEN status = 'paid' THEN total_amount END), 0),
    'monthly_buckets', (
      SELECT jsonb_agg(bucket ORDER BY bucket_month)
      FROM (
        SELECT
          to_char(date_trunc('month', created_at), 'Mon') AS month,
          date_trunc('month', created_at)                  AS bucket_month,
          SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) AS revenue,
          COUNT(*) AS invoices,
          COUNT(DISTINCT client_id) AS clients
        FROM public.invoices
        WHERE team_id = v_team_id
          AND created_at >= p_start_date
          AND created_at <= p_end_date
        GROUP BY 1, 2
      ) bucket
    ),
    'top_clients', (
      SELECT jsonb_agg(c ORDER BY c_revenue DESC)
      FROM (
        SELECT
          cl.name                                                      AS name,
          SUM(CASE WHEN i.status = 'paid' THEN i.total_amount ELSE 0 END) AS c_revenue,
          COUNT(i.id)                                                  AS invoice_count
        FROM public.invoices i
        JOIN public.clients cl ON cl.id = i.client_id
        WHERE i.team_id = v_team_id
          AND i.created_at >= p_start_date
          AND i.created_at <= p_end_date
        GROUP BY cl.name
        ORDER BY c_revenue DESC
        LIMIT 5
      ) c
    )
  )
  INTO v_result
  FROM public.invoices
  WHERE team_id = v_team_id
    AND created_at >= p_start_date
    AND created_at <= p_end_date;

  RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."get_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_revenue_trend"("p_days" integer DEFAULT 30) RETURNS TABLE("day" "date", "revenue" numeric, "invoice_count" bigint)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_caller_id UUID := auth.uid();
  v_is_super  BOOLEAN;
BEGIN
  SELECT is_superadmin INTO v_is_super
    FROM public.profiles WHERE id = v_caller_id;

  IF NOT FOUND OR NOT v_is_super THEN
    RAISE EXCEPTION 'Forbidden: superadmin access required';
  END IF;

  RETURN QUERY
    SELECT
      created_at::DATE                    AS day,
      COALESCE(SUM(amount), 0)           AS revenue,
      COUNT(*)                           AS invoice_count
    FROM public.billing_history
    WHERE status = 'success'
      AND created_at >= NOW() - (p_days || ' days')::INTERVAL
    GROUP BY 1
    ORDER BY 1;
END;
$$;


ALTER FUNCTION "public"."get_revenue_trend"("p_days" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_growth_trend"("p_days" integer DEFAULT 30) RETURNS TABLE("day" "date", "new_signups" bigint, "cumulative_total" bigint)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_caller_id UUID := auth.uid();
  v_is_super  BOOLEAN;
BEGIN
  SELECT is_superadmin INTO v_is_super
    FROM public.profiles WHERE id = v_caller_id;

  IF NOT FOUND OR NOT v_is_super THEN
    RAISE EXCEPTION 'Forbidden: superadmin access required';
  END IF;

  RETURN QUERY
    SELECT
      created_at::DATE           AS day,
      COUNT(*)                   AS new_signups,
      SUM(COUNT(*)) OVER (ORDER BY created_at::DATE) AS cumulative_total
    FROM public.profiles
    WHERE created_at >= NOW() - (p_days || ' days')::INTERVAL
    GROUP BY 1
    ORDER BY 1;
END;
$$;


ALTER FUNCTION "public"."get_user_growth_trend"("p_days" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_invoice_gamification"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_user_id UUID;
    v_xp_to_add INTEGER := 0;
    v_invoices_to_add INTEGER := 0;
    v_payments_to_add INTEGER := 0;
BEGIN
    -- Only act if status changed
    IF NEW.status = OLD.status THEN
        RETURN NEW;
    END IF;

    -- Get the user_id (owner of the team)
    SELECT owner_id INTO v_user_id FROM public.teams WHERE id = NEW.team_id;
    IF v_user_id IS NULL THEN
        RETURN NEW;
    END IF;

    IF NEW.status = 'sent' AND OLD.status != 'sent' THEN
        v_xp_to_add := 50;
        v_invoices_to_add := 1;
    ELSIF NEW.status = 'paid' AND OLD.status != 'paid' THEN
        v_xp_to_add := 100;
        v_payments_to_add := 1;
    END IF;

    IF v_xp_to_add > 0 THEN
        UPDATE public.user_gamification
        SET 
            xp = xp + v_xp_to_add,
            level = public.compute_level(xp + v_xp_to_add),
            invoices_sent = invoices_sent + v_invoices_to_add,
            payments_received = payments_received + v_payments_to_add,
            updated_at = NOW()
        WHERE user_id = v_user_id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_invoice_gamification"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    new_team_id UUID;
BEGIN
    INSERT INTO public.profiles (id, email, display_name, onboarding_completed)
    VALUES (
        new.id, 
        new.email, 
        COALESCE(
            new.raw_user_meta_data->>'display_name', 
            new.raw_user_meta_data->>'full_name', 
            new.raw_user_meta_data->>'name', 
            substring(new.email from '(.*)@')
        ), 
        FALSE
    )
    ON CONFLICT (id) DO NOTHING;

    -- Create a team if the user doesn't already own one
    IF NOT EXISTS (SELECT 1 FROM public.teams WHERE owner_id = new.id) THEN
        INSERT INTO public.teams (owner_id, name)
        VALUES (new.id, 'My Business')
        RETURNING id INTO new_team_id;

        IF new_team_id IS NOT NULL THEN
            INSERT INTO public.team_members (team_id, user_id, role)
            VALUES (new_team_id, new.id, 'owner')
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;

    RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user_gamification"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    INSERT INTO public.user_gamification (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user_gamification"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."has_admin_role"("required_role" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = required_role
  );
END;
$$;


ALTER FUNCTION "public"."has_admin_role"("required_role" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_usage"("u_id" "uuid", "m_year" "text", "col_name" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $_$
BEGIN
  -- Upsert the row first
  INSERT INTO public.usage_metrics (user_id, month_year)
  VALUES (u_id, m_year)
  ON CONFLICT (user_id, month_year) DO NOTHING;

  -- Increment the requested column safely
  EXECUTE format(
    'UPDATE public.usage_metrics SET %I = COALESCE(%I, 0) + 1
     WHERE user_id = $1 AND month_year = $2',
    col_name, col_name
  ) USING u_id, m_year;
END;
$_$;


ALTER FUNCTION "public"."increment_usage"("u_id" "uuid", "m_year" "text", "col_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_profile_owner"("profile_id_to_check" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN profile_id_to_check = auth.uid();
END;
$$;


ALTER FUNCTION "public"."is_profile_owner"("profile_id_to_check" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_team_member"("team_id_to_check" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN (
    -- User is directly a team member
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = team_id_to_check
      AND user_id = auth.uid()
    )
    OR
    -- User is the team owner
    EXISTS (
      SELECT 1 FROM public.teams
      WHERE id = team_id_to_check
      AND owner_id = auth.uid()
    )
    OR
    -- User's own user_id is being used as the team_id (solo user mode)
    team_id_to_check = auth.uid()
  );
END;
$$;


ALTER FUNCTION "public"."is_team_member"("team_id_to_check" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_team_owner"("team_id_to_check" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.teams
    WHERE id = team_id_to_check
    AND owner_id = auth.uid()
  );
END;
$$;


ALTER FUNCTION "public"."is_team_owner"("team_id_to_check" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."recalculate_invoice_totals"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_invoice_id BIGINT;
    v_subtotal NUMERIC := 0;
    v_tax_rate NUMERIC := 0;
    v_tax_type TEXT;
    v_discount_type TEXT;
    v_discount_value NUMERIC := 0;
    
    v_calculated_discount NUMERIC := 0;
    v_calculated_tax NUMERIC := 0;
    v_calculated_total NUMERIC := 0;
BEGIN
    -- Determine the invoice_id based on the operation
    IF TG_OP = 'DELETE' THEN
        v_invoice_id := OLD.invoice_id;
    ELSE
        v_invoice_id := NEW.invoice_id;
    END IF;

    -- Calculate the new subtotal from all items belonging to this invoice
    SELECT COALESCE(SUM(quantity * COALESCE(unit_price, 0)), 0)
    INTO v_subtotal
    FROM public.invoice_items
    WHERE invoice_id = v_invoice_id;

    -- Fetch the tax and discount settings from the parent invoice
    SELECT 
        COALESCE(tax_rate, 0), 
        COALESCE(tax_type, 'exclusive'), 
        COALESCE(discount_type, 'none'), 
        COALESCE(discount_value, 0)
    INTO v_tax_rate, v_tax_type, v_discount_type, v_discount_value
    FROM public.invoices
    WHERE id = v_invoice_id;

    -- Calculate discount
    IF v_discount_type = 'percentage' THEN
        v_calculated_discount := (v_subtotal * v_discount_value) / 100;
    ELSIF v_discount_type = 'flat' THEN
        v_calculated_discount := v_discount_value;
    END IF;

    -- Calculate tax based on subtotal minus discount
    IF v_tax_type = 'exclusive' THEN
        v_calculated_tax := ((v_subtotal - v_calculated_discount) * v_tax_rate) / 100;
    ELSIF v_tax_type = 'inclusive' THEN
        v_calculated_tax := (v_subtotal - v_calculated_discount) - ((v_subtotal - v_calculated_discount) / (1 + (v_tax_rate / 100)));
    END IF;

    -- Calculate total
    IF v_tax_type = 'exclusive' THEN
        v_calculated_total := v_subtotal - v_calculated_discount + v_calculated_tax;
    ELSE
        -- Inclusive tax is already part of the subtotal
        v_calculated_total := v_subtotal - v_calculated_discount;
    END IF;

    -- Update the parent invoice directly (no need to disable triggers as there's no circular trigger loop)
    UPDATE public.invoices
    SET 
        subtotal = v_subtotal,
        discount_amount = v_calculated_discount,
        tax_amount = v_calculated_tax,
        total_amount = v_calculated_total,
        updated_at = NOW()
    WHERE id = v_invoice_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."recalculate_invoice_totals"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."resolve_user_limits"("p_user_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_tier TEXT;
    v_payg RECORD;
    v_result JSONB;
BEGIN
    SELECT COALESCE(subscription_tier, 'explorer') INTO v_tier
    FROM public.profiles
    WHERE id = p_user_id;

    IF v_tier IS NULL THEN
        v_tier := 'explorer';
    END IF;

    SELECT * INTO v_payg
    FROM public.payg_entitlements
    WHERE user_id = p_user_id;

    IF v_tier IN ('pro', 'elite', 'pulse') THEN
        v_result := jsonb_build_object(
            'tier', v_tier,
            'limits', jsonb_build_object(
                'max_invoices_per_month', -1,
                'max_clients', -1,
                'has_advanced_editing', true,
                'allowed_templates', jsonb_build_array('*'),
                'dpp_image_limit', -1
            ),
            'features', jsonb_build_object(
                'recurring_invoices', true,
                'inventory_management', true,
                'analytics_and_reports', true,
                'multi_user', (v_tier = 'elite'),
                'contracts', (v_tier = 'elite'),
                'dpp_enabled', true,
                'ai_voice_assistant', true,
                'wallet_payments', true,
                'marketing_networking', true,
                'brand_identity_studio', true
            )
        );
    ELSE
        v_result := jsonb_build_object(
            'tier', 'explorer',
            'limits', jsonb_build_object(
                'max_invoices_per_month', 10,
                'max_clients', 5 + COALESCE(v_payg.client_slots, 0),
                'has_advanced_editing', false,
                'allowed_templates', COALESCE(to_jsonb(v_payg.unlocked_invoices), '[]'::jsonb),
                'dpp_image_limit', (COALESCE(v_payg.dpp_credits, 0) * 3)
            ),
            'features', jsonb_build_object(
                'recurring_invoices', false,
                'inventory_management', false,
                'analytics_and_reports', false,
                'multi_user', false,
                'contracts', false,
                'dpp_enabled', (COALESCE(v_payg.dpp_credits, 0) > 0),
                'ai_voice_assistant', false,
                'wallet_payments', false,
                'marketing_networking', false,
                'brand_identity_studio', false
            )
        );
    END IF;

    RETURN v_result;
END;
$$;


ALTER FUNCTION "public"."resolve_user_limits"("p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."sync_profile_branding_to_team"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.teams
  SET 
    name = NEW.business_name,
    business_address = NEW.business_address,
    business_email = NEW.business_email,
    business_phone = NEW.business_phone,
    tax_number = NEW.tax_number,
    brand_color = NEW.brand_color,
    secondary_color = NEW.secondary_color,
    brand_logo_url = NEW.brand_logo_url,
    brand_signature_url = NEW.brand_signature_url,
    brand_voice = NEW.brand_voice,
    invoice_footer = NEW.invoice_footer
  WHERE owner_id = NEW.id;

  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."sync_profile_branding_to_team"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_ai_usage_logs_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_ai_usage_logs_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_client_balance_tracker"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    adjustment NUMERIC;
BEGIN
    -- Determine adjustment
    IF (TG_OP = 'INSERT') THEN
        adjustment := NEW.amount;
    ELSIF (TG_OP = 'DELETE') THEN
        adjustment := -OLD.amount;
    ELSE
        adjustment := NEW.amount - OLD.amount;
    END IF;

    UPDATE clients 
    SET current_balance = COALESCE(current_balance, 0) + adjustment 
    WHERE id = COALESCE(NEW.client_id, OLD.client_id);
    
    RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."update_client_balance_tracker"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_invoice_with_items"("p_invoice_id" bigint, "p_invoice_data" "jsonb", "p_items" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_updated_invoice JSONB;
BEGIN
    -- Update the invoice record
    UPDATE invoices
    SET
        client_id = (p_invoice_data->>'client_id')::BIGINT,
        invoice_number = p_invoice_data->>'invoice_number',
        invoice_type = p_invoice_data->>'invoice_type',
        issue_date = (p_invoice_data->>'issue_date')::DATE,
        due_date = (p_invoice_data->>'due_date')::DATE,
        status = p_invoice_data->>'status',
        currency_code = p_invoice_data->>'currency_code',
        tax_rate = (p_invoice_data->>'tax_rate')::NUMERIC,
        tax_type = p_invoice_data->>'tax_type',
        tax_amount = (p_invoice_data->>'tax_amount')::NUMERIC,
        discount_type = p_invoice_data->>'discount_type',
        discount_value = (p_invoice_data->>'discount_value')::NUMERIC,
        discount_amount = (p_invoice_data->>'discount_amount')::NUMERIC,
        subtotal = (p_invoice_data->>'subtotal')::NUMERIC,
        total_amount = (p_invoice_data->>'total_amount')::NUMERIC,
        notes = p_invoice_data->>'notes',
        metadata = p_invoice_data->'metadata',
        updated_at = NOW()
    WHERE id = p_invoice_id;

    -- Return the updated invoice row
    SELECT row_to_json(i) INTO v_updated_invoice
    FROM invoices i
    WHERE id = p_invoice_id;

    IF v_updated_invoice IS NULL THEN
        RAISE EXCEPTION 'Invoice not found';
    END IF;

    -- Delete existing items
    DELETE FROM invoice_items WHERE invoice_id = p_invoice_id;

    -- Insert new items if provided
    IF jsonb_array_length(p_items) > 0 THEN
        INSERT INTO invoice_items (
            invoice_id,
            product_id,
            description,
            quantity,
            unit_price,
            total
        )
        SELECT
            p_invoice_id,
            (item->>'product_id')::BIGINT,
            item->>'description',
            (item->>'quantity')::NUMERIC,
            (item->>'unit_price')::NUMERIC,
            (item->>'total')::NUMERIC
        FROM jsonb_array_elements(p_items) AS item;
    END IF;

    RETURN v_updated_invoice;
END;
$$;


ALTER FUNCTION "public"."update_invoice_with_items"("p_invoice_id" bigint, "p_invoice_data" "jsonb", "p_items" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_payout_methods_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_payout_methods_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_product_stock"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  UPDATE public.products
  SET stock_quantity = stock_quantity + NEW.change_amount
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_product_stock"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_seo_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_seo_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."upgrade_user_subscription"("target_user_id" "uuid", "target_tier" "text", "is_yearly" boolean) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  expiry_interval INTERVAL;
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
END;
$$;


ALTER FUNCTION "public"."upgrade_user_subscription"("target_user_id" "uuid", "target_tier" "text", "is_yearly" boolean) OWNER TO "postgres";


COMMENT ON FUNCTION "public"."upgrade_user_subscription"("target_user_id" "uuid", "target_tier" "text", "is_yearly" boolean) IS 'Atomically upgrades a user subscription tier. Called by verify-and-upgrade-subscription edge function and flw-webhook.';



CREATE OR REPLACE FUNCTION "public"."verify_password"("p_email" "text", "p_password" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
DECLARE
  v_user auth.users;
BEGIN
  SELECT * INTO v_user FROM auth.users WHERE email = p_email;
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Supabase uses bcrypt for encrypted_password
  IF v_user.encrypted_password = crypt(p_password, v_user.encrypted_password) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;


ALTER FUNCTION "public"."verify_password"("p_email" "text", "p_password" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."admin_notifications" (
    "id" bigint NOT NULL,
    "type" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "is_read" boolean DEFAULT false NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "admin_notifications_type_check" CHECK (("type" = ANY (ARRAY['success'::"text", 'alert'::"text", 'message'::"text", 'info'::"text"])))
);


ALTER TABLE "public"."admin_notifications" OWNER TO "postgres";


ALTER TABLE "public"."admin_notifications" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."admin_notifications_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."ai_usage_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "month_year" character varying(7) NOT NULL,
    "calls_made" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."ai_usage_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."audit_logs" (
    "id" bigint NOT NULL,
    "action" "text" NOT NULL,
    "actor" "text" NOT NULL,
    "resource" "text",
    "ip" "text",
    "status" "text" DEFAULT 'success'::"text" NOT NULL,
    "type" "text" DEFAULT 'system'::"text" NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "audit_logs_status_check" CHECK (("status" = ANY (ARRAY['success'::"text", 'failure'::"text"]))),
    CONSTRAINT "audit_logs_type_check" CHECK (("type" = ANY (ARRAY['security'::"text", 'content'::"text", 'user'::"text", 'system'::"text"])))
);


ALTER TABLE "public"."audit_logs" OWNER TO "postgres";


ALTER TABLE "public"."audit_logs" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."audit_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."billing_history" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "amount" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'USD'::"text" NOT NULL,
    "plan" "text" NOT NULL,
    "billing_period" "text",
    "transaction_ref" "text",
    "status" "text" DEFAULT 'success'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "transaction_id" "text",
    "verified_at" timestamp with time zone
);


ALTER TABLE "public"."billing_history" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."business_cards" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "team_id" "uuid",
    "format" "text" DEFAULT 'standard'::"text",
    "template_id" "text" DEFAULT 'modern_flat'::"text",
    "custom_name" "text",
    "custom_title" "text",
    "custom_phone" "text",
    "custom_email" "text",
    "custom_website" "text",
    "custom_address" "text",
    "qr_data" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."business_cards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."client_communication_logs" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "client_id" bigint,
    "author_id" "uuid",
    "type" "text" NOT NULL,
    "summary" "text",
    "logged_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."client_communication_logs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."client_communication_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."client_communication_logs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."client_communication_logs_id_seq" OWNED BY "public"."client_communication_logs"."id";



CREATE TABLE IF NOT EXISTS "public"."client_documents" (
    "id" bigint NOT NULL,
    "client_id" bigint NOT NULL,
    "uploader_id" "uuid",
    "name" "text" NOT NULL,
    "file_url" "text" NOT NULL,
    "file_size" bigint,
    "file_type" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."client_documents" OWNER TO "postgres";


ALTER TABLE "public"."client_documents" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."client_documents_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."client_ledger" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "client_id" bigint,
    "invoice_id" bigint,
    "transaction_type" "text" NOT NULL,
    "amount" numeric NOT NULL,
    "balance_before" numeric NOT NULL,
    "balance_after" numeric NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "metadata" "jsonb" DEFAULT '{}'::"jsonb"
);


ALTER TABLE "public"."client_ledger" OWNER TO "postgres";


ALTER TABLE "public"."client_ledger" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."client_ledger_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."client_notes" (
    "id" bigint NOT NULL,
    "client_id" bigint NOT NULL,
    "author_id" "uuid",
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "sentiment" character varying(50),
    "sentiment_confidence" numeric(3,2)
);


ALTER TABLE "public"."client_notes" OWNER TO "postgres";


ALTER TABLE "public"."client_notes" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."client_notes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."clients" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "email" "text",
    "phone" "text",
    "address" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "business_name" "text",
    "position" "text",
    "country_code" "text" DEFAULT '+234'::"text",
    "company_name" "text",
    "lead_status" "text" DEFAULT 'active'::"text",
    "payment_token" "text",
    "payment_method_brand" "text",
    "payment_method_last4" "text",
    "payment_token_updated_at" timestamp with time zone,
    "current_balance" numeric DEFAULT 0,
    "country" "text",
    "portal_token" "uuid" DEFAULT "gen_random_uuid"(),
    "notes" "text",
    "tags" "text"[] DEFAULT '{}'::"text"[]
);


ALTER TABLE "public"."clients" OWNER TO "postgres";


COMMENT ON COLUMN "public"."clients"."payment_token" IS 'Securely vaulted Flutterwave token for card-on-file auto-billing.';



ALTER TABLE "public"."clients" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."clients_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."expense_categories" (
    "id" bigint NOT NULL,
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "icon" "text",
    "color" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."expense_categories" OWNER TO "postgres";


ALTER TABLE "public"."expense_categories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."expense_categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."expenses" (
    "id" bigint NOT NULL,
    "user_id" "uuid",
    "amount" numeric(15,2) DEFAULT 0 NOT NULL,
    "category" "text",
    "expense_date" "date" DEFAULT CURRENT_DATE NOT NULL,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "team_id" "uuid",
    "vendor_id" bigint,
    "category_id" bigint,
    "currency_code" "text" DEFAULT 'USD'::"text",
    "receipt_url" "text",
    "is_recurring" boolean DEFAULT false,
    "invoice_id" bigint,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    CONSTRAINT "expenses_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'reimbursed'::"text"])))
);


ALTER TABLE "public"."expenses" OWNER TO "postgres";


COMMENT ON COLUMN "public"."expenses"."invoice_id" IS 'Optional FK to invoices.id. Links this expense to the project/job it was incurred for. NULL = unlinked (general overhead). ON DELETE SET NULL preserves the expense record when an invoice is deleted.';



ALTER TABLE "public"."expenses" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."expenses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."fcm_tokens" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "team_id" "uuid" NOT NULL,
    "token" "text" NOT NULL,
    "platform" "text" DEFAULT 'android'::"text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."fcm_tokens" OWNER TO "postgres";


ALTER TABLE "public"."fcm_tokens" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."fcm_tokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."folders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "icon_name" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "team_id" "uuid"
);


ALTER TABLE "public"."folders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."help_center_ratings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "article_slug" "text" NOT NULL,
    "category_slug" "text" NOT NULL,
    "helpful" boolean NOT NULL,
    "user_id" "uuid",
    "session_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."help_center_ratings" OWNER TO "postgres";


COMMENT ON TABLE "public"."help_center_ratings" IS 'Tracks user feedback (helpful/not helpful) on Help Center articles submitted from the public-facing Help Center.';



CREATE TABLE IF NOT EXISTS "public"."identities" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "team_id" "uuid",
    "full_name" "text" NOT NULL,
    "job_title" "text",
    "email" "text",
    "phone" "text",
    "website" "text",
    "card_image_url" "text",
    "design_schema" "jsonb" DEFAULT '{}'::"jsonb",
    "is_primary" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."identities" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."identity_leads" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "identity_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "message" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "is_converted" boolean DEFAULT false,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "status" "text" DEFAULT 'new'::"text",
    "company" "text",
    "source" "text" DEFAULT 'web_form'::"text",
    "job_title" "text"
);


ALTER TABLE "public"."identity_leads" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."invoice_events" (
    "id" bigint NOT NULL,
    "event_type" "text" NOT NULL,
    "invoice_id" bigint NOT NULL,
    "team_id" "text",
    "user_id" "uuid",
    "payload" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "processed_at" timestamp with time zone,
    "error" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."invoice_events" OWNER TO "postgres";


COMMENT ON TABLE "public"."invoice_events" IS 'Domain event log for the invoice lifecycle. Workers consume these asynchronously.';



CREATE SEQUENCE IF NOT EXISTS "public"."invoice_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."invoice_events_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."invoice_events_id_seq" OWNED BY "public"."invoice_events"."id";



CREATE TABLE IF NOT EXISTS "public"."invoice_items" (
    "id" bigint NOT NULL,
    "invoice_id" bigint,
    "product_id" bigint,
    "description" "text" NOT NULL,
    "quantity" numeric(15,2) DEFAULT 1,
    "unit_price" numeric(15,2) DEFAULT 0,
    "total" numeric(15,2) DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."invoice_items" OWNER TO "postgres";


ALTER TABLE "public"."invoice_items" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."invoice_items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."invoices" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "user_id" "uuid",
    "client_id" bigint,
    "invoice_number" "text" NOT NULL,
    "invoice_type" "text" DEFAULT 'standard'::"text",
    "issue_date" "date" NOT NULL,
    "due_date" "date" NOT NULL,
    "status" "text" DEFAULT 'draft'::"text",
    "currency_code" "text" DEFAULT 'USD'::"text",
    "tax_rate" numeric(5,2) DEFAULT 0,
    "tax_type" "text" DEFAULT 'exclusive'::"text",
    "tax_amount" numeric(15,2) DEFAULT 0,
    "discount_type" "text" DEFAULT 'none'::"text",
    "discount_value" numeric(15,2) DEFAULT 0,
    "discount_amount" numeric(15,2) DEFAULT 0,
    "subtotal" numeric(15,2) DEFAULT 0,
    "total_amount" numeric(15,2) DEFAULT 0,
    "notes" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "opened_at" timestamp with time zone,
    "view_count" integer DEFAULT 0,
    "tracking_token" "uuid" DEFAULT "gen_random_uuid"(),
    "payment_gateway" character varying(50),
    "gateway_transaction_id" character varying(255)
);


ALTER TABLE "public"."invoices" OWNER TO "postgres";


COMMENT ON COLUMN "public"."invoices"."invoice_type" IS 'States: standard, proforma, commercial, progress, recurring, final, credit_memo, debit_memo, mixed, estimate, quote';



COMMENT ON COLUMN "public"."invoices"."status" IS 'States: draft, pending, paid, overdue, voided, accepted, rejected';



CREATE OR REPLACE VIEW "public"."invoice_tracking_stats" AS
 SELECT "team_id",
    "count"(*) FILTER (WHERE ("opened_at" IS NOT NULL)) AS "total_opened",
    "count"(*) FILTER (WHERE (("opened_at" IS NULL) AND ("due_date" < "now"()))) AS "total_ignored_overdue",
    ("avg"((EXTRACT(epoch FROM ("opened_at" - ("issue_date")::timestamp with time zone)) / (3600)::numeric)))::numeric(10,2) AS "avg_hours_to_open"
   FROM "public"."invoices"
  GROUP BY "team_id";


ALTER VIEW "public"."invoice_tracking_stats" OWNER TO "postgres";


ALTER TABLE "public"."invoices" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."invoices_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."live_chat_messages" (
    "id" bigint NOT NULL,
    "user_id" "uuid",
    "message" "text" NOT NULL,
    "is_support" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."live_chat_messages" OWNER TO "postgres";


ALTER TABLE "public"."live_chat_messages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."live_chat_messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."payg_entitlements" (
    "user_id" "uuid" NOT NULL,
    "invoice_credits" integer DEFAULT 0 NOT NULL,
    "business_card_credits" integer DEFAULT 0 NOT NULL,
    "qr_code_credits" integer DEFAULT 0 NOT NULL,
    "client_slots" integer DEFAULT 0 NOT NULL,
    "unlocked_invoices" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "unlocked_business_cards" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "unlocked_qr_codes" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "dpp_credits" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "payg_entitlements_business_card_credits_check" CHECK (("business_card_credits" >= 0)),
    CONSTRAINT "payg_entitlements_client_slots_check" CHECK (("client_slots" >= 0)),
    CONSTRAINT "payg_entitlements_dpp_credits_check" CHECK (("dpp_credits" >= 0)),
    CONSTRAINT "payg_entitlements_invoice_credits_check" CHECK (("invoice_credits" >= 0)),
    CONSTRAINT "payg_entitlements_qr_code_credits_check" CHECK (("qr_code_credits" >= 0))
);


ALTER TABLE "public"."payg_entitlements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payment_methods" (
    "id" bigint NOT NULL,
    "user_id" "uuid",
    "type" "text",
    "details" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."payment_methods" OWNER TO "postgres";


ALTER TABLE "public"."payment_methods" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."payment_methods_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."payout_methods" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "provider" "public"."payout_provider" NOT NULL,
    "status" "public"."payout_status" DEFAULT 'pending'::"public"."payout_status" NOT NULL,
    "is_default" boolean DEFAULT false NOT NULL,
    "provider_account_id" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."payout_methods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."pending_invitations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "team_id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "role" "text" DEFAULT 'staff'::"text" NOT NULL,
    "invited_by" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "expires_at" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."pending_invitations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_categories" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."product_categories" OWNER TO "postgres";


ALTER TABLE "public"."product_categories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."product_categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."product_passport_scans" (
    "id" bigint NOT NULL,
    "passport_id" "uuid" NOT NULL,
    "scanned_at" timestamp with time zone DEFAULT "now"(),
    "location_data" "jsonb",
    "user_agent" "text",
    "ip_address" "text"
);


ALTER TABLE "public"."product_passport_scans" OWNER TO "postgres";


ALTER TABLE "public"."product_passport_scans" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."product_passport_scans_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."product_passports" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "team_id" "uuid" NOT NULL,
    "product_id" bigint NOT NULL,
    "hs_code" "text",
    "country_of_origin" "text",
    "brand_name" "text",
    "manufacturer_info" "jsonb" DEFAULT '{}'::"jsonb",
    "product_images" "jsonb" DEFAULT '[]'::"jsonb",
    "certifications" "jsonb" DEFAULT '[]'::"jsonb",
    "batch_number" "text",
    "production_date" "date",
    "expiry_date" "date",
    "slug" "text",
    "seo_title" "text",
    "seo_description" "text",
    "public_status" "text" DEFAULT 'private'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."product_passports" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "user_id" "uuid",
    "category_id" bigint,
    "name" "text" NOT NULL,
    "sku" "text",
    "description" "text",
    "unit_price" numeric(15,2) DEFAULT 0.00,
    "stock_quantity" integer DEFAULT 0,
    "track_inventory" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "type" "text" DEFAULT 'product'::"text" NOT NULL,
    "tax_rate" numeric(5,2) DEFAULT 0,
    "is_active" boolean DEFAULT true NOT NULL,
    "unit" "text",
    "cost_price" numeric(15,2) DEFAULT 0.00,
    "min_stock_alert" integer DEFAULT 0,
    "tags" "text"[] DEFAULT '{}'::"text"[],
    "image_url" "text",
    CONSTRAINT "products_type_check" CHECK (("type" = ANY (ARRAY['product'::"text", 'service'::"text"])))
);


ALTER TABLE "public"."products" OWNER TO "postgres";


COMMENT ON COLUMN "public"."products"."type" IS 'product or service';



COMMENT ON COLUMN "public"."products"."tax_rate" IS 'Tax rate percentage (e.g. 7.5 for 7.5%)';



COMMENT ON COLUMN "public"."products"."is_active" IS 'Whether this item is active in the catalog';



COMMENT ON COLUMN "public"."products"."unit" IS 'Unit of measurement (e.g. pcs, hr, kg)';



COMMENT ON COLUMN "public"."products"."cost_price" IS 'Cost price for the item';



COMMENT ON COLUMN "public"."products"."min_stock_alert" IS 'Minimum stock level to trigger low stock warning';



COMMENT ON COLUMN "public"."products"."tags" IS 'Array of tags for organization';



COMMENT ON COLUMN "public"."products"."image_url" IS 'URL of the product image';



ALTER TABLE "public"."products" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."products_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text",
    "display_name" "text",
    "phone" "text",
    "business_name" "text",
    "business_address" "text",
    "business_email" "text",
    "business_phone" "text",
    "bank_name" "text",
    "account_name" "text",
    "account_number" "text",
    "tax_number" "text",
    "brand_color" "text",
    "secondary_color" "text",
    "brand_voice" "text",
    "brand_logo_url" "text",
    "invoice_footer" "text",
    "onboarding_completed" boolean DEFAULT false,
    "subscription_tier" "text" DEFAULT 'explorer'::"text",
    "preferred_currency" "text",
    "locale" "text",
    "theme_mode" "text" DEFAULT 'system'::"text",
    "notification_preferences" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "business_industry" "text",
    "subscription_status" "text" DEFAULT 'active'::"text",
    "subscription_expiry" timestamp with time zone,
    "industry" "text",
    "country" "text",
    "company" "text",
    "fcm_token" "text",
    "subscription_expires_at" timestamp with time zone,
    "avatar_url" "text",
    "default_invoice_template" "text",
    "brand_signature_url" "text",
    "is_yearly_plan" boolean DEFAULT false,
    "role" "text" DEFAULT 'user'::"text",
    "is_superadmin" boolean DEFAULT false NOT NULL,
    "detected_country" "text",
    "currency_set_by" "text",
    "first_login_at" timestamp with time zone,
    "last_login_at" timestamp with time zone,
    "onboarding_tour_completed" boolean DEFAULT false
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


COMMENT ON COLUMN "public"."profiles"."role" IS 'Admin role: super_admin, seo_manager, support_staff. NULL for regular users. Independent of subscription_tier.';



COMMENT ON COLUMN "public"."profiles"."is_superadmin" IS 'Platform-level superadmin flag. Only set manually by a database admin. Never derived from subscription_tier.';



CREATE OR REPLACE VIEW "public"."public_profiles" AS
 SELECT "id",
    "display_name",
    "brand_logo_url"
   FROM "public"."profiles";


ALTER VIEW "public"."public_profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."qr_codes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "folder_id" "uuid",
    "name" "text" NOT NULL,
    "type" "text" NOT NULL,
    "content" "jsonb" NOT NULL,
    "color_primary" "text" DEFAULT '#2563EB'::"text",
    "asset_path" "text",
    "asset_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "team_id" "uuid"
);


ALTER TABLE "public"."qr_codes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."qr_scans" (
    "id" bigint NOT NULL,
    "qr_code_id" "uuid",
    "scanned_at" timestamp with time zone DEFAULT "now"(),
    "device_info" "jsonb",
    "location" "text"
);


ALTER TABLE "public"."qr_scans" OWNER TO "postgres";


ALTER TABLE "public"."qr_scans" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."qr_scans_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."rankings_tracker" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "keyword_id" "uuid" NOT NULL,
    "google_rank" integer DEFAULT 0 NOT NULL,
    "serps_snapshot_url" "text",
    "tracked_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."rankings_tracker" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recurring_invoices" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "client_id" bigint,
    "frequency" "text" NOT NULL,
    "next_run_at" "date",
    "amount" numeric(15,2),
    "status" "text" DEFAULT 'active'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    "template_data" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "last_run_at" timestamp with time zone
);


ALTER TABLE "public"."recurring_invoices" OWNER TO "postgres";


COMMENT ON TABLE "public"."recurring_invoices" IS 'Enterprise Edition: Unified polymorphic template engine.';



ALTER TABLE "public"."recurring_invoices" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."recurring_invoices_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."scan_logs" (
    "id" bigint NOT NULL,
    "identity_id" "uuid" NOT NULL,
    "scanned_at" timestamp with time zone DEFAULT "now"(),
    "location" "text",
    "ip_address" "text",
    "user_agent" "text",
    "source" "text" DEFAULT 'qr_code'::"text"
);


ALTER TABLE "public"."scan_logs" OWNER TO "postgres";


ALTER TABLE "public"."scan_logs" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."scan_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."scheduled_posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "article_id" "uuid",
    "platform" character varying(50) NOT NULL,
    "content_text" "text" NOT NULL,
    "media_urls" "text"[] DEFAULT '{}'::"text"[],
    "scheduled_for" timestamp with time zone NOT NULL,
    "status" character varying(20) DEFAULT 'pending'::character varying,
    "platform_post_id" character varying(255),
    "error_message" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."scheduled_posts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."seo_articles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "keyword_id" "uuid",
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "meta_title" "text" NOT NULL,
    "meta_description" "text" NOT NULL,
    "content_markdown" "text" DEFAULT ''::"text" NOT NULL,
    "featured_image_url" "text",
    "status" "public"."seo_article_status" DEFAULT 'draft'::"public"."seo_article_status" NOT NULL,
    "word_count" integer DEFAULT 0 NOT NULL,
    "seo_score" numeric(5,2) DEFAULT 0.00 NOT NULL,
    "human_score" numeric(5,2) DEFAULT 0.00 NOT NULL,
    "schema_markup" "jsonb" DEFAULT '{}'::"jsonb",
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "excerpt" "text",
    "tags" "text"[] DEFAULT '{}'::"text"[],
    "views" integer DEFAULT 0,
    "pillar_page_id" "uuid"
);


ALTER TABLE "public"."seo_articles" OWNER TO "postgres";


COMMENT ON COLUMN "public"."seo_articles"."pillar_page_id" IS 'References the parent pillar article for topic cluster grouping';



CREATE TABLE IF NOT EXISTS "public"."seo_keywords" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "keyword" "text" NOT NULL,
    "intent" "public"."seo_keyword_intent" DEFAULT 'Informational'::"public"."seo_keyword_intent" NOT NULL,
    "volume" integer DEFAULT 0 NOT NULL,
    "cpc" numeric(8,2) DEFAULT 0.00 NOT NULL,
    "pd" integer DEFAULT 0 NOT NULL,
    "seo_difficulty" integer DEFAULT 0 NOT NULL,
    "cluster_parent" "text",
    "status" "public"."seo_keyword_status" DEFAULT 'pending'::"public"."seo_keyword_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."seo_keywords" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."seo_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "default_meta_title" "text" DEFAULT 'Nobevra - The Intelligent Business Operating System'::"text" NOT NULL,
    "default_meta_description" "text" DEFAULT 'Streamline your professional workflow, collect payments rapidly with Flutterwave, and leverage smart client portals.'::"text" NOT NULL,
    "og_defaults" "jsonb" DEFAULT '{"og:type": "website", "og:locale": "en_US", "og:site_name": "Nobevra"}'::"jsonb" NOT NULL,
    "auto_publish" boolean DEFAULT true NOT NULL,
    "cron_expression" "text" DEFAULT '0 8 * * *'::"text" NOT NULL,
    "brand_voice_config" "jsonb" DEFAULT '{"tone": "authoritative-yet-approachable", "banned_words": ["unlock", "leverage", "seamless", "world-class", "cutting-edge", "game-changer", "synergy"], "humanization_pass": true, "required_sections": ["real_case_study", "practical_framework", "contrarian_insight", "when_not_to_use"], "target_word_count": 2500, "max_paragraph_lines": 2, "pattern_interrupt_interval": [150, 250]}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."seo_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."social_accounts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "platform" character varying(50) NOT NULL,
    "account_id" character varying(255) NOT NULL,
    "account_name" character varying(255),
    "access_token" "text" NOT NULL,
    "refresh_token" "text",
    "token_expires_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."social_accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stock_ledger" (
    "id" bigint NOT NULL,
    "product_id" bigint,
    "change_amount" integer NOT NULL,
    "reason" "text",
    "reference_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "team_id" "uuid"
);


ALTER TABLE "public"."stock_ledger" OWNER TO "postgres";


ALTER TABLE "public"."stock_ledger" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."stock_ledger_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."team_members" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "team_id" "uuid",
    "user_id" "uuid",
    "role" "text" DEFAULT 'staff'::"text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."team_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."teams" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid",
    "name" "text" NOT NULL,
    "primary_color" "text" DEFAULT '0xFF2563EB'::"text",
    "secondary_color" "text" DEFAULT '0xFF1E293B'::"text",
    "brand_voice" "text" DEFAULT 'Professional & Trusted'::"text",
    "logo_url" "text",
    "show_watermark" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "brand_logo_url" "text",
    "brand_color" "text" DEFAULT '#2563EB'::"text",
    "business_address" "text",
    "business_email" "text",
    "business_phone" "text",
    "tax_number" "text",
    "invoice_footer" "text",
    "flutterwave_subaccount_id" "text",
    "default_vat_rate" numeric DEFAULT 0,
    "default_wht_rate" numeric DEFAULT 0,
    "default_payment_terms" "text" DEFAULT 'Payment is due within 14 days of invoice issue.'::"text",
    "invoice_prefix" "text" DEFAULT 'NGO'::"text",
    "default_invoice_template" "text",
    "brand_signature_url" "text",
    "flw_subaccount_id" "text"
);


ALTER TABLE "public"."teams" OWNER TO "postgres";


COMMENT ON COLUMN "public"."teams"."flutterwave_subaccount_id" IS 'Flutterwave subaccount ID for automated split payment settlements.';



COMMENT ON COLUMN "public"."teams"."flw_subaccount_id" IS 'Flutterwave subaccount ID (e.g. RS_XXXXXX) for split payment commission collection. Set when a team owner registers their bank account via the platform.';



CREATE TABLE IF NOT EXISTS "public"."usage_metrics" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "month_year" "text" NOT NULL,
    "clients_created" integer DEFAULT 0,
    "clients_edited" integer DEFAULT 0,
    "invoices_created" integer DEFAULT 0,
    "invoices_edited" integer DEFAULT 0,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."usage_metrics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_gamification" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "xp" integer DEFAULT 0 NOT NULL,
    "level" integer DEFAULT 1 NOT NULL,
    "unlocked_badges" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "invoices_sent" integer DEFAULT 0 NOT NULL,
    "payments_received" integer DEFAULT 0 NOT NULL,
    "receipts_scanned" integer DEFAULT 0 NOT NULL,
    "current_streak" integer DEFAULT 0 NOT NULL,
    "last_action_date" "date",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_gamification" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "device_name" "text",
    "location" "text",
    "is_current" boolean DEFAULT false,
    "device_info" "jsonb",
    "last_active" timestamp with time zone DEFAULT "now"(),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vendors" (
    "id" bigint NOT NULL,
    "team_id" "uuid",
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text",
    "phone" "text",
    "category" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."vendors" OWNER TO "postgres";


ALTER TABLE "public"."vendors" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."vendors_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."wallet_transactions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "wallet_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" character varying(30) NOT NULL,
    "amount" numeric(15,2) NOT NULL,
    "fee" numeric(15,2) DEFAULT 0.00 NOT NULL,
    "net_amount" numeric(15,2) NOT NULL,
    "currency_code" character varying(3) NOT NULL,
    "status" character varying(20) DEFAULT 'completed'::character varying NOT NULL,
    "reference" character varying(200),
    "description" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."wallet_transactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."wallets" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "currency_code" character varying(3) DEFAULT 'NGN'::character varying NOT NULL,
    "balance" numeric(15,2) DEFAULT 0.00 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."wallets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."webhook_logs" (
    "id" bigint NOT NULL,
    "payload" "jsonb",
    "headers" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."webhook_logs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."webhook_logs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."webhook_logs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."webhook_logs_id_seq" OWNED BY "public"."webhook_logs"."id";



ALTER TABLE ONLY "public"."client_communication_logs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."client_communication_logs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."invoice_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."invoice_events_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."webhook_logs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."webhook_logs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."admin_notifications"
    ADD CONSTRAINT "admin_notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_usage_logs"
    ADD CONSTRAINT "ai_usage_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_usage_logs"
    ADD CONSTRAINT "ai_usage_logs_user_id_month_year_key" UNIQUE ("user_id", "month_year");



ALTER TABLE ONLY "public"."audit_logs"
    ADD CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."billing_history"
    ADD CONSTRAINT "billing_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."billing_history"
    ADD CONSTRAINT "billing_history_transaction_ref_key" UNIQUE ("transaction_ref");



ALTER TABLE ONLY "public"."business_cards"
    ADD CONSTRAINT "business_cards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."business_cards"
    ADD CONSTRAINT "business_cards_team_id_key" UNIQUE ("team_id");



ALTER TABLE ONLY "public"."client_communication_logs"
    ADD CONSTRAINT "client_communication_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."client_documents"
    ADD CONSTRAINT "client_documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."client_ledger"
    ADD CONSTRAINT "client_ledger_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."client_notes"
    ADD CONSTRAINT "client_notes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expense_categories"
    ADD CONSTRAINT "expense_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."fcm_tokens"
    ADD CONSTRAINT "fcm_tokens_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."fcm_tokens"
    ADD CONSTRAINT "fcm_tokens_team_id_token_key" UNIQUE ("team_id", "token");



ALTER TABLE ONLY "public"."folders"
    ADD CONSTRAINT "folders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."help_center_ratings"
    ADD CONSTRAINT "help_center_ratings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."identities"
    ADD CONSTRAINT "identities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."identity_leads"
    ADD CONSTRAINT "identity_leads_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."invoice_events"
    ADD CONSTRAINT "invoice_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."invoice_items"
    ADD CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."live_chat_messages"
    ADD CONSTRAINT "live_chat_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payg_entitlements"
    ADD CONSTRAINT "payg_entitlements_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."payment_methods"
    ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payout_methods"
    ADD CONSTRAINT "payout_methods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pending_invitations"
    ADD CONSTRAINT "pending_invitations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pending_invitations"
    ADD CONSTRAINT "pending_invitations_team_id_email_key" UNIQUE ("team_id", "email");



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_passport_scans"
    ADD CONSTRAINT "product_passport_scans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_passports"
    ADD CONSTRAINT "product_passports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_passports"
    ADD CONSTRAINT "product_passports_product_id_key" UNIQUE ("product_id");



ALTER TABLE ONLY "public"."product_passports"
    ADD CONSTRAINT "product_passports_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."qr_codes"
    ADD CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."qr_scans"
    ADD CONSTRAINT "qr_scans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."rankings_tracker"
    ADD CONSTRAINT "rankings_tracker_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."recurring_invoices"
    ADD CONSTRAINT "recurring_invoices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."scan_logs"
    ADD CONSTRAINT "scan_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."scheduled_posts"
    ADD CONSTRAINT "scheduled_posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."seo_articles"
    ADD CONSTRAINT "seo_articles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."seo_articles"
    ADD CONSTRAINT "seo_articles_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."seo_keywords"
    ADD CONSTRAINT "seo_keywords_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."seo_settings"
    ADD CONSTRAINT "seo_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."social_accounts"
    ADD CONSTRAINT "social_accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."social_accounts"
    ADD CONSTRAINT "social_accounts_platform_account_id_key" UNIQUE ("platform", "account_id");



ALTER TABLE ONLY "public"."stock_ledger"
    ADD CONSTRAINT "stock_ledger_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_team_id_user_id_key" UNIQUE ("team_id", "user_id");



ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."usage_metrics"
    ADD CONSTRAINT "usage_metrics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."usage_metrics"
    ADD CONSTRAINT "usage_metrics_user_id_month_year_key" UNIQUE ("user_id", "month_year");



ALTER TABLE ONLY "public"."user_gamification"
    ADD CONSTRAINT "user_gamification_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_gamification"
    ADD CONSTRAINT "user_gamification_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vendors"
    ADD CONSTRAINT "vendors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."wallet_transactions"
    ADD CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."wallets"
    ADD CONSTRAINT "wallets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."wallets"
    ADD CONSTRAINT "wallets_user_id_currency_code_key" UNIQUE ("user_id", "currency_code");



ALTER TABLE ONLY "public"."webhook_logs"
    ADD CONSTRAINT "webhook_logs_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_admin_notifications_created_at" ON "public"."admin_notifications" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_admin_notifications_is_read" ON "public"."admin_notifications" USING "btree" ("is_read") WHERE ("is_read" = false);



CREATE INDEX "idx_audit_logs_actor" ON "public"."audit_logs" USING "btree" ("actor");



CREATE INDEX "idx_audit_logs_created_at" ON "public"."audit_logs" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_audit_logs_type" ON "public"."audit_logs" USING "btree" ("type");



CREATE INDEX "idx_billing_history_user" ON "public"."billing_history" USING "btree" ("user_id");



CREATE INDEX "idx_client_ledger_cid" ON "public"."client_ledger" USING "btree" ("client_id");



CREATE INDEX "idx_client_ledger_team" ON "public"."client_ledger" USING "btree" ("team_id");



CREATE INDEX "idx_client_notes_sentiment" ON "public"."client_notes" USING "btree" ("sentiment");



CREATE INDEX "idx_clients_lead_status" ON "public"."clients" USING "btree" ("lead_status");



CREATE INDEX "idx_clients_payment_vault" ON "public"."clients" USING "btree" ("payment_token") WHERE ("payment_token" IS NOT NULL);



CREATE UNIQUE INDEX "idx_clients_portal_token" ON "public"."clients" USING "btree" ("portal_token");



CREATE INDEX "idx_comm_logs_client" ON "public"."client_communication_logs" USING "btree" ("client_id");



CREATE INDEX "idx_expenses_invoice_id" ON "public"."expenses" USING "btree" ("invoice_id") WHERE ("invoice_id" IS NOT NULL);



COMMENT ON INDEX "public"."idx_expenses_invoice_id" IS 'Partial index for expense→invoice lookups. Powers the Project Costs section on InvoiceDetailsScreen.';



CREATE INDEX "idx_expenses_team_date" ON "public"."expenses" USING "btree" ("team_id", "expense_date" DESC);



COMMENT ON INDEX "public"."idx_expenses_team_date" IS 'Composite index for the Expense History screen (team-scoped, date-sorted queries).';



CREATE INDEX "idx_help_ratings_article" ON "public"."help_center_ratings" USING "btree" ("article_slug");



CREATE INDEX "idx_help_ratings_category" ON "public"."help_center_ratings" USING "btree" ("category_slug");



CREATE INDEX "idx_help_ratings_created" ON "public"."help_center_ratings" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_help_ratings_helpful" ON "public"."help_center_ratings" USING "btree" ("helpful");



CREATE INDEX "idx_identities_team_id" ON "public"."identities" USING "btree" ("team_id");



CREATE INDEX "idx_identities_user_id" ON "public"."identities" USING "btree" ("user_id");



CREATE INDEX "idx_identity_leads_identity_id" ON "public"."identity_leads" USING "btree" ("identity_id");



CREATE INDEX "idx_identity_leads_rate_limit" ON "public"."identity_leads" USING "btree" ("identity_id", "created_at" DESC);



CREATE INDEX "idx_identity_leads_status" ON "public"."identity_leads" USING "btree" ("status");



CREATE INDEX "idx_invoice_events_unprocessed" ON "public"."invoice_events" USING "btree" ("created_at") WHERE ("processed_at" IS NULL);



CREATE INDEX "idx_invoice_metadata" ON "public"."invoices" USING "gin" ("metadata");



CREATE INDEX "idx_invoices_due_reminder" ON "public"."invoices" USING "btree" ("status", "due_date") WHERE ("status" = 'pending'::"text");



CREATE INDEX "idx_invoices_overdue_scan" ON "public"."invoices" USING "btree" ("status", "due_date") WHERE ("status" = 'pending'::"text");



CREATE INDEX "idx_invoices_tracking" ON "public"."invoices" USING "btree" ("tracking_token");



CREATE INDEX "idx_invoices_type_status" ON "public"."invoices" USING "btree" ("invoice_type", "status");



CREATE INDEX "idx_invoices_user_id" ON "public"."invoices" USING "btree" ("user_id");



CREATE INDEX "idx_payment_methods_user_id" ON "public"."payment_methods" USING "btree" ("user_id");



CREATE INDEX "idx_rankings_keyword_id" ON "public"."rankings_tracker" USING "btree" ("keyword_id");



CREATE INDEX "idx_rankings_tracked_at" ON "public"."rankings_tracker" USING "btree" ("tracked_at" DESC);



CREATE INDEX "idx_recurring_generation" ON "public"."recurring_invoices" USING "btree" ("is_active", "next_run_at") WHERE ("is_active" = true);



CREATE INDEX "idx_scan_logs_identity_id" ON "public"."scan_logs" USING "btree" ("identity_id");



CREATE INDEX "idx_scan_logs_rate_limit" ON "public"."scan_logs" USING "btree" ("identity_id", "scanned_at" DESC);



CREATE INDEX "idx_scan_logs_source" ON "public"."scan_logs" USING "btree" ("source");



CREATE INDEX "idx_scheduled_posts_status_time" ON "public"."scheduled_posts" USING "btree" ("status", "scheduled_for");



CREATE INDEX "idx_seo_articles_keyword_id" ON "public"."seo_articles" USING "btree" ("keyword_id");



CREATE INDEX "idx_seo_articles_pillar_page_id" ON "public"."seo_articles" USING "btree" ("pillar_page_id");



CREATE INDEX "idx_seo_articles_slug" ON "public"."seo_articles" USING "btree" ("slug");



CREATE INDEX "idx_seo_articles_status" ON "public"."seo_articles" USING "btree" ("status");



CREATE INDEX "idx_seo_keywords_cluster" ON "public"."seo_keywords" USING "btree" ("cluster_parent");



CREATE INDEX "idx_seo_keywords_intent" ON "public"."seo_keywords" USING "btree" ("intent");



CREATE INDEX "idx_seo_keywords_status" ON "public"."seo_keywords" USING "btree" ("status");



CREATE INDEX "idx_usage_metrics_user_month" ON "public"."usage_metrics" USING "btree" ("user_id", "month_year");



CREATE INDEX "idx_wallet_transactions_reference" ON "public"."wallet_transactions" USING "btree" ("reference");



CREATE INDEX "idx_wallet_transactions_user_id" ON "public"."wallet_transactions" USING "btree" ("user_id");



CREATE INDEX "idx_wallet_transactions_wallet_id" ON "public"."wallet_transactions" USING "btree" ("wallet_id");



CREATE INDEX "idx_wallets_user_id" ON "public"."wallets" USING "btree" ("user_id");



CREATE INDEX "profiles_last_login_at_idx" ON "public"."profiles" USING "btree" ("last_login_at");



CREATE OR REPLACE TRIGGER "on_invoice_status_gamification" AFTER UPDATE OF "status" ON "public"."invoices" FOR EACH ROW EXECUTE FUNCTION "public"."handle_invoice_gamification"();



CREATE OR REPLACE TRIGGER "on_profile_branding_updated" AFTER UPDATE OF "business_name", "business_address", "business_email", "business_phone", "tax_number", "brand_color", "secondary_color", "brand_logo_url", "brand_signature_url", "brand_voice", "invoice_footer" ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."sync_profile_branding_to_team"();



CREATE OR REPLACE TRIGGER "seo_articles_updated_at" BEFORE UPDATE ON "public"."seo_articles" FOR EACH ROW EXECUTE FUNCTION "public"."update_seo_updated_at"();



CREATE OR REPLACE TRIGGER "seo_keywords_updated_at" BEFORE UPDATE ON "public"."seo_keywords" FOR EACH ROW EXECUTE FUNCTION "public"."update_seo_updated_at"();



CREATE OR REPLACE TRIGGER "seo_settings_updated_at" BEFORE UPDATE ON "public"."seo_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_seo_updated_at"();



CREATE OR REPLACE TRIGGER "set_client_communication_logs_updated_at" BEFORE UPDATE ON "public"."client_communication_logs" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_clients_updated_at" BEFORE UPDATE ON "public"."clients" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_expenses_updated_at" BEFORE UPDATE ON "public"."expenses" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_identities_updated_at" BEFORE UPDATE ON "public"."identities" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_identity_leads_updated_at" BEFORE UPDATE ON "public"."identity_leads" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_invoices_updated_at" BEFORE UPDATE ON "public"."invoices" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_payg_entitlements_updated_at" BEFORE UPDATE ON "public"."payg_entitlements" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_product_passports_updated_at" BEFORE UPDATE ON "public"."product_passports" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_products_updated_at" BEFORE UPDATE ON "public"."products" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_profiles_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_qr_codes_updated_at" BEFORE UPDATE ON "public"."qr_codes" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "set_teams_updated_at" BEFORE UPDATE ON "public"."teams" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "tr_update_stock_on_ledger" AFTER INSERT ON "public"."stock_ledger" FOR EACH ROW EXECUTE FUNCTION "public"."update_product_stock"();



CREATE OR REPLACE TRIGGER "trg_recalculate_invoice_totals" AFTER INSERT OR DELETE OR UPDATE ON "public"."invoice_items" FOR EACH ROW EXECUTE FUNCTION "public"."recalculate_invoice_totals"();



CREATE OR REPLACE TRIGGER "trg_update_ai_usage_logs_timestamp" BEFORE UPDATE ON "public"."ai_usage_logs" FOR EACH ROW EXECUTE FUNCTION "public"."update_ai_usage_logs_updated_at"();



CREATE OR REPLACE TRIGGER "trg_update_client_balance" AFTER INSERT OR DELETE OR UPDATE ON "public"."client_ledger" FOR EACH ROW EXECUTE FUNCTION "public"."update_client_balance_tracker"();



CREATE OR REPLACE TRIGGER "trigger-invoice-events" AFTER INSERT ON "public"."invoice_events" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://iyvikdxzcpcjivmbiwik.supabase.co/functions/v1/invoice-event-worker', 'POST', '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dmlrZHh6Y3Bjaml2bWJpd2lrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQzNzEzMCwiZXhwIjoyMDkxMDEzMTMwfQ.hgqM7wGVac3WxgrkSAjYBp9GdGmeD_XlQXhhrRvOiUA"}', '{}', '5000');



CREATE OR REPLACE TRIGGER "update_payout_methods_updated_at_trigger" BEFORE UPDATE ON "public"."payout_methods" FOR EACH ROW EXECUTE FUNCTION "public"."update_payout_methods_updated_at"();



ALTER TABLE ONLY "public"."ai_usage_logs"
    ADD CONSTRAINT "ai_usage_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."billing_history"
    ADD CONSTRAINT "billing_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."business_cards"
    ADD CONSTRAINT "business_cards_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."client_communication_logs"
    ADD CONSTRAINT "client_communication_logs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."client_communication_logs"
    ADD CONSTRAINT "client_communication_logs_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."client_communication_logs"
    ADD CONSTRAINT "client_communication_logs_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."client_ledger"
    ADD CONSTRAINT "client_ledger_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."client_ledger"
    ADD CONSTRAINT "client_ledger_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."client_ledger"
    ADD CONSTRAINT "client_ledger_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."clients"
    ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."expense_categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."fcm_tokens"
    ADD CONSTRAINT "fcm_tokens_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."fcm_tokens"
    ADD CONSTRAINT "fcm_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."folders"
    ADD CONSTRAINT "folders_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."folders"
    ADD CONSTRAINT "folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."help_center_ratings"
    ADD CONSTRAINT "help_center_ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."identities"
    ADD CONSTRAINT "identities_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."identities"
    ADD CONSTRAINT "identities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."identity_leads"
    ADD CONSTRAINT "identity_leads_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "public"."identities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."invoice_events"
    ADD CONSTRAINT "invoice_events_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."invoice_events"
    ADD CONSTRAINT "invoice_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."invoice_items"
    ADD CONSTRAINT "invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."invoice_items"
    ADD CONSTRAINT "invoice_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."live_chat_messages"
    ADD CONSTRAINT "live_chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payg_entitlements"
    ADD CONSTRAINT "payg_entitlements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payment_methods"
    ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."payout_methods"
    ADD CONSTRAINT "payout_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pending_invitations"
    ADD CONSTRAINT "pending_invitations_invited_by_fkey" FOREIGN KEY ("invited_by") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."pending_invitations"
    ADD CONSTRAINT "pending_invitations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_passport_scans"
    ADD CONSTRAINT "product_passport_scans_passport_id_fkey" FOREIGN KEY ("passport_id") REFERENCES "public"."product_passports"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_passports"
    ADD CONSTRAINT "product_passports_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_passports"
    ADD CONSTRAINT "product_passports_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."qr_codes"
    ADD CONSTRAINT "qr_codes_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."qr_codes"
    ADD CONSTRAINT "qr_codes_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."qr_codes"
    ADD CONSTRAINT "qr_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."qr_scans"
    ADD CONSTRAINT "qr_scans_qr_code_id_fkey" FOREIGN KEY ("qr_code_id") REFERENCES "public"."qr_codes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."rankings_tracker"
    ADD CONSTRAINT "rankings_tracker_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."seo_keywords"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recurring_invoices"
    ADD CONSTRAINT "recurring_invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."recurring_invoices"
    ADD CONSTRAINT "recurring_invoices_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."scan_logs"
    ADD CONSTRAINT "scan_logs_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "public"."identities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."scheduled_posts"
    ADD CONSTRAINT "scheduled_posts_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "public"."seo_articles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."seo_articles"
    ADD CONSTRAINT "seo_articles_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "public"."seo_keywords"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."seo_articles"
    ADD CONSTRAINT "seo_articles_pillar_page_id_fkey" FOREIGN KEY ("pillar_page_id") REFERENCES "public"."seo_articles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."stock_ledger"
    ADD CONSTRAINT "stock_ledger_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stock_ledger"
    ADD CONSTRAINT "stock_ledger_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."team_members"
    ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."usage_metrics"
    ADD CONSTRAINT "usage_metrics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_gamification"
    ADD CONSTRAINT "user_gamification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vendors"
    ADD CONSTRAINT "vendors_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vendors"
    ADD CONSTRAINT "vendors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."wallet_transactions"
    ADD CONSTRAINT "wallet_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."wallet_transactions"
    ADD CONSTRAINT "wallet_transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."wallets"
    ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Admin read audit logs" ON "public"."audit_logs" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND (("profiles"."is_superadmin" = true) OR ("profiles"."role" = ANY (ARRAY['super_admin'::"text", 'seo_manager'::"text", 'support_staff'::"text"])))))));



CREATE POLICY "Client management" ON "public"."clients" TO "authenticated" USING ("public"."is_team_member"("team_id")) WITH CHECK ("public"."is_team_member"("team_id"));



CREATE POLICY "Identity owners can view their leads" ON "public"."identity_leads" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."identities"
  WHERE (("identities"."id" = "identity_leads"."identity_id") AND ("identities"."user_id" = "auth"."uid"())))));



CREATE POLICY "Identity owners can view their scan logs" ON "public"."scan_logs" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."identities"
  WHERE (("identities"."id" = "scan_logs"."identity_id") AND ("identities"."user_id" = "auth"."uid"())))));



CREATE POLICY "Invoices are manageable by team members" ON "public"."invoices" USING ("public"."check_team_membership"("team_id", "auth"."uid"()));



CREATE POLICY "Invoices are viewable by team members" ON "public"."invoices" FOR SELECT USING ("public"."check_team_membership"("team_id", "auth"."uid"()));



CREATE POLICY "Members insert" ON "public"."team_members" FOR INSERT TO "authenticated" WITH CHECK ((("user_id" = "auth"."uid"()) OR "public"."check_is_owner"("team_id")));



CREATE POLICY "Members select" ON "public"."team_members" FOR SELECT TO "authenticated" USING ((("user_id" = "auth"."uid"()) OR "public"."check_is_owner"("team_id")));



CREATE POLICY "Memberships are viewable by members" ON "public"."team_members" FOR SELECT USING ("public"."check_team_membership"("team_id", "auth"."uid"()));



CREATE POLICY "Owners and Admins can manage business cards" ON "public"."business_cards" USING ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "business_cards"."team_id") AND ("team_members"."user_id" = "auth"."uid"()) AND ("team_members"."role" = ANY (ARRAY['owner'::"text", 'admin'::"text"]))))));



CREATE POLICY "Owners and admins can create invites" ON "public"."pending_invitations" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "pending_invitations"."team_id") AND ("team_members"."user_id" = "auth"."uid"()) AND ("team_members"."role" = ANY (ARRAY['owner'::"text", 'admin'::"text"]))))));



CREATE POLICY "Owners and admins can delete invites" ON "public"."pending_invitations" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "pending_invitations"."team_id") AND ("team_members"."user_id" = "auth"."uid"()) AND ("team_members"."role" = ANY (ARRAY['owner'::"text", 'admin'::"text"]))))));



CREATE POLICY "Owners view scans" ON "public"."qr_scans" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."qr_codes" "q"
  WHERE (("q"."id" = "qr_scans"."qr_code_id") AND ("q"."user_id" = "auth"."uid"())))));



CREATE POLICY "Product management" ON "public"."products" TO "authenticated" USING ("public"."is_team_member"("team_id")) WITH CHECK ("public"."is_team_member"("team_id"));



CREATE POLICY "Profiles are updatable by owner" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Profiles are viewable by owner" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Profiles insert" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK (("id" = "auth"."uid"()));



CREATE POLICY "Profiles select" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Profiles update" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("id" = "auth"."uid"()));



CREATE POLICY "Public can insert scan logs (rate-limited)" ON "public"."scan_logs" FOR INSERT WITH CHECK ((("identity_id" IS NOT NULL) AND "public"."check_insert_rate_limit"('scan_logs'::"text", "identity_id", 10)));



CREATE POLICY "Public can insert scans" ON "public"."product_passport_scans" FOR INSERT WITH CHECK (true);



CREATE POLICY "Public can submit leads (rate-limited)" ON "public"."identity_leads" FOR INSERT WITH CHECK ((("identity_id" IS NOT NULL) AND ("email" ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'::"text") AND "public"."check_insert_rate_limit"('identity_leads'::"text", "identity_id", 5)));



CREATE POLICY "Public can view identities" ON "public"."identities" FOR SELECT USING (true);



CREATE POLICY "Public insert qr scans" ON "public"."qr_scans" FOR INSERT WITH CHECK (true);



CREATE POLICY "Public insert scans" ON "public"."qr_scans" FOR INSERT WITH CHECK (true);



CREATE POLICY "Public passport read access" ON "public"."product_passports" FOR SELECT USING (("public_status" = 'published'::"text"));



CREATE POLICY "Recurring invoice management" ON "public"."recurring_invoices" TO "authenticated" USING ("public"."is_team_member"("team_id")) WITH CHECK ("public"."is_team_member"("team_id"));



CREATE POLICY "Service role can manage all wallet transactions" ON "public"."wallet_transactions" USING (true) WITH CHECK (true);



CREATE POLICY "Service role can manage all wallets" ON "public"."wallets" USING (true) WITH CHECK (true);



CREATE POLICY "Service role insert audit logs" ON "public"."audit_logs" FOR INSERT WITH CHECK (true);



CREATE POLICY "Service role manages billing" ON "public"."billing_history" USING (("auth"."role"() = 'service_role'::"text")) WITH CHECK (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Service role only" ON "public"."webhook_logs" USING (("auth"."role"() = 'service_role'::"text")) WITH CHECK (("auth"."role"() = 'service_role'::"text"));



CREATE POLICY "Superadmins can manage notifications" ON "public"."admin_notifications" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."is_superadmin" = true)))));



CREATE POLICY "System can insert gamification data" ON "public"."user_gamification" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "System can update gamification data" ON "public"."user_gamification" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "System can write logs" ON "public"."webhook_logs" FOR INSERT WITH CHECK (true);



CREATE POLICY "Team access for business_cards" ON "public"."business_cards" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team access for client_ledger" ON "public"."client_ledger" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team access for clients" ON "public"."clients" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team access for expenses" ON "public"."expenses" TO "authenticated" USING ("public"."check_is_member"("team_id")) WITH CHECK ("public"."check_is_member"("team_id"));



CREATE POLICY "Team access for folders" ON "public"."folders" TO "authenticated" USING ("public"."check_is_member"("team_id")) WITH CHECK ("public"."check_is_member"("team_id"));



CREATE POLICY "Team access for products" ON "public"."products" TO "authenticated" USING ("public"."check_is_member"("team_id")) WITH CHECK ("public"."check_is_member"("team_id"));



CREATE POLICY "Team access for qr_codes" ON "public"."qr_codes" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team access for recurring_invoices" ON "public"."recurring_invoices" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team access for stock_ledger" ON "public"."stock_ledger" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team access for vendors" ON "public"."vendors" USING ("public"."is_team_member"("team_id"));



CREATE POLICY "Team members can access expenses" ON "public"."expenses" USING ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "expenses"."team_id") AND ("team_members"."user_id" = "auth"."uid"()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "expenses"."team_id") AND ("team_members"."user_id" = "auth"."uid"())))));



CREATE POLICY "Team members can manage product categories" ON "public"."product_categories" USING ("public"."check_team_access"("team_id", ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role", 'staff'::"public"."team_role"]));



CREATE POLICY "Team members can manage products" ON "public"."products" USING ("public"."check_team_access"("team_id", ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role", 'staff'::"public"."team_role"]));



CREATE POLICY "Team members can manage stock ledger" ON "public"."stock_ledger" USING ("public"."check_team_access"("team_id", ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role", 'staff'::"public"."team_role"]));



CREATE POLICY "Team members can view business cards" ON "public"."business_cards" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "business_cards"."team_id") AND ("team_members"."user_id" = "auth"."uid"())))));



CREATE POLICY "Team members can view pending invites" ON "public"."pending_invitations" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."team_members"
  WHERE (("team_members"."team_id" = "pending_invitations"."team_id") AND ("team_members"."user_id" = "auth"."uid"())))));



CREATE POLICY "Team members management" ON "public"."team_members" TO "authenticated" USING (("public"."is_team_owner"("team_id") OR ("user_id" = "auth"."uid"()))) WITH CHECK (("public"."is_team_owner"("team_id") OR ("user_id" = "auth"."uid"())));



CREATE POLICY "Team members see logs" ON "public"."client_communication_logs" USING ((EXISTS ( SELECT 1
   FROM "public"."team_members" "tm"
  WHERE (("tm"."team_id" = "client_communication_logs"."team_id") AND ("tm"."user_id" = "auth"."uid"())))));



CREATE POLICY "Team members visibility" ON "public"."team_members" FOR SELECT TO "authenticated" USING ((("user_id" = "auth"."uid"()) OR "public"."is_team_member"("team_id")));



CREATE POLICY "Team passport access" ON "public"."product_passports" USING ("public"."check_team_access"("team_id"));



CREATE POLICY "Team passport scans access" ON "public"."product_passport_scans" USING ((EXISTS ( SELECT 1
   FROM "public"."product_passports"
  WHERE (("product_passports"."id" = "product_passport_scans"."passport_id") AND "public"."check_team_access"("product_passports"."team_id")))));



CREATE POLICY "Teams are viewable by members" ON "public"."teams" FOR SELECT USING ("public"."check_team_membership"("id", "auth"."uid"()));



CREATE POLICY "Teams insert" ON "public"."teams" FOR INSERT TO "authenticated" WITH CHECK (("owner_id" = "auth"."uid"()));



CREATE POLICY "Teams management" ON "public"."teams" TO "authenticated" USING (("owner_id" = "auth"."uid"())) WITH CHECK (("owner_id" = "auth"."uid"()));



CREATE POLICY "Teams select" ON "public"."teams" FOR SELECT TO "authenticated" USING ((("owner_id" = "auth"."uid"()) OR "public"."check_is_member"("id")));



CREATE POLICY "Teams update" ON "public"."teams" FOR UPDATE TO "authenticated" USING (("owner_id" = "auth"."uid"()));



CREATE POLICY "Teams visibility" ON "public"."teams" FOR SELECT TO "authenticated" USING ((("owner_id" = "auth"."uid"()) OR "public"."is_team_member"("id")));



CREATE POLICY "Usage metrics are manageable by owner" ON "public"."usage_metrics" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Usage metrics are viewable by owner" ON "public"."usage_metrics" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete own client documents" ON "public"."client_documents" FOR DELETE USING (("auth"."uid"() = "uploader_id"));



CREATE POLICY "Users can delete their own payout methods" ON "public"."payout_methods" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can initialize their own payg entitlements" ON "public"."payg_entitlements" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert own client documents" ON "public"."client_documents" FOR INSERT WITH CHECK (("auth"."uid"() = "uploader_id"));



CREATE POLICY "Users can insert own gamification data" ON "public"."user_gamification" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own payout methods" ON "public"."payout_methods" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own categories" ON "public"."expense_categories" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can manage own chat messages" ON "public"."live_chat_messages" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage own messages" ON "public"."live_chat_messages" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can manage their own identities" ON "public"."identities" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own client documents" ON "public"."client_documents" FOR UPDATE USING (("auth"."uid"() = "uploader_id"));



CREATE POLICY "Users can update own gamification data" ON "public"."user_gamification" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own payg entitlements" ON "public"."payg_entitlements" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own payout methods" ON "public"."payout_methods" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own client documents" ON "public"."client_documents" FOR SELECT USING ((("auth"."uid"() = "uploader_id") OR ("client_id" IN ( SELECT "clients"."id"
   FROM "public"."clients"
  WHERE ("clients"."team_id" IN ( SELECT "team_members"."team_id"
           FROM "public"."team_members"
          WHERE ("team_members"."user_id" = "auth"."uid"())))))));



CREATE POLICY "Users can view own gamification data" ON "public"."user_gamification" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own usage logs" ON "public"."ai_usage_logs" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view system and own categories" ON "public"."expense_categories" FOR SELECT USING ((("user_id" IS NULL) OR ("user_id" = "auth"."uid"())));



CREATE POLICY "Users can view their own payg entitlements" ON "public"."payg_entitlements" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own payout methods" ON "public"."payout_methods" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own wallet" ON "public"."wallets" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own wallet transactions" ON "public"."wallet_transactions" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users full access to own payment methods" ON "public"."payment_methods" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users full access to own sessions" ON "public"."user_sessions" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users manage own fcm tokens" ON "public"."fcm_tokens" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users manage own messages" ON "public"."live_chat_messages" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users manage own usage" ON "public"."usage_metrics" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users read own billing history" ON "public"."billing_history" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users see own billing" ON "public"."billing_history" USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."admin_notifications" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_usage_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."audit_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."billing_history" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."business_cards" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."client_communication_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."client_documents" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."client_ledger" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."client_notes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."clients" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "clients_delete_policy" ON "public"."clients" FOR DELETE USING ((("user_id" = "auth"."uid"()) OR "public"."check_team_access"("team_id", ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role"])));



CREATE POLICY "clients_insert_policy" ON "public"."clients" FOR INSERT WITH CHECK ((("user_id" = "auth"."uid"()) OR "public"."check_team_access"("team_id")));



CREATE POLICY "clients_select_policy" ON "public"."clients" FOR SELECT USING ((("user_id" = "auth"."uid"()) OR "public"."check_team_access"("team_id")));



CREATE POLICY "clients_update_policy" ON "public"."clients" FOR UPDATE USING ((("user_id" = "auth"."uid"()) OR "public"."check_team_access"("team_id"))) WITH CHECK ((("user_id" = "auth"."uid"()) OR "public"."check_team_access"("team_id")));



ALTER TABLE "public"."expense_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "expenses_delete_policy" ON "public"."expenses" FOR DELETE USING ("public"."check_team_access"("team_id", ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role"]));



CREATE POLICY "expenses_insert_policy" ON "public"."expenses" FOR INSERT WITH CHECK ("public"."check_team_access"("team_id"));



CREATE POLICY "expenses_select_policy" ON "public"."expenses" FOR SELECT USING ("public"."check_team_access"("team_id"));



CREATE POLICY "expenses_update_policy" ON "public"."expenses" FOR UPDATE USING ("public"."check_team_access"("team_id")) WITH CHECK ("public"."check_team_access"("team_id"));



ALTER TABLE "public"."fcm_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."folders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."help_center_ratings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "help_ratings_admin_select" ON "public"."help_center_ratings" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = "auth"."uid"()) AND (("p"."is_superadmin" = true) OR ("p"."role" = ANY (ARRAY['super_admin'::"text", 'support_staff'::"text", 'seo_manager'::"text"])))))));



CREATE POLICY "help_ratings_public_insert" ON "public"."help_center_ratings" FOR INSERT WITH CHECK (true);



ALTER TABLE "public"."identities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."identity_leads" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."invoice_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."invoice_items" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "invoice_items_all_policy" ON "public"."invoice_items" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."invoices"
  WHERE (("invoices"."id" = "invoice_items"."invoice_id") AND ("public"."is_team_member"("invoices"."team_id") OR ("invoices"."user_id" = "auth"."uid"())))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."invoices"
  WHERE (("invoices"."id" = "invoice_items"."invoice_id") AND ("public"."is_team_member"("invoices"."team_id") OR ("invoices"."user_id" = "auth"."uid"()))))));



ALTER TABLE "public"."invoices" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "invoices_delete_policy" ON "public"."invoices" FOR DELETE USING (("public"."is_team_member"("team_id") OR ("user_id" = "auth"."uid"())));



CREATE POLICY "invoices_insert_policy" ON "public"."invoices" FOR INSERT WITH CHECK (("public"."is_team_member"("team_id") OR ("user_id" = "auth"."uid"())));



CREATE POLICY "invoices_select_policy" ON "public"."invoices" FOR SELECT USING (("public"."is_team_member"("team_id") OR ("user_id" = "auth"."uid"())));



CREATE POLICY "invoices_update_policy" ON "public"."invoices" FOR UPDATE USING (("public"."is_team_member"("team_id") OR ("user_id" = "auth"."uid"()))) WITH CHECK (("public"."is_team_member"("team_id") OR ("user_id" = "auth"."uid"())));



ALTER TABLE "public"."live_chat_messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payg_entitlements" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payment_methods" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "payment_methods_delete_own" ON "public"."payment_methods" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "payment_methods_insert_own" ON "public"."payment_methods" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "payment_methods_select_own" ON "public"."payment_methods" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "payment_methods_service_role_all" ON "public"."payment_methods" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "payment_methods_update_own" ON "public"."payment_methods" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."payout_methods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."pending_invitations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_passport_scans" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_passports" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "products_delete_policy" ON "public"."products" FOR DELETE USING ("public"."check_team_access"("team_id", ARRAY['owner'::"public"."team_role", 'admin'::"public"."team_role"]));



CREATE POLICY "products_insert_policy" ON "public"."products" FOR INSERT WITH CHECK ("public"."check_team_access"("team_id"));



CREATE POLICY "products_select_policy" ON "public"."products" FOR SELECT USING ("public"."check_team_access"("team_id"));



CREATE POLICY "products_update_policy" ON "public"."products" FOR UPDATE USING ("public"."check_team_access"("team_id")) WITH CHECK ("public"."check_team_access"("team_id"));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."qr_codes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."qr_scans" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."rankings_tracker" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "rankings_tracker_admin_full" ON "public"."rankings_tracker" USING (("public"."has_admin_role"('super_admin'::"text") OR "public"."has_admin_role"('seo_manager'::"text"))) WITH CHECK (("public"."has_admin_role"('super_admin'::"text") OR "public"."has_admin_role"('seo_manager'::"text")));



CREATE POLICY "rankings_tracker_support_read" ON "public"."rankings_tracker" FOR SELECT USING ("public"."has_admin_role"('support_staff'::"text"));



ALTER TABLE "public"."recurring_invoices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."scan_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."scheduled_posts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."seo_articles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "seo_articles_admin_full" ON "public"."seo_articles" USING (("public"."has_admin_role"('super_admin'::"text") OR "public"."has_admin_role"('seo_manager'::"text"))) WITH CHECK (("public"."has_admin_role"('super_admin'::"text") OR "public"."has_admin_role"('seo_manager'::"text")));



CREATE POLICY "seo_articles_public_published" ON "public"."seo_articles" FOR SELECT USING (("status" = 'published'::"public"."seo_article_status"));



CREATE POLICY "seo_articles_support_read" ON "public"."seo_articles" FOR SELECT USING ("public"."has_admin_role"('support_staff'::"text"));



ALTER TABLE "public"."seo_keywords" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "seo_keywords_admin_full" ON "public"."seo_keywords" USING (("public"."has_admin_role"('super_admin'::"text") OR "public"."has_admin_role"('seo_manager'::"text"))) WITH CHECK (("public"."has_admin_role"('super_admin'::"text") OR "public"."has_admin_role"('seo_manager'::"text")));



CREATE POLICY "seo_keywords_support_read" ON "public"."seo_keywords" FOR SELECT USING ("public"."has_admin_role"('support_staff'::"text"));



ALTER TABLE "public"."seo_settings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "seo_settings_admin_full" ON "public"."seo_settings" USING ("public"."has_admin_role"('super_admin'::"text")) WITH CHECK ("public"."has_admin_role"('super_admin'::"text"));



CREATE POLICY "seo_settings_manager_read" ON "public"."seo_settings" FOR SELECT USING ("public"."has_admin_role"('seo_manager'::"text"));



CREATE POLICY "service_role_all" ON "public"."invoice_events" TO "service_role" USING (true) WITH CHECK (true);



ALTER TABLE "public"."social_accounts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stock_ledger" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."team_members" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."teams" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."usage_metrics" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_gamification" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_sessions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vendors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."wallet_transactions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."wallets" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."webhook_logs" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";












GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";











































































































































































REVOKE ALL ON FUNCTION "public"."check_insert_rate_limit"("p_table_name" "text", "p_identity_id" "uuid", "p_max_per_minute" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."check_insert_rate_limit"("p_table_name" "text", "p_identity_id" "uuid", "p_max_per_minute" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."check_insert_rate_limit"("p_table_name" "text", "p_identity_id" "uuid", "p_max_per_minute" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_insert_rate_limit"("p_table_name" "text", "p_identity_id" "uuid", "p_max_per_minute" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."check_is_member"("t_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."check_is_member"("t_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_is_member"("t_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."check_is_owner"("t_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."check_is_owner"("t_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_is_owner"("t_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."check_team_access"("t_id" "uuid", "required_roles" "public"."team_role"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."check_team_access"("t_id" "uuid", "required_roles" "public"."team_role"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_team_access"("t_id" "uuid", "required_roles" "public"."team_role"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."check_team_membership"("team_id" "uuid", "user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."check_team_membership"("team_id" "uuid", "user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_team_membership"("team_id" "uuid", "user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."compute_level"("xp" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."compute_level"("xp" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."compute_level"("xp" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."confirm_withdrawal"("p_reference" character varying, "p_status" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."confirm_withdrawal"("p_reference" character varying, "p_status" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."confirm_withdrawal"("p_reference" character varying, "p_status" character varying) TO "service_role";



GRANT ALL ON FUNCTION "public"."create_invoice_transaction"("p_user_id" "uuid", "p_team_id" "text", "p_client_id" bigint, "p_invoice_number" "text", "p_invoice_type" "text", "p_status" "text", "p_issue_date" "date", "p_due_date" "date", "p_currency_code" "text", "p_tax_rate" numeric, "p_tax_type" "text", "p_tax_amount" numeric, "p_discount_type" "text", "p_discount_value" numeric, "p_discount_amount" numeric, "p_subtotal" numeric, "p_total_amount" numeric, "p_notes" "text", "p_metadata" "jsonb", "p_items" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."create_invoice_transaction"("p_user_id" "uuid", "p_team_id" "text", "p_client_id" bigint, "p_invoice_number" "text", "p_invoice_type" "text", "p_status" "text", "p_issue_date" "date", "p_due_date" "date", "p_currency_code" "text", "p_tax_rate" numeric, "p_tax_type" "text", "p_tax_amount" numeric, "p_discount_type" "text", "p_discount_value" numeric, "p_discount_amount" numeric, "p_subtotal" numeric, "p_total_amount" numeric, "p_notes" "text", "p_metadata" "jsonb", "p_items" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_invoice_transaction"("p_user_id" "uuid", "p_team_id" "text", "p_client_id" bigint, "p_invoice_number" "text", "p_invoice_type" "text", "p_status" "text", "p_issue_date" "date", "p_due_date" "date", "p_currency_code" "text", "p_tax_rate" numeric, "p_tax_type" "text", "p_tax_amount" numeric, "p_discount_type" "text", "p_discount_value" numeric, "p_discount_amount" numeric, "p_subtotal" numeric, "p_total_amount" numeric, "p_notes" "text", "p_metadata" "jsonb", "p_items" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."credit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_gross_amount" numeric, "p_gateway_fee" numeric, "p_platform_fee" numeric, "p_reference" character varying, "p_description" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."credit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_gross_amount" numeric, "p_gateway_fee" numeric, "p_platform_fee" numeric, "p_reference" character varying, "p_description" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."credit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_gross_amount" numeric, "p_gateway_fee" numeric, "p_platform_fee" numeric, "p_reference" character varying, "p_description" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."debit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_amount" numeric, "p_transfer_fee" numeric, "p_reference" character varying, "p_description" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."debit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_amount" numeric, "p_transfer_fee" numeric, "p_reference" character varying, "p_description" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."debit_wallet"("p_user_id" "uuid", "p_currency_code" character varying, "p_amount" numeric, "p_transfer_fee" numeric, "p_reference" character varying, "p_description" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_advanced_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."get_advanced_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_advanced_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_client_portal_data"("p_token" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_client_portal_data"("p_token" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_client_portal_data"("p_token" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_platform_stats"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_platform_stats"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_platform_stats"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_platform_stats"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."get_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_reports_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_revenue_trend"("p_days" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_revenue_trend"("p_days" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_revenue_trend"("p_days" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_revenue_trend"("p_days" integer) TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_user_growth_trend"("p_days" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_user_growth_trend"("p_days" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_growth_trend"("p_days" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_growth_trend"("p_days" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_invoice_gamification"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_invoice_gamification"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_invoice_gamification"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user_gamification"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user_gamification"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user_gamification"() TO "service_role";



GRANT ALL ON FUNCTION "public"."has_admin_role"("required_role" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."has_admin_role"("required_role" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."has_admin_role"("required_role" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_usage"("u_id" "uuid", "m_year" "text", "col_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_usage"("u_id" "uuid", "m_year" "text", "col_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_usage"("u_id" "uuid", "m_year" "text", "col_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_profile_owner"("profile_id_to_check" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_profile_owner"("profile_id_to_check" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_profile_owner"("profile_id_to_check" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_team_member"("team_id_to_check" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_team_member"("team_id_to_check" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_team_member"("team_id_to_check" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_team_owner"("team_id_to_check" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_team_owner"("team_id_to_check" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_team_owner"("team_id_to_check" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."recalculate_invoice_totals"() TO "anon";
GRANT ALL ON FUNCTION "public"."recalculate_invoice_totals"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."recalculate_invoice_totals"() TO "service_role";



GRANT ALL ON FUNCTION "public"."resolve_user_limits"("p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."resolve_user_limits"("p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."resolve_user_limits"("p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."sync_profile_branding_to_team"() TO "anon";
GRANT ALL ON FUNCTION "public"."sync_profile_branding_to_team"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."sync_profile_branding_to_team"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_ai_usage_logs_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_ai_usage_logs_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_ai_usage_logs_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_client_balance_tracker"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_client_balance_tracker"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_client_balance_tracker"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_invoice_with_items"("p_invoice_id" bigint, "p_invoice_data" "jsonb", "p_items" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."update_invoice_with_items"("p_invoice_id" bigint, "p_invoice_data" "jsonb", "p_items" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_invoice_with_items"("p_invoice_id" bigint, "p_invoice_data" "jsonb", "p_items" "jsonb") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_payout_methods_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_payout_methods_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_payout_methods_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_product_stock"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_product_stock"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_product_stock"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_seo_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_seo_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_seo_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."upgrade_user_subscription"("target_user_id" "uuid", "target_tier" "text", "is_yearly" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."upgrade_user_subscription"("target_user_id" "uuid", "target_tier" "text", "is_yearly" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."upgrade_user_subscription"("target_user_id" "uuid", "target_tier" "text", "is_yearly" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."verify_password"("p_email" "text", "p_password" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."verify_password"("p_email" "text", "p_password" "text") TO "service_role";
























GRANT ALL ON TABLE "public"."admin_notifications" TO "anon";
GRANT ALL ON TABLE "public"."admin_notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_notifications" TO "service_role";



GRANT ALL ON SEQUENCE "public"."admin_notifications_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."admin_notifications_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."admin_notifications_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."ai_usage_logs" TO "anon";
GRANT ALL ON TABLE "public"."ai_usage_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_usage_logs" TO "service_role";



GRANT ALL ON TABLE "public"."audit_logs" TO "anon";
GRANT ALL ON TABLE "public"."audit_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."audit_logs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."audit_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."audit_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."audit_logs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."billing_history" TO "authenticated";
GRANT ALL ON TABLE "public"."billing_history" TO "service_role";
GRANT SELECT ON TABLE "public"."billing_history" TO "anon";



GRANT ALL ON TABLE "public"."business_cards" TO "authenticated";
GRANT ALL ON TABLE "public"."business_cards" TO "service_role";
GRANT SELECT ON TABLE "public"."business_cards" TO "anon";



GRANT ALL ON TABLE "public"."client_communication_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."client_communication_logs" TO "service_role";
GRANT SELECT ON TABLE "public"."client_communication_logs" TO "anon";



GRANT ALL ON SEQUENCE "public"."client_communication_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."client_communication_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."client_communication_logs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."client_documents" TO "authenticated";
GRANT ALL ON TABLE "public"."client_documents" TO "service_role";
GRANT SELECT ON TABLE "public"."client_documents" TO "anon";



GRANT ALL ON SEQUENCE "public"."client_documents_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."client_documents_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."client_documents_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."client_ledger" TO "authenticated";
GRANT ALL ON TABLE "public"."client_ledger" TO "service_role";
GRANT SELECT ON TABLE "public"."client_ledger" TO "anon";



GRANT ALL ON SEQUENCE "public"."client_ledger_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."client_ledger_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."client_ledger_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."client_notes" TO "authenticated";
GRANT ALL ON TABLE "public"."client_notes" TO "service_role";
GRANT SELECT ON TABLE "public"."client_notes" TO "anon";



GRANT ALL ON SEQUENCE "public"."client_notes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."client_notes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."client_notes_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."clients" TO "authenticated";
GRANT ALL ON TABLE "public"."clients" TO "service_role";
GRANT SELECT ON TABLE "public"."clients" TO "anon";



GRANT ALL ON SEQUENCE "public"."clients_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."clients_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."clients_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."expense_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."expense_categories" TO "service_role";
GRANT SELECT ON TABLE "public"."expense_categories" TO "anon";



GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."expense_categories_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."expenses" TO "authenticated";
GRANT ALL ON TABLE "public"."expenses" TO "service_role";
GRANT SELECT ON TABLE "public"."expenses" TO "anon";



GRANT ALL ON SEQUENCE "public"."expenses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."expenses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."expenses_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."fcm_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."fcm_tokens" TO "service_role";
GRANT SELECT ON TABLE "public"."fcm_tokens" TO "anon";



GRANT ALL ON SEQUENCE "public"."fcm_tokens_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."fcm_tokens_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."fcm_tokens_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."folders" TO "authenticated";
GRANT ALL ON TABLE "public"."folders" TO "service_role";
GRANT SELECT ON TABLE "public"."folders" TO "anon";



GRANT ALL ON TABLE "public"."help_center_ratings" TO "anon";
GRANT ALL ON TABLE "public"."help_center_ratings" TO "authenticated";
GRANT ALL ON TABLE "public"."help_center_ratings" TO "service_role";



GRANT ALL ON TABLE "public"."identities" TO "anon";
GRANT ALL ON TABLE "public"."identities" TO "authenticated";
GRANT ALL ON TABLE "public"."identities" TO "service_role";



GRANT ALL ON TABLE "public"."identity_leads" TO "anon";
GRANT ALL ON TABLE "public"."identity_leads" TO "authenticated";
GRANT ALL ON TABLE "public"."identity_leads" TO "service_role";



GRANT ALL ON TABLE "public"."invoice_events" TO "anon";
GRANT ALL ON TABLE "public"."invoice_events" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice_events" TO "service_role";



GRANT ALL ON SEQUENCE "public"."invoice_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoice_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoice_events_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."invoice_items" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice_items" TO "service_role";
GRANT SELECT ON TABLE "public"."invoice_items" TO "anon";



GRANT ALL ON SEQUENCE "public"."invoice_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoice_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoice_items_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."invoices" TO "service_role";
GRANT SELECT ON TABLE "public"."invoices" TO "anon";



GRANT ALL ON TABLE "public"."invoice_tracking_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice_tracking_stats" TO "service_role";
GRANT SELECT ON TABLE "public"."invoice_tracking_stats" TO "anon";



GRANT ALL ON SEQUENCE "public"."invoices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."live_chat_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."live_chat_messages" TO "service_role";
GRANT SELECT ON TABLE "public"."live_chat_messages" TO "anon";



GRANT ALL ON SEQUENCE "public"."live_chat_messages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."live_chat_messages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."live_chat_messages_id_seq" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."payg_entitlements" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."payg_entitlements" TO "authenticated";
GRANT ALL ON TABLE "public"."payg_entitlements" TO "service_role";



GRANT ALL ON TABLE "public"."payment_methods" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_methods" TO "service_role";
GRANT SELECT ON TABLE "public"."payment_methods" TO "anon";



GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_methods_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payout_methods" TO "anon";
GRANT ALL ON TABLE "public"."payout_methods" TO "authenticated";
GRANT ALL ON TABLE "public"."payout_methods" TO "service_role";



GRANT ALL ON TABLE "public"."pending_invitations" TO "anon";
GRANT ALL ON TABLE "public"."pending_invitations" TO "authenticated";
GRANT ALL ON TABLE "public"."pending_invitations" TO "service_role";



GRANT ALL ON TABLE "public"."product_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."product_categories" TO "service_role";
GRANT SELECT ON TABLE "public"."product_categories" TO "anon";



GRANT ALL ON SEQUENCE "public"."product_categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_categories_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."product_passport_scans" TO "anon";
GRANT ALL ON TABLE "public"."product_passport_scans" TO "authenticated";
GRANT ALL ON TABLE "public"."product_passport_scans" TO "service_role";



GRANT ALL ON SEQUENCE "public"."product_passport_scans_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."product_passport_scans_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."product_passport_scans_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."product_passports" TO "anon";
GRANT ALL ON TABLE "public"."product_passports" TO "authenticated";
GRANT ALL ON TABLE "public"."product_passports" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";
GRANT SELECT ON TABLE "public"."products" TO "anon";



GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";
GRANT SELECT ON TABLE "public"."profiles" TO "anon";



GRANT ALL ON TABLE "public"."public_profiles" TO "anon";
GRANT ALL ON TABLE "public"."public_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."public_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."qr_codes" TO "authenticated";
GRANT ALL ON TABLE "public"."qr_codes" TO "service_role";
GRANT SELECT ON TABLE "public"."qr_codes" TO "anon";



GRANT ALL ON TABLE "public"."qr_scans" TO "authenticated";
GRANT ALL ON TABLE "public"."qr_scans" TO "service_role";
GRANT SELECT,INSERT ON TABLE "public"."qr_scans" TO "anon";



GRANT ALL ON SEQUENCE "public"."qr_scans_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."qr_scans_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."qr_scans_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."rankings_tracker" TO "anon";
GRANT ALL ON TABLE "public"."rankings_tracker" TO "authenticated";
GRANT ALL ON TABLE "public"."rankings_tracker" TO "service_role";



GRANT ALL ON TABLE "public"."recurring_invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."recurring_invoices" TO "service_role";
GRANT SELECT ON TABLE "public"."recurring_invoices" TO "anon";



GRANT ALL ON SEQUENCE "public"."recurring_invoices_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."recurring_invoices_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."recurring_invoices_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."scan_logs" TO "anon";
GRANT ALL ON TABLE "public"."scan_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."scan_logs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."scan_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."scan_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."scan_logs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."scheduled_posts" TO "anon";
GRANT ALL ON TABLE "public"."scheduled_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."scheduled_posts" TO "service_role";



GRANT ALL ON TABLE "public"."seo_articles" TO "anon";
GRANT ALL ON TABLE "public"."seo_articles" TO "authenticated";
GRANT ALL ON TABLE "public"."seo_articles" TO "service_role";



GRANT ALL ON TABLE "public"."seo_keywords" TO "anon";
GRANT ALL ON TABLE "public"."seo_keywords" TO "authenticated";
GRANT ALL ON TABLE "public"."seo_keywords" TO "service_role";



GRANT ALL ON TABLE "public"."seo_settings" TO "anon";
GRANT ALL ON TABLE "public"."seo_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."seo_settings" TO "service_role";



GRANT ALL ON TABLE "public"."social_accounts" TO "anon";
GRANT ALL ON TABLE "public"."social_accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."social_accounts" TO "service_role";



GRANT ALL ON TABLE "public"."stock_ledger" TO "authenticated";
GRANT ALL ON TABLE "public"."stock_ledger" TO "service_role";
GRANT SELECT ON TABLE "public"."stock_ledger" TO "anon";



GRANT ALL ON SEQUENCE "public"."stock_ledger_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."stock_ledger_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."stock_ledger_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."team_members" TO "authenticated";
GRANT ALL ON TABLE "public"."team_members" TO "service_role";
GRANT SELECT ON TABLE "public"."team_members" TO "anon";



GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";
GRANT SELECT ON TABLE "public"."teams" TO "anon";



GRANT ALL ON TABLE "public"."usage_metrics" TO "anon";
GRANT ALL ON TABLE "public"."usage_metrics" TO "authenticated";
GRANT ALL ON TABLE "public"."usage_metrics" TO "service_role";



GRANT ALL ON TABLE "public"."user_gamification" TO "anon";
GRANT ALL ON TABLE "public"."user_gamification" TO "authenticated";
GRANT ALL ON TABLE "public"."user_gamification" TO "service_role";



GRANT ALL ON TABLE "public"."user_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."user_sessions" TO "service_role";
GRANT SELECT ON TABLE "public"."user_sessions" TO "anon";



GRANT ALL ON TABLE "public"."vendors" TO "authenticated";
GRANT ALL ON TABLE "public"."vendors" TO "service_role";
GRANT SELECT ON TABLE "public"."vendors" TO "anon";



GRANT ALL ON SEQUENCE "public"."vendors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."vendors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."vendors_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."wallet_transactions" TO "anon";
GRANT ALL ON TABLE "public"."wallet_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."wallet_transactions" TO "service_role";



GRANT ALL ON TABLE "public"."wallets" TO "anon";
GRANT ALL ON TABLE "public"."wallets" TO "authenticated";
GRANT ALL ON TABLE "public"."wallets" TO "service_role";



GRANT ALL ON TABLE "public"."webhook_logs" TO "anon";
GRANT ALL ON TABLE "public"."webhook_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."webhook_logs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."webhook_logs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."webhook_logs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."webhook_logs_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































