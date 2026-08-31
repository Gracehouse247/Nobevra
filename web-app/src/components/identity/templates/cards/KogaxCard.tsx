import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const KogaxCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = '#0c0f14';
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: darkBg }}>
        {/* Cyber Neon Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        {/* Diagonal Tech energy band */}
        <div className="absolute right-0 top-0 bottom-0 w-2 pointer-events-none" style={{ backgroundColor: accent }} />
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full text-white">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={accent} strokeWidth="8">
                  <path d="M 20,20 L 80,80 M 80,20 L 20,80" />
                  <circle cx="50" cy="50" r="12" fill={darkBg} stroke={accent} strokeWidth="4" />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <div role="presentation" className="font-black tracking-tight leading-none uppercase" style={{ fontSize: fs(64), fontFamily: 'Space Grotesk, sans-serif' }}>
                  {data.fullName || 'KOGAX LABS'}
                </div>
                <p className="font-extrabold tracking-[0.4em] uppercase" style={{ fontSize: fs(14), color: accent }}>
                  {data.jobTitle || 'NEURAL ENGINEER'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              {renderAvatar(accent, 130)}
              <DraggableElement elementKey="content" className="space-y-3 text-right text-slate-400">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(15) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider" style={{ fontSize: fs(15) }}>{data.email || 'hello@kogax.ai'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(15) }}>{data.website || 'www.kogax.ai'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={accent} strokeWidth="8">
                  <path d="M 20,20 L 80,80 M 80,20 L 20,80" />
                  <circle cx="50" cy="50" r="12" fill={darkBg} stroke={accent} strokeWidth="4" />
                </svg>
              </div>
              <h2 className="font-black text-white uppercase tracking-tighter" style={{ fontSize: fs(38), fontFamily: 'Space Grotesk, sans-serif' }}>
                {data.companyName || 'KOGAX CORP'}
              </h2>
            </DraggableElement>
            <DraggableElement elementKey="qr" className="bg-noble-surface p-3 rounded-2xl shadow-xl border-4" style={{ borderColor: accent }}>
              <SharedQRCode url={data.qrCodeUrl || ''} color={darkBg} size={200} className="w-22 h-22" />
            </DraggableElement>
          </div>
        )}
      </div>
    );
  };
