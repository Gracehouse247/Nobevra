import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { CardQRCode } from '../../CardQRCode';

export const BorcelleCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = brandDark;
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden bg-noble-surface">
        {/* Layered Diagonal Ribbons */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1050 600" fill="none">
            <polygon points="-100,650 400,-50 300,-50 -200,650" fill={accent} />
            <polygon points="100,650 600,-50 500,-50 0,650" fill={darkBg} />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full">
              <DraggableElement elementKey="logo" className="w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={darkBg} strokeWidth="8">
                  <path d="M 20,20 H 80 V 80 H 20 Z" />
                  <path d="M 40,40 H 60 V 60 H 40 Z" fill={accent} />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <h1 className="font-black tracking-tight leading-none uppercase text-noble-text" style={{ fontSize: fs(62) }}>
                  {data.fullName || 'BORCELLE CORP'}
                </h1>
                <p className="font-bold tracking-[0.35em] uppercase" style={{ fontSize: fs(14), color: accent }}>
                  {data.jobTitle || 'GLOBAL LOGISTICS DIRECTOR'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              {renderAvatar(accent, 130)}
              <DraggableElement elementKey="content" className="space-y-3 text-right text-slate-600">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider" style={{ fontSize: fs(16) }}>{data.email || 'hello@borcelle.com'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(16) }}>{data.website || 'borcelle.com'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={darkBg} strokeWidth="8">
                  <path d="M 20,20 H 80 V 80 H 20 Z" />
                  <path d="M 40,40 H 60 V 60 H 40 Z" fill={accent} />
                </svg>
              </div>
              <h2 className="font-black text-noble-text uppercase tracking-tighter" style={{ fontSize: fs(38) }}>
                {data.companyName || 'BORCELLE ENTERPRISE'}
              </h2>
            </DraggableElement>
            <CardQRCode url={data.qrCodeUrl} qrColor={darkBg} borderColor={accent} size={200} dimensionClass="w-22 h-22" DraggableElement={DraggableElement} />
          </div>
        )}
      </div>
    );
  };
