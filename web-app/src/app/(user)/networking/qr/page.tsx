'use client';

import React from 'react';
import Link from 'next/link';
import { 
    QrCode, Download, Copy, Share2, 
    Settings, ScanLine, Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function QrGeneratorPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24">
            {/* Header Area */}
            <div className="bg-noble-surface dark:bg-noble-card border-b border-[#E2E8F0] px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-2">QR Generator</h1>
                        <p className="text-[#64748B] text-sm font-medium">Create custom QR codes for your payment links, invoices, and business cards.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#166FBB] text-white font-bold text-sm rounded-xl hover:bg-[#125A96] transition-all shadow-lg shadow-[#166FBB]/20 whitespace-nowrap">
                            <QrCode className="w-4 h-4" />
                            Generate New QR
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* QR Code Canvas Area */}
                    <div className="lg:col-span-1 bg-noble-surface dark:bg-noble-card rounded-3xl p-8 border border-[#E2E8F0] shadow-sm flex flex-col items-center">
                        <div className="w-full aspect-square bg-[#F8FAFC] dark:bg-[#060D1A] rounded-2xl border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center relative overflow-hidden group mb-6">
                            <ScanLine className="w-12 h-12 text-[#94A3B8] mb-4 group-hover:scale-110 transition-transform duration-500" />
                            <p className="text-[#64748B] font-bold text-sm">QR Preview</p>
                            <p className="text-[10px] text-[#94A3B8] mt-1 text-center px-4">Enter a URL or select a destination to generate.</p>
                        </div>

                        <div className="flex w-full gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] text-[#0F172A] font-bold text-xs rounded-xl hover:bg-noble-surface dark:bg-noble-card hover:border-[#166FBB] transition-all">
                                <Download className="w-4 h-4" /> Download
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] text-[#0F172A] font-bold text-xs rounded-xl hover:bg-noble-surface dark:bg-noble-card hover:border-[#166FBB] transition-all">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                    </div>

                    {/* QR Configuration Area */}
                    <div className="lg:col-span-2 bg-noble-surface dark:bg-noble-card rounded-3xl p-8 border border-[#E2E8F0] shadow-sm">
                        <h2 className="text-xl font-black text-[#0F172A] mb-6">Configuration</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-[#64748B] uppercase tracking-widest mb-2">Destination Type</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <button className="px-4 py-3 bg-[#166FBB]/5 border border-[#166FBB]/30 rounded-xl text-[#166FBB] font-bold text-sm text-left flex items-center justify-between">
                                        Custom URL
                                        <div className="w-4 h-4 rounded-full border-[4px] border-[#166FBB] bg-noble-surface dark:bg-noble-card" />
                                    </button>
                                    <button className="px-4 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-xl text-[#64748B] font-bold text-sm text-left hover:border-[#CBD5E1]">
                                        Payment Link
                                    </button>
                                    <button className="px-4 py-3 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-xl text-[#64748B] font-bold text-sm text-left hover:border-[#CBD5E1]">
                                        Business Card
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-[#64748B] uppercase tracking-widest mb-2">URL Content</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                    <input 
                                        type="url" 
                                        placeholder="https://yourwebsite.com/pay"
                                        className="w-full bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] text-[#0F172A] rounded-xl pl-12 pr-4 py-4 outline-none focus:border-[#166FBB] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#E2E8F0]">
                                <h3 className="text-sm font-black text-[#0F172A] mb-4">Design Customization</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-2">Foreground Color</label>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#0F172A] border-2 border-white shadow-md ring-1 ring-[#E2E8F0]" />
                                            <span className="text-sm font-bold text-[#0F172A]">#0F172A</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-2">Background Color</label>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-noble-surface dark:bg-noble-card border-2 border-white shadow-md ring-1 ring-[#E2E8F0]" />
                                            <span className="text-sm font-bold text-[#0F172A]">#FFFFFF</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-[#060D1A] rounded-xl border border-[#E2E8F0]">
                                    <div className="flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm font-bold text-[#0F172A]">Include Logo in Center</p>
                                            <p className="text-[10px] text-[#64748B]">Add your brand logo to the middle of the QR code.</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-6 bg-[#CBD5E1] rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-noble-surface dark:bg-noble-card rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
