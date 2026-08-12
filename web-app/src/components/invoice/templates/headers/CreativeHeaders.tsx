import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const CreativeHeader = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'creative-neon-grid') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-6 items-center">
                 <div className="bg-black p-6 rounded-2xl border border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div className="text-white">
                    <h2 className="text-2xl font-black uppercase tracking-widest leading-none mb-2">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-[#7C3AED] tracking-[0.4em] uppercase">Neon Grid Series</p>
                 </div>
              </div>
              <div className="text-right">
                 <h1 className="text-6xl font-black uppercase text-white tracking-tighter italic drop-shadow-[0_0_10px_#7C3AED]">INVOICE</h1>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-watercolor') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16">
              <div className="relative">
                 <div className="absolute inset-0 bg-pink-100 blur-2xl rounded-full opacity-50" />
                 <div className="bg-noble-surface/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border border-white/50 relative z-10">
                    {renderLogo?.("w-20 h-20")}
                 </div>
              </div>
              <div className="text-right pt-6">
                 <h1 className="text-7xl font-black text-noble-text tracking-tighter opacity-10 leading-none">ARTISTIC</h1>
                 <h2 className="text-3xl font-black text-slate-800 -mt-8 relative z-10 uppercase">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-pink-500 mt-1 uppercase tracking-widest italic">Creative Studio Doc</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-duotone') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-[#1A1A1A] p-10 rounded-[3rem] shadow-2xl border border-white/10">
              <div className="flex gap-8 items-center">
                 <div className="bg-noble-surface p-4 rounded-3xl shadow-xl rotate-3">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div className="text-white">
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-cyan-400 tracking-[0.5em] uppercase">Premium Duotone</p>
                 </div>
              </div>
              <div className="h-16 w-px bg-noble-surface/10" />
              <h1 className="text-5xl font-black uppercase text-magenta-500 tracking-widest pr-4">BILLING</h1>
           </div>
        </div>
      );
    }

  if (id === 'creative-blueprint') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16 text-white">
              <div className="bg-noble-surface p-6 rounded-xl shadow-2xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <h1 className="text-8xl font-black uppercase tracking-tighter opacity-10 leading-none -mr-4">PLAN_101</h1>
                 <h2 className="text-4xl font-black uppercase tracking-widest mb-2 italic">INVOICE</h2>
                 <p className="text-xs font-bold opacity-60 tracking-[0.4em] uppercase">Architectural Excellence</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-golden-hour') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-8 rounded-[4rem] shadow-2xl border-b-8 border-amber-500/20">
                 {renderLogo?.("w-24 h-24")}
              </div>
              <div className="text-right">
                 <h1 className="text-6xl font-black uppercase text-noble-text tracking-tighter italic drop-shadow-lg">GOLDEN</h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-600 mt-2">Executive Horizon Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-monochrome') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16 border-b-8 border-black pb-12">
              <div className="bg-black p-6 rounded-none">
                 {renderLogo?.("w-20 h-20", true)}
              </div>
              <div className="text-right pt-4">
                 <h1 className="text-9xl font-black uppercase tracking-tighter text-black opacity-5 leading-none absolute right-16 top-16 select-none">M_DOC</h1>
                 <h2 className="text-5xl font-black uppercase tracking-tight text-black relative z-10">INVOICE</h2>
                 <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.4em]">Official Monochrome Statement</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-retro-type') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16">
              <div className="text-noble-text border-l-4 border-slate-900 pl-6 py-2">
                 <h2 className="text-3xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
                 <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-60">Established 2026 • Billing Dept</p>
              </div>
              <div className="bg-noble-surface p-6 border-2 border-slate-900 shadow-[8px_8px_0px_#000]">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
           <div className="w-full bg-slate-900 text-white py-4 px-12 flex justify-between items-center">
              <h1 className="text-2xl font-black tracking-[0.5em] uppercase">OFFICIAL INVOICE</h1>
              <p className="text-xs font-bold italic opacity-60">Ref: {data.invoiceNumber}</p>
           </div>
        </div>
      );
    }

  if (id === 'creative-aurora') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface/10 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                 {renderLogo?.("w-24 h-24")}
              </div>
              <div className="text-right">
                 <h1 className="text-7xl font-black uppercase text-white tracking-tighter italic drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]">AURORA</h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.8em] text-cyan-400 mt-2">Cosmic Series Professional</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-bauhaus') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16">
              <div className="bg-noble-surface p-6 border-4 border-slate-900 shadow-[12px_12px_0px_rgba(0,0,0,0.1)]">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <h1 className="text-9xl font-black text-noble-text tracking-tighter leading-none -mr-4">BAU</h1>
                 <h2 className="text-3xl font-black text-noble-text uppercase tracking-widest mt-2">HAUS INVOICE</h2>
                 <p className="text-xs font-bold text-slate-400 mt-2 tracking-[0.5em] uppercase">{sender?.full_name}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-paper-cut') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface p-10 rounded-[3rem] shadow-[inset_0_2px_10px_rgba(0,0,0,0.1),0_20px_40px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-20 h-20")}
                 <div className="h-12 w-px bg-slate-100" />
                 <div>
                    <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter">{sender?.full_name}</h2>
                    <p className="text-xs font-bold text-slate-400 italic">Paper Series • Executive</p>
                 </div>
              </div>
              <h1 className="text-5xl font-black text-slate-200 tracking-widest uppercase italic pr-4">INVOICE</h1>
           </div>
        </div>
      );
    }

  if (id === 'creative-ink-splash') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16">
              <div className="text-noble-text border-b-4 border-slate-900 pb-4">
                 <h2 className="text-4xl font-black uppercase tracking-tighter">{sender?.full_name}</h2>
                 <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Ink & Brush Collective</p>
              </div>
              <div className="bg-noble-surface p-6 rounded-full shadow-2xl border-4 border-slate-900/5 rotate-12">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
           <h1 className="text-9xl font-black text-noble-text opacity-[0.03] absolute top-12 pointer-events-none uppercase">CREATIVE</h1>
        </div>
      );
    }

  if (id === 'creative-rose-gold') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-8 rounded-[4rem] shadow-2xl border-b-8 border-rose-200">
                 {renderLogo?.("w-24 h-24")}
              </div>
              <div className="text-right">
                 <h1 className="text-6xl font-black text-rose-400 tracking-tighter italic drop-shadow-sm uppercase">ROSE GOLD</h1>
                 <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.6em]">Luxury Elite Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-bauhaus-bold') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16">
              <div className="bg-slate-900 p-8 text-white flex flex-col gap-4 shadow-2xl">
                 {renderLogo?.("w-20 h-20", true)}
                 <h2 className="text-2xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
              </div>
              <div className="text-right pt-4">
                 <h1 className="text-[10rem] font-black text-noble-text opacity-5 leading-none absolute right-16 top-16 select-none">BOLD</h1>
                 <h2 className="text-6xl font-black text-noble-text uppercase tracking-tighter relative z-10">INVOICE</h2>
                 <div className="h-2 w-32 bg-red-600 ml-auto mt-4" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-forest-art') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-end mb-16 bg-[#064E3B] p-12 rounded-[5rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-full bg-noble-surface opacity-5" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
              <div className="flex gap-10 items-center relative z-10">
                 <div className="bg-noble-surface p-4 rounded-3xl">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
                    <p className="text-sm font-bold text-emerald-400 mt-3 uppercase tracking-widest italic">Forest Art Series</p>
                 </div>
              </div>
              <h1 className="text-6xl font-black tracking-widest opacity-20 italic pr-8">OFFICIAL</h1>
           </div>
        </div>
      );
    }

  if (id === 'creative-midnight-oil') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 {renderLogo?.("w-24 h-24")}
              </div>
              <div className="text-right text-white">
                 <h1 className="text-7xl font-black uppercase tracking-tighter mb-2 italic text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">MIDNIGHT</h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500">Global Dark Mode Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-yellow-geo') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-12 text-noble-text">
              <div className="bg-noble-surface p-6 rounded-full shadow-2xl -mt-6 -ml-6 border-8 border-[#FBBF24]">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <h1 className="text-8xl font-black uppercase tracking-tighter leading-none opacity-10 -mr-4 -mt-4 absolute right-16 top-12 select-none">INVOICE</h1>
                 <h2 className="text-3xl font-black uppercase tracking-tight text-[#92400E] mb-2">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-[#D97706]">{sender?.email}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-blue-poly') {
      return (
        <div className="relative pt-16 px-16 z-10">
           <div className="flex justify-between items-center bg-noble-card border border-noble-card-border p-10 rounded-[3rem] shadow-2xl">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-20 h-20")}
                 <div className="h-16 w-px bg-noble-surface/20" />
                 <div className="text-white">
                    <h2 className="text-2xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
                    <p className="text-xs font-bold opacity-60 tracking-widest">{sender?.email}</p>
                 </div>
              </div>
              <div className="text-right text-white">
                 <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 italic">INVOICE</h1>
                 <div className="flex justify-end">
                    <Diamond className="w-8 h-8 text-[#3B82F6] fill-[#3B82F6]" />
                 </div>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-teal-grunge') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="bg-[#14B8A6] p-12 rounded-[4rem] shadow-2xl flex justify-between items-center text-white relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-noble-surface/10 rounded-full blur-2xl" />
              <div className="flex gap-8 items-center relative z-10">
                 {renderLogo?.("w-20 h-20")}
                 <div>
                    <h2 className="text-3xl font-black uppercase">{sender?.full_name}</h2>
                    <p className="text-sm font-bold opacity-60 italic">{sender?.email}</p>
                 </div>
              </div>
              <h1 className="text-7xl font-black uppercase tracking-widest opacity-20 absolute -right-8 bottom-0 rotate-12">INVOICE</h1>
           </div>
        </div>
      );
    }

  if (id === 'creative-fluid-wave') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16">
              <div className="text-white drop-shadow-2xl">
                 <h2 className="text-4xl font-black tracking-tighter uppercase">{sender?.full_name}</h2>
                 <p className="text-xs font-bold tracking-[0.4em] text-orange-400 mt-2">Executive Series</p>
              </div>
              <div className="bg-noble-surface/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
                 {renderLogo?.("w-24 h-24")}
              </div>
           </div>
           <h1 className="text-[12rem] font-black uppercase text-white/5 leading-none absolute top-24 pointer-events-none select-none">BILLING</h1>
        </div>
      );
    }

  if (id === 'creative-azure-wave') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-end">
              <div className="bg-noble-surface p-6 rounded-t-[4rem] shadow-xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right pb-4">
                 <h1 className="text-8xl font-black text-[#1E3A8A] opacity-10 tracking-tighter">INVOICE</h1>
                 <h2 className="text-2xl font-black text-[#3B82F6] tracking-widest -mt-10 uppercase">{sender?.full_name}</h2>
              </div>
           </div>
           <div className="h-2 w-full bg-[#3B82F6] rounded-full" />
        </div>
      );
    }

  if (id === 'creative-iso-grid') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-12">
              <div className="flex gap-8 items-center">
                 <div className="bg-[#7C3AED] p-5 rounded-3xl shadow-[0_0_50px_rgba(124,58,237,0.3)]">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div className="text-white">
                    <h2 className="text-3xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">{sender?.full_name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Secure Digital Invoice</p>
                    </div>
                 </div>
              </div>
              <div className="text-right text-white">
                 <h1 className="text-6xl font-black tracking-widest italic opacity-60">INV.X</h1>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-soft-ripples') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16">
              <div className="text-noble-text">
                 <h2 className="text-2xl font-black uppercase tracking-[0.3em]">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-slate-400 mt-2">Harmonious Enterprise</p>
              </div>
              <div className="bg-noble-surface p-8 rounded-full shadow-2xl border border-slate-50 scale-110">
                 {renderLogo?.("w-16 h-16")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-teal-liquid') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 text-white">
              <div className="bg-noble-surface/5 backdrop-blur-2xl p-10 rounded-[4rem] border border-white/10 shadow-2xl flex gap-8 items-center">
                 {renderLogo?.("w-20 h-20")}
                 <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
                    <p className="text-xs font-bold text-emerald-400 mt-4 tracking-widest uppercase">Verified Merchant</p>
                 </div>
              </div>
              <div className="text-right">
                 <h1 className="text-9xl font-black opacity-5 select-none absolute right-0 top-0 leading-none -mr-12 -mt-12">EMERALD</h1>
                 <Diamond className="w-16 h-16 text-emerald-500 fill-emerald-500 opacity-20 ml-auto" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-grey-topography') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start">
              <div className="text-white border-l-8 border-[#475569] pl-10">
                 <h1 className="text-7xl font-black uppercase leading-none mb-4 tracking-tighter italic">INVOICE</h1>
                 <h2 className="text-2xl font-bold uppercase tracking-[0.5em] opacity-40">{sender?.full_name}</h2>
              </div>
              <div className="bg-[#1E293B] p-6 border border-[#475569] shadow-2xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-dual-geo') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-24">
              <div className="text-white flex flex-col gap-4">
                 <div className="bg-noble-surface p-4 rounded-2xl w-fit shadow-2xl">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic drop-shadow-2xl leading-none">{sender?.full_name}</h2>
              </div>
              <div className="text-right relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600 rounded-full blur-[80px] opacity-30" />
                 <h1 className="text-8xl font-black text-noble-text uppercase tracking-tighter relative z-10 leading-none">INVOICE</h1>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'creative-swirl' || id === 'creative-gold-swirl' || id === 'creative-pastel') {
      return (
        <div className="relative h-48 mb-12 flex justify-between items-start px-16 pt-16 z-10">
          <div className="flex gap-6 items-start">
             {renderLogo?.("w-20 h-20", true)}
             <div className="mt-2 text-slate-800">
               <h2 className="text-xl font-black leading-tight">{sender?.full_name || 'Business Name'}</h2>
               <p className="text-xs font-bold opacity-70 whitespace-pre-line leading-relaxed">{sender?.address || 'Primary Office Address'}</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <h1 className="text-7xl font-black uppercase tracking-tight text-noble-text drop-shadow-sm">INVOICE</h1>
             <Diamond className="w-10 h-10 text-[#FBBF24] fill-[#FBBF24] mb-8" />
          </div>
        </div>
      );
    }

  if (id === 'creative-teal-brush') {
      return (
        <div className="relative h-64 mb-8 z-10 px-16 pt-16 border-b border-white/20">
          <div className="flex justify-between items-start">
            <div className="flex gap-6 items-start">
               {renderLogo?.("w-20 h-20", true)}
               <div className="mt-2 text-white">
                 <h2 className="text-xl font-black leading-tight">{sender?.full_name || 'Business Name'}</h2>
                 <p className="text-xs font-bold opacity-70 whitespace-pre-line leading-relaxed">{sender?.address || 'Primary Office Address'}</p>
               </div>
            </div>
            <div className="flex items-center gap-4 text-white drop-shadow-md">
               <h1 className="text-7xl font-black uppercase tracking-tight">INVOICE</h1>
               <Diamond className="w-10 h-10 text-[#FBBF24] fill-[#FBBF24] mb-8" />
            </div>
          </div>
        </div>
      );
    }

  if (id === 'creative-wave') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-start px-16 pt-16 z-10">
          <div className="flex gap-6 items-start relative z-20 text-slate-800 bg-noble-surface/80 p-6 rounded-3xl backdrop-blur-md shadow-xl border border-white/40">
             {renderLogo?.("w-16 h-16")}
             <div>
               <h2 className="text-lg font-black leading-tight">{sender?.full_name || 'Business Name'}</h2>
               <p className="text-[10px] font-bold opacity-70 whitespace-pre-line leading-relaxed">{sender?.address || 'Primary Office Address'}</p>
             </div>
          </div>
          <div className="flex items-center gap-4 relative z-20 text-white mt-4">
             <h1 className="text-6xl font-black uppercase tracking-tight drop-shadow-xl">INVOICE</h1>
             <Diamond className="w-8 h-8 text-[#FBBF24] fill-[#FBBF24] mb-6" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-90 z-0 pointer-events-none">
            <svg viewBox="0 0 1000 250" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full" style={{ color: brand.black }}>
              <path fill="currentColor" d="M0,0 L1000,0 L1000,180 C800,280 400,60 0,180 Z" />
            </svg>
            <svg viewBox="0 0 1000 250" preserveAspectRatio="none" className="absolute top-0 right-0 w-[60%] h-[80%]" style={{ color: brand.main }}>
              <path fill="currentColor" d="M1000,0 L0,0 C200,120 700,40 1000,180 Z" />
            </svg>
          </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
