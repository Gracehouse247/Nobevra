'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { supabase } from '@/lib/supabase';
import {
    CreditCard, Download, CheckCircle2, ArrowRight, X,
    Headphones, ExternalLink, MoreVertical, Plus,
    FileText, Users, CalendarDays, Star, Trash2, AlertCircle, Sparkles, HardDrive
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/plans';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';
import { currencyService, ExchangeRates } from '@/lib/services/currencyService';
import Script from 'next/script';
import axios from 'axios';

/* ── Types ───────────────────────────────────────────────────────────────── */
interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    card_holder: string | null;
    is_default: boolean;
    created_at: string;
}

interface BillingRecord {
    id: string;
    created_at: string;
    plan: string;
    billing_period: string | null;
    amount: number;
    currency: string;
    status: string;
    transaction_ref: string | null;
    transaction_id: string | null;
}

/* ── Card brand icon ─────────────────────────────────────────────────────── */
function CardBrandIcon({ brand }: { brand: string }) {
    const b = brand?.toUpperCase();
    if (b === 'VISA') {
        return (
            <div className="w-12 h-8 bg-[#1A1F71] rounded-md flex items-center justify-center text-white font-black text-[13px] tracking-wider">
                VISA
            </div>
        );
    }
    if (b === 'MASTERCARD' || b === 'MC') {
        return (
            <div className="w-12 h-8 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90 -mr-3" />
                <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
        );
    }
    if (b === 'VERVE') {
        return (
            <div className="w-12 h-8 bg-[#00425F] rounded-md flex items-center justify-center text-white font-black text-[10px] tracking-wider">
                VERVE
            </div>
        );
    }
    return (
        <div className="w-12 h-8 bg-slate-100 dark:bg-[#112030] rounded-md flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
    );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function BillingPage() {
    const { user, userData } = useAuth();
    const { entitlements, canUse, getLimit, isLoading: entLoading } = useEntitlements();
    const { currencyCode, formatMoney } = useCurrency();

    const [history, setHistory] = useState<BillingRecord[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [invoiceCount, setInvoiceCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pmLoading, setPmLoading] = useState(true);
    const [addingCard, setAddingCard] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
    const [subscriptionExpiresAt, setSubscriptionExpiresAt] = useState<string | null>(null);

    const isExplorer = !userData?.plan || userData?.plan === 'explorer';
    const isPulse = userData?.plan === 'pulse';
    const isElite = userData?.plan === 'elite' || userData?.plan === 'admin';
    const isSuperAdmin = !!(userData?.isSuperAdmin);

    const currentPlanId = userData?.plan === 'admin' ? 'elite' : userData?.plan;
    const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === currentPlanId)
        || SUBSCRIPTION_PLANS[0]; // fallback to explorer

    // Derive billing period from the most recent billing history entry
    const latestRecord = history[0];
    const billingPeriod = latestRecord?.billing_period || 'monthly';
    const isYearly = billingPeriod === 'yearly';

    // Plan display name & price — read directly from the plan definition, never hardcode
    const planName = currentPlan.name;
    const planPrice = isYearly ? currentPlan.priceYearly : currentPlan.priceMonthly;
    const planPriceLabel = isYearly
        ? `$${currentPlan.priceYearly.toFixed(0)} / year`
        : `$${currentPlan.priceMonthly.toFixed(2)} / month`;

    // Status driven entirely from the real DB field via AuthContext
    const planStatus = userData?.subscriptionStatus === 'active'
        ? 'Active'
        : isExplorer
        ? 'Free'
        : userData?.subscriptionStatus === 'expired'
        ? 'Expired'
        : 'Inactive';

    // Localized plan price
    let localPlanPrice: string | null = null;
    if (currencyCode !== 'USD' && exchangeRates && planPrice > 0) {
        const local = currencyService.convert(planPrice, 'USD', currencyCode, exchangeRates);
        localPlanPrice = `≈ ${formatMoney(local, { decimals: 0 })}`;
    }

    // Next billing date — not applicable to super admins
    const expiresAt = userData?.subscription_expires_at || subscriptionExpiresAt;
    const nextBillingDate = expiresAt
        ? new Date(expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '—';

    const maxInvoices = getLimit('invoice.create') === null ? -1 : getLimit('invoice.create') ?? 0;
    const maxClients = getLimit('client.create') === null ? -1 : getLimit('client.create') ?? 0;
    const maxAi = getLimit('ai.voice') === null ? -1 : getLimit('ai.voice') ?? 0;
    const maxStorage = getLimit('storage.documents.mb') === null ? -1 : getLimit('storage.documents.mb') ?? 0;

    /* ── Fetch all data ────────────────────────────────────────────────────── */
    const fetchData = useCallback(async () => {
        if (!user) return;
        try {
            const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

            const { data: teamData } = await supabase.from('teams').select('id').eq('owner_id', user.id).single();
            const teamId = teamData?.id || user.id;

            const [historyRes, invoiceRes, clientRes, profileRes] = await Promise.all([
                supabase.from('billing_history').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
                supabase.from('invoices').select('id', { count: 'exact', head: true }).eq('team_id', teamId).gte('created_at', startOfMonth),
                supabase.from('clients').select('id', { count: 'exact', head: true }).eq('team_id', teamId),
                supabase.from('profiles').select('subscription_expires_at').eq('id', user.id).single(),
            ]);

            if (historyRes.data) setHistory(historyRes.data);
            setInvoiceCount(invoiceRes.count || 0);
            setClientCount(clientRes.count || 0);
            if (profileRes.data?.subscription_expires_at) {
                setSubscriptionExpiresAt(profileRes.data.subscription_expires_at);
            }
        } catch (err) {
            console.error('Error fetching billing data:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const fetchPaymentMethods = useCallback(async () => {
        if (!user) return;
        setPmLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/payment-methods`,
                { headers: { Authorization: `Bearer ${session?.access_token}` } }
            );
            setPaymentMethods(res.data.data || []);
        } catch (err: any) {
            console.warn('Edge function for payment methods failed (likely unavailable locally). Falling back to DB query:', err.message);
            try {
                const { data } = await supabase.from('payment_methods').select('*').eq('user_id', user.id);
                if (data) setPaymentMethods(data as any);
            } catch (dbErr) {
                console.warn('Fallback DB query also failed.');
            }
        } finally {
            setPmLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
        fetchPaymentMethods();
        currencyService.getExchangeRates('USD').then(r => r && setExchangeRates(r));
    }, [fetchData, fetchPaymentMethods]);

    /* ── Add card via Flutterwave pre-authorization ────────────────────────── */
    // Industry standard: trigger a $0.50 pre-auth to capture the card token.
    // Flutterwave will auto-release the hold within 7 days per their docs.
    const handleAddCard = async () => {
        if (!user) return toast.error('Please sign in');
        if (!(window as any).FlutterwaveCheckout) {
            return toast.error('Payment system loading... Please try again.');
        }

        setAddingCard(true);
        const shortId = Math.random().toString(36).substring(2, 10);
        const txRef = `addcard_${user.id}_${shortId}`;

        (window as any).FlutterwaveCheckout({
            public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || '',
            tx_ref: txRef,
            amount: 0.50,
            currency: 'USD',
            payment_options: 'card',
            customer: {
                email: user.email || '',
                name: userData?.name || 'Nobevra User',
            },
            customizations: {
                title: 'Save Payment Method',
                description: 'A $0.50 pre-authorization to verify your card. This hold will be released automatically.',
                logo: '/images/logo.png',
            },
            callback: async (response: any) => {
                setAddingCard(false);
                if (response.status === 'successful' || response.status === 'success') {
                    const savingToast = toast.loading('Saving your card...');
                    try {
                        const { data: { session } } = await supabase.auth.getSession();
                        const txId = response.transaction_id || response.id;
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/save-card-token`,
                            { transaction_id: txId, tx_ref: txRef },
                            { headers: { Authorization: `Bearer ${session?.access_token}` } }
                        );
                        toast.dismiss(savingToast);
                        toast.success('Payment method saved!');
                        fetchPaymentMethods();
                    } catch {
                        toast.dismiss(savingToast);
                        toast.error('Failed to save card. Please try again.');
                    }
                }
                if (response.close) response.close();
            },
            onclose: () => setAddingCard(false),
        });
    };

    /* ── Remove a payment method ──────────────────────────────────────────── */
    const handleRemoveCard = async (id: string) => {
        if (!window.confirm('Remove this payment method?')) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            await axios.delete(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/payment-methods`,
                {
                    data: { id },
                    headers: { Authorization: `Bearer ${session?.access_token}` },
                }
            );
            toast.success('Payment method removed');
            setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
        } catch {
            toast.error('Failed to remove card');
        } finally {
            setOpenMenuId(null);
        }
    };

    /* ── Set a card as default ────────────────────────────────────────────── */
    const handleSetDefault = async (id: string) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            await axios.patch(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/payment-methods`,
                { id },
                { headers: { Authorization: `Bearer ${session?.access_token}` } }
            );
            toast.success('Default payment method updated');
            setPaymentMethods(prev => prev.map(pm => ({ ...pm, is_default: pm.id === id })));
        } catch {
            toast.error('Failed to update default');
        } finally {
            setOpenMenuId(null);
        }
    };

    /* ── Cancel subscription ─────────────────────────────────────────────── */
    const handleCancelSubscription = async () => {
        if (!window.confirm('Are you sure you want to cancel? You will retain access until the end of your billing period.')) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;
            const res = await fetch('/api/subscription/cancel', {
                method: 'POST',
                headers: { Authorization: `Bearer ${session.access_token}` },
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || 'Subscription cancelled');
                window.location.reload();
            } else {
                toast.error(data.error || 'Failed to cancel subscription.');
            }
        } catch {
            toast.error('An error occurred. Please try again.');
        }
    };

    if (!user) return null;

    return (
        <div className="w-full space-y-8">
            <Script src="https://checkout.flutterwave.com/v3.js" strategy="lazyOnload" />

            {/* ── Page Header ────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-noble-border">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#166FBB]">
                    <CreditCard className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-[19px] font-black text-noble-text tracking-tight">Billing & Plans</h1>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                        Manage your subscription, payment methods, and billing history.
                    </p>
                </div>
            </div>

            {/* ── Super Admin: Lifetime Access Banner ─────────────────────── */}
            {isSuperAdmin && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-600/10 border border-amber-400/30 rounded-2xl p-6 flex items-center gap-5"
                >
                    <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                        <Star className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[11px] font-black uppercase tracking-widest text-amber-500 mb-0.5">Platform Founder</p>
                        <h2 className="text-[18px] font-black text-noble-text">Lifetime Access — No Billing Required</h2>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            As the platform super-admin, your account is permanently exempt from billing.
                            All features are unlocked indefinitely.
                        </p>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">
                            Super Admin
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Billing-Exempt Account</span>
                    </div>
                </motion.div>
            )}

            {/* ── Current Plan Card ───────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm overflow-hidden"
            >
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10">
                    {/* Left: Plan info */}
                    <div className="flex-1 space-y-5">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#166FBB] mb-1">Current Plan</p>
                            <div className="flex items-center gap-3">
                                <h2 className="text-[22px] font-black text-noble-text">{planName}</h2>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    planStatus === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                    : planStatus === 'Free' ? 'bg-slate-100 dark:bg-[#112030] text-slate-500 dark:text-slate-400 dark:text-slate-500 border border-noble-border'
                                    : 'bg-red-50 text-red-500 border border-red-100'
                                }`}>
                                    {planStatus}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-3">Your plan includes:</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                                {currentPlan.features.slice(0, 4).map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-[13px] text-slate-700 dark:text-slate-200 font-medium">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                        {/* Right: Price + CTA */}
                        <div className="md:w-52 flex flex-col justify-between items-start md:items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-noble-border pt-5 md:pt-0 md:pl-8">
                            <div className="md:text-right">
                                <div className="flex items-baseline gap-1 md:justify-end">
                                    <span className="text-[30px] font-black text-noble-text">
                                        {isSuperAdmin ? 'Lifetime' : isExplorer ? 'Free' : `$${isYearly ? currentPlan.priceYearly.toFixed(0) : currentPlan.priceMonthly.toFixed(2)}`}
                                    </span>
                                    {!isExplorer && !isSuperAdmin && (
                                        <span className="text-[12px] text-slate-400 dark:text-slate-500 font-bold">/{isYearly ? 'yr' : 'mo'}</span>
                                    )}
                                </div>
                                {localPlanPrice && !isSuperAdmin && (
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{localPlanPrice}</p>
                                )}
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                    {isSuperAdmin ? 'Billing-exempt account' : `Billed ${isYearly ? 'yearly' : 'monthly'}`}
                                </p>
                            </div>

                            {/* Only show Upgrade/Cancel for regular paid users */}
                            {!isSuperAdmin && (
                                <div className="flex flex-col gap-2 w-full md:w-auto">
                                    {!isElite && (
                                        <Link
                                            href="/upgrade"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm"
                                        >
                                            Upgrade Plan
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {(isPulse || isElite) && (
                                        <button
                                            onClick={handleCancelSubscription}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-[12px] font-bold transition-colors border border-red-100"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                            Cancel Plan
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

            {/* ── Usage Metrics ────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Invoices */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm p-5"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#166FBB]">
                            <FileText className="w-4 h-4" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500">Invoices This Month</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-[28px] font-black text-noble-text">{invoiceCount}</span>
                        {maxInvoices > 0 && <span className="text-[13px] text-slate-400 dark:text-slate-500 font-bold">/ {maxInvoices}</span>}
                    </div>
                    {maxInvoices > 0 && (
                        <>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#112030] rounded-full overflow-hidden mb-1">
                                <div
                                    className="h-full bg-[#166FBB] rounded-full transition-all"
                                    style={{ width: `${Math.min((invoiceCount / maxInvoices) * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-[11px] font-bold text-emerald-600">{Math.max(maxInvoices - invoiceCount, 0)} remaining</p>
                        </>
                    )}
                    {maxInvoices === -1 && <p className="text-[11px] font-bold text-emerald-600">Unlimited</p>}
                </motion.div>

                {/* Clients */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm p-5"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                            <Users className="w-4 h-4" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500">Active Clients</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-[28px] font-black text-noble-text">{clientCount}</span>
                        {maxClients > 0 && <span className="text-[13px] text-slate-400 dark:text-slate-500 font-bold">/ {maxClients}</span>}
                    </div>
                    {maxClients > 0 && (
                        <>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#112030] rounded-full overflow-hidden mb-1">
                                <div
                                    className="h-full bg-purple-500 rounded-full transition-all"
                                    style={{ width: `${Math.min((clientCount / maxClients) * 100, 100)}%` }}
                                />
                            </div>
                            <p className={`text-[11px] font-bold ${clientCount >= maxClients ? 'text-red-500' : 'text-amber-500'}`}>
                                {Math.max(maxClients - clientCount, 0)} remaining
                            </p>
                        </>
                    )}
                    {maxClients === -1 && <p className="text-[11px] font-bold text-emerald-600">Unlimited</p>}
                </motion.div>

                {/* Next Billing Date — hidden for super admins */}
                {!isSuperAdmin ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm p-5"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <CalendarDays className="w-4 h-4" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500">Next Billing Date</p>
                    </div>
                    <p className="text-[24px] font-black text-noble-text leading-tight">{nextBillingDate}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-2">Billed {isYearly ? 'yearly' : 'monthly'}</p>
                </motion.div>
                ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-amber-400/20 shadow-sm p-5"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <Star className="w-4 h-4" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-600 dark:text-slate-400">Billing Status</p>
                    </div>
                    <p className="text-[20px] font-black text-noble-text leading-tight">No Billing Cycle</p>
                    <p className="text-[11px] text-amber-500 font-bold mt-2">Founder — Lifetime Access</p>
                </motion.div>
                )}
            </div>

            {/* ── Payment Methods — hidden for super admins ────────────────── */}
            {!isSuperAdmin && <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm overflow-hidden"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-noble-border">
                    <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <h3 className="text-[14px] font-black text-noble-text">Payment Methods</h3>
                    </div>
                    <button
                        onClick={handleAddCard}
                        disabled={addingCard}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-noble-border hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] text-[12px] font-bold text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-60"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        {addingCard ? 'Loading...' : 'Add Payment Method'}
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {pmLoading ? (
                        <div className="px-6 py-8 text-center text-[13px] text-slate-400 dark:text-slate-500 font-medium">Loading payment methods...</div>
                    ) : paymentMethods.length === 0 ? (
                        <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
                            <div className="w-12 h-12 bg-slate-50 dark:bg-[#0D1B2E] rounded-full flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="text-[13px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500">No saved payment methods</p>
                            <p className="text-[12px] text-slate-400 dark:text-slate-500 max-w-xs">
                                Cards are automatically saved when you make a payment. You can also add one manually above.
                            </p>
                        </div>
                    ) : (
                        paymentMethods.map(pm => (
                            <div key={pm.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]/60 transition-colors">
                                <div className="flex items-center gap-4">
                                    <CardBrandIcon brand={pm.brand} />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-bold text-slate-800 dark:text-slate-100">
                                                {pm.brand} ending in {pm.last4}
                                            </span>
                                            {pm.is_default && (
                                                <span className="px-2 py-0.5 rounded-full bg-[#EEF5FB] text-[#166FBB] text-[9px] font-black uppercase tracking-wider border border-blue-100">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                                            Expires {pm.exp_month}/{pm.exp_year}
                                        </p>
                                    </div>
                                </div>

                                {/* Context menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === pm.id ? null : pm.id)}
                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] text-slate-400 dark:text-slate-500 transition-colors"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {openMenuId === pm.id && (
                                        <div className="absolute right-0 top-8 z-20 bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-lg py-1 min-w-[160px]">
                                            {!pm.is_default && (
                                                <button
                                                    onClick={() => handleSetDefault(pm.id)}
                                                    className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] w-full text-left transition-colors"
                                                >
                                                    <Star className="w-3.5 h-3.5 text-amber-400" />
                                                    Set as Default
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleRemoveCard(pm.id)}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-bold text-red-500 hover:bg-red-50 w-full text-left transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Remove Card
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>}

            {/* ── Payment History — hidden for super admins ────────────────── */}
            {!isSuperAdmin && <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm overflow-hidden"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-noble-border">
                    <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <h3 className="text-[14px] font-black text-noble-text">Payment History</h3>
                    </div>
                </div>

                {loading ? (
                    <div className="px-6 py-8 text-center text-[13px] text-slate-400 dark:text-slate-500">Loading history...</div>
                ) : history.length === 0 ? (
                    <div className="px-6 py-12 flex flex-col items-center gap-3 text-center">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-[#0D1B2E] rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-slate-300" />
                        </div>
                        <p className="text-[13px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500">No payment history</p>
                        <p className="text-[12px] text-slate-400 dark:text-slate-500">Your future payments and invoices will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead className="bg-slate-50 dark:bg-[#0D1B2E]/60 border-b border-slate-100 dark:border-noble-border">
                                <tr>
                                    {['Date', 'Description', 'Amount', 'Status', 'Receipt'].map(h => (
                                        <th key={h} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ${h === 'Receipt' ? 'text-right' : ''}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {history.map(tx => (
                                    <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]/50 transition-colors">
                                        <td className="px-6 py-4 text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                                            {new Date(tx.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-bold text-slate-800 dark:text-slate-100 capitalize">
                                            {tx.plan.charAt(0).toUpperCase() + tx.plan.slice(1)} Plan — {tx.billing_period === 'yearly' ? 'Yearly' : 'Monthly'}
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-bold text-noble-text">
                                            {tx.currency === 'NGN' ? '₦' : '$'}{Number(tx.amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => toast('Receipt generation coming soon', { icon: '🧾' })}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 dark:bg-[#0D1B2E] hover:bg-blue-50 text-slate-400 dark:text-slate-500 hover:text-[#166FBB] border border-noble-border transition-colors"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>}

            {/* ── Support CTA ─────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#166FBB] flex-shrink-0">
                        <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[14px] font-black text-noble-text">Need help with billing?</p>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                            Our support team is here to help with any billing or subscription questions.
                        </p>
                    </div>
                </div>
                <a
                    href="mailto:support@noblesworld.com.ng"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-noble-border hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] text-[12px] font-bold text-slate-700 dark:text-slate-200 rounded-xl transition-colors whitespace-nowrap flex-shrink-0"
                >
                    Contact Support
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </motion.div>
        </div>
    );
}
