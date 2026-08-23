'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PlatformEcosystemSection() {
    return (
        <section
            id="ecosystem"
            className="py-24 md:py-32 bg-[#050B1A] text-white relative overflow-hidden"
            aria-label="Nobevra Cross-Platform Ecosystem"
        >
            {/* Background lighting */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-noble-blue/10 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-cyan/10 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-electric-cyan font-bold text-[10px] uppercase tracking-widest mb-6 border border-white/10">
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">sync_saved_locally</span>
                            Unified Ecosystem
                        </div>

                        <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
                            One Account.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01A0E2] to-[#00F0FF]">
                                Every Device.
                            </span>
                        </h2>

                        <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
                            Manage your business from your office desktop, draft an invoice on your tablet between meetings, or scan an expense receipt on your phone. Everything syncs instantly in real time.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <div className="w-10 h-10 rounded-xl bg-[#01A0E2]/20 flex items-center justify-center text-electric-cyan mb-3">
                                    <span className="material-symbols-outlined text-xl" aria-hidden="true">laptop_mac</span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">Web Platform</h3>
                                <p className="text-xs text-slate-400">High-speed Next.js 16 dashboard</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                                    <span className="material-symbols-outlined text-xl" aria-hidden="true">phone_android</span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">Android App</h3>
                                <p className="text-xs text-slate-400">Native performance & offline sync</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-3">
                                    <span className="material-symbols-outlined text-xl" aria-hidden="true">phone_iphone</span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">iOS App</h3>
                                <p className="text-xs text-slate-400">Smooth animations & biometric login</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-[#166FBB] text-white font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.4)]"
                            >
                                Start Free
                                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                            </Link>

                            <Link
                                href="/pricing"
                                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/15 transition-all flex items-center justify-center"
                            >
                                Explore Platform Plans
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Visual Showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative w-full max-w-lg bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs font-bold text-slate-300">Live Real-Time Sync</span>
                                </div>
                                <span className="text-xs font-mono text-electric-cyan">PostgreSQL + Supabase</span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-noble-blue/30 flex items-center justify-center text-electric-cyan">
                                            <span className="material-symbols-outlined text-lg">receipt_long</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Invoice #INV-2026-042</p>
                                            <p className="text-[10px] text-slate-400">Created on Web · Synced to Mobile</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-400">Paid</span>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/30 flex items-center justify-center text-violet-300">
                                            <span className="material-symbols-outlined text-lg">qr_code</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">NFC Contact Card Tapped</p>
                                            <p className="text-[10px] text-slate-400">Lead added to CRM Pipeline</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-electric-cyan">+1 Lead</span>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300">
                                            <span className="material-symbols-outlined text-lg">document_scanner</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">AI Receipt Scanned</p>
                                            <p className="text-[10px] text-slate-400">Auto-categorized under Expenses</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-amber-300">Saved</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
