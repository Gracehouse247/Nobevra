import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const GallegoDynamicCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = '#0a0d14';
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: darkBg }}>
        {/* Futuristic Intersecting Energy Ribbons */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1050 600" fill="none">
            <polygon points="-100,50 900,650 800,650 -200,50" fill={accent} />
            <polygon points="150,-100 850,600 950,600 250,-100" fill={brandMid} />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full text-white">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <path d="M 15,50 L 50,15 L 85,50 L 50,85 Z" />
                  <path d="M 30,50 L 50,30 L 70,50 L 50,70 Z" />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <div role="presentation" className="font-black tracking-tight leading-none uppercase" style={{ fontSize: fs(62), fontFamily: 'Space Grotesk, sans-serif' }}>
                  {data.fullName || 'GALLEGO DYNAMIC'}
                </div>
                <p className="font-extrabold tracking-[0.4em] uppercase" style={{ fontSize: fs(14), color: accent }}>
                  {data.jobTitle || 'GLOBAL KINETIC DIRECTOR'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              {renderAvatar(accent, 130)}
              <DraggableElement elementKey="content" className="space-y-3 text-right text-slate-300">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.email || 'hello@gallego.com'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(16) }}>{data.website || 'gallego.com'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <path d="M 15,50 L 50,15 L 85,50 L 50,85 Z" />
                  <path d="M 30,50 L 50,30 L 70,50 L 50,70 Z" />
                </svg>
              </div>
              <h2 className="font-black text-white uppercase tracking-tighter" style={{ fontSize: fs(38), fontFamily: 'Space Grotesk, sans-serif' }}>
                {data.companyName || 'GALLEGO KINETICS'}
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
