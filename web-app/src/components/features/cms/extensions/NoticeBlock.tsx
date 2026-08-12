import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const NoticeComponent = (props: any) => {
  const { node, updateAttributes } = props;
  const type = node.attrs.type as 'info' | 'warning' | 'success' | 'error';

  const config = {
    info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', iconColor: 'text-amber-500' },
    success: { icon: CheckCircle, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500' },
    error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
  }[type] || { icon: Info, bg: 'bg-slate-50', border: 'border-noble-border', text: 'text-slate-800', iconColor: 'text-slate-500' };

  const Icon = config.icon;

  return (
    <NodeViewWrapper className="noble-notice-block" style={{ margin: '1.5rem 0' }} data-type={type}>
      <div
        className={`relative flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border} transition-all`}
        contentEditable="false"
      >
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className={`flex-1 ${config.text} text-sm leading-relaxed`}>
          <NodeViewContent className="outline-none" />
        </div>

        {/* Floating controls (only visible when focused/hovered in editor) */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 bg-noble-surface/80 backdrop-blur shadow-sm rounded-md border border-noble-border p-1 z-10" contentEditable="false">
          {(['info', 'success', 'warning', 'error'] as const).map(t => (
            <button
              key={t}
              type="button"
              className={`w-4 h-4 rounded-full border-2 ${t === type ? 'border-slate-800' : 'border-transparent'} hover:scale-110 transition-transform ${
                t === 'info' ? 'bg-blue-400' : t === 'success' ? 'bg-emerald-400' : t === 'warning' ? 'bg-amber-400' : 'bg-red-400'
              }`}
              onClick={() => updateAttributes({ type: t })}
              title={t}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        .noble-notice-block { display: block; position: relative; }
        .noble-notice-block:hover .absolute.top-2.right-2 { opacity: 1; }
      `}</style>
    </NodeViewWrapper>
  );
};

export const NoticeBlock = Node.create({
  name: 'noticeBlock',
  group: 'block',
  content: 'inline*',
  
  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => ({ 'data-type': attributes.type }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type]' }];
  },

  renderHTML({ HTMLAttributes }) {
    // When rendering for output (public site), render clean HTML
    const type = HTMLAttributes['data-type'] || 'info';
    return ['div', mergeAttributes(HTMLAttributes, { class: `notice notice-${type}` }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(NoticeComponent);
  },
});
