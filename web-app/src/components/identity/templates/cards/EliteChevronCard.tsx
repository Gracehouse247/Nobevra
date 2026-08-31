import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const EliteChevronCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const darkBg = brandDark;
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden">
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch">
            {/* Left Column - Asymmetric Dark Panel with Diagonal Energy Lines */}
            <div className="flex-[0.55] relative flex flex-col justify-between p-16 text-white overflow-hidden" style={{ backgroundColor: darkBg }}>
              {/* Layered Depth & Diagonal Ribbon */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 300 600" fill="none">
                  <path d="M-100,-100 L200,600 L150,650 L-150,-50 Z" fill={accent} />
                  <path d="M100,-100 L400,600 L350,650 L50,-50 Z" fill={accent} />
                </svg>
              </div>
              <DraggableElement elementKey="logo" className="w-14 h-14 relative z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="8">
                  <path d="M 20,50 L 50,20 L 80,50 L 50,80 Z" />
                  <path d="M 35,50 L 50,35 L 65,50 L 50,65 Z" fill={accent} />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="relative z-10 space-y-2">
                <div role="presentation" className="font-black tracking-tight leading-none uppercase" style={{ fontSize: fs(46), color: ON_COLOR }}>
                  {data.fullName || 'JAMES ELITE'}
                </div>
                <p className="font-bold tracking-[0.25em] uppercase opacity-70" style={{ fontSize: fs(14), color: accent }}>
                  {data.jobTitle || 'CHIEF EXECUTIVE'}
                </p>
                <div className="w-12 h-[3px] mt-4" style={{ backgroundColor: accent }} />
              </DraggableElement>
            </div>
            {/* Right Column - Airy white panel with Portrait Frame */}
            <div className="flex-[0.45] bg-noble-surface flex flex-col justify-between p-16 relative">
              <div className="flex justify-end">
                {renderAvatar(accent, 110)}
              </div>
              <DraggableElement elementKey="content" className="space-y-4">
                {[
                  { icon: Phone, value: data.phone || '+123-456-7890' },
                  { icon: Mail, value: data.email || 'james@elite.com' },
                  { icon: MapPin, value: data.address || 'Corporate Tower, NY' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <item.icon size={20} style={{ color: darkBg }} />
                    <span className="font-medium text-slate-600" style={{ fontSize: fs(15) }}>{item.value}</span>
                  </div>
                ))}
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-10 relative" style={{ backgroundColor: darkBg }}>
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
                <path d="M 0,0 L 500,600 L 600,600 L 100,0 Z" fill={accent} />
                <path d="M 400,0 L 900,600 L 1000,600 L 500,0 Z" fill={accent} />
              </svg>
            </div>
            <DraggableElement elementKey="logo" className="text-center z-10">
              <div className="w-28 h-28 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={accent} strokeWidth="6">
                  <path d="M 20,50 L 50,20 L 80,50 L 50,80 Z" />
                  <path d="M 35,50 L 50,35 L 65,50 L 50,65 Z" fill={accent} />
                </svg>
              </div>
              <h2 className="font-black text-white uppercase tracking-wider" style={{ fontSize: fs(28) }}>
                {data.companyName || 'ELITE BRAND'}
              </h2>
            </DraggableElement>
            <DraggableElement elementKey="qr" className="z-10 bg-noble-surface p-3 rounded-2xl shadow-2xl border-4" style={{ borderColor: accent }}>
              <SharedQRCode url={data.qrCodeUrl || ''} color={darkBg} size={200} className="w-20 h-20" />
            </DraggableElement>
          </div>
        )}
      </div>
    );
  };
