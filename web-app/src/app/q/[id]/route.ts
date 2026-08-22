import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    try {
        // 1. Fetch QR Code Data
        const { data: qrCode, error: fetchError } = await supabase
            .from('qr_codes')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !qrCode) {
            console.error('QR Code not found:', fetchError);
            return NextResponse.redirect(new URL('/not-found', request.url));
        }

        // 2. Log Scan Analytics
        // We do this asynchronously without blocking the redirect
        const userAgent = request.headers.get('user-agent') || 'Unknown Device';
        const forwardedFor = request.headers.get('x-forwarded-for') || 'Unknown IP';
        
        supabase.from('qr_scans').insert([{
            qr_code_id: id,
            device_info: { userAgent },
            location: forwardedFor
        }]).then(({ error }) => {
            if (error) console.error('Failed to log QR scan analytics:', error);
        });

        // 3. Determine Redirect Destination based on Type
        const { type, content, asset_url } = qrCode;

        switch (type) {
            case 'website':
                return NextResponse.redirect(content.url || new URL('/not-found', request.url));
                
            case 'identity':
                // Redirect to the professional profile viewer
                return NextResponse.redirect(new URL(`/identity/${id}`, request.url));
                
            case 'email':
                return NextResponse.redirect(`mailto:${content.email}?subject=${encodeURIComponent(content.subject || '')}&body=${encodeURIComponent(content.body || '')}`);
                
            case 'phone':
                return NextResponse.redirect(`tel:${content.phone}`);
                
            case 'sms':
                return NextResponse.redirect(`sms:${content.phone}?body=${encodeURIComponent(content.message || '')}`);
                
            case 'wifi':
                // Native QR readers handle WiFi automatically if generating raw WiFi string.
                // However, since this is dynamic, the user scans a URL (nobevra.noblesworld.com.ng/q/uuid).
                // Thus, we must show them a page with the WiFi details.
                return NextResponse.redirect(new URL(`/qr/view/${id}`, request.url));
                
            case 'video':
                if (content.isUrlSource && content.videoUrl) {
                    return NextResponse.redirect(content.videoUrl);
                }
                if (asset_url) {
                    return NextResponse.redirect(asset_url);
                }
                return NextResponse.redirect(new URL(`/qr/view/${id}`, request.url));
                
            case 'pdf':
            case 'mp3':
            case 'image':
                if (asset_url) {
                    return NextResponse.redirect(asset_url);
                }
                return NextResponse.redirect(new URL('/not-found', request.url));
                
            case 'appstore':
            case 'social':
            case 'business':
            case 'event':
            case 'menu':
            case 'location':
                // All complex visual forms redirect to the universal Viewer Page
                return NextResponse.redirect(new URL(`/qr/view/${id}`, request.url));
                
            default:
                return NextResponse.redirect(new URL(`/qr/view/${id}`, request.url));
        }

    } catch (error) {
        console.error('QR Routing Error:', error);
        return NextResponse.redirect(new URL('/not-found', request.url));
    }
}
