'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Check, Sparkles, Brain, Rocket, Shield, 
    Clock, Crown, Lock, Globe, Fingerprint
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SUBSCRIPTION_PLANS, PAYG_PLAN, Plan, FEATURE_MATRIX } from '@/lib/plans';
import { useEntitlements } from '@/context/EntitlementsContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import { currencyService, ExchangeRates } from '@/lib/services/currencyService';
import Image from 'next/image';
import Script from 'next/script';

/* ─────────────────────────────────────────────────────────────────────────────
   PlanCard Component
───────────────────────────────────────────────────────────────────────────── */
function PlanCard({ 
    plan, 
    billingCycle, 
    user, 
    userData, 
    index,
    exchangeRates
}: { 
    plan: Plan, 
    billingCycle: 'monthly' | 'yearly', 
    user: any, 
    userData: any, 
    index: number,
    exchangeRates: ExchangeRates | null
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { currencyCode, formatMoney } = useCurrency();

    const isCurrent = userData?.plan === plan.id || (plan.id === 'explorer' && (userData?.plan === 'explorer' || !userData?.plan));
    const isElite = plan.id === 'elite';
    const isPro = plan.id === 'pulse'; // Pulse plan
    const isPayg = plan.id === 'payg';

    const price = isPayg ? 1 : (billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly);
    const earlyBird = !isPayg && billingCycle === 'yearly' && plan.earlyBirdYearlyPrice;
    const finalPrice = isPayg ? 1 : (earlyBird ? plan.earlyBirdYearlyPrice! : (plan.priceMonthly === 0 ? 0 : price));

    let suffix = `/month`;
    if (billingCycle === 'yearly' && !isPayg) suffix = `/year`;
    if (isPayg) suffix = `/one-time`;

    // Calculate localized equivalent using exchange rates relative to USD
    let localPriceElement = null;
    if (currencyCode !== 'USD' && exchangeRates) {
        const localAmount = currencyService.convert(finalPrice, 'USD', currencyCode, exchangeRates);
        if (localAmount > 0) {
            localPriceElement = (
                <span className="text-[10px] font-bold text-slate-400 mt-1 block">
                    ≈ {formatMoney(localAmount, { decimals: 0 })} {currencyCode}
                </span>
            );
        }
    }

    // Resolve Flutterwave Payment Plan ID based on selected cycle and tier
    const flwPlanId = isPayg 
        ? undefined 
        : (billingCycle === 'monthly' 
            ? plan.flutterwavePlanIdMonthly 
            : (earlyBird ? plan.flutterwavePlanIdEarlyBird : plan.flutterwavePlanIdYearly));

    const shortId = Math.random().toString(36).substring(2, 10);
    const txRef = `sub_${plan.id}_${billingCycle}_${user?.id || 'user'}_${shortId}`;

    const fwConfig = {
        public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || '',
        tx_ref: txRef,
        amount: finalPrice,
        currency: 'USD',
        payment_plan: flwPlanId,
        payment_options: 'card',
        customer: {
            email: user?.email || '',
            name: userData?.name || user?.displayName || 'Noble Agent',
            phone_number: '',
        },
        customizations: {
            title: `NobleInvoice ${plan.name}`,
            description: plan.tagline || 'Subscription Upgrade',
            logo: '/images/logo.png',
        },
    };

    const handleUpgrade = async () => {
        if (plan.id === 'explorer') return;
        if (!user) return toast.error('Please sign in to upgrade');

        if (!fwConfig.public_key) {
            return toast.error('Payment system missing configuration.');
        }

        if (typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
            (window as any).FlutterwaveCheckout({
                ...fwConfig,
                callback: async (response: any) => {
                    const txId = response.transaction_id || response.id;
                    if (response.status === 'successful' || response.status === 'success') {
                        setLoading(true);
                        const verifyingToast = toast.loading('Verifying payment... Please wait.');
                        try {
                            const { data: { session } } = await supabase.auth.getSession();
                            const verifyRes = await axios.post(
                                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-and-upgrade-subscription`,
                                {
                                    transaction_id: txId,
                                    tx_ref: response.tx_ref,
                                    user_id: user.id,
                                    tier: plan.id,
                                    expected_amount: finalPrice
                                },
                                {
                                    headers: { Authorization: `Bearer ${session?.access_token}` }
                                }
                            );

                            if (verifyRes.data.status === 'upgraded') {
                                toast.dismiss(verifyingToast);
                                toast.success(`Welcome to NobleInvoice ${plan.name}!`);

                                // ── Industry-standard: auto-save card token after payment ──
                                // Flutterwave returns data.card.token in the verify response.
                                // We silently save it so the user's card appears in Billing & Plans.
                                try {
                                    await axios.post(
                                        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/save-card-token`,
                                        { transaction_id: txId, tx_ref: response.tx_ref },
                                        { headers: { Authorization: `Bearer ${session?.access_token}` } }
                                    );
                                } catch {
                                    // Non-critical: card saving failure should not block the upgrade success
                                }

                                setTimeout(() => { router.push('/dashboard'); }, 2000);
                            } else {
                                toast.dismiss(verifyingToast);
                                toast.error('Verification failed: ' + (verifyRes.data.error || 'System error.'));
                            }
                        } catch (error: any) {
                            toast.dismiss(verifyingToast);
                            toast.error(error.response?.data?.error || 'Network error during verification.');
                        } finally {
                            setLoading(false);
                            if (response.close) response.close();
                        }
                    } else {
                        if (response.close) response.close();
                    }
                },
                onclose: function () {
                   setLoading(false);
                }
            });
        } else {
            toast.error("Payment environment loading... Please wait or refresh the page.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                isPro 
                ? 'border-blue-100 ring-2 ring-[#166FBB]/20' 
                : isElite
                ? 'border-amber-200 shadow-amber-900/5'
                : 'border-slate-200'
            }`}
        >
            {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#EEF5FB] text-[#166FBB] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                    Most Popular
                </div>
            )}

            {/* Header section */}
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h3 className={`text-[15px] font-black uppercase tracking-wide ${
                        isElite ? 'text-amber-500' : isPro ? 'text-[#166FBB]' : 'text-slate-600'
                    }`}>
                        {plan.name}
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-2 leading-relaxed max-w-[200px]">
                        {isPayg ? '1 Premium Template + 1 Client Slot + 1 QR Card + 1 DPP' : (isElite ? 'Advanced tools for professionals and growing teams.' : 'Everything you need to get started and grow your business.')}
                    </p>
                </div>
                {isElite && <Crown className="w-6 h-6 text-amber-500 stroke-[2.5]" />}
            </div>

            {/* Pricing */}
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-[34px] font-black text-slate-900 tracking-tight">
                        ${finalPrice}
                    </span>
                    <span className="text-slate-400 font-bold text-[11px] tracking-wide">
                        {suffix}
                    </span>
                </div>
                {localPriceElement}
            </div>

            {/* Features */}
            <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isElite ? 'bg-amber-100 text-amber-500' : 'bg-blue-50 text-[#166FBB]'
                        }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 leading-tight">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            {/* PAYG helper text */}
            {isPayg && (
                <div className="mb-8 p-4 bg-slate-50 rounded-xl">
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed text-center">
                        Unlock these features immediately as a one-time purchase.
                    </p>
                </div>
            )}

            {/* CTA */}
            <button
                disabled={isCurrent || loading}
                onClick={handleUpgrade}
                className={`w-full py-3.5 rounded-xl text-[12px] font-bold transition-all flex justify-center items-center h-[46px] ${
                    isCurrent 
                    ? 'bg-slate-100 text-slate-400 cursor-default' 
                    : isElite 
                        ? 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-md hover:shadow-lg' 
                        : isPro 
                            ? 'bg-white border-2 border-[#166FBB] text-[#166FBB] hover:bg-blue-50' 
                            : 'bg-white border border-slate-300 text-[#166FBB] hover:bg-slate-50 shadow-sm'
                }`}
            >
                {loading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : isCurrent ? (
                    'Active Plan'
                ) : isPayg ? (
                    'Choose Pay-As-You-Go'
                ) : (
                    `Upgrade to ${plan.name.replace('Noble ', '')}`
                )}
            </button>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main UpgradePage
───────────────────────────────────────────────────────────────────────────── */
export default function UpgradePage() {
    const { user, userData } = useAuth();
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);

    const { canUse, getLimit, isLoading } = useEntitlements();

    // Fetch exchange rates for USD once
    useEffect(() => {
        currencyService.getExchangeRates('USD').then(rates => {
            if (rates) setExchangeRates(rates);
        });
    }, []);

    // Redirect elite users who have api.access
    useEffect(() => {
        if (!isLoading && canUse('api.access')) {
            router.push('/dashboard');
        }
    }, [isLoading, canUse, router]);

    if (isLoading) return null;
    if (canUse('api.access')) return null;

    // Calculate usage nudges (e.g. if close to limits)
    const invoiceLimit = getLimit('invoice.create');
    // For a real usage integration we would also fetch team_usage here. 
    // This provides the structural capability.

    const displayedPlans = SUBSCRIPTION_PLANS.filter(p => {
        if (p.id === 'explorer') return false;
        // Pulse users shouldn't see pulse upgrade
        if (userData?.plan === 'pulse' && p.id === 'pulse') return false; 
        return true;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-inter">
            <Script src="https://checkout.flutterwave.com/v3.js" strategy="lazyOnload" />
            
            <div className="max-w-6xl mx-auto px-6 pt-12">
                
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/80 rounded-full border border-blue-100 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-[#166FBB]" />
                        <span className="text-[10px] font-black text-[#166FBB] uppercase tracking-widest">Evolve Your Business</span>
                    </div>

                    {/* Exact 19px heading requirement */}
                    <h1 className="text-[19px] font-black text-slate-900 mb-3 tracking-tight">
                        Upgrade your plan, unlock more possibilities
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium max-w-xl leading-relaxed">
                        Join thousands of businesses using NobleInvoice to save time, get paid faster, and grow with confidence.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-8 flex items-center justify-center">
                        <div className="inline-flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
                            <button 
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full text-[12px] font-bold transition-all ${
                                    billingCycle === 'monthly' ? 'bg-[#166FBB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Monthly
                            </button>
                            <button 
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-full text-[12px] font-bold transition-all flex items-center gap-2 ${
                                    billingCycle === 'yearly' ? 'bg-[#166FBB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Yearly
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                                    billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                    Save 33%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Plan Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
                    {displayedPlans.map((plan, i) => (
                        <PlanCard 
                            key={plan.id} 
                            plan={plan as Plan} 
                            billingCycle={billingCycle} 
                            user={user} 
                            userData={userData} 
                            index={i} 
                            exchangeRates={exchangeRates}
                        />
                    ))}
                </div>

                {/* Compare plan features */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h3 className="text-[22px] font-black text-slate-900 mb-6">Compare plan features</h3>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Features</th>
                                        <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Explorer</th>
                                        <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-[#166FBB] text-center">Noble Pulse</th>
                                        <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-amber-500 text-center">Noble Elite</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[13px] font-bold text-slate-600">
                                    {FEATURE_MATRIX.map((category, catIdx) => (
                                        <React.Fragment key={catIdx}>
                                            <tr className="bg-slate-50/80">
                                                <td colSpan={4} className="py-3 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    {category.category}
                                                </td>
                                            </tr>
                                            {category.rows.map((row, idx) => (
                                                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                                    <td className="py-4 px-6 font-bold text-slate-700">
                                                        <div className="flex items-center gap-2">
                                                            {row.feature}
                                                            {row.tooltip && (
                                                                <div className="w-3 h-3 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[8px]" title={row.tooltip}>?</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-center text-slate-400 font-semibold">
                                                        {typeof row.explorer === 'boolean' ? (row.explorer ? <Check className="w-4 h-4 mx-auto text-slate-400" /> : '—') : row.explorer}
                                                    </td>
                                                    <td className="py-4 px-6 text-center text-[#166FBB] font-semibold">
                                                        {typeof row.pulse === 'boolean' ? (row.pulse ? <Check className="w-4 h-4 mx-auto text-[#166FBB]" /> : '—') : row.pulse}
                                                    </td>
                                                    <td className="py-4 px-6 text-center text-amber-500 font-semibold">
                                                        {typeof row.elite === 'boolean' ? (row.elite ? <Check className="w-4 h-4 mx-auto text-amber-500" /> : '—') : row.elite}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* All plans include */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h3 className="text-[16px] font-black text-slate-900 mb-6">All plans include</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Shield, title: 'Secure payments\nvia Flutterwave' },
                            { icon: Clock, title: 'Cancel anytime\nwith 1-click' },
                            { icon: Brain, title: 'AI trained\non your data' },
                            { icon: Rocket, title: 'Instant\nprovisioning' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <div className="p-2.5 bg-blue-50 rounded-xl text-[#166FBB] flex-shrink-0">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <p className="text-[12px] font-bold text-slate-700 leading-snug whitespace-pre-line">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Trust section */}
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    {/* Avatars */}
                    <div className="flex items-center gap-4 mb-6 md:mb-0">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                    <Image src={`https://i.pravatar.cc/150?u=u${i}`} alt="user" width={40} height={40} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-[12px] font-black text-slate-900 leading-tight">Join 25,000+ businesses</p>
                            <p className="text-[11px] font-medium text-slate-500">from startups to enterprises trust NobleInvoice.</p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex items-center flex-col sm:flex-row gap-4">
                        <span className="text-[11px] font-bold text-slate-400">Trusted by businesses worldwide</span>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg">
                                <Shield className="w-3.5 h-3.5 text-[#166FBB]" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-700 leading-none">SOC 2</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase leading-none">Compliant</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg">
                                <Lock className="w-3.5 h-3.5 text-[#166FBB]" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-700 leading-none">SSL</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase leading-none">Encrypted</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg">
                                <Fingerprint className="w-3.5 h-3.5 text-[#166FBB]" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-700 leading-none">GDPR</p>
                                    <p className="text-[7px] font-bold text-slate-400 uppercase leading-none">Compliant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
