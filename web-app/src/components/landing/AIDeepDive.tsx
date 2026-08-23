'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AIDeepDive() {
    return (
        <section
            id="ai-intelligence"
            className="py-24 md:py-32 bg-near-black text-white relative overflow-hidden"
            aria-label="Section 11: Gemini AI Business Intelligence & Assistant"
        >
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-cyan/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-electric-cyan font-bold text-[10px] uppercase tracking-widest mb-6 border border-white/10">
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">psychology</span>
                            Gemini AI Business Assistant
                        </div>

                        <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-6">
                            Financial Intelligence that Tells You{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01A0E2] to-[#00F0FF]">
                                Exactly What to Do.
                            </span>
                        </h2>

                        <div className="text-base text-slate-300 space-y-4 mb-8 leading-relaxed">
                            <p>
                                Most accounting tools dump raw numbers on you and force you to interpret them. You spend hours trying to figure out if your business is actually profitable.
                            </p>
                            <p>
                                <strong className="text-white">Nobevra AI translates your invoices, expenses, and client interactions into plain English actionable narratives.</strong> Get automated cash flow predictions, overdue payment risk alerts, and expense leakage warnings.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                <div className="w-8 h-8 rounded-xl bg-electric-cyan/20 flex items-center justify-center text-electric-cyan mb-2">
                                    <span className="material-symbols-outlined text-base">auto_graph</span>
                                </div>
                                <h3 className="font-bold text-xs text-white mb-1">Cash Flow Forecasting</h3>
                                <p className="text-[11px] text-slate-400">Predict upcoming revenue based on historical payment velocity.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                                    <span className="material-symbols-outlined text-base">insights</span>
                                </div>
                                <h3 className="font-bold text-xs text-white mb-1">Automated Financial Reports</h3>
                                <p className="text-[11px] text-slate-400">Generate executive financial narratives ready to share with partners.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/ai-receipt-scanner"
                                className="w-full sm:w-auto px-7 py-3.5 bg-[#166FBB] text-white font-black text-xs rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                            >
                                Try AI Assistant
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>

                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 border border-white/15 text-white font-bold text-xs rounded-xl hover:bg-white/15 transition-all flex items-center justify-center"
                            >
                                View AI Capabilities
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: AI Output Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl space-y-4 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="font-bold text-xs text-white">Gemini Financial Narrative</span>
                                </div>
                                <span className="text-[10px] font-mono text-electric-cyan">Real-time Analysis</span>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <p className="text-xs font-bold text-emerald-400 mb-1">Executive Summary</p>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        "Your revenue is pacing <strong className="text-white">24% higher</strong> than last month. 85% of clients settle within 48 hours. Ducex Solicitors represents your highest LTV client."
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <p className="text-xs font-bold text-amber-400 mb-1">Cash Flow Action Item</p>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        "2 recurring invoices totaling ₦180,000 are scheduled to dispatch on Tuesday. Automated reminders are primed."
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-white/10">
                                <span>Powered by Google Gemini 1.5 Pro</span>
                                <span>100% Private to your workspace</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
