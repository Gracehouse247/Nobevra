'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, ShieldCheck, Smartphone, 
    Wifi, ArrowRight, X, Info
} from 'lucide-react';

interface NFCProvisioningModalProps {
    identityId: string;
    onClose: () => void;
}

export const NFCProvisioningModal = ({ identityId, onClose }: NFCProvisioningModalProps) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-lg bg-noble-surface rounded-[3rem] shadow-2xl overflow-hidden relative"
            >
                {/* Header */}
                <div className="p-10 bg-noble-blue text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-noble-surface/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                    
                    <div className="relative space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-noble-surface/20 flex items-center justify-center backdrop-blur-md">
                                <Wifi size={20} />
                            </div>
                            <h2 className="text-2xl font-bold font-montserrat tracking-tight">NFC Card Setup</h2>
                        </div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">Sync your physical card to your profile</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-10 space-y-8">
                    <div className="flex items-start gap-6">
                        <div className="w-14 h-14 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-noble-blue shrink-0">
                            <Smartphone size={28} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tap to Synchronize</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                To provision your physical NFC tag, ensure your mobile device's NFC reader is active. Tap the tag to the back of your phone to write the <span className="text-noble-blue font-bold">Noble Identity Node</span>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Link ID</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-noble-blue">{identityId.slice(0, 12)}...</span>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex gap-4">
                            <Info className="text-amber-600 shrink-0" size={18} />
                            <p className="text-xs text-amber-700 font-bold leading-relaxed uppercase tracking-wider">
                                Ensure your NFC tag is "NTAG213" or "NTAG215" compatible for high-fidelity cross-platform performance.
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.open(`https://nobleinvoice.ai/identity/${identityId}`, '_blank')}
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Preview Profile</span>
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="px-10 pb-10">
                    <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-[0.5em]">
                        <ShieldCheck size={14} />
                        Secure Identity
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
