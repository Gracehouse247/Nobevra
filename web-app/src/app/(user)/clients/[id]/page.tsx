'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
    ChevronLeft, Mail, Phone, MapPin, 
    Briefcase, Edit3, Trash2, Check, X,
    FileText, MessageSquare, PhoneCall,
    Calendar, FolderOpen, Heart, TrendingUp, Download, Plus, Zap, Save,
    MoreVertical, FileCheck, CircleDollarSign, Building2, Globe, Hash,
    ArrowRight, Clock, ShieldCheck, ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { clientService, invoiceService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';

const inputCls = `w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900
  focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-[#166FBB]/10 transition-all bg-white`;
const labelCls = `block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5`;
const cardCls = `bg-white rounded-2xl border border-slate-200 shadow-sm`;

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { user, loading: authLoading } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id } = React.use(params);
    const startEditing = searchParams?.get('edit') === 'true';

    const [client, setClient] = useState<any>(null);
    const [notes, setNotes] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editForm, setEditForm] = useState<any>({});

    // Context Menu State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Activity / Docs state
    const [isAddingNote, setIsAddingNote] = useState(false);

    // Financial Metrics
    const [metrics, setMetrics] = useState({
        totalInvoiced: 0,
        totalPaid: 0,
        outstanding: 0,
        invoiceCount: 0,
        avgInvoice: 0,
        lastPaymentDate: null as string | null
    });

    useEffect(() => {
        if (authLoading) return;
        if (!user || !id) {
            setLoading(false);
            return;
        }
        
        Promise.all([
            clientService.getClient(id),
            invoiceService.getInvoicesByClient(id).catch(() => []),
            clientService.getClientNotes(id).catch(() => []),
            clientService.getClientDocuments(id).catch(() => []),
            clientService.getCommunicationLogs(id).catch(() => [])
        ]).then(([clientData, invoiceData, notesData, docsData, logsData]) => {
            setClient(clientData);
            setInvoices(invoiceData || []);
            setNotes(notesData || []);
            setDocuments(docsData || []);
            setLogs(logsData || []);
            
            // Calculate Metrics
            const invs = invoiceData || [];
            let totalInvoiced = 0;
            let outstanding = 0;
            let totalPaid = 0;
            
            invs.forEach((inv: any) => {
                const total = Number(inv.total_amount) || 0;
                totalInvoiced += total;
                if (inv.status === 'Paid') {
                    totalPaid += total;
                } else if (inv.status === 'Partial') {
                    // Mock partial logic if missing
                    outstanding += (total / 2);
                    totalPaid += (total / 2);
                } else if (inv.status !== 'Draft' && inv.status !== 'Cancelled') {
                    outstanding += total;
                }
            });

            setMetrics({
                totalInvoiced,
                totalPaid,
                outstanding,
                invoiceCount: invs.length,
                avgInvoice: invs.length > 0 ? (totalInvoiced / invs.length) : 0,
                lastPaymentDate: invs.find((i: any) => i.status === 'Paid')?.updated_at || null
            });

            setLoading(false);

            if (startEditing && clientData) {
                openEditModal(clientData);
            }
        }).catch(err => {
            console.error('Error fetching client details:', err);
            toast.error('Failed to load client details');
            setLoading(false);
        });
    }, [user, id, authLoading, startEditing]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openEditModal = (clientData: any) => {
        setEditForm({
            name: clientData.name || '',
            email: clientData.email || '',
            phone: clientData.phone || '',
            company: clientData.company || '',
            position: clientData.position || '',
            address: clientData.address || '',
            country: clientData.country || '',
            website: clientData.website || '',
            lead_status: clientData.lead_status || 'active',
            notes: clientData.notes || '',
        });
        setIsEditModalOpen(true);
    };

    const handleEditSave = async () => {
        if (!editForm.name?.trim()) {
            toast.error('Client name is required');
            return;
        }
        setIsSaving(true);
        try {
            await clientService.updateClient(id, editForm);
            setClient({ ...client, ...editForm });
            setIsEditModalOpen(false);
            toast.success('Client updated successfully!');
            router.replace(`/clients/${id}`);
        } catch (err: any) {
            console.error(err);
            toast.error('Failed to save changes.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${client.name}"? This cannot be undone.`)) return;
        try {
            await clientService.deleteClient(id);
            toast.success('Client deleted');
            router.push('/clients');
        } catch {
            toast.error('Failed to delete client');
        }
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-10 h-10 border-4 border-[#166FBB] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!client) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-black text-slate-900">Client not found</h1>
                <button onClick={() => router.push('/clients')} className="mt-4 text-[#166FBB] font-bold">Return to CRM</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-[Inter,sans-serif]">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-[1400px] mx-auto px-6 py-6">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
                        <button onClick={() => router.push('/clients')} className="hover:text-[#166FBB] transition-colors">Clients</button>
                        <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
                        <span className="text-slate-800">{client.name}</span>
                    </div>

                    {/* Identity Block */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#166FBB] to-[#125A96] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-[#166FBB]/20 shrink-0">
                                {client.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{client.name}</h1>
                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                                    {client.position && (
                                        <div className="flex items-center gap-1.5">
                                            <Briefcase className="w-4 h-4" /> {client.position}
                                        </div>
                                    )}
                                    {client.company && (
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-4 h-4" /> {client.company}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" /> Client since {new Date(client.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center gap-1.5 border-l border-slate-300 pl-4">
                                        <span className="text-slate-400">ID:</span> <span className="font-bold text-slate-700">CLT-{String(client.id).substring(0,6).toUpperCase()}</span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                        client.lead_status === 'vip' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                        client.lead_status === 'lead' ? 'bg-[#e0f5f5] text-[#005a60] border border-[#b2e2e2]' :
                                        client.lead_status === 'churned' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                                        'bg-blue-50 text-blue-600 border border-blue-100'
                                    }`}>
                                        <Zap className="w-3 h-3" /> {client.lead_status || 'Active'}
                                    </span>
                                    {client.tags?.map((tag: string, i: number) => (
                                        <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => openEditModal(client)}
                                className="h-10 px-5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold text-[13px] flex items-center gap-2 shadow-sm"
                            >
                                <Edit3 className="w-4 h-4 text-slate-400" /> Edit Client
                            </button>
                            
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="h-10 w-10 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                                        <button 
                                            onClick={() => { setIsMenuOpen(false); handleDelete(); }}
                                            className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete Client
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-8">
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 mb-2 capitalize">Total Invoiced</div>
                            <div className="text-[17px] font-black text-slate-900">{formatMoney(metrics.totalInvoiced)}</div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 mb-2 capitalize">Total Paid</div>
                            <div className="text-[17px] font-black text-emerald-600">{formatMoney(metrics.totalPaid)}</div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 mb-2 capitalize">Outstanding</div>
                            <div className="text-[17px] font-black text-rose-600">{formatMoney(metrics.outstanding)}</div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 mb-2 capitalize">Invoices</div>
                            <div className="text-[17px] font-black text-slate-900">{metrics.invoiceCount}</div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 mb-2 capitalize">Avg. Invoice</div>
                            <div className="text-[17px] font-black text-slate-900">{formatMoney(metrics.avgInvoice)}</div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                            <div className="text-[11px] font-bold text-slate-500 mb-2 capitalize">Last Payment</div>
                            <div className="text-[15px] font-black text-slate-900 mt-1">
                                {metrics.lastPaymentDate ? new Date(metrics.lastPaymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No payments yet'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-[1400px] mx-auto px-6 flex overflow-x-auto hide-scrollbar pt-2">
                    {[
                        { id: 'Overview', label: 'Overview' },
                        { id: 'Invoices', label: `Invoices (${metrics.invoiceCount})` },
                        { id: 'Payments', label: 'Payments (0)' },
                        { id: 'Projects', label: 'Projects (0)' },
                        { id: 'Notes', label: `Notes & Files` },
                        { id: 'Activity', label: 'Activity' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 text-[13px] font-bold whitespace-nowrap border-b-2 transition-all ${
                                activeTab === tab.id 
                                ? 'border-[#166FBB] text-[#166FBB]' 
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area Grid */}
            <div className="max-w-[1400px] mx-auto px-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* LEFT COLUMN (Main Content - 8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Contact & Business Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={`${cardCls} p-5`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#166FBB]" /> Contact Info
                                    </h3>
                                    <button onClick={() => openEditModal(client)} className="text-[#166FBB] text-xs font-bold hover:underline flex items-center gap-1">
                                        <Edit3 className="w-3 h-3" /> Edit
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                                            <p className="text-[13px] font-bold text-slate-800 mt-0.5">{client.email || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                                            <p className="text-[13px] font-bold text-slate-800 mt-0.5">{client.phone || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
                                            <p className="text-[13px] font-bold text-slate-800 mt-0.5">{client.address || '—'} {client.country ? `, ${client.country}` : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${cardCls} p-5`}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-[#166FBB]" /> Business Info
                                    </h3>
                                    <button onClick={() => openEditModal(client)} className="text-[#166FBB] text-xs font-bold hover:underline flex items-center gap-1">
                                        <Edit3 className="w-3 h-3" /> Edit
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Business Name</p>
                                            <p className="text-[13px] font-bold text-slate-800 mt-0.5">{client.company || '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Website</p>
                                            {client.website ? (
                                                <a href={client.website} target="_blank" rel="noreferrer" className="text-[13px] font-bold text-[#166FBB] hover:underline mt-0.5 inline-block">{client.website}</a>
                                            ) : <p className="text-[13px] font-bold text-slate-800 mt-0.5">—</p>}
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Hash className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Currency</p>
                                            <p className="text-[13px] font-bold text-slate-800 mt-0.5">NGN - Nigerian Naira</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Invoices Table */}
                        <div className={cardCls}>
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#166FBB]" /> Recent Invoices
                                </h3>
                                <button onClick={() => setActiveTab('Invoices')} className="text-[12px] font-bold text-[#166FBB] hover:underline flex items-center gap-1">
                                    View all invoices <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                            <th className="px-5 py-3 font-bold">Invoice #</th>
                                            <th className="px-5 py-3 font-bold">Date</th>
                                            <th className="px-5 py-3 font-bold">Due Date</th>
                                            <th className="px-5 py-3 font-bold">Status</th>
                                            <th className="px-5 py-3 font-bold">Amount</th>
                                            <th className="px-5 py-3 font-bold">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {invoices.slice(0, 5).map(inv => (
                                            <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-5 py-3">
                                                    <span className="text-[13px] font-bold text-[#166FBB] hover:underline cursor-pointer">
                                                        {inv.invoice_number}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-[13px] font-medium text-slate-600">
                                                    {new Date(inv.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-5 py-3 text-[13px] font-medium text-slate-600">
                                                    {new Date(inv.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                        inv.status === 'Partial' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        inv.status === 'Sent' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                        'bg-slate-50 text-slate-600 border border-slate-200'
                                                    }`}>
                                                        {inv.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-[13px] font-black text-slate-900">{formatMoney(inv.total_amount)}</td>
                                                <td className="px-5 py-3 text-[13px] font-bold text-slate-600">
                                                    {inv.status === 'Paid' ? '₦0.00' : formatMoney(inv.total_amount)}
                                                </td>
                                            </tr>
                                        ))}
                                        {invoices.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-10 text-center">
                                                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-100">
                                                        <FileText className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                    <p className="text-[13px] font-bold text-slate-500">No invoices generated yet</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN (Sidebar - 4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Actions Card */}
                        <div className={`${cardCls} p-2`}>
                            <h3 className="px-3 pt-3 pb-2 text-[11px] font-black text-slate-400 uppercase tracking-wider">Actions</h3>
                            <div className="flex flex-col gap-1">
                                <button 
                                    onClick={() => router.push(`/invoices/new?client_id=${client.id}&client_name=${encodeURIComponent(client.name)}`)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#166FBB] group-hover:bg-[#166FBB] group-hover:text-white transition-colors">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900">Create Invoice</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        if (!canUse('crm.portal')) {
                                            openUpgradeModal({ featureName: 'Client Portal', requiredPlan: 'pulse' });
                                            return;
                                        }
                                        toast.success('Client Portal link copied to clipboard!');
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                    <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900 flex items-center gap-2">
                                        Send Portal Link
                                        {!canUse('clients.portal') && <PremiumBadge tier="pulse" iconOnly />}
                                    </span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                        <FileCheck className="w-4 h-4" />
                                    </div>
                                    <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900">Create Estimate</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-left transition-colors group">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <CircleDollarSign className="w-4 h-4" />
                                    </div>
                                    <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900">Record Payment</span>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity Mini */}
                        <div className={cardCls}>
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-widest">Recent Activity</h3>
                                <button onClick={() => setActiveTab('Activity')} className="text-[11px] font-bold text-[#166FBB] hover:underline">View all</button>
                            </div>
                            <div className="p-5">
                                {logs.length > 0 ? (
                                    <div className="space-y-4">
                                        {logs.slice(0, 3).map(log => (
                                            <div key={log.id} className="flex gap-3">
                                                <div className="mt-1 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                                                    <ShieldCheck className="w-3 h-3 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[12px] font-bold text-slate-800 leading-tight">{log.description}</p>
                                                    <p className="text-[11px] font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {new Date(log.logged_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[12px] font-medium text-slate-500 text-center py-2">No recent activity.</p>
                                )}
                            </div>
                        </div>

                        {/* Notes Mini */}
                        <div className={cardCls}>
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-widest">Internal Notes</h3>
                                <button onClick={() => setActiveTab('Notes')} className="text-[11px] font-bold text-[#166FBB] hover:underline">View all</button>
                            </div>
                            <div className="p-5">
                                {notes.length > 0 ? (
                                    <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl">
                                        <p className="text-[12px] text-slate-600 line-clamp-3 leading-relaxed">{notes[0].content}</p>
                                        <div className="mt-2 text-[10px] font-bold text-slate-400 flex items-center justify-between">
                                            <span>{new Date(notes[0].created_at).toLocaleDateString()}</span>
                                            <span className={`uppercase tracking-wider ${notes[0].sentiment === 'positive' ? 'text-emerald-600' : notes[0].sentiment === 'negative' ? 'text-red-600' : 'text-slate-500'}`}>{notes[0].sentiment}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[12px] font-medium text-slate-500 text-center py-2">No notes added yet.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* Other Tabs Content placeholders for full functionality */}
                {activeTab !== 'Overview' && (
                    <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <div className="w-16 h-16 bg-[#F8FAFC] border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FolderOpen className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-[15px] font-black text-slate-800 uppercase tracking-widest mb-1">{activeTab}</h3>
                        <p className="text-[13px] font-medium text-slate-500 max-w-sm mx-auto">This section provides detailed views for {activeTab.toLowerCase()}. Use the overview tab for a quick summary.</p>
                        <button onClick={() => setActiveTab('Overview')} className="mt-6 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold rounded-xl transition-colors">
                            Return to Overview
                        </button>
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <h3 className="text-[15px] font-black text-slate-800 uppercase tracking-widest">Edit Client Profile</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" className={inputCls} placeholder="John Doe" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelCls}>Email Address</label>
                                    <input type="email" className={inputCls} placeholder="email@example.com" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelCls}>Phone Number</label>
                                    <input type="tel" className={inputCls} placeholder="+234 800 000 0000" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelCls}>Company Name</label>
                                    <input type="text" className={inputCls} placeholder="Acme Inc." value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelCls}>Position / Role</label>
                                    <input type="text" className={inputCls} placeholder="CEO" value={editForm.position} onChange={e => setEditForm({...editForm, position: e.target.value})} />
                                </div>
                                <div className="col-span-2">
                                    <label className={labelCls}>Street Address</label>
                                    <input type="text" className={inputCls} placeholder="123 Business Ave" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelCls}>Country</label>
                                    <input type="text" className={inputCls} placeholder="Nigeria" value={editForm.country} onChange={e => setEditForm({...editForm, country: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelCls}>Status</label>
                                    <select className={inputCls} value={editForm.lead_status} onChange={e => setEditForm({...editForm, lead_status: e.target.value})}>
                                        <option value="active">Active</option>
                                        <option value="lead">Lead</option>
                                        <option value="vip">VIP</option>
                                        <option value="churned">Churned</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors">
                                Cancel
                            </button>
                            <button 
                                onClick={handleEditSave} disabled={isSaving}
                                className="h-10 px-6 bg-[#166FBB] hover:bg-[#125A96] text-white rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#166FBB]/20 disabled:opacity-60"
                            >
                                {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
