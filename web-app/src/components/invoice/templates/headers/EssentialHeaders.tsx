import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const EssentialHeader = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'ess-navy-lines') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-8 text-[#1E3A8A]">
              <div className="flex gap-4 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl border border-slate-100">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div role="presentation" className="text-6xl font-black uppercase tracking-tighter">INVOICE</div>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-orange-blob') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <div role="presentation" className="text-7xl font-black uppercase text-[#F97316] tracking-tighter">INVOICE</div>
              <div className="bg-noble-surface p-4 rounded-full shadow-2xl border-4 border-[#F97316]">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-angle') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div role="presentation" className="text-6xl font-black uppercase text-white tracking-[0.2em] pt-4">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-curve') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-12">
              <div className="bg-noble-surface/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-2xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div role="presentation" className="text-5xl font-black uppercase text-white tracking-widest pt-4">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-dark-orange-wave') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div role="presentation" className="text-6xl font-black uppercase text-white tracking-widest italic drop-shadow-lg">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-clean-white') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16 border-b border-slate-100 pb-8">
              {renderLogo?.("w-20 h-20")}
              <div className="text-right">
                 <div role="presentation" className="text-4xl font-black uppercase tracking-widest text-noble-text">INVOICE</div>
                 <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{sender?.full_name}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-mint-fresh') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface p-8 rounded-2xl shadow-sm border border-emerald-50">
              <div className="flex gap-6 items-center">
                 {renderLogo?.("w-16 h-16")}
                 <div className="h-10 w-px bg-emerald-100" />
                 <h2 className="text-xl font-black uppercase text-emerald-900 tracking-widest">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-3xl font-black uppercase text-emerald-500 tracking-[0.3em]">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-charcoal-pro') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-start mb-16">
              <div className="bg-noble-surface p-4 rounded-none">
                 {renderLogo?.("w-16 h-16")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-7xl font-black uppercase tracking-tighter opacity-10">STATEMENT</div>
                 <h2 className="text-3xl font-black uppercase tracking-widest text-white -mt-8 relative z-10 italic">OFFICIAL INVOICE</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-sunny-day') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-4 items-center">
                 <div className="bg-noble-surface p-3 rounded-full shadow-lg border border-amber-100">
                    {renderLogo?.("w-12 h-12")}
                 </div>
                 <h2 className="text-xl font-black text-amber-900 uppercase tracking-widest">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-5xl font-black text-amber-500 uppercase tracking-tighter drop-shadow-sm">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-lavender-soft') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 border-b-2 border-purple-100 pb-8">
              {renderLogo?.("w-20 h-20")}
              <div className="text-right">
                 <div role="presentation" className="text-4xl font-black text-purple-600 uppercase tracking-widest italic">INVOICE</div>
                 <p className="text-[10px] font-black text-purple-300 mt-1 uppercase tracking-[0.5em]">Lavender Soft Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-coral-bright') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface p-6 rounded-none shadow-xl border-l-8 border-rose-500">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-16 h-16")}
                 <h2 className="text-2xl font-black text-noble-text uppercase tracking-tighter">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black text-rose-500 uppercase tracking-widest">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-slate-pro') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 text-white bg-slate-900 p-10 rounded-none shadow-2xl">
              <div className="flex gap-10 items-center">
                 <div className="bg-noble-surface p-4 rounded-lg">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-widest leading-none">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Official Statement</p>
                 </div>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-widest text-slate-500">INV.X</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-forest-edge') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-6 rounded-tr-[3rem] shadow-xl border border-emerald-50">
                 {renderLogo?.("w-16 h-16")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-5xl font-black text-emerald-900 uppercase tracking-tighter italic">FOREST</div>
                 <p className="text-[10px] font-black text-emerald-500 mt-1 uppercase tracking-[0.6em]">Executive Series Edge</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-ocean-breeze') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface/50 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 shadow-xl">
              <div className="flex gap-6 items-center">
                 {renderLogo?.("w-16 h-16")}
                 <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black text-cyan-600 uppercase tracking-widest italic pr-4">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-midnight-pure') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white items-center">
           <div className="w-full flex justify-between items-center mb-16 border-b border-white/10 pb-12">
              <div className="bg-noble-surface p-4 rounded-none">
                 {renderLogo?.("w-16 h-16")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-6xl font-black uppercase tracking-tighter italic text-slate-500">MIDNIGHT</div>
                 <p className="text-[10px] font-bold text-white/40 mt-1 uppercase tracking-[0.8em]">Official Statement Pure</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-sandstone') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16 border-4 border-stone-200 p-10 bg-noble-surface shadow-sm">
              <div>
                 {renderLogo?.("w-20 h-20")}
                 <h2 className="text-2xl font-black text-stone-900 uppercase mt-6 tracking-widest leading-none">{sender?.full_name}</h2>
              </div>
              <div className="text-right pt-2">
                 <div role="presentation" className="text-7xl font-black text-stone-100 absolute right-16 top-12 select-none">STONE</div>
                 <h2 className="text-4xl font-black text-stone-900 uppercase relative z-10 italic">INVOICE</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-platinum-border') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 border-b-8 border-slate-50 pb-8">
              <div className="flex gap-8 items-center bg-slate-50 p-6 rounded-2xl">
                 {renderLogo?.("w-16 h-16")}
                 <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-5xl font-black text-slate-200 uppercase tracking-widest">INV</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-gold-accent') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-4 rounded-none shadow-2xl border-t-4 border-[#D4AF37]">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-6xl font-black text-noble-text uppercase tracking-tighter leading-none italic">GOLD</div>
                 <p className="text-[10px] font-black text-[#D4AF37] mt-1 uppercase tracking-[0.5em]">Executive Accent Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-silver-line') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 border-l-4 border-noble-border pl-10">
              <div className="text-noble-text">
                 <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-slate-400 mt-2 italic uppercase">Silver Line Series</p>
              </div>
              <div className="bg-noble-surface p-6 rounded-full shadow-xl border border-slate-50">
                 {renderLogo?.("w-16 h-16")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-onyx-bold') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-black p-10 text-white shadow-2xl">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-16 h-16", true)}
                 <h2 className="text-2xl font-black uppercase tracking-widest italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-tighter text-slate-800">ONYX</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-navy-lines') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-8 text-[#1E3A8A]">
              <div className="flex gap-4 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl border border-slate-100">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div role="presentation" className="text-6xl font-black uppercase tracking-tighter">INVOICE</div>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-orange-blob') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <div role="presentation" className="text-7xl font-black uppercase text-[#F97316] tracking-tighter">INVOICE</div>
              <div className="bg-noble-surface p-4 rounded-full shadow-2xl border-4 border-[#F97316]">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-angle') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div role="presentation" className="text-6xl font-black uppercase text-white tracking-[0.2em] pt-4">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-curve') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-12">
              <div className="bg-noble-surface/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-2xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div role="presentation" className="text-5xl font-black uppercase text-white tracking-widest pt-4">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-dark-orange-wave') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div role="presentation" className="text-6xl font-black uppercase text-white tracking-widest italic drop-shadow-lg">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-geo') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-start px-16 pt-12 z-10">
           <div className="flex gap-6 items-center">
              <div className="bg-noble-surface p-3 shadow-lg rounded-xl border border-blue-100">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="flex flex-col">
                 <h2 className="text-2xl font-black text-noble-text leading-tight">{sender?.full_name}</h2>
                 <p className="text-sm font-bold text-slate-500">{sender?.email}</p>
              </div>
           </div>
           <div className="text-right">
              <div role="presentation" className="text-7xl font-black uppercase tracking-tighter text-blue-600 leading-none">INVOICE</div>
              <p className="text-lg font-black text-slate-400 mt-2"># {data.invoiceNumber}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-modern-swish') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-start px-16 pt-16 z-10">
           {renderLogo?.("w-24 h-24")}
           <div className="text-right">
              <div role="presentation" className="text-9xl font-black uppercase tracking-tighter text-slate-300 opacity-50 leading-none">INVOICE</div>
              <div className="mt-4">
                 <h2 className="text-2xl font-black text-noble-text">{sender?.full_name}</h2>
                 <p className="text-sm font-bold text-slate-500">{data.date}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-azure-pattern') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 text-white overflow-hidden bg-blue-600 shadow-2xl rounded-b-3xl">
           <div className="flex items-center gap-8 relative z-20">
              <div className="bg-noble-surface/20 p-4 rounded-2xl backdrop-blur-md">
                 {renderLogo?.("w-20 h-20", true)}
              </div>
              <div className="flex flex-col">
                 <h2 className="text-3xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
                 <p className="text-sm font-bold opacity-70">Official Invoice Document</p>
              </div>
           </div>
           <div className="text-right relative z-20">
              <div role="presentation" className="text-7xl font-black uppercase tracking-tighter">INVOICE</div>
              <p className="text-xl font-bold opacity-80">#{data.invoiceNumber}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-urban-skyline') {
      return (
        <div className="relative h-48 mb-12 flex justify-between items-end px-16 pb-8 z-10 border-b-4 border-slate-900">
           <div className="flex items-end gap-6">
              {renderLogo?.("w-24 h-24")}
              <div role="presentation" className="text-6xl font-black uppercase tracking-widest text-noble-text leading-none pb-2">INVOICE</div>
           </div>
           <div className="text-right pb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Serial Number</p>
              <p className="text-3xl font-black text-noble-text tracking-tighter italic">{data.invoiceNumber}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-corporate-clean') {
      return (
        <div className="relative h-48 mb-12 flex justify-between items-center px-16 z-10 bg-slate-900 text-white">
           <div className="flex items-center gap-6">
              {renderLogo?.("w-20 h-20", true)}
              <div>
                 <h2 className="text-2xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-slate-400">{sender?.email}</p>
              </div>
           </div>
           <div className="text-right">
              <div role="presentation" className="text-5xl font-black uppercase tracking-[0.2em]">INVOICE</div>
              <p className="text-sm font-bold text-slate-400 mt-2">Date: {data.date}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-azure-wave') {
      return (
        <div className="relative h-96 overflow-hidden bg-[#1E3A8A]">
           <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
           <div className="absolute top-20 left-20">
              <div role="presentation" className="text-9xl font-black text-white tracking-tighter uppercase italic">Invoice</div>
           </div>
           <div className="absolute top-24 right-20 text-right">
              <p className="text-3xl font-black text-white uppercase tracking-widest opacity-80">No: {data.invoiceNumber}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-geo-prism' || id === 'geo-blue' || id === 'geo-purple' || id === 'geo-navy' || id === 'geo-green') {
      const isEssential = id === 'ess-geo-prism';
      const isDark = id === 'geo-navy' || isEssential;
      
      return (
        <div className="relative h-96 overflow-hidden bg-noble-surface">
           <div className="absolute top-0 right-0 w-[60%] h-full bg-[#1E3A8A]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
           <div className="absolute top-0 right-0 w-[55%] h-full bg-[#0EA5E9] opacity-30" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 10% 100%)' }} />
           
           <div className="relative z-10 h-full flex flex-col justify-center px-20">
              <div role="presentation" className="text-9xl font-black text-[#1E3A8A] tracking-tighter">{isEssential ? 'Invoice' : 'INVOICE'}</div>
              <p className="text-xl font-bold text-slate-500 mt-2 ml-2">Invoice Num: {data.invoiceNumber}</p>
           </div>
           {!isEssential && (
             <div className="absolute top-10 right-16 z-20">
               <Diamond className="w-12 h-12 text-[#FBBF24] fill-[#FBBF24]" />
             </div>
           )}
        </div>
      );
    }

  if (id === 'ess-skyline') {
      return (
        <div className="relative h-[450px] mb-12 flex flex-col items-center justify-center z-10">
           <div className="text-center">
              <div role="presentation" className="text-[160px] font-black uppercase tracking-[0.4em] text-white leading-none drop-shadow-2xl">INVOICE</div>
              <div className="mt-12 flex items-center justify-center gap-12 text-white font-black">
                 <p className="text-xl tracking-[0.3em]">Invoice Num: {data.invoiceNumber}</p>
                 <div className="h-12 w-1 bg-noble-surface/40" />
                 <p className="text-xl tracking-[0.3em] uppercase">{data.date}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-steel-minimal') {
      return (
        <div className="p-16 pt-32 mb-12 relative overflow-hidden">
           <div className="flex justify-center mb-24">
              <div role="presentation" className="text-[140px] font-black uppercase tracking-[0.5em] text-[#A2B9CC] leading-none">INVOICE</div>
           </div>
           <div className="grid grid-cols-3 gap-0 border-y-2 border-noble-border">
              <div className="p-12 border-r-2 border-noble-border flex flex-col gap-2">
                 <p className="text-lg font-black text-noble-text uppercase">Date Issued:</p>
                 <p className="text-2xl font-black text-slate-600 tracking-tight">{data.date}</p>
              </div>
              <div className="p-12 border-r-2 border-noble-border flex flex-col gap-2">
                 <p className="text-lg font-black text-noble-text uppercase">Invoice Number:</p>
                 <p className="text-2xl font-black text-slate-600 tracking-tight">{data.invoiceNumber}</p>
              </div>
              <div className="p-12 flex flex-col gap-2">
                 <p className="text-lg font-black text-noble-text uppercase">Issued to:</p>
                 <p className="text-2xl font-black text-slate-600 tracking-tight">{client?.name || 'Client Name'}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-purple-bloom') {
      return (
        <div className="relative h-80 mb-12 flex justify-between items-end px-20 z-10">
           <div role="presentation" className="text-[140px] font-black tracking-tighter text-blue-900 leading-none">Invoice</div>
           <div className="flex flex-col items-end gap-4 mb-4">
              <p className="text-xl font-black text-blue-900 opacity-60">Invoice Num: {data.invoiceNumber}</p>
              {renderLogo?.("w-32 h-32")}
           </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
