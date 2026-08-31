'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { brand } from '@/lib/brand';

/**
 * /reset-password
 *
 * Supabase sends a magic link to the user's email after resetPasswordForEmail().
 * When the user clicks that link, they land here with a hash fragment like:
 *   /reset-password#access_token=...&type=recovery
 *
 * Supabase's SSR client automatically exchanges this hash for a session.
 * We then call updateUser() to set the new password.
 */
export default function ResetPasswordPage() {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'checking' | 'idle' | 'loading' | 'success' | 'error' | 'invalid'>('checking');
    const [message, setMessage] = useState('');

    const mounted = useRef(true);
    const redirectTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            mounted.current = false;
            if (redirectTimer.current) clearTimeout(redirectTimer.current);
        };
    }, []);

    // Verify that a valid recovery session exists when the page mounts.
    // Supabase automatically parses the #access_token hash on load.
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (!mounted.current) return;
            if (error || !session) {
                setStatus('invalid');
                setMessage('This reset link is invalid or has expired. Please request a new one.');
            } else {
                setStatus('idle');
            }
        });
    }, []);

    const validate = (): string | null => {
        if (password.length < 8) return 'Password must be at least 8 characters.';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
        if (password !== confirmPassword) return 'Passwords do not match.';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setStatus('error');
            setMessage(validationError);
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (!mounted.current) return;
            if (error) throw error;

            setStatus('success');
            setMessage('Your password has been updated successfully!');

            // Sign out so the user logs in fresh with their new password
            try {
                await supabase.auth.signOut();
            } catch (e) {
                console.error('Signout failed after reset', e);
            }
            if (mounted.current) {
                redirectTimer.current = setTimeout(() => router.push('/login'), 3000);
            }
        } catch (err: unknown) {
            if (!mounted.current) return;
            const error = err as Error;
            setStatus('error');
            setMessage(error.message || 'Failed to update password. Please try again.');
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
                            <h1 className="text-2xl font-black text-near-black mb-1">Set New Password</h1>
                            <p className="text-near-black/50 text-xs font-medium">Choose a strong password for your account.</p>
                        </div>

                        {/* Checking session state */}
                        {status === 'checking' && (
                            <div className="flex justify-center items-center py-12">
                                <div className="w-8 h-8 border-4 border-noble-blue border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}

                        {/* Invalid / expired link */}
                        {status === 'invalid' && (
                            <div className="text-center">
                                <div className="bg-red-50 text-red-500 text-[11px] font-bold p-4 rounded-lg border border-red-100 mb-6">
                                    {message}
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="inline-block px-8 py-3 bg-noble-blue text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-noble-blue/90 transition-colors"
                                >
                                    Request New Link
                                </Link>
                            </div>
                        )}

                        {/* Success state */}
                        {status === 'success' && (
                            <div className="text-center">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                <div className="bg-green-50 text-green-600 text-[11px] font-bold p-3 rounded-lg border border-green-100 mb-4">
                                    {message}
                                </div>
                                <p className="text-near-black/40 text-xs">Redirecting to sign in...</p>
                            </div>
                        )}

                        {/* Form — shown when session is valid and not yet successful */}
                        {status !== 'checking' && status !== 'invalid' && status !== 'success' && (
                            <>
                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-500 text-[11px] font-bold p-3 rounded-lg border border-red-100 mb-6 text-center">
                                        {message}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* New Password */}
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            autoFocus
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[#F8FAFC] border border-near-black/10 rounded-xl px-4 py-3 pr-12 outline-none focus:border-noble-blue focus:ring-1 focus:ring-noble-blue/20 transition-all text-near-black placeholder:text-near-black/40 text-sm"
                                            placeholder="New Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-near-black/30 hover:text-near-black/60 transition-colors p-1"
                                            tabIndex={-1}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Confirm Password */}
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#F8FAFC] border border-near-black/10 rounded-xl px-4 py-3 outline-none focus:border-noble-blue focus:ring-1 focus:ring-noble-blue/20 transition-all text-near-black placeholder:text-near-black/40 text-sm"
                                        placeholder="Confirm New Password"
                                    />

                                    {/* Password rules hint */}
                                    <p className="text-[10px] text-near-black/40 font-medium px-1">
                                        Must be 8+ characters, include an uppercase letter and a number.
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 disabled:opacity-50 disabled:scale-100 bg-noble-blue"
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Updating...
                                            </span>
                                        ) : 'Update Password'}
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
