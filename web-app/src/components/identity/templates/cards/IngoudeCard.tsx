import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const IngoudeCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const earthTone = '#2C2B29';
    return (
      <div className="relative w-full h-full flex flex-col z-20 overflow-hidden bg-stone-50">
        {/* Curved Leaf Background Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-stone-900 opacity-95 pointer-events-none flex items-center justify-center">
          <svg className="absolute w-[180%] h-full right-[20%] opacity-5 fill-none stroke-stone-100" strokeWidth="2" viewBox="0 0 500 600">
            <path d="M 100,50 C 300,150 200,450 400,550 M 100,550 C 300,450 200,150 400,50" />
          </svg>
        </div>
        {isFront ? (
          <div className="w-full h-full flex flex-row items-stretch p-20 justify-between">
            <div className="flex flex-col justify-between max-w-xl h-full">
              <DraggableElement elementKey="logo" className="w-14 h-14">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={earthTone} strokeWidth="4">
                  <path d="M50,10 C70,40 70,60 50,90 C30,60 30,40 50,10 Z" />
                  <path d="M50,10 L50,90" />
                </svg>
              </DraggableElement>
              <DraggableElement elementKey="content" className="space-y-4">
                <div role="presentation" className="font-extrabold tracking-tight text-stone-800 leading-none uppercase" style={{ fontSize: fs(54), fontFamily: 'Cormorant Garamond, serif' }}>
                  {data.fullName || 'CLARA INGOUDE'}
                </div>
                <p className="font-bold tracking-[0.4em] uppercase text-stone-500" style={{ fontSize: fs(14) }}>
                  {data.jobTitle || 'ORGANIC PRODUCT ARCHITECT'}
                </p>
              </DraggableElement>
            </div>
            <div className="flex flex-col justify-between items-end h-full w-[35%]">
              {renderAvatar(accent, 120)}
              <DraggableElement elementKey="content" className="space-y-3 text-right text-stone-200">
                <p className="font-bold tracking-wider" style={{ fontSize: fs(15) }}>{data.phone || '+123-456-7890'}</p>
                <p className="font-bold tracking-wider" style={{ fontSize: fs(15) }}>{data.email || 'clara@ingoude.com'}</p>
                <p className="font-bold tracking-wider opacity-60" style={{ fontSize: fs(15) }}>{data.address || 'Organic Valley, CA'}</p>
              </DraggableElement>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center space-y-10">
            <DraggableElement elementKey="logo" className="space-y-4">
              <div className="w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={earthTone} strokeWidth="4">
                  <path d="M50,10 C70,40 70,60 50,90 C30,60 30,40 50,10 Z" />
                  <path d="M50,10 L50,90" />
                </svg>
              </div>
              <h2 className="font-black text-stone-800 uppercase tracking-tighter" style={{ fontSize: fs(34), fontFamily: 'Cormorant Garamond, serif' }}>
                {data.companyName || 'INGOUDE LABS'}
              </h2>
            </DraggableElement>
            <DraggableElement elementKey="qr" className="bg-noble-surface p-3 rounded-2xl shadow-xl border-4 border-stone-200">
              <SharedQRCode url={data.qrCodeUrl || ''} color={earthTone} size={200} className="w-20 h-20" />
            </DraggableElement>
          </div>
        )}
      </div>
    );
  };
