'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, ShieldCheck, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { setAdminEmail } from '@/lib/cmsApi';


export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: false,
                },
            });
            if (otpError) throw otpError;
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Safety timeout — stop spinner after 15 seconds no matter what
        const safetyTimer = setTimeout(() => {
            setLoading(false);
            setError('Request timed out. Please try again.');
        }, 15000);

        try {
            console.log('Step 1: Verifying OTP...');
            const { data: authData, error: verifyError } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email',
            });
            if (verifyError) throw verifyError;
            console.log('Step 1 complete.');

            const user = authData.user || authData.session?.user;
            if (!user) throw new Error('Authentication failed. Please try again.');

            // We do not fetch the profile here anymore. Doing a PostgREST query
            // immediately after verifyOtp can cause the client to hang while waiting
            // for auth token locks to release.
            // The /admin/layout.tsx already strictly enforces admin checks.
            setAdminEmail(email);
            clearTimeout(safetyTimer);
            await new Promise(resolve => setTimeout(resolve, 300));
            // Force a hard reload to bypass Next.js App Router cache. If we use router.push,
            // Next.js might use a cached unauthenticated prefetch that redirects back to login.
            window.location.href = '/admin/dashboard';

        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Invalid or expired OTP. Please try again.';
            setError(msg);
        } finally {
            clearTimeout(safetyTimer);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden relative bg-[#F0F4F8]">
            {/* Ambient gradients */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#006970]/[0.05] blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#01A0E2]/[0.04] blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] relative z-10 shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-white"
            >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-[2.5rem]" />

                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-[#f0fafa] rounded-2xl flex items-center justify-center mb-5 border border-[#d0eded]">
                        <ShieldCheck className="w-8 h-8 text-[#006970]" />
                    </div>
                    <h1
                        className="text-3xl font-black text-slate-900 mb-2 tracking-tight"
                        style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
                    >
                        Nobevra Admin
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Exclusive access for the Nobevra team
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'email' ? (
                        <motion.form
                            key="email-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSendOtp}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="admin@nobevra.ai"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006970]/30 focus:border-[#006970] transition-all placeholder:text-slate-400 text-sm"
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="bg-rose-50 text-rose-600 text-xs font-semibold p-3 rounded-xl border border-rose-100 text-center">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#006970] hover:bg-[#005a60] text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        Receive Access Code
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleVerifyOtp}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        maxLength={8}
                                        placeholder="00000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 tracking-[0.25em] font-mono text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#006970]/30 focus:border-[#006970] transition-all placeholder:text-slate-300"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 ml-1 mt-1">
                                    We sent an 8-digit code to <span className="font-semibold text-slate-700">{email}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => { setStep('email'); setError(''); }}
                                    className="text-xs text-[#006970] hover:text-[#006970] mt-1 ml-1 flex items-center gap-1 font-semibold"
                                >
                                    <ArrowLeft className="w-3 h-3" />
                                    Change email address
                                </button>
                            </div>
                            {error && (
                                <div className="bg-rose-50 text-rose-600 text-xs font-semibold p-3 rounded-xl border border-rose-100 text-center">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#006970] hover:bg-[#005a60] text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        Verify & Enter Platform
                                        <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
