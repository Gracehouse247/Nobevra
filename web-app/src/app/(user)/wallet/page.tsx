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

// ── Types ─────────────────────────────────────────────────────────────────────
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

interface WithdrawForm {
    account_number: string;
    account_bank: string;
    account_name: string;
    amount: string;
    narration: string;
}

// Nigerian banks (FLW bank codes)
const NIGERIAN_BANKS = [
    { name: 'Access Bank',         code: '044' },
    { name: 'Citibank Nigeria',    code: '023' },
    { name: 'Diamond Bank',        code: '063' },
    { name: 'Ecobank Nigeria',     code: '050' },
    { name: 'Fidelity Bank',       code: '070' },
    { name: 'First Bank Nigeria',  code: '011' },
    { name: 'First City Monument Bank (FCMB)', code: '214' },
    { name: 'Globus Bank',         code: '00103' },
    { name: 'GTBank',              code: '058' },
    { name: 'Heritage Bank',       code: '030' },
    { name: 'Keystone Bank',       code: '082' },
    { name: 'Kuda Bank',           code: '50211' },
    { name: 'OPay',                code: '999992' },
    { name: 'Palmpay',             code: '999991' },
    { name: 'Polaris Bank',        code: '076' },
    { name: 'Providus Bank',       code: '101' },
    { name: 'Stanbic IBTC Bank',   code: '221' },
    { name: 'Standard Chartered',  code: '068' },
    { name: 'Sterling Bank',       code: '232' },
    { name: 'Union Bank Nigeria',  code: '032' },
    { name: 'United Bank for Africa (UBA)', code: '033' },
    { name: 'Unity Bank',          code: '215' },
    { name: 'VFD Microfinance Bank', code: '566' },
    { name: 'Wema Bank',           code: '035' },
    { name: 'Zenith Bank',         code: '057' },
];

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
    onClose,
    onSuccess,
}: {
    wallet: Wallet;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { user } = useAuth();
    const [form, setForm] = useState<WithdrawForm>({
        account_number: '',
        account_bank:   '',
        account_name:   '',
        amount:         '',
        narration:      '',
    });
    const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const parsedAmount = parseFloat(form.amount) || 0;
    const transferFee  = getTransferFee(parsedAmount, wallet.currency_code);
    const netReceived  = Math.max(0, parsedAmount - transferFee);
    const selectedBank = NIGERIAN_BANKS.find(b => b.code === form.account_bank);
    const isValidAmount = parsedAmount > transferFee && parsedAmount <= wallet.balance;

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
                    account_number: form.account_number,
                    account_bank:   form.account_bank,
                    account_name:   form.account_name,
                    narration:      form.narration || `NobleInvoice Withdrawal`,
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
                className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            {step === 'success' ? 'Withdrawal Initiated' : 'Withdraw Funds'}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                            Available: {currencyService.format(wallet.balance, wallet.currency_code)}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-8 py-6">
                    {/* Success State */}
                    {step === 'success' && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                                <Check className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">Payout Submitted!</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Your withdrawal of <span className="font-bold text-slate-700">{currencyService.format(netReceived, wallet.currency_code)}</span> is being processed.
                                Funds typically arrive within a few minutes.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 w-full bg-[#166FBB] text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[#1260a8] transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}

                    {/* Confirm State */}
                    {step === 'confirm' && (
                        <div className="space-y-5">
                            <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Amount</span>
                                    <span className="font-black text-slate-900">{currencyService.format(parsedAmount, wallet.currency_code)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Transfer Fee</span>
                                    <span className="font-semibold text-rose-500">-{currencyService.format(transferFee, wallet.currency_code)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-200 pt-3 mt-1">
                                    <span className="font-black text-slate-700">You Receive</span>
                                    <span className="font-black text-emerald-600 text-base">{currencyService.format(netReceived, wallet.currency_code)}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-5 space-y-2 border border-slate-100">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Recipient Details</p>
                                <p className="font-semibold text-slate-800">{form.account_name}</p>
                                <p className="text-sm text-slate-500">{form.account_number} · {selectedBank?.name}</p>
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 bg-rose-50 text-rose-600 text-sm font-semibold p-4 rounded-xl border border-rose-100">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('form')}
                                    disabled={loading}
                                    className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-700 font-black text-[11px] uppercase tracking-[0.2em] hover:border-slate-300 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 py-4 rounded-xl bg-[#166FBB] text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#1260a8] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Withdrawal'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form State */}
                    {step === 'form' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Amount ({wallet.currency_code})</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={wallet.balance}
                                    placeholder="0.00"
                                    value={form.amount}
                                    onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 text-lg font-black focus:outline-none focus:ring-2 focus:ring-[#166FBB]/30 focus:border-[#166FBB] transition-all"
                                />
                                {parsedAmount > 0 && (
                                    <p className={`text-xs mt-1.5 font-semibold ${isValidAmount ? 'text-slate-400' : 'text-rose-500'}`}>
                                        {parsedAmount > wallet.balance
                                            ? `Exceeds available balance of ${currencyService.format(wallet.balance, wallet.currency_code)}`
                                            : parsedAmount <= transferFee
                                            ? `Must be greater than the ${currencyService.format(transferFee, wallet.currency_code)} transfer fee`
                                            : `You will receive ${currencyService.format(netReceived, wallet.currency_code)} after ${currencyService.format(transferFee, wallet.currency_code)} fee`
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Bank</label>
                                <select
                                    value={form.account_bank}
                                    onChange={e => setForm(f => ({ ...f, account_bank: e.target.value }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166FBB]/30 focus:border-[#166FBB] transition-all"
                                >
                                    <option value="">Select a bank...</option>
                                    {NIGERIAN_BANKS.map(bank => (
                                        <option key={bank.code} value={bank.code}>{bank.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Account Number</label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    placeholder="0123456789"
                                    value={form.account_number}
                                    onChange={e => setForm(f => ({ ...f, account_number: e.target.value.replace(/\D/g, '') }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#166FBB]/30 focus:border-[#166FBB] transition-all"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Account Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. NOBLE ENTERPRISES LTD"
                                    value={form.account_name}
                                    onChange={e => setForm(f => ({ ...f, account_name: e.target.value.toUpperCase() }))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-900 uppercase font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-[#166FBB]/30 focus:border-[#166FBB] transition-all"
                                />
                            </div>

                            <button
                                onClick={() => { setError(''); setStep('confirm'); }}
                                disabled={!isValidAmount || !form.account_bank || !form.account_number || form.account_number.length < 10 || !form.account_name}
                                className="w-full bg-[#166FBB] text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[#1260a8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                            >
                                Review Withdrawal
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Manage Payouts Modal (Groundwork) ─────────────────────────────────────────
function ManagePayoutsModal({
    onClose,
    currencyCode
}: {
    onClose: () => void;
    currencyCode: string;
}) {
    const isAfrica = ['NGN', 'KES', 'ZAR', 'GHS'].includes(currencyCode);
    const [view, setView] = useState<'list' | 'add'>('add');

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
                className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
            >
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                            {view === 'add' ? 'Add Payout Method' : 'Payout Methods'}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                            Where should we send your funds?
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {view === 'add' && (
                        <div className="space-y-4">
                            {isAfrica && (
                                <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-[#166FBB] hover:bg-blue-50/50 transition-all text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">Local Bank Account</p>
                                            <p className="text-[11px] text-slate-500 font-medium">Direct deposit via Flutterwave</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

import { useUpgradeModal } from '@/context/UpgradeModalContext';

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
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-inter relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm relative z-10">
                    <Lock className="w-10 h-10 text-[#166FBB]" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight relative z-10 flex items-center justify-center gap-3" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                    Wallet &amp; Payouts
                </h1>
                <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed relative z-10 font-medium">
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
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-inter">
            {/* Withdrawal Modal */}
            <AnimatePresence>
                {showWithdrawModal && wallet && (
                    <WithdrawModal
                        wallet={wallet}
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
                        onClose={() => setShowPayoutModal(false)}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-[1400px] mx-auto px-5 lg:px-8 pt-6">
                {/* Header Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 mb-6">
                    <span>Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-slate-900 font-bold">Wallet &amp; Payments</span>
                </div>

                {/* Page Title & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#166FBB]/10 flex items-center justify-center text-[#166FBB]">
                            <WalletIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-[19px] font-bold text-slate-900 tracking-tight">Wallet &amp; Payments</h1>
                            <p className="text-slate-500 text-[13px] mt-0.5">Your real-time balance from invoice payments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={fetchWalletData} disabled={loading} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button 
                            onClick={() => {
                                if (!wallet || balance <= 0) {
                                    toast.error('No balance available to withdraw.');
                                    return;
                                }
                                setShowWithdrawModal(true);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#166FBB] text-white font-bold text-[13px] rounded-lg hover:bg-[#1260a8] transition-colors shadow-sm"
                        >
                            <ArrowUpRight className="w-4 h-4" /> Withdraw Funds
                        </button>
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
                                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                                        <WalletIcon className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] rounded-xl p-6 mb-6">
                                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Overview</h3>
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

                                <div className="bg-white rounded-xl p-4 flex items-center justify-between text-slate-900">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Payout Method</p>
                                            <p className="text-[14px] font-bold">Unlinked</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setShowPayoutModal(true)}
                                        className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-[12px] rounded-lg hover:bg-slate-50 transition-colors"
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
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-[12px] font-semibold shadow-sm">
                                        <Calendar className="w-4 h-4" /> Jul 17, 2026 - Jul 17, 2026
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-[12px] font-semibold hover:bg-slate-50 shadow-sm transition-colors">
                                        <Filter className="w-4 h-4" /> Filters
                                    </button>
                                    <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Loader2 className="w-8 h-8 text-[#166FBB] animate-spin mb-3" />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading transactions...</span>
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
                                <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100">
                                    {transactions.map((tx) => {
                                        const isIncoming   = tx.type === 'INVOICE_PAYMENT' || tx.type === 'REFUND';
                                        const isPending    = tx.status === 'pending';
                                        const isFailed     = tx.status === 'failed';

                                        return (
                                            <div key={tx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                                                        isFailed     ? 'bg-slate-50 border-slate-200 text-slate-400' :
                                                        isIncoming   ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                                                       'bg-rose-50 border-rose-100 text-rose-600'
                                                    }`}>
                                                        {isIncoming ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-[13px] font-bold text-slate-900 truncate">{tx.description || tx.type}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <p className="text-[11px] text-slate-500 font-semibold truncate">
                                                                {formatDate(tx.created_at)}
                                                            </p>
                                                            {isPending && (
                                                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 shrink-0">
                                                                    Pending
                                                                </span>
                                                            )}
                                                            {isFailed && (
                                                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                                                                    Failed
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-left pl-14 sm:pl-0 sm:text-right">
                                                    <p className={`text-[14px] font-bold ${isIncoming ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                        {isIncoming ? '+' : '-'}{currencyService.format(isIncoming ? tx.net_amount : tx.amount, tx.currency_code)}
                                                    </p>
                                                    {tx.fee > 0 && (
                                                        <p className="text-[11px] font-medium text-slate-400 mt-1">
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
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-bold text-slate-900 mb-1">Secure Payouts</h3>
                                    <p className="text-[13px] text-slate-500 leading-relaxed">
                                        Funds are credited to your wallet automatically when clients pay invoices via your payment links. Withdraw anytime to your Nigerian bank account.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 my-6">
                                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600">
                                    <RefreshCw className="w-4 h-4 text-slate-400" /> NGN transfers arrive in minutes
                                </div>
                                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600">
                                    <Building2 className="w-4 h-4 text-slate-400" /> All major Nigerian banks supported
                                </div>
                                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-600">
                                    <FileText className="w-4 h-4 text-slate-400" /> Powered by Flutterwave
                                </div>
                            </div>

                            <div className="bg-emerald-50/50 text-emerald-600 px-4 py-3 rounded-xl flex items-center gap-2 text-[12px] font-bold border border-emerald-100">
                                <CheckCircle2 className="w-4 h-4" /> Your account is verified
                            </div>
                        </div>

                        {/* How it works */}
                        <div className="bg-[#F8FAFC] rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[#166FBB] text-[12px] font-bold">i</div>
                                <h3 className="text-[14px] font-bold text-slate-900">How it works</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 text-[#166FBB] text-[11px] font-bold flex items-center justify-center">1</div>
                                    <p className="text-[12px] font-medium text-slate-600">Share payment link with your client</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 text-[#166FBB] text-[11px] font-bold flex items-center justify-center">2</div>
                                    <p className="text-[12px] font-medium text-slate-600">Client pays the invoice</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 text-[#166FBB] text-[11px] font-bold flex items-center justify-center">3</div>
                                    <p className="text-[12px] font-medium text-slate-600">Funds added to your NobleInvoice wallet</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded bg-blue-50 text-[#166FBB] text-[11px] font-bold flex items-center justify-center">4</div>
                                    <p className="text-[12px] font-medium text-slate-600">Withdraw to your bank account</p>
                                </div>
                            </div>
                            
                            <button className="mt-6 text-[#166FBB] font-bold text-[12px] flex items-center gap-1 hover:underline">
                                View documentation <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
