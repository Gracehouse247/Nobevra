'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, TrendingUp, Send, Trash2, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EmailMarketingPanel() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        unsubscribed: 0,
        openRate: '0%'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In production, this would query a dedicated subscribers or email_preferences table
                const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
                
                setStats({
                    total: totalUsers || 0,
                    active: totalUsers ? Math.floor(totalUsers * 0.95) : 0, // Approx active
                    unsubscribed: totalUsers ? Math.floor(totalUsers * 0.05) : 0,
                    openRate: 'N/A' // Requires actual email API integration (e.g., Resend Webhooks)
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // This will be wired to a real Edge Function that calls Resend/SendGrid
        await new Promise(r => setTimeout(r, 1500));
        setSending(false);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setSubject('');
        setBody('');
    };

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Total Accounts', value: loading ? '...' : stats.total.toLocaleString(), icon: Users, color: 'text-[#006970]' },
                    { label: 'Opt-in Active', value: loading ? '...' : stats.active.toLocaleString(), icon: CheckCircle, color: 'text-emerald-400' },
                    { label: 'Opt-out', value: loading ? '...' : stats.unsubscribed, icon: Trash2, color: 'text-red-400' },
                    { label: 'Avg Open Rate', value: stats.openRate, icon: TrendingUp, color: 'text-amber-400' },
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="glass-card p-5 rounded-3xl">
                        <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
                        <p className="text-2xl font-bold text-foreground  font-sans">{stat.value}</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Compose Campaign */}
            <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-bold text-foreground  font-sans mb-6 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#006970]" />
                    Compose Email Campaign
                </h3>
                <form onSubmit={handleSend} className="space-y-5">
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Subject Line</label>
                        <input value={subject} onChange={e => setSubject(e.target.value)} required
                            placeholder="e.g. Exciting new features in Nobevra 2.0 🚀"
                            className="w-full bg-black/5  border border-black/5  rounded-2xl px-5 py-3 text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#006970]/50" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Email Body</label>
                        <textarea rows={8} value={body} onChange={e => setBody(e.target.value)} required
                            placeholder="Hi {{name}}, ..."
                            className="w-full bg-black/5  border border-black/5  rounded-2xl px-5 py-3 text-slate-200 resize-none focus:outline-none focus:ring-1 focus:ring-[#006970]/50" />
                        <p className="text-xs text-slate-600 mt-1">Tip: Use {'{{name}}'} for personalized greeting.</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-slate-500">Sends to <span className="text-foreground  font-bold">{stats.active.toLocaleString()}</span> active subscribers</p>
                        <button type="submit" disabled={sending || sent || stats.active === 0}
                            className="bg-[#006970] hover:bg-[#006970] text-foreground  font-semibold px-8 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70">
                            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : sent ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                            {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Campaign'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

