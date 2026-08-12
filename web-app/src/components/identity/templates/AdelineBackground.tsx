import React from 'react';

const NoiseOverlay = () => (
    <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
    />
);

export const AdelineBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    const Navy = "#0F172A";
    const Gold = "#EAB308";

    return (
        <div className="absolute inset-0 bg-[#0F172A] overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* Navy Left Side */}
                    <div className="absolute inset-y-0 left-0 w-[65%] bg-[#0F172A]" />

                    {/* Gold Curve Divider */}
                    <svg className="absolute top-0 right-0 h-full w-[45%] pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path 
                            d="M0,0 Q30,50 0,100" 
                            fill="none" 
                            stroke="#EAB308" 
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    {/* Mask for the Photo Area */}
                    <div 
                        className="absolute top-0 right-0 h-full w-[40%] bg-slate-100"
                        style={{ 
                            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%)' // Fallback
                        }}
                    />
                </>
            ) : (
                <>
                    {/* Minimal Navy Back */}
                    <div className="absolute inset-0 bg-[#0F172A]" />
                    
                    {/* Subtle Top Gradient Corner */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-noble-surface/5 blur-3xl rounded-full transform translate-x-32 -translate-y-32" />
                </>
            )}

            <NoiseOverlay />
        </div>
    );
};
