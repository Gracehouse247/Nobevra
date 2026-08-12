'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export function QuickTourOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if tour has been shown before
    const hasSeenTour = localStorage.getItem('hasSeenQuickTour');
    if (!hasSeenTour) {
      // Delay slightly so the dashboard has time to render
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissTour = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenQuickTour', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Dark Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            role="button"
            tabIndex={0}
            aria-label="Dismiss tour"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') dismissTour(); }}
            className="absolute inset-0 bg-slate-900 pointer-events-auto"
            onClick={dismissTour}
          />
          
          {/* Spotlight area (Simulated by positioning relative to viewport center or specific element) */}
          {/* For simplicity in this implementation, we will center a generic welcome tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md pointer-events-auto"
          >
            <div 
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="tour-heading"
              className="bg-noble-surface dark:bg-noble-card rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

              <button
                type="button"
                aria-label="Close welcome tour"
                onClick={dismissTour}
                className="absolute top-4 right-4 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-blue-100">
                  <Sparkles className="w-6 h-6" />
                </div>
                
                <h3 id="tour-heading" className="text-2xl font-black text-noble-text mb-3 tracking-tight">
                  Welcome to your new Dashboard!
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-8 leading-relaxed">
                  Everything you need to run your business is right here. Create invoices, manage clients, and track expenses effortlessly.
                </p>

                <button
                  onClick={dismissTour}
                  className="w-full flex items-center justify-center py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md group"
                >
                  Let's get started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
