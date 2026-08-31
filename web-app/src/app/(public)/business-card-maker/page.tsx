import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import {
    CreditCard, Smartphone, Wifi, Palette, Share2, QrCode,
    Zap, Star, ArrowRight, CheckCircle, ShieldCheck, Globe
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Digital Business Card Maker | NFC & QR Business Cards | Nobevra',
    description: 'Create a stunning digital business card in minutes. Share via NFC tap, QR code, or link. No printing required. Free digital business card maker with custom branding.',
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/digital-business-card'
    }
};

/* ── Page Data ──────────────────────────────────────────────────── */
const steps = [
    {
        step: '01',
        icon: Palette,
        title: 'Design Your Card',
        desc: 'Pick a template, add your logo, choose your brand colors, and fill in your details. The whole process takes under 3 minutes.',
    },
    {
        step: '02',
        icon: QrCode,
        title: 'Get Your QR Code',
        desc: 'Your card is instantly published at a unique link. A scannable QR code is auto-generated — ready to download and print or display on your phone.',
    },
    {
        step: '03',
        icon: Wifi,
        title: 'Tap or Share',
        desc: 'Share via NFC tap, a clickable link in your email signature, or an Instagram bio. No app installation required on the recipient\'s end.',
    },
    {
        step: '04',
        icon: Zap,
        title: 'Get Paid Faster',
        desc: 'Your digital card links directly to your Nobevra payment page. Turn a handshake into a paid invoice in one smooth flow.',
    },
];

const features = [
    {
        icon: Smartphone,
        title: 'One Tap via NFC',
        desc: 'Hold your phone near another device and your full contact card transfers instantly. No app needed on the other end. Just a tap.',
        tag: 'NFC Business Card App',
    },
    {
        icon: QrCode,
        title: 'Instant QR Code',
        desc: 'Every card generates a permanent, scannable QR code. Drop it in your email signature, print it on a physical card, or display it on your screen.',
        tag: 'QR Code Business Card',
    },
    {
        icon: Palette,
        title: 'Custom Branding',
        desc: 'Upload your logo, set your brand colors, and choose from professionally designed card templates that reflect your business identity.',
        tag: 'Virtual Business Card Creator',
    },
    {
        icon: Globe,
        title: 'Works Everywhere',
        desc: 'Your digital business card is a universal link. No app required. Works on Android, iOS, Windows, and Mac — any device with a browser.',
        tag: 'Electronic Business Card',
    },
];

const stats = [
    { value: '88%', label: 'Cards thrown away', sublabel: 'Of physical business cards within a week' },
    { value: '10x', label: 'More shares', sublabel: 'Digital vs. physical card sharing rates' },
    { value: '27B', label: 'Cards printed yearly', sublabel: 'Generating 7.2M lbs of landfill waste' },
    { value: '$0', label: 'Cost to create', sublabel: 'Forever free with Nobevra' },
];

const faqs = [
    {
        q: 'What is a digital business card?',
        a: 'A digital business card is an electronic version of a traditional paper business card. It contains your contact information, social links, and branding — accessible via a unique URL, QR code, or NFC tap. Unlike physical cards, it can be updated anytime and never runs out.',
    },
    {
        q: 'Is the digital business card maker free?',
        a: 'Yes, completely free. You can create a digital business card, generate a QR code, and share it via link at no cost. Pro plan users unlock advanced customization, analytics, and NFC-optimized templates.',
    },
    {
        q: 'How does the NFC feature work?',
        a: 'If your phone supports NFC (most modern smartphones do), you can share your card by simply holding your phone close to another NFC-enabled device. The recipient instantly sees your digital card in their browser — no app required.',
    },
    {
        q: 'Can I update my digital business card after creating it?',
        a: 'Absolutely. This is one of the biggest advantages over paper cards. Update your phone number, job title, or social media links anytime. Everyone who scanned your QR code or tapped your NFC card will automatically see the latest version.',
    },
    {
        q: 'How do I share my QR code business card?',
        a: 'You can share it in multiple ways: download the QR code image and add it to your email signature, print it on physical materials, display it on your phone screen for in-person meetings, or share your unique card link directly on social media.',
    },
    {
        q: 'Does it integrate with Nobevra invoicing?',
        a: 'Yes, seamlessly. Your digital business card can link directly to your public payment and invoice page. When a new contact scans your card, they can hire you and receive a professional invoice — all in the same session.',
    },
    {
        q: 'Is a digital business card better than a paper one?',
        a: 'For most professionals, yes. 88% of physical business cards are thrown away within a week. A digital business card is always up to date, impossible to lose, infinitely shareable, and costs nothing to reproduce. It also has a significantly lower environmental impact.',
    },
    {
        q: 'Can I have multiple business cards?',
        a: 'Yes. You can create separate cards for different roles or contexts — a personal brand card, a company card, and an event-specific card — all managed from your single Nobevra account.',
    },
];

const reviews = [
    {
        quote: "I was handing out paper cards at a conference and a colleague showed me their digital card. I signed up for Nobevra that evening. Haven't printed a single card since.",
        name: 'Emeka Obi',
        role: 'UX Consultant',
        rating: 5,
    },
    {
        quote: "The QR code integration is brilliant. I put it in my email footer and I get 3-4 new contacts a week just from people scanning it. Completely passive networking.",
        name: 'Chioma Adeyemi',
        role: 'Brand Strategist',
        rating: 5,
    },
    {
        quote: "Being able to update my card without reprinting is worth everything. Changed jobs, updated my title in 30 seconds. My card was still perfect at every networking event.",
        name: 'Taiwo Bakare',
        role: 'Product Manager',
        rating: 5,
    },
];

const comparisonRows = [
    { feature: 'Free to create', noble: true, moo: false, haystack: false, popl: false },
    { feature: 'QR code included', noble: true, moo: true, haystack: true, popl: true },
    { feature: 'NFC sharing', noble: true, moo: false, haystack: true, popl: true },
    { feature: 'Integrated invoicing', noble: true, moo: false, haystack: false, popl: false },
    { feature: 'Unlimited updates', noble: true, moo: false, haystack: true, popl: true },
    { feature: 'Custom branding', noble: true, moo: true, haystack: true, popl: true },
    { feature: 'Analytics & views', noble: true, moo: false, haystack: false, popl: false },
    { feature: 'No app required to receive', noble: true, moo: true, haystack: true, popl: false },
];

/* ── JSON-LD Schema Generators ──────────────────────────────────── */
const generateSoftwareSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nobevra Digital Business Card Maker',
    operatingSystem: 'Web, iOS, Android',
    applicationCategory: 'BusinessApplication',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free digital business card creation',
    },
});

const generateFAQSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
});

/* ── CheckMark helper ───────────────────────────────────────────── */
const Check = ({ yes }: { yes: boolean }) =>
    yes ? (
        <span className="text-emerald-500 font-black text-lg">✓</span>
    ) : (
        <span className="text-slate-300 font-black text-lg">—</span>
    );

/* ── FAQ Item ───────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
    return (
        <details className="group border border-slate-100 rounded-2xl overflow-hidden bg-white">
            <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-near-black text-sm md:text-base">
                {q}
                <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-open:bg-noble-blue/10 group-open:text-noble-blue transition-colors">
                    <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
            </summary>
            <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                {a}
            </div>
        </details>
    );
}

/* ── Page Component ─────────────────────────────────────────────── */
export default function BusinessCardMakerPage() {
    return (
        <div className="bg-gradient-to-b from-[#F0F9FF] via-white to-[#F5FCFF] text-near-black font-inter antialiased overflow-x-hidden pt-[118px]">
            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareSchema()) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }} />

            {/* ══ 1. HERO ══════════════════════════════════════════════════ */}
            <section className="relative pt-16 pb-28 overflow-hidden" aria-label="Hero">
                <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left copy */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noble-blue/8 border border-noble-blue/15 mb-6">
                                <CreditCard className="w-4 h-4 text-noble-blue" />
                                <span className="text-xs font-black text-noble-blue uppercase tracking-widest">Digital Business Card Maker</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.05] tracking-tight mb-6">
                                Your Paper Cards<br />
                                <span className="text-noble-blue">Are Already In The Bin.</span>
                            </h1>
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                                88% of physical business cards are thrown away within a week. Create a free digital business card that lives on your phone, shares via NFC tap or QR code, and never runs out of print.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link
                                    href="/register"
                                    id="hero-cta-create"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-noble-blue text-white font-black text-sm uppercase tracking-widest shadow-[0_10px_40px_rgba(5,153,213,0.35)] hover:bg-noble-blue/90 hover:-translate-y-0.5 transition-all"
                                >
                                    Create Free Card <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/studio"
                                    id="hero-cta-demo"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-near-black font-black text-sm uppercase tracking-widest border border-slate-200 hover:border-noble-blue/30 hover:bg-slate-50 transition-all"
                                >
                                    View Live Demo
                                </Link>
                            </div>
                            {/* Trust badges */}
                            <div className="flex items-center gap-6 flex-wrap">
                                {['No credit card', 'Free forever', 'No app to install'].map(t => (
                                    <div key={t} className="flex items-center gap-2 text-sm text-slate-500">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — card mockup */}
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-full max-w-[420px]">
                                {/* Glow */}
                                <div className="absolute inset-0 bg-noble-blue/10 blur-[60px] rounded-full scale-110 pointer-events-none" />
                                {/* Card preview */}
                                <div className="relative bg-gradient-to-br from-[#01A0E2] to-[#006970] rounded-[32px] p-8 shadow-[0_40px_80px_rgba(5,153,213,0.3)] text-white">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">Nobevra</p>
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                <CreditCard className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Wifi className="w-6 h-6 text-white/80 ml-auto mb-1" />
                                            <p className="text-xs text-white/60">NFC Ready</p>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-black tracking-tight">Noble World</h2>
                                        <p className="text-white/70 text-sm mt-1">Founder & CEO, Nobevra</p>
                                    </div>
                                    <div className="border-t border-white/20 pt-5 flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-xs text-white/60">hello@nobevra.noblesworld.com.ng</p>
                                            <p className="text-xs text-white/60">nobevra.noblesworld.com.ng</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                            <QrCode className="w-8 h-8 text-noble-blue" />
                                        </div>
                                    </div>
                                </div>
                                {/* Floating badges */}
                                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2 border border-slate-100">
                                    <Share2 className="w-4 h-4 text-noble-blue" />
                                    <span className="text-xs font-black text-slate-700">Shared 1,247 times</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-emerald-500 rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                    <span className="text-xs font-black text-white">Card saved to contacts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. STATS BAND ════════════════════════════════════════════ */}
            <section className="py-16 border-y border-slate-100 bg-white" aria-label="Statistics">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map(s => (
                            <div key={s.label} className="text-center">
                                <p className="text-4xl md:text-5xl font-black text-noble-blue mb-1">{s.value}</p>
                                <p className="text-sm font-bold text-near-black">{s.label}</p>
                                <p className="text-xs text-slate-400 mt-1">{s.sublabel}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. HOW IT WORKS ══════════════════════════════════════════ */}
            <section className="py-24" aria-label="How it works">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <p className="text-xs font-black text-noble-blue uppercase tracking-widest mb-3">The Process</p>
                        <h2 className="text-3xl md:text-5xl font-black text-near-black tracking-tight">
                            From Zero to Networking<br />in Under 3 Minutes
                        </h2>
                        <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
                            Our digital business card maker is deliberately simple. No design degree required.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.step} className="relative bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <span className="absolute top-6 right-6 text-5xl font-black text-slate-50 select-none">{step.step}</span>
                                    <div className="w-12 h-12 rounded-2xl bg-noble-blue/8 flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6 text-noble-blue" />
                                    </div>
                                    <h3 className="text-base font-black text-near-black mb-2">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ 4. FEATURES ══════════════════════════════════════════════ */}
            <section className="py-24 bg-slate-50/60" aria-label="Features">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-16">
                        <p className="text-xs font-black text-noble-blue uppercase tracking-widest mb-3">Why It Works</p>
                        <h2 className="text-3xl md:text-5xl font-black text-near-black tracking-tight">
                            Built for the Digital-First Professional
                        </h2>
                        <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">
                            Every feature is designed around one goal: making you unforgettable after the handshake.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feat) => {
                            const Icon = feat.icon;
                            return (
                                <div key={feat.title} className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-noble-blue/8 flex items-center justify-center">
                                        <Icon className="w-7 h-7 text-noble-blue" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-noble-blue uppercase tracking-widest border border-noble-blue/20 bg-noble-blue/5 px-2 py-0.5 rounded-full mb-2 inline-block">{feat.tag}</span>
                                        <h3 className="text-lg font-black text-near-black mb-2">{feat.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ 5. COMPARISON TABLE ══════════════════════════════════════ */}
            <section className="py-24" aria-label="Competitor Comparison">
                <div className="max-w-[1100px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <p className="text-xs font-black text-noble-blue uppercase tracking-widest mb-3">Why Nobevra</p>
                        <h2 className="text-3xl md:text-4xl font-black text-near-black">
                            We Win Where It Matters
                        </h2>
                    </div>
                    <div className="overflow-x-auto rounded-[28px] border border-slate-100 shadow-sm bg-white">
                        <table className="w-full text-sm" aria-label="Feature comparison">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left p-5 font-black text-near-black">Feature</th>
                                    <th className="p-5 font-black text-noble-blue bg-noble-blue/5">Nobevra</th>
                                    <th className="p-5 font-bold text-slate-400">Moo</th>
                                    <th className="p-5 font-bold text-slate-400">HiHello</th>
                                    <th className="p-5 font-bold text-slate-400">Popl</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row, i) => (
                                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-slate-50/40' : ''}>
                                        <td className="p-5 text-slate-600 font-medium">{row.feature}</td>
                                        <td className="p-5 text-center bg-noble-blue/5"><Check yes={row.noble} /></td>
                                        <td className="p-5 text-center"><Check yes={row.moo} /></td>
                                        <td className="p-5 text-center"><Check yes={row.haystack} /></td>
                                        <td className="p-5 text-center"><Check yes={row.popl} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ══ 6. REVIEWS ═══════════════════════════════════════════════ */}
            <section className="py-24 bg-slate-50/60" aria-label="Reviews">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <p className="text-xs font-black text-noble-blue uppercase tracking-widest mb-3">Social Proof</p>
                        <h2 className="text-3xl md:text-4xl font-black text-near-black">
                            From People Who Ditched Paper
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {reviews.map(review => (
                            <div key={review.name} className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm flex flex-col">
                                <div className="flex gap-1 mb-5">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed italic flex-1 mb-6">&ldquo;{review.quote}&rdquo;</p>
                                <div className="flex items-center gap-3 border-t border-slate-50 pt-5">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-noble-blue/20 to-cyan-400/20 flex items-center justify-center text-noble-blue font-black text-sm">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-near-black">{review.name}</p>
                                        <p className="text-xs text-slate-400">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 7. FAQ ═══════════════════════════════════════════════════ */}
            <section className="py-24" aria-label="FAQ">
                <div className="max-w-[840px] mx-auto px-4 md:px-16">
                    <div className="text-center mb-12">
                        <p className="text-xs font-black text-noble-blue uppercase tracking-widest mb-3">FAQ</p>
                        <h2 className="text-3xl md:text-4xl font-black text-near-black">
                            Everything You Want to Know
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
                    </div>
                </div>
            </section>

            {/* ══ 8. CTA BANNER ════════════════════════════════════════════ */}
            <section className="py-24" aria-label="Call to action">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-noble-blue to-[#006970] p-12 md:p-20 text-center">
                        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="relative z-10">
                            <ShieldCheck className="w-12 h-12 text-white/80 mx-auto mb-6" />
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                                Stop Handing Out<br />Throwaway Cards.
                            </h2>
                            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                                Create your free digital business card in under 3 minutes. Share it via NFC, QR, or link. Update it anytime, for life.
                            </p>
                            <Link
                                href="/register"
                                id="bottom-cta-create"
                                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-noble-blue font-black text-sm uppercase tracking-widest shadow-2xl hover:shadow-white/30 hover:-translate-y-0.5 transition-all"
                            >
                                Create My Card Free <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
