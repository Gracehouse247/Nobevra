'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck, Mail } from 'lucide-react';

const mapAuthError = (message: string) => {
    if (message.includes('User already registered') || message.includes('already exists')) return 'An account with this email already exists. Try logging in.';
    if (message.includes('Invalid login credentials')) return 'Incorrect email or password.';
    if (message.includes('Email not confirmed')) return 'Please verify your email address first.';
    if (message.includes('Signups not allowed')) return 'Account not found. Please sign up first.';
    return message;
};

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Step 1 State
    const [email, setEmail] = useState(searchParams?.get('email') || '');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Step 2 State
    const [step, setStep] = useState<1 | 2>(1);
    const [otp, setOtp] = useState('');
    const [mfaFactorId, setMfaFactorId] = useState('');
    const [mfaType, setMfaType] = useState<'email' | 'totp'>('email');
    
    // UI State
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleOnlyHint, setGoogleOnlyHint] = useState(false); // shown when user has Google-only account
    const [resendCooldown, setResendCooldown] = useState(0);

    // Redirect already-authenticated users straight to dashboard
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) router.replace('/dashboard');
        });

        const expiry = localStorage.getItem('otp_cooldown_expiry');
        if (expiry) {
            const timeLeft = Math.max(0, Math.ceil((parseInt(expiry) - Date.now()) / 1000));
            if (timeLeft > 0) setResendCooldown(timeLeft);
        }
    }, [router]);

    // Resend OTP cooldown countdown
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        
        try {
            // Use Supabase native sign in instead of custom RPC to prevent 404 caching bugs
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email.trim().toLowerCase(),
                password: password
            });
            
            if (signInError) {
                // Industry standard: detect Google-only accounts and surface a helpful hint
                // instead of a generic "wrong password" dead-end.
                if (
                    signInError.message.includes('Invalid login credentials') ||
                    signInError.message.includes('invalid_credentials')
                ) {
                    try {
                        const res = await fetch(
                            `/api/auth/check-email?email=${encodeURIComponent(email.trim().toLowerCase())}&context=login`
                        );
                        if (res.ok) {
                            const { exists, provider } = await res.json();
                            if (exists && provider === 'google') {
                                setGoogleOnlyHint(true);
                                return; // don't show generic error
                            }
                        }
                    } catch {
                        // ignore — fall through to generic error
                    }
                }
                throw new Error(signInError.message || 'Invalid login credentials');
            }

            if (!data.session) {
                 throw new Error('Unable to establish a secure session.');
            }
            
            // Check if user has TOTP enabled (requires AAL2)
            const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
            if (aalData?.nextLevel === 'aal2') {
                // User has Authenticator App enabled
                const { data: factors } = await supabase.auth.mfa.listFactors();
                const totpFactor = factors?.totp?.[0];
                if (totpFactor) {
                    setMfaFactorId(totpFactor.id);
                    setMfaType('totp');
                    setStep(2);
                    setLoading(false);
                    return; // Skip email OTP
                }
            }
            
            // Fallback: If no TOTP enrolled, enforce Email 2FA.
            // Password is correct. Sign out so they don't have dashboard access yet.
            await supabase.auth.signOut();
            
            // Send the 2FA OTP
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: email.trim().toLowerCase(),
                options: { shouldCreateUser: false }
            });
            
            if (otpError) throw new Error('Password correct, but failed to send 2FA code: ' + otpError.message);
            
            // Initiate cooldown for resend button
            const expiry = Date.now() + 60 * 1000;
            localStorage.setItem('otp_cooldown_expiry', expiry.toString());
            setResendCooldown(60);
            setMfaType('email');
            setStep(2);
            
        } catch (err: unknown) {
            const error = err as Error;
            console.error('Sign in error:', error);
            setGoogleOnlyHint(false);
            setError(mapAuthError(error.message || 'Invalid email or password.'));
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            if (mfaType === 'totp') {
                // Verify Authenticator App code
                const { data: challenge } = await supabase.auth.mfa.challenge({ factorId: mfaFactorId });
                if (!challenge) throw new Error('Failed to create MFA challenge');
                
                const { error: verifyError } = await supabase.auth.mfa.verify({
                    factorId: mfaFactorId,
                    challengeId: challenge.id,
                    code: otp
                });
                
                if (verifyError) throw verifyError;
            } else {
                // Verify Email OTP
                const { error: verifyError } = await supabase.auth.verifyOtp({
                    email: email.trim().toLowerCase(),
                    token: otp,
                    type: 'email'
                });
                
                if (verifyError) throw verifyError;
            }
            
            // Force a router refresh to bypass Next.js App Router cache cleanly
            router.refresh();
            router.push('/dashboard');
        } catch (err: unknown) {
            const error = err as Error;
            console.error('OTP verify error:', error);
            setError(mapAuthError(error.message || 'Invalid or expired code.'));
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setLoading(true);
        setError('');
        try {
            // The resend() method does not support 'magiclink' in this SDK version.
            // Calling signInWithOtp again with the same email resends the magiclink / OTP.
            const { error } = await supabase.auth.signInWithOtp({
                email: email.trim().toLowerCase(),
                options: {
                    shouldCreateUser: false,
                }
            });
            if (error) throw error;
            
            const expiry = Date.now() + 60 * 1000;
            localStorage.setItem('otp_cooldown_expiry', expiry.toString());
            setResendCooldown(60);
        } catch (err: unknown) {
            const error = err as Error;
            setError(mapAuthError(error.message || 'Failed to resend code.'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        setError('');
        try {
            const { error: googleError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/api/auth/callback`
                }
            });
            if (googleError) throw googleError;
        } catch (err: unknown) {
            const error = err as Error;
            setError(mapAuthError(error.message || 'Google sign-in failed.'));
            setGoogleLoading(false);
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

            <div className="relative z-10 min-h-screen w-full max-w-[1430px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between py-12">
                
                <div className="w-full lg:w-1/2 flex flex-col justify-center mb-12 lg:mb-0 lg:pr-12">
                    <Link href="/" className="mb-8 self-start block">
                        <Image src="/images/logo.png" alt="NobleInvoice" width={160} height={40} className="h-10 w-auto object-contain hover:opacity-80 transition-opacity" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tighter">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">
                        Access your financial operating system securely with 2-Factor Authentication.
                    </p>

                    <div className="flex gap-8 mt-12">
                        <div>
                            <p className="text-2xl font-black text-slate-900">Secure</p>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Processing</p>
                        </div>
                        <div className="w-px bg-slate-200"></div>
                        <div>
                            <p className="text-2xl font-black text-slate-900">180+</p>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Templates</p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[420px] flex-shrink-0">
                    <div className="flex justify-end mb-4">
                        <Link href="/register" className="px-6 py-2.5 bg-white hover:bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 transition-all shadow-xl shadow-slate-200/50">
                            Sign Up
                        </Link>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-8 shadow-2xl w-full"
                    >
                        {/* Google-only account hint — shown instead of generic error */}
                        {googleOnlyHint && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Mail className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-black text-amber-800 mb-0.5">This account uses Google Sign-In</p>
                                        <p className="text-[11px] font-medium text-amber-700 leading-relaxed">
                                            It looks like <span className="font-bold">{email}</span> was registered with Google. Use the button below to sign in.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGoogle}
                                    disabled={googleLoading}
                                    className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl bg-white border border-amber-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
                                >
                                    {googleLoading ? (
                                        <div className="w-4 h-4 border-2 border-slate-300 border-t-noble-blue rounded-full animate-spin" />
                                    ) : (
                                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                    )}
                                    Continue with Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGoogleOnlyHint(false)}
                                    className="text-[10px] font-bold text-amber-600 hover:text-amber-800 transition-colors text-center"
                                >
                                    I want to use a different email
                                </button>
                            </motion.div>
                        )}

                        {error && !googleOnlyHint && (
                            <div className="bg-red-50 text-red-500 text-[11px] font-bold p-3 rounded-lg border border-red-100 mb-6 text-center">
                                {error}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div 
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-black text-near-black mb-1">Sign In</h2>
                                        <p className="text-near-black/50 text-xs font-medium">Continue to your account.</p>
                                    </div>

                                    <button
                                        onClick={handleGoogle}
                                        disabled={googleLoading}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-near-black/10 bg-white hover:bg-near-black/5 transition-all font-bold text-sm text-near-black mb-5 shadow-sm disabled:opacity-50"
                                    >
                                        {googleLoading ? (
                                            <div className="w-4 h-4 border-2 border-near-black/30 border-t-noble-blue rounded-full animate-spin" />
                                        ) : (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                        )}
                                        Continue with Google
                                    </button>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex-1 h-px bg-near-black/5"></div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-near-black/30">Or sign in with email</span>
                                        <div className="flex-1 h-px bg-near-black/5"></div>
                                    </div>

                                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
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

                                        <div className="space-y-1">
                                            <div className="flex justify-end px-1">
                                                <Link href="/forgot-password" className="text-[10px] font-bold text-noble-blue hover:underline">Forgot password?</Link>
                                            </div>
                                            <div className="relative">
                                                <input 
                                                    type={showPassword ? 'text' : 'password'} 
                                                    required
                                                    autoComplete="current-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-[#F8FAFC] border border-near-black/10 rounded-xl px-4 py-3 pr-12 outline-none focus:border-noble-blue focus:ring-1 focus:ring-noble-blue/20 transition-all text-near-black placeholder:text-near-black/40 text-sm"
                                                    placeholder="Password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(prev => !prev)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-near-black/30 hover:text-near-black/60 transition-colors p-1"
                                                    tabIndex={-1}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 disabled:opacity-50 disabled:scale-100 bg-noble-blue"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Authenticating...
                                                </span>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-blue-50 text-noble-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-black text-near-black mb-1">
                                            {mfaType === 'totp' ? 'Authenticator App' : 'Verify Login'}
                                        </h2>
                                        <p className="text-near-black/50 text-xs font-medium px-4 leading-relaxed">
                                            {mfaType === 'totp' 
                                                ? 'Enter the 6-digit code from your authenticator app.'
                                                : <span>For your security, we've sent an 8-digit code to <strong className="text-near-black">{email}</strong>.</span>
                                            }
                                        </p>
                                    </div>

                                    <form onSubmit={handleOtpSubmit} className="space-y-5">
                                        <div>
                                            <label className="text-[10px] font-black text-near-black/40 uppercase tracking-widest ml-1 mb-2 block text-center">
                                                {mfaType === 'totp' ? 'Enter 6-Digit Code' : 'Enter 8-Digit Code'}
                                            </label>
                                            <input 
                                                type="text" 
                                                required
                                                maxLength={mfaType === 'totp' ? 6 : 8}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                className="w-full bg-[#F8FAFC] border border-near-black/10 rounded-xl px-4 py-4 outline-none focus:border-noble-blue focus:ring-1 focus:ring-noble-blue/20 transition-all text-near-black font-black text-2xl text-center tracking-[0.5em] placeholder:tracking-normal placeholder:font-medium placeholder:text-sm placeholder:text-near-black/30"
                                                placeholder="••••••••"
                                                autoComplete="one-time-code"
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={loading || otp.length < (mfaType === 'totp' ? 6 : 8)}
                                            className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 disabled:opacity-50 disabled:scale-100 bg-noble-blue"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Verifying...
                                                </span>
                                            ) : 'Confirm Login'}
                                        </button>
                                        
                                        <div className="text-center pt-2 flex flex-col gap-3">
                                            {mfaType === 'email' && (
                                                <button 
                                                    type="button"
                                                    onClick={handleResendOtp}
                                                    disabled={resendCooldown > 0 || loading}
                                                    className="text-[10px] font-black text-noble-blue hover:text-noble-blue/80 uppercase tracking-widest transition-colors disabled:opacity-50"
                                                >
                                                    {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : 'Resend Code'}
                                                </button>
                                            )}
                                            <button 
                                                type="button" 
                                                onClick={() => { setStep(1); setOtp(''); }}
                                                className="text-[10px] font-black text-near-black/40 hover:text-noble-blue uppercase tracking-widest transition-colors"
                                            >
                                                Back to Sign In
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen relative w-full bg-slate-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-noble-blue rounded-full animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
