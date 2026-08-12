import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const EssentialBackground = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id === 'ess-geo-prism') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           {/* Top Left Polygons */}
           <div className="absolute top-0 left-0 w-[40%] h-48 bg-blue-600/20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
           <div className="absolute top-8 left-12 w-[30%] h-4 bg-blue-400/20 rotate-[-15deg]" />
           <div className="absolute top-16 left-24 w-[20%] h-4 bg-blue-300/20 rotate-[-15deg]" />
           
           {/* Bottom Right Polygons */}
           <div className="absolute bottom-0 right-0 w-[40%] h-64 bg-blue-600/10" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />
           <div className="absolute bottom-12 right-12 w-[30%] h-8 bg-blue-500/10 skew-x-[-20deg]" />
           <div className="absolute bottom-24 right-24 w-[20%] h-8 bg-blue-400/10 skew-x-[-20deg]" />
        </div>
      );
    }

  if (id === 'ess-purple-bloom') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-24 -left-24 w-[60%] h-96 bg-purple-600/20 rounded-full blur-[100px]" />
           <div className="absolute -bottom-24 -right-24 w-[50%] h-80 bg-purple-600/20 rounded-full blur-[100px]" />
        </div>
      );
    }

  if (id === 'ess-navy-angle') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-[45%] h-64 bg-[#1E3A8A]" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }} />
           <div className="absolute bottom-0 left-0 w-[35%] h-48 bg-[#14B8A6]" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
           <div className="absolute top-0 right-0 w-12 h-full bg-slate-50" />
        </div>
      );
    }

  if (id === 'ess-navy-lines') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
           <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <line x1="0" y1="100" x2="1000" y2="800" stroke="#1E3A8A" strokeWidth="2" />
              <line x1="0" y1="500" x2="1000" y2="200" stroke="#1E3A8A" strokeWidth="2" />
              <line x1="200" y1="0" x2="800" y2="1000" stroke="#1E3A8A" strokeWidth="2" />
              <line x1="600" y1="0" x2="300" y2="1000" stroke="#1E3A8A" strokeWidth="2" />
              <line x1="0" y1="800" x2="1000" y2="100" stroke="#1E3A8A" strokeWidth="2" />
           </svg>
        </div>
      );
    }

  if (id === 'ess-orange-blob') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#FBBF24] to-[#F97316] rounded-full blur-3xl opacity-30" />
           <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-[#FBBF24] to-[#F97316]" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
           
           <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#FBBF24] to-[#F97316] rounded-full blur-3xl opacity-30" />
           <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-gradient-to-tr from-[#FBBF24] to-[#F97316]" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        </div>
      );
    }

  if (id === 'ess-blue-angle') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
           <div className="absolute top-0 right-0 w-[40%] h-64 bg-[#E0E7FF]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
           <div className="absolute top-0 right-0 w-[30%] h-48 bg-[#1E3A8A]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
           
           <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full border-[60px] border-[#E0E7FF] opacity-50" />
        </div>
      );
    }

  if (id === 'ess-blue-curve') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F4F4F5]">
           <div className="absolute top-0 left-0 w-[60%] h-48 bg-[#3B82F6]" style={{ borderBottomRightRadius: '100%' }} />
           <div className="absolute top-0 left-0 w-[40%] h-64 bg-[#60A5FA] opacity-50" style={{ borderBottomRightRadius: '100%' }} />
           
           <div className="absolute bottom-0 right-0 w-[60%] h-48 bg-[#3B82F6]" style={{ borderTopLeftRadius: '100%' }} />
           <div className="absolute bottom-0 right-0 w-[40%] h-64 bg-[#60A5FA] opacity-50" style={{ borderTopLeftRadius: '100%' }} />
        </div>
      );
    }

  if (id === 'ess-dark-orange-wave') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F8FAFC]">
           <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: '250px' }}>
              <path fill="#F97316" d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,101.3C1120,128,1280,192,1360,224L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
              <path fill="#0F172A" d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,192C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
           </svg>
        </div>
      );
    }

  if (id === 'ess-blue-geo') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
              <pattern id="geo-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                 <rect x="2" y="2" width="16" height="16" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
                 <rect x="5" y="5" width="10" height="10" fill="none" stroke="#3B82F6" strokeWidth="0.2" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#geo-grid)" />
           </svg>
           <div className="absolute top-0 left-0 w-full h-48 bg-blue-50/30" />
        </div>
      );
    }

  if (id === 'ess-modern-swish') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-slate-100 rounded-full" />
           <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-slate-50 rounded-full" />
        </div>
      );
    }

  if (id === 'ess-azure-pattern') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path fill="#2563EB" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,213.3C672,224,768,192,864,160C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              <path fill="#2563EB" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,181.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
           </svg>
        </div>
      );
    }

  if (id === 'ess-urban-skyline') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute bottom-0 left-0 w-full h-[30%] opacity-[0.07] flex items-end justify-center gap-1">
              {[40, 60, 30, 80, 50, 90, 45, 70, 35, 85].map((h, i) => (
                <div key={i} className="w-8 bg-slate-900" style={{ height: `${h}%` }}>
                   <div className="grid grid-cols-2 gap-1 p-1">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="w-full h-1 bg-noble-surface opacity-20" />
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
    }

  if (id === 'ess-corporate-clean') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-1 bg-slate-900" />
           <div className="absolute top-0 right-0 w-[30%] h-48 bg-slate-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 0)' }} />
        </div>
      );
    }

  if (id === 'ess-clean-white') {
      return (
        <div className="absolute inset-0 bg-noble-surface" />
      );
    }

  if (id === 'ess-mint-fresh') {
      return (
        <div className="absolute inset-0 bg-[#F0FDF4]">
           <div className="absolute top-0 left-0 w-full h-1 bg-[#10B981]" />
        </div>
      );
    }

  if (id === 'ess-charcoal-pro') {
      return (
        <div className="absolute inset-0 bg-slate-900" />
      );
    }

  if (id === 'ess-sunny-day') {
      return (
        <div className="absolute inset-0 bg-[#FFFBEB]">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#FBBF24]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        </div>
      );
    }

  if (id === 'ess-lavender-soft') {
      return (
        <div className="absolute inset-0 bg-[#F5F3FF]">
           <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B5CF6]/20" />
        </div>
      );
    }

  if (id === 'ess-coral-bright') {
      return (
        <div className="absolute inset-0 bg-[#FFF1F2]">
           <div className="absolute top-0 left-0 w-2 h-full bg-[#FB7185]" />
        </div>
      );
    }

  if (id === 'ess-slate-pro') {
      return (
        <div className="absolute inset-0 bg-[#F8FAFC]">
           <div className="absolute top-0 left-0 w-full h-24 bg-[#0F172A]" />
        </div>
      );
    }

  if (id === 'ess-forest-edge') {
      return (
        <div className="absolute inset-0 bg-[#F0FDF4]">
           <div className="absolute top-0 right-0 w-2 h-full bg-[#15803D]" />
        </div>
      );
    }

  if (id === 'ess-ocean-breeze') {
      return (
        <div className="absolute inset-0 bg-[#F0F9FF]">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400" />
        </div>
      );
    }

  if (id === 'ess-midnight-pure') {
      return (
        <div className="absolute inset-0 bg-[#020617]" />
      );
    }

  if (id === 'ess-sandstone') {
      return (
        <div className="absolute inset-0 bg-[#FAFAF9]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#D6D3D1 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>
      );
    }

  if (id === 'ess-platinum-border') {
      return (
        <div className="absolute inset-0 bg-noble-surface border-[20px] border-slate-50" />
      );
    }

  if (id === 'ess-gold-accent') {
      return (
        <div className="absolute inset-0 bg-noble-surface">
           <div className="absolute top-12 left-0 w-32 h-1 bg-[#D4AF37]" />
        </div>
      );
    }

  if (id === 'ess-silver-line') {
      return (
        <div className="absolute inset-0 bg-noble-surface">
           <div className="absolute top-0 left-12 w-px h-full bg-slate-200" />
        </div>
      );
    }

  if (id === 'ess-onyx-bold') {
      return (
        <div className="absolute inset-0 bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-4 bg-black" />
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
