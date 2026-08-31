'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { brand } from '@/lib/brand';
import { getPasswordStrength, STRENGTH_CONFIG } from '@/lib/utils/passwordStrength';
import EmailConflictModal from '@/components/auth/EmailConflictModal';

const mapAuthError = (message: string) => {
    if (message.includes('User already registered') || message.includes('already exists')) return 'An account with this email already exists. Try logging in.';
    if (message.includes('Invalid login credentials')) return 'Incorrect email or password.';
    if (message.includes('Email not confirmed')) return 'Please verify your email address first.';
    return message;
};

export default function RegisterPage() {
    const router = useRouter();
    
    // Step 1 State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Step 2 State
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [otp, setOtp] = useState('');
    
    // UI State
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [showConflictModal, setShowConflictModal] = useState(false);
    const [emailExists, setEmailExists] = useState(false); // tracks real-time pre-check result
    const [resendCooldown, setResendCooldown] = useState(0);
    // Tracks whether the initial session check has completed.
    // Keeps the form hidden until we know the user is not already authenticated,
    // preventing a layout flicker where the form renders then immediately redirects.
    const [checking, setChecking] = useState(true);
    const [testimonial, setTestimonial] = useState({
        quote: "Before Nobevra, chasing down late payments was a full-time job. Now, our clients pay us twice as fast, and our branding looks perfectly professional on every single invoice we send out. It's an absolute game-changer for our agency.",
        author: "Marcus Chen",
        role: "Founder, Elevate Design",
        initials: "M"
    });

    React.useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const { data } = await supabase.from('testimonials').select('*').limit(1).single();
                if (data && data.quote) {
                    setTestimonial({
                        quote: data.quote,
                        author: data.author_name || 'Happy Customer',
                        role: data.author_role || '',
                        initials: (data.author_name || 'H').charAt(0).toUpperCase()
                    });
                }
            } catch (e) {
                // Keep default if none exist or error
            }
        };
        fetchTestimonial();
    }, []);

    const mounted = useRef(true);
    React.useEffect(() => {
        return () => { mounted.current = false; };
    }, []);

    React.useEffect(() => {
        const expiry = localStorage.getItem('signup_otp_cooldown_expiry');
        if (expiry) {
            const timeLeft = Math.max(0, Math.ceil((parseInt(expiry) - Date.now()) / 1000));
            if (timeLeft > 0 && mounted.current) setResendCooldown(timeLeft);
        }
    }, []);

    React.useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                if (mounted.current) setResendCooldown(resendCooldown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const strength = useMemo(() => getPasswordStrength(password), [password]);
    const strengthConfig = STRENGTH_CONFIG[strength];

    // ── Debounced real-time email existence check (industry standard: 600ms) ──
    const emailCheckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        setEmailExists(false); // reset on every keystroke
        if (!email || !email.includes('@') || !email.includes('.')) return;
        if (emailCheckTimer.current) clearTimeout(emailCheckTimer.current);
        emailCheckTimer.current = setTimeout(async () => {
            try {
                const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email.trim().toLowerCase())}`);
                if (!res.ok) return;
                const { exists } = await res.json();
                if (exists && mounted.current) {
                    setEmailExists(true);
                    setShowConflictModal(true);
                }
            } catch {
                // fail silently — don't block registration
            }
        }, 600);
        return () => {
            if (emailCheckTimer.current) clearTimeout(emailCheckTimer.current);
        };
    }, [email]);

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Strict Validation
        if (strength < 3) {
            setError('Please ensure your password meets all security requirements.');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            // Guard: if real-time check already confirmed email exists, show modal immediately
            if (emailExists) {
                setShowConflictModal(true);
                setLoading(false);
                return;
            }
            const sanitizedEmail = email.trim().toLowerCase();
            const { error: signUpError } = await supabase.auth.signUp({
                email: sanitizedEmail,
                password,
                options: {
                    data: {
                        name,
                        display_name: name
                    }
                }
            });
            if (!mounted.current) return;
            // Duplicate email — show conflict modal instead of plain error text
            if (signUpError?.message?.includes('already registered') ||
                signUpError?.message?.includes('already exists') ||
                signUpError?.message?.includes('User already registered')) {
                setEmailExists(true);
                setShowConflictModal(true);
                setLoading(false);
                return;
            }
            if (signUpError) throw signUpError;
            
            // Move to OTP step since OTP is dispatched by Supabase Confirm Email feature
            setStep(2);
        } catch (err: unknown) {
            if (!mounted.current) return;
            const error = err as Error;
            setError(mapAuthError(error.message || 'Failed to create account'));
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const sanitizedEmail = email.trim().toLowerCase();
            const { error: verifyError } = await supabase.auth.verifyOtp({
                email: sanitizedEmail,
                token: otp,
                type: 'signup'
            });
            
            if (!mounted.current) return;
            if (verifyError) throw verifyError;
            
            // Move to Onboarding flow
            setStep(3);
        } catch (err: unknown) {
            if (!mounted.current) return;
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
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email.trim().toLowerCase()
            });
            if (!mounted.current) return;
            if (error) throw error;

            const expiry = Date.now() + 60 * 1000;
            localStorage.setItem('signup_otp_cooldown_expiry', expiry.toString());
            setResendCooldown(60);
        } catch (err: unknown) {
            if (!mounted.current) return;
            const error = err as Error;
            setError(mapAuthError(error.message || 'Failed to resend code.'));
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        setError('');
        try {
            const { error: googleError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback` }
            });
            if (!mounted.current) return;
            if (googleError) throw googleError;
        } catch (err: unknown) {
            if (!mounted.current) return;
            const error = err as Error;
            setError(mapAuthError(error.message || 'Google sign-in failed.'));
            setGoogleLoading(false);
        }
    };

    // Hydration check for incomplete onboarding
    React.useEffect(() => {
        // Safety net: if the check hangs for any reason, unblock the UI after 3s
        const safetyTimeout = setTimeout(() => {
            setChecking(false);
        }, 3000);

        const checkSession = async () => {
            try {
                // Use getSession() instead of getUser() — reads from local storage/cookie
                // instantly without a network round-trip, preventing client-side nav hangs.
                const { data: { session } } = await supabase.auth.getSession();
                if (!mounted.current) return;

                if (session?.user) {
                    const user = session.user;
                    // Ensure the user actually has authenticated identity factors
                    if (user.identities && user.identities.length > 0) {
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('onboarding_completed')
                            .eq('id', user.id)
                            .single();
                        if (!mounted.current) return;
                        if (profile && !profile.onboarding_completed) {
                            setStep(3);
                        } else if (profile?.onboarding_completed) {
                            router.push('/dashboard');
                            return; // stay on checking=true while redirecting
                        }
                    }
                }
            } catch {
                // On any error, unblock the page — never leave user stuck on spinner
            } finally {
                clearTimeout(safetyTimeout);
                // Don't guard with mounted.current here — we always want to unblock
                setChecking(false);
            }
        };
        checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount only — router is stable and doesn't need to be a dep


    // Show nothing while we check for an existing session (prevents flicker)
    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative w-full overflow-y-auto overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0A192F]">
                <Image
                    src="/images/auth-bg.jpg"
                    alt="Background"
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 min-h-screen w-full max-w-[1430px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between py-12">
                
                <div className="w-full lg:w-1/2 flex flex-col justify-center mb-12 lg:mb-0 lg:pr-12">
                    <Link href="/" className="mb-8 self-start block">
                        <Image src={brand.assets.logo} alt="Nobevra" width={160} height={40} className="h-10 w-auto object-contain hover:opacity-80 transition-opacity brightness-0 invert" style={{ width: 'auto', height: 'auto' }} priority />
                    </Link>
                    <AnimatePresence mode="wait">
                        {step === 3 ? (
                            <motion.div
                                key="testimonial"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 tracking-tighter drop-shadow-md">
                                    "It completely transformed how we get paid."
                                </h1>
                                <p className="text-white/90 text-base font-medium max-w-md leading-relaxed italic mb-8 border-l-4 border-blue-400 pl-4 py-2 rounded-r-lg drop-shadow">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4 mt-8">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-white text-xl shadow-inner border border-white/20">
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white drop-shadow-sm">{testimonial.author}</p>
                                        {testimonial.role && <p className="text-[11px] font-black uppercase tracking-widest text-white/60 mt-0.5">{testimonial.role}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="marketing"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tighter drop-shadow-md">
                                    Your ultimate workspace
                                </h1>
                                <p className="text-white/80 text-lg font-medium max-w-md leading-relaxed drop-shadow">
                                    Join modern businesses using Nobevra to get paid faster and grow smarter.
                                </p>
                                <div className="flex gap-8 mt-12">
                                    <div>
                                        <p className="text-2xl font-black text-white drop-shadow-sm">Secure</p>
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">Processing</p>
                                    </div>
                                    <div className="w-px bg-white/20"></div>
                                    <div>
                                        <p className="text-2xl font-black text-white drop-shadow-sm">180+</p>
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">Templates</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-full lg:w-[420px] flex-shrink-0">
                    <div className="flex justify-end mb-4">
                        <Link href="/login" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-black/10">
                            Log in
                        </Link>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] w-full overflow-hidden"
                        style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.15)' }}
                    >
                        {/* Email Conflict Modal */}
                        <EmailConflictModal
                            isOpen={showConflictModal}
                            email={email}
                            onClose={() => setShowConflictModal(false)}
                            onGoogle={handleGoogle}
                        />

                        {error && (
                            <div className="bg-red-500/20 text-red-200 text-[11px] font-bold p-3 rounded-lg border border-red-400/30 mb-6 text-center backdrop-blur-sm">
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
                                        <h2 className="text-2xl font-black text-white mb-1">Get Started</h2>
                                        <p className="text-white/80 text-xs font-medium">Create your free account.</p>
                                    </div>

                                    <button
                                        onClick={handleGoogle}
                                        disabled={googleLoading}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/25 bg-white/15 hover:bg-white/25 backdrop-blur-md transition-all font-bold text-sm text-white mb-5 shadow-sm disabled:opacity-50"
                                        aria-label="Continue with Google sign up"
                                    >
                                        {googleLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                                        <div className="flex-1 h-px bg-white/20"></div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/70">Or use email</span>
                                        <div className="flex-1 h-px bg-white/20"></div>
                                    </div>

                                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                                        <input 
                                            type="text" 
                                            required
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            aria-label="Full Name or Company Name"
                                            className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 focus:bg-white/15 transition-all text-white placeholder:text-white/60 text-sm backdrop-blur-sm"
                                            placeholder="Full Name / Company Name"
                                        />
                                        
                                        <input 
                                            type="email" 
                                            required
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 focus:bg-white/15 transition-all text-white placeholder:text-white/60 text-sm backdrop-blur-sm"
                                            placeholder="Email Address"
                                        />

                                        <div className="relative">
                                            <input 
                                                type={showPassword ? 'text' : 'password'} 
                                                required
                                                autoComplete="new-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 pr-12 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 focus:bg-white/15 transition-all text-white placeholder:text-white/60 text-sm backdrop-blur-sm"
                                                placeholder="Password (min. 8 characters)"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(prev => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/65 hover:text-white/90 transition-colors p-1"
                                                tabIndex={-1}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        {password.length > 0 && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between px-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/75">
                                                        Security Level
                                                    </span>
                                                    <span 
                                                        className="text-[10px] font-black uppercase tracking-widest transition-colors"
                                                        style={{ color: strengthConfig.color }}
                                                    >
                                                        {strengthConfig.label}
                                                    </span>
                                                </div>

                                                <div className="flex gap-1.5">
                                                    {[0, 1, 2, 3].map((index) => (
                                                        <div
                                                            key={index}
                                                            className="flex-1 h-1.5 rounded-full transition-all duration-300"
                                                            style={{
                                                                backgroundColor: index < strength ? strengthConfig.color : 'rgba(255,255,255,0.15)'
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                                                    {[
                                                        { label: '8+ characters',   met: password.length >= 8 },
                                                        { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
                                                        { label: 'Number',          met: /[0-9]/.test(password) },
                                                        { label: 'Symbol',          met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
                                                    ].map(({ label, met }) => (
                                                        <div key={label} className="flex items-center gap-1.5">
                                                            <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${met ? 'bg-emerald-500' : 'bg-white/15'}`}>
                                                                {met && (
                                                                    <svg className="w-1.5 h-1.5 text-white" fill="none" viewBox="0 0 6 5">
                                                                        <path d="M1 2.5L2.5 4L5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <span className={`text-[10px] font-bold transition-colors ${met ? 'text-emerald-400' : 'text-white/55'}`}>
                                                                {label}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <button 
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 disabled:opacity-50 disabled:scale-100 bg-noble-blue"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Creating Account...
                                                </span>
                                            ) : 'Create Account'}
                                        </button>
                                    </form>
                                    
                                    <p className="text-center text-[10px] text-white/70 mt-5 leading-relaxed font-medium">
                                        By signing up, you agree to our <Link href="/terms" className="underline hover:text-white/80 transition-colors">Terms</Link> &amp; <Link href="/privacy" className="underline hover:text-white/80 transition-colors">Privacy Policy</Link>
                                    </p>
                                </motion.div>
                            ) : step === 2 ? (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-black text-white mb-1">Verify Email</h2>
                                        <p className="text-white/60 text-xs font-medium px-4 leading-relaxed">
                                            Almost done! Enter the 8-digit verification code sent to <strong className="text-white">{email}</strong>.
                                        </p>
                                    </div>

                                    <form onSubmit={handleOtpSubmit} className="space-y-5">
                                        <div>
                                            <label className="text-[10px] font-black text-white/75 uppercase tracking-widest ml-1 mb-2 block text-center">
                                                Enter 8-Digit Code
                                            </label>
                                            <input 
                                                type="text" 
                                                required
                                                maxLength={8}
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-4 outline-none focus:border-white/60 focus:ring-1 focus:ring-white/20 focus:bg-white/15 transition-all text-white font-black text-2xl text-center tracking-[0.5em] placeholder:tracking-normal placeholder:font-medium placeholder:text-sm placeholder:text-white/55 backdrop-blur-sm"
                                                placeholder="••••••••"
                                                autoComplete="one-time-code"
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={loading || otp.length < 6}
                                            className="w-full py-3 mt-2 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-noble-blue/20 disabled:opacity-50 disabled:scale-100 bg-noble-blue"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Verifying...
                                                </span>
                                            ) : 'Confirm Account'}
                                        </button>
                                        
                                        <div className="text-center pt-2 flex flex-col gap-3">
                                            <button 
                                                type="button"
                                                onClick={handleResendOtp}
                                                disabled={resendCooldown > 0 || loading}
                                                className="text-[10px] font-black text-white/70 hover:text-white uppercase tracking-widest transition-colors disabled:opacity-50"
                                            >
                                                {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : 'Resend Code'}
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => { setStep(1); setOtp(''); }}
                                                className="text-[10px] font-black text-white/70 hover:text-white uppercase tracking-widest transition-colors"
                                            >
                                                Back to Sign Up
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full"
                                >
                                    <OnboardingFlow onComplete={() => {
                                        router.refresh();
                                        router.push('/dashboard');
                                    }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
