import React from 'react';

export const ModernGeometricBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <svg width="100%" height="100%" viewBox="0 0 1050 600" preserveAspectRatio="none">
      <path d="M700 0 L1050 0 L1050 600 L400 600 Z" fill={accentColor} fillOpacity="0.8" />
      <path d="M800 0 L1050 0 L1050 300 Z" fill="#ffffff" fillOpacity="0.2" />
      <path d="M400 600 L700 600 L400 400 Z" fill="#000000" fillOpacity="0.1" />
    </svg>
    <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center pointer-events-none">
       <div className="w-[800px] h-[800px] border-[1px] border-white/10 rounded-full" />
    </div>
  </div>
);

export const SharpAngleBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-0 right-0 w-1/3 h-full" style={{ backgroundColor: accentColor, clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
      <div className="absolute top-0 right-[33.33%] w-24 h-full bg-slate-900/10" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
    </div>
  </div>
);

export const SalfordRedBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full">
       <div className="absolute top-0 left-0 w-[60%] h-full bg-slate-50" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }} />
       <div className="absolute top-0 right-0 w-[45%] h-full" style={{ backgroundColor: accentColor, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
    </div>
  </div>
);

export const ArowwaiGreenBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full">
       <div className="absolute top-0 right-0 w-[70%] h-full opacity-5" style={{ backgroundColor: accentColor, clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }} />
       <div className="absolute top-0 right-0 w-[40%] h-full" style={{ backgroundColor: accentColor, clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)' }} />
       <div className="absolute bottom-12 right-12 w-32 h-32 border-[20px] border-white/20 rounded-full" />
    </div>
  </div>
);
