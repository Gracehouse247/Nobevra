'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PaymentsDeepDive() {
    return (
        <section
            id="payments"
            className="py-24 md:py-32 bg-slate-50/50 relative overflow-hidden"
            aria-label="Section 10: Payments & In-App Wallet Settlements"
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
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">payments</span>
                            Payments & Wallet
                        </div>

                        <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-black text-near-black leading-[1.15] tracking-tight mb-6">
                            Get Paid Faster with{' '}
                            <span className="text-amber-600">Zero Checkout Friction.</span>
                        </h2>

                        <div className="text-base text-near-black/60 space-y-4 mb-8 leading-relaxed">
                            <p>
                                When you email a static PDF and expect clients to manually open their banking app, you introduce a 14-day delay in cash flow. Friction kills payment speed.
                            </p>
                            <p>
                                <strong className="text-near-black/80">Every Nobevra invoice includes a verified Flutterwave checkout link.</strong> Clients pay in seconds using debit cards, instant bank transfers, or mobile money, and funds settle directly into your in-app wallet.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-noble-surface p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-2">
                                    <span className="material-symbols-outlined text-base">credit_card</span>
                                </div>
                                <h3 className="font-bold text-xs text-near-black mb-1">Instant Online Checkout</h3>
                                <p className="text-[11px] text-near-black/50">Cards, bank transfers, and USSD payments accepted effortlessly.</p>
                            </div>

                            <div className="bg-noble-surface p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2">
                                    <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                                </div>
                                <h3 className="font-bold text-xs text-near-black mb-1">In-App Business Wallet</h3>
                                <p className="text-[11px] text-near-black/50">Track wallet balances and withdraw to your verified bank account.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-near-black transition-all flex items-center justify-center gap-2"
                            >
                                Start Free
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>

                            <Link
                                href="/payments"
                                className="w-full sm:w-auto px-7 py-3.5 bg-noble-surface border border-slate-200 text-near-black font-bold text-xs rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center"
                            >
                                Explore Payments Platform
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Payment Visual */}
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
                                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">payments</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-near-black">Business Wallet Balance</p>
                                        <p className="text-[10px] text-slate-400">Flutterwave Merchant Node</p>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-emerald-600 font-mono">
                                    ₦3,420,500.00
                                </span>
                            </div>

                            <div className="space-y-2.5">
                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-emerald-600 text-sm">arrow_downward</span>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Invoice #INV-2026-042</p>
                                            <p className="text-[10px] text-slate-400">Card payment settled</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600">+₦450,000</span>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-slate-600 text-sm">arrow_upward</span>
                                        <div>
                                            <p className="text-xs font-bold text-near-black">Bank Payout Transfer</p>
                                            <p className="text-[10px] text-slate-400">Sent to Zenith Bank Corporate</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-slate-700">-₦1,200,000</span>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100">
                                <span>SSL / TLS 1.3 256-Bit Encrypted</span>
                                <span>Automated Webhook Sync</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
