'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, X, Loader2, Smartphone, CheckCircle2, AlertTriangle, KeyRound, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MfaEnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function MfaEnrollmentModal({ isOpen, onClose, onSuccess }: MfaEnrollmentModalProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [factorId, setFactorId] = useState('');
    const [qrCodeUri, setQrCodeUri] = useState('');
    const [secret, setSecret] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setFactorId('');
            setQrCodeUri('');
            setSecret('');
            setVerifyCode('');
            setError('');
        }
    }, [isOpen]);

    const handleEnroll = async () => {
        setLoading(true);
        setError('');
        try {
            const { data, error: enrollError } = await supabase.auth.mfa.enroll({
                factorType: 'totp'
            });

            if (enrollError) throw enrollError;

            setFactorId(data.id);
            setQrCodeUri(data.totp.uri); 
            setSecret(data.totp.secret);
            setStep(2);
        } catch (err: any) {
            console.error('MFA Enroll Error:', err);
            setError(err.message || 'Failed to start enrollment');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (verifyCode.length !== 6) return;
        
        setLoading(true);
        setError('');
        try {
            const { data, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
            if (challengeError) throw challengeError;
            
            const { error: verifyError } = await supabase.auth.mfa.verify({
                factorId,
                challengeId: data.id,
                code: verifyCode
            });
            if (verifyError) throw verifyError;
            
            setStep(3);
        } catch (err: any) {
            console.error('MFA Verify Error:', err);
            setError(err.message || 'Invalid code');
        } finally {
            setLoading(false);
        }
    };

    const copySecret = () => {
        navigator.clipboard.writeText(secret);
        toast.success('Secret copied to clipboard');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-noble-surface rounded-[28px] p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                    <X className="w-5 h-5" />
                </button>

                {step === 1 && (
                    <div className="py-2">
                        <div className="w-12 h-12 bg-blue-50 text-[#166FBB] rounded-2xl flex items-center justify-center mb-5 mx-auto">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <h3 className="text-[18px] font-black text-noble-text tracking-tight mb-2 text-center">Set up Authenticator App</h3>
                        <p className="text-[13px] text-slate-500 font-medium mb-6 leading-relaxed text-center px-2">
                            Protect your account with a secondary layer of security. You'll need to use an authenticator app like Google Authenticator, Authy, or 1Password.
                        </p>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl mb-6 border border-red-100 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            onClick={handleEnroll}
                            disabled={loading}
                            className="w-full py-3 bg-[#166FBB] hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                            {loading ? 'Starting Setup...' : 'Begin Setup'}
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="py-2">
                        <h3 className="text-[18px] font-black text-noble-text tracking-tight mb-1 text-center">Scan QR Code</h3>
                        <p className="text-[12px] text-slate-500 font-medium mb-5 text-center">
                            Scan the QR code using your authenticator app.
                        </p>

                        <div className="flex justify-center mb-5">
                            <div className="bg-noble-surface p-3 rounded-2xl border border-noble-border shadow-sm">
                                {qrCodeUri ? (
                                    <QRCodeSVG value={qrCodeUri} size={150} level="M" />
                                ) : (
                                    <div className="w-[150px] h-[150px] flex items-center justify-center bg-slate-50 text-slate-400">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1 text-center">Or enter code manually</p>
                            <div className="flex items-center gap-2 bg-slate-50 border border-noble-border rounded-xl px-3 py-2.5">
                                <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
                                <code className="flex-1 text-[12px] font-bold text-slate-700 font-mono overflow-hidden text-ellipsis whitespace-nowrap text-center">
                                    {secret}
                                </code>
                                <button type="button" onClick={copySecret} className="text-[#166FBB] hover:text-blue-700 p-1">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-xs font-bold p-2.5 rounded-xl mb-4 border border-red-100 text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleVerify}>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1.5 px-1 text-center">
                                Enter 6-digit code to verify
                            </label>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={verifyCode}
                                    onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                                    maxLength={6}
                                    required
                                    placeholder="000000"
                                    className="w-full bg-noble-surface border border-noble-border rounded-xl px-4 py-2.5 text-center text-lg font-mono font-bold text-noble-text focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 tracking-[0.5em] transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || verifyCode.length !== 6}
                                className="w-full py-3 bg-[#166FBB] hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-all disabled:opacity-50 shadow-sm"
                            >
                                {loading ? 'Verifying...' : 'Verify and Enable'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-6">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 className="w-7 h-7" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-[20px] font-black text-noble-text tracking-tight mb-2">You're All Set!</h3>
                        <p className="text-[13px] text-slate-500 font-medium mb-8 leading-relaxed max-w-[260px] mx-auto">
                            Authenticator app successfully configured. You will need it next time you log in.
                        </p>
                        <button
                            onClick={() => {
                                onSuccess();
                                onClose();
                            }}
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[13px] font-bold transition-all shadow-sm"
                        >
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
