-- =============================================================================
-- Migration: Dashboard Stats RPC
-- Purpose: Offload dashboard aggregation from client to database for accuracy and performance.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.get_dashboard_stats(p_team_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_revenue NUMERIC := 0;
    v_outstanding NUMERIC := 0;
    v_paid_count INT := 0;
    
    v_curr_month_rev NUMERIC := 0;
    v_prev_month_rev NUMERIC := 0;
    v_curr_month_out NUMERIC := 0;
    v_prev_month_out NUMERIC := 0;
    
    v_curr_month_paid INT := 0;
    v_curr_month_total INT := 0;
    v_prev_month_paid INT := 0;
    v_prev_month_total INT := 0;
    
    v_revenue_trend NUMERIC := 0;
    v_outstanding_trend NUMERIC := 0;
    v_strength_trend NUMERIC := 0;
    v_strength_index NUMERIC := 100;
    
    v_clients_count INT := 0;
    
    v_sparklines_rev NUMERIC[] := ARRAY[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    v_sparklines_out NUMERIC[] := ARRAY[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    
    inv RECORD;
    v_month_diff INT;
    v_now TIMESTAMP := NOW();
BEGIN
    -- Client Count
    SELECT COUNT(*) INTO v_clients_count
    FROM public.clients
    WHERE team_id = p_team_id;

    -- Aggregate Invoices
    FOR inv IN 
        SELECT total_amount, status, created_at 
        FROM public.invoices 
        WHERE team_id = p_team_id AND status != 'draft'
    LOOP
        v_month_diff := (EXTRACT(YEAR FROM v_now) - EXTRACT(YEAR FROM inv.created_at)) * 12 + 
                        (EXTRACT(MONTH FROM v_now) - EXTRACT(MONTH FROM inv.created_at));

        IF inv.status = 'paid' THEN
            v_total_revenue := v_total_revenue + COALESCE(inv.total_amount, 0);
            v_paid_count := v_paid_count + 1;
            
            IF v_month_diff >= 0 AND v_month_diff < 7 THEN
                v_sparklines_rev[7 - v_month_diff] := v_sparklines_rev[7 - v_month_diff] + COALESCE(inv.total_amount, 0);
            END IF;
            
            IF v_month_diff = 0 THEN
                v_curr_month_rev := v_curr_month_rev + COALESCE(inv.total_amount, 0);
                v_curr_month_paid := v_curr_month_paid + 1;
                v_curr_month_total := v_curr_month_total + 1;
            ELSIF v_month_diff = 1 THEN
                v_prev_month_rev := v_prev_month_rev + COALESCE(inv.total_amount, 0);
                v_prev_month_paid := v_prev_month_paid + 1;
                v_prev_month_total := v_prev_month_total + 1;
            END IF;
            
        ELSIF inv.status IN ('pending', 'sent', 'unpaid', 'overdue') THEN
            v_outstanding := v_outstanding + COALESCE(inv.total_amount, 0);
            
            IF v_month_diff >= 0 AND v_month_diff < 7 THEN
                v_sparklines_out[7 - v_month_diff] := v_sparklines_out[7 - v_month_diff] + COALESCE(inv.total_amount, 0);
            END IF;
            
            IF v_month_diff = 0 THEN
                v_curr_month_out := v_curr_month_out + COALESCE(inv.total_amount, 0);
                v_curr_month_total := v_curr_month_total + 1;
            ELSIF v_month_diff = 1 THEN
                v_prev_month_out := v_prev_month_out + COALESCE(inv.total_amount, 0);
                v_prev_month_total := v_prev_month_total + 1;
            END IF;
        END IF;
    END LOOP;

    -- Trends
    IF v_prev_month_rev = 0 THEN
        IF v_curr_month_rev > 0 THEN v_revenue_trend := 100; END IF;
    ELSE
        v_revenue_trend := ((v_curr_month_rev - v_prev_month_rev) / v_prev_month_rev) * 100;
    END IF;

    IF v_prev_month_out = 0 THEN
        IF v_curr_month_out > 0 THEN v_outstanding_trend := 100; END IF;
    ELSE
        v_outstanding_trend := ((v_curr_month_out - v_prev_month_out) / v_prev_month_out) * 100;
    END IF;

    -- Strength Index
    DECLARE
        v_curr_strength NUMERIC := 100;
        v_prev_strength NUMERIC := 100;
        v_total_invs INT := 0;
    BEGIN
        IF v_curr_month_total > 0 THEN
            v_curr_strength := (v_curr_month_paid::NUMERIC / v_curr_month_total) * 100;
        END IF;
        
        IF v_prev_month_total > 0 THEN
            v_prev_strength := (v_prev_month_paid::NUMERIC / v_prev_month_total) * 100;
        END IF;
        
        v_strength_trend := v_curr_strength - v_prev_strength;
        
        SELECT COUNT(*) INTO v_total_invs FROM public.invoices WHERE team_id = p_team_id AND status != 'draft';
        IF v_total_invs > 0 THEN
            v_strength_index := ROUND((v_paid_count::NUMERIC / v_total_invs) * 100);
        END IF;
    END;

    RETURN jsonb_build_object(
        'totalRevenue', v_total_revenue,
        'outstanding', v_outstanding,
        'paidCount', v_paid_count,
        'strengthIndex', v_strength_index,
        'revenueTrend', v_revenue_trend,
        'outstandingTrend', v_outstanding_trend,
        'strengthTrend', v_strength_trend,
        'revenueSparkline', to_jsonb(v_sparklines_rev),
        'outstandingSparkline', to_jsonb(v_sparklines_out),
        'clientsCount', v_clients_count
    );
END;
$$;
