'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import {
    FileSignature, CheckCircle2, ShieldCheck, Zap, Lock,
    ArrowRight, Clock, FileText, Send, Sparkles, Scale,
    Check, X, Eye, FileCheck, Smartphone, Award,
    ChevronDown, HelpCircle, AlertCircle, BarChart3,
    Layers, Users, RefreshCw
} from 'lucide-react';

const REVIEWS = [
    {
        quote: "Sending contracts and deposit invoices in one fluid step transformed our onboarding. Clients review on mobile, e-sign in 30 seconds, and the deposit invoice triggers automatically.",
        name: "Beautrice Moreau",
        role: "Operations Manager, Eagles Media",
        image: "/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png",
    },
    {
        quote: "We used to lose days waiting for clients to print, sign, scan, and email consulting agreements. With Nobevra, our contract closing cycle dropped from 6 days to under 4 hours.",
        name: "Celestine Nzubbychukwu",
        role: "Founder, MyStaff Consulting Limited",
        image: "/images/reviews/celestine-nzubbychukwu-founder-of-mystaff-consulting-limited.png",
    },
    {
        quote: "The pre-built Master Services Agreements and Statements of Work protect our deliverables and IP completely. Having contracts linked directly to CRM deals gives us total clarity.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
    {
        quote: "The SHA-256 cryptographic audit certificate gives our corporate clients complete legal confidence. No separate DocuSign subscription required.",
        name: "Timileyin Oluwafemi",
        role: "Managing Director, Apex Logistics",
        image: "/images/reviews/timileyin-oluwafemi-ceo-of-ceejee-foam.jpeg",
    }
];

const TEMPLATES = [
    {
        name: "Master Services Agreement (MSA)",
        badge: "Agency & B2B",
        desc: "Standard governing terms for long-term client engagements, confidentiality, payment schedules, and liability protection.",
        popular: true
    },
    {
        name: "Statement of Work (SOW)",
        badge: "Freelancers & Projects",
        desc: "Granular milestone deliverables, revision limits, acceptance criteria, and project change order clauses.",
        popular: true
    },
    {
        name: "Non-Disclosure Agreement (NDA)",
        badge: "Confidentiality",
        desc: "Mutual or unilateral intellectual property and trade secret protection prior to project kickoff discussions.",
        popular: false
    },
    {
        name: "Monthly Retainer Contract",
        badge: "Recurring Revenue",
        desc: "Dedicated monthly service hours, rollover terms, out-of-scope billing rates, and automated recurring payment terms.",
        popular: true
    },
    {
        name: "Intellectual Property (IP) Assignment",
        badge: "Asset Rights",
        desc: "Clean legal transfer of software code, design files, trademarks, and creative assets upon full invoice settlement.",
        popular: false
    },
    {
        name: "Independent Contractor Agreement",
        badge: "Sub-Contracting",
        desc: "Clear contractor classification, tax indemnification, deliverable timelines, and termination provisions.",
        popular: false
    }
];

const FAQS = [
    {
        q: "Are electronic signatures signed through Nobevra legally binding?",
        a: "Yes. All contracts signed through Nobevra comply fully with the United States Electronic Signatures in Global and National Commerce Act (ESIGN), the Uniform Electronic Transactions Act (UETA), and European Union eIDAS regulations. Every signed contract includes a tamper-evident certificate with cryptographic SHA-256 timestamping and signer IP telemetry."
    },
    {
        q: "Do clients need to create a Nobevra account to sign a contract?",
        a: "No. Your client receives a secure, encrypted link via email, message, or embedded portal. They can review the full terms and execute their signature on any desktop, tablet, or smartphone browser in seconds without signing up."
    },
    {
        q: "How does contract-to-invoice milestone automation work?",
        a: "When you configure a contract, you can specify deposit percentages or milestone payment schedules. The second your client signs, Nobevra automatically generates the initial deposit invoice and delivers payment links directly to the client's email."
    },
    {
        q: "Can I customize contract terms or upload my existing legal agreements?",
        a: "Yes. You can start from our pre-built legal templates (MSA, SOW, NDA, Retainer) or paste your custom clauses, payment terms, cancellation rules, and custom branding into the rich agreement editor."
    },
    {
        q: "How does Nobevra compare to standalone tools like DocuSign or PandaDoc?",
        a: "Standalone e-signature software charges steep monthly fees, limits envelopes per month, and isolates your contracts from your financial workflow. Nobevra unifies contracts, client CRM, milestone invoicing, payments, and expense tracking into a single operating system with zero envelope paywalls."
    },
    {
        q: "What security measures protect signed contract documents?",
        a: "All contract PDFs are secured with 256-bit TLS encryption in transit and AES-256 encryption at rest. Each executed document contains an immutable audit log detailing signer email, IP address, timestamp, device metadata, and unique cryptographic document hash."
    }
];

const CLAUSES = [
    {
        title: "Milestone & Deposit Triggers",
        tag: "Cash Flow Protection",
        clause: "Upon mutual execution of this Agreement, Client shall remit a non-refundable upfront deposit equal to 50% of the total project fee prior to commencement of deliverables. Remaining milestone balances shall be invoiced and payable within seven (7) business days of deliverable inspection.",
        benefit: "Ensures you never commit billable hours or contractor fees without cleared deposit funds in your account."
    },
    {
        title: "Scope Caps & Change Orders",
        tag: "Scope Creep Defense",
        clause: "The Scope of Work includes up to two (2) rounds of revisions per deliverable. Any requests exceeding the agreed specifications or additional feedback cycles shall be billed as a formal Change Order at Contractor's standard rate of $125.00/hour, subject to written Client approval.",
        benefit: "Protects your project margins from unpaid scope creep and endless review cycles."
    },
    {
        title: "Intellectual Property Retention",
        tag: "Asset Rights",
        clause: "All title, copyright, source code, and design assets developed under this Statement of Work shall remain the exclusive property of Contractor until all milestone invoices and final settlements are paid in full by Client.",
        benefit: "Prevents clients from using or deploying your deliverables before settling outstanding invoice balances."
    },
    {
        title: "Late Payment & Project Pause",
        tag: "Payment Enforcement",
        clause: "Invoices overdue by more than fourteen (14) calendar days shall accrue late interest at 1.5% per month. Contractor reserves the right to suspend active project services until all overdue balances are brought current.",
        benefit: "Legally entitles you to halt work and collect interest if a client delays payment."
    }
];

const JURISDICTIONS = [
    {
        region: "United States",
        statute: "ESIGN Act (15 U.S.C. § 7001) & UETA",
        status: "100% Legally Enforceable",
        notes: "Electronic signatures carry identical legal validity and court admissibility as handwritten ink."
    },
    {
        region: "European Union",
        statute: "eIDAS Regulation (EU) No 910/2014",
        status: "Advanced Electronic Signatures (AES)",
        notes: "Backed by cryptographic SHA-256 audit trails and verifiable signatory identification."
    },
    {
        region: "United Kingdom",
        statute: "Electronic Communications Act 2000 & UK eIDAS",
        status: "Full Statutory Validity",
        notes: "Recognized across commercial contracts, NDAs, and B2B service agreements throughout the UK."
    },
    {
        region: "Canada",
        statute: "PIPEDA & Provincial E-Commerce Acts",
        status: "Federally & Provincially Binding",
        notes: "Satisfies all Canadian statutory criteria for intent, consent, and document integrity."
    },
    {
        region: "Australia",
        statute: "Electronic Transactions Act 1999 (ETA)",
        status: "Fully Admissible",
        notes: "Meets Australian Commonwealth evidentiary requirements for commercial transactions."
    }
];

export default function ClientContractsPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeClause, setActiveClause] = useState<number>(0);
    const [simulatedSigner, setSimulatedSigner] = useState<string>('Alex Morgan');
    const [selectedStyle, setSelectedStyle] = useState<number>(0);
    const [isAdopted, setIsAdopted] = useState<boolean>(false);

    const signatureStyles = [
        'font-serif italic tracking-wide',
        'font-mono italic font-bold',
        'italic font-bold tracking-widest'
    ];

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
        "name": "Nobevra Client Contract Software & E-Signatures",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Create, send, and e-sign legally binding client contracts online with Nobevra. Pre-built freelance & service agreement templates, SHA-256 audit trails, and 1-click invoice conversion."
    };

    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased selection:bg-electric-cyan/30 overflow-x-hidden pt-[118px]">
            <BreadcrumbSchema
                pageId="client-contracts"
                crumbs={[
                    { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
                    { name: 'Client Contracts & E-Signatures' },
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
                    <li className="text-noble-blue font-bold" aria-current="page">Client Contracts & E-Signatures</li>
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
                            Legally Binding Digital Agreements
                        </div>

                        {/* H1 Typography matching Homepage */}
                        <h1 className="font-inter text-near-black mb-6 text-[28px] xs:text-[32px] sm:text-[40px] md:text-[52px] lg:text-[58px] leading-[1.08] tracking-tight font-black break-words">
                            Create, E-Sign & Close Deals with <span className="text-noble-blue">Client Contract Software.</span>
                        </h1>

                        <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Stop losing deals to slow PDF emails and manual signature chasing. Nobevra combines battle-tested legal templates, frictionless mobile e-signatures, and instant deposit invoicing in one connected operating system.
                        </p>

                        {/* CTA Group matching Homepage Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/register"
                                className="text-white px-8 sm:px-10 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 text-center"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Start Free with Contracts
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/pricing"
                                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all text-center"
                            >
                                View Pricing Plans
                            </Link>
                        </div>

                        {/* Microcopy */}
                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                            No credit card required · Free plan available · ESIGN & eIDAS Compliant
                        </p>

                        {/* Verified trust badges */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
                            <div className="flex items-center gap-2">
                                <Scale className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">ESIGN & UETA Enforceable</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-noble-blue" />
                                <span className="text-xs font-bold text-near-black/70">SHA-256 Audit Certificate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <span className="text-xs font-bold text-near-black/70">Auto Deposit Invoicing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-violet-600" />
                                <span className="text-xs font-bold text-near-black/70">256-Bit TLS Encryption</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Modern Browser Mockup Visual */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-full">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-60 pointer-events-none" />
                            <div className="relative bg-noble-surface/80 backdrop-blur-sm p-4 sm:p-6 rounded-[28px] sm:rounded-[36px] shadow-[0_40px_90px_rgba(0,0,0,0.15)] border border-slate-100/80 overflow-hidden">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Services Agreement (MSA)</span>
                                </div>

                                {/* Simulated Document Preview */}
                                <div className="mt-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-inner">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-xs font-bold text-noble-blue uppercase tracking-wider">Executed Agreement</span>
                                            <h3 className="text-lg font-black text-near-black mt-1">Digital Marketing & Strategy SOW</h3>
                                            <p className="text-xs text-slate-400">Client: Acme Global Enterprises LLC</p>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Fully Signed
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl text-xs text-near-black/70">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Contract Total:</span>
                                            <span className="font-black text-near-black">$12,500.00 USD</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Deposit Trigger (50%):</span>
                                            <span className="font-black text-noble-blue">$6,250.00 USD</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Audit Hash:</span>
                                            <span className="font-mono text-[10px] text-slate-400">sha256-8f92a1c...99b2</span>
                                        </div>
                                    </div>

                                    {/* Signer visual block */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service Provider</p>
                                            <p className="font-serif italic text-base text-noble-blue font-bold">Alex Morgan</p>
                                            <p className="text-[10px] text-slate-400">Signed Aug 24, 2026 · Verified</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Client Authorized Signer</p>
                                            <p className="font-serif italic text-base text-emerald-700 font-bold">David Sterling</p>
                                            <p className="text-[10px] text-slate-400">Signed Aug 24, 2026 · IP: 197.210.xx.xx</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating E-Sign Audit Badge */}
                            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-3 z-20">
                                <div className="w-9 h-9 rounded-xl bg-noble-blue/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-noble-blue" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cryptographic Certificate</p>
                                    <p className="text-xs font-black text-near-black">SHA-256 Audit Trail Attached</p>
                                </div>
                            </div>

                            {/* Floating Deposit Invoice Badge */}
                            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-3 z-20">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Instant Invoicing</p>
                                    <p className="text-xs font-black text-noble-blue">Deposit Invoice Generated</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. TRUSTED COMPLIANCE & LEGAL STANDARDS MARQUEE ── */}
            <section className="border-y border-slate-200/60 bg-slate-50/50 py-8">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                        Enforceable Under Global E-Signature Laws & Enterprise Standards
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
                        <span className="font-black text-sm text-slate-600">US ESIGN Act (2000)</span>
                        <span className="font-black text-sm text-slate-600">Uniform Electronic Transactions (UETA)</span>
                        <span className="font-black text-sm text-slate-600">EU eIDAS Compliant</span>
                        <span className="font-black text-sm text-slate-600">SHA-256 Digital Fingerprints</span>
                        <span className="font-black text-sm text-slate-600">256-Bit TLS Encryption</span>
                        <span className="font-black text-sm text-slate-600">Automated Invoice Conversion</span>
                    </div>
                </div>
            </section>

            {/* ── 3. AUTHORITY STATS STRIP ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-14">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">68<span className="text-2xl">%</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">of contracts signed in &lt; 2 hours</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">when clients receive mobile-optimized contract e-signature links rather than static PDF attachments.</p>
                    </div>
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">22<span className="text-2xl">%</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">average margin loss prevented</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">by locking in scope revision limits, milestone billing schedules, and change order terms before kickoff.</p>
                    </div>
                    <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 text-center">
                        <p className="text-4xl sm:text-5xl font-black text-noble-blue mb-2">100<span className="text-2xl">%</span></p>
                        <p className="text-sm font-bold text-near-black mb-1">legally binding & audit-ready</p>
                        <p className="text-xs text-near-black/60 leading-relaxed">backed by cryptographic timestamped audit trails that satisfy court admissibility worldwide.</p>
                    </div>
                </div>
            </section>

            {/* ── 4. THE AGREEMENT FRICTION: WHY TRADITIONAL CONTRACTS FAIL ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-700 font-bold text-xs uppercase tracking-widest mb-4">
                        <AlertCircle className="w-4 h-4" />
                        The Contract Bottleneck
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Why Traditional Word & PDF Contracts Stall Client Onboarding.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Chasing signatures via email attachments creates friction, delays project kickoffs, and leaves your business exposed to unpaid deliverables and scope creep.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 mb-6 font-black text-lg">
                            01
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">Print-Sign-Scan Friction</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            Asking busy clients to print, physically sign, scan, and email agreements creates a multi-day delay that cools deal momentum and increases buyer hesitation.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6 font-black text-lg">
                            02
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">Uncontracted Scope Creep</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            Starting work based on informal Slack chats or email threads leads to unpaid revisions, disputed milestones, and an average 22% erosion of service margins.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6 font-black text-lg">
                            03
                        </div>
                        <h3 className="text-xl font-bold text-near-black mb-3">The Disconnected Invoice Gap</h3>
                        <p className="text-sm text-near-black/60 leading-relaxed">
                            Standalone e-signature tools don&apos;t connect to billing. You still have to manually create deposit invoices, chase card payments, and update separate spreadsheets.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 5. THE 4-STEP NOBEVRA CONTRACT WORKFLOW ── */}
            <section className="bg-gradient-to-b from-white via-[#F5FCFF] to-white py-20 md:py-28 border-y border-slate-100">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <Sparkles className="w-4 h-4" />
                            How Nobevra Works
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            From Proposal Draft to Paid Deposit in 4 Simple Steps.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            An automated, airtight contract workflow that turns signed proposals into cleared revenue.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 relative">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 01</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Select or Customize</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Pick a pre-built freelance contract generator template (MSA, SOW, Retainer) or paste your custom clauses into our rich legal builder.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <Send className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 02</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Send Secure E-Sign Link</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Deliver a branded client link via email, WhatsApp, or embedded client portal. No account or app download required for the signer.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 text-noble-blue flex items-center justify-center mb-6">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-noble-blue">Step 03</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Client Mobile E-Signs</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Your client reviews terms and adds their digital signature on any device. Nobevra stamps the SHA-256 certificate immediately.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-amber-600">Step 04</span>
                            <h3 className="text-lg font-bold text-near-black mt-1 mb-2">Auto-Trigger Deposit</h3>
                            <p className="text-xs text-near-black/60 leading-relaxed">
                                Nobevra automatically generates the milestone deposit invoice, attaches card payment links, and moves the client into your CRM.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Interactive E-Sign Simulator Sandbox */}
                <div className="max-w-[1000px] mx-auto mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-noble-blue/20 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-noble-blue bg-noble-blue/10 px-3 py-1 rounded-full">
                                Interactive E-Sign Simulator
                            </span>
                            <h3 className="text-xl font-black text-near-black mt-2">Test the Signer Experience in Real Time</h3>
                            <p className="text-xs text-near-black/60">Type a name to preview how signatures and SHA-256 audit stamps are formatted.</p>
                        </div>
                        <div className="flex gap-2">
                            {signatureStyles.map((style, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedStyle(idx)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                        selectedStyle === idx
                                            ? 'bg-noble-blue text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    Style {idx + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 items-center mt-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Signer Full Name
                            </label>
                            <input
                                type="text"
                                value={simulatedSigner}
                                onChange={(e) => {
                                    setSimulatedSigner(e.target.value);
                                    setIsAdopted(false);
                                }}
                                placeholder="Enter your name..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-near-black focus:outline-none focus:border-noble-blue transition-colors"
                            />
                            <p className="text-[11px] text-slate-400 mt-2">
                                In production, signers can either draw their signature on mobile touchscreens or adopt a typed digital signature.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center relative overflow-hidden">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                                Executed Digital Signature
                            </span>
                            <div className="h-16 flex items-center justify-center">
                                <p className={`text-2xl sm:text-3xl text-noble-blue select-none ${signatureStyles[selectedStyle]}`}>
                                    {simulatedSigner.trim() || 'Alex Morgan'}
                                </p>
                            </div>
                            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span>Verified Signer</span>
                                <span className="text-emerald-600 font-bold">● SHA-256 Valid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. CORE CONTRACT CAPABILITIES BENTO GRID ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                        <Layers className="w-4 h-4" />
                        Feature Architecture
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                        Everything You Need to Create, E-Sign & Enforce Client Agreements.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Engineered to replace fragmented e-signature tools with an integrated commercial contract engine.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Bento 1: Legal Compliance */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Legally Binding Digital Contracts</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Fully compliant with the US ESIGN Act, UETA, and EU eIDAS regulations. Electronic signatures signed on Nobevra carry identical legal weight to physical ink.
                            </p>
                        </div>
                        <Link href="/security" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Security & Legal Standards <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 2: Templates */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue mb-6">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Pre-Built Service Agreement Templates</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Access vetted Master Services Agreements, NDAs, freelance scopes of work, and monthly retainer templates with customizable terms and payment clauses.
                            </p>
                        </div>
                        <Link href="/templates" className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline">
                            Browse 180+ Templates <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 3: Contract to Invoice */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">1-Click Invoice & Deposit Conversion</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                When a contract is executed, Nobevra automatically converts milestone schedules into live invoices with instant credit card and bank payment checkout.
                            </p>
                        </div>
                        <Link href="/invoicing" className="text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline">
                            Explore Invoicing Engine <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 4: SHA-256 Audit Trail */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Cryptographic SHA-256 Audit Trail</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Every executed contract includes an immutable certificate recording signer email, IP address, timestamp, device fingerprint, and document hash.
                            </p>
                        </div>
                        <Link href="/compliance" className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                            Audit Certificate Specs <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 5: Mobile Signing */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 mb-6">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Frictionless Mobile E-Signing</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Clients can review scopes, initial terms, and draw or type signatures on any smartphone in under 60 seconds with zero login friction.
                            </p>
                        </div>
                        <Link href="/register" className="text-xs font-bold text-cyan-600 flex items-center gap-1 hover:underline">
                            Test Mobile Sign Flow <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Bento 6: CRM Pipeline Sync */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-near-black mb-3">Connected CRM & Deal Tracking</h3>
                            <p className="text-sm text-near-black/60 leading-relaxed mb-6">
                                Signed agreements link directly to client profiles, tracking total lifetime contract value, active milestone stages, and contract renewal dates.
                            </p>
                        </div>
                        <Link href="/crm" className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                            Client CRM Integration <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 7. PRE-BUILT CONTRACT TEMPLATE SHOWCASE ── */}
            <section className="bg-slate-50/50 py-20 md:py-28 border-y border-slate-200/60">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-4">
                            <FileCheck className="w-4 h-4" />
                            Template Library
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-near-black mb-6">
                            Battle-Tested Service Agreement Templates for Every Deal.
                        </h2>
                        <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                            Protect your time, intellectual property, and payment terms with curated agreements designed for freelancers, consultants, and digital agencies.
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
                                    href="/register"
                                    className="text-xs font-bold text-noble-blue flex items-center gap-1.5 pt-4 border-t border-slate-100 group-hover:translate-x-1 transition-transform"
                                >
                                    Use This Template <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Interactive Clause Inspector */}
                    <div className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
                        <div className="max-w-3xl mb-8">
                            <span className="text-[10px] font-black uppercase tracking-wider text-noble-blue bg-noble-blue/10 px-3 py-1 rounded-full">
                                Clause Inspector
                            </span>
                            <h3 className="text-2xl font-black text-near-black mt-2">
                                Inspect Key Protective Clauses Inside Nobevra Templates
                            </h3>
                            <p className="text-xs text-near-black/60">
                                Click any standard clause to preview how legal protections and milestone triggers are structured.
                            </p>
                        </div>

                        {/* Clause Navigation Tabs */}
                        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-100">
                            {CLAUSES.map((c, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveClause(idx)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        activeClause === idx
                                            ? 'bg-noble-blue text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {c.title}
                                </button>
                            ))}
                        </div>

                        {/* Active Clause Content Display */}
                        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono text-xs text-near-black/80 leading-relaxed">
                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 font-sans">
                                    Sample Contract Prose:
                                </p>
                                &ldquo;{CLAUSES[activeClause].clause}&rdquo;
                            </div>

                            <div className="bg-noble-blue/5 p-6 rounded-2xl border border-noble-blue/15">
                                <span className="text-[10px] font-black uppercase tracking-wider text-noble-blue block mb-1">
                                    Why This Matters:
                                </span>
                                <h4 className="text-sm font-bold text-near-black mb-2">
                                    {CLAUSES[activeClause].tag}
                                </h4>
                                <p className="text-xs text-near-black/70 leading-relaxed mb-4">
                                    {CLAUSES[activeClause].benefit}
                                </p>
                                <Link
                                    href="/register"
                                    className="text-xs font-bold text-noble-blue flex items-center gap-1 hover:underline"
                                >
                                    Customize in Contract Editor <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
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
                        Client Contract Software vs. Standalone E-Sign Apps vs. Word & Email.
                    </h2>
                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed">
                        Why pay for isolated e-signature apps that charge per envelope when you can manage contracts, CRM, and invoicing in one unified platform?
                    </p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm mb-12">
                    <table className="w-full min-w-[650px] text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left px-6 py-4 font-black text-near-black text-xs uppercase tracking-wider">Capability</th>
                                <th className="text-center px-6 py-4 font-black text-noble-blue text-xs uppercase tracking-wider">Nobevra Contracts</th>
                                <th className="text-center px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">DocuSign / PandaDoc</th>
                                <th className="text-center px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Word Docs & Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                ['Legally Binding E-Signatures (ESIGN / eIDAS)', true, true, false],
                                ['1-Click Contract-to-Invoice Generation', true, false, false],
                                ['Integrated Client CRM & Deal Tracking', true, false, false],
                                ['Zero Per-Envelope or Per-Signature Fees', true, false, true],
                                ['Pre-Built Freelance & Agency Templates', true, true, false],
                                ['Automated Deposit Payment Collection', true, false, false],
                                ['Cryptographic SHA-256 Audit Certificate', true, true, false],
                                ['Free Forever Plan Available', true, false, true],
                            ].map(([feature, nobevra, standalone, word], i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                    <td className="px-6 py-4 font-medium text-near-black">{feature as string}</td>
                                    <td className="px-6 py-4 text-center">
                                        {nobevra ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {standalone ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {word ? <span className="text-noble-blue font-black text-base">✓</span> : <span className="text-slate-300 font-black text-base">✕</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Global Legal Enforceability Matrix */}
                <div className="mb-12 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                    <div className="max-w-3xl mb-6">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            Statutory Validity
                        </span>
                        <h3 className="text-xl font-black text-near-black mt-2">
                            Global E-Signature Legal Enforceability Framework
                        </h3>
                        <p className="text-xs text-near-black/60">
                            Nobevra contracts satisfy the evidentiary and technical standards required by major international legal jurisdictions.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-xs">
                            <thead>
                                <tr className="border-b border-slate-200 text-left">
                                    <th className="py-3 px-4 font-black text-near-black uppercase tracking-wider">Jurisdiction</th>
                                    <th className="py-3 px-4 font-black text-near-black uppercase tracking-wider">Governing Statute</th>
                                    <th className="py-3 px-4 font-black text-noble-blue uppercase tracking-wider">Legal Status</th>
                                    <th className="py-3 px-4 font-bold text-slate-500 uppercase tracking-wider">Technical Protection</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {JURISDICTIONS.map((j, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-near-black">{j.region}</td>
                                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{j.statute}</td>
                                        <td className="py-3.5 px-4 font-bold text-emerald-700">{j.status}</td>
                                        <td className="py-3.5 px-4 text-slate-500">{j.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pricing Reassurance Block */}
                <div className="bg-noble-blue/5 border border-noble-blue/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-lg font-black text-near-black mb-1">Create and send legally binding contracts free today.</p>
                        <p className="text-sm text-near-black/60">Nobevra Explorer plan is free forever. No credit card required. Zero envelope throttles.</p>
                    </div>
                    <Link
                        href="/register"
                        className="shrink-0 px-8 py-4 text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(22,111,187,0.25)] whitespace-nowrap"
                        style={{ backgroundColor: '#166FBB' }}
                    >
                        Start Free with Contracts
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* ── 9. INFORMATION GAIN: THE UNSIGNED CONTRACT TRAP ── */}
            <section className="bg-slate-900 text-white py-20 md:py-28">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#01A0E2] font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                                <BarChart3 className="w-4 h-4" />
                                Information Gain Framework
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6">
                                The Unsigned Scope Creep Trap: How Vague Terms Drain 22% of Agency Margins.
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed mb-6">
                                When service providers begin client deliverables without a signed Statement of Work (SOW), scope expansion begins almost immediately. Minor feature requests, extra revision rounds, and shifting deadlines accumulate without compensation.
                            </p>
                            <p className="text-slate-300 text-base leading-relaxed mb-8">
                                Industry research shows uncontracted scope creep reduces service business profitability by an average of 22%. Pre-defining deliverable limits, revision caps, and change order billing rates stops margin erosion before work starts.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                <div>
                                    <p className="text-3xl font-black text-rose-400 mb-1">-22%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average Uncontracted Margin Loss</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-[#01A0E2] mb-1">100%</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Protected via Nobevra SOWs</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6">The 4 Essential Clauses Every Client Contract Needs</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Specific Revision Caps & Change Orders</h4>
                                        <p className="text-xs text-slate-400 mt-1">State the exact number of revision rounds included and the hourly rate for additional requests.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Upfront Deposit & Milestone Triggers</h4>
                                        <p className="text-xs text-slate-400 mt-1">Require a minimum 50% deposit before kickoff, with milestone releases tied to deliverable handoffs.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">IP Transfer Contingent on Full Settlement</h4>
                                        <p className="text-xs text-slate-400 mt-1">Retain ownership of code, designs, and assets until the final invoice balance is completely settled.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold shrink-0">4</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white">Late Payment Penalties & Pause Clauses</h4>
                                        <p className="text-xs text-slate-400 mt-1">Protect cash flow with clear interest penalties and the right to pause work if invoices go overdue.</p>
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
                                    Why Sending Contracts Without Automatic Deposit Invoicing Kills Cash Flow.
                                </h2>

                                <div className="border-l-4 border-noble-blue pl-5 mb-8">
                                    <p className="text-white/70 text-sm sm:text-base leading-relaxed italic">
                                        &ldquo;A signed contract is only half a closed deal. If you wait until after the agreement is signed to manually draft and email a separate deposit invoice, you introduce a second friction point where deals stall for weeks.&rdquo;
                                    </p>
                                </div>

                                <div className="space-y-5 mb-10">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Eliminate the post-signature billing delay</p>
                                            <p className="text-xs text-white/60 leading-relaxed">The minute a client e-signs, Nobevra automatically generates their deposit invoice with instant online payment checkout.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Never start project work without cleared funds</p>
                                            <p className="text-xs text-white/60 leading-relaxed">Automating the deposit trigger ensures your team only allocates billable hours once the upfront retainer has actually cleared.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-noble-blue/20 text-[#01A0E2] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</div>
                                        <div>
                                            <p className="font-bold text-sm text-white mb-1">Zero manual data re-entry</p>
                                            <p className="text-xs text-white/60 leading-relaxed">Contract client details, milestone payment totals, and tax categories roll seamlessly into your invoice ledger and CRM history.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-near-black font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-lg text-base"
                                style={{ backgroundColor: '#01A0E2' }}
                            >
                                Start Sending Connected Contracts Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Right: Stats accent panel */}
                        <div className="bg-noble-blue/10 border-l border-white/5 p-10 sm:p-14 flex flex-col gap-8">
                            <div className="bg-slate-800/80 rounded-3xl p-8 border border-white/5">
                                <p className="text-xs font-black uppercase tracking-wider text-white/40 mb-4">The Disconnected Contract Flow</p>
                                <div className="space-y-4 text-xs text-white/70">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span>Step 1: Send DocuSign contract</span>
                                        <span className="text-slate-400">Day 1</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span>Step 2: Client signs agreement</span>
                                        <span className="text-slate-400">Day 3</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                        <span>Step 3: Manually create invoice in accounting app</span>
                                        <span className="text-slate-400">Day 6</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="font-bold text-white">Total delay before deposit clears:</span>
                                        <span className="text-base font-black text-rose-400">14 Days</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-noble-blue/20 rounded-3xl p-8 border border-noble-blue/20">
                                <p className="text-xs font-black uppercase tracking-wider text-noble-blue mb-4">With Nobevra Unified Contract Engine</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Contract e-signed on mobile in minutes</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Deposit invoice delivered automatically</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-noble-blue flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-white/80">Client pays online via card or bank transfer</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-5 border-t border-noble-blue/20">
                                    <p className="text-3xl font-black text-noble-blue">&lt; 4 Hours</p>
                                    <p className="text-xs text-white/50 mt-1 font-medium uppercase tracking-wider">Average contract-to-deposit cycle</p>
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
                        Trusted by Founders & Service Agencies Worldwide.
                    </h2>
                    <p className="text-base text-near-black/60">
                        See how consultancies, media companies, and logistics teams execute agreements faster with Nobevra.
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
                        Is Nobevra Client Contracts the Right Fit for You?
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
                                        <h4 className="font-bold text-sm text-near-black mb-1">Casual Non-Commercial Documents</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If you only need to sign a one-off personal apartment lease or a school permission slip with zero client billing, free PDF viewer markup tools are sufficient.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">Enterprise 50-Person Redlining Committees</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If your procurement department requires complex multi-department redlining workflows across 50 in-house attorneys, enterprise CLMs like Ironclad are built for that scope.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-rose-100">
                                        ✕
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-near-black mb-1">In-Person Notarization Requirements</h4>
                                        <p className="text-xs text-near-black/60 leading-relaxed">
                                            If your agreements legally require real-time video remote online notarization (RON) with state seal stamps, dedicated legal notary platforms are necessary.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-xs text-slate-400 font-medium">
                                Looking for other solutions? We recommend exploring enterprise CLM platforms for multi-tier procurement committees.
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
                                            You provide professional B2B services and need pre-built MSAs, SOWs, and NDAs that protect your IP and prevent uncontracted scope creep.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Founders Who Want Faster Cash Flow</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You want contracts that automatically trigger deposit invoices and payment links the second the agreement is e-signed on mobile.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-white/15 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-white/20">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white mb-1">Zero Per-Envelope Paywall Fees</h4>
                                        <p className="text-xs text-white/80 leading-relaxed">
                                            You want an all-in-one operating system where contracts, client CRM, invoicing, and expenses live together without paying steep DocuSign fees.
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
                        Common Questions About Client Contracts & E-Signatures.
                    </h2>
                    <p className="text-base text-near-black/60">
                        Everything you need to know about legal enforceability, mobile signing, and automated deposit triggers.
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

            {/* ── 14. RELATED FINANCIAL & CONTRACT TOOLS HUB ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-12 border-t border-slate-200/60">
                <h3 className="text-2xl font-black text-near-black mb-8 text-center">Connected Financial & Client Management Tools</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/invoicing" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Billing Suite</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Online Invoicing</h4>
                        <p className="text-xs text-slate-500">180+ templates & instant online card checkout.</p>
                    </Link>
                    <Link href="/crm" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Client Hub</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Client Management CRM</h4>
                        <p className="text-xs text-slate-500">Track deal stages, signed contracts, and customer LTV.</p>
                    </Link>
                    <Link href="/features/how-to-bill-clients-on-retainer" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Commercial Guide</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">Retainer Billing Playbook</h4>
                        <p className="text-xs text-slate-500">How to lock in recurring monthly client agreements.</p>
                    </Link>
                    <Link href="/templates" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-noble-blue hover:shadow-md transition-all group">
                        <span className="text-xs uppercase tracking-wider font-bold text-noble-blue">Template Vault</span>
                        <h4 className="font-bold text-base text-near-black group-hover:text-noble-blue transition-colors mt-1 mb-2">180+ Business Templates</h4>
                        <p className="text-xs text-slate-500">Curated agreements, invoices, proposals, and receipts.</p>
                    </Link>
                </div>
            </section>

            {/* ── 15. FINAL CONVERSION CTA ── */}
            <section className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="bg-gradient-to-r from-slate-900 via-[#166FBB] to-slate-900 rounded-[36px] p-8 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                            Close Client Deals Faster with Legally Binding Contracts.
                        </h2>
                        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Join growing service businesses that eliminate scope creep, protect their IP, and collect upfront deposits automatically with Nobevra.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-10 py-5 bg-white text-near-black font-extrabold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-105"
                            >
                                Start Free with Contracts
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
