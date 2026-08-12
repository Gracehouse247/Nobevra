'use client';
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

interface Props {
    articleSlug: string;
    categorySlug: string;
}

export default function HelpRatingWidget({ articleSlug, categorySlug }: Props) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const submitRating = async (helpful: boolean) => {
        setStatus('loading');
        try {
            const res = await fetch('/api/help-rating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articleSlug, categorySlug, helpful }),
            });

            if (!res.ok) throw new Error('Failed to submit rating');
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="mt-12 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-emerald-700 font-bold text-sm">Thank you for your feedback! This helps us improve our Help Center.</span>
            </div>
        );
    }

    return (
        <div className="mt-12 py-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h4 className="font-bold text-near-black mb-1">Was this article helpful?</h4>
                <p className="text-sm text-slate-500">Your feedback helps us improve our support resources.</p>
                {status === 'error' && (
                    <p className="text-xs text-red-500 mt-2">Failed to submit feedback. Please try again.</p>
                )}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                    onClick={() => submitRating(true)}
                    disabled={status === 'loading'}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-noble-border hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 font-bold text-sm transition-all disabled:opacity-50"
                >
                    <ThumbsUp className="w-4 h-4" />
                    Yes, helpful
                </button>
                <button
                    onClick={() => submitRating(false)}
                    disabled={status === 'loading'}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-noble-border hover:border-red-200 hover:bg-red-50 hover:text-red-600 text-slate-600 font-bold text-sm transition-all disabled:opacity-50"
                >
                    <ThumbsDown className="w-4 h-4" />
                    Not really
                </button>
            </div>
        </div>
    );
}
