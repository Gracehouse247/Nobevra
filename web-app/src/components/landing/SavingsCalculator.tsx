'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, DollarSign, ArrowRight, Zap } from 'lucide-react';

export default function SavingsCalculator() {
    const [invoices, setInvoices] = useState(50);
    const [timePerInvoice, setTimePerInvoice] = useState(30); // in minutes
    const [hourlyRate, setHourlyRate] = useState(150);

    const [savings, setSavings] = useState({
        hours: 0,
        money: 0
    });

    useEffect(() => {
        // Assume NobleInvoice reduces time by 80%
        const currentTotalMinutes = invoices * timePerInvoice;
        const newTotalMinutes = currentTotalMinutes * 0.2;
        const savedMinutes = currentTotalMinutes - newTotalMinutes;
        const savedHours = Math.round(savedMinutes / 60);
        const savedMoney = Math.round(savedHours * hourlyRate);

        setSavings({
            hours: savedHours,
            money: savedMoney
        });
    }, [invoices, timePerInvoice, hourlyRate]);

    return (
        <div className="bg-noble-surface rounded-[48px] p-8 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-near-black/[0.03] max-w-5xl mx-auto relative overflow-hidden group/main">
            {/* Subtle background decorative pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#166FBB 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <label htmlFor="invoices-range" className="text-[10px] font-black uppercase tracking-[0.2em] text-near-black/40 flex items-center gap-2">
                                    <DollarSign className="w-3 h-3 text-noble-blue" />
                                    Monthly Invoices
                                </label>
                                <p className="text-sm font-bold text-near-black/60">Volume of documents generated</p>
                            </div>
                            <span className="text-3xl font-black text-noble-blue tracking-tighter">{invoices}</span>
                        </div>
                        <div className="relative pt-2">
                            <input 
                                id="invoices-range"
                                type="range" 
                                min="10" 
                                max="500" 
                                value={invoices} 
                                onChange={(e) => setInvoices(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-near-black/5 rounded-full appearance-none cursor-pointer accent-noble-blue hover:accent-electric-cyan transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <label htmlFor="time-range" className="text-[10px] font-black uppercase tracking-[0.2em] text-near-black/40 flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-noble-blue" />
                                    Manual Processing Time
                                </label>
                                <p className="text-sm font-bold text-near-black/60">Minutes spent per invoice</p>
                            </div>
                            <span className="text-3xl font-black text-noble-blue tracking-tighter">{timePerInvoice}m</span>
                        </div>
                        <div className="relative pt-2">
                            <input 
                                id="time-range"
                                type="range" 
                                min="5" 
                                max="120" 
                                value={timePerInvoice} 
                                onChange={(e) => setTimePerInvoice(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-near-black/5 rounded-full appearance-none cursor-pointer accent-noble-blue hover:accent-electric-cyan transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <label htmlFor="rate-range" className="text-[10px] font-black uppercase tracking-[0.2em] text-near-black/40 flex items-center gap-2">
                                    <Zap className="w-3 h-3 text-noble-blue" />
                                    Hourly Value
                                </label>
                                <p className="text-sm font-bold text-near-black/60">Your time's billable rate</p>
                            </div>
                            <span className="text-3xl font-black text-noble-blue tracking-tighter">${hourlyRate}</span>
                        </div>
                        <div className="relative pt-2">
                            <input 
                                id="rate-range"
                                type="range" 
                                min="20" 
                                max="500" 
                                value={hourlyRate} 
                                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-near-black/5 rounded-full appearance-none cursor-pointer accent-noble-blue hover:accent-electric-cyan transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative group/card">
                    {/* Cinematic Card Container */}
                    <div className="bg-gradient-to-br from-[#020617] via-[#052A4F] to-[#166FBB] rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden shadow-[0_40px_100px_rgba(22,111,187,0.3)] border border-white/10">
                        {/* Animated background highlights */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-noble-blue/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover/card:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-electric-cyan/20 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
                        
                        {/* Glassmorphic Grain Overlay — CSS-only dot pattern (no external URL) */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                        <div className="relative z-10 space-y-12">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-card border border-noble-card-border text-[10px] font-black uppercase tracking-widest text-electric-cyan">
                                    <TrendingUp className="w-3 h-3" />
                                    Annual Projection Optimized
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Total Monthly Savings</p>
                                    <div className="flex items-baseline gap-2">
                                        <AnimatePresence mode="wait">
                                            <motion.p 
                                                key={savings.money}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
                                            >
                                                ${savings.money.toLocaleString()}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Time Recaptured</p>
                                    <p className="text-3xl font-black text-electric-cyan flex items-baseline gap-1">
                                        {savings.hours}h
                                        <span className="text-xs font-bold text-white/40 uppercase tracking-tighter">/mo</span>
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Efficiency Boost</p>
                                    <p className="text-3xl font-black text-white">80%</p>
                                </div>
                            </div>

                            <Link 
                                href="/register"
                                className="relative flex items-center justify-center w-full h-16 bg-noble-surface text-near-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-electric-cyan hover:scale-[1.02] transition-all shadow-2xl group/btn"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Claim Your Time Back
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Card Shadow / Glow */}
                    <div className="absolute -inset-4 bg-noble-blue/20 blur-3xl rounded-[48px] -z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                </div>
            </div>

            {/* Bottom Proof Tag */}
            <div className="mt-16 pt-8 border-t border-near-black/[0.03] flex flex-wrap items-center justify-center gap-12 opacity-30">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-noble-blue" />
                    Verified ROI Metrics
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-noble-blue" />
                    Enterprise-Grade Algorithms
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-noble-blue" />
                    Zero Hidden Costs
                </div>
            </div>
        </div>
    );
}
