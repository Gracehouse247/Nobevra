'use client';

import React, { useState } from 'react';
import { useInvoiceCreator } from './InvoiceCreatorContext';
import { InvoiceWizardForm } from './InvoiceWizardForm';
import { InvoicePreviewPanel } from './InvoicePreviewPanel';
import { ChevronLeft, FileText, Truck, BarChart, RefreshCw, CheckCircle, ArrowDownCircle, ArrowUpCircle, ArrowLeftRight, Calculator, Share2, FileDown, Download, Home, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { downloadAsImage, downloadAsPDF, shareInvoice } from '@/lib/exportUtils';
import { ChooseTemplateDialog } from '@/components/invoice/ChooseTemplateDialog';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';
const INVOICE_TYPES = [
    { id: 'standard', title: 'Standard Invoice', desc: 'A standard bill for completed goods or services.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { id: 'proforma', title: 'Proforma Invoice', desc: 'A preliminary quote before final billing. Not a legal doc.', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-600/10' },
    { id: 'commercial', title: 'Commercial Invoice', desc: 'Used for international trade and customs clearance.', icon: Truck, color: 'text-teal-600', bg: 'bg-teal-600/10' },
    { id: 'progress', title: 'Progress Invoice', desc: 'Bill for a portion of a larger project at a milestone.', icon: BarChart, color: 'text-[#006970]', bg: 'bg-[#006970]/10' },
    { id: 'recurring', title: 'Recurring Invoice', desc: 'Automatically re-issues on a set schedule.', icon: RefreshCw, color: 'text-green-600', bg: 'bg-green-600/10' },
    { id: 'final', title: 'Final Invoice', desc: 'The last invoice for a project, closing all outstanding amounts.', icon: CheckCircle, color: 'text-blue-700', bg: 'bg-blue-700/10' },
    { id: 'credit_memo', title: 'Credit Memo', desc: "Issue a credit to reduce a client's outstanding balance.", icon: ArrowDownCircle, color: 'text-orange-600', bg: 'bg-orange-600/10' },
    { id: 'debit_memo', title: 'Debit Memo', desc: 'Increase the amount a client owes for additional charges.', icon: ArrowUpCircle, color: 'text-red-600', bg: 'bg-red-600/10' },
    { id: 'mixed', title: 'Mixed Invoice', desc: 'Combine credit and debit charges on a single invoice layout.', icon: ArrowLeftRight, color: 'text-amber-600', bg: 'bg-amber-600/10' },
    { id: 'estimate', title: 'Estimate', desc: 'A detailed list of costs for a project. Not a bill.', icon: Calculator, color: 'text-slate-600', bg: 'bg-slate-600/10' },
    { id: 'quote', title: 'Quote', desc: 'A fixed price offer that can be accepted by the client.', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
];

export const InvoiceCreatorLayout = () => {
    const { 
        step, setStep, setInvoiceType, 
        loading, invoiceNumber, dueDate, selectedClientId, 
        clients, total, currencySymbol,
        selectedTemplate, setSelectedTemplate, currencyCode,
        issuedInvoiceData 
    } = useInvoiceCreator();
    
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const router = useRouter();
    // Only mount the template dialog when explicitly opened — prevents the crash
    // caused by rendering 40+ scaled TemplateEngine instances simultaneously
    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

    // ── Success page helpers (must be top-level — not inside a conditional block) ──
    const portalUrl = (typeof window !== 'undefined' && issuedInvoiceData?.tracking_token)
        ? `${window.location.origin}/portal/${issuedInvoiceData.tracking_token}`
        : '';

    const handleCopyLink = () => {
        if (!portalUrl) return;
        navigator.clipboard.writeText(portalUrl);
        toast.success('Payment link copied to clipboard!');
    };

    const handleDownloadPdf = () => {
        if (!issuedInvoiceData) return;
        const url = issuedInvoiceData.pdf_url
            || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-invoice-proxy?id=${issuedInvoiceData.id}&token=${issuedInvoiceData.tracking_token}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Navigation guard prompt to prevent loss of unsaved invoice changes
    React.useEffect(() => {
        if (step !== 'form') return;
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to discard your draft?';
            return e.returnValue;
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [step]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="w-10 h-10 border-4 border-[#166FBB] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (step === 'select-type') {
        const categories = [
            {
                title: "Most Popular",
                subtitle: "Everyday invoicing and automated billing schedules",
                types: ['standard', 'recurring'],
                isFeatured: true
            },
            {
                title: "Quotes & Planning",
                subtitle: "Draft proposals and quotes before issuing a formal request",
                types: ['estimate', 'quote', 'proforma']
            },
            {
                title: "Specialized Transactions",
                subtitle: "For milestones, international logistics, and final project sign-offs",
                types: ['progress', 'commercial', 'final']
            },
            {
                title: "Adjustments & Memos",
                subtitle: "Issue credits or request adjustments on outstanding balances",
                types: ['credit_memo', 'debit_memo', 'mixed']
            }
        ];

        return (
            <div className="w-full bg-[#F8FAFC]/60 backdrop-blur-sm py-8 px-4 md:px-8 font-inter">
                <div className="max-w-7xl mx-auto space-y-10">
                    {/* Header bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-noble-border/60">
                        <div>
                            <button 
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-slate-500 hover:text-[#0599D5] transition-colors font-bold text-[10px] uppercase tracking-wider mb-2"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                            </button>
                            <h1 className="text-2xl font-bold text-noble-text tracking-tight">Select Invoice Type</h1>
                            <p className="text-slate-500 text-sm font-medium">Select a optimized document format for your client transaction.</p>
                        </div>
                    </div>

                    {/* Categorized Layout */}
                    <div className="space-y-12">
                        {categories.map((cat, catIdx) => (
                            <div key={catIdx} className="space-y-4">
                                <div className="border-l-4 border-[#0599D5] pl-4">
                                    <h2 className="text-lg font-black text-slate-800 tracking-tight">{cat.title}</h2>
                                    <p className="text-xs text-slate-500 font-medium">{cat.subtitle}</p>
                                </div>

                                <div className={`grid grid-cols-1 ${cat.isFeatured ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                                    {cat.types.map((typeId) => {
                                        const type = INVOICE_TYPES.find(t => t.id === typeId);
                                        if (!type) return null;
                                        const Icon = type.icon;

                                        if (cat.isFeatured) {
                                            return (
                                                <motion.button
                                                    key={type.id}
                                                    whileHover={{ y: -4, scale: 1.01 }}
                                                    onClick={() => { 
                                                        if (type.id === 'recurring' && !canUse('invoice.recurring')) {
                                                            openUpgradeModal({ featureName: 'Recurring Invoices', requiredPlan: 'pulse' });
                                                            return;
                                                        }
                                                        setInvoiceType(type.id); 
                                                        setStep('form'); 
                                                    }}
                                                    className="relative bg-noble-surface border border-noble-border/80 rounded-[32px] p-8 text-left hover:border-[#0599D5] hover:shadow-[0_20px_40px_rgba(5,153,213,0.06)] active:scale-[0.99] transition-all group overflow-hidden flex flex-col md:flex-row items-start gap-6"
                                                >
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0599D5]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#0599D5]/10 transition-colors" />
                                                    <div className={`w-16 h-16 rounded-[22px] ${type.bg} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                                        <Icon className={`w-7 h-7 ${type.color}`} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-black text-noble-text leading-none">{type.title}</h3>
                                                            {type.id === 'recurring' && !canUse('invoice.recurring') && <PremiumBadge tier="pulse" iconOnly />}
                                                            {type.id !== 'recurring' && <span className="bg-[#0599D5]/10 text-[#0599D5] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">POPULAR</span>}
                                                        </div>
                                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{type.desc}</p>
                                                    </div>
                                                </motion.button>
                                            );
                                        }

                                        return (
                                            <motion.button
                                                key={type.id}
                                                whileHover={{ y: -3, scale: 1.01 }}
                                                onClick={() => { setInvoiceType(type.id); setStep('form'); }}
                                                className="bg-noble-surface border border-slate-100 rounded-2xl p-5 text-left hover:border-[#0599D5] hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] active:scale-[0.99] transition-all group flex items-start gap-4"
                                            >
                                                <div className={`w-11 h-11 rounded-xl ${type.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                                                    <Icon className={`w-5 h-5 ${type.color}`} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#0599D5] transition-colors">{type.title}</h3>
                                                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{type.desc}</p>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-8 flex items-center justify-center font-inter">
                <div className="max-w-3xl w-full">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-noble-surface rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden"
                    >
                        {/* Header Banner */}
                        <div className="px-10 py-12 text-center relative overflow-hidden bg-slate-50/50 border-b border-slate-100">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="w-24 h-24 bg-emerald-50 border-4 border-white rounded-full flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/20 mx-auto mb-6 relative z-10"
                            >
                                <CheckCircle className="w-12 h-12 stroke-[3]" />
                            </motion.div>
                            
                            <h1 className="text-4xl font-black text-noble-text tracking-tighter mb-3 relative z-10">Invoice Published!</h1>
                            <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto relative z-10">
                                Your invoice <span className="text-slate-800 font-bold bg-noble-surface px-2 py-0.5 rounded-md border border-noble-border">#{invoiceNumber}</span> has been finalized and is ready to be sent.
                            </p>
                        </div>

                        {/* Content Body */}
                        <div className="p-10">
                            {/* Summary Card */}
                            <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1 w-full space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-noble-border/60">
                                        <span className="text-sm font-medium text-slate-500">Billed To</span>
                                        <span className="text-sm font-bold text-noble-text">{clients.find((c: any) => c.id === selectedClientId)?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-noble-border/60">
                                        <span className="text-sm font-medium text-slate-500">Due Date</span>
                                        <span className="text-sm font-bold text-noble-text">{dueDate || 'Upon Receipt'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
                                        <span className="text-3xl font-black text-[#0599D5] tracking-tighter">{currencySymbol}{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <button 
                                    onClick={handleCopyLink} 
                                    className="h-16 bg-[#0599D5] text-white rounded-2xl font-bold text-sm shadow-[0_10px_30px_rgba(5,153,213,0.3)] hover:shadow-[0_15px_40px_rgba(5,153,213,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3"
                                >
                                    <Share2 className="w-5 h-5" /> Copy Payment Link
                                </button>
                                
                                <button 
                                    onClick={handleDownloadPdf} 
                                    className="h-16 bg-noble-surface border-2 border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:border-[#0599D5] hover:text-[#0599D5] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                                >
                                    <FileDown className="w-5 h-5" /> Download PDF
                                </button>
                                
                                <button 
                                    onClick={() => downloadAsImage('invoice-preview-element', `Invoice_${invoiceNumber}`)} 
                                    className="h-16 bg-noble-surface border-2 border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:border-emerald-500 hover:text-emerald-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                                >
                                    <Download className="w-5 h-5" /> Export as Image
                                </button>
                                
                                <button 
                                    onClick={() => router.push(`/invoices/${issuedInvoiceData?.id}`)} 
                                    className="h-16 bg-noble-surface border-2 border-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:border-indigo-500 hover:text-indigo-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                                >
                                    <FileText className="w-5 h-5" /> View Details
                                </button>
                            </div>

                            {/* Footer Navigation */}
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                <button 
                                    onClick={() => window.location.href = '/invoices/new'} 
                                    className="flex-1 h-14 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Create Another
                                </button>
                                <button 
                                    onClick={() => router.push('/dashboard')} 
                                    className="flex-1 h-14 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Home className="w-4 h-4" /> Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Hidden element for Image export capture */}
                <div className="hidden">
                    <InvoicePreviewPanel />
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col lg:flex-row overflow-hidden bg-noble-surface">
            <div className="w-full lg:w-[62%] h-full shrink-0 overflow-hidden">
                <InvoiceWizardForm />
            </div>

            <div className="hidden lg:block lg:w-[38%] h-full relative border-l border-noble-border bg-[#F9FAFB]">
                <InvoicePreviewPanel onOpenTemplateDialog={() => setIsTemplateDialogOpen(true)} />
            </div>

            {/* Lazy-mounted: only renders when open, preventing the 40+ TemplateEngine crash */}
            {isTemplateDialogOpen && (
                <ChooseTemplateDialog 
                    isOpen={isTemplateDialogOpen}
                    onClose={() => setIsTemplateDialogOpen(false)}
                    onSelect={(template) => {
                        setSelectedTemplate(template);
                        setIsTemplateDialogOpen(false);
                    }}
                    selectedTemplateId={selectedTemplate?.id}
                    currencySymbol={currencySymbol}
                    currencyCode={currencyCode}
                />
            )}
        </div>
    );
};
