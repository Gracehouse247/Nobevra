import React from 'react';

const NoiseOverlay = () => (
    <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
    />
);

export const DynamicWaveBackground: React.FC<{ side: 'front' | 'back' }> = ({ side }) => {
    return (
        <div className="absolute inset-0 bg-noble-surface overflow-hidden">
            {/* White Top Area */}
            <div className="absolute top-0 left-0 w-full h-[65%] bg-noble-surface" />

            {/* Cinematic Wavy Gradient Footer */}
            <div className="absolute bottom-0 left-0 w-full h-[35%] overflow-hidden">
                <div 
                    className="absolute inset-0 animate-pulse-slow"
                    style={{
                        background: `linear-gradient(135deg, #FF4B6B 0%, #E31E24 30%, #FF7E5F 70%, #FF4B6B 100%)`,
                        filter: 'contrast(1.2) brightness(1.1)'
                    }}
                />
                
                {/* SVG Mesh for the Silk Wave Effect */}
                <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 100">
                    <path 
                        d="M0,50 C200,10 400,90 600,50 C800,10 1000,90 1000,50 L1000,100 L0,100 Z" 
                        fill="rgba(0,0,0,0.1)"
                        className="transform translate-y-2"
                    />
                    <path 
                        d="M0,40 C150,0 350,80 500,40 C650,0 850,80 1000,40 L1000,100 L0,100 Z" 
                        fill="rgba(255,255,255,0.05)"
                    />
                </svg>

                {/* Website overlay for back side is handled in the Engine */}
            </div>

            <NoiseOverlay />
        </div>
    );
};
