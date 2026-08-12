import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const ClaudiaAlvesCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const accent = brandAccent;
    const pillBg = brandDark;
    if (side === 'front') {
        return (
            <div className="relative w-full h-full flex flex-col justify-center items-start pl-28 z-20">
                {/* Vertical Icon Pill */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 w-20 rounded-full py-10 flex flex-col items-center gap-12 shadow-2xl" style={{ backgroundColor: pillBg }}>
                    <Phone size={32} style={{ color: accent }} />
                    <Mail size={32} style={{ color: accent }} />
                    <Globe size={32} style={{ color: accent }} />
                </div>
                
                {/* Contact Text */}
                <DraggableElement elementKey="content" className="ml-16">
                    <div className="space-y-12">
                        {[data.phone || '+123-456-7890', data.email || 'hello@reallygreatsite.com', data.website || 'www.reallygreatsite.com'].map((text, i) => (
                            <p key={i} className="font-medium tracking-tight" style={{ color: ON_WHITE, fontSize: fs(24) }}>{text}</p>
                        ))}
                    </div>
                </DraggableElement>
 
                {/* Top-Right Branding & Portrait */}
                <div className="absolute top-16 right-20 flex flex-col items-end gap-6">
                    {renderAvatar(accent, 120)}
                    <DraggableElement elementKey="logo">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-48 h-48 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full fill-none" style={{ stroke: ON_WHITE }} strokeWidth="2.5">
                                    <path d="M 30,50 Q 50,20 70,50" />
                                    <circle cx="50" cy="40" r="4" style={{ fill: ON_WHITE }} />
                                    <circle cx="40" cy="55" r="4" style={{ fill: ON_WHITE }} />
                                    <circle cx="60" cy="55" r="4" style={{ fill: ON_WHITE }} />
                                    <path d="M 25,50 L 75,50 L 65,90 L 35,90 Z" />
                                    <path d="M 35,90 L 35,50 M 45,90 L 45,50 M 55,90 L 55,50 M 65,90 L 65,50" />
                                </svg>
                            </div>
                            <div className="px-14 py-5 rounded-full shadow-xl" style={{ backgroundColor: pillBg }}>
                                <span className="font-black uppercase tracking-tighter" style={{ color: accent, fontFamily: data.fontFamily || undefined, fontSize: fs(26) }}>
                                    {data.fullName || 'CLAUDIA ALVES'}
                                </span>
                            </div>
                        </div>
                    </DraggableElement>
                </div>
            </div>
        );
    }
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-12 z-20">
             <DraggableElement elementKey="content">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-72 h-72 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none" style={{ stroke: ON_WHITE }} strokeWidth="2.5">
                            <path d="M 30,50 Q 50,20 70,50" />
                            <circle cx="50" cy="40" r="4" style={{ fill: ON_WHITE }} />
                            <circle cx="40" cy="55" r="4" style={{ fill: ON_WHITE }} />
                            <circle cx="60" cy="55" r="4" style={{ fill: ON_WHITE }} />
                            <path d="M 25,50 L 75,50 L 65,90 L 35,90 Z" />
                            <path d="M 35,90 L 35,50 M 45,90 L 45,50 M 55,90 L 55,50 M 65,90 L 65,50" />
                        </svg>
                    </div>
                    <div className="px-16 py-6 rounded-full shadow-2xl" style={{ backgroundColor: pillBg }}>
                        <span className="font-black uppercase tracking-tighter" style={{ color: accent, fontFamily: data.fontFamily || undefined, fontSize: fs(32) }}>
                            {data.fullName || 'CLAUDIA ALVES'}
                        </span>
                    </div>
                  </div>
             </DraggableElement>
             <DraggableElement elementKey="qr" className="flex flex-col items-center gap-4">
                <div className="bg-noble-surface p-3 rounded-2xl shadow-xl">
                    <SharedQRCode url={data.qrCodeUrl || ''} color={accent} size={250} className="w-28 h-28" />
                </div>
                <p className="font-bold tracking-[0.5em] uppercase animate-pulse" style={{ color: ON_WHITE, opacity: 0.4, fontSize: fs(12) }}>Scan to Order</p>
             </DraggableElement>
        </div>
    );
  };
