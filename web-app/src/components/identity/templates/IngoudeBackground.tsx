import React from 'react';

const NoiseOverlay = () => (
    <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
    />
);

export const IngoudeBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    const Slate = "#2D3E50";
    const Bronze = "#9B846F";
    const Tan = "#C0A58A";

    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* Main Dark Body */}
                    <div className="absolute inset-0 bg-[#2D3E50]" />

                    {/* Top Left Tan Shard */}
                    <div 
                        className="absolute top-0 left-0 w-[40%] h-[250px]"
                        style={{ 
                            backgroundColor: Tan,
                            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 80%)'
                        }}
                    />

                    {/* Left Bronze Trapezoid (Logo Anchor) */}
                    <div 
                        className="absolute inset-y-0 left-0 w-[30%]"
                        style={{ 
                            backgroundColor: Bronze,
                            clipPath: 'polygon(0 0, 80% 15%, 100% 85%, 0 100%)'
                        }}
                    />

                    {/* Top Right Notch */}
                    <div 
                        className="absolute top-0 right-0 w-[35%] h-[80px] bg-[#1a252f]"
                        style={{ 
                            clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)'
                        }}
                    />
                </>
            ) : (
                <>
                    {/* Main Slate Body for Back */}
                    <div className="absolute inset-0 bg-[#2D3E50]" />

                    {/* Top Tan Section */}
                    <div 
                        className="absolute top-0 left-0 w-full h-[35%]"
                        style={{ 
                            backgroundColor: Tan,
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)'
                        }}
                    />

                    {/* Bottom Tan Section */}
                    <div 
                        className="absolute bottom-0 left-0 w-full h-[35%]"
                        style={{ 
                            backgroundColor: Tan,
                            clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)'
                        }}
                    />

                    {/* Small Dark Notch at the bottom */}
                    <div 
                        className="absolute bottom-0 left-0 w-[30%] h-[60px] bg-[#1a252f]"
                        style={{ 
                            clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0 100%)'
                        }}
                    />
                </>
            )}

            <NoiseOverlay />
        </div>
    );
};
