'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { invoiceService } from '@/lib/services/supabaseService';
import { currencyService } from '@/lib/services/currencyService';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Download, Building, CheckCircle2, Clock, AlertCircle, Edit, Send, Copy, Mail, Trash2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';

export default function InvoiceDetailView() {
    const params = useParams();
    const router = useRouter();
    const invoiceId = params?.id as string;
    const { userData } = useAuth();
    const { canUse } = useEntitlements();
    
    const [invoice, setInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sendingEmail, setSendingEmail] = useState(false);

    useEffect(() => {
        if (!invoiceId) return;
        setLoading(true);
        invoiceService.getInvoiceById(invoiceId).then(data => {
            setInvoice(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            toast.error('Failed to load invoice details');
            setLoading(false);
        });
    }, [invoiceId]);

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#0599D5] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <AlertCircle className="w-16 h-16 text-slate-300 mb-4" />
                <h2 className="text-2xl font-bold text-noble-text mb-2">Invoice Not Found</h2>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-6">The invoice you are looking for does not exist or has been deleted.</p>
                <button onClick={() => router.push('/invoices')} className="px-6 py-2.5 bg-[#0599D5] text-white rounded-xl font-semibold hover:bg-[#048bbf] transition-colors">
                    Back to Invoices
                </button>
            </div>
        );
    }

    const client = invoice.clients;

    const formatCurrency = (amount: number) => {
        return currencyService.format(amount, invoice.currency_code || 'NGN', { decimals: 2 });
    };

    const getStatusConfig = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'paid': return { color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle2, label: 'PAID IN FULL' };
            case 'pending':
            case 'unpaid': return { color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock, label: 'PAYMENT PENDING' };
            case 'overdue': return { color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', icon: AlertCircle, label: 'OVERDUE' };
            case 'draft': return { color: 'text-slate-500 dark:text-slate-400 dark:text-slate-500', bg: 'bg-slate-50 dark:bg-[#0D1B2E]', border: 'border-noble-border', icon: Clock, label: 'DRAFT' };
            case 'sent': return { color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', icon: Send, label: 'SENT' };
            default: return { color: 'text-slate-500 dark:text-slate-400 dark:text-slate-500', bg: 'bg-slate-50 dark:bg-[#0D1B2E]', border: 'border-noble-border', icon: Clock, label: (status || '').toUpperCase() };
        }
    };

    const StatusIcon = getStatusConfig(invoice.status).icon;
    const statusConfig = getStatusConfig(invoice.status);

    const portalUrl = `${window.location.origin}/portal/${invoice.tracking_token}`;
    
    const handleMarkAsPaid = async () => {
        try {
            await invoiceService.updateInvoiceStatus(invoice.id, 'paid');
            setInvoice({ ...invoice, status: 'paid' });
            toast.success('Invoice marked as paid');
        } catch (err) {
            toast.error('Failed to mark invoice as paid');
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(portalUrl);
        toast.success('Payment link copied!');
    };

    const handleSendEmail = async () => {
        if (!invoice?.id) return;
        setSendingEmail(true);
        const toastId = toast.loading('Sending email to client...');
        try {
            const { data, error } = await supabase.functions.invoke('send-invoice-email', {
                body: { invoiceId: invoice.id }
            });
            if (error) throw error;
            if (data?.error) throw new Error(data.error);
            
            toast.success('Invoice sent successfully!', { id: toastId });
        } catch (err: any) {
            console.error('Email error:', err);
            toast.error(err.message || 'Failed to send invoice email.', { id: toastId });
        } finally {
            setSendingEmail(false);
        }
    };

    const whatsappHref = (() => {
        const phone = client?.phone ? String(client.phone).replace(/\D/g, '') : '';
        const amt = invoice ? formatCurrency(invoice.total_amount || 0) : '';
        const text = `Hello ${client?.name || ''}, here is your invoice #${invoice?.invoice_number} for ${amt}. View & pay here: ${portalUrl}`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    })();

    const canEdit = canUse('invoice.advanced_editing');

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 font-inter">
            {/* ── Toolbar ──────────────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <button 
                    onClick={() => router.push('/invoices')}
                    className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:text-slate-100 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Invoices
                </button>
                
                <div className="flex items-center gap-2 flex-wrap">
                    {invoice.status !== 'paid' && (
                        <button 
                            onClick={handleMarkAsPaid}
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors border border-emerald-200/50"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Mark as Paid
                        </button>
                    )}
                    
                    <button 
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 px-4 py-2 bg-noble-surface dark:bg-noble-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] rounded-xl text-xs font-bold transition-colors border border-noble-border"
                    >
                        <Copy className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        Copy Link
                    </button>
                    
                    <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

                    {canEdit && invoice.status !== 'paid' && (
                        <button 
                            onClick={() => router.push(`/invoices/new?draftId=${invoice.id}`)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-colors border border-indigo-200/50"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Invoice
                        </button>
                    )}

                    <button 
                        onClick={handleSendEmail}
                        disabled={sendingEmail}
                        className="flex items-center gap-1.5 px-4 py-2 bg-noble-surface dark:bg-noble-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] rounded-xl text-xs font-bold transition-colors border border-noble-border disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sendingEmail ? <Loader2 className="w-4 h-4 text-slate-400 dark:text-slate-500 animate-spin" /> : <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
                        {sendingEmail ? 'Sending...' : 'Email'}
                    </button>
                    
                    <a 
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-noble-surface dark:bg-noble-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] rounded-xl text-xs font-bold transition-colors border border-noble-border"
                    >
                        <Send className="w-4 h-4 text-emerald-500" />
                        WhatsApp
                    </a>

                    <a 
                        href={invoice.pdf_url || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-invoice-proxy?id=${invoice.id}&token=${invoice.tracking_token}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#0599D5] text-white hover:bg-[#048bbf] rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </a>
                </div>
            </div>

            {/* ── Invoice Document ─────────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-noble-surface dark:bg-noble-card rounded-[32px] shadow-sm border border-noble-border/60 overflow-hidden">
                {/* Header Section */}
                <div className="p-8 md:p-12 border-b border-slate-100 dark:border-noble-border relative overflow-hidden bg-slate-50 dark:bg-[#0D1B2E]/30">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0599D5]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                        <div>
                            <div className="w-16 h-16 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500 mb-6 shadow-sm">
                                <Building size={32} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-noble-text tracking-tighter mb-2">Invoice {invoice.invoice_number}</h1>
                            <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Billed to: <span className="font-bold text-slate-800 dark:text-slate-100">{client?.name || 'Unnamed Client'}</span></div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color} font-black text-[11px] uppercase tracking-widest mb-6`}>
                                <StatusIcon size={14} /> {statusConfig.label}
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Issue Date</div>
                                <div className="text-noble-text font-black">{invoice.issue_date || invoice.created_at?.split('T')[0] || '—'}</div>
                                <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold">Due Date</div>
                                <div className="text-noble-text font-black">{invoice.due_date || '—'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Section */}
                <div className="p-8 md:p-12">
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Line Items</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-noble-border text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    <th className="pb-3 pr-4">Description</th>
                                    <th className="pb-3 px-4 text-right">Qty</th>
                                    <th className="pb-3 px-4 text-right">Price</th>
                                    <th className="pb-3 pl-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {invoice.invoice_items?.map((item: any) => (
                                    <tr key={item.id} className="text-slate-700 dark:text-slate-200">
                                        <td className="py-4 pr-4 font-medium text-noble-text">{item.description || item.name}</td>
                                        <td className="py-4 px-4 text-right tabular-nums">{item.quantity}</td>
                                        <td className="py-4 px-4 text-right tabular-nums">{formatCurrency(item.unit_price)}</td>
                                        <td className="py-4 pl-4 text-right tabular-nums font-bold text-noble-text">{formatCurrency(item.total_price)}</td>
                                    </tr>
                                ))}
                                {(!invoice.invoice_items || invoice.invoice_items.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-slate-400 dark:text-slate-500 italic">No line items recorded.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="p-8 md:p-12 bg-slate-50 dark:bg-[#0D1B2E]/50 border-t border-slate-100 dark:border-noble-border flex flex-col md:flex-row gap-12 justify-between">
                    <div className="flex-1 max-w-sm">
                        {invoice.metadata?.bank_name && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Payment Instructions</h3>
                                <div className="bg-noble-surface dark:bg-noble-card p-5 rounded-2xl border border-noble-border/60 shadow-sm">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Bank</span><span className="font-bold text-noble-text">{invoice.metadata.bank_name}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Account Name</span><span className="font-bold text-noble-text">{invoice.metadata.account_name}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Account No.</span><span className="font-black text-[#0599D5] tracking-wider">{invoice.metadata.account_number}</span></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {invoice.notes && (
                            <div className="mt-6">
                                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Notes</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500 whitespace-pre-wrap">{invoice.notes}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 md:max-w-md w-full">
                        <div className="space-y-4 bg-noble-surface dark:bg-noble-card p-6 rounded-2xl border border-noble-border/60 shadow-sm">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-noble-border">
                                <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-sm">Subtotal</span>
                                <span className="text-noble-text font-bold tabular-nums">{formatCurrency(invoice.subtotal || 0)}</span>
                            </div>
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-noble-border">
                                <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-sm">Tax ({invoice.tax_rate}%)</span>
                                <span className="text-noble-text font-bold tabular-nums">{formatCurrency(invoice.tax_amount || 0)}</span>
                            </div>
                            {invoice.discount_amount > 0 && (
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-noble-border text-emerald-600">
                                    <span className="font-medium text-sm">Discount</span>
                                    <span className="font-bold tabular-nums">-{formatCurrency(invoice.discount_amount)}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-lg font-black text-noble-text uppercase tracking-tight">Total Amount</span>
                                <span className="text-2xl font-black text-[#0599D5] tracking-tighter tabular-nums">{formatCurrency(invoice.total_amount || 0)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
