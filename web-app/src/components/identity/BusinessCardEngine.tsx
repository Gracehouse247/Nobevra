import React from 'react';
import { TemplateDefinition } from '@/lib/templates/templateRegistry';
import { IdentityData } from '@/types';
import { Mail, Phone, Globe, MapPin, Briefcase, Camera, User, AtSign, Box, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { CARD_TEMPLATE_REGISTRY } from './templates/templateRegistry';

import { renderTemplateBackground } from './templates/TemplateRegistryRenderer';

// Returns #ffffff for dark/colored backgrounds, #000000 for white/light backgrounds
const getContrastColor = (hexcolor: string): '#ffffff' | '#000000' => {
    if (!hexcolor) return '#000000';
    const hex = hexcolor.replace('#', '');
    const fullHex = hex.length === 3
        ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        : hex;
    const r = parseInt(fullHex.substr(0, 2), 16);
    const g = parseInt(fullHex.substr(2, 2), 16);
    const b = parseInt(fullHex.substr(4, 2), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
};

const getBrandShades = (hexColor: string) => {
    const defaultAccent = '#166FBB';
    const color = hexColor || defaultAccent;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2) || '0', 16);
    const g = parseInt(hex.substring(2, 4) || '0', 16);
    const b = parseInt(hex.substring(4, 6) || '0', 16);
    
    const accent = color;
    
    // Dark: very deep, prestige shade (navy-like depth)
    const rDark = Math.max(8, Math.round(r * 0.12));
    const gDark = Math.max(12, Math.round(g * 0.13));
    const bDark = Math.max(30, Math.round(b * 0.18));
    const dark = `#${rDark.toString(16).padStart(2, '0')}${gDark.toString(16).padStart(2, '0')}${bDark.toString(16).padStart(2, '0')}`;
    
    // Light: airy, pastel tint
    const rLight = Math.min(255, Math.round(r + (255 - r) * 0.85));
    const gLight = Math.min(255, Math.round(g + (255 - g) * 0.85));
    const bLight = Math.min(255, Math.round(b + (255 - b) * 0.85));
    const light = `#${rLight.toString(16).padStart(2, '0')}${gLight.toString(16).padStart(2, '0')}${bLight.toString(16).padStart(2, '0')}`;

    // Mid: balanced highlight
    const rMid = Math.min(255, Math.round(r + (255 - r) * 0.4));
    const gMid = Math.min(255, Math.round(g + (255 - g) * 0.4));
    const bMid = Math.min(255, Math.round(b + (255 - b) * 0.4));
    const mid = `#${rMid.toString(16).padStart(2, '0')}${gMid.toString(16).padStart(2, '0')}${bMid.toString(16).padStart(2, '0')}`;
    
    return { accent, dark, light, mid };
};

interface BusinessCardEngineProps {
  template: TemplateDefinition;
  data: IdentityData;
  scale?: number;
  isDraggable?: boolean;
  onLayoutChange?: (newLayout: NonNullable<IdentityData['layout']>) => void;
  side?: 'front' | 'back';
}

export const BusinessCardEngine: React.FC<BusinessCardEngineProps> = ({ 
  template, 
  data, 
  scale = 1,
  isDraggable = false,
  onLayoutChange,
  side = 'front'
}) => {
  const { orientation = 'horizontal', id } = template;
  const effectiveAccent = data.brandColor || template.accentColor || '#166FBB';
  const { accent: brandAccent, dark: brandDark, light: brandLight, mid: brandMid } = getBrandShades(effectiveAccent);

  // --- CONTRAST-SAFE FONT COLOR ENGINE ---
  const userFontColor = data.fontColor || null;

  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    const fullHex = clean.length === 3
        ? clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]
        : clean;
    const r = parseInt(fullHex.substr(0, 2), 16) || 0;
    const g = parseInt(fullHex.substr(2, 2), 16) || 0;
    const b = parseInt(fullHex.substr(4, 2), 16) || 0;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  };

  const getContrastSafeColor = (userColor: string | null, bg: string, fallback: string): string => {
    if (!userColor) return fallback;
    const userLum = getLuminance(userColor);
    const bgLum = getLuminance(bg);
    const diff = Math.abs(userLum - bgLum);
    
    // Minimum 28% luminance difference required. If not, fallback to high contrast
    if (diff < 0.28) {
        return bgLum > 0.5 ? '#000000' : '#ffffff';
    }
    return userColor;
  };

  // ON_COLOR: Contrast-checked text on dark/colored panels (brandDark)
  const ON_COLOR = getContrastSafeColor(userFontColor, brandDark, '#ffffff');
  // ON_WHITE: Contrast-checked text on white panels/light backgrounds (#ffffff)
  const ON_WHITE = getContrastSafeColor(userFontColor, '#ffffff', '#000000');

  // --- GLOBAL FONT SIZE SCALING UTILITY ---
  const fs = (baseSize: number) => {
    const factor = (data.fontSizeFactor || 100) / 100;
    return `${Math.round(baseSize * factor)}px`;
  };

  // --- DYNAMIC FONT LOADER (Optimized) ---
  const getCleanFontFamily = (fontFamilyStr: string) => {
    if (!fontFamilyStr) return '';
    return fontFamilyStr.replace(/'/g, '').split(',')[0].trim();
  };

  const cleanFontFamilyName = getCleanFontFamily(data.fontFamily || '');
  const fontImportUrl = cleanFontFamilyName
    ? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanFontFamilyName)}:wght@300;400;500;700;900&display=swap`
    : null;
  const styleImport = fontImportUrl ? (
    <style dangerouslySetInnerHTML={{ __html: `@import url('${fontImportUrl}');` }} />
  ) : null;
  
  const width = orientation === 'horizontal' ? 1050 : 600;
  const height = orientation === 'horizontal' ? 600 : 1050;

  const registryEntry = CARD_TEMPLATE_REGISTRY[id];

  // --- EFFECTIVE BACKGROUND LOGIC ---
  // Use registry theme first; fall back to an explicit ID-based dark-template allowlist.
  const registryTheme = template.theme;
  const isDarkTemplate = registryTheme === 'dark' || 
                        (registryEntry?.theme === 'dark') ||
                        (!registryTheme && (
                          id.startsWith('id-corp-') || id.startsWith('id-tech-') ||
                          id.includes('obsidian')
                        ));
  
  // Global bg/text for legacy engine; bespoke renderers use ON_COLOR / ON_WHITE locally
  const effectiveBg = isDarkTemplate ? '#1a1a2e' : '#ffffff';
  const contrastColor = getContrastSafeColor(userFontColor, effectiveBg, getContrastColor(effectiveBg));

  const handleDragEnd = (key: 'logo' | 'content' | 'qr' | 'avatar', info: any) => {
    if (!onLayoutChange) return;
    const currentLayout = data.layout || {};
    const newPos = {
        x: (currentLayout[key]?.x || 0) + info.offset.x / scale,
        y: (currentLayout[key]?.y || 0) + info.offset.y / scale
    };
    onLayoutChange({ ...currentLayout, [key]: newPos });
  };

  const DraggableElement = ({ 
    elementKey, 
    children, 
    className = "", 
    style = {} 
  }: { 
    elementKey: 'logo' | 'content' | 'qr' | 'avatar'; 
    children: React.ReactNode; 
    className?: string; 
    style?: React.CSSProperties;
  }) => {
    const position = data.layout?.[elementKey] || { x: 0, y: 0 };

    if (!isDraggable) {
      return (
        <div 
          className={className} 
          style={{ 
            ...style, 
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_, info) => handleDragEnd(elementKey, info)}
        className={`relative group/drag ${className}`}
        style={{
          ...style,
          x: position.x,
          y: position.y,
          cursor: 'grab',
          zIndex: 40
        }}
        whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
      >
        <div className="absolute inset-[-10px] border-2 border-dashed border-blue-500/40 rounded-2xl pointer-events-none group-hover/drag:border-blue-500/80 transition-colors duration-300" />
        <div className="absolute -top-7 left-0 bg-blue-600/90 backdrop-blur-md text-[9px] font-black text-white px-2 py-0.5 rounded-lg uppercase tracking-[0.15em] shadow-lg flex items-center gap-1 select-none pointer-events-none z-50">
          <Box size={10} className="animate-spin-slow" />
          <span>{elementKey}</span>
        </div>
        {children}
      </motion.div>
    );
  };


  // --- BESPOKE RENDERERS (1:1 Visual Parity) ---
  
  // --- GLOBALLY AVAILABLE AVATAR PORTRAIT INTEGRATION UTILITY ---
  const renderAvatar = (borderColor: string = brandAccent, size: number = 130) => {
    const avatarContent = data.avatarUrl ? (
      <img src={data.avatarUrl} alt={data.fullName || 'User Portrait'} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center font-black tracking-tighter text-white" style={{ backgroundColor: brandDark, fontSize: `${Math.round(size * 0.3)}px` }}>
        {(data.fullName || 'N U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
      </div>
    );

    return (
      <DraggableElement elementKey="avatar" className="relative group/avatar inline-block">
        {/* Layered Outer Halo Gradient Ring */}
        <div 
          className="rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] relative overflow-hidden transition-all duration-500 hover:scale-105"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`, 
            background: `linear-gradient(135deg, ${borderColor}, ${brandMid})`,
            padding: '3px' 
          }}
        >
          {/* Inner dark contrast gap */}
          <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative flex items-center justify-center p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {avatarContent}
            </div>
          </div>
        </div>
      </DraggableElement>
    );
  };
  
  



  

  
 
  

  

  


  // --- LEGACY/GENERIC ENGINE (For other templates) ---

  

  

  

  // --- NEW BESPOKE RENDERERS EMBEDDING THE 10 DESIGN PRINCIPLES ---

  

  

  

  

  

  

  

  

  

  

  

  // --- MASTER RENDERER DISPATCHER ---
  const renderBespokeTemplate = () => {
    const sharedProps = { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, effectiveAccent, fs, DraggableElement, renderAvatar };
    if (registryEntry && registryEntry.CardComponent) {
      const Card = registryEntry.CardComponent;
      return <Card {...sharedProps} />;
    }
    return null;
  };

  const bespokeContent = renderBespokeTemplate();

  if (bespokeContent) {
    return (
        <div 
          className="relative overflow-hidden shadow-2xl transition-all duration-700 bg-white"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`, 
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            borderRadius: '24px',
            fontFamily: data.fontFamily || "'Montserrat', sans-serif"
          }}
        >
          {styleImport}
          {renderTemplateBackground(id, effectiveAccent, side)}
          {bespokeContent}
          <div className="absolute inset-0 border-[1px] border-white/20 rounded-[24px] pointer-events-none" />
          {isDraggable && (
            <div className="absolute top-4 right-4 bg-noble-blue text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full animate-pulse z-50">
                Editor Active
            </div>
          )}
        </div>
    );
  }

  // --- LEGACY/GENERIC ENGINE (For other templates) ---
  const renderLegacyContent = () => (
      <DraggableElement
          elementKey="content"
          className="flex flex-col justify-center cursor-move z-20"
      >
        <div className="space-y-6 pl-12">
            <div className="space-y-2">
                <h1 style={{ color: contrastColor, fontFamily: data.fontFamily || undefined, fontSize: data.fontSizeName ? `${data.fontSizeName}px` : undefined }} className="text-7xl font-black uppercase tracking-tighter">
                    {data.fullName || 'YOUR NAME'}
                </h1>
                <p style={{ color: contrastColor, fontFamily: data.fontTitle || data.fontFamily || undefined, fontSize: data.fontSizeTitle ? `${data.fontSizeTitle}px` : undefined }} className="text-4xl font-medium uppercase tracking-wide opacity-60">
                    {data.jobTitle || 'Your Title'}
                </p>
            </div>
            <div className="space-y-4">
                {[
                    { icon: Phone, value: data.phone || '+1.234.567.8900' },
                    { icon: Mail, value: data.email || 'hello@yourcompany.com' },
                    { icon: Globe, value: data.website || 'www.yourcompany.com' }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                             style={{ backgroundColor: `${effectiveAccent}22`, border: `1px solid ${effectiveAccent}44` }}>
                            <item.icon size={22} style={{ color: contrastColor }} />
                        </div>
                        <span style={{ color: contrastColor }} className="text-3xl font-medium">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    </DraggableElement>
  );

  return (
    <div 
      className={`relative overflow-hidden shadow-2xl transition-all duration-700 bg-white ${isDraggable ? 'ring-2 ring-noble-blue ring-offset-4' : ''}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        borderRadius: '24px',
        fontFamily: data.fontFamily || "'Inter', sans-serif"
      }}
    >
      {styleImport}
      {renderTemplateBackground(id, effectiveAccent, side)}
      {side === 'front' ? renderLegacyContent() : (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
             <div className="text-center space-y-8">
                <h2 className="text-6xl font-black uppercase tracking-tight" style={{ color: contrastColor, fontFamily: data.fontFamily || undefined }}>{data.companyName}</h2>
                <div className="bg-white p-4 rounded-3xl shadow-xl inline-block">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(data.qrCodeUrl || 'https://nobleinvoice.ai')}&color=${effectiveAccent.replace('#', '')}`} 
                        alt="QR" 
                        className="w-32 h-32"
                    />
                </div>
             </div>
        </div>
      )}
      <div className="absolute inset-0 border-[1px] border-white/20 rounded-[24px] pointer-events-none" />
    </div>
  );
};
