'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, MessageSquareHeart, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function RateAppPage() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => router.push('/dashboard'), 3000);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black/95 bg-[url('/img/grid.svg')] bg-center bg-fixed text-white flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-4 border-emerald-500/20">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                </div>
                <h1 className="text-3xl font-black tracking-tight">Transmission Received</h1>
                <p className="text-slate-400 dark:text-slate-500 max-w-sm">
                    Thank you for evolving Nobevra. Your feedback helps us recalibrate the cognitive engine.
                </p>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-8">Redirecting to Workspace...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black/95 bg-[url('/img/grid.svg')] bg-center bg-fixed text-white py-12 px-6 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full glass-card p-10 md:p-14 rounded-[3.5rem] border border-white/10 text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#006970]/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="space-y-4">
                    <div className="inline-flex p-4 bg-[#006970]/10 rounded-full mb-2">
                        <MessageSquareHeart className="w-10 h-10 text-[#006970]" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight leading-tight">Rate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-300">Cognitive Experience</span></h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium max-w-sm mx-auto">
                        How has Nobevra impacted your productivity and mental whitespace?
                    </p>
                </div>

                <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-125 focus:outline-none"
                        >
                            <Star 
                                className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-300 ${
                                    (hover || rating) >= star 
                                        ? 'fill-indigo-500 text-[#006970]' 
                                        : 'text-slate-700 dark:text-slate-200'
                                }`} 
                            />
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-lg mx-auto">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-[#006970] mb-3">Share Your Thoughts (Optional)</label>
                        <textarea 
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Tell us what you love or what we can optimize..."
                            className="w-full bg-black/30 border border-white/10 rounded-3xl px-6 py-5 text-sm text-white focus:outline-none focus:border-[#006970] transition-colors h-32 resize-none"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                         <button 
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 py-4 bg-noble-surface dark:bg-noble-card/5 hover:bg-noble-surface dark:bg-noble-card/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-white/5"
                        >
                            <ArrowLeft className="w-3 h-3" /> Go Back
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading || rating === 0}
                            className="flex-[2] py-4 bg-[#006970] hover:bg-[#006970] disabled:bg-[#006970]/50 disabled:text-white/50 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : 'Sychronize Feedback'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

