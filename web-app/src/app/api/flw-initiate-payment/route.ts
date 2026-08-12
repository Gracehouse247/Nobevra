// src/app/api/flw-initiate-payment/route.ts
// Server-side Flutterwave Standard payment initiation using secret key.
// This is the industry-standard approach for payment plans/subscriptions —
// the plan lookup happens with the secret key, bypassing any client-side SDK issues.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY!;
const APP_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, billingCycle, userEmail, userName, userId, txRef, amount, planId } = body;

    if (!tier || !billingCycle || !userEmail || !userId || !txRef || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!FLW_SECRET_KEY) {
      console.error('FLW_SECRET_KEY is not set');
      return NextResponse.json({ error: 'Payment system not configured' }, { status: 500 });
    }

    // Build the Flutterwave Standard payment payload
    const payload: Record<string, any> = {
      tx_ref: txRef,
      amount: amount,
      currency: 'USD',
      redirect_url: `${APP_URL}/payment/callback`,
      customer: {
        email: userEmail,
        name: userName || 'NobleInvoice User',
      },
      meta: {
        user_id: userId,
        tier: tier,
        billing_cycle: billingCycle,
      },
      customizations: {
        title: `NobleInvoice ${tier === 'pulse' ? 'Noble Pulse' : 'Noble Elite'}`,
        description: `Subscription to NobleInvoice ${tier === 'pulse' ? 'Noble Pulse' : 'Noble Elite'} (${billingCycle})`,
        logo: `${APP_URL}/images/logo.png`,
      },
    };

    // Add payment plan for subscriptions
    if (planId) {
      payload.payment_plan = Number(planId);
    }

    console.log('Initiating Flutterwave Standard payment:', {
      tx_ref: txRef,
      amount,
      tier,
      planId,
    });

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.status === 'success' && data.data?.link) {
      return NextResponse.json({ paymentLink: data.data.link, txRef });
    } else {
      console.error('Flutterwave payment initiation failed:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create payment session' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
