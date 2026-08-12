'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-8 left-1/2 z-[9998] -translate-x-1/2 rounded-2xl border border-white/60 bg-noble-surface/80 px-6 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-[#0599D5]" />
        <p className="text-sm font-semibold text-slate-700">{message}</p>
      </div>
    </motion.div>
  );
}
