'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { X, Menu, ChevronDown, ChevronRight, Zap, ExternalLink } from 'lucide-react';
import { brand } from '@/lib/brand';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [announcementVisible, setAnnouncementVisible] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    // ── Features Mega Menu Data (Nobevra tools) ──
    const featureCategories = [
        {
            category: "Invoicing & Billing",
            items: [
                { title: "Online Invoicing", desc: "180+ templates & billing engine", icon: "receipt_long", href: "/invoicing" },
                { title: "Free Invoice Generator", desc: "Create & download PDF invoices", icon: "bolt", href: "/free-invoice-generator" },
                { title: "Invoice Templates Hub", desc: "Industry & country tax templates", icon: "file_copy", href: "/templates" },
                { title: "Recurring Billing", desc: "Automate retainers & subscriptions", icon: "autorenew", href: "/recurring-billing-software" },
            ]
        },
        {
            category: "CRM & Client Hub",
            items: [
                { title: "Client Management CRM", desc: "Connected customer pipeline", icon: "hub", href: "/crm" },
                { title: "Client Portal Hub", desc: "White-label self-service billing", icon: "dashboard_customize", href: "/client-portal-software" },
                { title: "Client Contracts", desc: "E-signatures & legal agreements", icon: "history_edu", href: "/client-contracts" },
                { title: "Freelance CRM", desc: "Lightweight client vault", icon: "contacts", href: "/lightweight-crm-for-freelancers" },
            ]
        },
        {
            category: "Operations & Finance",
            items: [
                { title: "Cash Flow Analytics", desc: "Forecasting & aging reports", icon: "query_stats", href: "/cash-flow-analytics" },
                { title: "Expense Management", desc: "Track spend & tax deductions", icon: "account_balance_wallet", href: "/expense-management" },
                { title: "AI Receipt Scanner", desc: "Instant OCR categorization", icon: "document_scanner", href: "/ai-receipt-scanner" },
                { title: "Products & Inventory", desc: "Real-time stock catalog", icon: "inventory_2", href: "/products-inventory" },
            ]
        },
        {
            category: "Growth & Identity",
            items: [
                { title: "AI Business Assistant", desc: "Natural language ops & insights", icon: "auto_awesome", href: "/ai-business-assistant" },
                { title: "Digital Business Cards", desc: "NFC tap & custom profile", icon: "contactless", href: "/digital-business-card" },
                { title: "Dynamic QR Codes", desc: "Custom QR & scan telemetry", icon: "radar", href: "/qr-code-generator" },
                { title: "Global Payments", desc: "Accept 30+ currencies worldwide", icon: "payments", href: "/payments" },
            ]
        }
    ];

    // ── Solutions Dropdown Data (Personas & Use Cases) ──
    const solutionsLinks = [
        {
            title: "For Freelancers",
            desc: "Independent professionals",
            icon: "person",
            href: "/solutions/simple-invoicing-for-freelancers",
        },
        {
            title: "For Agencies",
            desc: "Creative & service teams",
            icon: "groups",
            href: "/solutions/agency-billing-platform",
        },
        {
            title: "For Small Businesses",
            desc: "Growing companies",
            icon: "storefront",
            href: "/solutions/best-small-business-invoicing-software",
        },
        {
            title: "For E-commerce",
            desc: "Shopify & digital stores",
            icon: "shopping_cart",
            href: "/solutions/ecommerce-invoice-automation",
        },
        {
            title: "Enterprise",
            desc: "High-volume operations",
            icon: "domain",
            href: "/solutions/enterprise-billing-platform",
        },
    ];

    // ── Products Dropdown Data (Noble's World ecosystem) ──
    const ecosystemProducts = [
        {
            title: "Clarity Engine",
            desc: "Business Intelligence",
            icon: "insights",
            href: "https://clarity.noblesworld.com.ng/",
            external: true,
            badge: null,
        },
        {
            title: "NobleSEO",
            desc: "SEO Optimization Platform",
            icon: "travel_explore",
            href: "#",
            external: false,
            badge: "Coming Soon",
        },
        {
            title: "NobleMart",
            desc: "Online Marketplace",
            icon: "storefront",
            href: "#",
            external: false,
            badge: "Coming Soon",
        },
        {
            title: "NobleMind",
            desc: "AI-Powered Cognitive Sync",
            icon: "psychology",
            href: "https://noblemind.noblesworld.com.ng/",
            external: true,
            badge: null,
        },
        {
            title: "Digital Marketing Agency",
            desc: "Full-service growth partner",
            icon: "campaign",
            href: "https://noblesworld.com.ng/",
            external: true,
            badge: null,
        },
        {
            title: "Business Manager",
            desc: "Financial analysis tools",
            icon: "business_center",
            href: "https://noblesworld.com.ng/small-business-financial-analysis/",
            external: true,
            badge: null,
        },
        {
            title: "HirePilot",
            desc: "Talent acquisition engine",
            icon: "work",
            href: "#",
            external: false,
            badge: "Coming Soon",
        },
        {
            title: "Epigen Health",
            desc: "AI Health Mobile App",
            icon: "favorite",
            href: "#",
            external: false,
            badge: "Coming Soon",
        },
    ];

    // ── Learn & Resources Dropdown Data ──
    const learnLinks = [
        {
            title: "Guides & Tutorials",
            desc: "Invoicing & cash flow playbooks",
            icon: "menu_book",
            href: "/guides",
            external: false,
        },
        {
            title: "Invoice Templates",
            desc: "18+ industry & tax templates",
            icon: "file_copy",
            href: "/templates",
            external: false,
        },
        {
            title: "Business Glossary",
            desc: "Financial & SaaS terms defined",
            icon: "library_books",
            href: "/glossary",
            external: false,
        },
        {
            title: "Blog & Updates",
            desc: "Product news and founder tips",
            icon: "article",
            href: "/blog",
            external: false,
        },
        {
            title: "Help Center",
            desc: "Support and documentation",
            icon: "help",
            href: "/help-center",
            external: false,
        },
    ];

    const navLinks = [
        { label: 'Pricing', href: '/pricing' },
    ];

    return (
        <>
            {/* ── Announcement Bar ── */}
            <AnimatePresence initial={false}>
                {announcementVisible && (
                    <motion.div
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 right-0 z-[130] bg-gradient-to-r from-noble-blue via-[#01A0E2] to-noble-blue overflow-hidden"
                    >
                        <div className="flex items-center justify-center gap-3 px-6 py-2.5 text-white text-xs font-bold relative">
                            <Zap className="w-3.5 h-3.5 text-electric-cyan shrink-0" />
                            <span className="tracking-wide">
                                🎉 <span className="font-black">New:</span> QR Code Payments are now live —{' '}
                                <Link href="/register" className="underline underline-offset-2 hover:text-electric-cyan transition-colors inline-block p-2">
                                    Try it free today →
                                </Link>
                            </span>
                            <button
                                onClick={() => setAnnouncementVisible(false)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                                aria-label="Dismiss announcement"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skip to main content link for keyboard and screen reader accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-noble-blue focus:text-white focus:font-black focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
            >
                Skip to main content
            </a>

            {/* ── Main Navbar ── */}
            <nav
                className={`fixed left-0 right-0 z-[120] transition-all duration-300 ${announcementVisible ? 'top-[38px]' : 'top-0'} bg-white/95 backdrop-blur-md border-b border-slate-100/80 shadow-xs ${
                    isScrolled ? 'shadow-sm border-slate-200/80' : ''
                }`}
                onMouseLeave={() => setActiveMenu(null)}
                aria-label="Main Navigation"
            >
                <div className="max-w-[1430px] mx-auto flex justify-between items-center px-4 md:px-16 h-[80px] w-full relative">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src={brand.assets.logo} alt="Nobevra Logo" width={130} height={32} className="h-8 w-auto object-contain" style={{ width: 'auto' }} priority />
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-8 h-full">

                        {/* ── FEATURES Mega Menu trigger ── */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('features')}
                        >
                            <button className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${activeMenu === 'features' ? 'text-noble-blue' : 'text-near-black/70 hover:text-noble-blue'}`}>
                                Features <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'features' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Features Mega Menu — positioned relative to full nav width */}
                        <AnimatePresence>
                            {activeMenu === 'features' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.18 }}
                                    onMouseEnter={() => setActiveMenu('features')}
                                    className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[960px] bg-noble-surface dark:bg-noble-card/98 backdrop-blur-2xl rounded-3xl p-10 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-near-black/5 z-50"
                                >
                                    <div className="grid grid-cols-4 gap-x-10 gap-y-10">
                                        {featureCategories.map((category) => (
                                            <div key={category.category} className="space-y-4">
                                                <h5 className="text-[10px] font-black text-near-black uppercase tracking-[0.2em] opacity-40">{category.category}</h5>
                                                <div className="space-y-4">
                                                    {category.items.map((item) => (
                                                        <Link key={item.title} href={item.href} className="flex gap-3 group cursor-pointer">
                                                            <div className="shrink-0 w-8 h-8 rounded-xl bg-noble-blue/10 flex items-center justify-center text-noble-blue group-hover:bg-noble-blue group-hover:text-white transition-all">
                                                                <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-near-black group-hover:text-noble-blue transition-colors text-sm mb-0.5 leading-tight">{item.title}</h4>
                                                                <p className="text-[10px] text-near-black/50 leading-normal">{item.desc}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-near-black/5 flex justify-center">
                                        <Link href="/features" className="text-sm font-bold text-noble-blue hover:text-near-black transition-colors flex items-center gap-1 group">
                                            Explore all our features and tools
                                            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── SOLUTIONS Dropdown ── */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('solutions')}
                        >
                            <button className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${activeMenu === 'solutions' ? 'text-noble-blue' : 'text-near-black/70 hover:text-noble-blue'}`}>
                                Solutions <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'solutions' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeMenu === 'solutions' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.18 }}
                                        onMouseEnter={() => setActiveMenu('solutions')}
                                        className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[300px] bg-noble-surface dark:bg-noble-card/98 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-near-black/5 z-50"
                                    >
                                        <div className="space-y-2">
                                            {solutionsLinks.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="flex items-start gap-4 p-3 rounded-2xl group hover:bg-noble-blue/5 transition-all"
                                                >
                                                    <div className="shrink-0 w-9 h-9 rounded-xl bg-slate-50 dark:bg-[#0D1B2E] border border-slate-100 dark:border-noble-border flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-noble-blue group-hover:text-white group-hover:border-noble-blue transition-all">
                                                        <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-near-black group-hover:text-noble-blue transition-colors text-sm">{item.title}</h4>
                                                        <p className="text-[10px] text-near-black/50 mt-0.5 leading-normal">{item.desc}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── ECOSYSTEM Dropdown ── */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('products')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <button className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${activeMenu === 'products' ? 'text-noble-blue' : 'text-near-black/70 hover:text-noble-blue'}`}>
                                Ecosystem <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeMenu === 'products' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[420px] bg-noble-surface dark:bg-noble-card/98 backdrop-blur-2xl rounded-2xl p-5 shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-near-black/5"
                                    >
                                        {/* Header */}
                                        <p className="text-[9px] font-black text-near-black/40 uppercase tracking-[0.25em] mb-3">Noble's World Ecosystem</p>
                                        <div className="grid grid-cols-2 gap-1">
                                            {ecosystemProducts.map((product) => {
                                                return (
                                                    <a
                                                        key={product.title}
                                                        href={product.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl group hover:bg-noble-blue/5 transition-all cursor-pointer"
                                                    >
                                                        <div className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 dark:bg-[#0D1B2E] border border-slate-100 dark:border-noble-border flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-noble-blue group-hover:text-white group-hover:border-noble-blue transition-all">
                                                            <span className="material-symbols-outlined text-[13px]">{product.icon}</span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1">
                                                                <h4 className="font-bold text-near-black group-hover:text-noble-blue transition-colors text-xs leading-tight truncate">{product.title}</h4>
                                                                {product.external && <ExternalLink className="w-2 h-2 text-near-black/30 shrink-0" />}
                                                            </div>
                                                            {product.badge
                                                                ? <span className="text-[8px] font-black uppercase tracking-wider text-amber-500">{product.badge}</span>
                                                                : <p className="text-[9px] text-near-black/40 truncate">{product.desc}</p>
                                                            }
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-near-black/5 text-center">
                                            <a href="https://noblesworld.com.ng/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-noble-blue hover:text-near-black transition-colors flex items-center justify-center gap-1 group">
                                                Explore Noble's World
                                                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── LEARN Dropdown ── */}
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('learn')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <button className={`text-sm font-bold tracking-wide transition-colors flex items-center gap-1 ${activeMenu === 'learn' ? 'text-noble-blue' : 'text-near-black/70 hover:text-noble-blue'}`}>
                                Learn <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'learn' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeMenu === 'learn' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[300px] bg-noble-surface dark:bg-noble-card/98 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-near-black/5"
                                    >
                                        <div className="space-y-2">
                                            {learnLinks.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="flex items-start gap-4 p-3 rounded-2xl group hover:bg-noble-blue/5 transition-all"
                                                >
                                                    <div className="shrink-0 w-9 h-9 rounded-xl bg-slate-50 dark:bg-[#0D1B2E] border border-slate-100 dark:border-noble-border flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-noble-blue group-hover:text-white group-hover:border-noble-blue transition-all">
                                                        <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-near-black group-hover:text-noble-blue transition-colors text-sm">{item.title}</h4>
                                                        <p className="text-[10px] text-near-black/50 mt-0.5 leading-normal">{item.desc}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Static nav links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-bold tracking-wide text-near-black/70 hover:text-noble-blue transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA Group */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            className="text-sm font-bold text-near-black/60 hover:text-near-black transition-colors"
                            href={user ? '/dashboard' : '/login'}
                        >
                            {user ? 'Dashboard' : 'Log In'}
                        </Link>
                        <div className="w-px h-5 bg-near-black/10"></div>
                        <Link
                            href="/register"
                            className="text-white px-7 py-3 rounded-xl font-extrabold text-sm hover:shadow-xl transition-all flex items-center gap-2 scale-100 hover:scale-105 active:scale-95 shadow-lg shadow-noble-blue/30"
                            style={{ backgroundColor: '#166FBB' }}
                        >
                            Start Free
                            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-near-black/5 text-near-black hover:bg-near-black/10 transition-colors focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none"
                        aria-label="Open navigation menu"
                        aria-expanded={mobileOpen}
                    >
                        <Menu className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[140] bg-near-black/40 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="fixed top-0 right-0 bottom-0 z-[150] w-[85vw] max-w-sm bg-noble-surface dark:bg-noble-card shadow-2xl flex flex-col overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-near-black/5">
                                <Image src={brand.assets.logo} alt="Nobevra Logo" width={110} height={28} className="h-7 w-auto object-contain" style={{ width: 'auto', height: 'auto' }} priority />
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-near-black/5 text-near-black hover:bg-near-black/10 transition-colors focus-visible:ring-2 focus-visible:ring-noble-blue focus-visible:outline-none"
                                    aria-label="Close navigation menu"
                                >
                                    <X className="w-5 h-5" aria-hidden="true" />
                                </button>
                            </div>

                            <nav className="flex-1 px-6 py-8 space-y-1">
                                {/* Pricing */}
                                <Link
                                    href="/pricing"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-near-black font-bold text-sm hover:bg-noble-blue/5 hover:text-noble-blue transition-colors"
                                >
                                    Pricing
                                    <ChevronRight className="w-4 h-4 opacity-30" />
                                </Link>

                                {/* Mobile Features Accordion */}
                                <div>
                                    <button
                                        onClick={() => setMobileSubmenu(mobileSubmenu === 'features' ? null : 'features')}
                                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-near-black font-bold text-sm hover:bg-noble-blue/5 hover:text-noble-blue transition-colors"
                                    >
                                        Features
                                        <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${mobileSubmenu === 'features' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileSubmenu === 'features' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-4 mt-1 space-y-1"
                                            >
                                                {featureCategories.flatMap(cat => cat.items).map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        href={item.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-near-black/70 hover:text-noble-blue hover:bg-noble-blue/5 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-sm text-noble-blue">{item.icon}</span>
                                                        <div>
                                                            <div className="font-bold text-sm">{item.title}</div>
                                                            <div className="text-[10px] text-near-black/40">{item.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <Link
                                                    href="/features"
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-noble-blue font-bold text-sm hover:bg-noble-blue/5 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">grid_view</span>
                                                    View all features
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mobile Solutions Accordion */}
                                <div>
                                    <button
                                        onClick={() => setMobileSubmenu(mobileSubmenu === 'solutions' ? null : 'solutions')}
                                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-near-black font-bold text-sm hover:bg-noble-blue/5 hover:text-noble-blue transition-colors"
                                    >
                                        Solutions
                                        <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${mobileSubmenu === 'solutions' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileSubmenu === 'solutions' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-4 mt-1 space-y-1"
                                            >
                                                {solutionsLinks.map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        href={item.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-near-black/70 hover:text-noble-blue hover:bg-noble-blue/5 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-sm text-slate-400 dark:text-slate-500">{item.icon}</span>
                                                        <div>
                                                            <div className="font-bold text-sm">{item.title}</div>
                                                            <div className="text-[10px] text-near-black/40">{item.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mobile Ecosystem Accordion */}
                                <div>
                                    <button
                                        onClick={() => setMobileSubmenu(mobileSubmenu === 'products' ? null : 'products')}
                                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-near-black font-bold text-sm hover:bg-noble-blue/5 hover:text-noble-blue transition-colors"
                                    >
                                        Ecosystem
                                        <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${mobileSubmenu === 'products' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileSubmenu === 'products' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-4 mt-1 space-y-1"
                                            >
                                                {ecosystemProducts.map((product) => {
                                                    return (
                                                        <a
                                                            key={product.title}
                                                            href={product.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={() => setMobileOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-near-black/70 hover:text-noble-blue hover:bg-noble-blue/5 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-sm text-slate-400 dark:text-slate-500">{product.icon}</span>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="font-bold text-sm">{product.title}</div>
                                                                    {product.external && <ExternalLink className="w-2.5 h-2.5 text-near-black/30" />}
                                                                </div>
                                                                <div className="text-[10px] text-near-black/40">{product.desc}</div>
                                                            </div>
                                                            {product.badge && (
                                                                <span className="text-[8px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded-full shrink-0">{product.badge}</span>
                                                            )}
                                                        </a>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mobile Learn Accordion */}
                                <div>
                                    <button
                                        onClick={() => setMobileSubmenu(mobileSubmenu === 'learn' ? null : 'learn')}
                                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-near-black font-bold text-sm hover:bg-noble-blue/5 hover:text-noble-blue transition-colors"
                                    >
                                        Learn
                                        <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${mobileSubmenu === 'learn' ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {mobileSubmenu === 'learn' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden pl-4 mt-1 space-y-1"
                                            >
                                                {learnLinks.map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        href={item.href}
                                                        target={item.external ? "_blank" : undefined}
                                                        rel={item.external ? "noopener noreferrer" : undefined}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-near-black/70 hover:text-noble-blue hover:bg-noble-blue/5 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-sm text-slate-400 dark:text-slate-500">{item.icon}</span>
                                                        <div>
                                                            <div className="font-bold text-sm">{item.title}</div>
                                                            <div className="text-[10px] text-near-black/40">{item.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </nav>

                            {/* Drawer Footer CTAs */}
                            <div className="px-6 py-6 border-t border-near-black/5 space-y-3">
                                <Link
                                    href="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-extrabold text-sm shadow-lg shadow-noble-blue/30 hover:opacity-90 transition-all active:scale-95"
                                    style={{ backgroundColor: '#166FBB' }}
                                >
                                    Start Free
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </Link>
                                <Link
                                    href={user ? '/dashboard' : '/login'}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center w-full py-4 rounded-2xl text-near-black font-bold text-sm bg-near-black/5 hover:bg-near-black/10 transition-colors"
                                >
                                    {user ? 'Go to Dashboard' : 'Log In'}
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
