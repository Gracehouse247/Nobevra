import React from 'react';

const MarbleTexture = () => (
    <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply'
        }} 
    />
);

export const AndradeBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    const Slate = "#4A5D6B";
    const RoyalBlue = "#0055A4";

    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* Slate Main Body */}
                    <div className="absolute inset-0" style={{ backgroundColor: Slate }} />

                    {/* Sweeping Arc Frame */}
                    <svg className="absolute top-0 right-0 h-full w-[600px] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path 
                            d="M100,0 C60,0 20,40 20,100 L100,100 Z" 
                            fill={Slate} 
                        />
                        <circle cx="100" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" />
                        <circle cx="100" cy="50" r="48" fill="none" stroke="#8E9AAF" strokeWidth="2" opacity="0.3" />
                    </svg>

                    {/* The Inner Mask (Where Photo goes) */}
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 right-[-100px] w-[500px] h-[500px] z-20 bg-slate-200"
                        style={{ 
                            clipPath: 'circle(50% at 50% 50%)',
                            border: '10px solid white'
                        }}
                    />
                </>
            ) : (
                <>
                    {/* Marble Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }} />
                    
                    {/* Top Left Arc Segment (New Detail) */}
                    <div 
                        className="absolute -top-20 -left-20 w-64 h-64 bg-slate-100 rounded-full"
                    />

                    {/* Top Right Vertical Lines */}
                    <div className="absolute top-0 right-20 w-8 h-40 flex gap-2">
                        <div className="w-2 h-full bg-slate-200" />
                        <div className="w-2 h-full bg-slate-100" />
                    </div>

                    {/* Bottom Right Branding Hub */}
                    <div 
                        className="absolute bottom-[-30px] right-[-30px] w-[400px] h-[400px] flex items-center justify-center"
                        style={{ 
                            backgroundColor: RoyalBlue,
                            clipPath: 'circle(50% at 50% 50%)',
                            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div className="w-[85%] h-[85%] rounded-full border-[15px] border-white/20" />
                    </div>
                </>
            )}
        </div>
    );
};
