import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } },
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch User Profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        // Fetch Clients
        const { data: clients } = await supabase
            .from('clients')
            .select('*')
            .eq('user_id', user.id);

        // Fetch Invoices
        const { data: invoices } = await supabase
            .from('invoices')
            .select('*, invoice_items(*)')
            .eq('user_id', user.id);

        try {
            // Record the export event
            await supabase
                .from('data_exports')
                .insert({ user_id: user.id, status: 'completed' });
        } catch (e) {
            // best effort
        }

        const exportData = {
            user_id: user.id,
            email: user.email,
            exported_at: new Date().toISOString(),
            profile,
            clients,
            invoices,
        };

        // Return as a downloadable JSON file
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Content-Disposition', `attachment; filename="nobevra_export_${user.id}.json"`);

        return new NextResponse(JSON.stringify(exportData, null, 2), { status: 200, headers });
    } catch (error: any) {
        console.error('Data Export Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
