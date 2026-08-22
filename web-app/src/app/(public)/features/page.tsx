'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { 
    FileText, Zap, Sparkles, ShoppingBag, 
    Users, Shield, Target, Lock, 
    ScanLine, Package, LineChart, Globe, Smartphone,
    ArrowRight, CheckCircle2, Star, ChevronDown, 
    XCircle, Palette, Contact, Building2, QrCode, LayoutGrid
} from 'lucide-react';
import Footer from '@/components/shared/Footer';

/* ── DATA: THE 19 FEATURES ──────────────────────────────────────── */
const featureCategories = [
    {
        title: "Invoicing & Billing Suite",
        description: "The complete invoice automation software stack to get paid faster.",
        features: [
            { title: "Free Invoice Generator", desc: "Create and download a professional PDF invoice in 30 seconds. No signup required.", icon: FileText, href: "/features/how-to-make-an-invoice-for-free" },
            { title: "AI Invoice Generator", desc: "Type what you did in plain English. Our AI writes the professional invoice for you.", icon: Sparkles, href: "/features/ai-invoice-generator" },
            { title: "Gamified Invoicing", desc: "Turn the mundane task of billing into a rewarding experience with XP and leaderboards.", icon: Zap, href: "/features/best-free-invoice-app" },
            { title: "Shopify Billing", desc: "Automatically generate B2B invoices directly from your Shopify store orders seamlessly.", icon: ShoppingBag, href: "/features/shopify-invoice-generator" },
            { title: "Online Payment Integration", desc: "Accept secure card payments globally. The online payment integration software settles directly to your bank.", icon: Globe, href: "/features/billing-software-online" },
        ]
    },
    {
        title: "Client Management & CRM",
        description: "Billing software with CRM built-in to manage your entire customer lifecycle.",
        features: [
            { title: "Freelance CRM", desc: "A lightweight client vault to track every contact, project, and outstanding invoice.", icon: Users, href: "/solutions/freelancers" },
            { title: "CRM Engine", desc: "Manage the full client lifecycle from cold lead to retained contractor easily.", icon: Shield, href: "/features/crm-engine" },
            { title: "Lead Intelligence", desc: "Identify high-value clients and track engagement across your proposals in real-time.", icon: Target, href: "/features/lead-intelligence" },
            { title: "White-label Client Portal", desc: "Give your clients a custom dashboard to view and pay all their invoices securely.", icon: Lock, href: "/features/professional-identity" },
        ]
    },
    {
        title: "Operations & Expense Tracking",
        description: "The expense tracking software that syncs your outflows with your inflows.",
        features: [
            { title: "AI Receipt Scanner", desc: "Snap a photo of any receipt. Our AI extracts the data and logs the expense instantly.", icon: ScanLine, href: "/features/how-to-make-an-invoice-on-my-phone" },
            { title: "Products & Services", desc: "Build a reusable catalog of your offerings to generate invoices with one click.", icon: Package, href: "/features/products-services" },
            { title: "Growth Reports", desc: "Visual dashboards showing your cash flow, overdue balances, and revenue trends.", icon: LineChart, href: "/features/growth-reports" },
            { title: "Global Settlements", desc: "Accept payments from clients across borders with built-in multi-currency support.", icon: Globe, href: "/solutions/enterprise" },
            { title: "Mobile Expense Manager", desc: "Track spending and capture deductible expenses directly from your smartphone.", icon: Smartphone, href: "/features/how-to-make-an-invoice-on-my-phone" },
        ]
    },
    {
        title: "Brand & Enterprise Tools",
        description: "Scale your operation with an automated billing platform designed for growth.",
        features: [
            { title: "Professional Identity", desc: "Full white-labeling. Custom domains, custom emails, and custom brand colors.", icon: Palette, href: "/features/professional-identity" },
            { title: "Digital Business Cards", desc: "NFC-enabled profiles that capture leads directly into your CRM instantly.", icon: Contact, href: "/features/digital-business-cards" },
            { title: "Enterprise Scaling", desc: "API access, SOC2 compliance, and custom data residency for large operations.", icon: Building2, href: "/features/enterprise-scaling" },
            { title: "QR Code Payments", desc: "Generate contactless payment codes for in-person billing and rapid checkout.", icon: QrCode, href: "/features/how-to-generate-a-qr-code" },
            { title: "Team Workspace", desc: "Multi-user access with granular role permissions for your accountants and staff.", icon: LayoutGrid, href: "/features/team-workspace" },
        ]
    }
];

const faqs = [
    {
        q: "What is expense tracking software?",
        a: "Expense tracking software is a digital tool that helps businesses monitor their spending. Instead of manually typing receipt data into spreadsheets, the software uses AI to scan receipts, categorize expenses, and sync them directly to your accounting ledger."
    },
    {
        q: "How does the client management software connect to billing?",
        a: "We believe billing software with CRM capabilities is essential. When you view a client in Nobevra, you don't just see their contact details. You see their lifetime value, outstanding balance, average payment time, and full invoice history in one place."
    },
    {
        q: "Is it difficult to set up the recurring billing software?",
        a: "Not at all. You can configure a recurring invoice in under 60 seconds. Set the amount, choose the frequency (weekly, monthly, annually), and the automated billing platform takes over. It generates the invoice and sends it automatically without you lifting a finger."
    },
    {
        q: "Do I need separate invoice generator tools?",
        a: "No. Nobevra is a complete invoice automation software suite. You can generate one-off invoices, recurring retainers, or bulk wholesale invoices natively. It replaces your standalone invoice generator tools completely."
    },
    {
        q: "Does this include online payment integration software?",
        a: "Yes. Every invoice generated includes a secure payment link. Your clients can pay via credit card, bank transfer, or Apple Pay instantly. The online payment integration software automatically marks the invoice as paid and updates your cash flow metrics."
    },
    {
        q: "Are all the invoicing software features included in the free tier?",
        a: "Our free tier includes core billing and invoicing software features so you can start getting paid immediately. Advanced features like the AI receipt scanner, automated reminders, and custom CRM pipelines are available on our premium plans."
    }
];

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nobevra Expense Tracking & Billing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1254"
    },
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
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

export default function FeaturesPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            <Script id="sw-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* ══ 1. HERO (Benefit-driven headline & Hook) ══ */}
            <section className="relative pt-12 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                            The Complete Feature Directory
                        </div>

                        <h1 className="font-inter text-near-black mb-8 text-[30px] md:text-[50px] lg:text-[60px] leading-[1.05] tracking-tight font-black">
                            The expense tracking software <br className="hidden md:block"/>
                            that <span className="text-noble-blue">understands cash flow.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-near-black/60 max-w-xl mb-12 leading-relaxed">
                            Stop spending your Sunday evenings organizing receipts in a shoebox. Turn your manual busywork into an automated machine that tracks exactly where your money goes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register" className="text-white bg-[#166FBB] px-10 py-5 text-base font-extrabold rounded-[24px] hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)] flex items-center justify-center gap-3">
                                Start Free Today <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href="#all-features" className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-[24px] border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all">
                                Explore All Features
                            </Link>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center lg:pl-10" style={{ perspective: '1200px' }}>
                        <div className="relative group z-10 w-full" style={{ transform: 'rotateY(-12deg) rotateX(4deg) scale(1.02)' }}>
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="relative bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-[24px] sm:rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
                                <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <div className="rounded-[16px] sm:rounded-[32px] overflow-hidden border border-slate-100/50 shadow-inner bg-slate-50">
                                    <Image alt="Nobevra dashboard UI" className="w-full h-auto object-cover object-top" src="/images/hero-dashboard-actual.png" width={1366} height={1633} priority />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. PROBLEM & TRUE COST (Information Gain) ══ */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                                The Hidden Cost
                            </div>
                            <h2 className="font-inter text-[30px] md:text-[40px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                                Manual expense tracking is quietly eating your profit margins.
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                Every time you manually type a receipt into a spreadsheet, you lose money. Industry data shows that manual processing costs a business an average of $58 per expense report in administrative time.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Most businesses fail at tracking expenses because they use software built for accountants. It is clunky, full of financial jargon, and requires an accounting degree just to log a taxi receipt.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-slate-700 font-medium">83% of manual reports contain errors or missing data.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-slate-700 font-medium">Lost receipts mean lost tax deductions at the end of the year.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-slate-50 p-8 md:p-12 rounded-[32px] border border-slate-200">
                            <h3 className="font-black text-2xl text-slate-900 mb-8">The True Cost of Manual Entry</h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
                                        <span>Time Spent per week</span>
                                        <span className="text-red-500">4.5 Hours</span>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-red-400 w-[70%]" /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
                                        <span>Lost Billable Revenue</span>
                                        <span className="text-orange-500">$1,250 / mo</span>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-orange-400 w-[85%]" /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
                                        <span>Tax Deductions Missed</span>
                                        <span className="text-yellow-500">15%</span>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[40%]" /></div>
                                </div>
                            </div>
                            <div className="mt-10 pt-8 border-t border-slate-200 text-center">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Stop paying the manual tax. Automate it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. THE 19 FEATURES EXPLORER (Word Count & Semantic Density) ══ */}
            <section id="all-features" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                            The Features Explorer
                        </div>
                        <h2 className="font-inter text-[30px] md:text-[40px] text-near-black font-black leading-[1.05] tracking-tight mb-6">
                            Everything you need to <span className="text-noble-blue">Scan, Sync, and Settle.</span>
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            A complete directory of all 19 capabilities powering the Nobevra ecosystem.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {featureCategories.map((category, idx) => (
                            <div key={idx}>
                                <div className="mb-10 text-center md:text-left">
                                    <h3 className="font-black text-[28px] md:text-[32px] text-slate-900 mb-4">{category.title}</h3>
                                    <p className="text-lg text-slate-500 max-w-2xl">{category.description}</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.features.map((f, i) => (
                                        <Link key={i} href={f.href} className="bg-white p-8 rounded-[32px] border border-slate-100 hover:border-noble-blue/30 hover:shadow-xl transition-all group block">
                                            <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-noble-blue group-hover:text-white transition-colors border border-slate-100 group-hover:border-noble-blue">
                                                <f.icon className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-black text-xl text-slate-900 mb-3 group-hover:text-noble-blue transition-colors">{f.title}</h4>
                                            <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. NOT FOR YOU & PROCESS ══ */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* The Process */}
                    <div>
                        <h2 className="font-inter text-[30px] md:text-[40px] text-near-black font-black leading-[1.05] tracking-tight mb-10">
                            How it works in 3 simple steps.
                        </h2>
                        
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    1
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h4 className="font-black text-lg text-slate-900 mb-2">Connect your workflow</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Setup takes minutes. Import your clients into the client management software and you are ready to bill.</p>
                                </div>
                            </div>
                            
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    2
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h4 className="font-black text-lg text-slate-900 mb-2">Automate the busywork</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Let the invoice automation software handle generation, delivery, and payment reminders while you sleep.</p>
                                </div>
                            </div>

                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-noble-blue text-white font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    3
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h4 className="font-black text-lg text-slate-900 mb-2">Track margins clearly</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">The expense tracking software syncs your outflows against your inflows, giving you a clear view of your actual profit.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Not For You Section (Information Gain) */}
                    <div className="bg-slate-900 p-10 md:p-12 rounded-[40px] text-white shadow-2xl">
                        <h3 className="font-black text-3xl mb-6">We may not be right for you if...</h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            We believe in transparency. Nobevra is built for speed, automation, and getting paid. If you are a massive Fortune 500 corporation looking for a complex, 12-month implementation ERP system to replace SAP, this is not it.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            However, if you want invoicing software features that prioritize revenue, client experience, and actual usability—without needing a finance degree—you are exactly who we built this for.
                        </p>
                    </div>
                </div>
            </section>

            {/* ══ 5. CASE STUDIES (Social Proof) ══ */}
            <section className="py-24 bg-[#F8FAFC] border-t border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
                    <h2 className="font-inter text-[30px] md:text-[40px] text-near-black font-black leading-[1.05] tracking-tight mb-16">
                        Results from real operators.
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                            <div className="flex gap-1 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed font-medium mb-8">
                                "Tracking media production expenses used to be a nightmare. The Smart Expense Manager categorizes everything automatically across our team, saving us hours each week."
                            </p>
                            <div className="flex items-center gap-4">
                                <Image src="/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png" alt="Beautrice Moreau" width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                                <div>
                                    <p className="font-black text-slate-900">Beautrice Moreau</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Operations Manager, Eagles Media</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
                            <div className="flex gap-1 mb-6">
                                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed font-medium mb-8">
                                "The Inventory Hub is a game changer for our agricultural supplies. Real-time stock tracking connected directly to invoicing prevents stockouts entirely."
                            </p>
                            <div className="flex items-center gap-4">
                                <Image src="/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg" alt="Glory Ebasabor" width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                                <div>
                                    <p className="font-black text-slate-900">Glory Ebasabor</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Founder, D-Amin Grow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 6. FAQ ══ */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-[30px] md:text-[40px] text-near-black font-black leading-[1.05] tracking-tight mb-12 text-center">
                        Frequently asked questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-slate-50 rounded-[20px] border border-slate-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4">
                                    <span className="font-black text-slate-900 text-lg leading-snug">{faq.q}</span>
                                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-4 bg-white">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 7. SOFT CTA ══ */}
            <section className="py-32 bg-[#F8FAFC] border-t border-slate-100 text-center">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <h2 className="font-inter text-[40px] md:text-[60px] text-near-black font-black mb-6 tracking-tight leading-[1.05]">
                        Ready to automate your finances?
                    </h2>
                    <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join the operators who use Nobevra to track expenses, manage clients, and collect payments automatically.
                    </p>
                    <Link href="/register" className="inline-flex items-center gap-3 text-white bg-[#166FBB] px-12 py-6 text-lg font-extrabold rounded-[24px] hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(22,111,187,0.3)]">
                        Start Free Today <ArrowRight className="w-6 h-6" />
                    </Link>
                    <p className="mt-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">No credit card · Free plan · Cancel anytime</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
