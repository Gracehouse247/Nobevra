'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bug, Send, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ReportIssuePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        severity: 'low',
        description: '',
        reproSteps: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Bug report submitted! Our engineers are on it.');
            router.push('/support');
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 pb-32">
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-[#166FBB] transition-colors font-black text-[10px] uppercase tracking-widest mb-8"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Help Center
            </button>

            <div className="bg-noble-surface dark:bg-noble-card rounded-[32px] border border-[#E2E8F0] shadow-xl overflow-hidden">
                <div className="p-8 border-b border-[#E2E8F0] bg-red-50/30 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-xl shadow-red-500/20">
                        <Bug className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-noble-text">Report a Bug</h1>
                        <p className="text-sm font-bold text-[#64748B]">Help us perfect the Nobevra experience.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">What's happening?</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. Export button not responding on mobile"
                            className="w-full h-14 px-6 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-bold text-[#0F172A] focus:outline-none focus:border-red-500 transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">Severity Level</label>
                            <div className="flex gap-2">
                                {['low', 'medium', 'high', 'critical'].map(level => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setFormData({...formData, severity: level})}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                            formData.severity === level 
                                            ? 'bg-red-500 border-red-500 text-white shadow-lg' 
                                            : 'bg-noble-surface dark:bg-noble-card border-[#E2E8F0] text-[#64748B] hover:border-red-500/30'
                                        }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">Screenshots</label>
                            <button 
                                type="button"
                                className="w-full h-12 rounded-xl border border-dashed border-[#E2E8F0] bg-slate-50 dark:bg-[#0D1B2E] flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] transition-all"
                            >
                                <ImageIcon className="w-4 h-4" /> Add Images (Optional)
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">Detailed Description</label>
                        <textarea 
                            required
                            placeholder="Please explain what happened in detail..."
                            className="w-full h-32 p-6 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] focus:outline-none focus:border-red-500 transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">Steps to Reproduce</label>
                        <textarea 
                            placeholder="1. Click Invoices\n2. Select Template...\n3. Error occurs"
                            className="w-full h-32 p-6 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] focus:outline-none focus:border-red-500 transition-all resize-none"
                            value={formData.reproSteps}
                            onChange={(e) => setFormData({...formData, reproSteps: e.target.value})}
                        />
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-red-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-4 h-4" /> Submit Report
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="p-6 bg-red-50 border-t border-[#E2E8F0] flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <p className="text-[11px] font-bold text-red-700 leading-tight">
                        Critical bugs are prioritized. Our engineering team typically reviews high-priority reports within 4 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
