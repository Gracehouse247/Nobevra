'use client';

import { motion } from 'framer-motion';

const CONFETTI_COLORS = [
  '#01A0E2',
  '#00F0FF',
  '#FFD700',
  '#FF6B6B',
  '#7C3AED',
  '#10B981',
  '#F59E0B',
  '#EC4899',
  '#3B82F6',
  '#14B8A6',
];

export function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = Math.random() * 100;
  const animDuration = 2.5 + Math.random() * 2;
  const animDelay = Math.random() * 1.5;
  const size = 6 + Math.random() * 8;
  const rotateEnd = Math.random() * 720 - 360;
  const driftX = Math.random() * 120 - 60;
  const shape = index % 3;

  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 50 : 900,
        x: driftX,
        opacity: [1, 1, 1, 0],
        rotate: rotateEnd,
        scale: [1, 1.2, 0.8, 0.5],
      }}
      transition={{
        duration: animDuration,
        delay: animDelay,
        ease: 'easeOut',
      }}
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: `${left}%`,
        top: -10,
        width: shape === 2 ? size * 1.8 : size,
        height: size,
        backgroundColor: color,
        borderRadius: shape === 1 ? '50%' : shape === 2 ? 2 : 3,
      }}
    />
  );
}

export function ConfettiExplosion() {
  const pieces = Array.from({ length: 80 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {pieces.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
}
