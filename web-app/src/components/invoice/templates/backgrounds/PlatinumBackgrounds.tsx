import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const PlatinumBackground = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'plat-minimal-grey') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           {/* Grey box for table area */}
           <div className="absolute top-[480px] left-0 w-full h-[400px] bg-slate-100/50" />
        </div>
      );
    }

  if (id === 'plat-blue-wave') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }} />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
      );
    }

  if (id === 'plat-blue-wave-2') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 250" preserveAspectRatio="none">
              <path fill="#3F61F9" d="M0,0L1440,0L1440,150C1200,250 800,100 0,150Z" />
           </svg>
        </div>
      );
    }

  if (id === 'plat-red-geo') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[600px] bg-rose-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 60%)' }} />
           <div className="absolute top-20 right-20 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
        </div>
      );
    }

  if (id === 'plat-corp-teal') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
           <div className="absolute top-0 left-0 w-full h-80 bg-[#002E5B]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }} />
           <div className="absolute bottom-0 right-0 w-full h-40 bg-slate-200/50" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
        </div>
      );
    }

  if (id === 'plat-dark-blue-angle') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-96 bg-[#283B61]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 90%)' }} />
           <div className="absolute top-1/2 right-0 w-64 h-full bg-[#283B61]/5" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
        </div>
      );
    }

  if (id === 'plat-green-orange') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-80 bg-[#0B4731]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }} />
           <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
      );
    }

  if (id === 'plat-obsidian') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
           <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
           <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent" />
        </div>
      );
    }

  if (id === 'plat-ivory-gold') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FFFEFA]">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/silk.png")' }} />
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />
           <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />
        </div>
      );
    }

  if (id === 'plat-sapphire') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#001233]">
           <div className="absolute -top-48 -left-48 w-[800px] h-[800px] bg-[#002855]/40 rounded-full blur-[120px]" />
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
      );
    }

  if (id === 'plat-emerald-lux') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#022C22]">
           <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-emerald-900/40 to-transparent" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />
           <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
        </div>
      );
    }

  if (id === 'plat-marble-white') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/marble.png")' }} />
           <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'plat-rose-gold-lux') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FFF5F7]">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FBCFE8]/30 rounded-full blur-[80px]" />
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#BE185D]/5 to-transparent" />
        </div>
      );
    }

  if (id === 'plat-crimson-elite') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#450A0A]">
           <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
           <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px]" />
        </div>
      );
    }

  if (id === 'plat-matte-black-gold') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#121212]">
           <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
           <div className="absolute top-24 right-0 w-1 h-96 bg-gradient-to-b from-[#D4AF37] to-transparent" />
           <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        </div>
      );
    }

  if (id === 'plat-ultra-minimal') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-1 h-full bg-slate-100" />
           <div className="absolute top-0 right-0 w-1 h-full bg-slate-100" />
           <div className="absolute top-1/2 left-0 w-full h-px bg-slate-50" />
        </div>
      );
    }

  if (id === 'plat-champagne') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFCF0]">
           <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#CA8A04]/5 to-transparent" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#CA8A04]/5 rounded-full blur-[100px]" />
        </div>
      );
    }

  if (id === 'plat-midnight-navy') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
           <div className="absolute top-0 right-0 w-[45%] h-full bg-[#1E3A8A]/10" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'plat-silk-cream') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F9F8F6]">
           <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/silk.png")' }} />
           <div className="absolute top-0 left-0 w-full h-1 bg-slate-200" />
        </div>
      );
    }

  if (id === 'plat-titan') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#1E293B]">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/brushed-alum.png")' }} />
           <div className="absolute top-0 right-0 w-1/3 h-full bg-noble-surface/5" />
        </div>
      );
    }

  if (id === 'plat-lagoon') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#042F2E]">
           <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/50 to-transparent" />
           <div className="absolute -bottom-48 -left-48 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px]" />
        </div>
      );
    }

  if (id === 'plat-aubergine') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#2D0A31]">
           <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#F3E5AB 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
           <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-t from-[#F3E5AB]/5 to-transparent" />
        </div>
      );
    }

  if (id === 'plat-arctic') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F0F9FF]">
           <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-[100px]" />
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/ice-age.png")' }} />
        </div>
      );
    }

  if (id === 'plat-bonded-leather') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#27160C]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }} />
           <div className="absolute top-0 left-0 w-full h-32 bg-black/40" />
        </div>
      );
    }

  if (id === 'plat-royal-seal') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFCF0]">
           <div className="absolute top-0 left-0 w-full h-40 bg-[#D4AF37]/10" />
           <div className="absolute bottom-0 left-0 w-full h-40 bg-[#D4AF37]/10" />
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/fancy-pants.png")' }} />
        </div>
      );
    }

  if (id === 'plat-vermillion') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#7F1D1D]">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
           <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]" />
        </div>
      );
    }

  if (id === 'plat-diamond-noir') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A0A]">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/diamond-upholstery.png")' }} />
           <div className="absolute bottom-0 right-0 w-[40%] h-full bg-gradient-to-l from-white/5 to-transparent" />
        </div>
      );
    }

  if (id === 'plat-sovereign') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
           <div className="absolute bottom-0 right-0 w-full h-80 bg-gradient-to-t from-[#D4AF37]/10 to-transparent" />
        </div>
      );
    }

  if (id === 'plat-teal-curve') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-[60%] h-56 bg-[#3A8A96]" style={{ borderBottomRightRadius: '100px' }} />
        </div>
      );
    }

  if (id === 'plat-dark-blue-angle') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-56 bg-[#283B61]" style={{ borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }} />
        </div>
      );
    }

  if (id === 'plat-green-orange') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-56 bg-[#0B4731]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 85% 100%, 0 100%)' }} />
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
