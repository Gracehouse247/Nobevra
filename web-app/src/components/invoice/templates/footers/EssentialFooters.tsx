import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const EssentialFooter = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'ess-blue-geo') {
      return (
        <div className="mt-auto px-16 py-8 relative z-10 border-t-2 border-slate-50 flex justify-between items-end">
           <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-blue-600">Terms of Sales</h4>
              <p className="text-xs font-bold text-slate-500 max-w-md">{data.notes || 'Please pay within 15 days.'}</p>
           </div>
           <div className="flex flex-col items-center">
              {data.signatureUrl ? (
                <img src={data.signatureUrl} alt="Signature" className="h-16 w-auto object-contain border-b border-slate-300 mb-2" />
              ) : (
                <div className="w-48 h-16 border-b-2 border-noble-border mb-2 flex items-center justify-center">
                   <Signature className="w-8 h-8 text-slate-200" />
                </div>
              )}
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-modern-swish') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center bg-slate-50 border-t border-noble-border">
           <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Signature</p>
              <div className="w-48 h-12 flex items-end">
                 {data.signatureUrl ? (
                   <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                 ) : (
                   <div className="w-full h-px bg-slate-300" />
                 )}
              </div>
           </div>
           <div className="text-right">
              <p className="text-xs font-bold text-slate-500">{data.notes || 'Thank you for your business!'}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-azure-pattern') {
      return (
        <div className="mt-auto px-16 py-8 relative z-10 flex justify-between items-center">
           <div className="space-y-1">
              <p className="text-sm font-black text-blue-600">PAYMENT TERMS</p>
              <p className="text-xs font-bold text-slate-500">{data.notes || 'Please remit payment within 15 days.'}</p>
           </div>
           <div className="flex flex-col items-end">
              <div className="w-48 border-b-2 border-blue-600 mb-2">
                 {data.signatureUrl && <img src={data.signatureUrl} alt="Signature" className="h-12 w-auto object-contain ml-auto" />}
              </div>
              <p className="text-[10px] font-black uppercase text-blue-600">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-urban-skyline') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-end">
           <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-xs">{data.notes || 'This document is electronically generated and is valid without a physical seal.'}</p>
              <div className="flex items-center gap-4 text-slate-400">
                 <Globe className="w-5 h-5" />
                 <span className="text-sm font-bold">{sender?.website || 'www.noblesworld.com.ng'}</span>
              </div>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-48 h-16 border-b border-slate-900 flex items-center justify-center">
                 {data.signatureUrl ? (
                   <img src={data.signatureUrl} alt="Signature" className="h-full w-auto object-contain" />
                 ) : (
                   <Signature className="w-8 h-8 text-slate-100" />
                 )}
              </div>
              <p className="text-[10px] font-black text-noble-text uppercase tracking-[0.3em]">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-corporate-clean') {
      return (
        <div className="mt-auto h-24 bg-slate-100 relative z-10 flex items-center px-16 justify-between">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                 <Phone className="w-4 h-4 text-slate-400" />
                 <span className="text-xs font-bold text-slate-600">{sender?.phone_number}</span>
              </div>
              <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-slate-400" />
                 <span className="text-xs font-bold text-slate-600">{sender?.address?.split('\n')[0]}</span>
              </div>
           </div>
           <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Executive Series 2026</div>
        </div>
      );
    }

  if (id === 'ess-navy-lines') {
      return (
        <div className="mt-auto h-24 px-16 flex items-center justify-between text-slate-400 relative z-10 border-t border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">Modern Line Series</p>
           <div className="h-10 w-32 border-b border-noble-border flex items-end justify-center text-[10px] font-bold uppercase opacity-40 pb-1">Authorized Signature</div>
        </div>
      );
    }

  if (id === 'ess-clean-white') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 border-t border-slate-100 flex justify-between items-center">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <p>CLEAN SERIES • OFFICIAL STATEMENT</p>
           </div>
           <div className="flex flex-col items-end">
              <div className="w-48 h-px bg-slate-200 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-mint-fresh') {
      return (
        <div className="mt-auto h-24 bg-emerald-50 flex items-center px-16 justify-between text-emerald-900/40 relative z-10 border-t border-emerald-100">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">MINT FRESH VERIFIED</p>
           <div className="flex items-center gap-4">
              <Signature className="w-8 h-8 text-emerald-200" />
              <p className="text-[8px] font-black uppercase tracking-widest">Secure Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-charcoal-pro') {
      return (
        <div className="mt-auto h-24 bg-slate-800 flex items-center px-16 justify-between text-white relative z-10 border-t border-white/10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">CHARCOAL PRO SERIES</p>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-slate-400 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Official Signature</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-sunny-day') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center">
           <div className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
              <p>SUNNY DAY SERIES • VERIFIED</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-1 bg-amber-100 rounded-full mb-2" />
              <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-lavender-soft') {
      return (
        <div className="mt-auto h-24 bg-purple-50/30 flex items-center px-16 justify-between text-purple-900/40 relative z-10 border-t border-purple-100">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">LAVENDER SOFT VERIFIED</p>
           <div className="flex items-center gap-4">
              <Signature className="w-8 h-8 text-purple-200" />
              <p className="text-[8px] font-black uppercase tracking-widest italic text-purple-300">Official Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-coral-bright') {
      return (
        <div className="mt-auto h-24 px-16 py-12 relative z-10 flex justify-between items-center bg-noble-surface border-t-2 border-rose-100">
           <div className="text-[10px] font-black text-rose-300 uppercase tracking-widest">
              <p>CORAL SERIES • OFFICIAL DOCUMENT</p>
           </div>
           <div className="flex flex-col items-end">
              <div className="w-48 h-px bg-rose-200 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">Authorized Official</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-slate-pro') {
      return (
        <div className="mt-auto h-24 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10 border-t border-white/10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">SLATE PRO VERIFIED</p>
           <div className="flex items-center gap-6">
              <Signature className="w-10 h-10 text-slate-500" />
              <div className="h-8 w-px bg-noble-surface/10" />
              <p className="text-[9px] font-bold opacity-30 tracking-widest">SECURE SEAL</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-forest-edge') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 bg-emerald-50/30 flex justify-between items-center border-t border-emerald-100">
           <div className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">
              <p>FOREST EDGE SERIES • VERIFIED</p>
           </div>
           <div className="flex flex-col items-center">
              <Signature className="w-10 h-10 text-emerald-200 mb-2" />
              <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-ocean-breeze') {
      return (
        <div className="mt-auto h-24 bg-blue-50/50 flex items-center px-16 justify-between text-blue-900/40 relative z-10 border-t border-blue-100 shadow-inner">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">OCEAN BREEZE VERIFIED</p>
           <div className="flex items-center gap-4">
              <Signature className="w-8 h-8 text-blue-200" />
              <p className="text-[8px] font-black uppercase tracking-widest italic">Maritime Authority</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-midnight-pure') {
      return (
        <div className="mt-auto h-24 bg-slate-950 flex items-center px-16 justify-between text-white relative z-10 border-t border-white/5">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">MIDNIGHT PURE SERIES</p>
           <div className="flex flex-col items-end">
              <Signature className="w-10 h-10 text-slate-700 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-800">Authorized Official</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-sandstone') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center bg-stone-50 border-t border-stone-200">
           <div className="text-[10px] font-black text-stone-300 uppercase tracking-widest">
              <p>SANDSTONE SERIES • OFFICIAL STATEMENT</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-px bg-stone-300 mb-2" />
              <p className="text-[10px] font-black text-stone-900 uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-platinum-border') {
      return (
        <div className="mt-auto h-24 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">PLATINUM BORDER SERIES</p>
           <div className="flex items-center gap-4">
              <Signature className="w-8 h-8 text-slate-300" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Authorized Signature</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-gold-accent') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 border-t border-[#D4AF37]/20 flex justify-between items-center bg-noble-surface">
           <div className="text-[10px] font-black text-[#D4AF37]/50 uppercase tracking-widest">
              <p>GOLD ACCENT SERIES • OFFICIAL DOCUMENT</p>
           </div>
           <div className="flex flex-col items-end">
              <div className="w-48 h-1 bg-[#D4AF37] opacity-20 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-silver-line') {
      return (
        <div className="mt-auto h-24 px-16 flex items-center justify-between text-slate-400 relative z-10 border-t border-slate-100 bg-slate-50/50">
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">SILVER LINE SERIES</p>
           <div className="flex items-center gap-4">
              <Signature className="w-8 h-8 text-slate-200" />
              <p className="text-[8px] font-black uppercase tracking-widest italic opacity-50">Authorized</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-onyx-bold') {
      return (
        <div className="mt-auto h-32 bg-black flex items-center px-16 justify-between text-white relative z-10">
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest">ONYX SERIES OFFICIAL</p>
              <p className="text-[9px] font-bold opacity-30">Document Code: ONX-2026-VERIFIED</p>
           </div>
           <div className="flex flex-col items-end pr-8">
              <Signature className="w-12 h-12 text-white mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Authorized Official</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-orange-blob') {
      return (
        <div className="mt-auto h-32 px-16 relative z-10 flex items-center justify-between">
           <div className="text-slate-400">
              <p className="text-[10px] font-black uppercase tracking-widest">Orange Curve Series</p>
           </div>
           <div className="text-center">
              <div className="w-48 h-12 border-b border-noble-border mb-2" />
              <p className="text-[10px] font-black uppercase text-[#F97316]">Signature</p>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-angle') {
      return (
        <div className="mt-auto h-24 bg-slate-50 flex items-center px-16 justify-between text-slate-400 relative z-10 border-t border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-[0.4em]">Blue Angle Essentials</p>
           <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-[10px] font-bold uppercase">Platinum Verified</span>
           </div>
        </div>
      );
    }

  if (id === 'ess-blue-curve') {
      return (
        <div className="mt-auto h-24 flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Blue Wave Series</p>
           <div className="w-40 h-8 border-b border-white/20" />
        </div>
      );
    }

  if (id === 'ess-dark-orange-wave') {
      return (
        <div className="mt-auto h-24 bg-[#0F172A] flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Midnight Wave Series</p>
           <div className="flex items-center gap-4">
              <div className="text-right">
                 <p className="text-[8px] font-black uppercase opacity-40">Issued By</p>
                 <p className="text-[10px] font-bold italic">{sender?.full_name}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
           </div>
        </div>
      );
    }

  if (id === 'ess-azure-wave') {
       return (
         <div className="mt-auto px-16 py-20 relative z-10">
            <div className="flex justify-between items-end">
               <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl font-black text-noble-text mb-4 border-b-2 border-slate-300 inline-block pr-12 pb-2">Note:</h4>
                    <div className="space-y-4 w-96">
                       <div className="h-0.5 bg-slate-200 w-full" />
                       <div className="h-0.5 bg-slate-200 w-full" />
                       <div className="h-0.5 bg-slate-200 w-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-noble-text mb-4">Payment Information:</h4>
                    <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 text-xl font-black text-slate-600">
                       <span className="text-noble-text">Bank:</span> <span>Name Bank</span>
                       <span className="text-noble-text">No Bank:</span> <span>123-456-7890</span>
                       <span className="text-noble-text">Email:</span> <span>reallygreatsite.com</span>
                    </div>
                  </div>
               </div>
               <div className="text-center">
                  <h2 className="text-8xl font-black text-noble-text italic tracking-tighter">Thank You!</h2>
               </div>
            </div>
         </div>
       );
    }

  if (id === 'ess-geo-prism' || id === 'ess-purple-bloom') {
       const accentColor = id === 'ess-geo-prism' ? '#1E3A8A' : '#7C3AED';
       return (
         <div className="mt-auto px-20 py-20 relative z-10">
            <div className="grid grid-cols-2 gap-32">
               <div>
                  <h4 className="text-3xl font-black text-[#1E3A8A] mb-4">Thank you</h4>
                  <div className="text-xl font-bold text-slate-500 space-y-1 leading-relaxed">
                     <p>{sender?.full_name}</p>
                     <p>{sender?.phone_number}</p>
                     <p className="whitespace-pre-line">{sender?.address}</p>
                     <p>{sender?.email}</p>
                  </div>
               </div>
               <div>
                  <h4 className="text-3xl font-black text-[#1E3A8A] mb-6">Payment Method</h4>
                  <div className="space-y-2">
                     {[
                       { label: 'Name', value: sender?.full_name },
                       { label: 'Bank', value: 'Fauget Bank' },
                       { label: 'Account', value: '123-456-7890' },
                       { label: 'Due Date', value: 'August 18, 2026' }
                     ].map((item, i) => (
                        <div key={i} className="flex text-xl font-black">
                           <span className="w-32 text-[#1E3A8A]">{item.label}</span>
                           <span className="mx-4 text-[#1E3A8A]">:</span>
                           <span className="text-slate-600">{item.value}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <p className="mt-12 text-lg font-bold text-[#1E3A8A] italic">
               *Thank you for your cooperation! Please complete the payment before the due date.
            </p>
         </div>
       );
    }

  if (id === 'ess-skyline') {
       return (
         <div className="mt-auto px-20 py-20 relative z-10">
            <div className="grid grid-cols-2 gap-32">
               <div className="space-y-4">
                  <h4 className="text-2xl font-black text-noble-text uppercase tracking-widest">Payment Method</h4>
                  <div className="space-y-1 text-xl font-black text-slate-600">
                     <div className="flex"><span className="w-32">Name</span> <span>: {sender?.full_name}</span></div>
                     <div className="flex"><span className="w-32">Bank</span> <span>: Fauget Bank</span></div>
                     <div className="flex"><span className="w-32">Account</span> <span>: 123-456-7890</span></div>
                     <div className="flex"><span className="w-32">Due Date</span> <span>: January 25, 2026</span></div>
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="text-2xl font-black text-noble-text uppercase tracking-widest text-right">Terms & Conditions</h4>
                  <p className="text-lg font-bold text-slate-500 text-right leading-relaxed">
                     By using the Service, you agree to abide by these Terms and Conditions, Privacy Policy, and Payment Policy.
                  </p>
               </div>
            </div>
         </div>
       );
    }

  if (id === 'ess-steel-minimal') {
       return (
         <div className="mt-auto px-20 py-20 relative z-10">
            <div className="grid grid-cols-2 gap-32">
               <div className="space-y-4">
                  <h4 className="text-2xl font-black text-noble-text uppercase">Payment To:</h4>
                  <div className="text-xl font-bold text-slate-600 leading-relaxed">
                     <p>Bank Name: Rimberio</p>
                     <p>Account No: 0123 4567 8901</p>
                  </div>
               </div>
               <div className="space-y-4 text-right">
                  <h4 className="text-2xl font-black text-noble-text uppercase">Contact Info:</h4>
                  <div className="text-xl font-bold text-slate-600 leading-relaxed">
                     <p>{sender?.email || 'hello@reallygreatsite.com'}</p>
                     <p>{sender?.phone_number || '+123-456-7890'}</p>
                  </div>
               </div>
            </div>
         </div>
       );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
