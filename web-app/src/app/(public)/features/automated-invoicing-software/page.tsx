import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Shield, Settings, Activity, Server, Users, Zap, XCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Automated Invoicing Software for Scaling Teams | NobleInvoice',
    description: 'Stop relying on probabilistic AI that requires human verification. NobleInvoice offers deterministic automated invoicing software built for true enterprise scale.',
    openGraph: {
        title: 'Automated Invoicing Software for Scaling Teams | NobleInvoice',
        description: 'Stop relying on probabilistic AI that requires human verification. NobleInvoice offers deterministic automated invoicing software built for true enterprise scale.',
        url: 'https://nobleinvoice.com/features/enterprise-scaling',
        siteName: 'NobleInvoice',
        images: [
            {
                url: '/images/og-enterprise.png',
                width: 1200,
                height: 630,
                alt: 'NobleInvoice Enterprise Scaling Automation',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function EnterpriseScalingPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is there automated invoicing software free download available?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "NobleInvoice is a cloud-based web application, meaning there is no automated invoicing software free download required. You simply access the full enterprise suite through your browser on any device."
                }
            },
            {
                "@type": "Question",
                "name": "What makes this the best automated invoicing software for agencies?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best automated invoicing software relies on deterministic rules, not probabilistic AI. NobleInvoice guarantees that if Condition A is met, Action B happens instantly. This eliminates the need for human verification on recurring retainers."
                }
            },
            {
                "@type": "Question",
                "name": "Is there automated invoicing software free for startups?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. While we build for enterprise scale, we offer an automated invoicing software free tier that allows early-stage teams to set up foundational automation rules before they hit high volume."
                }
            },
            {
                "@type": "Question",
                "name": "Can this be used as invoicing software for contractors?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. It operates flawlessly as invoicing software for contractors who manage multiple sub-contractors, offering unified billing and automated payment routing for complex project structures."
                }
            },
            {
                "@type": "Question",
                "name": "Is this automated invoicing software for small business?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It is designed for businesses of all sizes that are experiencing scaling pains. If you are a solo operator, you might just need a basic PDF generator. But if you are hiring, we provide the automated invoicing software for small business teams looking to act like enterprises."
                }
            }
        ]
    };

    return (
        <main className="min-h-screen bg-white selection:bg-noble-blue/20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* 1 & 2. HERO & EMOTIONAL HOOK */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[#F8FAFC] -z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-noble-blue/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest border border-noble-blue/10 mb-8">
                            Enterprise Scale
                        </div>

                        <h1 className="text-[36px] md:text-[56px] lg:text-[68px] leading-[1.05] tracking-tight font-black mb-8 text-slate-900" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Automated Invoicing Software <br />
                            <span className="text-noble-blue">That Actually Scales.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
                            Most &quot;automated&quot; tools use probabilistic AI that guesses data fields. You still end up manually verifying every invoice. We built a deterministic revenue engine where the rules you set are the laws we follow. Zero verification needed.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link
                                href="/register"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:-translate-y-0.5 active:scale-95"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Start automating today
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Gap Fix: Trust pill */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm">
                                <span className="text-amber-400 text-base leading-none">★★★★★</span>
                                <span className="text-xs font-black text-slate-700">Trusted by 12,000+ scaling teams</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-black text-slate-700">SOC2 Compliant Infrastructure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTEGRATION LOGOS — SERP Gap Fix: Image density + Enterprise Entities */}
            <section className="py-10 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Natively integrates with your existing financial stack</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['NetSuite', 'QuickBooks', 'Sage Intacct', 'Xero', 'Stripe', 'Salesforce'].map((logo, i) => (
                            <div key={i} className="text-lg md:text-xl font-black text-slate-400 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                    <Server className="w-4 h-4 text-slate-400" />
                                </div>
                                {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3 & 4. THE AUTOMATION TRAP */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                The Automation Trap
                            </h2>
                            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-medium">
                                <p>
                                    I speak to finance directors every week who bought &quot;smart&quot; automated invoicing software. They were promised that AI would handle everything.
                                </p>
                                <p>
                                    The reality? The AI guesses the PO number. It estimates the tax rate. And because it operates on probability, human accountants still have to review 73% of the generated invoices before they go out.
                                </p>
                                <p>
                                    That is not scale. That is just moving the manual labor from data entry to data verification. To find the best automated invoicing software, you need a system that does not guess. It executes deterministically.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <XCircle className="w-24 h-24 text-red-500" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-red-600 font-bold text-sm uppercase tracking-widest mb-2">Probabilistic AI (The Old Way)</p>
                                    <p className="text-slate-900 font-black text-xl mb-4">"We are 92% confident this invoice should bill $4,000."</p>
                                    <p className="text-slate-500 text-sm font-medium">Result: You must manually verify it to avoid overcharging your best client.</p>
                                </div>
                            </div>
                            <div className="bg-[#166FBB]/5 border border-[#166FBB]/20 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CheckCircle2 className="w-24 h-24 text-noble-blue" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-noble-blue font-bold text-sm uppercase tracking-widest mb-2">Deterministic Rules (The Noble Way)</p>
                                    <p className="text-slate-900 font-black text-xl mb-4">"If Retainer = Active AND Date = 1st, bill $4,000."</p>
                                    <p className="text-slate-500 text-sm font-medium">Result: The invoice sends while you sleep. Zero human verification required.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. THE ENGINE OF SCALE (Dark Section) */}
            <section className="py-24 bg-near-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-noble-blue/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-[28px] md:text-[42px] font-black leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            The Engine of Scale
                        </h2>
                        <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
                            We engineered a system that replaces guesswork with guarantees. Here is how the best automated invoicing software is actually built under the hood.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: <Settings className="w-6 h-6" />,
                                title: 'Rule-Based Triggers', 
                                desc: 'Set up strict, unbending rules for client billing. No AI hallucinations. If the parameters are met, the invoice routes to the exact stakeholder.' 
                            },
                            { 
                                icon: <Activity className="w-6 h-6" />,
                                title: 'Auto-Reconciliation', 
                                desc: 'When a client pays via our integrated portal, the invoice is marked paid and your ledger updates instantly. Complete hands-off pipeline tracking.' 
                            },
                            { 
                                icon: <Server className="w-6 h-6" />,
                                title: 'Enterprise Integrations', 
                                desc: 'Connect directly to your heavy ERP systems (NetSuite, Sage). We act as the agile front-end billing layer while pushing clean data to your core ledger.' 
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{item.title}</h3>
                                <p className="text-white/60 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE — SERP Gap Fix */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Top Invoice Automation Platforms Compared
                        </h2>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                            How we stack up against traditional enterprise solutions.
                        </p>
                    </div>
                    <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-6 py-4 font-black text-slate-900 w-1/4">Feature</th>
                                    <th className="px-6 py-4 font-black text-noble-blue text-center">NobleInvoice</th>
                                    <th className="px-6 py-4 font-black text-slate-500 text-center">NetSuite</th>
                                    <th className="px-6 py-4 font-black text-slate-500 text-center">Coupa</th>
                                    <th className="px-6 py-4 font-black text-slate-500 text-center">QuickBooks Ent.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: 'Deterministic Routing', ni: '✓', is: '✕ (Probabilistic)', wave: '✕', fb: '✕' },
                                    { feature: 'Zero-Verification Engine', ni: '✓', is: '✕', wave: '✕', fb: '✕' },
                                    { feature: 'Setup Time', ni: 'Hours', is: 'Months', wave: 'Months', fb: 'Days' },
                                    { feature: 'Implementation Cost', ni: '$0', is: '$50k+', wave: '$25k+', fb: '$1k+' },
                                    { feature: 'Role-based permissions', ni: '✓', is: '✓', wave: '✓', fb: '✓' },
                                    { feature: 'Free tier available', ni: '✓', is: '✕', wave: '✕', fb: '✕' },
                                ].map((row, i) => (
                                    <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                        <td className="px-6 py-4 font-bold text-slate-700">{row.feature}</td>
                                        <td className={`px-6 py-4 text-center font-black ${row.ni === '✓' || row.ni === 'Hours' || row.ni === '$0' ? 'text-emerald-500' : 'text-slate-400'}`}>{row.ni}</td>
                                        <td className={`px-6 py-4 text-center font-bold ${row.is === '✓' ? 'text-emerald-500' : 'text-slate-400'}`}>{row.is}</td>
                                        <td className={`px-6 py-4 text-center font-bold ${row.wave === '✓' ? 'text-emerald-500' : 'text-slate-400'}`}>{row.wave}</td>
                                        <td className={`px-6 py-4 text-center font-bold ${row.fb === '✓' ? 'text-emerald-500' : 'text-slate-400'}`}>{row.fb}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* MID-PAGE CTA — SERP Gap Fix */}
            <section className="py-16 bg-noble-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Ready to migrate to a deterministic engine?
                        </h3>
                        <p className="text-white/70 font-medium">Free forever tier available. Upgrade when you hit scale.</p>
                    </div>
                    <Link
                        href="/register"
                        className="shrink-0 bg-white text-noble-blue px-8 py-4 text-sm font-extrabold rounded-2xl hover:bg-white/90 transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                    >
                        Create free account
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* 6 & 7. PROCESS BREAKDOWN */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] uppercase tracking-widest border border-emerald-500/10 mb-6">
                            Deployment
                        </div>
                        <h2 className="text-[28px] md:text-[42px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Roll Out Automation in 3 Steps
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Define Logic', desc: 'Input your deterministic billing cycles, retainer amounts, and contractor payout rules into the NobleInvoice engine.' },
                            { step: '02', title: 'Route Approvals', desc: 'Set up strict permission gateways. If an invoice exceeds $10k, it automatically pauses for director approval before sending.' },
                            { step: '03', title: 'Scale Revenue', desc: 'Watch your cash flow operate autonomously. Your finance team moves from data entry clerks to strategic revenue analysts.' }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 bg-white shadow-sm hover:shadow-md transition-shadow rounded-[32px] border border-slate-100">
                                <div className="text-4xl font-black text-slate-200 mb-6" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{item.step}</div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CASE STUDY */}
            <section className="py-24 bg-white">
                <div className="max-w-[900px] mx-auto px-4 md:px-16 text-center">
                    <div className="mb-8 flex justify-center">
                        <Image
                            src="/images/reviews/michael-c-founder-of-nexus-dev-ag.png"
                            alt="automated invoicing software"
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-noble-blue/10 object-cover"
                        />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        "We run a 40-person agency. Transitioning from a generic free tool to NobleInvoice's automated system saved us literally 40 hours a month in manual reconciliation. It's the most reliable invoicing software for contractors and full-time staff we've ever used."
                    </h3>
                    <p className="font-bold text-slate-900">Michael C.</p>
                    <p className="text-sm text-slate-500 mt-1">Founder, Nexus Dev Agency</p>
                </div>
            </section>

            {/* MULTI-REVIEW GRID — SERP Gap Fix: Image density & Trust */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <h2 className="text-[28px] md:text-[36px] font-black text-slate-900 leading-[1.1] tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Trusted by Scaling Teams
                        </h2>
                        <p className="text-slate-500 font-medium">What enterprises switching from legacy tools are saying.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                img: '/images/reviews/barr-emma-duruigbo-founder-of-ducex-solicitors-ltd.png',
                                quote: '"Our previous software guessed the wrong client entity twice. NobleInvoice\'s strict rules mean we never make that mistake again."',
                                name: 'Barr. Emma Duruigbo',
                                role: 'Founder, Ducex Solicitors Ltd',
                                link: '/pricing',
                                linkLabel: 'View pricing'
                            },
                            {
                                img: '/images/reviews/priya-sharma-managing-director-wavecreast-beach-hotel.png',
                                quote: '"The automated routing handles 500+ invoices a month seamlessly across our properties without human intervention."',
                                name: 'Priya Sharma',
                                role: 'Managing Director, Wavecreast Beach Hotel',
                                link: '/features/team-workspace',
                                linkLabel: 'Explore Team Workspace'
                            },
                            {
                                img: '/images/reviews/david-rodriguez-region-director-for-surebricks-real-estate.png',
                                quote: '"It replaced a $2,000/mo enterprise tool for us. The deterministic logic is simply bulletproof."',
                                name: 'David Rodriguez',
                                role: 'Regional Director, Surebricks',
                                link: '/about',
                                linkLabel: 'Our story'
                            },
                        ].map((review, i) => (
                            <div key={i} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col gap-6 hover:-translate-y-1 transition-transform">
                                <p className="text-slate-700 font-medium leading-relaxed text-sm italic flex-1">{review.quote}</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                    <Image
                                        src={review.img}
                                        alt={`automated invoicing software - ${review.name}`}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover border-2 border-noble-blue/10 shrink-0"
                                    />
                                    <div>
                                        <p className="font-black text-slate-900 text-sm">{review.name}</p>
                                        <p className="text-[11px] text-slate-400 font-medium">{review.role}</p>
                                    </div>
                                </div>
                                <Link href={review.link} className="text-[11px] font-black uppercase tracking-widest text-noble-blue hover:underline">
                                    {review.linkLabel} →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. FAQ / DISQUALIFICATION */}
            <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <h2 className="text-[28px] md:text-[42px] font-black text-center text-slate-900 leading-[1.1] tracking-tight mb-12" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        The Truth About Automation
                    </h2>
                    
                    <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-red-500" />
                            <h3 className="text-lg font-black text-slate-900">We may not be right for you if...</h3>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            If you only send 3 invoices a month, our system is overkill. You can find a basic automated invoicing software free tool online for that. But if you have contractors to pay, retainers to collect, and a growing team that needs role-based access, you need NobleInvoice.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Is there automated invoicing software free download available?", a: "NobleInvoice is a cloud-based web application, meaning there is no automated invoicing software free download required. You simply access the full enterprise suite through your browser on any device." },
                            { q: "What makes this the best automated invoicing software for agencies?", a: "The best automated invoicing software relies on deterministic rules, not probabilistic AI. NobleInvoice guarantees that if Condition A is met, Action B happens instantly. This eliminates the need for human verification on recurring retainers." },
                            { q: "Is there automated invoicing software free for startups?", a: <>Yes. While we build for enterprise scale, we offer an <Link href="/pricing" className="text-noble-blue font-bold hover:underline">automated invoicing software free tier</Link> that allows early-stage teams to set up foundational automation rules before they hit high volume.</> },
                            { q: "Can this be used as invoicing software for contractors?", a: "Absolutely. It operates flawlessly as invoicing software for contractors who manage multiple sub-contractors, offering unified billing and automated payment routing for complex project structures." },
                            { q: "Is this automated invoicing software for small business?", a: "It is designed for businesses of all sizes that are experiencing scaling pains. If you are a solo operator, you might just need a basic PDF generator. But if you are hiring, we provide the automated invoicing software for small business teams looking to act like enterprises." }
                        ].map((faq, i) => (
                            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                                <h3 className="font-black text-slate-900 mb-3">{faq.q}</h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. SOFT CTA */}
            <section className="py-24 bg-noble-blue relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                <div className="max-w-[800px] mx-auto px-4 md:px-16 relative z-10">
                    <h2 className="text-[32px] md:text-[48px] font-black text-white leading-[1.1] tracking-tight mb-8" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Stop verifying. Start automating.
                    </h2>
                    <p className="text-white/80 font-medium text-lg mb-12 max-w-2xl mx-auto">
                        Join the businesses that have abandoned unreliable AI guesses for deterministic, scalable revenue automation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-white text-noble-blue px-10 py-5 text-base font-extrabold rounded-2xl hover:bg-white/90 transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3"
                        >
                            Build your automation engine
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
