import React from 'react';

interface PremiumBadgeProps {
    tier: 'pro' | 'pulse' | 'elite';
    className?: string;
    iconOnly?: boolean;
}

const GemIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" /> {/* violet-300 */}
                <stop offset="30%" stopColor="#8B5CF6" /> {/* violet-500 */}
                <stop offset="70%" stopColor="#6D28D9" /> {/* violet-700 */}
                <stop offset="100%" stopColor="#4C1D95" /> {/* violet-900 */}
            </linearGradient>
            <radialGradient id="gemShine" cx="35%" cy="35%" r="40%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <filter id="gemGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <g filter="url(#gemGlow)">
            {/* Main base */}
            <path d="M6 4 L18 4 L22 10 L12 21 L2 10 Z" fill="url(#gemGrad)" />
            {/* Top facet */}
            <path d="M7 5 L17 5 L12 9 Z" fill="#FFFFFF" fillOpacity="0.25" />
            {/* Left facet */}
            <path d="M2.5 10 L6.5 5 L12 9 L12 20 Z" fill="#000000" fillOpacity="0.1" />
            {/* Right facet */}
            <path d="M21.5 10 L17.5 5 L12 9 L12 20 Z" fill="#000000" fillOpacity="0.3" />
            {/* Shine overlay */}
            <path d="M6 4 L18 4 L22 10 L12 21 L2 10 Z" fill="url(#gemShine)" />
        </g>
    </svg>
);

const CrownIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="30%" stopColor="#8B5CF6" />
                <stop offset="70%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
            <radialGradient id="crownShine" cx="35%" cy="40%" r="40%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <filter id="crownGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <g filter="url(#crownGlow)">
            {/* Main base */}
            <path d="M2 20 L4 8 L9 13 L12 4 L15 13 L20 8 L22 20 Z" fill="url(#crownGrad)" />
            {/* Left facet */}
            <path d="M2.5 19.5 L4.5 9 L9 13.5 L12 20 Z" fill="#FFFFFF" fillOpacity="0.1" />
            {/* Right facet */}
            <path d="M21.5 19.5 L19.5 9 L15 13.5 L12 20 Z" fill="#000000" fillOpacity="0.2" />
            {/* Shine overlay */}
            <path d="M2 20 L4 8 L9 13 L12 4 L15 13 L20 8 L22 20 Z" fill="url(#crownShine)" />
            
            {/* Jewels on tips */}
            <circle cx="4" cy="7" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="12" cy="3" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
            <circle cx="20" cy="7" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
        </g>
    </svg>
);

export default function PremiumBadge({ tier, className = '', iconOnly = false }: PremiumBadgeProps) {
    const isElite = tier === 'elite';
    const Icon = isElite ? CrownIcon : GemIcon;
    const label = isElite ? 'Elite' : tier === 'pulse' ? 'Pulse' : 'Pro';

    if (iconOnly) {
        return <Icon className={className || "w-4 h-4"} />;
    }

    return (
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide leading-none bg-indigo-500/10 text-indigo-300 border border-indigo-400/30 shadow-[0_0_10px_rgba(139,92,246,0.1)] ${className}`}>
            <Icon className="w-3.5 h-3.5 -ml-0.5 drop-shadow-md" />
            {label}
        </span>
    );
}
