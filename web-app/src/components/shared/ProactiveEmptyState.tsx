'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { EmptyStateIllustration } from './EmptyStateIllustration';

interface Action {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface ProactiveEmptyStateProps {
    title: string;
    description: string;
    actions?: Action[];
    variant?: 'onboarding' | 'empty' | 'celebration' | 'filtered';
    illustrationIcons?: LucideIcon[];
    tips?: string[];
    features?: Feature[];
    stepIndicator?: { current: number; total: number; labels?: string[] };
}

export default function ProactiveEmptyState({
    title,
    description,
    actions = [],
    variant = 'empty',
    illustrationIcons = [],
    tips = [],
    features = [],
    stepIndicator,
}: ProactiveEmptyStateProps) {
    const [currentTip, setCurrentTip] = useState(0);

    useEffect(() => {
        if (tips.length > 1) {
            const interval = setInterval(() => {
                setCurrentTip((prev) => (prev + 1) % tips.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [tips]);

    const isCelebration = variant === 'celebration';
    const isFiltered = variant === 'filtered';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-4xl mx-auto p-8 md:p-12 text-center rounded-[32px] ${
                isFiltered 
                    ? 'bg-transparent' 
                    : 'bg-noble-surface dark:bg-noble-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-noble-border'
            }`}
        >
            {/* Step Indicator */}
            {stepIndicator && (
                <div className="flex items-center justify-center gap-2 mb-10">
                    {Array.from({ length: stepIndicator.total }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`h-2 rounded-full transition-all duration-500 ${
                                i < stepIndicator.current ? 'w-8 bg-[#0599D5]' : 
                                i === stepIndicator.current ? 'w-12 bg-slate-200' : 'w-2 bg-slate-100 dark:bg-[#112030]'
                            }`} />
                        </div>
                    ))}
                </div>
            )}

            {/* Illustration */}
            {!isFiltered && illustrationIcons.length > 0 && (
                <div className="mb-10">
                    <EmptyStateIllustration 
                        icons={illustrationIcons} 
                        primaryColor={isCelebration ? 'text-emerald-500' : 'text-[#0599D5]'}
                        secondaryColor={isCelebration ? 'text-emerald-400' : 'text-[#006970]'}
                    />
                </div>
            )}

            {/* Typography */}
            <div className="max-w-xl mx-auto space-y-4 mb-10">
                <motion.h2 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${isCelebration ? 'text-emerald-600' : 'text-noble-text'}`}
                >
                    {title}
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-base text-noble-empty-text leading-relaxed"
                >
                    {description}
                </motion.p>
            </div>

            {/* Features (Onboarding) */}
            {features.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left"
                >
                    {features.map((feature, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-noble-empty-bg border border-slate-100 dark:border-noble-border hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-noble-surface dark:bg-noble-card shadow-sm flex items-center justify-center mb-4">
                                <feature.icon className="w-5 h-5 text-[#0599D5]" />
                            </div>
                            <h4 className="font-semibold text-noble-card-text mb-1">{feature.title}</h4>
                            <p className="text-sm text-noble-empty-text">{feature.description}</p>
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Actions */}
            {actions.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                >
                    {actions.map((action, i) => (
                        <button
                            key={i}
                            onClick={action.onClick}
                            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-sm ${
                                action.variant === 'secondary'
                                    ? 'bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]'
                                    : 'text-white shadow-[#0599D5]/20 hover:shadow-lg'
                            }`}
                            style={action.variant !== 'secondary' ? { background: 'linear-gradient(135deg, #006970, #0599D5)' } : {}}
                        >
                            {action.label}
                        </button>
                    ))}
                </motion.div>
            )}

            {/* Tips Carousel */}
            {tips.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="max-w-md mx-auto h-12 relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTip}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center text-sm font-medium text-noble-empty-text"
                        >
                            <span className="flex items-center gap-2 bg-noble-empty-bg px-4 py-2 rounded-full border border-slate-100 dark:border-noble-border">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                {tips[currentTip]}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    );
}
