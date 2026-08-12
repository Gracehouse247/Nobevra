import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import React, { useState } from 'react';
import { Check, Settings, Zap } from 'lucide-react';

const PricingComponent = (props: any) => {
  const { node, updateAttributes } = props;
  const [editing, setEditing] = useState(false);

  const planName = node.attrs.planName || 'Pro Plan';
  const price = node.attrs.price || '$49';
  const period = node.attrs.period || '/month';
  const description = node.attrs.description || 'Perfect for growing businesses and professional agencies.';
  const features = node.attrs.features || ['Unlimited Invoices', 'Custom Branding', 'Priority Support'];
  const buttonText = node.attrs.buttonText || 'Get Started';
  const buttonUrl = node.attrs.buttonUrl || '#';
  const highlight = node.attrs.highlight || false;

  const toggleFeature = (index: number) => {
    // In edit mode we can remove a feature, but for simplicity let's just let them type comma separated list in settings
  };

  return (
    <NodeViewWrapper className="noble-pricing-block group" style={{ margin: '2rem auto', maxWidth: '380px' }}>
      <div 
        contentEditable="false"
        className={`relative overflow-hidden rounded-2xl bg-noble-surface border-2 transition-all hover:shadow-xl ${
          highlight ? 'border-[#006970] shadow-lg shadow-[#006970]/10 scale-105' : 'border-noble-border'
        }`}
      >
        {highlight && (
          <div className="absolute top-0 inset-x-0 bg-[#006970] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 text-center flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" /> Most Popular
          </div>
        )}

        <div className={`p-8 ${highlight ? 'pt-10' : ''}`}>
          {editing ? (
            <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-noble-border mb-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Plan Name</label>
                <input value={planName} onChange={e => updateAttributes({ planName: e.target.value })} className="w-full text-sm border border-noble-border rounded px-2 py-1 outline-none" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Price</label>
                  <input value={price} onChange={e => updateAttributes({ price: e.target.value })} className="w-full text-sm border border-noble-border rounded px-2 py-1 outline-none" />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Period</label>
                  <input value={period} onChange={e => updateAttributes({ period: e.target.value })} className="w-full text-sm border border-noble-border rounded px-2 py-1 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Description</label>
                <textarea value={description} onChange={e => updateAttributes({ description: e.target.value })} className="w-full text-sm border border-noble-border rounded px-2 py-1 outline-none resize-none" rows={2} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Features (comma separated)</label>
                <textarea 
                  value={features.join(', ')} 
                  onChange={e => updateAttributes({ features: e.target.value.split(',').map((f: string) => f.trim()).filter(Boolean) })}
                  className="w-full text-sm border border-noble-border rounded px-2 py-1 outline-none resize-none" rows={2} 
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" id="highlight-toggle" checked={highlight} onChange={e => updateAttributes({ highlight: e.target.checked })} />
                <label htmlFor="highlight-toggle" className="text-xs font-semibold text-slate-700">Highlight as "Most Popular"</label>
              </div>
              <button onClick={() => setEditing(false)} className="w-full mt-2 px-4 py-2 bg-[#006970] text-white text-xs font-bold rounded-md hover:bg-[#005a60]">Done</button>
            </div>
          ) : (
            <>
              <h4 className="text-lg font-bold text-slate-800">{planName}</h4>
              <p className="text-sm text-slate-500 mt-2 min-h-[40px] leading-relaxed">{description}</p>
              
              <div className="my-6">
                <span className="text-4xl font-extrabold text-noble-text">{price}</span>
                <span className="text-slate-500 font-medium ml-1">{period}</span>
              </div>

              <a 
                href={buttonUrl}
                onClick={e => e.preventDefault()}
                className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${
                  highlight 
                    ? 'bg-[#006970] text-white hover:bg-[#005a60] hover:shadow-lg' 
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {buttonText}
              </a>

              <div className="mt-8 space-y-4">
                {features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-0.5 ${highlight ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      <Check className={`w-3.5 h-3.5 ${highlight ? 'text-emerald-600' : 'text-slate-500'}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Floating Settings Button */}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 p-2 bg-noble-surface/80 backdrop-blur border border-noble-border text-slate-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-100 hover:text-noble-text shadow-sm"
            title="Edit Pricing settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export const PricingTableBlock = Node.create({
  name: 'pricingTableBlock',
  group: 'block',
  atom: true,
  
  addAttributes() {
    return {
      planName: { default: 'Pro Plan' },
      price: { default: '$49' },
      period: { default: '/month' },
      description: { default: 'Perfect for growing businesses and professional agencies.' },
      features: { default: ['Unlimited Invoices', 'Custom Branding', 'Priority Support'] },
      buttonText: { default: 'Get Started' },
      buttonUrl: { default: '#' },
      highlight: { default: false },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-pricing]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'marketing-pricing-table', 'data-pricing': 'true' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PricingComponent);
  },
});
