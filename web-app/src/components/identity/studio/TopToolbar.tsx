'use client';
import React, { useState } from 'react';
import { Download, ChevronLeft, Undo, Redo, Eye, Sparkles, CloudUpload, Loader2 } from 'lucide-react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { VisualizerModal } from './VisualizerModal';
import { jsPDF } from 'jspdf';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { identityService, teamService } from '@/lib/services/supabaseService';

export const TopToolbar: React.FC = () => {
  const { template, stageRef } = useCanvasStore();
  const { user } = useAuth();
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [cardImageFront, setCardImageFront] = useState('');
  const [publishing, setPublishing] = useState(false);

  const handleOpen3D = () => {
    if (!stageRef) {
      toast.error('Canvas loading... please wait');
      return;
    }
    // Generate the active canvas snapshot to feed into the 3D visualizer textures
    const dataUrl = stageRef.toDataURL({ pixelRatio: 2 });
    setCardImageFront(dataUrl);
    setShowVisualizer(true);
    toast.success('3D luxury mockup synthesis complete! 💎');
  };

  const handleExportPng = () => {
    if (!stageRef) {
      toast.error('Canvas loading... please wait');
      return;
    }
    try {
      const loadingToast = toast.loading('Capturing high-fidelity 300DPI PNG...');
      const dataUrl = stageRef.toDataURL({ pixelRatio: 3 });
      
      const link = document.createElement('a');
      link.download = `${template?.name || 'NobleCard'}_design.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('High-res PNG ready for print! ✨', { id: loadingToast });
    } catch (err) {
      toast.error('Failed to export PNG');
      console.error(err);
    }
  };

  const handleExportPdf = () => {
    if (!stageRef) {
      toast.error('Canvas loading... please wait');
      return;
    }
    try {
      const loadingToast = toast.loading('Generating print-ready vector PDF...');
      const dataUrl = stageRef.toDataURL({ pixelRatio: 3 });

      // Create high-fidelity US Standard Business Card layout [3.5 inches x 2 inches]
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [3.5, 2]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, 3.5, 2);
      pdf.save(`${template?.name || 'NobleCard'}_print_ready.pdf`);

      toast.success('Print-ready PDF downloaded successfully! 💎', { id: loadingToast });
    } catch (err) {
      toast.error('PDF synthesis failed. Please retry.');
      console.error(err);
    }
  };

  return (
    <div className="h-16 bg-noble-surface/60 backdrop-blur-md border-b border-white/60 px-3 sm:px-6 flex items-center justify-between shrink-0 z-20 shadow-sm relative overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="p-2.5 min-w-[44px] min-h-[44px] hover:bg-slate-100 rounded-xl transition-colors text-slate-500 flex items-center justify-center"
          aria-label="Back to dashboard"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-noble-text text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]">
            {template?.name || 'Untitled Design'}
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium truncate">Studio Pro</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button className="p-2.5 min-w-[44px] min-h-[44px] text-slate-400 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center" title="Undo">
          <Undo size={18} />
        </button>
        <button className="p-2.5 min-w-[44px] min-h-[44px] text-slate-400 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center" title="Redo">
          <Redo size={18} />
        </button>
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />
        
        <button 
          onClick={handleOpen3D}
          className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[44px] text-xs sm:text-sm font-medium text-slate-700 bg-noble-surface border border-noble-border hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Eye size={16} className="text-amber-500" />
          <span className="hidden md:inline">Preview 3D</span>
        </button>

        <button 
          onClick={handleExportPng}
          className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[44px] text-xs sm:text-sm font-medium text-slate-700 bg-noble-surface border border-noble-border hover:bg-slate-50 rounded-xl transition-colors"
        >
          <Download size={16} />
          <span className="hidden md:inline">PNG</span>
        </button>

        <button 
          onClick={handleExportPdf}
          className="hidden lg:flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[44px] text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-colors"
        >
          <Sparkles size={16} className="text-amber-400" />
          <span>Export PDF</span>
        </button>

        <button 
          onClick={async () => {
            if (!stageRef || !template || !user) {
              toast.error(!user ? 'Please log in first' : 'Canvas not ready');
              return;
            }
            setPublishing(true);
            try {
              const dataUrl = stageRef.toDataURL({ pixelRatio: 3 });
              const tData = await teamService.getTeamByUserId(user.id);
              const teamId = tData?.id || user.id;

              const textEls = template.elements.filter(el => el.type === 'text');
              const nameEl = textEls.find(el => (el.fontSize || 0) >= 28) || textEls[0];
              const titleEl = textEls.find(el => el.text?.toLowerCase().includes('ceo') || el.text?.toLowerCase().includes('founder') || el.text?.toLowerCase().includes('manager') || el.text?.toLowerCase().includes('director')) || textEls[1];
              const emailEl = textEls.find(el => el.text?.includes('@'));
              const phoneEl = textEls.find(el => el.text?.match(/\+?[\d\s\-()]{7,}/));

              await toast.promise(
                identityService.saveIdentityWithDesign({
                  userId: user.id,
                  teamId,
                  name: nameEl?.text || (tData as any)?.full_name || 'User',
                  title: titleEl?.text || 'Professional',
                  email: emailEl?.text || (tData as any)?.business_email || '',
                  phone: phoneEl?.text || (tData as any)?.business_phone || '',
                  website: '',
                  designSchema: template,
                  imageDataUrl: dataUrl,
                }),
                {
                  loading: 'Publishing card...',
                  success: 'Card synced! 🚀',
                  error: 'Publish failed.'
                }
              );
            } catch (err) {
              console.error('[Studio Publish]', err);
            } finally {
              setPublishing(false);
            }
          }}
          disabled={publishing}
          className="flex items-center gap-1.5 px-3 sm:px-5 py-2 min-h-[44px] text-xs sm:text-sm font-bold text-white bg-[#166FBB] hover:bg-[#125A96] rounded-xl shadow-md transition-all shrink-0 disabled:opacity-60"
        >
          {publishing ? <Loader2 size={16} className="animate-spin" /> : <CloudUpload size={16} />}
          <span>Publish</span>
        </button>
      </div>

      {showVisualizer && template && (
        <VisualizerModal
          template={template}
          cardImageFront={cardImageFront}
          onClose={() => setShowVisualizer(false)}
        />
      )}
    </div>
  );
};
