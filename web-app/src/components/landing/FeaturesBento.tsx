'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// FEATURE REGISTRY — Single source of truth
// ─────────────────────────────────────────────
const FEATURES = [
    {
        id: 'invoicing',
        tab: 'Invoicing',
        icon: 'receipt_long',
        category: 'Core Engine',
        headline: 'Precision Invoicing',
        subheading: '180+ Professional Templates',
        description: 'Generate pixel-perfect invoices that command immediate payment. Track opens in real time, automate recurring billing, and send instant payment links — all without switching tools.',
        bullets: [
            { icon: 'bolt', text: 'Instant payment link generation' },
            { icon: 'visibility', text: 'Real-time invoice view tracking' },
            { icon: 'autorenew', text: 'Automated recurring billing & reminders' },
            { icon: 'palette', text: '180+ customizable brand templates' },
        ],
        href: '/invoicing',
        cta: 'Explore Invoicing',
        accent: '#01A0E2',
        accentBg: 'from-[#EBF7FF] to-white',
        accentBadge: 'bg-noble-blue/10 text-noble-blue',
        image: '/images/precision-invoicing.png',
        imageAlt: 'Nobevra precision invoicing with 180+ premium templates',
        stat: { value: '85%', label: 'Less time drafting' },
    },
    {
        id: 'crm',
        tab: 'CRM',
        icon: 'hub',
        category: 'Client Management',
        headline: 'Lightweight CRM',
        subheading: 'Full Lifecycle Client Intelligence',
        description: 'Track every deal from first contact to final payment. Know exactly when a client opens your invoice, assign pipeline stages, and build relationships that compound revenue over time.',
        bullets: [
            { icon: 'timeline', text: 'Full deal lifecycle pipeline stages' },
            { icon: 'notification_important', text: 'Invoice open & view notifications' },
            { icon: 'group', text: 'Unified client contact vault' },
            { icon: 'insights', text: 'Lifetime value & revenue analytics' },
        ],
        href: '/crm',
        cta: 'Explore CRM',
        accent: '#8B5CF6',
        accentBg: 'from-[#F5F0FF] to-white',
        accentBadge: 'bg-violet-500/10 text-violet-700',
        image: '/images/crm-clients-ledger.jpg',
        imageAlt: 'Nobevra Clients Ledger — full CRM pipeline with client scoring, active status, and revenue tracking',
        stat: { value: '40%', label: 'Faster deal closure' },
    },
    {
        id: 'expenses',
        tab: 'Expenses',
        icon: 'account_balance_wallet',
        category: 'Financial Control',
        headline: 'Smart Expense Manager',
        subheading: 'AI-Powered Receipt Intelligence',
        description: "Photograph a receipt and Nobevra's Gemini AI extracts vendor, amount, category, and date instantly. Stop losing tax-deductible expenses to forgotten receipts and disorganized spreadsheets.",
        bullets: [
            { icon: 'photo_camera', text: 'Gemini AI OCR receipt scanning' },
            { icon: 'category', text: 'Automatic expense categorization' },
            { icon: 'picture_as_pdf', text: 'One-click expense reports (PDF/CSV)' },
            { icon: 'group_work', text: 'Multi-user team expense tracking' },
        ],
        href: '/expense-management',
        cta: 'Explore Expenses',
        accent: '#10B981',
        accentBg: 'from-[#EDFAF5] to-white',
        accentBadge: 'bg-emerald-500/10 text-emerald-700',
        image: '/images/expenses-manager-hub.jpg',
        imageAlt: 'Nobevra Expense Manager Hub — live expense analytics, receipt vault, category breakdowns, and smart cash flow insights',
        stat: { value: '0 hrs', label: 'Manual reconciliation' },
    },
    {
        id: 'payments',
        tab: 'Payments',
        icon: 'payments',
        category: 'Global Settlement',
        headline: 'International Payments',
        subheading: 'Powered by Flutterwave PCI-DSS',
        description: 'Accept card payments, bank transfers, and mobile money from clients in 30+ countries with real-time settlement. Your clients pay in seconds — no logins, no friction, no raw card data stored.',
        bullets: [
            { icon: 'language', text: '30+ country payment acceptance' },
            { icon: 'lock', text: 'PCI-DSS Level 1 certified processing' },
            { icon: 'qr_code', text: 'QR code & contactless payment links' },
            { icon: 'sync', text: 'Real-time settlement & reconciliation' },
        ],
        href: '/payments',
        cta: 'Explore Payments',
        accent: '#F59E0B',
        accentBg: 'from-[#FFFBEB] to-white',
        accentBadge: 'bg-amber-500/10 text-amber-700',
        image: '/images/hero-dashboard-actual.png',
        imageAlt: 'Nobevra global payments via Flutterwave PCI-DSS gateway',
        stat: { value: '30+', label: 'Countries supported' },
    },
    {
        id: 'inventory',
        tab: 'Inventory',
        icon: 'inventory_2',
        category: 'Stock Control',
        headline: 'Products & Inventory Hub',
        subheading: 'Real-Time SKU Catalog',
        description: 'Build your full product and service catalog. Stock counts automatically decrement with every invoice sent, so you always know what is available, what is running low, and what drives the most revenue.',
        bullets: [
            { icon: 'qr_code_scanner', text: 'Product catalog with SKU management' },
            { icon: 'trending_down', text: 'Auto stock deduction per invoice' },
            { icon: 'notifications_active', text: 'Low stock threshold alerts' },
            { icon: 'bar_chart', text: 'Top-selling product analytics' },
        ],
        href: '/products-inventory',
        cta: 'Explore Inventory',
        accent: '#0F172A',
        accentBg: 'from-[#F1F5F9] to-white',
        accentBadge: 'bg-slate-800/10 text-slate-700',
        image: '/images/product and service.png',
        imageAlt: 'Nobevra real-time inventory and product catalog management',
        stat: { value: 'Live', label: 'Stock tracking' },
    },
    {
        id: 'identity',
        tab: 'Identity',
        icon: 'badge',
        category: 'Professional Identity',
        headline: 'Digital Business Cards',
        subheading: 'NFC 3.0 + Dynamic QR',
        description: "Share your full professional profile, portfolio, and instant payment link in a single tap on NFC-enabled devices or a QR scan. Turn every introduction into a qualified lead with built-in capture analytics.",
        bullets: [
            { icon: 'tap_and_play', text: 'NFC tap-to-share on any device' },
            { icon: 'qr_code_2', text: 'Dynamic QR codes with live telemetry' },
            { icon: 'link', text: 'Instant payment link embedded' },
            { icon: 'analytics', text: 'Card view & scan analytics' },
        ],
        href: '/digital-business-card',
        cta: 'Explore Identity',
        accent: '#01A0E2',
        accentBg: 'from-[#EBF7FF] to-white',
        accentBadge: 'bg-noble-blue/10 text-noble-blue',
        image: '/images/Organization Identity Hub.png',
        imageAlt: 'Nobevra NFC digital business card and QR code generator',
        stat: { value: 'NFC', label: 'Tap to share' },
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function FeaturesBento() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [direction, setDirection] = useState(1);
    const active = FEATURES[activeIdx];

    const handleTabChange = (idx: number) => {
        setDirection(idx > activeIdx ? 1 : -1);
        setActiveIdx(idx);
    };

    return (
        <section
            id="features"
            className="py-24 md:py-32 relative overflow-hidden bg-white"
            aria-label="Nobevra Platform Features"
        >
            {/* Restrained background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-white pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">

                {/* ── SECTION HEADER ──────────────────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">grid_view</span>
                        The Complete Business Operating System
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.08] tracking-tight mb-5">
                        One Platform.{' '}
                        <span className="text-noble-blue italic">Every Tool You Need.</span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-base md:text-lg text-near-black/55 leading-relaxed max-w-2xl mx-auto">
                        Six interconnected modules that replace your entire back-office stack — invoicing, CRM, expenses, payments, inventory, and professional identity — all sharing one unified data layer.
                    </motion.p>
                </motion.div>

                {/* ── TAB NAVIGATION ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center justify-center gap-2 flex-wrap mb-12"
                    role="tablist"
                    aria-label="Platform features"
                >
                    {FEATURES.map((f, idx) => (
                        <button
                            key={f.id}
                            role="tab"
                            aria-selected={activeIdx === idx}
                            aria-controls={`feature-panel-${f.id}`}
                            onClick={() => handleTabChange(idx)}
                            className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all duration-300 focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none ${
                                activeIdx === idx
                                    ? 'bg-near-black text-white shadow-lg'
                                    : 'bg-slate-100/80 text-near-black/60 hover:bg-slate-200/80 hover:text-near-black'
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined text-base transition-colors ${activeIdx === idx ? 'text-white' : 'text-near-black/50'}`}
                                aria-hidden="true"
                            >
                                {f.icon}
                            </span>
                            {f.tab}
                            {/* Active pill */}
                            {activeIdx === idx && (
                                <motion.span
                                    layoutId="tab-pill"
                                    className="absolute inset-0 rounded-2xl bg-near-black -z-10"
                                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* ── MAIN FEATURE PANEL ──────────────────────────────────── */}
                <div
                    id={`feature-panel-${active.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${active.id}`}
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={active.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className={`rounded-[40px] bg-gradient-to-br ${active.accentBg} border border-slate-100/80 shadow-xl overflow-hidden`}
                        >
                            <div className="grid lg:grid-cols-2 gap-0 min-h-[540px]">

                                {/* LEFT — Copy Panel */}
                                <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16">
                                    <div>
                                        {/* Category & Stat badges */}
                                        <div className="flex items-center gap-3 mb-8 flex-wrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${active.accentBadge}`}>
                                                <span className="material-symbols-outlined text-xs" aria-hidden="true">{active.icon}</span>
                                                {active.category}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-near-black/5 border border-near-black/8 text-near-black/60 text-[10px] font-bold">
                                                <span className="font-black text-near-black">{active.stat.value}</span>
                                                {active.stat.label}
                                            </span>
                                        </div>

                                        {/* Heading */}
                                        <h3 className="font-inter text-3xl sm:text-4xl md:text-5xl font-black text-near-black tracking-tight leading-[1.1] mb-3">
                                            {active.headline}
                                        </h3>
                                        <p className="text-sm font-bold text-near-black/40 uppercase tracking-widest mb-6">
                                            {active.subheading}
                                        </p>

                                        {/* Description */}
                                        <p className="text-base md:text-lg text-near-black/65 leading-relaxed mb-8 max-w-lg">
                                            {active.description}
                                        </p>

                                        {/* Feature Bullets */}
                                        <ul className="space-y-3 mb-10" aria-label={`Key features of ${active.headline}`}>
                                            {active.bullets.map((b) => (
                                                <li key={b.text} className="flex items-center gap-3">
                                                    <span
                                                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                                        style={{ backgroundColor: `${active.accent}18` }}
                                                    >
                                                        <span
                                                            className="material-symbols-outlined text-sm"
                                                            style={{ color: active.accent }}
                                                            aria-hidden="true"
                                                        >
                                                            {b.icon}
                                                        </span>
                                                    </span>
                                                    <span className="text-sm font-semibold text-near-black/75">
                                                        {b.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Row */}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <Link
                                            href={active.href}
                                            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-black text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none shadow-lg"
                                            style={{
                                                backgroundColor: active.accent,
                                                boxShadow: `0 12px 40px ${active.accent}40`,
                                            }}
                                        >
                                            {active.cta}
                                            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-black text-near-black bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none"
                                        >
                                            Start Free
                                        </Link>
                                    </div>
                                </div>

                                {/* RIGHT — Visual Panel */}
                                <div className="relative flex items-end justify-center lg:justify-end overflow-hidden min-h-[300px] lg:min-h-0 p-8 lg:p-0">
                                    {/* Glow accent */}
                                    <div
                                        className="absolute inset-0 opacity-20 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(ellipse at 60% 40%, ${active.accent}40 0%, transparent 70%)`,
                                        }}
                                    />

                                    {/* Feature Image */}
                                    <motion.div
                                        key={`img-${active.id}`}
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                                        className="relative w-full max-w-[480px] lg:max-w-none lg:w-full h-full lg:absolute lg:bottom-0 lg:right-0 lg:w-[90%]"
                                    >
                                        <Image
                                            src={active.image}
                                            alt={active.imageAlt}
                                            className="w-full h-full object-contain object-bottom lg:object-right-bottom drop-shadow-2xl"
                                            width={600}
                                            height={480}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority={activeIdx === 0}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── BOTTOM MINI-CARD GRID — Quick Glance All Modules ─── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12"
                >
                    {FEATURES.map((f, idx) => (
                        <motion.button
                            key={f.id}
                            variants={itemVariants}
                            onClick={() => handleTabChange(idx)}
                            className={`group p-5 rounded-3xl border text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none ${
                                activeIdx === idx
                                    ? 'bg-near-black border-near-black shadow-xl'
                                    : 'bg-noble-surface border-slate-100 hover:border-slate-200 hover:shadow-lg'
                            }`}
                            aria-label={`View ${f.headline} feature`}
                        >
                            <div
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                                    activeIdx === idx ? 'bg-white/15' : 'bg-slate-100 group-hover:bg-slate-200'
                                }`}
                            >
                                <span
                                    className={`material-symbols-outlined text-lg transition-colors ${activeIdx === idx ? 'text-white' : 'text-near-black/60'}`}
                                    aria-hidden="true"
                                >
                                    {f.icon}
                                </span>
                            </div>
                            <p className={`text-xs font-black leading-tight mb-1 ${activeIdx === idx ? 'text-white' : 'text-near-black'}`}>
                                {f.tab}
                            </p>
                            <p className={`text-[10px] font-bold ${activeIdx === idx ? 'text-white/60' : 'text-near-black/40'}`}>
                                {f.stat.value} {f.stat.label}
                            </p>
                        </motion.button>
                    ))}
                </motion.div>

                {/* ── BOTTOM CTA BAR ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
                >
                    <p className="text-sm text-near-black/50 font-medium max-w-md">
                        Every module is deeply interconnected — your invoice, expense, client, and inventory data share one unified layer.
                    </p>
                    <Link
                        href="/register"
                        className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black text-white bg-noble-blue hover:bg-noble-blue/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-noble-blue/25 focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        Start Free — No Credit Card
                        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
