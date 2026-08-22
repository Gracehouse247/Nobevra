import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const CreativeFooter = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'creative-yellow-geo') {
      return (
        <div className="mt-auto h-4 bg-[#FBBF24] w-full" />
      );
    }

  if (id === 'creative-blue-poly') {
      return (
        <div className="mt-auto relative h-32 overflow-hidden z-10 flex">
           <div className="w-[60%] bg-[#1E3A8A] h-full flex items-center px-16 text-white text-xs font-bold leading-relaxed">
              <p className="max-w-[80%]">{data.notes || 'Subject to Nobevra standard terms.'}</p>
           </div>
           <div className="flex-1 bg-[#3B82F6]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'creative-teal-grunge') {
      return (
        <div className="mt-auto h-24 bg-[#14B8A6] flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Creative Series</p>
           <p className="text-xs font-bold italic opacity-60">Verified Document</p>
        </div>
      );
    }

  if (id === 'creative-fluid-wave') {
      return (
        <div className="mt-auto h-32 relative z-10 overflow-hidden">
           <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path fill="#64748B" opacity="0.1" d="M0,32L60,53.3C120,75,240,117,360,117.3C480,117,600,75,720,64C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
           </svg>
           <div className="absolute inset-0 flex items-center px-16 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              Fluid Horizon • Excellence
           </div>
        </div>
      );
    }

  if (id === 'creative-azure-wave') {
      return (
        <div className="mt-auto h-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] w-full" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)' }} />
      );
    }

  if (id === 'creative-iso-grid') {
      return (
        <div className="mt-auto h-4 bg-[#2563EB] w-full" />
      );
    }

  if (id === 'creative-soft-ripples') {
      return (
        <div className="mt-auto h-24 flex items-center px-16 justify-between text-slate-300 relative z-10 border-t border-slate-50">
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">Ripple Series</p>
           <p className="text-xs font-bold italic">Zen Billing</p>
        </div>
      );
    }

  if (id === 'creative-teal-liquid') {
      return (
        <div className="mt-auto h-24 bg-[#14B8A6] flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Liquid Series</p>
           <p className="text-xs font-bold italic opacity-60">Verified Document</p>
        </div>
      );
    }

  if (id === 'creative-grey-topography') {
      return (
        <div className="mt-auto h-24 bg-[#64748B]/10 flex items-center px-16 justify-between text-slate-400 relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">Topo Series</p>
           <p className="text-xs font-bold italic">Official Seal</p>
        </div>
      );
    }

  if (id === 'creative-dual-geo') {
      return (
        <div className="mt-auto relative h-32 overflow-hidden z-10 flex">
           <div className="w-[60%] bg-[#002E5B] h-full flex items-center px-16 text-white text-xs font-bold leading-relaxed">
              <p className="max-w-[80%]">{data.notes || 'Subject to Nobevra standard terms.'}</p>
           </div>
           <div className="flex-1 bg-[#A3E635]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'creative-swirl' || id === 'creative-gold-swirl') {
      return (
        <div className="mt-auto px-16 py-10 relative z-10 border-t-4" style={{ borderTopColor: brand.main }}>
           <div className="flex justify-between items-center">
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-noble-text">Payment Terms</p>
               <p className="text-xs font-bold text-slate-500">{data.notes || 'Please remit payment within 30 days.'}</p>
             </div>
             <div className="flex items-center gap-3">
               <CheckCircle2 className="w-5 h-5" style={{ color: brand.main }} />
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Verified Document</p>
             </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-teal-brush') {
      return (
        <div className="mt-auto px-16 py-10 relative z-10" style={{ backgroundColor: brand.main }}>
           <div className="flex justify-between items-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-white/70">{data.notes || 'Please remit payment within 30 days.'}</p>
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-noble-surface/20 flex items-center justify-center">
                 <CheckCircle2 className="w-4 h-4 text-white" />
               </div>
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Verified</p>
             </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-wave') {
      return (
        <div className="mt-auto px-16 py-10 relative z-10 bg-slate-900 border-t-4" style={{ borderTopColor: brand.main }}>
           <div className="flex justify-between items-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{data.notes || 'Please remit payment within 30 days.'}</p>
             <div className="h-px flex-1 mx-8 bg-noble-surface/10" />
             <Diamond className="w-5 h-5 text-amber-400 fill-amber-400 opacity-50" />
           </div>
        </div>
      );
    }

  if (id === 'creative-pastel') {
      return (
        <div className="mt-auto px-16 py-10 relative z-10 border-t-2 border-slate-100">
           <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{data.notes || 'Please remit payment within 30 days.'}</p>
              <div className="w-24 h-1 rounded-full" style={{ backgroundColor: brand.main }} />
           </div>
        </div>
      );
    }

  if (id === 'creative-neon-grid') {
      return (
        <div className="mt-auto h-24 bg-black flex items-center px-16 justify-between text-white relative z-10 border-t border-[#7C3AED]/30">
           <div className="flex items-center gap-6">
              <div className="w-8 h-8 rounded-full border border-[#7C3AED] flex items-center justify-center animate-pulse">
                 <Diamond className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7C3AED]">GRID SYSTEM VERIFIED</p>
           </div>
           <p className="text-[9px] font-bold text-slate-500 italic">2026 NEON SERIES DOC</p>
        </div>
      );
    }

  if (id === 'creative-watercolor') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-end">
           <div className="space-y-4">
              <h4 className="text-sm font-black text-noble-text uppercase">Artist Notes:</h4>
              <p className="text-xs font-bold text-slate-500 max-w-xs leading-relaxed italic opacity-80">{data.notes || 'Every stroke is a commitment to excellence.'}</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-8 bg-gradient-to-r from-pink-100 to-blue-100 blur-lg opacity-50 mb-2" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-noble-text">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-duotone') {
      return (
        <div className="mt-auto h-24 bg-[#1A1A1A] flex items-center px-16 justify-between text-white relative z-10 border-t-4 border-cyan-500">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">DUOTONE SERIES • VERIFIED</p>
           <div className="flex items-center gap-4">
              <Signature className="w-8 h-8 text-magenta-500" />
              <div className="h-8 w-px bg-noble-surface/10" />
              <p className="text-[9px] font-bold opacity-30 tracking-widest">OFFICIAL SEAL</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-blueprint') {
      return (
        <div className="mt-auto h-32 bg-[#0F3B8C] flex items-center px-16 justify-between text-white relative z-10 border-t border-white/20">
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest">Project Approval</p>
              <p className="text-[9px] font-bold opacity-40">Architectural Verification Document • 2026</p>
           </div>
           <div className="flex flex-col items-center pr-8">
              <Signature className="w-12 h-12 text-white mb-1" />
              <div className="w-48 h-px bg-noble-surface/30" />
              <p className="text-[8px] font-black uppercase tracking-widest mt-2">Lead Architect</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-golden-hour') {
      return (
        <div className="mt-auto h-24 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">GOLDEN HOUR PRESTIGE</p>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-white mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-amber-200">Official Signature</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-monochrome') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 border-t-8 border-black flex justify-between items-center bg-noble-surface">
           <div className="text-[10px] font-black text-black uppercase tracking-[0.4em]">
              <p>Certified Monochrome Statement</p>
              <p className="mt-1 opacity-40 italic"># {data.invoiceNumber}</p>
           </div>
           <div className="flex flex-col items-end">
              <div className="bg-black text-white px-8 py-2 mb-2 font-black text-xs uppercase tracking-widest">
                 Authorized
              </div>
              <p className="text-[10px] font-black text-black uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-retro-type') {
      return (
        <div className="mt-auto px-16 py-10 relative z-10 border-t-4 border-slate-900 bg-[#FCF9F1]">
           <div className="flex justify-between items-center">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">Retro Series Verification</p>
                 <p className="text-[8px] font-bold text-slate-400 italic">This document is rendered in classic typographic style.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-48 h-px bg-slate-900 mb-2" />
                 <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">Official Seal</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-aurora') {
      return (
        <div className="mt-auto h-24 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10 border-t border-white/10">
           <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center">
                 <Globe className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.5em] text-cyan-400">AURORA COSMIC VERIFIED</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-white mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Cosmic Approval</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-bauhaus') {
      return (
        <div className="mt-auto h-24 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t-8 border-slate-900">
           <div className="flex gap-4">
              <div className="w-4 h-4 bg-red-600" />
              <div className="w-4 h-4 bg-blue-600 rounded-full" />
              <div className="w-4 h-4 bg-yellow-400" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-noble-text mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Modernist Approval</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-paper-cut') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 bg-slate-50 flex justify-between items-center shadow-[inset_0_10px_20px_rgba(0,0,0,0.02)]">
           <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              <p>Generated on Recycled Visual Digital Paper</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-0.5 bg-slate-200 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-ink-splash') {
      return (
        <div className="mt-auto h-32 bg-noble-surface flex items-center px-16 justify-between relative z-10 overflow-hidden">
           <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
           <div className="relative z-20">
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">INK SERIES DOC</p>
           </div>
           <div className="relative z-20 flex flex-col items-end">
              <Signature className="w-12 h-12 text-noble-text mb-1 opacity-80" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Artistic Verified</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-rose-gold') {
      return (
        <div className="mt-auto h-24 bg-rose-50 flex items-center px-16 justify-between text-rose-900 relative z-10 border-t-2 border-rose-200">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">ROSE GOLD LUXURY VERIFIED</p>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-rose-400 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Authorized Official</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-bauhaus-bold') {
      return (
        <div className="mt-auto h-24 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10">
           <div className="flex gap-1 bg-noble-surface h-full w-4" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 pr-8">BAUHAUS BOLD OFFICIAL STATEMENT</p>
           <div className="flex flex-col items-end pr-16">
              <Signature className="w-10 h-10 text-white mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Official Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-forest-art') {
      return (
        <div className="mt-auto h-32 bg-[#064E3B] flex items-center px-16 justify-between text-white relative z-10 overflow-hidden">
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
           <div className="relative z-20">
              <p className="text-xs font-black uppercase tracking-widest">Forest Art Series • Verified</p>
           </div>
           <div className="relative z-20 flex flex-col items-end">
              <Signature className="w-12 h-12 text-emerald-400 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Official Forest Steward</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-midnight-oil') {
      return (
        <div className="mt-auto h-24 bg-black flex items-center px-16 justify-between text-white relative z-10 border-t border-cyan-500/20">
           <div className="flex items-center gap-6">
              <div className="w-8 h-8 rounded-full border border-cyan-500 flex items-center justify-center">
                 <Diamond className="w-4 h-4 text-cyan-500" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">MIDNIGHT SERIES VERIFIED</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-cyan-500 opacity-50 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-800">Cyber Seal</p>
           </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
