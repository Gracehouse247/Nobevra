import React from 'react';
import { SharedEngineProps } from '../types';
import { Diamond } from 'lucide-react';

export const BlueHorizonHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="bg-noble-surface p-6 rounded-[2.5rem] shadow-2xl border-4 border-white/20">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-right">
             <div role="presentation" className="text-8xl font-black uppercase text-white tracking-tighter leading-none opacity-20">BILLING</div>
             <h2 className="text-4xl font-black uppercase text-white -mt-12 relative z-10">INVOICE</h2>
             <div className="flex justify-end mt-4">
                <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl border-4 border-white/10">
                   <Diamond className="w-8 h-8 text-white fill-white" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export const RedDiamondHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col pl-48">
       <div className="flex justify-between items-start mb-12">
          <div>
             <div role="presentation" className="text-9xl font-black uppercase text-[#B91C1C] tracking-tighter leading-none opacity-10 absolute -left-12 top-12 rotate-90 origin-left">OFFICIAL</div>
             <h2 className="text-7xl font-black uppercase text-noble-text tracking-tight">INVOICE</h2>
             <p className="text-sm font-black uppercase tracking-[1em] text-slate-400 mt-2">Noble Enterprise</p>
          </div>
          <div className="bg-noble-surface p-6 rounded-full shadow-2xl border-8 border-slate-50">
             {renderLogo?.("w-24 h-24")}
          </div>
       </div>
    </div>
  );
};

export const NavyGeometricHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-right">
             <div role="presentation" className="text-7xl font-black uppercase text-white tracking-tighter mb-2">INVOICE</div>
             <div className="flex justify-end items-center gap-4">
                <span className="w-32 h-1 bg-[#3B82F6] rounded-full" />
                <Diamond className="w-6 h-6 text-[#3B82F6] fill-[#3B82F6]" />
             </div>
          </div>
       </div>
    </div>
  );
};

export const TealGeometricHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-24 px-16 z-10 flex flex-col items-center">
       <div className="w-full flex justify-between items-center mb-12">
          <div className="text-[#14B8A6]">
             <div role="presentation" className="text-8xl font-black uppercase tracking-tighter leading-none">INV<span className="opacity-20">.X</span></div>
             <p className="text-xs font-black tracking-[0.5em] mt-4 uppercase text-white/40">Secure Digital Asset</p>
          </div>
          <div className="bg-noble-surface/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(20,184,166,0.1)]">
             {renderLogo?.("w-20 h-20")}
          </div>
       </div>
    </div>
  );
};

export const OrangeGeometricHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-start mb-16">
          <div className="flex gap-8 items-center">
             <div className="bg-noble-surface p-4 rounded-3xl shadow-2xl">
                {renderLogo?.("w-20 h-20")}
             </div>
             <div className="text-white">
                <h2 className="text-3xl font-black uppercase tracking-tight">{sender?.full_name}</h2>
                <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest">Premium Partner</p>
             </div>
          </div>
          <div role="presentation" className="text-8xl font-black uppercase text-white tracking-tighter opacity-5 -mr-12 -mt-4">ORANGE</div>
       </div>
    </div>
  );
};

export const YellowSharpHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col pl-40">
       <div className="flex justify-between items-end mb-16">
          <div>
             <div role="presentation" className="text-7xl font-black uppercase text-noble-text tracking-tighter leading-none">INVOICE</div>
             <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 mt-4 italic">Industrial Documentation Series</p>
          </div>
          <div className="bg-noble-surface p-6 rounded-none shadow-2xl border-r-8 border-b-8 border-black">
             {renderLogo?.("w-20 h-20")}
          </div>
       </div>
    </div>
  );
};

export const BlackYellowGeoHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-start mb-24">
          <div className="bg-noble-surface p-4 rounded-none shadow-[20px_20px_0_0_#FBBF24]">
             {renderLogo?.("w-24 h-24")}
          </div>
          <div className="text-right">
             <div role="presentation" className="text-6xl font-black uppercase text-[#FBBF24] tracking-[0.2em] mb-4">ROYAL</div>
             <p className="text-xs font-bold text-white tracking-widest">LUXURY INVOICE SYSTEM</p>
          </div>
       </div>
    </div>
  );
};

export const CyanBlackGeoHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16">
          <div className="relative">
             <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#06B6D4]" />
             <div className="bg-noble-surface p-6 shadow-xl">
                {renderLogo?.("w-20 h-20")}
             </div>
          </div>
          <div className="text-right">
             <div role="presentation" className="text-6xl font-black uppercase text-noble-text tracking-tighter italic underline decoration-[#06B6D4] decoration-8 underline-offset-8">INVOICE</div>
          </div>
       </div>
    </div>
  );
};

export const YellowBluePillHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-center mb-16 bg-noble-surface/50 backdrop-blur-md p-8 rounded-[4rem] border border-white/20 shadow-xl">
          <div className="flex gap-6 items-center">
             <div className="w-20 h-20 bg-noble-surface rounded-full shadow-lg flex items-center justify-center p-4">
                {renderLogo?.("w-12 h-12")}
             </div>
             <div>
                <h2 className="text-2xl font-black uppercase text-noble-text">{sender?.full_name}</h2>
                <p className="text-[10px] font-bold text-[#2563EB] tracking-widest uppercase">Global Series</p>
             </div>
          </div>
          <div className="bg-[#FBBF24] px-10 py-4 rounded-full shadow-lg">
             <div role="presentation" className="text-3xl font-black uppercase text-noble-text tracking-widest">INVOICE</div>
          </div>
       </div>
    </div>
  );
};

export const YellowMinimalGeoHeader = (props: SharedEngineProps) => {
  const { renderLogo } = props;
  return (
    <div className="relative pt-12 px-16 z-10 flex flex-col">
       <div className="flex justify-between items-start mb-16">
          <div className="bg-noble-surface p-4 rounded-2xl shadow-xl">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-right">
             <div role="presentation" className="text-9xl font-black uppercase text-[#FBBF24] tracking-tighter leading-none opacity-20">MINIMAL</div>
             <h2 className="text-4xl font-black uppercase text-noble-text -mt-10 relative z-10">INVOICE</h2>
          </div>
       </div>
    </div>
  );
};
