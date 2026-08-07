import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { CardQRCode } from '../../CardQRCode';

export const AndradeCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = '#0f172a'; // slate-900 for ultra rich display contrast
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: darkBg }}>
        {/* Layered curved depth arc */}
        <div className="absolute right-0 bottom-0 top-0 w-[35%] bg-slate-950 opacity-95 pointer-events-none flex items-center justify-center">
          <svg className="absolute w-[200%] h-full right-[20%] opacity-5 fill-none stroke-white" strokeWidth="2" viewBox="0 0 500 600">
            <circle cx="250" cy="300" r="220" />
            <circle cx="250" cy="300" r="180" />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full text-white">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <polygon points="50,15 85,80 15,80" />
                  <circle cx="50" cy="55" r="10" fill={accent} />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <h1 className="font-black tracking-tight leading-none uppercase" style={{ fontSize: fs(62), fontFamily: 'Outfit, sans-serif' }}>
                  {data.fullName || 'ANDRADE STUDIO'}
                </h1>
                <p className="font-extrabold tracking-[0.4em] uppercase text-slate-400" style={{ fontSize: fs(14), color: accent }}>
                  {data.jobTitle || 'LEAD CREATIVE DIRECTOR'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full w-[30%] text-right text-slate-300">
              {renderAvatar(accent, 130)}
              <DraggableElement elementKey="content" className="space-y-3">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.email || 'hello@andrade.com'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(16) }}>{data.website || 'andrade.com'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <polygon points="50,15 85,80 15,80" />
                  <circle cx="50" cy="55" r="10" fill={accent} />
                </svg>
              </div>
              <h2 className="font-black text-white uppercase tracking-tighter" style={{ fontSize: fs(38), fontFamily: 'Outfit, sans-serif' }}>
                {data.companyName || 'ANDRADE CREATIVE'}
              </h2>
            </DraggableElement>
            <CardQRCode url={data.qrCodeUrl} qrColor={darkBg} borderColor={accent} size={200} dimensionClass="w-22 h-22" DraggableElement={DraggableElement} />
          </div>
        )}
      </div>
    );
  };
