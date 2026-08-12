'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SEOSolutionSection() {
    const solutions = [
        {
            icon: 'bolt',
            title: 'Create in seconds',
            description: 'Skip the manual data entry. Use our AI invoice generator free of charge to dictate your line items, or set up recurring billing profiles. It takes exactly 15 seconds.',
            color: 'noble-blue',
            bgGradient: 'from-noble-blue/8 to-noble-blue/[0.02]',
        },
        {
            icon: 'credit_card',
            title: 'Remove friction',
            description: 'Stop giving clients an excuse to pay late. Every invoice includes a one-click payment gateway. Credit cards, Apple Pay, global settlements—we handle the compliance.',
            color: 'electric-cyan',
            bgGradient: 'from-electric-cyan/8 to-electric-cyan/[0.02]',
        },
        {
            icon: 'smart_toy',
            title: 'Automate follow-ups',
            description: 'No one likes sending collection emails. Our system tracks when a client views your invoice and automatically follows up if the due date passes.',
            color: 'primary',
            bgGradient: 'from-primary/8 to-primary/[0.02]',
        },
    ];

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-noble-surface">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-blue/[0.03] blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-cyan/[0.03] blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-noble-blue animate-pulse" />
                        The Solution
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black text-near-black leading-[1.1] tracking-tight mb-6">
                        The invoice software small business owners use for{' '}
                        <span className="text-noble-blue">speed</span>,{' '}
                        <span className="text-near-black/30">not just accounting.</span>
                    </h2>
                    <p className="text-base md:text-lg text-near-black/50 leading-relaxed max-w-2xl mx-auto">
                        We stripped away the bloated features you never use and focused entirely on one metric: how fast the money hits your account. Whether you need a <strong className="text-near-black/70">simple invoice maker app</strong> or are searching for the <Link href="/features/best-free-invoice-app" className="text-noble-blue hover:underline font-bold">best free invoice app</Link> to handle your global settlements.
                    </p>
                </motion.div>

                {/* Solution Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {solutions.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: idx * 0.12, duration: 0.5 }}
                            className="group"
                        >
                            <div className={`h-full bg-gradient-to-b ${item.bgGradient} rounded-[32px] p-8 md:p-10 border border-slate-100 hover:border-${item.color}/20 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                                {/* Hover glow */}
                                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-${item.color}/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-8 group-hover:bg-${item.color} transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-${item.color}/20`}>
                                        <span className={`material-symbols-outlined text-${item.color} group-hover:text-white transition-colors text-3xl`}>{item.icon}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-near-black mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-near-black/50 leading-relaxed text-[15px]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
