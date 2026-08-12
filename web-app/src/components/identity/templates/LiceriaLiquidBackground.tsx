import React from 'react';

export const LiceriaLiquidBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    const Navy = "#0A0E27";
    const ElectricBlue = "#0061FF";
    const SkyBlue = "#00B4DB";

    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* Deep Navy Main Body */}
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${Navy}, #1D2D50)` }} />

                    {/* Liquid Waves */}
                    <svg className="absolute top-0 right-0 h-full w-[400px] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Layer 1 - Deep Blue */}
                        <path 
                            d="M30,0 C50,20 20,40 40,60 C60,80 30,100 30,100 L100,100 L100,0 Z" 
                            fill={Navy} 
                        />
                        {/* Layer 2 - Electric Blue */}
                        <path 
                            d="M20,0 C40,25 10,45 30,65 C50,85 20,100 20,100 L40,100 C40,100 60,80 40,60 C20,40 50,20 30,0 Z" 
                            fill={ElectricBlue} 
                            opacity="0.8"
                        />
                        {/* Layer 3 - Sky Blue Accent */}
                        <path 
                            d="M10,0 C30,30 0,50 20,70 C40,90 10,100 10,100 L20,100 C20,100 50,90 30,70 C10,50 40,30 20,0 Z" 
                            fill={SkyBlue} 
                            opacity="0.6"
                        />
                        {/* White Area Mask */}
                        <path 
                            d="M40,0 C60,20 30,40 50,60 C70,80 40,100 40,100 L100,100 L100,0 Z" 
                            fill="white" 
                        />
                    </svg>
                </>
            ) : (
                <>
                    {/* Top Navy Body */}
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${Navy}, #1D2D50)` }} />

                    {/* Liquid Horizontal Wave */}
                    <svg className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Layer 1 - Electric Blue */}
                        <path 
                            d="M0,40 C30,20 70,60 100,30 L100,100 L0,100 Z" 
                            fill={ElectricBlue} 
                            opacity="0.7"
                        />
                        {/* Layer 2 - Sky Blue */}
                        <path 
                            d="M0,50 C40,30 60,70 100,40 L100,100 L0,100 Z" 
                            fill={SkyBlue} 
                            opacity="0.5"
                        />
                        {/* Layer 3 - White Bottom */}
                        <path 
                            d="M0,60 C30,50 70,80 100,60 L100,100 L0,100 Z" 
                            fill="white" 
                        />
                    </svg>
                </>
            )}

            {/* Subtle Noise Texture */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
        </div>
    );
};
