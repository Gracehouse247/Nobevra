'use client';

import React from 'react';
import { MoreHorizontal, ArrowRight, FileText } from 'lucide-react';
import { currencyService } from '@/lib/services/currencyService';
import Link from 'next/link';

interface RecentAssetsProps {
    invoices: any[];
    currencyCode: string;
}

const CLIENT_COLORS = [
    'from-[#01A0E2] to-[#006970]',
    'from-purple-500 to-purple-700',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
];

function ClientAvatar({ name }: { name: string }) {
    const initial = name.charAt(0).toUpperCase();
    const colorClass = CLIENT_COLORS[initial.charCodeAt(0) % CLIENT_COLORS.length];
    return (
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <span className="text-[12px] font-black text-white">{initial}</span>
        </div>
    );
}

const STATUS_CONFIG: Record<string, { dot: string; label: string; text: string; bg: string }> = {
    paid:    { dot: 'bg-emerald-400', label: 'Paid',    text: 'text-emerald-600', bg: 'bg-emerald-50' },
    sent:    { dot: 'bg-[#01A0E2]',  label: 'Sent',    text: 'text-[#01A0E2]',  bg: 'bg-blue-50'    },
    unpaid:  { dot: 'bg-orange-400', label: 'Unpaid',  text: 'text-orange-600', bg: 'bg-orange-50'  },
    pending: { dot: 'bg-amber-400',  label: 'Pending', text: 'text-amber-600',  bg: 'bg-amber-50'   },
    overdue: { dot: 'bg-red-500',    label: 'Overdue', text: 'text-red-600',    bg: 'bg-red-50'     },
    draft:   { dot: 'bg-slate-300',  label: 'Draft',   text: 'text-slate-500',  bg: 'bg-slate-50'   },
};

export default function RecentAssets({ invoices = [], currencyCode = 'NGN' }: RecentAssetsProps) {
    const recentInvoices = invoices.slice(0, 5).map(inv => ({
        id: inv.id,
        invoiceNumber: inv.invoice_number,
        client: inv.clients?.name || 'Unknown Client',
        amount: currencyService.format(inv.total_amount, inv.currency_code || currencyCode, { decimals: 0 }),
        status: inv.status || 'draft',
    }));

    return (
        <div className="bg-noble-card border border-noble-card-border rounded-[28px] p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-[15px] font-bold text-noble-text tracking-[-0.01em]">Recent Activity</h3>
                    <p className="text-[11px] text-noble-muted font-medium mt-0.5">Latest invoice transactions</p>
                </div>
                <button className="w-8 h-8 rounded-xl border border-noble-border flex items-center justify-center text-noble-muted hover:bg-noble-interactive-bg hover:text-noble-text transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-noble-border mb-3" />

            {/* Invoice rows */}
            <div className="flex-1 space-y-0.5 overflow-y-auto [&::-webkit-scrollbar]:w-[3px]">
                {recentInvoices.length > 0 ? recentInvoices.map((asset) => {
                    const statusCfg = STATUS_CONFIG[asset.status] || STATUS_CONFIG.draft;
                    return (
                        <Link
                            href="/invoices"
                            key={asset.id}
                            className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl hover:bg-noble-interactive-bg transition-all duration-150 group cursor-pointer"
                        >
                            {/* Avatar */}
                            <ClientAvatar name={asset.client} />

                            {/* Invoice info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[9.5px] font-medium text-noble-card-text/80 leading-tight truncate max-w-[110px]">{asset.invoiceNumber}</p>
                                <p className="text-[9px] text-noble-muted font-normal truncate max-w-[110px] mt-0.5">{asset.client}</p>
                            </div>

                            {/* Amount + Status */}
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                <p className="text-[11px] font-semibold text-noble-amount-text tabular-nums">{asset.amount}</p>
                                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${statusCfg.bg}`}>
                                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${statusCfg.dot}`} />
                                    <span className={`text-[8px] font-bold uppercase tracking-wide ${statusCfg.text}`}>{statusCfg.label}</span>
                                </div>
                            </div>

                            <ArrowRight className="w-3 h-3 text-noble-border group-hover:text-noble-muted transition-all group-hover:translate-x-0.5 flex-shrink-0" />
                        </Link>
                    );
                }) : (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-noble-icon-bg flex items-center justify-center mb-3">
                        <FileText className="w-6 h-6 text-noble-muted/50" />
                        </div>
                        <p className="text-sm font-bold text-noble-muted mb-1">No invoices yet</p>
                        <p className="text-xs text-noble-muted">Create your first invoice to get started.</p>
                    </div>
                )}
            </div>

            {/* CTA */}
            <Link
                href="/invoices"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#006970] to-[#01A0E2] text-[10px] font-black text-white uppercase tracking-widest hover:shadow-lg hover:shadow-[#01A0E2]/20 hover:-translate-y-0.5 transition-all duration-200"
            >
                View All Transactions
                <ArrowRight className="w-3 h-3" />
            </Link>
        </div>
    );
}
