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
    <div className="h-16 bg-noble-surface/60 backdrop-blur-md border-b border-white/60 px-6 flex items-center justify-between shrink-0 z-20 shadow-sm relative">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2" />
        <div className="flex flex-col">
          <span className="font-semibold text-noble-text text-sm">
            {template?.name || 'Untitled Design'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">NobleCard Studio Pro</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" title="Undo">
          <Undo size={18} />
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors" title="Redo">
          <Redo size={18} />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2" />
        
        <button 
          onClick={handleOpen3D}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-noble-surface border border-noble-border hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Eye size={16} className="text-amber-500" />
          Preview 3D
        </button>

        <button 
          onClick={handleExportPng}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-noble-surface border border-noble-border hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Download size={16} />
          High-Res PNG
        </button>

        <button 
          onClick={handleExportPdf}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-md transition-colors ml-2"
        >
          <Sparkles size={16} className="text-amber-400" />
          Export PDF
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

              // Extract contact info from text elements in the template
              const textEls = template.elements.filter(el => el.type === 'text');
              const nameEl = textEls.find(el => (el.fontSize || 0) >= 28) || textEls[0];
              const titleEl = textEls.find(el => el.text?.toLowerCase().includes('ceo') || el.text?.toLowerCase().includes('founder') || el.text?.toLowerCase().includes('manager') || el.text?.toLowerCase().includes('director')) || textEls[1];
              const emailEl = textEls.find(el => el.text?.includes('@'));
              const phoneEl = textEls.find(el => el.text?.match(/\+?[\d\s\-()]{7,}/));

              await toast.promise(
                identityService.saveIdentityWithDesign({
                  userId: user.id,
                  teamId,
                  name: nameEl?.text || (tData as any)?.full_name || 'Noble User',
                  title: titleEl?.text || 'Professional',
                  email: emailEl?.text || (tData as any)?.business_email || '',
                  phone: phoneEl?.text || (tData as any)?.business_phone || '',
                  website: '',
                  designSchema: template,
                  imageDataUrl: dataUrl,
                }),
                {
                  loading: 'Publishing to your identity network...',
                  success: 'Card synced! Available on all devices 🚀',
                  error: 'Publish failed. Check your connection.'
                }
              );
            } catch (err) {
              console.error('[Studio Publish]', err);
            } finally {
              setPublishing(false);
            }
          }}
          disabled={publishing}
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#166FBB] hover:bg-[#125A96] rounded-lg shadow-lg shadow-[#166FBB]/25 transition-all ml-2 disabled:opacity-60"
        >
          {publishing ? <Loader2 size={16} className="animate-spin" /> : <CloudUpload size={16} />}
          Publish & Sync
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
