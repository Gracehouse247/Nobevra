'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CONNECT_FEATURES = [
    {
        icon: 'diversity_3',
        title: 'Lightweight CRM',
        description: 'Track client profiles, view interaction histories, and monitor exact moments when invoices are viewed by your customers.',
        link: '/crm',
        tag: 'CRM Pipeline',
        tagColor: 'bg-emerald-500/10 text-emerald-700',
    },
    {
        icon: 'open_in_browser',
        title: 'Branded Client Portal',
        description: 'Provide clients a secure, white-labeled web portal to review documents, access invoices, and pay online with zero login required.',
        link: '/crm',
        tag: 'Frictionless',
        tagColor: 'bg-noble-blue/10 text-noble-blue',
    },
    {
        icon: 'badge',
        title: 'Business Identity & NFC',
        description: 'Create customized digital business cards with tap-to-share NFC technology and instant vCard phone contact saving.',
        link: '/digital-business-card',
        tag: 'NFC Ready',
        tagColor: 'bg-violet-500/10 text-violet-700',
    },
    {
        icon: 'qr_code_2',
        title: 'Dynamic QR Engine',
        description: 'Generate dynamic high-resolution QR codes for websites, payment links, and vCards with real-time scan telemetry.',
        link: '/qr-code-generator',
        tag: 'Dynamic QR',
        tagColor: 'bg-amber-500/10 text-amber-700',
    },
    {
        icon: 'group',
        title: 'Team Workspaces',
        description: 'Collaborate with team members in a shared workspace with strict multi-tenant Row-Level Security and granular roles.',
        link: '/business-management-software',
        tag: 'Multi-Tenant',
        tagColor: 'bg-slate-200 text-slate-700',
    },
    {
        icon: 'mail',
        title: 'Client Communication',
        description: 'Automate professional payment reminder emails, status notifications, and verified digital transaction receipts.',
        link: '/crm',
        tag: 'Automated Email',
        tagColor: 'bg-rose-500/10 text-rose-700',
    },
];

export default function ConnectSection() {
    return (
        <section
            id="connect"
            className="py-24 md:py-32 bg-gradient-to-b from-slate-50/80 to-white relative"
            aria-label="CONNECT — Nobevra relationship and identity tools"
        >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-noble-blue/4 blur-[100px] rounded-full translate-x-1/2" />
            </div>

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/15 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">hub</span>
                        PILLAR 2: CONNECT
                    </div>
                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4 max-w-2xl">
                        Build relationships that{' '}
                        <span className="text-noble-blue italic">actually convert.</span>
                    </h2>
                    <p className="text-base md:text-lg text-near-black/50 max-w-2xl leading-relaxed">
                        Lightweight CRM, branded client portals, NFC smart business cards, dynamic QR codes, automated communications, and team collaboration.
                    </p>
                </motion.div>

                {/* Feature grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CONNECT_FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                            <Link
                                href={feature.link}
                                className="group block h-full bg-noble-surface rounded-[28px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-noble-blue/10 hover:scale-[1.02] transition-all duration-500"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-near-black/5 flex items-center justify-center group-hover:bg-noble-blue/10 transition-colors">
                                        <span className="material-symbols-outlined text-near-black/50 group-hover:text-noble-blue text-2xl transition-colors" aria-hidden="true">{feature.icon}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${feature.tagColor}`}>
                                        {feature.tag}
                                    </span>
                                </div>
                                <h3 className="font-black text-near-black text-xl mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-near-black/50 text-sm leading-relaxed mb-6">{feature.description}</p>
                                <div className="flex items-center gap-1 text-xs font-black text-noble-blue group-hover:gap-2 transition-all uppercase tracking-wider">
                                    Explore
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
