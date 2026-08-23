import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nobevra.noblesworld.com.ng'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Core Pillar & High-Volume SEO Landing Pages (Phase 5)
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
      url: `${baseUrl}/invoice-generator`,
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
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.60,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
  ]
}
