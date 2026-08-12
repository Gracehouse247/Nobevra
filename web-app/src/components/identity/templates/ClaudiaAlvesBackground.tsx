import React from 'react';

interface ClaudiaAlvesBackgroundProps {
  accentColor: string;
  side?: 'front' | 'back';
}

export const ClaudiaAlvesBackground: React.FC<ClaudiaAlvesBackgroundProps> = ({ 
  accentColor, 
  side = 'front' 
}) => {
  return (
    <div className="absolute inset-0 bg-[#E69138] overflow-hidden pointer-events-none">
      {/* Subtle Flour/Bakery Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      
      {/* Subtle Corner Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-noble-surface/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-black/10 rounded-full blur-[100px]" />
    </div>
  );
};
