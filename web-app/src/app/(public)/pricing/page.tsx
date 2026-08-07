'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Flame, ArrowRight } from 'lucide-react';
import { SUBSCRIPTION_PLANS, PAYG_PLAN, Plan, FEATURE_MATRIX } from '@/lib/plans';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PremiumBadge from '@/components/shared/PremiumBadge';

const schemaMarkup = [
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Is there completely free invoice software?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, many providers offer free invoicing software for small business free of charge. NobleInvoice offers an Explorer plan allowing up to 10 invoices per month at no cost." } },
            { "@type": "Question", "name": "How much does invoicing software cost per month?", "acceptedAnswer": { "@type": "Answer", "text": "Standard invoicing software costs anywhere from $9 to $50 per month depending on your business size and needed features. Our Pulse plan is $9.99/mo for unlimited CRM insights and premium templates." } },
            { "@type": "Question", "name": "How much does invoicing software cost in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "Invoicing software in Canada typically costs between CAD $12 and CAD $65 per month. NobleInvoice processes payments in over 135 currencies, meaning you pay flat global rates without localized markups." } },
            { "@type": "Question", "name": "Are there transaction fees for invoicing software?", "acceptedAnswer": { "@type": "Answer", "text": "While the software subscription is a flat rate, payment gateways (like Stripe or Flutterwave) charge a standard transaction fee, usually around 2.9% + 30¢ per paid invoice." } }
        ]
    }
];

function MatrixCell({ value }: { value: boolean | string }) {
    if (typeof value === 'string') {
        return <span className="text-[13px] font-bold text-near-black/70">{value}</span>;
    }
    return value ? (
        <div className="w-6 h-6 rounded-full bg-noble-blue/10 flex items-center justify-center mx-auto">
            <Check className="w-3.5 h-3.5 text-noble-blue stroke-[3]" />
        </div>
    ) : (
        <span className="text-near-black/20 text-lg">—</span>
    );
}

function MatrixRow({ feature, tooltip, explorer, pulse, elite }: { 
    feature: string; 
    tooltip?: string | null;
    explorer: boolean | string; 
    pulse: boolean | string; 
    elite: boolean | string; 
}) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors border-b border-slate-50">
            <td className="p-4 pl-8 text-[13px] font-bold text-near-black/80">
                <div className="flex items-center gap-2">
                    {feature}
                    {tooltip && (
                        <div className="group relative cursor-help">
                            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-black">?</div>
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[200px] bg-slate-800 text-white text-[11px] font-medium p-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 text-center leading-tight">
                                {tooltip}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800" />
                            </div>
                        </div>
                    )}
                </div>
            </td>
            <td className="p-4 text-center border-l border-slate-100"><MatrixCell value={explorer} /></td>
            <td className="p-4 text-center bg-noble-blue/[0.02] border-x border-noble-blue/5"><MatrixCell value={pulse} /></td>
            <td className="p-4 text-center"><MatrixCell value={elite} /></td>
        </tr>
    );
}

function PlanCard({ plan, billingCycle, user, userData, index }: { 
    plan: Plan, 
    billingCycle: 'monthly' | 'yearly', 
    user: any, 
    userData: any, 
    index: number 
}) {
    const [loading, setLoading] = useState(false);
    const redirectTimer = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        return () => {
            if (redirectTimer.current) clearTimeout(redirectTimer.current);
        };
    }, []);

    const isCurrent = userData?.plan === plan.id || (plan.id === 'explorer' && !userData?.plan);
    const isElite = plan.id === 'elite';
    const isPro = plan.id === 'pulse';
    const isFree = plan.id === 'explorer';

    const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    const earlyBird = billingCycle === 'yearly' && plan.earlyBirdYearlyPrice;
    const finalPrice = earlyBird ? plan.earlyBirdYearlyPrice! : price;

    const flwPlanId = billingCycle === 'monthly' 
        ? plan.flutterwavePlanIdMonthly 
        : (earlyBird ? plan.flutterwavePlanIdEarlyBird : plan.flutterwavePlanIdYearly);

    const router = useRouter();

    const handleSubscribe = async () => {
        if (isFree) return;
        if (!user) {
            toast.error('Please log in or create an account to subscribe.');
            router.push('/login');
            return;
        }
        if (!process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY) {
            return toast.error('Payment system missing configuration.');
        }

        const shortId = Math.random().toString(36).substring(2, 10);
        const txRef = `sub_${plan.id}_${billingCycle}_${user.id}_${shortId}`;

        if (typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
            (window as any).FlutterwaveCheckout({
                public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY,
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
                    logo: 'https://nobleinvoice.ai/images/logo.png',
                },
                callback: async (response: any) => {
                    if (response.status === 'successful') {
                        setLoading(true);
                        try {
                            const { data: { session } } = await supabase.auth.getSession();
                            const verifyRes = await axios.post(
                                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-and-upgrade-subscription`,
                                {
                                    transaction_id: response.transaction_id,
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
                                toast.success(`Welcome to NobleInvoice ${plan.name}!`);
                                redirectTimer.current = setTimeout(() => { router.push('/dashboard'); }, 1500);
                            } else {
                                toast.error('Payment verified but activation failed. Contact support.');
                            }
                        } catch (err: any) {
                            toast.error(err.response?.data?.error || 'Network error verifying payment.');
                        } finally {
                            setLoading(false);
                        }
                    } else {
                        // Payment failed or was closed by the user
                    }
                },
                onclose: () => setLoading(false),
            });
        } else {
            toast.error('Payment environment loading... Please wait or refresh.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`group relative py-10 px-6 rounded-3xl border transition-all duration-500 ${
                isPro 
                ? 'bg-white border-noble-blue/30 shadow-[0_40px_80px_rgba(22,111,187,0.1)] scale-[1.02] z-20' 
                : 'bg-white border-slate-100 shadow-lg hover:shadow-xl'
            }`}
        >
            {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-noble-blue text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-xl shadow-noble-blue/30">
                    Most Popular
                </div>
            )}

            <div className="space-y-2 mb-10">
                <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${
                        isPro ? 'text-noble-blue' : isElite ? 'text-noble-blue' : 'text-slate-900'
                    }`}>
                        {plan.name}
                    </h3>
                    {/* Plan tier badge — industry standard: shown prominently in plan card header */}
                    {isElite && <PremiumBadge tier="elite" className="scale-125 origin-right" />}
                    {isPro && <PremiumBadge tier="pro" className="scale-125 origin-right" />}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-slate-400">
                    {plan.tagline}
                </p>
            </div>

            <div className="mb-10">
                <div className="flex items-baseline gap-2">
                    {isFree ? (
                        <span className="text-5xl font-black tracking-tighter text-slate-900">
                            Free
                        </span>
                    ) : (
                        <>
                            <span className="text-5xl font-black tracking-tighter text-slate-900">
                                ${finalPrice}
                            </span>
                            <span className="font-black uppercase text-[10px] tracking-widest text-slate-400">
                                / {billingCycle === 'monthly' ? 'mo' : 'yr'}
                            </span>
                        </>
                    )}
                </div>
                {earlyBird && (
                    <div className="mt-3 flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-lg border border-yellow-500/20 text-[10px] font-black uppercase tracking-widest">
                            <Flame className="w-3 h-3" /> Launch Offer
                        </div>
                        <p className="text-[9px] font-bold text-near-black/40 italic">
                            *Special launch pricing. Normal: ${plan.priceYearly}/yr
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-4 mb-12 min-h-[320px]">
                {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            isPro || isElite ? 'bg-noble-blue/10 text-noble-blue' : 'bg-slate-50 text-slate-300'
                        }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[13px] font-medium leading-tight text-slate-900/70">{feature}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSubscribe}
                disabled={isCurrent || loading}
                className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-default ${
                    isCurrent 
                    ? 'bg-slate-50 text-slate-300 border border-slate-100' 
                    : isPro || isElite
                        ? 'bg-noble-blue text-white hover:bg-noble-blue/90 shadow-xl shadow-noble-blue/20'
                        : 'bg-white border border-slate-100 text-slate-900 hover:bg-slate-50 shadow-sm hover:-translate-y-1'
                }`}
            >
                {loading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : isCurrent ? 'Current Plan' : isFree ? 'Get Started Free' : `Upgrade to ${plan.name}`}
            </button>
        </motion.div>
    );
}

export default function PricingPage() {
    const { user, userData } = useAuth();
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [hours, setHours] = useState(3);
    const [rate, setRate] = useState(50);
    const [testimonial, setTestimonial] = useState({
        quote: "I used to spend my Sunday evenings organizing bills. I switched to NobleInvoice, set up automated recurring profiles, and bought my weekends back. The flat pricing means I never worry about hitting a 'client cap' mid-month.",
        author: "Ayasha Khan",
        role: "Marketing Director, NobleMart"
    });

    React.useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const { data } = await supabase.from('testimonials').select('*').limit(1).single();
                if (data && data.quote) {
                    setTestimonial({
                        quote: data.quote,
                        author: data.author_name || 'Happy Customer',
                        role: data.author_role || ''
                    });
                }
            } catch (e) {
                // Keep default
            }
        };
        fetchTestimonial();
    }, []);

    React.useEffect(() => {
        // Automatically set document title for SEO
        document.title = "How Much Does Invoicing Software Cost? (2026) | NobleInvoice";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Wondering how much does invoicing software cost? Find predictable flat-rate pricing, uncover hidden SaaS fees, and discover the best invoicing software for small business free.");
        }
    }, []);

    React.useEffect(() => {
        if (userData?.plan === 'elite') {
            router.push('/dashboard');
        }
    }, [userData?.plan, router]);

    if (userData?.plan === 'elite') {
        return null;
    }

    // Always show all 3 subscription plans on the public pricing page
    const displayedPlans = SUBSCRIPTION_PLANS;

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            {schemaMarkup.map((schema, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}

            {/* ── 1. HERO SECTION ──────────────────────────────────────────────────── */}
            <section className="relative pt-12 pb-16 overflow-hidden text-center px-4 md:px-16 max-w-[1430px] mx-auto z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Transparent, Flat-Rate Pricing
                </div>

                <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                    How Much Does Invoicing Software Cost? <br/>
                    <span className="text-noble-blue">(And Why Most Overcharge You)</span>
                </h1>

                <p className="text-lg md:text-xl text-near-black/60 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    You are here because you want a simple answer. The truth is, standard invoicing software costs anywhere from $9 to $50+ per month. But the sticker price isn't the real cost. 
                </p>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 pt-4 mb-16">
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'monthly' ? 'text-near-black' : 'text-near-black/30'}`}>Monthly</span>
                    <button 
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        className="w-16 h-8 bg-near-black/5 rounded-full border border-near-black/10 relative p-1 transition-all"
                    >
                        <motion.div 
                            className="w-6 h-6 bg-noble-blue rounded-full shadow-lg shadow-noble-blue/30"
                            animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'yearly' ? 'text-near-black' : 'text-near-black/30'}`}>
                        Yearly <span className="ml-2 px-2 py-0.5 bg-green-500/10 text-green-600 rounded-md text-[10px] font-black">Save 33%</span>
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-24 text-left max-w-6xl mx-auto">
                    {displayedPlans.map((plan, i) => (
                        <PlanCard 
                            key={plan.id} 
                            plan={plan as Plan} 
                            billingCycle={billingCycle} 
                            user={user} 
                            userData={userData} 
                            index={i} 
                        />
                    ))}
                </div>
            </section>

            {/* ── 1.5 COMPREHENSIVE FEATURE MATRIX ──────────────────────────────── */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-8">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/5 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-4 border border-noble-blue/10">
                            Full Plan Comparison
                        </div>
                        <h2 className="text-[28px] md:text-[42px] font-black tracking-tight leading-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Comprehensive Feature Matrix
                        </h2>
                        <p className="text-near-black/50 mt-3 font-medium max-w-xl mx-auto">Every feature, every plan — no asterisks, no small print.</p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 shadow-sm">
                                <tr>
                                    <th className="text-left p-5 pl-8 font-black text-near-black/50 text-[11px] uppercase tracking-widest w-[40%]">Feature</th>
                                    <th className="p-5 text-center font-black text-[11px] uppercase tracking-widest text-near-black/50 w-[20%] border-l border-slate-100">Explorer<br/><span className="font-bold text-near-black/40 text-[10px] normal-case tracking-normal">Free</span></th>
                                    <th className="p-5 text-center font-black text-[11px] uppercase tracking-widest text-noble-blue w-[20%] bg-noble-blue/5 border-x border-noble-blue/10">
                                        <span className="flex items-center justify-center gap-1.5 mb-1">
                                            Noble Pulse
                                            <PremiumBadge tier="pro" iconOnly className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="font-bold text-noble-blue/60 text-[10px] normal-case tracking-normal">$9.99/mo</span>
                                    </th>
                                    <th className="p-5 text-center font-black text-[11px] uppercase tracking-widest text-near-black/50 w-[20%]">
                                        <span className="flex items-center justify-center gap-1.5 mb-1">
                                            Noble Elite
                                            <PremiumBadge tier="elite" iconOnly className="w-3.5 h-3.5" />
                                        </span>
                                        <span className="font-bold text-near-black/40 text-[10px] normal-case tracking-normal">$24.99/mo</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {FEATURE_MATRIX.map((category, idx) => (
                                    <React.Fragment key={idx}>
                                        <tr className="bg-slate-50/80">
                                            <td colSpan={4} className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-near-black/60 sticky left-0">
                                                {category.category}
                                            </td>
                                        </tr>
                                        {category.rows.map((row, i) => (
                                            <MatrixRow 
                                                key={i} 
                                                feature={row.feature} 
                                                tooltip={row.tooltip}
                                                explorer={row.explorer} 
                                                pulse={row.pulse} 
                                                elite={row.elite} 
                                            />
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAYG Add-On Section */}
                    <div className="mt-16 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 text-center max-w-[900px] mx-auto shadow-sm">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-4 rounded-md">
                            Add-Ons
                        </div>
                        <h3 className="text-2xl font-black text-near-black mb-4 tracking-tight">Pay-As-You-Go Credit System</h3>
                        <p className="text-near-black/60 mb-8 max-w-lg mx-auto leading-relaxed">
                            Need a one-time unlock without committing to a subscription? Our Explorer plan users can buy individual credits as needed.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Premium Invoice Template", cost: "$1" },
                                { name: "Extra Client Slot", cost: "$1" },
                                { name: "QR Business Card", cost: "$1" },
                                { name: "Digital Product Passport", cost: "$1" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-noble-blue/30 transition-colors hover:shadow-md">
                                    <div className="text-[20px] font-black text-slate-800 mb-1">{item.cost}</div>
                                    <div className="text-[12px] font-bold text-slate-500 leading-tight">{item.name}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] font-medium text-slate-400 mt-8 italic">
                            * PAYG credits are available within your dashboard billing page.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 2. THE PROBLEM (SAAS PER-USER TRAP) ────────────────────────────── */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center">
                    <h2 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        The 5 Hidden Costs Most Invoicing Tools Won't Tell You About
                    </h2>
                    <p className="text-lg text-near-black/60 leading-relaxed mb-12">
                        If you check a "how much does invoicing software cost reddit" thread or search Google for "how much does invoicing software cost per month", you usually see plans starting around $15. But read the fine print. Competitors quietly punish you for growing.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-black mb-4">1. The "Per-Client" Trap</h3>
                            <p className="text-near-black/60 leading-relaxed">
                                Many popular platforms offer a cheap entry tier, but restrict you to billing only 5 or 50 active clients. Once you sign your 51st client, they force you into a plan that costs three times as much.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-black mb-4">2. The "Per-User" Penalty</h3>
                            <p className="text-near-black/60 leading-relaxed">
                                Need your accountant or a virtual assistant to log in? That will be an extra $10 per user, per month. It adds up fast. NobleInvoice Elite offers team access without individual seating fees.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. INFORMATION GAIN: THE ROI OF AUTOMATION ────────────────────── */}
            <section className="py-24 bg-[#0A192F] text-white">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                The ROI of Invoicing Automation: Time vs. Cost
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                Instead of asking "how much does invoicing software cost", ask "how much is manual invoicing costing me?"
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-electric-cyan shrink-0" />
                                    <p className="text-white/80"><strong>The Cost of Doing Nothing:</strong> The average freelancer spends 3 hours a week drafting invoices in Word or Excel. At $50/hour, that is $600 lost every month.</p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-electric-cyan shrink-0" />
                                    <p className="text-white/80"><strong>The NobleInvoice Shift:</strong> For $9.99/month, our AI generator creates invoices in seconds. You reclaim those hours immediately. It is an investment that pays a massive return.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20 blur-[1px]">
                                <Image src="/images/features/ai-invoice-generator-demo.png" alt="Dashboard" width={300} height={200} className="rounded-xl object-cover mix-blend-luminosity" />
                            </div>
                            <h3 className="text-xl font-black mb-6 text-center relative z-10">Calculate Your True Cost</h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white/80">Hours spent invoicing/week:</span>
                                        <span className="font-bold text-white">{hours} hrs</span>
                                    </div>
                                    <input type="range" min="1" max="20" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-electric-cyan" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white/80">Your hourly rate ($):</span>
                                        <span className="font-bold text-white">${rate}/hr</span>
                                    </div>
                                    <input type="range" min="20" max="150" step="5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-electric-cyan" />
                                </div>
                                <div className="pt-6 border-t border-white/10 space-y-4">
                                    <div className="flex justify-between items-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                        <span className="text-white/80 text-sm">Manual Cost (Monthly)</span>
                                        <span className="font-bold text-red-400 text-lg">~${hours * rate * 4}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-electric-cyan/10 p-4 rounded-xl border border-electric-cyan/20">
                                        <span className="text-white font-bold">NobleInvoice Pulse</span>
                                        <span className="font-black text-electric-cyan text-xl">$9.99<span className="text-sm text-electric-cyan/60">/mo</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. CASE STUDY & RESULTS ────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-[1000px] mx-auto px-4 md:px-16 text-center">
                    <h2 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black mb-16" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Real Results from Real Businesses
                    </h2>
                    
                    <div className="bg-[#F8FAFC] rounded-[40px] p-8 md:p-12 text-left relative overflow-hidden border border-slate-100">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-3xl shadow-lg border-4 border-white flex-shrink-0">
                                {testimonial.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl font-medium text-near-black leading-relaxed italic mb-6">
                                    "{testimonial.quote}"
                                </p>
                                <p className="font-black text-lg">{testimonial.author}</p>
                                {testimonial.role && <p className="text-near-black/50 font-bold text-sm uppercase tracking-wider mt-1">{testimonial.role}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. FAQ ─────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-[#F8FAFC] border-t border-slate-200">
                <div className="max-w-[800px] mx-auto px-4 md:px-16">
                    <h2 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-center mb-16" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Frequently Asked Questions
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-black text-lg mb-2">Is there completely free invoicing software?</h3>
                            <p className="text-near-black/60 leading-relaxed">Yes. If you search for "invoicing software for small business free", you will find our Explorer plan. It allows you to create up to 10 professional invoices per month at zero cost. You can even use our free invoice software download features to export them as PDFs.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-black text-lg mb-2">How much does invoicing software cost in Canada or the UK?</h3>
                            <p className="text-near-black/60 leading-relaxed">Prices are universally processed in USD, but because we integrate seamlessly with global gateways, you avoid hefty regional conversion markups. A $9.99/mo subscription roughly translates directly to your local currency rate without artificial inflation.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-black text-lg mb-2">Are there transaction fees for getting paid online?</h3>
                            <p className="text-near-black/60 leading-relaxed">We do not charge you to send an invoice. However, standard payment processors (like Flutterwave or Stripe) apply a small industry-standard processing fee (e.g., 2.9% + 30¢) when your client pays via credit card.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100">
                            <h3 className="font-black text-lg mb-2">We may not be right for you if...</h3>
                            <p className="text-near-black/60 leading-relaxed">If you are a massive enterprise requiring multi-departmental ERP integration, NobleInvoice might be too streamlined. We are built for speed and clarity, primarily serving freelancers, agencies, and small-to-medium teams.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. SOFT CTA ────────────────────────────────────────────────────── */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-[800px] mx-auto px-4 md:px-16">
                    <h2 className="text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Ready to automate your billing?
                    </h2>
                    <p className="text-lg text-near-black/60 mb-10">
                        Stop guessing about software costs. Start with our estimate and invoice software free tier, or jump into Pulse to scale without restrictions.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-3 text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                        style={{ backgroundColor: '#166FBB' }}
                    >
                        Start Free Trial <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* ── 7. LONG FORM SEO GUIDE ─────────────────────────────────────────── */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-[800px] mx-auto px-4 md:px-16 text-left">
                    <h2 className="text-[30px] md:text-[40px] leading-[1.05] tracking-tight font-black mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        The Complete Guide to Invoicing Software Costs (2026)
                    </h2>
                    
                    <p className="text-lg text-near-black/70 leading-relaxed mb-6">
                        Choosing the right billing platform is critical. Recent industry studies indicate that <strong>72% of freelancers struggle with late payments</strong>, often because their invoicing tools lack automated reminders or force clients into clunky payment gateways.
                    </p>

                    <h3 className="text-2xl font-black mb-4 mt-12 text-near-black">1. What Are Transaction Fees?</h3>
                    <p className="text-lg text-near-black/70 leading-relaxed mb-6">
                        Even if you use a "free" tier, getting paid online comes with hidden costs. Payment gateways like Stripe, PayPal, or Flutterwave typically charge an industry-standard fee—often around <strong>2.9% + 30¢ per transaction</strong>. Some invoicing platforms secretly add an extra 1% markup on top of this. NobleInvoice never marks up your transaction fees. You only pay the direct gateway cost.
                    </p>
                    
                    <div className="my-8 flex justify-center">
                        <Link href="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-near-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                            Get Started with 0% Markup <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <h3 className="text-2xl font-black mb-4 mt-12 text-near-black">2. Accounting Software vs. Invoicing Software</h3>
                    <p className="text-lg text-near-black/70 leading-relaxed mb-6">
                        Do you need full accounting software (like QuickBooks) or just dedicated invoicing software? Full accounting tools often cost $30-$50/month and are incredibly complex, designed for CPAs. If your primary goal is to send beautiful bills, track <Link href="/features/expense-tracking" className="text-noble-blue hover:underline">expenses</Link>, and get paid fast, a dedicated tool is far more cost-effective.
                    </p>

                    <h3 className="text-2xl font-black mb-4 mt-12 text-near-black">3. Why "Freemium" Models Force You to Upgrade</h3>
                    <p className="text-lg text-near-black/70 leading-relaxed mb-6">
                        The biggest trap in the industry is the 5-client limit. You sign up for free, but the moment your business grows to 6 clients, your account is locked until you pay $20/month. We believe in transparency. Use our <Link href="/features/ai-invoice-generator" className="text-noble-blue hover:underline">AI Invoice Generator</Link> to save time, and know exactly what you'll pay as you scale.
                    </p>
                </div>
            </section>

            {/* STICKY MOBILE CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div>
                    <p className="text-[10px] font-black text-near-black/50 uppercase tracking-widest">Start Today</p>
                    <p className="font-black text-near-black text-lg">Flat $9.99<span className="text-sm font-bold text-near-black/50">/mo</span></p>
                </div>
                <Link
                    href="/register"
                    className="bg-noble-blue text-white px-6 py-3 rounded-xl font-black text-sm tracking-widest uppercase shadow-lg shadow-noble-blue/20"
                >
                    Upgrade
                </Link>
            </div>

        </div>
    );
}
