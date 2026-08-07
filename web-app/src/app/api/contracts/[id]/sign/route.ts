import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const { id } = await params;
        const { signer_name, signer_email, signature_data_url } = await request.json();

        if (!signer_name || !signer_email || !signature_data_url) {
            return NextResponse.json({ error: 'Missing required signature fields' }, { status: 400 });
        }

        // Get Client IP and User Agent for audit trail
        const ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const user_agent = request.headers.get('user-agent') || 'unknown';

        // Fetch contract terms to hash
        const { data: contract, error: fetchErr } = await supabaseAdmin
            .from('contracts')
            .select('terms_html, team_id')
            .eq('id', id)
            .single();

        if (fetchErr || !contract) {
            return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
        }

        // Verify Subscription Entitlement for E-Signatures
        const { data: entitlements, error: entitlementErr } = await supabaseAdmin
            .rpc('resolve_team_entitlements', { p_team_id: contract.team_id });
            
        // E-signatures require Pulse or Elite plan, mapped to 'contracts' entitlement
        if (entitlementErr || !entitlements || !entitlements.contracts) {
            return NextResponse.json({ error: 'Payment Required: Please upgrade to the Pulse or Elite plan to use E-Signatures.' }, { status: 402 });
        }

        // Generate a pseudo-cryptographic hash representing the terms at time of signing
        // In Node.js environment we could use crypto module
        const crypto = require('crypto');
        const audit_hash = crypto
            .createHash('sha256')
            .update(contract.terms_html + signature_data_url + Date.now().toString())
            .digest('hex');

        // Insert Signature Audit Trail
        const { error: signErr } = await supabaseAdmin
            .from('contract_signatures')
            .insert({
                contract_id: id,
                signer_name,
                signer_email,
                signature_data_url,
                ip_address,
                user_agent,
                audit_hash
            });

        if (signErr) {
            console.error('Signature insert failed:', signErr);
            return NextResponse.json({ error: 'Failed to record signature' }, { status: 500 });
        }

        // Lock the contract status
        const { error: updateErr } = await supabaseAdmin
            .from('contracts')
            .update({ status: 'signed', updated_at: new Date().toISOString() })
            .eq('id', id);

        if (updateErr) {
            console.error('Contract status update failed:', updateErr);
            return NextResponse.json({ error: 'Failed to lock contract' }, { status: 500 });
        }

        return NextResponse.json({ success: true, audit_hash });
    } catch (error: any) {
        console.error('Signing API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
