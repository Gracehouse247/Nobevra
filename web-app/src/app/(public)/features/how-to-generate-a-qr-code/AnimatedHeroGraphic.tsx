'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedHeroGraphic() {
  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] flex items-center justify-center lg:justify-end">
      {/* Background glow behind the video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-noble-blue/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Desktop Container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        className="relative z-10 w-full max-w-[750px] flex flex-col items-center mt-8 lg:mt-0"
      >
        {/* Monitor Frame */}
        <div className="relative w-full bg-slate-200 rounded-[24px] p-3 md:p-4 shadow-[0_30px_80px_rgba(10,37,64,0.2)] border border-slate-300 border-b-[8px] z-10">
          {/* Screen Inner Bezel */}
          {/* Removed pointer-events-none from here to allow the overlay to catch clicks */}
          <div className="relative w-full aspect-video bg-[#0B0F19] rounded-[12px] overflow-hidden shadow-inner flex items-center justify-center border-2 border-near-black/5">
            {/* Placeholder text for before the video is added */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 z-0 p-6 text-center">
              <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-bold text-sm text-center">Loading Animation...</p>
            </div>

            {/* YouTube Iframe Embed */}
            {/* Scaled to 135% to aggressively crop out YouTube's top title bar and bottom logo */}
            {/* Added fade-in animation to hide the initial load flash */}
            <motion.iframe
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute top-1/2 left-1/2 w-[135%] h-[135%] -translate-x-1/2 -translate-y-1/2 z-10"
              src="https://www.youtube.com/embed/Li5WGrxMgMw?autoplay=1&mute=1&loop=1&playlist=Li5WGrxMgMw&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1"
              title="Nobevra Animated Illustration"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></motion.iframe>

            {/* Invisible Overlay to block all clicks (prevents pausing and flashing play/pause signs) */}
            <div className="absolute inset-0 z-20 bg-transparent w-full h-full cursor-default"></div>
          </div>
        </div>

        {/* Monitor Stand Neck */}
        <div className="w-[15%] h-[30px] md:h-[50px] bg-gradient-to-b from-slate-300 to-slate-400 relative z-0 shadow-inner">
           <div className="absolute inset-x-0 top-0 h-4 bg-black/10"></div>
        </div>
        
        {/* Monitor Stand Base */}
        <div className="w-[35%] h-[12px] md:h-[16px] bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-xl shadow-[0_15px_30px_rgba(0,0,0,0.15)] relative z-10 border border-slate-300 border-b-0"></div>
      </motion.div>
    </div>
  );
}
