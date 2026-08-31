import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';
import { CardQRCode } from '../../CardQRCode';

export const AveryExecutiveCard: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {
  const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;
    const isFront = side === 'front';
    const accent = effectiveAccent;
    return (
        <div className="relative w-full h-full flex flex-col z-20">
            {isFront ? (
                <div className="w-full h-full flex flex-row items-stretch">
                    <div className="flex-[0.1]" style={{ backgroundColor: accent }} />
                    <div className="flex-[0.9] flex flex-col justify-between p-24">
                        <DraggableElement elementKey="content" className="space-y-2">
                            <div role="presentation" className="font-black tracking-tighter leading-none" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(52) }}>
                                {data.fullName || 'AVERY DAVIS'}
                            </div>
                            <p className="font-bold tracking-[0.3em] uppercase" style={{ color: accent, fontFamily: data.fontTitle || data.fontFamily || undefined, fontSize: fs(20) }}>
                                {data.jobTitle || 'Product Designer'}
                            </p>
                        </DraggableElement>
                        <div className="flex justify-between items-end">
                            <DraggableElement elementKey="content" className="space-y-6">
                                {[
                                    { label: 'T', value: data.phone || '+123-456-7890' },
                                    { label: 'E', value: data.email || 'hello@reallygreatsite.com' },
                                    { label: 'W', value: data.website || 'www.reallygreatsite.com' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6">
                                        <span className="font-black w-8" style={{ color: accent, fontSize: fs(14) }}>{item.label}</span>
                                        <span className="text-slate-500 font-medium" style={{ fontSize: fs(15) }}>{item.value}</span>
                                    </div>
                                ))}
                            </DraggableElement>
                            <div className="flex flex-col items-end gap-6">
                                {renderAvatar(accent, 120)}
                                <DraggableElement elementKey="logo" className="text-right">
                                    <h2 className="font-black uppercase tracking-tight" style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(32) }}>
                                        {data.companyName || 'AVERY'}
                                    </h2>
                                    <p className="text-slate-400 font-bold tracking-widest" style={{ fontSize: fs(10) }}>DESIGN STUDIO</p>
                                </DraggableElement>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-24 space-y-12">
                    <DraggableElement elementKey="logo">
                        <div className="flex items-center gap-8">
                            <div className="w-32 h-32 flex items-center justify-center" style={{ backgroundColor: accent }}>
                                <Box size={80} className="text-white" />
                            </div>
                            <h2 style={{ color: ON_WHITE, fontFamily: data.fontFamily || undefined, fontSize: fs(52) }} className="font-black uppercase tracking-tighter">
                                {data.companyName || 'AVERY'}
                            </h2>
                        </div>
                    </DraggableElement>
                    <CardQRCode url={data.qrCodeUrl} qrColor={accent} borderColor='transparent' size={250} dimensionClass="w-28 h-28" DraggableElement={DraggableElement} />
                </div>
            )}
        </div>
    );
};
