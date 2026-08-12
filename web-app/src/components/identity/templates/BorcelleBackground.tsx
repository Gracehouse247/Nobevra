import React from 'react';

export const BorcelleBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    const Crimson = "#A00000";
    const DarkRed = "#700000";

    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {side === 'front' ? (
                <>
                    {/* Right Shards */}
                    <div 
                        className="absolute top-0 right-0 h-full w-[450px]"
                        style={{ 
                            backgroundColor: DarkRed,
                            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'
                        }}
                    />
                    <div 
                        className="absolute top-0 right-0 h-full w-[400px]"
                        style={{ 
                            backgroundColor: Crimson,
                            clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 10% 100%)'
                        }}
                    />
                    {/* Subtle Overlay Shard */}
                    <div 
                        className="absolute top-0 right-0 h-full w-[200px] opacity-20"
                        style={{ 
                            backgroundColor: "black",
                            clipPath: 'polygon(80% 0, 100% 0, 100% 100%, 60% 100%)'
                        }}
                    />
                </>
            ) : (
                <>
                    {/* Left & Right Shards creating a central diamond */}
                    <div 
                        className="absolute top-0 left-0 h-full w-[350px]"
                        style={{ 
                            backgroundColor: Crimson,
                            clipPath: 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)'
                        }}
                    />
                    <div 
                        className="absolute top-0 right-0 h-full w-[350px]"
                        style={{ 
                            backgroundColor: Crimson,
                            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)'
                        }}
                    />
                    {/* Dark Red Accent Shards */}
                    <div 
                        className="absolute top-0 left-0 h-full w-[300px]"
                        style={{ 
                            backgroundColor: DarkRed,
                            clipPath: 'polygon(0 0, 70% 0, 90% 50%, 70% 100%, 0 100%)',
                            opacity: 0.8
                        }}
                    />
                    <div 
                        className="absolute top-0 right-0 h-full w-[300px]"
                        style={{ 
                            backgroundColor: DarkRed,
                            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 10% 50%)',
                            opacity: 0.8
                        }}
                    />
                </>
            )}

            {/* Subtle Gradient Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ background: 'linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.5) 45%, transparent 50%)', backgroundSize: '10px 10px' }} />
        </div>
    );
};
