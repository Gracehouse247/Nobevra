'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Markdown } from 'tiptap-markdown';
import { cmsApi } from '@/lib/cmsApi';
import MediaManager from './MediaManager';
import AISeoAnalyzer from './AISeoAnalyzer';
import { NoticeBlock } from './extensions/NoticeBlock';
import { CTABlock } from './extensions/CTABlock';
import { PricingTableBlock } from './extensions/PricingTableBlock';
import LinkSearchModal from './LinkSearchModal';
import {
  Bold, Italic, Underline, Strikethrough, Highlighter, Type, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, ListChecks, Quote, Code, Code2,
  Minus, Table as TableIcon, Image as ImageIcon, Undo, Redo, Link2, Save,
  Send, Eye, X, Plus, Loader2, Globe, Tag, ChevronDown, ChevronRight,
  Subscript as SubIcon, Superscript as SupIcon, Heading1, Heading2, Heading3,
  Heading4, Heading5, Heading6, Pilcrow, Palette, LayoutGrid, Settings2,
  Trash2, MoreHorizontal, ExternalLink, Copy, Check, AlertCircle, Info,
  Zap, FileText, BarChart2, Star, Sparkles, Megaphone, BellRing, DollarSign, Link2Off
} from 'lucide-react';
import Link from '@tiptap/extension-link';

// ─── Types ───────────────────────────────────────────────────────────────────
interface PostFormProps {
  initialData?: {
    id?: string;
    title?: string;
    content?: string;
    content_markdown?: string;
    excerpt?: string;
    cover_image?: string;
    featured_image_url?: string;
    meta_title?: string;
    meta_description?: string;
    slug?: string;
    tags?: string[];
  };
  onSaved?: () => void;
}

type SidebarTab = 'document' | 'block' | 'seo';
type ActivePanel = 'status' | 'cover' | 'seo' | 'tags' | 'excerpt' | null;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getImageUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('photo-')) return `https://images.unsplash.com/${url}?q=80&w=1200&auto=format&fit=crop`;
  return url;
};

const toSlug = (val: string) =>
  val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─── Mini Components ──────────────────────────────────────────────────────────
const Divider = () => <div className="w-px h-5 bg-slate-200 mx-0.5" />;

const ToolBtn = ({
  onClick, active, disabled, icon: Icon, title, danger = false
}: {
  onClick: () => void; active?: boolean; disabled?: boolean;
  icon: React.ElementType; title?: string; danger?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-1.5 rounded-md transition-all duration-150 text-xs flex-shrink-0
      ${danger ? 'hover:bg-red-50 hover:text-red-600' : ''}
      ${active
        ? 'bg-[#006970] text-white shadow-sm'
        : danger
          ? 'text-slate-500 hover:text-red-600 hover:bg-red-50'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
    `}
  >
    <Icon className="w-3.5 h-3.5" />
  </button>
);

const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <label className="flex items-center gap-1 cursor-pointer" title={label}>
    <div
      className="w-5 h-5 rounded border border-slate-300 overflow-hidden relative"
      style={{ backgroundColor: value || 'transparent' }}
    >
      <input
        type="color"
        value={value || '#000000'}
        onChange={e => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      />
    </div>
    <Palette className="w-3 h-3 text-slate-400" />
  </label>
);

const Select = ({ value, onChange, options, className = '' }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; className?: string;
}) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className={`text-xs border border-slate-200 rounded px-1.5 py-1 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#006970] ${className}`}
  >
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

const SidebarSection = ({ title, icon: Icon, children, defaultOpen = true }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Icon className="w-4 h-4 text-[#006970]" />
          {title}
        </span>
        {open ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
      </button>
      {open && <div className="border-t border-slate-100 px-4 py-4">{children}</div>}
    </div>
  );
};

// ─── Block Inserter Menu ───────────────────────────────────────────────────────
const BLOCK_TYPES = [
  { group: 'Text', items: [
    { icon: Pilcrow,       label: 'Paragraph',      action: (e: any) => e.chain().focus().setParagraph().run() },
    { icon: Heading1,      label: 'Heading 1',      action: (e: any) => e.chain().focus().toggleHeading({ level: 1 }).run() },
    { icon: Heading2,      label: 'Heading 2',      action: (e: any) => e.chain().focus().toggleHeading({ level: 2 }).run() },
    { icon: Heading3,      label: 'Heading 3',      action: (e: any) => e.chain().focus().toggleHeading({ level: 3 }).run() },
    { icon: Quote,         label: 'Blockquote',     action: (e: any) => e.chain().focus().toggleBlockquote().run() },
  ]},
  { group: 'Lists', items: [
    { icon: List,          label: 'Bullet List',    action: (e: any) => e.chain().focus().toggleBulletList().run() },
    { icon: ListOrdered,   label: 'Ordered List',   action: (e: any) => e.chain().focus().toggleOrderedList().run() },
    { icon: ListChecks,    label: 'Task List',      action: (e: any) => e.chain().focus().toggleTaskList().run() },
  ]},
  { group: 'Advanced', items: [
    { icon: TableIcon,     label: 'Table',          action: (e: any) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
    { icon: Code2,         label: 'Code Block',     action: (e: any) => e.chain().focus().toggleCodeBlock().run() },
    { icon: Minus,         label: 'Divider',        action: (e: any) => e.chain().focus().setHorizontalRule().run() },
  ]},
  { group: 'Business & Marketing', items: [
    { icon: BellRing,      label: 'Notice / Alert', action: (e: any) => e.chain().focus().insertContent('<div data-type="info"><p>Enter your notice here...</p></div>').run() },
    { icon: Megaphone,     label: 'CTA Banner',     action: (e: any) => e.chain().focus().insertContent('<div data-cta="true"></div>').run() },
    { icon: DollarSign,    label: 'Pricing Table',  action: (e: any) => e.chain().focus().insertContent('<div data-pricing="true"></div>').run() },
  ]},
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PostEditor({ initialData = {}, onSaved }: PostFormProps) {
  const [title, setTitle] = useState(initialData.title || '');
  const [excerpt, setExcerpt] = useState(initialData.excerpt || '');
  const [metaTitle, setMetaTitle] = useState(initialData.meta_title || '');
  const [metaDesc, setMetaDesc] = useState(initialData.meta_description || '');
  const [slug, setSlug] = useState(initialData.slug || '');
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState(initialData.featured_image_url || initialData.cover_image || '');
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'content' | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [highlightColor, setHighlightColor] = useState('#FFFF00');
  const [fontFamily, setFontFamily] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const insertMenuRef = useRef<HTMLDivElement>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'settings' | 'ai'>('settings');
  const [showLinkModal, setShowLinkModal] = useState(false);

  useEffect(() => { setHasMounted(true); }, []);

  // Close insert menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (insertMenuRef.current && !insertMenuRef.current.contains(e.target as Node)) {
        setShowInsertMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: { languageClassPrefix: 'language-' },
      }),
      Markdown,
      Placeholder.configure({ placeholder: 'Start writing your story… Press "/" to insert blocks.' }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontFamily,
      Subscript,
      Superscript,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      NoticeBlock,
      CTABlock,
      PricingTableBlock,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#006970] underline decoration-[#006970]/30 hover:decoration-[#006970] transition-colors cursor-pointer font-medium',
        },
      }),
    ],
    content: initialData.content_markdown || initialData.content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'noble-editor prose prose-slate max-w-none focus:outline-none min-h-[500px] text-slate-800',
      },
      handleKeyDown: (view, event) => {
        // We can handle specific keydowns here if needed
        return false;
      }
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
      setCharCount(text.length);

      // Detect "/link" slash command
      const { $head } = editor.state.selection;
      const textBeforeCursor = $head.parent.textContent.substring(0, $head.parentOffset);
      if (textBeforeCursor.endsWith('/link')) {
        // Delete the "/link" text
        editor.chain().focus().deleteRange({ from: $head.pos - 5, to: $head.pos }).run();
        setShowLinkModal(true);
      }
    },
  });

  const handleMediaSelect = (url: string) => {
    if (mediaTarget === 'cover') {
      setCoverImage(url);
    } else if (mediaTarget === 'content') {
      editor?.chain().focus().insertContent(
        `<img src="${url}" alt="Post image" class="noble-post-image" />`
      ).run();
    }
    setShowMediaModal(false);
    setMediaTarget(null);
  };

  const handleSave = async (status: 'draft' | 'published') => {
    const setter = status === 'published' ? setPublishing : setSaving;
    setter(true);
    setMessage(null);
    try {
      const payload = {
        title,
        content: (editor?.storage as any)?.markdown?.getMarkdown?.() || editor?.getHTML() || '',
        excerpt,
        cover_image: coverImage,
        meta_title: metaTitle || title,
        meta_description: metaDesc,
        slug: slug || toSlug(title),
        tags,
        status,
      };
      if (initialData.id) {
        await cmsApi.updatePost(String(initialData.id), payload);
      } else {
        await cmsApi.createPost(payload);
      }
      setMessage({ type: 'ok', text: status === 'published' ? 'Post published!' : 'Draft saved.' });
      if (onSaved) onSaved();
    } catch (err: any) {
      setMessage({ type: 'err', text: err.response?.data?.error || 'Failed to save post.' });
    } finally {
      setter(false);
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags(prev => [...new Set([...prev, tagInput.trim()])]);
      setTagInput('');
    }
  };
  const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

  // Insert table column/row helpers
  const tableActions = [
    { label: 'Add column before', action: () => editor?.chain().focus().addColumnBefore().run() },
    { label: 'Add column after', action: () => editor?.chain().focus().addColumnAfter().run() },
    { label: 'Delete column', action: () => editor?.chain().focus().deleteColumn().run() },
    { label: 'Add row before', action: () => editor?.chain().focus().addRowBefore().run() },
    { label: 'Add row after', action: () => editor?.chain().focus().addRowAfter().run() },
    { label: 'Delete row', action: () => editor?.chain().focus().deleteRow().run() },
    { label: 'Delete table', action: () => editor?.chain().focus().deleteTable().run() },
  ];

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#006970]" />
      </div>
    );
  }

  return (
    <div className="noble-editor-layout">
      {/* ── Top Toolbar ──────────────────────────────────────── */}
      <div className="noble-editor-topbar">
        <div className="flex items-center gap-1 flex-wrap">
          {/* History */}
          <ToolBtn onClick={() => editor?.chain().focus().undo().run()} icon={Undo} title="Undo" disabled={!editor?.can().undo()} />
          <ToolBtn onClick={() => editor?.chain().focus().redo().run()} icon={Redo} title="Redo" disabled={!editor?.can().redo()} />
          <Divider />

          {/* Block Type Selector */}
          <Select
            value={
              editor?.isActive('heading', { level: 1 }) ? 'h1' :
              editor?.isActive('heading', { level: 2 }) ? 'h2' :
              editor?.isActive('heading', { level: 3 }) ? 'h3' :
              editor?.isActive('heading', { level: 4 }) ? 'h4' :
              editor?.isActive('heading', { level: 5 }) ? 'h5' :
              editor?.isActive('heading', { level: 6 }) ? 'h6' :
              editor?.isActive('blockquote') ? 'blockquote' :
              editor?.isActive('codeBlock') ? 'code' :
              'paragraph'
            }
            onChange={(v) => {
              if (!editor) return;
              if (v === 'paragraph') editor.chain().focus().setParagraph().run();
              else if (v.startsWith('h')) editor.chain().focus().toggleHeading({ level: parseInt(v[1]) as any }).run();
              else if (v === 'blockquote') editor.chain().focus().toggleBlockquote().run();
              else if (v === 'code') editor.chain().focus().toggleCodeBlock().run();
            }}
            options={[
              { value: 'paragraph', label: 'Paragraph' },
              { value: 'h1', label: 'Heading 1' },
              { value: 'h2', label: 'Heading 2' },
              { value: 'h3', label: 'Heading 3' },
              { value: 'h4', label: 'Heading 4' },
              { value: 'h5', label: 'Heading 5' },
              { value: 'h6', label: 'Heading 6' },
              { value: 'blockquote', label: 'Blockquote' },
              { value: 'code', label: 'Code Block' },
            ]}
            className="w-32"
          />

          {/* Font Family */}
          <Select
            value={fontFamily}
            onChange={(v) => { setFontFamily(v); editor?.chain().focus().setFontFamily(v || '').run(); }}
            options={[
              { value: '', label: '— Default Font —' },
              // ── Sans-Serif ──
              { value: 'Inter, sans-serif',        label: 'Inter' },
              { value: 'Roboto, sans-serif',        label: 'Roboto' },
              { value: 'Montserrat, sans-serif',    label: 'Montserrat' },
              { value: 'Poppins, sans-serif',       label: 'Poppins' },
              { value: 'Lato, sans-serif',          label: 'Lato' },
              { value: 'Nunito, sans-serif',        label: 'Nunito' },
              { value: 'Open Sans, sans-serif',     label: 'Open Sans' },
              { value: 'Raleway, sans-serif',       label: 'Raleway' },
              { value: 'DM Sans, sans-serif',       label: 'DM Sans' },
              { value: 'Plus Jakarta Sans, sans-serif', label: 'Jakarta Sans' },
              // ── Serif ──
              { value: 'Georgia, serif',                label: 'Georgia' },
              { value: 'Playfair Display, serif',        label: 'Playfair Display' },
              { value: 'Merriweather, serif',            label: 'Merriweather' },
              { value: 'Lora, serif',                    label: 'Lora' },
              { value: 'Source Serif 4, serif',          label: 'Source Serif' },
              { value: 'EB Garamond, serif',             label: 'EB Garamond' },
              { value: 'Libre Baskerville, serif',       label: 'Libre Baskerville' },
              // ── Monospace ──
              { value: 'Courier New, monospace',     label: 'Courier New' },
              { value: 'Fira Code, monospace',       label: 'Fira Code' },
              { value: 'Space Mono, monospace',      label: 'Space Mono' },
              { value: 'JetBrains Mono, monospace',  label: 'JetBrains Mono' },
            ]}
            className="w-40"
          />
          <Divider />

          {/* Inline Formatting */}
          <ToolBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} icon={Bold} title="Bold (Ctrl+B)" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} icon={Italic} title="Italic (Ctrl+I)" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive('strike')} icon={Strikethrough} title="Strikethrough" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive('code')} icon={Code} title="Inline Code" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleSubscript().run()} active={editor?.isActive('subscript')} icon={SubIcon} title="Subscript" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleSuperscript().run()} active={editor?.isActive('superscript')} icon={SupIcon} title="Superscript" />
          <Divider />

          {/* Color */}
          <ColorPicker label="Text Color" value={textColor} onChange={(v) => { setTextColor(v); editor?.chain().focus().setColor(v).run(); }} />
          <ColorPicker label="Highlight" value={highlightColor} onChange={(v) => { setHighlightColor(v); editor?.chain().focus().toggleHighlight({ color: v }).run(); }} />
          <ToolBtn onClick={() => editor?.chain().focus().toggleHighlight({ color: highlightColor }).run()} active={editor?.isActive('highlight')} icon={Highlighter} title="Highlight" />
          <Divider />

          {/* Alignment */}
          <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })} icon={AlignLeft} title="Align Left" />
          <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })} icon={AlignCenter} title="Align Center" />
          <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })} icon={AlignRight} title="Align Right" />
          <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('justify').run()} active={editor?.isActive({ textAlign: 'justify' })} icon={AlignJustify} title="Justify" />
          <Divider />

          {/* Lists */}
          <ToolBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} icon={List} title="Bullet List" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} icon={ListOrdered} title="Ordered List" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleTaskList().run()} active={editor?.isActive('taskList')} icon={ListChecks} title="Task List" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} icon={Quote} title="Blockquote" />
          <Divider />

          {/* Insert Blocks */}
          <ToolBtn onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={TableIcon} title="Insert Table" />
          <ToolBtn onClick={() => editor?.chain().focus().setHorizontalRule().run()} icon={Minus} title="Insert Divider" />
          <ToolBtn onClick={() => { setMediaTarget('content'); setShowMediaModal(true); }} icon={ImageIcon} title="Insert Image" />
          <ToolBtn onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')} icon={Code2} title="Code Block" />
        </div>
      </div>

      {/* ── Editor Body ───────────────────────────────────────── */}
      <div className="noble-editor-body">
        {/* ── Canvas ── */}
        <div className="noble-editor-canvas">
          {/* Title */}
          <textarea
            value={title}
            onChange={(e) => { setTitle(e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
            placeholder="Post title…"
            rows={1}
            className="noble-title-input"
          />

          {/* Content Editor */}
          <div className="noble-editor-content-wrapper">
            {editor && (
              <>
                {/* Bubble Menu — appears on text selection */}
                <BubbleMenu
                  editor={editor}
                  options={{ placement: 'top' }}
                  className="noble-bubble-menu"
                >
                  <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={Bold} title="Bold" />
                  <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={Italic} title="Italic" />
                  <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} icon={Strikethrough} title="Strike" />
                  <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} icon={Code} title="Code" />
                  
                  <div className="w-px h-6 bg-slate-200 mx-1" />
      
                  <button
                    onClick={() => setShowLinkModal(true)}
                    className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${editor.isActive('link') ? 'text-[#006970] bg-[#006970]/10' : 'text-slate-600'}`}
                    title="Insert Link (/link)"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                  {editor.isActive('link') && (
                    <button
                      onClick={() => editor.chain().focus().unsetLink().run()}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"
                      title="Remove Link"
                    >
                      <Link2Off className="w-4 h-4" />
                    </button>
                  )}

                  <div className="w-px h-6 bg-slate-200 mx-1" />
                  <ToolBtn onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFF176' }).run()} active={editor.isActive('highlight')} icon={Highlighter} title="Highlight" />
                  <ToolBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} icon={AlignLeft} title="Left" />
                  <ToolBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} icon={AlignCenter} title="Center" />
                  <ToolBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} icon={AlignRight} title="Right" />
                </BubbleMenu>

                {/* Floating Menu — appears on empty line */}
                <FloatingMenu
                  editor={editor}
                  options={{ placement: 'left' }}
                  className="noble-floating-menu"
                >
                  <div ref={insertMenuRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setShowInsertMenu(o => !o)}
                      className="noble-insert-btn"
                      title="Insert block"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {showInsertMenu && (
                      <div className="noble-insert-dropdown">
                        {BLOCK_TYPES.map(group => (
                          <div key={group.group}>
                            <p className="noble-insert-group-label">{group.group}</p>
                            {group.items.map(item => (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() => { item.action(editor); setShowInsertMenu(false); }}
                                className="noble-insert-item"
                              >
                                <item.icon className="w-4 h-4 text-[#006970]" />
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FloatingMenu>
              </>
            )}
            <EditorContent editor={editor} />
          </div>

          {/* Table Toolbar — visible when cursor is inside table */}
          {editor?.isActive('table') && (
            <div className="noble-table-toolbar">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Table:</span>
              {tableActions.map(a => (
                <button key={a.label} type="button" onClick={a.action} className="noble-table-btn">{a.label}</button>
              ))}
            </div>
          )}

          {/* Word / Char Count */}
          <div className="noble-word-count">
            {wordCount} words · {charCount} characters
          </div>
        </div>

        {/* ── Sidebar ── */}
        <aside className="noble-sidebar flex flex-col h-full bg-white border-l border-slate-200">
          <div className="flex border-b border-slate-200 sticky top-0 bg-white z-10 flex-shrink-0">
            <button
              onClick={() => setActiveSidebarTab('settings')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeSidebarTab === 'settings' ? 'text-[#006970] border-b-2 border-[#006970]' : 'text-slate-400 hover:text-slate-700'}`}
            >
              Post Settings
            </button>
            <button
              onClick={() => setActiveSidebarTab('ai')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${activeSidebarTab === 'ai' ? 'text-[#006970] border-b-2 border-[#006970]' : 'text-slate-400 hover:text-slate-700'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI & SEO
            </button>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 bg-[#f8fafc]">
            {activeSidebarTab === 'settings' ? (
              <div className="p-4 flex flex-col gap-4">
                {/* Actions */}
                <SidebarSection title="Publish" icon={Send}>
                  {message && (
                    <div className={`flex items-center gap-2 text-xs rounded-lg p-2 mb-3 font-medium ${message.type === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {message.type === 'ok' ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                      {message.text}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleSave('draft')}
                      disabled={saving}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-semibold text-sm disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave('published')}
                      disabled={publishing}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#006970] hover:bg-[#005a60] text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
                    >
                      {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Publish
                    </button>
                  </div>
                </SidebarSection>

                {/* Cover Image */}
                <SidebarSection title="Cover Image" icon={ImageIcon}>
                  {coverImage ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden group">
                      <img src={getImageUrl(coverImage) as string} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" onClick={() => { setMediaTarget('cover'); setShowMediaModal(true); }} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all"><Plus className="w-4 h-4" /></button>
                        <button type="button" onClick={() => setCoverImage('')} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-100 transition-all"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setMediaTarget('cover'); setShowMediaModal(true); }}
                      className="w-full aspect-video rounded-lg border-2 border-dashed border-slate-200 hover:border-[#006970] hover:bg-[#f0fafa] transition-all flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#006970]"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Add Cover Image</span>
                    </button>
                  )}
                </SidebarSection>

                {/* Excerpt */}
                <SidebarSection title="Excerpt" icon={FileText} defaultOpen={false}>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    placeholder="Brief description shown in post previews…"
                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970] placeholder:text-slate-400"
                  />
                  <span className={`text-[10px] mt-1 block font-semibold ${excerpt.length > 200 ? 'text-red-500' : 'text-slate-400'}`}>{excerpt.length}/200</span>
                </SidebarSection>

                {/* SEO */}
                <SidebarSection title="SEO Settings" icon={Globe} defaultOpen={false}>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">URL Slug</label>
                      <input
                        value={slug || toSlug(title)}
                        onChange={e => setSlug(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">Meta Title</label>
                      <input
                        value={metaTitle}
                        onChange={e => setMetaTitle(e.target.value)}
                        placeholder={title || 'SEO title…'}
                        className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970]"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-[9px] text-slate-400">Recommended: 50–60 chars</span>
                        <span className={`text-[9px] font-bold ${metaTitle.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>{metaTitle.length}/60</span>
                      </div>
                      {/* SERP Preview */}
                      <div className="mt-2 bg-white border border-slate-200 rounded-md p-3">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">SERP Preview</p>
                        <p className="text-blue-600 text-xs font-medium leading-tight truncate">{metaTitle || title || 'Post Title'}</p>
                        <p className="text-green-700 text-[10px]">nobleinvoice.com/{slug || toSlug(title) || 'post-slug'}</p>
                        <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2">{metaDesc || 'Meta description will appear here…'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">Meta Description</label>
                      <textarea
                        rows={3}
                        value={metaDesc}
                        onChange={e => setMetaDesc(e.target.value)}
                        placeholder="Compelling description that appears in search results…"
                        className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970]"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-[9px] text-slate-400">Recommended: 150–160 chars</span>
                        <span className={`text-[9px] font-bold ${metaDesc.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>{metaDesc.length}/160</span>
                      </div>
                    </div>
                  </div>
                </SidebarSection>

                {/* Tags */}
                <SidebarSection title="Tags" icon={Tag} defaultOpen={false}>
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder="Type a tag and press Enter…"
                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970] mb-2"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(t => (
                      <span
                        key={t}
                        onClick={() => removeTag(t)}
                        className="px-2 py-0.5 bg-[#f0fafa] border border-[#b9cacb] text-[#005a60] text-xs rounded-full cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all flex items-center gap-1"
                      >
                        {t}
                        <X className="w-2.5 h-2.5" />
                      </span>
                    ))}
                  </div>
                </SidebarSection>

                {/* Stats */}
                <SidebarSection title="Document Info" icon={BarChart2} defaultOpen={false}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Words', value: wordCount },
                      { label: 'Characters', value: charCount },
                      { label: 'Reading Time', value: `${Math.max(1, Math.ceil(wordCount / 200))} min` },
                      { label: 'Paragraphs', value: '—' },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-50 rounded-lg p-2.5 text-center">
                        <p className="text-lg font-bold text-[#006970]">{s.value}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </SidebarSection>
              </div>
            ) : (
              <div className="h-full">
                <AISeoAnalyzer
                  title={title}
                  content={editor?.getText() || ''}
                  metaTitle={metaTitle}
                  metaDescription={metaDesc}
                  slug={slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  wordCount={wordCount}
                  onInsertContent={(html) => editor?.chain().focus().insertContent(html).run()}
                />
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ── Internal Linking Modal ─────────────────────────── */}
      <LinkSearchModal 
        isOpen={showLinkModal} 
        onClose={() => setShowLinkModal(false)}
        onSelect={(url, title) => {
          if (editor) {
            // If text is selected, just link it. If not, insert the title as text and link it.
            const { empty } = editor.state.selection;
            if (empty) {
              editor.chain().focus().insertContent(`<a href="${url}">${title}</a>`).run();
            } else {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }
          setShowLinkModal(false);
        }}
      />

      {/* ── Media Manager Modal ──────────────────────────────── */}
      {showMediaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white border border-slate-200 w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Media Library</h2>
                <p className="text-sm text-slate-500 mt-0.5">Select an image to insert</p>
              </div>
              <button type="button" onClick={() => setShowMediaModal(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-hidden">
              <MediaManager allowSelection onSelect={handleMediaSelect} />
            </div>
          </div>
        </div>
      )}

      {/* ── Editor Styles ────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700;900&family=Nunito:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Raleway:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&family=Merriweather:wght@300;400;700;900&family=Lora:wght@400;500;600;700&family=Source+Serif+4:wght@300;400;600;700&family=EB+Garamond:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Fira+Code:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

        .noble-editor-layout {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f8fafc;
        }

        .noble-editor-topbar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .noble-editor-body {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .noble-editor-canvas {
          flex: 1;
          overflow-y: auto;
          padding: 40px 60px;
          position: relative;
        }

        .noble-title-input {
          width: 100%;
          background: transparent;
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          border: none;
          outline: none;
          resize: none;
          line-height: 1.2;
          padding-bottom: 1.5rem;
          margin-bottom: 1rem;
          border-bottom: 2px solid #e2e8f0;
          font-family: inherit;
          overflow: hidden;
        }
        .noble-title-input::placeholder { color: #94a3b8; }
        .noble-title-input:focus { border-bottom-color: #006970; }

        .noble-editor-content-wrapper {
          position: relative;
        }

        /* Editor content styles */
        .noble-editor .ProseMirror {
          outline: none;
          padding: 8px 0 60px;
        }

        .noble-editor .ProseMirror > * + * { margin-top: 0.75em; }

        .noble-editor .ProseMirror h1 { font-size: 2em; font-weight: 800; color: #0f172a; line-height: 1.2; margin: 1.5em 0 0.5em; }
        .noble-editor .ProseMirror h2 { font-size: 1.5em; font-weight: 700; color: #1e293b; line-height: 1.3; margin: 1.25em 0 0.4em; }
        .noble-editor .ProseMirror h3 { font-size: 1.25em; font-weight: 700; color: #334155; margin: 1em 0 0.4em; }
        .noble-editor .ProseMirror h4 { font-size: 1.1em; font-weight: 600; color: #475569; margin: 0.8em 0 0.3em; }
        .noble-editor .ProseMirror h5, .noble-editor .ProseMirror h6 { font-size: 1em; font-weight: 600; color: #64748b; margin: 0.8em 0 0.3em; }

        .noble-editor .ProseMirror p { color: #334155; line-height: 1.8; }

        .noble-editor .ProseMirror blockquote {
          border-left: 4px solid #006970;
          background: #f0fafa;
          margin: 1.5em 0;
          padding: 1em 1.25em;
          border-radius: 0 8px 8px 0;
          color: #006970;
          font-style: italic;
        }

        .noble-editor .ProseMirror code {
          background: #f1f5f9;
          color: #0f172a;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.875em;
          font-family: 'Courier New', monospace;
        }

        .noble-editor .ProseMirror pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.25em 1.5em;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5em 0;
          font-size: 0.875em;
          line-height: 1.7;
        }
        .noble-editor .ProseMirror pre code { background: none; color: inherit; padding: 0; }

        .noble-editor .ProseMirror hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 2em 0;
        }

        .noble-editor .ProseMirror ul, .noble-editor .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.75em 0;
        }
        .noble-editor .ProseMirror li { margin: 0.3em 0; color: #334155; line-height: 1.7; }

        /* Task list */
        .noble-editor .ProseMirror ul[data-type="taskList"] { list-style: none; padding-left: 0.5em; }
        .noble-editor .ProseMirror ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 0.6em; }
        .noble-editor .ProseMirror ul[data-type="taskList"] li > label { margin-top: 3px; }
        .noble-editor .ProseMirror ul[data-type="taskList"] li input[type="checkbox"] { width: 1em; height: 1em; accent-color: #006970; cursor: pointer; }

        /* Table */
        .noble-editor .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5em 0;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .noble-editor .ProseMirror th {
          background: #f0fafa;
          color: #006970;
          font-weight: 700;
          padding: 10px 14px;
          text-align: left;
          border: 1px solid #d1e8e9;
          font-size: 0.8em;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .noble-editor .ProseMirror td {
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          vertical-align: top;
          font-size: 0.9em;
          color: #334155;
        }
        .noble-editor .ProseMirror tr:hover td { background: #f8fafc; }
        .noble-editor .ProseMirror .selectedCell { background: #e0f4f5 !important; }

        /* Images */
        .noble-editor .ProseMirror img,
        .noble-post-image {
          max-width: 100%;
          border-radius: 12px;
          margin: 1.5em 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        /* Placeholder */
        .noble-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          float: left;
          height: 0;
        }

        /* Highlight */
        .noble-editor .ProseMirror mark { border-radius: 2px; padding: 0 2px; }

        /* Bubble Menu */
        .noble-bubble-menu {
          display: flex;
          align-items: center;
          gap: 2px;
          background: #1e293b;
          border-radius: 10px;
          padding: 6px 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
        .noble-bubble-menu button {
          color: #cbd5e1 !important;
          background: transparent !important;
        }
        .noble-bubble-menu button:hover { background: rgba(255,255,255,0.1) !important; color: white !important; }
        .noble-bubble-menu button.bg-\[#006970\] { background: #006970 !important; color: white !important; }

        /* Floating + Button */
        .noble-floating-menu { position: relative; }
        .noble-insert-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          background: white;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .noble-insert-btn:hover { border-color: #006970; color: #006970; background: #f0fafa; transform: scale(1.1); }

        .noble-insert-dropdown {
          position: absolute;
          left: 36px;
          top: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          min-width: 200px;
          z-index: 100;
          padding: 8px;
          overflow: hidden;
        }
        .noble-insert-group-label {
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          padding: 4px 8px 2px;
        }
        .noble-insert-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #334155;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
        }
        .noble-insert-item:hover { background: #f0fafa; color: #006970; }

        /* Table toolbar */
        .noble-table-toolbar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          background: #fff8e1;
          border: 1px solid #ffe082;
          border-radius: 8px;
          padding: 6px 12px;
          margin-top: 8px;
        }
        .noble-table-btn {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
          background: white;
          border: 1px solid #e2e8f0;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }
        .noble-table-btn:hover { background: #006970; color: white; border-color: #006970; }

        /* Word count */
        .noble-word-count {
          font-size: 11px;
          color: #94a3b8;
          text-align: right;
          padding: 8px 0 4px;
          font-weight: 500;
        }

        .noble-sidebar {
          width: 320px;
          flex-shrink: 0;
          background: #f8fafc;
        }

        @media (max-width: 1024px) {
          .noble-editor-canvas { padding: 24px 20px; }
          .noble-sidebar { width: 300px; }
        }

        @media (max-width: 768px) {
          .noble-editor-body { flex-direction: column; }
          .noble-sidebar { width: 100%; border-left: none; border-top: 1px solid #e2e8f0; }
          .noble-editor-canvas { padding: 20px 16px; }
          .noble-title-input { font-size: 1.75rem; }
        }
      `}</style>
    </div>
  );
}
