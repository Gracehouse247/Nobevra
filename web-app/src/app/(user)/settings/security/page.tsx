'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { KeyRound, LogOut, ShieldAlert, Loader2, Eye, EyeOff, Trash2, AlertTriangle, ShieldCheck, Lock, Smartphone, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import axios from 'axios';
import MfaEnrollmentModal from '@/components/auth/MfaEnrollmentModal';

export default function SecuritySettingsPage() {
    const { user, logout } = useAuth();
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);
    
    const [showMfaModal, setShowMfaModal] = useState(false);
    const [mfaStatus, setMfaStatus] = useState<'none' | 'totp' | 'passkey'>('none');
    const [mfaFactors, setMfaFactors] = useState<any[]>([]);
    const [loadingPasskey, setLoadingPasskey] = useState(false);

    React.useEffect(() => {
        loadMfaStatus();
    }, []);

    const loadMfaStatus = async () => {
        try {
            const { data, error } = await supabase.auth.mfa.listFactors();
            if (error) throw error;
            if (data && data.totp) {
                const verifiedTotp = data.totp.find((f: any) => f.status === 'verified');
                if (verifiedTotp) {
                    setMfaStatus('totp');
                    setMfaFactors(data.totp);
                    return;
                }
            }
            // Passkeys are treated uniquely or listed in factors depending on Supabase version
            setMfaStatus('none');
            setMfaFactors([]);
        } catch (e) {
            console.error('Failed to load MFA status', e);
        }
    };

    const handleUnenrollMfa = async () => {
        try {
            for (const factor of mfaFactors) {
                if (factor.status === 'verified') {
                    await supabase.auth.mfa.unenroll({ factorId: factor.id });
                }
            }
            toast.success('Two-Factor Authentication disabled.');
            loadMfaStatus();
        } catch (error) {
            toast.error('Failed to disable MFA.');
        }
    };

    const handleRegisterPasskey = async () => {
        setLoadingPasskey(true);
        try {
            // Check if WebAuthn is supported by this browser
            if (!window.PublicKeyCredential) {
                toast.error('Passkeys are not supported by your browser. Try Chrome, Safari, or Edge.');
                return;
            }

            // Supabase uses 'webauthn' as the factor type for Passkeys.
            // This triggers the browser's native biometric/passkey UI (Touch ID, Face ID, Windows Hello).
            // @ts-ignore - experimental API
            const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'webauthn' });
            
            if (error) throw error;

            // For WebAuthn, Supabase returns a challenge that must be completed
            // The browser's native dialog handles user interaction automatically.
            toast.success('Passkey registered successfully! You can now sign in with biometrics.');
            loadMfaStatus();
        } catch (error: any) {
            console.error('Passkey enroll error:', error);
            if (error.message?.includes('webauthn') || error.message?.includes('not supported')) {
                toast.error('Passkeys require HTTPS and a compatible device. Try using a modern browser or device with biometrics.');
            } else if (error.name === 'NotAllowedError') {
                toast.error('Passkey registration was cancelled or timed out.');
            } else {
                toast.error(error.message || 'Passkey enrollment failed. Please try again.');
            }
        } finally {
            setLoadingPasskey(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.email) {
            toast.error('No email-based account found.');
            return;
        }

        if (passwordData.new.length < 8) {
            toast.error('New password must be at least 8 characters.');
            return;
        }
        if (passwordData.new !== passwordData.confirm) {
            toast.error('New passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            // First, re-authenticate to verify current password
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: passwordData.current
            });

            if (signInError) {
                toast.error('Current password is incorrect.');
                setLoading(false);
                return;
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: passwordData.new
            });

            if (updateError) {
                throw updateError;
            }

            setPasswordData({ current: '', new: '', confirm: '' });
            toast.success('Password updated successfully!');
        } catch (error: any) {
            toast.error('Password update failed. Please try again.');
            console.error('Password update error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE') {
            toast.error('Please type DELETE to confirm.');
            return;
        }

        setDeleting(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                toast.error('Session expired. Please log in again.');
                return;
            }

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/schedule-account-deletion`,
                {},
                { headers: { Authorization: `Bearer ${session.access_token}` } }
            );

            toast.success('Your account has been scheduled for permanent deletion and you have been logged out.');
            await logout();
            window.location.href = '/login';
        } catch (err) {
            toast.error('An error occurred. Please try again.');
            console.error('Delete account error:', err);
        } finally {
            setDeleting(false);
        }
    };

    const isEmailProvider = user?.app_metadata?.providers?.includes('email');

    return (
        <div className="max-w-[900px] text-slate-800 dark:text-slate-100 pb-16">
            {/* Header Section */}
            <div className="flex items-center gap-5 mb-10">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-[#166FBB] dark:text-[#01A0E2]" strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-[19px] font-black text-noble-text tracking-tight">
                        Access & Security
                    </h1>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Manage passwords and active sessions to keep your account secure.
                    </p>
                </div>
            </div>

            {!isEmailProvider ? (
                <div className="p-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-3xl shadow-sm mb-10">
                    <p className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-2 uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" /> Social Sign-In Account
                    </p>
                    <p className="text-[13px] text-slate-600 dark:text-slate-400 font-medium mt-2 leading-relaxed">
                        Your account is linked via Google or another OAuth provider. Password management is handled by your provider and cannot be changed here.
                    </p>
                </div>
            ) : (
                <form onSubmit={handlePasswordUpdate} className="mb-10">
                    <h2 className="text-[16px] font-black text-noble-text mb-4 px-1">Password</h2>
                    
                    <div className="bg-noble-surface dark:bg-noble-card rounded-[24px] border border-noble-border shadow-sm overflow-hidden">
                        {/* Current Password Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 dark:border-noble-border gap-4">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl shrink-0">
                                    <Lock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">Current Password</p>
                                    <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Your current password last changed on Jun 10, 2026.</p>
                                </div>
                            </div>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                placeholder="Change Password"
                                value={passwordData.current}
                                onChange={e => setPasswordData(p => ({ ...p, current: e.target.value }))}
                                className="w-full md:w-[240px] px-4 py-2.5 text-[13px] font-medium border border-noble-border rounded-xl focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500 dark:text-slate-400 text-noble-text"
                                required
                            />
                        </div>

                        {/* New Password Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 dark:border-noble-border gap-4">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl shrink-0">
                                    <KeyRound className="w-5 h-5 text-emerald-500 dark:text-emerald-400" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">New Password (min 8 characters)</p>
                                    <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Use a strong password to keep your account secure.</p>
                                </div>
                            </div>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                placeholder="Set New Password"
                                value={passwordData.new}
                                onChange={e => setPasswordData(p => ({ ...p, new: e.target.value }))}
                                className="w-full md:w-[240px] px-4 py-2.5 text-[13px] font-medium border border-noble-border rounded-xl focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500 dark:text-slate-400 text-noble-text"
                                required
                            />
                        </div>

                        {/* Confirm Password Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 dark:border-noble-border gap-4">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">Confirm New Password</p>
                                    <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Re-enter your new password to confirm.</p>
                                </div>
                            </div>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={passwordData.confirm}
                                onChange={e => setPasswordData(p => ({ ...p, confirm: e.target.value }))}
                                className="w-full md:w-[240px] px-4 py-2.5 text-[13px] font-medium border border-noble-border rounded-xl focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500 dark:text-slate-400 text-noble-text"
                                required
                            />
                        </div>

                        {/* Footer Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-slate-50 dark:bg-[#0D1B2E]/50 gap-4">
                            <button
                                type="button"
                                onClick={() => setShowPasswords(v => !v)}
                                className="flex items-center gap-2 text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#166FBB] dark:hover:text-[#01A0E2] transition-colors"
                            >
                                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                Show password
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-6 py-2.5 bg-[#166FBB] hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>

                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-[12px] font-bold bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-4 py-2 rounded-xl">
                                <ShieldAlert className="w-4 h-4" /> Recommend strong password
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Two-Factor Authentication */}
            <div className="mb-10">
                <div className="mb-4 px-1 flex items-center justify-between">
                    <div>
                        <h2 className="text-[16px] font-black text-noble-text tracking-tight">Two-Factor Authentication (2FA)</h2>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    {mfaStatus === 'totp' && (
                        <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold flex items-center gap-1.5 border border-emerald-100 dark:border-emerald-500/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Enabled
                        </div>
                    )}
                </div>
                
                <div className="bg-noble-surface dark:bg-noble-card rounded-[24px] border border-noble-border shadow-sm overflow-hidden p-6 space-y-6">
                    
                    {/* Passkeys */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-noble-border">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl shrink-0">
                                <KeyRound className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                    Passkeys 
                                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-[10px] uppercase tracking-widest">Recommended</span>
                                </p>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Sign in securely using Touch ID, Face ID, or Windows Hello.</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRegisterPasskey}
                            disabled={loadingPasskey}
                            className="px-6 py-2.5 bg-noble-surface dark:bg-noble-card border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-2"
                        >
                            {loadingPasskey ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            Register Passkey
                        </button>
                    </div>

                    {/* Authenticator App */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl shrink-0">
                                <Smartphone className="w-5 h-5 text-[#166FBB] dark:text-[#01A0E2]" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">Authenticator App (TOTP)</p>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Use an app like Google Authenticator or Authy to generate one-time codes.</p>
                            </div>
                        </div>
                        {mfaStatus === 'totp' ? (
                            <button
                                type="button"
                                onClick={handleUnenrollMfa}
                                className="px-6 py-2.5 bg-noble-surface dark:bg-noble-card border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap"
                            >
                                Disable 2FA
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowMfaModal(true)}
                                className="px-6 py-2.5 bg-noble-surface dark:bg-noble-card border border-[#166FBB]/30 dark:border-[#01A0E2]/30 text-[#166FBB] dark:text-[#01A0E2] hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap"
                            >
                                Setup App
                            </button>
                        )}
                    </div>

                </div>
            </div>

            <MfaEnrollmentModal 
                isOpen={showMfaModal} 
                onClose={() => setShowMfaModal(false)}
                onSuccess={() => {
                    toast.success('Authenticator App successfully configured!');
                    loadMfaStatus();
                }}
            />

            {/* Danger Zone */}
            <div className="mb-10">
                <div className="mb-4 px-1">
                    <h2 className="text-[16px] font-black text-noble-text tracking-tight">Danger Zone</h2>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-1">Irreversible actions that affect your account and data.</p>
                </div>
                
                <div className="space-y-4">
                    {/* Global Sign Out */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-red-500/5 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20 rounded-[24px] gap-4">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-2xl shrink-0">
                                <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">Global Sign Out</p>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Disconnect your account from all currently active sessions and devices immediately.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => logout()}
                            className="w-full md:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[13px] font-bold transition-all shadow-sm whitespace-nowrap"
                        >
                            Sign Out Now
                        </button>
                    </div>

                    {/* Delete Account */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-red-500/5 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20 rounded-[24px] gap-4">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-2xl shrink-0">
                                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">Delete Account</p>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Permanently delete your account and all associated data. <span className="font-bold text-slate-700 dark:text-slate-200">This action is irreversible.</span></p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full md:w-auto px-6 py-2.5 bg-noble-surface dark:bg-noble-card border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Keep Account Secure Info Footer */}
            <div className="bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border rounded-[24px] p-5 flex items-start gap-4">
                <Info className="w-5 h-5 text-[#166FBB] dark:text-[#01A0E2] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                    <p className="text-[14px] font-bold text-slate-800 dark:text-slate-100">Keep your account secure</p>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Use a strong password, enable 2FA, and sign out from devices you don't recognize.</p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-noble-surface dark:bg-noble-card rounded-[32px] p-8 max-w-md w-full shadow-xl border border-slate-100 dark:border-noble-border animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-2xl text-red-600 dark:text-red-400 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-[18px] font-black text-noble-text tracking-tight">Delete Account</h3>
                                <p className="text-[12px] font-bold text-red-500 uppercase tracking-widest mt-0.5">This cannot be undone</p>
                            </div>
                        </div>

                        <p className="text-[14px] font-medium text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            This will permanently erase your Nobevra account, all invoices, clients, billing history, and brand data. 
                            <span className="font-bold text-noble-text"> Your data cannot be recovered after deletion.</span>
                        </p>

                        <div className="mb-6">
                            <label className="block text-[13px] font-bold text-slate-700 dark:text-slate-200 mb-2">
                                Type <span className="text-red-600 dark:text-red-400 select-none">DELETE</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={e => setDeleteConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="w-full bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border rounded-xl px-4 py-3 text-[14px] font-bold text-noble-text placeholder:text-slate-400 dark:text-slate-500 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950/30 transition-all"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }}
                                className="flex-1 py-3 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-[13px] font-bold transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleting || deleteConfirmText !== 'DELETE'}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[13px] font-bold disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                {deleting ? 'Deleting...' : 'Delete Forever'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

