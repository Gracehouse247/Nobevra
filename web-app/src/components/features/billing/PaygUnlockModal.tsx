'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Sparkles, Lock, CheckCircle2, CreditCard,
    FileText, QrCode, User, Zap, Loader2, Star,
    Briefcase
} from 'lucide-react';
import { PAYG_PLAN, type PaygBundleState } from '@/lib/plans';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

declare global {
    interface Window {
        FlutterwaveCheckout?: (config: Record<string, unknown>) => void;
    }
}

export type UnlockCategory = 'invoice' | 'businessCard' | 'qrCode';

interface PaygUnlockModalProps {
    isOpen: boolean;
    onClose: () => void;
    
    // Optional: If triggered from a specific template, we show its preview and auto-redeem after purchase.
    triggerCategory?: UnlockCategory;
    templateId?: string;
    templateName?: string;
    
    /** Called when payment succeeds — passes the updated bundle state */
    onUnlocked: (state: PaygBundleState) => void;
}

// Initial empty state
const defaultBundleState: PaygBundleState = {
    credits: {
        invoiceTemplates: 0,
        businessCardTemplates: 0,
        qrCodeTemplates: 0,
        clientSlots: 0,
    },
    unlockedTemplates: {
        invoices: [],
        businessCards: [],
        qrCodes: [],
    },
    purchases: [],
};

export default function PaygUnlockModal({
    isOpen,
    onClose,
    triggerCategory,
    templateId,
    templateName,
    onUnlocked,
}: PaygUnlockModalProps) {
    const { user } = useAuth();
    const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
    const [isProcessing, setIsProcessing] = useState(false);

    const price = currency === 'NGN' ? PAYG_PLAN.priceNGN : PAYG_PLAN.priceUSD;
    const priceLabel = currency === 'NGN' ? `₦${PAYG_PLAN.priceNGN.toLocaleString()}` : `$${PAYG_PLAN.priceUSD.toFixed(2)}`;

    const handlePayment = () => {
        if (!user) {
            toast.error('Please sign in to continue.');
            return;
        }

        if (!window.FlutterwaveCheckout) {
            toast.error('Payment gateway is loading. Please try again in a moment.');
            return;
        }

        setIsProcessing(true);

        window.FlutterwaveCheckout({
            public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
            tx_ref: `payg-bundle-${user.id}-${Date.now()}`,
            amount: price,
            currency: currency,
            payment_options: 'card, banktransfer, ussd, mobilemoney',
            customer: {
                email: user.email || 'customer@nobleinvoice.com',
                name: (user as any).displayName || (user as any).name || 'NobleInvoice User',
                phone_number: '',
            },
            customizations: {
                title: 'NobleInvoice PAYG Bundle',
                description: `Unlock premium features without subscription`,
                logo: 'https://iyvikdxzcpcjivmbiwik.supabase.co/storage/v1/object/public/assets/logo.png',
            },
            meta: {
                user_id: user.id,
                plan: 'payg',
            },
            callback: (response: { status: string; transaction_id: string | number; tx_ref: string }) => {
                setIsProcessing(false);
                if (response.status === 'successful' || response.status === 'completed') {
                    // 1. Fetch current state
                    const storageKey = `payg_bundle_state_${user.id}`;
                    const currentState: PaygBundleState = JSON.parse(
                        localStorage.getItem(storageKey) || JSON.stringify(defaultBundleState)
                    );

                    // 2. Add 1 bundle worth of credits
                    currentState.credits.invoiceTemplates += 1;
                    currentState.credits.businessCardTemplates += 1;
                    currentState.credits.qrCodeTemplates += 1;
                    currentState.credits.clientSlots += 1;
                    
                    currentState.purchases.push({
                        purchasedAt: new Date().toISOString(),
                        transactionId: String(response.transaction_id),
                    });

                    // 3. Auto-redeem if triggered from a specific template
                    if (triggerCategory && templateId) {
                        if (triggerCategory === 'invoice') {
                            currentState.credits.invoiceTemplates -= 1;
                            if (!currentState.unlockedTemplates.invoices.includes(templateId)) {
                                currentState.unlockedTemplates.invoices.push(templateId);
                            }
                        } else if (triggerCategory === 'businessCard') {
                            currentState.credits.businessCardTemplates -= 1;
                            if (!currentState.unlockedTemplates.businessCards.includes(templateId)) {
                                currentState.unlockedTemplates.businessCards.push(templateId);
                            }
                        } else if (triggerCategory === 'qrCode') {
                            currentState.credits.qrCodeTemplates -= 1;
                            if (!currentState.unlockedTemplates.qrCodes.includes(templateId)) {
                                currentState.unlockedTemplates.qrCodes.push(templateId);
                            }
                        }
                    }

                    // 4. Save to localStorage immediately for fast UI
                    localStorage.setItem(storageKey, JSON.stringify(currentState));

                    // Note: The secure edge function also gives the user 1 bundle via the webhook.
                    // The client side assumes success for immediate responsiveness.

                    toast.success(`🎉 Premium Bundle unlocked successfully!`);
                    onUnlocked(currentState);
                    onClose();
                } else {
                    toast.error('Payment was not completed. Please try again.');
                }
            },
            onclose: () => {
                setIsProcessing(false);
            },
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 30 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                    className="relative w-full max-w-sm bg-noble-surface rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden"
                >
                    {/* Premium gradient top bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-noble-blue via-electric-cyan to-noble-blue bg-[length:200%] animate-[shimmer_2s_linear_infinite]" />

                    {/* Ambient glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-noble-blue/10 blur-3xl rounded-full pointer-events-none" />

                    {/* Close button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </motion.button>

                    <div className="px-5 pt-4 pb-4">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-3">
                            <div className="w-10 h-10 mb-2 rounded-xl bg-gradient-to-br from-noble-blue to-electric-cyan flex items-center justify-center shadow-lg shadow-noble-blue/30 relative">
                                <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-[17px] font-black text-noble-text tracking-tight">PAYG Premium Bundle</h2>
                            <p className="text-[11px] font-bold text-slate-500 mt-0.5">Get the best tools without the subscription.</p>
                        </div>

                        {/* Template preview pill (if triggered from one) */}
                        {templateName && (
                            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5 mb-2.5">
                                <div className="w-7 h-7 rounded-lg bg-noble-blue/10 flex items-center justify-center shrink-0">
                                    {triggerCategory === 'invoice' ? <FileText className="w-3.5 h-3.5 text-noble-blue" /> :
                                     triggerCategory === 'businessCard' ? <Briefcase className="w-3.5 h-3.5 text-noble-blue" /> :
                                     <QrCode className="w-3.5 h-3.5 text-noble-blue" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Unlocking</p>
                                    <p className="text-[11px] font-black text-slate-800 truncate">{templateName}</p>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-full">
                                    <Lock className="w-2.5 h-2.5 text-amber-600" />
                                    <span className="text-[9px] font-black text-amber-700 uppercase tracking-wider">Locked</span>
                                </div>
                            </div>
                        )}

                        {/* What you get */}
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl mb-2.5">
                            <p className="text-[9px] font-black text-noble-blue uppercase tracking-widest text-center mb-2">What you get in this bundle</p>
                            <div className="space-y-1.5">
                                {[
                                    { icon: FileText, label: '1 Premium Invoice Template', sub: 'Lifetime access to any Pro design' },
                                    { icon: Briefcase, label: '1 Premium Business Card', sub: 'Lifetime access to any Pro identity card' },
                                    { icon: QrCode, label: '1 Premium QR Code', sub: 'Unlock advanced redirect QR codes' },
                                    { icon: User, label: '1 Extra Client Slot', sub: 'Added to your free account limit' },
                                ].map(({ icon: Icon, label, sub }) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                            <Icon className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black text-slate-800 leading-tight">{label}</p>
                                            <p className="text-[9px] font-semibold text-slate-400">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Currency toggle */}
                        <div className="flex items-center gap-2 mb-2.5 justify-center">
                            {(['NGN', 'USD'] as const).map((c) => (
                                <motion.button
                                    key={c}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrency(c)}
                                    className={`px-3.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                        currency === c
                                            ? 'bg-noble-blue text-white shadow-md shadow-noble-blue/20'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                                >
                                    {c === 'NGN' ? '₦ NGN' : '$ USD'}
                                </motion.button>
                            ))}
                        </div>

                        {/* Price + CTA */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-2.5 bg-noble-blue text-white font-black text-[13px] rounded-xl shadow-[0_8px_20px_rgba(22,111,187,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 group"
                        >
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            {isProcessing ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <CreditCard className="w-3.5 h-3.5" />
                            )}
                            <span>{isProcessing ? 'Processing...' : `Pay ${priceLabel} — Unlock Bundle`}</span>
                        </motion.button>

                        <p className="text-center text-[9px] text-slate-400 font-semibold mt-2">
                            Secured by Flutterwave · One-time payment · Lifetime access
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

import { supabase } from '@/lib/supabase';

/** Hook to manage PAYG state and redemptions */
export function usePaygBundle(userId: string | undefined) {
    if (typeof window === 'undefined' || !userId) {
        return {
            state: defaultBundleState,
            hasAccess: () => false,
            redeemCredit: () => false
        };
    }
    const [state, setState] = useState<PaygBundleState>(defaultBundleState);

    // Initial load: prefer Supabase, fallback to localStorage
    useEffect(() => {
        if (!userId) return;
        const storageKey = `payg_bundle_state_${userId}`;
        
        async function fetchState() {
            try {
                const { data, error } = await supabase
                    .from('payg_entitlements')
                    .select('*')
                    .eq('user_id', userId)
                    .maybeSingle();

                if (data && !error) {
                    const remoteState: PaygBundleState = {
                        credits: {
                            invoiceTemplates: data.invoice_credits,
                            businessCardTemplates: data.business_card_credits,
                            qrCodeTemplates: data.qr_code_credits,
                            clientSlots: data.client_slots,
                        },
                        unlockedTemplates: {
                            invoices: data.unlocked_invoices,
                            businessCards: data.unlocked_business_cards,
                            qrCodes: data.unlocked_qr_codes,
                        },
                        purchases: [] // purchases are in billing_history
                    };
                    setState(remoteState);
                    localStorage.setItem(storageKey, JSON.stringify(remoteState));
                } else {
                    // Fallback to local storage
                    const local = JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(defaultBundleState));
                    setState(local);
                }
            } catch (err) {
                const local = JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(defaultBundleState));
                setState(local);
            }
        }
        
        fetchState();
    }, [userId]);

    const hasAccess = (category: UnlockCategory, templateId: string): boolean => {
        if (category === 'invoice' && state.unlockedTemplates.invoices.includes(templateId)) return true;
        if (category === 'businessCard' && state.unlockedTemplates.businessCards.includes(templateId)) return true;
        if (category === 'qrCode' && state.unlockedTemplates.qrCodes.includes(templateId)) return true;
        return false;
    };

    const redeemCredit = async (category: UnlockCategory, templateId: string): Promise<boolean> => {
        if (!userId) return false;
        
        // Already unlocked?
        if (hasAccess(category, templateId)) return true;

        const newState = { ...state };
        let updatePayload: any = {};

        // Have credit?
        if (category === 'invoice' && state.credits.invoiceTemplates > 0) {
            newState.credits.invoiceTemplates -= 1;
            newState.unlockedTemplates.invoices.push(templateId);
            updatePayload = { 
                invoice_credits: newState.credits.invoiceTemplates, 
                unlocked_invoices: newState.unlockedTemplates.invoices 
            };
        } else if (category === 'businessCard' && state.credits.businessCardTemplates > 0) {
            newState.credits.businessCardTemplates -= 1;
            newState.unlockedTemplates.businessCards.push(templateId);
            updatePayload = { 
                business_card_credits: newState.credits.businessCardTemplates, 
                unlocked_business_cards: newState.unlockedTemplates.businessCards 
            };
        } else if (category === 'qrCode' && state.credits.qrCodeTemplates > 0) {
            newState.credits.qrCodeTemplates -= 1;
            newState.unlockedTemplates.qrCodes.push(templateId);
            updatePayload = { 
                qr_code_credits: newState.credits.qrCodeTemplates, 
                unlocked_qr_codes: newState.unlockedTemplates.qrCodes 
            };
        } else {
            return false; // No credit available
        }

        // Optimistic UI update
        setState(newState);
        localStorage.setItem(`payg_bundle_state_${userId}`, JSON.stringify(newState));

        // Sync to Supabase
        await supabase
            .from('payg_entitlements')
            .update(updatePayload)
            .eq('user_id', userId);

        return true;
    };

    return {
        state,
        hasAccess,
        redeemCredit
    };
}
