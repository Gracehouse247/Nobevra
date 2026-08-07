'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/navigation';
import {
    Plus, Search, Filter, MoreHorizontal,
    Users, Phone, Mail, Building,
    ArrowUpRight, Sparkles, FileText,
    List, User, Download, Upload,
    ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
    CheckSquare, Square, Trash2, Send, X,
    TrendingUp, Star, UserCheck, UserPlus,
    Eye, Edit3, Archive, Copy, Handshake,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { clientService, teamService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import NobleEmptyState from '@/components/shared/NobleEmptyState';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import PaygUnlockModal, { usePaygBundle } from '@/components/features/billing/PaygUnlockModal';

// ─── Constants ───────────────────────────────────────────────────────────────
const TABS = [
    { key: 'active', label: 'All Clients' },
    { key: 'vip',    label: 'VIP Elite' },
    { key: 'lead',   label: 'Leads' },
    { key: 'churned', label: 'Archived' },
];

const PAGE_SIZES = [10, 25, 50];

type SortField = 'name' | 'company' | 'lead_status' | 'created_at';
type SortDir   = 'asc' | 'desc';

// ─── Avatar initials colour palette (deterministic from name) ────────────────
const AVATAR_COLORS = [
    { bg: 'rgba(5,153,213,0.12)',  text: '#0599D5' },
    { bg: 'rgba(0,105,112,0.12)',  text: '#006970' },
    { bg: 'rgba(99,102,241,0.12)', text: '#6366f1' },
    { bg: 'rgba(245,158,11,0.12)', text: '#d97706' },
    { bg: 'rgba(16,185,129,0.12)', text: '#059669' },
    { bg: 'rgba(239,68,68,0.12)',  text: '#dc2626' },
];
function avatarColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Client score (deterministic, 0-100) ────────────────────────────────────
function getClientScore(client: any) {
    let score = 40;
    if (client.email)   score += 15;
    if (client.phone)   score += 15;
    if (client.company) score += 10;
    if (client.address || client.city || client.country) score += 10;
    if (client.lead_status === 'vip')    score += 10;
    else if (client.lead_status === 'active') score += 7;
    else if (client.lead_status === 'lead')   score += 3;
    return Math.min(100, score);
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string }> = {
        vip:     { label: '⭐ VIP Elite',  cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
        active:  { label: '● Active',      cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
        lead:    { label: '◎ Lead',        cls: 'bg-sky-50 text-sky-700 border border-sky-200' },
        churned: { label: '○ Archived',    cls: 'bg-slate-100 text-slate-500 border border-slate-200' },
    };
    const cfg = map[status] ?? map.active;
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-700 font-bold tracking-wide whitespace-nowrap ${cfg.cls}`}>
            {cfg.label}
        </span>
    );
}

// ─── Shimmer skeleton rows ────────────────────────────────────────────────────
function SkeletonRows({ count = 8 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <tr key={i} className="border-b border-slate-100/70">
                    <td className="px-5 py-3 w-8">
                        <div className="w-4 h-4 rounded shimmer" />
                    </td>
                    <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl shimmer flex-shrink-0" />
                            <div className="space-y-1.5">
                                <div className="h-3 w-28 rounded shimmer" />
                                <div className="h-2 w-20 rounded shimmer" />
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-3">
                        <div className="space-y-1.5">
                            <div className="h-3 w-36 rounded shimmer" />
                            <div className="h-2 w-24 rounded shimmer" />
                        </div>
                    </td>
                    <td className="px-5 py-3">
                        <div className="h-5 w-16 rounded-full shimmer" />
                    </td>
                    <td className="px-5 py-3">
                        <div className="h-1.5 w-32 rounded-full shimmer" />
                    </td>
                    <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                            <div className="w-7 h-7 rounded-lg shimmer" />
                            <div className="w-7 h-7 rounded-lg shimmer" />
                            <div className="w-7 h-7 rounded-lg shimmer" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

// ─── Sortable TH ─────────────────────────────────────────────────────────────
function SortableTH({
    field, label, sortField, sortDir, onSort, className = '',
}: {
    field: SortField; label: string; sortField: SortField; sortDir: SortDir;
    onSort: (f: SortField) => void; className?: string;
}) {
    const active = sortField === field;
    return (
        <th
            className={`px-5 py-3 text-left whitespace-nowrap cursor-pointer select-none group ${className}`}
            onClick={() => onSort(field)}
        >
            <span className={`inline-flex items-center gap-1 text-[11px] font-700 font-bold uppercase tracking-[0.08em] transition-colors ${active ? 'text-noble-blue' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {label}
                <span className="flex flex-col -space-y-1">
                    <ChevronUp   size={9} className={active && sortDir === 'asc'  ? 'text-noble-blue' : 'opacity-30'} />
                    <ChevronDown size={9} className={active && sortDir === 'desc' ? 'text-noble-blue' : 'opacity-30'} />
                </span>
            </span>
        </th>
    );
}

// ─── KPI stat card ────────────────────────────────────────────────────────────
function KpiCard({
    icon: Icon, label, value, sub, accent,
}: {
    icon: React.ElementType; label: string; value: string | number; sub: string; accent: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 min-w-[140px] bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
                <Icon size={18} />
            </div>
            <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 truncate">{label}</div>
                <div className="text-xl font-black text-slate-900 leading-tight tracking-tight">{value}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{sub}</div>
            </div>
        </motion.div>
    );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ClientsPage() {
    const { user, userData } = useAuth();
    const { getLimit } = useEntitlements();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Data state ──
    const [clients,   setClients]   = useState<any[]>([]);
    const [loading,   setLoading]   = useState(true);
    const [teamId,    setTeamId]    = useState<string>('');

    // ── UI state ──
    const [activeTab,    setActiveTab]    = useState('active');
    const [searchQuery,  setSearchQuery]  = useState('');
    const [sortField,    setSortField]    = useState<SortField>('name');
    const [sortDir,      setSortDir]      = useState<SortDir>('asc');
    const [page,         setPage]         = useState(1);
    const [pageSize,     setPageSize]     = useState(10);
    const [selectedIds,  setSelectedIds]  = useState<Set<any>>(new Set());
    const [openMenuId,   setOpenMenuId]   = useState<any>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // ── PAYG ──
    const paygBundle   = usePaygBundle(user?.id);
    // client.create is free/unlimited per the generous freemium model
    const clientLimit = getLimit('client.create'); // null = unlimited
    const maxClients = clientLimit === null ? Infinity : (clientLimit ?? Infinity);
    const [showPaygModal, setShowPaygModal] = useState(false);

    // ─── Fetch ──────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const tData = await teamService.getTeamByUserId(user.id);
                const tid   = tData?.id || user.id;
                setTeamId(tid);
                const data  = await clientService.getClients(tid);
                setClients(data || []);
            } catch (err) {
                console.error('Error fetching clients:', err);
                toast.error('Failed to load clients');
            } finally {
                setLoading(false);
            }
        })();
    }, [user]);

    // ─── Close context menu on outside click ────────────────────────────────
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ─── Keyboard shortcuts ─────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === 'n' || e.key === 'N') {
                e.preventDefault();
                handleNewClient();
            }
            if ((e.key === 'e' || e.key === 'E') && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                handleExportCSV();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clients, maxClients]);

    // ─── Helpers ────────────────────────────────────────────────────────────
    const handleNewClient = () => {
        // client.create is free and unlimited — go straight to the form
        router.push('/clients/new');
    };

    const handleExportCSV = () => {
        const list = selectedIds.size > 0 ? clients.filter(c => selectedIds.has(c.id)) : clients;
        if (list.length === 0) return toast('No clients to export');
        const csv = Papa.unparse(list.map(c => ({
            Name:    c.name,
            Email:   c.email    || '',
            Phone:   c.phone    ? `${c.country_code || ''} ${c.phone}` : '',
            Company: c.company  || '',
            Address: c.address  || '',
            Status:  c.lead_status || 'active',
        })));
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', `noble_clients_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Exported ${list.length} client${list.length > 1 ? 's' : ''}`);
    };

    const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const rows = results.data as any[];
                if (rows.length === 0) return toast.error('CSV is empty');
                if (clients.length + rows.length > maxClients) {
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    // No longer blocked — client.create is free/unlimited
                    // return setShowPaygModal(true);
                }
                const toastId  = toast.loading('Importing clients…');
                const tData    = await teamService.getTeamByUserId(user?.id!);
                const tid      = tData?.id || user?.id;
                const newClients = rows.map(row => ({
                    team_id:     tid,
                    name:        row.Name        || row.name        || 'Unknown Client',
                    email:       row.Email       || row.email       || null,
                    phone:       row.Phone       || row.phone       || null,
                    company:     row.Company     || row.company     || null,
                    address:     row.Address     || row.address     || null,
                    lead_status: row.Status      || row.status      || row.lead_status || 'active',
                }));
                try {
                    await clientService.createClients(newClients);
                    toast.success(`Imported ${newClients.length} clients!`, { id: toastId });
                    const data = await clientService.getClients(tid!);
                    setClients(data || []);
                } catch (err: any) {
                    toast.error('Failed to import clients', { id: toastId });
                }
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortField(field); setSortDir('asc'); }
        setPage(1);
    };

    // ─── Derived data ────────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        let list = clients.filter(c => {
            const q = searchQuery.toLowerCase();
            const matches = !q ||
                c.name?.toLowerCase().includes(q) ||
                c.company?.toLowerCase().includes(q) ||
                c.email?.toLowerCase().includes(q);
            if (!matches) return false;
            if (activeTab === 'active')  return !c.lead_status || c.lead_status === 'active' || c.lead_status === 'vip' || c.lead_status === 'lead';
            if (activeTab === 'vip')     return c.lead_status === 'vip';
            if (activeTab === 'lead')    return c.lead_status === 'lead';
            if (activeTab === 'churned') return c.lead_status === 'churned';
            return true;
        });

        list = [...list].sort((a, b) => {
            let av = a[sortField] ?? '';
            let bv = b[sortField] ?? '';
            if (typeof av === 'string') av = av.toLowerCase();
            if (typeof bv === 'string') bv = bv.toLowerCase();
            if (av < bv) return sortDir === 'asc' ? -1 : 1;
            if (av > bv) return sortDir === 'asc' ?  1 : -1;
            return 0;
        });
        return list;
    }, [clients, searchQuery, activeTab, sortField, sortDir]);

    const totalPages  = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated   = filtered.slice((page - 1) * pageSize, page * pageSize);

    // ─── KPI ─────────────────────────────────────────────────────────────────
    const kpiTotal   = clients.length;
    const kpiActive  = clients.filter(c => !c.lead_status || c.lead_status === 'active').length;
    const kpiVip     = clients.filter(c => c.lead_status === 'vip').length;
    const kpiLeads   = clients.filter(c => c.lead_status === 'lead').length;

    const thisMonth  = new Date();
    const kpiNew     = clients.filter(c => {
        if (!c.created_at) return false;
        const d = new Date(c.created_at);
        return d.getMonth() === thisMonth.getMonth() && d.getFullYear() === thisMonth.getFullYear();
    }).length;

    // ─── Bulk select ─────────────────────────────────────────────────────────
    const allPageSelected = paginated.length > 0 && paginated.every(c => selectedIds.has(c.id));
    const toggleAll = () => {
        if (allPageSelected) {
            setSelectedIds(prev => { const s = new Set(prev); paginated.forEach(c => s.delete(c.id)); return s; });
        } else {
            setSelectedIds(prev => { const s = new Set(prev); paginated.forEach(c => s.add(c.id)); return s; });
        }
    };
    const toggleRow = (id: any) => setSelectedIds(prev => {
        const s = new Set(prev);
        s.has(id) ? s.delete(id) : s.add(id);
        return s;
    });

    // ─── Tab counts ──────────────────────────────────────────────────────────
    const tabCount = (key: string) => {
        if (key === 'active')  return clients.filter(c => !c.lead_status || ['active','vip','lead'].includes(c.lead_status)).length;
        if (key === 'vip')     return kpiVip;
        if (key === 'lead')    return kpiLeads;
        if (key === 'churned') return clients.filter(c => c.lead_status === 'churned').length;
        return 0;
    };

    // ─── Quick invoice per client ─────────────────────────────────────────────
    const handleQuickInvoice = (e: React.MouseEvent, client: any) => {
        e.stopPropagation();
        router.push(`/invoices/new?client_id=${client.id}&client_name=${encodeURIComponent(client.name)}`);
    };

    // ─── Context menu ─────────────────────────────────────────────────────────
    const ContextMenu = ({ client }: { client: any }) => (
        <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -6 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1 z-50 w-44 bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
        >
            {[
                { icon: Eye,     label: 'View Profile',  action: () => { router.push(`/clients/${client.id}`); setOpenMenuId(null); } },
                { icon: Edit3,   label: 'Edit Client',   action: () => { router.push(`/clients/${client.id}?edit=true`); setOpenMenuId(null); } },
                { icon: FileText, label: 'New Invoice',  action: (e: any) => { router.push(`/invoices/new?client_id=${client.id}&client_name=${encodeURIComponent(client.name)}`); setOpenMenuId(null); } },
                { icon: Copy,    label: 'Copy Email',    action: () => { if (client.email) { navigator.clipboard?.writeText(client.email); toast.success('Email copied'); } else toast('No email on file'); setOpenMenuId(null); } },
                { icon: Archive, label: 'Archive',       action: () => { toast('Archive coming soon', { icon: '📦' }); setOpenMenuId(null); } },
            ].map(({ icon: Icon, label, action }) => (
                <button
                    key={label}
                    onClick={action}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-noble-blue transition-colors text-left"
                >
                    <Icon size={13} className="flex-shrink-0 opacity-70" />
                    {label}
                </button>
            ))}
        </motion.div>
    );

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#F3F6FC] text-slate-900 pb-24 selection:bg-noble-blue/20">

            {/* ── Page Header ───────────────────────────────────────────── */}
            <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-40 shadow-[0_1px_0_0_#e2e8f0]">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
                    {/* Left: title */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 min-w-0"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-noble-blue/15 to-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users size={17} className="text-noble-blue" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-[19px] font-bold text-slate-900 tracking-tight leading-tight">
                                Client Ledger
                            </h1>
                            <p className="text-[11px] text-slate-400 font-medium hidden sm:block truncate">
                                Your complete customer relationship register
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 flex-shrink-0"
                    >
                        {/* Keyboard hint badge */}
                        <span className="hidden lg:flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                            <kbd className="font-mono">N</kbd> new &nbsp;·&nbsp; <kbd className="font-mono">E</kbd> export
                        </span>

                        {/* Import */}
                        <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleImportCSV} />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            title="Import CSV"
                            className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-noble-blue/40 hover:text-noble-blue transition-colors"
                        >
                            <Upload size={13} /> <span className="hidden sm:inline">Import</span>
                        </button>

                        {/* Export */}
                        <button
                            onClick={handleExportCSV}
                            title="Export CSV (E)"
                            className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-noble-blue/40 hover:text-noble-blue transition-colors"
                        >
                            <Download size={13} /> <span className="hidden sm:inline">Export</span>
                        </button>

                        {/* Primary CTA */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleNewClient}
                            id="btn-new-client"
                            className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold text-white rounded-xl transition-all shadow-[0_4px_14px_rgba(5,153,213,0.35)] hover:shadow-[0_6px_20px_rgba(5,153,213,0.45)] hover:-translate-y-px"
                            style={{ background: 'linear-gradient(135deg,#0599D5,#006970)' }}
                        >
                            <Plus size={14} />
                            <span>New Client</span>
                        </motion.button>
                    </motion.div>
                </div>
            </header>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-5 space-y-4">

                {!loading && clients.length === 0 ? (
                    <ProactiveEmptyState
                        title="Build your client directory"
                        description="Add your clients to send invoices, track payments, and manage relationships — all in one place."
                        variant="empty"
                        illustrationIcons={[Users, Building, Handshake]}
                        tips={["Tip: Import clients from a CSV file to get started fast", "Tip: Each client gets a unique payment portal"]}
                        actions={[
                            { label: '+ Add Your First Client', onClick: handleNewClient, variant: 'primary' },
                            { label: 'Import from CSV', onClick: () => fileInputRef.current?.click(), variant: 'secondary' }
                        ]}
                    />
                ) : (
                    <>
                {/* ── KPI Stats Bar ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                    <KpiCard
                        icon={Users}
                        label="Total Clients"
                        value={kpiTotal}
                        sub="in your ledger"
                        accent="bg-noble-blue/10 text-noble-blue"
                    />
                    <KpiCard
                        icon={UserCheck}
                        label="Active"
                        value={kpiActive}
                        sub={`${kpiTotal > 0 ? Math.round((kpiActive / kpiTotal) * 100) : 0}% of total`}
                        accent="bg-emerald-50 text-emerald-600"
                    />
                    <KpiCard
                        icon={Star}
                        label="VIP Elite"
                        value={kpiVip}
                        sub="high-value clients"
                        accent="bg-amber-50 text-amber-600"
                    />
                    <KpiCard
                        icon={UserPlus}
                        label="New This Month"
                        value={kpiNew}
                        sub={`${kpiLeads} leads in pipeline`}
                        accent="bg-violet-50 text-violet-600"
                    />
                </motion.div>

                {/* ── Toolbar Row ────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                    {/* Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar flex-shrink-0">
                        {TABS.map(tab => {
                            const cnt = tabCount(tab.key);
                            const active = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => { setActiveTab(tab.key); setPage(1); setSelectedIds(new Set()); }}
                                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap ${
                                        active
                                            ? 'bg-noble-blue/8 text-noble-blue'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                                    style={active ? { backgroundColor: 'rgba(5,153,213,0.08)' } : {}}
                                >
                                    {tab.label}
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${active ? 'bg-noble-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {cnt}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search + Filter */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                id="client-search"
                                placeholder="Search clients…"
                                value={searchQuery}
                                onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                                className="w-full pl-9 pr-4 py-2.5 text-[13px] font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-noble-blue/50 focus:ring-2 focus:ring-noble-blue/10 transition-all"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    <X size={13} />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => toast('Advanced filters coming soon', { icon: '🔧' })}
                            className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-xl hover:border-noble-blue/40 hover:text-noble-blue transition-colors whitespace-nowrap"
                        >
                            <Filter size={13} /> Filter
                        </button>
                    </div>
                </motion.div>

                {/* ── Bulk Action Bar ────────────────────────────────────── */}
                <AnimatePresence>
                    {selectedIds.size > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="bg-noble-blue text-white rounded-xl px-5 py-3 flex items-center justify-between gap-4 shadow-lg shadow-noble-blue/20"
                        >
                            <span className="text-[13px] font-bold">
                                {selectedIds.size} client{selectedIds.size > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleExportCSV}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-white/15 hover:bg-white/25 rounded-lg transition-colors"
                                >
                                    <Download size={12} /> Export
                                </button>
                                <button
                                    onClick={() => toast('Bulk message coming soon', { icon: '📨' })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-white/15 hover:bg-white/25 rounded-lg transition-colors"
                                >
                                    <Send size={12} /> Message
                                </button>
                                <button
                                    onClick={() => toast('Bulk archive coming soon', { icon: '📦' })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-white/15 hover:bg-white/25 rounded-lg transition-colors"
                                >
                                    <Archive size={12} /> Archive
                                </button>
                                <button
                                    onClick={() => setSelectedIds(new Set())}
                                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors ml-1"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Data Table Card ────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            {/* ── thead ── */}
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/60">
                                    {/* Checkbox col */}
                                    <th className="px-5 py-3 w-10">
                                        <button onClick={toggleAll} className="text-slate-400 hover:text-noble-blue transition-colors">
                                            {allPageSelected
                                                ? <CheckSquare size={15} className="text-noble-blue" />
                                                : <Square size={15} />
                                            }
                                        </button>
                                    </th>
                                    <SortableTH field="name"       label="Client"      sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                                    <SortableTH field="company"    label="Contact"     sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                                    <SortableTH field="lead_status" label="Status"     sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                                    <th className="px-5 py-3 text-left whitespace-nowrap">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">Client Score</span>
                                    </th>
                                    <SortableTH field="created_at" label="Joined"     sortField={sortField} sortDir={sortDir} onSort={handleSort} className="hidden lg:table-cell" />
                                    <th className="px-5 py-3 text-right whitespace-nowrap">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            {/* ── tbody ── */}
                            <tbody>
                                {loading ? (
                                    <SkeletonRows count={8} />
                                ) : paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16">
                                            <ProactiveEmptyState
                                                title={searchQuery ? 'No results found' : 'No clients yet'}
                                                description={
                                                    searchQuery
                                                        ? `No clients matched "${searchQuery}". Try a different search.`
                                                        : 'Add your first client to start tracking relationships and sending invoices.'
                                                }
                                                variant="filtered"
                                                actions={[
                                                    {
                                                        label: '+ New Client',
                                                        onClick: handleNewClient,
                                                        variant: 'primary',
                                                    },
                                                    ...(searchQuery ? [{
                                                        label: 'Clear Search',
                                                        onClick: () => setSearchQuery(''),
                                                        variant: 'secondary' as const,
                                                    }] : []),
                                                ]}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    paginated.map((client, i) => {
                                        const score   = getClientScore(client);
                                        const color   = avatarColor(client.name || '?');
                                        const isSelected = selectedIds.has(client.id);
                                        const isMenuOpen = openMenuId === client.id;

                                        const joinedDate = client.created_at
                                            ? new Date(client.created_at).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'2-digit' })
                                            : '—';

                                        return (
                                            <motion.tr
                                                key={client.id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                                                className={`border-b border-slate-100/70 group cursor-pointer transition-colors relative ${
                                                    isSelected
                                                        ? 'bg-noble-blue/[0.03]'
                                                        : 'hover:bg-slate-50/80'
                                                }`}
                                                onClick={() => router.push(`/clients/${client.id}`)}
                                            >
                                                {/* Hover left accent */}
                                                <td
                                                    className="px-5 py-3 w-10 relative"
                                                    onClick={e => { e.stopPropagation(); toggleRow(client.id); }}
                                                >
                                                    {/* Left accent bar on hover/select */}
                                                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm transition-opacity ${isSelected ? 'bg-noble-blue opacity-100' : 'bg-noble-blue opacity-0 group-hover:opacity-60'}`} />
                                                    <button className="text-slate-300 hover:text-noble-blue transition-colors">
                                                        {isSelected
                                                            ? <CheckSquare size={14} className="text-noble-blue" />
                                                            : <Square size={14} className="group-hover:text-slate-400" />
                                                        }
                                                    </button>
                                                </td>

                                                {/* Client (Avatar + Name + Company) */}
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-xl flex items-center justify-center text-[13px] font-bold flex-shrink-0"
                                                            style={{ background: color.bg, color: color.text }}
                                                        >
                                                            {(client.name || '?').charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-[13px] font-semibold text-slate-900 truncate max-w-[160px]">
                                                                {client.name}
                                                            </div>
                                                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                                                                {client.company
                                                                    ? <><Building size={10} className="flex-shrink-0" /><span className="truncate max-w-[120px]">{client.company}</span></>
                                                                    : <><User size={10} className="flex-shrink-0" /><span>Individual</span></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact */}
                                                <td className="px-5 py-3">
                                                    <div className="space-y-0.5">
                                                        {client.email && (
                                                            <div className="flex items-center gap-1.5 text-[12px] text-slate-600 font-medium">
                                                                <Mail size={11} className="text-noble-blue/50 flex-shrink-0" />
                                                                <span className="truncate max-w-[180px]">{client.email}</span>
                                                            </div>
                                                        )}
                                                        {client.phone && (
                                                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                                <Phone size={10} className="flex-shrink-0" />
                                                                {client.country_code} {client.phone}
                                                            </div>
                                                        )}
                                                        {!client.email && !client.phone && (
                                                            <span className="text-[11px] text-slate-300">No contact info</span>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-3">
                                                    <StatusBadge status={client.lead_status || 'active'} />
                                                </td>

                                                {/* Client Score */}
                                                <td className="px-5 py-3">
                                                    <div className="w-32">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-[10px] font-bold text-slate-400">Profile</span>
                                                            <span className={`text-[10px] font-bold ${score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-noble-blue' : 'text-slate-400'}`}>
                                                                {score}%
                                                            </span>
                                                        </div>
                                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${score}%` }}
                                                                transition={{ duration: 0.7, delay: Math.min(i * 0.03, 0.3), ease: 'easeOut' }}
                                                                className={`h-full rounded-full ${
                                                                    score >= 80
                                                                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                                                        : score >= 60
                                                                        ? 'bg-gradient-to-r from-noble-blue to-primary'
                                                                        : 'bg-gradient-to-r from-slate-300 to-slate-400'
                                                                }`}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Joined date */}
                                                <td className="px-5 py-3 hidden lg:table-cell">
                                                    <span className="text-[12px] text-slate-400 font-medium">{joinedDate}</span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1.5 transition-opacity">
                                                        {/* Quick Invoice */}
                                                        <motion.button
                                                            whileTap={{ scale: 0.93 }}
                                                            onClick={e => handleQuickInvoice(e, client)}
                                                            title="Create invoice for this client"
                                                            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold text-noble-blue bg-noble-blue/8 hover:bg-noble-blue hover:text-white rounded-lg transition-all border border-noble-blue/20 hover:border-noble-blue whitespace-nowrap"
                                                            style={{ backgroundColor: 'rgba(5,153,213,0.07)' }}
                                                        >
                                                            <FileText size={11} />
                                                            <span className="hidden sm:inline">Invoice</span>
                                                        </motion.button>

                                                        {/* View */}
                                                        <motion.button
                                                            whileTap={{ scale: 0.93 }}
                                                            onClick={e => { e.stopPropagation(); router.push(`/clients/${client.id}`); }}
                                                            title="View client profile"
                                                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:bg-noble-blue hover:text-white hover:border-noble-blue transition-all"
                                                        >
                                                            <ArrowUpRight size={13} />
                                                        </motion.button>

                                                        {/* More */}
                                                        <div className="relative" ref={isMenuOpen ? menuRef : undefined}>
                                                            <motion.button
                                                                whileTap={{ scale: 0.93 }}
                                                                onClick={e => { e.stopPropagation(); setOpenMenuId(isMenuOpen ? null : client.id); }}
                                                                title="More options"
                                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:bg-slate-100 transition-all"
                                                            >
                                                                <MoreHorizontal size={14} />
                                                            </motion.button>
                                                            <AnimatePresence>
                                                                {isMenuOpen && <ContextMenu client={client} />}
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Pagination Footer ────────────────────────────── */}
                    {!loading && filtered.length > 0 && (
                        <div className="border-t border-slate-100 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/40">
                            {/* Row count info */}
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] text-slate-400 font-medium">
                                    Showing <span className="text-slate-700 font-semibold">{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)}</span> of <span className="text-slate-700 font-semibold">{filtered.length}</span> clients
                                </span>
                                {/* Rows per page */}
                                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                    <span>Show:</span>
                                    {PAGE_SIZES.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => { setPageSize(s); setPage(1); }}
                                            className={`w-7 h-6 rounded text-[11px] font-semibold transition-colors ${pageSize === s ? 'bg-noble-blue text-white' : 'hover:bg-slate-200 text-slate-400'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Page buttons */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-noble-blue/40 hover:text-noble-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={13} />
                                </button>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    const pg = totalPages <= 5
                                        ? i + 1
                                        : page <= 3
                                        ? i + 1
                                        : page >= totalPages - 2
                                        ? totalPages - 4 + i
                                        : page - 2 + i;
                                    return (
                                        <button
                                            key={pg}
                                            onClick={() => setPage(pg)}
                                            className={`w-7 h-7 rounded-lg text-[12px] font-semibold transition-colors ${
                                                pg === page
                                                    ? 'bg-noble-blue text-white shadow-sm'
                                                    : 'text-slate-500 hover:bg-slate-100'
                                            }`}
                                        >
                                            {pg}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-noble-blue/40 hover:text-noble-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={13} />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
                    </>
                )}
            </div>

            {/* ── PAYG Modal ──────────────────────────────────────────────── */}
            {showPaygModal && (
                <PaygUnlockModal
                    isOpen={showPaygModal}
                    onClose={() => setShowPaygModal(false)}
                    templateName="Extra Client Slot"
                    onUnlocked={() => {
                        setShowPaygModal(false);
                        toast.success('Client slot unlocked! You can now add another client.');
                    }}
                />
            )}
        </div>
    );
}
