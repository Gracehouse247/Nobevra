'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useInvoiceCreator } from './InvoiceCreatorContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { TemplateEngine } from '@/components/invoice/TemplateEngine';
import { Maximize2, Send, Download, Link as LinkIcon, Settings2, Palette, Eye, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface InvoicePreviewPanelProps {
    onOpenTemplateDialog?: () => void;
}

const DOC_W = 1100;
const DOC_H = 1424;

type TabId = 'preview' | 'design' | 'settings';

export const InvoicePreviewPanel = ({ onOpenTemplateDialog }: InvoicePreviewPanelProps) => {
    const { 
        selectedTemplate, customAccentColor, invoiceNumber, dueDate, 
        clients, selectedClientId, items, subtotal, taxTotal, discountTotal, total,
        currencySymbol, notes, bankName, accountName, accountNumber, signatureUrl, teamData
    } = useInvoiceCreator();
    
    const { canUse } = useEntitlements();

    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.4);
    const [activeTab, setActiveTab] = useState<TabId>('preview');
    const router = useRouter();

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const update = () => {
            const w = el.clientWidth;
            setScale(w / DOC_W);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const scaledHeight = Math.round(DOC_H * scale);

    const tabs = [
        { id: 'preview' as TabId, label: 'Preview', icon: Eye },
        { id: 'design' as TabId, label: 'Design', icon: Palette },
        { id: 'settings' as TabId, label: 'Settings', icon: Settings2 },
    ];

    return (
        <div className="h-full w-full bg-noble-surface flex flex-col overflow-hidden">

            {/* ── Tab Navigation (matches Image 3 exactly) ── */}
            <div className="h-[60px] border-b border-noble-border px-6 flex items-end justify-between shrink-0 bg-noble-surface">
                <div className="flex items-end h-full gap-1">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`relative h-full px-4 flex items-center gap-2 text-[13px] font-semibold transition-colors border-b-2 font-[Inter,sans-serif] ${
                                activeTab === id
                                    ? 'text-[#01A0E2] border-[#01A0E2]'
                                    : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
                            }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {label}
                        </button>
                    ))}
                </div>
                <div className="pb-3">
                    <button className="h-8 px-3 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-[#01A0E2] hover:text-[#01A0E2] font-semibold text-xs flex items-center gap-1.5 transition-all font-[Inter,sans-serif]">
                        <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
                    </button>
                </div>
            </div>

            {/* ── Canvas Body ── */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8F9FA]">

                {activeTab === 'preview' && (
                    <div className="p-6 flex flex-col gap-6">

                        {/* Floating Invoice Document */}
                        <div
                            ref={containerRef}
                            className="w-full relative"
                            style={{ height: `${scaledHeight}px` }}
                        >
                            <div
                                id="invoice-preview-element"
                                className="absolute top-0 left-0 bg-noble-surface shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
                                style={{
                                    width: `${DOC_W}px`,
                                    height: `${DOC_H}px`,
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top left',
                                }}
                            >
                                <TemplateEngine
                                    template={{
                                        ...selectedTemplate,
                                        accentColor: customAccentColor || selectedTemplate.accentColor
                                    }}
                                    data={{
                                        invoiceNumber,
                                        date: new Date().toLocaleDateString(),
                                        dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : 'Upon Receipt',
                                        client: clients.find((c: any) => c.id === selectedClientId) || { name: 'Client Name', address: 'Client address will appear here' },
                                        items: items.length > 0 ? items : [],
                                        subtotal,
                                        taxTotal,
                                        discountTotal,
                                        total,
                                        currencySymbol,
                                        notes,
                                        bankDetails: { name: bankName, accountName, accountNumber },
                                        signatureUrl,
                                        sender: teamData,
                                        canRemoveWatermark: canUse('brand.whitelabel')
                                    }}
                                />
                            </div>
                        </div>

                        {/* Invoice Actions card (Image 3 style) */}
                        <div className="w-full bg-noble-surface border border-noble-border rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                                <Layers className="w-4 h-4 text-slate-500" />
                                <h4 className="text-[12px] font-bold text-slate-700 mb-3 uppercase tracking-wider font-[Inter,sans-serif]">Invoice Actions</h4>
                            </div>
                            <div className="p-4 space-y-2">
                                <button className="w-full h-10 rounded-xl bg-[#01A0E2] hover:bg-[#0482B5] active:scale-[0.98] text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#01A0E2]/20 font-[Inter,sans-serif]">
                                    <Send className="w-4 h-4" /> Send Invoice
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="h-9 rounded-xl border border-noble-border bg-noble-surface hover:bg-slate-50 text-slate-700 font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-all font-[Inter,sans-serif]">
                                        <Download className="w-3.5 h-3.5 text-slate-500" /> Download PDF
                                    </button>
                                    <button className="h-9 rounded-xl border border-noble-border bg-noble-surface hover:bg-slate-50 text-slate-700 font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-all font-[Inter,sans-serif]">
                                        <LinkIcon className="w-3.5 h-3.5 text-slate-500" /> Share Link
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom padding so content clears the ticker */}
                        <div className="h-4" />
                    </div>
                )}

                {activeTab === 'design' && (
                    <div className="p-6 flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                            <Palette className="w-7 h-7 text-violet-600" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-base font-bold text-slate-800">Customise Design</h3>
                            <p className="text-sm text-slate-500 mt-1.5 max-w-[220px] mx-auto leading-relaxed">Choose a template, accent colour, and logo for your invoice.</p>
                        </div>
                        <button
                            onClick={() => onOpenTemplateDialog?.()}
                            className="h-9 px-5 rounded-xl bg-[#01A0E2] hover:bg-[#0482B5] text-white font-bold text-[13px] transition-all shadow-sm font-[Inter,sans-serif]">
                            Browse Templates
                        </button>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="p-6 flex flex-col items-center justify-center h-full gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                            <Settings2 className="w-7 h-7 text-slate-500" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-base font-bold text-slate-800">Invoice Settings</h3>
                            <p className="text-sm text-slate-500 mt-1.5 max-w-[220px] mx-auto leading-relaxed">Configure default tax, currency, payment gateways, and more.</p>
                        </div>
                        <button
                            onClick={() => router.push('/settings/brand')}
                            className="h-9 px-5 rounded-xl border border-noble-border bg-noble-surface hover:bg-slate-50 text-slate-700 font-bold text-[13px] transition-all shadow-sm font-[Inter,sans-serif]">
                            Open Brand Settings
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
