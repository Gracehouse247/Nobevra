import React from 'react';

export const FloralBloomBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: `${accentColor}15` }} />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: `${accentColor}10` }} />
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
      <circle cx="10" cy="10" r="5" fill={accentColor} />
      <circle cx="90" cy="90" r="10" fill={accentColor} />
      <circle cx="50" cy="50" r="3" fill={accentColor} />
    </svg>
  </div>
);

export const NatureFlowBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ 
      backgroundImage: `radial-gradient(circle at 2px 2px, ${accentColor} 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }} />
    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-emerald-500/5 to-transparent blur-3xl" />
  </div>
);
