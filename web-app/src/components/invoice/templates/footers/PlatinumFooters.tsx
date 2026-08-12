import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const PlatinumFooter = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'plat-red-geo' || id === 'plat-modern-red') {
       const isModern = id === 'plat-modern-red';
       return (
         <div className="mt-auto z-10">
            {/* Geometric Trapezoid Bar */}
            <div className="relative h-24 flex items-center justify-center">
               <div className="absolute inset-0 bg-slate-200" />
               <div className="absolute inset-y-0 left-0 w-[85%] bg-slate-800" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}>
                  <div className="h-full flex items-center justify-around px-12 text-white">
                     <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-rose-500 fill-rose-500" />
                        <span className="text-xs font-black">{sender?.phone_number}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-rose-500 fill-rose-500" />
                        <span className="text-xs font-black">{sender?.email}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-rose-500 fill-rose-500" />
                        <span className="text-xs font-black whitespace-nowrap">{sender?.address?.split('\n')[0]}</span>
                     </div>
                  </div>
               </div>
            </div>
            {/* Red Bottom Bar */}
            <div className={`h-16 w-full ${isModern ? 'rounded-tl-[50%]' : ''}`} style={{ backgroundColor: '#E11D48' }} />
         </div>
       );
    }

  if (id === 'plat-minimal-grey') {
       return (
         <div className="mt-auto px-16 py-12 border-t-2 border-slate-900 z-10 bg-noble-surface">
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-noble-text mb-4">PAYMENT METHOD:</h4>
                  <div className="space-y-1 text-xs font-bold text-slate-600 uppercase">
                     <p>Account No: {data.bankDetails?.accountNumber || '123-456-7890'}</p>
                     <p>Account Name: {data.bankDetails?.accountName || sender?.full_name}</p>
                     <p>Branch Name: {data.bankDetails?.name || 'Salford & Co.'}</p>
                  </div>
               </div>
               <div className="text-right">
                  <h4 className="text-sm font-black uppercase tracking-widest text-noble-text mb-4">CONTACT & ADDRESS:</h4>
                  <div className="space-y-1 text-xs font-bold text-slate-600 uppercase">
                     <p>{sender?.phone_number}</p>
                     <p className="whitespace-pre-line">{sender?.address}</p>
                     <p>{sender?.email}</p>
                  </div>
               </div>
            </div>
         </div>
       );
    }

  if (id === 'plat-blue-wave') {
       return (
         <div className="mt-auto z-10 flex flex-col gap-8">
            <div className="px-16 flex justify-between items-end">
               <div className="flex flex-col gap-12">
                  <h2 className="text-[100px] font-black text-noble-text tracking-tighter leading-none">Thank You!</h2>
                  
                  {/* Blue Pill Contact Info */}
                  <div className="bg-[#4D7CFF] rounded-tr-[50px] p-8 pr-16 text-white inline-flex flex-col gap-4 shadow-xl">
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                           <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font-black">{sender?.phone_number || '+123-703-780-2931'}</span>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                           <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold leading-tight max-w-[280px]">
                           {sender?.address || 'Plot 10, Block B JKN Building, off lyana-ltire, Bus-stop, Along Apapa-Oshodi Expressway, Lagos State'}
                        </span>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-4 pb-4">
                  {data.signatureUrl ? (
                    <div className="relative">
                       <img src={data.signatureUrl} alt="Signature" className="h-24 w-auto object-contain" />
                       <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-slate-300" />
                    </div>
                  ) : (
                    <div className="w-64 h-24 border-b-2 border-noble-border flex flex-col items-center justify-center gap-2">
                       <Signature className="w-10 h-10 text-slate-200" />
                    </div>
                  )}
                  <div className="text-center">
                     <p className="text-xl font-black text-noble-text uppercase tracking-widest">{sender?.full_name || 'JEFFERY FRIDAY'}</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">DIGITAL STRATEGIST</p>
                  </div>
               </div>
            </div>

            {/* Bottom Dark Bar with Web URL */}
            <div className="h-16 bg-[#1F2937] flex items-center justify-end px-16 text-white">
               <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                     <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-black tracking-widest">{sender?.website || 'www.noblesworld.com.ng'}</span>
               </div>
            </div>
         </div>
       );
    }

  if (id === 'plat-corp-teal') {
       return (
         <div className="mt-auto z-10">
            <div className="h-20 bg-slate-900 relative flex items-center justify-between px-16 text-white overflow-hidden">
               <div className="absolute top-0 left-0 w-48 h-full bg-[#0D9488]" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }} />
               <div className="absolute top-0 right-0 w-48 h-full bg-[#0D9488]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
               <div className="flex items-center gap-6 z-10">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-black">{sender?.phone_number}</span>
               </div>
               <div className="flex items-center gap-6 z-10">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-black">{sender?.email}</span>
               </div>
            </div>
         </div>
       );
    }

  if (id === 'plat-teal-curve') {
      return (
        <div className="mt-auto z-10 flex flex-col pt-8">
           <div className="px-16 grid grid-cols-[1fr_1fr_200px] gap-8 mb-8">
              <div>
                 <h4 className="text-sm font-black text-noble-text uppercase mb-2">Payment Method</h4>
                 <div className="text-xs font-bold text-slate-600 space-y-1">
                    <p>Bank Name: {data.bankDetails?.name || 'Any Bank'}</p>
                    <p>Account No: {data.bankDetails?.accountNumber || '123-456-7890'}</p>
                 </div>
              </div>
              <div>
                 <h4 className="text-sm font-black text-noble-text uppercase mb-2">Terms Of Service</h4>
                 <div className="text-xs font-bold text-slate-600 space-y-1 leading-relaxed">
                    <p>{data.notes || 'Please pay within 15 days.'}</p>
                 </div>
              </div>
              <div className="flex flex-col items-center justify-end">
                 {data.signatureUrl ? (
                   <img src={data.signatureUrl} alt="Signature" className="h-16 w-auto object-contain mb-2 border-b border-slate-300" />
                 ) : (
                   <div className="w-full h-16 border-b-2 border-slate-300 flex items-center justify-center mb-2">
                      <Signature className="w-8 h-8 text-slate-300" />
                   </div>
                 )}
                 <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
              </div>
           </div>
           <div className="h-4 w-full bg-[#3A8A96]" />
        </div>
      );
    }

  if (id === 'plat-blue-wave-2') {
      return (
        <div className="mt-auto z-10 flex flex-col pt-8 relative overflow-hidden">
           <div className="px-16 grid grid-cols-[1fr_1fr_200px] gap-8 mb-24">
              <div>
                 <h4 className="text-sm font-black text-noble-text uppercase mb-2">Payment Method</h4>
                 <div className="text-xs font-bold text-slate-600 space-y-1">
                    <p>Bank Name: {data.bankDetails?.name || 'Any Bank'}</p>
                    <p>Account No: {data.bankDetails?.accountNumber || '123-456-7890'}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-red-geo') {
      return (
        <div className="mt-auto h-32 px-16 relative z-10 flex items-center justify-between bg-rose-50 border-t-4 border-rose-100">
           <div className="text-rose-900/40">
              <p className="text-[10px] font-black uppercase tracking-[0.5em]">PLATINUM RED GEOMETRIC</p>
           </div>
           <div className="flex flex-col items-center">
              <Signature className="w-12 h-12 text-rose-200 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-rose-300">Official Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-corp-teal') {
      return (
        <div className="mt-auto h-40 bg-[#002E5B] flex items-center px-16 justify-between text-white relative z-10">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest">CORPORATE PLATINUM OFFICIAL</p>
              <div className="h-px w-64 bg-noble-surface/10" />
              <p className="text-[10px] opacity-40">Document ID: CP-2026-HQ</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-12 h-12 text-white/20 mb-2" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-30">Authorized Director</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-dark-blue-angle') {
      return (
        <div className="mt-auto h-32 bg-[#283B61] flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">DARK BLUE ANGLE PLATINUM</p>
           <div className="flex items-center gap-8">
              <Signature className="w-10 h-10 text-white/10" />
              <div className="text-right">
                 <div className="w-32 h-px bg-noble-surface/20 mb-2" />
                 <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Official Signature</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-green-orange') {
      return (
        <div className="mt-auto h-32 bg-[#0B4731] flex items-center px-16 justify-between text-white relative z-10">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest text-orange-400">ELITE VERIFIED</p>
              <p className="text-[9px] opacity-30 tracking-widest">GREEN ORANGE SERIES</p>
           </div>
           <Signature className="w-12 h-12 text-white/5" />
        </div>
      );
    }

  if (id === 'plat-obsidian') {
      return (
        <div className="mt-auto h-32 bg-black flex items-center px-16 justify-between text-white relative z-10 border-t border-white/5">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#D4AF37]">OBSIDIAN PRESTIGE</p>
              <p className="text-[9px] opacity-20 uppercase tracking-widest">Official Document No. OBS-2026</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-12 h-12 text-[#D4AF37]/20 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-white/10">Authorized Signature</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-ivory-gold') {
      return (
        <div className="mt-auto h-32 bg-[#FFFEFA] flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-[#D4AF37]/20">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">IVORY & GOLD OFFICIAL</p>
           <div className="flex items-center gap-6">
              <Signature className="w-12 h-12 text-[#D4AF37]/20" />
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase tracking-widest">{sender?.full_name}</p>
                 <p className="text-[8px] font-bold text-slate-400 uppercase italic">Authorized Issuer</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-sapphire') {
      return (
        <div className="mt-auto h-32 bg-[#001233] flex items-center px-16 justify-between text-white relative z-10 border-t border-blue-900/50">
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-blue-400">SAPPHIRE SERIES</p>
              <p className="text-[9px] opacity-30">Verified Digital Statement</p>
           </div>
           <div className="flex items-center gap-4">
              <Signature className="w-10 h-10 text-blue-900" />
              <div className="h-10 w-px bg-noble-surface/5" />
              <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-20 rotate-90">OFFICIAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-emerald-lux') {
      return (
        <div className="mt-auto h-32 bg-[#022C22] flex items-center px-16 justify-between text-white relative z-10 border-t border-emerald-900/50">
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500/40">EMERALD LUXURY EDITION</p>
           <div className="flex flex-col items-center">
              <Signature className="w-12 h-12 text-emerald-500/5 mb-1" />
              <div className="w-24 h-px bg-emerald-500/20" />
              <p className="text-[8px] font-black uppercase tracking-widest text-emerald-900 mt-1">SECURE SEAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-marble-white') {
      return (
        <div className="mt-auto h-32 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t-2 border-slate-900">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest italic">MARBLE ESTATE OFFICIAL</p>
              <p className="text-[10px] text-slate-400 font-bold">Document Ref: MRB-2026-X1</p>
           </div>
           <div className="flex items-center gap-6">
              <Signature className="w-12 h-12 text-slate-200" />
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase tracking-widest">Authorized Issuer</p>
                 <p className="text-[8px] font-bold text-slate-400 uppercase italic">Platinum Grade</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-rose-gold-lux') {
      return (
        <div className="mt-auto h-32 bg-noble-surface flex items-center px-16 justify-between text-pink-900 relative z-10 border-t border-pink-100">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-300">ROSE GOLD LUXURY VERIFIED</p>
           <div className="flex items-center gap-4">
              <Signature className="w-10 h-10 text-pink-50" />
              <p className="text-[9px] font-black uppercase tracking-widest text-pink-200 italic">Official Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-crimson-elite') {
      return (
        <div className="mt-auto h-32 bg-[#450A0A] flex items-center px-16 justify-between text-white relative z-10 border-t border-red-900">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest">CRIMSON ELITE OFFICIAL</p>
              <p className="text-[9px] opacity-20">Secure Document: CRM-EL-2026</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-12 h-12 text-white/5 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20">Authorized Issuer</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-matte-black-gold') {
      return (
        <div className="mt-auto h-32 bg-[#121212] flex items-center px-16 justify-between text-white relative z-10 border-t border-[#D4AF37]/10">
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#D4AF37]">MATTE BLACK PRESTIGE</p>
              <p className="text-[9px] opacity-20">Platinum Tier Verification</p>
           </div>
           <div className="flex items-center gap-8">
              <Signature className="w-12 h-12 text-white/5" />
              <div className="h-10 w-px bg-noble-surface/10" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20">OFFICIAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-ultra-minimal') {
      return (
        <div className="mt-auto h-32 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 tracking-[1em]">MINIMALISM</p>
           <div className="flex flex-col items-end">
              <div className="w-32 h-px bg-slate-900 mb-2" />
              <p className="text-[9px] font-black uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-champagne') {
      return (
        <div className="mt-auto h-32 bg-[#FDFCF0] flex items-center px-16 justify-between text-amber-900 relative z-10 border-t border-amber-100">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest italic">CHAMPAGNE TOAST SERIES</p>
              <p className="text-[9px] text-amber-400 font-bold tracking-widest">OFFICIAL STATEMENT</p>
           </div>
           <Signature className="w-12 h-12 text-amber-100" />
        </div>
      );
    }

  if (id === 'plat-midnight-navy') {
      return (
        <div className="mt-auto h-40 bg-[#020617] flex items-center px-16 justify-between text-white relative z-10 border-t border-slate-900">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">MIDNIGHT NAVY OFFICIAL</p>
              <div className="h-px w-64 bg-slate-900" />
              <p className="text-[10px] opacity-20">Ref: MDN-NVY-2026</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-14 h-14 text-white/5 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-10">Authorized Official</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-silk-cream') {
      return (
        <div className="mt-auto h-32 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-200 uppercase">SILK CREAM SERIES</p>
           <div className="flex items-center gap-6">
              <Signature className="w-12 h-12 text-slate-50" />
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase tracking-widest italic opacity-40">Authorized</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-titan') {
      return (
        <div className="mt-auto h-32 bg-[#1E293B] flex items-center px-16 justify-between text-white relative z-10 border-t border-slate-700">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">TITAN STEEL VERIFIED</p>
              <p className="text-[9px] opacity-20 uppercase tracking-[0.4em]">Industrial Platinum Grade</p>
           </div>
           <div className="flex items-center gap-6">
              <Signature className="w-12 h-12 text-white/5" />
              <div className="h-10 w-px bg-noble-surface/10" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20 rotate-90">OFFICIAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-lagoon') {
      return (
        <div className="mt-auto h-40 bg-[#042F2E] flex items-center px-16 justify-between text-white relative z-10 border-t border-teal-900">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-teal-400">LAGOON DEPTHS OFFICIAL</p>
              <div className="h-px w-64 bg-teal-900" />
              <p className="text-[10px] opacity-30">Document ID: LAG-DPT-2026</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-14 h-14 text-teal-900/50 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20 uppercase">SECURE SEAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-aubergine') {
      return (
        <div className="mt-auto h-32 bg-[#2D0A31] flex items-center px-16 justify-between text-white relative z-10 border-t border-purple-950">
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-purple-900">AUBERGINE LUXE OFFICIAL</p>
           <div className="flex items-center gap-6">
              <Signature className="w-12 h-12 text-purple-950/50" />
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase tracking-widest text-[#F3E5AB]/40">Authorized</p>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'plat-arctic') {
      return (
        <div className="mt-auto h-32 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-cyan-50">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-600 italic">ARCTIC FROST VERIFIED</p>
              <p className="text-[9px] text-slate-300 font-bold tracking-widest">PLATINUM GRADE STATEMENT</p>
           </div>
           <Signature className="w-12 h-12 text-cyan-50" />
        </div>
      );
    }

  if (id === 'plat-bonded-leather') {
      return (
        <div className="mt-auto h-32 bg-[#27160C] flex items-center px-16 justify-between text-white relative z-10 border-t border-black/20">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-900">BONDED LEATHER OFFICIAL</p>
           <div className="flex flex-col items-end">
              <Signature className="w-12 h-12 text-black/20 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20">Authorized Issuer</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-royal-seal') {
      return (
        <div className="mt-auto h-40 bg-[#FDFCF0] flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-[#D4AF37]/20">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">ROYAL SEAL OFFICIAL</p>
              <div className="h-px w-64 bg-[#D4AF37]/10" />
              <p className="text-[10px] opacity-40 italic font-bold">Authenticated by Platinum Protocol</p>
           </div>
           <div className="flex flex-col items-end pr-4">
              <Signature className="w-14 h-14 text-[#D4AF37]/10 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20">Royal Registry Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-vermillion') {
      return (
        <div className="mt-auto h-32 bg-[#7F1D1D] flex items-center px-16 justify-between text-white relative z-10 border-t border-red-900">
           <div className="flex flex-col gap-1">
              <p className="text-xs font-black uppercase tracking-widest">VERMILLION PRIME OFFICIAL</p>
              <p className="text-[9px] opacity-20">Secure Code: VMP-2026-X</p>
           </div>
           <div className="flex items-center gap-6">
              <Signature className="w-12 h-12 text-white/5" />
              <div className="h-10 w-px bg-noble-surface/10" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-20 rotate-90">OFFICIAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-diamond-noir') {
      return (
        <div className="mt-auto h-32 bg-black flex items-center px-16 justify-between text-white relative z-10 border-t border-white/5">
           <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20 italic">DIAMOND NOIR EDITION</p>
           <div className="flex flex-col items-end">
              <Signature className="w-14 h-14 text-white/5 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest opacity-10 uppercase">SECURE SEAL</p>
           </div>
        </div>
      );
    }

  if (id === 'plat-sovereign') {
      return (
        <div className="mt-auto h-40 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t-8 border-slate-900">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">SOVEREIGN GOLD VERIFIED</p>
              <div className="h-px w-64 bg-slate-100" />
              <p className="text-[10px] text-slate-400 font-bold">Statement Issued on Platinum Protocol</p>
           </div>
           <div className="flex flex-col items-end">
              <Signature className="w-16 h-16 text-slate-100 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Authorized Official</p>
           </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
