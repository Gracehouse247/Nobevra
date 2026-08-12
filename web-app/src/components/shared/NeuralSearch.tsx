'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, X, FileText, CheckCircle2, 
    Folder, Brain, Command, ArrowRight,
    Loader2, Sparkles, Hash
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SearchResult {
    id: string;
    title: string;
    type: 'task' | 'note' | 'project' | 'mindmap';
    path: string;
    subtitle?: string;
}

interface NeuralSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NeuralSearch({ isOpen, onClose }: NeuralSearchProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const performSearch = useCallback(async (text: string) => {
        if (!text || !user) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        try {
            // Supabase neural search stubbed out. Will implement semantic search later.
            setResults([]);
            setSelectedIndex(0);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    }, [user]);

    useEffect(() => {
        const timeoutId = setTimeout(() => performSearch(searchQuery), 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, performSearch]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
            } else if (e.key === 'Enter' && results[selectedIndex]) {
                e.preventDefault();
                handleSelect(results[selectedIndex]);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    const handleSelect = (result: SearchResult) => {
        router.push(result.path);
        onClose();
        setSearchQuery('');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[10vh] px-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -20 }}
                    className="relative w-full max-w-2xl bg-slate-900/40  glass-card rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden"
                >
                    <div className="relative p-6 border-b border-white/5 bg-noble-surface dark:bg-noble-card/5">
                        <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 text-[#006970]" />
                        <input 
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Neural search across goals, notes, and tasks..."
                            className="w-full bg-transparent border-none py-2 pl-12 pr-4 text-white text-lg font-bold font-manrope focus:ring-0 placeholder:text-slate-600 dark:text-slate-400 dark:text-slate-500"
                        />
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {isSearching ? (
                                <Loader2 className="w-4 h-4 text-[#006970] animate-spin" />
                            ) : (
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-noble-surface dark:bg-noble-card/5 rounded-lg border border-white/5">
                                    <Command className="w-3 h-3 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 dark:text-slate-500">ESC</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-3">
                        {results.length > 0 ? (
                            <div className="space-y-1">
                                {results.map((result, i) => (
                                    <div 
                                        key={result.id}
                                        onMouseEnter={() => setSelectedIndex(i)}
                                        onClick={() => handleSelect(result)}
                                        className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all group ${
                                            selectedIndex === i 
                                                ? 'bg-noble-surface dark:bg-noble-card/10 border border-white/5' 
                                                : 'hover:bg-noble-surface dark:bg-noble-card/5'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                result.type === 'task' ? 'bg-emerald-500/10 text-emerald-400' :
                                                result.type === 'note' ? 'bg-[#006970]/10 text-[#006970]' :
                                                'bg-amber-500/10 text-amber-400'
                                            }`}>
                                                {result.type === 'task' ? <CheckCircle2 className="w-5 h-5" /> :
                                                 result.type === 'note' ? <FileText className="w-5 h-5" /> :
                                                 <Folder className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white group-hover:text-[#006970] transition-colors uppercase tracking-tight">{result.title}</h4>
                                                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2 mt-0.5">
                                                    <span className="hidden group-hover:inline transition-all">Go to</span> {result.type} {result.subtitle && <><span className="opacity-20">•</span> {result.subtitle}</>}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className={`w-4 h-4 transition-all ${
                                            selectedIndex === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                                        } text-slate-500 dark:text-slate-400 dark:text-slate-500`} />
                                    </div>
                                ))}
                            </div>
                        ) : searchQuery && !isSearching ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                <Search className="w-10 h-10 text-slate-700 dark:text-slate-200" />
                                <div>
                                    <h3 className="text-white font-bold">No results found</h3>
                                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs mt-1">Try searching for a different keyword or category.</p>
                                </div>
                            </div>
                        ) : !searchQuery && (
                            <div className="p-3">
                                <p className="text-[10px] font-black text-slate-600 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-4">Workspace Navigation</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { label: 'My Roadmaps', icon: CheckCircle2, path: '/tasks' },
                                        { label: 'Project Architect', icon: Folder, path: '/projects' },
                                        { label: 'Neural Mastery', icon: Brain, path: '/mastery' }
                                    ].map((cat) => (
                                        <button 
                                            key={cat.label}
                                            onClick={() => { router.push(cat.path); onClose(); }}
                                            className="p-4 rounded-2xl bg-noble-surface dark:bg-noble-card/5 border border-white/5 hover:border-white/10 hover:bg-noble-surface dark:bg-noble-card/10 transition-all flex items-center gap-3 group"
                                        >
                                            <cat.icon className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors" />
                                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors uppercase tracking-tight">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-8 flex items-center justify-center gap-4 text-slate-700 dark:text-slate-200">
                                    <Sparkles className="w-4 h-4" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">NobleInvoice Neural Search</p>
                                    <Sparkles className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

