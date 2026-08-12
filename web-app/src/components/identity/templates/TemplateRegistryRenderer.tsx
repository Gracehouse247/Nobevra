import React from 'react';
import * as Corporate from './CorporateBackgrounds';
import * as Tech from './TechBackgrounds';
import * as Geometric from './GeometricBackgrounds';
import * as Minimal from './MinimalBackgrounds';
import * as Creative from './CreativeBackgrounds';
import * as Premium from './PremiumExecutiveBackgrounds';

import { CARD_TEMPLATE_REGISTRY } from './templateRegistry';

export const renderTemplateBackground = (templateId: string, accentColor: string, side: 'front' | 'back' = 'front') => {
  const registryEntry = CARD_TEMPLATE_REGISTRY[templateId];
  if (registryEntry && registryEntry.BackgroundComponent) {
    const Background = registryEntry.BackgroundComponent;
    return <Background accentColor={accentColor} side={side} />;
  }
  
  if (templateId.startsWith('id-corp-')) {
    if (side === 'back') return <Premium.EliteNavyBackground accentColor={accentColor} />;
    if (templateId === 'id-corp-26' || templateId === 'id-obsidian') return <Premium.MillionDollarGoldBackground accentColor={accentColor} />;
    if (templateId === 'id-corp-27' || templateId === 'id-arctic') return <Premium.EliteNavyBackground accentColor={accentColor} />;
    if (templateId === 'id-corp-30' || templateId === 'id-vanguard') return <Premium.DiamondEdgeBackground accentColor={accentColor} />;
    if (templateId.includes('corp-42') || templateId.includes('corp-43')) return <Premium.CinematicWaveBackground accentColor={accentColor} />;
    return <Corporate.ExecutiveNavyBackground accentColor={accentColor} />;
  }
  
  if (templateId.startsWith('id-tech-')) {
    if (templateId === 'id-tech-11') return <Tech.CyberPulseBackground accentColor={accentColor} />;
    if (templateId === 'id-tech-15') return <Tech.NeuralFlowBackground accentColor={accentColor} />;
    return <Tech.DigitalPulseBackground accentColor={accentColor} />;
  }
  
  if (templateId.startsWith('id-geo-')) {
    if (templateId === 'id-geo-45' || templateId === 'id-geo-54') return <Geometric.SalfordRedBackground accentColor={accentColor} />;
    if (templateId === 'id-geo-50' || templateId === 'id-geo-63') return <Geometric.ArowwaiGreenBackground accentColor={accentColor} />;
    if (templateId.includes('Back')) return <Geometric.ModernGeometricBackground accentColor={accentColor} />;
    return <Geometric.SharpAngleBackground accentColor={accentColor} />;
  }
  
  if (templateId.startsWith('id-min-')) {
    if (templateId === 'id-min-01') return <Premium.ArchitectSlateBackground accentColor={accentColor} />;
    if (templateId === 'id-min-02') return <Premium.ObsidianMarbleBackground accentColor={accentColor} />;
    return <Minimal.SoftCharcoalBackground accentColor={accentColor} />;
  }
  
  if (templateId.startsWith('id-crea-')) {
    if (templateId === 'id-crea-36') return <Creative.FloralBloomBackground accentColor={accentColor} />;
    return <Creative.NatureFlowBackground accentColor={accentColor} />;
  }

  // Fallback for defaults
  return (
    <div className="absolute inset-0 bg-noble-surface overflow-hidden">
      <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};
