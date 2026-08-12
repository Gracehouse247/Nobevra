import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const GeometricFooter = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'geo-austen') {
      return (
        <div className="mt-auto relative h-48 overflow-hidden z-10">
           {/* Bottom Left Polygons */}
           <div className="absolute bottom-0 left-[15%] w-[30%] h-[120%] bg-[#9F7AEA]" style={{ clipPath: 'polygon(0% 100%, 70% 0, 100% 0, 30% 100%)' }} />
           <div className="absolute bottom-0 left-0 w-[20%] h-full bg-[#1E3A8A]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} />
           
           <div className="absolute bottom-12 left-16 z-20">
              <p className="text-xl font-black text-white">{sender?.phone_number || '123-456-7890'}</p>
           </div>
           
           <div className="absolute bottom-0 right-0 w-full h-16 bg-[#1E3A8A] flex justify-end items-center px-16 text-white text-sm font-bold gap-8">
              <p>{sender?.email || 'hello@reallygreatsite.com'}</p>
              <p>{sender?.website || 'www.reallygreatsite.com'}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-banner') {
      return (
        <div className="mt-auto z-10">
           <div className="h-16 bg-[#1E293B] flex items-center justify-between px-16 text-white text-sm font-bold">
              <div className="flex items-center gap-2">
                 <Globe className="w-4 h-4" />
                 <span>{sender?.website || 'www.reallygreatsite.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Mail className="w-4 h-4" />
                 <span>{sender?.email || 'hello@reallygreatsite.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Phone className="w-4 h-4" />
                 <span>{sender?.phone_number || '+123-456-7890'}</span>
              </div>
           </div>
        </div>
      );
    }

  if (id === 'geo-proforma') {
      return (
        <div className="mt-auto p-16 pb-24 relative z-10 text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
           <p className="max-w-[40%]">QUESTA È UNA FATTURA PROFORMA. NON COSTITUISCE UNA RICHIESTA DI PAGAMENTO FINO A QUANDO NON VIENE CONFERMATA.</p>
           <div className="mt-4 w-full h-1 bg-slate-400/50" />
           {/* Bottom Right Dots overlay the signature/footer */}
        </div>
      );
    }

  if (id === 'geo-green-angle') {
      return (
        <div className="mt-auto relative h-48 overflow-hidden z-10 bg-noble-surface">
           <div className="absolute bottom-0 right-0 w-[100%] h-full bg-[#10B981]" style={{ clipPath: 'polygon(50% 100%, 100% 0, 100% 100%)' }} />
           <div className="absolute bottom-0 left-0 w-full h-12 bg-slate-200" style={{ clipPath: 'polygon(0 100%, 60% 0, 100% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-triangle') {
      return (
        <div className="mt-auto relative h-48 overflow-hidden z-10 bg-noble-surface flex items-end">
           <div className="absolute bottom-0 right-0 w-[55%] h-full bg-[#312E81]" style={{ clipPath: 'polygon(0 100%, 40% 0, 100% 0, 100% 100%)' }} />
           <div className="absolute bottom-0 left-[20%] w-[40%] h-[70%] bg-[#38BDF8]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
           
           <div className="w-[30%] h-16 bg-[#38BDF8]" />
           <div className="flex-1" />
        </div>
      );
    }

  if (id === 'geo-navy-prism') {
      return (
        <div className="mt-auto relative h-32 overflow-hidden z-10 flex">
           <div className="w-[60%] bg-[#1E3A8A] h-full flex items-center px-16 text-white text-xs font-bold leading-relaxed">
              <p className="max-w-[80%]">{data.notes || 'Subject to NobleInvoice standard terms.'}</p>
           </div>
           <div className="flex-1 bg-[#3B82F6]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-cyan-edge') {
      return (
        <div className="mt-auto relative h-32 overflow-hidden z-10 flex">
           <div className="w-[60%] bg-black h-full flex items-center px-16 text-white text-xs font-bold leading-relaxed">
              <p className="max-w-[80%]">{data.notes}</p>
           </div>
           <div className="flex-1 bg-[#06B6D4]" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-cobalt-stripe') {
      return (
        <div className="mt-auto relative h-32 overflow-hidden z-10 bg-[#1E3A8A] flex items-center px-16 text-white text-xs font-bold">
           <p>Certified Professional Document • 2026</p>
        </div>
      );
    }

  if (id === 'geo-onyx-glass') {
      return (
        <div className="mt-auto h-24 bg-black flex items-center px-16 justify-between text-white relative z-10">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Onyx Glass Series</p>
           <p className="text-xs font-bold italic opacity-60">Verified Official Seal</p>
        </div>
      );
    }

  if (id === 'geo-slate-minimal') {
      return (
        <div className="mt-auto h-4 bg-[#334155] w-full" />
      );
    }

  if (id === 'geo-blue' || id === 'geo-purple' || id === 'geo-navy' || id === 'geo-green') {
      const isDark = id === 'geo-navy';
      const accentBg = isDark ? brand.main : brand.medium;
      const fadeBg = isDark ? brand.soft : brand.fade;
      return (
        <div className="mt-auto p-16 relative overflow-hidden h-48 z-10">
          <div className="absolute bottom-0 right-0 w-64 h-48">
             <div className="absolute bottom-0 right-0 w-full h-full opacity-20" style={{ backgroundColor: fadeBg, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
             <div className="absolute bottom-0 right-0 w-32 h-32 opacity-40" style={{ backgroundColor: accentBg, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
          </div>
          <div className="relative z-10">
             <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-white' : 'text-noble-text'}`}>Terms & Conditions</p>
             <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>{data.notes || 'Please pay within 15 days.'}</p>
          </div>
        </div>
      );
    }

  if (id === 'geo-green') {
      return (
        <div className="mt-auto p-16 relative overflow-hidden h-48 z-10">
          <div className="absolute bottom-0 left-0 w-[40%] h-64 bg-[#E2E8F0]" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
          <div className="relative z-10 ml-[45%]">
             <p className="text-[10px] font-black uppercase tracking-widest mb-2">Terms & Conditions</p>
             <p className="text-xs font-bold text-slate-500">Please pay within 15 days.</p>
          </div>
        </div>
      );
    }

  if (id === 'geo-solid-purple') {
      return (
        <div className="mt-auto pt-16 relative z-10">
          <div className="px-16 mb-8">
             <p className="text-[10px] font-black uppercase tracking-widest mb-2">Terms & Conditions</p>
             <p className="text-xs font-bold text-slate-500">Please pay within 15 days.</p>
          </div>
          <div className="h-4 w-full flex">
             <div className="w-1/3 bg-[#6D28D9] h-full" />
             <div className="w-1/3 bg-[#EC4899] h-full" />
             <div className="w-1/3 bg-[#FBBF24] h-full" />
          </div>
        </div>
      );
    }

  if (id === 'geo-cyber-grid') {
      return (
        <div className="mt-auto h-24 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10 border-t border-cyan-500/30">
           <div className="flex items-center gap-6">
              <div className="w-8 h-8 rounded-full border border-cyan-500 flex items-center justify-center animate-pulse">
                 <Diamond className="w-4 h-4 text-cyan-500" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">CYBER INFRA VERIFIED</p>
           </div>
           <p className="text-[9px] font-bold text-slate-500 italic">SECURE DIGITAL DOC • 2026</p>
        </div>
      );
    }

  if (id === 'geo-minimalist-box') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 bg-noble-surface border-t-2 border-slate-900 flex justify-between items-center">
           <div className="text-[10px] font-black text-noble-text uppercase tracking-[0.6em]">
              <p>MINIMAL BOX SERIES OFFICIAL STATEMENT</p>
           </div>
           <div className="flex flex-col items-end">
              <div className="w-48 h-1 bg-slate-900 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-slanted-edge') {
      return (
        <div className="mt-auto h-24 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10 overflow-hidden">
           <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-800 skew-x-[-12deg] translate-x-12" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 relative z-20">SLANTED EDGE VERIFIED</p>
           <div className="flex flex-col items-end relative z-20">
              <Signature className="w-8 h-8 text-white mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Official Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-diamond-pro') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 bg-slate-50 border-t-4 border-noble-border flex justify-between items-center">
           <div className="flex items-center gap-4">
              <Diamond className="w-6 h-6 text-slate-300" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DIAMOND PRO SERIES • CORPORATE</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-px bg-slate-300 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-tech-blueprint') {
      return (
        <div className="mt-auto h-32 bg-[#020617] flex items-center px-16 justify-between text-white relative z-10 border-t border-white/10">
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest">Tech Blueprint Verified</p>
              <p className="text-[9px] font-bold opacity-30 italic">Engineering Data Sheet • 2026 Edition</p>
           </div>
           <div className="flex flex-col items-end pr-8">
              <Signature className="w-12 h-12 text-blue-500 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-blue-900">Lead Engineer</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-abstract-blocks') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 border-t-8 border-slate-900 flex justify-between items-end bg-noble-surface">
           <div className="space-y-4">
              <h4 className="text-sm font-black text-noble-text uppercase">Document Hash:</h4>
              <p className="text-[10px] font-bold text-slate-400 break-all w-64 uppercase tracking-tighter opacity-50">849AE359AF6F4F58B449182E03EDF375_BLOCK_VERIFIED</p>
           </div>
           <div className="flex flex-col items-center">
              <Signature className="w-10 h-10 text-noble-text mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">Authorized</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-circuit-board') {
      return (
        <div className="mt-auto h-24 bg-black flex items-center px-16 justify-between text-white relative z-10 border-t border-emerald-500/20">
           <div className="flex items-center gap-6">
              <div className="w-8 h-8 rounded-full border border-emerald-500 flex items-center justify-center animate-pulse">
                 <Building2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">CIRCUIT SYSTEM ONLINE</p>
           </div>
           <p className="text-[9px] font-bold text-slate-800 uppercase tracking-widest">Official Hardware Release</p>
        </div>
      );
    }

  if (id === 'geo-origami-fold') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center bg-slate-50 border-t border-noble-border shadow-inner">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">
              <p>ORIGAMI SERIES • PAPER FOLD VERIFIED</p>
           </div>
           <div className="flex flex-col items-center">
              <Signature className="w-10 h-10 text-slate-300 mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-pixel-perfect') {
      return (
        <div className="mt-auto h-24 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t-4 border-slate-900">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">PIXEL PERFECT SERIES VERIFIED</p>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-2 border-slate-900 flex items-center justify-center">
                 <Signature className="w-6 h-6 text-noble-text" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Official Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-hexa-premium') {
      return (
        <div className="mt-auto h-24 bg-[#0F172A] flex items-center px-16 justify-between text-white relative z-10 border-t border-white/10">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">HEXA PREMIUM VERIFIED</p>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-slate-400 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-600">Secure Entity Seal</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-matrix-dots') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 bg-slate-900 flex justify-between items-center border-t-8 border-slate-800">
           <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em]">
              <p>MATRIX SERIES DIGITAL VERIFICATION</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-px bg-noble-surface/20 mb-2" />
              <p className="text-[10px] font-black text-white uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-shattered-glass') {
      return (
        <div className="mt-auto h-24 bg-noble-surface flex items-center px-16 justify-between text-noble-text relative z-10 border-t border-noble-border">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">SHATTERED GLASS SERIES • VERIFIED</p>
           <div className="flex flex-col items-end">
              <Signature className="w-8 h-8 text-slate-400 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Official Signature</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-brutalist-block') {
      return (
        <div className="mt-auto h-32 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest">BRUTALIST SERIES OFFICIAL</p>
              <p className="text-[9px] font-bold opacity-30 italic">Document Block # {data.invoiceNumber}</p>
           </div>
           <div className="flex flex-col items-end pr-8">
              <Signature className="w-12 h-12 text-white mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Authorized Official</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-concentric-circles') {
      return (
        <div className="mt-auto px-16 py-12 relative z-10 flex justify-between items-center bg-noble-surface border-t border-slate-100">
           <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
              <p>CONCENTRIC DYNAMICS VERIFIED</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-48 h-1 bg-slate-900 rounded-full mb-2" />
              <p className="text-[10px] font-black text-noble-text uppercase tracking-widest">{sender?.full_name}</p>
           </div>
        </div>
      );
    }

  if (id === 'geo-isometric-tower') {
      return (
        <div className="mt-auto h-24 bg-slate-900 flex items-center px-16 justify-between text-white relative z-10 skew-y-[2deg] -mb-4">
           <div className="flex items-center gap-6 skew-y-[-2deg]">
              <div className="w-8 h-8 rounded-none border border-slate-400 flex items-center justify-center">
                 <Diamond className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">ISOMETRIC SERIES VERIFIED</p>
           </div>
           <div className="flex flex-col items-end skew-y-[-2deg]">
              <Signature className="w-8 h-8 text-white opacity-50 mb-1" />
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-700">Digital Seal</p>
           </div>
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
