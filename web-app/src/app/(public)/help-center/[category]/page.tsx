import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { helpCategories } from '@/lib/helpData';
import { ChevronRight, FileText, Clock, ArrowRight } from 'lucide-react';
import HelpSearchBar from '@/components/help/HelpSearchBar';

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return helpCategories.map(cat => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = helpCategories.find(c => c.slug === categorySlug);
    if (!category) return { title: 'Category Not Found | Nobevra Help Center' };
    const url = `https://nobevra.noblesworld.com.ng/help-center/${category.slug}`;
    return {
        title: `${category.title} Guides & Tutorials | Nobevra Help Center`,
        description: `${category.desc} Browse ${category.articles.length} in-depth troubleshooting articles and step-by-step documentation.`,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${category.title} Guides & Tutorials | Nobevra Help Center`,
            description: category.desc,
            url: url,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${category.title} Guides | Nobevra Help Center`,
            description: category.desc,
        },
    };
}

export default async function HelpCategoryPage({ params }: Props) {
    const { category: categorySlug } = await params;
    const category = helpCategories.find(c => c.slug === categorySlug);
    if (!category) notFound();

    const canonicalUrl = `https://nobevra.noblesworld.com.ng/help-center/${category.slug}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://nobevra.noblesworld.com.ng"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Help Center",
                "item": "https://nobevra.noblesworld.com.ng/help-center"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": category.title
            }
        ]
    };

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${category.title} Guides — Nobevra Help Center`,
        "description": category.desc,
        "url": canonicalUrl,
        "publisher": {
            "@type": "Organization",
            "name": "Nobevra",
            "url": "https://nobevra.noblesworld.com.ng"
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": category.articles.length,
            "itemListElement": category.articles.map((art, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": art.title,
                "url": `https://nobevra.noblesworld.com.ng/help-center/${category.slug}/${art.slug}`
            }))
        }
    };

    return (
        <div className="bg-white text-near-black font-inter antialiased min-h-screen pt-[118px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <HelpSearchBar />

            {/* Breadcrumb */}
            <div className="bg-[#F8FAFC] border-b border-slate-200 py-5">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Link href="/help-center" className="hover:text-noble-blue transition-colors">Help Center</Link>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                        <span className="text-near-black font-bold">{category.title}</span>
                    </nav>
                </div>
            </div>

            {/* Category header */}
            <div className="bg-[#F8FAFC] border-b border-slate-200 py-16">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-blue/10 text-noble-blue text-xs font-black uppercase tracking-wider mb-4">
                        Category Hub
                    </div>
                    <h1 className="font-inter text-[36px] md:text-[48px] font-black text-near-black tracking-tight mb-4 leading-tight">
                        {category.title}
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">{category.desc}</p>
                    <p className="mt-4 text-sm text-slate-400 font-bold">{category.articles.length} detailed articles in this section</p>
                </div>
            </div>

            {/* Articles list */}
            <div className="max-w-[1430px] mx-auto px-4 md:px-16 py-16">
                <div className="max-w-3xl">
                    <div className="space-y-3">
                        {category.articles.map((article, i) => (
                            <Link
                                key={i}
                                href={`/help-center/${category.slug}/${article.slug}`}
                                className="flex items-center gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-noble-blue/40 hover:shadow-md transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-noble-blue group-hover:text-white group-hover:border-noble-blue transition-all">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-bold text-near-black text-base group-hover:text-noble-blue transition-colors mb-1">{article.title}</h2>
                                    <p className="text-slate-500 text-sm leading-relaxed truncate">{article.summary}</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                        <Clock className="w-3.5 h-3.5" />
                                        {article.readTime}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-noble-blue group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
