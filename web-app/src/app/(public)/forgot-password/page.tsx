'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { brand } from '@/lib/brand';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'resending' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Shared helper — reused by both initial submit and the resend button.
    // Extracted so the resend button does NOT need to call handleSubmit with a fake event.
    const sendResetEmail = async (emailAddress: string) => {
        // NOTE: /reset-password must exist to handle the Supabase #access_token hash
        // and allow the user to enter and confirm a new password.
        const { error } = await supabase.auth.resetPasswordForEmail(emailAddress, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');
        try {
            await sendResetEmail(email.trim().toLowerCase());
            setStatus('success');
            setMessage('Password reset link has been sent to your email.');
        } catch (err: unknown) {
            const error = err as Error;
            setStatus('error');
            setMessage(error.message || 'Failed to send reset email.');
        }
    };

    // Separate handler — does NOT require a React.FormEvent parameter, avoiding the crash
    // that occurred when onClick={handleSubmit} was used without a wrapping <form>.
    const handleResend = async () => {
        setStatus('resending');
        setMessage('');
        try {
            await sendResetEmail(email.trim().toLowerCase());
            setStatus('success');
            setMessage('A new reset link has been sent to your email.');
        } catch (err: unknown) {
            const error = err as Error;
            setStatus('error');
            setMessage(error.message || 'Failed to resend reset email.');
        }
    };

    return (
        <div className="min-h-screen relative w-full overflow-y-auto overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 w-full h-full z-0 noble-gradient-bg overflow-hidden bg-slate-50">
                <div className="yolo-circle w-[600px] h-[600px] top-[-10%] left-[-10%] bg-noble-blue"></div>
                <div className="yolo-circle w-[500px] h-[500px] bottom-[-10%] right-[-5%] bg-primary"></div>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]" />
            </div>

            <div className="relative z-10 min-h-screen w-full max-w-[1430px] mx-auto px-6 lg:px-16 flex flex-col items-center justify-center py-12">
                <div className="w-full max-w-md">
                    <Link href="/" className="mb-8 block text-center">
                        <Image src={brand.assets.logo} alt="Nobevra" width={160} height={40} className="h-10 w-auto object-contain mx-auto hover:opacity-80 transition-opacity" style={{ width: 'auto', height: 'auto' }} priority />
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-8 shadow-2xl w-full"
                    >
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-black text-near-black mb-1">Reset Password</h1>
                            <p className="text-near-black/50 text-xs font-medium">Enter your email to receive a reset link.</p>
                        </div>

                        {status === 'success' || status === 'resending' ? (
                            <div className="text-center">
                                <div className="bg-green-50 text-green-600 text-[11px] font-bold p-3 rounded-lg border border-green-100 mb-6">
                                    {message || 'Password reset link has been sent to your email.'}
                                </div>
                                {/* Resend uses its own handler — never calls handleSubmit directly */}
                                <button
                                    onClick={handleResend}
                                    disabled={status === 'resending'}
                                    className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 bg-noble-blue disabled:opacity-50 disabled:scale-100"
                                >
                                    {status === 'resending' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Resending...
                                        </span>
                                    ) : 'Resend Reset Link'}
                                </button>
                            </div>
                        ) : (
                            <>
                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-500 text-[11px] font-bold p-3 rounded-lg border border-red-100 mb-6 text-center">
                                        {message}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#F8FAFC] border border-near-black/10 rounded-xl px-4 py-3 outline-none focus:border-noble-blue focus:ring-1 focus:ring-noble-blue/20 transition-all text-near-black placeholder:text-near-black/40 text-sm"
                                        placeholder="Email Address"
                                    />

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 disabled:opacity-50 disabled:scale-100 bg-noble-blue"
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : 'Send Reset Link'}
                                    </button>
                                </form>
                            </>
                        )}

                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-[10px] font-bold text-near-black/40 hover:text-noble-blue uppercase tracking-widest transition-colors">
                                Return to Sign In
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
