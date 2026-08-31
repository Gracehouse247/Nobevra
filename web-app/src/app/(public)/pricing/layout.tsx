import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans & Feature Matrix — Transparent Global Plans | Nobevra',
  description: 'Explore Nobevra pricing plans. Start free with Explorer ($0), or unlock unlimited power with Pulse ($9.99/mo) and Elite ($24.99/mo). Cancel anytime.',
  keywords: ['nobevra pricing', 'invoicing software pricing', 'small business software cost', 'business operating system plans'],
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng/pricing',
  },
  openGraph: {
    title: 'Nobevra Pricing — Transparent Plans for Global Teams',
    description: 'Flat, transparent pricing in USD. No hidden setup fees, no forced commitments, and cancel anytime.',
    url: 'https://nobevra.noblesworld.com.ng/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Plans & Feature Matrix | Nobevra',
    description: 'Transparent pricing from $0 to $24.99/mo. Invoicing, CRM, expenses, and payments in one platform.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
