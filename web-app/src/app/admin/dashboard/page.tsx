'use client';

import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, BarChart3, CreditCard, ArrowUpRight, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AdminCard, AdminMetricCard } from '@/components/shared/AdminCard';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

interface RevenueDataPoint {
  name: string;
  revenue: number;
}

interface UserGrowthPoint {
  name: string;
  users: number;
}

interface DashboardStats {
  activeUsers: number;
  totalRevenue: number;
  openInquiries: number;
  paidInvoices: number;
  revenueTarget: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        activeUsers: 0,
        totalRevenue: 0,
        openInquiries: 0,
        paidInvoices: 0,
        revenueTarget: 50000,
    });
    const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
    const [userGrowthData, setUserGrowthData] = useState<UserGrowthPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fetchStats = async () => {
            try {
                // ── Total registered users ──────────────────────────────────
                const { count: totalUsers } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true });

                // ── Total revenue from billing_history ──────────────────────
                const { data: billingAll } = await supabase
                    .from('billing_history')
                    .select('amount')
                    .eq('status', 'success');
                const totalRevenue = (billingAll || []).reduce(
                    (acc, b) => acc + Number(b.amount || 0), 0
                );

                // ── Open support inquiries (placeholder: count unread notifications) ─
                const { count: openInquiries } = await supabase
                    .from('admin_notifications')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_read', false)
                    .eq('type', 'message');

                // ── Paid invoices count ─────────────────────────────────────
                const { count: paidInvoices } = await supabase
                    .from('invoices')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'paid');

                setStats({
                    activeUsers: totalUsers || 0,
                    totalRevenue,
                    openInquiries: openInquiries || 0,
                    paidInvoices: paidInvoices || 0,
                    revenueTarget: 50000,
                });

                // ── Revenue trend: last 7 days ──────────────────────────────
                const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
                sevenDaysAgo.setHours(0, 0, 0, 0);

                const { data: recentBilling } = await supabase
                    .from('billing_history')
                    .select('amount, created_at')
                    .eq('status', 'success')
                    .gte('created_at', sevenDaysAgo.toISOString())
                    .order('created_at', { ascending: true });

                // Build a map for all 7 days with real totals
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const revenueMap: Record<string, number> = {};
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
                    const key = d.toISOString().split('T')[0];
                    revenueMap[key] = 0;
                }
                (recentBilling || []).forEach(row => {
                    const key = row.created_at.split('T')[0];
                    if (revenueMap[key] !== undefined) {
                        revenueMap[key] += Number(row.amount || 0);
                    }
                });
                const revenueTrend: RevenueDataPoint[] = Object.entries(revenueMap).map(([date, revenue]) => ({
                    name: dayNames[new Date(date).getDay()],
                    revenue: Math.round(revenue),
                }));
                setRevenueData(revenueTrend);

                // ── User growth: last 7 days ────────────────────────────────
                const { data: recentProfiles } = await supabase
                    .from('profiles')
                    .select('created_at')
                    .gte('created_at', sevenDaysAgo.toISOString())
                    .order('created_at', { ascending: true });

                const growthMap: Record<string, number> = {};
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
                    const key = d.toISOString().split('T')[0];
                    growthMap[key] = 0;
                }
                (recentProfiles || []).forEach(row => {
                    const key = row.created_at.split('T')[0];
                    if (growthMap[key] !== undefined) {
                        growthMap[key] += 1;
                    }
                });
                const growthTrend: UserGrowthPoint[] = Object.entries(growthMap).map(([date, users]) => ({
                    name: dayNames[new Date(date).getDay()],
                    users,
                }));
                setUserGrowthData(growthTrend);

            } catch (err) {
                console.error('Failed to fetch dashboard stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (!mounted) return null;

    const revenueProgressPct = stats.revenueTarget > 0
        ? Math.min(100, Math.round((stats.totalRevenue / stats.revenueTarget) * 100))
        : 0;

    return (
        <div className="space-y-8 pb-10 fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="mt-1.5 text-sm font-medium text-slate-500">Welcome back! Here is your business overview for today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        System Online
                    </span>
                    <button className="px-5 py-2.5 bg-[#006970] rounded-lg text-sm font-bold text-white hover:bg-[#005a60] shadow-sm transition-all flex items-center gap-2">
                        Download Report <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <AdminMetricCard 
                    title="Total Revenue" 
                    value={`$${stats.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    trendLabel="All-time billing" 
                    icon={CreditCard} 
                />
                <AdminMetricCard 
                    title="Registered Users" 
                    value={stats.activeUsers.toLocaleString()} 
                    trendLabel="Total profiles"
                    icon={Users} 
                />
                <AdminMetricCard 
                    title="Paid Invoices" 
                    value={stats.paidInvoices.toLocaleString()} 
                    trendLabel="Settled invoices"
                    icon={BarChart3} 
                />
                <AdminMetricCard 
                    title="Open Inquiries" 
                    value={stats.openInquiries.toLocaleString()}
                    trendLabel="Unread notifications"
                    icon={MessageSquare} 
                />
            </div>

            {/* Main Charts Area (Bento Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AdminCard 
                        title="Revenue Overview" 
                        description="Daily revenue over the last 7 days"
                        headerAction={
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                                Last 7 Days
                            </span>
                        }
                    >
                        {loading ? (
                            <div className="h-[350px] flex items-center justify-center text-slate-400 text-sm font-medium">
                                Loading chart data…
                            </div>
                        ) : (
                            <div className="h-[350px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#006970" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#006970" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} tickFormatter={(val) => `$${val}`} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                                            formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, 'Revenue']}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#006970" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </AdminCard>
                </div>

                <div className="flex flex-col gap-6">
                    <AdminCard title="User Growth" description="New signups last 7 days">
                        {loading ? (
                            <div className="h-[140px] flex items-center justify-center text-slate-400 text-sm font-medium">
                                Loading…
                            </div>
                        ) : (
                            <div className="h-[140px] w-full mt-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={userGrowthData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </AdminCard>
                    
                    <div className="bg-gradient-to-br from-[#006970] to-[#01A0E2] rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex-1 flex flex-col justify-between">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#00F0FF]/15 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md mb-4 border border-white/10">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">Revenue Target</h3>
                            <p className="text-[#e0f5f5] text-sm mt-1 font-medium">
                                You are at {revenueProgressPct}% of your target.
                            </p>
                        </div>
                        
                        <div className="relative z-10 mt-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-2xl font-bold">
                                    ${(stats.totalRevenue / 1000).toFixed(1)}k
                                </span>
                                <span className="text-sm font-semibold text-[#e0f5f5]">
                                    / ${(stats.revenueTarget / 1000).toFixed(0)}k
                                </span>
                            </div>
                            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-1000"
                                    style={{ width: `${revenueProgressPct}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
