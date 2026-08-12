import React from 'react';

const NoiseOverlay = () => (
    <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
    />
);

interface EliteChevronBackgroundProps {
  accentColor?: string;
  side: 'front' | 'back';
}

export const EliteChevronBackground: React.FC<EliteChevronBackgroundProps> = ({ accentColor, side }) => {
    const getDarkColor = (color: string) => {
      if (!color) return '#052B55';
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2) || '0', 16);
      const g = parseInt(hex.substring(2, 4) || '0', 16);
      const b = parseInt(hex.substring(4, 6) || '0', 16);
      const rDark = Math.max(8, Math.round(r * 0.12));
      const gDark = Math.max(12, Math.round(g * 0.12));
      const bDark = Math.max(30, Math.round(b * 0.15));
      return `#${rDark.toString(16).padStart(2, '0')}${gDark.toString(16).padStart(2, '0')}${bDark.toString(16).padStart(2, '0')}`;
    };

    const Yellow = accentColor || '#FCB221';
    const Navy = accentColor ? getDarkColor(accentColor) : '#052B55';
    // Both sides share the same geometric pattern on the right
    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {/* Geometric Pattern Container */}
            <div className="absolute inset-0 z-0">
                {/* Orange/Yellow Chevron */}
                <div 
                    className="absolute top-0 right-0 w-[45%] h-full" 
                    style={{ 
                        backgroundColor: Yellow,
                        clipPath: 'polygon(40% 0, 100% 0, 100% 50%, 40% 50%, 0% 25%)' 
                    }} 
                />
                
                {/* Navy Chevron */}
                <div 
                    className="absolute top-1/2 right-0 w-[45%] h-1/2" 
                    style={{ 
                        backgroundColor: Navy,
                        clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 40% 100%, 0% 50%)' 
                    }} 
                />

                {/* Adjusted Geometry to match screenshot exactly */}
                {/* The screenshot shows a larger navy block at the bottom right and a smaller yellow one above it */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1050 600" preserveAspectRatio="none">
                    {/* Yellow/Orange Section */}
                    <path 
                        d="M650 0 L1050 0 L1050 250 L850 600 L650 600 L850 300 Z" 
                        fill={Yellow} 
                        className="hidden" // We'll use more precise paths below
                    />
                </svg>

                {/* Final Refined Paths based on screenshot analysis */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 1050 600" preserveAspectRatio="none">
                        {/* Upper Yellow Shape */}
                        <path 
                            d="M650 0 H1050 V250 L800 600 H1050 V600 L1050 600 Z" 
                            fill={Yellow} 
                            className="hidden"
                        />
                        {/* Actually, let's use separate divs for cleaner layering with clip-path */}
                        <div className="hidden">Divs are better for responsiveness</div>
                    </svg>

                    {/* Yellow Shape (Upper Right) */}
                    <div 
                        className="absolute top-0 right-0 w-[40%] h-full"
                        style={{ backgroundColor: Yellow, clipPath: 'polygon(35% 0, 100% 0, 100% 35%, 15% 100%, 0% 100%, 30% 50%)' }}
                    />

                    {/* Navy Shape (Lower Right) */}
                    <div 
                        className="absolute bottom-0 right-0 w-[40%] h-[75%]"
                        style={{ backgroundColor: Navy, clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    />
                </div>
            </div>

            <NoiseOverlay />
        </div>
    );
};
