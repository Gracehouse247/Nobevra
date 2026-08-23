'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    {
        q: 'What is Nobevra and how does it work?',
        a: 'Nobevra is an intelligent Business Operating System that unifies invoicing, lightweight CRM, expense management, digital business cards, QR code generation, team workspaces, and AI business intelligence into one single platform.',
    },
    {
        q: 'Can I start using Nobevra for free?',
        a: 'Yes! Nobevra offers a Starter tier with no time limits or hidden fees. You can create invoices, manage clients, and build your digital business card without entering a credit card.',
    },
    {
        q: 'How do my clients pay their invoices?',
        a: 'Your clients receive a secure web payment link leading to your branded Client Portal. They can view the invoice details and pay online instantly via Flutterwave using debit cards, bank transfers, or mobile money — without creating an account.',
    },
    {
        q: 'What makes Nobevra different from basic invoice generators?',
        a: 'Standard invoice generators only create a static PDF document. Nobevra is a complete business management platform: it tracks invoice views in real time, manages customer relationship pipelines, automates recurring billing, scans expense receipts with AI, and provides digital identity NFC cards.',
    },
    {
        q: 'Can I use Nobevra on my mobile phone?',
        a: 'Yes. Nobevra is available as both a high-performance web app and native mobile apps for Android and iOS, keeping your business data synced seamlessly across all devices.',
    },
    {
        q: 'How is my business and financial data protected?',
        a: 'Nobevra employs PostgreSQL Row-Level Security (RLS) policies to ensure strict workspace and multi-tenant data isolation. All network traffic is encrypted via 256-bit TLS/HTTPS protocols, and online payments are securely processed by certified payment gateways.',
    },
    {
        q: 'Can I invite team members and collaborate?',
        a: 'Yes. On our Pulse and Elite plans, you can invite team members to your workspace, assign roles, and collaborate on billing, expenses, and client relationship management.',
    },
    {
        q: 'Can I customize invoice templates with my brand logo and colors?',
        a: 'Yes. You can upload your company logo, choose your primary brand colors, set custom invoice notes, and remove default watermarks to maintain a 100% professional look.',
    },
];

export default function SEOQualifierFAQ() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="py-24 md:py-32 bg-slate-50/60 relative overflow-hidden"
            aria-label="Frequently Asked Questions about Nobevra"
        >
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/8 border border-noble-blue/10 text-noble-blue font-bold text-[10px] uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">help_outline</span>
                        FAQ
                    </div>

                    <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight mb-4">
                        Frequently Asked Questions
                    </h2>

                    <p className="text-base md:text-lg text-near-black/50 leading-relaxed">
                        Everything you need to know about the Nobevra Business Operating System.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                            <div
                                key={faq.q}
                                className="bg-noble-surface rounded-[24px] border border-slate-100 shadow-sm overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                    aria-expanded={isOpen}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 font-black text-near-black text-lg md:text-xl focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none transition-colors"
                                >
                                    <span>{faq.q}</span>
                                    <span
                                        className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-noble-blue shrink-0 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180 bg-noble-blue text-white' : ''
                                        }`}
                                        aria-hidden="true"
                                    >
                                        <span className="material-symbols-outlined text-base">expand_more</span>
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-6 md:px-8 md:pb-8 text-near-black/60 text-sm md:text-base leading-relaxed border-t border-slate-50 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <p className="text-xs text-near-black/50 font-medium">
                        Have more questions? Visit our{' '}
                        <Link href="/help-center" className="text-noble-blue font-bold underline">
                            Help Center
                        </Link>{' '}
                        or contact{' '}
                        <Link href="/support" className="text-noble-blue font-bold underline">
                            Customer Support
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
