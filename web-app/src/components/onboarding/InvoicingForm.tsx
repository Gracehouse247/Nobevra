'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface InvoicingFormProps {
  taxNumber: string;
  invoiceFooter: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  isSubmitting: boolean;
}

export function InvoicingForm({ taxNumber, invoiceFooter, onChange, onSubmit, onSkip, isSubmitting }: InvoicingFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Number (Optional)</label>
        <p className="text-xs text-slate-500 mb-2">VAT, EIN, ABN, etc. This will appear on your invoices.</p>
        <input
          type="text"
          value={taxNumber}
          onChange={(e) => onChange('taxNumber', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-noble-border focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
          placeholder="e.g. GB123456789"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Default Invoice Footer</label>
        <p className="text-xs text-slate-500 mb-2">Thank your clients or add payment terms automatically.</p>
        <textarea
          value={invoiceFooter}
          onChange={(e) => onChange('invoiceFooter', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-noble-border focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Thank you for your business!"
        />
      </div>

      <div className="pt-6 flex flex-col space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Finalizing...
            </>
          ) : (
            'Finish Setup'
          )}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={isSubmitting}
          className="w-full py-4 bg-noble-surface text-slate-500 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50"
        >
          Skip for now
        </button>
      </div>
    </form>
  );
}
