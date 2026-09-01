import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    robots: { index: false, follow: false },
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/free-invoice-generator',
    },
};

export default function InvoiceGeneratorRedirect() {
    redirect('/free-invoice-generator');
}
