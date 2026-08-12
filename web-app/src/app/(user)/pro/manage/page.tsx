'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Rocket, RefreshCcw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function SubscriptionManagePage() {
    const { user, userData, refreshUserData } = useAuth();
    const [loading, setLoading] = useState(false);

    // Derived plan with legacy fallback
    const plan = userData?.plan || ((userData?.subscriptionStatus as any) === 'elite' ? 'elite' : (userData?.subscriptionStatus as any) === 'pro' ? 'pro' : 'explorer');
    const isPremium = ['pro', 'elite', 'admin'].includes(plan);
    const planName = plan === 'elite' ? 'Noble Elite' : plan === 'pulse' ? 'Noble Pulse' : 'Explorer (Free)';

    const handleRestore = async () => {
        setLoading(true);
        try {
            // Trigger a manual poll to backend/Flutterwave
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/restore`, { email: user?.email });
            await refreshUserData();
            alert('Purchase state synchronized successfully.');
        } catch (error) {
            console.error(error);
            alert('Failed to synchronize status. Please contact support.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-10 pb-24 md:pb-20">
            <div>
                <h1 className="text-3xl font-black text-foreground  tracking-tight">Subscription Management</h1>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-2">View active plans, restore purchases, and manage billing methods.</p>
            </div>

            <div className={`p-8 md:p-12 rounded-[2.5rem] border relative overflow-hidden ${
                isPremium ? 'bg-[#006970]/5 border-[#006970]/20' : 'bg-noble-surface dark:bg-noble-card/5 border-white/10'
            }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 border border-white/5">
                            <CreditCard className="w-3 h-3" /> Current Plan
                        </div>
                        <h2 className={`text-4xl font-black uppercase tracking-tight ${isPremium ? 'text-[#006970]' : 'text-slate-300'}`}>
                            {planName}
                        </h2>
                        {isPremium && (
                            <p className="text-sm font-medium text-emerald-400 mt-2">Status: Active & Synchronized</p>
                        )}
                    </div>

                    {!isPremium ? (
                        <Link 
                            href="/upgrade"
                            className="px-8 py-4 bg-[#006970] hover:bg-[#006970] text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            <Rocket className="w-4 h-4" /> Upgrade Now
                        </Link>
                    ) : (
                        <button className="px-6 py-3 bg-noble-surface dark:bg-noble-card/10 hover:bg-red-500/20 hover:text-red-400 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 hover:border-red-500/20">
                            Cancel Subscription
                        </button>
                    )}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm">
                        If you recently paid but your dashboard still shows free, force a manual sync with the billing server.
                    </p>
                    <button 
                        onClick={handleRestore}
                        disabled={loading}
                        className="px-6 py-3 bg-black/20 hover:bg-black/40 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-white/5 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                        Restore Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}


