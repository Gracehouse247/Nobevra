import React from 'react';

// Common Noise Overlay for that "Premium Paper" texture
const NoiseOverlay = () => (
    <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" 
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
    />
);

export const DiamondEdgeBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
    <div className="absolute inset-0 bg-[#0F172A] overflow-hidden">
        {/* Deep Slate base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />
        
        {/* Diamond Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="diamondPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diamondPattern)" />
        </svg>

        {/* Diamond Edge Accent */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-noble-surface/[0.03] backdrop-blur-md" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        
        {/* Primary Diamond Hub */}
        <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-96 h-96 bg-noble-surface/[0.02] border border-white/5 rotate-45 rounded-3xl" />
        
        {/* Brand Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ backgroundColor: accentColor }} />

        <NoiseOverlay />
    </div>
);

export const CinematicWaveBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
    <div className="absolute inset-0 bg-noble-surface overflow-hidden">
        {/* Soft Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-white to-slate-50" />
        
        {/* Procedural Waves */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.07]" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path fill={accentColor} d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,208C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            <path fill={accentColor} d="M0,320L48,304C96,288,192,256,288,256C384,256,480,288,576,293.3C672,299,768,277,864,261.3C960,245,1056,235,1152,245.3C1248,256,1344,288,1392,304L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fillOpacity="0.4" />
        </svg>

        {/* Floating Blurs */}
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full blur-[100px]" style={{ backgroundColor: `${accentColor}15` }} />
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full blur-[120px]" style={{ backgroundColor: `${accentColor}10` }} />

        {/* Sharp Precision Border */}
        <div className="absolute inset-8 border border-slate-100 rounded-2xl" />

        <NoiseOverlay />
    </div>
);

export const MillionDollarGoldBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
    <div className="absolute inset-0 bg-[#0A0A0B] overflow-hidden">
        {/* Background Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
        
        {/* Cinematic Lighting */}
        <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-yellow-600/5 rounded-full blur-[100px]" />

        {/* Gold Leaf Accents */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1050 600">
            <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#F3E5AB" />
                    <stop offset="100%" stopColor="#C5A028" />
                </linearGradient>
            </defs>
            <path d="M700 0 L1050 0 L1050 350 Z" fill="url(#goldGrad)" fillOpacity="0.8" />
            <path d="M0 450 L0 600 L150 600 Z" fill="url(#goldGrad)" fillOpacity="0.5" />
        </svg>

        <NoiseOverlay />
    </div>
);

export const EliteNavyBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
    <div className="absolute inset-0 bg-[#020617] overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 30%, #1E3A8A 0%, #020617 70%)` }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute right-0 top-0 w-[40%] h-full bg-slate-900/40 backdrop-blur-md border-l border-white/5" />
        <NoiseOverlay />
    </div>
);

export const ObsidianMarbleBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
    <div className="absolute inset-0 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-400 via-white to-slate-400 opacity-20" />
        <NoiseOverlay />
    </div>
);

export const ArchitectSlateBackground: React.FC<{ accentColor: string }> = ({ accentColor }) => (
    <div className="absolute inset-0 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-200/50" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        <NoiseOverlay />
    </div>
);
