'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, LogIn, KeyRound } from 'lucide-react';

interface EmailConflictModalProps {
    isOpen: boolean;
    email: string;
    onClose: () => void;
    onGoogle: () => void;
}

export default function EmailConflictModal({
    isOpen,
    email,
    onClose,
    onGoogle,
}: EmailConflictModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="conflict-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        key="conflict-card"
                        initial={{ scale: 0.88, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.88, opacity: 0, y: 24 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                        className="relative w-full max-w-sm bg-noble-surface rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.18)] overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="conflict-modal-title"
                    >
                        {/* Top accent bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-noble-blue via-[#0599D5] to-noble-blue" />

                        {/* Close */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-3.5 right-3.5 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="px-6 pt-5 pb-6">
                            {/* Icon */}
                            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-100">
                                <Mail className="w-5 h-5 text-amber-500" />
                            </div>

                            {/* Heading */}
                            <h2
                                id="conflict-modal-title"
                                className="text-center text-[18px] font-black text-noble-text tracking-tight mb-1"
                            >
                                Account already exists
                            </h2>
                            <p className="text-center text-[12px] text-slate-500 font-medium leading-relaxed mb-5">
                                <span className="font-bold text-slate-700">{email}</span> is already
                                registered. Sign in instead, or reset your password.
                            </p>

                            {/* Actions */}
                            <div className="space-y-2.5">
                                {/* Log in with password */}
                                <Link
                                    href={`/login?email=${encodeURIComponent(email)}`}
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-noble-blue text-white font-black text-[13px] hover:bg-blue-700 transition-all shadow-[0_6px_16px_rgba(22,111,187,0.28)] hover:shadow-[0_8px_20px_rgba(22,111,187,0.38)] hover:-translate-y-px"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Log In to Your Account
                                </Link>

                                {/* Continue with Google */}
                                <button
                                    type="button"
                                    onClick={() => { onClose(); onGoogle(); }}
                                    className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-noble-surface border border-noble-border text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Continue with Google
                                </button>

                                {/* Forgot password */}
                                <Link
                                    href={`/forgot-password?email=${encodeURIComponent(email)}`}
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[12px] font-bold text-slate-400 hover:text-noble-blue transition-colors"
                                >
                                    <KeyRound className="w-3.5 h-3.5" />
                                    Forgot your password?
                                </Link>
                            </div>

                            <p className="text-center text-[10px] text-slate-300 font-medium mt-4">
                                Wrong email?{' '}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="underline hover:text-noble-blue transition-colors"
                                >
                                    Go back and change it
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
