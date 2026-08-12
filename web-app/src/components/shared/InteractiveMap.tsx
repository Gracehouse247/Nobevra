'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Sparkles } from 'lucide-react';

interface RegionData {
    name: string;
    count: number;
}

interface InteractiveMapProps {
    topRegions: RegionData[];
}

// Coordinate mapping for major regions
const HOTSPOT_COORDINATES: Record<string, { x: number; y: number; label: string }> = {
    'nigeria': { x: 500, y: 270, label: 'Lagos, Nigeria' },
    'ng': { x: 500, y: 270, label: 'Lagos, Nigeria' },
    'united kingdom': { x: 470, y: 140, label: 'London, UK' },
    'uk': { x: 470, y: 140, label: 'London, UK' },
    'gb': { x: 470, y: 140, label: 'London, UK' },
    'united states': { x: 250, y: 170, label: 'New York, US' },
    'us': { x: 250, y: 170, label: 'New York, US' },
    'germany': { x: 495, y: 145, label: 'Berlin, Germany' },
    'de': { x: 495, y: 145, label: 'Berlin, Germany' },
    'canada': { x: 220, y: 130, label: 'Toronto, Canada' },
    'ca': { x: 220, y: 130, label: 'Toronto, Canada' },
    'japan': { x: 790, y: 180, label: 'Tokyo, Japan' },
    'jp': { x: 790, y: 180, label: 'Tokyo, Japan' },
    'australia': { x: 810, y: 360, label: 'Sydney, Australia' },
    'au': { x: 810, y: 360, label: 'Sydney, Australia' }
};

// Simplified SVG Paths for Continents (fitted for 1000x500 viewBox)
const CONTINENTS = [
    {
        id: 'na',
        name: 'North America',
        path: 'M120,80 L200,60 L280,100 L320,120 L300,180 L250,220 L230,260 L200,280 L180,240 L160,200 L120,170 L100,120 Z',
        color: 'fill-noble-blue/10 hover:fill-noble-blue/20 stroke-noble-blue/30'
    },
    {
        id: 'sa',
        name: 'South America',
        path: 'M230,260 L260,280 L280,320 L290,360 L270,420 L250,460 L230,420 L210,360 L215,300 Z',
        color: 'fill-electric-cyan/10 hover:fill-electric-cyan/20 stroke-electric-cyan/30'
    },
    {
        id: 'eu',
        name: 'Europe',
        path: 'M440,110 L480,90 L520,100 L540,130 L520,160 L480,165 L445,150 Z',
        color: 'fill-purple-500/10 hover:fill-purple-500/20 stroke-purple-500/30'
    },
    {
        id: 'af',
        name: 'Africa',
        path: 'M450,175 L500,180 L540,210 L560,250 L545,310 L520,360 L490,340 L465,280 L445,220 Z',
        color: 'fill-amber-500/10 hover:fill-amber-500/20 stroke-amber-500/30'
    },
    {
        id: 'as',
        name: 'Asia',
        path: 'M520,100 L620,70 L740,80 L820,120 L840,200 L800,240 L720,260 L620,240 L540,180 Z',
        color: 'fill-rose-500/10 hover:fill-rose-500/20 stroke-rose-500/30'
    },
    {
        id: 'oc',
        name: 'Australia & Oceania',
        path: 'M760,320 L820,310 L860,340 L840,390 L790,400 L760,360 Z',
        color: 'fill-emerald-500/10 hover:fill-emerald-500/20 stroke-emerald-500/30'
    }
];

export default function InteractiveMap({ topRegions }: InteractiveMapProps) {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [hoveredHotspot, setHoveredHotspot] = useState<{ label: string; count: number; x: number; y: number } | null>(null);

    // Parse top regions and map to coordinate hotspots
    const hotspots = topRegions.map(region => {
        const nameLower = region.name.toLowerCase();
        let match = HOTSPOT_COORDINATES[nameLower];

        if (!match) {
            // Find substring match
            const key = Object.keys(HOTSPOT_COORDINATES).find(k => nameLower.includes(k));
            if (key) {
                match = HOTSPOT_COORDINATES[key];
            }
        }

        // Fallback coordinate generator using stable hash if no exact match found
        if (!match) {
            let hash = 0;
            for (let i = 0; i < region.name.length; i++) {
                hash = region.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const x = 300 + (Math.abs(hash) % 400); // place within central regions
            const y = 150 + (Math.abs(hash >> 2) % 200);
            return {
                x,
                y,
                label: region.name,
                count: region.count
            };
        }

        return {
            x: match.x,
            y: match.y,
            label: match.label || region.name,
            count: region.count
        };
    });

    // Compute maximum count for scaling glows
    const maxCount = topRegions.length > 0 ? Math.max(...topRegions.map(r => r.count)) : 1;

    return (
        <div className="relative w-full aspect-[2/1] bg-slate-950 rounded-[32px] border border-white/10 p-6 overflow-hidden shadow-2xl group/map">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950 pointer-events-none" />

            {/* Glowing Map Container */}
            <svg 
                viewBox="0 0 1000 500" 
                className="relative z-10 w-full h-full select-none"
            >
                {/* Render Continent Landmasses */}
                <g className="transition-all duration-500">
                    {CONTINENTS.map(cont => (
                        <path 
                            key={cont.id}
                            d={cont.path}
                            className={`${cont.color} transition-all duration-300 stroke-[1.5] cursor-pointer`}
                            onMouseEnter={() => setHoveredRegion(cont.name)}
                            onMouseLeave={() => setHoveredRegion(null)}
                        />
                    ))}
                </g>

                {/* Render Active Telemetry Hotspots */}
                <g>
                    {hotspots.map((spot, idx) => {
                        const relativeSize = 6 + (spot.count / maxCount) * 12;
                        const pulseScale = 1.8 + (spot.count / maxCount) * 1.2;

                        return (
                            <g 
                                key={idx} 
                                className="cursor-pointer"
                                onMouseEnter={(e) => {
                                    setHoveredHotspot({
                                        label: spot.label,
                                        count: spot.count,
                                        x: spot.x,
                                        y: spot.y
                                    });
                                }}
                                onMouseLeave={() => setHoveredHotspot(null)}
                            >
                                {/* Outer Glow Ring (Animated) */}
                                <motion.circle 
                                    cx={spot.x}
                                    cy={spot.y}
                                    r={relativeSize * pulseScale}
                                    className="fill-noble-blue/20 stroke-noble-blue/40 stroke-1 pointer-events-none"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.3, 0.8, 0.3]
                                    }}
                                    transition={{
                                        duration: 2 + (idx % 3) * 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Inner Solid Glow */}
                                <circle 
                                    cx={spot.x}
                                    cy={spot.y}
                                    r={relativeSize}
                                    className="fill-electric-cyan shadow-[0_0_20px_rgba(0,229,255,0.8)] filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] transition-all duration-300"
                                />

                                {/* Core Center Dot */}
                                <circle 
                                    cx={spot.x}
                                    cy={spot.y}
                                    r={relativeSize * 0.4}
                                    className="fill-white"
                                />
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* Custom Telemetry HUD Tooltip */}
            <AnimatePresence>
                {hoveredHotspot && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        style={{
                            position: 'absolute',
                            left: `${(hoveredHotspot.x / 1000) * 100}%`,
                            top: `${(hoveredHotspot.y / 500) * 100 - 18}%`,
                            transform: 'translate(-50%, -100%)'
                        }}
                        className="z-50 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-1 min-w-[140px]"
                    >
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <MapPin size={10} className="text-electric-cyan animate-bounce" />
                            Active Beacon
                        </span>
                        <span className="text-xs font-black text-white">{hoveredHotspot.label}</span>
                        <span className="text-sm font-black text-electric-cyan">
                            {hoveredHotspot.count} {hoveredHotspot.count === 1 ? 'Scan' : 'Scans'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* General Map HUD Info overlay */}
            <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 pointer-events-none">
                <Globe className="text-white/20 w-4 h-4 animate-spin-slow" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                    {hoveredRegion ? `Sensor: ${hoveredRegion}` : 'Global Nodes Grid active'}
                </span>
            </div>

            <div className="absolute top-4 right-6 z-20 flex items-center gap-2 pointer-events-none bg-noble-surface dark:bg-noble-card/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Sparkles size={12} className="text-electric-cyan" />
                <span className="text-[8px] font-black text-electric-cyan uppercase tracking-widest">
                    Telemetry Online
                </span>
            </div>
        </div>
    );
}
