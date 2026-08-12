'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Plus, Briefcase, FileText } from 'lucide-react';
import { useDashboardGreeting } from '@/hooks/useDashboardGreeting';
import { Invoice } from '@/types';

interface DashboardGreetingProps {
    invoices: Invoice[];
    clientsLength: number;
}

export default function DashboardGreeting({ invoices, clientsLength }: DashboardGreetingProps) {
    const { state, content, markTourCompleted, tourCompleted } = useDashboardGreeting({ invoices, clientsLength });
    const [isDismissed, setIsDismissed] = useState(tourCompleted);

    const handleDismiss = () => {
        setIsDismissed(true);
        markTourCompleted();
    };

    if (isDismissed) return null;

    if (state === 'brand_new') {
        return (
            <AnimatePresence>
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900 pointer-events-auto"
                        onClick={handleDismiss}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md pointer-events-auto"
                    >
                        <div className="bg-noble-surface rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

                            <button
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                
                                <h3 className="text-2xl font-black text-noble-greeting-text mb-3 tracking-tight">
                                    {content.title}
                                </h3>
                                
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    {content.sub}
                                </p>

                                <Link href={content.href}>
                                    <button
                                        onClick={handleDismiss}
                                        className="w-full flex items-center justify-center py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md group"
                                    >
                                        {content.cta}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence>
        );
    }

    // Inline Banner for other states
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-noble-surface rounded-2xl p-6 shadow-sm border border-noble-border mb-8 relative overflow-hidden"
            >
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                >
                    <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-noble-greeting-text">{content.title}</h3>
                        <p className="text-sm text-slate-500">{content.sub}</p>
                    </div>
                    {state !== 'active' && (
                        <Link href={content.href}>
                            <button
                                onClick={handleDismiss}
                                className="flex items-center justify-center px-6 py-2.5 bg-[#0599D5] text-white rounded-xl font-semibold hover:bg-[#0599D5]/90 transition-all shadow-md group whitespace-nowrap"
                            >
                                {content.cta}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
