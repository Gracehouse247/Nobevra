import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
    Package, MapPin, Calendar, FileText, Download, 
    ShieldCheck, Activity, Search
} from 'lucide-react';
import Image from 'next/image';

interface ProductPassportProps {
    params: { slug: string };
}

// Ensure SEO by generating metadata dynamically
export async function generateMetadata({ params }: ProductPassportProps): Promise<Metadata> {
    const { data: passport } = await supabase
        .from('product_passports')
        .select(`
            seo_title, seo_description, brand_name,
            products (name)
        `)
        .eq('slug', params.slug)
        .eq('public_status', 'published')
        .single();

    if (!passport) {
        return { title: 'Product Not Found | Nobevra' };
    }

    const productData = Array.isArray(passport.products) ? passport.products[0] : passport.products;
    const productName = productData?.name || 'Product';
    const brandName = passport.brand_name || 'Brand';
    
    return {
        title: passport.seo_title || `${productName} by ${brandName} | Digital Product Passport`,
        description: passport.seo_description || `View digital passport, trace origin, and verify authenticity for ${productName}.`,
        openGraph: {
            title: passport.seo_title || `${productName} | Product Passport`,
            description: passport.seo_description || `Official product passport for ${productName}.`,
            type: 'website',
        },
        robots: 'index, follow'
    };
}

// Server Component for SEO and Performance
export default async function ProductPassportPage({ params }: ProductPassportProps) {
    const { data: passport } = await supabase
        .from('product_passports')
        .select(`
            *,
            products (name, description, sku),
            teams (name, logo_url)
        `)
        .eq('slug', params.slug)
        .eq('public_status', 'published')
        .single();

    if (!passport) {
        notFound();
    }

    // Record scan asynchronously (client-side usually better for IP/UserAgent, but we do basic hit here if needed, 
    // or just rely on a client component to record the scan).
    const productData = Array.isArray(passport.products) ? passport.products[0] : passport.products;

    const images = passport.product_images || [];
    const mainImage = images.length > 0 ? images[0] : null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-inter">
            {/* Minimal Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    {passport.teams?.logo_url ? (
                        <Image src={passport.teams.logo_url} alt="Brand Logo" width={32} height={32} className="rounded-lg object-contain" />
                    ) : (
                        <div className="w-8 h-8 rounded-lg bg-noble-blue flex items-center justify-center text-white font-bold">
                            {passport.brand_name?.charAt(0) || passport.teams?.name?.charAt(0) || 'B'}
                        </div>
                    )}
                    <span className="font-bold text-slate-900">{passport.brand_name || passport.teams?.name}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                </div>
            </header>

            <main className="max-w-3xl mx-auto pb-24">
                {/* Hero Section */}
                <div className="bg-white px-6 py-10 md:py-16 text-center border-b border-slate-200">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <Search className="w-3.5 h-3.5" />
                        Digital Product Passport
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4" style={{ fontFamily: 'Clash Display, Syne, sans-serif' }}>
                        {productData?.name}
                    </h1>
                    <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                        {productData?.description}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="p-6 md:p-8 space-y-6">
                    {/* Origin & Traceability */}
                    <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Traceability Data
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Origin</span>
                                <span className="font-bold text-slate-900">{passport.country_of_origin || 'N/A'}</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">HS Code</span>
                                <span className="font-bold text-slate-900">{passport.hs_code || 'N/A'}</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Batch / Lot</span>
                                <span className="font-bold text-slate-900">{passport.batch_number || 'N/A'}</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">SKU</span>
                                <span className="font-bold text-slate-900">{productData?.sku || 'N/A'}</span>
                            </div>
                        </div>
                    </section>

                    {/* Certifications */}
                    {passport.certifications && passport.certifications.length > 0 && (
                        <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Compliance & Documents
                            </h2>
                            <div className="space-y-3">
                                {passport.certifications.map((cert: any, idx: number) => (
                                    <a key={idx} href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-noble-blue/30 hover:bg-blue-50/50 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 text-slate-400 group-hover:text-noble-blue group-hover:border-noble-blue/30 transition-all">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-900 text-sm block">{cert.name}</span>
                                                <span className="text-xs text-slate-500 block">PDF Document</span>
                                            </div>
                                        </div>
                                        <Download className="w-4 h-4 text-slate-400 group-hover:text-noble-blue" />
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            
            {/* Footer */}
            <footer className="bg-slate-900 py-8 px-6 text-center">
                <div className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold mb-2">
                    <Activity className="w-4 h-4 text-noble-blue" /> Powered by Nobevra
                </div>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">Digital Product Passport Engine</p>
            </footer>
        </div>
    );
}
