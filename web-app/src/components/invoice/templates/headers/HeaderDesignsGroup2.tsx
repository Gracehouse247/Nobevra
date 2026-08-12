import React from 'react';
import { SharedEngineProps } from '../types';
import { Diamond } from 'lucide-react';

export const BlueWavePremiumHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="relative">
             <div className="absolute -inset-4 bg-[#2563EB]/10 rounded-full blur-2xl" />
             <div className="bg-noble-surface p-6 rounded-[3rem] shadow-2xl relative z-10">
                {renderLogo?.("w-20 h-20")}
             </div>
          </div>
          <div className="text-right">
             <h1 className="text-7xl font-black uppercase text-[#2563EB] tracking-tighter mb-2 italic">PREMIUM</h1>
             <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-400">Exclusive Series</p>
          </div>
       </div>
    </div>
  );
};

export const BlueCurvedBannerHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative pt-8 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="text-white drop-shadow-lg">
             <h2 className="text-2xl font-black uppercase tracking-widest">{sender?.full_name}</h2>
             <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.4em] mt-1">Authorized Billing Portal</p>
          </div>
          <div className="bg-noble-surface p-4 rounded-2xl shadow-2xl scale-110">
             {renderLogo?.("w-16 h-16")}
          </div>
       </div>
    </div>
  );
};

export const CarbonFiberHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="bg-[#1C1C1C] p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-right">
             <h1 className="text-7xl font-black uppercase text-white tracking-tighter mb-2 italic drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">CARBON</h1>
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-500">Elite Series • Professional</p>
          </div>
       </div>
    </div>
  );
};

export const SageMinimalHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-start mb-16">
          <div className="flex items-center gap-8">
             <div className="bg-noble-surface p-6 rounded-full shadow-xl border-4 border-[#6B8F71]/20">
                {renderLogo?.("w-16 h-16")}
             </div>
             <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-noble-text leading-none">{sender?.full_name}</h2>
                <p className="text-xs font-bold text-[#6B8F71] mt-2 tracking-widest uppercase">Sage Executive Series</p>
             </div>
          </div>
          <div className="text-right pt-4">
             <h1 className="text-5xl font-black uppercase text-slate-200 tracking-widest leading-none">INVOICE</h1>
          </div>
       </div>
    </div>
  );
};

export const CrimsonLedgerHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-16 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="text-white">
             <h1 className="text-9xl font-black uppercase tracking-tighter leading-none opacity-20 -ml-2 mb-4">LEDGER</h1>
             <h2 className="text-4xl font-black uppercase text-white relative z-10">INVOICE</h2>
          </div>
          <div className="bg-noble-surface p-8 rounded-[3rem] shadow-2xl border-4 border-white/10">
             {renderLogo?.("w-24 h-24")}
          </div>
       </div>
    </div>
  );
};

export const CobaltSplitHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="bg-noble-surface p-6 rounded-3xl shadow-2xl border border-slate-100">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-right">
             <h1 className="text-8xl font-black uppercase text-[#1D4ED8] tracking-tighter leading-none opacity-10">COBALT</h1>
             <h2 className="text-4xl font-black uppercase text-noble-text -mt-10 relative z-10">INVOICE</h2>
          </div>
       </div>
    </div>
  );
};

export const SlateGridHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-start mb-16 border-b-4 border-[#475569] pb-8">
          <div className="flex gap-6 items-center">
             <div className="bg-noble-surface p-4 rounded-xl shadow-lg border border-noble-border">
                {renderLogo?.("w-16 h-16")}
             </div>
             <div>
                <h2 className="text-2xl font-black uppercase tracking-widest text-[#475569]">{sender?.full_name}</h2>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Grid Series Professional</p>
             </div>
          </div>
          <div className="text-right">
             <h1 className="text-4xl font-black uppercase text-[#475569] tracking-tighter leading-none italic">DOCUMENT</h1>
             <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-[0.4em]">Official Statement</p>
          </div>
       </div>
    </div>
  );
};

export const ForestPremiumHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-16 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="bg-noble-surface p-6 rounded-3xl shadow-2xl border-4 border-[#14532D]/20">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-right">
             <h1 className="text-6xl font-black uppercase text-white tracking-tighter italic">FOREST</h1>
             <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#EAB308] mt-2">Premium Series • Gold Member</p>
          </div>
       </div>
    </div>
  );
};

export const EmeraldNexusHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
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
          <h1 className="text-6xl font-black uppercase tracking-[0.2em] italic">INVOICE</h1>
       </div>
       <div className="bg-noble-surface rounded-[2.5rem] p-1 shadow-2xl -mb-1" />
    </div>
  );
};

export const RoyalPurpleHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
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
          <h1 className="text-6xl font-black uppercase tracking-[0.2em]">INVOICE</h1>
       </div>
       <div className="bg-noble-surface rounded-[3rem] p-1 shadow-2xl -mb-1" />
    </div>
  );
};
