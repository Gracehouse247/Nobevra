'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    ArrowRight, CheckCircle2, User, Users, Store,
    ShoppingBag, Building2, ShieldCheck, Zap,
    Clock, DollarSign, Globe, Star, ChevronDown,
    Layers, Sparkles, Receipt, FileText, Lock
} from 'lucide-react';

const SOLUTIONS = [
    {
        id: 'freelancers',
        title: 'For Freelancers & Solopreneurs',
        badge: 'Solo Creators',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        headline: 'Spend Less Time Billing, More Time Creating',
        description: 'Generate client-ready invoices in 30 seconds, view read receipts in real time, and get paid directly to your bank account with zero platform commission.',
        icon: User,
        href: '/solutions/simple-invoicing-for-freelancers',
        stats: 'Get paid 3.8x faster',
        highlights: [
            '180+ pre-designed templates with instant PDF export',
            'Live client telemetry — know the second your invoice is opened',
            'Multi-currency payment links with 1-click checkout',
            'Lightweight CRM to track contact histories and notes',
        ],
        ctaText: 'Explore Freelancer Solution',
    },
    {
        id: 'agencies',
        title: 'For Digital & Creative Agencies',
        badge: 'Agencies & Studios',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        headline: 'Automate Retainers and Scale Client Operations',
        description: 'End manual month-end invoicing. Automate monthly recurring retainer billing, auto-retry declined client cards, and provide white-labeled client portals.',
        icon: Users,
        href: '/solutions/agency-billing-platform',
        stats: 'Save 14+ hours / month',
        highlights: [
            'Automated recurring billing with smart dunning sequences',
            'White-label client portal for invoice reviews & payments',
            'Integrated client contracts with legally binding e-signatures',
            'Multi-team seat permissions and role-based access',
        ],
        ctaText: 'Explore Agency Platform',
    },
    {
        id: 'small-business',
        title: 'For Small Businesses & SMBs',
        badge: 'Growing SMBs',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        headline: 'A Complete Financial Operations Stack',
        description: 'Ditch the spreadsheet maze. Track team expenses, manage client relations, analyze 90-day cash flow runway, and run compliant billing from one clean dashboard.',
        icon: Store,
        href: '/solutions/best-small-business-invoicing-software',
        stats: '99.2% on-time settlement',
        highlights: [
            'Real-time cash flow analytics and overdue aging buckets',
            'AI receipt scanning and automated expense categorization',
            'Multi-tax compliance (VAT, GST, Sales Tax, Reverse Charge)',
            'Inventory stock deduction synced directly to invoice lines',
        ],
        ctaText: 'Explore Small Business Suite',
    },
    {
        id: 'ecommerce',
        title: 'For E-Commerce & Retail Merchants',
        badge: 'Online Stores',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        headline: 'Automated Invoicing for Shopify & Online Stores',
        description: 'Automatically generate tax-compliant PDF receipts for every customer order. Sync effortlessly with your storefront to eliminate manual data entry.',
        icon: ShoppingBag,
        href: '/solutions/ecommerce-invoice-automation',
        stats: 'Instant PDF generation',
        highlights: [
            'Shopify & store webhook integration for zero-touch billing',
            'Automated VAT/GST calculation across international jurisdictions',
            'Branded email delivery with downloadable tax invoices',
            'Real-time product stock level tracking and catalog sync',
        ],
        ctaText: 'Explore E-Commerce Automation',
    },
    {
        id: 'enterprise',
        title: 'For Enterprise & High-Volume Orgs',
        badge: 'High-Volume Scale',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
        headline: 'Bank-Grade Infrastructure Built for Scale',
        description: 'Robust API pipelines, dedicated database instances, custom SLA guarantees, SOC2-ready security, and multi-entity consolidation for high-volume enterprises.',
        icon: Building2,
        href: '/solutions/enterprise-billing-platform',
        stats: '99.99% Guaranteed SLA',
        highlights: [
            'High-throughput RESTful billing APIs & webhook webhooks',
            'Dedicated isolated database instances & custom SSO/SAML',
            'Global multi-entity currency ledger consolidation',
            'Dedicated enterprise account manager & 24/7 priority support',
        ],
        ctaText: 'Explore Enterprise Billing',
    },
];

const FAQS = [
    {
        q: 'Can I switch between industry plans as my business expands?',
        a: 'Yes. Nobevra is designed as a unified Operating System. You can start on the free Explorer tier as an independent consultant and seamlessly unlock agency retainers, team seats, and multi-currency payouts as your team grows.',
    },
    {
        q: 'How does Nobevra compare to single-purpose invoicing tools?',
        a: 'Traditional invoicing apps only send static PDFs. Nobevra connects your invoices directly to a lightweight CRM, client portals, e-signature contracts, automated dunning, and expense tracking — giving you a single system for your entire revenue lifecycle.',
    },
    {
        q: 'Is there a free trial for teams and agencies?',
        a: 'Nobevra offers a permanent free Explorer plan with no credit card required. You can test all core features, send real invoices, and upgrade to Pulse or Elite when you need higher volumes and automation.',
    },
    {
        q: 'Are client portals white-labeled with my own branding?',
        a: 'Yes. On paid plans, your client portals reflect your company logo, brand color accents, and contact details. Clients see a completely premium, professional payment environment.',
    },
];

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-white font-inter text-near-black antialiased">
            <BreadcrumbSchema
                pageId="solutions"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Solutions' },
                ]}
            />

            {/* ══ 1. HERO SECTION ══ */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F0F9FF]/80 via-white to-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/5 blur-[140px] rounded-full -mr-48 -mt-48 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -ml-36 pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noble-blue/10 border border-noble-blue/20 mb-8">
                        <Sparkles className="w-4 h-4 text-noble-blue" />
                        <span className="text-xs md:text-sm font-black text-noble-blue uppercase tracking-widest">
                            Tailored For Every Stage of Business
                        </span>
                    </div>

                    <h1 className="text-[34px] sm:text-[46px] md:text-[58px] lg:text-[66px] font-black text-near-black leading-[1.06] tracking-tight mb-8 max-w-5xl mx-auto">
                        Invoicing and operations engineered for{' '}
                        <span className="text-noble-blue">your exact business model.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-near-black/60 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                        Whether you are a solo consultant billing hourly or an enterprise handling thousands of global transactions, Nobevra provides the dedicated workflows you need to get paid faster and operate with clarity.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-3 bg-[#166FBB] text-white px-9 py-4.5 rounded-[24px] font-extrabold text-base hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(22,111,187,0.28)]"
                        >
                            Start Free Account <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-near-black px-8 py-4.5 rounded-[24px] font-bold text-base hover:border-noble-blue hover:text-noble-blue transition-all"
                        >
                            Compare Plans & Pricing
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-16 text-xs text-slate-500 font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>No Credit Card Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-noble-blue" />
                            <span>Setup in 30 Seconds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-indigo-500" />
                            <span>135+ Currencies Supported</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. SOLUTIONS GRID ══ */}
            <section className="py-20 bg-[#F8FAFC] border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-near-black tracking-tight mb-4">
                            Choose your business profile
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 font-medium">
                            Select the solution crafted for how you work, deliver, and collect revenue.
                        </p>
                    </div>

                    <div className="space-y-8 max-w-5xl mx-auto">
                        {SOLUTIONS.map((solution, idx) => {
                            const IconComponent = solution.icon;
                            return (
                                <div
                                    key={solution.id}
                                    className="bg-white rounded-[32px] border border-slate-200 p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-noble-blue/30 transition-all duration-300 group"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                        <div className="lg:max-w-2xl space-y-4">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue">
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                                <span className={`text-xs font-black px-3 py-1 rounded-full border ${solution.badgeColor}`}>
                                                    {solution.badge}
                                                </span>
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                                    {solution.stats}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-black text-near-black tracking-tight">
                                                {solution.title}
                                            </h3>

                                            <p className="text-base text-slate-600 font-medium leading-relaxed">
                                                {solution.description}
                                            </p>

                                            <div className="grid sm:grid-cols-2 gap-3 pt-2">
                                                {solution.highlights.map((highlight, hIdx) => (
                                                    <div key={hIdx} className="flex items-start gap-2.5">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                        <span className="text-xs md:text-sm text-slate-700 font-medium">
                                                            {highlight}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:shrink-0 flex flex-col items-stretch lg:items-end justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                                            <Link
                                                href={solution.href}
                                                className="inline-flex items-center justify-center gap-2 bg-[#050B1A] text-white px-7 py-4 rounded-2xl font-black text-sm group-hover:bg-noble-blue transition-colors shadow-md text-center"
                                            >
                                                {solution.ctaText}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="text-xs text-slate-400 font-bold hover:text-slate-700 text-center transition-colors"
                                            >
                                                or start free now →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ 3. COMPARISON CALLOUT ══ */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="bg-[#050B1A] rounded-[40px] p-10 md:p-16 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-blue/20 blur-[140px] rounded-full pointer-events-none" />
                        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-noble-blue">
                                Unified System
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                One unified platform. <br className="hidden sm:block"/> No fragmented subscriptions.
                            </h2>
                            <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
                                Why pay separately for an invoicing tool, a CRM system, an expense tracker, an e-signature app, and a digital card generator? Nobevra combines them into one seamless Operating System.
                            </p>
                            <div className="pt-6 flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/features"
                                    className="bg-noble-blue hover:bg-noble-blue/90 text-white px-8 py-4 rounded-2xl font-extrabold text-sm transition-all shadow-lg inline-flex items-center gap-2"
                                >
                                    View All Platform Features <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm transition-all"
                                >
                                    View Pricing Matrix
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. FAQ SECTION ══ */}
            <section className="py-24 bg-[#F8FAFC] border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <h2 className="text-3xl md:text-4xl font-black text-near-black text-center tracking-tight mb-12">
                        Frequently asked questions
                    </h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <details
                                key={i}
                                className="group bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm transition-all"
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4">
                                    <span className="font-black text-slate-900 text-lg leading-snug">
                                        {faq.q}
                                    </span>
                                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. FINAL CTA ══ */}
            <section className="py-28 bg-white border-t border-slate-100 text-center">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <h2 className="text-3xl md:text-5xl font-black text-near-black mb-6 tracking-tight">
                        Ready to upgrade how your business operates?
                    </h2>
                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join modern operators who run their entire client lifecycle and billing engine on Nobevra.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-3 text-white bg-[#166FBB] px-12 py-5 text-lg font-extrabold rounded-[24px] hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)]"
                    >
                        Get Started Free <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
                        Permanent Free Plan · No Credit Card Needed · Cancel Anytime
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
