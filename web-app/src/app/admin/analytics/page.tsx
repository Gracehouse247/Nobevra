'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, TrendingUp, DollarSign, UserPlus,
  BarChart3, Globe, Search, Lightbulb, AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnalyticsStats {
  totalUsers: number;
  revenueThisMonth: number;
  newSignupsThisWeek: number;
  planDistribution: PlanCount[];
}

interface PlanCount {
  subscription_tier: string;
  count: number;
}

interface RecentUser {
  id: string;
  email: string;
  full_name: string | null;
  subscription_tier: string | null;
  created_at: string;
}

interface RevenueTrendPoint {
  day: string;
  revenue: number;
}

interface TrafficDataPoint {
  source: string;
  visitors: number;
  color: string;
}

// Static SEO tips — curated content recommendations, not dynamic data
const SEO_TIPS = [
  {
    category: 'Keyword Gap',
    title: 'Target "free invoice generator" — 40K+ monthly searches',
    detail: 'Create a dedicated landing page or blog post optimized for this high-volume query.',
    priority: 'high',
  },
  {
    category: 'Missing Page',
    title: 'Add a /pricing comparison page with schema markup',
    detail: 'Competitor analysis shows pricing pages rank strongly. Add FAQ schema to boost SERP visibility.',
    priority: 'high',
  },
  {
    category: 'Content Gap',
    title: 'Publish "Invoice vs Receipt" — informational intent',
    detail: 'Over 22K searches/mo. Easy win with a structured comparison blog post.',
    priority: 'medium',
  },
  {
    category: 'Backlinks',
    title: 'Submit to SaaS directories: G2, Capterra, AlternativeTo',
    detail: 'These DA 80+ sites provide strong backlink signals and referral traffic.',
    priority: 'high',
  },
];

const TIER_COLORS: Record<string, string> = {
  explorer: '#cbd5e1',
  pulse:    '#01A0E2',
  pro:      '#01A0E2',
  elite:    '#f59e0b',
};

const TIER_TEXT_COLORS: Record<string, string> = {
  explorer: 'text-slate-600',
  pulse:    'text-[#006970]',
  pro:      'text-[#006970]',
  elite:    'text-amber-600',
};

const PRIORITY_STYLES: Record<string, string> = {
  high:   'bg-red-50 text-red-700 border border-red-200',
  medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  low:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

const TRAFFIC_COLORS = ['#006970', '#01A0E2', '#33b8c8', '#80d4dc', '#b9cacb'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [revenueTrend, setRevenueTrend] = useState<RevenueTrendPoint[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'seo'>('overview');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // ── Total users ────────────────────────────────────────────────────
        const { count: totalUsers, error: e1 } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        if (e1) throw e1;

        // ── Plan distribution ──────────────────────────────────────────────
        const { data: planData, error: e2 } = await supabase
          .from('profiles')
          .select('subscription_tier');
        if (e2) throw e2;

        const planMap: Record<string, number> = {};
        (planData || []).forEach(({ subscription_tier }) => {
          const tier = subscription_tier || 'explorer';
          planMap[tier] = (planMap[tier] || 0) + 1;
        });
        const planDistribution: PlanCount[] = Object.entries(planMap)
          .map(([subscription_tier, count]) => ({ subscription_tier, count }))
          .sort((a, b) => b.count - a.count);

        // ── Revenue this month ─────────────────────────────────────────────
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: billingData, error: e3 } = await supabase
          .from('billing_history')
          .select('amount')
          .eq('status', 'success')
          .gte('created_at', startOfMonth.toISOString());
        if (e3) throw e3;

        const revenueThisMonth = (billingData || []).reduce(
          (acc, b) => acc + Number(b.amount || 0), 0
        );

        // ── New signups this week ──────────────────────────────────────────
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const { count: newSignupsThisWeek, error: e4 } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString());
        if (e4) throw e4;

        setStats({
          totalUsers: totalUsers || 0,
          revenueThisMonth,
          newSignupsThisWeek: newSignupsThisWeek || 0,
          planDistribution,
        });

        // ── Revenue trend: last 7 days from billing_history ────────────────
        const { data: billingTrend } = await supabase
          .from('billing_history')
          .select('amount, created_at')
          .eq('status', 'success')
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('created_at', { ascending: true });

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const revenueMap: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
          revenueMap[d.toISOString().split('T')[0]] = 0;
        }
        (billingTrend || []).forEach(row => {
          const key = row.created_at.split('T')[0];
          if (revenueMap[key] !== undefined) {
            revenueMap[key] += Number(row.amount || 0);
          }
        });
        setRevenueTrend(
          Object.entries(revenueMap).map(([date, revenue]) => ({
            day: dayNames[new Date(date).getDay()],
            revenue: Math.round(revenue),
          }))
        );

        // ── Traffic sources: scan_logs grouped by source type ──────────────
        // scan_logs.location stores the scan origin; user_agent categorises device.
        // We group by a simple heuristic to build traffic source breakdown.
        const { data: scanData } = await supabase
          .from('scan_logs')
          .select('user_agent')
          .gte('scanned_at', sevenDaysAgo.toISOString());

        const sourceMap: Record<string, number> = {
          Mobile:  0,
          Desktop: 0,
          Tablet:  0,
          Bot:     0,
          Other:   0,
        };
        (scanData || []).forEach(({ user_agent }) => {
          const ua = (user_agent || '').toLowerCase();
          if (/bot|crawl|spider|slurp|yahoo|baidu|yandex/i.test(ua)) {
            sourceMap['Bot'] += 1;
          } else if (/tablet|ipad/i.test(ua)) {
            sourceMap['Tablet'] += 1;
          } else if (/mobile|android|iphone|ipod/i.test(ua)) {
            sourceMap['Mobile'] += 1;
          } else if (ua.length > 0) {
            sourceMap['Desktop'] += 1;
          } else {
            sourceMap['Other'] += 1;
          }
        });
        const trafficPoints: TrafficDataPoint[] = Object.entries(sourceMap)
          .filter(([, v]) => v > 0)
          .sort((a, b) => b[1] - a[1])
          .map(([source, visitors], i) => ({
            source,
            visitors,
            color: TRAFFIC_COLORS[i % TRAFFIC_COLORS.length],
          }));
        // If no scan data yet, show placeholder zeros so chart renders
        setTrafficData(
          trafficPoints.length > 0
            ? trafficPoints
            : [{ source: 'No Data', visitors: 0, color: '#cbd5e1' }]
        );

        // ── Recent signups ─────────────────────────────────────────────────
        const { data: recent, error: recentError } = await supabase
          .from('profiles')
          .select('id, email, display_name, subscription_tier, created_at')
          .order('created_at', { ascending: false })
          .limit(10);
        if (recentError) throw recentError;
        
        // Map display_name to full_name so we don't have to change the interface
        const mappedRecent = (recent || []).map((r: any) => ({
          ...r,
          full_name: r.display_name
        }));
        setRecentUsers((mappedRecent as unknown as RecentUser[]) || []);

      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[Analytics] Fetch error:', err);
        setError(msg || 'Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const totalPlanUsers = stats?.planDistribution.reduce((a, p) => a + p.count, 0) || 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#b9cacb] border-t-[#006970] animate-spin" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Loading Intelligence…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-slate-50">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 flex flex-col items-center gap-4 max-w-sm text-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-xl font-bold text-slate-900 tracking-tight">Data Load Error</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Performance Intelligence
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Live metrics and growth opportunities for Nobevra.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-xl">
            {(['overview', 'users', 'seo'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#006970] shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* KPI: Total Revenue - Large Bento Box */}
            <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Total Revenue</h3>
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                      {formatCurrency(stats?.revenueThisMonth || 0)}
                    </p>
                    <span className="flex items-center gap-1 text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <TrendingUp className="w-3 h-3" /> +14%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-[#f0fafa] rounded-xl text-[#006970]">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1 min-h-[200px] -mx-2 mt-4" style={{ minHeight: 200 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={revenueTrend}>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#64748b', fontWeight: 'bold', fontSize: '12px' }}
                      itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                      formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#006970" 
                      strokeWidth={4} 
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                      activeDot={{ r: 6, fill: '#006970', stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI: Active Subscriptions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-violet-50 rounded-xl text-violet-600">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  THIS WEEK
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Active Plans</h3>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stats?.planDistribution.length || 0}
                </p>
                <p className="text-xs text-slate-500 mt-2 font-medium">Across all distinct tiers</p>
              </div>
            </div>

            {/* KPI: Total Users */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <Users className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <TrendingUp className="w-3 h-3" /> +{(stats?.newSignupsThisWeek || 0)}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Total Users</h3>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {(stats?.totalUsers || 0).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-2 font-medium">All registered profiles</p>
              </div>
            </div>

            {/* Traffic Sources Bar Chart */}
            <div className="md:col-span-1 lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Traffic Sources</h3>
                  <p className="text-sm font-bold text-slate-900">Where visitors come from</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
              <div className="h-[180px] w-full">
                {trafficData.length === 0 || (trafficData.length === 1 && trafficData[0].source === 'No Data') ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    No scan data yet
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} width={70} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="visitors" radius={[0, 4, 4, 0]} barSize={20}>
                        {trafficData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="md:col-span-3 lg:col-span-4 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#f0fafa] rounded-xl text-[#006970]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Plan Distribution</h2>
                  <p className="text-xs text-slate-500 font-medium">Current subscriber breakdown</p>
                </div>
              </div>

              {stats?.planDistribution.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-slate-400 gap-2">
                  <BarChart3 className="w-8 h-8 opacity-30" />
                  <p className="text-[11px] font-bold uppercase tracking-widest">No plan data yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats?.planDistribution.map((plan) => {
                    const pct = Math.round((plan.count / totalPlanUsers) * 100);
                    const colorBg = TIER_COLORS[plan.subscription_tier] || '#cbd5e1';
                    const colorText = TIER_TEXT_COLORS[plan.subscription_tier] || 'text-slate-600';
                    return (
                      <div key={plan.subscription_tier} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-3">
                          <span className={`text-[11px] font-bold uppercase tracking-widest ${colorText}`}>
                            {plan.subscription_tier}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{pct}%</span>
                        </div>
                        <div className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
                          {plan.count} <span className="text-sm font-medium text-slate-500">users</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${pct}%`, backgroundColor: colorBg }}
                            className="h-full rounded-full transition-all duration-1000"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[#f0fafa] rounded-xl text-[#006970]">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Recent Signups</h2>
                <p className="text-xs text-slate-500 font-medium">Last 10 new user registrations</p>
              </div>
            </div>

            {recentUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
                <Users className="w-10 h-10 opacity-30" />
                <p className="text-[11px] font-bold uppercase tracking-widest">No users yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-slate-100">
                      <th className="text-[11px] font-bold uppercase tracking-widest text-slate-500 pb-4 pr-4">User</th>
                      <th className="text-[11px] font-bold uppercase tracking-widest text-slate-500 pb-4 pr-4">Plan</th>
                      <th className="text-[11px] font-bold uppercase tracking-widest text-slate-500 pb-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentUsers.map((user) => {
                      const tier = user.subscription_tier || 'free';
                      const colorText = TIER_TEXT_COLORS[tier] || 'text-slate-600';
                      return (
                        <tr key={user.id} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#f0fafa] border border-[#d0eded] flex items-center justify-center text-[#006970] text-xs font-black">
                                {(user.full_name || user.email || '?').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  {user.full_name || '—'}
                                </p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${colorText} bg-slate-50 border border-slate-200`}>
                              {tier}
                            </span>
                          </td>
                          <td className="py-4 text-xs font-medium text-slate-500">{timeAgo(user.created_at)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">SEO Opportunities</h2>
                <p className="text-xs text-slate-500 font-medium">Actionable intelligence to accelerate organic growth</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SEO_TIPS.map((tip, i) => (
                <div key={i} className="flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#006970] transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${PRIORITY_STYLES[tip.priority]}`}>
                      {tip.priority} Priority
                    </span>
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">{tip.category}</h3>
                  <p className="text-base font-bold text-slate-900 mb-2 leading-tight">{tip.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{tip.detail}</p>
                  <button className="flex items-center gap-2 text-sm font-bold text-[#006970] hover:text-[#005a60] w-fit">
                    Take Action <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
