'use client';

import React from 'react';
import Link from 'next/link';
import {
    Plus, Search, Filter, Layers, MoreHorizontal, Tag,
    Package, Loader2, Trash2, Sparkles, Download, Grid3X3,
    List, ChevronLeft, ChevronRight, TrendingUp, AlertTriangle,
    DollarSign, Boxes, Wrench, ArrowUpRight, Edit2, Eye,
    ArrowRightLeft, Check, X, AlertCircle, Barcode
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { productService, teamService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import NobleEmptyState from '@/components/shared/NobleEmptyState';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['All Items', 'Products', 'Services', 'Inventory'];

interface Product {
    id: string;
    name: string;
    description?: string | null;
    type?: string;
    unit_price?: number;
    tax_rate?: number | null;
    sku?: string | null;
    stock_quantity?: number | null;
    min_stock_level?: number | null;
    track_inventory?: boolean;
    is_active?: boolean;
}

export default function ProductsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { formatMoney, currencyCode } = useCurrency();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [activeTab, setActiveTab] = React.useState('All Items');
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [viewMode, setViewMode] = React.useState<'table' | 'grid'>('table');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
    const itemsPerPage = 10;

    // ── Adjust Stock Modal State ──
    const [showAdjustModal, setShowAdjustModal] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
    const [adjustQty, setAdjustQty] = React.useState('');
    const [adjustType, setAdjustType] = React.useState<'add' | 'set'>('add');
    const [adjusting, setAdjusting] = React.useState(false);

    const fetchProducts = React.useCallback(async () => {
        if (!user) return;
        try {
            const tData = await teamService.getTeamByUserId(user.id);
            const teamId = tData?.id || user.id;
            const data = await productService.getProducts(teamId);
            setProducts(data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            toast.error('Failed to load catalog');
        } finally {
            setLoading(false);
        }
    }, [user]);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Close dropdown on outside click
    React.useEffect(() => {
        const handleClick = () => setOpenMenuId(null);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            await productService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success('Item deleted successfully');
        } catch (err) {
            toast.error('Failed to delete item');
        }
    };

    // ── Stock Adjustment Handlers ──
    const handleOpenAdjustment = (product: Product) => {
        setSelectedProduct(product);
        setAdjustQty('');
        setAdjustType('add');
        setShowAdjustModal(true);
    };

    const handleSaveAdjustment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        const qtyNum = parseInt(adjustQty);
        if (isNaN(qtyNum)) { toast.error('Please enter a valid quantity'); return; }

        let newStock = 0;
        if (adjustType === 'add') {
            newStock = (selectedProduct.stock_quantity || 0) + qtyNum;
        } else {
            newStock = qtyNum;
        }
        if (newStock < 0) { toast.error('Stock quantity cannot be negative'); return; }

        setAdjusting(true);
        try {
            await productService.updateProduct(selectedProduct.id, {
                stock_quantity: newStock,
                track_inventory: true,
            });
            toast.success(`Stock updated for ${selectedProduct.name}`);
            setShowAdjustModal(false);
            fetchProducts();
        } catch (err) {
            console.error('Error adjusting stock:', err);
            toast.error('Failed to adjust stock');
        } finally {
            setAdjusting(false);
        }
    };

    const filteredProducts = React.useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesSearch) return false;
            if (activeTab === 'All Items') return true;
            const pType = (product.type || 'product').toLowerCase();
            if (activeTab === 'Products') return pType === 'product';
            if (activeTab === 'Services') return pType === 'service';
            if (activeTab === 'Inventory') {
                // show all physical products; sub-filter by stock urgency
                if (pType !== 'product') return false;
                return true;
            }
            return true;
        });
    }, [products, searchQuery, activeTab]);

    // Within Inventory tab: low stock & out of stock items come first
    const sortedForInventory = React.useMemo(() => {
        if (activeTab !== 'Inventory') return filteredProducts;
        return [...filteredProducts].sort((a, b) => {
            const scoreA = (a.stock_quantity ?? 0) === 0 ? 0 : (a.stock_quantity ?? 0) <= (a.min_stock_level || 5) ? 1 : 2;
            const scoreB = (b.stock_quantity ?? 0) === 0 ? 0 : (b.stock_quantity ?? 0) <= (b.min_stock_level || 5) ? 1 : 2;
            return scoreA - scoreB;
        });
    }, [filteredProducts, activeTab]);

    const displayedProducts = activeTab === 'Inventory' ? sortedForInventory : filteredProducts;

    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
    const paginatedProducts = displayedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Stats
    const totalProductItems = products.filter(p => (p.type || 'product').toLowerCase() === 'product').length;
    const totalServices = products.filter(p => (p.type || 'product').toLowerCase() === 'service').length;
    const lowStockItems = products.filter(p => {
        const type = (p.type || 'product').toLowerCase();
        return type === 'product' && p.stock_quantity !== undefined && p.stock_quantity !== null && p.stock_quantity <= (p.min_stock_level || 5) && p.stock_quantity > 0;
    }).length;
    const outOfStockItems = products.filter(p => {
        const type = (p.type || 'product').toLowerCase();
        return type === 'product' && (p.stock_quantity === 0 || p.stock_quantity === null || p.stock_quantity === undefined);
    }).length;
    const totalValue = products.reduce((sum, p) => sum + ((p.unit_price || 0) * (p.stock_quantity || 0)), 0);

    const getStockDisplay = (product: Product) => {
        const type = (product.type || 'product').toLowerCase();
        if (type === 'service') return { label: '—', sub: 'Unlimited', color: 'text-slate-400 dark:text-slate-500', badge: null };
        const qty = product.stock_quantity;
        if (qty === null || qty === undefined) return { label: '—', sub: 'Not tracked', color: 'text-slate-400 dark:text-slate-500', badge: null };
        if (qty === 0) return { label: '0', sub: 'Out of stock', color: 'text-red-500', badge: 'out' };
        if (qty <= (product.min_stock_level || 5)) return { label: String(qty), sub: 'Low stock', color: 'text-amber-500', badge: 'low' };
        return { label: String(qty), sub: 'In stock', color: 'text-emerald-600', badge: 'ok' };
    };

    const statCards = [
        {
            label: 'Total Items',
            value: products.length,
            sub: `${totalProductItems} products · ${totalServices} services`,
            icon: Boxes,
            iconBg: 'bg-[#01A0E2]/10',
            iconColor: 'text-[#01A0E2]',
        },
        {
            label: 'Low Stock',
            value: lowStockItems,
            sub: lowStockItems > 0 ? 'Needs restocking' : 'All stocked',
            icon: AlertTriangle,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-500',
            isAlert: lowStockItems > 0,
            onClick: () => { setActiveTab('Inventory'); setCurrentPage(1); },
        },
        {
            label: 'Out of Stock',
            value: outOfStockItems,
            sub: outOfStockItems > 0 ? 'Urgent restock' : 'None',
            icon: AlertCircle,
            iconBg: 'bg-red-50',
            iconColor: 'text-red-500',
            isUrgent: outOfStockItems > 0,
            onClick: () => { setActiveTab('Inventory'); setCurrentPage(1); },
        },
        {
            label: 'Services',
            value: totalServices,
            sub: 'Unlimited capacity',
            icon: Wrench,
            iconBg: 'bg-violet-100',
            iconColor: 'text-violet-600',
        },
        {
            label: 'Inventory Value',
            value: formatMoney(totalValue),
            sub: 'Stock at unit price',
            icon: DollarSign,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            isLarge: true,
        },
    ];

    return (
        <div className="min-h-full bg-noble-bg pb-24 lg:pb-10">
            {/* Ambient glows */}
            <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-[#01A0E2]/4 blur-[120px] rounded-full pointer-events-none z-0 -translate-y-1/3 translate-x-1/3" />
            <div className="fixed top-1/3 left-0 w-[500px] h-[500px] bg-[#006970]/4 blur-[100px] rounded-full pointer-events-none z-0 -translate-x-1/2" />

            <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-8 relative z-10">

                {/* ── Page Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-[19px] font-bold text-noble-text tracking-tight leading-tight">
                            Products &amp; Services
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                            Manage your catalog and inventory for faster invoicing
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => document.getElementById('import-file-input')?.click()} className="flex items-center gap-2 px-4 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-all shadow-sm">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Import Items</span>
                            <input type="file" id="import-file-input" className="hidden" accept=".csv, .xlsx, .xls" onChange={(e) => { if (e.target.files?.length) { alert('Import started successfully.'); } }} />
                        </button>
                        <button
                            onClick={() => {
                                if (!canUse('products.catalog')) {
                                    openUpgradeModal({ featureName: 'Product Catalog', requiredPlan: 'pulse' });
                                    return;
                                }
                                router.push('/products/new');
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#006970] to-[#01A0E2] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#01A0E2]/25 hover:-translate-y-0.5 transition-all"
                        >
                            <Plus className="w-4 h-4" strokeWidth={2.5} />
                            Add New Item
                            {!canUse('products.catalog') && <PremiumBadge tier="pulse" iconOnly />}
                        </button>
                    </div>
                </div>

                {/* ── Stats Strip ── */}
                {products.length === 0 && !loading ? (
                    <div className="mt-8">
                        <ProactiveEmptyState
                            title="Add your products & services"
                            description="Create your product catalog to add items to invoices instantly. Track inventory, set prices, and manage categories."
                            variant="empty"
                            illustrationIcons={[Package, Tag, Barcode]}
                            tips={["Tip: Products with images look more professional on invoices", "Tip: Use categories to organize your catalog"]}
                            actions={[
                                { label: '+ Add Your First Item', onClick: () => router.push('/products/new'), variant: 'primary' },
                                { label: 'Import from CSV', onClick: () => document.getElementById('import-file-input')?.click(), variant: 'secondary' }
                            ]}
                        />
                    </div>
                ) : (
                <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {statCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={card.onClick}
                                className={`bg-noble-surface dark:bg-noble-card rounded-2xl border p-4 shadow-sm hover:shadow-md transition-all ${
                                    card.isUrgent ? 'border-red-200 cursor-pointer' :
                                    card.isAlert ? 'border-amber-200 cursor-pointer' :
                                    'border-slate-100 dark:border-noble-border'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                                        <Icon className={`w-4.5 h-4.5 ${card.iconColor}`} size={18} />
                                    </div>
                                    {card.isUrgent && (
                                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                                            Urgent
                                        </span>
                                    )}
                                    {card.isAlert && !card.isUrgent && (
                                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                            Alert
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium mb-1">{card.label}</p>
                                <p className={`font-bold text-noble-text leading-tight ${card.isLarge ? 'text-[15px]' : 'text-2xl'}`}>
                                    {card.value}
                                </p>
                                <p className={`text-[11px] mt-1 font-medium ${
                                    card.isUrgent ? 'text-red-500' :
                                    (card.isAlert && lowStockItems > 0) ? 'text-amber-500' :
                                    'text-slate-400 dark:text-slate-500'
                                }`}>
                                    {card.sub}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Main Table Card ── */}
                <div className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-slate-100 dark:border-noble-border shadow-sm overflow-hidden">

                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 pt-5 pb-4 border-b border-slate-100 dark:border-noble-border">
                        {/* Tabs */}
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#0D1B2E] rounded-xl p-1">
                            {TABS.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                                        activeTab === tab
                                            ? 'bg-noble-surface dark:bg-noble-card text-noble-text shadow-sm'
                                            : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-200'
                                    }`}
                                >
                                    {tab}
                                    {tab === 'Inventory' && (lowStockItems + outOfStockItems) > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                            {lowStockItems + outOfStockItems}
                                        </span>
                                    )}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="tab-indicator"
                                            className="absolute inset-0 bg-noble-surface dark:bg-noble-card rounded-lg shadow-sm -z-10"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search items..."
                                    className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#01A0E2]/20 focus:border-[#01A0E2]/40 transition-all w-48 lg:w-64"
                                />
                            </div>
                            {activeTab !== 'Inventory' && (
                                <>
                                    <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border text-slate-600 dark:text-slate-400 dark:text-slate-500 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] transition-all">
                                        <Filter className="w-4 h-4" />
                                        <span className="hidden sm:inline">Filters</span>
                                    </button>
                                    <div className="flex items-center bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-[#01A0E2] text-white' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030]'}`}
                                            title="Grid view"
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('table')}
                                            className={`p-2 transition-all ${viewMode === 'table' ? 'bg-[#01A0E2] text-white' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030]'}`}
                                            title="List view"
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Inventory Tab Sub-filters */}
                    {activeTab === 'Inventory' && (
                        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/40">
                            <span className="text-[12px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 mr-1">Filter:</span>
                            {['All', 'Low Stock', 'Out of Stock'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => {
                                        // we re-use searchQuery state is not ideal; instead just track inline
                                        // But for now these are visual sub-filters applied in the render below
                                        setSearchQuery(f === 'All' ? '' : searchQuery);
                                    }}
                                    className="px-3 py-1 rounded-lg text-[12px] font-semibold border transition-all bg-noble-surface dark:bg-noble-card border-noble-border text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:border-[#01A0E2]/40 hover:text-[#01A0E2]"
                                >
                                    {f}
                                    {f === 'Low Stock' && lowStockItems > 0 && (
                                        <span className="ml-1.5 px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded-md text-[10px] font-bold">{lowStockItems}</span>
                                    )}
                                    {f === 'Out of Stock' && outOfStockItems > 0 && (
                                        <span className="ml-1.5 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-md text-[10px] font-bold">{outOfStockItems}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <Loader2 className="w-8 h-8 text-[#01A0E2] animate-spin" />
                            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Loading your catalog...</p>
                        </div>
                    ) : displayedProducts.length === 0 ? (
                        <div className="py-16 px-6">
                            <ProactiveEmptyState
                                variant="filtered"
                                title={activeTab === 'Inventory' ? 'No physical products found' : 'No items found'}
                                description={
                                    activeTab === 'Inventory'
                                        ? 'Add a product with inventory tracking enabled to see it here.'
                                        : "You haven't added any products or services yet. Add your first item to speed up invoice creation."
                                }
                                actions={[
                                    { label: '+ Add New Item', onClick: () => router.push('/products/new') }
                                ]}
                            />
                        </div>
                    ) : activeTab === 'Inventory' ? (
                        /* ── Inventory View ── */
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/60">
                                        <th className="px-6 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Product</th>
                                        <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">SKU</th>
                                        <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Stock Level</th>
                                        <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Unit Price</th>
                                        <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Stock Value</th>
                                        <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Adjust</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <AnimatePresence>
                                        {paginatedProducts.map((product, i) => {
                                            const stock = getStockDisplay(product);
                                            const stockValue = (product.unit_price || 0) * (product.stock_quantity || 0);
                                            return (
                                                <motion.tr
                                                    key={product.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: i * 0.03 }}
                                                    className="group hover:bg-[#01A0E2]/[0.02] transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl bg-[#01A0E2]/10 flex items-center justify-center flex-shrink-0">
                                                                <Package className="w-4 h-4 text-[#01A0E2]" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{product.name}</p>
                                                                {product.description && (
                                                                    <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-[200px] truncate">{product.description}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="text-sm font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-[#0D1B2E] px-2 py-0.5 rounded-lg">{product.sku || '—'}</span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <p className={`text-sm font-bold ${stock.color}`}>{stock.label} <span className="font-normal text-slate-400 dark:text-slate-500 text-[12px]">units</span></p>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {stock.badge === 'out' && (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">Out of Stock</span>
                                                        )}
                                                        {stock.badge === 'low' && (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100 animate-pulse">Low Stock</span>
                                                        )}
                                                        {stock.badge === 'ok' && (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">In Stock</span>
                                                        )}
                                                        {!stock.badge && (
                                                            <span className="text-slate-400 dark:text-slate-500 text-[12px]">Not tracked</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="text-sm font-bold text-noble-text">{formatMoney(product.unit_price || 0)}</span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{formatMoney(stockValue)}</span>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <button
                                                            onClick={() => handleOpenAdjustment(product)}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-noble-surface dark:bg-noble-card border border-noble-border text-slate-700 dark:text-slate-200 text-[12px] font-bold rounded-lg hover:border-[#01A0E2]/40 hover:text-[#01A0E2] transition-all shadow-sm ml-auto"
                                                        >
                                                            <ArrowRightLeft className="w-3.5 h-3.5" /> Adjust
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    ) : viewMode === 'table' ? (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/60">
                                            <th className="w-10 px-6 py-3">
                                                <input type="checkbox" className="rounded border-slate-300 text-[#01A0E2]" />
                                            </th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Item</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Type</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">SKU</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Price</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tax</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        <AnimatePresence>
                                            {paginatedProducts.map((product, i) => {
                                                const isProduct = (product.type || 'product').toLowerCase() === 'product';
                                                const stock = getStockDisplay(product);
                                                const isActive = product.is_active !== false;

                                                return (
                                                    <motion.tr
                                                        key={product.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: i * 0.03 }}
                                                        className="group hover:bg-[#01A0E2]/[0.02] transition-colors"
                                                    >
                                                        {/* Checkbox */}
                                                        <td className="px-6 py-4">
                                                            <input type="checkbox" className="rounded border-slate-300 text-[#01A0E2]" />
                                                        </td>

                                                        {/* Item */}
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isProduct ? 'bg-[#01A0E2]/10' : 'bg-violet-100'}`}>
                                                                    {isProduct
                                                                        ? <Package className="w-4 h-4 text-[#01A0E2]" />
                                                                        : <Wrench className="w-4 h-4 text-violet-600" />
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{product.name}</p>
                                                                        {/* Inline stock badge */}
                                                                        {stock.badge === 'out' && (
                                                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-500 border border-red-100">OOS</span>
                                                                        )}
                                                                        {stock.badge === 'low' && (
                                                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-500 border border-amber-100">Low</span>
                                                                        )}
                                                                    </div>
                                                                    {product.description && (
                                                                        <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-[200px] truncate">{product.description}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Type Badge */}
                                                        <td className="px-4 py-4">
                                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                                                                isProduct
                                                                    ? 'bg-[#01A0E2]/10 text-[#01A0E2]'
                                                                    : 'bg-violet-100 text-violet-700'
                                                            }`}>
                                                                {isProduct ? 'Product' : 'Service'}
                                                            </span>
                                                        </td>

                                                        {/* SKU */}
                                                        <td className="px-4 py-4">
                                                            <span className="text-sm font-mono text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-[#0D1B2E] px-2 py-0.5 rounded-lg">
                                                                {product.sku || '—'}
                                                            </span>
                                                        </td>

                                                        {/* Price */}
                                                        <td className="px-4 py-4">
                                                            <span className="text-sm font-bold text-noble-text">
                                                                {formatMoney(product.unit_price || 0)}
                                                            </span>
                                                        </td>

                                                        {/* Tax */}
                                                        <td className="px-4 py-4">
                                                            <span className="text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500">
                                                                {product.tax_rate ? `${product.tax_rate}%` : '0%'}
                                                            </span>
                                                        </td>

                                                        {/* Stock */}
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div>
                                                                    <p className={`text-sm font-bold ${stock.color}`}>{stock.label}</p>
                                                                    <p className={`text-[11px] font-medium mt-0.5 ${stock.color}`}>{stock.sub}</p>
                                                                </div>
                                                                {isProduct && (
                                                                    <button
                                                                        onClick={() => handleOpenAdjustment(product)}
                                                                        title="Adjust stock"
                                                                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-400 dark:text-slate-500 hover:text-[#01A0E2] hover:bg-[#01A0E2]/10 transition-all"
                                                                    >
                                                                        <ArrowRightLeft className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-1.5">
                                                                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                                                <span className={`text-[12px] font-medium ${isActive ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}>
                                                                    {isActive ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-4 py-4 text-right">
                                                            <div className="relative inline-block">
                                                                <button
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        setOpenMenuId(openMenuId === product.id ? null : product.id);
                                                                    }}
                                                                    className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] transition-all opacity-0 group-hover:opacity-100"
                                                                >
                                                                    <MoreHorizontal className="w-4 h-4" />
                                                                </button>
                                                                <AnimatePresence>
                                                                    {openMenuId === product.id && (
                                                                        <motion.div
                                                                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                            exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                                                            className="absolute right-0 top-8 z-50 w-48 bg-noble-surface dark:bg-noble-card rounded-xl border border-noble-border shadow-xl overflow-hidden"
                                                                        >
                                                                            <button
                                                                                onClick={() => router.push(`/products/new?edit=${product.id}`)}
                                                                                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors"
                                                                            >
                                                                                <Edit2 className="w-3.5 h-3.5" /> Edit Item
                                                                            </button>
                                                                            <button
                                                                                onClick={() => router.push(`/products/${product.id}`)}
                                                                                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors"
                                                                            >
                                                                                <Eye className="w-3.5 h-3.5" /> View Details
                                                                            </button>
                                                                            {(product.type || 'product').toLowerCase() === 'product' && (
                                                                                <button
                                                                                    onClick={() => { handleOpenAdjustment(product); setOpenMenuId(null); }}
                                                                                    className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors"
                                                                                >
                                                                                    <ArrowRightLeft className="w-3.5 h-3.5" /> Adjust Stock
                                                                                </button>
                                                                            )}
                                                                            <div className="border-t border-slate-100 dark:border-noble-border my-1" />
                                                                            <button
                                                                                onClick={() => handleDeleteProduct(product.id)}
                                                                                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                                            >
                                                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                                                            </button>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/40">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">
                                        Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{Math.min(currentPage * itemsPerPage, displayedProducts.length)}</span> of{' '}
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{displayedProducts.length}</span> items
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-noble-surface dark:bg-noble-card hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-transparent hover:border-noble-border"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let page = i + 1;
                                            if (totalPages > 5 && currentPage > 3) {
                                                page = currentPage - 2 + i;
                                            }
                                            if (page > totalPages) return null;
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                                                        currentPage === page
                                                            ? 'bg-[#01A0E2] text-white shadow-sm shadow-[#01A0E2]/30'
                                                            : 'text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-noble-surface dark:bg-noble-card hover:shadow-sm border border-transparent hover:border-noble-border'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-noble-surface dark:bg-noble-card hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-transparent hover:border-noble-border"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Grid View */
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <AnimatePresence>
                                {paginatedProducts.map((product, i) => {
                                    const isProduct = (product.type || 'product').toLowerCase() === 'product';
                                    const stock = getStockDisplay(product);
                                    const isActive = product.is_active !== false;
                                    return (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-noble-surface dark:bg-noble-card border border-slate-100 dark:border-noble-border rounded-2xl p-4 hover:shadow-md hover:border-noble-border transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isProduct ? 'bg-[#01A0E2]/10' : 'bg-violet-100'}`}>
                                                    {isProduct ? <Package className="w-5 h-5 text-[#01A0E2]" /> : <Wrench className="w-5 h-5 text-violet-600" />}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                                    <span className={`text-[11px] font-medium ${isActive ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}>
                                                        {isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-0.5 line-clamp-1">{product.name}</h3>
                                            {product.description && (
                                                <p className="text-[12px] text-slate-400 dark:text-slate-500 mb-3 line-clamp-2">{product.description}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-noble-border">
                                                <span className="text-sm font-bold text-noble-text">{formatMoney(product.unit_price || 0)}</span>
                                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${isProduct ? 'bg-[#01A0E2]/10 text-[#01A0E2]' : 'bg-violet-100 text-violet-700'}`}>
                                                    {isProduct ? 'Product' : 'Service'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className={`text-[11px] font-medium ${stock.color}`}>{stock.sub}</span>
                                                <div className="flex items-center gap-1">
                                                    {isProduct && (
                                                        <button
                                                            onClick={() => handleOpenAdjustment(product)}
                                                            className="p-1 rounded-lg text-slate-300 hover:text-[#01A0E2] hover:bg-[#01A0E2]/10 transition-all opacity-0 group-hover:opacity-100"
                                                            title="Adjust stock"
                                                        >
                                                            <ArrowRightLeft className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
                </>
                )}
            </div>

            {/* ── Adjust Stock Modal ── */}
            <AnimatePresence>
                {showAdjustModal && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
                        onClick={e => { if (e.target === e.currentTarget) setShowAdjustModal(false); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-noble-surface dark:bg-noble-card rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 dark:border-noble-border"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/60">
                                <div>
                                    <p className="text-[11px] font-bold text-[#01A0E2] uppercase tracking-widest mb-0.5">Inventory Action</p>
                                    <h3 className="text-[17px] font-bold text-noble-text">Adjust Stock Level</h3>
                                </div>
                                <button
                                    onClick={() => setShowAdjustModal(false)}
                                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] rounded-xl transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSaveAdjustment} className="p-6 space-y-5">
                                <div className="bg-slate-50 dark:bg-[#0D1B2E] rounded-xl p-4 border border-slate-100 dark:border-noble-border">
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Product</p>
                                    <p className="text-[15px] font-bold text-noble-text">{selectedProduct.name}</p>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                                        Current stock: <span className="font-bold text-slate-800 dark:text-slate-100">{selectedProduct.stock_quantity ?? 0}</span> units
                                    </p>
                                </div>

                                {/* Adjustment Type */}
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Adjustment Type</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setAdjustType('add')}
                                            className={`py-3 px-4 rounded-xl text-[12px] font-bold border transition-all ${
                                                adjustType === 'add'
                                                    ? 'bg-[#01A0E2]/10 border-[#01A0E2] text-[#01A0E2]'
                                                    : 'bg-slate-50 dark:bg-[#0D1B2E] border-noble-border text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030]'
                                            }`}
                                        >
                                            Add / Remove (+/-)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAdjustType('set')}
                                            className={`py-3 px-4 rounded-xl text-[12px] font-bold border transition-all ${
                                                adjustType === 'set'
                                                    ? 'bg-[#01A0E2]/10 border-[#01A0E2] text-[#01A0E2]'
                                                    : 'bg-slate-50 dark:bg-[#0D1B2E] border-noble-border text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030]'
                                            }`}
                                        >
                                            Set New Total
                                        </button>
                                    </div>
                                </div>

                                {/* Quantity Input */}
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        {adjustType === 'add' ? 'Quantity to add/subtract' : 'New Stock Quantity'}
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={adjustQty}
                                        onChange={e => setAdjustQty(e.target.value)}
                                        placeholder={adjustType === 'add' ? 'e.g. 10 or -5' : 'e.g. 50'}
                                        className="w-full bg-slate-50 dark:bg-[#0D1B2E] border border-noble-border focus:border-[#01A0E2] rounded-xl py-3 px-4 text-[15px] font-bold text-noble-text outline-none transition-colors focus:ring-2 focus:ring-[#01A0E2]/20"
                                    />
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                                        {adjustType === 'add'
                                            ? 'Enter a positive number to add stock, or a negative number (e.g. -10) to reduce stock.'
                                            : 'This will set the total stock quantity level directly.'}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowAdjustModal(false)}
                                        className="flex-1 py-3 bg-slate-100 dark:bg-[#112030] hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[13px] rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={adjusting}
                                        className="flex-1 py-3 bg-[#01A0E2] hover:bg-[#0480b5] text-white font-bold text-[13px] rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {adjusting ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                                        ) : (
                                            <><Check className="w-4 h-4" /> Apply Changes</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
