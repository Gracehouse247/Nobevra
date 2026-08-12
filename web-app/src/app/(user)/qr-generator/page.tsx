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
    { id: 'product',   name: 'Product Passport', icon: Package,       desc: 'Share product info and authenticity details', color: 'from-violet-500 to-purple-600',  iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',  iconText: 'text-violet-600 dark:text-violet-400'  },
    { id: 'website',   name: 'Website',          icon: Globe,         desc: 'Link to any website or landing page',         color: 'from-blue-500 to-blue-600',      iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',      iconText: 'text-blue-600 dark:text-blue-400'      },
    { id: 'wifi',      name: 'WiFi',             icon: Wifi,          desc: 'Share WiFi network credentials',              color: 'from-cyan-500 to-teal-600',      iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',      iconText: 'text-cyan-600 dark:text-cyan-400'      },
    { id: 'vcard',     name: 'vCard',            icon: Contact,       desc: 'Share contact details instantly',             color: 'from-emerald-500 to-green-600',  iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',iconText: 'text-emerald-600 dark:text-emerald-400'},
    { id: 'business',  name: 'Business',         icon: Briefcase,     desc: 'Business profile and company info',           color: 'from-amber-500 to-orange-600',   iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',    iconText: 'text-amber-600 dark:text-amber-400'    },
    { id: 'menu',      name: 'Menu',             icon: Utensils,      desc: 'Digital menus for restaurants',               color: 'from-red-500 to-rose-600',       iconBg: 'bg-red-500/10 dark:bg-red-500/15',        iconText: 'text-red-600 dark:text-red-400'        },
    { id: 'social',    name: 'Social Media',     icon: Share2,        desc: 'Link to your social media profiles',          color: 'from-pink-500 to-fuchsia-600',   iconBg: 'bg-pink-500/10 dark:bg-pink-500/15',      iconText: 'text-pink-600 dark:text-pink-400'      },
    { id: 'email',     name: 'Email',            icon: Mail,          desc: 'Compose email with one scan',                 color: 'from-blue-400 to-indigo-600',    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',  iconText: 'text-indigo-600 dark:text-indigo-400'  },
    { id: 'sms',       name: 'SMS',              icon: MessageSquare, desc: 'Pre-fill SMS messages',                       color: 'from-green-500 to-emerald-600',  iconBg: 'bg-green-500/10 dark:bg-green-500/15',    iconText: 'text-green-600 dark:text-green-400'    },
    { id: 'appstore',  name: 'App Store',        icon: Smartphone,    desc: 'Link to your mobile app store',               color: 'from-slate-600 to-slate-800',    iconBg: 'bg-noble-icon-bg',                        iconText: 'text-noble-muted'                      },
    { id: 'location',  name: 'Location',         icon: MapPin,        desc: 'Share any location or address',               color: 'from-rose-500 to-red-600',       iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',      iconText: 'text-rose-600 dark:text-rose-400'      },
    { id: 'text',      name: 'Text',             icon: AlignLeft,     desc: 'Plain text or rich text',                     color: 'from-gray-500 to-gray-700',      iconBg: 'bg-noble-icon-bg',                        iconText: 'text-noble-muted'                      },
    { id: 'pdf',       name: 'PDF',              icon: FileText,      desc: 'Link to PDF documents',                       color: 'from-orange-500 to-amber-600',   iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',  iconText: 'text-orange-600 dark:text-orange-400'  },
    { id: 'image',     name: 'Image',            icon: ImageIcon,     desc: 'Display images when scanned',                 color: 'from-purple-500 to-violet-600',  iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',  iconText: 'text-purple-600 dark:text-purple-400'  },
    { id: 'video',     name: 'Video',            icon: Video,         desc: 'Link to video content or YouTube',            color: 'from-red-600 to-rose-700',       iconBg: 'bg-red-500/10 dark:bg-red-500/15',        iconText: 'text-red-600 dark:text-red-400'        },
    { id: 'event',     name: 'Event',            icon: Calendar,      desc: 'Event details and registration',              color: 'from-teal-500 to-cyan-600',      iconBg: 'bg-teal-500/10 dark:bg-teal-500/15',      iconText: 'text-teal-600 dark:text-teal-400'      },
    { id: 'bitcoin',   name: 'Bitcoin',          icon: Bitcoin,       desc: 'Bitcoin address for payments',                color: 'from-yellow-500 to-orange-500',  iconBg: 'bg-yellow-500/10 dark:bg-yellow-500/15',  iconText: 'text-yellow-600 dark:text-yellow-400'  },
    { id: 'whatsapp',  name: 'WhatsApp',         icon: MessageCircle, desc: 'Start WhatsApp conversation',                 color: 'from-green-600 to-emerald-700',  iconBg: 'bg-green-500/10 dark:bg-green-500/15',    iconText: 'text-green-600 dark:text-green-400'    },
    { id: 'coupon',    name: 'Coupon',           icon: Ticket,        desc: 'Discount coupons and offers',                 color: 'from-fuchsia-500 to-pink-600',   iconBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',iconText: 'text-fuchsia-600 dark:text-fuchsia-400'},
    { id: 'mp3',       name: 'MP3',              icon: Music,         desc: 'Link to audio files',                         color: 'from-indigo-500 to-purple-600',  iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',  iconText: 'text-indigo-600 dark:text-indigo-400'  },
    { id: 'call',      name: 'Call',             icon: PhoneCall,     desc: 'Initiate phone call when scanned',            color: 'from-lime-500 to-green-600',     iconBg: 'bg-lime-500/10 dark:bg-lime-500/15',      iconText: 'text-lime-600 dark:text-lime-400'      },
];

const QUICK_TIPS = [
    'Add a clear call-to-action',
    'Test your QR code before printing',
    'Use high contrast colors',
    'Keep the design simple',
];

const FOLDERS = [
    { name: 'Marketing Q1',  count: 12 },
    { name: 'App Downloads', count: 8  },
    { name: 'Business Cards',count: 6  },
    { name: 'Events 2024',   count: 4  },
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

    const paygPrice = currencyCode === 'NGN' ? `₦1,500` : currencyCode === 'GBP' ? `£0.80` : `$1.00`;

    return (
        <div className="min-h-screen bg-noble-surface pb-24 font-inter">

            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="bg-noble-card border-b border-noble-card-border px-6 lg:px-8 py-5">
                <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-noble-muted">
                        <span>Workspace</span>
                        <ChevronRight size={13} />
                        <span>QR Code Engine</span>
                        <ChevronRight size={13} />
                        <span className="text-noble-text font-semibold">QR Generator</span>
                    </div>

                    {/* Stats pill + location */}
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            {QR_TYPES.length} Engine Types Active
                        </span>
                        {detectedCountry && (
                            <span className="text-[11px] text-noble-muted font-medium px-2 py-1 bg-noble-interactive-bg rounded-full border border-noble-card-border">
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
                        <div className="w-11 h-11 bg-gradient-to-br from-noble-primary to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-noble-primary/20 shrink-0">
                            <QrCode size={21} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-[19px] font-bold text-noble-text leading-tight">
                                QR <span className="text-noble-primary">Generator</span>
                            </h1>
                            <p className="text-[12px] text-noble-muted mt-0.5">Create professional QR codes for any purpose in seconds.</p>
                        </div>
                    </div>

                    <Link
                        href="/qr-generator/create?type=website"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-noble-primary text-white text-[13px] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(22,111,187,0.25)]"
                    >
                        <Plus size={15} /> New QR Code
                    </Link>
                </div>

                {/* ── Main Grid ────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* ── LEFT: QR Type Selector ───────────────────────────── */}
                    <div className="lg:col-span-8 bg-noble-card rounded-2xl border border-noble-card-border shadow-sm overflow-hidden">

                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-noble-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h2 className="text-[15px] font-bold text-noble-text">Select QR Type</h2>
                                <p className="text-[12px] text-noble-muted mt-0.5">Choose the type of QR codes you want to generate</p>
                            </div>
                            {/* Search */}
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noble-muted" />
                                <input
                                    type="text"
                                    placeholder="Search QR type..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-noble-interactive-bg border border-noble-card-border rounded-xl text-[12px] font-medium text-noble-text outline-none focus:border-noble-primary focus:ring-2 focus:ring-noble-primary/10 w-44 transition-all placeholder:text-noble-muted"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-noble-muted hover:text-noble-text">
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* QR Grid */}
                        <div className="p-5">
                            {filtered.length === 0 ? (
                                <div className="py-16 text-center">
                                    <QrCode size={32} className="text-noble-muted/30 mx-auto mb-3" />
                                    <p className="text-[13px] font-semibold text-noble-muted">No QR types match &quot;{search}&quot;</p>
                                    <button onClick={() => setSearch('')} className="text-[12px] text-noble-primary mt-1 hover:underline">Clear search</button>
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
                                                className={`relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border transition-all duration-200 group text-center ${
                                                    premium
                                                        ? 'border-noble-card-border bg-noble-interactive-bg hover:border-amber-500/30 hover:bg-amber-500/5'
                                                        : 'border-noble-card-border bg-noble-card hover:border-noble-primary/30 hover:bg-noble-primary/5 hover:shadow-md hover:-translate-y-0.5'
                                                }`}
                                            >
                                                {premium && (
                                                    <PremiumBadge tier="pro" iconOnly className="absolute top-1.5 right-1.5 w-3.5 h-3.5 drop-shadow-sm opacity-90" />
                                                )}
                                                <div className={`w-11 h-11 rounded-xl ${type.iconBg} flex items-center justify-center ${type.iconText} group-hover:bg-gradient-to-br group-hover:${type.color} group-hover:text-white transition-all duration-200`}>
                                                    <Icon size={19} />
                                                </div>
                                                <span className="text-[11px] font-semibold text-noble-text leading-tight group-hover:text-noble-primary transition-colors">
                                                    {type.name}
                                                </span>
                                                <span className="text-[10px] text-noble-muted leading-tight hidden sm:block line-clamp-2">
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
                                <p className="text-[11px] text-noble-muted flex items-center gap-1.5">
                                    <Star size={11} className="text-amber-400 fill-amber-400" />
                                    <span>Gold badge = premium type. Unlock with a {paygPrice} PAYG bundle or upgrade plan.</span>
                                </p>
                                <Link href="/billing" className="text-[11px] font-bold text-noble-primary hover:underline whitespace-nowrap flex items-center gap-1">
                                    Upgrade <ArrowRight size={10} />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT SIDEBAR ───────────────────────────────────────── */}
                    <div className="lg:col-span-4 space-y-5">

                        {/* Folders Card */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border shadow-sm overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-noble-card-border flex items-center justify-between">
                                <h3 className="text-[13px] font-bold text-noble-text flex items-center gap-2">
                                    <FolderOpen size={15} className="text-noble-primary" />
                                    Folders
                                </h3>
                                <button
                                    onClick={() => setNewFolderOpen(v => !v)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold text-noble-primary bg-noble-primary/10 hover:bg-noble-primary/20 border border-noble-primary/20 transition-colors"
                                >
                                    <Plus size={12} /> New Folder
                                </button>
                            </div>

                            {newFolderOpen && (
                                <div className="px-5 pt-3 pb-2 border-b border-noble-card-border">
                                    <div className="flex gap-2">
                                        <input
                                            ref={folderInputRef}
                                            type="text"
                                            value={newFolderName}
                                            onChange={e => setNewFolderName(e.target.value)}
                                            placeholder="Folder name..."
                                            className="flex-1 px-3 py-1.5 bg-noble-interactive-bg border border-noble-card-border rounded-lg text-[12px] font-medium text-noble-text placeholder:text-noble-muted outline-none focus:border-noble-primary transition-colors"
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') { setNewFolderOpen(false); setNewFolderName(''); }
                                                if (e.key === 'Escape') setNewFolderOpen(false);
                                            }}
                                        />
                                        <button
                                            onClick={() => { setNewFolderOpen(false); setNewFolderName(''); }}
                                            className="px-3 py-1.5 bg-noble-primary text-white rounded-lg text-[11px] font-bold hover:opacity-90 transition-opacity"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="p-3 space-y-1.5">
                                {FOLDERS.map(f => (
                                    <button key={f.name} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-noble-interactive-bg transition-colors group text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-noble-primary/10 border border-noble-primary/20 flex items-center justify-center text-noble-primary">
                                                <FolderOpen size={14} />
                                            </div>
                                            <span className="text-[13px] font-semibold text-noble-text group-hover:text-noble-primary transition-colors">{f.name}</span>
                                        </div>
                                        <span className="text-[11px] font-bold text-noble-muted bg-noble-interactive-bg px-2 py-0.5 rounded-md border border-noble-card-border">{f.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Card */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border shadow-sm overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-noble-card-border flex items-center justify-between">
                                <h3 className="text-[13px] font-bold text-noble-text flex items-center gap-2">
                                    <Clock size={14} className="text-noble-primary" />
                                    Recent Activity
                                </h3>
                                <Link href="/qr-generator/history" className="text-[11px] font-bold text-noble-primary hover:underline flex items-center gap-1">
                                    View All <ArrowRight size={10} />
                                </Link>
                            </div>

                            <div className="p-3">
                                {loadingRecent ? (
                                    <div className="space-y-2">
                                        {[1, 2].map(i => (
                                            <div key={i} className="h-14 bg-noble-interactive-bg rounded-xl animate-pulse" />
                                        ))}
                                    </div>
                                ) : recentQRs.length > 0 ? (
                                    <div className="space-y-1.5">
                                        {recentQRs.map(qr => {
                                            const qrType = QR_TYPES.find(t => t.id === qr.type);
                                            const Icon = qrType?.icon || QrCode;
                                            return (
                                                <div key={qr.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-noble-interactive-bg transition-colors group">
                                                    <div className={`w-8 h-8 rounded-lg ${qrType?.iconBg || 'bg-noble-primary/10'} flex items-center justify-center ${qrType?.iconText || 'text-noble-primary'} shrink-0`}>
                                                        <Icon size={14} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[12px] font-semibold text-noble-text truncate leading-tight">{qr.name || `${qr.type} QR`}</p>
                                                        <p className="text-[10px] text-noble-muted mt-0.5 capitalize">{qr.type} · {formatDate(qr.created_at)}</p>
                                                    </div>
                                                    <button className="opacity-0 group-hover:opacity-100 p-1 text-noble-muted hover:text-noble-text transition-all">
                                                        <MoreVertical size={13} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <QrCode size={24} className="text-noble-muted/30 mx-auto mb-2" />
                                        <p className="text-[12px] text-noble-muted font-medium">No QR codes yet</p>
                                        <p className="text-[11px] text-noble-muted/60 mt-0.5">Create your first QR code above</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Tips Card — uses noble-card so it adapts to dark mode */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border overflow-hidden shadow-sm">
                            <div className="px-5 py-3.5 border-b border-noble-card-border flex items-center gap-2">
                                <Lightbulb size={14} className="text-amber-400" />
                                <h3 className="text-[13px] font-bold text-noble-text">Quick Tips</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-[11px] text-noble-muted mb-3">Make your QR codes more effective:</p>
                                <div className="space-y-2">
                                    {QUICK_TIPS.map(tip => (
                                        <div key={tip} className="flex items-center gap-2">
                                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                                            <span className="text-[11px] text-noble-text">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/help/qr-best-practices"
                                    className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-noble-primary hover:opacity-80 transition-opacity"
                                >
                                    Learn more about QR best practices <ArrowRight size={10} />
                                </Link>
                            </div>
                        </div>

                        {/* Upgrade nudge for free users */}
                        {!isPro && (
                            <div className="bg-gradient-to-br from-noble-primary to-blue-700 rounded-2xl p-4 shadow-lg shadow-noble-primary/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap size={15} className="text-white fill-white/30" />
                                    <span className="text-[12px] font-bold text-white">Unlock Dynamic QR</span>
                                </div>
                                <p className="text-[11px] text-white/70 mb-3 leading-relaxed">
                                    Track scans, update destinations after printing, and access all premium QR types.
                                </p>
                                <Link
                                    href="/billing"
                                    className="block text-center py-2 bg-white/15 text-white text-[12px] font-bold rounded-xl hover:bg-white/25 transition-colors border border-white/20"
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
