'use client';

import React from 'react';
import { useEntitlements } from '@/context/EntitlementsContext';
import { Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUpgradeModal } from '@/context/UpgradeModalContext';

interface PremiumGateProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    featureName?: string;
    featureId?: string; // New: the entitlement feature ID e.g. 'ai.voice'
    tier?: 'pulse' | 'elite'; // Kept for display text only
}

export default function PremiumGate({ 
    children, 
    fallback, 
    featureName = 'Advanced AI',
    featureId,
    tier = 'pulse'
}: PremiumGateProps) {
    const { canUse, isLoading } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    
    // Use the new entitlement-based check if featureId is provided.
    // Fall back gracefully to showing the feature (fail-open) if entitlements are still loading.
    const hasAccess = isLoading ? true : (featureId ? canUse(featureId) : true);

    if (hasAccess) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    return (
        <div className="relative group overflow-hidden rounded-2xl border border-dashed border-[#006970]/30 bg-[#006970]/5 p-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50" />
            <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#006970]/20 text-[#006970]">
                    <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground  font-manrope">
                    NobleInvoice {tier === 'elite' ? 'Elite' : 'Pro'} Feature
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                    Unlock {featureName} and deep cognitive insights with a {tier === 'elite' ? 'Elite' : 'Pro'} subscription.
                </p>
                <button 
                    onClick={() => openUpgradeModal({ featureName, requiredPlan: tier })}
                    className="px-4 py-1.5 bg-[#006970] text-white text-[10px] font-extrabold rounded-lg shadow-lg shadow-indigo-600/20 hover:bg-[#006970] transition-all uppercase tracking-widest"
                >
                    Unlock Feature
                </button>
            </div>
            
            {/* Blurry content preview in background */}
            <div className="absolute inset-0 blur-md opacity-20 pointer-events-none -z-10 animate-pulse">
                {children}
            </div>
        </div>
    );
}



