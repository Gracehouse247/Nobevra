'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Users, Briefcase, Lock, ShieldCheck,
    ArrowRight, FolderOpen, Search, CheckCircle2,
    Star, Zap, TrendingUp, BarChart3, FileText,
    ChevronRight, Upload, Download, Filter,
    BadgeCheck, Eye, Clock, Layers, HelpCircle,
    Building2, Sparkles, Mail, Phone
} from 'lucide-react';

// ─── Reviews ──────────────────────────────────────────────────────────────────
const REVIEWS = [
    {
        name: 'Celestine Nzubbychukwu',
        role: 'Founder, MyStaff Consulting Limited',
        image: '/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png',
        quote: 'Before Nobevra CRM, our client records were scattered across three spreadsheets and a WhatsApp group. Now every client profile, invoice, and contract is in one place — and we can see exactly who owes what at a glance.',
    },
    {
        name: 'Barr Emma Duruigbo',
        role: 'Founder, Ducex Solicitors Ltd',
        image: '/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png',
        quote: 'We manage retainer clients across multiple practice areas. The VIP Elite tier lets us flag our highest-value clients and generate their monthly retainer invoices in two clicks from inside the CRM. That alone saves us 4 hours every billing cycle.',
    },
    {
        name: 'Ayasha Khan',
        role: 'Marketing Director, Noblemart Marketplace',
        image: '/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png',
        quote: "The client score system is genuinely useful. It tells us which client profiles are complete, who to follow up with, and which leads haven't been converted yet — without needing a separate sales CRM tool.",
    },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
    {
        q: 'What is a client management CRM for small business?',
        a: 'A client management CRM (Customer Relationship Management) system is a centralised platform to store customer contact details, track deal stages, monitor invoice payment history, and manage communications — replacing fragmented spreadsheets and lost email threads.',
    },
    {
        q: 'How is Nobevra CRM different from HubSpot or Salesforce?',
        a: 'HubSpot and Salesforce are built for large enterprise sales teams with complex multi-stage pipelines and per-user subscription fees ($50–$400+/user/month). Nobevra CRM is purpose-built for service businesses and freelancers: it connects directly to your invoice engine, contract signing, and client portal in one unified platform — with a permanently free plan.',
    },
    {
        q: 'Can I import my existing client list into Nobevra CRM?',
        a: 'Yes. Nobevra supports full CSV bulk import for client records. You can map columns from any spreadsheet export and import your entire client database in under 2 minutes. Full data export is also available anytime for backups or portability.',
    },
    {
        q: 'Does the CRM connect directly to invoicing?',
        a: 'Yes — this is Nobevra\'s core differentiator. From any client record, you can create and send an invoice in 1 click. Paid invoices automatically update the client\'s lifetime revenue total in the CRM ledger without any manual reconciliation.',
    },
    {
        q: 'What is the VIP Elite client tier?',
        a: 'VIP Elite is a special client status you assign to your highest-value accounts. VIP clients are visually highlighted in your ledger, filtered separately for priority billing, and can be configured to receive priority portal access and retainer automation.',
    },
    {
        q: 'Is there a free CRM plan available?',
        a: 'Yes. The Nobevra Explorer plan is permanently free and includes full client management, invoice-connected CRM, lead tracking, and CSV import/export with zero monthly subscription fees.',
    },
];

export default function CRMPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        name: 'Nobevra Client Management CRM',
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
            'Invoice-connected CRM',
            'VIP Elite client tiers',
            'Lead pipeline tracking',
            'CSV bulk import & export',
            'Client score profiling',
            'Contract e-sign integration',
            'White-label client portal',
            'Lifetime revenue ledger',
        ],
        description:
            'Lightweight client management CRM software for small businesses that connects client management directly to invoicing, contracts, and payment history.',
    };

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Set Up Client Management CRM for Your Small Business with Nobevra',
        description: 'Add your first client, connect them to an invoice, and track your full relationship history in under 3 minutes.',
        totalTime: 'PT3M',
        step: [
            {
                '@type': 'HowToStep',
                name: 'Create Your Free Nobevra Account',
                text: 'Sign up for a free account at nobevra.noblesworld.com.ng. No credit card required. Your CRM is active immediately.',
                url: 'https://nobevra.noblesworld.com.ng/register',
            },
            {
                '@type': 'HowToStep',
                name: 'Add Your First Client or Import a CSV',
                text: 'Click "+ New Client", fill in name, email, phone, and company — or bulk-import your entire existing client list from a spreadsheet CSV in under 2 minutes.',
            },
            {
                '@type': 'HowToStep',
                name: 'Set Client Status: Active, Lead, or VIP Elite',
                text: 'Tag each client with their current relationship status. VIP Elite clients are prioritised in your billing queue. Leads are tracked in your pipeline until conversion.',
            },
            {
                '@type': 'HowToStep',
                name: 'Issue an Invoice Directly from the Client Record',
                text: 'Open any client profile and click "Invoice". Nobevra pre-fills the client details and links the invoice to their lifetime revenue ledger automatically.',
            },
        ],
    };

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased min-h-screen pt-[118px] overflow-x-hidden">
            <BreadcrumbSchema
                pageId="crm"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Client Management CRM' },
                ]}
            />
            <script id="faq-schema-crm" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script id="software-schema-crm" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script id="howto-schema-crm" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* ── BREADCRUMB ── */}
            <nav aria-label="Breadcrumb" className="max-w-[1430px] mx-auto px-4 md:px-16 pt-6 pb-2">
                <ol className="flex items-center gap-2 text-xs text-near-black/50 font-medium">
                    <li><Link href="/" className="hover:text-noble-blue transition-colors">Home</Link></li>
                    <li aria-hidden="true" className="text-near-black/30">/</li>
                    <li className="text-noble-blue font-bold" aria-current="page">Client Management CRM</li>
                </ol>
            </nav>

            {/* ── 1. HERO ── */}
            <section className="relative flex items-center pt-10 pb-24 md:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                    {/* Left copy */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" aria-hidden="true" />
                            Client Management CRM
                        </div>

                        <h1 className="font-inter text-near-black mb-6 text-[28px] xs:text-[32px] sm:text-[40px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-tight font-black break-words">
                            The <span className="text-noble-blue">Client Management CRM</span> That Connects Directly to Your Invoice Engine.
                        </h1>

                        <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Stop toggling between your contact spreadsheet and your billing tool. Nobevra CRM links every client profile to their invoices, contracts, payment history, and client portal — in one lightweight platform built for service businesses.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/register"
                                className="text-white px-8 sm:px-10 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 text-center"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Start Free CRM
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/lightweight-crm-for-freelancers"
                                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all text-center"
                            >
                                Freelancer CRM Guide
                            </Link>
                        </div>

                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                            No credit card required · Free plan available · CSV import in 2 minutes
                        </p>

                        {/* Trust micro-badges */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
                            {[
                                { icon: Users, color: 'text-noble-blue', label: 'Client Ledger & Pipeline' },
                                { icon: FileText, color: 'text-noble-blue', label: 'Invoice-Connected CRM' },
                                { icon: TrendingUp, color: 'text-noble-blue', label: 'Lifetime Revenue Tracking' },
                                { icon: Upload, color: 'text-noble-blue', label: 'CSV Bulk Import / Export' },
                            ].map(({ icon: Icon, color, label }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <Icon className={`w-5 h-5 ${color}`} />
                                    <span className="text-xs font-bold text-near-black/70">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Hero image */}
                    <div className="relative flex justify-center items-center">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/15 to-electric-cyan/15 blur-3xl rounded-full opacity-60 pointer-events-none" />
                        <div className="relative w-full rounded-[28px] sm:rounded-[36px] shadow-[0_40px_90px_rgba(0,0,0,0.15)] border border-slate-200/80 overflow-hidden bg-white">
                            <Image
                                src="/images/freelance-crm-hero.png"
                                alt="Nobevra Client Management CRM — Client Ledger with Invoice Integration"
                                width={1200}
                                height={800}
                                priority
                                className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500"
                            />
                            {/* Floating client score badge */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-xl border border-slate-100 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Star className="w-3.5 h-3.5 text-noble-blue" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-near-black uppercase tracking-widest">VIP Elite Client</p>
                                    <p className="text-[11px] text-near-black/50">Profile Score 87% · Lifetime Revenue ₦1.1M</p>
                                </div>
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
                            { icon: ShieldCheck, label: 'End-to-End Encrypted Client Records' },
                            { icon: BadgeCheck, label: 'SHA-256 Contract Audit Trails' },
                            { icon: Download, label: 'Full CSV Data Portability' },
                            { icon: Building2, label: 'Multi-Team Workspace Support' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                                <Icon className="w-4 h-4 text-noble-blue" />
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
                            { stat: '1-Click', label: 'Client-to-Invoice Generation', sub: 'from any CRM record' },
                            { stat: '4 Tiers', label: 'Client Status Management', sub: 'Active · Lead · VIP · Archived' },
                            { stat: '4.9★', label: 'Average Rating', sub: 'across 1,140+ verified businesses' },
                            { stat: '2 min', label: 'CSV Bulk Import', sub: 'entire existing client database' },
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

            {/* ── 4. CORE FEATURE BENTO GRID ── */}
            <section className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Layers className="w-4 h-4" />
                            CRM Features
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            Client Management CRM Software Built for Action, Not Data Entry.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            Every feature in Nobevra CRM is designed around one goal: reducing the time between managing client relationships and getting paid.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Feature 1 — Invoice-Connected CRM */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/30 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">
                                Invoice-Connected Client Management Software
                            </h3>
                            <p className="text-sm text-near-black/60 leading-relaxed">
                                Open any client record and issue a branded invoice in 1 click. The invoice auto-links to that client's lifetime revenue ledger — no manual reconciliation, no double-entry.
                            </p>
                            <Link href="/invoicing" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                Invoice Engine <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Feature 2 — VIP Elite Tiers */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/30 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center">
                                <Star className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">
                                VIP Elite Client Tier &amp; Lead Pipeline Tracking
                            </h3>
                            <p className="text-sm text-near-black/60 leading-relaxed">
                                Tag your highest-value accounts as VIP Elite for priority billing queues. Track unqualified prospects as Leads. Archive inactive clients without deleting their history.
                            </p>
                            <Link href="/cash-flow-analytics" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                Revenue Analytics <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Feature 3 — Contract & E-Sign */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/30 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center">
                                <FolderOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">
                                Contracts &amp; E-Signature Linked to Client Records
                            </h3>
                            <p className="text-sm text-near-black/60 leading-relaxed">
                                Every contract, retainer agreement, and NDA is attached directly to the client's CRM profile. Tamper-evident SHA-256 audit trails protect you in any payment dispute.
                            </p>
                            <Link href="/client-contracts" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                Client Contracts <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Feature 4 — Client Score */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/30 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">
                                Automated Client Profile Score &amp; Completeness Tracker
                            </h3>
                            <p className="text-sm text-near-black/60 leading-relaxed">
                                Each client receives a 0–100 profile completeness score based on contact data, status, address, and email verification — so your team always knows which records need attention.
                            </p>
                            <Link href="/crm" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                CRM Dashboard <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Feature 5 — CSV Import / Export */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/30 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center">
                                <Upload className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">
                                Bulk CSV Import &amp; Export for Contact Management
                            </h3>
                            <p className="text-sm text-near-black/60 leading-relaxed">
                                Migrate your entire existing client database from any spreadsheet in under 2 minutes. Map columns to Nobevra fields and import all contacts in bulk. Full data export available anytime.
                            </p>
                        </div>

                        {/* Feature 6 — White-Label Portal */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-noble-blue/30 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black group-hover:text-noble-blue transition-colors">
                                White-Label Client Portal Connected to Every CRM Record
                            </h3>
                            <p className="text-sm text-near-black/60 leading-relaxed">
                                Every client in your CRM automatically gets a secure, branded self-service portal to view invoices, pay balances, and e-sign contracts — without a single email from your team.
                            </p>
                            <Link href="/client-portal-software" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                Client Portal Hub <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
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
                            Set Up in 3 Minutes
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            How to Set Up a Client Management CRM for Your Small Business in Under 3 Minutes.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            No sales calls. No enterprise contracts. No 30-day onboarding. You are live in minutes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: '01',
                                title: 'Create Your Free Account',
                                desc: 'Sign up at no cost. Your CRM and client ledger are active the moment your account is created. No credit card required.',
                                color: 'bg-noble-blue/10 text-noble-blue',
                            },
                            {
                                step: '02',
                                title: 'Add Clients or Import CSV',
                                desc: 'Add contacts one by one or bulk-import your entire existing client list from any spreadsheet. Nobevra maps your columns automatically.',
                                color: 'bg-noble-blue/10 text-noble-blue',
                            },
                            {
                                step: '03',
                                title: 'Set Status: Active, Lead, or VIP',
                                desc: 'Tag each client with their current relationship stage. VIP Elite clients get priority in your billing queue. Leads are tracked until converted.',
                                color: 'bg-noble-blue/10 text-noble-blue',
                            },
                            {
                                step: '04',
                                title: 'Issue Invoice from Client Record',
                                desc: 'Open any client profile and click "Invoice." Nobevra pre-fills their details and the invoice syncs to their lifetime revenue total automatically.',
                                color: 'bg-noble-blue/10 text-noble-blue',
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

            {/* ── 6. COMPARISON TABLE ── */}
            <section className="py-20 md:py-28 bg-slate-50/50 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <BarChart3 className="w-4 h-4" />
                            How We Compare
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            Nobevra Client Management CRM vs. HubSpot vs. Zoho CRM vs. Spreadsheet.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            Enterprise CRMs charge you \$50–\$400/user/month for features you&apos;ll never use. Nobevra gives service businesses what they actually need.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
                        <table className="w-full min-w-[640px] text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-5 text-left font-black text-near-black text-base">Capability</th>
                                    <th className="px-6 py-5 text-center font-black text-noble-blue">Nobevra</th>
                                    <th className="px-6 py-5 text-center font-bold text-near-black/50">HubSpot / Zoho</th>
                                    <th className="px-6 py-5 text-center font-bold text-near-black/50">Spreadsheet</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    ['1-Click Invoice from Client Record', true, false, false],
                                    ['Lifetime Client Revenue Ledger (Auto-Updated)', true, false, false],
                                    ['Contract E-Sign Linked to Client Profile', true, false, false],
                                    ['Branded White-Label Client Self-Service Portal', true, false, false],
                                    ['VIP Elite Tier & Lead Pipeline Tracking', true, true, false],
                                    ['CSV Bulk Import & Full Data Export', true, true, false],
                                    ['Automated Client Profile Completeness Score', true, false, false],
                                    ['Free Forever Plan (No Subscription Required)', true, false, true],
                                ].map(([feature, nobevra, enterprise, sheet], i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                        <td className="px-6 py-4 font-medium text-near-black">{feature as string}</td>
                                        <td className="px-6 py-4 text-center">{nobevra ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <span className="text-slate-300 text-lg">—</span>}</td>
                                        <td className="px-6 py-4 text-center">{enterprise ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-slate-300 text-lg">—</span>}</td>
                                        <td className="px-6 py-4 text-center">{sheet ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-slate-300 text-lg">—</span>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 7. RELATED CRM SOLUTIONS ── */}
            <section className="py-16 md:py-20 bg-white border-b border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <h2 className="text-2xl font-black text-near-black mb-8 text-center">
                        Tailored CRM Solutions for Every Type of Business.
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <Link href="/lightweight-crm-for-freelancers" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue/40 hover:shadow-md transition-all group">
                            <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Solopreneurs &amp; Freelancers</span>
                            <h3 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Lightweight Freelance CRM</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Track client revenue, projects, and payment history without enterprise CRM bloat.</p>
                        </Link>
                        <Link href="/solutions/agency-billing-platform" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue/40 hover:shadow-md transition-all group">
                            <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Agencies &amp; Studios</span>
                            <h3 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Agency Client Management Platform</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Multi-client retainer automation, team billing roles, and client-specific revenue dashboards.</p>
                        </Link>
                        <Link href="/cash-flow-analytics" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue/40 hover:shadow-md transition-all group">
                            <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Growth Analytics</span>
                            <h3 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Customer Lifetime Value &amp; Revenue Intelligence</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Real-time revenue pacing, client profitability metrics, and AR aging analysis.</p>
                        </Link>
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
                            Real Businesses. Real Client Relationships. Real Results.
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
                            <HelpCircle className="w-3.5 h-3.5" /> FAQ
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-near-black">
                            Client Management CRM — Questions Answered.
                        </h2>
                        <p className="text-near-black/50 text-base">Everything you need to know before switching from spreadsheets.</p>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
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
                        Replace Your Client Spreadsheet with a CRM That Actually Earns Money.
                    </h2>
                    <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        Every client record connected to their invoices, contracts, and payment history. Start free — no credit card, no sales call.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-[#166FBB] text-white px-8 py-4 rounded-2xl font-extrabold text-sm tracking-wide shadow-[0_12px_30px_rgba(22,111,187,0.35)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-3"
                        >
                            Start Free CRM <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/lightweight-crm-for-freelancers"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
                        >
                            <Users className="w-4 h-4" />
                            Freelancer CRM Guide
                        </Link>
                    </div>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest pt-4">
                        No credit card · No setup fee · CSV import in 2 minutes
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
