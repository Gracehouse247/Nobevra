'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    Receipt, Camera, ArrowRight, CheckCircle2,
    DollarSign, Sparkles, Send, ShieldCheck,
    Clock, RefreshCw, Eye, Check, X, ChevronDown,
    Zap, Lock, CreditCard, Layers, BarChart3, AlertCircle,
    Smartphone, FileText, PieChart, HelpCircle, ArrowUpRight,
    Globe
} from 'lucide-react';

const REVIEWS = [
    {
        quote: "Tracking media production expenses used to be a nightmare. The Smart Expense Manager categorizes everything automatically across our team, saving us hours each week.",
        name: "Beautrice Moreau",
        role: "Operations Manager, Eagles Media",
        image: "/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png",
    },
    {
        quote: "The CRM and expense ledgers keep all our consulting costs organized. Knowing our exact project profit margins after expenses has transformed our pricing strategy.",
        name: "Celestine Nzubbychukwu",
        role: "Founder, MyStaff Consulting Limited",
        image: "/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png",
    },
    {
        quote: "The Inventory and Expense Hub prevents stockouts and tracks vendor spending automatically. Real-time cost tracking has saved our agricultural supply business thousands.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
    {
        quote: "The AI receipt scanner captures vendor names and tax line items with high precision. Tax preparation that used to take three weekends now takes twenty minutes.",
        name: "Timileyin Oluwafemi",
        role: "Managing Director, Apex Logistics",
        image: "/images/reviews/timileyin-oluwafemi-ceo-of-ceejee-foam.jpeg",
    }
];

const FAQS = [
    {
        q: "How does the AI receipt scanner extract expense information?",
        a: "Nobevra uses neural optical character recognition (OCR) models to scan photos and PDF receipts. It instantly identifies the vendor name, total purchase amount, transaction date, payment method, and localized tax line items without manual keyboard entry."
    },
    {
        q: "Can I link billable out-of-pocket expenses directly to client invoices?",
        a: "Yes. When recording an expense, you can select any active client from your CRM or assign the cost to a specific project invoice. The expense balance is automatically added as a billable line item on the client's next invoice."
    },
    {
        q: "How does Nobevra categorize expenses for annual tax deductions?",
        a: "Expenses are mapped into standard tax-deductible categories (such as Advertising, Software Subscriptions, Travel, Office Supplies, and Professional Services). This ensures your financial records match standard tax reporting schedules."
    },
    {
        q: "Are my uploaded digital receipts legally compliant for tax audits?",
        a: "Yes. Nobevra stores original high-resolution receipt images with cryptographic SHA-256 timestamped metadata and audit trails. These digital copies meet global digital recordkeeping standards for tax authorities including the IRS, HMRC, CRA, and FIRS."
    },
    {
        q: "Can I track expenses across multiple foreign currencies?",
        a: "Yes. Nobevra supports multi-currency expense logging across 30+ major world currencies. It records the original purchase currency and calculates the base currency exchange rate for accurate P&L reporting."
    },
    {
        q: "Is there a free plan available to track business expenses?",
        a: "Yes. The Nobevra Explorer plan is free forever and includes manual expense tracking, receipt attachment uploads, category reporting, and P&L monitoring with zero subscription fees."
    }
];

export default function ExpenseManagementPage() {
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
        "name": "Nobevra Business Expense Tracker & Management Software",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Automate business expense tracking with Nobevra. AI receipt scanner, automatic tax deductible categorization, real-time P&L analytics, and invoice cost linking."
    };

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">
            <BreadcrumbSchema
                pageId="expense-management"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Expense Management' },
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
                    <li className="text-noble-blue font-bold" aria-current="page">Expense Management</li>
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
                            Smart Spend & Ledger Hub
                        </div>

                        {/* H1 Typography matching Homepage */}
                        <h1 className="font-inter text-near-black mb-6 text-[28px] xs:text-[32px] sm:text-[40px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-tight font-black break-words">
                            Automated <span className="text-noble-blue">Business Expense Tracker</span> with AI Receipt Scanning.
                        </h1>

                        <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Stop manual data entry. Capture receipts on your phone, categorize expenses by project or tax bracket, and maintain real-time profit & loss visibility across your entire business.
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
                                href="/ai-receipt-scanner"
                                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all text-center"
                            >
                                Try AI Scanner Demo
                            </Link>
                        </div>

                        {/* Microcopy */}
                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                            No credit card required · Free plan available · Cancel anytime
                        </p>

                        {/* Verified trust badges */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">Audit-Proof Receipts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">Real-Time P&L Sync</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-near-black/70">99.4% OCR Accuracy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-amber-600" />
                                <span className="text-xs font-bold text-near-black/70">Tax Write-Off Tracker</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Modern Browser Mockup Visual */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-full">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-60 pointer-events-none" />
                            <div className="relative bg-noble-surface/80 backdrop-blur-sm p-3 sm:p-4 rounded-[28px] sm:rounded-[36px] shadow-[0_40px_90px_rgba(0,0,0,0.15)] border border-slate-100/80 overflow-hidden">
                                <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="rounded-[18px] sm:rounded-[24px] overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                                    <Image
                                        src="/images/expense-management-hero.jpg"
                                        alt="Nobevra Expense Hub — Record, Scan Receipts, and Manage Business Expenses"
                                        width={1400}
                                        height={950}
                                        priority
                                        className="w-full h-auto object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* Floating OCR Extraction Badge */}
                            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-3 z-20">
                                <div className="w-9 h-9 rounded-xl bg-noble-blue/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-5 h-5 text-noble-blue" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">AI OCR Extraction</p>
                                    <p className="text-xs font-black text-near-black">Receipt Scanned & Matched</p>
                                </div>
                            </div>

                            {/* Floating Tax Deduction Pill */}
                            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-3 z-20">
                                <div className="w-9 h-9 rounded-xl bg-[#166FBB]/10 flex items-center justify-center shrink-0">
                                    <Receipt className="w-5 h-5 text-[#166FBB]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tax Categorization</p>
                                    <p className="text-xs font-black text-noble-blue">100% Tax Deductible Logged</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. TRUSTED CATEGORIES & EXPORT INTEGRATIONS MARQUEE ── */}
            <section className="border-y border-slate-200/60 bg-slate-50/50 py-8">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                        Supported Expense Categories & Export Formats
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
                        <span className="font-black text-sm text-slate-600">Schedule C Tax Codes</span>
                        <span className="font-black text-sm text-slate-600">CSV & Excel Export</span>
                        <span className="font-black text-sm text-slate-600">PDF Audit Vault</span>
                        <span className="font-black text-sm text-slate-600">Direct Invoice Linking</span>
                        <span className="font-black text-sm text-slate-600">Multi-Currency Conversion</span>
                        <span className="font-black text-sm text-slate-600">Real-Time P&L Sync</span>
                    </div>
                </div>
            </section>

            {/* ── 2b. AUTHORITY STATS STRIP ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-14">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">43<span className="text-2xl">%</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">of small businesses</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">still manage expense tracking on manual spreadsheets, missing thousands in deductions annually.</p>
                    </div>
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">12<span className="text-2xl">hrs</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">saved per month</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">on average when businesses replace manual receipt logging with AI receipt scanner expense tracking software.</p>
                    </div>
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">$4,800</p>
                        <p className="text-sm font-bold text-near-black mb-1">recovered annually</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">in previously unclaimed tax deductions and unbilled client reimbursables by businesses using Nobevra.</p>
                    </div>
                </div>
            </section>

            {/* ── 3. THE SPEND FRICTION: WHY MANUAL EXPENSE TRACKING FAILS ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-700 font-bold text-xs uppercase tracking-widest mb-4">
                        <AlertCircle className="w-4 h-4" />
                        The Expense Friction Point
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Why Manual Expense Tracking Drains 12 Hours a Month and Loses Tax Deductions.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Most small business expense tracking still happens inside spreadsheets and shoeboxes. The result: missed tax write-offs, unbilled client costs, and a P&L tracking software gap that quietly drains net profit every quarter. Tracking business receipts manually is not just slow — it is expensive.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 mb-6 font-black text-lg">
                            01
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">Faded & Lost Paper Receipts</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            Thermal paper receipts fade within months. Without instant digital OCR capture, business owners lose thousands in legitimate tax deductions during audits. Track business receipts digitally from day one.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6 font-black text-lg">
                            02
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">Unbilled Reimbursables</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            When out-of-pocket project costs are not linked directly to your invoicing engine, billable client expenses slip through the cracks. Small business expense tracking software that connects to your invoices prevents this entirely.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6 font-black text-lg">
                            03
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">No Real-Time P&L Visibility</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            Waiting until quarter-end to reconcile costs means you never know your true burn rate. A connected P&L tracking software dashboard shows you real net profit on every active project in real time.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 4. THE 3-STEP NOBEVRA EXPENSE WORKFLOW ── */}
            <section className="bg-gradient-to-b from-white via-[#F5FCFF] to-white py-20 md:py-28 border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Sparkles className="w-4 h-4" />
                            How Nobevra Works
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            From Receipt Photo to Audit-Ready Tax Ledger in 3 Steps.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            An automated workflow designed to eliminate manual bookkeeping friction.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs relative">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <Camera className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 1</span>
                            <h3 className="text-xl font-bold text-near-black mt-1 mb-3">Snap & Extract via AI</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-4">
                                Take a photo of any receipt on your phone. Our neural OCR scanner automatically extracts vendor, date, taxes, and amount in under 2 seconds.
                            </p>
                            <Link href="/ai-receipt-scanner" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                Try AI Receipt Scanner <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs relative">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <Layers className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 2</span>
                            <h3 className="text-xl font-bold text-near-black mt-1 mb-3">Categorize & Link Invoice</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-4">
                                Assign the expense to a tax bracket (Software, Travel, Contractor) and optionally attach it as a billable cost to a client CRM profile.
                            </p>
                            <Link href="/crm" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                                View CRM Integration <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs relative">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                                <PieChart className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-amber-600">Step 3</span>
                            <h3 className="text-xl font-bold text-near-black mt-1 mb-3">Real-Time P&L Sync</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-4">
                                Expenses deduct automatically from incoming invoice revenue, updating your real-time net profit margins and 90-day cash runway chart.
                            </p>
                            <Link href="/cash-flow-analytics" className="text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline">
                                Cash Flow Analytics <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. CORE SPEND CAPABILITIES BENTO GRID ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-700 font-bold text-xs uppercase tracking-widest mb-4">
                        <Layers className="w-4 h-4" />
                        Feature Architecture
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Everything You Need to Command Business Spending.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Engineered to replace manual receipt logging, paper clutter, and disconnected accounting spreadsheets.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Bento 1: AI OCR */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <Camera className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">AI Receipt Scanner (OCR)</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Extract vendor names, transaction dates, tax totals, and line items instantly from smartphone photos and PDF receipts with 99.4% accuracy.
                            </p>
                        </div>
                        <Link href="/ai-receipt-scanner" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Try AI Scanner <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 2: Tax Categorization */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <Receipt className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Tax Deduction Categorization</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Automatically organize spending by standard tax write-off categories (Travel, Advertising, Software, Office, Legal) for audit-ready year-end reporting.
                            </p>
                        </div>
                        <Link href="/features/invoice-tax-calculator" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Explore Tax Engine <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 3: Direct Invoice Reimbursables */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Billable Invoice Linking</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Attach out-of-pocket project costs directly to client contracts or invoices. Never let a reimbursable travel or software cost go unbilled.
                            </p>
                        </div>
                        <Link href="/invoicing" className="text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline">
                            Invoicing Suite <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 4: P&L Runway */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-6">
                                <PieChart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Real-Time P&L Analytics</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                View real-time revenue vs. expense charts. Monitor your 90-day cash runway, gross margins, and operating burn rate at a single glance.
                            </p>
                        </div>
                        <Link href="/cash-flow-analytics" className="text-xs font-bold text-violet-600 flex items-center gap-1 hover:underline">
                            Cash Flow Analytics <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 5: Multi-Currency Ledgers */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Multi-Currency Tracking</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Record expenses in 30+ world currencies (USD, EUR, GBP, NGN, CAD) with automatic base currency conversion for international operations.
                            </p>
                        </div>
                        <Link href="/payments" className="text-xs font-bold text-cyan-600 flex items-center gap-1 hover:underline">
                            Multi-Currency Hub <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 6: Digital Audit Vault */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Encrypted Cloud Audit Vault</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                All receipt attachments are encrypted with 256-bit TLS and isolated with PostgreSQL Row-Level Security, ready for one-click export to your accountant.
                            </p>
                        </div>
                        <Link href="/security" className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                            Security Architecture <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {/* Bento 7: Products & Inventory COGS */}
                    <div className="bg-white p-8 rounded-3xl border border-noble-blue/20 shadow-sm flex flex-col justify-between col-span-1 md:col-span-3 lg:col-span-1">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Inventory & COGS Sync</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Expense tracking software that connects to your product inventory. Supplier purchase costs update your cost of goods sold (COGS) automatically — no manual accounting entry needed.
                            </p>
                        </div>
                        <Link href="/products-inventory" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Products & Inventory Hub <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 5b. COMPARISON TABLE ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-20">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                        <BarChart3 className="w-4 h-4" />
                        How Nobevra Compares
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-near-black mb-4">
                        Expense Tracking Software vs. Spreadsheets vs. Legacy Accounting Tools.
                    </h2>
                    <p className="text-base text-near-black/60 leading-relaxed">
                        Most small businesses outgrow spreadsheets quickly. Dedicated expense management software built for your workflow beats both alternatives on every dimension that affects cash flow and tax compliance.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
                    <table className="w-full min-w-[600px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left px-6 py-4 font-black text-near-black text-xs uppercase tracking-wider">Feature</th>
                                <th className="text-center px-6 py-4 font-black text-noble-blue text-xs uppercase tracking-wider">Nobevra</th>
                                <th className="text-center px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Spreadsheets</th>
                                <th className="text-center px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">QuickBooks / Xero</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                ['AI Receipt Scanner (OCR)', true, false, false],
                                ['Real-Time P&L Tracking Software', true, false, true],
                                ['Billable Expense → Invoice Linking', true, false, false],
                                ['Tax Deduction Categorization', true, false, true],
                                ['Business Expense Tracker (Free Plan)', true, true, false],
                                ['Inventory & COGS Integration', true, false, false],
                                ['Multi-Currency Expense Tracking', true, false, true],
                                ['Audit-Ready Digital Receipt Vault', true, false, false],
                            ].map(([feature, nobevra, sheet, legacy], i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                    <td className="px-6 py-4 font-medium text-near-black">{feature as string}</td>
                                    <td className="px-6 py-4 text-center">
                                        {nobevra ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {sheet ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {legacy ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pricing Reassurance Block */}
                <div className="mt-10 bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-lg font-black text-near-black mb-1">Start tracking business expenses free today.</p>
                        <p className="text-sm text-near-black/60">Nobevra Explorer plan is free forever. No credit card required. Upgrade only when you need more.</p>
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

            {/* ── 6. INFORMATION GAIN: THE REIMBURSABLE LEAKAGE FORMULA ── */}
            <section className="bg-slate-900 text-white py-20 md:py-28">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#01A0E2] font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                                <BarChart3 className="w-4 h-4" />
                                Information Gain Framework
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6">
                                The Reimbursable Leakage Formula: How Untracked Costs Drain 8–14% of Profit.
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed mb-6">
                                Service agencies and consultants frequently incur project-specific expenses: stock assets, specialized software licenses, travel fares, and sub-contractor fees.
                            </p>
                            <p className="text-slate-300 text-base leading-relaxed mb-8">
                                When expenses are recorded in a separate spreadsheet disconnected from your invoicing engine, an average of 11% of billable out-of-pocket costs never get invoiced to the client. Over a year, this leakage quietly drains thousands in net profit.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-3xl font-black text-rose-400 mb-1">-$4,800</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average Annual Unbilled Leakage</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-[#01A0E2] mb-1">100%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Reconciled via Nobevra Linking</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6">The 4-Step Audit-Proof Expense Protocol</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Capture Immediately at Point of Sale</h4>
                                        <p className="text-xs text-slate-400 mt-1">Snap physical receipts or forward digital confirmation emails the minute a purchase is made.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Tag Client & Billable Status</h4>
                                        <p className="text-xs text-slate-400 mt-1">Mark whether the expense is internal overhead or client-reimbursable with one click.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Auto-Populate Into Next Invoice</h4>
                                        <p className="text-xs text-slate-400 mt-1">Billable expenses automatically roll into the client draft invoice with receipts attached as proof.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">4</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Export Clean Tax Reports</h4>
                                        <p className="text-xs text-slate-400 mt-1">Generate categorized CSV and PDF ledger summaries for your accountant with zero tax-season panic.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. CONTRARIAN OPINION SECTION ── */}
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
                                    Why Waiting Until Tax Season to Log Receipts Destroys Business Margins.
                                </h2>

                                <div className="border-l-4 border-noble-blue pl-5 mb-8">
                                    <p className="text-white/70 text-sm sm:text-base leading-relaxed italic">
                                        &ldquo;Most business owners treat expense management as an annual compliance chore. They spend an entire weekend in April frantically typing old bank statements into a spreadsheet. By that point, $4,800 in missed deductions is already gone.&rdquo;
                                    </p>
                                </div>

                                <div className="space-y-5 mb-10">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Real-time visibility into project profitability</p>
                                            <p className="text-xs text-white/60 leading-relaxed">When you log at point of purchase, you see which clients are draining margins before the project ends — not after it is too late to reprice.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Catch operational cost creep before it compounds</p>
                                            <p className="text-xs text-white/60 leading-relaxed">A subscription you forgot to cancel, a vendor price increase, a team tool renewal — continuous expense tracking surfaces these instantly.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Zero-stress tax filing, every year</p>
                                            <p className="text-xs text-white/60 leading-relaxed">When your receipts are already categorized and stored in an audit-ready digital vault, tax season becomes a one-click export — not a three-weekend ordeal.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-near-black font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-lg text-base"
                                style={{ backgroundColor: '#01A0E2' }}
                            >
                                Start Tracking Expenses Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Right: Stats / Visual accent panel */}
                        <div className="bg-noble-blue/10 border-l border-white/5 p-10 sm:p-14 flex flex-col gap-8">
                            <div className="bg-slate-800/80 rounded-3xl p-8 border border-white/5">
                                <p className="text-xs font-black uppercase tracking-wider text-white/40 mb-4">The Annual Cost of Waiting</p>
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-sm text-white/70">Missed tax deductions</span>
                                        <span className="text-lg font-black text-rose-400">-$2,400</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-sm text-white/70">Unbilled client reimbursables</span>
                                        <span className="text-lg font-black text-rose-400">-$1,800</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-sm text-white/70">Accountant overtime charges</span>
                                        <span className="text-lg font-black text-rose-400">-$600</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-sm font-bold text-white">Total annual profit drain</span>
                                        <span className="text-2xl font-black text-rose-400">-$4,800</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-noble-blue/20 rounded-3xl p-8 border border-noble-blue/20">
                                <p className="text-xs font-black uppercase tracking-wider text-noble-blue mb-4">With Nobevra Continuous Tracking</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Every receipt captured at point of sale</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Tax categories auto-applied in real time</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Billable costs invoiced before project closes</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Audit-ready PDF export in one click</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-5 border-t border-noble-blue/20">
                                    <p className="text-3xl font-black text-noble-blue">$0 leaked</p>
                                    <p className="text-xs text-white/50 mt-1 font-medium uppercase tracking-wider">Total annual profit recovered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8. AUTHENTIC REVIEWS FROM VERIFIED FOUNDERS ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest mb-4">
                        <Sparkles className="w-4 h-4" />
                        Verified Founder Experiences
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4">
                        Trusted by Growing Businesses Worldwide.
                    </h2>
                    <p className="text-base text-near-black/60">
                        See how agencies, consultancies, and supply companies automate expense ledgers with Nobevra.
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

            {/* ── 9. DISQUALIFIER & FIT QUALIFICATION: UX PSYCHOLOGY ARCHITECTURE ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-widest mb-4 border border-slate-200">
                        <ShieldCheck className="w-4 h-4 text-noble-blue" />
                        Radical Candor & Fit Check
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4">
                        Is Nobevra Expense Management the Right Fit for You?
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
                                        <h4 className="font-bold text-sm text-near-black mb-1">Zero-Expense Personal Projects</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If you run a personal hobby blog with zero outgoing costs, no client billing, and no annual tax write-offs, dedicated spend tracking software adds unnecessary complexity.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">5,000+ Enterprise Corporate Card Hierarchies</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If you are a Fortune 500 company requiring physical corporate card fleet provisioning with 10-level executive signature approval chains, enterprise tools like SAP Concur are engineered for that scope.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">Heavy Double-Entry CPA Audit Suites</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If your priority is manual journal adjustments, asset depreciation ledger schedules, and complex corporate balance sheets, full enterprise ERP systems are better aligned.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-xs text-slate-400 font-medium">
                                Looking for other solutions? We recommend exploring enterprise ERP platforms for multi-tier global holding structures.
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
                                        <h4 className="font-bold text-sm text-white mb-1">Agencies, Consultancies & Contractors</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You incur project-specific out-of-pocket costs (travel, software licenses, contractors) and need to attach reimbursable expenses directly to client invoices to stop 8–14% profit leakage.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Founders Who Hate Manual Bookkeeping</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You want to snap a receipt photo on your phone, let AI neural OCR extract vendor and tax data in 2 seconds, and eliminate shoebox receipt clutter forever.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Real-Time P&L & Tax Maximization</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You need instant visibility into gross margins, operating burn rate, and audit-proof tax write-off categorization across 30+ currencies without waiting for quarterly accountant reports.
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

            {/* ── 10. COMPREHENSIVE FAQ SECTION (ACCORDION) ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                        <HelpCircle className="w-4 h-4" />
                        Frequently Answered Questions
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-4">
                        Common Questions About Expense Management.
                    </h2>
                    <p className="text-base text-near-black/60">
                        Everything you need to know about receipt scanning, tax deductions, and invoice linking.
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

            {/* ── 11. FINANCIAL KNOWLEDGE HUB & GUIDES ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
                <h3 className="text-2xl font-black text-near-black mb-8 text-center">Expense Tracking Guides, Tax Calculators & Financial Tools</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/ai-receipt-scanner" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">AI Tool</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">AI Receipt Scanner</h4>
                        <p className="text-xs text-slate-500">Scan physical receipts and export OCR data instantly.</p>
                    </Link>
                    <Link href="/cash-flow-analytics" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Analytics Suite</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Cash Flow & P&L Hub</h4>
                        <p className="text-xs text-slate-500">Track 90-day runway and operating gross margins.</p>
                    </Link>
                    <Link href="/invoicing" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Billing Engine</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Invoicing Software</h4>
                        <p className="text-xs text-slate-500">Link out-of-pocket expenses to customer invoices.</p>
                    </Link>
                    <Link href="/features/how-to-manage-business-cash-flow" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Financial Guide</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Manage Cash Flow</h4>
                        <p className="text-xs text-slate-500">Cost control, expense categorization & tax write-offs.</p>
                    </Link>
                </div>
            </section>

            {/* ── 12. FINAL CONVERSION CTA ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="bg-gradient-to-r from-slate-900 via-[#166FBB] to-slate-900 rounded-[36px] p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                            Take Total Control of Your Business Spending Today.
                        </h2>
                        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Join growing businesses who eliminate receipt clutter and maximize their tax write-offs with Nobevra. Start tracking expenses free in seconds.
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
                                href="/ai-receipt-scanner"
                                className="w-full sm:w-auto px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center"
                            >
                                Try AI Scanner Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
