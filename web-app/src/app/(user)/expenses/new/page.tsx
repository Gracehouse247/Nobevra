'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { 
    ChevronRight, Scan, Save, ChevronDown, Calendar, 
    UploadCloud, FileText, Lock, Lightbulb, CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES } from '@/lib/currencies';
import { expenseService, teamService, invoiceService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';

export default function RecordExpensePage() {
    const router = useRouter();
    const { user } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const { currencyCode: globalCurrency, formatMoney } = useCurrency();

    // Form state
    const [amount, setAmount] = useState('');
    const [currencyCode, setCurrencyCode] = useState(globalCurrency || 'NGN');
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
    const [vendor, setVendor] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [projectTag, setProjectTag] = useState('');
    const [department, setDepartment] = useState('');
    const [notes, setNotes] = useState('');
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
    
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    
    // Derived values
    const numAmount = parseFloat(amount) || 0;
    const taxAmount = 0; // Tax is 0% as per UI screenshot
    const totalAmount = numAmount + taxAmount;

    useEffect(() => {
        if (!user) return;
        const loadInitialData = async () => {
            try {
                const cats = await expenseService.getExpenseCategories();
                setCategories(cats || []);
            } catch (err) {
                console.error('Error loading initial data:', err);
            }
        };
        loadInitialData();
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setReceiptFile(file);
            setReceiptPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!amount || isNaN(numAmount)) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (!vendor.trim()) {
            toast.error('Vendor is required');
            return;
        }
        if (!categoryId) {
            toast.error('Category is required');
            return;
        }

        setSaving(true);
        try {
            const tData = await teamService.getTeamByUserId(user.id);
            const teamId = tData?.id || user.id;

            let resolvedVendorId = await expenseService.resolveVendor(teamId, user.id, vendor);

            let receiptUrl = null;
            if (receiptFile) {
                receiptUrl = await expenseService.uploadReceipt(user.id, receiptFile);
            }

            // Append extra fields to notes since backend doesn't have explicit columns
            let finalNotes = notes.trim();
            const extraFields = [];
            if (paymentMethod) extraFields.push(`Payment Method: ${paymentMethod}`);
            if (projectTag) extraFields.push(`Project/Tag: ${projectTag}`);
            if (department) extraFields.push(`Department: ${department}`);
            if (extraFields.length > 0) {
                finalNotes += finalNotes ? `\n\n--- Extra Info ---\n${extraFields.join('\n')}` : `--- Extra Info ---\n${extraFields.join('\n')}`;
            }

            const payload = {
                team_id: teamId,
                user_id: user.id,
                amount: totalAmount,
                currency_code: currencyCode,
                notes: finalNotes,
                expense_date: expenseDate,
                category_id: parseInt(categoryId),
                vendor_id: resolvedVendorId,
                receipt_url: receiptUrl,
                status: 'pending' // Default status
            };

            await expenseService.createExpense(payload);
            toast.success('Expense recorded successfully');
            router.push('/expenses');
        } catch (err) {
            console.error('Failed to save expense:', err);
            toast.error('Failed to save expense');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24 text-noble-text font-inter">
            {/* Header Breadcrumb */}
            <div className="max-w-[1400px] mx-auto px-5 lg:px-8 pt-6">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-6">
                    <span>Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/expenses" className="hover:text-[#4F46E5] transition-colors">Expenses Hub</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-noble-text font-bold">Record Expense</span>
                </div>

                {/* Page Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-[19px] font-bold text-noble-text tracking-tight">Record Expense</h1>
                        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[13px] mt-0.5">Track your outgoing costs and manage business spending</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => {
                                if (!canUse('ai.receipt')) {
                                    openUpgradeModal({ featureName: 'Receipt Scanning', requiredPlan: 'pulse' });
                                    return;
                                }
                                toast.success('Receipt scanner opening...');
                            }}
                            className="flex items-center gap-2 px-4 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors shadow-sm"
                        >
                            <Scan className="w-4 h-4" /> Scan Receipt
                            {!canUse('expenses.receipts') && <PremiumBadge tier="pulse" iconOnly />}
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#4F46E5] text-white font-bold text-[13px] rounded-lg hover:bg-[#4338CA] transition-colors shadow-sm disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" /> Save Expense
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Column (8 cols) */}
                    <div className="xl:col-span-8 space-y-6">
                        
                        {/* 1. Expense Details Card */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <h2 className="text-[15px] font-bold text-noble-text mb-6">Expense Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {/* Date */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Date <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={expenseDate}
                                            onChange={(e) => setExpenseDate(e.target.value)}
                                            className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg px-3 py-2 text-[13px] font-semibold text-noble-text outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Vendor */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5 cursor-pointer" onClick={() => {
                                        if (!canUse('vendor.management')) {
                                            openUpgradeModal({ featureName: 'Vendor Management', requiredPlan: 'elite' });
                                        }
                                    }}>
                                        Vendor / Merchant <span className="text-rose-500">*</span>
                                        {!canUse('vendor.management') && <PremiumBadge tier="elite" iconOnly />}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Uber, Amazon, Shoprite"
                                        value={vendor}
                                        onChange={(e) => setVendor(e.target.value)}
                                        className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg px-3 py-2 text-[13px] font-semibold text-noble-text placeholder:text-slate-400 dark:text-slate-500 outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                        required
                                    />
                                </div>
                                {/* Category */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Category <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg pl-3 pr-8 py-2 text-[13px] font-semibold text-noble-text outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all appearance-none"
                                            required
                                        >
                                            <option value="" disabled>Select a category</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {/* Amount */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Amount <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex items-center border border-noble-border rounded-lg bg-noble-surface dark:bg-noble-card focus-within:border-[#4F46E5] focus-within:ring-1 focus-within:ring-[#4F46E5] transition-all">
                                        <span className="pl-3 text-[13px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">{currencyCode}</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-transparent px-3 py-2 text-[13px] font-semibold text-noble-text outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Currency */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Currency
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={currencyCode}
                                            onChange={(e) => setCurrencyCode(e.target.value)}
                                            className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg pl-3 pr-8 py-2 text-[13px] font-semibold text-noble-text outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all appearance-none"
                                        >
                                            {CURRENCIES.map(c => (
                                                <option key={c.code} value={c.code}>
                                                    {c.code} - {c.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                                {/* Payment Method */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Payment Method
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg pl-3 pr-8 py-2 text-[13px] font-semibold text-noble-text outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all appearance-none"
                                        >
                                            <option value="" disabled>Select payment method</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Wallet">Wallet</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Link to invoice */}
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Link to invoice <span className="text-slate-400 dark:text-slate-500 font-medium">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search invoice or type invoice number..."
                                    className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg px-3 py-2 text-[13px] font-semibold text-noble-text placeholder:text-slate-400 dark:text-slate-500 outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
                                />
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1.5">Link this expense to an invoice or project</p>
                            </div>
                        </div>

                        {/* 2. Additional Information */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <h2 className="text-[15px] font-bold text-noble-text mb-6">Additional Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Project / Tag */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Project / Tag <span className="text-slate-400 dark:text-slate-500 font-medium">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={projectTag}
                                            onChange={(e) => setProjectTag(e.target.value)}
                                            className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg pl-3 pr-8 py-2 text-[13px] font-semibold text-noble-text outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all appearance-none"
                                        >
                                            <option value="" disabled>Select project or tag</option>
                                            <option value="Q3 Marketing">Q3 Marketing</option>
                                            <option value="Office Renovation">Office Renovation</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                                {/* Department */}
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                        Department <span className="text-slate-400 dark:text-slate-500 font-medium">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg pl-3 pr-8 py-2 text-[13px] font-semibold text-noble-text outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all appearance-none"
                                        >
                                            <option value="" disabled>Select department</option>
                                            <option value="Executive / Leadership">Executive / Leadership</option>
                                            <option value="Finance & Accounting">Finance & Accounting</option>
                                            <option value="Human Resources (HR)">Human Resources (HR)</option>
                                            <option value="Information Technology (IT)">Information Technology (IT)</option>
                                            <option value="Legal & Compliance">Legal & Compliance</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Product Management">Product Management</option>
                                            <option value="Customer Support / Success">Customer Support / Success</option>
                                            <option value="Research & Development (R&D)">Research & Development (R&D)</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Description / Notes */}
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                                    Description / Notes
                                </label>
                                <div className="relative">
                                    <textarea
                                        rows={4}
                                        placeholder="Add extra context about this expense..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg px-3 py-2 text-[13px] font-semibold text-noble-text placeholder:text-slate-400 dark:text-slate-500 outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all resize-none"
                                        maxLength={500}
                                    />
                                    <div className="absolute bottom-2 right-3 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                                        {notes.length} / 500
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Attachments */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <h2 className="text-[15px] font-bold text-noble-text mb-6">Attachments</h2>
                            
                            <div 
                                onClick={() => document.getElementById('receipt-upload')?.click()}
                                className="border border-dashed border-slate-300 rounded-xl bg-[#F8FAFC] dark:bg-[#060D1A] hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer mb-4 group"
                            >
                                <UploadCloud className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-3 group-hover:text-[#4F46E5] transition-colors" />
                                <p className="text-[13px] font-bold text-noble-text mb-1">
                                    Upload Receipt
                                </p>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-2">
                                    Drag & drop your receipt here or click to browse
                                </p>
                                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                                    PDF, JPG, PNG up to 10MB
                                </p>
                                <input 
                                    type="file" 
                                    id="receipt-upload" 
                                    className="hidden" 
                                    accept="image/png, image/jpeg, application/pdf"
                                    onChange={handleFileChange}
                                />
                            </div>
                            
                            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                                <Lock className="w-3 h-3" />
                                Your receipts are securely stored and encrypted
                            </div>
                        </div>
                        
                    </div>

                    {/* Right Column (4 cols) */}
                    <div className="xl:col-span-4 space-y-6">
                        
                        {/* Receipt Preview */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <h2 className="text-[15px] font-bold text-noble-text mb-6">Receipt Preview</h2>
                            <div className="bg-[#F8FAFC] dark:bg-[#060D1A] border border-slate-100 dark:border-noble-border rounded-xl h-[280px] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                                {receiptPreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={receiptPreview} alt="Receipt Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-noble-surface dark:bg-noble-card border border-noble-border flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <p className="text-[14px] font-bold text-noble-text mb-1.5">No receipt uploaded</p>
                                        <p className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-6">Upload a receipt or scan with AI</p>
                                        <button 
                                            onClick={() => document.getElementById('receipt-upload')?.click()}
                                            className="px-4 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors flex items-center gap-2"
                                        >
                                            <UploadCloud className="w-4 h-4" /> Upload Receipt
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Expense Summary */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <h2 className="text-[15px] font-bold text-noble-text mb-6">Expense Summary</h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Amount</span>
                                    <span className="font-bold text-noble-text">{currencyCode} {numAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Tax (0%)</span>
                                    <span className="font-bold text-noble-text">{currencyCode} {taxAmount.toFixed(2)}</span>
                                </div>
                                
                                <div className="border-t border-slate-100 dark:border-noble-border my-2"></div>
                                
                                <div className="flex justify-between items-center text-[14px]">
                                    <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500 font-medium">Total Amount</span>
                                    <span className="font-black text-noble-text">{currencyCode} {totalAmount.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center text-[13px] pt-2">
                                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Status</span>
                                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold">Pending</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Recorded by</span>
                                    <span className="font-bold text-noble-text">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Created on</span>
                                    <span className="font-bold text-noble-text">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Smart Tips */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-4 h-4 text-[#0599D5]" />
                                <h2 className="text-[14px] font-bold text-noble-text">Smart Tips</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">Link expenses to invoices for better tracking</p>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">Add receipts to keep your records organized</p>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">Use categories for accurate reporting</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-noble-surface dark:bg-noble-card border-t border-noble-border py-4 px-6 md:px-8 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <button 
                        onClick={() => router.push('/expenses')}
                        className="px-6 py-2.5 border border-noble-border text-slate-600 dark:text-slate-400 dark:text-slate-500 font-bold text-[13px] rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors shadow-sm"
                    >
                        Cancel
                    </button>
                    <div className="flex items-center gap-3">
                        <button 
                            className="px-6 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors shadow-sm"
                        >
                            Save as Draft
                        </button>
                        <div className="flex rounded-lg overflow-hidden shadow-sm">
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#4F46E5] text-white font-bold text-[13px] hover:bg-[#4338CA] transition-colors border-r border-[#4338CA] disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" /> Save Expense
                            </button>
                            <button className="px-3 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white transition-colors">
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
