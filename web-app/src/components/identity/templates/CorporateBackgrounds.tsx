import React from 'react';

export const CorporateGoldBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <svg width="100%" height="100%" viewBox="0 0 1050 600" preserveAspectRatio="xMidYMid slice">
      <path d="M0 0 H1050 V200 L0 400 Z" fill={accentColor} fillOpacity="0.05" />
      <path d="M1050 600 H0 V400 L1050 200 Z" fill={accentColor} fillOpacity="0.03" />
      <circle cx="1050" cy="0" r="300" fill={accentColor} fillOpacity="0.1" />
      <circle cx="0" cy="600" r="200" fill={accentColor} fillOpacity="0.05" />
    </svg>
    <div className="absolute inset-0 backdrop-blur-[100px]" />
  </div>
);

export const ExecutiveNavyBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-[#050B1A] overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
  </div>
);
