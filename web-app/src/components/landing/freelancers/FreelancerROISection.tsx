'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const stats = [
    {
        value: '23 hrs',
        label: 'Average hours a freelancer loses to manual billing every month',
        source: 'Based on 50+ invoice/mo at 30 min each',
        icon: 'schedule',
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-100',
    },
    {
        value: '40%',
        label: 'Reduction in late payments within the first 60 days of using automated reminders',
        source: 'Nobevra user data',
        icon: 'trending_down',
        color: 'text-noble-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
    },
    {
        value: '$4,600',
        label: 'Average annual revenue recovered by freelancers who use 1-click invoice payment links',
        source: 'Faster payment = more billable time',
        icon: 'payments',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
    },
];

export default function FreelancerROISection() {
    const [invoices, setInvoices] = useState(20);
    const [timePerInvoice, setTimePerInvoice] = useState(30);
    const [hourlyRate, setHourlyRate] = useState(75);

    const [savings, setSavings] = useState({ hours: 0, money: 0 });

    useEffect(() => {
        const currentTotalMinutes = invoices * timePerInvoice;
        const savedMinutes = currentTotalMinutes * 0.8;
        const savedHours = Math.round(savedMinutes / 60);
        const savedMoney = Math.round(savedHours * hourlyRate);
        setSavings({ hours: savedHours, money: savedMoney });
    }, [invoices, timePerInvoice, hourlyRate]);

    return (
        <section className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
            {/* Decorative grid lines — editorial feel */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            <div className="max-w-[1430px] mx-auto px-4 md:px-16 relative z-10">

                {/* Section Header — editorial style */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-8 border-b-2 border-near-black/10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-near-black text-white font-bold text-[10px] uppercase tracking-widest mb-5">
                            The Hidden Cost of Manual Billing
                        </div>
                        <h2 className="font-inter text-4xl md:text-5xl font-black text-near-black leading-[1.1] tracking-tight">
                            Time is your <span className="relative inline-block">
                                only inventory
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-noble-blue rounded-full" />
                            </span> as a freelancer.
                        </h2>
                    </div>
                    <p className="text-near-black/50 text-base md:text-lg leading-relaxed max-w-sm font-medium md:text-right">
                        Every minute spent on self-employed billing is a minute you could be charging for. Here is what the math actually looks like.
                    </p>
                </div>

                {/* Main Content: Stats Left + Calculator Right */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column — Hard Stats */}
                    <div className="space-y-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className={`bg-noble-surface rounded-3xl p-7 border ${stat.border} flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow`}
                            >
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0 mt-1`}>
                                    <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
                                </div>
                                <div>
                                    <div className={`text-4xl md:text-5xl font-black tracking-tight ${stat.color} mb-2`}>
                                        {stat.value}
                                    </div>
                                    <p className="text-near-black/80 font-semibold leading-snug text-sm md:text-base mb-2">
                                        {stat.label}
                                    </p>
                                    <p className="text-near-black/35 text-[11px] font-bold uppercase tracking-widest">
                                        {stat.source}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Bottom pull-quote */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="relative bg-noble-blue rounded-3xl p-7 text-white overflow-hidden"
                        >
                            <div className="absolute top-2 left-5 text-white/10 text-[80px] font-serif leading-none select-none">&ldquo;</div>
                            <p className="relative z-10 text-lg font-semibold leading-relaxed italic mb-4">
                                "I was spending almost a full day every month just on invoicing and chasing payments. After switching to Nobevra, that entire process takes about 20 minutes total."
                            </p>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-9 h-9 rounded-full bg-noble-surface/20 flex items-center justify-center font-black text-sm">JL</div>
                                <div>
                                    <p className="font-black text-sm text-white">James L.</p>
                                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Freelance Copywriter</p>
                                </div>
                                <div className="ml-auto flex gap-0.5">
                                    {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-300 text-sm">★</span>)}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column — Interactive Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="sticky top-28"
                    >
                        <div className="bg-noble-surface rounded-[40px] border border-noble-border shadow-xl overflow-hidden">

                            {/* Calculator Header */}
                            <div className="bg-near-black px-8 py-6">
                                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">Your Personal Billing Audit</p>
                                <h3 className="text-white text-2xl font-black tracking-tight">How much time are you losing?</h3>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Slider: Invoices per month */}
                                <div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-near-black/50">Invoices per month</label>
                                        <span className="text-2xl font-black text-noble-blue">{invoices}</span>
                                    </div>
                                    <input
                                        type="range" min="1" max="100" value={invoices}
                                        onChange={e => setInvoices(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-noble-blue"
                                    />
                                    <div className="flex justify-between text-[10px] text-near-black/25 font-bold mt-1">
                                        <span>1</span><span>100</span>
                                    </div>
                                </div>

                                {/* Slider: Minutes per invoice */}
                                <div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-near-black/50">Minutes per invoice</label>
                                        <span className="text-2xl font-black text-noble-blue">{timePerInvoice} min</span>
                                    </div>
                                    <input
                                        type="range" min="5" max="120" value={timePerInvoice}
                                        onChange={e => setTimePerInvoice(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-noble-blue"
                                    />
                                    <div className="flex justify-between text-[10px] text-near-black/25 font-bold mt-1">
                                        <span>5 min</span><span>120 min</span>
                                    </div>
                                </div>

                                {/* Slider: Hourly rate */}
                                <div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-near-black/50">Your hourly rate</label>
                                        <span className="text-2xl font-black text-noble-blue">${hourlyRate}</span>
                                    </div>
                                    <input
                                        type="range" min="15" max="500" value={hourlyRate}
                                        onChange={e => setHourlyRate(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-noble-blue"
                                    />
                                    <div className="flex justify-between text-[10px] text-near-black/25 font-bold mt-1">
                                        <span>$15</span><span>$500</span>
                                    </div>
                                </div>

                                {/* Result Panel */}
                                <div className="bg-gradient-to-br from-[#0A1628] to-[#166FBB] rounded-3xl p-7 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-noble-surface/5 blur-2xl rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
                                    <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-4">If you switched today, you'd save</p>

                                    <div className="flex items-end gap-6 mb-4">
                                        <div>
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={savings.hours}
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -10, opacity: 0 }}
                                                    className="text-5xl font-black text-white tracking-tight"
                                                >
                                                    {savings.hours}h
                                                </motion.p>
                                            </AnimatePresence>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Per Month</p>
                                        </div>
                                        <div className="w-px h-12 bg-noble-surface/15" />
                                        <div>
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={savings.money}
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -10, opacity: 0 }}
                                                    className="text-5xl font-black text-[#00D1FF] tracking-tight"
                                                >
                                                    ${savings.money.toLocaleString()}
                                                </motion.p>
                                            </AnimatePresence>
                                            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">In Billable Value</p>
                                        </div>
                                    </div>

                                    <p className="text-white/40 text-[11px] leading-relaxed">
                                        Based on 80% time reduction — the average Nobevra user result.
                                    </p>
                                </div>

                                {/* CTA */}
                                <Link
                                    href="/register"
                                    className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black text-white text-base shadow-[0_16px_40px_rgba(22,111,187,0.3)] hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
                                    style={{ backgroundColor: '#166FBB' }}
                                >
                                    Reclaim my {savings.hours > 0 ? `${savings.hours} hours` : 'time'}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                                <p className="text-center text-[11px] text-near-black/30 font-bold uppercase tracking-widest -mt-4">
                                    Free plan · No credit card
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
