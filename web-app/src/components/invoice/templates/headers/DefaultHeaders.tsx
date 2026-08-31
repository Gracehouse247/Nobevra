import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const DefaultHeader = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  const headerStyle = data.template?.settings?.headerStyle || 'default';

  const accentColor = brand?.primary_color || brand?.brand_color || '#166FBB';

  switch (headerStyle) {
      case 'diagonal':
        return (
          <div className="relative h-64 mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: accentColor, clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)' }} />
            <div className="relative z-10 p-16 flex justify-between items-start text-white">
               {renderLogo?.("w-24 h-24", true)}
               <div className="text-right">
                 <div role="presentation" className="text-6xl font-black uppercase tracking-tighter mb-2">Invoice</div>
                 <p className="text-white/60 font-black text-xs uppercase tracking-[0.4em]">{data.invoiceNumber}</p>
               </div>
            </div>
          </div>
        );
      case 'stripe':
        return (
          <div className="mb-12 relative">
            <div className="h-4 w-full" style={{ backgroundColor: accentColor }} />
            <div className="p-16 flex justify-between items-center bg-noble-surface border-b border-slate-50">
               {renderLogo?.("w-20 h-20")}
               <div className="text-center">
                 <div role="presentation" className="text-4xl font-black uppercase tracking-[0.3em] text-noble-text">Invoice</div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mt-2">Ref: {data.invoiceNumber}</p>
               </div>
               <div className="w-20" />
            </div>
          </div>
        );
      case 'block':
        return (
          <div className="mb-12 flex h-64 border-b-8 border-slate-50">
            <div className="w-[65%] p-16 text-white flex flex-col justify-center relative overflow-hidden" style={{ backgroundColor: accentColor }}>
               <div role="presentation" className="text-8xl font-black uppercase tracking-tighter mb-2 relative z-10 italic opacity-90">Invoice</div>
               <p className="text-white font-black tracking-[0.5em] text-xs uppercase opacity-60 relative z-10">#{data.invoiceNumber}</p>
            </div>
            <div className="w-[35%] flex flex-col items-center justify-center bg-slate-50">
               {renderLogo?.("w-32 h-32")}
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="p-16 mb-12 flex justify-between items-end border-b-[12px] border-slate-50">
             <div className="flex flex-col items-start">
               <div className="w-20 h-2 mb-8 rounded-full" style={{ backgroundColor: accentColor }} />
               <div role="presentation" className="text-6xl font-black uppercase tracking-tight text-noble-text leading-none">Invoice</div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Serial No.</p>
                <p className="text-4xl font-black text-noble-text tracking-tighter italic">{data.invoiceNumber}</p>
             </div>
          </div>
        );
      default:
        return (
          <div className="p-16 mb-12 flex justify-between items-start border-b-2 border-slate-50">
             {renderLogo?.("w-24 h-24")}
             <div className="text-right">
               <div role="presentation" className="text-6xl font-black uppercase tracking-tighter text-noble-text mb-2">Invoice</div>
               <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">#{data.invoiceNumber}</p>
             </div>
          </div>
        );
    }
  
  return null; // Fallback if no specific ID matched in this group
};
