'use client';

import React from 'react';
import { TrendingUp, AlertTriangle, Star, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Invoice } from '@/types';
import { currencyService } from '@/lib/services/currencyService';

export default function PredictiveHub({ invoices = [], currencyCode = 'USD' }: { invoices?: Invoice[], currencyCode?: string }) {
    const now = new Date();

    // 1. Revenue Forecast — invoices due next month
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const projectedRevenue = invoices.filter(inv => {
        if (inv.status === 'paid') return false;
        if (!inv.due_date) return false;
        const d = new Date(inv.due_date);
        return d.getMonth() === nextMonth.getMonth() && d.getFullYear() === nextMonth.getFullYear();
    }).reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

    // 2. Overdue Alert
    const overdueInvoices = invoices.filter(inv => {
        if (inv.status === 'paid' || inv.status === 'draft') return false;
        if (!inv.due_date) return false;
        return new Date(inv.due_date) < now;
    });
    const overdueTotal = overdueInvoices.reduce((s, inv) => s + (inv.total_amount || 0), 0);

    // 3. Top Client by revenue
    const clientMap: Record<string, number> = {};
    invoices.forEach(inv => {
        if (inv.status === 'paid') {
            const name = (inv as any).clients?.name || 'Unknown';
            clientMap[name] = (clientMap[name] || 0) + (inv.total_amount || 0);
        }
    });
    const topClient = Object.entries(clientMap).sort((a, b) => b[1] - a[1])[0];

    const nextMonthName = nextMonth.toLocaleString('default', { month: 'long' });

    const cards = [
        {
            id: 'forecast',
            icon: TrendingUp,
            iconBg: 'bg-[#0599D5]/10',
            iconColor: 'text-[#0599D5]',
            label: 'Revenue Forecast',
            value: projectedRevenue > 0 ? currencyService.format(projectedRevenue, currencyCode, { decimals: 0 }) : null,
            subtext: projectedRevenue > 0 ? `Projected income for ${nextMonthName}` : 'No invoices due next month yet',
            accent: 'border-l-[#0599D5]',
            emptyMsg: 'Send invoices due next month to unlock your forecast.',
        },
        {
            id: 'overdue',
            icon: AlertTriangle,
            iconBg: overdueInvoices.length > 0 ? 'bg-red-50' : 'bg-slate-50',
            iconColor: overdueInvoices.length > 0 ? 'text-red-500' : 'text-slate-400',
            label: 'Overdue Alert',
            value: overdueInvoices.length > 0 ? currencyService.format(overdueTotal, currencyCode, { decimals: 0 }) : null,
            subtext: overdueInvoices.length > 0
                ? `${overdueInvoices.length} invoice${overdueInvoices.length > 1 ? 's' : ''} past due date`
                : 'No overdue invoices — great work!',
            accent: overdueInvoices.length > 0 ? 'border-l-red-400' : 'border-l-emerald-400',
            emptyMsg: null,
        },
        {
            id: 'top-client',
            icon: Star,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-500',
            label: 'Top Client',
            value: topClient ? topClient[0] : null,
            subtext: topClient ? `${currencyService.format(topClient[1], currencyCode, { decimals: 0 })} in paid invoices` : 'No paid invoices yet',
            accent: 'border-l-amber-400',
            emptyMsg: null,
        },
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0599D5]/20 to-[#006970]/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#0599D5]" />
                </div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Intelligence Hub</h3>
                <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0599D5]/10 border border-[#0599D5]/20">
                    <Zap className="w-2.5 h-2.5 text-[#0599D5]" />
                    <span className="text-[8px] font-black text-[#0599D5] uppercase tracking-widest">AI</span>
                </div>
            </div>

            {/* Cards */}
            {cards.map(card => {
                const CardIcon = card.icon;
                return (
                    <div
                        key={card.id}
                        className={`bg-white/85 backdrop-blur-xl border border-white/80 rounded-[20px] p-4 shadow-[0_4px_16px_rgba(15,23,42,0.05)] flex items-center gap-4 border-l-2 ${card.accent} hover:shadow-[0_8px_30px_rgba(15,23,42,0.09)] hover:-translate-y-0.5 transition-all duration-200 flex-1 group cursor-default`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                            <CardIcon className={`w-4.5 h-4.5 ${card.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{card.label}</p>
                            {card.value ? (
                                <>
                                    <p className="text-[16px] font-black text-slate-900 leading-tight truncate">{card.value}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">{card.subtext}</p>
                                </>
                            ) : (
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{card.subtext || card.emptyMsg}</p>
                            )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                    </div>
                );
            })}
        </div>
    );
}
