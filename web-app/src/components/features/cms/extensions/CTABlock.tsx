import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import React, { useState } from 'react';
import { Link, ExternalLink, Settings } from 'lucide-react';

const CTAComponent = (props: any) => {
  const { node, updateAttributes } = props;
  const [editing, setEditing] = useState(false);

  const buttonText = node.attrs.buttonText || 'Click Here';
  const buttonUrl = node.attrs.buttonUrl || '#';
  const headline = node.attrs.headline || 'Ready to level up?';
  const subheadline = node.attrs.subheadline || 'Join thousands of users growing their business today.';
  const color = node.attrs.color || '#006970';

  return (
    <NodeViewWrapper className="noble-cta-block group" style={{ margin: '2rem 0' }}>
      <div 
        contentEditable="false"
        className="relative overflow-hidden rounded-2xl border border-noble-border bg-noble-surface p-8 sm:p-10 text-center shadow-sm transition-all hover:shadow-md"
      >
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#006970]/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#006970]/10 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
        
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          {editing ? (
            <input 
              value={headline}
              onChange={(e) => updateAttributes({ headline: e.target.value })}
              className="text-2xl sm:text-3xl font-extrabold text-noble-text mb-2 w-full text-center bg-slate-50 border-b border-slate-300 outline-none px-2 py-1"
              placeholder="Headline..."
              autoFocus
            />
          ) : (
            <h3 className="text-2xl sm:text-3xl font-extrabold text-noble-text mb-3 tracking-tight">
              {headline}
            </h3>
          )}

          {editing ? (
            <textarea
              value={subheadline}
              onChange={(e) => updateAttributes({ subheadline: e.target.value })}
              className="text-base sm:text-lg text-slate-600 mb-6 w-full text-center bg-slate-50 border-b border-slate-300 outline-none px-2 py-1 resize-none"
              placeholder="Subheadline..."
              rows={2}
            />
          ) : (
            <p className="text-base sm:text-lg text-slate-600 mb-8 font-medium">
              {subheadline}
            </p>
          )}

          {editing ? (
            <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-md bg-slate-50 p-3 rounded-lg border border-noble-border">
              <div className="flex-1 w-full">
                <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">Button Text</label>
                <input
                  value={buttonText}
                  onChange={(e) => updateAttributes({ buttonText: e.target.value })}
                  className="w-full text-sm border border-noble-border rounded px-2 py-1.5 outline-none"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">URL / Link</label>
                <input
                  value={buttonUrl}
                  onChange={(e) => updateAttributes({ buttonUrl: e.target.value })}
                  className="w-full text-sm border border-noble-border rounded px-2 py-1.5 outline-none"
                  placeholder="https://..."
                />
              </div>
              <button 
                onClick={() => setEditing(false)}
                className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 bg-[#006970] text-white text-xs font-bold rounded-md hover:bg-[#005a60]"
              >
                Done
              </button>
            </div>
          ) : (
            <a 
              href={buttonUrl}
              onClick={(e) => e.preventDefault()} // Prevent nav in editor
              style={{ backgroundColor: color }}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-bold text-sm sm:text-base transition-transform hover:scale-105 hover:shadow-lg shadow-md gap-2"
            >
              {buttonText}
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          )}
        </div>

        {/* Floating Settings Button */}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 p-2 bg-noble-surface/80 backdrop-blur border border-noble-border text-slate-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-100 hover:text-noble-text shadow-sm"
            title="Edit CTA settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <style>{`
        .noble-cta-block { display: block; position: relative; }
      `}</style>
    </NodeViewWrapper>
  );
};

export const CTABlock = Node.create({
  name: 'ctaBlock',
  group: 'block',
  atom: true, // It's an isolated interactive component
  
  addAttributes() {
    return {
      headline: { default: 'Ready to level up?' },
      subheadline: { default: 'Join thousands of users growing their business today.' },
      buttonText: { default: 'Click Here' },
      buttonUrl: { default: '#' },
      color: { default: '#006970' },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-cta]' }];
  },

  renderHTML({ HTMLAttributes }) {
    // Basic fallback HTML rendering for the frontend if they don't have custom React renderer there
    return ['div', mergeAttributes(HTMLAttributes, { class: 'marketing-cta-banner', 'data-cta': 'true' }), 
      ['h3', {}, HTMLAttributes.headline],
      ['p', {}, HTMLAttributes.subheadline],
      ['a', { href: HTMLAttributes.buttonUrl, style: `background-color: ${HTMLAttributes.color}` }, HTMLAttributes.buttonText]
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CTAComponent);
  },
});
