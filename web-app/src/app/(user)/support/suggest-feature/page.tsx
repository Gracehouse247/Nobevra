'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Lightbulb, Send, Star, Rocket } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SuggestFeaturePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'workflow',
        description: '',
        benefit: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Brilliant! Your suggestion has been added to our roadmap.');
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
                <div className="p-8 border-b border-[#E2E8F0] bg-amber-50/30 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                        <Lightbulb className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-noble-text">Suggest a Feature</h1>
                        <p className="text-sm font-bold text-[#64748B]">Shape the future of NobleInvoice with your ideas.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">Feature Title</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. AI-Powered Expense Categorization"
                            className="w-full h-14 px-6 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-bold text-[#0F172A] focus:outline-none focus:border-amber-500 transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {['workflow', 'design', 'analytics', 'automation', 'mobile'].map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormData({...formData, category: cat})}
                                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                        formData.category === cat 
                                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg' 
                                        : 'bg-noble-surface dark:bg-noble-card border-[#E2E8F0] text-[#64748B] hover:border-amber-500/30'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">What should this feature do?</label>
                        <textarea 
                            required
                            placeholder="Explain the functionality you're envisioning..."
                            className="w-full h-32 p-6 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] focus:outline-none focus:border-amber-500 transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em]">How would this benefit you/others?</label>
                        <textarea 
                            placeholder="Tell us how this improves your business operations..."
                            className="w-full h-32 p-6 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-2xl text-sm font-medium text-[#0F172A] focus:outline-none focus:border-amber-500 transition-all resize-none"
                            value={formData.benefit}
                            onChange={(e) => setFormData({...formData, benefit: e.target.value})}
                        />
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-amber-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Rocket className="w-4 h-4" /> Submit Idea
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="p-8 bg-slate-50 dark:bg-[#0D1B2E] border-t border-[#E2E8F0] flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-noble-surface dark:bg-noble-card flex items-center justify-center shadow-sm">
                        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-tight">
                        Our product team reviews every single suggestion. The most requested features are prioritized for our next release cycle.
                    </p>
                </div>
            </div>
        </div>
    );
}
