'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Filter, Clock,
    FileText, CheckCircle2,
    Download, Send, Sparkles,
    Mail, MoreVertical, Square, CheckSquare,
    ArrowUpRight, ChevronLeft, ChevronRight, X, Eye, Pencil
} from 'lucide-react';
import NobleEmptyState from '@/components/shared/NobleEmptyState';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { currencyService } from '@/lib/services/currencyService';
import { toast } from 'react-hot-toast';
import { InvoiceTypeModal } from '@/components/invoice/InvoiceTypeModal';
import { useInvoices } from '@/hooks/useInvoices';
import { supabase } from '@/lib/supabase';
import { teamService } from '@/lib/services/supabaseService';
import { MiniBarChart, SkeletonRow, ClientAvatar, StatusBadge, ActionBtn } from '@/components/invoice/InvoiceShared';
import { Button } from '@/components/ui/button';


const TABS = ['All', 'Outstanding', 'Paid', 'Drafts', 'Overdue'] as const;
type Tab = typeof TABS[number];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InvoicesPage() {
    const { user } = useAuth();
    const { getLimit } = useEntitlements();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [monthlyCount, setMonthlyCount] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const PAGE_SIZE = 50;

    // Close menu on outside click
    useEffect(() => {
        const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    // Monthly count for limit gate
    useEffect(() => {
        if (!user) return;
        (async () => {
            const tData = await teamService.getTeamByUserId(user.id);
            const teamId = tData?.id || user.id;
            const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0);
            const { count } = await supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('team_id', teamId).gte('created_at', start.toISOString());
            setMonthlyCount(count || 0);
        })();
    }, [user]);

    useEffect(() => { setPage(1); setSelectedIds(new Set()); }, [searchQuery, activeTab]);

    const { invoices, loading, hasMore, baseCurrency, exchangeRates, handleMarkAsPaid } = useInvoices(page, PAGE_SIZE);

    const fmt = (amount: number, code: string) => {
        const raw = Number(amount) || 0;
        const currency = code || 'NGN';
        if (currency === baseCurrency || !exchangeRates) return currencyService.format(raw, currency, { decimals: 2 });
        return currencyService.format(currencyService.convert(raw, currency, baseCurrency, exchangeRates), baseCurrency, { decimals: 2 });
    };

    // ── KPI data ──
    const kpis = useMemo(() => {
        let outstanding = 0, paid = 0, overdue = 0, drafts = 0, total = 0;
        const sparkPaid = new Array(10).fill(0);
        const sparkOut  = new Array(10).fill(0);
        const sparkAll  = new Array(10).fill(0);
        const now = new Date();
        invoices.forEach(inv => {
            const amount = exchangeRates
                ? currencyService.convert(Number(inv.total_amount) || 0, inv.currency_code || 'NGN', baseCurrency, exchangeRates)
                : Number(inv.total_amount) || 0;
            const s = inv.status?.toLowerCase();
            const md = inv.created_at
                ? (now.getFullYear() - new Date(inv.created_at).getFullYear()) * 12 + (now.getMonth() - new Date(inv.created_at).getMonth())
                : 0;
            const idx = md >= 0 && md < 10 ? 9 - md : -1;
            total++;
            if (idx >= 0) sparkAll[idx] += 1;
            if (s === 'paid') {
                paid += amount;
                if (idx >= 0) sparkPaid[idx] += amount;
            } else if (s === 'overdue') {
                overdue += amount; outstanding += amount;
                if (idx >= 0) sparkOut[idx] += amount;
            } else if (['pending', 'sent', 'unpaid'].includes(s)) {
                outstanding += amount;
                if (idx >= 0) sparkOut[idx] += amount;
            } else if (s === 'draft') drafts++;
        });
        return { outstanding, paid, overdue, drafts, total, sparkPaid, sparkOut, sparkAll };
    }, [invoices, baseCurrency, exchangeRates]);

    const tabCounts = useMemo(() => ({
        All: invoices.length,
        Outstanding: invoices.filter(i => ['pending', 'sent', 'unpaid'].includes(i.status)).length,
        Paid: invoices.filter(i => i.status === 'paid').length,
        Drafts: invoices.filter(i => i.status === 'draft').length,
        Overdue: invoices.filter(i => i.status === 'overdue').length,
    }), [invoices]);

    // Check if exchange rates are still loading but we need them for conversion
    const isExchangeLoading = !exchangeRates && invoices.some(i => (i.currency_code || 'NGN') !== baseCurrency);
    const isEffectivelyLoading = loading || isExchangeLoading;

    const filtered = useMemo(() => invoices.filter(inv => {
        const q = searchQuery.toLowerCase();
        if (!(inv.invoice_number?.toLowerCase().includes(q) || inv.clients?.name?.toLowerCase().includes(q))) return false;
        if (activeTab === 'Outstanding') return ['pending', 'sent', 'unpaid'].includes(inv.status);
        if (activeTab === 'Paid') return inv.status === 'paid';
        if (activeTab === 'Drafts') return inv.status === 'draft';
        if (activeTab === 'Overdue') return inv.status === 'overdue';
        return true;
    }), [invoices, searchQuery, activeTab]);

    const allSelected = filtered.length > 0 && filtered.every(i => selectedIds.has(i.id));
    const someSelected = selectedIds.size > 0 && !allSelected;
    const toggleAll = () => { if (allSelected) setSelectedIds(new Set()); else setSelectedIds(new Set(filtered.map(i => i.id))); };
    const toggleOne = (id: string) => { const n = new Set(selectedIds); n.has(id) ? n.delete(id) : n.add(id); setSelectedIds(n); };

    const invoiceLimit = getLimit('invoice.create'); // null = unlimited
    const canCreate = invoiceLimit === null || (monthlyCount ?? 0) < (invoiceLimit ?? Infinity);

    // KPI Cards definition — real sparklines from invoice data
    const KPI_CARDS = [
        { label: 'All Invoices',   value: kpis.total.toLocaleString(),          sub: `${tabCounts.Outstanding} from last month`,  color: '#3B82F6', badgeClass: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400', spark: kpis.sparkAll },
        { label: 'New Invoices',   value: tabCounts.Outstanding.toLocaleString(), sub: `${kpis.drafts} from last month`,            color: '#8B5CF6', badgeClass: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400', spark: kpis.sparkOut  },
        { label: 'Draft Invoices', value: kpis.drafts.toLocaleString(),          sub: `${kpis.drafts} from last month`,            color: '#F59E0B', badgeClass: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400', spark: [...kpis.sparkAll.map(v => v * 0.3)] },
        { label: 'Paid Invoices',  value: tabCounts.Paid.toLocaleString(),       sub: fmt(kpis.paid, baseCurrency),                color: '#10B981', badgeClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400', spark: kpis.sparkPaid },
    ];

    return (
        <div className="w-full h-full pb-24 dark:bg-transparent" style={{ fontFamily: 'Inter, sans-serif' }}>

            {/* ── Sticky Header ─────────────────────────────────────────────── */}
            <header className="bg-noble-card border-b border-noble-card-border pb-4 mb-6 flex items-center justify-between gap-4 pt-2">
                <div>
                    <h1 className="text-[19px] font-bold text-noble-text tracking-tight">Invoice</h1>
                    <p className="text-[11px] text-noble-muted mt-0.5 hidden md:block">Manage, track and send your billing documents</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <AnimatePresence>
                        {selectedIds.size > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-2 bg-noble-interactive-bg border border-noble-card-border rounded-xl px-3 py-1.5"
                            >
                                <span className="text-xs font-semibold text-noble-card-text">{selectedIds.size} selected</span>
                                <Button size="sm" onClick={() => { const c = selectedIds.size; selectedIds.forEach(id => handleMarkAsPaid(id)); setSelectedIds(new Set()); toast.success(`${c} invoice${c > 1 ? 's' : ''} marked as paid`); }} className="bg-emerald-600 text-white hover:bg-emerald-700">Mark Paid</Button>
                                <button onClick={() => setSelectedIds(new Set())} className="p-1 text-noble-muted hover:text-noble-text"><X className="w-3 h-3" /></button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Button onClick={() => setShowTypeModal(true)} variant="primary" className="rounded-xl">
                        <Plus className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
                        Add New Invoice
                    </Button>
                </div>
            </header>

            {/* ── Body ──────────────────────────────────────────────────────── */}
            <div className="space-y-5">
                {invoices.length === 0 && !isEffectivelyLoading ? (
                    <ProactiveEmptyState
                        title="Create your first invoice"
                        description="Send professional invoices in under 60 seconds. Choose from 200+ templates."
                        variant="empty"
                        illustrationIcons={[FileText, Clock, CheckCircle2]}
                        tips={["Tip: You can duplicate invoices to save time", "Tip: Set up recurring invoices for repeat clients"]}
                        actions={[
                            { label: '+ Create Invoice', onClick: () => setShowTypeModal(true), variant: 'primary' },
                            { label: 'Browse Templates', onClick: () => window.location.href = '/invoices/new', variant: 'secondary' }
                        ]}
                    />
                ) : (
                    <>
                        {/* ── KPI Cards ─────────────────────────────────────────────── */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {KPI_CARDS.map((card, i) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                            className="bg-noble-card rounded-2xl border border-noble-card-border p-5 flex items-start justify-between gap-4 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-200 cursor-default overflow-hidden"
                            style={{ boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}
                        >
                            <div className="min-w-0 flex-1">
                                {/* Label badge */}
                                <div className="flex items-center gap-1.5 mb-3">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${card.badgeClass}`}>
                                        {card.label}
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 text-noble-muted/40" />
                                </div>
                                {/* Big number */}
                                <p className="text-[28px] font-black text-noble-text leading-none tracking-tight mb-1.5">
                                    {isEffectivelyLoading ? <span className="inline-block w-16 h-7 bg-noble-icon-bg rounded animate-pulse" /> : card.value}
                                </p>
                                {/* Sub */}
                                <p className="text-[11px] font-medium truncate text-noble-muted">{card.sub}</p>
                            </div>
                            {/* Bar Chart */}
                            <div className="flex-shrink-0 self-end pb-0.5">
                                <MiniBarChart values={card.spark} color={card.color} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Ledger Table ──────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="bg-noble-card rounded-2xl border border-noble-card-border overflow-hidden"
                    style={{ boxShadow: '0 1px 4px rgba(15,23,42,0.06)' }}
                >
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 pt-4 pb-3 border-b border-noble-card-border">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-noble-muted pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="pl-8 pr-3 py-2 w-44 bg-noble-interactive-bg border border-noble-card-border rounded-lg text-xs text-noble-card-text placeholder:text-noble-muted focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary/20 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Tab pills */}
                            <div className="flex items-center gap-0.5 bg-noble-interactive-bg rounded-xl p-1 overflow-x-auto hide-scrollbar">
                                {TABS.map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-noble-card text-noble-text shadow-sm' : 'text-noble-muted hover:text-noble-text'}`}
                                    >
                                        {tab}
                                        {tabCounts[tab] > 0 && (
                                            <span className={`text-[9px] font-black px-1.5 py-px rounded-full leading-none ${activeTab === tab ? 'text-white' : 'bg-slate-200 text-slate-500 dark:text-slate-400 dark:text-slate-500'}`} style={activeTab === tab ? { backgroundColor: '#0599D5' } : {}}>
                                                {tabCounts[tab]}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => toast('Advanced filters coming soon', { icon: '🔧' })} className="flex items-center gap-1.5 px-3 py-2 border border-noble-card-border text-noble-muted text-[11px] font-semibold rounded-xl hover:bg-noble-interactive-bg transition-colors">
                                <Filter className="w-3.5 h-3.5" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto" ref={menuRef}>
                        <table className="w-full min-w-[920px]">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-noble-border bg-noble-table-header-bg">
                                    <th className="px-4 py-3 w-9">
                                        <button onClick={toggleAll} className="text-noble-muted hover:text-noble-primary transition-colors">
                                            {allSelected ? <CheckSquare className="w-3.5 h-3.5 text-[#0599D5]" /> : someSelected ? <CheckSquare className="w-3.5 h-3.5 text-noble-muted" /> : <Square className="w-3.5 h-3.5" />}
                                        </button>
                                    </th>
                                    {['Invoice Number', 'Customer Name', 'Date', 'Total Amount', 'Total Discount', 'Status', 'Net Total', 'Action'].map(h => (
                                        <th key={h} className={`px-4 py-3 text-[10px] font-bold text-noble-muted uppercase tracking-widest whitespace-nowrap ${h === 'Total Amount' || h === 'Total Discount' || h === 'Net Total' ? 'text-right' : h === 'Action' ? 'text-right pr-5' : 'text-left'}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isEffectivelyLoading ? (
                                    Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-20">
                                            <ProactiveEmptyState
                                                title="No invoices found"
                                                description={searchQuery ? `No results for "${searchQuery}".` : "Create your first invoice to get started."}
                                                variant="filtered"
                                                actions={[{ label: '+ Create Invoice', onClick: () => setShowTypeModal(true), variant: 'primary' }]}
                                            />
                                        </td>
                                    </tr>
                                ) : filtered.map((invoice, i) => {
                                    const isSelected = selectedIds.has(invoice.id);
                                    const isOpen = openMenuId === invoice.id;
                                    const isOverdue = invoice.status === 'overdue';
                                    const dueSoon = invoice.due_date && !['paid', 'draft'].includes(invoice.status?.toLowerCase()) && (new Date(invoice.due_date).getTime() - Date.now()) < 3 * 24 * 60 * 60 * 1000;
                                    const discount = Number(invoice.discount_amount) || 0;
                                    const netTotal = (Number(invoice.total_amount) || 0) - discount;

                                    return (
                                        <motion.tr
                                            key={invoice.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: Math.min(i * 0.012, 0.18) }}
                                            onClick={() => router.push(`/invoices/${invoice.id}`)}
                                            className={`group cursor-pointer border-b border-noble-card-border transition-colors ${isSelected ? 'bg-noble-primary/5' : 'hover:bg-noble-interactive-bg'}`}
                                        >
                                            {/* Checkbox */}
                                            <td className="px-4 py-3.5" onClick={e => { e.stopPropagation(); toggleOne(invoice.id); }}>
                                                <button className="text-slate-300 hover:text-[#0599D5] transition-colors">
                                                    {isSelected ? <CheckSquare className="w-3.5 h-3.5 text-[#0599D5]" /> : <Square className="w-3.5 h-3.5" />}
                                                </button>
                                            </td>

                                            {/* Invoice Number */}
                                            <td className="px-4 py-3.5">
                                                <span className="text-[12px] font-semibold text-noble-card-text font-mono">{invoice.invoice_number}</span>
                                            </td>

                                            {/* Client */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-2.5">
                                                    <ClientAvatar name={invoice.clients?.name || 'Unknown'} />
                                                    <div className="min-w-0">
                                                        <p className="text-[12px] font-semibold text-noble-text truncate max-w-[150px]">{invoice.clients?.name || 'Unnamed Client'}</p>
                                                        {invoice.clients?.email && <p className="text-[10px] text-noble-muted truncate max-w-[150px]">{invoice.clients.email}</p>}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-4 py-3.5">
                                                <span className="text-[11px] text-noble-muted whitespace-nowrap">
                                                    {invoice.issue_date
                                                        ? new Date(invoice.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                        : invoice.created_at
                                                            ? new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                            : '—'
                                                    }
                                                </span>
                                            </td>

                                            {/* Total Amount */}
                                            <td className="px-4 py-3.5 text-right">
                                                <span className="text-[12px] font-bold text-noble-text tabular-nums">{fmt(invoice.total_amount || 0, invoice.currency_code)}</span>
                                                {invoice.currency_code && invoice.currency_code !== baseCurrency && exchangeRates && (
                                                    <p className="text-[10px] text-noble-muted tabular-nums">{currencyService.format(Number(invoice.total_amount) || 0, invoice.currency_code, { decimals: 2 })}</p>
                                                )}
                                            </td>

                                            {/* Total Discount */}
                                            <td className="px-4 py-3.5 text-right">
                                                <span className="text-[11px] text-noble-muted tabular-nums">
                                                    {discount > 0 ? `${Number(invoice.discount_value || 0).toFixed(1)}%` : '—'}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3.5">
                                                <StatusBadge status={invoice.status} />
                                            </td>

                                            {/* Net Total */}
                                            <td className="px-4 py-3.5 text-right">
                                                <span className="text-[12px] font-bold text-noble-text tabular-nums">{fmt(netTotal, invoice.currency_code)}</span>
                                            </td>

                                            {/* Actions — ALWAYS VISIBLE */}
                                            <td className="px-4 py-3.5 text-right pr-5 relative" onClick={e => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {/* View — Blue */}
                                                    <ActionBtn
                                                        color="#3B82F6" hoverColor="#2563EB"
                                                        title="View Invoice"
                                                        onClick={e => { e.stopPropagation(); router.push(`/invoices/${invoice.id}`); }}
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                    </ActionBtn>

                                                    {/* Download / Edit — Green */}
                                                    <ActionBtn
                                                        color="#10B981" hoverColor="#059669"
                                                        title="Download PDF"
                                                        href={invoice.pdf_url || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-invoice-proxy?id=${invoice.id}&token=${invoice.tracking_token}`}
                                                        target="_blank"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        <Download className="w-3 h-3" />
                                                    </ActionBtn>

                                                    {/* More — Orange */}
                                                    <div className="relative">
                                                        <ActionBtn
                                                            color="#F97316" hoverColor="#EA580C"
                                                            title="More actions"
                                                            onClick={e => { e.stopPropagation(); setOpenMenuId(isOpen ? null : invoice.id); }}
                                                        >
                                                            <MoreVertical className="w-3 h-3" />
                                                        </ActionBtn>

                                                        <AnimatePresence>
                                                            {isOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                                                    transition={{ duration: 0.12 }}
                                                                    className="absolute right-0 top-9 w-52 bg-noble-dropdown-bg border border-noble-card-border rounded-xl shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[999] overflow-hidden py-1"
                                                                >
                                                                    {invoice.status !== 'paid' && (
                                                                        <button onClick={() => { handleMarkAsPaid(invoice.id); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors">
                                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />Mark as Paid
                                                                        </button>
                                                                    )}
                                                                    <button onClick={() => { router.push(`/invoices/${invoice.id}`); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-noble-dropdown-text hover:bg-noble-interactive-bg transition-colors">
                                                                        <FileText className="w-3.5 h-3.5 text-noble-muted" />View Invoice
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        const email = invoice.clients?.email || '';
                                                                        const amt = currencyService.format(Number(invoice.total_amount) || 0, invoice.currency_code || 'NGN', { decimals: 2 });
                                                                        const url = `${window.location.origin}/portal/${invoice.tracking_token}`;
                                                                        window.open(`mailto:${email}?subject=${encodeURIComponent(`Invoice #${invoice.invoice_number}`)}&body=${encodeURIComponent(`Hello ${invoice.clients?.name || ''},\n\nHere is invoice #${invoice.invoice_number} for ${amt}.\n\nPay here: ${url}\n\nThank you!`)}`, '_blank');
                                                                        setOpenMenuId(null);
                                                                    }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-noble-dropdown-text hover:bg-noble-interactive-bg transition-colors">
                                                                        <Mail className="w-3.5 h-3.5 text-noble-muted" />Send via Email
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        const phone = invoice.clients?.phone ? String(invoice.clients.phone).replace(/\D/g, '') : '';
                                                                        const amt = currencyService.format(Number(invoice.total_amount) || 0, invoice.currency_code || 'NGN', { decimals: 2 });
                                                                        const url = `${window.location.origin}/portal/${invoice.tracking_token}`;
                                                                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Hello ${invoice.clients?.name || ''}, here is invoice #${invoice.invoice_number} for ${amt}. Pay here: ${url}`)}`, '_blank');
                                                                        setOpenMenuId(null);
                                                                    }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-noble-dropdown-text hover:bg-noble-interactive-bg transition-colors">
                                                                        <Send className="w-3.5 h-3.5 text-noble-muted" />Send via WhatsApp
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* ── Pagination ──────────────────────────────────────── */}
                        <div className="px-5 py-3 border-t border-slate-100 dark:border-noble-border flex items-center justify-between bg-noble-table-header-bg">
                            <span className="text-[11px] font-medium text-noble-muted">
                                {filtered.length > 0
                                    ? `Showing 1–${filtered.length} of ${filtered.length} invoice${filtered.length !== 1 ? 's' : ''}${selectedIds.size > 0 ? ` · ${selectedIds.size} selected` : ''}`
                                    : 'No results'
                                }
                            </span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || isEffectivelyLoading}
                                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-noble-muted bg-noble-card border border-noble-card-border rounded-lg hover:bg-noble-interactive-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                    <ChevronLeft className="w-3 h-3" />Prev
                                </button>
                                {[page - 1, page, page + 1].filter(p => p > 0).map(p => (
                                    <button key={p} onClick={() => setPage(p)}
                                        className={`w-7 h-7 text-[11px] font-bold rounded-lg transition-colors ${p === page ? 'bg-noble-primary text-white' : 'bg-noble-card text-noble-muted border border-noble-card-border'}`}>
                                        {p}
                                    </button>
                                ))}
                                <button onClick={() => setPage(p => p + 1)} disabled={!hasMore || isEffectivelyLoading}
                                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-noble-muted bg-noble-card border border-noble-card-border rounded-lg hover:bg-noble-interactive-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                    Next<ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                    </>
                )}
            </div>
            {/* Invoice Type Selection Modal */}
            <InvoiceTypeModal isOpen={showTypeModal} onClose={() => setShowTypeModal(false)} />
        </div>
    );
}
