import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { SharedQRCode } from '../../SharedQRCode';

export const RosaDynamicCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = brandAccent;
    const qc = accent.replace('#', '');
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center z-20 overflow-hidden">
            {isFront ? (
                <div className="w-full h-full p-20 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        {/* LEFT white section — name & title must be BLACK */}
                        <DraggableElement elementKey="content">
                            <div className="space-y-1">
                                <h1 className="font-black tracking-tighter uppercase leading-none" style={{ color: ON_WHITE, fontSize: fs(52) }}>
                                    {data.fullName || 'ROSA MARIA'}
                                </h1>
                                <p className="font-medium tracking-[0.3em] uppercase opacity-70" style={{ color: ON_WHITE, fontSize: fs(20) }}>
                                    {data.jobTitle || 'Digital Marketer'}
                                </p>
                            </div>
                        </DraggableElement>
                        {/* Top-right sits on the white area — cyan icon, no solid bg needed */}
                        <DraggableElement elementKey="logo">
                            <div className="flex items-center justify-center">
                                {renderAvatar(accent, 140)}
                            </div>
                        </DraggableElement>
                    </div>
                    <div className="flex justify-between items-end">
                        {/* LEFT white section — contact text must be BLACK */}
                        <DraggableElement elementKey="content">
                            <div className="space-y-4">
                                {[
                                    { icon: Phone, value: data.phone || '+123-456-7890' },
                                    { icon: Mail, value: data.email || 'hello@reallygreatsite.com' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <item.icon size={24} style={{ color: accent }} />
                                        <span className="font-medium tracking-wide" style={{ color: ON_WHITE, fontSize: fs(15) }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </DraggableElement>
                        {/* Bottom-right ghost company name — overlaps cyan shape → white ghost works */}
                        <h2 className="font-black text-white/30 uppercase tracking-widest" style={{ fontSize: fs(24) }}>
                            {data.companyName || 'STUDIO'}
                        </h2>
                    </div>
                </div>
            ) : (
                /* Back: full WHITE background — all text must be BLACK */
                <div className="text-center space-y-12">
                    <DraggableElement elementKey="logo">
                        <div className="space-y-6 flex flex-col items-center">
                            <Camera size={120} className="mx-auto opacity-60" style={{ color: accent }} />
                            <div className="space-y-2">
                                <h2 className="font-black uppercase tracking-tighter" style={{ color: ON_WHITE, fontSize: fs(42) }}>
                                    {data.companyName || 'ROSA MARIA'}
                                </h2>
                                <p className="font-bold tracking-[0.4em] uppercase" style={{ color: accent, fontSize: fs(12) }}>
                                    {data.jobTitle || 'Digital Marketer'}
                                </p>
                            </div>
                        </div>
                    </DraggableElement>
                    <DraggableElement elementKey="qr" className="flex flex-col items-center gap-4">
                        <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 inline-block">
                            <SharedQRCode url={data.qrCodeUrl || ''} color={qc} size={250} className="w-24 h-24" />
                        </div>
                        <p className="font-bold tracking-[0.5em] uppercase" style={{ color: ON_WHITE, opacity: 0.4, fontSize: fs(10) }}>Scan to Connect</p>
                    </DraggableElement>
                </div>
            )}
        </div>
    );
  };
