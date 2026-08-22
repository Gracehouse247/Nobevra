'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const highlights = [
    { name: 'Retainer Automation', detail: 'Set once, bill monthly', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { name: 'White-Label Portals', detail: 'Your domain, your brand', color: 'bg-violet-50 border-violet-200 text-violet-700' },
    { name: 'Project Profitability', margin: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
];

const stats = [
    { value: '14 Days', label: 'Faster payments' },
    { value: '0', label: 'Forgotten retainers' },
    { value: '$45k+', label: 'Recovered scope creep' },
];

export default function AgencyHeroSection() {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 2500);
        return () => clearInterval(t);
    }, []);

    const feed = [
        { client: 'Acme Corp', amount: '$4,500', label: 'Retainer Billed', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
        { client: 'Stark Ind.', amount: '$12,000', label: 'Project Paid', color: 'text-emerald-400 font-bold', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        { client: 'Wayne Ent.', amount: '$850', label: 'Overage Sent', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
        { client: 'Goliath Bank', amount: '$3,200', label: 'Retainer Billed', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    ];

    return (
        <section className="relative pt-12 pb-24 md:pb-32 overflow-hidden" aria-label="Hero">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-500/5 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-noble-blue/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: copy */}
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-surface text-indigo-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 border border-near-black/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        The Premier Agency Billing Platform
                    </div>

                    <h1 className="font-inter text-near-black mb-6 text-[40px] md:text-[60px] lg:text-[72px] leading-[1.05] tracking-tight font-black">
                        Bill your clients. <span className="text-noble-blue">Keep your margins.</span>
                    </h1>

                    <p className="text-base md:text-lg text-near-black/60 max-w-xl mb-10 leading-relaxed font-medium">
                        Stop managing retainers in spreadsheets and sending PDFs over email. Nobevra is the agency billing software that automates monthly invoices, tracks project overages, and gets you paid 14 days faster through white-label client portals.
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {highlights.map(h => (
                            <div key={h.name} className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-bold ${h.color || h.margin}`}>
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{h.name}</span>
                                {h.detail && <span className="text-[11px] opacity-70">· {h.detail}</span>}
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

                {/* Right: animated feed */}
                <div className="relative">
                    <div className="relative md:h-[580px] w-full bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl p-8 border border-white/10 flex flex-col">
                        <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">Agency Retainer Engine</h3>
                                <p className="text-slate-400 text-sm">Automated billing cycle</p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full animate-pulse">
                                LIVE
                            </div>
                        </div>

                        {/* Live order feed */}
                        <div className="flex-1 space-y-3 overflow-hidden">
                            {feed.map((f, i) => {
                                const offset = (tick + i) % 4;
                                const item = feed[offset];
                                return (
                                    <div key={i} className={`p-4 rounded-xl border bg-black/30 transition-all duration-700 ${i === 0 ? item.bg : 'border-white/5'}`}>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-bold text-white block mb-1">{item.client}</span>
                                                <span className={`text-xs ${i === 0 ? item.color : 'text-slate-500'}`}>{item.label}</span>
                                            </div>
                                            <span className="font-mono text-sm text-slate-300">{item.amount}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 p-5 bg-gradient-to-r from-indigo-500 to-noble-blue rounded-2xl flex justify-between items-center text-white">
                            <div>
                                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">Total Retainers Active</p>
                                <p className="text-3xl font-black">24</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">Monthly MRR</p>
                                <p className="text-3xl font-black">$124K</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
