import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const GeometricHeader = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'geo-cyber-grid') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-6 items-center">
                 <div className="bg-[#22D3EE] p-4 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.4)] border border-white/50">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div className="text-white">
                    <h2 className="text-2xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-cyan-400 tracking-[0.4em] uppercase">Cyber Infrastructure Series</p>
                 </div>
              </div>
              <div className="text-right">
                 <h1 className="text-7xl font-black uppercase text-white tracking-tighter opacity-20">SYSTEM</h1>
                 <h2 className="text-3xl font-black text-cyan-500 -mt-8 relative z-10 uppercase tracking-widest italic">INVOICE</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-minimalist-box') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16 border-2 border-slate-900 p-10">
              <div>
                 <div className="bg-slate-900 p-6 w-fit mb-6">
                    {renderLogo?.("w-20 h-20", true)}
                 </div>
                 <h2 className="text-2xl font-black uppercase text-noble-text">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Minimal Box Series</p>
              </div>
              <div className="text-right">
                 <h1 className="text-9xl font-black text-slate-100 leading-none">BOX</h1>
                 <h2 className="text-4xl font-black text-noble-text -mt-12 relative z-10 uppercase">INVOICE</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-slanted-edge') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-10 items-center">
                 <div className="bg-noble-surface p-6 rounded-2xl shadow-xl border border-slate-100">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div className="h-16 w-px bg-slate-200" />
                 <div>
                    <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter">{sender?.full_name}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slanted Edge Edition</p>
                 </div>
              </div>
              <div className="bg-slate-900 px-10 py-4 text-white skew-x-[-12deg]">
                 <h1 className="text-3xl font-black uppercase tracking-widest skew-x-[12deg]">INVOICE</h1>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-diamond-pro') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="relative">
                 <div className="absolute inset-0 bg-slate-200 rotate-45 transform scale-125" />
                 <div className="bg-noble-surface p-8 relative z-10 shadow-2xl border border-slate-100">
                    {renderLogo?.("w-20 h-20")}
                 </div>
              </div>
              <div className="text-right">
                 <div className="flex items-center gap-4 justify-end mb-2">
                    <h1 className="text-5xl font-black text-noble-text uppercase tracking-tighter">DIAMOND</h1>
                    <Diamond className="w-10 h-10 text-slate-400" />
                 </div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">Pro Series Corporate Doc</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-tech-blueprint') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-start mb-16 border-b border-white/10 pb-12">
              <div className="bg-noble-surface p-6 rounded-none shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <h1 className="text-8xl font-black opacity-10 leading-none mb-2">010101</h1>
                 <h2 className="text-4xl font-black uppercase tracking-widest italic">BLUEPRINT</h2>
                 <p className="text-[10px] font-bold text-blue-400 mt-2 tracking-[0.5em] uppercase">Advanced Tech Series</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-abstract-blocks') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="flex gap-8 items-center bg-noble-surface p-8 rounded-3xl shadow-xl border-l-[12px] border-slate-900">
                 {renderLogo?.("w-20 h-20")}
                 <div>
                    <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter">{sender?.full_name}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Abstract Block Series</p>
                 </div>
              </div>
              <h1 className="text-7xl font-black text-noble-text opacity-5 uppercase rotate-90 absolute -right-16 top-32">BLOCKS</h1>
           </div>
        </div>
      );
    }

  if (id === 'geo-circuit-board') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col text-white">
           <div className="flex justify-between items-center mb-16 bg-[#1A1A1A] p-10 rounded-2xl border border-emerald-500/20 shadow-2xl">
              <div className="flex gap-10 items-center">
                 <div className="bg-noble-surface p-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] mt-2">Circuit Verified Entity</p>
                 </div>
              </div>
              <h1 className="text-4xl font-black uppercase text-emerald-400 italic tracking-widest">INVOICE</h1>
           </div>
        </div>
      );
    }

  if (id === 'geo-origami-fold') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-noble-surface p-6 shadow-2xl border border-slate-50 rounded-tr-[5rem]">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right">
                 <h1 className="text-6xl font-black text-noble-text tracking-tighter uppercase italic drop-shadow-xl">ORIGAMI</h1>
                 <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.8em]">Paper Fold Professional</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-pixel-perfect') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16 border-4 border-slate-900 p-8">
              <div className="flex gap-6 items-center">
                 <div className="w-16 h-16 bg-slate-900 flex items-center justify-center">
                    {renderLogo?.("w-12 h-12", true)}
                 </div>
                 <h2 className="text-2xl font-black uppercase tracking-[0.2em]">{sender?.full_name}</h2>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic border-b-8 border-slate-900">INVOICE</h1>
           </div>
        </div>
      );
    }

  if (id === 'geo-hexa-premium') {
      return (
        <div className="relative pt-16 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16">
              <div className="bg-[#1E293B] p-8 shadow-2xl border border-white/10" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right text-white">
                 <h1 className="text-6xl font-black uppercase tracking-widest text-slate-400">HEXA</h1>
                 <h2 className="text-2xl font-black uppercase tracking-tighter text-white -mt-2">PREMIUM SERIES</h2>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-matrix-dots') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16">
              <div className="bg-noble-surface p-8 rounded-full shadow-xl border-4 border-slate-900">
                 {renderLogo?.("w-20 h-20")}
              </div>
              <div className="text-right pt-4">
                 <h1 className="text-8xl font-black text-noble-text opacity-5 leading-none mb-2 select-none">MATRIX</h1>
                 <h2 className="text-4xl font-black text-noble-text uppercase tracking-tighter relative z-10">INVOICE</h2>
                 <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.5em]">{sender?.full_name}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-shattered-glass') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16 bg-slate-50/50 backdrop-blur-md p-10 border border-noble-border">
              <div className="flex flex-col gap-2">
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic text-slate-800">{sender?.full_name}</h2>
                 <div className="h-1 w-32 bg-slate-400" />
              </div>
              <div className="bg-noble-surface p-4 shadow-xl -rotate-6">
                 {renderLogo?.("w-20 h-20")}
              </div>
           </div>
           <h1 className="text-[12rem] font-black text-noble-text opacity-[0.02] absolute top-12 pointer-events-none uppercase italic">SHATTERED</h1>
        </div>
      );
    }

  if (id === 'geo-brutalist-block') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-start mb-16">
              <div className="bg-slate-900 p-10 text-white shadow-[15px_15px_0px_rgba(0,0,0,0.1)]">
                 {renderLogo?.("w-20 h-20", true)}
                 <h2 className="text-2xl font-black uppercase mt-6 tracking-widest">{sender?.full_name}</h2>
              </div>
              <div className="text-right pt-6">
                 <h1 className="text-7xl font-black uppercase tracking-tighter text-noble-text border-b-[16px] border-slate-900 pb-2">INVOICE</h1>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-concentric-circles') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-16">
              <div className="text-noble-text">
                 <h2 className="text-3xl font-black uppercase tracking-widest leading-none">{sender?.full_name}</h2>
                 <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-[0.4em]">Circular Dynamics Series</p>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-slate-100 rounded-full scale-150 blur-xl opacity-50" />
                 <div className="bg-noble-surface p-8 rounded-full shadow-2xl border border-slate-50 relative z-10">
                    {renderLogo?.("w-20 h-20")}
                 </div>
              </div>
           </div>
           <h1 className="text-6xl font-black text-noble-text opacity-5 absolute top-24 uppercase tracking-[1em]">CONCENTRIC</h1>
        </div>
      );
    }

  if (id === 'geo-isometric-tower') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-16 bg-slate-900 p-12 shadow-2xl skew-y-[-2deg]">
              <div className="flex gap-8 items-center skew-y-[2deg]">
                 <div className="bg-noble-surface p-4 rounded-none shadow-xl border-t-4 border-slate-400">
                    {renderLogo?.("w-16 h-16")}
                 </div>
                 <div className="text-white">
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">{sender?.full_name}</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Isometric Corporate Series</p>
                 </div>
              </div>
              <h1 className="text-5xl font-black text-white uppercase tracking-[0.2em] skew-y-[2deg]">INVOICE</h1>
           </div>
        </div>
      );
    }

  if (id === 'geo-navy-prism') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-12 text-white">
              <div className="flex gap-6 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{sender?.full_name}</h2>
                    <p className="text-xs font-bold opacity-60 max-w-xs">{sender?.address?.split('\n')[0]}</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <h1 className="text-6xl font-black uppercase tracking-[0.2em]">INVOICE</h1>
                 <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl">
                    <Diamond className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
           </div>
           <div className="bg-noble-surface rounded-[2.5rem] p-1 shadow-2xl -mb-1" />
        </div>
      );
    }

  if (id === 'geo-cyan-edge') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-12 text-white">
              <div className="flex gap-6 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{sender?.full_name}</h2>
                    <p className="text-xs font-bold opacity-60">{sender?.email}</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <h1 className="text-6xl font-black uppercase tracking-[0.2em]">INVOICE</h1>
                 <div className="bg-[#06B6D4] p-3 rounded-2xl shadow-xl">
                    <Diamond className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
           </div>
           <div className="bg-noble-surface rounded-[2.5rem] p-1 shadow-2xl -mb-1" />
        </div>
      );
    }

  if (id === 'geo-cobalt-stripe') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-12 text-white">
              <div className="flex gap-6 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{sender?.full_name}</h2>
                    <p className="text-xs font-bold opacity-60">{sender?.address?.split('\n')[0]}</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <h1 className="text-6xl font-black uppercase tracking-[0.2em]">INVOICE</h1>
                 <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl">
                    <Diamond className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
           </div>
           <div className="bg-noble-surface rounded-[2.5rem] p-1 shadow-2xl -mb-1" />
        </div>
      );
    }

  if (id === 'geo-onyx-glass') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-12 text-white">
              <div className="flex gap-6 items-center">
                 <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
                    {renderLogo?.("w-20 h-20")}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{sender?.full_name}</h2>
                    <p className="text-xs font-bold opacity-60">{sender?.email}</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <h1 className="text-6xl font-black uppercase tracking-[0.2em]">INVOICE</h1>
                 <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl">
                    <Diamond className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
           </div>
           <div className="bg-noble-surface rounded-[2.5rem] p-1 shadow-2xl -mb-1" />
        </div>
      );
    }

  if (id === 'geo-slate-minimal') {
      return (
        <div className="relative pt-12 px-16 z-10 flex flex-col">
           <div className="flex justify-between items-center mb-12 text-noble-text">
              <div className="flex gap-6 items-center">
                 <div className="bg-[#334155] p-4 rounded-2xl shadow-xl">
                    {renderLogo?.("w-20 h-20", true)}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{sender?.full_name}</h2>
                    <p className="text-xs font-bold opacity-60">{sender?.email}</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <h1 className="text-6xl font-black uppercase tracking-[0.2em]">INVOICE</h1>
                 <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl">
                    <Diamond className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-austen') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-start px-16 pt-16 z-10 bg-noble-surface overflow-hidden">
           {/* Top Right Polygons */}
           <div className="absolute top-0 right-0 w-[40%] h-full bg-[#1E3A8A]" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0% 100%)' }} />
           <div className="absolute top-0 right-[25%] w-[30%] h-full bg-[#9F7AEA]" style={{ clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0% 100%)' }} />
           
           <div className="flex flex-col gap-2 relative z-20 w-[60%]">
              <h1 className="text-4xl font-black text-[#1E3A8A] uppercase">{sender?.full_name || 'Austen Tech'}</h1>
              <p className="text-sm font-bold text-noble-text leading-relaxed max-w-sm">{sender?.address || '23 Anywhere St., Any City, ST 12345'}</p>
           </div>
           
           <div className="flex flex-col items-end gap-2 relative z-20 text-white mt-12 pr-12">
              {/* Header elements are moved to body later but we can put logo here if needed. No logo in Austen screenshot */}
           </div>
           
           {/* Absolute position "Invoice" text lower down */}
           <div className="absolute bottom-4 left-16 flex justify-between w-[calc(100%-8rem)] items-end">
              <h1 className="text-7xl font-black text-[#1E3A8A]">Invoice</h1>
              <div className="text-right text-noble-text">
                 <p className="text-xl font-black mb-1">Invoice # {data.invoiceNumber}</p>
                 <p className="text-xl font-black">{data.date}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-banner') {
      return (
        <div className="relative mb-12 flex flex-col z-10">
           <div className="flex justify-between items-start pt-16 px-16 mb-8">
              <div className="bg-[#1E293B] text-white py-4 px-12 -ml-16 rounded-r-xl inline-block shadow-lg">
                 <h2 className="text-2xl font-black tracking-widest">Invoice To :</h2>
              </div>
              <div className="text-right">
                 <h1 className="text-7xl font-black text-[#1E293B] uppercase tracking-[0.2em] mb-4">INVOICE</h1>
                 <div className="bg-[#1E293B] text-white py-4 px-12 -mr-16 rounded-l-xl inline-block shadow-lg float-right">
                    <p className="text-xl font-black tracking-widest uppercase">{sender?.full_name || 'YOUR COMPANY NAME'}</p>
                 </div>
              </div>
           </div>
           <div className="px-16 flex justify-between">
              <div className="text-sm font-bold text-slate-600 space-y-1">
                 <h3 className="text-lg font-black text-[#1E293B] uppercase mb-2">{client?.name || 'AROWWAI INDUSTRIES'}</h3>
                 <p>{client?.email || 'hello@reallygreatsite.com'}</p>
                 <p className="whitespace-pre-line">{client?.address || '123 Anywhere St., Any City ST 12345'}</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-proforma') {
      return (
        <div className="relative mb-12 flex justify-between items-start px-16 pt-24 z-10 text-white">
           <h1 className="text-6xl font-black tracking-wider uppercase drop-shadow-sm">FATTURA PROFORMA</h1>
           <div className="text-right flex flex-col gap-1 items-end">
              <h2 className="text-2xl font-black tracking-widest uppercase text-[#1E293B] mb-2">{sender?.full_name || 'BORCELLE'}</h2>
              <p className="text-sm font-bold text-[#1E293B] opacity-80">{sender?.address?.split('\n').join(', ') || '123 Anywhere St., Any City'}</p>
              <p className="text-sm font-bold text-[#1E293B] opacity-80">{sender?.phone_number || '+123-456-7890'}</p>
              <p className="text-sm font-bold text-[#1E293B] opacity-80">{sender?.email || 'hello@reallygreatsite.com'}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-green-angle') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-start px-16 pt-16 z-10 bg-noble-surface overflow-hidden">
           <div className="absolute top-0 left-0 w-[60%] h-full bg-[#10B981]" style={{ clipPath: 'polygon(0 0, 100% 0, 30% 100%, 0% 100%)' }} />
           <div className="absolute top-0 left-0 w-[65%] h-12 bg-slate-200" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }} />
           
           <div className="flex flex-col gap-1 relative z-20 text-[#111827] mt-24">
              <h2 className="text-xl font-black uppercase tracking-widest">{sender?.full_name || 'AROWWAI\nINDUSTRIES'}</h2>
           </div>
           
           <div className="flex flex-col items-end gap-2 relative z-20 text-[#111827] mt-16">
              <h1 className="text-[90px] font-black uppercase tracking-tighter leading-none">INVOICE</h1>
           </div>
        </div>
      );
    }

  if (id === 'geo-triangle') {
      return (
        <div className="relative mb-12 flex flex-col px-16 pt-16 z-10 bg-noble-surface">
           <div className="flex justify-between items-start w-full">
              <h1 className="text-8xl font-black text-[#111827] uppercase tracking-tighter">INVOICE</h1>
              <div className="flex flex-col gap-3 text-right">
                 <div className="flex items-center gap-3 justify-end text-slate-700">
                    <Mail className="w-5 h-5" />
                    <span className="font-bold">{sender?.email || 'hello@reallygreatsite.com'}</span>
                 </div>
                 <div className="flex items-center gap-3 justify-end text-slate-700">
                    <Phone className="w-5 h-5" />
                    <span className="font-bold">{sender?.phone_number || '+123-456-7890'}</span>
                 </div>
              </div>
           </div>
           <div className="w-full flex h-1.5 mt-6">
              <div className="w-[60%] bg-[#312E81] h-full" />
              <div className="w-[40%] bg-[#38BDF8] h-full" />
           </div>
        </div>
      );
    }

  if (id === 'geo-solid-purple') {
      return (
        <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden" style={{ backgroundColor: brand.main }}>
          <div className="absolute top-0 right-0 w-96 h-full opacity-20">
            <div className="absolute top-0 right-32 w-32 h-full" style={{ backgroundColor: brand.medium, clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0% 100%)' }} />
            <div className="absolute top-0 right-0 w-32 h-full" style={{ backgroundColor: brand.soft, clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0% 100%)' }} />
          </div>
          {renderLogo?.("w-24 h-24", true)}
          <div className="flex items-center gap-6 relative z-20">
            <h1 className="text-6xl font-black uppercase tracking-tight text-white">INVOICE</h1>
            <Diamond className="w-10 h-10 text-[#FBBF24] fill-[#FBBF24]" />
          </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
