import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const SalfordCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = brandDark;
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden bg-white">
        {/* Layered Block Accents */}
        <div className="absolute right-0 top-0 bottom-0 w-[42%] pointer-events-none" style={{ backgroundColor: darkBg }} />
        <div className="absolute right-[42%] top-0 bottom-0 w-2 pointer-events-none" style={{ backgroundColor: accent }} />
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between z-10">
            <div className="flex flex-col justify-between max-w-xl h-full">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill={accent}>
                  <rect x="10" y="10" width="80" height="80" rx="15" />
                  <rect x="30" y="30" width="40" height="40" fill="white" rx="5" />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <h1 className="font-black tracking-tight leading-none uppercase text-slate-900" style={{ fontSize: fs(62) }}>
                  {data.fullName || 'CLARK SALFORD'}
                </h1>
                <p className="font-bold tracking-[0.35em] uppercase text-slate-500" style={{ fontSize: fs(15) }}>
                  {data.jobTitle || 'SENIOR ARCHITECT'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full w-[38%] text-white">
              {renderAvatar(accent, 135)}
              <DraggableElement elementKey="content" className="space-y-3 text-right">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider opacity-85" style={{ fontSize: fs(16) }}>{data.email || 'clark@salford.com'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(16) }}>{data.website || 'salford.com'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10 z-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill={accent}>
                  <rect x="10" y="10" width="80" height="80" rx="15" />
                  <rect x="30" y="30" width="40" height="40" fill="white" rx="5" />
                </svg>
              </div>
              <h2 className="font-black text-slate-900 uppercase tracking-tighter" style={{ fontSize: fs(38) }}>
                {data.companyName || 'SALFORD DEVELOPMENTS'}
              </h2>
            </DraggableElement>
            <DraggableElement elementKey="qr" className="bg-white p-3 rounded-2xl shadow-xl border-4" style={{ borderColor: accent }}>
              <SharedQRCode url={data.qrCodeUrl || ''} color={darkBg} size={200} className="w-22 h-22" />
            </DraggableElement>
          </div>
        )}
      </div>
    );
  };
