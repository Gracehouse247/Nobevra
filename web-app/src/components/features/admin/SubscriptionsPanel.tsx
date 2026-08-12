'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SubscriptionData {
    id: string;
    name: string;
    email: string;
    plan: string;
    status: string;
    since: string;
    amount: number;
}

export default function SubscriptionsPanel() {
    const [filter, setFilter] = useState<'all' | 'pro' | 'free' | 'elite'>('all');
    const [subscribers, setSubscribers] = useState<SubscriptionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                // In a production SaaS, this would typically fetch from a secure Edge Function
                // bypassing RLS for admin panels, or relying on an admin RLS policy.
                const { data: profiles, error } = await supabase
                    .from('profiles')
                    .select('id, display_name, email, subscription_tier, subscription_status, created_at')
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (error) {
                    console.error('Error fetching subscribers:', error);
                    return;
                }

                if (profiles) {
                    const mapped: SubscriptionData[] = profiles.map(p => ({
                        id: p.id,
                        name: p.display_name || 'Anonymous User',
                        email: p.email || 'N/A',
                        plan: p.subscription_tier === 'explorer' ? 'Free' : (p.subscription_tier === 'pro' ? 'Pro' : 'Elite'),
                        status: p.subscription_status || 'active',
                        since: new Date(p.created_at).toLocaleDateString(),
                        amount: p.subscription_tier === 'elite' ? 240 : (p.subscription_tier === 'pro' ? 99 : 0)
                    }));
                    setSubscribers(mapped);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    const stats = {
        mrr: subscribers.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0) / 12, // Approx monthly
        totalPro: subscribers.filter(s => (s.plan === 'Pro' || s.plan === 'Elite') && s.status === 'active').length,
        totalFree: subscribers.filter(s => s.plan === 'Free').length,
        churn: subscribers.filter(s => s.status === 'cancelled').length,
    };

    const filtered = subscribers.filter(s => {
        if (filter === 'pro') return s.plan === 'Pro';
        if (filter === 'elite') return s.plan === 'Elite';
        if (filter === 'free') return s.plan === 'Free';
        return true;
    });

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Estimated MRR', value: `$${stats.mrr.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-400' },
                    { label: 'Paid Subscribers', value: stats.totalPro, icon: CreditCard, color: 'text-[#006970]' },
                    { label: 'Free Users', value: stats.totalFree, icon: Users, color: 'text-slate-600 ' },
                    { label: 'Churn (All Time)', value: stats.churn, icon: TrendingUp, color: 'text-red-400' },
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="glass-card p-5 rounded-3xl">
                        <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
                        <p className="text-2xl font-bold text-foreground  font-sans">{stat.value}</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card rounded-3xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 ">
                    <h3 className="font-bold text-foreground  font-sans">All Subscribers</h3>
                    <div className="flex gap-2">
                        {(['all', 'pro', 'elite', 'free'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${filter === f ? 'bg-[#006970]/10 text-[#006970] border border-[#006970]/20' : 'text-slate-500 hover:text-slate-200'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-black/5 ">
                            {['User', 'Plan', 'Status', 'Since', 'Est. ARR'].map(h => (
                                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 px-6 py-3">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">Loading subscribers...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">No subscribers found matching filter.</td></tr>
                        ) : filtered.map(sub => (
                            <tr key={sub.id} className="border-b border-black/5  hover:bg-noble-surface/2 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-semibold text-foreground ">{sub.name}</p>
                                    <p className="text-xs text-slate-500">{sub.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${sub.plan === 'Pro' || sub.plan === 'Elite' ? 'bg-[#006970]/10 text-[#006970] border-[#006970]/20' : 'bg-black/5  text-slate-600  border-black/10 '}`}>{sub.plan}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1.5 text-xs font-bold ${sub.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {sub.status === 'active' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                        {sub.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500">{sub.since}</td>
                                <td className="px-6 py-4 text-sm font-bold text-foreground ">{sub.amount > 0 ? `$${sub.amount}` : '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

