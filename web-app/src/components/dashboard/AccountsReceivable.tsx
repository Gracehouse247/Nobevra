'use client';

import React from 'react';
import { currencyService } from '@/lib/services/currencyService';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

interface AccountsReceivableProps {
    invoices: any[];
    currencyCode: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-noble-surface border border-noble-border rounded-xl shadow-lg p-3">
                <p className="text-[10px] font-black text-noble-muted uppercase tracking-widest mb-1">{label}</p>
                <p className="text-sm font-black text-noble-text">{payload[0]?.payload?.formatted}</p>
            </div>
        );
    }
    return null;
};

export default function AccountsReceivable({ invoices = [], currencyCode = 'NGN' }: AccountsReceivableProps) {
    const router = useRouter();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const now = new Date();

    let current = 0;
    let days1_30 = 0;
    let days31_60 = 0;
    let days60plus = 0;
    let totalOverdue = 0;

    invoices.forEach(inv => {
        if (inv.status === 'paid' || inv.status === 'draft') return;
        const amount = Number(inv.total_amount) || 0;
        const dueDate = inv.due_date ? new Date(inv.due_date) : new Date(inv.created_at);
        if (dueDate >= now) {
            current += amount;
        } else {
            totalOverdue += amount;
            const diffDays = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays <= 30) days1_30 += amount;
            else if (diffDays <= 60) days31_60 += amount;
            else days60plus += amount;
        }
    });

    const total = current + totalOverdue;
    const format = (amt: number) => currencyService.format(amt, currencyCode, { decimals: 0 });

    const barData = [
        { name: 'Current', value: current, formatted: format(current), color: '#10B981' },
        { name: '1-30 Days', value: days1_30, formatted: format(days1_30), color: '#FBBF24' },
        { name: '31-60 Days', value: days31_60, formatted: format(days31_60), color: '#F97316' },
        { name: '60+ Days', value: days60plus, formatted: format(days60plus), color: '#EF4444' },
    ];

    const getPercent = (amt: number) => total > 0 ? (amt / total) * 100 : 0;

    return (
        <div className="bg-noble-card border border-noble-card-border rounded-[26px] p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-none h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5 text-noble-muted" />
                        </div>
                        <h3 className="text-[15px] font-bold text-noble-text tracking-[-0.01em]">Accounts Receivable</h3>
                    </div>
                    <p className="text-[11px] text-noble-muted font-medium uppercase tracking-wider">Aging &amp; Overdue Analysis</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-noble-muted uppercase tracking-widest mb-1">Total AR</p>
                    <p className="text-lg font-bold text-noble-text tracking-tight leading-none">{format(total)}</p>
                    {totalOverdue > 0 && (
                        <p className="text-[10px] font-bold text-red-500 mt-0.5">{format(totalOverdue)} overdue</p>
                    )}
                </div>
            </div>

            {/* Aging Grid */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                {barData.map(item => (
                    <div key={item.name} className="rounded-xl p-3" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
                        <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.name}</p>
                        <p className="text-[13px] font-black text-noble-text leading-tight truncate">{item.formatted}</p>
                    </div>
                ))}
            </div>

            {/* Stacked Progress Bar */}
            <div className="mb-5">
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                    {total > 0 ? (
                        barData.map(item => (
                            getPercent(item.value) > 0 ? (
                                <div
                                    key={item.name}
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${getPercent(item.value)}%`, background: item.color }}
                                    title={`${item.name}: ${item.formatted}`}
                                />
                            ) : null
                        ))
                    ) : (
                        <div className="h-full bg-slate-200 w-full rounded-full" />
                    )}
                </div>
                <div className="flex items-center gap-3 mt-2">
                    {barData.map(item => (
                        <div key={item.name} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                            <span className="text-[9px] font-semibold text-noble-muted">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bar chart */}
            {total > 0 && (
                <div className="flex-1 min-h-[80px] -mx-2">
                    <ResponsiveContainer width="100%" height={80}>
                        <BarChart data={barData} barSize={24} margin={{ top: 0, right: 8, left: -24, bottom: 0 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15,23,42,0.03)', radius: 8 }} />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {barData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} opacity={0.85} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Send Reminder CTA */}
            {totalOverdue > 0 && (
                <button
                    onClick={() => {
                        if (!canUse('invoice.reminders')) {
                            openUpgradeModal({ featureName: 'Payment Reminders', requiredPlan: 'pulse' });
                            return;
                        }
                        router.push('/invoices?filter=overdue');
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 border border-red-100 text-[11px] font-black text-red-600 uppercase tracking-widest hover:bg-red-100 transition-colors"
                >
                    <Send className="w-3.5 h-3.5" />
                    Send Payment Reminders
                    {!canUse('invoice.reminders') && <PremiumBadge tier="pulse" iconOnly />}
                </button>
            )}
        </div>
    );
}
