'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function FreelancerHeroSection() {
    const [demoOpen, setDemoOpen] = useState(false);

    return (
        <>
            {/* ── Video Demo Modal ── */}
            <AnimatePresence>
                {demoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-near-black/80 backdrop-blur-md p-4"
                        onClick={() => setDemoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl bg-noble-surface rounded-[32px] overflow-hidden shadow-2xl border border-slate-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setDemoOpen(false)}
                                aria-label="Close demo video"
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-100/80 backdrop-blur-sm flex items-center justify-center text-noble-text hover:bg-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined" aria-hidden="true">close</span>
                            </button>
                            <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 gap-6">
                                <div className="w-20 h-20 rounded-full bg-noble-surface flex items-center justify-center shadow-xl border border-slate-100">
                                    <span className="material-symbols-outlined text-5xl text-noble-blue">play_arrow</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-noble-text font-black text-lg">Simple Invoicing for Freelancers — Demo</p>
                                    <p className="text-slate-400 text-sm mt-1 font-medium">See how easy independent contractor invoicing can be</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Hero Section ── */}
            <section className="relative min-h-screen flex items-center pt-12 pb-32 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-noble-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-cyan/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

                    {/* ── Left: Copy ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            #1 Invoice App For Self Employed
                        </div>

                        {/* Headline */}
                        <h1 className="font-inter text-near-black mb-6 text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black">
                            Why Simple Invoicing for Freelancers is Key to <span className="text-noble-blue">Getting Paid Faster</span>
                        </h1>

                        <p className="text-body-lg text-near-black/60 max-w-xl mb-10 leading-relaxed">
                            Stop chasing payments and wasting your weekends reconciling spreadsheets. Our premium freelance billing software is built for the self-employed to create a professional invoice in seconds and secure your cash flow. If you have been searching for the perfect freelancer billing app or reliable invoicing software for freelancers, Nobevra is your all-in-one solution.
                        </p>

                        {/* Social Proof Avatars */}
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex -space-x-3">
                                {[
                                    { bg: 'bg-noble-blue', text: 'SJ' },
                                    { bg: 'bg-[#01A0E2]', text: 'MT' },
                                    { bg: 'bg-primary', text: 'ER' },
                                    { bg: 'bg-[#166FBB]', text: 'AK' },
                                    { bg: 'bg-near-black', text: 'LB' },
                                ].map((a, i) => (
                                    <div
                                        key={i}
                                        className={`w-9 h-9 rounded-full ${a.bg} border-2 border-white flex items-center justify-center text-noble-text text-[10px] font-black shadow-sm`}
                                        style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
                                    >
                                        {a.text}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex gap-0.5 mb-0.5">
                                    {[1,2,3,4,5].map(i => (
                                        <span key={i} className="text-yellow-400 text-xs">★</span>
                                    ))}
                                </div>
                                <p className="text-[11px] font-bold text-near-black/50">
                                    Trusted by 50,000+ <span className="text-near-black font-black">independent contractors</span> worldwide
                                </p>
                            </div>
                        </div>

                        {/* CTA Group */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link
                                href="/register"
                                className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95"
                                style={{ backgroundColor: '#166FBB' }}
                            >
                                Start Free Today
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>

                            <button
                                onClick={() => setDemoOpen(true)}
                                aria-label="Watch 2-minute product demo"
                                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all group"
                            >
                                <div className="w-7 h-7 rounded-full bg-noble-blue/10 flex items-center justify-center group-hover:bg-noble-blue group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-sm text-noble-blue group-hover:text-white">play_arrow</span>
                                </div>
                                Watch 2-min Demo
                            </button>
                        </div>

                        {/* Risk-Reversal Micro-copy */}
                        <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest mb-10">
                            No credit card required · Free plan available · Cancel anytime
                        </p>

                        {/* Third-Party Trust Badges */}
                        <div className="flex flex-wrap items-center gap-6 border-t border-near-black/5 pt-8">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500 text-lg">verified_user</span>
                                <div>
                                    <p className="text-[10px] font-black text-near-black uppercase tracking-tight">SOC 2 Type II</p>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase">Certified</p>
                                </div>
                            </div>

                            <div className="w-px h-8 bg-near-black/8" />

                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-[#FF492C] flex items-center justify-center text-white font-black text-[10px]">G2</div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-xs">★★★★★</span>
                                    </div>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase tracking-wide">4.9 · G2 Reviews</p>
                                </div>
                            </div>

                            <div className="w-px h-8 bg-near-black/8" />

                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-near-black flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-sm">phone_iphone</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-xs">★★★★★</span>
                                    </div>
                                    <p className="text-[9px] text-near-black/40 font-bold uppercase tracking-wide">4.8 · App Store</p>
                                </div>
                            </div>

                            <div className="w-px h-8 bg-near-black/8" />

                            <div>
                                <p className="text-lg font-black text-near-black">100%</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-near-black/40">Secure Payments</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right: Animated Product Image ── */}
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
                            <div className="absolute -inset-4 bg-gradient-to-tr from-noble-blue/20 to-electric-cyan/20 blur-2xl rounded-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                            <div className="relative bg-noble-surface/50 backdrop-blur-sm p-3 sm:p-4 rounded-[24px] sm:rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">
                                <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="rounded-[16px] sm:rounded-[32px] overflow-hidden border border-slate-100/50 shadow-inner bg-slate-50">
                                    <Image
                                        alt="Nobevra Freelance Invoicing Dashboard & Ledger"
                                        className="w-full h-auto object-cover object-top"
                                        src="/images/crm-engine-hero.png"
                                        width={1920}
                                        height={1080}
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="absolute -bottom-4 -left-4 lg:-left-8 bg-noble-surface rounded-2xl px-5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-near-black/5 z-20 flex items-center gap-3"
                        >
                            <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-near-black uppercase tracking-wider">Freelance Invoice Paid</p>
                                <p className="text-base font-black text-green-700">+$2,850.00</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
