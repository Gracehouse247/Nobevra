import React from 'react';

interface RosaDynamicBackgroundProps {
  accentColor: string;
  side?: 'front' | 'back';
}

export const RosaDynamicBackground: React.FC<RosaDynamicBackgroundProps> = ({ 
  accentColor,
  side = 'front' 
}) => {
  const Cyan = '#00B4DB';
  const Navy = '#0A0E27';
  const Sky = '#3BB2F6';

  return (
    <div className="absolute inset-0 w-full h-full bg-noble-surface overflow-hidden">
      {side === 'front' ? (
        <>
          {/* Main Cyan Shape */}
          <div 
            className="absolute top-0 right-0 w-[45%] h-full"
            style={{ 
              backgroundColor: Cyan,
              clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 60%, 30% 50%)'
            }}
          />
          
          {/* Circular Cutout Effect (White Circle) */}
          <div 
            className="absolute top-[25%] right-[32%] w-64 h-64 bg-noble-surface rounded-full"
          />

          {/* Deep Navy Pill (Bottom) */}
          <div 
            className="absolute bottom-[-50px] right-[15%] w-40 h-[300px] rounded-t-full"
            style={{ backgroundColor: Navy }}
          />

          {/* Sky Blue Pill (Middle) */}
          <div 
            className="absolute top-[20%] right-[-50px] w-[250px] h-48 rounded-l-full opacity-80"
            style={{ backgroundColor: Sky }}
          />

          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </>
      ) : (
        <>
            {/* Dotted World Map Background */}
            <div className="absolute inset-0 opacity-[0.1] flex items-center justify-center p-20">
                <svg viewBox="0 0 1000 500" className="w-full h-full text-noble-text fill-current">
                    <circle cx="150" cy="150" r="2" /><circle cx="170" cy="140" r="2" /><circle cx="190" cy="160" r="2" />
                    <circle cx="450" cy="200" r="2" /><circle cx="470" cy="210" r="2" /><circle cx="490" cy="190" r="2" />
                    <circle cx="850" cy="120" r="2" /><circle cx="870" cy="130" r="2" /><circle cx="830" cy="110" r="2" />
                    <circle cx="200" cy="350" r="2" /><circle cx="220" cy="360" r="2" /><circle cx="180" cy="340" r="2" />
                    <circle cx="700" cy="380" r="2" /><circle cx="720" cy="370" r="2" /><circle cx="680" cy="390" r="2" />
                    {/* Simplified World Map Pattern */}
                    <path d="M150,100 Q250,50 350,100 T550,100 T750,150 T950,100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* Left Navy Pill Segment */}
            <div 
                className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-48 h-64 rounded-r-full"
                style={{ backgroundColor: Navy }}
            />

            {/* Right Navy Pill Segment */}
            <div 
                className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-48 h-64 rounded-l-full"
                style={{ backgroundColor: Navy }}
            />
        </>
      )}
    </div>
  );
};
