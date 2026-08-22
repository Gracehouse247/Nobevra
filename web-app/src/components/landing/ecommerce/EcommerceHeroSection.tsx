'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const platforms = [
    { name: 'Shopify', detail: 'Auto-invoice every order', color: 'bg-green-50 border-green-200 text-green-700' },
    { name: 'WooCommerce', detail: 'PDF invoices on checkout', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { name: 'B2B Wholesale', detail: 'Net terms & bulk billing', color: 'bg-noble-blue/10 border-noble-blue/20 text-noble-blue' },
    { name: 'Custom API', detail: 'Developer-first integration', color: 'bg-slate-100 border-noble-border text-slate-700' },
];

const stats = [
    { value: '200+', label: 'Orders/month handled' },
    { value: '3 hrs', label: 'Saved per week' },
    { value: '160+', label: 'Currencies supported' },
];

export default function EcommerceHeroSection() {
    const [tick, setTick] = useState(0);
    const orders = ['INV-5041', 'INV-5042', 'INV-5043', 'INV-5044'];

    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 1800);
        return () => clearInterval(t);
    }, []);

    return (
        <section className="relative pt-12 pb-24 md:pb-32 overflow-hidden" aria-label="Hero">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-500/5 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-noble-blue/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: copy */}
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-orange-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        Ecommerce Invoice Automation
                    </div>

                    <h1 className="font-inter text-near-black mb-6 text-[40px] md:text-[60px] lg:text-[72px] leading-[1.05] tracking-tight font-black">
                        Every order, invoiced <span className="text-noble-blue">automatically.</span>
                    </h1>

                    <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed font-medium">
                        Whether you run a Shopify store, a WooCommerce shop, or sell wholesale to B2B buyers — Nobevra is the ecommerce invoice software that handles the paperwork so you can handle the growth.
                    </p>

                    {/* Platform pills */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {platforms.map(p => (
                            <div key={p.name} className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-bold ${p.color}`}>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{p.name}</span>
                                <span className="text-[11px] opacity-70">· {p.detail}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Link href="/register" className="text-white px-10 py-5 text-base font-extrabold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(22,111,187,0.3)] hover:scale-[1.02] active:scale-95 bg-[#166FBB]">
                            Start free today <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/pricing" className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all">
                            Compare plans
                        </Link>
                    </div>
                    <p className="text-[11px] text-near-black/35 font-bold uppercase tracking-widest">
                        No credit card required · Free plan available · Cancel anytime
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-near-black/10">
                        {stats.map(s => (
                            <div key={s.label}>
                                <p className="text-[26px] font-black text-near-black leading-none mb-1">{s.value}</p>
                                <p className="text-[11px] text-near-black/50 font-bold uppercase tracking-widest leading-tight">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: animated order feed */}
                <div className="relative">
                    <div className="relative md:h-[580px] w-full bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl p-8 border border-white/10 flex flex-col">
                        <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Order Invoice Engine</h3>
                                <p className="text-slate-400 text-sm">order.fulfilled → invoice.sent</p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full animate-pulse">
                                AUTO-RUNNING
                            </div>
                        </div>

                        {/* Live order feed */}
                        <div className="flex-1 space-y-3 overflow-hidden">
                            {orders.map((inv, i) => {
                                const offset = (tick + i) % 4;
                                const states = [
                                    { label: 'Order received', color: 'text-slate-400', bg: 'bg-black/30' },
                                    { label: 'Invoice generating…', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                                    { label: 'PDF created', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                                    { label: '✓ Sent to buyer', color: 'text-emerald-400 font-bold', bg: 'bg-emerald-500/10 border border-emerald-500/20' },
                                ];
                                const s = states[offset];
                                return (
                                    <div key={inv} className={`p-4 rounded-xl ${s.bg} transition-all duration-700`}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-mono text-sm text-slate-300">{inv}</span>
                                            <span className={`text-xs ${s.color}`}>{s.label}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-5 bg-gradient-to-r from-orange-500 to-noble-blue rounded-2xl flex justify-between items-center text-white">
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">Invoices sent today</p>
                                <p className="text-3xl font-black">847</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">Revenue billed</p>
                                <p className="text-3xl font-black">$94K</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
