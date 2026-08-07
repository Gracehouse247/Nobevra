'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { Invoice } from '@/types';
import { currencyService } from '@/lib/services/currencyService';

const ranges = [
  { label: '3M', value: '3m', count: 3 },
  { label: '6M', value: '6m', count: 6 },
  { label: '12M', value: '12m', count: 12 },
];

const CustomTooltip = ({ active, payload, label, currencyCode }: any) => {
    if (active && payload && payload.length) {
        const revenue = payload.find((p: any) => p.dataKey === 'revenue')?.value || 0;
        const expenses = payload.find((p: any) => p.dataKey === 'expenses')?.value || 0;
        const net = revenue - expenses;
        const netPositive = net >= 0;
        return (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 min-w-[160px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{label}</p>
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#0599D5]" />
                            <span className="text-[11px] font-semibold text-slate-600">Revenue</span>
                        </div>
                        <span className="text-[11px] font-black text-slate-900">{currencyService.format(revenue, currencyCode, { decimals: 0 })}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                            <span className="text-[11px] font-semibold text-slate-600">Expenses</span>
                        </div>
                        <span className="text-[11px] font-black text-slate-900">{currencyService.format(expenses, currencyCode, { decimals: 0 })}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="text-[11px] font-black text-slate-500">Net</span>
                        <span className={`text-[11px] font-black ${netPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                            {netPositive ? '+' : ''}{currencyService.format(net, currencyCode, { decimals: 0 })}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default function CashFlowChart({ invoices = [], currencyCode = 'USD', expenses: expenseList = [] }: { invoices?: Invoice[], currencyCode?: string, expenses?: any[] }) {
    const [selectedRange, setSelectedRange] = useState(ranges[1]);

    const data = React.useMemo(() => {
        const result = [];
        const now = new Date();
        for (let i = selectedRange.count - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = d.toLocaleString('default', { month: 'short' });

            const revenue = invoices.filter(inv => {
                if (inv.status !== 'paid') return false;
                const invDate = new Date(inv.issue_date || Date.now());
                return invDate.getMonth() === d.getMonth() && invDate.getFullYear() === d.getFullYear();
            }).reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

            const expensesVal = expenseList.length > 0
                ? expenseList
                    .filter((ex: any) => {
                        const exDate = new Date(ex.expense_date || ex.created_at || Date.now());
                        return exDate.getMonth() === d.getMonth() && exDate.getFullYear() === d.getFullYear();
                    })
                    .reduce((sum: number, ex: any) => sum + (Number(ex.amount) || 0), 0)
                : 0;

            result.push({ name: monthName, revenue, expenses: expensesVal });
        }
        return result;
    }, [invoices, expenseList, selectedRange.count]);

    const hasData = data.some(d => d.revenue > 0 || d.expenses > 0);

    // Determine health
    const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
    const totalExpenses = data.reduce((s, d) => s + d.expenses, 0);
    const netTrend = totalRevenue - totalExpenses;
    const healthStatus = netTrend > 0 ? 'healthy' : netTrend === 0 ? 'neutral' : 'critical';
    const healthConfig = {
        healthy: { label: 'Healthy', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        neutral: { label: 'Stable', icon: Minus, color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100' },
        critical: { label: 'Review Cash Flow', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
    }[healthStatus];
    const HealthIcon = healthConfig.icon;

    return (
        <div className="bg-white/85 backdrop-blur-xl border border-white/80 rounded-[28px] p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-[#0599D5]/10 flex items-center justify-center">
                            <Activity className="w-3.5 h-3.5 text-[#0599D5]" />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-900 tracking-[-0.01em]">Cash Flow Analysis</h3>
                        {hasData && (
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${healthConfig.bg} ${healthConfig.border}`}>
                                <HealthIcon className={`w-3 h-3 ${healthConfig.color}`} />
                                <span className={`text-[9px] font-black uppercase tracking-wide ${healthConfig.color}`}>{healthConfig.label}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-[12px] text-slate-400 font-medium">Revenue &amp; expense velocity by month</p>
                </div>

                {/* Tab pills */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
                    {ranges.map(r => (
                        <button
                            key={r.value}
                            onClick={() => setSelectedRange(r)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-all ${
                                selectedRange.value === r.value
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-700'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#0599D5]" />
                    <span className="text-[11px] font-semibold text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-orange-400" />
                    <span className="text-[11px] font-semibold text-slate-500">Expenses</span>
                </div>
            </div>

            {/* Chart area */}
            <div className="flex-1 w-full min-h-[180px] relative -ml-4">
                {!hasData ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center ml-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                            <Activity className="w-5 h-5 text-slate-300" />
                        </div>
                        <h4 className="text-slate-600 font-bold mb-1 text-sm">No data yet</h4>
                        <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">Mark invoices as paid to see your cash flow chart.</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0599D5" stopOpacity={0.25}/>
                                    <stop offset="95%" stopColor="#0599D5" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FB923C" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                dy={10}
                            />
                            <Tooltip content={<CustomTooltip currencyCode={currencyCode} />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#0599D5"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#revGrad)"
                            />
                            <Area
                                type="monotone"
                                dataKey="expenses"
                                stroke="#FB923C"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#expGrad)"
                                strokeDasharray="5 3"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
