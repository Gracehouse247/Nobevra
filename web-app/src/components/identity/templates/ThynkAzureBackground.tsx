import React from 'react';

interface ThynkAzureBackgroundProps {
  accentColor: string;
  side?: 'front' | 'back';
}

export const ThynkAzureBackground: React.FC<ThynkAzureBackgroundProps> = ({ 
  accentColor,
  side = 'front' 
}) => {
  const RoyalBlue = '#0055A4';
  const Azure = '#0077C8';
  const Cyan = '#00B4DB';

  return (
    <div className="absolute inset-0 w-full h-full bg-noble-surface overflow-hidden">
      {/* Background Layered Shards (Bottom Left Cluster) */}
      
      {/* Deep Blue Shard 1 */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[35%] z-10"
        style={{ 
            backgroundColor: RoyalBlue,
            clipPath: 'polygon(0 40%, 100% 100%, 0 100%)'
        }}
      />

      {/* Azure Shard 2 (Transparent Layer) */}
      <div 
        className="absolute bottom-[5%] left-[-10%] w-[50%] h-[25%] z-20 opacity-60"
        style={{ 
            backgroundColor: Azure,
            clipPath: 'polygon(0 20%, 80% 100%, 0 100%)'
        }}
      />

      {/* Cyan Accent Shard 3 */}
      <div 
        className="absolute bottom-[8%] left-[12%] w-[180px] h-[80px] z-30"
        style={{ 
            backgroundColor: Cyan,
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)'
        }}
      />

      {/* Long Thin Accent Line 1 (Floating Top Left) */}
      <div 
        className="absolute top-[15%] left-[5%] w-[120px] h-[2px] rotate-[25deg] z-0 opacity-40"
        style={{ backgroundColor: RoyalBlue }}
      />

      {/* Long Thin Accent Line 2 (Floating Top Right) */}
      <div 
        className="absolute top-[10%] right-[10%] w-[100px] h-[2px] rotate-[-20deg] z-0 opacity-30"
        style={{ backgroundColor: Azure }}
      />

      {/* Long Thin Accent Line 3 (Existing Bottom) */}
      <div 
        className="absolute bottom-[35%] left-[-5%] w-[150px] h-[4px] rotate-[25deg] z-0 opacity-40"
        style={{ backgroundColor: RoyalBlue }}
      />

      {/* Long Thin Accent Line 4 (Existing Bottom) */}
      <div 
        className="absolute bottom-[15%] left-[40%] w-[200px] h-[3px] rotate-[30deg] z-0 opacity-30"
        style={{ backgroundColor: Azure }}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
    </div>
  );
};
