'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BusinessCardEngine } from '@/components/identity/BusinessCardEngine';
import { LeadCaptureForm } from '@/components/identity/LeadCaptureForm';
import { WalletSimulation } from '@/components/identity/WalletSimulation';
import { getTemplatesByType } from '@/lib/templates/templateRegistry';
import { IdentityData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, Download, Globe, UserPlus, 
    Zap, ArrowRight, Wallet, Contact, 
    MessageSquare, Share2, Users
} from 'lucide-react';
import { exportService } from '@/lib/services/exportService';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function IdentityProfilePage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IdentityData | null>(null);
    const [showWalletSim, setShowWalletSim] = useState(false);

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setData({
                fullName: 'John Doe',
                jobTitle: 'Principal Solutions Architect',
                companyName: 'Noble Dynamics',
                email: 'john@nobevra.noblesworld.com.ng',
                phone: '+234 800 NOBLE AI',
                website: 'www.nobevra.ai',
                bio: 'Specializing in agentic AI architectures and premium fintech experiences. Transforming how the world manages professional identity.',
                qrCodeUrl: `https://nobevra.ai/identity/${id}`,
                templateId: 'id-obsidian-glass',
                brandColor: '#06B6D4',
                layout: {
                    content: { x: 0, y: 0 },
                    logo: { x: 0, y: 0 },
                    qr: { x: 0, y: 0 }
                }
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-noble-blue rounded-full animate-spin" />
                    <p className="text-noble-blue font-black uppercase tracking-[0.3em] text-[10px]">Verifying Node...</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const identityTemplates = getTemplatesByType('identity');
    const template = identityTemplates.find(t => t.id === data.templateId) || identityTemplates[0];

    const socialLinks = [
        { icon: Globe, label: 'Website', value: data.website || '#', color: 'bg-noble-blue' },
        { icon: MessageSquare, label: 'LinkedIn', value: '#', color: 'bg-[#0077B5]' },
        { icon: Users, label: 'X (Twitter)', value: '#', color: 'bg-[#0F1419]' },
        { icon: Share2, label: 'Portfolio', value: '#', color: 'bg-emerald-500' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-noble-blue selection:text-white overflow-x-hidden">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-50/50 blur-[150px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #050B1A 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    
                    {/* Left: Identity & Connectivity Matrix */}
                    <div className="space-y-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-8 bg-noble-blue/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-slate-100/50 bg-white p-4">
                                <BusinessCardEngine template={template} data={data} scale={0.5} />
                            </div>
                            
                            <div className="absolute -bottom-6 -right-6 bg-noble-blue text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <ShieldCheck size={14} />
                                Verified Professional Node
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => {
                                    exportService.exportVCard(data);
                                    toast.success('Contact Synchronized');
                                }}
                                className="p-8 rounded-[2.5rem] bg-noble-blue text-white flex flex-col items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-noble-blue/20"
                            >
                                <UserPlus size={24} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Save Contact</span>
                            </button>
                            <button 
                                onClick={() => setShowWalletSim(true)}
                                className="p-8 rounded-[2.5rem] bg-white border border-slate-100 flex flex-col items-center gap-3 hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/10 text-slate-600"
                            >
                                <Wallet size={24} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Add to Wallet</span>
                            </button>
                        </div>

                        {/* Social Connectivity Stack */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center">Connectivity Stack</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {socialLinks.map((link, i) => (
                                    <Link 
                                        key={i} 
                                        href={link.value}
                                        className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-noble-blue/30 transition-all group shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 rounded-2xl ${link.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                <link.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{link.label}</p>
                                                <p className="text-[9px] text-slate-400 font-medium truncate max-w-[150px]">{link.value}</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} className="text-slate-200 group-hover:text-noble-blue group-hover:translate-x-2 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Lead Intelligence & Capture Hub */}
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <LeadCaptureForm ownerName={data.fullName} />
                        
                        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 space-y-6">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
                                <Globe size={20} className="text-noble-blue" />
                                Networking ROI
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed italic">
                                "This profile node has facilitated 42+ high-fidelity professional connections in the last 30 days. Securely exchange credentials to initiate professional sync."
                            </p>
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 4 ? 'bg-noble-blue' : 'bg-slate-100'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                            <div className="w-2 h-2 bg-noble-blue rounded-full animate-pulse" />
                            Active Networking Node v3.1
                        </div>
                    </div>

                </div>
            </main>

            <footer className="relative z-10 py-20 border-t border-slate-100 text-center bg-white/50 backdrop-blur-sm">
                 <div className="flex flex-col items-center gap-6">
                    <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.8em]">
                        Noble <span className="text-noble-blue">Identity</span> Protocol
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-slate-100" />
                        <ShieldCheck size={16} className="text-slate-200" />
                        <div className="h-px w-8 bg-slate-100" />
                    </div>
                 </div>
            </footer>

            <AnimatePresence>
                {showWalletSim && (
                    <WalletSimulation data={data} onClose={() => setShowWalletSim(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
