'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Palette, Link as LinkIcon } from 'lucide-react';

interface QrPreviewCardProps {
    value: string;
    fgColor: string;
    bgColor: string;
    includeLogo: boolean;
    qrType: string;
}

export default function QrPreviewCard({ value, fgColor, bgColor, includeLogo, qrType }: QrPreviewCardProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    const handleDownload = () => {
        if (!svgRef.current) return;
        const svgData = new XMLSerializer().serializeToString(svgRef.current);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `noble-qr-${qrType}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Standardize URL formatting based on type to ensure the preview updates correctly
    const finalValue = value || 'https://nobleinvoice.com';

    return (
        <div className="sticky top-8 space-y-6">
            <h3 className="text-xs font-black text-[#64748B] uppercase tracking-widest mb-4">Live Preview</h3>
            
            <div className="bg-noble-surface rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden transition-all flex flex-col items-center pt-12 pb-8 px-6 text-center">
                
                <div className="relative p-4 rounded-3xl bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] mb-8">
                    <QRCodeSVG
                        ref={svgRef}
                        value={finalValue}
                        size={220}
                        fgColor={fgColor}
                        bgColor={bgColor}
                        level="Q"
                        includeMargin={false}
                        imageSettings={includeLogo ? {
                            src: "/images/icon.png", // Use default app icon if enabled
                            x: undefined,
                            y: undefined,
                            height: 48,
                            width: 48,
                            excavate: true,
                        } : undefined}
                    />
                </div>

                <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-wide">{qrType} QR</h3>
                <p className="text-sm text-[#64748B] mt-2 max-w-xs mx-auto flex items-center justify-center gap-1.5 line-clamp-1">
                    <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{finalValue}</span>
                </p>

                <div className="w-full h-px bg-[#E2E8F0] my-6" />

                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                        <Palette className="w-3.5 h-3.5 text-[#64748B]" />
                        <span className="text-xs font-bold text-[#0F172A]">{fgColor}</span>
                    </div>
                    
                    <button 
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#0F172A] text-white font-bold text-xs rounded-xl hover:bg-[#1E293B] transition-all shadow-md"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}
