import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const LiceriaLiquidCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = '#0b0c10';
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: darkBg }}>
        {/* Layered Liquid Wave SVG Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1050 600" fill="none">
            <path d="M0,0 C300,100 700,50 1050,150 L1050,0 Z" fill={accent} />
            <path d="M0,450 C300,350 700,550 1050,400 L1050,600 L0,600 Z" fill={brandMid} />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full text-white">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="6">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M 50,10 Q 70,50 50,90 Q 30,50 50,10" fill={accent} />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <h1 className="font-black tracking-tight leading-none uppercase" style={{ fontSize: fs(62), fontFamily: 'Manrope, sans-serif' }}>
                  {data.fullName || 'LIQUID CREATIVE'}
                </h1>
                <p className="font-extrabold tracking-[0.4em] uppercase text-emerald-400 animate-pulse" style={{ fontSize: fs(14), color: accent }}>
                  {data.jobTitle || 'DIGITAL ARCHITECT'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              {renderAvatar(accent, 140)}
              <DraggableElement elementKey="content" className="space-y-3 text-right text-slate-300">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.email || 'hello@liquid.com'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(16) }}>{data.website || 'liquid.com'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="6">
                  <circle cx="50" cy="50" r="40" />
                  <path d="M 50,10 Q 70,50 50,90 Q 30,50 50,10" fill={accent} />
                </svg>
              </div>
              <h2 className="font-black text-white uppercase tracking-tighter" style={{ fontSize: fs(38), fontFamily: 'Manrope, sans-serif' }}>
                {data.companyName || 'LICERIA LIQUID'}
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
