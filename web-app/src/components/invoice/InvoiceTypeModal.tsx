'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
    X, FileText, Truck, BarChart, RefreshCw, CheckCircle, 
    ArrowDownCircle, ArrowUpCircle, ArrowLeftRight, Calculator, ChevronRight
} from 'lucide-react';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

const INVOICE_TYPES = [
    { id: 'standard', title: 'Standard Invoice', desc: 'A standard bill for completed goods or services.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-600/10', borderColor: 'hover:border-blue-500' },
    { id: 'proforma', title: 'Proforma Invoice', desc: 'A preliminary quote before final billing. Not a legal doc.', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-600/10', borderColor: 'hover:border-purple-500' },
    { id: 'commercial', title: 'Commercial Invoice', desc: 'Used for international trade and customs clearance.', icon: Truck, color: 'text-teal-600', bg: 'bg-teal-600/10', borderColor: 'hover:border-teal-500' },
    { id: 'progress', title: 'Progress Invoice', desc: 'Bill for a portion of a larger project at a milestone.', icon: BarChart, color: 'text-[#006970]', bg: 'bg-[#006970]/10', borderColor: 'hover:border-[#006970]' },
    { id: 'recurring', title: 'Recurring Invoice', desc: 'Automatically re-issues on a set schedule.', icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-600/10', borderColor: 'hover:border-emerald-500', premium: 'pulse' as const },
    { id: 'final', title: 'Final Invoice', desc: 'The last invoice for a project, closing all outstanding amounts.', icon: CheckCircle, color: 'text-blue-700', bg: 'bg-blue-700/10', borderColor: 'hover:border-blue-700' },
    { id: 'credit_memo', title: 'Credit Memo', desc: "Issue a credit to reduce a client's outstanding balance.", icon: ArrowDownCircle, color: 'text-orange-600', bg: 'bg-orange-600/10', borderColor: 'hover:border-orange-500' },
    { id: 'debit_memo', title: 'Debit Memo', desc: 'Increase the amount a client owes for additional charges.', icon: ArrowUpCircle, color: 'text-red-600', bg: 'bg-red-600/10', borderColor: 'hover:border-red-500' },
    { id: 'mixed', title: 'Mixed Invoice', desc: 'Combine credit and debit charges on a single invoice layout.', icon: ArrowLeftRight, color: 'text-amber-600', bg: 'bg-amber-600/10', borderColor: 'hover:border-amber-500' },
    { id: 'estimate', title: 'Estimate', desc: 'A detailed list of costs for a project. Not a bill.', icon: Calculator, color: 'text-slate-600', bg: 'bg-slate-600/10', borderColor: 'hover:border-slate-500' },
    { id: 'quote', title: 'Quote', desc: 'A fixed price offer that can be accepted by the client.', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-600/10', borderColor: 'hover:border-emerald-500' },
];

const CATEGORIES = [
    {
        title: "Most Popular",
        types: ['standard', 'recurring'],
    },
    {
        title: "Quotes & Planning",
        types: ['estimate', 'quote', 'proforma']
    },
    {
        title: "Specialized Transactions",
        types: ['progress', 'commercial', 'final']
    },
    {
        title: "Adjustments & Memos",
        types: ['credit_memo', 'debit_memo', 'mixed']
    }
];

export function InvoiceTypeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const router = useRouter();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();

    if (!isOpen) return null;

    const handleSelect = (typeId: string) => {
        if (typeId === 'recurring' && !canUse('invoices.recurring')) {
            openUpgradeModal({ featureName: 'Recurring Invoices', requiredPlan: 'pulse' });
            return;
        }
        onClose();
        router.push(`/invoices/new?type=${typeId}`);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-full overflow-y-auto relative animate-in fade-in zoom-in duration-200 shadow-2xl font-[Inter,sans-serif] custom-scrollbar">
                <button 
                    onClick={onClose}
                    className="sticky top-5 right-5 float-right w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10"
                >
                    <X className="w-4 h-4" />
                </button>
                
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Select Document Type</h2>
                    <p className="text-[14px] text-slate-500 font-medium mb-8">Choose the type of document you want to create for your client.</p>
                    
                    <div className="space-y-8">
                        {CATEGORIES.map((category) => (
                            <div key={category.title}>
                                <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-3">{category.title}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {category.types.map((typeId) => {
                                        const type = INVOICE_TYPES.find(t => t.id === typeId)!;
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => handleSelect(type.id)}
                                                className={`flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white transition-all hover:shadow-sm ${type.borderColor} group text-left`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg ${type.bg} flex items-center justify-center shrink-0`}>
                                                    <Icon className={`w-5 h-5 ${type.color}`} />
                                                </div>
                                                <div className="flex-1 mt-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-[13px] font-bold text-slate-800">{type.title}</h4>
                                                        {'premium' in type && <PremiumBadge tier={type.premium as any} iconOnly />}
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2 leading-tight">{type.desc}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
