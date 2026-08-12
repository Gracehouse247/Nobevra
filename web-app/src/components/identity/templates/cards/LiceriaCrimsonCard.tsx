import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const LiceriaCrimsonCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const qc = accent.replace('#', '');
    return (
        <div className="relative w-full h-full flex flex-col z-20">
            {isFront ? (
                <>
                    <DraggableElement elementKey="content" className="flex-[0.6] flex flex-col justify-end p-20 pl-24 pb-12">
                        <h1 className="font-black text-white tracking-tighter leading-none" style={{ fontSize: fs(56) }}>
                            {data.fullName || 'MARIAH LICERIA'}
                        </h1>
                        <p style={{ color: ON_COLOR, fontSize: fs(20) }} className="font-medium tracking-[0.4em] uppercase mt-2 opacity-50">
                            {data.jobTitle || 'Executive Chef'}
                        </p>
                    </DraggableElement>
                    <DraggableElement elementKey="logo" className="flex-[0.4] bg-noble-surface flex flex-col justify-center px-24 gap-6">
                        <div className="flex justify-between items-center w-full">
                            <div className="space-y-2">
                                <h2 className="font-black uppercase tracking-tight" style={{ color: accent, fontSize: fs(28) }}>
                                    {data.companyName || 'LICERIA'}
                                </h2>
                                <p className="text-slate-400 font-bold tracking-widest" style={{ fontSize: fs(10) }}>FINE DINING & CATERING</p>
                            </div>
                            {renderAvatar(accent, 110)}
                        </div>
                        <div className="flex gap-12">
                            <div className="flex items-center gap-4 animate-pulse" style={{ color: accent }}>
                                <Phone size={24} />
                                <span className="font-bold" style={{ fontSize: fs(15) }}>{data.phone || '+123-456-7890'}</span>
                            </div>
                            <div className="flex items-center gap-4 animate-pulse" style={{ color: accent }}>
                                <Globe size={24} />
                                <span className="font-bold" style={{ fontSize: fs(15) }}>{data.website || 'liceria.com'}</span>
                            </div>
                        </div>
                    </DraggableElement>
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-24 text-center space-y-12">
                    <DraggableElement elementKey="logo">
                        <div className="space-y-4">
                            <Leaf size={120} className="text-white mx-auto" />
                            <h2 className="font-black text-white uppercase tracking-tighter" style={{ fontSize: fs(56) }}>
                                {data.companyName || 'LICERIA'}
                            </h2>
                        </div>
                    </DraggableElement>
                    <DraggableElement elementKey="qr">
                        <div className="bg-noble-surface p-2 rounded-xl shadow-2xl inline-block">
                            <SharedQRCode url={data.qrCodeUrl || ''} color={qc} size={250} className="w-28 h-28" />
                        </div>
                    </DraggableElement>
                </div>
            )}
        </div>
    );
  };
