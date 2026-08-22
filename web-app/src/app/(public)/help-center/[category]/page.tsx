import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { helpCategories } from '@/lib/helpData';
import { ChevronRight, FileText, Clock } from 'lucide-react';
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
    if (!category) return {};
    return {
        title: `${category.title} | Help Center | Nobevra`,
        description: category.desc,
    };
}

export default async function HelpCategoryPage({ params }: Props) {
    const { category: categorySlug } = await params;
    const category = helpCategories.find(c => c.slug === categorySlug);
    if (!category) notFound();

    return (
        <div className="bg-white text-near-black font-inter antialiased min-h-screen pt-[118px]">
            <HelpSearchBar />
            {/* Breadcrumb */}
            <div className="bg-[#F8FAFC] border-b border-slate-200 py-5">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Link href="/help-center" className="hover:text-noble-blue transition-colors">Help Center</Link>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                        <span className="text-near-black">{category.title}</span>
                    </nav>
                </div>
            </div>

            {/* Category header */}
            <div className="bg-[#F8FAFC] border-b border-slate-200 py-16">
                <div className="max-w-[1430px] mx-auto px-4 md:px-16">
                    <h1 className="font-inter text-[36px] md:text-[48px] font-black text-near-black tracking-tight mb-4">
                        {category.title}
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl">{category.desc}</p>
                    <p className="mt-4 text-sm text-slate-400 font-bold">{category.articles.length} articles in this category</p>
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
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 shrink-0">
                                    <Clock className="w-3.5 h-3.5" />
                                    {article.readTime}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
