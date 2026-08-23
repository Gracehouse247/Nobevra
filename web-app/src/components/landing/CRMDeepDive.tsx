'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CRMDeepDive() {
    return (
        <section
            id="crm"
            className="py-24 md:py-32 bg-slate-50/50 relative overflow-hidden"
            aria-label="Section 8: Lightweight CRM & Client Relationship Management"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-700 font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">diversity_3</span>
                            Lightweight Client CRM
                        </div>

                        {/* What is this? & Why does it matter? */}
                        <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-black text-near-black leading-[1.15] tracking-tight mb-6">
                            Turn Client Interactions into{' '}
                            <span className="text-violet-600">Paid Revenue.</span>
                        </h2>

                        {/* What problem does it solve? */}
                        <div className="text-base text-near-black/60 space-y-4 mb-8 leading-relaxed">
                            <p>
                                Traditional enterprise CRMs are bloated with 40-field forms and complex sales funnels you don&apos;t need. Spreadsheets get outdated and lose track of conversations.
                            </p>
                            <p>
                                <strong className="text-near-black/80">Nobevra CRM connects your client directory directly to your billing engine.</strong> Know the exact moment a client views an invoice, track contact history, and manage communication in one unified vault.
                            </p>
                        </div>

                        {/* What does the user gain? */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-noble-surface p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 mb-2">
                                    <span className="material-symbols-outlined text-base">visibility</span>
                                </div>
                                <h3 className="font-bold text-xs text-near-black mb-1">Live View Telemetry</h3>
                                <p className="text-[11px] text-near-black/50">Get instant alerts when clients open your payment links.</p>
                            </div>

                            <div className="bg-noble-surface p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2">
                                    <span className="material-symbols-outlined text-base">folder_shared</span>
                                </div>
                                <h3 className="font-bold text-xs text-near-black mb-1">Unified Client Vault</h3>
                                <p className="text-[11px] text-near-black/50">Invoices, contracts, receipts, and notes linked to each client profile.</p>
                            </div>
                        </div>

                        {/* What should the user do next? */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/crm"
                                className="w-full sm:w-auto px-7 py-3.5 bg-violet-600 text-white font-black text-xs rounded-xl hover:bg-violet-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-violet-500/20"
                            >
                                Explore CRM Features
                                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                            </Link>

                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-7 py-3.5 bg-noble-surface border border-slate-200 text-near-black font-bold text-xs rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center"
                            >
                                Try CRM Free
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Visual Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="bg-noble-surface rounded-[32px] p-6 shadow-xl border border-slate-100 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-violet-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                                        DS
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-near-black">Ducex Solicitors Ltd</p>
                                        <p className="text-[10px] text-slate-400">emmaduru@ducex.com · Legal & Advisory</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-black uppercase">
                                    Active Client
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Retainer Invoice #INV-2026-042</p>
                                            <p className="text-[10px] text-slate-400">Paid online via Flutterwave</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-near-black">₦450,000</span>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-violet-600 text-base">schedule</span>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Contract Agreement Signed</p>
                                            <p className="text-[10px] text-slate-400">Stored securely in client vault</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-violet-600">Signed</span>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                                <span>Total Lifetime Value: <strong className="text-near-black font-black">₦2,150,000</strong></span>
                                <span>3 Invoices Settled</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
