'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PAIN_POINTS = [
    {
        icon: 'widgets',
        label: 'Too many disconnected apps',
        stat: '7 tools on average per business',
    },
    {
        icon: 'hourglass_top',
        label: 'Manual data entry across systems',
        stat: 'Hours lost every week',
    },
    {
        icon: 'trending_down',
        label: 'No unified business intelligence',
        stat: 'Decisions made without data',
    },
];

export default function SEOProblemSection() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden" aria-label="The problem Nobevra solves">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFFBF5] to-white pointer-events-none" aria-hidden="true" />
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-red-500/[0.03] blur-[120px] rounded-full -translate-x-1/3 pointer-events-none" aria-hidden="true" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/8 border border-red-500/10 text-red-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                            The Problem
                        </div>

                        <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            Running a business shouldn&apos;t require{' '}
                            <span className="text-red-500/80">seven different apps.</span>
                        </h2>

                        <div className="text-base md:text-lg text-near-black/60 space-y-5 leading-relaxed">
                            <p>
                                You invoice from one tool. Track expenses in another. Manage clients somewhere else. Handle payments in a third system. Build your business card with a fourth.
                            </p>
                            <p>
                                The result is fragmented data, duplicated effort, and zero visibility into how your business is actually performing.
                            </p>
                            <p>
                                <strong className="text-near-black/80">Most businesses don&apos;t fail because they lack customers.</strong> They fail because their operations are held together by spreadsheets, sticky notes, and app-switching friction that compounds every single day.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — Pain Point Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                        className="space-y-4"
                    >
                        {PAIN_POINTS.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="group bg-noble-surface rounded-[24px] p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-red-500/8 flex items-center justify-center shrink-0 group-hover:bg-red-500 transition-colors duration-300">
                                        <span className="material-symbols-outlined text-red-500 group-hover:text-white transition-colors text-2xl" aria-hidden="true">{point.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-near-black text-lg md:text-xl mb-1">{point.label}</h3>
                                        <p className="text-near-black/40 text-sm font-bold">{point.stat}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <div className="bg-gradient-to-r from-noble-blue/5 to-transparent rounded-2xl p-5 border-l-4 border-noble-blue/30 mt-6">
                            <p className="text-sm text-near-black/60 font-medium leading-relaxed">
                                <strong className="text-near-black/80">Nobevra consolidates everything</strong> — invoicing, CRM, expenses, payments, business identity, QR, teams and AI — into one connected operating system for your business.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
