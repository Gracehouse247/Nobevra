'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    QrCode, Zap, UserPlus, Share2, 
    X, ShieldCheck, Star, Users, 
    MessageSquare, Smartphone, ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function EventModePage() {
    const router = useRouter();
    const [scanCount, setScanCount] = useState(0);
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    
    // Simulate real-time lead capture during event
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                const newLead = {
                    id: Date.now(),
                    name: ['Sarah Chen', 'Marcus Thorne', 'Elena Rodriguez'][Math.floor(Math.random() * 3)],
                    company: ['Quantum Systems', 'Thorne Capital', 'Horizon Design'][Math.floor(Math.random() * 3)],
                    time: 'Just now'
                };
                setRecentLeads(prev => [newLead, ...prev].slice(0, 3));
                setScanCount(prev => prev + 1);
                toast.success(`New Lead: ${newLead.name}`, {
                    icon: '🚀',
                    style: {
                        borderRadius: '20px',
                        background: '#050B1A',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                    }
                });
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050B1A] text-white selection:bg-noble-blue selection:text-white overflow-hidden flex flex-col">
            {/* Event Mode Header */}
            <header className="p-6 flex items-center justify-between border-b border-white/5 bg-noble-surface dark:bg-noble-card/[0.02] backdrop-blur-xl">
                <Link href="/networking" className="p-3 rounded-2xl bg-noble-surface dark:bg-noble-card/5 border border-white/10 hover:bg-noble-surface dark:bg-noble-card/10 transition-all">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex flex-col items-center">
                    <h1 className="text-sm font-black uppercase tracking-[0.4em]">Event <span className="text-noble-blue">Mode</span></h1>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[8px] font-black text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Broadcasting</span>
                    </div>
                </div>
                <div className="w-10" /> {/* Spacer */}
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
                
                {/* Massive QR Central Node */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                >
                    <div className="absolute -inset-12 bg-noble-blue/20 blur-[100px] rounded-full animate-pulse" />
                    
                    <div className="relative p-10 rounded-[4rem] bg-noble-surface dark:bg-noble-card shadow-[0_0_80px_rgba(22,111,187,0.3)] border border-white/20">
                        <div className="relative group">
                            <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://nobevra.ai/identity/johndoe" 
                                alt="Event QR"
                                className="w-64 h-64 md:w-80 md:h-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 rounded-2xl bg-noble-surface dark:bg-noble-card shadow-2xl border border-slate-100 dark:border-noble-border flex items-center justify-center">
                                    <Zap className="text-noble-blue" size={32} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl bg-[#050B1A] border border-white/10 shadow-2xl flex items-center gap-3 whitespace-nowrap">
                        <Users size={16} className="text-noble-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{scanCount} Live Connections</span>
                    </div>
                </motion.div>

                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-black tracking-tighter uppercase">Scan to Connect</h2>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium max-w-xs mx-auto leading-relaxed">
                        Hold your phone up to the screen to instantly capture my professional identity and resume.
                    </p>
                </div>

                {/* Event Actions */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <button className="p-5 rounded-3xl bg-noble-surface dark:bg-noble-card/5 border border-white/10 flex flex-col items-center gap-3 hover:bg-noble-surface dark:bg-noble-card/10 transition-all">
                        <MessageSquare size={24} className="text-noble-blue" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Text Link</span>
                    </button>
                    <button className="p-5 rounded-3xl bg-noble-surface dark:bg-noble-card/5 border border-white/10 flex flex-col items-center gap-3 hover:bg-noble-surface dark:bg-noble-card/10 transition-all">
                        <Smartphone size={24} className="text-noble-blue" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Airdrop</span>
                    </button>
                </div>
            </main>

            {/* Live Lead Feed Footer */}
            <footer className="p-8 bg-noble-surface dark:bg-noble-card/[0.02] border-t border-white/5 backdrop-blur-2xl">
                <div className="max-w-sm mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 dark:text-slate-500">Live Lead Stream</h3>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-noble-blue rounded-full" />
                            <div className="w-1 h-1 bg-noble-blue/50 rounded-full" />
                            <div className="w-1 h-1 bg-noble-blue/20 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence>
                            {recentLeads.map(lead => (
                                <motion.div 
                                    key={lead.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-4 rounded-2xl bg-noble-surface dark:bg-noble-card/5 border border-white/5 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-noble-blue to-cyan-500 flex items-center justify-center text-[10px] font-black">
                                            {lead.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase">{lead.name}</p>
                                            <p className="text-[8px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase">{lead.company}</p>
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-noble-blue uppercase">{lead.time}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {recentLeads.length === 0 && (
                            <div className="py-8 text-center">
                                <p className="text-[8px] font-black text-slate-600 dark:text-slate-400 dark:text-slate-500 uppercase tracking-widest">Awaiting Connections...</p>
                            </div>
                        )}
                    </div>
                </div>
            </footer>

            {/* Floating Glows */}
            <div className="fixed top-1/2 left-0 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
        </div>
    );
}
