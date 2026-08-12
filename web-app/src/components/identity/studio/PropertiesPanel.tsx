'use client';
import React from 'react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { AlignLeft, AlignCenter, AlignRight, Type, Shield, Sparkles, Layers, Sliders } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { template, selectedElementId, updateElement } = useCanvasStore();

  const selectedElement = template?.elements.find(el => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="w-80 bg-noble-surface/40 backdrop-blur-2xl border-l border-white/60 p-6 flex flex-col z-10 shrink-0 shadow-[-4px_0_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Sliders size={18} />
          <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Inspector</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mt-2">
          Select an element on the canvas to configure typography, border strokes, complex image masking, and ambient drop shadows.
        </p>
      </div>
    );
  }

  const handleChange = (key: string, value: string | number | boolean) => {
    updateElement(selectedElement.id, { [key]: value });
  };

  const fonts = [
    // Elegant Luxury Serifs
    'Playfair Display', 'Cormorant Garamond', 'Cinzel', 'Bodoni Moda', 'Prata', 
    'DM Serif Display', 'Fraunces', 'Lora', 'Merriweather', 'EB Garamond', 
    'Cardo', 'Libre Baskerville', 'Alice', 'Spectral', 'Gilda Display', 
    'Italiana', 'Forum', 'Tenor Sans', 'Noto Serif', 'PT Serif', 
    'Crimson Pro', 'Domine', 'Judson', 'Cinzel Decorative', 'Arvo', 
    'Bree Serif', 'Bitter', 'Baskervville', 'Sorts Mill Goudy', 'Marcellus', 
    'Ovo', 'Cormorant Upright', 'Arapey', 'DM Serif Text', 'Old Standard TT',
    // Modern Sans-Serifs & Sleek Geometric Grotesques
    'Inter', 'Montserrat', 'Outfit', 'Space Grotesk', 'Manrope', 
    'Plus Jakarta Sans', 'Urbanist', 'Syne', 'Lexend', 'Bricolage Grotesque', 
    'Work Sans', 'DM Sans', 'Nunito', 'Noto Sans', 'Source Sans 3', 
    'Open Sans', 'Roboto', 'Lato', 'Poppins', 'Raleway', 
    'Cabin', 'Questrial', 'Arimo', 'Rubik', 'Albert Sans', 
    'Figtree', 'Epilogue', 'Archivo', 'Schibsted Grotesk', 'Hanken Grotesk', 
    'Public Sans', 'Sen', 'Syncopate', 'Unbounded', 'Overpass', 
    'Karla', 'Mulish', 'Jost', 'Barlow', 'Kanit', 'League Spartan',
    // Modern Monospaced, Cyber & Geometric Display
    'Space Mono', 'JetBrains Mono', 'Inconsolata', 'Fira Code', 'Courier Prime', 
    'Source Code Pro', 'IBM Plex Mono', 'DM Mono', 'Share Tech Mono', 'Anonymous Pro',
    'Righteous', 'Julius Sans One', 'Federo', 'Krona One', 'Montserrat Alternates',
    'Chivo', 'Syne Tactile', 'Quicksand', 'Comfortaa', 'Cinzel Decorative'
  ];

  return (
    <div className="w-80 bg-noble-surface/40 backdrop-blur-2xl border-l border-white/60 p-6 flex flex-col gap-6 overflow-y-auto z-10 shrink-0 shadow-[-4px_0_30px_rgba(0,0,0,0.02)] no-scrollbar relative">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {selectedElement.type}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Element ID: {selectedElement.id.slice(0, 8)}</span>
        </div>
        <h3 className="font-bold text-noble-text mt-2 text-sm uppercase tracking-wide">Inspector Properties</h3>
      </div>

      {/* TEXT SPECIFIC CONTROLS */}
      {selectedElement.type === 'text' && (
        <div className="flex flex-col gap-5">
          {/* Text Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Type size={12} /> Content Value
            </label>
            <textarea
              className="w-full border border-noble-border rounded-xl p-3 text-sm focus:border-blue-500 focus:outline-none transition-all resize-none text-slate-800"
              rows={3}
              value={selectedElement.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
            />
          </div>

          {/* Font Family Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Font Family</label>
            <select
              value={selectedElement.fontFamily || 'Inter'}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="w-full bg-slate-50 border border-noble-border rounded-xl p-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Font Size & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Font Size ({selectedElement.fontSize}px)</label>
              <input
                type="number"
                min="8"
                max="120"
                value={selectedElement.fontSize || 16}
                onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                className="w-full bg-slate-50 border border-noble-border rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight</label>
              <select
                value={selectedElement.fontWeight || 'normal'}
                onChange={(e) => handleChange('fontWeight', e.target.value)}
                className="w-full bg-slate-50 border border-noble-border rounded-xl p-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="300">Light</option>
                <option value="normal">Regular</option>
                <option value="500">Medium</option>
                <option value="bold">Bold</option>
                <option value="900">Black</option>
              </select>
            </div>
          </div>

          {/* Letter Spacing */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Letter Spacing (Tracking)</label>
              <span className="text-[10px] font-bold text-blue-600">{selectedElement.letterSpacing || 0}px</span>
            </div>
            <input
              type="range"
              min="-2"
              max="15"
              step="0.5"
              value={selectedElement.letterSpacing || 0}
              onChange={(e) => handleChange('letterSpacing', Number(e.target.value))}
              className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Alignment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alignment</label>
            <div className="flex bg-slate-50 border border-noble-border p-1 rounded-xl gap-1">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  key={align}
                  onClick={() => handleChange('textAlign', align)}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-all ${selectedElement.textAlign === align ? 'bg-noble-surface text-noble-text shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {align === 'left' && <AlignLeft size={14} />}
                  {align === 'center' && <AlignCenter size={14} />}
                  {align === 'right' && <AlignRight size={14} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHAPE SPECIFIC CONTROLS */}
      {selectedElement.type === 'shape' && (
        <div className="flex flex-col gap-5">
          {/* Border radius coordinate for premium rounded-corners */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Corner Radius</label>
              <span className="text-[10px] font-bold text-blue-600">{Number(selectedElement.cornerRadius) || 0}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Number(selectedElement.cornerRadius) || 0}
              onChange={(e) => handleChange('cornerRadius', Number(e.target.value))}
              className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Border (Stroke) settings */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stroke Boundary</span>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400">Stroke Color</span>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedElement.stroke || '#ffffff'}
                    onChange={(e) => handleChange('stroke', e.target.value)}
                    className="w-8 h-8 rounded border-none p-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedElement.stroke || ''}
                    onChange={(e) => handleChange('stroke', e.target.value)}
                    placeholder="Hex Code"
                    className="flex-1 bg-slate-50 border border-noble-border rounded-lg text-[10px] font-mono px-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400">Stroke Width ({selectedElement.strokeWidth || 0}px)</span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={selectedElement.strokeWidth || 0}
                  onChange={(e) => handleChange('strokeWidth', Number(e.target.value))}
                  className="w-full bg-slate-50 border border-noble-border rounded-lg p-2 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE / SVG SPECIFIC CONTROLS */}
      {(selectedElement.type === 'image' || selectedElement.type === 'svg') && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Layers size={12} /> Asset Masking
            </label>
            <div className="flex bg-slate-50 border border-noble-border p-1 rounded-xl gap-2">
              <button
                onClick={() => handleChange('clipType', 'none')}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${selectedElement.clipType === 'none' || !selectedElement.clipType ? 'bg-noble-surface text-noble-text shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              >
                Standard
              </button>
              <button
                onClick={() => handleChange('clipType', 'circle')}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-1 ${selectedElement.clipType === 'circle' ? 'bg-noble-surface text-noble-text shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <Sparkles size={10} className="text-amber-500" /> Circle Avatar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIVERSAL FILL COLOR (For Text, Shapes, and SVG Vectors) */}
      {(selectedElement.type === 'text' || selectedElement.type === 'shape' || selectedElement.type === 'svg') && (
        <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              className="w-10 h-10 rounded-xl cursor-pointer border border-noble-border p-0"
              value={selectedElement.fill || '#000000'}
              onChange={(e) => handleChange('fill', e.target.value)}
            />
            <input
              type="text"
              className="flex-1 border border-noble-border rounded-xl px-4 text-xs font-mono focus:border-blue-500 outline-none text-slate-700"
              value={selectedElement.fill || '#000000'}
              onChange={(e) => handleChange('fill', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* UNIVERSAL AMBIENT DROP SHADOWS */}
      <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Shield size={12} /> Ambient Drop Shadow
        </label>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-slate-400">Shadow Color</span>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedElement.shadowColor || '#000000'}
                onChange={(e) => handleChange('shadowColor', e.target.value)}
                className="w-8 h-8 rounded border-none p-0 cursor-pointer"
              />
              <input
                type="text"
                value={selectedElement.shadowColor || ''}
                onChange={(e) => handleChange('shadowColor', e.target.value)}
                placeholder="#000"
                className="flex-1 bg-slate-50 border border-noble-border rounded-lg text-[10px] font-mono px-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-slate-400">Blur Radius ({selectedElement.shadowBlur || 0}px)</span>
            <input
              type="number"
              min="0"
              max="50"
              value={selectedElement.shadowBlur || 0}
              onChange={(e) => handleChange('shadowBlur', Number(e.target.value))}
              className="w-full bg-slate-50 border border-noble-border rounded-lg p-2 text-xs font-bold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-slate-400">Offset X ({selectedElement.shadowOffsetX || 0}px)</span>
            <input
              type="number"
              min="-30"
              max="30"
              value={selectedElement.shadowOffsetX || 0}
              onChange={(e) => handleChange('shadowOffsetX', Number(e.target.value))}
              className="w-full bg-slate-50 border border-noble-border rounded-lg p-2 text-xs font-bold focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-slate-400">Offset Y ({selectedElement.shadowOffsetY || 0}px)</span>
            <input
              type="number"
              min="-30"
              max="30"
              value={selectedElement.shadowOffsetY || 0}
              onChange={(e) => handleChange('shadowOffsetY', Number(e.target.value))}
              className="w-full bg-slate-50 border border-noble-border rounded-lg p-2 text-xs font-bold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* UNIVERSAL TRANSFORMS (XY coordinates) */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stage Coordinates</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 mb-1 block">X Position</span>
            <input
              type="number"
              className="w-full border border-noble-border rounded-xl p-2.5 text-xs font-bold focus:border-blue-500 outline-none text-slate-700"
              value={Math.round(selectedElement.x)}
              onChange={(e) => handleChange('x', Number(e.target.value))}
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 mb-1 block">Y Position</span>
            <input
              type="number"
              className="w-full border border-noble-border rounded-xl p-2.5 text-xs font-bold focus:border-blue-500 outline-none text-slate-700"
              value={Math.round(selectedElement.y)}
              onChange={(e) => handleChange('y', Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
