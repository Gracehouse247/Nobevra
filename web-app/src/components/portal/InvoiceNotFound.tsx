'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export function InvoiceNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F4F8] p-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#01A0E2]/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/[0.06] blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10 flex max-w-md flex-col items-center gap-6 rounded-[40px] border border-white/60 bg-noble-surface/60 p-12 text-center shadow-[0_40px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
          <AlertCircle className="h-10 w-10 text-rose-400" />
        </div>
        <h1
          className="text-2xl font-black tracking-tighter text-slate-800"
          style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
        >
          Invoice Not Found
        </h1>
        <p className="text-sm leading-relaxed text-slate-500">
          This invoice link is invalid or has expired. Please check the URL or
          contact the sender for an updated link.
        </p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 rounded-2xl bg-[#01A0E2] px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_rgba(5,153,213,0.25)] transition-all"
        >
          Go to Nobevra
        </motion.a>
      </motion.div>
    </div>
  );
}
