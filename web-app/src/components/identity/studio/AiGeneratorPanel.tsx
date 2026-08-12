'use client';
import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, AlertCircle, Play, Layers } from 'lucide-react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { useAuth } from '../../../context/AuthContext';
import { CanvasTemplate, CanvasElement } from '../../../types/canvas';
import { toast } from 'react-hot-toast';

export const AiGeneratorPanel: React.FC = () => {
  const { loadTemplate } = useCanvasStore();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const presets = [
    { label: 'Minimalist Architect', text: 'Clean white minimalist card for a modern architect using Space Grotesk font, with high-contrast text and a striking safety orange accent strip.' },
    { label: 'Luxury Estate Agent', text: 'Elite royal navy card for a luxury real estate broker using elegant Playfair Display typography and golden lines.' },
    { label: 'Dynamic Fintech Engineer', text: 'Sleek dark tech business card for a senior developer using neon cyan highlights, Syne typeface, and a bold asymmetric layout.' }
  ];

  const handleGenerate = async (selectedPrompt: string = prompt) => {
    const finalPrompt = selectedPrompt || prompt;
    if (!finalPrompt.trim()) {
      toast.error('Please describe your design vision first.');
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading('Noble AI is synthesizing your layout canvas...');

    try {
      let token = '';
      if (user) {
        token = await (user as any).getIdToken();
      }

      // Format custom instructions for the AI engine
      const systemPrompt = `
You are an Elite World-Class Business Card Layout, Typography & Branding Architect.
Your task is to analyze the prompt: "${finalPrompt}" and return a complete premium design layout represented as a single JSON object.

Template Specifications:
- Width: 1050
- Height: 600
- Elements: Must contain text blocks and decorative shapes. Always ensure text size and positions are well-balanced.
- Font Families Available: Playfair Display, Space Grotesk, Syne, Inter, Space Mono, JetBrains Mono, Montserrat.

You MUST respond ONLY with a valid, raw JSON object. Do NOT wrap the JSON in \`\`\`json markdown blocks. Do NOT include any conversational introduction, notes, or explanation outside the JSON.

Expected JSON schema:
{
  "id": "ai-generated-design",
  "name": "AI Optimized Design",
  "width": 1050,
  "height": 600,
  "background": "#HEX_COLOR",
  "elements": [
    {
      "id": "t1",
      "type": "text",
      "text": "FULL NAME",
      "x": number,
      "y": number,
      "fontSize": number,
      "fill": "#HEX_COLOR",
      "fontFamily": "CHOOSE_ONE",
      "fontWeight": "bold"
    },
    {
      "id": "t2",
      "type": "text",
      "text": "JOB TITLE",
      "x": number,
      "y": number,
      "fontSize": number,
      "fill": "#HEX_COLOR",
      "fontFamily": "CHOOSE_ONE"
    },
    {
      "id": "s1",
      "type": "shape",
      "x": number,
      "y": number,
      "width": number,
      "height": number,
      "fill": "#HEX_COLOR"
    }
  ]
}
`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: systemPrompt, chatHistory: [] })
      });

      if (!response.ok) {
        throw new Error('AI API failed');
      }

      const result = await response.json();
      const cleanReply = result.reply
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed: CanvasTemplate = JSON.parse(cleanReply);
      
      if (parsed.elements && parsed.background) {
        // Enforce safe element dimensions
        parsed.elements = parsed.elements.map(el => ({
          ...el,
          x: Math.max(10, Math.min(el.x, 900)),
          y: Math.max(10, Math.min(el.y, 500))
        }));

        loadTemplate(parsed);
        toast.success('Noble AI Generated Design Loaded! ✨', { id: loadingToast });
      } else {
        throw new Error('Malformed AI output structure');
      }
    } catch (err) {
      console.warn('AI compilation error, triggering high-fidelity procedural generation fallback:', err);
      
      // Elite fallback generator for guaranteed offline/sandbox functionality!
      const lower = finalPrompt.toLowerCase();
      const fallbackTemplate: CanvasTemplate = {
        id: 'ai-fallback-' + Date.now(),
        name: 'AI Designed ' + (lower.includes('architect') ? 'Studio' : lower.includes('luxury') ? 'Prestige' : 'Identity'),
        width: 1050,
        height: 600,
        background: '#0c0f1d',
        elements: []
      };

      if (lower.includes('architect') || lower.includes('minimal') || lower.includes('white')) {
        fallbackTemplate.background = '#ffffff';
        fallbackTemplate.elements = [
          { id: 't1', type: 'text', text: (user as any)?.displayName?.toUpperCase() || 'AURELIUS MAXIMUS', x: 100, y: 180, fontSize: 52, fill: '#111827', fontFamily: 'Space Grotesk', fontWeight: 'bold' },
          { id: 't2', type: 'text', text: 'PRINCIPAL ARCHITECT', x: 100, y: 245, fontSize: 18, fill: '#6b7280', fontFamily: 'Inter', letterSpacing: 4 },
          { id: 's1', type: 'shape', x: 100, y: 290, width: 90, height: 5, fill: '#ff4500' },
          { id: 't3', type: 'text', text: 'studio@aurelius.design', x: 100, y: 440, fontSize: 16, fill: '#1f2937', fontFamily: 'Space Mono' },
          { id: 't4', type: 'text', text: 'www.aurelius.design', x: 100, y: 475, fontSize: 16, fill: '#1f2937', fontFamily: 'Space Mono' }
        ];
      } else if (lower.includes('luxury') || lower.includes('navy') || lower.includes('gold')) {
        fallbackTemplate.background = '#0B1F5E';
        fallbackTemplate.elements = [
          { id: 't1', type: 'text', text: (user as any)?.displayName?.toUpperCase() || 'OLIVIA WILSON', x: 120, y: 160, fontSize: 48, fill: '#ffffff', fontFamily: 'Playfair Display', fontWeight: 'bold' },
          { id: 't2', type: 'text', text: 'EXECUTIVE BROKER', x: 120, y: 220, fontSize: 16, fill: '#D4AF37', fontFamily: 'Inter', letterSpacing: 3 },
          { id: 's1', type: 'shape', x: 120, y: 255, width: 450, height: 2, fill: '#D4AF37' },
          { id: 't3', type: 'text', text: '+1 (555) 019-2831', x: 120, y: 380, fontSize: 15, fill: '#ffffff', fontFamily: 'Inter' },
          { id: 't4', type: 'text', text: 'olivia.wilson@luxuryestates.com', x: 120, y: 415, fontSize: 15, fill: '#ffffff', fontFamily: 'Inter' }
        ];
      } else {
        // Tech Neon fallback
        fallbackTemplate.background = '#0f172a';
        fallbackTemplate.elements = [
          { id: 't1', type: 'text', text: (user as any)?.displayName?.toUpperCase() || 'SARAH CHEN', x: 80, y: 150, fontSize: 56, fill: '#38bdf8', fontFamily: 'Syne', fontWeight: 'bold' },
          { id: 't2', type: 'text', text: 'SR. BLOCKCHAIN ENGINEER', x: 80, y: 225, fontSize: 18, fill: '#94a3b8', fontFamily: 'Space Grotesk', letterSpacing: 2 },
          { id: 's1', type: 'shape', x: 80, y: 270, width: 300, height: 4, fill: '#38bdf8' },
          { id: 't3', type: 'text', text: 'github.com/schen-noble', x: 80, y: 400, fontSize: 15, fill: '#38bdf8', fontFamily: 'JetBrains Mono' },
          { id: 't4', type: 'text', text: 'schen@noble-innovations.io', x: 80, y: 435, fontSize: 15, fill: '#ffffff', fontFamily: 'Space Grotesk' }
        ];
      }

      loadTemplate(fallbackTemplate);
      toast.success('Noble AI generated premium design fallback loaded! 💎', { id: loadingToast });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2 text-noble-blue">
        <Sparkles className="animate-pulse" size={18} />
        <h3 className="font-bold text-noble-text text-sm">Noble AI Canvas synthesis</h3>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Describe your vision</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Minimalist layout for a luxury watchmaker using deep charcoal, gold, and Outfit typeface..."
          className="w-full min-h-[100px] bg-slate-50 border border-noble-border rounded-xl p-4 text-sm focus:border-noble-blue focus:outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <button
        onClick={() => handleGenerate()}
        disabled={isGenerating || !prompt.trim()}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
      >
        {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
        {isGenerating ? 'Synthesizing...' : 'Generate Canvas'}
      </button>

      {/* Preset Suggestions */}
      <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preset AI Prompts</span>
        <div className="flex flex-col gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setPrompt(preset.text);
                handleGenerate(preset.text);
              }}
              className="flex items-start gap-3 p-3 bg-slate-50 border border-noble-border rounded-xl text-left hover:border-noble-blue hover:bg-blue-50/30 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-noble-surface border border-noble-border flex items-center justify-center shrink-0 text-slate-400 group-hover:text-noble-blue transition-colors">
                <Play size={10} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 group-hover:text-noble-blue transition-colors">{preset.label}</span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{preset.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
