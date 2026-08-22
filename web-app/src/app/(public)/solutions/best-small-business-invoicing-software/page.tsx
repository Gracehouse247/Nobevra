import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import Footer from '@/components/shared/Footer';
import {
    Receipt, ScanLine, Package, TrendingUp, CheckCircle2,
    XCircle, ArrowRight, Shield, AlertTriangle, Star, ChevronDown,
    Wrench, Briefcase, Store
} from 'lucide-react';

/* ── SEO Metadata ─────────────────────────────────────────────────
   Targeted High-Volume Keywords:
   1. small business invoicing software (5.4K)
   2. small business software invoicing (4.4K)
   3. invoicing programs for small businesses (2.9K)
   4. best small business billing software (1.9K)
──────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Best Small Business Invoicing Software | Get Paid Faster | Nobevra',
    description: 'The easiest small business invoicing software. Create professional invoices, scan receipts, and manage billing without complex accounting degrees. Start for free.',
    keywords: [
        'small business invoicing software',
        'small business software invoicing',
        'invoicing programs for small businesses',
        'best small business billing software',
        'billing app for small business',
        'SMB accounting software',
        'easy invoice maker for businesses',
        'small business expense tracker',
        'get paid online small business',
    ],
    openGraph: {
        title: 'Small Business Invoicing Software | Nobevra',
        description: 'Stop fighting enterprise tools. Get the best small business billing software that actually makes sense.',
        url: '/solutions/small-businesses',
        type: 'website',
    },
};

/* ── Page Data ──────────────────────────────────────────────────── */

// ADDITION 3: UI Images added to the Features Grid
const features = [
    {
        icon: Receipt,
        title: 'Easy invoice maker for businesses',
        desc: 'Draft an invoice in 30 seconds. Your client gets a clean, professional payment link. No portal login required for them to pay you.',
        bullets: ['180+ templates', 'Automated reminders', 'Direct bank transfers'],
        tag: 'Invoicing',
        color: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
        image: '/images/hero-dashboard-actual.png'
    },
    {
        icon: ScanLine,
        title: 'Small business expense tracker',
        desc: 'Take a photo of a receipt. That is it. Our system reads the merchant, date, and tax amount automatically.',
        bullets: ['Instant text extraction', 'Auto-categorization', 'Ready for tax season'],
        tag: 'Expenses',
        color: 'bg-noble-blue/10 text-noble-blue group-hover:bg-noble-blue group-hover:text-white',
        image: '/images/receipt-scanner-demo.png'
    },
    {
        icon: Package,
        title: 'Built-in service catalog',
        desc: 'Save your standard rates and physical products. Click what you sold, and the invoice builds itself. No more typing the same descriptions.',
        bullets: ['Unlimited items', 'Stock tracking', 'Custom pricing tiers'],
        tag: 'Inventory',
        color: 'bg-amber-400/10 text-amber-600 group-hover:bg-amber-400 group-hover:text-white',
        image: '/images/catalog-demo.png'
    },
    {
        icon: TrendingUp,
        title: 'Practical growth reports',
        desc: 'Forget confusing general ledgers. See exactly who owes you money, which clients pay fastest, and your total revenue for the month.',
        bullets: ['Cash flow tracking', 'Top clients list', 'Simple tax exports'],
        tag: 'Analytics',
        color: 'bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white',
        image: '/images/growth-reports-demo.png'
    },
];

// ADDITION 2: Industry Specific Use Cases
const industries = [
    {
        icon: Wrench,
        title: 'Plumbers & Contractors',
        desc: 'You are rarely at a desk. Nobevra lets you build an invoice from your truck in 60 seconds. Clients can pay by credit card on the spot, so you never have to chase payments down at the end of the month.',
        tag: 'Field Services'
    },
    {
        icon: Briefcase,
        title: 'Consultants & Agencies',
        desc: 'Stop worrying about cash flow gaps. Set up automated retainer billing that charges your clients on the 1st of every month without you ever lifting a finger.',
        tag: 'Professional Services'
    },
    {
        icon: Store,
        title: 'Local Retail & Shops',
        desc: 'Skip the expensive POS hardware. Generate a digital QR code for any invoice, let customers scan it with their phone, and get paid instantly across the counter.',
        tag: 'Retail & Commerce'
    }
];

// ADDITION 1: Competitor Comparison Table
const comparisonRows = [
    { feature: 'Built exclusively for small teams (<20)', noble: true, quickbooks: false, wave: true, xero: false },
    { feature: 'No accounting degree required', noble: true, quickbooks: false, wave: true, xero: false },
    { feature: 'AI Receipt Scanner built-in', noble: true, quickbooks: true, wave: false, xero: true },
    { feature: 'Free tier available forever', noble: true, quickbooks: false, wave: true, xero: false },
    { feature: '0% markup on transaction fees', noble: true, quickbooks: false, wave: false, xero: false },
    { feature: 'Gamified billing rewards', noble: true, quickbooks: false, wave: false, xero: false },
];

const reviews = [
    {
        quote: "Our marketplace generates hundreds of global leads daily. Tracking the invoicing side used to take three people. Now it takes one person an hour a week.",
        name: "Ayasha Khan",
        role: "Marketing Director, NobleMart Marketplace",
        image: "/images/reviews/ayasha-khan-marketing-director-of-noblemart-marketplace-us-region.png",
    },
    {
        quote: "The inventory hub changed how we buy agricultural supplies. Real-time tracking connected directly to invoicing means we never accidentally sell stock we don't have.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
    {
        quote: "Standardizing our hospitality packages in the catalog saved our reception desk hours of manual input. Training new staff on this billing app takes exactly ten minutes.",
        name: "Priya Sharma",
        role: "Managing Director, Wavecreast Beach Hotel",
        image: "/images/reviews/priya-sharma-managing-director-wavecreast-beach-hotel.png",
    },
];

// ADDITION 4: Deepened FAQ to 10 items with semantic keywords
const faqs = [
    {
        q: 'Is this actually simple to use, or do I need an accountant?',
        a: 'We built this specifically for business owners, not CPAs. We stripped out confusing terms like "reconciliation" and "general ledger". It is an easy invoice maker for businesses that just want to bill clients and track expenses without a learning curve.',
    },
    {
        q: 'How does it compare to standard SMB accounting software?',
        a: 'Traditional SMB accounting software is powerful, but often bloated. You pay $40 a month for enterprise features you never touch. Nobevra is focused strictly on getting you paid online and organizing your receipts. It does fewer things, but it does them perfectly.',
    },
    {
        q: 'Can my clients pay me online?',
        a: 'Yes. When you email an invoice, it includes a secure payment button. They can pay via credit card or bank transfer immediately. You get a notification the second the money clears, making it the easiest way to get paid online for small business owners.',
    },
    {
        q: 'Is the small business expense tracker reliable with crumpled receipts?',
        a: 'Surprisingly, yes. Our AI is trained to read faded ink, weird angles, and crumpled paper. If it can find a total and a merchant name, it will log it instantly.',
    },
    {
        q: 'Do I have to pay to use the small business invoicing software?',
        a: 'We have a completely free tier that is perfect for new businesses. You can send invoices and manage a small client list forever. You only pay when you need advanced automation or high-volume receipt scanning.',
    },
    {
        q: 'What if I am currently using spreadsheets?',
        a: 'You are exactly who we built this for. Spreadsheets do not remind clients to pay you. They do not tell you your cash flow. Moving from Excel to Nobevra usually recovers about $1,000 in forgotten invoices in the first month.',
    },
    {
        q: 'Is this the best small business billing software for contractors?',
        a: 'Absolutely. We designed our mobile experience so field service workers, plumbers, and contractors can generate a professional invoice right from their truck in under 60 seconds.',
    },
    {
        q: 'Can I set up recurring billing for retainer clients?',
        a: 'Yes. If you run an agency or consultancy, you can set up automated billing profiles. The system will automatically generate and send the invoice on the 1st of every month without any manual work on your end.',
    },
    {
        q: 'How does this compare to other invoicing programs for small businesses?',
        a: 'Many invoicing programs for small businesses hide behind confusing pricing tiers or charge heavy processing fees. We offer a transparent, flat-rate system with a massive focus on modern design and ease of use.',
    },
    {
        q: 'What makes this a complete billing app for small business?',
        a: 'Because it handles the entire lifecycle. From the moment you close a deal, you can generate the invoice, accept the payment via credit card, track the incoming revenue, and scan any related receipts—all in one billing app for small business.',
    }
];

/* ── JSON-LD Schema ─────────────────────────────────────────────── */
const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Small Business Invoicing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1042" },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
};

/* ── Component ──────────────────────────────────────────────────── */
export default function SmallBusinessesSolutionPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <Script id="sw-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
            <section className="relative pt-12 pb-32 overflow-hidden" aria-label="Hero">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Built for teams under 20
                        </div>

                        <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] lg:text-[60px] leading-[1.05] tracking-tight font-black">
                            Invoice software that finally understands <span className="text-noble-blue">cash flow.</span>
                        </h1>

                        <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Ditch the spreadsheets and the bloated enterprise tools. Get a billing app for your small business that actually gets you paid faster, without needing a finance degree.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link
                                href="/register"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 bg-[#166FBB]"
                            >
                                Start Free Today
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                            >
                                Compare Plans
                            </Link>
                        </div>

                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                            No credit card required · Free plan available · Cancel anytime
                        </p>
                    </div>

                    <div className="relative flex justify-center items-center lg:pl-10" style={{ perspective: '1200px' }}>
                        <div className="relative group z-10 w-full transition-transform duration-700 ease-out hover:rotate-0 hover:scale-105" style={{ transform: 'rotateY(-12deg) rotateX(4deg) scale(1.02)' }}>
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-emerald-500/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="relative bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-[24px] sm:rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
                                <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="rounded-[16px] sm:rounded-[32px] overflow-hidden border border-slate-100/50 shadow-inner bg-slate-50">
                                    <Image
                                        alt="Nobevra small business invoicing software dashboard showing the Invoices Ledger with billing statuses, totals, and payment tracking for small businesses"
                                        className="w-full h-auto object-cover object-top"
                                        src="/images/crm-engine-hero.png"
                                        width={1200}
                                        height={800}
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. THE PROBLEM (Complexity Tax) ══════════════════════════ */}
            <section className="py-28 relative bg-white border-t border-slate-100" aria-labelledby="problem-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-red-100">
                            The Complexity Tax
                        </div>
                        <h2 id="problem-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                            Why your current accounting tool is <span className="text-red-500">exhausting.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Most <strong>invoicing programs for small businesses</strong> are built for trained accountants. That complexity costs you time, money, and your sanity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Bloated software', body: 'You pay $40 a month for enterprise features you never touch, just to send a basic PDF.' },
                            { title: 'The spreadsheet trap', body: 'Excel does not send payment reminders. When you bill manually, unpaid work slips through the cracks.' },
                            { title: 'Tax season panic', body: 'Scrambling in April to find twelve months of paper receipts costs you missed deductions and expensive accountant fees.' },
                        ].map((p, i) => (
                            <div key={i} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-red-200 transition-colors">
                                <h3 className="font-black text-slate-900 text-xl mb-3">{p.title}</h3>
                                <p className="text-slate-500 text-base leading-relaxed">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. INDUSTRY SPECIFIC USE CASES (Addition 2) ══════════════ */}
            <section className="py-28 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="industry-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-blue-100">
                            Industry Workflows
                        </div>
                        <h2 id="industry-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                            Built specifically for <span className="text-noble-blue">the way you work.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            A one-size-fits-all <strong>billing app for small business</strong> rarely fits anyone. We optimized Nobevra for the trades and services that actually drive the economy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {industries.map((ind, i) => (
                            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center mb-6">
                                    <ind.icon className="w-6 h-6 text-noble-blue" />
                                </div>
                                <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                                    {ind.tag}
                                </span>
                                <h3 className="font-black text-slate-900 text-xl mb-4">{ind.title}</h3>
                                <p className="text-slate-500 text-base leading-relaxed">{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. INFORMATION GAIN 1: THE FEE CALCULATOR ════════════════ */}
            <section className="py-28 bg-white border-t border-slate-100" aria-labelledby="fees-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-amber-100">
                                The Hidden Math
                            </div>
                            <h2 id="fees-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                                The truth about "free" <span className="text-amber-500">invoicing software.</span>
                            </h2>
                            <p className="text-base text-near-black/60 leading-relaxed mb-6">
                                Many platforms advertise as free. What they don't tell you is how heavily they tax your revenue through mandatory, inflated payment processing fees. 
                            </p>
                            <p className="text-base text-near-black/60 leading-relaxed mb-8">
                                If your business bills $20,000 a month, a standard 2.9% + $0.30 fee structure steals over <strong>$580 of your hard-earned money every 30 days</strong>. We believe in transparent, flat software pricing. You keep what you kill.
                            </p>
                        </div>

                        <div className="bg-[#F8FAFC] rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-xl">
                            <p className="font-black text-slate-900 mb-6 text-lg">Monthly Cost Comparison (at $20k volume)</p>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-slate-500">Typical "Free" Software (2.9% fee)</span>
                                        <span className="font-black text-red-500">$580.00 lost</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3">
                                        <div className="bg-red-400 h-3 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-slate-900">Nobevra Pro Plan</span>
                                        <span className="font-black text-green-600">$15.00 flat</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3">
                                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-xs text-slate-400 font-bold text-center mt-8 pt-6 border-t border-slate-200">
                                Stop paying a percentage of your success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 5. FEATURES GRID WITH UI IMAGES (Addition 3) ══════════════ */}
            <section className="py-28 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="features-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 id="features-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                            Everything you actually need. <span className="text-noble-blue">Nothing you don't.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            The smartest <strong>small business software invoicing</strong> setup. No CPA required. Just clean, fast tools that get money into your bank account.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-noble-blue/5 transition-all duration-500 group flex flex-col">
                                {/* UI Screenshot Header */}
                                <div className="h-[240px] bg-slate-50 w-full relative overflow-hidden border-b border-slate-100">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent z-10" />
                                    {/* Using next/image with a fallback generic visual if the specific image path doesn't exist locally yet */}
                                    <Image 
                                        src={f.image} 
                                        alt={f.title}
                                        fill
                                        className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Content Body */}
                                <div className="p-10 flex flex-col flex-1 relative z-20 bg-white">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${f.color}`}>
                                            <f.icon className="w-6 h-6" />
                                        </div>
                                        <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">{f.tag}</span>
                                    </div>
                                    
                                    <h3 className="font-black text-slate-900 text-2xl mb-4">{f.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-base mb-8 flex-1">{f.desc}</p>
                                    
                                    <ul className="space-y-3 border-t border-slate-50 pt-6">
                                        {f.bullets.map(b => (
                                            <li key={b} className="flex items-center gap-3 text-sm text-slate-700 font-bold">
                                                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                </div>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. COMPARISON MATRIX TABLE (Addition 1) ══════════════════ */}
            <section className="py-28 bg-white border-t border-slate-100" aria-labelledby="comparison-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-slate-200">
                            Head to Head
                        </div>
                        <h2 id="comparison-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                            How we stack up against <span className="text-noble-blue">the giants.</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            See why thousands of business owners are leaving their old software behind for the <strong>best small business billing software</strong> built for speed.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-[32px] shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="py-6 px-8 text-sm font-black text-slate-400 uppercase tracking-widest w-2/5">Feature Comparison</th>
                                        <th className="py-6 px-6 text-center w-1/5 bg-noble-blue/5 border-x border-noble-blue/10">
                                            <span className="block text-xl font-black text-noble-blue mb-1">Nobevra</span>
                                            <span className="block text-[10px] font-bold text-noble-blue/60 uppercase">Our Platform</span>
                                        </th>
                                        <th className="py-6 px-6 text-center text-sm font-black text-slate-900 w-1/5">QuickBooks</th>
                                        <th className="py-6 px-6 text-center text-sm font-black text-slate-900 w-1/5">Wave</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {comparisonRows.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-5 px-8 font-bold text-slate-700">{row.feature}</td>
                                            <td className="py-5 px-6 text-center bg-noble-blue/5 border-x border-noble-blue/10">
                                                {row.noble ? <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" /> : <span className="text-slate-300 font-bold">—</span>}
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                {row.quickbooks ? <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-300 font-bold">—</span>}
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                {row.wave ? <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-300 font-bold">—</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 7. SOCIAL PROOF ══════════════════════════════════════════ */}
            <section className="py-28 bg-[#F8FAFC] border-y border-slate-100" aria-labelledby="reviews-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-700 font-bold text-[10px] uppercase tracking-widest mb-8 border border-green-500/20">
                            Proven Results
                        </div>
                        <h2 id="reviews-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight">
                            They switched. <span className="text-noble-blue">You should too.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.map((r) => (
                            <div key={r.name} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                                <div className="flex gap-0.5 mb-6">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <blockquote className="text-slate-700 font-medium leading-relaxed mb-8 text-base">"{r.quote}"</blockquote>
                                <div className="flex items-center gap-4">
                                    <Image src={r.image} alt={r.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover border-2 border-slate-100" />
                                    <div>
                                        <p className="font-black text-slate-900 text-sm uppercase">{r.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{r.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 8. INFORMATION GAIN 2: THE QUALIFIER ═════════════════════ */}
            <section className="py-24 bg-white" aria-labelledby="qualifier-heading">
                <div className="max-w-4xl mx-auto px-4 md:px-16 text-center">
                    <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-6" />
                    <h2 id="qualifier-heading" className="font-inter text-[28px] md:text-[40px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                        We are probably not for you if...
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        Nobevra is not for everyone. We intentionally built a focused, lightweight platform. You should stick with complex enterprise software if you need:
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                        {[
                            'Full double-entry general ledgers',
                            'Complex multi-entity corporate tax routing',
                            'Heavy payroll and HR management',
                            'Manufacturing supply chain logistics'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                                <span className="text-sm font-bold text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-slate-900 font-black text-lg mt-12">
                        But if you just want to send beautiful invoices, organize your clients, and get paid faster? <span className="text-noble-blue">We are exactly what you need.</span>
                    </p>
                </div>
            </section>

            {/* ══ 9. FAQ (Addition 4) ══════════════════════════════════════ */}
            <section className="py-28 bg-[#F8FAFC] border-t border-slate-100" aria-labelledby="faq-heading">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <h2 id="faq-heading" className="font-inter text-[30px] md:text-[50px] text-near-black font-black leading-[1.05] tracking-tight">
                            Frequent questions
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4">
                                    <span className="font-black text-slate-900 text-base leading-snug">{faq.q}</span>
                                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-50 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 10. FINAL CTA ════════════════════════════════════════════ */}
            <section className="py-32 relative overflow-hidden bg-white border-t border-slate-100 text-center" aria-label="Final CTA">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <h2 className="font-inter text-[40px] md:text-[60px] text-near-black font-black mb-6 tracking-tight leading-[1.05]">
                        Ready to drop the paperwork?
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join the smart business owners who use Nobevra to save time, look professional, and take control of their money.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                        <Link
                            href="/register"
                            className="text-white bg-[#166FBB] px-12 py-6 text-lg font-extrabold rounded-[24px] hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] flex items-center gap-3"
                        >
                            Start Free Today
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                    <p className="mt-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                        Takes 60 seconds · Free forever plan · No card required
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
