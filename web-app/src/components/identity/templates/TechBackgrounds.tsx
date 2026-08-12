import React from 'react';

export const CyberPulseBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-slate-950 overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{ 
      backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }} />
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent blur-[120px]" />
    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-transparent blur-[120px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
  </div>
);

export const DigitalPulseBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-noble-surface overflow-hidden">
    <svg width="100%" height="100%" viewBox="0 0 1050 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d="M0 0 L1050 0 L1050 200 Q525 400 0 200 Z" fill="url(#techGrad)" />
      <path d="M0 600 L1050 600 L1050 400 Q525 200 0 400 Z" fill="url(#techGrad)" />
      <circle cx="525" cy="300" r="100" fill={accentColor} fillOpacity="0.05" />
    </svg>
  </div>
);

export const NeuralFlowBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="absolute inset-0 bg-[#020617] overflow-hidden">
    <svg width="100%" height="100%" viewBox="0 0 1050 600" className="opacity-40">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d="M-100 300 C200 100 400 500 700 300 S1200 100 1200 300" fill="none" stroke={accentColor} strokeWidth="2" filter="url(#glow)" className="animate-pulse" />
      <path d="M-100 350 C200 150 400 550 700 350 S1200 150 1200 350" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
    </svg>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]" />
  </div>
);
