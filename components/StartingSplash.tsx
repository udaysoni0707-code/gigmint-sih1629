'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const StartingSplash: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Automatically fade out after 2.8 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090B] text-white overflow-hidden select-none"
        >
          {/* Animated Background Glowing Mesh Aura */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.45, 0.25],
                rotate: [0, 90, 180],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, -90, -180],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
          </div>

          {/* Center Logo with Attractive Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
            
            {/* Emblem with Multi-ring Pulsing Aura */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-400 blur-md opacity-60"
              />

              {/* Logo container */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 bg-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center border-2 border-emerald-400/80">
                <motion.img
                  src="/techpunjab-logo.png"
                  alt="TechPunjab Government Emblem"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>

              {/* Verified badge icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-2 shadow-lg border-2 border-[#09090B]"
              >
                <ShieldCheck className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Typography Title Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Government of Punjab Official Portal</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                <span className="text-white">TECH </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  PUNJAB
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-medium tracking-wide">
                Skilled Tech Workers • Better Punjab • Stronger Future
              </p>
            </motion.div>

            {/* Glowing Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-48 sm:w-64 mt-8"
            >
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 2.1, ease: 'easeInOut' }}
                  className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2">
                <span>Loading Ecosystem...</span>
                <span className="text-emerald-400 font-bold">100%</span>
              </div>
            </motion.div>

            {/* Quick Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setShowSplash(false)}
              className="mt-6 text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors px-3 py-1 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60"
            >
              <span>Skip intro</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
