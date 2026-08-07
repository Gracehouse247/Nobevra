import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const ChastainKineticCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const accent = brandAccent;
    const primaryDark = brandDark;
    if (side === 'front') {
        return (
            <div className="relative w-full h-full flex flex-col justify-center items-start z-20">
                <DraggableElement elementKey="content" className="pl-24">
                    <div className="space-y-2">
                        {/* Chastain has a white background — name and title in black */}
                        <h1 className="font-black tracking-tighter leading-none" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(76) }}>
                            {data.fullName || 'JAMIE CHASTAIN'}
                        </h1>
                        <p className="font-light tracking-[0.3em] uppercase" style={{ color: ON_WHITE, opacity: 0.6, fontFamily: data.fontTitle || data.fontFamily || undefined, fontSize: fs(24) }}>
                            {data.jobTitle || 'Executive Director'}
                        </p>
                        <div className="h-2 w-24 mt-8" style={{ backgroundColor: primaryDark }} />
                    </div>
                    <div className="mt-16 space-y-8">
                        {[
                            { icon: Phone, value: data.phone || '+123-456-7890' },
                            { icon: Globe, value: data.website || 'www.reallygreatsite.com' },
                            { icon: MapPin, value: data.address || '123 Anywhere St., Any City' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryDark }}>
                                    <item.icon size={24} className="text-white" />
                                </div>
                                <span style={{ color: ON_WHITE, fontSize: fs(18) }} className="font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </DraggableElement>
                <div className="absolute right-24 top-1/2 -translate-y-1/2">
                    {renderAvatar(accent, 200)}
                </div>
            </div>
        );
    }
    return (
        /* Chastain back: white bg with dark arc corners — central text area is white → BLACK text */
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-12 z-20">
             <DraggableElement elementKey="logo">
                  <div className="flex flex-col items-center gap-8">
                    <div className="w-56 h-56 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M 20,80 L 50,20 L 65,50" fill="none" stroke={primaryDark} strokeWidth="12" strokeLinecap="round" />
                            <path d="M 40,80 L 55,50 L 80,80" fill="none" stroke={accent} strokeWidth="12" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="font-black uppercase tracking-tighter leading-none" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(36) }}>
                            {data.companyName || 'AROWWAI INDUSTRIES'}
                        </h2>
                        <p className="font-medium uppercase tracking-[0.4em]" style={{ color: ON_WHITE, opacity: 0.4, fontSize: fs(14) }}>
                            {data.website || 'www.reallygreatsite.com'}
                        </p>
                    </div>
                  </div>
             </DraggableElement>
             <DraggableElement elementKey="qr" className="flex flex-col items-center gap-4">
                <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100">
                    <SharedQRCode url={data.qrCodeUrl || ''} color={accent} size={250} className="w-24 h-24" />
                </div>
                <p className="font-bold tracking-[0.5em] uppercase" style={{ color: ON_WHITE, opacity: 0.4, fontSize: fs(10) }}>Scan Me</p>
             </DraggableElement>
        </div>
    );
  };
