import React from 'react';
import { SharedQRCode } from './SharedQRCode';

interface CardQRCodeProps {
  url?: string;
  qrColor?: string;
  borderColor?: string;
  size?: number;
  dimensionClass?: string;
  caption?: string;
  DraggableElement: React.ComponentType<{
    elementKey: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }>;
}

export const CardQRCode: React.FC<CardQRCodeProps> = ({
  url,
  qrColor = '#000000',
  borderColor = 'transparent',
  size = 200,
  dimensionClass = 'w-20 h-20',
  caption,
  DraggableElement,
}) => {
  return (
    <DraggableElement
      elementKey="qr"
      className="bg-noble-surface p-3 rounded-2xl shadow-2xl border-4 flex flex-col items-center justify-center shrink-0"
      style={{ borderColor }}
    >
      <SharedQRCode url={url || ''} color={qrColor} size={size} className={dimensionClass} />
      {caption && (
        <span className="text-[10px] font-bold tracking-wider uppercase mt-1 text-slate-500">
          {caption}
        </span>
      )}
    </DraggableElement>
  );
};
