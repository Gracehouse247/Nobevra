import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
    try {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        
        // 1. Authenticate user
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Fetch current profile
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('subscription_tier, subscription_status, stripe_customer_id')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        // 3. Cancel on Flutterwave by fetching active subscriptions via email
        if (user.email) {
            try {
                const getRes = await fetch(`https://api.flutterwave.com/v3/subscriptions?email=${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
                    }
                });
                const getData = await getRes.json();
                
                if (getData.status === 'success' && getData.data && getData.data.length > 0) {
                    for (const sub of getData.data) {
                        if (sub.status === 'active') {
                            await fetch(`https://api.flutterwave.com/v3/subscriptions/${sub.id}/cancel`, {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
                                }
                            });
                        }
                    }
                }
            } catch (err) {
                console.error('[API Cancel Subscription] Failed to cancel on FLW', err);
            }
        }

        // 3. Update profile to cancel subscription
        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({
                subscription_tier: 'explorer',
                subscription_status: 'canceled',
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

        if (updateError) {
            console.error('[API Cancel Subscription] Database update failed:', updateError);
            return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Subscription canceled successfully. You have been downgraded to the Explorer plan.' 
        }, { status: 200 });

    } catch (error: any) {
        console.error('[API Cancel Subscription] Unexpected error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
