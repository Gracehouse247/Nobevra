'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SECURITY_PILLARS = [
    {
        icon: 'lock',
        title: 'Multi-Tenant Row-Level Security',
        description: 'Every database query is protected by PostgreSQL Row-Level Security (RLS) policies. Your financial data and client lists are strictly isolated.',
    },
    {
        icon: 'verified_user',
        title: '256-Bit Data Encryption',
        description: 'All sensitive customer, invoice, and financial data is encrypted at rest and in transit via secure HTTPS/TLS 1.3 encryption protocols.',
    },
    {
        icon: 'credit_card',
        title: 'PCI-Compliant Payment Gateways',
        description: 'Online card payments are processed directly by certified payment partners (Flutterwave). Nobevra never stores raw credit card details on our servers.',
    },
    {
        icon: 'gavel',
        title: 'Legally Registered Entity',
        description: "Nobevra is developed and operated by The Noble's Technology Services, a registered business entity adhering to global privacy and data standards.",
    },
];

export default function SecurityTrustSection() {
    return (
        <section
            id="security"
            className="py-24 md:py-32 bg-slate-50/60 border-y border-slate-100 relative"
            aria-label="Nobevra Security and Data Privacy Architecture"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">shield</span>
                        Security & Trust
                    </div>

                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4">
                        Enterprise-Grade Security.{' '}
                        <span className="text-noble-blue italic">Built-in.</span>
                    </h2>

                    <p className="text-base md:text-lg text-near-black/50 leading-relaxed">
                        We prioritize privacy, data ownership, and strict workspace isolation at every level of our technology architecture.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SECURITY_PILLARS.map((pillar, idx) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="bg-noble-surface rounded-[24px] p-8 border border-slate-100 shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                                <span className="material-symbols-outlined text-2xl" aria-hidden="true">{pillar.icon}</span>
                            </div>
                            <h3 className="font-black text-near-black text-lg mb-3 tracking-tight">{pillar.title}</h3>
                            <p className="text-near-black/50 text-sm leading-relaxed">{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
