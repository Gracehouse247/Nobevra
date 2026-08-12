import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Globe, CheckCircle2, ShieldCheck, Signature } from 'lucide-react';

export const BlueHorizonFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto h-48 relative z-10 overflow-hidden bg-slate-900 flex flex-col justify-end">
       <div className="px-16 flex justify-between items-end pb-12 relative z-20">
          <div className="space-y-4">
             <p className="text-xs font-bold text-slate-400 italic">Global Distribution Network</p>
             <div className="flex items-center gap-4 text-white">
                <Globe className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-sm font-black uppercase tracking-widest">{sender?.website}</span>
             </div>
          </div>
          <div className="flex flex-col items-center gap-2">
             <div className="w-48 h-16 border-b-2 border-[#3B82F6] flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-white/20" />
                )}
             </div>
             <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{sender?.full_name}</p>
          </div>
       </div>
       <div className="absolute top-0 left-0 w-full h-2 bg-[#3B82F6]" />
    </div>
  );
};

export const RedDiamondFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center pl-48 border-t border-slate-100">
       <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-widest text-[#EF4444]">Secure Transaction</p>
          <p className="text-[10px] font-bold text-slate-400 italic">This document is digitally signed and verified.</p>
       </div>
       <div className="flex flex-col items-center">
          <div className="w-48 h-16 border-b-4 border-slate-900 mb-2 flex items-center justify-center">
             {data.signatureUrl ? (
               <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
             ) : (
               <Signature className="w-8 h-8 text-slate-200" />
             )}
          </div>
          <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
       </div>
    </div>
  );
};

export const NavyGeometricFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto flex flex-col z-10 relative">
       <div className="px-16 py-12 flex justify-between items-end">
          <div className="space-y-4">
             <div className="bg-slate-900 p-4 rounded-xl border-l-4 border-[#3B82F6] text-white">
                <p className="text-[10px] uppercase font-black opacity-40 mb-1">Direct Contact</p>
                <p className="text-xs font-black">{sender?.phone_number}</p>
             </div>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-16 border-b-2 border-[#0F172A] mb-2 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-slate-100" />
                )}
             </div>
             <p className="text-[10px] font-black text-noble-text uppercase tracking-[0.4em]">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const TealGeometricFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto flex flex-col z-10 pb-12 px-16">
       <div className="h-px w-full bg-noble-surface/10 mb-12" />
       <div className="flex justify-between items-center">
          <div className="flex gap-8">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#14B8A6] uppercase tracking-widest mb-1">Email</span>
                <span className="text-xs font-bold text-white">{sender?.email}</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#14B8A6] uppercase tracking-widest mb-1">Call</span>
                <span className="text-xs font-bold text-white">{sender?.phone_number}</span>
             </div>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-16 border-b border-white/20 mb-2 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-white/5" />
                )}
             </div>
             <p className="text-[10px] font-black text-white uppercase tracking-[0.5em]">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const OrangeGeometricFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto flex flex-col z-10 px-16 py-12">
       <div className="bg-slate-50 p-8 rounded-[3rem] flex justify-between items-center">
          <div className="text-slate-400">
             <p className="text-xs font-bold italic">Thank you for choosing our premium services.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-12 border-b border-slate-900 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-slate-100" />
                )}
             </div>
             <p className="text-[10px] font-black text-noble-text uppercase tracking-widest mt-2">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const YellowSharpFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto flex flex-col z-10 pl-40 pr-16 py-12">
       <div className="bg-black text-white p-12 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FBBF24]" />
          <div className="space-y-4 relative z-10">
             <p className="text-xs font-black uppercase tracking-[0.4em]">Official Signature</p>
             <p className="text-[10px] text-slate-500 max-w-xs uppercase">The recipient acknowledges the terms by signing above.</p>
          </div>
          <div className="flex flex-col items-center relative z-10">
             <div className="w-48 h-16 border-b-4 border-[#FBBF24] mb-4 flex items-center justify-center bg-noble-surface/5">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-white/10" />
                )}
             </div>
             <p className="text-sm font-black uppercase tracking-[0.2em]">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const BlackYellowGeoFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto flex flex-col z-10 px-16 py-12">
       <div className="border-t-4 border-slate-900 pt-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-[#FBBF24] w-12 h-12 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-black" />
             </div>
             <span className="text-sm font-black uppercase tracking-tighter text-noble-text">{sender?.website}</span>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-64 h-20 border-b-2 border-[#FBBF24] mb-2 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-slate-100" />
                )}
             </div>
             <p className="text-xs font-black text-noble-text uppercase tracking-[0.6em]">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const CyanBlackGeoFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto flex flex-col z-10 relative pb-12">
       <div className="absolute bottom-0 left-0 w-full h-32 bg-[#06B6D4]" style={{ clipPath: 'polygon(0 80%, 100% 0, 100% 100%, 0 100%)' }} />
       <div className="px-16 flex justify-between items-end relative z-10">
          <div className="space-y-4 text-slate-400">
             <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-bold">{sender?.email}</span>
             </div>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-16 border-b-2 border-slate-900 mb-4 flex items-center justify-center">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-slate-100" />
                )}
             </div>
             <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
          </div>
       </div>
    </div>
  );
};

export const YellowBluePillFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto h-48 relative z-10 overflow-hidden flex flex-col">
       <div className="px-16 flex justify-between items-center flex-1">
          <div className="bg-[#2563EB]/5 p-6 rounded-[2rem] border border-[#2563EB]/10">
             <p className="text-[10px] font-black uppercase text-[#2563EB] tracking-widest mb-1">Official Verification</p>
             <p className="text-xs font-bold text-slate-400 italic">Trusted globally by leading partners.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-48 h-16 bg-noble-surface rounded-full shadow-2xl border-2 border-slate-50 mb-2 flex items-center justify-center overflow-hidden">
                {data.signatureUrl ? (
                  <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                ) : (
                  <Signature className="w-8 h-8 text-slate-100" />
                )}
             </div>
             <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
          </div>
       </div>
       <div className="h-8 w-full bg-gradient-to-r from-[#2563EB] to-[#FBBF24]" />
    </div>
  );
};

export const YellowMinimalGeoFooter = (props: SharedEngineProps) => {
  const { data } = props;
  const { sender } = data;
  return (
    <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center border-t-2 border-[#FBBF24]">
       <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">Official Document</p>
          <p className="text-[10px] font-bold text-slate-400 italic">This invoice was generated on the Noble platform.</p>
       </div>
       <div className="flex flex-col items-center">
          <div className="w-48 h-12 border-b border-slate-900 mb-2 flex items-center justify-center">
             {data.signatureUrl ? (
               <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
             ) : (
               <Signature className="w-8 h-8 text-slate-100" />
             )}
          </div>
          <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
       </div>
    </div>
  );
};
