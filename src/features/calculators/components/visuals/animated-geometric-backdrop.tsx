'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedGeometricBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Adaptive Blueprint Grid */}
      <div className="grid-pattern absolute inset-0 opacity-30 dark:opacity-25" />

      {/* Glowing Top-Left Geometric Orb & Rotating Hexagon */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: [0, 360],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -left-24 -top-24 h-96 w-96 rounded-[3rem] border border-hesaplamalarim-blue/20 bg-gradient-to-br from-hesaplamalarim-blue/10 via-transparent to-signal-green/5 blur-[1px]"
      />

      {/* Floating Right Isometric Diamond / Prism */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -28, 0],
                rotate: [45, 90, 45],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[6%] top-[18%] h-44 w-44 rotate-45 rounded-2xl border border-hesaplamalarim-blue/25 bg-hesaplamalarim-blue/5 backdrop-blur-[1px]"
      />

      {/* Bottom-Left Concentric Mathematical Rings */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: [360, 0],
                x: [0, 20, 0],
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[8%] left-[8%] flex h-64 w-64 items-center justify-center rounded-full border border-dashed border-gunmetal/70"
      >
        <div className="h-40 w-40 rotate-12 rounded-2xl border border-hesaplamalarim-blue/20" />
      </motion.div>

      {/* Floating Geometric Math & Finance Glyphs */}
      {[
        { glyph: '∑', top: '14%', left: '16%', delay: 0 },
        { glyph: '₺', top: '28%', left: '84%', delay: 2 },
        { glyph: '%', top: '68%', left: '12%', delay: 4 },
        { glyph: 'π', top: '74%', left: '82%', delay: 1.5 },
        { glyph: '∆', top: '46%', left: '6%', delay: 3 },
      ].map((item) => (
        <motion.span
          key={item.glyph}
          style={{ top: item.top, left: item.left }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -16, 0],
                  opacity: [0.1, 0.24, 0.1],
                }
          }
          transition={{
            duration: 7,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute select-none font-mono text-3xl font-extrabold italic text-hesaplamalarim-blue/25 sm:text-4xl"
        >
          {item.glyph}
        </motion.span>
      ))}
    </div>
  );
}
