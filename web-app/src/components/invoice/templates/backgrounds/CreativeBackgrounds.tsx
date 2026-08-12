import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const CreativeBackground = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'creative-swirl' || id.startsWith('creative-')) {
      // Background base
      let bgColor = brand.fade;
      if (id === 'creative-teal-brush') bgColor = brand.main;
      if (id === 'creative-pastel') bgColor = 'transparent';

      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ backgroundColor: bgColor }}>
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-10 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          
          {/* Dynamic Gradients based on brand */}
          {id === 'creative-pastel' ? (
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${brand.fade} 0%, ${brand.soft} 25%, white 50%, ${brand.soft} 75%, ${brand.fade} 100%)` }} />
          ) : (
            <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(135deg, ${brand.soft}, transparent, ${brand.medium})` }} />
          )}

          {/* Floating Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: brand.fade }} />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: brand.soft }} />
        </div>
      );
    }

  if (id === 'creative-yellow-geo') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]">
           <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#FBBF24] rounded-full opacity-20 blur-3xl" />
           <div className="absolute top-0 left-0 w-64 h-64 bg-[#FBBF24]" style={{ clipPath: 'circle(100% at 0 0)' }} />
        </div>
      );
    }

  if (id === 'creative-blue-poly') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#020617]">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
           <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-900/40 to-transparent" />
        </div>
      );
    }

  if (id === 'creative-teal-grunge') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F0FDFA]">
           <div className="absolute top-0 right-0 w-[50%] h-full bg-[#14B8A6] opacity-[0.03] blur-3xl rounded-full translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-[50%] h-full bg-[#14B8A6] opacity-[0.03] blur-3xl rounded-full -translate-x-1/2" />
        </div>
      );
    }

  if (id === 'creative-fluid-wave') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#0F172A]">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#581C87] via-[#0F172A] to-[#F97316]/20" />
           <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
        </div>
      );
    }

  if (id === 'creative-azure-wave') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#EFF6FF] to-white">
           <svg className="absolute bottom-0 left-0 w-full h-[50%]" viewBox="0 0 1440 400" preserveAspectRatio="none">
              <path fill="#3B82F6" fillOpacity="0.05" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z"></path>
           </svg>
        </div>
      );
    }

  if (id === 'creative-iso-grid') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#020617]">
           <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="hex-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M5 0 L10 2.5 L10 7.5 L5 10 L0 7.5 L0 2.5 Z" fill="none" stroke="#7C3AED" strokeWidth="0.2" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-grid)" />
           </svg>
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#7C3AED]/10 via-transparent to-[#7C3AED]/10" />
        </div>
      );
    }

  if (id === 'creative-soft-ripples') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F8FAFC]">
           <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 via-white to-[#3B82F6]/5" />
           <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1440 800">
              <circle cx="720" cy="400" r="100" fill="none" stroke="#10B981" strokeWidth="0.5" />
              <circle cx="720" cy="400" r="200" fill="none" stroke="#10B981" strokeWidth="0.5" />
              <circle cx="720" cy="400" r="300" fill="none" stroke="#10B981" strokeWidth="0.5" />
           </svg>
        </div>
      );
    }

  if (id === 'creative-teal-liquid') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#022C22]">
           <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)' , backgroundSize: '100px 100px' }} />
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#059669]/20 to-transparent blur-3xl" />
        </div>
      );
    }

  if (id === 'creative-grey-topography') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#1E293B]">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
           <div className="absolute top-0 left-0 w-1 h-full bg-[#475569]" />
           <div className="absolute top-0 left-0 w-full h-1 bg-[#475569]" />
        </div>
      );
    }

  if (id === 'creative-dual-geo') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface flex">
           <div className="w-[45%] h-full bg-[#DC2626]" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }} />
           <div className="flex-1 bg-noble-surface" />
        </div>
      );
    }

  if (id === 'creative-neon-grid') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-black">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#7C3AED]/20 to-transparent" />
        </div>
      );
    }

  if (id === 'creative-watercolor') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#FFFBFB]">
           <div className="absolute top-0 right-0 w-[60%] h-96 bg-gradient-to-bl from-pink-100/50 to-transparent blur-[100px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-[60%] h-96 bg-gradient-to-tr from-blue-100/50 to-transparent blur-[100px] rounded-full" />
        </div>
      );
    }

  if (id === 'creative-duotone') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-[#EC4899]/10 to-[#06B6D4]/10 mix-blend-multiply" />
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(black 2px, transparent 2px)', backgroundSize: '10px 10px' }} />
        </div>
      );
    }

  if (id === 'creative-blueprint') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#0F3B8C]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </div>
      );
    }

  if (id === 'creative-golden-hour') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-orange-50/30">
           <div className="absolute top-0 left-0 w-full h-[450px] bg-gradient-to-b from-orange-100/50 to-transparent" />
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-50/50 to-transparent" />
        </div>
      );
    }

  if (id === 'creative-monochrome') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-8 bg-black" />
           <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }} />
        </div>
      );
    }

  if (id === 'creative-retro-type') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#FCF9F1]">
           <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")' }} />
           <div className="absolute inset-12 border-2 border-slate-900/5 pointer-events-none" />
        </div>
      );
    }

  if (id === 'creative-aurora') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950">
           <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-20 blur-[120px] bg-gradient-to-tr from-indigo-500 via-emerald-500 to-cyan-500" />
        </div>
      );
    }

  if (id === 'creative-bauhaus') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 opacity-5" style={{ clipPath: 'circle(50% at 100% 0)' }} />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-5" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
        </div>
      );
    }

  if (id === 'creative-paper-cut') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F3F4F6]">
           <div className="absolute inset-10 bg-noble-surface shadow-inner rounded-[3rem]" />
           <div className="absolute top-0 left-0 w-full h-32 bg-noble-surface/50 blur-xl" />
        </div>
      );
    }

  if (id === 'creative-ink-splash') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 right-0 w-[50%] h-full opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
        </div>
      );
    }

  if (id === 'creative-rose-gold') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#FFF5F7]">
           <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-rose-100/50 to-transparent" />
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/silk.png")' }} />
        </div>
      );
    }

  if (id === 'creative-bauhaus-bold') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-4 bg-slate-900" />
           <div className="absolute top-0 left-0 w-4 h-full bg-slate-900" />
        </div>
      );
    }

  if (id === 'creative-forest-art') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F9FBFA]">
           <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-green-50 to-transparent opacity-50" />
        </div>
      );
    }

  if (id === 'creative-midnight-oil') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950">
           <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#06B6D4 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
