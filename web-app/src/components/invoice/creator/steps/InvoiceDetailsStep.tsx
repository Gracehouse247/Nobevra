'use client';
import React, { useState } from 'react';
import { Search, Plus, X, ChevronDown, User, FileCheck, MoreHorizontal, CreditCard, FileText } from 'lucide-react';
import { useInvoiceCreator } from '../InvoiceCreatorContext';
import { NewClientForm } from '@/components/clients/NewClientForm';
import { toast } from 'react-hot-toast';
import { ToggleRow } from '@/components/ui/ToggleRow';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

const inputClass = `w-full h-10 px-3 bg-noble-surface border border-noble-border rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]`;
const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider font-[Inter,sans-serif]";
const cardClass = "bg-noble-surface rounded-xl border border-noble-border shadow-sm overflow-hidden mb-3";
const cardHeaderClass = "px-5 py-3 border-b border-slate-100 bg-slate-50/50";

export const InvoiceDetailsStep = () => {
    const {
        setClients,
        clients, selectedClientId, setSelectedClientId,
        invoiceNumber, setInvoiceNumber,
        invoiceDate, setInvoiceDate,
        paymentTerms, setPaymentTerms,
        acceptOnlinePayments, setAcceptOnlinePayments
    } = useInvoiceCreator();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
    
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();

    const searchLower = search.toLowerCase();
    const filtered = clients.filter((c: any) =>
        (c.name || '').toLowerCase().includes(searchLower) ||
        (c.email || '').toLowerCase().includes(searchLower) ||
        (c.company || '').toLowerCase().includes(searchLower)
    );

    const selectedClient = clients.find((c: any) => String(c.id) === selectedClientId);

    return (
        <div className="space-y-3">
            {/* ── Customer Card ── */}
            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#EBF7FD] flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-[#0599D5]" />
                        </div>
                        <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Customer</h3>
                    </div>
                </div>
                <div className="px-5 py-4">
                    <label className={labelClass}>Bill To <span className="text-red-500 normal-case">*</span></label>
                    {selectedClient ? (
                        <div className="flex items-center gap-2.5 p-2.5 bg-[#EBF7FD] border border-[#0599D5]/20 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-[#0599D5] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {selectedClient.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-noble-text truncate font-[Inter,sans-serif]">{selectedClient.name}</p>
                                {selectedClient.email && <p className="text-[11px] text-slate-500 truncate">{selectedClient.email}</p>}
                            </div>
                            <button
                                aria-label="Remove selected client"
                                onClick={() => setSelectedClientId('')}
                                className="p-1.5 rounded-lg hover:bg-noble-surface/60 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        aria-label="Search clients"
                                        aria-expanded={open}
                                        aria-haspopup="listbox"
                                        placeholder="Search existing clients by name or email..."
                                        value={search}
                                        onChange={e => { setSearch(e.target.value); setOpen(true); }}
                                        onFocus={() => setOpen(true)}
                                        onBlur={() => setTimeout(() => setOpen(false), 180)}
                                        className={inputClass + ' pl-9'}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsNewClientModalOpen(true)}
                                    className={`shrink-0 h-10 px-3 rounded-lg bg-[#0599D5] hover:bg-[#0482B5] text-white font-bold text-[12px] flex items-center gap-1.5 transition-all shadow-sm font-[Inter,sans-serif]`}
                                >
                                    <Plus className="w-3.5 h-3.5" /> New
                                </button>
                            </div>

                            {/* Dropdown */}
                            {open && (
                                <div className="absolute top-full left-0 right-0 mt-1.5 bg-noble-surface border border-noble-border rounded-xl shadow-xl z-50 overflow-hidden" role="listbox" aria-label="Client list">
                                    {filtered.length === 0 ? (
                                        <div className="px-4 py-3 text-center">
                                            <p className="text-[12px] text-slate-500 font-[Inter,sans-serif]">
                                                {search ? 'No clients match your search.' : 'No clients yet.'}
                                            </p>
                                            <button
                                                onMouseDown={() => { setOpen(false); setIsNewClientModalOpen(true); }}
                                                className="mt-1.5 text-[12px] font-bold text-[#0599D5] hover:text-[#0482B5] font-[Inter,sans-serif]"
                                            >
                                                + Create new client
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="max-h-52 overflow-y-auto divide-y divide-slate-50">
                                            {filtered.map((client: any) => (
                                                <button
                                                    key={client.id}
                                                    onMouseDown={() => { setSelectedClientId(String(client.id)); setSearch(''); setOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#EBF7FD] text-left transition-colors"
                                                >
                                                    <div className="w-7 h-7 rounded-lg bg-[#0599D5]/10 text-[#0599D5] flex items-center justify-center font-bold text-sm shrink-0">
                                                        {client.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-semibold text-slate-800 truncate font-[Inter,sans-serif]">{client.name}</p>
                                                        {client.email && <p className="text-[11px] text-slate-500 truncate">{client.email}</p>}
                                                        {client.company && <p className="text-[11px] text-slate-400 truncate">{client.company}</p>}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Invoice Details Card ── */}
            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Invoice Details</h3>
                    </div>
                </div>
                <div className="px-5 py-4 grid grid-cols-2 gap-3">
                    <div className="col-span-2 md:col-span-1">
                        <label className={labelClass}>Invoice Number <span className="text-red-500 normal-case">*</span></label>
                        <div className="relative">
                            <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className={inputClass + ' pr-9'} />
                            <button type="button" aria-label="More options" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0599D5] transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className={labelClass}>Invoice Date <span className="text-red-500 normal-case">*</span></label>
                        <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Payment Terms</label>
                        <div className="relative">
                            <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className={inputClass + ' appearance-none pr-8 cursor-pointer'}>
                                <option value="On Receipt">Due on Receipt</option>
                                <option value="Net 15">Net 15</option>
                                <option value="Net 30">Net 30</option>
                                <option value="Net 60">Net 60</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-[Inter,sans-serif]">Currency</label>
                            {!canUse('wallet.multicurrency') && <PremiumBadge tier="pulse" iconOnly />}
                        </div>
                        <div className="relative">
                            <select 
                                className={inputClass + ' appearance-none pr-8 cursor-pointer'}
                                onChange={(e) => {
                                    if (!canUse('wallet.multicurrency') && e.target.value !== 'NGN') {
                                        openUpgradeModal({ featureName: 'Multi-Currency Invoicing', requiredPlan: 'pulse' });
                                        e.target.value = 'NGN'; // Reset
                                        return;
                                    }
                                }}
                            >
                                <option value="NGN">NGN — Naira (₦)</option>
                                <option value="USD">USD — Dollar ($)</option>
                                <option value="GBP">GBP — Pound (£)</option>
                                <option value="EUR">EUR — Euro (€)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className={labelClass}>Billing Address</label>
                        <div 
                            role="button" 
                            tabIndex={0} 
                            aria-label="Add billing address" 
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
                            className="h-10 border border-noble-border rounded-lg bg-slate-50 flex items-center justify-between px-3 hover:border-[#0599D5]/40 transition-colors cursor-pointer"
                        >
                            <span className="text-[13px] text-slate-400 font-[Inter,sans-serif]">
                                {selectedClient?.address || 'Click to add billing address'}
                            </span>
                            <Plus className="w-3.5 h-3.5 text-[#0599D5]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Payment Options Card ── */}
            <div className={cardClass}>
                <div className={cardHeaderClass}>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center">
                            <CreditCard className="w-3.5 h-3.5 text-violet-600" />
                        </div>
                        <h3 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Payment Options</h3>
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                    <ToggleRow
                        label="Accept Online Payments"
                        description="Include a payment link on the invoice"
                        icon={<CreditCard className="w-3.5 h-3.5 text-violet-600" />}
                        iconBg="bg-violet-50"
                        checked={acceptOnlinePayments}
                        onChange={setAcceptOnlinePayments}
                    />
                    <ToggleRow
                        label="Add Private Note"
                        description="Internal memo, hidden from the client"
                        icon={<FileText className="w-3.5 h-3.5 text-slate-500" />}
                        iconBg="bg-slate-100"
                        premium="pulse"
                        onChange={() => {
                            if (!canUse('invoice.advanced')) {
                                openUpgradeModal({ featureName: 'Advanced Invoice Editing', requiredPlan: 'pulse' });
                                return;
                            }
                            toast.success('Private Note enabled (placeholder)');
                        }}
                    />
                </div>
            </div>

            {/* New Client Modal Overlay */}
            {isNewClientModalOpen && (
                <div 
                    role="dialog" 
                    aria-modal="true" 
                    aria-label="Add New Client" 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                >
                    <div className="bg-noble-surface rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200 custom-scrollbar shadow-2xl">
                        <button 
                            type="button"
                            aria-label="Close modal"
                            onClick={() => setIsNewClientModalOpen(false)}
                            className="absolute top-6 right-6 z-[110] w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="pt-2 pb-6">
                            <NewClientForm 
                                isModal={true} 
                                onCancel={() => setIsNewClientModalOpen(false)}
                                onSuccess={(client) => {
                                    setClients((prev: any[]) => [...prev, client]);
                                    setSelectedClientId(String(client.id));
                                    setIsNewClientModalOpen(false);
                                    toast.success('Client selected for invoice');
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
