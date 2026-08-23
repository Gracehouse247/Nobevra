'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TRUST_PILLARS = [
    {
        icon: 'table_rows_narrow',
        category: 'Database Architecture',
        title: 'PostgreSQL Row-Level Security (RLS)',
        description: 'Every database query enforces workspace-level tenant isolation directly at the SQL engine layer. No user or tenant can ever read or write another organization\'s records.',
        verifiedBadge: 'Strict Multi-Tenant Isolation',
    },
    {
        icon: 'lock',
        category: 'Transport & Storage',
        title: '256-Bit TLS 1.3 & Encrypted Storage',
        description: 'All network traffic is encrypted in transit using TLS 1.3 cipher suites. File attachments, receipts, and invoice PDFs are securely stored in encrypted object buckets.',
        verifiedBadge: 'End-to-End Encryption',
    },
    {
        icon: 'passkey',
        category: 'Access Control',
        title: 'Secure Authentication & Session Tokens',
        description: 'Hardened authentication with secure JWT tokens, Argon2/Bcrypt password hashing, and Google OAuth 2.0. Sensitive operations require verified session state.',
        verifiedBadge: 'OAuth 2.0 + JWT',
    },
    {
        icon: 'credit_card',
        category: 'Financial Infrastructure',
        title: 'PCI-DSS Certified Payment Processing',
        description: 'Online card payments are processed directly by Flutterwave (certified PCI-DSS Level 1 processor). Nobevra never stores, processes, or logs raw credit card numbers.',
        verifiedBadge: 'Zero Card Data Stored',
    },
    {
        icon: 'database',
        category: 'Data Rights',
        title: '100% Data Ownership & Instant Export',
        description: 'You retain full, unrestricted ownership of your customer lists, invoices, and expense logs. Export your full dataset in standard JSON or CSV formats anytime.',
        verifiedBadge: 'Full Data Portability',
    },
    {
        icon: 'admin_panel_settings',
        category: 'Workspace Security',
        title: 'Granular Roles & Access Controls',
        description: 'Enforce strict role-based permissions across team members, accountants, and workspace managers with complete audit trails and isolated member sessions.',
        verifiedBadge: 'Role-Based Access Control',
    },
];

export default function SecurityTrustSection() {
    return (
        <section
            id="security"
            className="py-24 md:py-32 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden"
            aria-label="Nobevra Security, Privacy, and Trust Architecture"
        >
            {/* Background accent */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-noble-blue/3 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/3 blur-3xl rounded-full pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">verified_user</span>
                        Security Architecture & Trust
                    </div>

                    <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4">
                        Built on Transparent,{' '}
                        <span className="text-noble-blue">Verifiable Security.</span>
                    </h2>

                    <p className="text-base md:text-lg text-near-black/60 leading-relaxed font-normal">
                        No fake certification badges or exaggerated claims. Just robust, modern engineering designed to keep your business records private, isolated, and completely within your control.
                    </p>
                </motion.div>

                {/* 6 Trust Pillars Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {TRUST_PILLARS.map((pillar, idx) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="bg-noble-surface rounded-[28px] p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-11 h-11 rounded-2xl bg-noble-blue/10 flex items-center justify-center text-noble-blue">
                                        <span className="material-symbols-outlined text-xl" aria-hidden="true">{pillar.icon}</span>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                                        {pillar.category}
                                    </span>
                                </div>

                                <h3 className="font-black text-near-black text-lg mb-2.5 tracking-tight leading-snug">
                                    {pillar.title}
                                </h3>

                                <p className="text-near-black/60 text-xs leading-relaxed mb-6 font-normal">
                                    {pillar.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                <span className="text-[11px] font-bold text-slate-600 truncate">
                                    {pillar.verifiedBadge}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Verified Trust Statement Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-noble-surface rounded-2xl p-6 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                            <span className="material-symbols-outlined text-2xl">privacy_tip</span>
                        </div>
                        <div>
                            <h4 className="font-black text-sm text-near-black">Your Data Is Never Sold or Monetized</h4>
                            <p className="text-xs text-near-black/50 mt-0.5">
                                We operate on a direct subscription model. Your customer contacts, invoices, and financial records remain 100% confidential.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-500">Architecture:</span>
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-xs text-near-black font-mono">
                            Zero Ad Tracking · Privacy-First
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
