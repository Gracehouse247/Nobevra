import React from 'react';

export const PureMinimalBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }} />
    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
  </div>
);

export const SoftCharcoalBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-[#f8fafc] overflow-hidden">
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full -mr-32 -mb-32" />
    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accentColor }} />
  </div>
);
