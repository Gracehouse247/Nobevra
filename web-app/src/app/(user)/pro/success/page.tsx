'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, refreshUserData } = useAuth();
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
    
    // Flutterwave often returns transaction_id or tx_ref in the callback
    const transactionId = searchParams.get('transaction_id') || searchParams.get('tx_ref');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!transactionId || !user) return;
            
            try {
                // Polling the backend webhook/verification endpoint
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
                    transactionId,
                    email: user.email
                });
                
                // Force AuthContext to refresh Firestore rules
                await refreshUserData();
                setStatus('success');
            } catch (error) {
                console.error("Payment verification failed", error);
                setStatus('failed');
            }
        };

        verifyPayment();
    }, [transactionId, user]);

    return (
        <div className="flex flex-col flex-1 items-center justify-center p-8 text-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
            {status === 'verifying' && (
                <div className="space-y-6">
                    <Loader2 className="w-16 h-16 text-[#006970] animate-spin mx-auto" />
                    <h2 className="text-2xl font-black text-white">Verifying Payment...</h2>
                    <p className="text-slate-400 dark:text-slate-500">Please wait while we confirm with the secure gateway.</p>
                </div>
            )}

            {status === 'success' && (
                <div className="space-y-6">
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-500/20">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Welcome to Noble Pro</h2>
                    <p className="text-slate-400 dark:text-slate-500 mb-8 max-w-sm mx-auto">
                        Your cognitive architecture just upgraded. All premium features have been unlocked.
                    </p>
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="px-8 py-4 bg-[#006970] hover:bg-[#006970] text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2"
                    >
                        Enter Workspace <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {status === 'failed' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-red-500">Verification Failed</h2>
                    <p className="text-slate-400 dark:text-slate-500">We could not automatically verify your transaction. Please contact support.</p>
                    <button onClick={() => router.push('/support')} className="text-[#006970] hover:underline text-sm font-bold">
                        Contact NobleInvoice Support
                    </button>
                </div>
            )}
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-black/95 bg-[url('/img/grid.svg')] bg-center bg-fixed text-white py-12 px-6 flex flex-col">
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#006970]"/></div>}>
                <PaymentSuccessContent />
            </Suspense>
        </div>
    );
}

