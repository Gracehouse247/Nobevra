import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Free Invoice Maker App | Nobevra',
  description: 'Sign in to Nobevra, the free invoice maker app. Is there an app for making invoices? Yes — create invoices, manage clients, and get paid from any device.',
  keywords: ['is there an app for making invoices', 'free invoice maker app', 'invoice generator login', 'how can I generate an invoice for free'],
  alternates: { canonical: 'https://nobevra.noblesworld.com.ng/login' },
  robots: { index: true, follow: true },
};


export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
