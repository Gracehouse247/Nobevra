import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does Invoicing Software Cost? — Transparent Pricing | Nobevra',
  description: 'How much does invoicing software cost per month? Nobevra offers free, Pro ($9/mo), and Elite plans. Compare invoicing software for small business free vs paid features.',
  keywords: ['how much does invoicing software cost', 'invoicing software for small business free', 'estimate and invoice software free', 'invoicing software for contractors', 'invoice software pricing'],
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
