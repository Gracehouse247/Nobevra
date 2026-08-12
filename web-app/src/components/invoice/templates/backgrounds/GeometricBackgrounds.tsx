import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const GeometricBackground = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  if (id.startsWith('geo-')) {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-[600px] opacity-80" 
            style={{ 
              backgroundColor: brand.main,
              clipPath: id === 'geo-purple' ? 'polygon(0 0, 40% 0, 15% 100%, 0% 100%)' : 
                         id === 'geo-navy' ? 'polygon(0 0, 100% 0, 0 60%)' :
                         id === 'geo-green' ? 'polygon(0 0, 100% 0, 40% 50%, 0 50%)' :
                         'polygon(0 0, 40% 0, 15% 100%, 0% 100%)',
              background: `linear-gradient(135deg, ${brand.main}, ${brand.deep})`
            }} 
          />
          <div 
            className="absolute top-0 left-0 w-full h-[800px] opacity-30" 
            style={{ 
              backgroundColor: brand.soft,
              clipPath: id === 'geo-purple' ? 'polygon(0 0, 50% 0, 20% 100%, 0% 100%)' : 
                         id === 'geo-navy' ? 'polygon(100% 40%, 100% 100%, 30% 100%)' :
                         'polygon(0 0, 50% 0, 20% 100%, 0% 100%)'
            }} 
          />
          <div className="absolute left-0 top-0 w-1.5 h-full" style={{ backgroundColor: brand.main }} />
        </div>
      );
    }

  if (id === 'geo-proforma') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#A3B1C6]">
           {/* Top Left Dots */}
           <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-slate-400/20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.1 }} />
           {/* Bottom Right Dots */}
           <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-slate-400/20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.1 }} />
        </div>
      );
    }

  if (id === 'geo-navy-prism') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[320px] bg-[#1E3A8A]" />
           <div className="absolute top-0 right-0 w-[45%] h-[320px] bg-[#3B82F6]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-cyan-edge') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[320px] bg-black" />
           <div className="absolute top-0 right-0 w-[40%] h-[320px] bg-[#06B6D4]" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-cobalt-stripe') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[320px] bg-[#1E3A8A]" />
           <div className="absolute top-0 right-0 w-[35%] h-[320px] bg-[#2563EB]" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-onyx-glass') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-[350px] bg-[#374151]" />
           <div className="absolute top-0 right-0 w-[50%] h-[350px] bg-black" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-slate-minimal') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-12 bg-[#334155]" />
           <div className="absolute top-12 left-0 w-full h-24 bg-[#334155]/10" />
        </div>
      );
    }

  if (id === 'geo-cyber-grid') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-slate-950">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#22D3EE 0.5px, transparent 0.5px), linear-gradient(90deg, #22D3EE 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
           <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-cyan-500/20 to-transparent" />
        </div>
      );
    }

  if (id === 'geo-minimalist-box') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute inset-16 border border-slate-100" />
           <div className="absolute top-0 left-0 w-full h-2 bg-slate-900" />
        </div>
      );
    }

  if (id === 'geo-slanted-edge') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-50" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        </div>
      );
    }

  if (id === 'geo-diamond-pro') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F8FAFC]">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'conic-gradient(from 0deg at 50% 50%, #64748B 0deg, transparent 90deg)', backgroundSize: '100px 100px' }} />
        </div>
      );
    }

  if (id === 'geo-tech-blueprint') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#020617]">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
           <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        </div>
      );
    }

  if (id === 'geo-abstract-blocks') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 -rotate-12 translate-x-12 -translate-y-12" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100 rotate-12 -translate-x-12 translate-y-12" />
        </div>
      );
    }

  if (id === 'geo-circuit-board') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/circuit-board.png")' }} />
           <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_#10B981]" />
        </div>
      );
    }

  if (id === 'geo-origami-fold') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundPosition: '0 0, 40px 40px', backgroundSize: '80px 80px' }} />
        </div>
      );
    }

  if (id === 'geo-pixel-perfect') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
        </div>
      );
    }

  if (id === 'geo-hexa-premium') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#0F172A]">
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/hexellence.png")' }} />
        </div>
      );
    }

  if (id === 'geo-matrix-dots') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 opacity-50" />
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1E293B 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
        </div>
      );
    }

  if (id === 'geo-shattered-glass') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ clipPath: 'polygon(0 0, 100% 0, 70% 30%, 0 100%)', backgroundColor: '#CBD5E1' }} />
           <div className="absolute top-0 right-0 w-full h-full opacity-5" style={{ clipPath: 'polygon(100% 0, 100% 100%, 30% 70%)', backgroundColor: '#94A3B8' }} />
        </div>
      );
    }

  if (id === 'geo-brutalist-block') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#F3F4F6]">
           <div className="absolute top-0 left-0 w-8 h-full bg-slate-900" />
           <div className="absolute top-0 left-0 w-full h-8 bg-slate-900" />
        </div>
      );
    }

  if (id === 'geo-concentric-circles') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface overflow-hidden">
           <div className="absolute -top-32 -right-32 w-96 h-96 border-[40px] border-slate-50 rounded-full" />
           <div className="absolute -bottom-32 -left-32 w-96 h-96 border-[40px] border-slate-50 rounded-full" />
        </div>
      );
    }

  if (id === 'geo-isometric-tower') {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-noble-surface">
           <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        </div>
      );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
