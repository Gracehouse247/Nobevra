'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { BarChart3, TrendingUp, Users, FileText, ArrowUpRight, ArrowDownRight, Loader2, PieChart } from 'lucide-react';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { currencyService } from '@/lib/services/currencyService';

const RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'This Year'];

// Custom recharts tooltip that respects the theme via CSS variables
function CustomTooltip({ active, payload, label, currencySymbol }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-noble-card border border-noble-card-border rounded-2xl px-4 py-3 shadow-2xl">
            <p className="text-[11px] font-bold text-noble-muted uppercase tracking-wider mb-1">{label}</p>
            <p className="text-base font-black text-noble-text">
                {currencySymbol}{Number(payload[0].value).toLocaleString()}
            </p>
        </div>
    );
}

export default function GrowthReportsPage() {
    const { user, userData } = useAuth();
    const [activeRange, setActiveRange] = useState('Last 30 Days');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    const currencySymbol = userData?.preferred_currency
        ? currencyService.getCurrencySymbol(userData.preferred_currency)
        : '₦';

    useEffect(() => {
        if (!user) return;
        let p_start_date = new Date();
        const p_end_date = new Date();

        switch (activeRange) {
            case 'Last 7 Days':    p_start_date.setDate(p_start_date.getDate() - 7);     break;
            case 'Last 30 Days':   p_start_date.setDate(p_start_date.getDate() - 30);    break;
            case 'Last 3 Months':  p_start_date.setMonth(p_start_date.getMonth() - 3);   break;
            case 'Last 6 Months':  p_start_date.setMonth(p_start_date.getMonth() - 6);   break;
            case 'This Year':      p_start_date = new Date(p_end_date.getFullYear(), 0, 1); break;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: rpcData, error } = await supabase.rpc('get_reports_summary', {
                    p_user_id:    user.id,
                    p_start_date: p_start_date.toISOString(),
                    p_end_date:   p_end_date.toISOString(),
                });
                if (error) console.error('Error fetching reports:', error);
                else setData(rpcData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, activeRange]);

    const kpis = data ? [
        { title: 'Total Revenue',    value: `${currencySymbol}${data.total_revenue?.toLocaleString() ?? 0}`, icon: TrendingUp },
        { title: 'Total Invoices',   value: data.total_invoices ?? 0,                                         icon: FileText },
        { title: 'Active Clients',   value: data.active_clients ?? 0,                                         icon: Users },
        { title: 'Avg. Invoice Value', value: `${currencySymbol}${Math.round(data.avg_invoice_value ?? 0).toLocaleString()}`, icon: BarChart3 },
    ] : [];

    return (
        <div className="min-h-full bg-noble-surface dark:bg-[#060D1A] p-6 md:p-10 pb-24 relative overflow-hidden flex flex-col">
            {/* Ambient glow — uses semantic bg so it's invisible on light mode */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-noble-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

            <div className="max-w-[1400px] mx-auto relative z-10 w-full flex-1 flex flex-col">
                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-noble-primary/10 flex items-center justify-center border border-noble-primary/20">
                            <BarChart3 className="w-5 h-5 text-noble-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-noble-text">Growth Reports</h1>
                            <p className="text-sm text-noble-muted mt-0.5">Your business performance insights</p>
                        </div>
                    </div>

                    {/* Range pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        {RANGES.map(range => (
                            <button
                                key={range}
                                onClick={() => setActiveRange(range)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                    activeRange === range
                                        ? 'bg-noble-primary text-white shadow-lg shadow-noble-primary/20'
                                        : 'bg-noble-card text-noble-muted hover:bg-noble-interactive-bg border border-noble-card-border'
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Loading ── */}
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-noble-primary animate-spin" />
                    </div>

                /* ── Empty ── */
                ) : !data || data.total_invoices === 0 ? (
                    <div className="flex-1 flex items-center justify-center mt-10">
                        <ProactiveEmptyState
                            title="Your growth reports"
                            description="Once you start invoicing, this page will show revenue trends, top clients, payment analytics, and cash flow forecasts."
                            variant="empty"
                            illustrationIcons={[BarChart3, PieChart, TrendingUp]}
                            features={[
                                { title: 'Revenue Trends',   description: 'Track your income over time.', icon: TrendingUp },
                                { title: 'Client Analytics', description: 'Identify your best clients.',  icon: PieChart },
                                { title: 'Cash Flow',        description: 'Monitor money in and out.',    icon: BarChart3 },
                            ]}
                            actions={[
                                { label: 'Create Your First Invoice', onClick: () => window.location.href = '/invoices/new', variant: 'primary' },
                            ]}
                        />
                    </div>

                /* ── Dashboard ── */
                ) : (
                    <div className="space-y-6">

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {kpis.map((kpi, i) => (
                                <div
                                    key={i}
                                    className="bg-noble-card border border-noble-card-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-noble-primary/10 flex items-center justify-center mb-4 border border-noble-primary/20">
                                        <kpi.icon className="w-5 h-5 text-noble-primary" />
                                    </div>
                                    <p className="text-sm font-medium text-noble-muted mb-1">{kpi.title}</p>
                                    <p className="text-2xl md:text-3xl font-black text-noble-text tracking-tight">{kpi.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Charts row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Revenue chart */}
                            <div className="lg:col-span-2 bg-noble-card border border-noble-card-border rounded-3xl p-6 shadow-sm flex flex-col min-h-[400px]">
                                <h3 className="font-bold text-noble-text mb-6">Revenue Over Time</h3>
                                <div className="flex-1 w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data.monthly_buckets || []}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%"  stopColor="var(--noble-primary)" stopOpacity={0.25} />
                                                    <stop offset="95%" stopColor="var(--noble-primary)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                                stroke="var(--noble-card-border)"
                                            />
                                            <XAxis
                                                dataKey="month"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'var(--noble-muted)', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'var(--noble-muted)', fontSize: 12 }}
                                                tickFormatter={(val) =>
                                                    `${currencySymbol}${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`
                                                }
                                            />
                                            <Tooltip
                                                content={<CustomTooltip currencySymbol={currencySymbol} />}
                                                cursor={{ stroke: 'var(--noble-primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="var(--noble-primary)"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorRevenue)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Top Clients */}
                            <div className="bg-noble-card border border-noble-card-border rounded-3xl p-6 shadow-sm">
                                <h3 className="font-bold text-noble-text mb-4">Top Clients</h3>
                                <div className="space-y-2">
                                    {(data.top_clients || []).map((client: any, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-3 rounded-2xl hover:bg-noble-interactive-bg transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-noble-icon-bg flex items-center justify-center font-bold text-noble-muted text-sm shrink-0">
                                                    {client.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-noble-text text-sm">{client.name}</p>
                                                    <p className="text-xs text-noble-muted">{client.invoice_count} invoices</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-noble-primary text-sm whitespace-nowrap ml-2">
                                                {currencySymbol}{client.c_revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                    {(!data.top_clients || data.top_clients.length === 0) && (
                                        <div className="text-center py-8 text-noble-muted text-sm">
                                            No clients with paid invoices yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
