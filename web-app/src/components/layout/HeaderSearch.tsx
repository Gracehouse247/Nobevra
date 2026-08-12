'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, FileText, Loader2, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { invoiceService } from '@/lib/services/supabaseService';
import { useRouter } from 'next/navigation';

interface SearchResult {
    id: string;
    title: string;
    type: 'invoice';
    path: string;
    subtitle?: string;
}

export default function HeaderSearch() {
    const { user, userData } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const performSearch = useCallback(async (text: string) => {
        if (!text || !user || !user.id) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const lowerText = text.toLowerCase();
            const invoices = await invoiceService.getInvoices(user.id);
            const filteredInvoices = invoices
                .filter(inv => inv.invoice_number.toLowerCase().includes(lowerText) || inv.clients?.name.toLowerCase().includes(lowerText))
                .slice(0, 5)
                .map(inv => ({
                    id: inv.id,
                    title: `Invoice #${inv.invoice_number}`,
                    type: 'invoice',
                    path: `/invoices`,
                    subtitle: inv.clients?.name || 'Unknown Client'
                } as SearchResult));

            setResults(filteredInvoices);
            setSelectedIndex(0);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    }, [user, userData]);

    useEffect(() => {
        const timeoutId = setTimeout(() => performSearch(searchQuery), 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, performSearch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    const handleSelect = (result: SearchResult) => {
        router.push(result.path);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noble-muted group-hover:text-noble-text transition-colors" />
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value) setIsOpen(true);
                    }}
                    onFocus={() => {
                        if (searchQuery) setIsOpen(true);
                    }}
                    placeholder="Quick Find Invoices, clients..."
                    className="w-full bg-transparent border border-noble-border hover:border-noble-border-hover focus:border-noble-primary text-sm text-noble-text rounded-full py-2.5 pl-11 pr-12 focus:outline-none focus:ring-4 focus:ring-noble-primary/10 transition-all placeholder:text-noble-muted font-medium shadow-inner"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                    {isSearching ? (
                        <Loader2 className="w-4 h-4 text-noble-primary animate-spin" />
                    ) : (
                        <div className="flex items-center justify-center bg-noble-interactive-bg border border-noble-border px-1.5 py-0.5 rounded shadow-sm group-hover:bg-noble-border-hover transition-colors">
                            <span className="text-[10px] font-medium tracking-tighter text-noble-muted group-hover:text-noble-text">⌘K</span>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && searchQuery && (
                    <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-noble-surface dark:bg-noble-card rounded-xl border border-[#E2E8F0] shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto"
                    >
                        {results.length > 0 ? (
                            <div className="p-2 space-y-1">
                                {results.map((result, i) => (
                                    <div 
                                        key={result.id}
                                        onMouseEnter={() => setSelectedIndex(i)}
                                        onClick={() => handleSelect(result)}
                                        className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all group ${
                                            selectedIndex === i 
                                                ? 'bg-[#F8FAFC] dark:bg-[#060D1A]' 
                                                : 'hover:bg-[#F8FAFC] dark:bg-[#060D1A]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f0fafa] text-[#006970]">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-tight">{result.title}</h4>
                                                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                                    {result.type} {result.subtitle && <><span className="opacity-40">•</span> {result.subtitle}</>}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className={`w-3 h-3 transition-all ${
                                            selectedIndex === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                                        } text-[#166FBB]`} />
                                    </div>
                                ))}
                            </div>
                        ) : !isSearching ? (
                            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 opacity-70">
                                <Search className="w-8 h-8 text-[#94A3B8]" />
                                <div>
                                    <h3 className="text-[#0F172A] font-bold text-sm">No results found</h3>
                                    <p className="text-[#64748B] text-xs mt-0.5">Try a different keyword.</p>
                                </div>
                            </div>
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
