'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, ArrowLeft, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function LogoutPage() {
    const router = useRouter();
    const { logout } = useAuth();
    const [logoutStatus, setLogoutStatus] = useState<'idle' | 'logging_out' | 'success'>('idle');

    const handleLogout = async () => {
        setLogoutStatus('logging_out');
        try {
            await logout();
            await supabase.auth.signOut();
            
            // Artificial delay to show the nice animation for at least 1s
            await new Promise(resolve => setTimeout(resolve, 800));
            setLogoutStatus('success');
            
            await new Promise(resolve => setTimeout(resolve, 600));
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            setLogoutStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
            {/* Ambient gradients */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-rose-500/[0.04] blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#0599D5]/[0.04] blur-[100px]" />
            </div>

            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden z-10 min-h-[420px] flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-red-500" />
                
                <AnimatePresence mode="wait">
                    {logoutStatus === 'idle' && (
                        <motion.div 
                            key="idle"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="p-12 space-y-10 w-full"
                        >
                            <div className="space-y-4">
                                <div className="inline-flex p-4 bg-rose-50 rounded-full mb-2 border border-rose-100">
                                    <LogOut className="w-10 h-10 text-rose-500" />
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                    Sign Out?
                                </h1>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Are you sure you want to disconnect from your NobleInvoice workspace?
                                </p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 text-left">
                                <ShieldCheck className="w-5 h-5 text-[#0599D5] flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                    Your workspace data and progress are securely backed up in the cloud.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Confirm Disconnect
                                </button>
                                
                                <button 
                                    onClick={() => router.back()}
                                    className="w-full py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-slate-200 shadow-sm"
                                >
                                    <ArrowLeft className="w-3 h-3" /> Stay Signed In
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {logoutStatus === 'logging_out' && (
                        <motion.div 
                            key="logging_out"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="p-12 flex flex-col items-center justify-center space-y-6 w-full"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-rose-100 rounded-full animate-ping opacity-75" />
                                <div className="relative bg-rose-50 p-6 rounded-full border-2 border-rose-100">
                                    <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-slate-900">Disconnecting...</h2>
                                <p className="text-sm text-slate-500">Securely clearing your session</p>
                            </div>
                        </motion.div>
                    )}

                    {logoutStatus === 'success' && (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 flex flex-col items-center justify-center space-y-6 w-full"
                        >
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="bg-emerald-50 p-6 rounded-full border-2 border-emerald-100"
                            >
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </motion.div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-slate-900">Signed Out</h2>
                                <p className="text-sm text-slate-500">See you next time!</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
