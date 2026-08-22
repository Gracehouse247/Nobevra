import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Search } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

import { brand } from '@/lib/brand';

export const revalidate = 3600; // Revalidate every hour

const BLOG_TITLE = `Blog — Invoice Tips, Business Card Guides & Billing Insights | ${brand.name}`;
const BLOG_DESC = `${brand.name} blog: expert guides on how to make invoices for free, business card creation tips, QR code tutorials, and billing software comparisons for small businesses.`;

export const metadata: Metadata = {
    title: BLOG_TITLE,
    description: BLOG_DESC,
    openGraph: {
        title: BLOG_TITLE,
        description: BLOG_DESC,
        type: 'website',
        url: `${brand.urls.canonical}/blog`,
        images: [brand.openGraph.image],
    },
    twitter: {
        card: 'summary_large_image',
        site: brand.social.twitterHandle,
        title: BLOG_TITLE,
        description: BLOG_DESC,
    }
};


const getArticles = unstable_cache(
    async () => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cugomxoyeyeytyedgclj.supabase.co';
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key-for-build';
        const supabase = createClient(url, key);
        const { data, error } = await supabase
            .from('seo_articles')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });
        return { articles: data, error };
    },
    ['published-articles'],
    { revalidate: 3600, tags: ['blog'] }
);


export default async function BlogIndexPage() {
    // Fetch published articles from Supabase
    const { articles, error } = await getArticles();

    if (error) {
        console.error("Error fetching articles:", error);
    }

    const featuredPost = articles && articles.length > 0 ? articles[0] : null;
    const standardPosts = articles && articles.length > 1 ? articles.slice(1) : [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getImageUrl = (url?: string | null) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        if (url.startsWith('photo-')) return `https://images.unsplash.com/${url}?q=80&w=2070&auto=format&fit=crop`;
        return url;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* SEO Structured Data for Blog Collection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "url": "https://nobevra.noblesworld.com.ng/blog",
                        "name": "Nobevra Blog",
                        "description": "Expert advice for small businesses and freelancers.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Nobevra",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://nobevra.noblesworld.com.ng/images/logo.png"
                            }
                        }
                    })
                }}
            />

            {/* Blog Header */}
            <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
                        Business Growth <span className="text-[#166FBB]">Insights</span>
                    </h1>
                    <p className="text-[#64748B] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        Actionable strategies to optimize your cash flow, manage clients, and scale your business. Join 50,000+ readers.
                    </p>
                    
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            className="w-full bg-white border border-[#E2E8F0] rounded-full pl-12 pr-6 py-4 shadow-sm outline-none focus:border-[#166FBB] focus:ring-4 focus:ring-[#166FBB]/10 transition-all font-medium text-[#0F172A]"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Featured Post */}
                {featuredPost && (
                    <div className="mb-20">
                        <h2 className="text-xs font-black text-[#94A3B8] uppercase tracking-widest mb-6">Featured Article</h2>
                        <Link href={`/blog/${featuredPost.slug}`} className="group block">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F0] relative aspect-video">
                                    <img 
                                        src={getImageUrl(featuredPost.featured_image_url) || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"} 
                                        alt={featuredPost.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-[#166FBB] uppercase tracking-widest shadow-sm">
                                        SEO
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 md:pl-6">
                                    <div className="flex items-center gap-4 text-xs font-bold text-[#64748B] mb-4">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featuredPost.published_at ? formatDate(featuredPost.published_at) : 'Just now'}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> Nobevra Team</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight mb-4 group-hover:text-[#166FBB] transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-[#475569] text-lg leading-relaxed mb-6">
                                        {featuredPost.meta_description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[#166FBB] font-black uppercase tracking-widest text-sm">
                                        Read Full Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Latest Posts Grid */}
                {standardPosts.length > 0 && (
                    <>
                        <h2 className="text-2xl font-black text-[#0F172A] mb-8">Latest Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {standardPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="group block border border-[#E2E8F0] rounded-3xl p-6 hover:shadow-lg hover:border-[#CBD5E1] transition-all bg-[#F8FAFC]/50 hover:bg-white flex flex-col h-full">
                                    <div className="text-xs font-black text-[#166FBB] uppercase tracking-widest mb-3">
                                        Insight
                                    </div>
                                    <h3 className="text-xl font-black text-[#0F172A] mb-3 leading-snug group-hover:text-[#166FBB] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-[#64748B] text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {post.meta_description}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0] mt-auto">
                                        <span className="text-xs font-bold text-[#94A3B8]">
                                            {post.published_at ? formatDate(post.published_at) : 'Just now'}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#166FBB] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {!articles || articles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-[#64748B] text-lg">No articles found. Check back soon!</p>
                    </div>
                ) : (
                    <div className="mt-16 flex justify-center">
                        <button className="px-8 py-4 bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:border-[#166FBB] transition-all">
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
