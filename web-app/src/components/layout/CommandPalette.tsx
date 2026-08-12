'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LayoutDashboard, FileText, Users, MessageSquare, Settings, BarChart3, X, Command, CreditCard, Shield } from 'lucide-react';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on escape, handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Auto focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setSearch('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const navItems = [
        { title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', category: 'Navigation' },
        { title: 'Analytics Hub', icon: BarChart3, href: '/admin/analytics', category: 'Navigation' },
        { title: 'Content CMS', icon: FileText, href: '/admin/cms', category: 'Navigation' },
        { title: 'User Management', icon: Users, href: '/admin/users', category: 'Navigation' },
        { title: 'Support Inbox', icon: MessageSquare, href: '/admin/support', category: 'Navigation' },
        { title: 'System Settings', icon: Settings, href: '/admin/settings', category: 'Settings' },
        { title: 'Billing Configuration', icon: CreditCard, href: '/admin/settings?tab=billing', category: 'Settings' },
        { title: 'Security & Access', icon: Shield, href: '/admin/settings?tab=security', category: 'Settings' },
    ];

    const filteredItems = search 
        ? navItems.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
        : navItems;

    const navigateTo = (href: string) => {
        onClose();
        router.push(href);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 backdrop-blur-sm bg-slate-900/40 transition-opacity">
            {/* Backdrop click closer */}
            <div className="fixed inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-noble-surface dark:bg-noble-card rounded-2xl shadow-2xl border border-noble-border overflow-hidden flex flex-col max-h-[60vh] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-noble-border">
                    <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search for pages, settings, or users..." 
                        className="flex-1 bg-transparent text-noble-text placeholder:text-slate-400 dark:text-slate-500 text-lg focus:outline-none"
                    />
                    <div className="flex items-center gap-1 ml-3 shrink-0">
                        <kbd className="hidden sm:inline-block bg-slate-100 dark:bg-[#112030] border border-noble-border rounded px-2 py-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">ESC</kbd>
                        <button onClick={onClose} className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    {filteredItems.length === 0 ? (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500">
                            <Command className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                            <p className="text-sm font-medium">No results found for "{search}"</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {/* Grouping by category visually could be done here, but flat list is fine for now */}
                            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {search ? 'Search Results' : 'Suggested Suggestions'}
                            </div>
                            
                            {filteredItems.map((item, i) => (
                                <button 
                                    key={i}
                                    onClick={() => navigateTo(item.href)}
                                    className="w-full flex items-center px-3 py-3 rounded-xl hover:bg-[#f0fafa] group transition-colors text-left"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border flex items-center justify-center mr-3 group-hover:bg-noble-surface dark:bg-noble-card group-hover:border-[#006970]/30 transition-colors">
                                        <item.icon className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-500 group-hover:text-[#006970] transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#006970] transition-colors">{item.title}</div>
                                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{item.category}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="bg-slate-50 dark:bg-[#0D1B2E] px-4 py-3 border-t border-slate-100 dark:border-noble-border flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1.5"><kbd className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded px-1.5 py-0.5 font-sans">↑</kbd> <kbd className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded px-1.5 py-0.5 font-sans">↓</kbd> to navigate</span>
                    <span className="flex items-center gap-1.5"><kbd className="bg-noble-surface dark:bg-noble-card border border-noble-border rounded px-1.5 py-0.5 font-sans">↵</kbd> to select</span>
                </div>
            </div>
        </div>
    );
}
