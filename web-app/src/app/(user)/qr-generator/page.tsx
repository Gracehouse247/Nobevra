'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Globe, Wifi, Contact, Briefcase, Utensils, Share2,
    Mail, MessageSquare, Smartphone, MapPin, AlignLeft,
    FileText, Image as ImageIcon, Video, Calendar,
    Bitcoin, MessageCircle, Ticket, Music, PhoneCall,
    FolderOpen, MoreVertical, Plus, QrCode, Package,
    Search, ChevronRight, Lightbulb, CheckCircle2,
    ArrowRight, Zap, TrendingUp, Eye, Download, Trash2,
    FolderPlus, Star, Clock, X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

// ── QR Types ─────────────────────────────────────────────────────────────────
const QR_TYPES = [
    { id: 'product',   name: 'Product Passport', icon: Package,       desc: 'Share product info and authenticity details', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
    { id: 'website',   name: 'Website',          icon: Globe,         desc: 'Link to any website or landing page',         color: 'from-blue-500 to-blue-600',    bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100' },
    { id: 'wifi',      name: 'WiFi',             icon: Wifi,          desc: 'Share WiFi network credentials',              color: 'from-cyan-500 to-teal-600',    bg: 'bg-cyan-50',   text: 'text-cyan-600',   border: 'border-cyan-100' },
    { id: 'vcard',     name: 'vCard',            icon: Contact,       desc: 'Share contact details instantly',             color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    { id: 'business',  name: 'Business',         icon: Briefcase,     desc: 'Business profile and company info',           color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50',  text: 'text-amber-600',  border: 'border-amber-100' },
    { id: 'menu',      name: 'Menu',             icon: Utensils,      desc: 'Digital menus for restaurants',               color: 'from-red-500 to-rose-600',     bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-100' },
    { id: 'social',    name: 'Social Media',     icon: Share2,        desc: 'Link to your social media profiles',          color: 'from-pink-500 to-fuchsia-600', bg: 'bg-pink-50',   text: 'text-pink-600',   border: 'border-pink-100' },
    { id: 'email',     name: 'Email',            icon: Mail,          desc: 'Compose email with one scan',                 color: 'from-blue-400 to-indigo-600',  bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
    { id: 'sms',       name: 'SMS',              icon: MessageSquare, desc: 'Pre-fill SMS messages',                       color: 'from-green-500 to-emerald-600', bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-100' },
    { id: 'appstore',  name: 'App Store',        icon: Smartphone,    desc: 'Link to your mobile app store',               color: 'from-slate-600 to-slate-800',  bg: 'bg-slate-50',  text: 'text-slate-600',  border: 'border-slate-200' },
    { id: 'location',  name: 'Location',         icon: MapPin,        desc: 'Share any location or address',               color: 'from-rose-500 to-red-600',     bg: 'bg-rose-50',   text: 'text-rose-600',   border: 'border-rose-100' },
    { id: 'text',      name: 'Text',             icon: AlignLeft,     desc: 'Plain text or rich text',                     color: 'from-gray-500 to-gray-700',    bg: 'bg-gray-50',   text: 'text-gray-600',   border: 'border-gray-200' },
    { id: 'pdf',       name: 'PDF',              icon: FileText,      desc: 'Link to PDF documents',                       color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
    { id: 'image',     name: 'Image',            icon: ImageIcon,     desc: 'Display images when scanned',                 color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    { id: 'video',     name: 'Video',            icon: Video,         desc: 'Link to video content or YouTube',            color: 'from-red-600 to-rose-700',     bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-100' },
    { id: 'event',     name: 'Event',            icon: Calendar,      desc: 'Event details and registration',              color: 'from-teal-500 to-cyan-600',    bg: 'bg-teal-50',   text: 'text-teal-600',   border: 'border-teal-100' },
    { id: 'bitcoin',   name: 'Bitcoin',          icon: Bitcoin,       desc: 'Bitcoin address for payments',                color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
    { id: 'whatsapp',  name: 'WhatsApp',         icon: MessageCircle, desc: 'Start WhatsApp conversation',                 color: 'from-green-600 to-emerald-700', bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-100' },
    { id: 'coupon',    name: 'Coupon',           icon: Ticket,        desc: 'Discount coupons and offers',                 color: 'from-fuchsia-500 to-pink-600', bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-100' },
    { id: 'mp3',       name: 'MP3',              icon: Music,         desc: 'Link to audio files',                         color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
    { id: 'call',      name: 'Call',             icon: PhoneCall,     desc: 'Initiate phone call when scanned',            color: 'from-lime-500 to-green-600',   bg: 'bg-lime-50',   text: 'text-lime-600',   border: 'border-lime-100' },
];

const QUICK_TIPS = [
    'Add a clear call-to-action',
    'Test your QR code before printing',
    'Use high contrast colors',
    'Keep the design simple',
];

const FOLDERS = [
    { name: 'Marketing Q1', count: 12, color: 'bg-amber-50 border-amber-100 text-amber-500' },
    { name: 'App Downloads', count: 8,  color: 'bg-emerald-50 border-emerald-100 text-emerald-500' },
    { name: 'Business Cards', count: 6, color: 'bg-blue-50 border-blue-100 text-blue-500' },
    { name: 'Events 2024',   count: 4,  color: 'bg-purple-50 border-purple-100 text-purple-500' },
];

export default function QrGeneratorDashboard() {
    const router = useRouter();
    const { user, userData } = useAuth();
    const { currencyCode, currencySymbol, detectedCountry } = useCurrency();
    const { openUpgradeModal } = useUpgradeModal();
    const { canUse } = useEntitlements();

    const [search, setSearch] = useState('');
    const [recentQRs, setRecentQRs] = useState<any[]>([]);
    const [loadingRecent, setLoadingRecent] = useState(true);
    const [newFolderOpen, setNewFolderOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const folderInputRef = useRef<HTMLInputElement>(null);

    const plan = userData?.plan || 'free';
    const isPro = plan === 'pulse' || plan === 'elite';

    // ── Fetch recent QR codes ────────────────────────────────────────────────
    useEffect(() => {
        if (!user?.id) { setLoadingRecent(false); return; }
        (async () => {
            const { data } = await supabase
                .from('qr_codes')
                .select('id, name, type, created_at, color_primary, scan_count')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);
            setRecentQRs(data || []);
            setLoadingRecent(false);
        })();
    }, [user?.id]);

    useEffect(() => {
        if (newFolderOpen && folderInputRef.current) folderInputRef.current.focus();
    }, [newFolderOpen]);

    const filtered = QR_TYPES.filter(t =>
        search === '' ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase())
    );

    const premiumTypes = ['pdf', 'image', 'video', 'mp3', 'appstore', 'business'];
    const isPremium = (id: string) => premiumTypes.includes(id) && !canUse('qr.premium');

    const handleTypeSelect = (typeId: string, typeName: string) => {
        if (isPremium(typeId)) {
            openUpgradeModal({ featureName: typeName + ' QR Code', requiredPlan: 'pulse' });
            return;
        }
        router.push(`/qr-generator/create?type=${typeId}`);
    };

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        const now = new Date();
        const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
        if (diff === 0) return 'Today';
        if (diff === 1) return 'Yesterday';
        if (diff < 7) return `${diff}d ago`;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // ── PAYG pricing based on detected currency ───────────────────────────────
    const paygPrice = currencyCode === 'NGN' ? `₦1,500` : currencyCode === 'GBP' ? `£0.80` : `$1.00`;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-inter">

            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5">
                <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400">
                        <span>Workspace</span>
                        <ChevronRight size={13} />
                        <span>QR Code Engine</span>
                        <ChevronRight size={13} />
                        <span className="text-slate-900 font-semibold">QR Generator</span>
                    </div>

                    {/* Header right — stats pill */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            {QR_TYPES.length} Engine Types Active
                        </span>
                        {detectedCountry && (
                            <span className="text-[11px] text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded-full border border-slate-200">
                                📍 {detectedCountry} · {currencyCode}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-7">

                {/* ── Title Row ────────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-[#166FBB] to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                            <QrCode size={21} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-[19px] font-bold text-slate-900 leading-tight">
                                QR <span className="text-[#166FBB]">Generator</span>
                            </h1>
                            <p className="text-[12px] text-slate-500 mt-0.5">Create professional QR codes for any purpose in seconds.</p>
                        </div>
                    </div>

                    <Link
                        href="/qr-generator/create?type=website"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#166FBB] text-white text-[13px] font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-[0_4px_12px_rgba(22,111,187,0.3)]"
                    >
                        <Plus size={15} /> New QR Code
                    </Link>
                </div>

                {/* ── Main Grid ────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* ── LEFT: QR Type Selector (approx 67%) ───────────────────────────── */}
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h2 className="text-[15px] font-bold text-slate-900">Select QR Type</h2>
                                <p className="text-[12px] text-slate-500 mt-0.5">Choose the type of QR codes you want to generate</p>
                            </div>
                            {/* Search */}
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search QR type..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[12px] font-medium text-slate-700 outline-none focus:border-[#166FBB] focus:ring-2 focus:ring-[#166FBB]/10 w-44 transition-all placeholder:text-slate-400"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* QR Grid */}
                        <div className="p-5">
                            {filtered.length === 0 ? (
                                <div className="py-16 text-center">
                                    <QrCode size={32} className="text-slate-200 mx-auto mb-3" />
                                    <p className="text-[13px] font-semibold text-slate-500">No QR types match "{search}"</p>
                                    <button onClick={() => setSearch('')} className="text-[12px] text-[#166FBB] mt-1 hover:underline">Clear search</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {filtered.map((type) => {
                                        const Icon = type.icon;
                                        const premium = isPremium(type.id);
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => handleTypeSelect(type.id, type.name)}
                                                title={type.desc}
                                                className={`relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border transition-all duration-200 group text-center
                                                    ${premium
                                                        ? 'border-slate-100 bg-slate-50/60 hover:border-amber-200 hover:bg-amber-50/40'
                                                        : 'border-slate-100 bg-white hover:border-[#166FBB]/30 hover:bg-blue-50/40 hover:shadow-md hover:-translate-y-0.5'
                                                    }`}
                                            >
                                                {premium && (
                                                    <PremiumBadge tier="pro" iconOnly className="absolute top-1.5 right-1.5 w-3.5 h-3.5 drop-shadow-sm opacity-90" />
                                                )}
                                                <div className={`w-11 h-11 rounded-xl ${type.bg} ${type.border} border flex items-center justify-center ${type.text} group-hover:bg-gradient-to-br group-hover:${type.color} group-hover:text-white group-hover:border-transparent transition-all duration-200`}>
                                                    <Icon size={19} />
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-700 leading-tight group-hover:text-[#166FBB] transition-colors">
                                                    {type.name}
                                                </span>
                                                <span className="text-[10px] text-slate-400 leading-tight hidden sm:block line-clamp-2">
                                                    {type.desc}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer note for premium types */}
                        {!isPro && (
                            <div className="px-6 pb-4 flex items-center justify-between">
                                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                                    <Star size={11} className="text-amber-400 fill-amber-400" />
                                    <span>Gold badge = premium type. Unlock with a {paygPrice} PAYG bundle or upgrade plan.</span>
                                </p>
                                <Link href="/billing" className="text-[11px] font-bold text-[#166FBB] hover:underline whitespace-nowrap flex items-center gap-1">
                                    Upgrade <ArrowRight size={10} />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT SIDEBAR (approx 33%) ─────────────────────────────────────── */}
                    <div className="lg:col-span-4 space-y-5">

                        {/* Folders Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                                    <FolderOpen size={15} className="text-[#166FBB]" />
                                    Folders
                                </h3>
                                <button
                                    onClick={() => setNewFolderOpen(v => !v)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#166FBB] bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-colors"
                                >
                                    <Plus size={12} /> New Folder
                                </button>
                            </div>

                            {newFolderOpen && (
                                <div className="px-5 pt-3 pb-2 border-b border-slate-100">
                                    <div className="flex gap-2">
                                        <input
                                            ref={folderInputRef}
                                            type="text"
                                            value={newFolderName}
                                            onChange={e => setNewFolderName(e.target.value)}
                                            placeholder="Folder name..."
                                            className="flex-1 px-3 py-1.5 bg-[#F8FAFC] border border-slate-200 rounded-lg text-[12px] font-medium outline-none focus:border-[#166FBB]"
                                            onKeyDown={e => { if (e.key === 'Enter') { setNewFolderOpen(false); setNewFolderName(''); } if (e.key === 'Escape') setNewFolderOpen(false); }}
                                        />
                                        <button onClick={() => { setNewFolderOpen(false); setNewFolderName(''); }} className="px-3 py-1.5 bg-[#166FBB] text-white rounded-lg text-[11px] font-bold hover:bg-blue-700 transition-colors">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="p-3 space-y-1.5">
                                {FOLDERS.map(f => (
                                    <button key={f.name} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group text-left">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg ${f.color} border flex items-center justify-center`}>
                                                <FolderOpen size={14} />
                                            </div>
                                            <span className="text-[13px] font-semibold text-slate-800 group-hover:text-[#166FBB] transition-colors">{f.name}</span>
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{f.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                                    <Clock size={14} className="text-[#166FBB]" />
                                    Recent Activity
                                </h3>
                                <Link href="/qr-generator/history" className="text-[11px] font-bold text-[#166FBB] hover:underline flex items-center gap-1">
                                    View All <ArrowRight size={10} />
                                </Link>
                            </div>

                            <div className="p-3">
                                {loadingRecent ? (
                                    <div className="space-y-2">
                                        {[1, 2].map(i => (
                                            <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
                                        ))}
                                    </div>
                                ) : recentQRs.length > 0 ? (
                                    <div className="space-y-1.5">
                                        {recentQRs.map(qr => {
                                            const qrType = QR_TYPES.find(t => t.id === qr.type);
                                            const Icon = qrType?.icon || QrCode;
                                            return (
                                                <div key={qr.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                                                    <div className={`w-8 h-8 rounded-lg ${qrType?.bg || 'bg-blue-50'} ${qrType?.border || 'border-blue-100'} border flex items-center justify-center ${qrType?.text || 'text-blue-600'} shrink-0`}>
                                                        <Icon size={14} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[12px] font-semibold text-slate-800 truncate leading-tight">{qr.name || `${qr.type} QR`}</p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5 capitalize">{qr.type} · {formatDate(qr.created_at)}</p>
                                                    </div>
                                                    <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 transition-all">
                                                        <MoreVertical size={13} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <QrCode size={24} className="text-slate-200 mx-auto mb-2" />
                                        <p className="text-[12px] text-slate-500 font-medium">No QR codes yet</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Create your first QR code above</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Tips Card */}
                        <div className="bg-gradient-to-br from-[#0A192F] to-[#0F2746] rounded-2xl border border-slate-700/50 overflow-hidden shadow-lg">
                            <div className="px-5 py-3.5 border-b border-white/10 flex items-center gap-2">
                                <Lightbulb size={14} className="text-amber-400" />
                                <h3 className="text-[13px] font-bold text-white">Quick Tips</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-[11px] text-white/50 mb-3">Make your QR codes more effective:</p>
                                <div className="space-y-2">
                                    {QUICK_TIPS.map(tip => (
                                        <div key={tip} className="flex items-center gap-2">
                                            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                                            <span className="text-[11px] text-white/70">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/help/qr-best-practices"
                                    className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#166FBB] hover:text-blue-400 transition-colors"
                                >
                                    Learn more about QR best practices <ArrowRight size={10} />
                                </Link>
                            </div>
                        </div>

                        {/* Upgrade nudge for free users */}
                        {!isPro && (
                            <div className="bg-gradient-to-br from-[#166FBB] to-blue-700 rounded-2xl p-4 shadow-lg shadow-blue-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap size={15} className="text-white fill-white/30" />
                                    <span className="text-[12px] font-bold text-white">Unlock Dynamic QR</span>
                                </div>
                                <p className="text-[11px] text-white/70 mb-3 leading-relaxed">
                                    Track scans, update destinations after printing, and access all premium QR types.
                                </p>
                                <Link
                                    href="/billing"
                                    className="block text-center py-2 bg-white text-[#166FBB] text-[12px] font-bold rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    Upgrade Plan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
