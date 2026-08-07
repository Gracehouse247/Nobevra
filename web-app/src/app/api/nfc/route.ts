import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * NFC Tag Mapper Endpoint
 * Handles requests like GET /api/nfc?id=TAG123
 * Looks up the tag in the database and redirects the user to the assigned public profile.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get('id');

    if (!tagId) {
        return NextResponse.json({ error: 'NFC Tag ID is required' }, { status: 400 });
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Lookup the tag
        const { data: tag, error } = await supabase
            .from('nfc_tags')
            .select('target_url')
            .eq('id', tagId)
            .single();

        if (error || !tag) {
            // If the tag is unknown or unassigned, redirect to the setup/claim page
            return NextResponse.redirect(new URL(`/networking?setup=${tagId}`, request.url));
        }

        // Redirect to the assigned public profile/business card URL
        return NextResponse.redirect(new URL(tag.target_url, request.url));
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
