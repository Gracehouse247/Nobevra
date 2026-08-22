'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

const TemplateDownloadModal = dynamic(
  () => import('./TemplateDownloadModal'),
  { ssr: false }
);

export default function TemplateDownloadButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    // Check if user is already authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Already logged in — download directly
      const link = document.createElement('a');
      link.href = '/api/download/proforma-template';
      link.setAttribute('download', 'Nobevra-Proforma-Template.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Not logged in — open registration modal
      setModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-3 px-8 py-5 text-base font-bold rounded-2xl border-2 border-near-black/10 text-near-black hover:border-noble-blue hover:text-noble-blue hover:bg-noble-blue/5 transition-all"
      >
        <Download className="w-4 h-4" />
        Download Template
      </button>

      <TemplateDownloadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
