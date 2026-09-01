import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import {
    Users, Briefcase, Database, Lock, ShieldCheck, ChevronDown,
    Zap, Star, ArrowRight, FolderOpen, Search, Contact
} from 'lucide-react';

/* ── SEO Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Lightweight CRM for Freelancers — Simple Client Management | Nobevra',
    description: 'The lightweight CRM built specifically for solo freelancers. Track client contacts, view linked invoices, monitor lifetime revenue, and eliminate CRM bloat.',
    keywords: [
        'CRM for freelancers',
        'client management software simple',
        'freelance client tracker',
        'lightweight CRM',
        'solo founder CRM'
    ],
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/lightweight-crm-for-freelancers',
    },
    openGraph: {
        title: 'Lightweight CRM for Freelancers — Simple Client Management | Nobevra',
        description: 'The lightweight CRM built specifically for solo freelancers. Track client contacts, view linked invoices, monitor lifetime revenue, and eliminate CRM bloat.',
        url: 'https://nobevra.noblesworld.com.ng/lightweight-crm-for-freelancers',
        type: 'website',
        images: [
            {
                url: '/images/freelance-crm-hero.png',
                width: 1200,
                height: 630,
                alt: 'Nobevra Lightweight CRM for Freelancers & Solo Creators',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Lightweight CRM for Freelancers | Nobevra',
        description: 'Track client contacts, view linked invoices, and eliminate CRM bloat with Nobevra.',
        images: ['/images/freelance-crm-hero.png'],
    },
};

/* ── Page Data ──────────────────────────────────────────────────── */
const steps = [
    {
        step: '01',
        icon: Users,
        title: 'Add Your Client',
        desc: 'Dump their contact info, business details, and notes into the vault. No mandatory 14-field forms to fill out.',
    },
    {
        step: '02',
        icon: FolderOpen,
        title: 'Attach the Chaos',
        desc: 'Link contracts, active invoices, and historical receipts directly to the client profile. Everything in one place.',
    },
    {
        step: '03',
        icon: Zap,
        title: 'One-Click Action',
        desc: 'Generate a new invoice or send a follow-up email straight from their CRM profile in literally two clicks.',
    },
    {
        step: '04',
        icon: Search,
        title: 'Instant Retrieval',
        desc: 'Need a file from two years ago? Search the client. Boom. The entire history is perfectly preserved.',
    },
];

const features = [
    {
        icon: Database,
        title: 'The Unified Client Vault',
        desc: 'Keep all names, emails, addresses, and tax IDs in a central repository. Say goodbye to searching through old email threads to find a phone number.',
        tag: 'Client Management Software Simple',
    },
    {
        icon: Briefcase,
        title: 'Zero-Friction Tracking',
        desc: 'We removed pipelines, probability forecasts, and organizational hierarchy charts. Because you are a freelancer, not a Fortune 500 sales director.',
        tag: 'Freelance Client Tracker',
    },
    {
        icon: Lock,
        title: 'Bank-Grade Security',
        desc: 'Your client list is your business. We protect your CRM data with 256-bit AES encryption, ensuring your contacts are never compromised.',
        tag: 'Privacy First',
    },
    {
        icon: Contact,
        title: 'Integrated Billing',
        desc: 'Because Nobevra is fundamentally a financial engine, your CRM is directly wired to your invoices. Track exactly how much revenue each client generates.',
        tag: 'Solo Founder CRM',
    },
];

const stats = [
    { value: '1.57B', label: 'Freelancers globally', sublabel: 'Most lack a proper client system' },
    { value: '29%', label: 'More deals closed', sublabel: 'Users with a CRM vs. without' },
    { value: '35%', label: 'Better client retention', sublabel: 'With organized relationship tracking' },
    { value: '12 hrs', label: 'Admin time saved monthly', sublabel: 'Average for active CRM users' },
];

const faqs = [
    {
        q: 'Do I really need a CRM if I only have 3 clients?',
        a: "If you want those 3 clients to feel like they are working with a true professional, yes. A lightweight CRM ensures you never forget a detail, never lose a contract, and always know exactly what their billing terms are. Plus, it sets you up to easily scale to 10 clients without breaking your brain.",
    },
    {
        q: 'How is this different from HubSpot or Salesforce?',
        a: "Those tools are built for massive sales teams. They require complex setup, pipeline configuration, and data entry rules. Nobevra's CRM is built specifically for freelancers—it acts as a quiet, powerful vault for your contacts and invoices without demanding constant maintenance.",
    },
    {
        q: 'Can I import my existing clients from a spreadsheet?',
        a: "Absolutely. We have a simple, one-click CSV importer that will ingest your existing client list in seconds. No complex field mapping required.",
    },
    {
        q: 'Is this truly a "lightweight CRM"?',
        a: 'Yes. We ruthlessly eliminated enterprise bloat. There are no "lead scoring" algorithms or "territory management" tools. Just a beautifully designed vault for the people who pay you.',
    },
    {
        q: 'How does it connect to my invoices?',
        a: 'Seamlessly. When you view a client in the CRM, you will see a full history of every invoice, estimate, and payment associated with them. It is all integrated out of the box.',
    },
    {
        q: 'What is a solo founder CRM and why is it different?',
        a: 'A solo founder CRM is built around the reality of running a one-person business. It has no user seats, no administrator roles, no complex permissions. Just you, your clients, and a clean interface. Ours is fully integrated with billing, so your CRM and invoicing software are never out of sync.',
    },
    {
        q: 'Does Nobevra replace tools like Bonsai or Dubsado?',
        a: 'For many freelancers, yes. Bonsai and Dubsado are powerful but expensive, often bundling features you will never use. Nobevra focuses on what makes you money: a clean client tracker, fast invoice generation, and real-time payment tracking—without the monthly fees for features you ignore.',
    },
    {
        q: 'Is a spreadsheet enough to manage clients?',
        a: 'Spreadsheets are free but they are passive. They do not send you reminders about follow-ups, they do not link to unpaid invoices, and they do not tell you which client generated the most revenue last quarter. The moment you have more than 5 active clients, a lightweight CRM saves you more time than it costs.',
    },
    {
        q: 'Can I use this CRM as a freelance client tracker for recurring work?',
        a: 'Absolutely. Attach recurring invoice templates directly to a client profile so that the next billing cycle takes two clicks. You will also see the entire engagement history—perfect for annual contract renewals.',
    },
];

const reviews = [
    {
        quote: "I tried using a big-name CRM and spent more time configuring pipelines than doing actual work. Nobevra is the perfect freelance client tracker. It just works.",
        name: "David Chen",
        role: "Freelance Developer",
        image: "/images/reviews/david-chen-ceo-at-nexus-tech.png",
    },
    {
        quote: "Having my client list directly attached to my invoicing software is a game changer. I never have to copy-paste addresses or tax IDs ever again.",
        name: "Sarah Jenkins",
        role: "Brand Designer",
        image: "/images/reviews/sarah-jenkins-freelance-designer.png",
    },
    {
        quote: "Finally, a simple client management software that doesn't make me feel like I'm running a corporate call center. Clean, quiet, and highly effective.",
        name: "Marcus Thorne",
        role: "Solo Consultant",
        image: "/images/reviews/marcus-thorne-founder-of-apex-consulting.png",
    },
];

/* ── Comparison Table Data ──────────────────────────────────────── */
const comparisonRows = [
    { feature: 'Freelancer-first design', noble: true, hubspot: false, bonsai: true, dubsado: true },
    { feature: 'Zero mandatory fields', noble: true, hubspot: false, bonsai: false, dubsado: false },
    { feature: 'Built-in invoice integration', noble: true, hubspot: false, bonsai: true, dubsado: true },
    { feature: 'Free plan available', noble: true, hubspot: true, bonsai: false, dubsado: false },
    { feature: 'No pipeline configuration required', noble: true, hubspot: false, bonsai: false, dubsado: false },
    { feature: 'CSV client import', noble: true, hubspot: true, bonsai: true, dubsado: true },
    { feature: 'Client revenue history', noble: true, hubspot: true, bonsai: true, dubsado: true },
    { feature: 'Receipt & expense tracking', noble: true, hubspot: false, bonsai: true, dubsado: false },
];

/* ── Decision Framework ──────────────────────────────────────────── */
const decisionItems = [
    {
        signal: 'You have forgotten to follow up with a lead',
        verdict: 'Get a CRM',
        color: 'text-red-500 bg-red-50 border-red-100',
    },
    {
        signal: 'You copied a client email address from an old invoice',
        verdict: 'Get a CRM',
        color: 'text-red-500 bg-red-50 border-red-100',
    },
    {
        signal: 'You have 1 client and the same simple retainer every month',
        verdict: 'Spreadsheet is fine',
        color: 'text-green-600 bg-green-50 border-green-100',
    },
    {
        signal: 'You are scaling past 5 active clients',
        verdict: 'Get a CRM',
        color: 'text-red-500 bg-red-50 border-red-100',
    },
    {
        signal: 'You want to see total revenue per client',
        verdict: 'Get a CRM',
        color: 'text-red-500 bg-red-50 border-red-100',
    },
    {
        signal: 'You already manage everything through email fine',
        verdict: 'Spreadsheet is fine',
        color: 'text-green-600 bg-green-50 border-green-100',
    },
];

/* ── JSON-LD Schema Generators ──────────────────────────────────── */
const generateSoftwareSchema = () => {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Nobevra Freelance CRM",
        "operatingSystem": "Web, iOS, Android",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free CRM functionality included"
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
export default function FreelanceCRMPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            {/* Inject JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareSchema()) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }} />

            {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
            <section className="relative pt-16 pb-28 overflow-hidden" aria-label="Hero">
                <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: copy */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-near-black/5 shadow-sm text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8">
                                <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                                Lightweight CRM for Freelancers
                            </div>

                            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
                                Your client roster, without the <span className="text-noble-blue">corporate bloat.</span>
                            </h1>

                            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-8 leading-relaxed">
                                You are a freelancer, not a 500-person sales team. Ditch the complex enterprise software and use a <strong>simple client management software</strong> built for actual human beings.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Link
                                    href="/register"
                                    className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                    style={{ backgroundColor: '#166FBB' }}
                                >
                                    Open Your Client Vault
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
                                Free forever for solo founders · Import in 10 seconds
                            </p>
                        </div>

                        {/* Right: visual mockup card */}
                        <div className="relative z-10 flex justify-center lg:justify-end">
                            <div className="relative w-full rounded-[20px] overflow-hidden shadow-2xl border border-slate-200/50">
                                <Image 
                                    src="/images/freelance-crm-hero.png" 
                                    alt="Nobevra Client Ledger Interface displaying a lightweight CRM for freelancers with total clients, active VIP leads, and client score tracking"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                                    priority
                                />
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

            {/* ══ 3. PROBLEM SECTION ═══════════════════════════════════════ */}
            <section className="py-28 relative" aria-labelledby="problem-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            {/* Visual Representation of "Bloat" */}
                            <div className="bg-slate-100 rounded-[32px] p-8 border border-slate-200 grayscale opacity-80">
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-6 w-16 bg-slate-300 rounded-full" />)}
                                    </div>
                                    <div className="h-4 w-3/4 bg-slate-300 rounded" />
                                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                                    <div className="pt-6 grid grid-cols-3 gap-4">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                            <div key={i} className="h-20 bg-slate-200 rounded-xl" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-red-100">
                                The bloat problem
                            </div>
                            <h2 id="problem-heading" className="font-inter font-black text-[28px] md:text-[40px] text-near-black leading-[1.1] tracking-tight mb-6">
                                Why Salesforce makes solo founders{' '}
                                <span className="text-red-500">miserable.</span>
                            </h2>
                            <p className="text-base text-near-black/60 leading-relaxed mb-6">
                                Enterprise CRMs are built for managers who need to monitor hundreds of sales reps. They demand endless data entry, mandatory fields, and complex pipeline configurations just to save an email address.
                            </p>
                            <p className="text-base text-near-black/60 leading-relaxed mb-8">
                                As a freelancer, your time is your inventory. Every hour you spend fighting your CRM is an hour you aren't billing a client. You don't need a pipeline; you need a vault.
                            </p>
                            <div className="p-5 bg-noble-blue/5 border border-noble-blue/10 rounded-2xl">
                                <p className="text-sm font-black text-slate-900 mb-1">Our strategic pivot:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">We stripped away 90% of what traditional CRMs do. We kept only the 10% that actually matters for a <strong>freelance client tracker</strong>: names, notes, files, and money.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. INFORMATION GAIN: The Enterprise Complexity Tax ═══════ */}
            <section className="py-28 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="info-gain-heading">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-noble-blue/20 pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-8 border border-white/20">
                            The Hidden Cost
                        </div>
                        <h2 id="info-gain-heading" className="font-inter font-black text-[28px] md:text-[44px] leading-[1.1] tracking-tight mb-6">
                            The Enterprise Complexity Tax
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            How using the wrong software silently destroys your hourly rate, and why a lightweight CRM is the antidote.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'The Configuration Sink', icon: ShieldCheck, desc: 'Corporate CRMs require hours of setup. You have to map custom fields, set up lead scoring, and build territory rules for a territory of... just you.' },
                            { title: 'The Friction Penalty', icon: Lock, desc: 'Every time you add a contact, you face 15 mandatory fields. The friction is so high that you end up bypassing the CRM entirely and going back to Apple Notes.' },
                            { title: 'The Lightweight Antidote', icon: Zap, desc: 'Nobevra acts as a silent vault. Drop a name and an email, and you are done. The software gets out of your way so you can get back to billable work.' },
                        ].map((item, i) => (
                            <div key={item.title} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="font-black text-xl mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 5. HOW IT WORKS ════════════════════════════════════════════ */}
            <section className="py-28 bg-white border-b border-slate-100" aria-labelledby="process-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 id="process-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight mb-6">
                            A client management software that <span className="text-noble-blue">stays out of your way.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((s, i) => (
                            <div key={s.step} className="relative p-8 rounded-[28px] bg-slate-50 border border-slate-100 hover:border-noble-blue/50 hover:shadow-xl hover:shadow-noble-blue/10 transition-all group">
                                <span className="absolute top-6 right-6 font-black text-[40px] text-slate-200 leading-none select-none">{s.step}</span>
                                <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-noble-blue group-hover:border-noble-blue transition-all">
                                    <s.icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-black text-slate-900 text-lg mb-3">{s.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. FEATURES ══════════════════════════════════════════════ */}
            <section className="py-28 relative bg-slate-50" aria-labelledby="features-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((f) => (
                            <div key={f.title} className="p-10 bg-white rounded-[32px] border border-slate-100 hover:border-noble-blue/20 hover:shadow-lg transition-all group flex gap-7">
                                <div className="shrink-0 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-noble-blue transition-colors">
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

            {/* ══ 7. SOCIAL PROOF / TESTIMONIALS ══════════════════════════ */}
            <section className="py-28 bg-white" aria-labelledby="reviews-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8 border border-blue-100">
                            Real results
                        </div>
                        <h2 id="reviews-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight">
                            Solo founders building <span className="text-noble-blue">quiet empires.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.map((r) => (
                            <div key={r.name} className="bg-slate-50 rounded-[32px] border border-slate-100 p-8 hover:shadow-xl hover:shadow-noble-blue/5 transition-all">
                                <div className="flex gap-0.5 mb-6">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                                </div>
                                <blockquote className="text-slate-700 font-medium leading-relaxed mb-8 text-sm">"{r.quote}"</blockquote>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={r.image}
                                        alt={`${r.name} — ${r.role}`}
                                        width={44}
                                        height={44}
                                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
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

            {/* ══ 7b. ROI MATH — INFORMATION GAIN (competitors don't cover this) ════ */}
            <section className="py-28 bg-white border-b border-slate-100" aria-labelledby="roi-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-amber-100">
                                The Math Most Freelancers Ignore
                            </div>
                            <h2 id="roi-heading" className="font-inter font-black text-[28px] md:text-[40px] text-near-black leading-[1.1] tracking-tight mb-6">
                                What disorganized client management actually <span className="text-red-500">costs you.</span>
                            </h2>
                            <p className="text-base text-near-black/60 leading-relaxed mb-6">
                                Most freelancers think a CRM is a cost. Run the actual numbers and it is the opposite.
                            </p>
                            <p className="text-base text-near-black/60 leading-relaxed mb-8">
                                If you spend <strong>12 hours a month</strong> on disorganized admin—searching emails, copying addresses, chasing invoice status—and your hourly rate is <strong>$75</strong>, that is <strong>$900 in lost revenue every single month.</strong> A lightweight CRM that costs $25/month and saves 8 of those hours pays back <strong>24x</strong>.
                            </p>
                            <div className="p-5 bg-noble-blue/5 border border-noble-blue/10 rounded-2xl">
                                <p className="text-sm font-black text-slate-900 mb-1">The practical reality:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">Businesses using a <strong>solo founder CRM</strong> close 29% more deals and retain clients at a 35% higher rate. For a freelancer billing $5,000/month, that retention improvement alone is worth an extra <strong>$21,000 per year.</strong></p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Hours lost to admin (no CRM)', value: '12 hrs / mo', negative: true },
                                { label: 'Revenue lost at $75/hr rate', value: '$900 / mo', negative: true },
                                { label: 'Hours saved with lightweight CRM', value: '8 hrs / mo', negative: false },
                                { label: 'ROI on a $25/month CRM subscription', value: '24x return', negative: false },
                                { label: 'Revenue increase from client retention', value: '+35%', negative: false },
                            ].map((item) => (
                                <div key={item.label} className={`flex items-center justify-between gap-6 p-5 rounded-2xl border ${
                                    item.negative
                                        ? 'bg-red-50 border-red-100'
                                        : 'bg-green-50 border-green-100'
                                }`}>
                                    <p className={`font-bold text-sm ${
                                        item.negative ? 'text-red-700' : 'text-green-800'
                                    }`}>{item.label}</p>
                                    <span className={`shrink-0 font-black text-base ${
                                        item.negative ? 'text-red-500' : 'text-green-600'
                                    }`}>{item.value}</span>
                                </div>
                            ))}
                            <p className="text-[10px] text-slate-400 font-bold text-center pt-2">
                                Based on global CRM adoption research & freelance market data, 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 7c. DECISION FRAMEWORK ═════════════════════════════════ */}
            <section className="py-28 bg-white border-b border-slate-100" aria-labelledby="decision-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/5 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-8 border border-noble-blue/10">
                            Honest Self-Assessment
                        </div>
                        <h2 id="decision-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight mb-6">
                            Do you actually need a <span className="text-noble-blue">freelance client tracker</span>?
                        </h2>
                        <p className="text-slate-500 text-base leading-relaxed">
                            Not everyone needs one. Here is the most honest guide on the internet for figuring out if a <strong>solo founder CRM</strong> is the right call for where you are right now.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-3">
                        {decisionItems.map((item) => (
                            <div key={item.signal} className="flex items-center justify-between gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-slate-700 font-medium text-sm leading-snug">{item.signal}</p>
                                <span className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.color}`}>
                                    {item.verdict}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-xs text-slate-400 font-bold mt-8 max-w-xl mx-auto">
                        Our practical opinion: If you are billing more than 3 different clients per month, a lightweight CRM pays for itself in the first week. The organizational clarity alone is worth it.
                    </p>
                </div>
            </section>

            {/* ══ 7c. COMPARISON TABLE ═══════════════════════════════════ */}
            <section className="py-28 bg-slate-50 border-b border-slate-100" aria-labelledby="comparison-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 id="comparison-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight mb-6">
                            Nobevra vs. the alternatives
                        </h2>
                        <p className="text-slate-500 text-base leading-relaxed">
                            A no-fluff comparison against the tools freelancers actually consider. See why a purpose-built <strong>lightweight CRM</strong> wins every time.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto overflow-x-auto rounded-[28px] border border-slate-200 shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="text-left py-5 px-6 font-black text-sm rounded-tl-[28px]">Feature</th>
                                    <th className="text-center py-5 px-4 font-black text-noble-blue bg-noble-blue/20">Nobevra</th>
                                    <th className="text-center py-5 px-4 font-black text-slate-300">HubSpot</th>
                                    <th className="text-center py-5 px-4 font-black text-slate-300">Bonsai</th>
                                    <th className="text-center py-5 px-4 font-black text-slate-300 rounded-tr-[28px]">Dubsado</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {comparisonRows.map((row, i) => (
                                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                        <td className="py-4 px-6 font-bold text-slate-700">{row.feature}</td>
                                        <td className="text-center py-4 px-4 font-black text-lg bg-noble-blue/5">
                                            {row.noble ? <span className="text-noble-blue">✓</span> : <span className="text-slate-300">—</span>}
                                        </td>
                                        <td className="text-center py-4 px-4 font-black text-lg">
                                            {row.hubspot ? <span className="text-green-500">✓</span> : <span className="text-slate-300">—</span>}
                                        </td>
                                        <td className="text-center py-4 px-4 font-black text-lg">
                                            {row.bonsai ? <span className="text-green-500">✓</span> : <span className="text-slate-300">—</span>}
                                        </td>
                                        <td className="text-center py-4 px-4 font-black text-lg">
                                            {row.dubsado ? <span className="text-green-500">✓</span> : <span className="text-slate-300">—</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-center mt-8 text-xs text-slate-400 font-bold">
                        Data accurate as of July 2026. Feature availability varies by plan tier.
                    </p>
                </div>
            </section>

            {/* ══ 8. NOT FOR YOU SECTION ═══════════════════════════════════ */}
            <section className="py-20 bg-white border-t border-slate-100" aria-label="Qualifier">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <div className="bg-slate-900 text-white rounded-[32px] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-noble-blue/20 blur-[80px] rounded-full pointer-events-none" />
                        
                        <h2 className="font-inter font-black text-[24px] md:text-[32px] mb-6 relative z-10">
                            We may not be right for you if…
                        </h2>
                        <ul className="space-y-4 relative z-10">
                            {[
                                'You run a 50-person outbound sales floor with complex territory rules.',
                                'You require deep algorithmic lead scoring to prioritize contacts.',
                                'You want to spend your weekends configuring custom software pipelines.',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-black mt-0.5">✗</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                            <p className="text-sm text-slate-400 font-medium">
                                If you just want a beautifully clean vault for your clients —{' '}
                                <Link href="/register" className="text-cyan-400 font-black hover:underline">
                                    Nobevra is built for you.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 9. FAQ ═══════════════════════════════════════════════════ */}
            <section className="py-28 bg-slate-50" aria-labelledby="faq-heading">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <h2 id="faq-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight">
                            Questions about our <span className="text-noble-blue">solo founder CRM</span>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-noble-blue/5 blur-[180px] rounded-full pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-blue/5 border border-noble-blue/10 text-blue-800 font-black text-[10px] uppercase tracking-[0.3em] mb-12">
                        Get Organized Today
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                        Stop fighting your software. <br />
                        <span className="text-noble-blue">Start organizing your clients.</span>
                    </h2>
                    <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto font-bold leading-relaxed">
                        Start with our free plan. Import your clients, clear your spreadsheets, and get back to doing the work that actually pays you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                        <Link
                            href="/register"
                            className="bg-noble-blue text-white px-12 py-6 text-xl font-black rounded-[24px] hover:bg-noble-blue/90 hover:scale-105 transition-all shadow-2xl shadow-noble-blue/30 flex items-center gap-3"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Open Your Free Vault
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                    <p className="mt-8 text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                        No credit card required · Lightweight CRM included
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
