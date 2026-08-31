'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

const TemplateDownloadModal = dynamic(
  () => import('./TemplateDownloadModal'),
  { ssr: false }
);

interface TemplateDownloadButtonProps {
  label?: string;
  format?: 'word' | 'excel' | 'pdf';
}

export default function TemplateDownloadButton({ label, format }: TemplateDownloadButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    // Check if user is already authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Already logged in — download directly
      const link = document.createElement('a');
      link.href = '/api/download/proforma-template';
      link.setAttribute('download', `Nobevra-Proforma-Template.${format === 'excel' ? 'xlsx' : format === 'word' ? 'docx' : 'pdf'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Not logged in — open registration modal
      setModalOpen(true);
    }
  };

  const buttonText = label || (format ? `Download ${format.toUpperCase()} Template` : 'Download Template');

  return (
    <>
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
      >
        <Download className="w-4 h-4" />
        {buttonText}
      </button>

      <TemplateDownloadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
