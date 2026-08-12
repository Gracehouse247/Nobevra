'use client';

import React, { useState } from 'react';
import { useInvoiceCreator } from './InvoiceCreatorContext';
import {
    Search, Plus, Trash2, Check, X, MoreHorizontal, FileText,
    ChevronDown, CreditCard, ChevronRight, ArrowLeft, User, FileCheck
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { NewClientForm } from '@/components/clients/NewClientForm';
import { InvoiceDetailsStep } from './steps/InvoiceDetailsStep';
import { AddItemsStep } from './steps/AddItemsStep';
import { ReviewStep } from './steps/ReviewStep';

// ── Brand Tokens ────────────────────────────────────────────────────────────────
const BRAND = '#0599D5';
const BRAND_DARK = '#0482B5';
const BRAND_LIGHT = '#EBF7FD';

// ── Design Tokens ───────────────────────────────────────────────────────────────
const inputClass = `w-full h-10 px-3 bg-noble-surface border border-noble-border rounded-lg text-slate-800 text-[13px]
  focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10
  transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]`;
const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider font-[Inter,sans-serif]";
const cardClass = "bg-noble-surface rounded-xl border border-noble-border shadow-sm overflow-hidden mb-3";
const cardHeaderClass = "px-5 py-3 border-b border-slate-100 bg-slate-50/50";

// ── Shared Button Styles ────────────────────────────────────────────────────────
const btnPrimary = `h-10 px-6 rounded-lg bg-[#0599D5] hover:bg-[#0482B5] active:scale-[0.98]
  text-white font-bold text-[13px] flex items-center justify-center gap-2
  transition-all shadow-sm shadow-[#0599D5]/20 font-[Inter,sans-serif]`;
const btnSecondary = `h-10 px-5 rounded-lg border border-noble-border bg-noble-surface hover:bg-slate-50
  text-slate-700 font-semibold text-[13px] flex items-center justify-center gap-2
  transition-all shadow-sm font-[Inter,sans-serif]`;
const btnGhost = `h-10 px-5 rounded-lg text-slate-500 hover:bg-slate-100
  font-semibold text-[13px] flex items-center justify-center gap-2
  transition-colors font-[Inter,sans-serif]`;

// ── Step 2: Add Items ───────────────────────────────────────────────────────────

// ── Main Wizard Shell ───────────────────────────────────────────────────────────
export const InvoiceWizardForm = () => {
    const { handleSave, selectedClientId } = useInvoiceCreator();
    const [step, setStep] = useState(1);

    const steps = [
        { id: 1, label: 'Invoice Details', icon: User },
        { id: 2, label: 'Add Items', icon: FileText },
        { id: 3, label: 'Review & Send', icon: FileCheck },
    ];

    const onFinalize = () => {
        if (!selectedClientId) {
            toast.error('Please select a customer in Step 1 before finalising.');
            return;
        }
        handleSave('pending');
    };

    return (
        <div className="flex flex-col h-full bg-[#F4F5F7] font-[Inter,sans-serif]">

            {/* ── Top Header ── */}
            <div className="bg-noble-surface border-b border-noble-border px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
                <div>
                    <h2 className="text-lg font-black text-noble-text tracking-tight font-[Inter,sans-serif]">Create Invoice</h2>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 font-[Inter,sans-serif]">Fill out the steps below to generate your invoice</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-[Inter,sans-serif]">
                    <Check className="w-3 h-3" /> Auto-saved
                </div>
            </div>

            {/* ── Stepper ── */}
            <div className="bg-noble-surface border-b border-noble-border px-6 py-4 shrink-0">
                <div className="flex items-center max-w-xl mx-auto">
                    {steps.map((s, idx) => {
                        const Icon = s.icon;
                        const isActive = step === s.id;
                        const isDone = step > s.id;
                        return (
                            <React.Fragment key={s.id}>
                                <button onClick={() => setStep(s.id)} className="flex flex-col items-center gap-1.5 group">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border-2 ${
                                        isActive
                                            ? 'bg-[#0599D5] border-[#0599D5] text-white shadow-md shadow-[#0599D5]/25'
                                            : isDone
                                            ? 'bg-[#EBF7FD] border-[#0599D5]/30 text-[#0599D5]'
                                            : 'bg-noble-surface border-noble-border text-slate-400 group-hover:border-slate-300'
                                    }`}>
                                        {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                                    </div>
                                    <span className={`text-[10px] font-bold whitespace-nowrap font-[Inter,sans-serif] ${isActive ? 'text-[#0599D5]' : isDone ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {s.label}
                                    </span>
                                </button>
                                {idx < steps.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-3 mb-4 rounded-full transition-colors ${isDone ? 'bg-[#0599D5]/25' : 'bg-slate-200'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* ── Form Content ── */}
            <div className="flex-1 overflow-y-auto px-5 lg:px-8 py-4 custom-scrollbar">
                <div className="max-w-2xl mx-auto">
                    {step === 1 && <InvoiceDetailsStep />}
                    {step === 2 && <AddItemsStep />}
                    {step === 3 && <ReviewStep />}
                </div>
            </div>

            {/* ── Sticky Footer — uses shrink-0 to always be visible above ticker ── */}
            <div className="shrink-0 bg-noble-surface border-t border-noble-border px-6 py-3 flex items-center justify-between gap-3 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]" style={{ zIndex: 62 }}>
                {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className={btnSecondary}>
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                ) : (
                    <button className={btnGhost}>Cancel</button>
                )}

                <div className="flex items-center gap-2.5">
                    <button onClick={() => handleSave('draft')} className={btnSecondary}>
                        Save Draft
                    </button>
                    {step < 3 ? (
                        <button onClick={() => setStep(step + 1)} className={btnPrimary}>
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button onClick={onFinalize} className={btnPrimary}>
                            <Check className="w-4 h-4" /> Save & Send
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
