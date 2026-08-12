import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const ProfessionalBackground = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'prof-emerald-nexus') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[350px] bg-[#064E3B]" />
        </div>
      );
    }

  if (id === 'prof-royal-purple') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[320px] bg-[#6D28D9]" />
        </div>
      );
    }

  if (id === 'prof-pastel-bloom') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[500px] opacity-40" style={{ background: 'linear-gradient(135deg, #EC4899 0%, #3B82F6 100%)', filter: 'blur(100px)' }} />
           <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-20" style={{ background: '#3B82F6', filter: 'blur(80px)' }} />
        </div>
      );
    }

  if (id === 'prof-blue-precision') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <div className="absolute top-0 right-0 w-[60%] h-64 bg-[#1E3A8A]/10" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
           <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1E3A8A]" />
        </div>
      );
    }

  if (id === 'prof-orange-orbit') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           {/* Abstract Circle Pattern */}
           <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F97316]/10 rounded-full" />
           <div className="absolute top-24 right-48 w-32 h-32 bg-[#F97316]/5 rounded-full" />
           <div className="absolute top-1/2 -left-12 w-48 h-48 bg-[#F97316]/10 rounded-full" />
           <div className="absolute top-10 right-10 flex gap-2">
              {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#F97316]/20" />)}
           </div>
        </div>
      );
    }

  if (id === 'prof-oceanic-wave') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-48 opacity-[0.05]" style={{ background: `radial-gradient(circle at 0 0, ${brand.main}, transparent 70%)` }} />
           <div className="absolute bottom-0 right-0 w-full h-64 opacity-[0.05]" style={{ background: `radial-gradient(circle at 100% 100%, ${brand.main}, transparent 70%)` }} />
        </div>
      );
    }

  if (id === 'prof-blue-horizon') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
           <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]" />
           <div className="absolute top-[28%] left-0 w-full h-8 bg-noble-surface" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
        </div>
      );
    }

  if (id === 'prof-red-diamond') {
      return (
        <div className="absolute inset-y-0 left-0 w-32 z-0 pointer-events-none overflow-hidden bg-noble-surface border-r border-slate-100">
           <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
              <pattern id="diamond-pattern-red" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                 <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#EF4444" opacity="0.1" />
                 <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="#B91C1C" opacity="0.2" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#diamond-pattern-red)" />
           </svg>
        </div>
      );
    }

  if (id === 'prof-navy-geometric') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
            <div className="absolute top-0 left-0 w-full h-72 bg-[#0F172A]" />
            <div className="absolute top-0 right-0 w-[40%] h-80 bg-[#1E293B]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            <div className="absolute top-0 right-0 w-[20%] h-64 bg-[#3B82F6] opacity-20" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
         </div>
       );
    }

  if (id === 'prof-teal-geometric') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#14B8A6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 left-0 w-full h-1 bg-[#14B8A6] shadow-[0_0_20px_#14B8A6]" />
         </div>
       );
    }

  if (id === 'prof-orange-geometric') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute top-0 left-0 w-1/3 h-64 bg-[#F97316] opacity-10" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
         </div>
       );
    }

  if (id === 'prof-yellow-sharp') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            <div className="absolute top-0 left-0 w-24 h-full bg-black" />
            <div className="absolute top-0 left-24 w-1 h-full bg-[#FBBF24]" />
         </div>
       );
    }

  if (id === 'prof-black-yellow-geo') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
            <div className="absolute top-0 left-0 w-full h-96 bg-black" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }} />
            <div className="absolute top-0 left-0 w-full h-96 border-b-8 border-[#FBBF24]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }} />
         </div>
       );
    }

  if (id === 'prof-cyan-black-geo') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
            <div className="absolute top-0 right-0 w-32 h-full bg-black opacity-5" />
            <div className="absolute top-0 right-32 w-px h-full bg-[#06B6D4] opacity-20" />
         </div>
       );
    }

  if (id === 'prof-yellow-minimal-geo') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FFFBEB]">
            <div className="absolute top-0 right-0 w-[45%] h-full bg-[#FBBF24] opacity-5" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            <div className="absolute top-0 right-0 w-2 h-full bg-[#FBBF24]" />
         </div>
       );
    }

  if (id === 'prof-blue-wave-premium') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-[#EFF6FF] to-white" />
            <div className="absolute top-[35%] left-0 w-full h-px bg-slate-100" />
         </div>
       );
    }

  if (id === 'prof-blue-curved-banner') {
       return (
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
            <div className="absolute top-0 left-0 w-full h-24 bg-slate-900" />
            <div className="absolute top-24 left-0 w-full h-8 bg-slate-900" style={{ clipPath: 'ellipse(60% 100% at 50% 0%)' }} />
         </div>
       );
    }

  if (id === 'prof-carbon-fiber') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#111111]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#444] to-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-50" />
        </div>
      );
    }

  if (id === 'prof-sage-minimal') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#FDFDFD]">
           <div className="absolute top-0 right-0 w-[40%] h-full bg-[#6B8F71]/5" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
           <div className="absolute top-12 right-12 w-32 h-32 border border-[#6B8F71]/20 rounded-full" />
        </div>
      );
    }

  if (id === 'prof-crimson-ledger') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[400px] bg-[#991B1B]" />
           <div className="absolute top-0 left-0 w-12 h-full bg-[#991B1B] opacity-5" />
           <div className="absolute top-0 left-12 w-px h-full bg-[#991B1B] opacity-20" />
        </div>
      );
    }

  if (id === 'prof-cobalt-split') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-[45%] h-full bg-[#1D4ED8]" />
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1D4ED8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
      );
    }

  if (id === 'prof-slate-grid') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F8FAFC]">
           <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100">
              <pattern id="slate-grid-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#475569" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#slate-grid-pattern)" />
           </svg>
           <div className="absolute top-0 left-0 w-full h-2 bg-[#475569]" />
        </div>
      );
    }

  if (id === 'prof-forest-premium') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[320px] bg-[#14532D]" />
           <div className="absolute top-0 right-0 w-[30%] h-[320px] bg-black opacity-20" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
           <div className="absolute bottom-0 left-0 w-full h-1 bg-[#14532D]" />
        </div>
      );
    }

  if (id === 'prof-carbon-fiber') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#111111]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#444] to-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-50" />
        </div>
      );
    }

  if (id === 'prof-sage-minimal') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#FDFDFD]">
           <div className="absolute top-0 right-0 w-[40%] h-full bg-[#6B8F71]/5" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
           <div className="absolute top-12 right-12 w-32 h-32 border border-[#6B8F71]/20 rounded-full" />
        </div>
      );
    }

  if (id === 'prof-crimson-ledger') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[400px] bg-[#991B1B]" />
           <div className="absolute top-0 left-0 w-12 h-full bg-[#991B1B] opacity-5" />
           <div className="absolute top-0 left-12 w-px h-full bg-[#991B1B] opacity-20" />
        </div>
      );
    }

  if (id === 'prof-cobalt-split') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-[45%] h-full bg-[#1D4ED8]" />
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1D4ED8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
      );
    }

  if (id === 'prof-slate-grid') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F8FAFC]">
           <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100">
              <pattern id="slate-grid-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#475569" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#slate-grid-pattern)" />
           </svg>
           <div className="absolute top-0 left-0 w-full h-2 bg-[#475569]" />
        </div>
      );
    }

  if (id === 'prof-forest-premium') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[320px] bg-[#14532D]" />
           <div className="absolute top-0 right-0 w-[30%] h-[320px] bg-black opacity-20" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
           <div className="absolute bottom-0 left-0 w-full h-1 bg-[#14532D]" />
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
