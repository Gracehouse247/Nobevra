'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    ShieldCheck, ArrowRight, CheckCircle2, LayoutDashboard,
    Lock, CreditCard, FileText, Download, Sparkles,
    HelpCircle, Globe, Smartphone, Palette, Eye,
    Clock, TrendingUp, Receipt, ChevronRight, Star,
    Building2, Zap, BadgeCheck, Users, Key, Layers
} from 'lucide-react';

// ─── Interactive Portal Preview State Tabs ─────────────────────────────────
const PREVIEW_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoice', label: 'Invoice View', icon: FileText },
    { id: 'payment', label: '1-Click Pay', icon: CreditCard },
    { id: 'esign', label: 'E-Sign', icon: BadgeCheck },
] as const;

type PreviewTab = typeof PREVIEW_TABS[number]['id'];

const PREVIEW_CONTENT: Record<PreviewTab, { title: string; desc: string; stat: string; statLabel: string; color: string; items: string[] }> = {
    dashboard: {
        title: 'Instant Balance Snapshot',
        desc: 'Clients land on a clean dashboard showing total outstanding, total paid, and the full invoice ledger — no login, no password, no friction.',
        stat: '0',
        statLabel: 'Passwords Required',
        color: 'text-noble-blue',
        items: [
            'Magic-link access — just click, portal opens instantly',
            'Total outstanding & paid balance cards',
            'Last 10 statements with status indicators',
            'Mobile-optimised — works on any device in 30 seconds',
        ],
    },
    invoice: {
        title: 'Full Invoice Line-Item View',
        desc: 'Every invoice line item, tax breakdown, discount applied, and due date is visible in a professional, branded layout your client can download as a tax-compliant PDF.',
        stat: '100%',
        statLabel: 'Tax-Compliant PDFs',
        color: 'text-emerald-600',
        items: [
            'Subtotal, tax rate, discounts, and total clearly displayed',
            'Payment status badge (Paid / Pending / Overdue)',
            'Download tax-compliant PDF receipt with 1 click',
            'Bank transfer details shown inline for manual payments',
        ],
    },
    payment: {
        title: '1-Click Online Checkout',
        desc: 'Clients can settle single or multiple outstanding invoices with credit card, bank transfer, or Apple Pay — in one tap without leaving the portal.',
        stat: '4.2x',
        statLabel: 'Faster Than Email Chasing',
        color: 'text-amber-600',
        items: [
            'Select one or batch-pay multiple invoices at once',
            'Credit card, bank transfer, and mobile money rails',
            'Automatic payment receipt issued on settlement',
            'Multi-currency conversion at live market rates',
        ],
    },
    esign: {
        title: 'Contract E-Signature Inside the Portal',
        desc: 'Clients review service agreements, NDAs, and project scopes directly in the portal. They draw or type a signature and receive a tamper-evident SHA-256 audit trail.',
        stat: 'SHA-256',
        statLabel: 'Tamper-Evident Audit Trail',
        color: 'text-violet-600',
        items: [
            'Review contracts before or alongside the first invoice',
            'Draw, type, or upload a legally binding signature',
            'Instant download of signed agreement with audit trail',
            'Timestamp and IP address logged for dispute prevention',
        ],
    },
};

// ─── Reviews ───────────────────────────────────────────────────────────────
const REVIEWS = [
    {
        name: 'Celestine Nzubbychukwu',
        role: 'Founder, MyStaff Consulting Limited',
        image: '/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png',
        quote: 'Our clients stopped emailing "can you resend invoice 104?" the day we switched on Nobevra portals. Everything is in one branded dashboard and they pay the same day they view it.',
    },
    {
        name: 'Barr Emma Duruigbo',
        role: 'Founder, Ducex Solicitors Ltd',
        image: '/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png',
        quote: 'The white-label portal is indistinguishable from our own internal software. Clients sign retainer agreements and pay the deposit invoice all in one session — what used to take 4 days now takes 11 minutes.',
    },
    {
        name: 'Ayasha Khan',
        role: 'Marketing Director, Noblemart Marketplace',
        image: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
        quote: "We needed a secure client portal that worked across time zones. Nobevra's portal handles multi-currency settlements beautifully. Our overseas clients pay in their local currency without any friction.",
    },
];

// ─── FAQs ──────────────────────────────────────────────────────────────────
const FAQS = [
    {
        q: 'What is a client portal in invoicing software?',
        a: 'A client portal is a dedicated, self-service web interface where your clients can view all active and paid invoices, download tax receipts, e-sign contracts, update payment details, and settle balances without sending back-and-forth emails.',
    },
    {
        q: 'Can I customize the client portal with my own business branding?',
        a: 'Yes. Nobevra allows full white-label customization: upload your company logo, set your primary brand colors, and deliver a seamless customer invoice portal experience that reinforces your brand identity across every client touchpoint.',
    },
    {
        q: 'Do clients need to create a password to access their portal?',
        a: 'No. Clients access their branded client portal via secure, encrypted magic links sent directly to their email address. Zero-friction access with bank-grade security — no password creation required.',
    },
    {
        q: 'Can clients sign contracts inside the secure client portal?',
        a: 'Yes. Nobevra integrates e-signatures directly into the portal. Clients can review service agreements, draw or type their signature, and instantly download tamper-evident SHA-256 audit trails without leaving the portal.',
    },
    {
        q: 'How many clients can use the portal simultaneously?',
        a: 'There is no cap on simultaneous client portal sessions. Each client receives their own unique, encrypted magic link that gives them access to only their own ledger and documents — fully isolated from all other clients.',
    },
    {
        q: 'Is the Nobevra client portal compatible with mobile phones?',
        a: 'Yes. The client billing portal is fully responsive. Busy executives can view invoices, approve contracts, and settle balances on their smartphones in under 30 seconds — no app download required.',
    },
];

export default function ClientPortalSoftwarePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<PreviewTab>('dashboard');

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Nobevra Client Portal Software',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '1140',
            bestRating: '5',
            worstRating: '1',
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: [
            'White-label client portal',
            'Secure magic-link access',
            'Online invoice payments',
            'E-signature contracts',
            'PDF receipt downloads',
            'Multi-currency support',
        ],
        description:
            'White-label client billing portal and customer self-service hub for invoices, payments, and contracts.',
    };

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Set Up a Client Portal for Your Business',
        description:
            'Launch a fully branded client portal so clients can view invoices, pay balances, and sign contracts without sending emails.',
        totalTime: 'PT5M',
        step: [
            {
                '@type': 'HowToStep',
                name: 'Create Your Free Nobevra Account',
                text: 'Sign up for a free Nobevra account. No credit card required. Your white-label client portal is activated the moment your account is created.',
                url: 'https://nobevra.noblesworld.com.ng/register',
            },
            {
                '@type': 'HowToStep',
                name: 'Upload Your Brand Logo and Set Colors',
                text: 'Go to Portal Settings, upload your business logo, and set your primary brand hex color. Your clients will see your brand — not Nobevra.',
            },
            {
                '@type': 'HowToStep',
                name: 'Add Your First Client and Issue an Invoice',
                text: 'Create a client record, issue their first invoice, and Nobevra automatically generates a unique encrypted magic link for that client\'s portal.',
            },
            {
                '@type': 'HowToStep',
                name: 'Client Clicks Link and Pays in 1 Click',
                text: 'Your client receives an email with their portal link. They click, see all their invoices, and settle outstanding balances with credit card, bank transfer, or mobile money — no password required.',
            },
        ],
    };

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-28 overflow-x-hidden">
            <BreadcrumbSchema
                pageId="client-portal-software"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Client Portal Software' },
                ]}
            />
            <script id="faq-schema-portal" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script id="software-schema-portal" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script id="howto-schema-portal" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* ── BREADCRUMB NAV ── */}
            <nav aria-label="Breadcrumb" className="max-w-[1430px] mx-auto px-4 md:px-16 pt-6 pb-2">
                <ol className="flex items-center gap-2 text-xs text-near-black/50 font-medium">
                    <li><Link href="/" className="hover:text-noble-blue transition-colors">Home</Link></li>
                    <li aria-hidden="true" className="text-near-black/30">/</li>
                    <li className="text-noble-blue font-bold" aria-current="page">Client Portal Software</li>
                </ol>
            </nav>

            {/* ── 1. HERO ── */}
            <section className="relative flex items-center pt-12 pb-24 md:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                    {/* Left copy */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" aria-hidden="true" />
                            White-Label Client Hub
                        </div>

                        <h1 className="font-inter text-near-black mb-6 text-[28px] xs:text-[32px] sm:text-[40px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-tight font-black break-words">
                            The <span className="text-noble-blue">Client Portal Software</span> That Makes Clients Pay Faster.
                        </h1>

                        <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Give every client a secure, branded self-service dashboard to view invoices, settle outstanding balances in 1 click, and e-sign contracts — without a single follow-up email from your team.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/register"
                                className="text-white px-8 sm:px-10 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 text-center"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Launch Client Portal Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/crm"
                                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all text-center"
                            >
                                <ShieldCheck className="w-5 h-5" />
                                Explore CRM System
                            </Link>
                        </div>

                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                            No credit card required · Free plan available · 100% White-Label Branding
                        </p>

                        {/* Trust micro-badges */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">256-Bit Encryption</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Key className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-near-black/70">Magic-Link Access</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-emerald-600" />
                                <span className="text-xs font-bold text-near-black/70">30+ Currencies</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Smartphone className="w-5 h-5 text-amber-500" />
                                <span className="text-xs font-bold text-near-black/70">Mobile-First</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Phone Mockup Hero Image */}
                    <div className="relative flex justify-center items-end lg:items-center">
                        {/* Ambient glow behind phone */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/15 to-electric-cyan/15 blur-3xl rounded-full opacity-70 pointer-events-none" />
                        {/* Constrained phone wrapper — hard-capped height */}
                        <div className="relative mx-auto w-full max-w-[240px] lg:max-w-[280px]">
                            <Image
                                src="/images/client-portal-hero.png"
                                alt="Nobevra Client Portal Software — Secure Invoice Payment Portal on Mobile"
                                width={640}
                                height={1280}
                                priority
                                className="w-full h-auto max-h-[480px] object-contain drop-shadow-[0_30px_50px_rgba(22,111,187,0.22)] hover:scale-[1.02] transition-transform duration-500"
                            />
                            {/* Floating "Secure Payment" badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-2.5 whitespace-nowrap">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                <span className="text-[11px] font-black text-near-black uppercase tracking-widest">Portal Secured · 256-Bit Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. TRUST & SECURITY STRIP ── */}
            <section className="bg-near-black py-5">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-white/70">
                        {[
                            { icon: Lock, label: 'Bank-Grade 256-Bit SSL' },
                            { icon: ShieldCheck, label: 'PCI-DSS Level 1 Compliant' },
                            { icon: Eye, label: 'Zero-Knowledge Magic Links' },
                            { icon: BadgeCheck, label: 'SHA-256 Tamper-Evident Audit Trails' },
                            { icon: Globe, label: '30+ Settlement Currencies' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                                <Icon className="w-4 h-4 text-noble-blue/80" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. AUTHORITY STAT STRIP ── */}
            <section className="bg-white border-b border-slate-100 py-12">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { stat: '2×', label: 'Faster Invoice Approvals', sub: 'vs email PDF attachments' },
                            { stat: '0', label: 'Passwords Required', sub: 'magic-link encrypted access' },
                            { stat: '4.9★', label: 'Average Rating', sub: 'across 1,140+ verified accounts' },
                            { stat: '100%', label: 'White-Label Branding', sub: 'your logo, your colors' },
                        ].map(({ stat, label, sub }) => (
                            <div key={label} className="space-y-1.5">
                                <div className="text-4xl lg:text-5xl font-black text-noble-blue tracking-tight">{stat}</div>
                                <div className="text-sm font-bold text-near-black">{label}</div>
                                <div className="text-[11px] text-near-black/40 font-medium">{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. INTERACTIVE PORTAL PREVIEW ── */}
            <section className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Layers className="w-4 h-4" />
                            Live Portal Preview
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            A Secure Client Portal Your Clients Will Actually Use.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            Click each tab to explore exactly what your clients see inside their branded client dashboard software — no demo call required.
                        </p>
                    </div>

                    {/* Tab switcher */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {PREVIEW_TABS.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-noble-blue text-white shadow-lg shadow-noble-blue/25'
                                            : 'bg-white border border-slate-200 text-near-black/60 hover:border-noble-blue hover:text-noble-blue'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab content */}
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        {/* Left: Description */}
                        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-10 shadow-sm">
                            <div className={`text-5xl font-black mb-2 ${PREVIEW_CONTENT[activeTab].color}`}>
                                {PREVIEW_CONTENT[activeTab].stat}
                            </div>
                            <div className="text-xs font-bold text-near-black/40 uppercase tracking-widest mb-6">
                                {PREVIEW_CONTENT[activeTab].statLabel}
                            </div>
                            <h3 className="text-2xl font-black text-near-black mb-3">
                                {PREVIEW_CONTENT[activeTab].title}
                            </h3>
                            <p className="text-near-black/60 leading-relaxed mb-8 text-sm md:text-base">
                                {PREVIEW_CONTENT[activeTab].desc}
                            </p>
                            <ul className="space-y-3">
                                {PREVIEW_CONTENT[activeTab].items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-near-black/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Visual mock card */}
                        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
                            {/* Mock portal header */}
                            <div className="bg-noble-blue px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                        <Building2 className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white font-bold text-sm">YourBrand Client Portal</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Secure</span>
                                </div>
                            </div>

                            {/* Mock dashboard content */}
                            <div className="p-6 bg-slate-50/80">
                                <div className="grid grid-cols-3 gap-3 mb-5">
                                    {[
                                        { label: 'Outstanding', value: '₦240,000', color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
                                        { label: 'Paid Total', value: '₦890,000', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
                                        { label: 'Invoices', value: '14', color: 'text-noble-blue', bg: 'bg-blue-50', icon: Receipt },
                                    ].map(({ label, value, color, bg, icon: Icon }) => (
                                        <div key={label} className={`${bg} rounded-2xl p-3 text-center border border-white`}>
                                            <Icon className={`w-4 h-4 ${color} mx-auto mb-1.5`} />
                                            <div className={`text-base font-black ${color}`}>{value}</div>
                                            <div className="text-[9px] font-bold text-near-black/40 uppercase tracking-wider">{label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mock invoice rows */}
                                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                                    {[
                                        { num: 'INV-0042', date: 'Aug 24, 2026', amount: '₦120,000', status: 'Pending', color: 'text-amber-600 bg-amber-50' },
                                        { num: 'INV-0041', date: 'Aug 10, 2026', amount: '₦60,000', status: 'Paid', color: 'text-emerald-600 bg-emerald-50' },
                                        { num: 'INV-0040', date: 'Jul 28, 2026', amount: '₦60,000', status: 'Paid', color: 'text-emerald-600 bg-emerald-50' },
                                    ].map((inv, i) => (
                                        <div key={i} className={`flex items-center justify-between px-4 py-3 text-xs ${i < 2 ? 'border-b border-slate-50' : ''}`}>
                                            <div>
                                                <div className="font-black text-near-black">{inv.num}</div>
                                                <div className="text-near-black/40">{inv.date}</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-near-black">{inv.amount}</span>
                                                <span className={`px-2 py-0.5 rounded-lg font-black text-[9px] uppercase tracking-wider ${inv.color}`}>{inv.status}</span>
                                                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pay Now button */}
                                <button className="mt-4 w-full py-3 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all" style={{ backgroundColor: '#166FBB' }}>
                                    <CreditCard className="w-4 h-4" />
                                    Pay Outstanding Balance
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. HOW TO SET UP IN 4 STEPS ── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Zap className="w-4 h-4" />
                            Setup in 5 Minutes
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            How to Set Up a White-Label Client Portal for Your Business.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            From account creation to your first client paying online — the entire process takes under 5 minutes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: '01',
                                title: 'Create Your Free Account',
                                desc: 'Sign up for Nobevra at no cost. No credit card required. Your secure client portal is activated the instant your account is created.',
                                color: 'bg-noble-blue/10 text-noble-blue',
                            },
                            {
                                step: '02',
                                title: 'Upload Logo & Brand Colors',
                                desc: 'Set your company logo and primary hex color in Portal Settings. Your clients will see your brand — not Nobevra\'s.',
                                color: 'bg-violet-100 text-violet-600',
                            },
                            {
                                step: '03',
                                title: 'Add Client & Issue Invoice',
                                desc: 'Create a client record, issue their invoice, and Nobevra automatically generates a unique encrypted magic link for that client\'s billing portal.',
                                color: 'bg-amber-100 text-amber-600',
                            },
                            {
                                step: '04',
                                title: 'Client Clicks & Pays',
                                desc: 'Your client receives the portal link, sees their full ledger, and settles outstanding invoices with 1 click. No passwords. No confusion.',
                                color: 'bg-emerald-100 text-emerald-600',
                            },
                        ].map(({ step, title, desc, color }) => (
                            <div key={step} className="relative bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-noble-blue/30 transition-all group">
                                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-xl font-black mb-6`}>
                                    {step}
                                </div>
                                <h3 className="text-lg font-bold text-near-black mb-3 group-hover:text-noble-blue transition-colors">{title}</h3>
                                <p className="text-sm text-near-black/60 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. FEATURE GRID ── */}
            <section className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
                            Portal Features
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-near-black">
                            A Modern Self-Service Client Billing Portal Your Customers Will Love.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60">
                            Eliminate &ldquo;Can you resend invoice #104?&rdquo; emails forever. Your clients get a fully branded, always-available online billing hub.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Palette,
                                color: 'bg-blue-100/80 text-noble-blue',
                                title: 'White-Label Brand Styling',
                                desc: 'Upload your logo, define custom theme colors, and deliver a customer invoice portal experience that looks like your own proprietary enterprise software.',
                            },
                            {
                                icon: CreditCard,
                                color: 'bg-emerald-100/80 text-emerald-600',
                                title: '1-Click Outstanding Balance Payoff',
                                desc: 'Clients select single or multiple outstanding invoices and settle their total balance with credit card, bank transfer, or Apple Pay in seconds.',
                            },
                            {
                                icon: Download,
                                color: 'bg-purple-100/80 text-purple-600',
                                title: 'On-Demand Tax-Compliant PDF Receipts',
                                desc: 'Corporate accounting departments download tax-compliant PDF receipts and historical statements anytime for year-end audits — no email request needed.',
                            },
                            {
                                icon: FileText,
                                color: 'bg-amber-100/80 text-amber-600',
                                title: 'Integrated Contract E-Signature',
                                desc: 'Clients review NDAs, retainer agreements, and project scopes inside their portal. They sign with SHA-256 tamper-evident audit trails — no DocuSign account required.',
                            },
                            {
                                icon: Smartphone,
                                color: 'bg-sky-100/80 text-sky-600',
                                title: 'Mobile-First Secure Client Portal',
                                desc: 'Fully optimized for smartphones. Busy executives approve quotes and pay invoices on their phones in under 30 seconds — no app download required.',
                            },
                            {
                                icon: Globe,
                                color: 'bg-rose-100/80 text-rose-600',
                                title: 'Multi-Currency International Billing',
                                desc: 'Overseas clients see invoices converted to their local currency at live market rates. The portal handles USD, EUR, GBP, NGN, CAD, AUD, and 24 more currencies.',
                            },
                        ].map(({ icon: Icon, color, title, desc }) => (
                            <div key={title} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/20 transition-all space-y-4 group">
                                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">{title}</h3>
                                <p className="text-near-black/70 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. WHY NOBEVRA vs ALTERNATIVES ── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <TrendingUp className="w-4 h-4" />
                            Why Nobevra
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            Why Operators Choose Nobevra Over Standalone Client Portal Platforms.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            Most client portal software lives in a silo — disconnected from your invoices, contracts, and CRM. Nobevra connects all three natively.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
                        <table className="w-full min-w-[600px] text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-5 text-left font-black text-near-black text-base">Capability</th>
                                    <th className="px-6 py-5 text-center font-black text-noble-blue">Nobevra</th>
                                    <th className="px-6 py-5 text-center font-bold text-near-black/50">Copilot / SuiteDash</th>
                                    <th className="px-6 py-5 text-center font-bold text-near-black/50">Static PDF + Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    ['100% White-Label Client Portal Branding', true, true, false],
                                    ['Magic-Link Access (Zero Password Required)', true, false, false],
                                    ['Native Invoice Issuance + Portal in One Platform', true, false, false],
                                    ['E-Signature Contracts Inside the Portal', true, true, false],
                                    ['Multi-Currency Live Conversion (30+ Currencies)', true, false, false],
                                    ['Connected CRM & Lifetime Client Revenue Ledger', true, false, false],
                                    ['SHA-256 Tamper-Evident Audit Trails', true, false, false],
                                    ['Permanently Free Explorer Plan', true, false, false],
                                ].map(([feature, nobevra, alt, email], i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                        <td className="px-6 py-4 font-medium text-near-black">{feature as string}</td>
                                        <td className="px-6 py-4 text-center">{nobevra ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <span className="text-slate-300 text-lg">—</span>}</td>
                                        <td className="px-6 py-4 text-center">{alt ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-slate-300 text-lg">—</span>}</td>
                                        <td className="px-6 py-4 text-center">{email ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-slate-300 text-lg">—</span>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 8. VERIFIED REVIEWS ── */}
            <section className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Users className="w-4 h-4" />
                            Verified Client Experiences
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-near-black mb-4">
                            Real Businesses. Real Portals. Real Results.
                        </h2>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                        </div>
                        <p className="text-sm text-near-black/40 font-bold uppercase tracking-widest">4.9 / 5 from 1,140+ verified businesses</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {REVIEWS.map(({ name, role, image, quote }) => (
                            <div key={name} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center gap-1 mb-5">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                                </div>
                                <p className="text-sm text-near-black/70 leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <Image
                                        src={image}
                                        alt={name}
                                        width={44}
                                        height={44}
                                        className="rounded-full object-cover border-2 border-noble-blue/20"
                                    />
                                    <div>
                                        <div className="text-sm font-black text-near-black">{name}</div>
                                        <div className="text-[11px] text-near-black/40 font-medium">{role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 9. FAQ ── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <div className="text-center space-y-3 mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest">
                            <HelpCircle className="w-3.5 h-3.5 text-noble-blue" /> FAQ
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-near-black">
                            Client Portal Questions, Answered.
                        </h2>
                        <p className="text-near-black/50 text-base">Everything your team and clients need to know before going live.</p>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm"
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left font-bold text-near-black hover:text-noble-blue transition-colors"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    aria-expanded={openFaq === idx}
                                >
                                    <span className="pr-4">{faq.q}</span>
                                    <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform text-noble-blue/60 ${openFaq === idx ? 'rotate-90' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6">
                                        <p className="text-near-black/70 text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 10. BOTTOM CTA ── */}
            <section className="py-20 md:py-28 bg-near-black text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-noble-blue/20 to-transparent pointer-events-none" />
                <div className="relative max-w-3xl mx-auto px-4 md:px-8 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-bold text-xs uppercase tracking-widest mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Free Forever Plan Available
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black leading-tight">
                        Give Your Clients an Enterprise-Grade Portal Experience.
                    </h2>
                    <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        Build credibility, eliminate billing friction, and get invoices approved twice as fast with the Nobevra branded client portal software.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-[#166FBB] text-white px-8 py-4 rounded-2xl font-extrabold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
                        >
                            Launch Client Portal Free <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/client-contracts"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Client Contracts Suite
                        </Link>
                    </div>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest pt-4">
                        No credit card · No setup fee · White-label ready in 5 minutes
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}