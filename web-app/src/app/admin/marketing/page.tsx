'use client';

import React, { useState, useEffect } from 'react';
import { Send, Users, Edit3, Image as ImageIcon, Loader2, CheckCircle2, Eye } from 'lucide-react';
import { cmsApi } from '@/lib/cmsApi';
import { supabase } from '@/lib/supabase';

export default function MarketingBroadcastPage() {
    const [subject, setSubject] = useState('');
    const [htmlBody, setHtmlBody] = useState('');
    const [sending, setSending] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

    // Fetch real active subscriber count from profiles
    useEffect(() => {
        const fetchCount = async () => {
            const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('subscription_status', 'active');
            setSubscriberCount(count ?? 0);
        };
        fetchCount();
    }, []);

    const handleSend = async () => {
        if (!subject.trim() || !htmlBody.trim()) {
            setErrorMsg('Subject and body are required.');
            return;
        }
        
        if (!confirm('Are you sure you want to broadcast this message to ALL active subscribers?')) return;

        setSending(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const res = await cmsApi.sendBroadcast({
                subject,
                htmlBody,
                plainText: subject // fallback
            });
            setSuccessMsg(`Broadcast sent successfully to ${res.data.sentCount} subscribers!`);
            setSubject('');
            setHtmlBody('');
        } catch (err: unknown) {
            const msg = err instanceof Error
                ? err.message
                : (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to send broadcast.';
            setErrorMsg(msg);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Email Broadcast</h1>
                        <p className="text-slate-500 font-medium">Compose and send updates to your subscriber list.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl flex items-center gap-3 text-sm font-bold text-[#006970] shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Users className="w-5 h-5" />
                            {subscriberCount === null ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                `${subscriberCount.toLocaleString()} Active Subscribers`
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Composer */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Edit3 className="w-5 h-5 text-[#006970]" />
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Composer</h2>
                        </div>
                        
                        {successMsg && (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl flex items-center gap-3 text-sm font-bold">
                                <CheckCircle2 className="w-5 h-5" />
                                {successMsg}
                            </div>
                        )}
                        {errorMsg && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-sm font-bold">
                                {errorMsg}
                            </div>
                        )}

                        <div>
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 block ml-1">Subject Line</label>
                            <input 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. Announcing new features..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970] transition-all font-medium"
                            />
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Email Body (HTML)</label>
                                <span className="text-[11px] font-bold text-[#006970] uppercase tracking-widest bg-[#f0fafa] px-2.5 py-1 rounded-full">Supports {`{name}`}</span>
                            </div>
                            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col min-h-[400px]">
                                {/* Simple toolbar mock */}
                                <div className="flex items-center gap-2 p-3 border-b border-slate-200 bg-white">
                                    <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"><Edit3 className="w-4 h-4" /></button>
                                    <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"><ImageIcon className="w-4 h-4" /></button>
                                </div>
                                <textarea 
                                    value={htmlBody}
                                    onChange={(e) => setHtmlBody(e.target.value)}
                                    placeholder="<p>Write your HTML email here...</p>"
                                    className="flex-1 p-5 bg-transparent text-slate-700 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button 
                                onClick={handleSend}
                                disabled={sending}
                                className="bg-[#006970] hover:bg-[#005a60] text-white font-bold rounded-xl shadow-sm px-8 py-3 flex items-center gap-2 transition-all disabled:opacity-50"
                            >
                                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                Broadcast Now
                            </button>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
                            <Eye className="w-5 h-5 text-[#006970]" />
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Live Preview</h2>
                        </div>
                        <div className="p-8 flex-1 bg-slate-50/50 flex justify-center">
                            {/* Email Client Mockup */}
                            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
                                {/* Email Header */}
                                <div className="p-5 border-b border-slate-100 bg-white space-y-3">
                                    <div>
                                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Subject</div>
                                        <div className="font-semibold text-slate-900">
                                            {subject || <span className="text-slate-400 italic">No subject...</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="w-10 h-10 bg-[#e0f5f5] text-[#006970] rounded-full flex items-center justify-center font-bold text-lg">
                                            N
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Nobevra</div>
                                            <div className="text-xs text-slate-500 font-medium">to {`{name}`}</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Email Body */}
                                <div className="p-6 overflow-y-auto flex-1 text-slate-800 prose prose-sm prose-slate"
                                     dangerouslySetInnerHTML={{ __html: htmlBody || '<p class="text-slate-400 italic">Your email content will appear here...</p>' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
