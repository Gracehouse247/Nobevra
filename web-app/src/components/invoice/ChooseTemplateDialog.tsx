'use client';

import React, { useState, useMemo, useRef } from 'react';
import { 
  X, Check, Star, Layout, Briefcase, Palette, Box, Diamond, 
  Search, ArrowRight, Sparkles, Lock, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  INVOICE_TEMPLATE_CATEGORIES, 
  INVOICE_TEMPLATES, 
  TemplateCategory, 
  TemplateDefinition 
} from '@/lib/templates/templateRegistry';
import Image from 'next/image';
import { TemplateEngine } from './TemplateEngine';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useCurrency } from '@/context/CurrencyContext';
import { pricingService } from '@/lib/services/supabaseService';
import PremiumBadge from '../shared/PremiumBadge';
import PaygUnlockModal, { usePaygBundle } from '../features/billing/PaygUnlockModal';
import { useUpgradeModal } from '@/context/UpgradeModalContext';

/* ─────────────────────────────────────────────────────────────────────────────
   Mock invoice data for live template previews
───────────────────────────────────────────────────────────────────────────── */
const MOCK_DATA = {
  invoiceNumber: 'INV-2026-001',
  date: '24 Aug 2026',
  dueDate: '07 Sep 2026',
  sender: {
    full_name: 'Noble Studio',
    address: '100 Innovation Drive\nTech District, NY 10001',
    email: 'billing@noblestudio.com',
    phone_number: '+1 (555) 123-4567',
  },
  client: {
    name: 'Acme Corp',
    address: '400 Business Pkwy\nSuite 200, CA 94016',
    email: 'accounts@acme.corp',
  },
  items: [{ name: 'Premium Design Services', quantity: 1, price: 4005.0 }],
  subtotal: 4005.0,
  taxTotal: 0,
  discountTotal: 150,
  total: 3855.0,
  currencySymbol: '',
  currencyCode: '',
  currencySymbolOverride: null as string | null,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Category icon map
───────────────────────────────────────────────────────────────────────────── */
const CategoryIcon = ({ id, className = 'w-4 h-4' }: { id: string; className?: string }) => {
  switch (id) {
    case 'recommended': return <Star className={className} />;
    case 'essentials':  return <Layout className={className} />;
    case 'professional':return <Briefcase className={className} />;
    case 'creative':    return <Palette className={className} />;
    case 'geometric':   return <Box className={className} />;
    case 'platinum':    return <Diamond className={className} />;
    default:            return <Layout className={className} />;
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   NEW badge — shown on recently-added premium templates
───────────────────────────────────────────────────────────────────────────── */
const NEW_TEMPLATE_IDS = new Set([
  'prof-purple-gradient', 'prof-teal-minimal', 'prof-corporate-blue',
]);

/* ─────────────────────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────────────────────── */
interface ChooseTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: TemplateDefinition) => void;
  selectedTemplateId?: string;
  /** Optional overrides — if omitted, auto-detected via useCurrency */
  currencySymbol?: string;
  currencyCode?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
export const ChooseTemplateDialog: React.FC<ChooseTemplateDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedTemplateId,
  currencySymbol: symbolProp,
  currencyCode: codeProp,
}) => {
  /* Auth & currency */
  const { user, userData } = useAuth();
  const { currencyCode: ctxCode, currencySymbol: ctxSymbol } = useCurrency();
  const { canUse } = useEntitlements();

  const currencySymbol = symbolProp ?? ctxSymbol ?? '₦';
  const currencyCode   = codeProp   ?? ctxCode   ?? 'NGN';

  /* State */
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('recommended');
  const [searchQuery, setSearchQuery]         = useState('');
  const [unitPrice, setUnitPrice]             = useState<number | null>(null);
  const [unlockTemplate, setUnlockTemplate]   = useState<TemplateDefinition | null>(null);
  const [hoveredId, setHoveredId]             = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isPremiumLocked = !canUse('template.premium');
  const { hasUnlockedTemplate } = useEntitlements();
  const paygBundle = usePaygBundle(user?.id);
  const { openUpgradeModal } = useUpgradeModal();

  React.useEffect(() => {
    pricingService.getTemplatePrice().then(setUnitPrice);
  }, []);

  /* Live-preview data enriched with currency */
  const mockDataWithCurrency = useMemo(
    () => ({
      ...MOCK_DATA,
      currencySymbol,
      sender: { ...MOCK_DATA.sender, preferred_currency: currencyCode },
    }),
    [currencySymbol, currencyCode],
  );

  /* Filtered templates */
  const filteredTemplates = useMemo(() => {
    return INVOICE_TEMPLATES.filter((t) => {
      const matchesCategory = t.category.includes(activeCategory);
      const matchesSearch   = t.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  /* Template click handler — handles PAYG unlock flow */
  const handleTemplateClick = (template: TemplateDefinition) => {
    if (template.isPremium && !hasUnlockedTemplate(template.id)) {
      if (user) {
        // Already purchased via PAYG → allow
        if (paygBundle.hasAccess('invoice', template.id)) { onSelect(template); return; }
        // Has credits → redeem one
        if (paygBundle.state.credits.invoiceTemplates > 0) {
          if (paygBundle.redeemCredit('invoice', template.id)) { onSelect(template); return; }
        }
      }
      // Open the PAYG buy modal so user can purchase this single template
      setUnlockTemplate(template);
    } else {
      onSelect(template);
    }
  };

  if (!isOpen) return null;

  const totalCount = INVOICE_TEMPLATES.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Dialog shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-[800px] bg-noble-surface rounded-2xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)] flex flex-col border border-noble-border/80"
          style={{ height: '85vh', maxHeight: '85vh' }}
        >

          {/* ── Header — always visible, never clipped ─────────────────── */}
          <div className="shrink-0 bg-noble-surface border-b border-slate-150 rounded-t-2xl overflow-hidden">

            {/* Top row: title + search + close */}
            <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-4">

              {/* Title block */}
              <div>
                <h2 className="text-[19px] font-black text-[#0F172A] leading-tight tracking-tight">
                  Choose Your Invoice
                </h2>
                <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                  Select from 180+ professionally designed invoice templates.
                </p>
              </div>

              {/* Search + close */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative group hidden sm:flex items-center">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#166FBB] transition-colors pointer-events-none" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-48 pl-9 pr-8 bg-[#F8FAFC] border border-noble-border rounded-xl text-[12px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#166FBB] focus:bg-noble-surface focus:ring-2 focus:ring-[#166FBB]/10 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all shrink-0"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Category tab row */}
            <div className="flex items-center gap-0 overflow-x-auto no-scrollbar border-t border-slate-100 px-3">
              {INVOICE_TEMPLATE_CATEGORIES.map((cat) => {
                const isActive = activeCategory === (cat.id as TemplateCategory);
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id as TemplateCategory); setSearchQuery(''); }}
                    className={`relative flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'text-[#166FBB]'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <CategoryIcon id={cat.id} className="w-3.5 h-3.5 shrink-0" />
                    {cat.label}
                    {isActive && (
                      <motion.div
                        layoutId="templateTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#166FBB] rounded-t-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Grid area ─────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto bg-noble-surface px-5 py-4 no-scrollbar min-h-0">
            
                      {/* Row header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[13px] font-bold text-slate-800">
                          {searchQuery
                            ? `${filteredTemplates.length} result${filteredTemplates.length !== 1 ? 's' : ''} for "${searchQuery}"`
                            : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} for you`}
                        </h3>
                        <span className="text-[12px] font-bold text-slate-400">180+ templates</span>
                      </div>

            {/* Template grid */}
            <AnimatePresence mode="wait">
              {filteredTemplates.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Search className="w-7 h-7 text-slate-300" />
                  </div>
                  <p className="text-[15px] font-black text-slate-700 mb-1">No templates found</p>
                  <p className="text-[13px] text-slate-400 font-medium">
                    Try a different search term or browse another category.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('recommended'); }}
                    className="mt-5 px-5 py-2.5 bg-[#166FBB] text-white text-[13px] font-bold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Show all templates
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 lg:gap-3"
                >
                  {filteredTemplates.map((template, index) => {
                    const isSelected   = selectedTemplateId === template.id;
                    const isHovered    = hoveredId === template.id;
                    const isLocked     = template.isPremium && !hasUnlockedTemplate(template.id) && !paygBundle.hasAccess('invoice', template.id);
                    const isNew        = NEW_TEMPLATE_IDS.has(template.id);

                    return (
                      <motion.div
                        key={template.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.018, 0.3) }}
                        onClick={() => handleTemplateClick(template)}
                        onMouseEnter={() => setHoveredId(template.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`group relative aspect-[1/1.414] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'ring-2 ring-[#166FBB] ring-offset-2 shadow-[0_4px_20px_rgba(22,111,187,0.25)]'
                            : 'border border-noble-border/70 hover:border-[#166FBB]/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]'
                        }`}
                      >
                        {/* Live template preview */}
                        <div className="absolute inset-0 bg-noble-surface">
                          {template.thumbnail === '/placeholder.png' ? (
                            <div className="absolute inset-0 bg-noble-surface overflow-hidden">
                              <div
                                className="absolute top-0 left-0 origin-top-left"
                                style={{ width: 794, height: 1123, transform: 'scale(0.145)' }}
                              >
                                <TemplateEngine template={template} data={mockDataWithCurrency} />
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={template.thumbnail}
                              alt={template.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>

                        {/* ── Selected checkmark — top-right, highest priority ── */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 z-30 w-6 h-6 bg-[#166FBB] rounded-full flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                        )}

                        {/* ── NEW badge — top-left ── */}
                        {isNew && (
                          <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 bg-emerald-500 text-white rounded-md shadow">
                            <span className="text-[8px] font-black uppercase tracking-wider leading-none">New</span>
                          </div>
                        )}

                        {/* ── Premium badge — only for free users on premium templates ── */}
                        {template.isPremium && !hasUnlockedTemplate(template.id) && !isSelected && (
                          <div className="absolute top-1.5 right-1.5 z-20">
                            <PremiumBadge tier="pulse" iconOnly />
                          </div>
                        )}

                        {/* Hover overlay */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="absolute inset-0 z-10 bg-[#0F172A]/50 backdrop-blur-[1.5px] flex flex-col items-center justify-center gap-2 px-2"
                            >
                              <button className="w-full px-2 py-1.5 bg-[#166FBB] text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-lg">
                                {isLocked ? `Unlock · $${unitPrice?.toFixed(2) ?? '–'}` : 'Select'}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Template name label */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 bg-noble-surface/95 backdrop-blur-sm px-2 pt-1.5 pb-1.5 border-t border-slate-100/80">
                          <p className="text-[9.5px] font-bold text-slate-800 text-center truncate leading-tight">{template.name}</p>
                          {template.isPremium && !hasUnlockedTemplate(template.id) && (
                            <p className="text-[8px] font-bold text-amber-600 text-center leading-none mt-0.5 uppercase tracking-wide">Premium</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Footer ────────────────────────────────────────────────── */}
          <div className="shrink-0 px-5 py-3 bg-noble-surface border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Community social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-lg border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <Image src={`https://i.pravatar.cc/150?u=nbl${i}`} alt="user" width={32} height={32} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest leading-tight">
                  Global Community
                </p>
                <p className="text-[11px] text-slate-400 font-medium leading-tight">
                  Join thousands of businesses using Noble templates.
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-7 py-3 bg-[#166FBB] text-white font-black text-[13px] rounded-xl hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(22,111,187,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Continue to Editor <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* PAYG Unlock modal */}
        {unlockTemplate && (
          <PaygUnlockModal
            isOpen={!!unlockTemplate}
            onClose={() => setUnlockTemplate(null)}
            triggerCategory="invoice"
            templateId={unlockTemplate.id}
            templateName={unlockTemplate.name}
            onUnlocked={() => {
              onSelect(unlockTemplate);
              setUnlockTemplate(null);
            }}
          />
        )}
      </div>
    </AnimatePresence>
  );
};
