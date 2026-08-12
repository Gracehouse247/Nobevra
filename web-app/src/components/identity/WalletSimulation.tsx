'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Plus, Check, ShieldCheck, Zap, X, Wallet, Globe } from 'lucide-react';
import { IdentityData } from '@/types';
import { toast } from 'react-hot-toast';

interface WalletSimulationProps {
    data: IdentityData;
    onClose: () => void;
}

export const WalletSimulation: React.FC<WalletSimulationProps> = ({ data, onClose }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToWallet = () => {
        setIsAdding(true);
        // Simulate backend generation and signing
        setTimeout(() => {
            setIsAdding(false);
            setIsAdded(true);
            toast.success('Added to Apple Wallet');
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-noble-surface rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors z-50"
                >
                    <X size={20} />
                </button>

                {/* Header Area */}
                <div className="p-10 pb-6 space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-noble-blue flex items-center justify-center text-white">
                            <Wallet size={16} />
                        </div>
                        <h2 className="text-xl font-bold font-montserrat text-noble-text tracking-tight uppercase">Wallet Pass <span className="text-noble-blue italic">Preview</span></h2>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Digital Ecosystem Deployment</p>
                </div>

                {/* The Wallet Pass Preview */}
                <div className="px-10 py-6">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="relative aspect-[1.6/1] w-full bg-noble-blue rounded-3xl p-8 shadow-2xl shadow-noble-blue/30 overflow-hidden"
                    >
                        {/* Holographic Accents */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-noble-surface/10 blur-[80px] rounded-full -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 blur-[60px] rounded-full -ml-24 -mb-24" />
                        
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">Noble Identity</p>
                                    <p className="text-2xl font-bold font-montserrat text-white tracking-tighter">{data.fullName}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-noble-surface/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <ShieldCheck className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">Designation</p>
                                    <p className="text-sm font-bold text-white tracking-wide">{data.jobTitle}</p>
                                </div>
                                <div className="w-16 h-16 bg-noble-surface rounded-xl p-1.5 shadow-inner">
                                    {data.qrCodeUrl ? (
                                        <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrCodeUrl)}`} 
                                            alt="Sync QR" 
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-900/5 rounded-sm flex items-center justify-center">
                                            <Zap size={20} className="text-noble-blue animate-pulse" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Info & Actions */}
                <div className="p-10 pt-6 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="p-2 rounded-lg bg-noble-surface text-noble-blue shadow-sm">
                                <Plus size={16} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-noble-text uppercase">One-Tap Connection</p>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    Add your professional identity to Apple or Google Wallet for instant access during physical networking events.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            disabled={isAdding || isAdded}
                            onClick={handleAddToWallet}
                            className={`flex-[3] py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isAdded ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:scale-[1.02] active:scale-95'}`}
                        >
                            {isAdding ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Syncing...
                                </>
                            ) : isAdded ? (
                                <>
                                    <Check size={18} />
                                    Added
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Apple Wallet
                                </>
                            )}
                        </button>
                        <button 
                            className="flex-[2] py-5 rounded-2xl bg-noble-surface border border-noble-border text-noble-text font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                            aria-label="Add to Google Wallet"
                        >
                            <Globe size={18} className="text-blue-600" />
                            Google Wallet
                        </button>
                    </div>

                    <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                        Noble <span className="text-noble-blue">Vault</span> • Secure Identity Storage
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
