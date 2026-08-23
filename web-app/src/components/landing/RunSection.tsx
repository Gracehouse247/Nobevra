'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const RUN_FEATURES = [
    {
        icon: 'receipt_long',
        title: 'Smart Invoicing',
        description: 'Generate pixel-perfect invoices in seconds with 180+ templates, automated tax/VAT calculations, and multi-currency billing.',
        link: '/invoicing',
        color: 'from-blue-50 to-white',
        iconBg: 'bg-noble-blue/10',
        iconColor: 'text-noble-blue',
        tag: '180+ Templates',
        tagColor: 'bg-noble-blue/10 text-noble-blue',
    },
    {
        icon: 'account_balance_wallet',
        title: 'Expenses & AI Receipts',
        description: 'Capture, categorize, and reconcile every business expense with automated Gemini OCR receipt scanning and profit/loss visibility.',
        link: '/expense-management',
        color: 'from-emerald-50 to-white',
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-600',
        tag: 'Gemini OCR',
        tagColor: 'bg-emerald-500/10 text-emerald-700',
    },
    {
        icon: 'inventory_2',
        title: 'Products & Inventory',
        description: 'Manage physical and digital catalog items, track stock levels in real time, and link inventory to invoices to prevent stockouts.',
        link: '/products-inventory',
        color: 'from-violet-50 to-white',
        iconBg: 'bg-violet-500/10',
        iconColor: 'text-violet-600',
        tag: 'Real-Time Stock',
        tagColor: 'bg-violet-500/10 text-violet-700',
    },
    {
        icon: 'payments',
        title: 'Payments & Productivity',
        description: 'Accept card and bank payments online via Flutterwave, manage in-app balances, and automate recurring billing cycles.',
        link: '/payments',
        color: 'from-amber-50 to-white',
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-600',
        tag: 'Automated Billing',
        tagColor: 'bg-amber-500/10 text-amber-700',
    },
];

export default function RunSection() {
    return (
        <section
            id="run"
            className="py-24 md:py-32 relative"
            aria-label="RUN — Nobevra business operations"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">play_circle</span>
                        PILLAR 1: RUN
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4 max-w-2xl">
                        Everything you need to{' '}
                        <span className="text-noble-blue italic">run your operations.</span>
                    </h2>
                    <p className="text-base md:text-lg text-near-black/50 max-w-2xl leading-relaxed">
                        Invoicing, expenses, product catalogs, inventory tracking, Flutterwave payments, and recurring productivity automation — all seamlessly unified.
                    </p>
                </motion.div>

                {/* Feature cards grid */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {RUN_FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Link
                                href={feature.link}
                                className={`group block h-full bg-gradient-to-br ${feature.color} rounded-[28px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <span className={`material-symbols-outlined ${feature.iconColor} text-2xl`} aria-hidden="true">{feature.icon}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${feature.tagColor}`}>
                                        {feature.tag}
                                    </span>
                                </div>
                                <h3 className="font-black text-near-black text-xl mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-near-black/50 text-sm leading-relaxed mb-6">{feature.description}</p>
                                <div className="flex items-center gap-1 text-xs font-black text-noble-blue group-hover:gap-2 transition-all uppercase tracking-wider">
                                    Learn more
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
