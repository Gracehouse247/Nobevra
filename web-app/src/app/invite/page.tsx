'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
    Shield, Eye, EyeOff, CheckCircle, AlertCircle, 
    Loader2, Mail, Lock, User, ArrowRight, Clock
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type InviteStatus = 'loading' | 'new_user' | 'existing_user' | 'expired' | 'invalid' | 'success';

type InviteData = {
    id: string;
    email: string;
    role: string;
    team_id: string;
    expires_at: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Inner component (uses useSearchParams)
// ─────────────────────────────────────────────────────────────────────────────
function InvitePageInner() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const inviteId = searchParams.get('id');
    const inviteEmail = searchParams.get('email') ?? '';

    const [status, setStatus] = useState<InviteStatus>('loading');
    const [invite, setInvite] = useState<InviteData | null>(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form fields
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // ── Fetch & validate the invite on mount ──────────────────────────────────
    useEffect(() => {
        if (!inviteId) {
            setStatus('invalid');
            return;
        }
        validateInvite();
    }, [inviteId]);

    const validateInvite = async () => {
        try {
            // Fetch invite from DB (public read via anon key is fine — no sensitive data)
            const { data: inv, error: fetchErr } = await supabase
                .from('pending_invitations')
                .select('id, email, role, team_id, expires_at')
                .eq('id', inviteId!)
                .maybeSingle();

            if (fetchErr || !inv) {
                setStatus('invalid');
                return;
            }

            // Check expiry
            if (new Date(inv.expires_at) < new Date()) {
                setInvite(inv);
                setStatus('expired');
                return;
            }

            setInvite(inv);

            // Check if email already has a Supabase account
            // We do this by attempting to get a user record via admin — but from frontend
            // we can't, so we try to sign in with OTP and check the response.
            // Best approach: try sign-in-with-otp dry-run or check via a lightweight RPC.
            // For simplicity & security: we show BOTH flows and let the user choose.
            // The backend will handle the rest correctly either way.
            setStatus('new_user'); // Default to new user; existing users will fail gracefully
        } catch {
            setStatus('invalid');
        }
    };

    // ── Handle new user sign-up ───────────────────────────────────────────────
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Sign up the user
            const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
                email: invite!.email,
                password,
                options: {
                    data: { full_name: fullName },
                    // Don't send confirmation email — user came via invite
                    emailRedirectTo: undefined,
                }
            });

            if (signUpErr) {
                // If user already exists, switch to login mode
                if (signUpErr.message.toLowerCase().includes('already registered') ||
                    signUpErr.message.toLowerCase().includes('already exists')) {
                    setStatus('existing_user');
                    setError('An account already exists with this email. Please log in below to accept the invitation.');
                    return;
                }
                throw new Error(signUpErr.message);
            }

            if (!signUpData.session) {
                // Email confirmation is enabled — handle gracefully
                setStatus('success');
                return;
            }

            // 2. Accept the invite (add to team_members, delete pending invite)
            await acceptInvite(signUpData.session.access_token);

        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Handle existing user sign-in ──────────────────────────────────────────
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
                email: invite!.email,
                password,
            });

            if (signInErr) throw new Error(signInErr.message);
            if (!signInData.session) throw new Error('Login failed — no session returned.');

            // Accept the invite
            await acceptInvite(signInData.session.access_token);

        } catch (err: any) {
            setError(err.message || 'Invalid password. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Call the accept-team-invite edge function ─────────────────────────────
    const acceptInvite = async (accessToken: string) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/accept-team-invite`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                },
                body: JSON.stringify({ invite_id: invite!.id })
            }
        );

        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || 'Failed to join team.');

        setStatus('success');
        // Redirect to dashboard after 2 seconds
        setTimeout(() => router.push('/dashboard'), 2000);
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Renders
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
            {/* Ambient glow */}
            <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/8 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-[12px] bg-[#166FBB] flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tight">NobleInvoice</span>
                    </div>
                </div>

                {/* ── Loading ── */}
                {status === 'loading' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-10 text-center">
                        <Loader2 className="w-8 h-8 text-[#166FBB] animate-spin mx-auto mb-4" />
                        <p className="text-[14px] font-medium text-slate-500">Validating your invitation...</p>
                    </div>
                )}

                {/* ── Invalid ── */}
                {status === 'invalid' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-10 text-center">
                        <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-7 h-7 text-rose-500" />
                        </div>
                        <h2 className="text-lg font-black text-slate-900 mb-2">Invalid Invitation</h2>
                        <p className="text-[14px] text-slate-500 leading-relaxed">
                            This invitation link is invalid or has already been used.<br />
                            Please contact your workspace owner for a new invite.
                        </p>
                    </div>
                )}

                {/* ── Expired ── */}
                {status === 'expired' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-10 text-center">
                        <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-7 h-7 text-amber-500" />
                        </div>
                        <h2 className="text-lg font-black text-slate-900 mb-2">Invitation Expired</h2>
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-4">
                            This invitation for <strong>{invite?.email}</strong> expired on{' '}
                            <strong>{new Date(invite?.expires_at ?? '').toLocaleDateString()}</strong>.
                        </p>
                        <p className="text-[13px] text-slate-400">
                            Please ask your workspace owner to send a new invitation.
                        </p>
                    </div>
                )}

                {/* ── Success ── */}
                {status === 'success' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-10 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 mb-2">Welcome to the team! 🎉</h2>
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-4">
                            You have successfully joined the workspace. Redirecting to your dashboard...
                        </p>
                        <Loader2 className="w-5 h-5 text-[#166FBB] animate-spin mx-auto" />
                    </div>
                )}

                {/* ── New User Form ── */}
                {status === 'new_user' && invite && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#166FBB] to-blue-500 px-8 py-7 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="w-5 h-5 opacity-80" />
                                <span className="text-[12px] font-bold uppercase tracking-widest opacity-80">Team Invitation</span>
                            </div>
                            <h1 className="text-xl font-black mb-1">You've been invited!</h1>
                            <p className="text-[13px] opacity-80">
                                Create your account to join as a{' '}
                                <span className="font-bold capitalize bg-white/20 px-2 py-0.5 rounded-md">{invite.role}</span>
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSignUp} className="p-8 space-y-5">
                            {/* Email (pre-filled, read-only) */}
                            <div>
                                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        value={invite.email}
                                        disabled
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Your full name"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Create Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter your password"
                                        className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
                                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-[13px] text-rose-600 font-medium">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#166FBB] text-white font-bold text-[14px] rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</>
                                ) : (
                                    <>Create Account & Join Team <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>

                            <p className="text-center text-[12px] text-slate-500">
                                Already have an account?{' '}
                                <button type="button" onClick={() => { setStatus('existing_user'); setError(''); }} className="text-[#166FBB] font-bold hover:underline">
                                    Sign in instead
                                </button>
                            </p>
                        </form>
                    </div>
                )}

                {/* ── Existing User Login ── */}
                {status === 'existing_user' && invite && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#166FBB] to-blue-500 px-8 py-7 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="w-5 h-5 opacity-80" />
                                <span className="text-[12px] font-bold uppercase tracking-widest opacity-80">Team Invitation</span>
                            </div>
                            <h1 className="text-xl font-black mb-1">Accept Invitation</h1>
                            <p className="text-[13px] opacity-80">
                                Log in to join as a{' '}
                                <span className="font-bold capitalize bg-white/20 px-2 py-0.5 rounded-md">{invite.role}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSignIn} className="p-8 space-y-5">
                            {/* Email (pre-filled, read-only) */}
                            <div>
                                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        value={invite.email}
                                        disabled
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
                                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-[13px] text-rose-600 font-medium">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#166FBB] text-white font-bold text-[14px] rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</>
                                ) : (
                                    <>Sign In & Accept Invitation <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>

                            <p className="text-center text-[12px] text-slate-500">
                                New to NobleInvoice?{' '}
                                <button type="button" onClick={() => { setStatus('new_user'); setError(''); }} className="text-[#166FBB] font-bold hover:underline">
                                    Create an account
                                </button>
                            </p>
                        </form>
                    </div>
                )}

                {/* Footer */}
                <p className="text-center text-[12px] text-slate-400 mt-6">
                    © 2026 NobleInvoice. All rights reserved.
                </p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Outer export — wrapped in Suspense for useSearchParams
// ─────────────────────────────────────────────────────────────────────────────
export default function InvitePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#166FBB] animate-spin" />
            </div>
        }>
            <InvitePageInner />
        </Suspense>
    );
}
