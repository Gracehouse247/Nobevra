'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Settings, Save, Upload, Building, 
    Palette, Layout, FileText, CheckCircle2,
    Loader2, Search, Bell, ChevronRight,
    MapPin, Globe, Mail, Phone, Hash, Hexagon, Shield,
    Image as ImageIcon, Type
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { teamService } from '@/lib/services/supabaseService';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { toast } from 'react-hot-toast';
import { ChooseTemplateDialog } from '@/components/invoice/ChooseTemplateDialog';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { ToggleRow } from '@/components/ui/ToggleRow';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';

export default function WorkspaceSettingsPage() {
    const { user } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const { currencyCode, detectedCountry } = useCurrency();
    // Controlled State Variables
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    const [brandColor, setBrandColor] = useState('#59ABF8');
    const [logoUrl, setLogoUrl] = useState('/images/logo.png');
    const [companyName, setCompanyName] = useState('NOBLE WORLD');
    const [email, setEmail] = useState('support@nobleinvoice.com');
    const [phone, setPhone] = useState('+1 (555) 123-4567');
    const [address, setAddress] = useState('123 Innovation Drive\nSuite 400\nSan Francisco, CA 94103\nUnited States');
    const [taxId, setTaxId] = useState('');
    const [website, setWebsite] = useState('https://nobleinvoice.com');
    const [defaultTemplate, setDefaultTemplate] = React.useState('modern');
    const [removeWatermark, setRemoveWatermark] = React.useState(false);
    const [paymentTerms, setPaymentTerms] = useState('Please make payment within 14 days of receiving this invoice. Late payments may be subject to a 1.5% monthly fee.');

    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

    // Fetch user brand details from Supabase on mount
    useEffect(() => {
        if (!user) return;
        
        const loadBrandData = async () => {
            setIsLoading(true);
            try {
                const teamData = await teamService.getTeamByUserId(user.id);
                if (teamData) {
                    const td = teamData as any;
                    if (td.brand_color || td.primary_color) setBrandColor(td.brand_color || td.primary_color);
                    if (td.brand_logo_url || td.logo_url) setLogoUrl(td.brand_logo_url || td.logo_url);
                    const resolvedName = td.business_name || td.name || td.full_name || td.display_name;
                    if (resolvedName) setCompanyName(resolvedName);
                    if (td.business_email) setEmail(td.business_email);
                    if (td.business_phone) setPhone(td.business_phone);
                    if (td.business_address) setAddress(td.business_address);
                    if (td.tax_number) setTaxId(td.tax_number);
                    if (td.website) setWebsite(td.website);
                }
            } catch (err) {
                console.error("Failed to load brand data from Supabase:", err);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadBrandData();
    }, [user]);

    // Handle uploader changes
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoUrl(reader.result as string);
                toast.success('Professional logo pre-loaded! Click Save to apply.');
            };
            reader.readAsDataURL(file);
        }
    };

    // Save brand profile globally
    const handleSave = async () => {
        if (!user) {
            toast.error('Authentication required to update Brand Settings.');
            return;
        }
        setIsSaving(true);
        try {
            await toast.promise(
                teamService.updateBrandKit(user.id, {
                    fullName: companyName,
                    companyName,
                    brandColor,
                    logoUrl,
                    email,
                    phone,
                    address,
                    taxId,
                    website
                }),
                {
                    loading: 'Saving workspace settings...',
                    success: 'Settings Saved Successfully!',
                    error: 'Save Failed. Please retry.'
                }
            );
        } catch (err) {
            console.error("Failed to update global brand settings:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        setBrandColor('#59ABF8');
        setDefaultTemplate('modern');
        setPaymentTerms('Please make payment within 14 days of receiving this invoice. Late payments may be subject to a 1.5% monthly fee.');
        toast('Reset to defaults (unsaved)');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-[#166FBB] animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Loading Settings...</p>
            </div>
        );
    }

    const isBrandUnconfigured = (!logoUrl || logoUrl === '/images/logo.png') && (!companyName || companyName === 'My Business' || companyName === 'NOBLE WORLD');

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24 font-inter">



            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-12 pb-20">

                {/* ── Main Settings Header ──────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 text-[#166FBB] rounded-[18px] flex items-center justify-center border border-blue-100/50 shadow-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#166FBB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Settings size={22} className="relative z-10" />
                        </div>
                        <div>
                            <h1 className="text-[22px] font-black text-noble-text leading-tight tracking-tight">Brand & Identity</h1>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1 font-medium">Manage your brand identity, company details, and invoicing preferences.</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#166FBB] text-white font-bold text-[13px] rounded-xl hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(22,111,187,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save changes
                    </button>
                </div>

                {isBrandUnconfigured && (
                    <div className="mb-10">
                        <ProactiveEmptyState
                            title="Make it yours"
                            description="Add your logo, brand colors, and business details. They'll appear on every invoice you send."
                            variant="onboarding"
                            illustrationIcons={[Palette, ImageIcon, Type]}
                            actions={[
                                { label: 'Upload Your Logo', onClick: () => {
                                    document.getElementById('logo-upload')?.scrollIntoView({ behavior: 'smooth' });
                                }, variant: 'primary' }
                            ]}
                        />
                    </div>
                )}

                    <div className="space-y-8">

                        {/* ── Visual Identity ───────────────────────────────────── */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-[24px] border border-noble-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-10 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-50/50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
                            
                            <div className="flex items-center gap-4 mb-8 relative">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#166FBB]">
                                    <Palette className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-[17px] font-black text-noble-text">Visual Identity</h3>
                                        {!canUse('brand.whitelabel') && <PremiumBadge tier="pulse" iconOnly />}
                                    </div>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Customize how your brand appears on invoices, portals, and business cards.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <label className="block text-[12px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Company Logo</label>
                                        {!canUse('brand.whitelabel') && <PremiumBadge tier="pulse" iconOnly />}
                                    </div>
                                    <div id="logo-upload" className="flex items-center gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-[#0D1B2E]/50 border border-slate-100 dark:border-noble-border">
                                        <div className="w-24 h-24 rounded-[20px] border border-noble-border/80 bg-noble-surface dark:bg-noble-card flex items-center justify-center p-2 shadow-sm relative overflow-hidden group">
                                            {logoUrl ? (
                                                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                                            ) : (
                                                <Building className="w-8 h-8 text-slate-200" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <input 
                                                    type="file" 
                                                    id="logo-file-input" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={handleLogoUpload}
                                                />
                                                <button 
                                                    onClick={() => {
                                                        if (!canUse('brand.whitelabel')) {
                                                            openUpgradeModal({ featureName: 'White-Label Branding', requiredPlan: 'elite' });
                                                            return;
                                                        }
                                                        document.getElementById('logo-file-input')?.click();
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[12px] font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                                                >
                                                    <Upload size={14} /> Upload new logo
                                                </button>
                                                {logoUrl && (
                                                    <button 
                                                        onClick={() => setLogoUrl('')}
                                                        className="px-4 py-2 border border-transparent rounded-xl text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium leading-relaxed">PNG, JPG or SVG. Up to 2MB recommended.</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <label className="block text-[12px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Brand Color</label>
                                        {!canUse('brand.whitelabel') && <PremiumBadge tier="pulse" iconOnly />}
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0D1B2E]/50 border border-slate-100 dark:border-noble-border">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-full flex items-center bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl p-2 shadow-sm hover:border-[#166FBB]/50 transition-colors focus-within:border-[#166FBB] focus-within:ring-2 focus-within:ring-blue-100">
                                                <input 
                                                    type="color"
                                                    value={brandColor}
                                                    onChange={e => {
                                                        if (!canUse('brand.whitelabel')) {
                                                            openUpgradeModal({ featureName: 'White-Label Branding', requiredPlan: 'elite' });
                                                            return;
                                                        }
                                                        setBrandColor(e.target.value);
                                                    }}
                                                    className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0 shadow-inner shrink-0"
                                                />
                                                <input 
                                                    type="text" 
                                                    value={brandColor}
                                                    onChange={e => {
                                                        if (!canUse('brand.whitelabel')) {
                                                            openUpgradeModal({ featureName: 'White-Label Branding', requiredPlan: 'elite' });
                                                            return;
                                                        }
                                                        setBrandColor(e.target.value);
                                                    }}
                                                    className="w-full border-none bg-transparent text-noble-text font-bold text-[14px] px-4 outline-none uppercase"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-3">This color will be used across your invoices and client portal.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Watermark Toggle */}
                            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-noble-border">
                                <ToggleRow
                                    label="Remove NobleInvoice Watermark"
                                    description="Remove the 'Powered by NobleInvoice' watermark from all your outgoing invoices."
                                    icon={<Shield className="w-3.5 h-3.5 text-blue-600" />}
                                    iconBg="bg-blue-50"
                                    checked={removeWatermark}
                                    onChange={(val) => {
                                        if (!canUse('brand.whitelabel')) {
                                            openUpgradeModal({ featureName: 'Remove Watermark', requiredPlan: 'pulse' });
                                            return;
                                        }
                                        setRemoveWatermark(val);
                                    }}
                                    premium={!canUse('brand.whitelabel') ? 'pulse' : undefined}
                                />
                            </div>
                        </div>

                        {/* ── Company Profile ───────────────────────────────────── */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-[24px] border border-noble-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-10 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-50/50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
                            
                            <div className="flex items-center gap-4 mb-8 relative">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Building className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[17px] font-black text-noble-text">Company Profile</h3>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Update your business information and contact details.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 relative">
                                <div>
                                    <label className="block text-[13px] font-bold text-noble-text mb-2">Legal Business Name</label>
                                    <div className="relative group">
                                        <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#166FBB] transition-colors" />
                                        <input 
                                            type="text" 
                                            value={companyName}
                                            onChange={e => setCompanyName(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl pl-11 pr-4 py-3.5 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-bold text-noble-text mb-2">Business Phone</label>
                                    <div className="relative group">
                                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#166FBB] transition-colors" />
                                        <input 
                                            type="tel" 
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl pl-11 pr-4 py-3.5 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-bold text-noble-text mb-2">Support Email</label>
                                    <div className="relative group">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#166FBB] transition-colors" />
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl pl-11 pr-4 py-3.5 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-bold text-noble-text mb-2">Tax ID / VAT Number</label>
                                    <div className="relative group">
                                        <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#166FBB] transition-colors" />
                                        <input 
                                            type="text" 
                                            value={taxId}
                                            placeholder="Enter your tax ID or VAT number"
                                            onChange={e => setTaxId(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl pl-11 pr-4 py-3.5 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <div>
                                        <label className="block text-[13px] font-bold text-noble-text mb-2">Website URL</label>
                                        <div className="relative group">
                                            <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#166FBB] transition-colors" />
                                            <input 
                                                type="url" 
                                                value={website}
                                                onChange={e => setWebsite(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl pl-11 pr-4 py-3.5 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-bold text-noble-text mb-2">Business Address</label>
                                        <div className="relative group">
                                            <MapPin size={16} className="absolute left-4 top-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#166FBB] transition-colors" />
                                            <textarea 
                                                rows={3}
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl pl-11 pr-4 py-3 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all resize-none shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Invoicing Defaults ────────────────────────────────── */}
                        <div className="bg-noble-surface dark:bg-noble-card rounded-[24px] border border-noble-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-10 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-50/50 to-transparent rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
                            
                            <div className="flex items-center justify-between mb-8 relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-[17px] font-black text-noble-text">Invoicing Defaults</h3>
                                        <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Set the default design and terms for your invoices.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsTemplateDialogOpen(true)}
                                    className="px-5 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[13px] font-bold text-[#166FBB] hover:bg-blue-50 hover:border-blue-200 transition-all hover:shadow-sm hidden sm:block"
                                >
                                    Browse Template Library
                                </button>
                            </div>

                            <div className="space-y-10 relative">
                                <div>
                                    <label className="block text-[12px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">Default Invoice Design Template</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <button 
                                            onClick={() => setIsTemplateDialogOpen(true)}
                                            className={`block w-full text-left rounded-2xl p-6 cursor-pointer relative transition-all group ${['modern', 'essentials', 'minimal'].includes(defaultTemplate) ? 'bg-noble-surface dark:bg-noble-card border-2 border-[#166FBB] shadow-[0_8px_30px_rgba(22,111,187,0.12)]' : 'bg-slate-50 dark:bg-[#0D1B2E]/50 border-2 border-slate-100 dark:border-noble-border hover:border-blue-200 hover:bg-noble-surface dark:bg-noble-card hover:shadow-lg'}`}
                                        >
                                            {['modern', 'essentials', 'minimal'].includes(defaultTemplate) && (
                                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#166FBB] rounded-full flex items-center justify-center shadow-md">
                                                    <CheckCircle2 size={14} className="text-white" />
                                                </div>
                                            )}
                                            <div className="w-full aspect-[1/1.2] bg-noble-surface dark:bg-noble-card border border-noble-border/80 rounded-xl shadow-sm mb-5 flex flex-col items-center justify-center p-4">
                                                <div className="w-full h-2 bg-slate-200 rounded mb-2" />
                                                <div className="w-3/4 h-2 bg-slate-200 rounded mb-4" />
                                                <div className="w-full h-8 bg-blue-100 rounded mb-2" />
                                                <div className="w-full h-8 bg-blue-100 rounded" />
                                            </div>
                                            <p className="text-[14px] font-black text-noble-text text-center mb-1 group-hover:text-[#166FBB] transition-colors">Essentials</p>
                                            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-center leading-relaxed">Clean and minimal design for a professional look.</p>
                                        </button>
                                        
                                        <button 
                                            onClick={() => setIsTemplateDialogOpen(true)}
                                            className={`block w-full text-left rounded-2xl p-6 cursor-pointer relative transition-all group ${['classic', 'professional', 'executive'].includes(defaultTemplate) ? 'bg-noble-surface dark:bg-noble-card border-2 border-[#166FBB] shadow-[0_8px_30px_rgba(22,111,187,0.12)]' : 'bg-slate-50 dark:bg-[#0D1B2E]/50 border-2 border-slate-100 dark:border-noble-border hover:border-blue-200 hover:bg-noble-surface dark:bg-noble-card hover:shadow-lg'}`}
                                        >
                                            {['classic', 'professional', 'executive'].includes(defaultTemplate) && (
                                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#166FBB] rounded-full flex items-center justify-center shadow-md">
                                                    <CheckCircle2 size={14} className="text-white" />
                                                </div>
                                            )}
                                            <div className="w-full aspect-[1/1.2] bg-noble-surface dark:bg-noble-card border border-noble-border/80 rounded-xl shadow-sm mb-5 flex flex-col items-center p-4">
                                                <div className="w-10 h-10 bg-slate-200 rounded-full mb-3 self-start" />
                                                <div className="w-full h-2 bg-slate-200 rounded mb-2" />
                                                <div className="w-full h-16 bg-slate-100 dark:bg-[#112030] border border-noble-border rounded" />
                                            </div>
                                            <p className="text-[14px] font-black text-noble-text text-center mb-1 group-hover:text-[#166FBB] transition-colors">Professional</p>
                                            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-center leading-relaxed">Traditional layout with clear sections and details.</p>
                                        </button>

                                        <button 
                                            onClick={() => setIsTemplateDialogOpen(true)}
                                            className={`block w-full text-left rounded-2xl p-6 cursor-pointer relative transition-all group ${['bold', 'creative', 'dynamic'].includes(defaultTemplate) ? 'bg-noble-surface dark:bg-noble-card border-2 border-[#166FBB] shadow-[0_8px_30px_rgba(22,111,187,0.12)]' : 'bg-slate-50 dark:bg-[#0D1B2E]/50 border-2 border-slate-100 dark:border-noble-border hover:border-blue-200 hover:bg-noble-surface dark:bg-noble-card hover:shadow-lg'}`}
                                        >
                                            {['bold', 'creative', 'dynamic'].includes(defaultTemplate) && (
                                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#166FBB] rounded-full flex items-center justify-center shadow-md">
                                                    <CheckCircle2 size={14} className="text-white" />
                                                </div>
                                            )}
                                            <div className="w-full aspect-[1/1.2] bg-noble-surface dark:bg-noble-card border border-noble-border/80 rounded-xl shadow-sm mb-5 flex flex-col p-4 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-10 bg-blue-500" />
                                                <div className="mt-12 w-full h-2 bg-slate-200 rounded mb-2" />
                                                <div className="w-3/4 h-2 bg-slate-200 rounded" />
                                            </div>
                                            <p className="text-[14px] font-black text-noble-text text-center mb-1 group-hover:text-[#166FBB] transition-colors">Creative</p>
                                            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-center leading-relaxed">Eye-catching design to make your brand stand out.</p>
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => setIsTemplateDialogOpen(true)}
                                        className="mt-4 w-full block text-center sm:hidden px-4 py-3 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[13px] font-bold text-[#166FBB] hover:bg-blue-50 transition-colors shadow-sm"
                                    >
                                        Browse Template Library
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-[12px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Default Payment Terms & Notes</label>
                                    <textarea 
                                        rows={4}
                                        value={paymentTerms}
                                        onChange={e => setPaymentTerms(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-[#0D1B2E]/50 border border-noble-border text-noble-text font-semibold text-[13px] rounded-xl px-5 py-4 focus:bg-noble-surface dark:bg-noble-card focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all resize-none shadow-sm leading-relaxed"
                                    />
                                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mt-2.5">This will appear on all new invoices by default.</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Footer Actions ────────────────────────────────────── */}
                        <div className="flex items-center justify-between pt-4 pb-8">
                            <button 
                                onClick={handleReset}
                                className="px-6 py-3 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] hover:border-slate-300 transition-all shadow-sm"
                            >
                                Reset to defaults
                            </button>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-3 bg-transparent text-slate-600 dark:text-slate-400 dark:text-slate-500 font-bold text-[13px] rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] transition-colors">
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-8 py-3 bg-[#166FBB] text-white font-bold text-[13px] rounded-xl hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(22,111,187,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Template Library Modal */}
            {isTemplateDialogOpen && (
                <ChooseTemplateDialog 
                    isOpen={isTemplateDialogOpen}
                    onClose={() => setIsTemplateDialogOpen(false)}
                    onSelect={(template) => {
                        setDefaultTemplate(template.id);
                        setIsTemplateDialogOpen(false);
                    }}
                    selectedTemplateId={defaultTemplate}
                />
            )}
        </div>
    );
}
