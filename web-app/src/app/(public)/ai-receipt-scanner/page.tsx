import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import Footer from '@/components/shared/Footer';
import {
    Camera, Bot, Receipt, ShieldCheck, CheckCircle2, ChevronDown,
    Clock, TrendingDown, AlertTriangle, Star, ArrowRight, Zap, FileText, BarChart3, Play
} from 'lucide-react';

/* ── SEO Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'AI Receipt Scanner — Automate Business Expenses | NobleInvoice',
    description: 'Snap a photo of any receipt. Our AI receipt scanner extracts data in seconds—automate business expenses, track spending, and eliminate manual entry.',
    keywords: [
        'AI receipt scanner',
        'automate business expenses',
        'receipt to text AI',
        'expense tracker',
        'business accounting app',
        'automated bookkeeping solutions'
    ],
    openGraph: {
        title: 'AI Receipt Scanner — Automate Business Expenses | NobleInvoice',
        description: 'Snap a photo. Our AI does the rest. Extract, categorise, and track every business expense automatically.',
        url: 'https://nobleinvoice.com/receipt-scanner',
        type: 'website',
    },
};

/* ── Page Data ──────────────────────────────────────────────────── */
const steps = [
    {
        step: '01',
        icon: Camera,
        title: 'Snap or upload',
        desc: 'Take a photo on your phone or drag in a PDF. Works on crumpled, faded, or coffee-stained receipts.',
    },
    {
        step: '02',
        icon: Bot,
        title: 'AI reads it instantly',
        desc: 'Our Gemini-powered AI receipt scanner extracts vendor, date, amount, and tax in under 3 seconds.',
    },
    {
        step: '03',
        icon: Receipt,
        title: 'Auto-categorised',
        desc: 'Expenses are tagged to the right tax category automatically. No accounting knowledge required.',
    },
    {
        step: '04',
        icon: FileText,
        title: 'Stored and reportable',
        desc: 'Original images are archived for 7 years. Export any expense report in one click for tax season.',
    },
];

const features = [
    {
        icon: Bot,
        title: 'Gemini AI Vision Engine',
        desc: 'Not basic OCR. Our receipt to text AI understands context. It reads handwritten amounts, faded ink, and multi-language receipts from 40+ countries.',
        tag: 'Powered by Gemini',
    },
    {
        icon: BarChart3,
        title: 'Smart expense tracker dashboard',
        desc: 'See exactly where your money goes each month. Filter by category, vendor, or date range. Download your report as a CSV for your accountant.',
        tag: 'Expense Tracker',
    },
    {
        icon: ShieldCheck,
        title: 'Audit-ready cloud storage',
        desc: 'Every receipt image and extracted data is securely stored for 7 years. Full HMRC, IRS, and global tax-compliance out of the box.',
        tag: 'Compliance Ready',
    },
    {
        icon: Zap,
        title: 'Receipt to invoice in 2 taps',
        desc: 'Found a business expense? Convert it into a reimbursable invoice for a client immediately. The only business accounting app that connects scanning to billing.',
        tag: 'Unique to NobleInvoice',
    },
];

const stats = [
    { value: '99.8%', label: 'OCR accuracy rate', sublabel: 'Even on damaged receipts' },
    { value: '3 sec', label: 'Average extraction time', sublabel: 'From snap to structured data' },
    { value: '8 hrs', label: 'Saved per week', sublabel: 'By the average small business user' },
    { value: '40+', label: 'Languages supported', sublabel: 'Scan receipts from anywhere' },
];

const faqs = [
    {
        q: 'How accurate is the AI receipt scanner?',
        a: "Our AI receipt scanner achieves 99.8% accuracy across standard receipts. For challenging cases — faded ink, crumpled paper, or low-light photos — the accuracy is 96.4%. You can always manually correct any field in under 5 seconds.",
    },
    {
        q: 'Can I use this as a free expense tracker?',
        a: 'Yes. The core scanning and expense tracking features are free. You can scan up to 30 receipts per month on our Starter plan. Our Noble Pulse plan removes all limits and adds advanced reporting and team collaboration.',
    },
    {
        q: 'What file formats does the receipt scanner accept?',
        a: 'We accept JPG, PNG, WEBP, HEIC (iPhone photos), and PDF files. You can upload a single receipt or batch-upload up to 20 files at once.',
    },
    {
        q: 'Does it work for receipts in other languages?',
        a: 'Yes. The AI understands 40+ languages including Arabic, Mandarin, French, German, Spanish, Portuguese, and Yoruba. Amounts and dates are extracted and converted to your preferred currency automatically.',
    },
    {
        q: 'How long are receipts stored?',
        a: 'All original images and extracted data are stored for 7 years in encrypted cloud storage — meeting the requirements of HMRC (UK), the IRS (USA), FIRS (Nigeria), and most other tax authorities globally.',
    },
    {
        q: 'Can I connect this to my accounting software?',
        a: 'Expense data exports cleanly to CSV for import into QuickBooks, Xero, Wave, and Sage. Native integrations via API are available on the Noble Elite plan.',
    },
    {
        q: "Is this just an expense tracker or a full business accounting app?",
        a: "It's both — and more. NobleInvoice combines the receipt scanner with invoicing, CRM, payment collection, and financial reports. Think of it as the business accounting app that connects your income and your expenses in one place.",
    },
];

const reviews = [
    {
        quote: "Tracking media production expenses used to be a nightmare. The Smart Expense Manager categorizes everything automatically across our team, saving us hours each week.",
        name: "Beautrice Moreau",
        role: "Operations Manager, Eagles Media",
        image: "/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png",
    },
    {
        quote: "The Inventory Hub is a game changer for our agricultural supplies. Real-time stock tracking connected directly to invoicing prevents stockouts entirely.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
    {
        quote: "Standardizing our hospitality packages in the Products & Services Catalog has saved our reception desk hours of manual billing input.",
        name: "Priya Sharma",
        role: "Managing Director, Wavecreast Beach Hotel",
        image: "/images/reviews/priya-sharma-managing-director-wavecreast-beach-hotel.png",
    },
];

/* ── JSON-LD Schema Generators ──────────────────────────────────── */
const generateSoftwareSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NobleInvoice AI Receipt Scanner",
        "operatingSystem": "Web, iOS, Android",
        "applicationCategory": "BusinessApplication",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1284"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free starter plan available"
        }
    };
};

const generateFAQSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };
};

/* ── Component ──────────────────────────────────────────────────── */
export default function ReceiptScannerPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            {/* Inject JSON-LD */}
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareSchema()) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }} />

            {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
            <section className="relative pt-16 pb-28 overflow-hidden" aria-label="Hero">
                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: copy */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-near-black/5 shadow-sm text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Powered by Gemini AI Vision
                            </div>

                            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
                                The AI receipt scanner that actually{' '}
                                <span className="text-noble-blue">automates your expenses.</span>
                            </h1>

                            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-8 leading-relaxed">
                                Snap a photo. Done. Our AI reads the vendor, date, amount, and tax category in under 3 seconds — providing <strong>automated bookkeeping solutions</strong> for users exhausted by manual data entry.
                            </p>

                            {/* Trust avatars */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex -space-x-3">
                                    {[
                                        { bg: 'bg-noble-blue', text: 'BM' },
                                        { bg: 'bg-[#0599D5]', text: 'GE' },
                                        { bg: 'bg-primary', text: 'PS' },
                                        { bg: 'bg-[#166FBB]', text: 'RA' },
                                        { bg: 'bg-near-black', text: 'TK' },
                                    ].map((a, i) => (
                                        <div
                                            key={i}
                                            className={`w-9 h-9 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-sm`}
                                        >
                                            {a.text}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex gap-0.5 mb-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                                    </div>
                                    <p className="text-[11px] font-bold text-near-black/50">
                                        Trusted by <span className="text-near-black font-black">growing</span> businesses worldwide
                                    </p>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Link
                                    href="/register"
                                    className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                    style={{ backgroundColor: '#166FBB' }}
                                >
                                    Start scanning free
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                                >
                                    View pricing
                                </Link>
                            </div>
                            <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                                No credit card required · Free plan available · Cancel anytime
                            </p>
                        </div>

                        {/* Right: visual mockup card */}
                        <div className="relative z-10 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[480px]">
                                {/* Main card */}
                                <div className="bg-white rounded-[32px] shadow-[0_30px_80px_rgba(22,111,187,0.12)] border border-slate-100 p-8">
                                    {/* Mock receipt scan UI */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-noble-blue/10 rounded-xl flex items-center justify-center">
                                                <Camera className="w-5 h-5 text-noble-blue" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm">AI Receipt Scanner</p>
                                                <p className="text-[10px] text-slate-400 font-medium">Gemini Vision Engine</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                            Extracted ✓
                                        </span>
                                    </div>

                                    {/* Extracted data visual */}
                                    <div className="bg-slate-50 rounded-2xl p-5 mb-5 space-y-4">
                                        {[
                                            { label: 'Vendor', value: 'Staples Office Supplies' },
                                            { label: 'Date', value: 'July 3, 2026' },
                                            { label: 'Amount', value: '$148.72' },
                                            { label: 'Tax', value: '$13.52 (VAT 10%)' },
                                            { label: 'Category', value: 'Office Supplies' },
                                        ].map((row) => (
                                            <div key={row.label} className="flex items-center justify-between">
                                                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{row.label}</span>
                                                <span className="text-sm font-black text-slate-900">{row.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action buttons row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 bg-noble-blue/8 rounded-xl px-3 py-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-noble-blue shrink-0" />
                                            <span className="text-xs font-bold text-noble-blue">Saved to expenses</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2.5">
                                            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span className="text-xs font-bold text-emerald-700">Invoice ready</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge: speed */}
                                <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-slate-900">Extracted in 2.8s</p>
                                        <p className="text-[9px] text-slate-400 font-medium">99.8% accuracy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. STATS BAR ═════════════════════════════════════════════ */}
            <section className="py-16 bg-white border-y border-slate-100" aria-label="Key metrics">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((s) => (
                        <div key={s.value} className="text-center">
                            <p className="font-inter font-black text-[40px] md:text-[48px] text-noble-blue leading-none mb-2">{s.value}</p>
                            <p className="font-black text-slate-900 text-sm mb-1">{s.label}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{s.sublabel}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ 2.5 INTEGRATIONS BAND ════════════════════════════════════ */}
            <section className="py-10 bg-slate-50 border-b border-slate-100" aria-label="Integrations & Security">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                        Bank-Grade Security & Seamless Accounting Sync
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-slate-700" />
                            <span className="font-black text-slate-700 text-sm">SOC-2 Type II</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-slate-700 text-white flex items-center justify-center rounded-sm font-black text-[10px]">Q</div>
                            <span className="font-black text-slate-700 text-sm">QuickBooks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-500 text-white flex items-center justify-center rounded-full font-black text-[10px]">X</div>
                            <span className="font-black text-slate-700 text-sm">Xero Sync</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-emerald-500 text-white flex items-center justify-center rounded-sm font-black text-[10px]">$</div>
                            <span className="font-black text-slate-700 text-sm">Sage Compatible</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-slate-900 text-white flex items-center justify-center rounded-full font-black text-[10px]">256</div>
                            <span className="font-black text-slate-700 text-sm">AES Encryption</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. PROBLEM SECTION ═══════════════════════════════════════ */}
            <section className="py-28 relative" aria-labelledby="problem-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Problem cards */}
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: Clock, color: 'text-red-500 bg-red-50', title: "You're losing 8 hours a week", body: "The average business owner spends 8 hours per week manually entering expenses into spreadsheets. That's one full work day — every single week — doing nothing that grows your business." },
                                { icon: TrendingDown, color: 'text-orange-500 bg-orange-50', title: 'Missed deductions cost you thousands', body: 'When receipts pile up and data entry is painful, you skip it. The average small business misses £3,200 in tax deductions annually because of poor expense tracking.' },
                                { icon: AlertTriangle, color: 'text-amber-500 bg-amber-50', title: 'Tax time becomes a crisis', body: "Scrambling to reconstruct 12 months of expenses in January is stressful, expensive (accountant overtime), and often inaccurate. It does not have to work this way." },
                            ].map((p) => (
                                <div key={p.title} className="flex gap-5 p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`shrink-0 w-11 h-11 ${p.color} rounded-xl flex items-center justify-center`}>
                                        <p.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 text-base mb-1">{p.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{p.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Copy */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-red-100">
                                The real cost of manual entry
                            </div>
                            <h2 id="problem-heading" className="font-inter font-black text-[28px] md:text-[40px] text-near-black leading-[1.1] tracking-tight mb-6">
                                Most businesses are{' '}
                                <span className="text-noble-blue">paying a hidden tax</span>{' '}
                                on their own time.
                            </h2>
                            <p className="text-base text-near-black/60 leading-relaxed mb-6">
                                Manual expense tracking isn't just annoying. It's expensive. Every hour spent entering data is an hour not spent on clients, growth, or anything that actually matters.
                            </p>
                            <p className="text-base text-near-black/60 leading-relaxed mb-8">
                                The businesses that win are the ones that automate business expenses early — before it becomes a system that's too painful to fix.
                            </p>
                            <div className="p-5 bg-noble-blue/5 border border-noble-blue/10 rounded-2xl">
                                <p className="text-sm font-black text-slate-900 mb-1">Our honest take:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">If you're billing under £5k/month, a spreadsheet is fine. Once you cross that threshold, manual expense tracking will start costing you more than the tool to fix it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. HOW IT WORKS + VIDEO PLACEHOLDER ══════════════════════════════════════════ */}
            <section className="py-28 bg-white" aria-labelledby="process-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8">
                            How the AI receipt scanner works
                        </div>
                        <h2 id="process-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight mb-6">
                            From paper receipt to expense report{' '}
                            <span className="text-noble-blue">in under 30 seconds.</span>
                        </h2>
                        <p className="text-base text-near-black/60 leading-relaxed">
                            Four steps. Zero spreadsheets. No accounting background required.
                        </p>
                    </div>

                    {/* Video Placeholder */}
                    <div className="mb-20 max-w-4xl mx-auto">
                        <div className="relative w-full aspect-video bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 group cursor-pointer">
                            {/* Dummy thumbnail styling */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-noble-blue/20 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                                </div>
                                <p className="mt-4 font-bold text-white tracking-widest uppercase text-xs">See it in action</p>
                            </div>
                            <div className="w-full h-full bg-slate-800 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((s, i) => (
                            <div key={s.step} className="relative p-8 rounded-[28px] bg-slate-50 border border-slate-100 hover:border-noble-blue/30 hover:shadow-xl hover:shadow-noble-blue/5 transition-all group">
                                <span className="absolute top-6 right-6 font-black text-[40px] text-slate-100 leading-none select-none">{s.step}</span>
                                <div className="w-12 h-12 bg-noble-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-noble-blue group-hover:scale-110 transition-all">
                                    <s.icon className="w-6 h-6 text-noble-blue group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-black text-slate-900 text-lg mb-3">{s.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center z-10 shadow-sm">
                                        <ArrowRight className="w-3 h-3 text-slate-400" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. FEATURES ══════════════════════════════════════════════ */}
            <section className="py-28 relative" aria-labelledby="features-heading">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-noble-blue/4 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8">
                            Receipt to text AI — what's included
                        </div>
                        <h2 id="features-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight mb-6">
                            More than a scanner.{' '}
                            <span className="text-noble-blue">A complete expense tracker.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((f) => (
                            <div key={f.title} className="p-10 bg-white rounded-[32px] border border-slate-100 hover:border-noble-blue/20 hover:shadow-[0_20px_60px_rgba(22,111,187,0.08)] transition-all group flex gap-7">
                                <div className="shrink-0 w-14 h-14 bg-noble-blue/8 rounded-2xl flex items-center justify-center group-hover:bg-noble-blue group-hover:scale-110 transition-all">
                                    <f.icon className="w-7 h-7 text-noble-blue group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <span className="inline-flex px-2.5 py-0.5 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">{f.tag}</span>
                                    <h3 className="font-black text-slate-900 text-xl mb-3">{f.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. INFORMATION GAIN: The Hidden Cost of OCR Apps ════════ */}
            <section className="py-28 bg-white" aria-labelledby="compare-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] uppercase tracking-widest mb-8 border border-amber-100">
                                What competitors don't tell you
                            </div>
                            <h2 id="compare-heading" className="font-inter font-black text-[28px] md:text-[40px] text-near-black leading-[1.1] tracking-tight mb-6">
                                Basic OCR apps read receipts.{' '}
                                <span className="text-noble-blue">We close the loop.</span>
                            </h2>
                            <p className="text-base text-near-black/60 leading-relaxed mb-6">
                                Most "AI receipt scanners" stop at extraction. They hand you a text file and leave the filing, categorisation, reporting, and invoicing to you. That's still manual work.
                            </p>
                            <p className="text-base text-near-black/60 leading-relaxed mb-8">
                                NobleInvoice connects your expense tracker directly to your client invoices. If you spend $150 on supplies for a project, you can turn that receipt into a reimbursable client invoice in two taps.
                            </p>
                            <div className="space-y-3">
                                {[
                                    'Scan → auto-categorised → stored → reportable',
                                    'Convert any expense into a billable client invoice',
                                    'Full audit trail without touching a spreadsheet',
                                    'Works offline — syncs when connected',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-sm font-bold text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Comparison table */}
                        <div className="bg-slate-50 rounded-[32px] border border-slate-100 overflow-hidden">
                            <div className="grid grid-cols-3 bg-slate-900 text-white px-6 py-4">
                                <div className="text-[11px] font-black uppercase tracking-wider">Feature</div>
                                <div className="text-[11px] font-black uppercase tracking-wider text-center">Basic OCR Apps</div>
                                <div className="text-[11px] font-black uppercase tracking-wider text-center text-noble-blue">NobleInvoice</div>
                            </div>
                            {[
                                { feature: 'Receipt extraction', basic: '✓', noble: '✓' },
                                { feature: 'Auto-categorisation', basic: 'Partial', noble: '✓' },
                                { feature: 'Multi-language receipts', basic: '✗', noble: '✓ 40+ langs' },
                                { feature: '7-year audit storage', basic: '✗', noble: '✓' },
                                { feature: 'Expense → invoice', basic: '✗', noble: '✓ Unique' },
                                { feature: 'Client billing built-in', basic: '✗', noble: '✓ Full suite' },
                                { feature: 'Free tier available', basic: 'Limited', noble: '✓ Generous' },
                            ].map((row, i) => (
                                <div key={row.feature} className={`grid grid-cols-3 px-6 py-4 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                    <div className="text-sm font-bold text-slate-700">{row.feature}</div>
                                    <div className="text-sm text-center text-slate-400 font-medium">{row.basic}</div>
                                    <div className="text-sm text-center text-noble-blue font-black">{row.noble}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 7. SOCIAL PROOF / TESTIMONIALS ══════════════════════════ */}
            <section className="py-28 bg-gradient-to-b from-[#F0F9FF] to-white" aria-labelledby="reviews-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8">
                            Real results from real businesses
                        </div>
                        <h2 id="reviews-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight">
                            Teams that stopped{' '}
                            <span className="text-noble-blue">drowning in receipts.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.map((r) => (
                            <div key={r.name} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-noble-blue/5 transition-all">
                                <div className="flex gap-0.5 mb-6">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <blockquote className="text-slate-700 font-medium leading-relaxed mb-8 text-sm">"{r.quote}"</blockquote>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={r.image}
                                        alt={`${r.name} — ${r.role}`}
                                        width={44}
                                        height={44}
                                        className="w-11 h-11 rounded-full object-cover border-2 border-slate-100"
                                    />
                                    <div>
                                        <p className="font-black text-slate-900 text-sm">{r.name}</p>
                                        <p className="text-[11px] text-slate-400 font-medium">{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 8. NOT FOR YOU SECTION ═══════════════════════════════════ */}
            <section className="py-20 bg-white" aria-label="Qualifier">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <div className="bg-slate-50 rounded-[32px] border border-slate-100 p-10">
                        <h2 className="font-inter font-black text-[24px] md:text-[32px] text-near-black mb-6">
                            We may not be right for you if…
                        </h2>
                        <ul className="space-y-4">
                            {[
                                'You have fewer than 5 receipts per month (a spreadsheet is honestly fine)',
                                "You need deep double-entry accounting — you'll want Xero or QuickBooks for that",
                                'Your accountant manages all expenses and you have no desire to see the data yourself',
                                'You are looking for a free tool with no paid features, ever',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-black mt-0.5">✗</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <p className="text-sm text-slate-500 font-medium">
                                If none of those apply to you —{' '}
                                <Link href="/register" className="text-noble-blue font-black hover:underline">
                                    NobleInvoice is built for exactly what you need.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 9. FAQ ═══════════════════════════════════════════════════ */}
            <section className="py-28" aria-labelledby="faq-heading">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8">
                            Common questions
                        </div>
                        <h2 id="faq-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight">
                            AI receipt scanner{' '}
                            <span className="text-noble-blue">FAQs</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 10. SOFT CTA ════════════════════════════════════════════ */}
            <section className="py-28 relative overflow-hidden bg-white" aria-label="Final CTA">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-blue/5 border border-noble-blue/10 text-blue-800 font-black text-[10px] uppercase tracking-[0.3em] mb-12">
                        Automate your expense tracking
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                        Your receipts are piling up. <br />
                        <span className="text-noble-blue">Fix it in 60 seconds.</span>
                    </h2>
                    <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto font-bold leading-relaxed">
                        Start with our free plan. Scan your first receipt today and see exactly how the AI receipt scanner works before you spend a penny.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                        <Link
                            href="/register"
                            className="bg-noble-blue text-white px-12 py-6 text-xl font-black rounded-[24px] hover:bg-noble-blue/90 hover:scale-105 transition-all shadow-2xl shadow-noble-blue/30 flex items-center gap-3"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Start scanning free
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                        <Link
                            href="/login"
                            className="text-slate-900/60 hover:text-slate-900 transition-colors text-xl font-black underline underline-offset-8 decoration-noble-blue/30"
                        >
                            Already a member? Log in
                        </Link>
                    </div>
                    <p className="mt-8 text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                        No credit card required · Free plan available · Cancel anytime
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}

/* ── FAQ Accordion (client-side interactivity via details/summary) ─ */
function FAQItem({ faq }: { faq: { q: string; a: string } }) {
    return (
        <details className="group bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4">
                <span className="font-black text-slate-900 text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                {faq.a}
            </div>
        </details>
    );
}
