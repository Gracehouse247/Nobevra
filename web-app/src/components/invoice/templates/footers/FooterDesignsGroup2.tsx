import React from 'react';
import { SharedEngineProps } from '../types';
import { Globe, Signature, CheckCircle2, ShieldCheck, Diamond, Phone, Building2 } from 'lucide-react';

export const BlueWavePremiumFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto h-48 relative z-10 overflow-hidden flex flex-col justify-end">
       <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: '120px' }}>
          <path fill="#2563EB" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,202.7C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path fill="#1E40AF" opacity="0.3" d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
       </svg>
       <div className="px-16 flex justify-between items-end pb-12 relative z-20">
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <Globe className="w-5 h-5 text-blue-200" />
                <span className="text-sm font-black uppercase tracking-widest">{sender?.website}</span>
             </div>
          </div>
          <div className="flex flex-col items-center gap-2">
             <div className="w-48 h-16 border-b-2 border-white/20 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-white/10" />
                )}
             </div>
             <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const BlueCurvedBannerFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto h-24 bg-slate-900 relative z-10">
       <div className="absolute -top-8 left-0 w-full h-8 bg-slate-900" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} />
       <div className="px-16 h-full flex justify-between items-center text-white">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">Global Standard Billing</div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-10 border-b border-white/20 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-white/5" />
                )}
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest mt-2">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const CarbonFiberFooter = (props: SharedEngineProps) => {
  const { data } = props;
  return (
    <div className="mt-auto h-32 relative z-10 flex items-center justify-between px-16 border-t border-white/10 bg-[#111]">
       <div className="space-y-1">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Elite Carbon Series</p>
       </div>
       <div className="flex flex-col items-center">
          <div className="w-48 h-12 border-b border-white/20 mb-2 flex items-center justify-center" >
              {data.signatureUrl ? (
                <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
              ) : (
                <Signature className="w-8 h-8 text-white/10" />
              )}
          </div>
          <p className="text-[10px] font-black text-white uppercase tracking-widest">Authorized Signature</p>
       </div>
    </div>
  );
};

export const SageMinimalFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto h-24 px-16 flex items-center justify-between text-slate-400 relative z-10 border-t border-slate-100">
       <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sage Executive Series</p>
       <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#6B8F71]" />
          <span className="text-[10px] font-bold uppercase">Sage Verified</span>
       </div>
    </div>
  );
};

export const CrimsonLedgerFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto h-32 bg-[#991B1B] px-16 flex items-center justify-between text-white relative z-10">
       <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Crimson Ledger Official</p>
       <div className="flex flex-col items-center">
          <div className="w-48 h-12 border-b border-white/20 mb-2 flex items-center justify-center">
             {data.signatureUrl ? (
               <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
             ) : (
               <Signature className="w-8 h-8 text-white/10" />
             )}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest">Signature</p>
       </div>
    </div>
  );
};

export const CobaltSplitFooter = (props: SharedEngineProps) => {
  return (
    <div className="mt-auto h-24 flex items-center justify-between px-16 relative z-10">
       <div className="w-[45%] text-slate-400">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">Cobalt Split Series</p>
       </div>
       <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 text-[#1D4ED8]">
             <ShieldCheck className="w-5 h-5" />
             <span className="text-[10px] font-black uppercase tracking-widest">Secure Billing</span>
          </div>
       </div>
    </div>
  );
};

export const SlateGridFooter = (props: SharedEngineProps) => {
  const { data } = props;
  return (
    <div className="mt-auto h-24 px-16 flex items-center justify-between text-slate-400 relative z-10 border-t border-noble-border bg-slate-50">
       <p className="text-[10px] font-black uppercase tracking-[0.4em]">Slate Grid Series</p>
       <div className="w-40 h-8 border-b border-slate-300 flex items-center justify-center">
          {data.signatureUrl && <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />}
       </div>
    </div>
  );
};

export const ForestPremiumFooter = (props: SharedEngineProps) => {
  const { data } = props;
  return (
    <div className="mt-auto h-32 bg-[#14532D] px-16 flex items-center justify-between text-white relative z-10">
       <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Forest Premium Series</p>
       <div className="flex flex-col items-center">
          <div className="w-48 h-12 border-b-white/10 mb-2 flex items-center justify-center">
             {data.signatureUrl ? (
               <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
             ) : (
               <Signature className="w-8 h-8 text-white/5" />
             )}
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest">Official Signature</p>
       </div>
    </div>
  );
};

export const EmeraldNexusFooter = (props: SharedEngineProps) => {
  const { data } = props;
  return (
    <div className="mt-auto relative h-32 overflow-hidden z-10 flex">
       <div className="w-[60%] bg-[#064E3B] h-full flex items-center px-16 text-white text-xs font-bold leading-relaxed">
          <p className="max-w-[80%]">{data.notes || 'Please pay within 15 days. Subject to NobleInvoice terms.'}</p>
       </div>
       <div className="flex-1 bg-[#F97316]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
    </div>
  );
};

export const RoyalPurpleFooter = (props: SharedEngineProps) => {
  return (
    <div className="mt-auto relative h-32 overflow-hidden z-10 flex">
       <div className="w-[70%] bg-[#6D28D9] h-full flex items-center px-16 text-white text-xs font-bold leading-relaxed">
          <p className="max-w-[80%] italic opacity-80">Official Platinum Verified Document</p>
       </div>
       <div className="flex-1 bg-[#8B5CF6]/40" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
    </div>
  );
};

export const BrickFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto px-16 py-12 relative z-10 border-t-8" style={{ borderTopColor: '#D97706' }}>
       <div className="flex justify-between items-end">
          <div className="space-y-4">
             <h4 className="text-sm font-black text-noble-text uppercase tracking-widest">Terms & Conditions</h4>
             <p className="text-xs font-bold text-slate-500 max-w-sm leading-relaxed">{data.notes || 'Remit payment within 15 days. Subject to NobleInvoice standards.'}</p>
          </div>
          <div className="flex flex-col items-center">
             {data.signatureUrl ? (
               <img src={data.signatureUrl} alt="Signature" className="h-20 w-auto object-contain border-b-2 border-slate-900 mb-2" />
             ) : (
               <div className="w-48 h-12 border-b-2 border-noble-border mb-2" />
             )}
             <p className="text-[10px] font-black text-noble-text uppercase tracking-[0.4em]">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const DarkGoldFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto relative h-32 overflow-hidden z-10 bg-[#0F172A]">
       <div className="absolute inset-y-0 right-0 w-[40%] bg-[#EAB308]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       <div className="relative z-20 h-full flex items-center px-16 justify-between text-white">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/40" />
                <span className="text-xs font-bold">{sender?.phone_number}</span>
             </div>
             <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-white/40" />
                <span className="text-xs font-bold uppercase tracking-widest">{sender?.website}</span>
             </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-noble-text uppercase tracking-[0.5em] italic">Platinum Elite Series</p>
          </div>
       </div>
    </div>
  );
};

export const NavyRibbonFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto relative h-32 overflow-hidden z-10 bg-[#1E3A8A]">
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-400 rotate-45 transform translate-y-1/2" />
       <div className="relative z-20 h-full flex items-center px-16 justify-between text-white">
          <div className="flex items-center gap-12">
             <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">{sender?.full_name}</p>
             <p className="text-xs font-bold">{sender?.email}</p>
          </div>
          <p className="text-[9px] font-black tracking-[0.8em] opacity-20">NOBLE INVOICE ENTERPRISE</p>
       </div>
    </div>
  );
};

export const SlateAngleFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto relative h-32 overflow-hidden z-10 bg-[#1E293B]">
       <div className="absolute top-0 right-10 w-8 h-full bg-noble-surface opacity-10 -rotate-12" />
       <div className="relative z-20 h-full flex items-center px-16 justify-between text-white">
          <div className="flex items-center gap-6">
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 opacity-40" />
             </div>
             <div>
                <p className="text-sm font-black tracking-tighter uppercase">{sender?.full_name}</p>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{sender?.phone_number}</p>
             </div>
          </div>
          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-noble-surface/20" />
             <div className="w-2 h-2 rounded-full bg-noble-surface/40" />
             <div className="w-2 h-2 rounded-full bg-noble-surface" />
          </div>
       </div>
    </div>
  );
};

export const ConstructionFooter = (props: SharedEngineProps) => {
  const { data } = props;
  return (
    <div className="mt-auto relative h-32 overflow-hidden z-10 bg-black">
       <div className="absolute top-0 left-0 w-4 h-full bg-[#EAB308]" />
       <div className="absolute inset-y-0 right-0 w-[30%] bg-[#EAB308]" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
       <div className="relative z-20 h-full flex items-center px-16 justify-between text-white">
          <div className="space-y-1">
             <p className="text-xs font-black uppercase tracking-widest">Authorized Seal</p>
             <p className="text-[9px] font-bold opacity-40 max-w-xs uppercase tracking-tight">Verified by Noble World Enterprise System Engineering Group</p>
          </div>
          <div className="flex flex-col items-end pr-12">
             <Signature className="w-10 h-10 text-white mb-1" />
             <p className="text-[8px] font-black text-white uppercase tracking-widest italic">Official Approval</p>
          </div>
       </div>
    </div>
  );
};
