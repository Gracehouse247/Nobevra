'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, ArrowRight,
    CreditCard, RefreshCw, ShieldCheck, ChevronRight, Play, Filter, Download,
    Banknote, History, Loader2, X, Check, AlertCircle, Calendar, CheckCircle2,
    Building2, ExternalLink, FileText, Info, Lock, Coins, ArrowLeftRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useCurrency } from '@/context/CurrencyContext';
import { currencyService } from '@/lib/services/currencyService';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PremiumBadge from '@/components/shared/PremiumBadge';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import { Button } from '@/components/ui/button';
import { useUpgradeModal } from '@/context/UpgradeModalContext';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PayoutMethod {
    id: string;
    user_id: string;
    provider: 'flutterwave' | 'stripe' | 'paypal';
    status: 'active' | 'pending' | 'restricted';
    is_default: boolean;
    provider_account_id: string;
    metadata: {
        bank_code?: string;
        account_name?: string;
        [key: string]: any;
    };
    created_at: string;
}

function getCountryFromCurrency(currency: string): string {
    const map: Record<string, string> = {
        'NGN': 'NG', 'GHS': 'GH', 'KES': 'KE', 'UGX': 'UG', 
        'ZAR': 'ZA', 'TZS': 'TZ', 'USD': 'US'
    };
    return map[currency] || 'NG';
}


export interface CountryBank {
    id: number;
    code: string;
    name: string;
}

interface Wallet {
    id: string;
    user_id: string;
    currency_code: string;
    balance: number;
    updated_at: string;
}

interface WalletTransaction {
    id: string;
    type: 'INVOICE_PAYMENT' | 'WITHDRAWAL' | 'REFUND';
    amount: number;
    fee: number;
    net_amount: number;
    currency_code: string;
    status: 'completed' | 'pending' | 'failed';
    reference: string;
    description: string;
    created_at: string;
    metadata: Record<string, number>;
}

// WithdrawForm interface removed — withdraw form is inline in WithdrawModal



function getTransferFee(amount: number, currency: string): number {
    // Flutterwave NGN transfer fees
    if (currency === 'NGN') {
        if (amount <= 5000)  return 10.75;
        if (amount <= 50000) return 26.88;
        return 53.80;
    }
    // Default fallback for other currencies (e.g. USD wire, typically fixed fee or percentage depending on gateway)
    // For now, return 0 or a nominal fee until dynamic fees API is connected
    return 0;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-NG', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

// ── Withdrawal Modal ──────────────────────────────────────────────────────────
function WithdrawModal({
    wallet,
    payoutMethods,
    onClose,
    onSuccess,
}: {
    wallet: Wallet;
    payoutMethods: PayoutMethod[];
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { user } = useAuth();
    const [form, setForm] = useState<{ amount: string; payout_method_id: string; narration: string }>({
        amount: '',
        payout_method_id: payoutMethods.length > 0 ? payoutMethods[0].id : '',
        narration: '',
    });
    const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const parsedAmount = parseFloat(form.amount) || 0;
    const transferFee  = getTransferFee(parsedAmount, wallet.currency_code);
    const netReceived  = Math.max(0, parsedAmount - transferFee);
    const isValidAmount = parsedAmount > transferFee && parsedAmount <= wallet.balance;
    const selectedMethod = payoutMethods.find(m => m.id === form.payout_method_id);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

            const res = await fetch(`${SUPABASE_URL}/functions/v1/withdraw-funds`, {
                method: 'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    amount:         parsedAmount,
                    currency:       wallet.currency_code,
                    payout_method_id: form.payout_method_id,
                    narration:      form.narration || `Nobevra Withdrawal`,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Withdrawal failed');

            setStep('success');
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Withdrawal failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (payoutMethods.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="w-full max-w-md bg-noble-card rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-noble-card-border overflow-hidden p-8 text-center"
                >
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-noble-primary">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-black text-noble-text mb-2">No Bank Account Linked</h2>
                    <p className="text-sm text-noble-muted mb-6">You need to link a bank account before you can withdraw funds.</p>
                    <button onClick={onClose} className="w-full py-4 rounded-xl bg-noble-primary text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-opacity-90 transition-colors">
                        Okay
                    </button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-noble-card rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-noble-card-border overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-noble-card-border">
                    <div>
                        <h2 className="text-lg font-black text-noble-text tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            {step === 'success' ? 'Withdrawal Initiated' : 'Withdraw Funds'}
                        </h2>
                        <p className="text-xs text-noble-muted font-medium mt-0.5">
                            Available: {currencyService.format(wallet.balance, wallet.currency_code)}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-noble-interactive-bg text-noble-muted transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-8 py-6">
                    {/* Success State */}
                    {step === 'success' && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-500/20">
                                <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-black text-noble-text mb-2">Payout Submitted!</h3>
                            <p className="text-sm text-noble-muted leading-relaxed">
                                Your withdrawal of <span className="font-bold text-noble-text">{currencyService.format(netReceived, wallet.currency_code)}</span> is being processed.
                                Funds typically arrive within a few minutes.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 w-full bg-noble-primary text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-opacity-90 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}

                    {/* Confirm State */}
                    {step === 'confirm' && (
                        <div className="space-y-5">
                            <div className="bg-noble-interactive-bg rounded-2xl p-5 space-y-3 border border-noble-card-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-noble-muted">Amount</span>
                                    <span className="font-black text-noble-text">{currencyService.format(parsedAmount, wallet.currency_code)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-noble-muted">Transfer Fee</span>
                                    <span className="font-semibold text-rose-500">-{currencyService.format(transferFee, wallet.currency_code)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-noble-card-border pt-3 mt-1">
                                    <span className="font-black text-noble-text">You Receive</span>
                                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">{currencyService.format(netReceived, wallet.currency_code)}</span>
                                </div>
                            </div>
                            <div className="bg-noble-interactive-bg rounded-2xl p-5 space-y-2 border border-noble-card-border">
                                <p className="text-[10px] font-black uppercase tracking-widest text-noble-muted mb-3">Recipient Details</p>
                                <p className="font-semibold text-noble-text">{selectedMethod?.metadata?.account_name}</p>
                                <p className="text-sm text-noble-muted">{selectedMethod?.provider_account_id} · {selectedMethod?.metadata?.bank_name || 'Bank'}</p>
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold p-4 rounded-xl border border-rose-100 dark:border-rose-500/20">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('form')}
                                    disabled={loading}
                                    className="flex-1 py-4 rounded-xl border border-noble-card-border text-noble-text font-black text-[11px] uppercase tracking-[0.2em] hover:bg-noble-interactive-bg transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-[2] py-4 rounded-xl bg-noble-primary text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpRight className="w-4 h-4" />}
                                    {loading ? 'Processing...' : 'Confirm Payout'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form State */}
                    {step === 'form' && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-noble-muted uppercase tracking-wider ml-1">Withdraw to</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-noble-muted" />
                                    <select
                                        value={form.payout_method_id}
                                        onChange={(e) => setForm({ ...form, payout_method_id: e.target.value })}
                                        className="w-full bg-noble-interactive-bg border border-noble-card-border rounded-xl pl-10 pr-4 py-3 text-[13px] font-semibold text-noble-text focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary transition-all appearance-none"
                                    >
                                        {payoutMethods.map((pm) => {
                                            return (
                                                <option key={pm.id} value={pm.id}>
                                                    {pm.metadata?.bank_name || 'Bank'} - {pm.provider_account_id}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-noble-muted uppercase tracking-wider ml-1">Amount to withdraw</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-noble-muted font-bold">{wallet.currency_code}</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={form.amount}
                                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                        className="w-full bg-noble-interactive-bg border border-noble-card-border rounded-xl pl-14 pr-4 py-3 text-[13px] font-semibold text-noble-text placeholder:text-noble-muted focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary transition-all"
                                    />
                                    <button 
                                        onClick={() => setForm({ ...form, amount: wallet.balance.toString() })}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-noble-primary bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md"
                                    >
                                        Max
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-noble-muted uppercase tracking-wider ml-1">Narration (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Freelance project payout"
                                    value={form.narration}
                                    onChange={(e) => setForm({ ...form, narration: e.target.value })}
                                    className="w-full bg-noble-interactive-bg border border-noble-card-border rounded-xl px-4 py-3 text-[13px] font-semibold text-noble-text placeholder:text-noble-muted focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary transition-all"
                                />
                            </div>

                            <button
                                onClick={() => setStep('confirm')}
                                disabled={!isValidAmount}
                                className="w-full mt-4 py-4 rounded-xl bg-noble-text text-noble-surface dark:text-noble-card font-black text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Manage Payouts Modal ──────────────────────────────────────────────────────
function ManagePayoutsModal({
    onClose,
    currencyCode,
    payoutMethods,
    onRefresh
}: {
    onClose: () => void;
    currencyCode: string;
    payoutMethods: PayoutMethod[];
    onRefresh: () => void;
}) {
    const [view, setView] = useState<'list' | 'add'>('list');
    const [loading, setLoading] = useState(false);
    const [fetchingBanks, setFetchingBanks] = useState(false);
    const [banksList, setBanksList] = useState<CountryBank[]>([]);
    const [bankDropOpen, setBankDropOpen] = useState(false);
    const [bankSearch, setBankSearch] = useState('');
    const bankDropRef = React.useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({
        account_number: '',
        account_bank: '',
        account_name: ''
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!bankDropOpen) return;
        const handler = (e: MouseEvent) => {
            if (bankDropRef.current && !bankDropRef.current.contains(e.target as Node)) {
                setBankDropOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [bankDropOpen]);

    // Fetch dynamic banks based on currency when user opens "Add" view
    useEffect(() => {
        if (view === 'add' && banksList.length === 0) {
            const fetchBanks = async () => {
                setFetchingBanks(true);
                try {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (!session) return;
                    const country = getCountryFromCurrency(currencyCode);
                    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/flw-list-banks?country=${country}`, {
                        headers: { Authorization: `Bearer ${session.access_token}` }
                    });
                    const result = await res.json();
                    if (result?.data && Array.isArray(result.data)) {
                        setBanksList(result.data);
                    }
                } catch (err) {
                    console.error('Failed to fetch banks:', err);
                } finally {
                    setFetchingBanks(false);
                }
            };
            fetchBanks();
        }
    }, [view, currencyCode, banksList.length]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this bank account?')) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('payout_methods').delete().eq('id', id);
            if (error) throw error;
            toast.success('Payout method removed');
            onRefresh();
        } catch (err: any) {
            toast.error(err.message || 'Failed to remove payout method');
        } finally {
            setLoading(false);
        }
    };

    const handleAddBank = async () => {
        if (!form.account_number || !form.account_bank || !form.account_name) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const selectedBank = banksList.find(b => b.code === form.account_bank);

            const { error } = await supabase.from('payout_methods').insert([{
                user_id: user.id,
                provider: 'flutterwave',
                status: 'active',
                is_default: payoutMethods.length === 0,
                provider_account_id: form.account_number,
                metadata: {
                    bank_code: form.account_bank,
                    bank_name: selectedBank?.name || 'Bank',
                    account_name: form.account_name
                }
            }]);

            if (error) throw error;
            
            toast.success('Bank account linked successfully!');
            onRefresh();
            setView('list');
            setForm({ account_number: '', account_bank: '', account_name: '' });
        } catch (err: any) {
            toast.error(err.message || 'Failed to link bank account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-md bg-noble-card rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-noble-card-border overflow-hidden flex flex-col max-h-[85vh]"
            >
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-noble-card-border">
                    <div>
                        <h2 className="text-lg font-black text-noble-text tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            {view === 'add' ? 'Add Bank Account' : 'Payout Methods'}
                        </h2>
                        <p className="text-xs text-noble-muted font-medium mt-0.5">
                            {view === 'add' ? 'Enter your bank details below' : 'Where should we send your funds?'}
                        </p>
                    </div>
                    <button onClick={() => view === 'add' ? setView('list') : onClose()} className="p-2 rounded-xl hover:bg-noble-interactive-bg text-noble-muted transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {view === 'list' && (
                        <div className="space-y-4">
                            {payoutMethods.map((pm) => {
                                return (
                                    <div key={pm.id} className="flex items-center justify-between p-4 border border-noble-card-border rounded-xl bg-noble-interactive-bg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-noble-primary">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-noble-text text-[13px]">{pm.metadata?.account_name}</p>
                                                <p className="text-[11px] text-noble-muted font-medium">{pm.metadata?.bank_name} • {pm.provider_account_id.slice(-4)}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(pm.id)}
                                            disabled={loading}
                                            className="text-rose-500 hover:text-rose-600 p-2"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                );
                            })}
                            
                            {payoutMethods.length === 0 && (
                                <div className="text-center py-6">
                                    <p className="text-sm text-noble-muted mb-4">No bank accounts linked yet.</p>
                                </div>
                            )}

                            <button 
                                onClick={() => setView('add')}
                                className="w-full flex items-center justify-between p-4 border border-dashed border-noble-card-border rounded-xl hover:border-noble-primary hover:bg-noble-interactive-bg transition-all text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-noble-icon-bg flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-noble-muted" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-noble-text text-sm">Add New Bank Account</p>
                                        <p className="text-[11px] text-noble-muted font-medium">Link a bank account for payouts</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-noble-muted" />
                            </button>
                        </div>
                    )}
                    
                    {view === 'add' && (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-noble-muted uppercase tracking-wider ml-1">Bank Name</label>
                                {/* Custom bank dropdown — no native <select> so dark mode works correctly */}
                                <div className="relative" ref={bankDropRef}>
                                    <button
                                        type="button"
                                        onClick={() => { if (!fetchingBanks && banksList.length > 0) setBankDropOpen(o => !o); }}
                                        disabled={fetchingBanks || banksList.length === 0}
                                        className="w-full flex items-center justify-between bg-noble-interactive-bg border border-noble-card-border rounded-xl px-4 py-3 text-[13px] font-semibold text-noble-text focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary transition-all disabled:opacity-50 text-left"
                                    >
                                        <span className={form.account_bank ? 'text-noble-text' : 'text-noble-muted'}>
                                            {fetchingBanks
                                                ? 'Loading banks...'
                                                : banksList.length === 0
                                                    ? 'No banks available'
                                                    : form.account_bank
                                                        ? banksList.find(b => b.code === form.account_bank)?.name ?? 'Select a Bank'
                                                        : 'Select a Bank'
                                            }
                                        </span>
                                        {fetchingBanks
                                            ? <Loader2 className="w-4 h-4 text-noble-muted animate-spin shrink-0" />
                                            : <ChevronRight className={`w-4 h-4 text-noble-muted shrink-0 transition-transform ${bankDropOpen ? 'rotate-90' : ''}`} />
                                        }
                                    </button>

                                    {bankDropOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-noble-card border border-noble-card-border rounded-xl shadow-2xl overflow-hidden">
                                            {/* Search filter */}
                                            <div className="p-2 border-b border-noble-card-border">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Search banks..."
                                                    value={bankSearch}
                                                    onChange={e => setBankSearch(e.target.value)}
                                                    className="w-full bg-noble-interactive-bg rounded-lg px-3 py-2 text-[12px] font-medium text-noble-text placeholder:text-noble-muted focus:outline-none border border-noble-card-border focus:border-noble-primary transition-all"
                                                />
                                            </div>
                                            {/* Options list */}
                                            <ul className="max-h-52 overflow-y-auto">
                                                {banksList
                                                    .filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase()))
                                                    .sort((a, b) => a.name.localeCompare(b.name))
                                                    .map(b => (
                                                        <li
                                                            key={b.code}
                                                            onClick={() => {
                                                                setForm(f => ({ ...f, account_bank: b.code }));
                                                                setBankDropOpen(false);
                                                                setBankSearch('');
                                                            }}
                                                            className={`px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-colors ${
                                                                form.account_bank === b.code
                                                                    ? 'bg-noble-primary/10 text-noble-primary font-semibold'
                                                                    : 'text-noble-text hover:bg-noble-interactive-bg'
                                                            }`}
                                                        >
                                                            {b.name}
                                                        </li>
                                                    ))
                                                }
                                                {banksList.filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase())).length === 0 && (
                                                    <li className="px-4 py-3 text-[12px] text-noble-muted text-center">No results for &quot;{bankSearch}&quot;</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-noble-muted uppercase tracking-wider ml-1">Account Number</label>
                                <input
                                    type="text"
                                    placeholder="0123456789"
                                    value={form.account_number}
                                    onChange={(e) => setForm({ ...form, account_number: e.target.value })}
                                    className="w-full bg-noble-interactive-bg border border-noble-card-border rounded-xl px-4 py-3 text-[13px] font-semibold text-noble-text placeholder:text-noble-muted focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-noble-muted uppercase tracking-wider ml-1">Account Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.account_name}
                                    onChange={(e) => setForm({ ...form, account_name: e.target.value })}
                                    className="w-full bg-noble-interactive-bg border border-noble-card-border rounded-xl px-4 py-3 text-[13px] font-semibold text-noble-text placeholder:text-noble-muted focus:outline-none focus:border-noble-primary focus:ring-1 focus:ring-noble-primary transition-all"
                                />
                                <p className="text-[10px] text-noble-muted px-1 mt-1">Must exactly match the name on your bank account.</p>
                            </div>

                            <button
                                onClick={handleAddBank}
                                disabled={loading || !form.account_number || !form.account_bank || !form.account_name}
                                className="w-full mt-4 py-4 rounded-xl bg-noble-primary text-white font-black text-[11px] uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Save Bank Account
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Main Wallet Page ──────────────────────────────────────────────────────────
export default function WalletPage() {
    const { user } = useAuth();
    const { canUse, isLoading: entLoading } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const { currencyCode } = useCurrency();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([]);
    
    const hasAccess = true; // Ungated per user request

    const hasPromptedRef = useRef(false);

    useEffect(() => {
        if (!loading && !entLoading && !hasAccess && !hasPromptedRef.current) {
            hasPromptedRef.current = true;
            // Pop the premium modal on load instead of redirecting
            openUpgradeModal({ featureName: 'Wallet & Payouts', requiredPlan: 'pulse' });
        }
    }, [hasAccess, entLoading, loading, openUpgradeModal]);

    const fetchWalletData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Fetch wallet balance
            const { data: walletData, error: walletErr } = await supabase
                .from('wallets')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (walletErr) console.error('Wallet fetch error:', walletErr);
            setWallet(walletData ?? null);

            // Fetch recent transactions
            if (walletData?.id) {
                const { data: txData, error: txErr } = await supabase
                    .from('wallet_transactions')
                    .select('*')
                    .eq('wallet_id', walletData.id)
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (txErr) console.error('Transaction fetch error:', txErr);
                setTransactions(txData ?? []);
            }

            // Fetch linked payout methods (bank accounts)
            const { data: payoutData, error: payoutErr } = await supabase
                .from('payout_methods')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (payoutErr) console.error('Payout methods fetch error:', payoutErr);
            setPayoutMethods(payoutData ?? []);

        } catch (err) {
            console.error('Failed to load wallet:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchWalletData();
    }, [fetchWalletData]);

    const currency       = wallet?.currency_code || currencyCode || 'NGN';
    const balance        = wallet?.balance || 0;
    const pendingTx      = transactions.filter(t => t.status === 'pending');
    const pendingAmount  = pendingTx.reduce((s, t) => s + t.amount, 0);
    const totalIncoming  = transactions.filter(t => t.type === 'INVOICE_PAYMENT' && t.status === 'completed').reduce((s, t) => s + t.net_amount, 0);
    const totalWithdrawn = transactions.filter(t => t.type === 'WITHDRAWAL' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);

    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] flex flex-col items-center justify-center p-6 text-center font-inter relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm relative z-10">
                    <Lock className="w-10 h-10 text-[#166FBB]" />
                </div>
                <h1 className="text-3xl font-black text-noble-text mb-4 tracking-tight relative z-10 flex items-center justify-center gap-3" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                    Wallet &amp; Payouts
                </h1>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 max-w-md mx-auto mb-8 leading-relaxed relative z-10 font-medium">
                    Upgrade to Noble Pulse or Elite to securely receive invoice payments globally and withdraw directly to your local bank account.
                </p>
                <button 
                    onClick={() => openUpgradeModal({ featureName: 'Wallet & Payouts', requiredPlan: 'pulse' })}
                    className="relative z-10 bg-[#166FBB] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1260a8] transition-colors shadow-lg shadow-blue-500/20"
                >
                    Unlock Wallet Feature
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full pb-24 dark:bg-transparent text-noble-text font-inter">
            {/* Withdrawal Modal */}
            <AnimatePresence>
                {showWithdrawModal && wallet && (
                    <WithdrawModal
                        wallet={wallet}
                        payoutMethods={payoutMethods}
                        onClose={() => setShowWithdrawModal(false)}
                        onSuccess={() => {
                            setShowWithdrawModal(false);
                            toast.success('Withdrawal initiated! Funds are on their way.');
                            setTimeout(fetchWalletData, 2000);
                        }}
                    />
                )}
                {showPayoutModal && (
                    <ManagePayoutsModal
                        currencyCode={currencyCode}
                        payoutMethods={payoutMethods}
                        onRefresh={fetchWalletData}
                        onClose={() => setShowPayoutModal(false)}
                    />
                )}
            </AnimatePresence>

            <div className="space-y-8 pt-6">
                {/* Header Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-6">
                    <span>Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-noble-text font-bold">Wallet &amp; Payments</span>
                </div>

                {/* Page Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#166FBB]/10 flex items-center justify-center text-[#166FBB]">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-[19px] font-bold text-noble-text tracking-tight">Wallet &amp; Payments</h1>
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[13px] mt-0.5">Your real-time balance from invoice payments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={fetchWalletData} disabled={loading} className="rounded-full shadow-sm">
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button 
                            variant="primary"
                            onClick={() => {
                                if (!wallet || balance <= 0) {
                                    toast.error('No balance available to withdraw.');
                                    return;
                                }
                                setShowWithdrawModal(true);
                            }}
                            className="shadow-sm"
                        >
                            <ArrowUpRight className="w-4 h-4 mr-2" /> Withdraw Funds
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Column (8 cols) */}
                    <div className="xl:col-span-8">
                        
                        {/* Wallet Card */}
                        <div className="bg-[#1e293b] text-white rounded-xl overflow-hidden shadow-sm border border-slate-700">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-[13px] font-semibold text-slate-300 mb-1">Available Balance</p>
                                        <h2 className="text-[40px] font-black tracking-tight">{currencyService.format(balance, currency)}</h2>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-noble-surface dark:bg-noble-card/10 border border-white/10 flex items-center justify-center">
                                        <WalletIcon className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] rounded-xl p-6 mb-6">
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Overview</h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-300 mb-1">
                                                <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" /> Earned
                                            </p>
                                            <p className="text-[15px] font-bold">{currencyService.format(totalIncoming, currency)}</p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-300 mb-1">
                                                <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" /> Withdrawn
                                            </p>
                                            <p className="text-[15px] font-bold">{currencyService.format(totalWithdrawn, currency)}</p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-300 mb-1">
                                                <Loader2 className="w-3.5 h-3.5 text-amber-400" /> Pending
                                            </p>
                                            <p className="text-[15px] font-bold">{currencyService.format(pendingAmount, currency)}</p>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-300 mb-1">
                                                <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> Refunds
                                            </p>
                                            <p className="text-[15px] font-bold">{currencyService.format(0, currency)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-noble-surface dark:bg-noble-card rounded-xl p-4 flex items-center justify-between text-noble-text">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Payout Method</p>
                                            <p className="text-[14px] font-bold">Unlinked</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setShowPayoutModal(true)}
                                        className="px-4 py-2 border border-noble-border text-slate-700 dark:text-slate-200 font-bold text-[12px] rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 bg-[#166FBB]/10 px-3 py-1.5 rounded-lg text-[#166FBB]">
                                    <History className="w-4 h-4" />
                                    <span className="text-[13px] font-bold">Transaction History</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg text-slate-600 dark:text-slate-400 dark:text-slate-500 text-[12px] font-semibold shadow-sm">
                                        <Calendar className="w-4 h-4" /> Jul 17, 2026 - Jul 17, 2026
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg text-slate-600 dark:text-slate-400 dark:text-slate-500 text-[12px] font-semibold hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] shadow-sm transition-colors">
                                        <Filter className="w-4 h-4" /> Filters
                                    </button>
                                    <button className="p-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-lg text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] shadow-sm transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Loader2 className="w-8 h-8 text-[#166FBB] animate-spin mb-3" />
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Loading transactions...</span>
                                </div>
                            ) : transactions.length === 0 ? (
                                <ProactiveEmptyState
                                    title="Your business wallet"
                                    description="Receive payments from clients directly into your wallet. Withdraw to your bank account anytime."
                                    variant="empty"
                                    illustrationIcons={[WalletIcon, Coins, ArrowLeftRight]}
                                    features={[
                                        { title: 'Receive Payments', description: 'Get paid faster via multiple channels.', icon: Coins },
                                        { title: 'Track Balances', description: 'See your real-time balance.', icon: WalletIcon },
                                        { title: 'Instant Withdrawals', description: 'Move funds to your bank.', icon: ArrowLeftRight }
                                    ]}
                                    actions={[
                                        { label: 'Create an Invoice to Get Paid', onClick: () => router.push('/invoices/new'), variant: 'primary' },
                                        { label: 'Learn How It Works', onClick: () => {}, variant: 'secondary' }
                                    ]}
                                />
                            ) : (
                                <div className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl shadow-sm divide-y divide-slate-100">
                                    {transactions.map((tx) => {
                                        const isIncoming   = tx.type === 'INVOICE_PAYMENT' || tx.type === 'REFUND';
                                        const isPending    = tx.status === 'pending';
                                        const isFailed     = tx.status === 'failed';

                                        return (
                                            <div key={tx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                                                        isFailed     ? 'bg-slate-50 dark:bg-[#0D1B2E] border-noble-border text-slate-400 dark:text-slate-500' :
                                                        isIncoming   ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                                                       'bg-rose-50 border-rose-100 text-rose-600'
                                                    }`}>
                                                        {isIncoming ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-[13px] font-bold text-noble-text truncate">{tx.description || tx.type}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold truncate">
                                                                {formatDate(tx.created_at)}
                                                            </p>
                                                            {isPending && (
                                                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 shrink-0">
                                                                    Pending
                                                                </span>
                                                            )}
                                                            {isFailed && (
                                                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#112030] px-2 py-0.5 rounded-md shrink-0">
                                                                    Failed
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-left pl-14 sm:pl-0 sm:text-right">
                                                    <p className={`text-[14px] font-bold ${isIncoming ? 'text-emerald-600' : 'text-noble-text'}`}>
                                                        {isIncoming ? '+' : '-'}{currencyService.format(isIncoming ? tx.net_amount : tx.amount, tx.currency_code)}
                                                    </p>
                                                    {tx.fee > 0 && (
                                                        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1">
                                                            {currencyService.format(tx.fee, tx.currency_code)} fee
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column (4 cols) */}
                    <div className="xl:col-span-4 space-y-6">
                        
                        {/* Secure Payouts */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-sm p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-bold text-noble-text mb-1">Secure Payouts</h3>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                                        Funds are credited to your wallet automatically when clients pay invoices via your payment links. Withdraw anytime to your Nigerian bank account.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 my-6">
                                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">
                                    <RefreshCw className="w-4 h-4 text-slate-400 dark:text-slate-500" /> NGN transfers arrive in minutes
                                </div>
                                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">
                                    <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" /> All major Nigerian banks supported
                                </div>
                                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">
                                    <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Powered by Flutterwave
                                </div>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-2 text-[12px] font-bold border border-emerald-100 dark:border-emerald-500/20">
                                <CheckCircle2 className="w-4 h-4" /> Your account is verified
                            </div>
                        </div>

                        {/* How it works */}
                        <div className="bg-noble-card rounded-xl border border-noble-card-border shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-noble-primary text-[12px] font-bold">i</div>
                                <h3 className="text-[14px] font-bold text-noble-text">How it works</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 dark:bg-blue-500/10 text-noble-primary text-[11px] font-bold flex items-center justify-center">1</div>
                                    <p className="text-[12px] font-medium text-noble-muted">Share payment link with your client</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 dark:bg-blue-500/10 text-noble-primary text-[11px] font-bold flex items-center justify-center">2</div>
                                    <p className="text-[12px] font-medium text-noble-muted">Client pays the invoice</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 dark:bg-blue-500/10 text-noble-primary text-[11px] font-bold flex items-center justify-center">3</div>
                                    <p className="text-[12px] font-medium text-noble-muted">Funds added to your Nobevra wallet</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 dark:bg-blue-500/10 text-noble-primary text-[11px] font-bold flex items-center justify-center">4</div>
                                    <p className="text-[12px] font-medium text-noble-muted">Withdraw to your bank account</p>
                                </div>
                            </div>
                            
                            <button className="mt-6 text-noble-primary font-bold text-[12px] flex items-center gap-1 hover:underline">
                                View documentation <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
