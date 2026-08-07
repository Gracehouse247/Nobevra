import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// NFC Redirect endpoint
// When a physical NFC card is tapped, the chip opens:
//   https://invoice.noblesworld.com.ng/nfc/{serial}
// This route resolves the serial number to the user's profile URL
// and performs an instant 302 redirect.

export async function GET(
    request: Request,
    { params }: { params: Promise<{ serial: string }> }
) {
    const serial = (await params).serial;
    if (!serial) {
        return NextResponse.redirect(new URL('/404', request.url));
    }

    // Use anon key for fast public resolution of NFC cards
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { data, error } = await supabase
            .from('nfc_cards')
            .select('profile_url')
            .eq('serial_number', serial)
            .eq('is_active', true)
            .single();

        if (error || !data || !data.profile_url) {
            console.error('NFC Lookup Error:', error?.message);
            // Fallback: redirect to the business card maker page
            return NextResponse.redirect(
                new URL('/business-card-maker?error=card_not_found', request.url)
            );
        }

        // Fast 302 Redirect → https://invoice.noblesworld.com.ng/nfc/{serial}
        // will resolve to the user's stored profile_url
        return NextResponse.redirect(data.profile_url, { status: 302 });
    } catch (err) {
        console.error('Unexpected NFC routing error:', err);
        return NextResponse.redirect(new URL('/404', request.url));
    }
}

