import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Free Account — Invoice Maker App Free | Nobevra',
  description: 'Sign up for Nobevra free. The best invoice maker app free for iPhone, Android & desktop. Create professional invoices, accept payments, and manage your business.',
  keywords: ['invoice maker app free', 'free invoice generator sign up', 'create invoice account free', 'best invoice maker app free'],
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
