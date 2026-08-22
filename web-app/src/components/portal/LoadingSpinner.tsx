'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F4F8]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#01A0E2]/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/[0.06] blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#01A0E2]/20 border-t-[#01A0E2]"
        />
        <p
          className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400"
          style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
        >
          Loading Invoice...
        </p>
      </motion.div>
    </div>
  );
}
