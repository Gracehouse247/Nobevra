'use client';
import React from 'react';
import { Palette, Type, Shield, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { toast } from 'react-hot-toast';

export const BrandKitPanel: React.FC = () => {
  const { template, selectedElementId, updateElement, updateBackground, addElement } = useCanvasStore();

  const brandColors = [
    { name: 'Luxury Gold', hex: '#D4AF37' },
    { name: 'Prestige Navy', hex: '#0B1F5E' },
    { name: 'Slate Matte', hex: '#0F172A' },
    { name: 'Pure Alabaster', hex: '#F8FAFC' },
    { name: 'Emerald Mint', hex: '#10B981' },
    { name: 'Crimson Wine', hex: '#991B1B' }
  ];

  const premiumFonts = [
    { name: 'Playfair Display', category: 'Elegant Serif' },
    { name: 'Space Grotesk', category: 'Modern Geometric' },
    { name: 'Syne', category: 'Creative Display' },
    { name: 'Outfit', category: 'Minimalist Sans' },
    { name: 'JetBrains Mono', category: 'Technical Mono' }
  ];

  const handleApplyColor = (hex: string) => {
    if (selectedElementId) {
      updateElement(selectedElementId, { fill: hex });
      toast.success(`Applied color ${hex} to selected element`);
    } else {
      updateBackground(hex);
      toast.success(`Updated background color to ${hex}`);
    }
  };

  const handleApplyFont = (fontFamily: string) => {
    if (selectedElementId) {
      updateElement(selectedElementId, { fontFamily });
      toast.success(`Changed font to ${fontFamily}`);
    } else {
      toast.error('Select a text element to apply typography');
    }
  };

  const handleAddBrandLogo = () => {
    // Add default brand logo diamond placeholder/noble logo to canvas
    const newLogo = {
      id: 'brand-logo-' + Date.now(),
      type: 'shape' as const,
      x: 100,
      y: 100,
      width: 60,
      height: 60,
      fill: '#D4AF37',
      cornerRadius: 12
    };
    addElement(newLogo);
    toast.success('Inserted brand asset token onto canvas! 💎');
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2 text-amber-500">
        <Shield size={18} />
        <h3 className="font-bold text-noble-text text-sm">Noble Corporate Brand Kit</h3>
      </div>

      {/* Brand Colors */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Palette size={14} /> Brand Colors
        </span>
        <div className="grid grid-cols-3 gap-2">
          {brandColors.map((color) => (
            <button
              key={color.hex}
              onClick={() => handleApplyColor(color.hex)}
              className="flex flex-col items-center gap-1.5 p-2 bg-slate-50 border border-noble-border rounded-xl hover:border-noble-blue hover:bg-slate-100 transition-all text-center"
            >
              <div className="w-8 h-8 rounded-full border border-noble-border shadow-sm" style={{ backgroundColor: color.hex }} />
              <span className="text-[9px] font-bold text-slate-600 truncate w-full">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Type size={14} /> Elite Typography
        </span>
        <div className="flex flex-col gap-2">
          {premiumFonts.map((font) => (
            <button
              key={font.name}
              onClick={() => handleApplyFont(font.name)}
              className="flex items-center justify-between p-3 bg-slate-50 border border-noble-border rounded-xl hover:border-noble-blue hover:bg-slate-100 transition-all text-left group"
            >
              <span className="text-xs font-bold text-slate-800" style={{ fontFamily: font.name }}>{font.name}</span>
              <span className="text-[9px] text-slate-400 font-semibold group-hover:text-noble-blue transition-colors">{font.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Corporate Assets */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <ImageIcon size={14} /> Corporate Logos
        </span>
        <button
          onClick={handleAddBrandLogo}
          className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-dashed border-noble-border rounded-xl hover:border-noble-blue hover:bg-blue-50/20 text-left transition-all"
        >
          <div className="w-12 h-12 rounded-lg bg-noble-surface border border-noble-border flex items-center justify-center text-amber-500 shadow-sm">
            <Sparkles size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">Noble Corporate Stamp</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Golden diamond vector token</span>
          </div>
        </button>
      </div>
    </div>
  );
};
