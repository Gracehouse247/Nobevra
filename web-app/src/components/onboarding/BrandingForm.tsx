'use client';

import React from 'react';

interface BrandingFormProps {
  brandColor: string;
  secondaryColor: string;
  brandVoice: string;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

const VOICES = ['Professional', 'Friendly', 'Casual', 'Corporate', 'Creative'];

export function BrandingForm({ brandColor, secondaryColor, brandVoice, onChange, onNext, onSkip }: BrandingFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-6 border border-noble-border rounded-2xl bg-slate-50/50">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">Primary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => onChange('brandColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-mono text-slate-600">{brandColor.toUpperCase()}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">Secondary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => onChange('secondaryColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-mono text-slate-600">{secondaryColor.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Voice</label>
        <p className="text-xs text-slate-500 mb-3">How should AI communicate with your clients?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VOICES.map(voice => (
            <button
              key={voice}
              type="button"
              onClick={() => onChange('brandVoice', voice)}
              className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                brandVoice === voice
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-noble-border bg-noble-surface text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {voice}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 flex flex-col space-y-3">
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-4 bg-noble-surface text-slate-500 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </form>
  );
}
