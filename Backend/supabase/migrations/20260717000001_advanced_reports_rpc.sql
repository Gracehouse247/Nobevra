-- RPC: get_advanced_reports_summary
-- Returns advanced aggregated metrics, time series, and distributions 
-- for the Growth Reports dashboard.
CREATE OR REPLACE FUNCTION public.get_advanced_reports_summary(
  p_user_id UUID,
  p_start_date TIMESTAMPTZ,
  p_end_date   TIMESTAMPTZ
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
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

GRANT EXECUTE ON FUNCTION public.get_advanced_reports_summary(UUID, TIMESTAMPTZ, TIMESTAMPTZ) TO authenticated;
