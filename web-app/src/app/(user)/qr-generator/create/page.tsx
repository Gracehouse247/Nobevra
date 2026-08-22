'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    ChevronLeft, Palette, Save, UploadCloud, Lock, Sparkles, Loader2
} from 'lucide-react';
import QrPreviewCard from '@/components/features/qr/QrPreviewCard';
import { UserData } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { QrService, QrCodeData } from '@/lib/services/qrService';
import PaygUnlockModal, { usePaygBundle } from '@/components/features/billing/PaygUnlockModal';

import QRFormEngine from '@/components/features/qr/forms/QRFormEngine';

function QrGeneratorForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get('type') || 'website';
    const { user, userData } = useAuth();
    const plan = userData?.plan || 'free';

    const [previewValue, setPreviewValue] = useState('');
    const [formPayload, setFormPayload] = useState<Record<string, any>>({});
    
    const [fgColor, setFgColor] = useState('#0F172A');
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [includeLogo, setIncludeLogo] = useState(false);
    const [isDynamic, setIsDynamic] = useState(false);
    
    const [uploadError, setUploadError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    
    // PAYG Logic
    const paygBundle = usePaygBundle(user?.id);
    const [showPaygModal, setShowPaygModal] = useState(false);

    const isPremiumType = ['pdf', 'image', 'video', 'mp3', 'appstore', 'business'].includes(type);
    // Note: We'll allow PAYG to bypass the paywall for this specific premium type
    const requiresPaywall = (isPremiumType || isDynamic) && plan === 'free';

    useEffect(() => {
        // Reset state when type changes
        setPreviewValue('');
        setFormPayload({});
        setUploadError('');
    }, [type]);

    const handleSave = async () => {
        if (requiresPaywall && user) {
            // Check if they already unlocked this specific premium QR type
            const hasAccess = paygBundle.hasAccess('qrCode', type);
            if (!hasAccess) {
                // Try to redeem credit
                if (paygBundle.state.credits.qrCodeTemplates > 0) {
                    paygBundle.redeemCredit('qrCode', type);
                } else {
                    // Show PAYG Modal
                    setShowPaygModal(true);
                    return;
                }
            }
        }

        if (!user || !user.id) {
            console.error('User not authenticated');
            return;
        }
        
        setIsSaving(true);
        setUploadError('');

        try {
            let assetPath = null;
            let assetUrl = null;

            if (formPayload._file) {
                const uploadResult = await QrService.uploadAsset(formPayload._file, user.id);
                assetPath = uploadResult.path;
                assetUrl = uploadResult.url;
            }
            
            const finalContent = { ...formPayload };
            delete finalContent._file;
            
            if (isPremiumType) {
                finalContent.colorPrimary = fgColor;
            }
            
            const qrData: QrCodeData = {
                user_id: user.id,
                name: finalContent.videoTitle || finalContent.displayName || finalContent.businessName || `Untitled ${type} QR`,
                type: type,
                content: finalContent,
                color_primary: fgColor,
                asset_path: assetPath,
                asset_url: assetUrl
            };

            await QrService.saveQrCode(qrData);
            router.push('/qr-generator');
        } catch (error: any) {
            console.error('Save failed:', error);
            setUploadError(error.message || 'Failed to save QR code');
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24">
            <div className="bg-noble-surface dark:bg-noble-card border-b border-noble-border px-6 lg:px-8 py-4 sticky top-0 z-20 shadow-sm">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/qr-generator" className="w-9 h-9 bg-[#F8FAFC] dark:bg-[#060D1A] border border-noble-border rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-noble-surface dark:bg-noble-card hover:border-[#166FBB] hover:text-[#166FBB] transition-all shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-[19px] font-bold text-noble-text leading-tight capitalize">Create {type} QR</h1>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-0.5">QR Generator Engine</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#166FBB] text-white font-bold text-[13px] rounded-xl hover:bg-blue-700 transition-all shadow-[0_4px_12px_rgba(22,111,187,0.3)] disabled:opacity-70"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : (requiresPaywall && !paygBundle.hasAccess('qrCode', type) && paygBundle.state.credits.qrCodeTemplates === 0) ? <Lock className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : (requiresPaywall && !paygBundle.hasAccess('qrCode', type) && paygBundle.state.credits.qrCodeTemplates === 0) ? 'Unlock & Save' : 'Save & Generate'}
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 mt-8">
                
                {/* Paywall Banner Overlay Alert */}
                {(requiresPaywall && !paygBundle.hasAccess('qrCode', type)) && (
                    <div className="mb-8 p-4 bg-gradient-to-r from-[#1E293B] to-[#0F172A] rounded-2xl flex items-center justify-between shadow-lg border border-[#334155]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-noble-surface dark:bg-noble-card/10 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-[#00F0FF]" />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-sm tracking-wide">Premium Feature Locked</h4>
                                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">Dynamic QR routing and media uploads are premium features.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowPaygModal(true)} className="px-5 py-2.5 bg-transparent text-white border border-white/20 font-black text-xs rounded-xl hover:bg-noble-surface dark:bg-noble-card/5 transition-all uppercase tracking-widest whitespace-nowrap">
                                Pay $1 Bundle
                            </button>
                            <Link href="/upgrade" className="px-5 py-2.5 bg-[#00F0FF] text-[#0F172A] font-black text-xs rounded-xl hover:bg-noble-surface dark:bg-noble-card transition-all shadow-md uppercase tracking-widest whitespace-nowrap">
                                Upgrade Plan
                            </Link>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Form */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Dynamic Toggle Section */}
                        <div className={`bg-noble-surface dark:bg-noble-card rounded-2xl p-6 border ${isDynamic ? 'border-[#166FBB] shadow-md shadow-[#166FBB]/5' : 'border-noble-border shadow-sm'} transition-all relative overflow-hidden`}>
                            {isDynamic && <div className="absolute top-0 left-0 w-1 h-full bg-[#166FBB]" />}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-[19px] font-bold text-noble-text flex items-center gap-2">
                                        Dynamic Routing
                                        {plan === 'free' && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[12px] font-medium mt-1 max-w-sm">Allow updating the destination link after printing and track scan analytics via the backend.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={isDynamic} onChange={(e) => setIsDynamic(e.target.checked)} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-noble-surface dark:bg-noble-card after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#166FBB]"></div>
                                </label>
                            </div>
                        </div>

                        {/* Specific Content Fields */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-2xl p-6 border border-noble-border shadow-sm">
                            <h3 className="text-[19px] font-bold text-noble-text mb-5">Content Destination</h3>
                            <QRFormEngine 
                                type={type}
                                onChange={setFormPayload}
                                onPreviewValueChange={setPreviewValue}
                                initialData={formPayload}
                            />
                        </div>

                        {/* Styling & Branding */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-2xl p-6 border border-noble-border shadow-sm">
                            <h3 className="text-[19px] font-bold text-noble-text mb-5 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-[#166FBB]" />
                                Styling & Branding
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Foreground Color</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                                        <input type="text" value={fgColor.toUpperCase()} readOnly className="w-full bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm font-bold text-[#0F172A] outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest">Include Center Logo</label>
                                    <div className="flex items-center h-[42px] px-4 bg-[#F8FAFC] dark:bg-[#060D1A] border border-[#E2E8F0] rounded-xl">
                                        <label className="relative inline-flex items-center cursor-pointer w-full justify-between">
                                            <span className="text-sm font-bold text-[#0F172A]">Nobevra Icon</span>
                                            <input type="checkbox" className="sr-only peer" checked={includeLogo} onChange={(e) => setIncludeLogo(e.target.checked)} />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-noble-surface dark:bg-noble-card after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#166FBB]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Preview */}
                    <div className="lg:col-span-5">
                        <QrPreviewCard 
                            value={previewValue}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            includeLogo={includeLogo}
                            qrType={type}
                        />
                    </div>
                </div>
            </div>
            
            {showPaygModal && (
                <PaygUnlockModal
                    isOpen={showPaygModal}
                    onClose={() => setShowPaygModal(false)}
                    triggerCategory="qrCode"
                    templateId={type}
                    templateName={`${type.charAt(0).toUpperCase() + type.slice(1)} QR Code`}
                    onUnlocked={() => {
                        setShowPaygModal(false);
                        handleSave();
                    }}
                />
            )}
        </div>
    );
}

export default function UnifiedQrGeneratorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] flex items-center justify-center font-bold text-[#64748B]">Loading QR Engine...</div>}>
            <QrGeneratorForm />
        </Suspense>
    );
}
