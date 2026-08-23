'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const GROW_FEATURES = [
    {
        icon: 'psychology',
        title: 'Gemini AI Intelligence',
        description: 'Get automated financial narrative summaries, receipt data extraction via Gemini, and smart cash flow recommendations.',
        link: '/ai-receipt-scanner',
        tag: 'Gemini AI',
        tagColor: 'bg-electric-cyan/15 text-noble-blue',
    },
    {
        icon: 'insights',
        title: 'Growth Reports & Insights',
        description: 'Real-time revenue analytics, cash flow tracking, expense leak alerts, and client lifetime value metrics at a glance.',
        link: '/features',
        tag: 'Real-Time Stats',
        tagColor: 'bg-emerald-500/10 text-emerald-700',
    },
    {
        icon: 'trending_up',
        title: 'Lead Intelligence & Pipelines',
        description: 'Monitor digital card scans, track QR campaign conversions, and convert new network leads into paid client invoices.',
        link: '/crm',
        tag: 'Pipeline Radar',
        tagColor: 'bg-violet-500/10 text-violet-700',
    },
    {
        icon: 'language',
        title: 'SEO Capabilities & Scalable Plans',
        description: 'Built-in CMS engine with automated SEO indexing to help your business rank organically and scale from Starter to Elite.',
        link: '/pricing',
        tag: 'Scalable Plans',
        tagColor: 'bg-amber-500/10 text-amber-700',
    },
];

export default function GrowSection() {
    return (
        <section
            id="grow"
            className="py-24 md:py-32 relative overflow-hidden"
            aria-label="GROW — Nobevra intelligence and scaling tools"
        >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-electric-cyan/5 blur-[120px] rounded-full -translate-x-1/2" />
            </div>

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/10 text-emerald-700 font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">trending_up</span>
                        PILLAR 3: GROW
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4 max-w-2xl">
                        Turn your data into{' '}
                        <span className="text-emerald-600 italic">scalable revenue.</span>
                    </h2>
                    <p className="text-base md:text-lg text-near-black/50 max-w-2xl leading-relaxed">
                        Financial intelligence, AI assistants, growth reports, scan telemetry analytics, business insights, and scalable plans.
                    </p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {GROW_FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                            <Link
                                href={feature.link}
                                className="group block h-full bg-noble-surface rounded-[28px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-500"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/8 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-emerald-600 group-hover:text-white text-2xl transition-colors" aria-hidden="true">{feature.icon}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${feature.tagColor}`}>
                                        {feature.tag}
                                    </span>
                                </div>
                                <h3 className="font-black text-near-black text-xl mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-near-black/50 text-sm leading-relaxed mb-6">{feature.description}</p>
                                <div className="flex items-center gap-1 text-xs font-black text-noble-blue group-hover:gap-2 transition-all uppercase tracking-wider">
                                    Discover
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_right_alt</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
