import React from 'react';

interface WilsonDynamicBackgroundProps {
  accentColor: string;
  side?: 'front' | 'back';
}

export const WilsonDynamicBackground: React.FC<WilsonDynamicBackgroundProps> = ({ 
  accentColor,
  side = 'front' 
}) => {
  const Charcoal = '#2D2D2D';

  return (
    <div className="absolute inset-0 w-full h-full bg-noble-surface overflow-hidden">
      {/* Textured Background Overlay */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-wall.png")' }} />
      
      {side === 'front' ? (
        <>
          {/* Massive Charcoal Ring (Right) */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 right-[-20%] w-[600px] h-[600px] border-[100px] border-[#2D2D2D] rounded-full z-0"
          />
          
          {/* Cyan/Navy Gradient Arc Accent */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 right-[12%] w-[460px] h-[460px] z-10"
          >
             <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-[135deg]">
                <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00B4DB" />
                        <stop offset="100%" stopColor="#0055A4" />
                    </linearGradient>
                </defs>
                <path 
                    d="M 10,50 A 40,40 0 0 1 50,10" 
                    fill="none" 
                    stroke="url(#arcGradient)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    className="opacity-100"
                />
             </svg>
          </div>
        </>
      ) : (
        <>
          {/* Massive Charcoal Ring (Left) - Mirrored */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 left-[-20%] w-[600px] h-[600px] border-[100px] border-[#2D2D2D] rounded-full z-0"
          />

          {/* Cyan/Navy Gradient Arc Accent - Mirrored */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 left-[12%] w-[460px] h-[460px] z-10"
          >
             <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-[45deg]">
                <path 
                    d="M 10,50 A 40,40 0 0 1 50,10" 
                    fill="none" 
                    stroke="url(#arcGradient)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                />
             </svg>
          </div>

          {/* Back Face Photo Portal (Architectural Building) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[10.5%] w-[420px] h-[420px] rounded-full overflow-hidden border-[15px] border-white shadow-2xl z-20">
                <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                    alt="Architecture" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0055A4]/20 to-transparent" />
          </div>
        </>
      )}
    </div>
  );
};
