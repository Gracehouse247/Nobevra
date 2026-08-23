'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PLANS = [
    {
        name: 'Starter',
        tagline: 'For freelancers & solo founders starting out',
        priceMonthly: '$0',
        priceYearly: '$0',
        period: 'forever',
        highlight: false,
        features: [
            'Up to 50 invoices per month',
            '5 active client profiles',
            '10 invoice templates',
            '100 MB document storage',
            'Instant payment link generation',
            'Flutterwave payment integration',
            'Expense tracking & receipt vault',
            'Standard email support',
        ],
        cta: 'Start Free',
        ctaLink: '/register',
    },
    {
        name: 'Noble Pulse',
        tagline: 'For growing businesses needing automation',
        priceMonthly: '$9.99',
        priceYearly: '$8.25',
        period: 'month',
        billedYearlyText: '$99.00 billed annually',
        highlight: true,
        features: [
            'Unlimited invoices & clients',
            '180+ premium invoice templates',
            'Automated recurring billing & auto-reminders',
            'Client portal & live view telemetry',
            'Inventory & product catalog management',
            'Digital business cards (NFC & QR)',
            'Gemini AI receipt scanning & reports',
            'Priority customer support',
        ],
        cta: 'Upgrade to Pulse',
        ctaLink: '/pricing',
    },
    {
        name: 'Noble Elite',
        tagline: 'For scaling enterprises & high-volume teams',
        priceMonthly: '$24.99',
        priceYearly: '$20.00',
        period: 'month',
        billedYearlyText: '$240.00 billed annually',
        highlight: false,
        features: [
            'Everything in Pulse, plus:',
            'Multi-user team workspaces with RLS',
            'Unlimited estimates & custom contracts',
            'Advanced tax & compliance reporting',
            '15 AI Voice + Receipt actions / month',
            'API access & webhook integrations',
            'Custom domain & white-label branding',
            'Dedicated account manager',
        ],
        cta: 'Explore Elite',
        ctaLink: '/pricing',
    },
];

export default function PricingSnapshotSection() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section
            id="pricing"
            className="py-24 md:py-32 relative"
            aria-label="Nobevra Pricing and Plans"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">credit_card</span>
                        Transparent Global Pricing
                    </div>

                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4">
                        Simple Plans That{' '}
                        <span className="text-noble-blue italic">Scale With You.</span>
                    </h2>

                    <p className="text-base md:text-lg text-near-black/50 leading-relaxed mb-8">
                        Flat, transparent pricing in USD for global teams. No hidden setup fees, no forced commitments, and cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                                billingCycle === 'monthly'
                                    ? 'bg-noble-surface text-near-black shadow-sm'
                                    : 'text-near-black/50 hover:text-near-black'
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                                billingCycle === 'yearly'
                                    ? 'bg-noble-blue text-white shadow-sm'
                                    : 'text-near-black/50 hover:text-near-black'
                            }`}
                        >
                            Annual Billing
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-black uppercase">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {PLANS.map((plan, idx) => {
                        const displayPrice = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`rounded-[32px] p-8 flex flex-col justify-between transition-all duration-500 ${
                                    plan.highlight
                                        ? 'bg-noble-blue text-white shadow-2xl shadow-noble-blue/30 scale-105 relative'
                                        : 'bg-noble-surface border border-slate-100 shadow-sm hover:shadow-xl'
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric-cyan text-near-black font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    <h3 className={`font-black text-2xl mb-2 ${plan.highlight ? 'text-white' : 'text-near-black'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-xs mb-6 ${plan.highlight ? 'text-white/70' : 'text-near-black/50'}`}>
                                        {plan.tagline}
                                    </p>

                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-near-black'}`}>
                                            {displayPrice}
                                        </span>
                                        <span className={`text-xs font-bold ${plan.highlight ? 'text-white/60' : 'text-near-black/40'}`}>
                                            /{plan.period}
                                        </span>
                                    </div>

                                    {billingCycle === 'yearly' && plan.billedYearlyText && (
                                        <p className={`text-[10px] font-bold mb-6 ${plan.highlight ? 'text-white/70' : 'text-near-black/40'}`}>
                                            {plan.billedYearlyText}
                                        </p>
                                    )}

                                    {billingCycle === 'monthly' && (
                                        <div className="h-4 mb-4" />
                                    )}

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feat) => (
                                            <li key={feat} className="flex items-center gap-3 text-xs font-medium">
                                                <span className={`material-symbols-outlined text-sm ${plan.highlight ? 'text-electric-cyan' : 'text-noble-blue'}`} aria-hidden="true">
                                                    check_circle
                                                </span>
                                                <span className={plan.highlight ? 'text-white/90' : 'text-near-black/70'}>
                                                    {feat}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={plan.ctaLink}
                                    className={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                                        plan.highlight
                                            ? 'bg-white text-noble-blue hover:bg-slate-50'
                                            : 'bg-slate-900 text-white hover:bg-near-black'
                                    }`}
                                >
                                    {plan.cta}
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 text-xs font-black text-noble-blue hover:underline uppercase tracking-wider"
                    >
                        Compare all features across plans on the full pricing page
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_right_alt</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
