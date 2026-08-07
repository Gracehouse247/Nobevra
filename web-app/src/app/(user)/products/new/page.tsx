'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
    ChevronLeft, Package, Tag, DollarSign, 
    Layers, Save, FileText, BarChart3,
    UploadCloud, CheckCircle2, AlertCircle, Eye,
    Lightbulb, Hash, Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { productService, teamService, productPassportService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { Globe, ShieldCheck } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import { motion } from 'framer-motion';
import PremiumBadge from '@/components/shared/PremiumBadge';

export default function NewProductPage() {
    const { user } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');
    const isEditMode = !!editId;
    const [loading, setLoading] = useState(false);
    const { currencyCode, formatMoney } = useCurrency();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        costPrice: '',
        category: '',
        type: 'product',
        sku: '',
        unit: 'Each (pcs)',
        taxRate: '7.5',
        initialStock: '',
        minStockAlert: '',
        reorderLevel: '',
        tags: [] as string[]
    });

    const [tagInput, setTagInput] = useState('');
    const [enablePassport, setEnablePassport] = useState(false);

    React.useEffect(() => {
        if (!editId || !user) return;
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const product = await productService.getProductById(editId);
                if (product) {
                    setFormData({
                        name: product.name || '',
                        description: product.description || '',
                        price: product.unit_price?.toString() || '',
                        costPrice: product.cost_price?.toString() || '',
                        category: '', // Lookup logic needed for robust app
                        type: product.type || 'product',
                        sku: product.sku || '',
                        unit: product.unit || 'Each (pcs)',
                        taxRate: product.tax_rate?.toString() || '0',
                        initialStock: product.stock_quantity?.toString() || '',
                        minStockAlert: product.min_stock_alert?.toString() || '',
                        reorderLevel: '', // Not bound
                        tags: product.tags || []
                    });
                }
            } catch (err) {
                toast.error('Failed to load item for editing');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [editId, user]);

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
        }
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
    };

    const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
        e.preventDefault();
        if (!user) return;
        
        setLoading(true);
        try {
            const tData = await teamService.getTeamByUserId(user.id);
            const teamId = tData?.id || user.id;

            let categoryId = null;
            if (formData.category) {
                categoryId = await productService.resolveCategory(teamId, formData.category);
            }

            const productPayload = {
                name: formData.name,
                description: formData.description || null,
                unit_price: parseFloat(formData.price) || 0,
                cost_price: parseFloat(formData.costPrice) || 0,
                sku: formData.sku || null,
                unit: formData.unit || null,
                category_id: categoryId,
                type: formData.type as 'product' | 'service',
                tax_rate: parseFloat(formData.taxRate) || 0,
                stock_quantity: formData.initialStock ? parseInt(formData.initialStock, 10) : 0,
                min_stock_alert: formData.minStockAlert ? parseInt(formData.minStockAlert, 10) : 0,
                tags: formData.tags.length > 0 ? formData.tags : null,
                is_active: !isDraft, // draft is inactive
                track_inventory: formData.type === 'product'
            };

            let savedProduct;
            if (isEditMode && editId) {
                savedProduct = await productService.updateProduct(editId, productPayload);
            } else {
                savedProduct = await productService.createProduct({
                    ...productPayload,
                    team_id: teamId,
                    user_id: user.id
                });
            }

            if (enablePassport && savedProduct) {
                await productPassportService.upsertPassport({
                    product_id: savedProduct.id,
                    team_id: teamId,
                    public_status: 'published',
                    seo_title: `${formData.name} - Official Product Passport`,
                    seo_description: `Digital product passport and traceability information for ${formData.name}.`
                });
            }
            toast.success(isDraft ? 'Item saved as draft' : 'Item successfully saved');
            router.push('/products');
        } catch (error) {
            console.error('Error saving item:', error);
            toast.error('Failed to save item');
        } finally {
            setLoading(false);
        }
    };

    const isProduct = formData.type === 'product';
    const previewPrice = parseFloat(formData.price) || 0;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-inter">
            <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8">
                
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#0599D5] hover:text-[#006970] transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Catalog
                    </button>
                    <h1 className="text-[19px] font-bold text-slate-900 tracking-tight">
                        {isEditMode ? 'Edit Item' : 'Add New Item'}
                    </h1>
                    <p className="text-[15px] text-slate-500 mt-1">
                        {isEditMode ? 'Update the details of your inventory item.' : 'Define a new product or service for your invoicing inventory.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: FORM */}
                    <div className="xl:col-span-8 space-y-6">
                        
                        {/* 1. Basic Information */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-7 h-7 rounded-lg bg-[#0599D5] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-[#0599D5]/30">
                                    1
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {/* Item Name */}
                                <div className="space-y-1.5 lg:col-span-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Item Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <FileText className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            required
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                            placeholder="e.g. Web Design Package"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Type */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Package className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 appearance-none focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all cursor-pointer"
                                            value={formData.type}
                                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        >
                                            <option value="product">Physical Product</option>
                                            <option value="service">Service</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                            <ChevronLeft className="h-4 w-4 text-slate-400 -rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-1.5 lg:col-span-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Tag className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                            placeholder="Select category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* SKU */}
                                <div className="space-y-1.5 lg:col-span-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        SKU / Item Code <span className="text-slate-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Hash className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input 
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                            placeholder="e.g. INV-001"
                                            value={formData.sku}
                                            onChange={(e) => setFormData({...formData, sku: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Unit */}
                                <div className="space-y-1.5 lg:col-span-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Unit <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Layers className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 appearance-none focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all cursor-pointer"
                                            value={formData.unit}
                                            onChange={(e) => setFormData({...formData, unit: e.target.value})}
                                        >
                                            <option value="Each (pcs)">Each (pcs)</option>
                                            <option value="Hours">Hours</option>
                                            <option value="Days">Days</option>
                                            <option value="Kg">Kg</option>
                                            <option value="Liters">Liters</option>
                                            <option value="Boxes">Boxes</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                            <ChevronLeft className="h-4 w-4 text-slate-400 -rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                {/* Tax Rate */}
                                <div className="space-y-1.5 lg:col-span-1 lg:col-start-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Tax Rate (%)
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-semibold text-slate-900 appearance-none focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all cursor-pointer"
                                            value={formData.taxRate}
                                            onChange={(e) => setFormData({...formData, taxRate: e.target.value})}
                                        >
                                            <option value="0">0% (Tax Exempt)</option>
                                            <option value="5">5.0% (Reduced)</option>
                                            <option value="7.5">7.5% (Standard)</option>
                                            <option value="20">20.0% (High)</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                            <ChevronLeft className="h-4 w-4 text-slate-400 -rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Description */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-[#0599D5] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-[#0599D5]/30">
                                        2
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900">Description</h2>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                                    <Globe className="w-4 h-4 text-[#0599D5]" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[13px] font-bold text-slate-800">Digital Passport (SEO)</p>
                                            {!canUse('products.passport') && <PremiumBadge tier="pulse" iconOnly />}
                                        </div>
                                        <p className="text-[10px] text-slate-500 hidden sm:block">Make this item discoverable</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            if (!canUse('products.passport')) {
                                                openUpgradeModal({ featureName: 'Digital Product Passports', requiredPlan: 'pulse' });
                                                return;
                                            }
                                            setEnablePassport(!enablePassport);
                                        }}
                                        className={`ml-2 w-10 h-5 rounded-full p-0.5 transition-colors ${enablePassport ? 'bg-[#0599D5]' : 'bg-slate-300'}`}
                                    >
                                        <motion.div 
                                            animate={{ x: enablePassport ? 20 : 0 }}
                                            className="w-4 h-4 bg-white rounded-full shadow-sm" 
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <p className="text-[12px] font-medium text-slate-500 mb-2">Detailed description for the invoice...</p>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all min-h-[120px] resize-y"
                                    placeholder="Describe the item, its features, usage, or any important notes..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    maxLength={1000}
                                />
                                <div className="text-right">
                                    <span className="text-[11px] font-semibold text-slate-400">{formData.description.length} / 1000</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Pricing & Inventory */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-7 h-7 rounded-lg bg-[#0599D5] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-[#0599D5]/30">
                                    3
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Pricing {isProduct && '& Inventory'}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {/* Unit Price */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Unit Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#0599D5] focus-within:border-[#0599D5] transition-all">
                                        <div className="bg-slate-100 border-r border-slate-200 px-3 flex items-center text-[13px] font-bold text-slate-600">
                                            {currencyCode}
                                        </div>
                                        <input 
                                            required
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-transparent px-3 py-2.5 text-[14px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Cost Price */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Cost Price <span className="text-slate-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#0599D5] focus-within:border-[#0599D5] transition-all">
                                        <div className="bg-slate-100 border-r border-slate-200 px-3 flex items-center text-[13px] font-bold text-slate-600">
                                            {currencyCode}
                                        </div>
                                        <input 
                                            type="number"
                                            step="0.01"
                                            className="w-full bg-transparent px-3 py-2.5 text-[14px] font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                                            placeholder="0.00"
                                            value={formData.costPrice}
                                            onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Initial Stock */}
                                {isProduct && (
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Initial Stock <span className="text-slate-400 font-normal">(Optional)</span>
                                        </label>
                                        <input 
                                            type="number"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                            placeholder="0"
                                            value={formData.initialStock}
                                            onChange={(e) => setFormData({...formData, initialStock: e.target.value})}
                                        />
                                    </div>
                                )}

                                {/* Stock Alerts */}
                                {isProduct && (
                                    <>
                                        <div className="space-y-1.5 lg:col-span-1">
                                            <label className="text-[13px] font-bold text-slate-700">
                                                Minimum Stock Alert <span className="text-slate-400 font-normal">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <AlertCircle className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <input 
                                                    type="number"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                                    placeholder="e.g. 5"
                                                    value={formData.minStockAlert}
                                                    onChange={(e) => setFormData({...formData, minStockAlert: e.target.value})}
                                                />
                                            </div>
                                            <p className="text-[11px] text-slate-500 mt-1">You'll be notified when stock is low</p>
                                        </div>

                                        <div className="space-y-1.5 lg:col-span-1">
                                            <label className="text-[13px] font-bold text-slate-700">
                                                Reorder Level <span className="text-slate-400 font-normal">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <UploadCloud className="h-4 w-4 text-slate-400 rotate-180" />
                                                </div>
                                                <input 
                                                    type="number"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                                    placeholder="e.g. 10"
                                                    value={formData.reorderLevel}
                                                    onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})}
                                                />
                                            </div>
                                            <p className="text-[11px] text-slate-500 mt-1">Suggested stock level to reorder</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 4. Additional Settings */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-7 h-7 rounded-lg bg-[#0599D5] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-[#0599D5]/30">
                                    4
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Additional Settings <span className="text-slate-400 font-normal text-sm ml-1">(Optional)</span></h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Tags */}
                                <div>
                                    <label className="text-[13px] font-bold text-slate-700 mb-2 block">Tags</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0599D5]/10 text-[#0599D5] rounded-lg text-xs font-bold">
                                                {tag}
                                                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-500 transition-colors">
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[13px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all"
                                            placeholder="Add Tag"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        />
                                        <button 
                                            type="button"
                                            onClick={handleAddTag}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0599D5] font-bold rounded-xl text-sm transition-colors whitespace-nowrap"
                                        >
                                            + Add Tag
                                        </button>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="text-[13px] font-bold text-slate-700 mb-2 block">Product Image</label>
                                    <div onClick={() => document.getElementById('product-image-upload')?.click()} className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6 flex flex-col items-center justify-center text-center hover:border-[#0599D5]/50 transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-[#0599D5]/10 flex items-center justify-center text-[#0599D5] mb-3 group-hover:scale-110 transition-transform">
                                            <UploadCloud className="w-5 h-5" />
                                        </div>
                                        <p className="text-[13px] font-bold text-slate-900">Upload Image</p>
                                        <p className="text-[11px] text-slate-500 mt-1">PNG, JPG up to 2MB</p>
                                        <input type="file" id="product-image-upload" className="hidden" accept="image/png, image/jpeg" onChange={(e) => { if (e.target.files?.length) { alert('Image selected successfully.'); } }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                            <button 
                                type="button"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                <button 
                                    type="button"
                                    onClick={(e) => handleSubmit(e, true)}
                                    disabled={loading}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" /> Save as Draft
                                </button>
                                <button 
                                    type="button"
                                    onClick={(e) => handleSubmit(e, false)}
                                    disabled={loading}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#0599D5] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#0599D5]/30 transition-all disabled:opacity-50"
                                >
                                    <CheckCircle2 className="w-4 h-4" /> Save Item
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: PREVIEW & TIPS */}
                    <div className="xl:col-span-4 space-y-6">
                        
                        {/* Item Preview */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-6">
                            <div className="flex items-center gap-2 mb-6 text-[#0599D5]">
                                <Eye className="w-4 h-4" />
                                <h3 className="font-bold text-sm">Item Preview</h3>
                            </div>
                            
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner mb-4 ${isProduct ? 'bg-[#0599D5]/10 text-[#0599D5]' : 'bg-violet-100 text-violet-600'}`}>
                                    {isProduct ? <Package className="w-8 h-8" /> : <Layers className="w-8 h-8" />}
                                </div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-1">
                                    {formData.name || 'Item Name'}
                                </h4>
                                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mb-4">
                                    <span>{formData.category || 'Category'}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                                    <span>{isProduct ? 'Product' : 'Service'}</span>
                                </div>
                                <div className="text-2xl font-black text-[#0599D5] mb-1">
                                    {formatMoney(previewPrice)}
                                </div>
                                <div className="text-[11px] font-semibold text-slate-400 mb-6">
                                    Tax: {formData.taxRate}%
                                </div>

                                <div className="w-full space-y-3 pt-4 border-t border-slate-200">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-500">Unit</span>
                                        <span className="font-semibold text-slate-900">{formData.unit}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-500">SKU</span>
                                        <span className="font-semibold text-slate-900 uppercase">{formData.sku || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-500">Stock</span>
                                        <span className="font-semibold text-slate-900">
                                            {!isProduct ? 'Unlimited' : (formData.initialStock || '0')}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-slate-500">Status</span>
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-5 text-[#006970]">
                                <Lightbulb className="w-4 h-4" />
                                <h3 className="font-bold text-sm">Quick Tips</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-900">Use clear, descriptive names</p>
                                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Helps you and your clients understand easily.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-900">Set correct tax rates</p>
                                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Ensure accurate invoicing and compliance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-900">Add images for easy recognition</p>
                                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Visual items are easier to manage.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-900">Track inventory for stock items</p>
                                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">Stay on top of your stock levels.</p>
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
