'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
    }),
};

export default function FreelancerFeaturesBento() {
    return (
        <section className="py-16 pb-32 relative">
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[320px]">

                    {/* Card 1 — Large: Send an Invoice in 60 Seconds */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="md:col-span-7 md:row-span-2"
                    >
                        <div className="h-full bg-gradient-to-br from-[#E6F5FB] to-white rounded-[40px] p-10 md:p-12 border border-white shadow-xl overflow-hidden relative group flex flex-col justify-between">
                            {/* Decorative glow */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-noble-blue/10 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-noble-blue font-black uppercase text-[10px] tracking-widest mb-4 block">Core Engine</span>
                                <h3 className="text-3xl md:text-4xl font-black text-near-black tracking-tight mb-4 max-w-sm leading-tight">
                                    Send your first professional invoice in 60 seconds.
                                </h3>
                                <p className="text-near-black/55 font-medium leading-relaxed max-w-sm mb-8">
                                    Pick a template, add your line items, and hit send. Your client gets a branded payment link — not a PDF buried in their inbox. It takes less than a minute for you and seconds for them to pay.
                                </p>
                                <Link href="/register" className="inline-flex items-center gap-2 font-black text-sm text-noble-blue hover:gap-4 transition-all">
                                    Start invoicing free <span className="material-symbols-outlined">arrow_right_alt</span>
                                </Link>
                            </div>

                            {/* Animated invoice mockup */}
                            <div className="relative z-10 mt-6">
                                <div className="bg-noble-surface rounded-2xl shadow-lg border border-slate-100 p-5 max-w-xs group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Invoice</div>
                                            <div className="text-xs font-black text-near-black">#INV-2026-047</div>
                                        </div>
                                        <div className="bg-green-100 text-green-700 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">Sent ✓</div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        {[
                                            { label: 'Website Design', val: '$2,400' },
                                            { label: 'SEO Consultation', val: '$600' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between text-[11px] font-medium text-slate-600">
                                                <span>{item.label}</span><span>{item.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                                        <span className="font-black text-near-black text-sm">$3,000.00</span>
                                        <button className="bg-noble-blue text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-sm shadow-noble-blue/30">Pay Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2 — Client Memory (CRM) */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="md:col-span-5 md:row-span-1"
                    >
                        <div className="h-full bg-gradient-to-br from-blue-50 to-white rounded-[40px] p-10 border border-white shadow-xl overflow-hidden relative group flex flex-col">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.04] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                <span className="material-symbols-outlined text-[100px] text-noble-blue">manage_accounts</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-noble-blue/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-noble-blue text-lg">contacts</span>
                                    </div>
                                    <h3 className="text-xl font-black text-near-black tracking-tight">Client Memory</h3>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed mb-5 font-medium">
                                    NobleInvoice remembers every client detail. Repeat jobs take seconds — not re-typing the same address for the 10th time.
                                </p>
                                <div className="flex flex-col gap-2">
                                    {['Sarah @ Acme Corp', 'David @ Mediavine', 'Priya @ StartupLab'].map((c, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-noble-surface/70 rounded-xl px-4 py-2 border border-slate-100">
                                            <div className="w-6 h-6 rounded-full bg-noble-blue/20 flex items-center justify-center text-noble-blue font-black text-[9px]">{c[0]}</div>
                                            <span className="text-[11px] font-bold text-slate-700">{c}</span>
                                            <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3 — Read Receipts */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="md:col-span-5 md:row-span-1"
                    >
                        <div className="h-full bg-gradient-to-br from-amber-50 to-white rounded-[40px] p-10 border border-white shadow-xl overflow-hidden relative group flex flex-col">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-amber-600 text-lg">visibility</span>
                                    </div>
                                    <h3 className="text-xl font-black text-near-black tracking-tight">Invoice Read Receipts</h3>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-5">
                                    Know the exact moment a client opens your invoice. No more guessing if it landed in spam — you see it in real time.
                                </p>
                                <div className="bg-noble-surface rounded-2xl border border-amber-100 p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-amber-600 text-sm">mark_email_read</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-near-black uppercase tracking-wider">Invoice Viewed</p>
                                            <p className="text-[11px] text-slate-500 font-medium">Sarah opened INV-047 · just now</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4 — Automated Reminders */}
                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="md:col-span-4 md:row-span-1"
                    >
                        <div className="h-full bg-near-black rounded-[40px] p-10 border border-white shadow-xl overflow-hidden relative group flex flex-col text-white">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-noble-blue/30 blur-[60px] rounded-full pointer-events-none" />
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-noble-surface/10 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-white text-lg">notifications_active</span>
                                </div>
                                <h3 className="text-xl font-black tracking-tight mb-3">Automated Reminders</h3>
                                <p className="text-white/60 text-sm leading-relaxed font-medium">
                                    Late fee warnings and payment nudges fire automatically. You never have to write an awkward follow-up email again.
                                </p>
                            </div>
                            <div className="mt-auto pt-4 flex gap-2 relative z-10">
                                {['Day 1', 'Day 3', 'Day 7'].map((d, i) => (
                                    <div key={i} className="flex-1 bg-noble-surface/10 rounded-xl py-2 text-center">
                                        <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">{d}</p>
                                        <p className="text-[10px] font-black text-white mt-0.5">{['Nudge', 'Follow-up', 'Final'][i]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 5 — 1-Click Payments */}
                    <motion.div
                        custom={4}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="md:col-span-4 md:row-span-1"
                    >
                        <div className="h-full bg-gradient-to-br from-green-50 to-white rounded-[40px] p-10 border border-white shadow-xl overflow-hidden relative group flex flex-col">
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-green-600 text-lg">payments</span>
                                </div>
                                <h3 className="text-xl font-black text-near-black tracking-tight mb-3">1-Click Checkout</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-5">
                                    Clients pay via Credit Card, Apple Pay, or ACH directly from the invoice link. No login, no bank details to copy.
                                </p>
                                <div className="flex flex-col gap-2">
                                    {['💳 Credit / Debit Card', ' Apple Pay', '🏦 Bank Transfer (ACH)'].map((m, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-noble-surface rounded-xl px-4 py-2.5 border border-green-100 shadow-sm text-[11px] font-bold text-slate-700">
                                            {m}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 6 — Bill International Clients */}
                    <motion.div
                        custom={5}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="md:col-span-4 md:row-span-1"
                    >
                        <div className="h-full bg-gradient-to-br from-indigo-50 to-white rounded-[40px] p-10 border border-white shadow-xl overflow-hidden relative group flex flex-col">
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-noble-blue/10 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-noble-blue text-lg">language</span>
                                </div>
                                <h3 className="text-xl font-black text-near-black tracking-tight mb-3">Bill International Clients</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-4">
                                    Invoice in USD, GBP, EUR, or 50+ currencies. Your rate, their currency — automatic conversion handled at checkout.
                                </p>
                                <div className="flex gap-2">
                                    {['🇺🇸 USD', '🇬🇧 GBP', '🇪🇺 EUR', '🇦🇺 AUD'].map((c, i) => (
                                        <div key={i} className="flex-1 bg-noble-surface rounded-xl py-2 text-center border border-indigo-100 text-[9px] font-black text-slate-600 shadow-sm">
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
