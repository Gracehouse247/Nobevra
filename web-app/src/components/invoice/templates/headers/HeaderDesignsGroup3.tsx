import React from 'react';
import { SharedEngineProps } from '../types';
import { Diamond } from 'lucide-react';

export const ModernMinimalHeader = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="relative pt-24 pb-16 flex flex-col items-center z-10 bg-noble-surface">
       <div role="presentation" className="text-8xl font-black uppercase tracking-[0.2em] text-noble-text leading-none mb-6">INVOICE</div>
       <div className="flex flex-col items-center text-center gap-1">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest">{sender?.full_name}</h2>
          <p className="text-xs font-bold text-slate-400 max-w-md">{sender?.address?.split('\n').join(' • ')}</p>
          <p className="text-xs font-bold text-slate-400">{sender?.email}</p>
       </div>
    </div>
  );
};

export const PastelBloomHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden rounded-b-[4rem]" style={{ background: 'linear-gradient(90deg, #60A5FA 0%, #F472B6 100%)' }}>
       <div className="flex gap-6 items-center relative z-20">
          <div className="bg-noble-surface p-4 rounded-3xl shadow-2xl">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-white">
             <h2 className="text-2xl font-black leading-tight uppercase">{sender?.full_name}</h2>
             <p className="text-xs font-bold opacity-80">{sender?.address?.split('\n')[0]}</p>
          </div>
       </div>
       <div className="text-right flex items-center gap-6">
          <div role="presentation" className="text-7xl font-black text-white uppercase tracking-tighter leading-none italic">INVOICE</div>
          <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl -mt-4">
             <Diamond className="w-8 h-8 text-white fill-white" />
          </div>
       </div>
    </div>
  );
};

export const BluePrecisionHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden bg-[#1E3A8A]">
       <div className="absolute top-0 right-0 w-[45%] h-full bg-noble-surface/10" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       <div className="absolute top-0 right-[40%] w-12 h-full bg-noble-surface/5" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       
       <div className="flex gap-8 items-center relative z-20">
          <div className="bg-noble-surface p-5 rounded-2xl shadow-2xl">
             {renderLogo?.("w-20 h-20")}
          </div>
          <div className="text-white">
             <h2 className="text-2xl font-black leading-tight uppercase tracking-widest">{sender?.full_name}</h2>
             <p className="text-[10px] font-bold opacity-60 tracking-widest uppercase">Certified Enterprise Partner</p>
          </div>
       </div>
       
       <div className="text-right relative z-20 flex items-center gap-6 pr-12">
          <div role="presentation" className="text-7xl font-black text-white uppercase tracking-tighter leading-none italic drop-shadow-2xl">INVOICE</div>
          <div className="bg-noble-surface/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
             <Diamond className="w-8 h-8 text-[#FBBF24] fill-[#FBBF24]" />
          </div>
       </div>
    </div>
  );
};

export const OrangeOrbitHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden border-b-8 border-[#F97316]">
       <div className="absolute top-0 right-0 w-[50%] h-full opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#F97316 2px, transparent 2px)', backgroundSize: '15px 15px' }} />
       
       <div className="flex gap-6 items-center relative z-20">
          <div className="bg-noble-surface p-4 rounded-3xl shadow-[0_20px_50px_rgba(249,115,22,0.1)] border border-orange-50">
              {renderLogo?.("w-20 h-20")}
          </div>
          <div className="flex flex-col">
             <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tighter">{sender?.full_name}</h2>
             <p className="text-xs font-bold text-slate-400">{sender?.email}</p>
          </div>
       </div>
       
       <div className="text-right">
          <div role="presentation" className="text-8xl font-black text-[#F97316] uppercase tracking-tighter leading-none">INVOICE</div>
          <div className="w-24 h-2 bg-[#F97316] mt-4 ml-auto rounded-full" />
       </div>
    </div>
  );
};

export const OceanicWaveHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden">
       <svg className="absolute top-0 left-0 w-full h-48 text-[#3B82F6] opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
       </svg>
       
       <div className="flex gap-8 items-center relative z-20 bg-noble-surface/80 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border border-white">
          {renderLogo?.("w-20 h-20")}
          <div className="flex flex-col">
             <h2 className="text-2xl font-black text-noble-text uppercase tracking-tighter">{sender?.full_name}</h2>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{sender?.address?.split('\n')[0]}</p>
          </div>
       </div>
       
       <div className="text-right flex items-center gap-6 relative z-20">
          <div role="presentation" className="text-7xl font-black text-[#3B82F6] uppercase tracking-tighter leading-none italic">INVOICE</div>
          <div className="bg-[#3B82F6] p-3 rounded-2xl shadow-xl -mt-6">
             <Diamond className="w-8 h-8 text-white fill-white" />
          </div>
       </div>
    </div>
  );
};

export const BrickHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-start px-16 pt-12 z-10 overflow-hidden shadow-2xl">
       <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Brick Wall" />
          <div className="absolute inset-0 bg-[#D97706]/20 mix-blend-multiply" />
       </div>
       <div className="flex gap-6 items-center relative z-20 bg-noble-surface p-4 rounded-xl shadow-2xl border border-slate-100">
          {renderLogo?.("w-20 h-20")}
          <div>
             <h2 className="text-2xl font-black text-noble-text leading-tight tracking-tighter uppercase">{sender?.full_name}</h2>
             <p className="text-sm font-bold text-slate-500">{sender?.email}</p>
          </div>
       </div>
       <div className="text-right relative z-20">
          <div className="flex items-center gap-4 justify-end">
             <div role="presentation" className="text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">INVOICE</div>
             <div className="bg-[#FBBF24] p-3 rounded-2xl shadow-xl -mt-8">
                <Diamond className="w-8 h-8 text-white fill-white" />
             </div>
          </div>
       </div>
    </div>
  );
};

export const DarkGoldHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 bg-[#0F172A] overflow-hidden">
       <div className="absolute top-0 right-0 w-[45%] h-full z-0" style={{ backgroundColor: '#EAB308', clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       <div className="absolute top-0 right-[40%] w-12 h-full bg-noble-surface z-10 opacity-20" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       
       <div className="flex gap-8 items-center relative z-20 bg-noble-surface p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {renderLogo?.("w-20 h-20")}
          <div className="flex flex-col">
             <h2 className="text-2xl font-black text-noble-text uppercase tracking-tighter">{sender?.full_name}</h2>
             <p className="text-sm font-bold text-slate-400">{sender?.email}</p>
          </div>
       </div>
       
       <div className="text-right relative z-20 pr-12">
          <div className="flex items-center gap-4 justify-end">
             <div role="presentation" className="text-7xl font-black uppercase tracking-tighter text-[#0F172A] italic drop-shadow-sm">INVOICE</div>
             <div className="bg-[#0F172A] p-3 rounded-2xl shadow-2xl -mt-4">
                <Diamond className="w-8 h-8 text-[#EAB308] fill-[#EAB308]" />
             </div>
          </div>
       </div>
    </div>
  );
};

export const NavyRibbonHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden bg-[#1E3A8A]">
       <div className="absolute bottom-0 left-0 w-full h-5 bg-[#E11D48]" />
       <div className="absolute top-0 right-0 w-[40%] h-full bg-noble-surface opacity-10" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       
       <div className="flex gap-8 items-center relative z-20 bg-noble-surface p-5 rounded-3xl shadow-2xl">
          {renderLogo?.("w-20 h-20")}
          <div className="flex flex-col">
             <h2 className="text-2xl font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</h2>
             <p className="text-sm font-bold text-slate-400">{sender?.email}</p>
          </div>
       </div>
       
       <div className="text-right relative z-20 pr-12 text-white">
          <div className="flex items-center gap-4 justify-end">
             <div role="presentation" className="text-7xl font-black uppercase tracking-tighter italic">INVOICE</div>
             <div className="bg-noble-surface/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 -mt-6">
                <Diamond className="w-8 h-8 text-amber-400 fill-amber-400" />
             </div>
          </div>
       </div>
    </div>
  );
};

export const SlateAngleHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden bg-[#1E293B]">
       <div className="absolute top-0 right-0 w-[55%] h-full bg-[#334155]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       <div className="absolute top-0 right-[50%] w-12 h-full bg-noble-surface opacity-10" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       
       <div className="flex gap-8 items-center relative z-20 bg-noble-surface p-5 rounded-2xl shadow-2xl">
          {renderLogo?.("w-20 h-20")}
          <div className="flex flex-col">
             <h2 className="text-2xl font-black text-noble-text uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
             <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Executive Partner</p>
          </div>
       </div>
       
       <div className="text-right relative z-20 pr-12 text-white">
          <div className="flex items-center gap-4 justify-end">
             <div role="presentation" className="text-7xl font-black uppercase tracking-tighter italic">INVOICE</div>
             <div className="bg-[#1E293B] p-3 rounded-2xl shadow-2xl -mt-6 border border-slate-700">
                <Diamond className="w-8 h-8 text-amber-400 fill-amber-400" />
             </div>
          </div>
       </div>
    </div>
  );
};

export const ConstructionHeader = (props: SharedEngineProps) => {
  const { data, renderLogo } = props;
  const { sender } = data;
  return (
    <div className="relative h-64 mb-12 flex justify-between items-center px-16 z-10 overflow-hidden shadow-2xl rounded-b-[4rem]">
       <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Construction Hats" />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
       </div>
       
       <div className="flex gap-8 items-center relative z-20 bg-noble-surface p-6 rounded-3xl shadow-2xl border border-slate-100">
          {renderLogo?.("w-20 h-20")}
          <div className="flex flex-col">
             <h2 className="text-3xl font-black text-noble-text uppercase tracking-tighter leading-none">{sender?.full_name}</h2>
             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Builder Excellence</p>
          </div>
       </div>
       
       <div className="text-right relative z-20 pr-12 text-white">
          <div className="flex items-center gap-4 justify-end">
             <div role="presentation" className="text-8xl font-black uppercase tracking-tighter italic drop-shadow-2xl">INVOICE</div>
             <div className="bg-[#EAB308] p-3 rounded-2xl shadow-2xl -mt-8">
                <Diamond className="w-8 h-8 text-white fill-white" />
             </div>
          </div>
       </div>
    </div>
  );
};
