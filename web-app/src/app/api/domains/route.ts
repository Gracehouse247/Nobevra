import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const VERCEL_API_URL = 'https://api.vercel.com/v10';
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

// Helper to authenticate request
async function authenticateRequest(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return null;

    const token = authHeader.replace('Bearer ', '');
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) return null;
    return { user, supabaseAdmin };
}

export async function POST(request: Request) {
    try {
        const auth = await authenticateRequest(request);
        if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { domain } = await request.json();
        if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });

        // Verify Subscription Entitlement for Custom Domains
        const { data: profile } = await auth.supabaseAdmin
            .from('profiles')
            .select('team_id')
            .eq('id', auth.user.id)
            .single();

        if (profile?.team_id) {
            const { data: entitlements, error: entitlementErr } = await auth.supabaseAdmin
                .rpc('resolve_team_entitlements', { p_team_id: profile.team_id });
                
            if (entitlementErr || !entitlements || !entitlements.custom_domains) {
                return NextResponse.json({ error: 'Payment Required: Please upgrade to the Elite plan to use Custom Domains.' }, { status: 402 });
            }
        }

        if (!VERCEL_PROJECT_ID || !VERCEL_API_TOKEN) {
             console.error("Missing VERCEL_PROJECT_ID or VERCEL_API_TOKEN");
             return NextResponse.json({ error: 'Server misconfiguration: Vercel credentials missing.' }, { status: 500 });
        }

        // Vercel Domains API Integration
        const vercelRes = await fetch(`${VERCEL_API_URL}/projects/${VERCEL_PROJECT_ID}/domains`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: domain })
        });

        const vercelData = await vercelRes.json();

        if (!vercelRes.ok) {
            console.error('Vercel API Error on POST:', vercelData);
            return NextResponse.json({ 
                error: vercelData.error?.message || 'Failed to register domain with Vercel'
            }, { status: vercelRes.status });
        }

        return NextResponse.json({ 
            success: true, 
            message: `Domain ${domain} successfully registered to Vercel project.`,
            vercel_data: vercelData
        });

    } catch (error: any) {
        console.error('Domains API Error (POST):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const auth = await authenticateRequest(request);
        if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const url = new URL(request.url);
        const domain = url.searchParams.get('domain');

        if (!domain) return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });

        if (!VERCEL_PROJECT_ID || !VERCEL_API_TOKEN) {
             console.error("Missing VERCEL_PROJECT_ID or VERCEL_API_TOKEN");
             return NextResponse.json({ error: 'Server misconfiguration: Vercel credentials missing.' }, { status: 500 });
        }

        // Vercel Domains API Integration
        const vercelRes = await fetch(`${VERCEL_API_URL}/projects/${VERCEL_PROJECT_ID}/domains/${domain}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`
            }
        });

        if (!vercelRes.ok) {
            const vercelData = await vercelRes.json();
            console.error('Vercel API Error on DELETE:', vercelData);
            return NextResponse.json({ 
                error: vercelData.error?.message || 'Failed to remove domain from Vercel'
            }, { status: vercelRes.status });
        }

        return NextResponse.json({ 
            success: true, 
            message: `Domain ${domain} successfully removed from Vercel project.`
        });

    } catch (error: any) {
        console.error('Domains API Error (DELETE):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
