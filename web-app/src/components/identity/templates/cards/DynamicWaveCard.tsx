import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const DynamicWaveCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const lightBg = '#f8fafc';
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: lightBg }}>
        {/* Layered Curved Wave Overlays */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1050 600" fill="none">
            <path d="M0,300 C300,100 500,500 1050,200 L1050,600 L0,600 Z" fill={accent} />
            <path d="M0,400 C400,200 600,600 1050,300 L1050,600 L0,600 Z" fill={brandMid} />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <path d="M 10,50 C 40,20 60,80 90,50" />
                  <circle cx="50" cy="50" r="10" fill={accent} />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-3">
                <h1 className="font-black tracking-tighter uppercase leading-none text-noble-text" style={{ fontSize: fs(66) }}>
                  {data.fullName || 'WAVE DESIGN'}
                </h1>
                <p className="font-bold tracking-[0.35em] uppercase" style={{ fontSize: fs(15), color: accent }}>
                  {data.jobTitle || 'CREATIVE DIRECTOR'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              {renderAvatar(accent, 130)}
              <DraggableElement elementKey="content" className="space-y-4 text-right">
                {[
                  { icon: Phone, text: data.phone || '+123-456-7890' },
                  { icon: Mail, text: data.email || 'hello@wave.com' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 justify-end">
                    <span className="font-semibold text-slate-700" style={{ fontSize: fs(16) }}>{item.text}</span>
                    <item.icon size={20} style={{ color: accent }} />
                  </div>
                ))}
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <path d="M 10,50 C 40,20 60,80 90,50" />
                  <circle cx="50" cy="50" r="10" fill={accent} />
                </svg>
              </div>
              <h2 className="font-black text-noble-text uppercase tracking-tighter" style={{ fontSize: fs(38) }}>
                {data.companyName || 'DYNAMIC WAVE'}
              </h2>
            </DraggableElement>
            <DraggableElement elementKey="qr" className="bg-noble-surface p-3 rounded-2xl shadow-xl border-4" style={{ borderColor: accent }}>
              <SharedQRCode url={data.qrCodeUrl || ''} color={accent} size={200} className="w-22 h-22" />
            </DraggableElement>
          </div>
        )}
      </div>
    );
  };
