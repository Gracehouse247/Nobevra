'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Maximize2, 
    Minimize2, 
    ExternalLink, 
    Share2, 
    Check, 
    Sparkles, 
    ArrowRight,
    Copy,
    MonitorPlay
} from 'lucide-react';
import toast from 'react-hot-toast';
import { brand } from '@/lib/brand';

const CANVA_EMBED_URL = "https://www.canva.com/design/DAHTzRkh6tA/4mJTZvccD5zc232h37O49g/view?embed";
const CANVA_DIRECT_URL = "https://www.canva.com/design/DAHTzRkh6tA/4mJTZvccD5zc232h37O49g/view?utm_content=DAHTzRkh6tA&utm_campaign=designshare&utm_medium=embeds&utm_source=link";

export default function PitchDeckPage() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        try {
            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error("Fullscreen toggle error:", err);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleShare = async () => {
        const shareUrl = typeof window !== 'undefined' ? window.location.href : brand.urls.production + '/pitch';
        
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                toast.success("Deck link copied to clipboard!");
                setTimeout(() => setCopied(false), 2500);
                return;
            } catch {
                // fallback
            }
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "NOBEVRA: The Intelligent OPS Platform — Pitch Deck",
                    text: "Check out the official live pitch deck for Nobevra.",
                    url: shareUrl,
                });
            } catch {
                // share canceled or failed
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-inter selection:bg-noble-blue/30 selection:text-white">
            
            {/* ══ TOP EXECUTIVE BAR ══ */}
            <header className="sticky top-0 z-50 bg-[#0E1424]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
                <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
                    
                    {/* Left: Brand & Live Status */}
                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                        <Link href="/" className="flex items-center gap-2 shrink-0 group focus:outline-none focus:ring-2 focus:ring-noble-blue rounded-lg p-1">
                            <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-noble-blue/10 border border-noble-blue/30 rounded-xl flex items-center justify-center p-1.5 shadow-sm group-hover:border-noble-blue transition-all">
                                <Image
                                    src="/images/brand identies/icon.png"
                                    alt="Nobevra"
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="font-black text-lg sm:text-xl tracking-tight text-white hidden xs:inline-block">
                                {brand.name}
                            </span>
                        </Link>

                        <div className="h-5 w-px bg-slate-800 hidden sm:block" />

                        {/* Title & Live Badge */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="font-extrabold text-sm sm:text-base text-white truncate">
                                    The Intelligent OPS Platform
                                </h1>
                                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Live Deck
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                                Presented by <strong className="text-slate-200 font-semibold">Nobevra Team</strong>
                            </p>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Fullscreen Button */}
                        <button
                            onClick={toggleFullscreen}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700/60 transition-all hover:border-slate-600 active:scale-95 cursor-pointer"
                            title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
                        >
                            {isFullscreen ? (
                                <>
                                    <Minimize2 className="w-4 h-4 text-noble-blue" />
                                    <span className="hidden md:inline">Exit Fullscreen</span>
                                </>
                            ) : (
                                <>
                                    <Maximize2 className="w-4 h-4 text-noble-blue" />
                                    <span className="hidden md:inline">Fullscreen</span>
                                </>
                            )}
                        </button>

                        {/* Share / Copy Link */}
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700/60 transition-all hover:border-slate-600 active:scale-95 cursor-pointer"
                            title="Copy Live Deck Link"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                    <span className="hidden md:inline text-emerald-400">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-4 h-4 text-slate-300" />
                                    <span className="hidden md:inline">Share</span>
                                </>
                            )}
                        </button>

                        {/* Direct Canva Link */}
                        <a
                            href={CANVA_DIRECT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-all hover:text-white"
                            title="Open direct presentation in Canva"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Canva</span>
                        </a>

                        {/* Try Platform Button */}
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl bg-[#166FBB] hover:bg-[#125896] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 hover:shadow-blue-500/30"
                        >
                            <span className="hidden sm:inline">Explore Nobevra</span>
                            <span className="sm:hidden">App</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* ══ PRESENTATION CANVAS VIEWPORT ══ */}
            <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 w-full max-w-[1700px] mx-auto">
                <div 
                    ref={containerRef}
                    className={`w-full bg-[#050811] rounded-2xl md:rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden relative flex flex-col transition-all ${
                        isFullscreen ? 'h-screen rounded-none border-none p-0' : 'max-h-[calc(100vh-140px)]'
                    }`}
                >
                    {/* Top sub-bar on container */}
                    <div className="bg-[#0b101d] px-4 py-2.5 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="font-mono text-[11px] text-slate-400 ml-2 hidden sm:inline">
                                nobevra.noblesworld.com.ng/pitch
                            </span>
                        </div>

                        <div className="flex items-center gap-3 font-medium">
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-300">
                                <MonitorPlay className="w-3.5 h-3.5 text-noble-blue" />
                                Interactive Slides & Animations Enabled
                            </span>
                        </div>
                    </div>

                    {/* 16:9 Presentation Frame */}
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050811] z-10 gap-3">
                                <div className="w-10 h-10 border-4 border-noble-blue/20 border-t-noble-blue rounded-full animate-spin" />
                                <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                                    Loading Live Pitch Deck...
                                </p>
                            </div>
                        )}

                        <iframe
                            loading="lazy"
                            src={CANVA_EMBED_URL}
                            allowFullScreen
                            allow="fullscreen"
                            onLoad={() => setIsLoading(false)}
                            className="absolute inset-0 w-full h-full border-none m-0 p-0"
                            title="NOBEVRA: The Intelligent OPS Platform Pitch Deck"
                        />
                    </div>
                </div>

                {/* ══ PRESENTATION FOOTER INFO BAR ══ */}
                <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between gap-3 px-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center">
                        <span>
                            <strong className="text-slate-200">Nobevra Pitch</strong>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>
                            Authored by <strong className="text-slate-200">Nobevra Team</strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-center">
                        <span className="text-[11px] text-slate-400">
                            💡 Use arrows on screen or keyboard to flip slides
                        </span>
                    </div>
                </div>
            </main>

            {/* ══ EXECUTIVE HIGHLIGHTS DRAWER (Value Proposition) ══ */}
            <footer className="mt-auto border-t border-slate-800/60 bg-[#0A0E1A] py-6 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-[#0F1526] p-5 rounded-2xl border border-slate-800/80 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-noble-blue font-bold text-xs uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Value Proposition</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            The all-in-one AI-driven Operating System transforming invoicing, automated collections, cash flow intelligence, and lightweight CRM for African & global businesses.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
