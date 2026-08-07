'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { Lock, Crown, Check, X, ArrowRight } from 'lucide-react';

const FEATURE_BENEFITS: Record<string, string[]> = {
    'Team Intelligence': [
        'Multi-user team workspace',
        'Advanced permission controls',
        'Activity auditing & logs'
    ],
    'Enterprise Scaling': [
        'Dedicated account manager',
        'White-label client portal',
        'Global multi-currency settlements'
    ],
    'Lead Intelligence': [
        'Advanced CRM analytics',
        'Automated follow-ups',
        'Priority email support'
    ],

    'Professional Identity': [
        'White-label identity & digital business card studio',
        'Custom brand styling & high-res export engine',
        'Instant QR & NFC provisioning for physical cards'
    ],
    'Wallet & Payments': [
        'Flutterwave payment integration',
        'Instant settlement options',
        'Custom payment links'
    ],
    'default': [
        'Unlimited access to all premium features',
        'Priority 24/7 support',
        'Early access to new updates'
    ]
};

export default function UpgradePromptModal() {
    const { isOpen, options, closeUpgradeModal } = useUpgradeModal();
    const router = useRouter();

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeUpgradeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeUpgradeModal]);

    const handleUpgradeClick = () => {
        closeUpgradeModal();
        router.push('/upgrade');
    };

    if (!isOpen || !options) return null;

    const { featureName, requiredPlan } = options;
    const isElite = requiredPlan === 'elite';
    const benefits = FEATURE_BENEFITS[featureName] || FEATURE_BENEFITS['default'];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeUpgradeModal}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Top Decorative Gradient */}
                    <div className={`h-2 w-full ${isElite ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-noble-blue to-blue-400'}`} />

                    {/* Close Button */}
                    <button
                        onClick={closeUpgradeModal}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-6 pb-4 flex flex-col items-center text-center">
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                            isElite ? 'bg-amber-100 text-amber-600 shadow-amber-500/20' : 'bg-blue-100 text-noble-blue shadow-noble-blue/20'
                        }`}>
                            {isElite ? <Crown className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                        </div>

                        {/* Title & Badge */}
                        <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-slate-50 text-slate-600 border-slate-200">
                            Requires {isElite ? 'Elite' : 'Pro'} Plan
                        </div>
                        <h2 className="text-xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            Unlock {featureName}
                        </h2>
                        <p className="text-[13px] text-slate-500 mb-5 max-w-[280px]">
                            Upgrade your workspace to access this feature and supercharge your business.
                        </p>

                        {/* Benefits List */}
                        <div className="w-full space-y-2 mb-5 text-left bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        isElite ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-noble-blue'
                                    }`}>
                                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="w-full space-y-2">
                            <button
                                onClick={handleUpgradeClick}
                                className={`w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
                                    isElite 
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/25 hover:shadow-amber-500/40' 
                                    : 'bg-noble-blue shadow-noble-blue/25 hover:shadow-noble-blue/40'
                                }`}
                            >
                                Upgrade to {isElite ? 'Elite' : 'Pro'} <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleUpgradeClick}
                                className="w-full py-2 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                See all plans & pricing
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
