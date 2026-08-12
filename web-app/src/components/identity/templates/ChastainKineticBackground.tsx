import React from 'react';

interface ChastainKineticBackgroundProps {
  accentColor: string;
  side?: 'front' | 'back';
}

export const ChastainKineticBackground: React.FC<ChastainKineticBackgroundProps> = ({ 
  accentColor, 
  side = 'front' 
}) => {
  if (side === 'front') {
    return (
      <div className="absolute inset-0 bg-noble-surface overflow-hidden pointer-events-none">
        {/* Main Kinetic Arc System (Right Side) */}
        <div className="absolute top-[-20%] right-[-15%] w-[80%] h-[140%] z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d">
            {/* Primary Deep Navy Arc */}
            <path 
              d="M 100,0 C 60,10 40,40 40,100 L 100,100 Z" 
              fill="#0B2447" 
            />
            {/* Inner Electric Blue Highlight Arc */}
            <path 
              d="M 100,5 C 75,15 60,45 60,95 L 100,95 Z" 
              fill="url(#blueGradient)" 
              opacity="0.8"
            />
            {/* Thin Reflective Edge */}
            <path 
              d="M 100,2 C 78,12 62,42 62,98 L 100,98 Z" 
              fill="white" 
              opacity="0.1"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0055A4" />
                <stop offset="100%" stopColor="#0B2447" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-noble-surface overflow-hidden pointer-events-none">
      {/* Top-Left Tiered Arcs */}
      <div className="absolute top-[-15%] left-[-15%] w-[450px] h-[450px] rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
           <path d="M 0,0 C 40,0 100,60 100,100 L 0,100 Z" fill="#0B2447" />
           <path d="M 10,10 C 45,10 90,55 90,90 L 10,90 Z" fill="url(#blueGradientBack)" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom-Right Tiered Arcs */}
      <div className="absolute bottom-[-15%] right-[-15%] w-[450px] h-[450px]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
           <path d="M 0,0 C 40,0 100,60 100,100 L 0,100 Z" fill="#0B2447" />
           <path d="M 10,10 C 45,10 90,55 90,90 L 10,90 Z" fill="url(#blueGradientBack)" opacity="0.6" />
        </svg>
      </div>

      <defs>
        <linearGradient id="blueGradientBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0055A4" />
          <stop offset="100%" stopColor="#0B2447" />
        </linearGradient>
      </defs>
      
      {/* Center Branding Shadow Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] z-0" />
    </div>
  );
};
