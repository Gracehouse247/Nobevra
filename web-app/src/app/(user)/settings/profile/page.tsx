'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Camera, User, Globe, Phone, Briefcase, MapPin, CreditCard, ArrowRight, Shield, RefreshCw, Headphones, Lock, Info, CheckCircle2, Upload, Save, Building, Mail, Hash } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { storageService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfileSettingsPage() {
    const { user, userData, refreshUserData } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeSection, setActiveSection] = useState('profile_details');

    const [form, setForm] = useState({
        // Profile Details
        displayName: '',
        phone: '',
        // Public Persona
        bio: '',
        website: '',
        // Business Info
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        businessAddress: '',
        taxNumber: '',
        industry: '',
        // Localization
        preferredCurrency: 'NGN',
        themeMode: 'system',
        locale: 'en',
        timezone: '(GMT+1) West Africa Time',
    });

    // Auto-detect currency and timezone if not set
    useEffect(() => {
        if (userData) {
            const data = userData as any;
            setForm(prev => ({
                ...prev,
                displayName: data.display_name || data.name || '',
                phone: data.phone || '',
                bio: data.bio || '',
                website: data.website || '',
                businessName: data.business_name || '',
                businessEmail: data.business_email || '',
                businessPhone: data.business_phone || '',
                businessAddress: data.business_address || '',
                taxNumber: data.tax_number || '',
                industry: data.industry || data.business_industry || '',
                preferredCurrency: data.preferred_currency || prev.preferredCurrency,
                themeMode: data.theme_mode || 'system',
                locale: data.locale || 'en',
                timezone: data.timezone || prev.timezone,
            }));

            // Auto-detect if not set
            if (!data.preferred_currency || !data.timezone) {
                const autoDetectLocation = async () => {
                    try {
                        const res = await fetch('https://ipapi.co/json/');
                        if (!res.ok) throw new Error('API failed');
                        const ipData = await res.json();
                        setForm(prev => ({
                            ...prev,
                            preferredCurrency: data.preferred_currency || ipData.currency || prev.preferredCurrency || 'USD',
                            timezone: data.timezone || ipData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
                        }));
                    } catch (err) {
                        // Silently fallback without bubbling up the fetch error to the dev overlay
                        setForm(prev => ({
                            ...prev,
                            timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
                        }));
                    }
                };
                autoDetectLocation();
            }
        }
    }, [userData]);

    // Generate comprehensive lists
    const timezones = typeof Intl !== 'undefined' && Intl.supportedValuesOf 
        ? Intl.supportedValuesOf('timeZone') 
        : ['UTC', 'America/New_York', 'Europe/London', 'Africa/Lagos', 'Asia/Tokyo'];

    const allCurrencies = [
        { code: 'USD', name: 'US Dollar ($)' }, { code: 'EUR', name: 'Euro (€)' },
        { code: 'GBP', name: 'British Pound (£)' }, { code: 'NGN', name: 'Nigerian Naira (₦)' },
        { code: 'CAD', name: 'Canadian Dollar ($)' }, { code: 'AUD', name: 'Australian Dollar ($)' },
        { code: 'JPY', name: 'Japanese Yen (¥)' }, { code: 'INR', name: 'Indian Rupee (₹)' },
        { code: 'ZAR', name: 'South African Rand (R)' }, { code: 'KES', name: 'Kenyan Shilling (KSh)' },
        { code: 'GHS', name: 'Ghanaian Cedi (GH₵)' }, { code: 'SGD', name: 'Singapore Dollar ($)' },
        { code: 'CHF', name: 'Swiss Franc (CHF)' }, { code: 'CNY', name: 'Chinese Yuan (¥)' },
        { code: 'BRL', name: 'Brazilian Real (R$)' }, { code: 'MXN', name: 'Mexican Peso ($)' },
        { code: 'AED', name: 'UAE Dirham (د.إ)' }, { code: 'SAR', name: 'Saudi Riyal (﷼)' }
    ];

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user || !e.target.files?.[0]) return;
        const file = e.target.files[0];

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Avatar must be under 2MB.');
            return;
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            toast.error('Only JPEG, PNG, or WebP files are accepted.');
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;
            const publicUrl = await storageService.uploadFile('avatars', filePath, file);
            
            const { error } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
                .eq('id', user.id);

            if (error) throw error;

            await refreshUserData();
            toast.success('Avatar updated successfully!');
        } catch (error: any) {
            console.error('Avatar upload error:', error);
            toast.error('Avatar upload failed. Try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (activeSection === 'profile_details' && !form.displayName.trim()) {
            toast.error('Display name cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            const updatePayload: any = {
                display_name: form.displayName.trim(),
                phone: form.phone.trim(),
                bio: form.bio.trim(),
                website: form.website.trim(),
                business_name: form.businessName.trim(),
                business_email: form.businessEmail.trim(),
                business_phone: form.businessPhone.trim(),
                business_address: form.businessAddress.trim(),
                tax_number: form.taxNumber.trim(),
                industry: form.industry.trim(),
                preferred_currency: form.preferredCurrency,
                theme_mode: form.themeMode,
                locale: form.locale,
                timezone: form.timezone,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('profiles')
                .update(updatePayload)
                .eq('id', user.id);

            if (error) throw error;

            await refreshUserData();
            toast.success('Profile saved successfully!');
        } catch (error: any) {
            console.error('Profile save error:', error);
            toast.error('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const avatarSrc = (userData as any)?.avatar_url || userData?.photoUrl;
    const initials = form.displayName.charAt(0).toUpperCase() || 'U';

    const innerTabs = [
        { id: 'profile_details', label: 'Profile Details', icon: User },
        { id: 'public_persona', label: 'Public Persona', icon: Globe },
        { id: 'contact_info', label: 'Contact Information', icon: Phone },
        { id: 'business_info', label: 'Business Information', icon: Briefcase },
        { id: 'localization', label: 'Localization', icon: MapPin },
        { id: 'subscription', label: 'Subscription Status', icon: CreditCard },
    ];

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'profile_details':
                return (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
                            <div>
                                <h2 className="text-[19px] font-black text-slate-900 mb-1" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Profile Details</h2>
                                <p className="text-[13px] text-slate-500 font-medium">Manage your personal profile and display information.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden shadow-inner">
                                        {avatarSrc ? (
                                            <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl font-black text-slate-400">{initials}</span>
                                        )}
                                    </div>
                                    {uploading && (
                                        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm">
                                            <Loader2 className="w-5 h-5 text-[#166FBB] animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all">
                                        <Upload className="w-3.5 h-3.5" /> Change Avatar
                                    </button>
                                    <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider">JPG, PNG or WEBP. Max 2MB</p>
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarUpload} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Display Name</label>
                                <div className="relative">
                                    <input type="text" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" required />
                                    {form.displayName.trim() && <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2" />}
                                </div>
                            </div>
                        </div>
                    </>
                );

            case 'public_persona':
                return (
                    <>
                        <div className="mb-10">
                            <h2 className="text-[19px] font-black text-slate-900 mb-1" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Public Persona</h2>
                            <p className="text-[13px] text-slate-500 font-medium">Customize how you appear on public directories and invoicing links.</p>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Public Bio / Tagline</label>
                                <textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="I am a professional freelancer specializing in..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm resize-none" />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Portfolio / Website URL</label>
                                <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://yourwebsite.com" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" />
                            </div>
                        </div>
                    </>
                );

            case 'contact_info':
                return (
                    <>
                        <div className="mb-10">
                            <h2 className="text-[19px] font-black text-slate-900 mb-1" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Contact Information</h2>
                            <p className="text-[13px] text-slate-500 font-medium">Manage how clients and the system can reach you.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Personal Phone Number</label>
                                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm placeholder:text-slate-400" placeholder="Optional" />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Account Email (Read-only)</label>
                                <input type="email" value={userData?.email || user?.email || ''} disabled className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-500 cursor-not-allowed shadow-sm" />
                            </div>
                        </div>
                    </>
                );

            case 'business_info':
                return (
                    <>
                        <div className="mb-10">
                            <h2 className="text-[19px] font-black text-slate-900 mb-1" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Business Information</h2>
                            <p className="text-[13px] text-slate-500 font-medium">Set default business details for your profile.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Business Name</label>
                                <input type="text" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Tax ID / VAT Number</label>
                                <input type="text" value={form.taxNumber} onChange={(e) => setForm({ ...form, taxNumber: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Business Phone</label>
                                <input type="tel" value={form.businessPhone} onChange={(e) => setForm({ ...form, businessPhone: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Business Email</label>
                                <input type="email" value={form.businessEmail} onChange={(e) => setForm({ ...form, businessEmail: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Business Address</label>
                                <textarea rows={3} value={form.businessAddress} onChange={(e) => setForm({ ...form, businessAddress: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm resize-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Industry</label>
                                <input type="text" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm" placeholder="e.g. Software Development" />
                            </div>
                        </div>
                    </>
                );

            case 'localization':
                return (
                    <>
                        <div className="mb-10">
                            <h2 className="text-[19px] font-black text-slate-900 mb-1" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Localization</h2>
                            <p className="text-[13px] text-slate-500 font-medium">Manage region, currency, and language preferences.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Preferred Currency</label>
                                <select value={form.preferredCurrency} onChange={(e) => setForm({ ...form, preferredCurrency: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}>
                                    {allCurrencies.map(c => (
                                        <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Theme Mode</label>
                                <select value={form.themeMode} onChange={(e) => setForm({ ...form, themeMode: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}>
                                    <option value="system">Follow System</option>
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Language</label>
                                <select value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}>
                                    <option value="en">English</option>
                                    <option value="fr">Français</option>
                                    <option value="es">Español</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[12px] font-bold text-slate-700 mb-2">Timezone</label>
                                <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-900 focus:outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all shadow-sm cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1rem' }}>
                                    {timezones.map(tz => (
                                        <option key={tz} value={tz}>{tz}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                );

            case 'subscription':
                return (
                    <>
                        <div className="mb-10">
                            <h2 className="text-[19px] font-black text-slate-900 mb-1" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>Subscription Status</h2>
                            <p className="text-[13px] text-slate-500 font-medium">Review your current plan and limits.</p>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1.5 bg-slate-100 rounded-full flex items-center gap-2 border border-slate-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#166FBB]" />
                                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
                                    {((userData as any)?.plan === 'pro' || (userData as any)?.plan === 'active') ? 'Pro Plan' : (userData as any)?.plan === 'elite' ? 'Elite Plan' : 'Free Plan'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex gap-3">
                                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                <p className="text-[12px] font-medium text-slate-600">
                                    You are currently on the {((userData as any)?.plan === 'elite') ? 'Elite' : ((userData as any)?.plan === 'pro' || (userData as any)?.plan === 'active') ? 'Pro' : 'Free'} Plan. {((userData as any)?.plan === 'elite') ? 'You have access to all premium features.' : 'Upgrade to unlock premium features.'}
                                </p>
                            </div>
                            {((userData as any)?.plan !== 'elite') && (
                                <button type="button" onClick={() => router.push('/upgrade')} className="whitespace-nowrap px-5 py-2 bg-[#166FBB] text-white text-[12px] font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                                    Upgrade Plan
                                </button>
                            )}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-inter text-slate-800 pb-10">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* ── Left Inner Sidebar Navigation ──────────────────────────────── */}
                <div className="w-full md:w-[280px] flex-shrink-0 flex flex-col gap-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm">
                        <nav className="flex flex-col gap-1">
                            {innerTabs.map((tab) => {
                                const isActive = activeSection === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveSection(tab.id)}
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all text-left ${
                                            isActive
                                                ? 'bg-[#166FBB]/5 text-[#166FBB] shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#166FBB]' : 'text-slate-400'}`} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Need Help Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Info className="w-4 h-4 text-noble-blue" />
                            <h4 className="text-[14px] font-black text-slate-900">Need Help?</h4>
                        </div>
                        <p className="text-[12px] font-medium text-slate-500 mb-5 leading-relaxed">
                            Check our documentation or contact support.
                        </p>
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:border-[#166FBB] hover:text-[#166FBB] hover:bg-[#166FBB]/5 transition-all shadow-sm">
                            Visit Help Center
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* ── Main Content Area (Right Column) ──────────────────────────── */}
                <div className="flex-1">
                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
                        
                        <form onSubmit={handleSave}>
                            <div className="p-8 sm:p-10 min-h-[400px]">
                                {renderActiveSection()}
                            </div>

                            {/* Footer Area (Visible only if not on Subscription read-only tab) */}
                            {activeSection !== 'subscription' && (
                                <div className="px-8 sm:px-10 py-5 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-[#166FBB] hover:bg-blue-600 text-white rounded-lg text-[13px] font-bold transition-all disabled:opacity-50 flex items-center justify-center min-w-[140px] shadow-sm active:scale-95 cursor-pointer"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                        Save Changes
                                    </button>
                                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                        ACCOUNT: <span className="text-slate-800 lowercase font-medium tracking-normal">{userData?.email || user?.email}</span>
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* ── Footer Trust Badges ────────────────────────────────────────── */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto border-t border-slate-200/60 pt-8">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#166FBB] flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="text-[12px] font-bold text-slate-900">Secure & Private</h5>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">Your data is encrypted and protected</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-[#166FBB] flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="text-[12px] font-bold text-slate-900">Real-time Sync</h5>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">Changes sync across all your devices</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Headphones className="w-5 h-5 text-[#166FBB] flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="text-[12px] font-bold text-slate-900">Dedicated Support</h5>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">We're here to help 24/7</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h5 className="text-[12px] font-bold text-slate-900">End-to-end Encryption</h5>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">Enterprise-grade security you can trust</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
