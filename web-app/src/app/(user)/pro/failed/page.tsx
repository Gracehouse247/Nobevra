'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { XCircle, RefreshCcw, MessageCircle, ArrowLeft } from 'lucide-react';

export default function PaymentFailedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black/95 bg-[url('/img/grid.svg')] bg-center bg-fixed text-white py-12 px-6 flex flex-col items-center justify-center">
            <div className="max-w-md w-full glass-card p-10 rounded-[3rem] border border-red-500/20 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-red-500/20">
                    <XCircle className="w-10 h-10 text-red-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase">Payment Failed</h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                        Your transaction could not be completed at this time. No funds were subtracted from your account.
                    </p>
                </div>

                <div className="p-4 bg-noble-surface dark:bg-noble-card/5 rounded-2xl border border-white/5 text-left">
                    <h3 className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 dark:text-slate-500 tracking-widest mb-2">Common Causes</h3>
                    <ul className="text-[11px] text-slate-400 dark:text-slate-500 space-y-1 list-disc list-inside">
                        <li>Insufficient funds in your account</li>
                        <li>Incorrect CVV or expiry date</li>
                        <li>Bank-side security restriction</li>
                        <li>Network timeout during gateway handshake</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => router.push('/upgrade')}
                        className="w-full py-4 bg-[#006970] hover:bg-[#006970] text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Try Again
                    </button>
                    
                    <button 
                        onClick={() => router.push('/support/contact?type=support')}
                        className="w-full py-4 bg-noble-surface dark:bg-noble-card/5 hover:bg-noble-surface dark:bg-noble-card/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/5"
                    >
                        <MessageCircle className="w-4 h-4 text-[#006970]" /> Get Help
                    </button>
                </div>

                <button 
                    onClick={() => router.push('/dashboard')}
                    className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-white transition-colors flex items-center gap-2 mx-auto pt-4"
                >
                    <ArrowLeft className="w-3 h-3" /> Back to Workspace
                </button>
            </div>
        </div>
    );
}

