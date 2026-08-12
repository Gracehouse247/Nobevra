import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const WilsonDynamicCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
  const defaultColor = props.defaultColor || '#00B4DB';
    const isFront = side === 'front';
    const accent = data.brandColor || defaultColor;
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center z-20">
            {isFront ? (
                <div className="w-full h-full flex flex-row items-stretch">
                    <DraggableElement elementKey="content" className="flex-[0.5] flex flex-col justify-center p-20 pl-24 space-y-8">
                        <div className="space-y-2">
                            <h1 className="font-black leading-none uppercase" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(52) }}>
                                {data.fullName || 'MORGAN WILSON'}
                            </h1>
                            <p className="font-bold tracking-[0.2em] uppercase" style={{ color: accent, fontFamily: data.fontTitle || data.fontFamily || undefined, fontSize: fs(20) }}>
                                {data.jobTitle || 'Creative Lead'}
                            </p>
                        </div>
                        <div className="space-y-5">
                             {[
                                { icon: Phone, value: data.phone || '+123-456-7890' },
                                { icon: Globe, value: data.website || 'www.reallygreatsite.com' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center">
                                        <item.icon size={22} className="text-slate-400" />
                                    </div>
                                    <span className="font-medium text-slate-500" style={{ fontSize: fs(16) }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </DraggableElement>
                    <DraggableElement elementKey="logo" className="flex-[0.5] flex flex-col justify-center items-center p-12 relative overflow-hidden">
                        <div className="w-64 h-64 relative z-10 flex items-center justify-center">
                            {renderAvatar(accent, 240)}
                        </div>
                        <h2 className="font-black uppercase tracking-tight mt-6 relative z-10" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(32) }}>
                            {data.companyName || 'WILSON'}
                        </h2>
                    </DraggableElement>
                </div>
            ) : (
                <div className="text-center space-y-10">
                    <DraggableElement elementKey="logo">
                        <div className="w-48 h-48 mx-auto">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="45" fill="none" stroke={accent} strokeWidth="8" strokeDasharray="220 100" />
                                <circle cx="50" cy="20" r="20" fill={accent} />
                            </svg>
                        </div>
                    </DraggableElement>
                    <DraggableElement elementKey="qr" className="flex flex-col items-center gap-4">
                        <div className="bg-noble-surface p-4 rounded-3xl shadow-2xl border border-slate-50 inline-block">
                            <SharedQRCode url={data.qrCodeUrl || ''} color={accent} size={250} className="w-28 h-28" />
                        </div>
                    </DraggableElement>
                </div>
            )}
        </div>
    );
  };
