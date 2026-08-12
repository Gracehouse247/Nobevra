'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    AlertCircle, Sparkles, TrendingUp, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { invoiceService } from '@/lib/services/supabaseService';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

export default function PredictiveActionHub() {
    const router = useRouter();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [loading, setLoading] = useState(true);
    const [overdueCount, setOverdueCount] = useState(0);

    const today = new Date();
    const isEndOfMonth = today.getDate() >= 25;

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const invoices = await invoiceService.getInvoices('my-team');
                const now = new Date();
                
                let overdue = 0;
                invoices.forEach((inv: any) => {
                    if (inv.status === 'paid' || inv.status === 'draft') return;
                    if (!inv.due_date) return;

                    const dueDate = new Date(inv.due_date);
                    const diffTime = now.getTime() - dueDate.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays > 0) {
                        overdue++;
                    }
                });

                setOverdueCount(overdue);
            } catch (error) {
                console.error("Failed to fetch invoices for predictive hub:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const actions = [];

    if (overdueCount > 0) {
        actions.push({
            id: 'overdue',
            icon: AlertCircle,
            title: 'Send Overdue Reminders',
            subtitle: `${overdueCount} clients have outstanding payments.`,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
            glowColor: 'bg-amber-500/10',
            href: '/invoices?filter=overdue',
            premium: 'pulse' as const,
            onClick: () => {
                if (!canUse('invoice.reminders')) {
                    openUpgradeModal({ featureName: 'Payment Reminders', requiredPlan: 'pulse' });
                    return false;
                }
                return true;
            }
        });
    }

    if (isEndOfMonth) {
        actions.push({
            id: 'retainer',
            icon: Sparkles,
            title: 'Generate Monthly Retainers',
            subtitle: "It's month-end. Automated invoices are ready.",
            color: 'text-noble-blue',
            bgColor: 'bg-fuchsia-500/10',
            borderColor: 'border-fuchsia-500/20',
            glowColor: 'bg-fuchsia-500/10',
            href: '/invoices/new?type=recurring',
            premium: 'pulse' as const,
            onClick: () => {
                if (!canUse('invoices.recurring')) {
                    openUpgradeModal({ featureName: 'Recurring Invoices', requiredPlan: 'pulse' });
                    return false;
                }
                return true;
            }
        });
    }

    if (actions.length === 0) {
        actions.push({
            id: 'forecast',
            icon: TrendingUp,
            title: 'Revenue Forecast',
            subtitle: 'See your projected income for next month.',
            color: 'text-electric-cyan',
            bgColor: 'bg-electric-cyan/10',
            borderColor: 'border-electric-cyan/20',
            glowColor: 'bg-electric-cyan/10',
            href: '/reports/forecast'
        });
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4 relative z-10 h-full min-h-[300px] justify-center items-center">
                <div className="w-8 h-8 border-4 border-noble-border border-t-noble-blue rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 relative z-10"
        >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2 px-2">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Predictive Hub</span>
            </motion.div>
            
            <div className="space-y-4">
                {actions.map((action, i) => (
                    <motion.div
                        key={action.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="relative group"
                    >
                        <div className={`absolute inset-0 rounded-[24px] ${action.glowColor} blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                        <button
                            onClick={() => {
                                if ('onClick' in action && action.onClick && !action.onClick()) return;
                                router.push(action.href);
                            }}
                            className={`w-full flex items-center gap-5 p-5 rounded-[24px] border ${action.borderColor} bg-noble-surface/60 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.02)] group-hover:bg-noble-surface group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] transition-all duration-300 text-left`}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${action.bgColor} flex items-center justify-center shrink-0 border border-white/50 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                <action.icon className={`w-6 h-6 ${action.color}`} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-[14px] font-black text-noble-text tracking-tighter" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{action.title}</h3>
                                    {'premium' in action && action.premium && <PremiumBadge tier={action.premium} iconOnly />}
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{action.subtitle}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-noble-blue group-hover:text-white transition-colors duration-300">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
