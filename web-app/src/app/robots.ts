import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/'],
      },
    ],
    sitemap: 'https://nobevra.noblesworld.com.ng/sitemap.xml',
    host: 'https://nobevra.noblesworld.com.ng',
  }
}
