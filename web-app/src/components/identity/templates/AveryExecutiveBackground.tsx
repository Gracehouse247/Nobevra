import React from 'react';

interface AveryExecutiveBackgroundProps {
  accentColor: string;
  side?: 'front' | 'back';
}

export const AveryExecutiveBackground: React.FC<AveryExecutiveBackgroundProps> = ({ 
  accentColor,
  side = 'front' 
}) => {
  const Charcoal = '#2D2D2D';
  const Crimson = '#DC2626';

  return (
    <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: Charcoal }}>
      {side === 'front' ? (
        <>
          {/* Large White Sweep */}
          <div 
            className="absolute top-[-20%] right-[-15%] w-[80%] h-[140%] bg-noble-surface shadow-2xl"
            style={{ borderRadius: '50% 0 0 50%' }}
          />
          
          {/* Crimson Ribbon Border */}
          <div 
            className="absolute top-[-18%] right-[58%] w-[100px] h-[136%] border-r-[30px] border-crimson-600 opacity-100"
            style={{ 
                borderColor: Crimson,
                borderRadius: '50% 0 0 50%'
            }}
          />

          {/* Inner Accent Ring */}
          <div 
             className="absolute top-1/2 -translate-y-1/2 right-[18%] w-[420px] h-[420px] border-[2px] border-slate-100 rounded-full"
          />
        </>
      ) : (
        <>
            {/* Mirrored Large White Sweep */}
            <div 
                className="absolute top-[-20%] left-[-15%] w-[80%] h-[140%] bg-noble-surface shadow-2xl"
                style={{ borderRadius: '0 50% 50% 0' }}
            />
            
            {/* Mirrored Crimson Ribbon Border */}
            <div 
                className="absolute top-[-18%] left-[58%] w-[100px] h-[136%] border-l-[30px] border-crimson-600 opacity-100"
                style={{ 
                    borderColor: Crimson,
                    borderRadius: '0 50% 50% 0'
                }}
            />

            {/* Back Face Photo Portal (Architectural Bridge) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[5%] w-[420px] h-[420px] rounded-full overflow-hidden border-[15px] border-white shadow-2xl z-20">
                <img 
                    src="https://images.unsplash.com/photo-1545129139-1beb780cf337?q=80&w=1000&auto=format&fit=crop" 
                    alt="Architecture" 
                    className="w-full h-full object-cover grayscale brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none" />
        </>
      )}
    </div>
  );
};
