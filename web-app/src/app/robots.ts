import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const disallowList = [
    '/admin/',
    '/portal/',
    '/api/',
    '/dashboard/',
    '/invoices/',
    '/clients/',
    '/expenses/',
    '/products/',
    '/settings/',
    '/reports/',
    '/contracts/',
    '/networking/',
    '/wallet/',
    '/embed/',
    '/q/',
    '/nfc/',
    '/identity/',
    '/custom-domain-proxy',
    '/pro/',
    '/invite/',
    '/payment/',
    '/p/',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowList,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowList,
      },
    ],
    sitemap: 'https://nobevra.noblesworld.com.ng/sitemap.xml',
    host: 'https://nobevra.noblesworld.com.ng',
  }
}
