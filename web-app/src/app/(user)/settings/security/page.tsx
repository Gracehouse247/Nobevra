'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { KeyRound, LogOut, ShieldAlert, Loader2, Eye, EyeOff, Trash2, AlertTriangle, ShieldCheck, Lock, Smartphone, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import axios from 'axios';

export default function SecuritySettingsPage() {
    const { user, logout } = useAuth();
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);

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
        <div className="max-w-[900px] text-slate-800 pb-16">
            {/* Header Section */}
            <div className="flex items-center gap-5 mb-10">
                <div className="p-3.5 bg-blue-50 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-[#166FBB]" strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-[19px] font-black text-slate-900 tracking-tight">
                        Access & Security
                    </h1>
                    <p className="text-[13px] text-slate-500 font-medium mt-1">
                        Manage passwords and active sessions to keep your account secure.
                    </p>
                </div>
            </div>

            {!isEmailProvider ? (
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl shadow-sm mb-10">
                    <p className="text-xs font-black text-amber-700 flex items-center gap-2 uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" /> Social Sign-In Account
                    </p>
                    <p className="text-[13px] text-slate-600 font-medium mt-2 leading-relaxed">
                        Your account is linked via Google or another OAuth provider. Password management is handled by your provider and cannot be changed here.
                    </p>
                </div>
            ) : (
                <form onSubmit={handlePasswordUpdate} className="mb-10">
                    <h2 className="text-[16px] font-black text-slate-900 mb-4 px-1">Password</h2>
                    
                    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                        {/* Current Password Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 gap-4">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-cyan-50 rounded-2xl shrink-0">
                                    <Lock className="w-5 h-5 text-cyan-600" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800">Current Password</p>
                                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">Your current password last changed on Jun 10, 2026.</p>
                                </div>
                            </div>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                placeholder="Change Password"
                                value={passwordData.current}
                                onChange={e => setPasswordData(p => ({ ...p, current: e.target.value }))}
                                className="w-full md:w-[240px] px-4 py-2.5 text-[13px] font-medium border border-slate-200 rounded-xl focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500 text-slate-900"
                                required
                            />
                        </div>

                        {/* New Password Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 gap-4">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-emerald-50 rounded-2xl shrink-0">
                                    <KeyRound className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800">New Password (min 8 characters)</p>
                                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">Use a strong password to keep your account secure.</p>
                                </div>
                            </div>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                placeholder="Set New Password"
                                value={passwordData.new}
                                onChange={e => setPasswordData(p => ({ ...p, new: e.target.value }))}
                                className="w-full md:w-[240px] px-4 py-2.5 text-[13px] font-medium border border-slate-200 rounded-xl focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500 text-slate-900"
                                required
                            />
                        </div>

                        {/* Confirm Password Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-slate-100 gap-4">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-purple-50 rounded-2xl shrink-0">
                                    <ShieldCheck className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800">Confirm New Password</p>
                                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">Re-enter your new password to confirm.</p>
                                </div>
                            </div>
                            <input
                                type={showPasswords ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={passwordData.confirm}
                                onChange={e => setPasswordData(p => ({ ...p, confirm: e.target.value }))}
                                className="w-full md:w-[240px] px-4 py-2.5 text-[13px] font-medium border border-slate-200 rounded-xl focus:outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500 text-slate-900"
                                required
                            />
                        </div>

                        {/* Footer Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-slate-50/50 gap-4">
                            <button
                                type="button"
                                onClick={() => setShowPasswords(v => !v)}
                                className="flex items-center gap-2 text-[13px] font-bold text-slate-700 hover:text-[#166FBB] transition-colors"
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

                            <div className="flex items-center gap-2 text-amber-600 text-[12px] font-bold bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
                                <ShieldAlert className="w-4 h-4" /> Recommend strong password
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Two-Factor Authentication */}
            <div className="mb-10">
                <div className="mb-4 px-1">
                    <h2 className="text-[16px] font-black text-slate-900 tracking-tight">Two-Factor Authentication (2FA)</h2>
                    <p className="text-[13px] text-slate-500 font-medium mt-1">Add an extra layer of security to your account.</p>
                </div>
                
                <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-blue-50 rounded-2xl shrink-0">
                                <Smartphone className="w-5 h-5 text-[#166FBB]" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">Authenticator App</p>
                                <p className="text-[12px] text-slate-500 font-medium mt-0.5">Use an app like Google Authenticator or Authy to generate one-time codes.</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => toast.success('2FA configuration will be available in the next release.')}
                            className="px-6 py-2.5 bg-white border border-[#166FBB]/30 text-[#166FBB] hover:bg-blue-50 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap"
                        >
                            Enable 2FA
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mb-10">
                <div className="mb-4 px-1">
                    <h2 className="text-[16px] font-black text-slate-900 tracking-tight">Danger Zone</h2>
                    <p className="text-[13px] text-slate-500 font-medium mt-1">Irreversible actions that affect your account and data.</p>
                </div>
                
                <div className="space-y-4">
                    {/* Global Sign Out */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#FEF2F2] border border-red-100 rounded-[24px] gap-4">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-red-100 rounded-2xl shrink-0">
                                <LogOut className="w-5 h-5 text-red-600" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">Global Sign Out</p>
                                <p className="text-[12px] text-slate-500 font-medium mt-0.5">Disconnect your account from all currently active sessions and devices immediately.</p>
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#FEF2F2] border border-red-100 rounded-[24px] gap-4">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-red-100 rounded-2xl shrink-0">
                                <Trash2 className="w-5 h-5 text-red-600" strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800">Delete Account</p>
                                <p className="text-[12px] text-slate-500 font-medium mt-0.5">Permanently delete your account and all associated data. <span className="font-bold text-slate-700">This action is irreversible.</span></p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full md:w-auto px-6 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Keep Account Secure Info Footer */}
            <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-5 flex items-start gap-4">
                <Info className="w-5 h-5 text-[#166FBB] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                    <p className="text-[14px] font-bold text-slate-800">Keep your account secure</p>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">Use a strong password, enable 2FA, and sign out from devices you don't recognize.</p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-[18px] font-black text-slate-900 tracking-tight">Delete Account</h3>
                                <p className="text-[12px] font-bold text-red-500 uppercase tracking-widest mt-0.5">This cannot be undone</p>
                            </div>
                        </div>

                        <p className="text-[14px] font-medium text-slate-600 mb-6 leading-relaxed">
                            This will permanently erase your NobleInvoice account, all invoices, clients, billing history, and brand data. 
                            <span className="font-bold text-slate-900"> Your data cannot be recovered after deletion.</span>
                        </p>

                        <div className="mb-6">
                            <label className="block text-[13px] font-bold text-slate-700 mb-2">
                                Type <span className="text-red-600 select-none">DELETE</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={e => setDeleteConfirmText(e.target.value)}
                                placeholder="DELETE"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(''); }}
                                className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-[13px] font-bold transition-all"
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

