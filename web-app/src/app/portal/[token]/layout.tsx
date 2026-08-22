import { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import { supabase } from '@/lib/supabase';

interface Props {
    params: Promise<{ token: string }>;
    children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { token } = await params;
    let clientName = 'Client';
    let ogTitle = 'Secure Client Portal';
    let ogDescription = 'View your invoices and billing history.';

    try {
        // Fetch public portal data via server to populate SEO metadata
        const { data, error } = await supabase.rpc('get_client_portal_data', { p_token: token });
        
        if (!error && data && data.client) {
            clientName = data.client.name || data.client.company || 'Client';
            const invoiceCount = data.invoices ? data.invoices.length : 0;
            ogTitle = `Secure Portal | ${clientName}`;
            ogDescription = `Access your secure billing portal. You have ${invoiceCount} recent statement(s).`;
        }
    } catch (err) {
        console.error('Failed to generate metadata for portal:', err);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nobevra.noblesworld.com.ng';

    return {
        title: ogTitle,
        description: ogDescription,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: `${appUrl}/portal/${token}`,
            siteName: 'Nobevra',
            images: [
                {
                    url: `${appUrl}/api/og?title=${encodeURIComponent(ogTitle)}&desc=${encodeURIComponent(ogDescription)}`,
                    width: 1200,
                    height: 630,
                    alt: 'Secure Portal Preview',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            images: [`${appUrl}/api/og?title=${encodeURIComponent(ogTitle)}&desc=${encodeURIComponent(ogDescription)}`],
        },
    };
}

export default async function PortalServerLayout({ children, params }: Props) {
    const { token } = await params;
    return <ClientLayout>{children}</ClientLayout>;
}
