import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import Footer from '@/components/shared/Footer';
import {
    Trophy, Target, Zap, ShieldCheck, CheckCircle2, ChevronDown,
    Brain, Star, ArrowRight, Activity, TrendingUp, Medal
} from 'lucide-react';

/* ── SEO Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
    title: 'Gamified Invoicing Software — Make Billing Fun | NobleInvoice',
    description: 'Stop dreading your billing day. NobleInvoice turns invoicing into an XP-driven game. Hit business financial goals, earn badges, and get paid faster.',
    keywords: [
        'gamified invoicing',
        'make billing fun',
        'business financial goals',
        'freelance gamification',
        'startup tracking'
    ],
    openGraph: {
        title: 'Gamified Invoicing Software — Make Billing Fun | NobleInvoice',
        description: 'Level up your cash flow. Earn XP and badges for every invoice sent and paid.',
        url: 'https://nobleinvoice.com/gamified-invoicing',
        type: 'website',
    },
};

/* ── Page Data ──────────────────────────────────────────────────── */
const steps = [
    {
        step: '01',
        icon: Zap,
        title: 'Send an Invoice',
        desc: 'Draft and send a professional invoice in 30 seconds. Boom. You just earned 50 XP for making a move.',
    },
    {
        step: '02',
        icon: Target,
        title: 'Hit Financial Goals',
        desc: 'Set custom startup tracking milestones. Watch your progress bar fill up as clients view and pay your bills.',
    },
    {
        step: '03',
        icon: CheckCircle2,
        title: 'Get Paid & Level Up',
        desc: 'Money hits your account. You earn 100 XP, unlock the "Cash Flow King" badge, and hit Level 5.',
    },
    {
        step: '04',
        icon: Trophy,
        title: 'Top the Leaderboard',
        desc: 'Compare your hustle against other founders. See who can maintain the longest paid-on-time streak.',
    },
];

const features = [
    {
        icon: Trophy,
        title: 'The XP Engine',
        desc: 'We baked gaming psychology directly into your ledger. Earn experience points for the actions that actually grow your business—sending invoices, logging receipts, and securing payments.',
        tag: 'Freelance Gamification',
    },
    {
        icon: Target,
        title: 'Milestone Tracking',
        desc: 'Stop staring at boring spreadsheets. Set your monthly business financial goals and watch your dashboard visually evolve as you get closer to hitting them.',
        tag: 'Startup Tracking',
    },
    {
        icon: Brain,
        title: 'Dopamine-Driven Habits',
        desc: 'Procrastinating your billing costs you money. Our streak mechanics and visual rewards trigger positive dopamine loops, training you to bill faster and cleaner.',
        tag: 'Behavioral Design',
    },
    {
        icon: Medal,
        title: 'Achievement Badges',
        desc: 'Unlock exclusive badges like "First Blood" (first invoice sent) and "Automation Pro". Show off your rank on your public freelancer profile.',
        tag: 'Rewards',
    },
];

const stats = [
    { value: '40%', label: 'Increase in billing speed', sublabel: 'Users bill faster when tracking XP' },
    { value: '3x', label: 'Higher engagement', sublabel: 'Compared to standard ledgers' },
    { value: '14 Days', label: 'Faster payments', sublabel: 'Clients pay faster to keep your streak' },
    { value: 'Level 10', label: 'The ultimate rank', sublabel: 'Reserved for cash flow masters' },
];

const faqs = [
    {
        q: 'What exactly is gamified invoicing?',
        a: "It's the process of applying game mechanics—like XP points, levels, badges, and progress bars—to the usually boring task of billing clients. By turning administrative work into a rewarding system, we make billing fun and completely eliminate the dread of manual bookkeeping.",
    },
    {
        q: 'Does gamification make my business look unprofessional?',
        a: "Not at all. The gamification happens entirely on your end in the private dashboard. Your clients still receive beautifully crafted, ultra-professional PDF invoices and payment links. They see the business; you get to play the game.",
    },
    {
        q: 'How does this actually help me get paid faster?',
        a: "Psychology. Procrastination is the number one reason freelancers get paid late. Because you're trying to hit the next level or maintain a 30-day billing streak, you send invoices immediately after completing work. Faster invoicing mathematically equals faster payments.",
    },
    {
        q: 'What kind of actions earn XP?',
        a: 'You earn XP for revenue-generating actions. For example: 50 XP for sending an invoice, 100 XP for receiving a payment, and 25 XP for keeping your books clean by scanning a receipt.',
    },
    {
        q: 'Can I track my business financial goals with this?',
        a: 'Absolutely. The XP engine ties directly into your financial targets. As your revenue grows, your Level increases, giving you a clear, visual indicator of your startup tracking progress without needing an accounting degree.',
    },
    {
        q: 'Is my financial data secure while using these features?',
        a: 'Yes. NobleInvoice uses bank-grade 256-bit AES encryption and is strictly compliant with global financial data standards. The gamification layer sits safely on top of an enterprise-grade ledger.',
    },
];

const reviews = [
    {
        quote: "Tracking media production expenses used to be a nightmare. Now, hitting my monthly revenue targets feels like beating a level in a video game. It completely changed my mindset.",
        name: "Beautrice Moreau",
        role: "Operations Manager, Eagles Media",
        image: "/images/reviews/beautrice-moreau-operations-manager-at-eagles-media.png",
    },
    {
        quote: "I used to put off invoicing until the end of the month. The XP streaks actually motivated me to bill daily. My cash flow has literally never been healthier.",
        name: "Glory Ebasabor",
        role: "Founder, D-Amin Grow",
        image: "/images/reviews/glory-ebasabor-founder-of-d-amin-grow.jpeg",
    },
    {
        quote: "Standardizing our billing was great, but the leaderboard added a fun competitive edge for our small team. It's the only accounting app I don't hate opening.",
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
        "name": "NobleInvoice Gamified Invoicing",
        "operatingSystem": "Web, iOS, Android",
        "applicationCategory": "BusinessApplication",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "842"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free gamified starter plan available"
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
export default function GamifiedInvoicingPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            {/* Inject JSON-LD */}
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareSchema()) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }} />

            {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
            <section className="relative pt-16 pb-28 overflow-hidden" aria-label="Hero">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-400/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-noble-blue/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left: copy */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-near-black/5 shadow-sm text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-8">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                The First XP-Driven Billing Engine
                            </div>

                            <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
                                Stop dreading your <span className="text-noble-blue">billing day.</span>
                            </h1>

                            <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-8 leading-relaxed">
                                Traditional invoicing feels like a chore. You started a business to build things, not to stare at gray spreadsheets. We turned getting paid into a game you actually want to win. <strong>Make billing fun</strong> and hit your financial targets faster.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Link
                                    href="/register"
                                    className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                    style={{ backgroundColor: '#166FBB' }}
                                >
                                    Start Gamified Invoicing
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
                                Free to play · No credit card required · Cancel anytime
                            </p>
                        </div>

                        {/* Right: visual mockup card */}
                        <div className="relative z-10 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[480px]">
                                {/* Main card */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_30px_80px_rgba(22,111,187,0.12)] border border-slate-100 p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-noble-blue rounded-full border-4 border-white shadow-md flex items-center justify-center text-white font-black text-xl">
                                                N
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-lg">Level 5 Founder</p>
                                                <p className="text-xs text-slate-400 font-bold">2,450 XP</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                                            <Trophy className="w-5 h-5 text-amber-500" />
                                        </div>
                                    </div>

                                    {/* Mock Action */}
                                    <div className="bg-slate-50 rounded-2xl p-5 mb-5 border border-slate-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">Invoice #0042 Paid</p>
                                                <p className="text-[11px] text-slate-500 font-medium">Acme Corp · $4,500</p>
                                            </div>
                                        </div>
                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                                <span>Level Progress</span>
                                                <span className="text-noble-blue">+100 XP Earned!</span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                                <div className="bg-amber-400 h-2.5 rounded-full w-[85%] relative">
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex justify-between items-center gap-3">
                                        <div className="flex-1 bg-white border border-slate-100 rounded-xl py-3 px-2 flex flex-col items-center justify-center shadow-sm">
                                            <span className="text-xl mb-1">🥇</span>
                                            <span className="text-[9px] font-black uppercase text-slate-500">First Blood</span>
                                        </div>
                                        <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl py-3 px-2 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/20 to-transparent" />
                                            <span className="text-xl mb-1">👑</span>
                                            <span className="text-[9px] font-black uppercase text-amber-700">Cash King</span>
                                        </div>
                                        <div className="flex-1 bg-white border border-slate-100 rounded-xl py-3 px-2 flex flex-col items-center justify-center shadow-sm grayscale opacity-50">
                                            <span className="text-xl mb-1">🤖</span>
                                            <span className="text-[9px] font-black uppercase text-slate-500">Auto Pro</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating notification */}
                                <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                                    <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-green-500 -rotate-45" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Level Up!</p>
                                        <p className="text-[10px] text-slate-400 font-medium">You reached Level 6</p>
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

            {/* ══ 3. PROBLEM SECTION ═══════════════════════════════════════ */}
            <section className="py-28 relative" aria-labelledby="problem-heading">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            {/* Visual Representation of "Boring Accounting" */}
                            <div className="bg-slate-100 rounded-[32px] p-8 border border-slate-200 grayscale opacity-80">
                                <div className="space-y-3">
                                    <div className="h-4 w-1/3 bg-slate-300 rounded" />
                                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                                    <div className="pt-6 space-y-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="flex gap-4">
                                                <div className="h-8 w-8 bg-slate-300 rounded" />
                                                <div className="flex-1 h-8 bg-slate-200 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-red-100">
                                The old way is broken
                            </div>
                            <h2 id="problem-heading" className="font-inter font-black text-[28px] md:text-[40px] text-near-black leading-[1.1] tracking-tight mb-6">
                                Why the old way of billing{' '}
                                <span className="text-red-500">breaks solo founders.</span>
                            </h2>
                            <p className="text-base text-near-black/60 leading-relaxed mb-6">
                                Think about standard accounting tools. They are designed for CPAs with green visors. They are painfully dull, strictly transactional, and give zero emotional feedback when you actually succeed. 
                            </p>
                            <p className="text-base text-near-black/60 leading-relaxed mb-8">
                                Because traditional ledgers are boring, you procrastinate. You leave invoices sitting in drafts. You forget to log receipts. And ultimately, that delay starves your business of cash.
                            </p>
                            <div className="p-5 bg-noble-blue/5 border border-noble-blue/10 rounded-2xl">
                                <p className="text-sm font-black text-slate-900 mb-1">Our strategic pivot:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">We threw out the gray ledgers. We realized that if we reward the behavior of billing, you will bill faster. It's the ultimate hack for <strong>freelance gamification</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. INFORMATION GAIN: The Dopamine Loop ════════════════════ */}
            <section className="py-28 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="info-gain-heading">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-noble-blue/20 pointer-events-none" />
                <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-8 border border-white/20">
                            The Psychology of Getting Paid
                        </div>
                        <h2 id="info-gain-heading" className="font-inter font-black text-[28px] md:text-[44px] leading-[1.1] tracking-tight mb-6">
                            The Dopamine Loop of Gamified Invoicing
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            How shifting from "task completion" to "reward acquisition" fundamentally changes your relationship with money.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'The Trigger', icon: Activity, desc: 'Instead of seeing a pending task as a burden, you see an opportunity to gain 50 XP. The mental friction of opening the app vanishes.' },
                            { title: 'The Action', icon: Zap, desc: 'You draft and send the invoice in 30 seconds. Because it felt like a quick win rather than a chore, you establish a habit of immediate billing.' },
                            { title: 'The Reward', icon: Star, desc: 'Your client pays. You instantly jump a Level, unlock a milestone badge, and hit your business financial goals. The loop closes with a rush of dopamine.' },
                        ].map((item, i) => (
                            <div key={item.title} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="font-black text-xl mb-3">Step {i + 1}: {item.title}</h3>
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
                            How freelance gamification <span className="text-noble-blue">actually works.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((s, i) => (
                            <div key={s.step} className="relative p-8 rounded-[28px] bg-slate-50 border border-slate-100 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-400/10 transition-all group">
                                <span className="absolute top-6 right-6 font-black text-[40px] text-slate-200 leading-none select-none">{s.step}</span>
                                <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-400 group-hover:border-amber-400 transition-all">
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
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-amber-100">
                            Real results
                        </div>
                        <h2 id="reviews-heading" className="font-inter font-black text-[28px] md:text-[44px] text-near-black leading-[1.1] tracking-tight">
                            Founders tracking <span className="text-amber-500">startup goals.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.map((r) => (
                            <div key={r.name} className="bg-slate-50 rounded-[32px] border border-slate-100 p-8 hover:shadow-xl hover:shadow-amber-400/5 transition-all">
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

            {/* ══ 8. NOT FOR YOU SECTION ═══════════════════════════════════ */}
            <section className="py-20 bg-white border-t border-slate-100" aria-label="Qualifier">
                <div className="max-w-3xl mx-auto px-4 md:px-16">
                    <div className="bg-slate-900 text-white rounded-[32px] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-[80px] rounded-full pointer-events-none" />
                        
                        <h2 className="font-inter font-black text-[24px] md:text-[32px] mb-6 relative z-10">
                            We may not be right for you if…
                        </h2>
                        <ul className="space-y-4 relative z-10">
                            {[
                                'You are a corporate CPA looking for dense, gray spreadsheets.',
                                'You think business software has to be boring to be "professional."',
                                'You do not care about improving the speed at which you get paid.',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-black mt-0.5">✗</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                            <p className="text-sm text-slate-400 font-medium">
                                If you want to make billing fun and engaging —{' '}
                                <Link href="/register" className="text-amber-400 font-black hover:underline">
                                    NobleInvoice is built for you.
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
                            Questions about <span className="text-noble-blue">gamified invoicing</span>
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
                        Level Up Today
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
                        Turn your outstanding invoices <br />
                        <span className="text-noble-blue">into a high score.</span>
                    </h2>
                    <p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto font-bold leading-relaxed">
                        Start with our free plan. Hit your first milestone, unlock your first badge, and completely change how you view business finances.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                        <Link
                            href="/register"
                            className="bg-noble-blue text-white px-12 py-6 text-xl font-black rounded-[24px] hover:bg-noble-blue/90 hover:scale-105 transition-all shadow-2xl shadow-noble-blue/30 flex items-center gap-3"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Start playing for free
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                    <p className="mt-8 text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                        No credit card required · Full XP Engine included
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
