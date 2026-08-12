'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { invoiceService } from '@/lib/services/supabaseService';
import { currencyService } from '@/lib/services/currencyService';

interface AgingReportWidgetProps {
    baseCurrency?: string;
}

export default function AgingReportWidget({ baseCurrency = 'USD' }: AgingReportWidgetProps) {
    const [loading, setLoading] = useState(true);
    const [aging, setAging] = useState({
        current: 0,
        days1to30: 0,
        days31to60: 0,
        days61to90: 0,
        daysOver90: 0,
        totalOverdue: 0
    });

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                // Use a default team_id for now or fetch from context
                const invoices = await invoiceService.getInvoices('my-team');
                const now = new Date();
                
                let current = 0;
                let days1to30 = 0;
                let days31to60 = 0;
                let days61to90 = 0;
                let daysOver90 = 0;
                let totalOverdue = 0;

                invoices.forEach((inv: any) => {
                    if (inv.status === 'paid' || inv.status === 'draft') return;
                    
                    const amount = parseFloat(inv.total) || 0;
                    if (!inv.due_date) {
                        current += amount;
                        return;
                    }

                    const dueDate = new Date(inv.due_date);
                    const diffTime = now.getTime() - dueDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 0) {
                        current += amount;
                    } else {
                        totalOverdue += amount;
                        if (diffDays <= 30) days1to30 += amount;
                        else if (diffDays <= 60) days31to60 += amount;
                        else if (diffDays <= 90) days61to90 += amount;
                        else daysOver90 += amount;
                    }
                });

                setAging({ current, days1to30, days31to60, days61to90, daysOver90, totalOverdue });
            } catch (error) {
                console.error("Failed to fetch invoices for aging report:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const total = aging.current + aging.totalOverdue;

    const formatCurrency = (amount: number) => {
        return currencyService.format(amount, baseCurrency);
    };

    const calcPercent = (value: number) => {
        if (total === 0) return 0;
        return (value / total) * 100;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (loading) {
        return (
            <div className="bg-noble-surface/40 backdrop-blur-2xl rounded-[40px] p-10 border border-white/60 shadow-[0_40px_80px_rgba(0,0,0,0.03)] flex flex-col justify-center items-center h-full relative overflow-hidden">
                <div className="w-8 h-8 border-4 border-noble-border border-t-noble-blue rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-noble-surface/40 backdrop-blur-2xl rounded-[40px] p-10 border border-white/60 shadow-[0_40px_80px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full relative overflow-hidden group"
        >
            <div className="absolute top-[-30%] left-[-10%] w-[250px] h-[250px] bg-noble-blue/5 blur-[80px] rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            
            <div className="relative z-10">
                <motion.div variants={itemVariants} className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="text-2xl font-black text-noble-text tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Accounts Receivable</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">Aging & Overdue Analysis</p>
                    </div>
                    <div className="bg-rose-50/80 backdrop-blur-sm text-rose-600 px-4 py-2 rounded-xl border border-rose-100/50 flex items-center gap-2 shadow-sm">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Overdue</span>
                        <span className="font-black text-sm tracking-tighter">{formatCurrency(aging.totalOverdue)}</span>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start justify-between gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-1 cursor-pointer">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Current</p>
                        <p className="text-2xl font-black text-emerald-500 tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{formatCurrency(aging.current)}</p>
                    </motion.div>
                    <div className="w-px h-12 bg-slate-200/50" />
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-1 cursor-pointer">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">1-30 Days</p>
                        <p className="text-2xl font-black text-amber-500 tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{formatCurrency(aging.days1to30)}</p>
                    </motion.div>
                    <div className="w-px h-12 bg-slate-200/50" />
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-1 cursor-pointer">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">31-60 Days</p>
                        <p className="text-2xl font-black text-orange-500 tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{formatCurrency(aging.days31to60)}</p>
                    </motion.div>
                    <div className="w-px h-12 bg-slate-200/50" />
                    <motion.div whileHover={{ scale: 1.05 }} className="flex-1 cursor-pointer">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">60+ Days</p>
                        <p className="text-2xl font-black text-rose-500 tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{formatCurrency(aging.days61to90 + aging.daysOver90)}</p>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-10 relative z-10">
                <div className="flex h-3 rounded-full overflow-hidden bg-slate-100/50 backdrop-blur-sm border border-white/50 shadow-inner">
                    {aging.current > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${calcPercent(aging.current)}%` }} transition={{ duration: 1.5 }} className="bg-gradient-to-r from-emerald-400 to-emerald-500" />}
                    {aging.days1to30 > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${calcPercent(aging.days1to30)}%` }} transition={{ duration: 1.5, delay: 0.2 }} className="bg-gradient-to-r from-amber-400 to-amber-500" />}
                    {aging.days31to60 > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${calcPercent(aging.days31to60)}%` }} transition={{ duration: 1.5, delay: 0.4 }} className="bg-gradient-to-r from-orange-400 to-orange-500" />}
                    {(aging.days61to90 + aging.daysOver90) > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${calcPercent(aging.days61to90 + aging.daysOver90)}%` }} transition={{ duration: 1.5, delay: 0.6 }} className="bg-gradient-to-r from-rose-400 to-rose-500" />}
                </div>
            </motion.div>
        </motion.div>
    );
}
