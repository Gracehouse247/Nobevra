import React from 'react';

export const SharedQRCode = ({ url, color = '000000', size = 200, className = 'w-20 h-20' }: { url: string, color?: string, size?: number, className?: string }) => {
    const encodedUrl = encodeURIComponent(url || 'https://nobleinvoice.ai');
    const cleanColor = color.replace('#', '');
    return (
        <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&color=${cleanColor}`} 
            alt="QR Code" 
            className={className}
        />
    );
};
