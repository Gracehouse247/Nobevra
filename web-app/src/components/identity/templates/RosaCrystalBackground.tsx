import React from 'react';

const DottedWorldMap = () => (
    <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none" 
        style={{ 
            backgroundImage: `radial-gradient(#0055A4 0.5px, transparent 0.5px)`,
            backgroundSize: '10px 10px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }} 
    />
);

export const RosaCrystalBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    const SkyBlue = "#00B4DB";
    const RoyalBlue = "#0055A4";
    const Navy = "#0A0E27";

    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* The 3D Crystal Prism structure on the right */}
                    <div className="absolute top-0 right-0 h-full w-[400px] pointer-events-none">
                        {/* Deep Shadow Shard */}
                        <div 
                            className="absolute top-0 right-0 h-full w-full"
                            style={{ 
                                backgroundColor: Navy,
                                clipPath: 'polygon(40% 0, 100% 0, 80% 50%, 100% 100%, 40% 100%, 60% 50%)'
                            }}
                        />
                        {/* Structural Middle Shard */}
                        <div 
                            className="absolute top-0 right-0 h-full w-[80%]"
                            style={{ 
                                backgroundColor: RoyalBlue,
                                clipPath: 'polygon(20% 0, 100% 0, 85% 50%, 100% 100%, 20% 100%, 45% 50%)'
                            }}
                        />
                        {/* High-light Facet (3D Protrusion) */}
                        <div 
                            className="absolute top-0 right-0 h-full w-[60%]"
                            style={{ 
                                backgroundColor: SkyBlue,
                                clipPath: 'polygon(0 0, 100% 0, 70% 50%, 100% 100%, 0 100%, 30% 60%, 10% 50%, 30% 40%)'
                            }}
                        />
                        {/* Center Cut Reflection */}
                        <div 
                            className="absolute top-1/2 -translate-y-1/2 right-[100px] w-4 h-[120px] bg-noble-surface opacity-40 blur-sm rotate-[15deg]"
                        />
                    </div>
                </>
            ) : (
                <>
                    <DottedWorldMap />
                    <div className="absolute inset-0 bg-noble-surface opacity-40 mix-blend-overlay" />
                </>
            )}
        </div>
    );
};
