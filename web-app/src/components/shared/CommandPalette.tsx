'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
    Search, FileText, Users, CreditCard, 
    Settings, Plus, Command, ArrowRight,
    Sparkles, Zap, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { invoiceService, teamService } from '@/lib/services/supabaseService';
import { useCurrency } from '@/context/CurrencyContext';
import { toast } from 'react-hot-toast';

const COMMANDS = [
    { id: 'new-invoice', title: 'Create New Invoice', icon: Plus, category: 'Actions', shortcut: 'N', href: '/invoices/new' },
    { id: 'add-client', title: 'Add New Client', icon: Users, category: 'Actions', shortcut: 'C', href: '/clients' },
    { id: 'view-invoices', title: 'View Invoices', icon: FileText, category: 'Navigation', href: '/invoices' },
    { id: 'view-wallet', title: 'Financial Overview', icon: CreditCard, category: 'Navigation', href: '/wallet' },
    { id: 'view-products', title: 'Products & Services', icon: Package, category: 'Navigation', href: '/products' },
    { id: 'settings', title: 'System Settings', icon: Settings, category: 'Management', href: '/settings' },
];

interface CommandPaletteProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function CommandPalette({ isOpen: controlledIsOpen, onClose: controlledOnClose }: CommandPaletteProps) {
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
    const setIsOpen = controlledIsOpen !== undefined ? () => {} : setLocalIsOpen;

    const { user } = useAuth();
    const { currencyCode } = useCurrency();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const filteredCommands = COMMANDS.filter(cmd => 
        cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const closePalette = useCallback(() => {
        if (controlledOnClose) {
            controlledOnClose();
        } else {
            setLocalIsOpen(false);
        }
        setSearchQuery('');
        setSelectedIndex(0);
    }, [controlledOnClose]);

    const handleExecuteCommand = useCallback(async (cmd: typeof COMMANDS[0]) => {
        if (cmd.id === 'new-invoice') {
            if (!user) {
                toast.error('You must be logged in to create an invoice');
                return;
            }
            try {
                toast.loading('Creating draft invoice...', { id: 'create-draft-inv' });
                
                // Get team details to find correct team ID and preferred currency
                const tData = await teamService.getTeamByUserId(user.id);
                const teamId = tData?.id || user.id;
                const currency = (tData as any)?.preferred_currency || currencyCode;
                
                const draftInvoice = await invoiceService.createInvoice({
                    user_id: user.id,
                    team_id: teamId,
                    invoice_number: `INV-DRAFT-${Date.now().toString().slice(-6)}`,
                    status: 'draft',
                    currency_code: currency,
                    items: []
                });
                
                toast.success('Draft invoice created!', { id: 'create-draft-inv' });
                closePalette();
                router.push(`/invoices/new?draftId=${draftInvoice.invoice_id}`);
            } catch (err: any) {
                console.error('Failed to create instant draft invoice:', err);
                toast.error('Failed to create draft invoice', { id: 'create-draft-inv' });
            }
        } else {
            router.push(cmd.href);
            closePalette();
        }
    }, [user, router, closePalette]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') closePalette();
            
            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const cmd = filteredCommands[selectedIndex];
                    if (cmd) {
                        handleExecuteCommand(cmd);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, handleExecuteCommand, closePalette]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                    {/* Backdrop with High-Fidelity Blur */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePalette}
                        className="absolute inset-0 bg-near-black/20 backdrop-blur-sm"
                    />

                    {/* Palette Container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-[32px] shadow-[0_50px_100px_-20px_rgba(5,11,26,0.3)] border border-white overflow-hidden"
                    >
                        {/* Search Input Area */}
                        <div className="p-6 border-b border-near-black/[0.05] flex items-center gap-4">
                            <Search className="w-6 h-6 text-noble-blue animate-pulse" />
                            <input 
                                autoFocus
                                type="text"
                                placeholder="What would you like to execute?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-xl font-black text-near-black placeholder:text-near-black/20 outline-none"
                            />
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">
                                <span className="text-[10px] font-black text-slate-400">ESC</span>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {filteredCommands.length > 0 ? (
                                <div className="space-y-6">
                                    {/* Categorized Groups */}
                                    {['Actions', 'Navigation', 'Management'].map(category => {
                                        const catCmds = filteredCommands.filter(c => c.category === category);
                                        if (catCmds.length === 0) return null;

                                        return (
                                            <div key={category} className="space-y-2">
                                                <h4 className="px-4 text-[10px] font-black text-noble-blue uppercase tracking-[0.2em] opacity-50">{category}</h4>
                                                <div className="space-y-1">
                                                    {catCmds.map((cmd) => {
                                                        const globalIndex = filteredCommands.indexOf(cmd);
                                                        const isSelected = selectedIndex === globalIndex;

                                                        return (
                                                            <button
                                                                key={cmd.id}
                                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                                onClick={() => {
                                                                    handleExecuteCommand(cmd);
                                                                }}
                                                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                                                                    isSelected 
                                                                    ? 'bg-near-black text-white shadow-xl translate-x-2' 
                                                                    : 'hover:bg-slate-50 text-near-black/60'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                                                        isSelected ? 'bg-white/10 text-white' : 'bg-noble-blue/5 text-noble-blue'
                                                                    }`}>
                                                                        <cmd.icon size={20} />
                                                                    </div>
                                                                    <div className="text-left">
                                                                        <div className={`text-sm font-black tracking-tight ${isSelected ? 'text-white' : 'text-near-black'}`}>
                                                                            {cmd.title}
                                                                        </div>
                                                                        <div className={`text-[10px] font-bold opacity-60 ${isSelected ? 'text-white/60' : ''}`}>
                                                                            Noble System {cmd.category}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {cmd.shortcut && (
                                                                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-colors ${
                                                                        isSelected ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-400'
                                                                    }`}>
                                                                        <Command size={10} />
                                                                        <span className="text-[10px] font-black">{cmd.shortcut}</span>
                                                                    </div>
                                                                )}
                                                                {isSelected && (
                                                                    <motion.div layoutId="arrow">
                                                                        <ArrowRight className="w-4 h-4 text-electric-cyan" />
                                                                    </motion.div>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <Zap className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <p className="text-sm font-black text-near-black/30 uppercase tracking-widest">No executable found</p>
                                </div>
                            )}
                        </div>

                        {/* Footer / Tip Area */}
                        <div className="p-6 bg-near-black/[0.02] border-t border-near-black/[0.05] flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-[9px] font-black text-slate-400">↑↓</div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Navigate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-[9px] font-black text-slate-400">ENTER</div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Execute</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-noble-blue">
                                <Sparkles size={14} className="animate-spin-slow" />
                                <span className="text-[10px] font-black uppercase tracking-widest">AI Enabled</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
