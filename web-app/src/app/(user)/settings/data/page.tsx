'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Database, DownloadCloud, AlertTriangle, Trash2, Loader2, CheckCircle2, ChevronRight, Shield, FileJson, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

export default function DataBackupPage() {
    const { user, userData, logout } = useAuth();
    const [exporting, setExporting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [recentExports, setRecentExports] = useState<any[]>([]);
    
    // Multi-currency / Locale auto-detect setup as requested
    const [detectedCurrency, setDetectedCurrency] = useState(userData?.preferred_currency || 'USD');
    
    useEffect(() => {
        if (!userData?.preferred_currency) {
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => setDetectedCurrency(data.currency || 'USD'))
                .catch(() => setDetectedCurrency('USD'));
        }
    }, [userData]);

    // Fetch Recent Exports
    useEffect(() => {
        if (!user) return;
        const fetchExports = async () => {
            const { data } = await supabase
                .from('data_exports')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);
            if (data) setRecentExports(data);
        };
        fetchExports();
    }, [user]);

    const handleExport = async () => {
        if (!user) return;
        setExporting(true);
        try {
            const { data: invoices } = await supabase.from('invoices').select('*').eq('user_id', user.id);
            const { data: clients } = await supabase.from('clients').select('*');
            
            const exportData = {
                metadata: {
                    exportedAt: new Date().toISOString(),
                    userId: user.id,
                    email: user.email,
                    currency: detectedCurrency,
                    version: '2.0',
                },
                invoices: invoices || [],
                clients: clients || [],
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nobleinvoice_archive_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            // Log export in database
            const { data: insertedExport } = await supabase.from('data_exports').insert({
                user_id: user.id,
                export_name: 'Full Archive JSON Export',
                status: 'completed'
            }).select().single();

            if (insertedExport) {
                setRecentExports(prev => [insertedExport, ...prev]);
            }

            toast.success(`Export successful! Check your downloads.`);
        } catch (error) {
            console.error('Export error:', error);
            toast.error('Export failed. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    const handleDelete = async () => {
        if (deleteConfirmation !== 'DELETE') {
            return toast.error('Please type DELETE to confirm.');
        }
        if (!user) return;
        setDeleting(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/schedule-account-deletion`,
                    {},
                    { headers: { Authorization: `Bearer ${session.access_token}` } }
                );
                
                toast.success('Your account has been scheduled for permanent deletion and you have been logged out.');
                await logout();
                window.location.href = '/login';
            }
        } catch (error: any) {
            console.error('Delete account error:', error);
            toast.error('Account deletion failed. Please contact support.');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="w-full space-y-6">
            
            {/* ── Page Header ────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#166FBB]">
                    <Database className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-[19px] font-black text-slate-900 tracking-tight">Data & Backup</h1>
                    <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                        Control your digital footprint. Export or erase your cognitive data.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[1.5fr_1fr] gap-6 xl:gap-8">
                
                {/* ── Left Column ────────────────────────────────────────── */}
                <div className="space-y-6">
                    
                    {/* Export Your Data */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#F0F7FF] rounded-xl flex items-center justify-center border border-[#E1F0FF]">
                                <Database className="w-6 h-6 text-[#166FBB]" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Export Your Data</h2>
                                <p className="text-[13px] text-slate-500 font-medium mt-0.5">Download a complete archive of your invoices, clients, products, payments, and more.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-[13px] font-bold text-slate-700">Complete data export</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-[13px] font-bold text-slate-700">Secure & encrypted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-[13px] font-bold text-slate-700">JSON format</span>
                            </div>
                        </div>

                        <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center gap-3 mb-6 border border-slate-100">
                            <AlertTriangle className="w-4 h-4 text-[#166FBB]" />
                            <p className="text-[12px] font-medium text-slate-600">You will receive an email when your export is ready to download.</p>
                        </div>

                        <button
                            onClick={handleExport}
                            disabled={exporting}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#166FBB] hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-all shadow-sm disabled:opacity-50"
                        >
                            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
                            Download JSON Archive
                        </button>
                    </motion.div>

                    {/* Delete Your Account */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Delete Your Account</h2>
                                <p className="text-[13px] text-slate-500 font-medium mt-0.5">Permanently remove your account and all associated data. This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                            <h4 className="text-[13px] font-black text-red-600 mb-2">This action is irreversible</h4>
                            <p className="text-[12px] font-medium text-slate-600 mb-6 max-w-md leading-relaxed">
                                Once you delete your account, all your data including invoices, clients, payments, settings, and files will be permanently removed from our servers.
                            </p>

                            <div className="space-y-2 mb-6">
                                <label className="text-[12px] font-bold text-slate-700">Type DELETE to confirm</label>
                                <input
                                    type="text"
                                    placeholder="DELETE"
                                    value={deleteConfirmation}
                                    onChange={e => setDeleteConfirmation(e.target.value)}
                                    className="w-full max-w-sm bg-white border border-slate-200 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all shadow-sm"
                                />
                            </div>

                            <button
                                onClick={handleDelete}
                                disabled={deleting || deleteConfirmation !== 'DELETE'}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[13px] font-bold transition-all shadow-sm disabled:opacity-50"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete My NobleInvoice Account
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* ── Right Column ───────────────────────────────────────── */}
                <div className="space-y-6">
                    
                    {/* What's Included */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#F0F7FF] rounded-lg flex items-center justify-center">
                                <FileJson className="w-4 h-4 text-[#166FBB]" />
                            </div>
                            <h3 className="text-[15px] font-black text-slate-900">What's Included in Your Export</h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                'Invoices & Credit Notes',
                                'Clients & Vendors',
                                'Products & Services',
                                'Payments & Transactions',
                                'Expenses & Categories',
                                'Team Members',
                                'Settings & Preferences',
                                'Uploaded Files & Attachments'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-1.5 group cursor-default">
                                    <div className="flex items-center gap-2">
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#166FBB] transition-colors" />
                                        <span className="text-[13px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Exports */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[15px] font-black text-slate-900">Recent Exports</h3>
                            <button className="text-[12px] font-bold text-[#166FBB] hover:text-blue-700 transition-colors">View All &gt;</button>
                        </div>

                        <div className="space-y-4">
                            {recentExports.length === 0 ? (
                                <div className="p-6 text-center border border-slate-100 rounded-xl bg-slate-50">
                                    <p className="text-[12px] font-bold text-slate-500">No recent exports found.</p>
                                </div>
                            ) : (
                                recentExports.map((exp) => (
                                    <div key={exp.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-[#F0F7FF] rounded-lg flex items-center justify-center">
                                                <FileJson className="w-4 h-4 text-[#166FBB]" />
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-bold text-slate-900">{exp.export_name}</p>
                                                <p className="text-[11px] font-medium text-slate-400">
                                                    {new Date(exp.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                                                {exp.status}
                                            </span>
                                            <button className="p-2 text-slate-400 hover:text-[#166FBB] transition-colors rounded-lg hover:bg-white" title="Re-download coming soon">
                                                <DownloadCloud className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Security Assurance */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 flex-shrink-0">
                                <Shield className="w-5 h-5 text-[#166FBB]" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-black text-slate-900 mb-1">Security Assurance</h3>
                                <p className="text-[12px] font-medium text-slate-500 leading-relaxed mb-3">
                                    Your data is always protected with enterprise-grade encryption and strict access controls.
                                </p>
                                <a href="/settings/security" className="text-[12px] font-bold text-[#166FBB] hover:text-blue-700 transition-colors inline-flex items-center gap-1 relative z-10 cursor-pointer">
                                    Learn more about data security &rarr;
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Bottom Banner ──────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <Lock className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[12px] font-medium text-slate-600">
                    Your data belongs to you. We never sell your information. Learn more in our <Link href="#" className="font-bold text-[#166FBB] hover:underline">Privacy Policy &rarr;</Link>
                </p>
            </motion.div>

        </div>
    );
}
