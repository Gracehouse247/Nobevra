'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TopToolbar } from './TopToolbar';
import { SidebarLibrary } from './SidebarLibrary';
import { PropertiesPanel } from './PropertiesPanel';
import { CardCanvas } from '../canvas/CardCanvas';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { STUDIO_TEMPLATES } from '../../../lib/templates/studioTemplates';
import LiveLedgerTicker from '../../shared/LiveLedgerTicker';

export const NobleCardStudio: React.FC = () => {
  const { template, loadTemplate } = useCanvasStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Load the first template by default if none is loaded
    if (!template) {
      loadTemplate(STUDIO_TEMPLATES[0]);
    }
  }, [template, loadTemplate]);

  useEffect(() => {
    // Responsive observer to dynamically scale the Canvas
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width - 120); 
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // --- DYNAMIC FONT LOADER ---
  // Extract all unique fonts used in the current template
  const uniqueFonts = Array.from(
    new Set(
      template?.elements
        .filter(el => el.type === 'text' && el.fontFamily)
        .map(el => el.fontFamily)
    )
  );

  const fontImportUrl = uniqueFonts.length > 0
    ? `https://fonts.googleapis.com/css2?${uniqueFonts.map(f => `family=${encodeURIComponent(f || '')}:wght@300;400;500;700;900`).join('&')}&display=swap`
    : null;

  return (
    <div className="flex flex-col h-screen w-full bg-[#F0F4F8] overflow-hidden font-sans relative">
      {/* Ambient Background Mesh Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-noble-blue/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-electric-cyan/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {fontImportUrl && (
        <style dangerouslySetInnerHTML={{ __html: `@import url('${fontImportUrl}');` }} />
      )}
      
      <TopToolbar />
      <div className="flex flex-1 overflow-hidden relative z-10 pb-16">
        <SidebarLibrary />
        
        <div 
          className="flex-1 flex items-center justify-center relative overflow-hidden bg-noble-surface/20 backdrop-blur-md border-l border-r border-white/60"
          ref={containerRef}
          style={{ backgroundImage: 'radial-gradient(#166fbb15 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        >
          {containerWidth > 0 && template && (
             <CardCanvas containerWidth={containerWidth} />
          )}
        </div>

        <PropertiesPanel />
      </div>

      {/* Noble Intelligence Feed (Live Ledger Ticker) */}
      <LiveLedgerTicker />
    </div>
  );
};
