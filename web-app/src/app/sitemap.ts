import { MetadataRoute } from 'next'
import { PROGRAMMATIC_TEMPLATES } from '@/lib/templates/programmaticTemplatesData'
import { helpCategories } from '@/lib/helpData'
import { CURATED_BLOG_POSTS } from '@/lib/blogData'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nobevra.noblesworld.com.ng'
  const now = new Date()

  // 1. Core Operating System Hub & Category Pillars
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/business-management-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/invoicing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/free-invoice-generator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/crm`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/expense-management`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/products-inventory`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/payments`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/digital-business-card`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/qr-code-generator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/ai-business-assistant`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${baseUrl}/ai-receipt-scanner`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/client-contracts`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/recurring-billing-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/client-portal-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/cash-flow-analytics`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // 2. Solution Pages
    {
      url: `${baseUrl}/solutions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${baseUrl}/solutions/agency-billing-platform`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/solutions/best-small-business-invoicing-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/solutions/enterprise-billing-platform`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/solutions/simple-invoicing-for-freelancers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/solutions/ecommerce-invoice-automation`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/lightweight-crm-for-freelancers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    // 3. Feature Directory & Specialized Pages
    {
      url: `${baseUrl}/features`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/features/best-ai-invoice-generator-free`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/features/free-invoice-generator-for-shopify`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/features/best-free-invoice-app`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/features/billing-software-online`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/where-to-make-business-cards`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gamified-invoicing-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    // 4. Interactive PLG Tool Pages
    {
      url: `${baseUrl}/features/invoice-tax-calculator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/features/freelance-rate-calculator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // 5. Educational Guides & Editorial Playbooks
    {
      url: `${baseUrl}/features/how-do-i-make-an-invoice`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/how-to-make-a-proforma-invoice`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/how-to-make-an-invoice-on-my-phone`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/how-to-generate-a-qr-code`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/how-to-create-a-business-card-for-free`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/what-is-invoicing-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/what-is-the-best-invoice-maker`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${baseUrl}/features/how-to-bill-clients-on-retainer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/features/how-to-manage-business-cash-flow`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // 6. Resources & Knowledge Hub
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    // 7. Trust, Legal & Support
    {
      url: `${baseUrl}/security`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.60,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.60,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/acceptable-use`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/dpa`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/sla`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/legal/ai-disclaimer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/legal/data-transparency`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/free-invoice-maker-app-about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.60,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ]

  // 8. Programmatic Template Slugs (18 High-Intent Pages)
  const templateRoutes: MetadataRoute.Sitemap = PROGRAMMATIC_TEMPLATES.map((tpl) => ({
    url: `${baseUrl}/templates/${tpl.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: tpl.type === 'country' ? 0.85 : 0.80,
  }))

  // 9. Dynamic Help Center Categories (6 Hubs)
  const helpCategoryRoutes: MetadataRoute.Sitemap = helpCategories.map((cat) => ({
    url: `${baseUrl}/help-center/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.70,
  }))

  // 10. Dynamic Help Center Articles (31+ Deep Documentation Pages)
  const helpArticleRoutes: MetadataRoute.Sitemap = helpCategories.flatMap((cat) =>
    cat.articles.map((art) => ({
      url: `${baseUrl}/help-center/${cat.slug}/${art.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    }))
  )

  // 11. Dynamic Published Blog Articles (Fetched from Supabase SSR with Curated Fallback)
  let remoteBlogRoutes: MetadataRoute.Sitemap = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iyvikdxzcpcjivmbiwik.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_P7Cqz0FeBivOCQAtMVHd7A_CwRzIyN2'
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: posts } = await supabase
      .from('seo_articles')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
    
    if (posts && posts.length > 0) {
      remoteBlogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || now),
        changeFrequency: 'monthly',
        priority: 0.75,
      }))
    }
  } catch {
    remoteBlogRoutes = []
  }

  const existingBlogSlugs = new Set(remoteBlogRoutes.map((r) => r.url))
  const curatedBlogRoutes: MetadataRoute.Sitemap = CURATED_BLOG_POSTS
    .filter((p) => !existingBlogSlugs.has(`${baseUrl}/blog/${p.slug}`))
    .map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.published_at || now),
      changeFrequency: 'monthly',
      priority: 0.75,
    }))

  const blogRoutes = [...remoteBlogRoutes, ...curatedBlogRoutes]

  return [...coreRoutes, ...templateRoutes, ...helpCategoryRoutes, ...helpArticleRoutes, ...blogRoutes]
}
