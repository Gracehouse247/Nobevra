import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const RimberioCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = brandDark;
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: darkBg }}>
        {/* Layered Diagonal Red Ribbon */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1050 600" fill="none">
            <polygon points="400,-50 950,650 850,650 300,-50" fill={accent} />
            <polygon points="600,-50 1150,650 1050,650 500,-50" fill={accent} />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-16 z-10 justify-between">
            <div className="flex flex-col justify-between h-full max-w-xl">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill={accent}>
                  <path d="M 10,90 L 50,10 L 90,90 L 50,70 Z" />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <h1 className="font-black text-white italic tracking-tighter uppercase leading-none" style={{ fontSize: fs(62) }}>
                  {data.fullName || 'MARC RIMBERIO'}
                </h1>
                <p className="font-extrabold tracking-[0.4em] uppercase" style={{ fontSize: fs(16), color: accent }}>
                  {data.jobTitle || 'GLOBAL BRAND STRATEGIST'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              {renderAvatar(accent, 140)}
              <DraggableElement elementKey="content" className="space-y-3 text-right">
                {[data.phone || '+123-456-7890', data.email || 'marc@rimberio.com', data.website || 'rimberio.com'].map((text, i) => (
                  <p key={i} className="text-white/80 font-bold tracking-wider" style={{ fontSize: fs(16) }}>{text}</p>
                ))}
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10 z-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto" fill={accent}>
                <path d="M 10,90 L 50,10 L 90,90 L 50,70 Z" />
              </svg>
              <h2 className="font-black text-white uppercase tracking-tight" style={{ fontSize: fs(38) }}>
                {data.companyName || 'RIMBERIO ELITE'}
              </h2>
            </DraggableElement>
            <DraggableElement elementKey="qr" className="bg-white p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4" style={{ borderColor: accent }}>
              <SharedQRCode url={data.qrCodeUrl || ''} color={accent} size={200} className="w-24 h-24" />
            </DraggableElement>
          </div>
        )}
      </div>
    );
  };
