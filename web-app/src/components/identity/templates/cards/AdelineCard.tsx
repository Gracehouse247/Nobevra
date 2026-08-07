import React from 'react';
import { CardQRCode } from '../../CardQRCode';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';

export const AdelineCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = '#111317';
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden" style={{ backgroundColor: darkBg }}>
        {/* Bold Diagonal Contrast Panel */}
        <div className="absolute left-0 top-0 bottom-0 w-[48%] bg-amber-400 pointer-events-none flex items-center justify-center">
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-black/10" />
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-16 justify-between z-10">
            {/* Left side sitting inside the yellow background (text must be black) */}
            <div className="flex flex-col justify-between h-full max-w-[42%] text-slate-950">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                  <rect x="20" y="20" width="60" height="60" rx="10" />
                  <circle cx="50" cy="50" r="15" fill="#111317" />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-3">
                <h1 className="font-black tracking-tighter uppercase leading-none" style={{ fontSize: fs(52) }}>
                  {data.fullName || 'ADELINE STUDIO'}
                </h1>
                <p className="font-black tracking-[0.25em] uppercase opacity-70" style={{ fontSize: fs(13) }}>
                  {data.jobTitle || 'CREATIVE DIRECTOR'}
                </p>
              </DraggableElement>
            </div>
            {/* Right side sitting inside the black background (text must be white) */}
            <div className="flex flex-col justify-between items-end h-full w-[48%] text-white">
              {renderAvatar(accent, 140)}
              <DraggableElement elementKey="content" className="space-y-3 text-right">
                <p className="font-extrabold tracking-wider text-amber-400" style={{ fontSize: fs(18) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-semibold tracking-wider text-white/80" style={{ fontSize: fs(16) }}>{data.email || 'hello@adeline.com'}</p>
                <p className="font-semibold tracking-wider text-white/60" style={{ fontSize: fs(16) }}>{data.website || 'adeline.com'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10 z-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto text-amber-400">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                  <rect x="20" y="20" width="60" height="60" rx="10" />
                  <circle cx="50" cy="50" r="15" fill="#111317" />
                </svg>
              </div>
              <h2 className="font-black text-white uppercase tracking-wider" style={{ fontSize: fs(38) }}>
                {data.companyName || 'ADELINE LABS'}
              </h2>
            </DraggableElement>
            <CardQRCode url={data.qrCodeUrl} qrColor={darkBg} borderColor='#F59E0B' size={200} dimensionClass="w-20 h-20" DraggableElement={DraggableElement} />
          </div>
        )}
      </div>
    );
  };
