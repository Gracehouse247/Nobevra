'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Receipt, FileText, ArrowRight, CheckCircle2,
    DollarSign, Globe, Sparkles, Send, ShieldCheck,
    Clock, RefreshCw, Eye, Check, X, ChevronDown,
    Zap, Lock, CreditCard, Layers, BarChart3, AlertCircle,
    Smartphone, FileSignature, HelpCircle, ArrowUpRight,
    Scale, Users, FileCheck
} from 'lucide-react';

const REVIEWS = [
    {
        quote: "The precision of the invoice templates and automated payment collection gives our fintech startup the enterprise-grade look we need to build trust with international clients.",
        name: "Kenneth Matthew",
        role: "CEO, FundMe Naija",
        image: "/images/reviews/kenneth-matthew-ceo-of-fundme-naija.jpeg",
    },
    {
        quote: "The CRM and invoicing engine keeps all our consulting engagements perfectly tracked. Knowing exactly when a client views an invoice saves us countless awkward follow-up emails.",
        name: "Celestine Nzubbychukwu",
        role: "Founder, MyStaff Consulting Limited",
        image: "/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png",
    },
    {
        quote: "Nobevra's secure client portal transformed how our law firm handles monthly retainers. The transparency and instant receipt generation is invaluable.",
        name: "Barr Emma Duruigbo",
        role: "Founder, Ducex Solicitors Ltd.",
        image: "/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png",
    },
    {
        quote: "I used to spend entire Sunday evenings formatting bills and chasing bank transfers. With Nobevra, I set up automated recurring profiles and bought my weekends back.",
        name: "Ayasha Khan",
        role: "Marketing Director, Noblemart US",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
    }
];

const TEMPLATES = [
    {
        name: "Digital Agency & Marketing Retainer",
        badge: "Agency",
        desc: "Itemized line items for media spend, hourly campaign advisory, and automated monthly recurring billing.",
        popular: true
    },
    {
        name: "Freelance Consultant & SOW Invoice",
        badge: "Freelance",
        desc: "Milestone-based project billing with linked contract numbers, task deliverables, and Net-14 terms.",
        popular: true
    },
    {
        name: "B2B Professional Services & Legal",
        badge: "Corporate",
        desc: "Clean corporate layout with tax jurisdiction breakdowns, trust accounting notes, and direct wire details.",
        popular: false
    },
    {
        name: "E-Commerce & Commercial Wholesale",
        badge: "E-Commerce",
        desc: "Quantity tracking, SKU codes, automated shipping cost calculations, and multi-currency conversion.",
        popular: true
    },
    {
        name: "Contractor & Construction Scope",
        badge: "Trade & Field",
        desc: "Materials vs. labor breakdown, milestone stage percentages, and on-site mobile signature verification.",
        popular: false
    },
    {
        name: "Custom Bespoke Brand Builder",
        badge: "Bespoke",
        desc: "Create custom layouts with your exact brand hex codes, custom watermark logos, and tailored payment terms.",
        popular: false
    }
];

const FAQS = [
    {
        q: "What makes Nobevra different from a basic free invoice generator?",
        a: "A basic invoice generator only creates a static PDF document. Nobevra is a complete commercial billing engine: it tracks in real time when your client opens the invoice, provides a one-click online checkout link, automatically retries failed recurring payments, syncs directly with your client CRM, and updates your revenue ledger instantly upon settlement."
    },
    {
        q: "How fast do clients pay when using Nobevra online invoicing software?",
        a: "By embedding one-click checkout buttons (credit card, bank transfer, mobile money) and setting automatic Net-14 reminder cadences, Nobevra users reduce their average collection cycle from 28 days down to 4.2 days."
    },
    {
        q: "Can I customize invoices with my company brand, logo, and colors?",
        a: "Yes. Choose from 180+ professionally designed layouts (Modern, Minimal, Bold, Classic, Agency). Upload your high-resolution logo, set your primary brand hex color, configure custom payment terms, and add personalized thank-you notes."
    },
    {
        q: "How does automated recurring billing software work for client retainers?",
        a: "You create an invoice profile once, set the frequency (weekly, monthly, quarterly, or annual), and enable auto-send. Nobevra automatically generates the invoice, emails it to the client, triggers the card charge, and issues a payment receipt upon settlement."
    },
    {
        q: "Is there a free invoice software plan available for small businesses?",
        a: "Yes. The Nobevra Explorer plan is permanently free and includes standard templates, client records, and online payments with zero monthly subscription fees."
    },
    {
        q: "How does Nobevra handle international currencies and sales taxes?",
        a: "Nobevra supports invoicing in 30+ major global currencies (USD, EUR, GBP, NGN, CAD, AUD) and includes dedicated tax engines for VAT, GST, Sales Tax, and Reverse Charge calculations."
    }
];

export default function InvoicingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Nobevra Online Invoicing Software",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Create professional invoices in seconds with Nobevra. 180+ templates, real-time client view telemetry, recurring billing, and instant global card checkout."
    };

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">
            <BreadcrumbSchema
                pageId="invoicing"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Invoicing Software' },
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />

            {/* ── VISIBLE UI BREADCRUMB ── */}
            <nav aria-label="Breadcrumb" className="max-w-[1430px] mx-auto px-4 md:px-16 pt-6 pb-2">
                <ol className="flex items-center gap-2 text-xs text-near-black/50 font-medium">
                    <li><Link href="/" className="hover:text-noble-blue transition-colors">Home</Link></li>
                    <li aria-hidden="true" className="text-near-black/30">/</li>
                    <li className="text-noble-blue font-bold" aria-current="page">Online Invoicing Software</li>
                </ol>
            </nav>

            {/* ── 1. HERO SECTION ── */}
            <section className="relative min-h-[90vh] flex items-center pt-8 pb-20 md:pb-28 overflow-hidden">
                {/* Ambient background glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <div className="relative z-10">
                        {/* Platform badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" aria-hidden="true" />
                            Professional Invoicing Engine
                        </div>

                        {/* H1 Typography matching Homepage */}
                        <h1 className="font-inter text-near-black mb-6 text-[28px] xs:text-[32px] sm:text-[40px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-tight font-black break-words">
                            The Professional <span className="text-noble-blue">Invoicing Software</span> Built to Get You Paid Faster.
                        </h1>

                        <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Create branded bills with 180+ industry templates. Track exactly when clients open your invoice, automate polite payment reminders, and accept instant global card settlements without manual chasing.
                        </p>

                        {/* CTA Group matching Homepage Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/register"
                                className="text-white px-8 sm:px-10 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 text-center"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Start Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/free-invoice-generator"
                                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all text-center"
                            >
                                Free Invoice Generator
                            </Link>
                        </div>

                        {/* Microcopy */}
                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                            No credit card required · Free plan available · 180+ Custom Templates
                        </p>

                        {/* Verified trust badges */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">Real-Time View Telemetry</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">Instant Card Checkout</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 text-amber-500" />
                                <span className="text-xs font-bold text-near-black/70">Automated Recurring Retainers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-near-black/70">256-Bit Bank Encryption</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Authentic Platform UI Screenshot */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-full">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-60 pointer-events-none" />
                            <div className="relative rounded-[28px] sm:rounded-[36px] shadow-[0_40px_90px_rgba(0,0,0,0.18)] border border-slate-200/80 overflow-hidden bg-white">
                                <Image
                                    src="/images/invoicing-hero.jpg"
                                    alt="Nobevra Online Invoicing Software Interface"
                                    width={1200}
                                    height={900}
                                    priority
                                    className="w-full h-auto object-cover rounded-[28px] sm:rounded-[36px] hover:scale-[1.01] transition-transform duration-500"
                                />
                            </div>

                            {/* Floating Telemetry Badge */}
                            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-3 z-20">
                                <div className="w-9 h-9 rounded-xl bg-noble-blue/10 flex items-center justify-center shrink-0">
                                    <Eye className="w-5 h-5 text-noble-blue" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Live View Telemetry</p>
                                    <p className="text-xs font-black text-near-black">Opened in London, UK</p>
                                </div>
                            </div>

                            {/* Floating Settlement Badge */}
                            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-3 z-20">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Instant Card Checkout</p>
                                    <p className="text-xs font-black text-noble-blue">4.2 Days Average Settlement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. SUPPORTED CURRENCIES & PAYMENT MARQUEE ── */}
            <section className="border-y border-slate-200/60 bg-slate-50/50 py-8">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                        Supported Multi-Currency Invoicing & Global Settlement Gateways
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
                        <span className="font-black text-sm text-slate-600">USD · United States Dollar</span>
                        <span className="font-black text-sm text-slate-600">EUR · Euro</span>
                        <span className="font-black text-sm text-slate-600">GBP · British Pound</span>
                        <span className="font-black text-sm text-slate-600">NGN · Nigerian Naira</span>
                        <span className="font-black text-sm text-slate-600">CAD · Canadian Dollar</span>
                        <span className="font-black text-sm text-slate-600">AUD · Australian Dollar</span>
                    </div>
                </div>
            </section>

            {/* ── 3. AUTHORITY STATS STRIP ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-14">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">4.2<span className="text-2xl">days</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">average collection cycle</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">down from 28 days when businesses switch from manual PDF emails to Nobevra automated billing software.</p>
                    </div>
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">73<span className="text-2xl">%</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">faster client checkout</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">achieved with embedded 1-click card, bank transfer, and mobile payment checkout links on invoices.</p>
                    </div>
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">100<span className="text-2xl">%</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">view telemetry transparency</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">know the exact minute and device your client used to open your invoice, eliminating disputed delivery claims.</p>
                    </div>
                </div>
            </section>

            {/* ── 4. THE BILLING FRICTION: WHY MANUAL INVOICING FAILS ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-700 font-bold text-xs uppercase tracking-widest mb-4">
                        <AlertCircle className="w-4 h-4" />
                        The Cash Flow Friction Point
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Why Traditional PDF Invoicing Drains Cash Flow & Delays Payment.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Creating static Word templates and emailing PDF attachments creates operational friction that delays payment settlement by weeks and strains client relationships.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 mb-6 font-black text-lg">
                            01
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">The &ldquo;Lost in Spam&rdquo; Blindspot</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            When you send an email attachment, you have zero visibility. You never know if the client saw it, ignored it, or if it landed in spam until days after the due date.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6 font-black text-lg">
                            02
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">Manual Checkout Resistance</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            Asking busy clients to log into their banking portal, copy account numbers, and manually send wire confirmations introduces friction that delays payments by an average of 19 days.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6 font-black text-lg">
                            03
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">Disconnected Accounting Gap</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            When invoices live in separate spreadsheets disconnected from your CRM and expense tracking, reconciling who paid what requires hours of manual double-entry.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 5. THE 3-STEP NOBEVRA INVOICING WORKFLOW ── */}
            <section className="bg-gradient-to-b from-white via-[#F5FCFF] to-white py-20 md:py-28 border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Sparkles className="w-4 h-4" />
                            How Nobevra Works
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            From Invoice Draft to Cleared Revenue in 3 Simple Steps.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            An automated business invoicing platform engineered for speed, professional branding, and fast settlement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 01</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Select Template & Add Line Items</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Pick from 180+ industry templates using our professional invoice creator. Add your logo, brand colors, tax rates, and client details in 30 seconds.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <Send className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 02</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Send Link & Track Real-Time View</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Deliver a secure payment link via email or WhatsApp. Live telemetry notifies you the second your client opens the invoice on their device.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-amber-600">Step 03</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Instant Card & Bank Settlement</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Clients settle with 1 click using credit card, debit, or local bank transfer. Funds settle into your account and automatically sync with your P&L.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. CORE CAPABILITIES BENTO GRID ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                        <Layers className="w-4 h-4" />
                        Feature Architecture
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Everything You Need in a Modern Cloud Billing System.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Engineered to replace slow manual billing with a connected, automated client billing software suite.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Bento 1: View Telemetry */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Real-Time Client View Telemetry</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Receive instant alerts when your client opens an invoice. Know their exact timestamp, location, and device to follow up with precision.
                            </p>
                        </div>
                        <Link href="/register" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Explore Telemetry Features <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 2: Recurring Retainers */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Automated Recurring Billing Software</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Set up automated weekly, monthly, or quarterly retainer schedules with automatic card charges, payment receipts, and failed-payment retries.
                            </p>
                        </div>
                        <Link href="/features/how-to-bill-clients-on-retainer" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Retainer Billing Playbook <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 3: Multi-Currency */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">30+ Global Currencies & Taxes</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Bill global clients in USD, EUR, GBP, NGN, CAD, and AUD with automated calculations for VAT, GST, Sales Tax, and Reverse Charge rules.
                            </p>
                        </div>
                        <Link href="/payments" className="text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline">
                            Global Payment Specs <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 4: Contract to Invoice */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6">
                                <FileSignature className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">1-Click Contract Milestone Invoicing</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                When a client e-signs a Statement of Work on Nobevra, the initial deposit invoice triggers automatically with zero manual data re-entry.
                            </p>
                        </div>
                        <Link href="/client-contracts" className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                            Client Contracts & E-Sign <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 5: Net-14 Automated Reminders */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-6">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Automated Net-14 Payment Nudges</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Configure polite automated payment reminders before, on, and after due dates to eliminate awkward debt collection conversations.
                            </p>
                        </div>
                        <Link href="/register" className="text-xs font-bold text-cyan-600 flex items-center gap-1 hover:underline">
                            Configure Reminder Cadence <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 6: CRM & Ledger Sync */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Client CRM & P&L Synchronization</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Paid invoices sync directly to client profiles, updating lifetime revenue, open accounts receivable (AR), and operational cash runway in real time.
                            </p>
                        </div>
                        <Link href="/crm" className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                            Client CRM Integration <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 7. 180+ PROFESSIONAL TEMPLATES SHOWCASE ── */}
            <section className="bg-slate-50/50 py-20 md:py-28 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <FileCheck className="w-4 h-4" />
                            Template Library
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            180+ Professional Invoice Templates for Small Business.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            Curated invoice layouts engineered for consultants, agencies, wholesale merchants, and service contractors.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEMPLATES.map((tmpl, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-noble-blue hover:shadow-md transition-all group">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-600 rounded-full group-hover:bg-noble-blue/10 group-hover:text-noble-blue transition-colors">
                                            {tmpl.badge}
                                        </span>
                                        {tmpl.popular && (
                                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-near-black mb-3 group-hover:text-noble-blue transition-colors">
                                        {tmpl.name}
                                    </h3>
                                    <p className="text-xs text-near-black/60 leading-relaxed mb-6">
                                        {tmpl.desc}
                                    </p>
                                </div>
                                <Link
                                    href="/templates"
                                    className="text-xs font-bold text-noble-blue flex items-center gap-1.5 pt-4 border-t border-slate-100 group-hover:translate-x-1 transition-transform"
                                >
                                    Explore Template <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 8. COMPARISON TABLE & PRICING REASSURANCE ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                        <BarChart3 className="w-4 h-4" />
                        How Nobevra Compares
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Online Invoicing Software vs. Legacy Tools vs. Static Word Docs.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Why pay for disconnected accounting apps with per-user fees when you can run contracts, client CRM, and invoicing in one unified operating system?
                    </p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm mb-12">
                    <table className="w-full min-w-[650px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left px-6 py-4 font-black text-near-black text-xs uppercase tracking-wider">Billing Capability</th>
                                <th className="text-center px-6 py-4 font-black text-noble-blue text-xs uppercase tracking-wider">Nobevra Invoicing</th>
                                <th className="text-center px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Zoho / FreshBooks</th>
                                <th className="text-center px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Word Docs & Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                ['Real-Time Client View Telemetry (Device/IP/Timestamp)', true, false, false],
                                ['Embedded Multi-Currency Online Card Checkout', true, true, false],
                                ['Automated Recurring Retainer Billing & Schedules', true, true, false],
                                ['1-Click Contract Milestone to Invoice Trigger', true, false, false],
                                ['180+ Industry-Specific Professional Templates', true, false, false],
                                ['Connected Client CRM & Lifetime Revenue Ledger', true, false, false],
                                ['Automated Regional Tax Engine (VAT/GST/Sales Tax)', true, true, false],
                                ['Free Plan with Zero Monthly Subscription Fee', true, false, true],
                            ].map(([feature, nobevra, legacy, word], i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                    <td className="px-6 py-4 font-medium text-near-black">{feature as string}</td>
                                    <td className="px-6 py-4 text-center">
                                        {nobevra ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {legacy ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {word ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pricing Reassurance Block */}
                <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-lg font-black text-near-black mb-1">Start sending professional invoices free today.</p>
                        <p className="text-sm text-near-black/60">Nobevra Explorer plan is permanently free. No credit card required. Upgrade only when your revenue scales.</p>
                    </div>
                    <Link
                        href="/register"
                        className="shrink-0 px-8 py-4 text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(22,111,187,0.25)] whitespace-nowrap"
                        style={{ backgroundColor: '#166FBB' }}
                    >
                        Start Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* ── 9. INFORMATION GAIN: THE DSO DECAY FORMULA ── */}
            <section className="bg-slate-900 text-white py-20 md:py-28">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#01A0E2] font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                                <BarChart3 className="w-4 h-4" />
                                Information Gain Framework
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6">
                                The Days Sales Outstanding (DSO) Decay Formula: Why Invoices Unpaid Past 14 Days Lose 28% Collectibility.
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed mb-6">
                                In accounts receivable management, cash flow velocity decays non-linearly. Industry financial data shows that an invoice not paid within 14 days of deliverable handoff has a 28% higher probability of entering disputed or delinquent status.
                            </p>
                            <p className="text-slate-300 text-base leading-relaxed mb-8">
                                Embedding one-click online card checkout and setting up automated pre-due nudges compresses the collection cycle from the standard 28 days down to 4.2 days, protecting operational cash flow.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-3xl font-black text-rose-400 mb-1">-28%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Collectibility Loss Past 14 Days</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-[#01A0E2] mb-1">4.2 Days</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average Nobevra Settlement DSO</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6">The 4 Rules of High-Velocity Invoicing</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Deliver Invoices Immediately on Milestone Handoff</h4>
                                        <p className="text-xs text-slate-400 mt-1">Never wait until the end of the month to bill. Send invoices the exact minute client deliverables are shared.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Embed 1-Click Online Payment Links</h4>
                                        <p className="text-xs text-slate-400 mt-1">Remove manual bank wire friction. Allow clients to settle with Apple Pay, credit cards, or instant bank checkout.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Track Real-Time Client View Telemetry</h4>
                                        <p className="text-xs text-slate-400 mt-1">Know when your client opens the invoice so you can follow up with exact context and eliminate delivery disputes.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">4</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Automate Polite Reminder Cadences</h4>
                                        <p className="text-xs text-slate-400 mt-1">Set automated email and WhatsApp nudges at 3 days before due, on the due date, and 3 days overdue.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 10. CONTRARIAN PERSPECTIVE SECTION ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-24">
                <div className="bg-slate-900 rounded-[36px] overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                        {/* Left: Dark copy panel */}
                        <div className="p-10 sm:p-14 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-noble-blue mb-4 block">
                                    Contrarian Perspective
                                </span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                                    Why Politely Chasing Invoices Manually Destroys Client Relationships.
                                </h2>

                                <div className="border-l-4 border-noble-blue pl-5 mb-8">
                                    <p className="text-white/70 text-sm sm:text-base leading-relaxed italic">
                                        &ldquo;Most business owners think sending personal emails to follow up on late invoices shows good customer service. In reality, it makes payment discussions emotional, introduces awkwardness, and encourages clients to delay payment.&rdquo;
                                    </p>
                                </div>

                                <div className="space-y-5 mb-10">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Systematize reminders through software</p>
                                            <p className="text-xs text-white/60 leading-relaxed">When automated system notifications handle due-date reminders, payment is treated as a standard operational procedure rather than a personal confrontation.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Preserve relationship equity for client strategy</p>
                                            <p className="text-xs text-white/60 leading-relaxed">Your client conversations should focus on project results and growth advisory — not administrative debt collection.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Set clear Net-14 expectations from Day 1</p>
                                            <p className="text-xs text-white/60 leading-relaxed">Pairing signed client contracts with automated billing profiles establishes professional payment boundaries before work starts.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-near-black font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-lg text-base"
                                style={{ backgroundColor: '#01A0E2' }}
                            >
                                Start Invoicing Automatically Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Right: Stats / Visual accent panel */}
                        <div className="bg-noble-blue/10 border-l border-white/5 p-10 sm:p-14 flex flex-col gap-8">
                            <div className="bg-slate-800/80 rounded-3xl p-8 border border-white/5">
                                <p className="text-xs font-black uppercase tracking-wider text-white/40 mb-4">The Cost of Manual Chasing</p>
                                <div className="space-y-4 text-xs text-white/70">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span>Manual reminder emails written per month:</span>
                                        <span className="text-slate-400">14 Emails</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span>Hours lost to administrative follow-up:</span>
                                        <span className="text-slate-400">8.5 Hours/mo</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span>Average delay on manual collection:</span>
                                        <span className="text-slate-400">28 Days</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="font-bold text-white">Annual administrative cost:</span>
                                        <span className="text-base font-black text-rose-400">$3,400+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-noble-blue/20 rounded-3xl p-8 border border-noble-blue/20">
                                <p className="text-xs font-black uppercase tracking-wider text-noble-blue mb-4">With Nobevra Automated Invoicing</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Invoices auto-generated from contracts</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Automated payment reminders sent on schedule</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Real-time view alerts when client opens bill</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-5 border-t border-noble-blue/20">
                                    <p className="text-3xl font-black text-noble-blue">4.2 Days</p>
                                    <p className="text-xs text-white/50 mt-1 font-medium uppercase tracking-wider">Average collection cycle</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 11. AUTHENTIC FOUNDER REVIEWS ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest mb-4">
                        <Sparkles className="w-4 h-4" />
                        Verified Founder Experiences
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4">
                        Trusted by Founders & Growing Businesses Worldwide.
                    </h2>
                    <p className="text-base text-near-black/60">
                        See how agencies, consultancies, and digital startups get paid faster with Nobevra.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((r, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex gap-0.5 text-amber-400 text-sm mb-4">
                                    {'★'.repeat(5)}
                                </div>
                                <p className="text-xs sm:text-sm text-near-black/70 leading-relaxed mb-6 italic">
                                    &ldquo;{r.quote}&rdquo;
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-100">
                                    <Image
                                        src={r.image}
                                        alt={r.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-near-black">{r.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium leading-tight">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 12. DISQUALIFIER & FIT QUALIFICATION: UX PSYCHOLOGY ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-widest mb-4 border border-slate-200">
                        <ShieldCheck className="w-4 h-4 text-noble-blue" />
                        Radical Candor & Fit Check
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4">
                        Is Nobevra Invoicing Software the Right Fit for You?
                    </h2>
                    <p className="text-base text-near-black/60 leading-relaxed">
                        We believe in honest qualification. Great software should solve exact operational bottlenecks for specific businesses, rather than trying to be a bloated tool for everyone.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left: When Nobevra is NOT Right */}
                    <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-black uppercase tracking-wider mb-6">
                                <X className="w-3.5 h-3.5 text-rose-600" />
                                When to Look Elsewhere
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-near-black mb-6">
                                When Nobevra May NOT Be the Right Choice:
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">One-Off Personal Peer Payments</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If you only need to split a dinner bill with friends or send money to family, peer-to-peer apps like Venmo or Cash App are designed for casual transfers.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">Complex Multi-Subsidiary Holding ERPs</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If you operate an enterprise conglomerate with 50 global holding entities requiring inter-company consolidation and custom ERP development, Oracle NetSuite is built for that scale.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">Manual Cash-Only Physical Register Retail</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If your business operates strictly on physical cash with no digital invoices, client contracts, or online card payments, traditional paper cash registers are sufficient.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-xs text-slate-400 font-medium">
                                Looking for other solutions? We recommend exploring enterprise ERP platforms for multi-tier holding structures.
                            </p>
                        </div>
                    </div>

                    {/* Right: When Nobevra is the Ideal Fit */}
                    <div className="relative bg-gradient-to-br from-[#166FBB] to-[#0A4B82] rounded-[32px] p-8 sm:p-12 text-white shadow-xl shadow-blue-900/10 flex flex-col justify-between overflow-hidden">
                        {/* Ambient glow accent */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-black uppercase tracking-wider mb-6 border border-white/20">
                                <Check className="w-3.5 h-3.5 text-[#01A0E2]" />
                                The Ideal Fit
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
                                When Nobevra is Built Specifically for You:
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Agencies, Consultancies & Freelancers</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You bill clients on milestone projects or monthly recurring retainers and want real-time view telemetry and instant card checkout to get paid 3x faster.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Founders Who Hate Manual Follow-Ups</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You want automated Net-14 reminder cadences to handle payment nudges politely without awkward emails or uncomfortable conversations.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Connected Business Operations</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You want invoices that connect seamlessly to client CRM history, signed contracts, and real-time cash flow analytics in one operating system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-bold text-white">Sound like your business?</p>
                                <p className="text-xs text-white/70">Start free with zero credit card required.</p>
                            </div>
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#166FBB] text-xs font-black uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
                            >
                                Start Free Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 13. COMPREHENSIVE FAQ SECTION (ACCORDION) ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                        <HelpCircle className="w-4 h-4" />
                        Frequently Answered Questions
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4">
                        Common Questions About Online Invoicing & Automated Billing.
                    </h2>
                    <p className="text-base text-near-black/60">
                        Everything you need to know about invoice templates, telemetry tracking, and payment processing.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full p-6 text-left font-bold text-base sm:text-lg flex justify-between items-center gap-4 text-near-black hover:text-noble-blue transition-colors"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                                        openFaq === index ? 'rotate-180 text-noble-blue' : ''
                                    }`}
                                />
                            </button>
                            {openFaq === index && (
                                <div className="px-6 pb-6 text-sm text-near-black/70 leading-relaxed border-t border-slate-100 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 14. RELATED OPERATIONS HUB ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
                <h3 className="text-2xl font-black text-near-black mb-8 text-center">Connected Financial & Operations Hubs</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/free-invoice-generator" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Free PLG Tool</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Free Invoice Generator</h4>
                        <p className="text-xs text-slate-500">Create & download instant PDF invoices with no sign-up.</p>
                    </Link>
                    <Link href="/client-contracts" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Legal Suite</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Client Contracts & E-Sign</h4>
                        <p className="text-xs text-slate-500">Pre-built legal templates with 1-click invoice conversion.</p>
                    </Link>
                    <Link href="/expense-management" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Expense Tracking</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Expense Management</h4>
                        <p className="text-xs text-slate-500">AI receipt scanning & tax deduction categorization.</p>
                    </Link>
                    <Link href="/crm" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Client CRM</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Client Management CRM</h4>
                        <p className="text-xs text-slate-500">Track deal pipelines, customer LTV, and invoices.</p>
                    </Link>
                </div>
            </section>

            {/* ── 15. FINAL CONVERSION CTA BANNER ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="bg-gradient-to-r from-slate-900 via-[#166FBB] to-slate-900 rounded-[36px] p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                            Start Getting Paid 3x Faster with Online Invoicing Software.
                        </h2>
                        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Join thousands of growing businesses that eliminate manual invoice chasing and accelerate cash flow with Nobevra.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-10 py-5 bg-white text-near-black font-extrabold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105"
                            >
                                Start Free
                                <ArrowRight className="w-5 h-5 text-noble-blue" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center"
                            >
                                View Pricing Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
