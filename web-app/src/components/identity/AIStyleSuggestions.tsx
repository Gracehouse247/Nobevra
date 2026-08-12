import React, { useState } from 'react';
import { identityApi } from '@/lib/api';
import { Wand2, Sparkles, Palette, Type, CheckCircle2, Loader2 } from 'lucide-react';

interface StyleSuggestion {
  templateId: string;
  accentColor: string;
  tagline: string;
  reason: string;
}

interface AIStyleSuggestionsProps {
  businessType: string;
  onSelect: (suggestion: StyleSuggestion) => void;
}

export const AIStyleSuggestions: React.FC<AIStyleSuggestionsProps> = ({ 
  businessType, 
  onSelect 
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<StyleSuggestion[]>([]);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const { data } = await identityApi.getStyleSuggestions(businessType);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Failed to fetch AI suggestions:', error);
      // Fallback suggestions
      setSuggestions([
        {
          templateId: 'id-larana-inc',
          accentColor: '#D35400',
          tagline: 'Precision in every pixel.',
          reason: 'The Larana Vertex style conveys high-end expertise and modern professionalism through clean, executive aesthetics.'
        },
        {
          templateId: 'id-wilson-dynamic',
          accentColor: '#00B4DB',
          tagline: 'Clarity. Efficiency. Results.',
          reason: 'A clean, dynamic approach highlights your focus on direct results and transparent communication.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8 rounded-3xl bg-noble-surface border border-slate-100 shadow-xl shadow-slate-200/20">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-montserrat text-noble-text flex items-center gap-2">
            <Wand2 className="text-noble-blue" />
            AI Style Suggestions
          </h2>
          <p className="text-slate-500 font-medium text-sm">Branding strategies for your {businessType} business</p>
        </div>
        
        <button 
          onClick={fetchSuggestions}
          disabled={loading}
          className="px-6 py-3 bg-noble-blue hover:bg-noble-blue/90 disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-noble-blue/20"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
          {suggestions.length > 0 ? 'Refresh' : 'Analyze Business'}
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-64 rounded-2xl bg-slate-50 border border-slate-100 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((s, idx) => (
            <div 
              key={idx}
              className="group relative p-6 rounded-2xl bg-noble-surface border border-slate-100 hover:border-noble-blue/30 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
              onClick={() => onSelect(s)}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="text-noble-blue" size={24} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-noble-blue/5">
                    <Palette className="text-noble-blue" size={20} />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-noble-text">
                    {s.templateId === 'id-larana-inc' ? 'Executive Vertex' : 'Dynamic Azure'}
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-noble-blue font-bold text-xs uppercase tracking-widest">{s.templateId.replace('id-', '')}</p>
                  <p className="text-noble-text text-lg font-bold italic">"{s.tagline}"</p>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{s.reason}</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <div className="w-6 h-6 rounded-full shadow-sm" style={{ backgroundColor: s.accentColor }} />
                   <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">{s.accentColor}</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-noble-blue/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}

      {suggestions.length === 0 && !loading && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="w-16 h-16 rounded-2xl bg-noble-surface flex items-center justify-center shadow-sm">
             <Wand2 className="text-slate-300" size={32} />
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest max-w-xs">Enter your business type to analyze your premium branding strategy.</p>
        </div>
      )}
    </div>
  );
};
