import Script from 'next/script';
import { brand } from '@/lib/brand';

interface BreadcrumbItem {
  name: string;
  /** Full absolute URL for this breadcrumb level */
  item?: string;
}

interface BreadcrumbSchemaProps {
  /** Ordered list of breadcrumb levels. Final item is current page (no `item` URL needed). */
  crumbs: BreadcrumbItem[];
  /** Unique id suffix for this page's script tag, e.g. "crm", "invoicing" */
  pageId: string;
}

/**
 * BreadcrumbSchema — Phase 8 Breadcrumb Structured Data
 *
 * Renders a BreadcrumbList schema for dedicated SEO landing pages.
 * Only renders where visible breadcrumb navigation genuinely exists.
 *
 * Usage:
 *   <BreadcrumbSchema
 *     pageId="crm"
 *     crumbs={[
 *       { name: 'Home', item: 'https://nobevra.noblesworld.com.ng' },
 *       { name: 'CRM for Small Business' },
 *     ]}
 *   />
 */
export default function BreadcrumbSchema({ crumbs, pageId }: BreadcrumbSchemaProps) {
  const base = brand.urls.canonical;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${base}/#breadcrumb-${pageId}`,
    'itemListElement': crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      ...(crumb.item ? { 'item': crumb.item } : {}),
    })),
  };

  return (
    <Script
      id={`schema-breadcrumb-${pageId}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
