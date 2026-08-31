import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const PlatinumHeader = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'plat-red-geo' || id === 'plat-modern-red') {
      const isRed = id === 'plat-modern-red';
      return (
        <div className="p-16 flex justify-between items-start z-10 bg-noble-surface">
           <div className="flex flex-col gap-4">
              {renderLogo?.("w-32 h-32")}
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-noble-text">{sender?.full_name || 'LICERIA & CO.'}</h2>
                 <p className="text-xs font-bold text-slate-500">{sender?.business_type || 'Real Estate'}</p>
              </div>
           </div>
           <div className="text-right">
              <div role="presentation" className={`text-9xl font-black uppercase tracking-tighter ${isRed ? 'text-rose-600' : 'text-noble-text'}`}>Invoice</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-minimal-grey') {
      return (
        <div className="p-16 pt-24 mb-8 flex flex-col items-center z-10 bg-noble-surface">
           <div className="w-full flex justify-between items-start mb-16">
              {renderLogo?.("w-24 h-24")}
              <div className="text-right">
                 <h2 className="text-3xl font-black text-noble-text">{sender?.full_name || 'SALFORD & CO.'}</h2>
              </div>
           </div>
           <div role="presentation" className="text-[180px] font-black uppercase tracking-tighter text-noble-text leading-none">INVOICE</div>
        </div>
      );
    }

  if (id === 'plat-blue-wave') {
      return (
        <div className="relative h-[400px] mb-8 overflow-hidden z-10 bg-[#00B4FF]">
           {/* The "Blob" - Large blue circle/pill for INVOICE text */}
           <div 
             className="absolute -top-10 -right-20 w-[650px] h-[450px] bg-[#4D7CFF] opacity-90" 
             style={{ borderRadius: '50% 0 0 50%' }}
           />
           
           <div className="relative z-20 p-16 flex justify-between items-start h-full">
              <div className="flex flex-col gap-6">
                 <div className="flex gap-4 items-center">
                    {renderLogo?.("w-20 h-20", true)}
                    <div className="text-white">
                       <h2 className="text-3xl font-black uppercase tracking-tight">NOBLE WORLD</h2>
                       <p className="text-[10px] font-bold opacity-80 tracking-widest">CREATING BRAND'S VISIBILITY</p>
                    </div>
                 </div>
                 
                 <div className="mt-12">
                    <h3 className="text-4xl font-black text-noble-text mb-4">Invoice To :</h3>
                 </div>
              </div>
              
              <div className="text-right flex flex-col justify-center h-full pr-8">
                 <div role="presentation" className="text-[140px] font-black text-white uppercase tracking-tighter leading-none">INVOICE</div>
                 <p className="text-3xl font-black text-white/80 tracking-widest uppercase italic mt-4">INV - {data.invoiceNumber}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-corp-teal') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden bg-noble-surface border-b-2 border-slate-100">
           <div className="absolute top-0 right-0 w-[60%] h-full bg-[#002E5B] z-0" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }} />
           <div className="flex gap-6 items-center relative z-20">
              {renderLogo?.("w-20 h-20")}
              <h2 className="text-2xl font-black text-noble-text uppercase tracking-widest">Fauget</h2>
           </div>
           <div className="text-right relative z-20 text-white">
              <div role="presentation" className="text-9xl font-black uppercase tracking-tighter leading-none italic">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-teal-curve') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-center px-16 pt-8 z-10">
           <div className="flex gap-6 items-center">
              <div className="bg-noble-surface p-2 shadow-lg">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-white">
                 <h2 className="text-2xl font-black leading-tight uppercase">{sender?.full_name || 'Business Name'}</h2>
                 <p className="text-xs font-bold leading-relaxed">{sender?.address || 'Address'}</p>
                 <p className="text-xs font-bold leading-relaxed">{sender?.phone_number || 'Phone'}</p>
                 <p className="text-xs font-bold leading-relaxed">{sender?.email || 'Email'}</p>
              </div>
           </div>
           <div className="text-right relative z-20 text-[#3A8A96]">
              <div role="presentation" className="text-7xl font-black uppercase tracking-tighter leading-none">INVOICE</div>
              <Diamond className="w-10 h-10 text-amber-400 fill-amber-400 mt-2 ml-auto" />
           </div>
        </div>
      );
    }

  if (id === 'plat-blue-wave-2') {
      return (
        <div className="relative h-56 mb-8 flex justify-between items-start px-16 pt-8 z-10 text-white">
           <div className="flex flex-col gap-2">
              <div role="presentation" className="text-6xl font-black uppercase tracking-tighter leading-none">INVOICE</div>
           </div>
           <div className="flex gap-6 items-center text-right">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest">Invoice #</p>
                 <p className="text-lg font-bold">{data.invoiceNumber}</p>
                 <p className="text-[10px] font-black uppercase tracking-widest mt-2">Date</p>
                 <p className="text-lg font-bold">{data.date}</p>
              </div>
              {renderLogo?.("w-20 h-20", true)}
              <Diamond className="w-12 h-12 text-amber-400 fill-amber-400" />
           </div>
        </div>
      );
    }

  if (id === 'plat-red-geo') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-6 items-center">
                 <div className="bg-noble-surface p-4 rounded-full shadow-xl border-4 border-rose-100">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-rose-950 tracking-tighter italic leading-none">{sender?.full_name}</h2>
                    <p className="text-xs font-bold text-rose-400 mt-2 uppercase tracking-widest">Platinum Series</p>
                 </div>
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-5xl font-black text-rose-900 uppercase tracking-widest">INVOICE</div>
                 <Diamond className="w-8 h-8 text-rose-500 fill-rose-500 float-right mt-2" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-corp-teal') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-start mb-16">
              <div>
                 <div role="presentation" className="text-7xl font-black uppercase tracking-tighter italic">PLATINUM</div>
                 <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/40 mt-2">Executive Corporate Series</p>
              </div>
              <div className="bg-noble-surface p-6 rounded-none shadow-2xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-dark-blue-angle') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-10 items-center">
                 {renderLogo?.("w-20 h-20", true)}
                 <div className="h-12 w-px bg-noble-surface/20" />
                 <h2 className="text-2xl font-black uppercase tracking-widest italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-widest text-white/50">INV-P</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-green-orange') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-4 rounded-3xl shadow-xl">
                 {renderLogo?.("w-16 h-16")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-6xl font-black uppercase tracking-tighter leading-none italic">ELITE</div>
                 <p className="text-[10px] font-black uppercase tracking-[0.6em] text-orange-400 mt-2">Green Orange Platinum</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-obsidian') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-12">
              <div className="flex gap-8 items-center">
                 <div className="bg-noble-surface p-4 rounded-none shadow-2xl border-b-4 border-[#D4AF37]">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">{sender?.full_name}</h2>
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-5xl font-black uppercase tracking-widest text-slate-800">OBSIDIAN</div>
                 <Diamond className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37] float-right mt-2" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-ivory-gold') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-6 rounded-none shadow-2xl border-l-4 border-[#D4AF37]">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-6xl font-black text-noble-text uppercase tracking-tighter leading-none italic">IVORY</div>
                 <p className="text-[10px] font-black text-[#D4AF37] mt-1 uppercase tracking-[0.5em]">Gold Leaf Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-sapphire') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-noble-surface/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="flex gap-8 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-widest text-blue-400">SAPPHIRE</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-emerald-lux') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-6 items-center">
                 <div className="bg-noble-surface p-6 rounded-full shadow-2xl border-4 border-emerald-900/20">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-widest leading-none">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-widest italic">Emerald Luxury Edition</p>
                 </div>
              </div>
              <div role="presentation" className="text-6xl font-black uppercase tracking-tighter text-emerald-900/50 italic leading-none">LUX</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-marble-white') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface p-12 rounded-none shadow-2xl border-t-8 border-slate-900">
              <div className="flex gap-10 items-center">
                 {renderLogo?.("w-20 h-20")}
                 <div className="h-16 w-px bg-slate-100" />
                 <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-4xl font-black text-slate-200 uppercase tracking-widest">MARBLE</div>
                 <Diamond className="w-8 h-8 text-noble-text fill-slate-900 float-right mt-2" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-rose-gold-lux') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 border-b-2 border-pink-100 pb-12">
              <div className="bg-noble-surface p-6 rounded-[2.5rem] shadow-xl border border-pink-50">
                 {renderLogo?.("w-16 h-16")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-6xl font-black text-pink-700 uppercase tracking-tighter italic">ROSE</div>
                 <p className="text-[10px] font-black text-pink-300 mt-1 uppercase tracking-[0.6em]">Gold Luxury Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-crimson-elite') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-6 rounded-none shadow-2xl border-r-8 border-red-600">
                 {renderLogo?.("w-16 h-16")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-7xl font-black uppercase tracking-tighter opacity-10">CRIMSON</div>
                 <h2 className="text-3xl font-black uppercase tracking-widest -mt-10 relative z-10 italic">ELITE EDITION</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-matte-black-gold') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-zinc-900 p-10 rounded-none shadow-2xl border border-white/5">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-16 h-16", true)}
                 <h2 className="text-2xl font-black uppercase tracking-widest italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-tighter text-[#D4AF37]">PRESTIGE</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-ultra-minimal') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16 border-b border-slate-100 pb-12">
              {renderLogo?.("w-24 h-24")}
              <div className="text-right">
                 <div role="presentation" className="text-2xl font-black text-noble-text uppercase tracking-[0.5em]">PLATINUM</div>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic">The Ultra Minimalist Edition</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-champagne') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface/50 backdrop-blur-md p-8 rounded-[3rem] border border-amber-100 shadow-xl">
              <div className="flex gap-6 items-center">
                 {renderLogo?.("w-16 h-16")}
                 <h2 className="text-2xl font-black text-amber-900 uppercase tracking-tighter leading-none italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black text-amber-600 uppercase tracking-widest pr-4 opacity-30">INV</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-midnight-navy') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col gap-2">
                 <div role="presentation" className="text-8xl font-black uppercase tracking-tighter leading-none text-slate-800">NAVY</div>
                 <h2 className="text-3xl font-black uppercase tracking-widest -mt-10 pl-2 text-white italic">MIDNIGHT PRESTIGE</h2>
              </div>
              <div className="bg-noble-surface p-6 rounded-none shadow-2xl">
                 {renderLogo?.("w-16 h-16")}
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-silk-cream') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 border-b border-slate-100 pb-12">
              <div className="flex gap-8 items-center bg-noble-surface p-6 rounded-3xl shadow-xl border border-slate-50">
                 {renderLogo?.("w-16 h-16")}
                 <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter italic">{sender?.full_name}</h2>
              </div>
              <Diamond className="w-10 h-10 text-slate-200 fill-slate-200" />
           </div>
        </div>
      );
    }

  if (id === 'plat-titan') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-slate-800 p-10 rounded-none shadow-2xl border-l-8 border-slate-400">
              <div className="flex gap-10 items-center">
                 <div className="bg-noble-surface p-4 rounded-lg shadow-xl">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-widest italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-tighter text-slate-600">TITAN</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-lagoon') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface/10 backdrop-blur-xl p-8 rounded-[4rem] border border-white/20 shadow-2xl">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-6xl font-black uppercase tracking-tighter text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">LAGOON</div>
                 <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/40 mt-2">Oceanic Prestige Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-aubergine') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-noble-surface/5 backdrop-blur-md p-10 rounded-none border border-white/5 shadow-2xl">
              <div className="flex gap-8 items-center">
                 <div className="bg-noble-surface p-4 rounded-full">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-4xl font-black uppercase tracking-widest text-[#F3E5AB] opacity-30">AUBERGINE</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-arctic') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16">
              <div className="bg-noble-surface p-6 rounded-[3rem] shadow-2xl border-4 border-cyan-50">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right pt-4">
                 <div role="presentation" className="text-7xl font-black text-noble-text tracking-tighter opacity-10">ARCTIC</div>
                 <h2 className="text-4xl font-black text-cyan-600 -mt-10 relative z-10 italic uppercase">FROST EDITION</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-bonded-leather') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-black/40 backdrop-blur-md p-10 rounded-none border-b-2 border-amber-900/50">
              <div className="flex gap-8 items-center">
                 <div className="bg-noble-surface p-4 rounded-none shadow-xl">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">{sender?.full_name}</h2>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 mb-2">BONDED LEATHER SERIES</p>
                 <Diamond className="w-8 h-8 text-amber-900 fill-amber-900 float-right" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-royal-seal') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-noble-surface p-10 shadow-2xl border-2 border-[#D4AF37]/20 rounded-3xl">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-20 h-20")}
                 <div className="h-16 w-px bg-slate-100" />
                 <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter italic leading-none">{sender?.full_name}</h2>
              </div>
              <div className="flex flex-col items-center">
                 <Signature className="w-12 h-12 text-[#D4AF37] mb-2" />
                 <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 text-center">Royal Seal of<br/>Authenticity</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-vermillion') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-noble-surface p-8 rounded-none shadow-2xl">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-16 h-16")}
                 <h2 className="text-3xl font-black text-red-900 uppercase tracking-tighter italic leading-none">{sender?.full_name}</h2>
              </div>
              <div role="presentation" className="text-5xl font-black text-red-100 uppercase tracking-widest mix-blend-difference">PRIME</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-diamond-noir') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-black p-10 border border-white/5 shadow-2xl">
              <div className="flex gap-10 items-center">
                 {renderLogo?.("w-16 h-16", true)}
                 <h2 className="text-3xl font-black uppercase tracking-widest leading-none italic">{sender?.full_name}</h2>
              </div>
              <Diamond className="w-12 h-12 text-white fill-white opacity-20" />
           </div>
        </div>
      );
    }

  if (id === 'plat-sovereign') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 border-t-8 border-b-8 border-slate-900 py-12 px-8">
              <div className="flex gap-8 items-center">
                 {renderLogo?.("w-20 h-20")}
                 <h2 className="text-4xl font-black text-noble-text uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
              </div>
              <div className="text-right">
                 <div role="presentation" className="text-5xl font-black text-[#D4AF37] uppercase tracking-[0.2em] italic">SOVEREIGN</div>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Official Gold Edition</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-dark-blue-angle') {
      return (
        <div className="relative h-56 mb-12 flex justify-between items-center px-16 pt-4 z-10">
           <div className="flex gap-6 items-center">
              <div className="bg-noble-surface p-2">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-white">
                 <h2 className="text-2xl font-black leading-tight">{sender?.full_name || 'Business Name'}</h2>
                 <p className="text-xs font-bold leading-relaxed">{sender?.address || 'Address'}</p>
                 <p className="text-xs font-bold leading-relaxed">{sender?.phone_number || 'Phone'}</p>
              </div>
           </div>
           <div className="text-right text-white">
              <div role="presentation" className="text-6xl font-black uppercase tracking-tighter leading-none">INVOICE</div>
           </div>
        </div>
      );
    }

  if (id === 'plat-green-orange') {
      return (
        <div className="relative h-56 mb-12 flex justify-between items-center px-16 pt-4 z-10">
           <div className="flex gap-6 items-center">
              <div className="bg-noble-surface p-2">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-white">
                 <h2 className="text-2xl font-black leading-tight">{sender?.full_name || 'Business Name'}</h2>
                 <p className="text-xs font-bold leading-relaxed">{sender?.address || 'Address'}</p>
                 <p className="text-xs font-bold leading-relaxed">{sender?.phone_number || 'Phone'}</p>
              </div>
           </div>
           <div className="text-right text-white">
              <div role="presentation" className="text-6xl font-black uppercase tracking-tighter leading-none">INVOICE</div>
           </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
