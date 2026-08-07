import { useAuth } from '@/context/AuthContext';
import { useRealtime } from '@/components/providers/RealtimeProvider';
import { teamService, invoiceService } from '@/lib/services/supabaseService';
import { Invoice } from '@/types';
import { useSupabaseQuery } from './useSupabaseQuery';
import { useSyncStore } from '@/store/useSyncStore';
import { supabase } from '@/lib/supabase';
import { currencyService } from '@/lib/services/currencyService';
import { useCurrency } from '@/context/CurrencyContext';

export interface DashboardStats {
    totalRevenue: number;
    outstanding: number;
    paidCount: number;
    strengthIndex: number;
    revenueTrend: number;
    outstandingTrend: number;
    strengthTrend: number;
    revenueSparkline: number[];
    outstandingSparkline: number[];
    tickerEvents: string[];
    clientsCount: number;
}

export function useDashboardData() {
    const { userData, user } = useAuth();
    const { lastSyncTime } = useRealtime();
    const { isOnline } = useSyncStore();
    const { currencyCode } = useCurrency();

    const userId = user?.id || userData?.uid;

    const { data, error, isLoading, isValidating } = useSupabaseQuery(
        userId ? ['dashboard', userId, lastSyncTime] : null,
        async () => {

            try {
                const tData = await teamService.getTeamByUserId(userId!);
                const teamId = tData?.id || userId;

                const [invsResult, expResult, statsResult] = await Promise.all([
                    supabase
                        .from('invoices')
                        .select('*, clients(name, email, phone)')
                        .eq('team_id', teamId)
                        .order('created_at', { ascending: false })
                        .limit(20),
                    supabase
                        .from('expenses')
                        .select('id, amount, expense_date, created_at')
                        .eq('team_id', teamId)
                        .order('expense_date', { ascending: false })
                        .limit(20),
                    supabase
                        .rpc('get_dashboard_stats', { p_team_id: teamId })
                ]);

                if (invsResult.error) {
                    console.warn('[useDashboardData] Invoices fetch error:', invsResult.error.message);
                }
                if (expResult.error) {
                    console.warn('[useDashboardData] Expenses fetch error:', expResult.error.message);
                }
                if (statsResult.error) {
                    console.warn('[useDashboardData] Stats fetch error:', statsResult.error.message);
                }
                
                const invs = invsResult.data || [];
                const exps = expResult.data || [];
                const rpcStats = statsResult.data || {};

                const tickerEvents = invs.filter((i: Record<string, any>) => i.status !== 'draft').slice(0, 10).map((inv: Record<string, any>) => {
                    const clientName = inv.clients?.name || 'UNKNOWN CLIENT';
                    // The ticker should just use the active currencyCode since it's formatting dashboard stats
                    const amountStr = currencyService.format(inv.total_amount || 0, currencyCode, { decimals: 0 });
                    const num = inv.invoice_number || 'INV';
                    if (inv.status === 'paid') return `${num} SETTLED: ${amountStr} FROM ${clientName}`.toUpperCase();
                    if (inv.status === 'overdue') return `${num} OVERDUE: ${amountStr} PENDING FROM ${clientName}`.toUpperCase();
                    if (inv.status === 'sent') return `${num} SENT: ${amountStr} TO ${clientName}`.toUpperCase();
                    return `${num} LOGGED: ${amountStr} FOR ${clientName}`.toUpperCase();
                });
                
                if (tickerEvents.length === 0) {
                    tickerEvents.push("SYSTEM READY: WAITING FOR FIRST INVOICE TO BE CREATED");
                    tickerEvents.push("NOBLE INTELLIGENCE ENGINE ONLINE");
                }

                const newStats = {
                    totalRevenue: rpcStats.totalRevenue || 0,
                    outstanding: rpcStats.outstanding || 0,
                    paidCount: rpcStats.paidCount || 0,
                    strengthIndex: rpcStats.strengthIndex || 100,
                    revenueTrend: rpcStats.revenueTrend || 0,
                    outstandingTrend: rpcStats.outstandingTrend || 0,
                    strengthTrend: rpcStats.strengthTrend || 0,
                    revenueSparkline: rpcStats.revenueSparkline || [0, 0, 0, 0, 0, 0, 0],
                    outstandingSparkline: rpcStats.outstandingSparkline || [0, 0, 0, 0, 0, 0, 0],
                    tickerEvents,
                    clientsCount: rpcStats.clientsCount || 0,
                };

                return { data: { invoices: invs as Invoice[], expenses: exps, stats: newStats }, error: null };
            } catch (err) {
                return { data: null, error: err };
            }
        }
    );

    const firstName = userData?.name ? userData.name.split(' ')[0] : 'Noble';

    const defaultStats = {
        totalRevenue: 0,
        outstanding: 0,
        paidCount: 0,
        strengthIndex: 0,
        revenueTrend: 0,
        outstandingTrend: 0,
        strengthTrend: 0,
        revenueSparkline: [0, 0, 0, 0, 0, 0, 0],
        outstandingSparkline: [0, 0, 0, 0, 0, 0, 0],
        tickerEvents: ["SYSTEM READY: WAITING FOR DATA"],
        clientsCount: 0,
    };

    return { 
        invoices: data?.invoices || [], 
        expenses: data?.expenses || [],
        loading: isLoading || (!data && !error && isOnline), 
        error: error && !data ? 'Failed to load dashboard data.' : null, 
        stats: data?.stats || defaultStats, 
        currencyCode, 
        firstName,
        isValidating
    };
}
