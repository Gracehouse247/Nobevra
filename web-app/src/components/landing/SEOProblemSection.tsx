'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SEOProblemSection() {
    const painPoints = [
        { icon: 'schedule', label: 'Manual data entry', stat: '3+ hrs/week wasted' },
        { icon: 'hourglass_top', label: 'Chasing payments', stat: '14-day avg delay' },
        { icon: 'description', label: 'Static PDF templates', stat: 'Zero automation' },
    ];

    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFFBF5] to-white pointer-events-none" />
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-red-500/[0.03] blur-[120px] rounded-full -translate-x-1/3 pointer-events-none" />

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
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            The Problem
                        </div>
                        <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] mb-6 tracking-tight">
                            The old way of getting paid is{' '}
                            <span className="text-red-500/80">costing you money.</span>
                        </h2>
                        <div className="text-base md:text-lg text-near-black/60 space-y-5 leading-relaxed">
                            <p>You do the work. You send the bill. You wait.</p>
                            <p>Then you send a polite follow-up email. And wait some more.</p>
                            <p>
                                If you are still downloading a static <strong className="text-near-black/80">invoice template PDF</strong>, manually typing out line items, and hoping your client remembers to wire the funds—you aren&apos;t just losing time. You are actively disrupting your own cash flow.
                            </p>
                            <p>
                                Most businesses don&apos;t fail because they lack clients. They fail because the gap between finishing a project and getting the money in the bank is too wide. The standard <strong className="text-near-black/80">invoice program for small business</strong> is fundamentally broken.
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
                        {painPoints.map((point, idx) => (
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
                                        <span className="material-symbols-outlined text-red-500 group-hover:text-white transition-colors text-2xl">{point.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-near-black text-2xl mb-1">{point.label}</h3>
                                        <p className="text-near-black/40 text-sm font-bold">{point.stat}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <span className="material-symbols-outlined text-red-500/30 group-hover:text-red-500 transition-colors">trending_down</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Visual emphasis callout */}
                        <div className="bg-gradient-to-r from-red-500/5 to-transparent rounded-2xl p-5 border-l-4 border-red-500/30 mt-6">
                            <p className="text-sm text-near-black/50 font-medium leading-relaxed">
                                <strong className="text-near-black/70">The real cost?</strong> It&apos;s not just the hours. It&apos;s the lost revenue from late payments, the clients who forget, and the mental load of chasing money you&apos;ve already earned.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
