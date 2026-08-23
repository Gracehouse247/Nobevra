'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const TRUST_ITEMS = [
    {
        icon: 'lock',
        label: 'Supabase Infrastructure',
        sub: '256-bit encrypted',
    },
    {
        icon: 'payments',
        label: 'Flutterwave Payments',
        sub: 'Secure gateway',
    },
    {
        icon: 'verified',
        label: 'CAC Registered',
        sub: "The Noble's Technology Services",
    },
    {
        icon: 'devices',
        label: 'Web · Android · iOS',
        sub: 'One account, every device',
    },
];

type PillarTab = 'run' | 'connect' | 'grow';

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState<PillarTab>('run');

    return (
        <section
            className="relative min-h-screen flex items-center pt-12 pb-28 md:pb-36 overflow-hidden"
            aria-label="Nobevra — Intelligent Business Operating System"
        >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

                {/* ── Left: Copy ── */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative z-10"
                >
                    {/* Platform badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                        The Intelligent Business Operating System
                    </div>

                    {/* H1 */}
                    <h1 className="font-inter text-near-black mb-6 text-[32px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-tight font-black">
                        Run Your Business.{' '}
                        <span className="text-noble-blue">Connect Everything.</span>{' '}
                        Grow Without Limits.
                    </h1>

                    <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                        Nobevra is the intelligent business operating system that brings invoicing, CRM, expenses, payments, products, AI, business identity and team collaboration together in one connected platform.
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Link
                            href="/register"
                            className="text-white px-10 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Start Free
                            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                        </Link>

                        <Link
                            href="/#run"
                            className="flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                        >
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">visibility</span>
                            Explore Platform
                        </Link>
                    </div>

                    {/* Microcopy */}
                    <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                        No credit card required · Free plan available · Cancel anytime
                    </p>

                    {/* Verified trust signals */}
                    <div className="flex flex-wrap items-center gap-4 border-t border-near-black/5 pt-8">
                        {TRUST_ITEMS.map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-noble-blue/8 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-noble-blue text-base" aria-hidden="true">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-near-black uppercase tracking-tight leading-tight">{item.label}</p>
                                    <p className="text-[9px] text-near-black/40 font-bold">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Right: Interactive 3-Pillar UI Showcase ── */}
                <motion.div
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                    className="relative flex flex-col items-center lg:pl-6"
                >
                    {/* Interactive Tab Switcher */}
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 backdrop-blur-md rounded-2xl border border-slate-200/80 mb-6 shadow-sm z-20">
                        <button
                            onClick={() => setActiveTab('run')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none ${
                                activeTab === 'run'
                                    ? 'bg-noble-blue text-white shadow-md'
                                    : 'text-slate-600 hover:text-near-black'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">receipt_long</span>
                            1. RUN
                        </button>

                        <button
                            onClick={() => setActiveTab('connect')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:outline-none ${
                                activeTab === 'connect'
                                    ? 'bg-violet-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-near-black'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">hub</span>
                            2. CONNECT
                        </button>

                        <button
                            onClick={() => setActiveTab('grow')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none ${
                                activeTab === 'grow'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'text-slate-600 hover:text-near-black'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            3. GROW
                        </button>
                    </div>

                    {/* Interactive Showcase Card */}
                    <div className="relative w-full max-w-lg">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-60 pointer-events-none" />

                        <div className="relative bg-noble-surface rounded-[32px] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] border border-slate-100 min-h-[380px] flex flex-col justify-between overflow-hidden">
                            <AnimatePresence mode="wait">
                                {activeTab === 'run' && (
                                    <motion.div
                                        key="tab-run"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-xl bg-noble-blue/10 flex items-center justify-center text-noble-blue">
                                                    <span className="material-symbols-outlined text-base">receipt</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-near-black">Invoice #INV-2026-042</p>
                                                    <p className="text-[10px] text-slate-400">Client: Ducex Solicitors Ltd</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-[10px] uppercase">
                                                Paid Online
                                            </span>
                                        </div>

                                        <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2">
                                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                                <span>Brand Strategy & Systems Retainer</span>
                                                <span className="font-bold text-near-black">₦350,000</span>
                                            </div>
                                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                                <span>Custom Identity Portal Setup</span>
                                                <span className="font-bold text-near-black">₦100,000</span>
                                            </div>
                                            <div className="border-t border-slate-200/60 pt-2 flex justify-between text-xs font-black text-near-black">
                                                <span>Total Settled (Flutterwave)</span>
                                                <span className="text-noble-blue font-black text-sm">₦450,000.00</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                                            <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                Viewed 2 mins ago · Receipt Sent
                                            </span>
                                            <Link href="/free-invoice-generator" className="text-noble-blue font-bold hover:underline">
                                                Try Invoicing →
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'connect' && (
                                    <motion.div
                                        key="tab-connect"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                                                    <span className="material-symbols-outlined text-base">badge</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-near-black">Smart Business Card & NFC</p>
                                                    <p className="text-[10px] text-slate-400">Active Node: nobevra.ai/id/noble</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-700 font-bold text-[10px] uppercase">
                                                Live CRM Linked
                                            </span>
                                        </div>

                                        <div className="bg-gradient-to-br from-violet-500/10 via-white to-violet-500/5 rounded-2xl p-4 border border-violet-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-black text-near-black mb-1">NFC Tap Detected</p>
                                                <p className="text-[10px] text-slate-500">Contact saved vCard & submitted lead query</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                                                <span className="material-symbols-outlined text-lg">contact_phone</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                                            <span className="flex items-center gap-1 text-violet-700 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                                                +12 Leads captured this week
                                            </span>
                                            <Link href="/digital-business-card" className="text-violet-700 font-bold hover:underline">
                                                View Card Studio →
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'grow' && (
                                    <motion.div
                                        key="tab-grow"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                                    <span className="material-symbols-outlined text-base">psychology</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-near-black">Gemini AI Financial Intelligence</p>
                                                    <p className="text-[10px] text-slate-400">Automated Cash Flow Projection</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-[10px] uppercase">
                                                +28% MoM
                                            </span>
                                        </div>

                                        <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-400">Net Monthly Revenue</span>
                                                <span className="font-mono font-bold text-emerald-400">₦2,840,000.00</span>
                                            </div>
                                            <p className="text-[10px] text-slate-300 leading-relaxed">
                                                <strong className="text-emerald-400">AI Insight:</strong> All invoices paid within 48h. Operating margin improved by 14% after automated reminders.
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                                            <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                Live real-time telemetry active
                                            </span>
                                            <Link href="/ai-receipt-scanner" className="text-emerald-700 font-bold hover:underline">
                                                Explore AI Radar →
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Bottom Platform Proof Strip */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <span>PostgreSQL RLS Security</span>
                                <span>Multi-Tenant Isolated</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
