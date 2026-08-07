'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { BarChart3, TrendingUp, Users, FileText, ArrowUpRight, ArrowDownRight, Loader2, PieChart } from 'lucide-react';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { currencyService } from '@/lib/services/currencyService';

const RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'This Year'];

export default function GrowthReportsPage() {
    const { user, userData } = useAuth();
    const [activeRange, setActiveRange] = useState('Last 30 Days');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    const currencySymbol = userData?.preferred_currency ? currencyService.getCurrencySymbol(userData.preferred_currency) : '₦';

    useEffect(() => {
        if (!user) return;
        let p_start_date = new Date();
        const p_end_date = new Date();

        switch (activeRange) {
            case 'Last 7 Days': p_start_date.setDate(p_start_date.getDate() - 7); break;
            case 'Last 30 Days': p_start_date.setDate(p_start_date.getDate() - 30); break;
            case 'Last 3 Months': p_start_date.setMonth(p_start_date.getMonth() - 3); break;
            case 'Last 6 Months': p_start_date.setMonth(p_start_date.getMonth() - 6); break;
            case 'This Year': p_start_date = new Date(p_end_date.getFullYear(), 0, 1); break;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: rpcData, error } = await supabase.rpc('get_reports_summary', {
                    p_user_id: user.id,
                    p_start_date: p_start_date.toISOString(),
                    p_end_date: p_end_date.toISOString()
                });
                
                if (error) {
                    console.error('Error fetching reports:', error);
                } else {
                    setData(rpcData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, activeRange]);

    return (
        <div className="min-h-full bg-[#E8F2FA] p-6 md:p-10 pb-24 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-white/40 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

            <div className="max-w-[1400px] mx-auto relative z-10 w-full flex-1 flex flex-col">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center border border-noble-blue/20">
                            <BarChart3 className="w-5 h-5 text-noble-blue" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Growth Reports</h1>
                            <p className="text-sm text-slate-500 mt-0.5">Your business performance insights</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        {RANGES.map(range => (
                            <button
                                key={range}
                                onClick={() => setActiveRange(range)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                    activeRange === range
                                    ? 'bg-noble-blue text-white shadow-lg shadow-noble-blue/20'
                                    : 'bg-white/60 text-slate-600 hover:bg-white'
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-noble-blue animate-spin" />
                    </div>
                ) : !data || data.total_invoices === 0 ? (
                    <div className="flex-1 flex items-center justify-center mt-10">
                        <ProactiveEmptyState
                            title="Your growth reports"
                            description="Once you start invoicing, this page will show revenue trends, top clients, payment analytics, and cash flow forecasts."
                            variant="empty"
                            illustrationIcons={[BarChart3, PieChart, TrendingUp]}
                            features={[
                                { title: 'Revenue Trends', description: 'Track your income over time.', icon: TrendingUp },
                                { title: 'Client Analytics', description: 'Identify your best clients.', icon: PieChart },
                                { title: 'Cash Flow', description: 'Monitor money in and out.', icon: BarChart3 }
                            ]}
                            actions={[
                                { label: 'Create Your First Invoice', onClick: () => window.location.href = '/invoices/new', variant: 'primary' }
                            ]}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {[
                                { title: 'Total Revenue', value: `${currencySymbol}${data.total_revenue.toLocaleString()}`, icon: TrendingUp },
                                { title: 'Paid Invoices', value: data.paid_count, icon: FileText },
                                { title: 'Active Clients', value: data.active_clients, icon: Users },
                                { title: 'Avg. Invoice Value', value: `${currencySymbol}${Math.round(data.avg_invoice_value).toLocaleString()}`, icon: BarChart3 },
                            ].map((kpi, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-noble-blue/10 flex items-center justify-center mb-4">
                                        <kpi.icon className="w-5 h-5 text-noble-blue" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">{kpi.title}</p>
                                    <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm flex flex-col min-h-[400px]">
                                <h3 className="font-bold text-slate-900 mb-6">Revenue Over Time</h3>
                                <div className="flex-1 w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data.monthly_buckets || []}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0599D5" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#0599D5" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(val) => `${currencySymbol}${val >= 1000 ? (val/1000).toFixed(0)+'k' : val}`} />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: any) => [`${currencySymbol}${value.toLocaleString()}`, 'Revenue']}
                                            />
                                            <Area type="monotone" dataKey="revenue" stroke="#0599D5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-6">Top Clients</h3>
                                <div className="space-y-4">
                                    {(data.top_clients || []).map((client: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                                                    {client.name.substring(0,2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm">{client.name}</p>
                                                    <p className="text-xs text-slate-500">{client.invoice_count} invoices</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-noble-blue text-sm">
                                                {currencySymbol}{client.c_revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                    {(!data.top_clients || data.top_clients.length === 0) && (
                                        <div className="text-center py-8 text-slate-500 text-sm">
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
