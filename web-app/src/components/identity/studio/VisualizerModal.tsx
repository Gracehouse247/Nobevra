'use client';
import React, { useState } from 'react';
import { X, Rotate3d, Sparkles, Building, Layers } from 'lucide-react';
import { CanvasTemplate } from '../../../types/canvas';

interface VisualizerModalProps {
  template: CanvasTemplate;
  onClose: () => void;
  cardImageFront: string; // High-res image data URL
}

export const VisualizerModal: React.FC<VisualizerModalProps> = ({ template, onClose, cardImageFront }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeBg, setActiveBg] = useState<'marble' | 'minimal' | 'executive'>('marble');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Scale down the rotation factor to keep it elegant
    setRotateX(-y / 8);
    setRotateY(x / 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Background environments
  const backgrounds = {
    marble: 'bg-gradient-to-tr from-slate-900 via-slate-800 to-zinc-900',
    minimal: 'bg-gradient-to-tr from-zinc-100 via-neutral-200 to-stone-300',
    executive: 'bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className={`w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden border border-white/10 flex flex-col relative shadow-2xl transition-all duration-500 ${backgrounds[activeBg]}`}>
        {/* Cinematic Particles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full animate-pulse" />
        </div>

        {/* Header Controls */}
        <div className="h-20 border-b border-white/10 px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-noble-surface/10 flex items-center justify-center text-amber-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{template.name}</h3>
              <p className="text-xs text-white/50">3D Real-time Physical Card Visualizer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Background Environment Selector */}
            <div className="flex bg-noble-card border border-noble-card-border rounded-full p-1 text-xs">
              <button
                onClick={() => setActiveBg('marble')}
                className={`px-4 py-1.5 rounded-full transition-all ${activeBg === 'marble' ? 'bg-noble-surface text-slate-950 font-bold' : 'text-white/60 hover:text-white'}`}
              >
                Marble Slate
              </button>
              <button
                onClick={() => setActiveBg('minimal')}
                className={`px-4 py-1.5 rounded-full transition-all ${activeBg === 'minimal' ? 'bg-noble-surface text-slate-950 font-bold' : 'text-white/60 hover:text-white'}`}
              >
                Minimal Studio
              </button>
              <button
                onClick={() => setActiveBg('executive')}
                className={`px-4 py-1.5 rounded-full transition-all ${activeBg === 'executive' ? 'bg-noble-surface text-slate-950 font-bold' : 'text-white/60 hover:text-white'}`}
              >
                Executive Desk
              </button>
            </div>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 hover:bg-noble-surface/5 text-white text-sm font-medium transition-all"
            >
              <Rotate3d size={16} />
              Flip Card
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full border border-white/10 hover:bg-noble-surface/10 text-white/70 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 3D Visualizer Canvas Area */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden" style={{ perspective: '1200px' }}>
          
          {/* Card Mockup Frame with CSS 3D */}
          <div
            className="w-[500px] h-[286px] cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front of Card */}
            <div
              className="absolute inset-0 rounded-[18px] overflow-hidden shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              {cardImageFront ? (
                <img src={cardImageFront} alt="Front Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white font-bold" style={{ backgroundColor: template.background }}>
                  {template.name}
                </div>
              )}
              {/* Premium Luxury Card Glare Effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-60 pointer-events-none mix-blend-overlay" 
                style={{
                  transform: `translate(${rotateY * 4}px, ${rotateX * 4}px)`
                }}
              />
            </div>

            {/* Back of Card (Textured luxury matte background representing card back) */}
            <div
              className="absolute inset-0 rounded-[18px] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 text-center"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundColor: template.background || '#0f172a',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Subtle back design pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              <div className="w-16 h-16 rounded-full bg-noble-card border border-noble-card-border flex items-center justify-center text-white mb-4 shadow-inner">
                <Building size={28} className="text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-white tracking-wider uppercase">NOBLE GROUP</h4>
              <p className="text-[10px] text-white/50 tracking-widest mt-1">ESTABLISHED 2026</p>
            </div>

            {/* Realistic Thickness Edges (Adds the 3D matte feel) */}
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-neutral-800 rounded-l" style={{ transform: 'rotateY(-90deg) translateZ(2px)', transformOrigin: 'left center' }} />
            <div className="absolute top-0 bottom-0 right-0 w-[4px] bg-neutral-800 rounded-r" style={{ transform: 'rotateY(90deg) translateZ(2px)', transformOrigin: 'right center' }} />
          </div>

          {/* Interactive Help Hint */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2 rounded-full text-xs text-white/70 backdrop-blur-md">
            <Layers size={14} />
            <span>Hover to tilt & rotate, check high-fidelity paper layout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
