'use client';
import React, { useState } from 'react';
import { Type, Image as ImageIcon, Square, QrCode, Layers, Palette, Sparkles, Plus, Circle, Move } from 'lucide-react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { STUDIO_TEMPLATES } from '../../../lib/templates/studioTemplates';
import { AiGeneratorPanel } from './AiGeneratorPanel';
import { BrandKitPanel } from './BrandKitPanel';
import { BackgroundRemover } from './BackgroundRemover';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { QrService } from '../../../lib/services/qrService';
import { IDENTITY_TEMPLATES } from '../../../lib/templates/businessCardTemplates';
import PaygUnlockModal, { usePaygBundle, type UnlockCategory } from '../../features/billing/PaygUnlockModal';
import PremiumBadge from '../../shared/PremiumBadge';
import { useUpgradeModal } from '../../../context/UpgradeModalContext';
import { useEntitlements } from '../../../context/EntitlementsContext';

import { VECTOR_CATEGORIES } from './vectorCategories';


export const SidebarLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [designMode, setDesignMode] = useState<'templates' | 'ai'>('templates');
  const { loadTemplate, addElement } = useCanvasStore();
  const { user } = useAuth();

  // QR Engine State
  const [qrUrl, setQrUrl] = useState('https://nobleinvoice.com/p/noble-user');
  const [qrColor, setQrColor] = useState('#0f172a');

  // Uploaded assets state
  const [uploadedAssets, setUploadedAssets] = useState<string[]>([]);
  const [searchVector, setSearchVector] = useState('');

  // PAYG State
  const { userData } = useAuth();
  const paygBundle = usePaygBundle(user?.id);
  const { openUpgradeModal } = useUpgradeModal();
  const { hasUnlockedTemplate } = useEntitlements();
  const [unlockTemplateId, setUnlockTemplateId] = useState<string | null>(null);
  const [unlockTemplateName, setUnlockTemplateName] = useState<string>('');

  const tabs = [
    { id: 'templates', icon: Layers, label: 'Design' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'shapes', icon: Square, label: 'Elements' },
    { id: 'uploads', icon: ImageIcon, label: 'Uploads' },
    { id: 'brand', icon: Palette, label: 'Brand Kit' },
    { id: 'qr', icon: QrCode, label: 'QR Engine' }
  ];

  const handleAddText = (type: 'title' | 'subtitle' | 'body') => {
    const textElement = {
      id: 'text-' + Date.now(),
      type: 'text' as const,
      x: 150,
      y: 150,
      fontFamily: 'Inter',
      rotation: 0
    };

    if (type === 'title') {
      addElement({
        ...textElement,
        text: 'HEADER TITLE',
        fontSize: 48,
        fontWeight: 'bold',
        fill: '#0f172a'
      });
    } else if (type === 'subtitle') {
      addElement({
        ...textElement,
        text: 'Professional Subtitle',
        fontSize: 22,
        fill: '#475569'
      });
    } else {
      addElement({
        ...textElement,
        text: 'Your detail body text here',
        fontSize: 14,
        fill: '#64748b'
      });
    }
    toast.success('Inserted text layer onto canvas!');
  };

  const handleAddShape = (shapeType: 'rect' | 'circle' | 'line') => {
    const base = {
      id: 'shape-' + Date.now(),
      x: 200,
      y: 200,
      fill: '#38bdf8',
      rotation: 0
    };

    if (shapeType === 'rect') {
      addElement({
        ...base,
        type: 'shape' as const,
        width: 150,
        height: 100,
        cornerRadius: 8
      });
    } else if (shapeType === 'circle') {
      addElement({
        ...base,
        type: 'shape' as const,
        width: 100,
        height: 100,
        cornerRadius: 50 // Circle is a high-radius square in Konva Rect
      });
    } else {
      addElement({
        ...base,
        type: 'shape' as const,
        width: 300,
        height: 4
      });
    }
    toast.success('Inserted element layer onto canvas!');
  };

  const handleAddVector = (name: string, path: string, viewBox: string = '0 0 24 24') => {
    const fill = '#166FBB';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${encodeURIComponent(fill)}">${path}</svg>`;
    const url = `data:image/svg+xml;utf8,${svg}`;

    addElement({
      id: 'vector-' + Date.now(),
      type: 'svg' as const,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: fill,
      customSvgPath: path,
      viewBox: viewBox,
      url: url,
      rotation: 0
    });
    toast.success(`Inserted ${name} vector onto canvas!`);
  };

  const handleAddQr = async () => {
    if (!qrUrl.trim()) {
      toast.error('Please input a valid URL first.');
      return;
    }
    
    const loadingToast = toast.loading('Syncing dynamic QR with ecosystem...');

    try {
      // Register dynamic QR code inside Supabase qr_codes table
      const qrData = {
        user_id: user?.id || 'anonymous',
        name: `Card Studio QR - ${qrUrl.trim()}`,
        type: 'website',
        content: { url: qrUrl.trim() },
        color_primary: qrColor
      };
      
      const qrId = await QrService.saveQrCode(qrData);
      
      // Dynamic scanning tracking target link
      const dynamicUrl = `${window.location.origin}/q/${qrId}`;
      const encodedUrl = encodeURIComponent(dynamicUrl);
      const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=${qrColor.replace('#', '')}&data=${encodedUrl}`;

      addElement({
        id: 'qr-' + Date.now(),
        type: 'image' as const,
        x: 750,
        y: 350,
        width: 180,
        height: 180,
        url: qrImageSrc,
        rotation: 0
      });
      
      toast.dismiss(loadingToast);
      toast.success('Dynamic trackable QR integrated onto canvas! 💎');
    } catch (err: unknown) {
      console.error('QR Dynamic Sync failed, using fallback static QR:', err);
      toast.dismiss(loadingToast);
      
      // Fallback static QR
      const encodedUrl = encodeURIComponent(qrUrl.trim());
      const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=${qrColor.replace('#', '')}&data=${encodedUrl}`;

      addElement({
        id: 'qr-' + Date.now(),
        type: 'image' as const,
        x: 750,
        y: 350,
        width: 180,
        height: 180,
        url: qrImageSrc,
        rotation: 0
      });
      toast.error('Ecosystem offline. Fallback static QR inserted.');
    }
  };

  const handleAssetProcessed = (url: string) => {
    setUploadedAssets(prev => [url, ...prev]);
    
    // Add directly to canvas as well
    addElement({
      id: 'asset-' + Date.now(),
      type: 'image' as const,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
      url: url,
      rotation: 0
    });
  };

  return (
    <div className="flex h-full z-10 shrink-0">
      {/* Primary Icon Dock */}
      <div className="w-20 bg-[#F8FAFC] h-full flex flex-col items-center py-6 gap-6 border-r border-[#E2E8F0] shrink-0 text-slate-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1.5 transition-all group w-full ${isActive ? 'text-[#166FBB] font-black scale-105' : 'text-[#64748B] hover:text-[#0F172A]'}`}
            >
              <div className={`p-2.5 rounded-xl transition-all ${isActive ? 'bg-white border border-[#E2E8F0] text-[#166FBB] shadow-sm' : 'group-hover:bg-slate-200/50 border border-transparent'}`}>
                <tab.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Content Panel */}
      <div className="w-80 bg-[#F8FAFC] h-full border-r border-[#E2E8F0] flex flex-col overflow-y-auto no-scrollbar relative z-10 text-slate-800">
        
        {/* DESIGN TAB */}
        {activeTab === 'templates' && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex gap-2">
              <button
                onClick={() => setDesignMode('templates')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${designMode === 'templates' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                Templates
              </button>
              <button
                onClick={() => setDesignMode('ai')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${designMode === 'ai' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                <Sparkles size={12} />
                Noble AI
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {designMode === 'templates' ? (
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Design Presets</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {STUDIO_TEMPLATES.map((tmpl) => {
                      const identityTmpl = IDENTITY_TEMPLATES.find(t => t.id === tmpl.id);
                      const isPremium = identityTmpl?.isPremium || false;

                      const handleTemplateClick = () => {
                        if (isPremium && !hasUnlockedTemplate(tmpl.id)) {
                          if (user) {
                            if (paygBundle.hasAccess('businessCard', tmpl.id)) {
                              loadTemplate(tmpl);
                              return;
                            }
                            if (paygBundle.state.credits.businessCardTemplates > 0) {
                              if (paygBundle.redeemCredit('businessCard', tmpl.id)) {
                                loadTemplate(tmpl);
                                return;
                              }
                            }
                          }
                          setUnlockTemplateId(tmpl.id);
                          setUnlockTemplateName(tmpl.name);
                          // Also show upgrade modal so user knows what plan to upgrade to
                          openUpgradeModal({ featureName: 'Premium Business Card Templates', requiredPlan: 'pulse' });
                        } else {
                          loadTemplate(tmpl);
                        }
                      };

                      return (
                        <button
                          key={tmpl.id}
                          onClick={handleTemplateClick}
                          className={`group relative w-full h-32 rounded-2xl border overflow-hidden hover:shadow-lg transition-all text-left ${isPremium && !hasUnlockedTemplate(tmpl.id) ? 'border-amber-200 hover:border-amber-400' : 'border-slate-200 hover:border-blue-600'}`}
                          style={{ backgroundColor: tmpl.background }}
                        >
                        <div className="absolute inset-0 p-6 flex flex-col justify-center transform scale-75 origin-left">
                          <span style={{ color: tmpl.elements.find(e => e.id === 't1')?.fill || '#fff', fontWeight: 'bold', fontSize: '24px', fontFamily: tmpl.elements.find(e => e.id === 't1')?.fontFamily || 'Inter' }}>
                            {tmpl.elements.find(e => e.id === 't1')?.text || 'Template'}
                          </span>
                          <span style={{ color: tmpl.elements.find(e => e.id === 't2')?.fill || '#aaa', fontSize: '14px', marginTop: '4px' }}>
                            {tmpl.elements.find(e => e.id === 't2')?.text || ''}
                          </span>
                        </div>
                        {isPremium && !hasUnlockedTemplate(tmpl.id) && (
                          <div className="absolute top-2 right-2 z-10">
                            <PremiumBadge tier="pulse" iconOnly />
                          </div>
                        )}
                        {(!isPremium || hasUnlockedTemplate(tmpl.id)) && (
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md rounded-full p-1.5 text-white">
                            <Plus size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                  </div>
                </div>
              ) : (
                <AiGeneratorPanel />
              )}
            </div>
          </div>
        )}

        {/* TEXT TAB */}
        {activeTab === 'text' && (
          <div className="p-6 flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Typography Inserter</h3>
              <p className="text-xs text-slate-400 mt-1">Insert customizable text layers on the canvas</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleAddText('title')}
                className="w-full py-4 px-6 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl text-left flex flex-col gap-1 transition-all group hover:border-blue-500"
              >
                <span className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Add Heading</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Playfair / Space Grotesk Bold</span>
              </button>

              <button
                onClick={() => handleAddText('subtitle')}
                className="w-full py-3.5 px-6 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl text-left flex flex-col gap-1 transition-all group hover:border-blue-500"
              >
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Add Subheading</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Medium Detail Subtext</span>
              </button>

              <button
                onClick={() => handleAddText('body')}
                className="w-full py-3 px-6 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl text-left flex flex-col gap-1 transition-all group hover:border-blue-500"
              >
                <span className="text-xs text-slate-500 group-hover:text-blue-600 transition-colors">Add body text layer</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fine Print & Info</span>
              </button>
            </div>
          </div>
        )}

        {/* ELEMENTS TAB */}
        {activeTab === 'shapes' && (
          <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Design Vectors</h3>
              <p className="text-xs text-[#64748B] mt-1">Insert customizable vector shapes onto the layout</p>
            </div>

            {/* Vector Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search vectors..."
                value={searchVector}
                onChange={(e) => setSearchVector(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] text-slate-800 text-xs font-semibold rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-noble-blue transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>

            {/* Classic Elements Quick-add */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Base Elements</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleAddShape('rect')}
                  className="py-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col items-center justify-center gap-1 hover:border-noble-blue hover:bg-slate-50 transition-all group"
                >
                  <Square size={16} className="text-slate-500 group-hover:text-noble-blue transition-colors" />
                  <span className="text-[9px] font-bold text-slate-600 group-hover:text-noble-blue uppercase tracking-wider">Rectangle</span>
                </button>
                <button
                  onClick={() => handleAddShape('circle')}
                  className="py-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col items-center justify-center gap-1 hover:border-noble-blue hover:bg-slate-50 transition-all group"
                >
                  <Circle size={16} className="text-slate-500 group-hover:text-noble-blue transition-colors" />
                  <span className="text-[9px] font-bold text-slate-600 group-hover:text-noble-blue uppercase tracking-wider">Circle</span>
                </button>
                <button
                  onClick={() => handleAddShape('line')}
                  className="py-2.5 bg-white border border-[#E2E8F0] rounded-xl flex flex-col items-center justify-center gap-1 hover:border-noble-blue hover:bg-slate-50 transition-all group"
                >
                  <Move size={14} className="text-slate-500 group-hover:text-noble-blue transition-colors" />
                  <span className="text-[9px] font-bold text-slate-600 group-hover:text-noble-blue uppercase tracking-wider">Accent Line</span>
                </button>
              </div>
            </div>

            {/* Vector Categories List */}
            <div className="flex flex-col gap-5 pt-3 border-t border-slate-100">
              {VECTOR_CATEGORIES.map((category) => {
                const filteredItems = category.items.filter(item => 
                  item.name.toLowerCase().includes(searchVector.toLowerCase())
                );
                
                if (filteredItems.length === 0) return null;

                return (
                  <div key={category.name} className="flex flex-col gap-2.5">
                    <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">{category.name}</span>
                    <div className="grid grid-cols-4 gap-2">
                      {filteredItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleAddVector(item.name, item.path)}
                          className="aspect-square bg-white border border-[#E2E8F0] rounded-xl flex flex-col items-center justify-center p-1.5 hover:border-noble-blue hover:bg-slate-50 transition-all group"
                          title={item.name}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-slate-400 group-hover:text-noble-blue transition-colors"
                            dangerouslySetInnerHTML={{ __html: item.path }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* UPLOADS TAB */}
        {activeTab === 'uploads' && (
          <div className="p-6 flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Brand Asset Studio</h3>
              <p className="text-xs text-slate-400 mt-1">Upload images or strip backgrounds instantly</p>
            </div>

            {/* Smart Backdrop Remover */}
            <BackgroundRemover onProcessed={handleAssetProcessed} />

            {/* Uploaded Gallery preview */}
            {uploadedAssets.length > 0 && (
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Assets</span>
                <div className="grid grid-cols-3 gap-2">
                  {uploadedAssets.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => addElement({
                        id: 'asset-inserted-' + idx + '-' + Date.now(),
                        type: 'image' as const,
                        x: 150,
                        y: 150,
                        width: 150,
                        height: 150,
                        url: url,
                        rotation: 0
                      })}
                      className="aspect-square rounded-xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-blue-500 transition-all p-1 flex items-center justify-center relative group"
                    >
                      <img src={url} alt="Uploaded Layer" className="max-h-full max-w-full object-contain" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Plus size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BRAND TAB */}
        {activeTab === 'brand' && <BrandKitPanel />}

        {/* QR ENGINE TAB */}
        {activeTab === 'qr' && (
          <div className="p-6 flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Noble QR Generator</h3>
              <p className="text-xs text-slate-400 mt-1">Direct template connectivity with live ecosystem lookup</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">QR Destination Link</label>
                <input
                  type="text"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">QR Vector Color</label>
                <div className="flex gap-2.5">
                  {['#0f172a', '#0b1f5e', '#d4af37', '#10b981', '#ef4444'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setQrColor(color)}
                      className={`w-7 h-7 rounded-full border transition-all ${qrColor === color ? 'border-blue-500 scale-110' : 'border-slate-200 hover:scale-105'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddQr}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <QrCode size={16} />
                Insert Live QR Code
              </button>
            </div>
          </div>
        )}

      </div>
      
      {/* PAYG Modal */}
      {unlockTemplateId && (
        <PaygUnlockModal
          isOpen={!!unlockTemplateId}
          onClose={() => setUnlockTemplateId(null)}
          triggerCategory="businessCard"
          templateId={unlockTemplateId}
          templateName={unlockTemplateName}
          onUnlocked={() => {
            const tmpl = STUDIO_TEMPLATES.find(t => t.id === unlockTemplateId);
            if (tmpl) loadTemplate(tmpl);
            setUnlockTemplateId(null);
          }}
        />
      )}
    </div>
  );
};
