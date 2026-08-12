'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Puzzle, Link as LinkIcon, Check, ExternalLink, 
    ShieldCheck, Zap, Info, ChevronRight, Lock,
    Database, FileText, Layout
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import PremiumGate from '@/components/shared/PremiumGate';
import { toast } from 'react-hot-toast';

export default function IntegrationsPage() {
    const { user, userData } = useAuth();
    
    return (
        <div className="min-h-screen bg-[#F0F4F8] dark:bg-transparent dark:bg-[#060D1A] selection:bg-noble-blue/20 font-manrope relative overflow-hidden">
            {/* Ambient Background Mesh Gradients */}
            <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-noble-blue/10 blur-[150px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-electric-cyan/10 blur-[150px] rounded-full pointer-events-none z-0" />

            <main className="max-w-4xl mx-auto pt-10 pb-28 px-6 relative z-10">
                <div className="space-y-4 mb-14 text-slate-800 dark:text-slate-100">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noble-blue/10 border border-noble-blue/10 text-noble-blue text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <Puzzle className="w-3.5 h-3.5" />
                        Ecosystem Synchronizer
                    </motion.div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-noble-text" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                        Third-Party <span className="text-noble-blue">Integrations</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider text-xs max-w-xl leading-relaxed">
                        Connect your existing knowledge bases and workflow engines to NobleInvoice's core.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Coming Soon / More Integrations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SimpleIntegrationCard 
                            name="Slack" 
                            logo="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
                            status="Coming Soon"
                        />
                        <SimpleIntegrationCard 
                            name="Notion" 
                            logo="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                            status="Coming Soon"
                        />
                        <SimpleIntegrationCard 
                            name="Google Calendar" 
                            logo="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
                            status="Coming Soon"
                        />
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 shadow-sm flex gap-6 items-start">
                        <div className="p-3 bg-amber-100 rounded-2xl">
                            <Info className="w-6 h-6 text-amber-700" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider">A Note on Security</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide leading-relaxed">
                                NobleInvoice only requests the minimum necessary permissions to synchronize your data. We never store your third-party passwords. Your token is encrypted at rest using AES-256 standards.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactElement, title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="p-3 rounded-2xl bg-noble-surface dark:bg-noble-card/60 border border-white/60 h-min text-slate-400 dark:text-slate-500 shadow-sm">
                {React.cloneElement(icon, { className: 'w-4 h-4 text-noble-blue' } as any)}
            </div>
            <div>
                <h4 className="text-[10px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">{title}</h4>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide mt-1">{desc}</p>
            </div>
        </div>
    );
}

function SimpleIntegrationCard({ name, logo, status }: { name: string, logo: string, status: string }) {
    return (
        <div className="bg-noble-surface dark:bg-noble-card/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/60 flex items-center justify-between hover:border-noble-blue/30 transition-all group shadow-sm active:scale-98 cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-noble-surface dark:bg-noble-card p-2 shadow-sm border border-slate-100 dark:border-noble-border flex items-center justify-center">
                    <img src={logo} alt={name} className="w-full h-full object-contain" />
                </div>
                <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>{name}</h3>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">{status}</p>
                </div>
            </div>
            <div className="p-3 rounded-2xl bg-noble-surface dark:bg-noble-card/60 border border-white/60 text-slate-400 dark:text-slate-500 group-hover:text-noble-blue transition-all shadow-inner">
                {status === 'Live' ? <ChevronRight className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
        </div>
    );
}

