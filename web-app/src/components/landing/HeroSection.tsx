'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TRUST_ITEMS = [
    {
        icon: 'lock',
        label: 'Supabase Infrastructure',
        sub: '256-bit encrypted',
    },
    {
        icon: 'payments',
        label: 'Flutterwave Payments',
        sub: 'Secure gateway',
    },
    {
        icon: 'verified',
        label: 'CAC Registered',
        sub: "The Noble's Technology Services",
    },
    {
        icon: 'devices',
        label: 'Web · Android · iOS',
        sub: 'One account, every device',
    },
];

export default function HeroSection() {
    return (
        <section
            className="relative min-h-screen flex items-center pt-12 pb-32 overflow-hidden"
            aria-label="Nobevra — Intelligent Business Operating System"
        >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

                {/* ── Left: Copy ── */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative z-10"
                >
                    {/* Platform badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-noble-blue font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                        The Intelligent Business Operating System
                    </div>

                    {/* H1 */}
                    <h1 className="font-inter text-near-black mb-6 text-[32px] md:text-[52px] lg:text-[58px] leading-[1.05] tracking-tight font-black">
                        Run Your Business.{' '}
                        <span className="text-noble-blue">Connect Everything.</span>{' '}
                        Grow Without Limits.
                    </h1>

                    <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                        Nobevra brings invoicing, CRM, expenses, payments, products,
                        AI, business identity and team collaboration together in one
                        connected platform. Built for founders. Optimized for growth.
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Link
                            href="/register"
                            className="text-white px-10 py-4 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Start Free
                            <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                        </Link>

                        <Link
                            href="/#platform"
                            className="flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
                        >
                            <span className="material-symbols-outlined text-sm" aria-hidden="true">explore</span>
                            Explore Platform
                        </Link>
                    </div>

                    {/* Microcopy */}
                    <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                        No credit card required · Free plan available · Cancel anytime
                    </p>

                    {/* Verified trust signals */}
                    <div className="flex flex-wrap items-center gap-4 border-t border-near-black/5 pt-8">
                        {TRUST_ITEMS.map((item) => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-noble-blue/8 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-noble-blue text-base" aria-hidden="true">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-near-black uppercase tracking-tight leading-tight">{item.label}</p>
                                    <p className="text-[9px] text-near-black/40 font-bold">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Right: Product Visual ── */}
                <motion.div
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                    className="relative flex justify-center items-center lg:pl-10"
                    style={{ perspective: '1200px' }}
                >
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative group z-10 w-full transition-transform duration-700 ease-out hover:rotate-0 hover:scale-105"
                        style={{ transform: 'rotateY(-12deg) rotateX(4deg) scale(1.02)' }}
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" aria-hidden="true" />
                        <div className="relative bg-noble-surface/50 backdrop-blur-sm p-3 sm:p-4 rounded-[24px] sm:rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
                            {/* Browser chrome mockup */}
                            <div className="flex items-center gap-1.5 px-2 pb-3 pt-1" aria-hidden="true">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <div className="rounded-[16px] sm:rounded-[32px] overflow-hidden border border-slate-100/50 shadow-inner bg-slate-50">
                                <Image
                                    alt="Nobevra Business Operating System — dashboard showing invoicing, CRM, expenses and business intelligence"
                                    className="w-full h-auto object-cover object-top"
                                    src="/images/hero-dashboard-actual.png"
                                    width={1366}
                                    height={1633}
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating badge — paid invoice */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="absolute -bottom-4 -left-4 lg:-left-8 bg-noble-surface rounded-2xl px-5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-near-black/5 z-20 flex items-center gap-3"
                        aria-hidden="true"
                    >
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-near-black uppercase tracking-wider">Invoice Paid</p>
                            <p className="text-base font-black text-emerald-700">+₦450,000</p>
                        </div>
                    </motion.div>

                    {/* Floating badge — platform */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="absolute -top-4 -right-4 lg:-right-6 bg-noble-surface rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-near-black/5 z-20 flex items-center gap-2.5"
                        aria-hidden="true"
                    >
                        <span className="material-symbols-outlined text-noble-blue text-xl">hub</span>
                        <div>
                            <p className="text-[9px] font-black text-near-black/60 uppercase tracking-widest">Platform Active</p>
                            <p className="text-[11px] font-bold text-near-black">Run · Connect · Grow</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
