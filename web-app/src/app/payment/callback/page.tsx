'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const handleCallback = async () => {
      const txRef = searchParams.get('tx_ref');
      const transactionId = searchParams.get('transaction_id');
      const flwStatus = searchParams.get('status');

      if (!txRef || !transactionId) {
        setStatus('failed');
        setMessage('Invalid payment callback. Missing parameters.');
        return;
      }

      if (flwStatus === 'cancelled') {
        setStatus('failed');
        setMessage('Payment was cancelled. You have not been charged.');
        setTimeout(() => router.push('/upgrade'), 3000);
        return;
      }

      if (flwStatus !== 'successful') {
        setStatus('failed');
        setMessage(`Payment failed with status: ${flwStatus}`);
        setTimeout(() => router.push('/upgrade'), 4000);
        return;
      }

      try {
        // Parse tier and billing cycle from tx_ref: sub_{tier}_{period}_{userId}_{shortId}
        const parts = txRef.match(/^sub_([a-z]+)_(monthly|yearly)_/);
        if (!parts) throw new Error('Invalid tx_ref format');

        const tier = parts[1];

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Not authenticated');

        const verifyRes = await axios.post(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-and-upgrade-subscription`,
          {
            transaction_id: transactionId,
            tx_ref: txRef,
            user_id: session.user.id,
            tier: tier,
          },
          {
            headers: { Authorization: `Bearer ${session.access_token}` }
          }
        );

        if (verifyRes.data.status === 'upgraded') {
          // Silently save card token
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/save-card-token`,
              { transaction_id: transactionId, tx_ref: txRef },
              { headers: { Authorization: `Bearer ${session.access_token}` } }
            );
          } catch {
            // Non-critical
          }

          setStatus('success');
          setMessage(`Welcome to NobleInvoice ${tier === 'pulse' ? 'Noble Pulse' : 'Noble Elite'}! Your plan is now active.`);
          setTimeout(() => router.push('/dashboard'), 3000);
        } else {
          throw new Error(verifyRes.data.error || 'Verification failed');
        }
      } catch (error: any) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage(error.response?.data?.error || error.message || 'Verification failed. Contact support.');
        setTimeout(() => router.push('/upgrade'), 5000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-12 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 border-4 border-[#166FBB] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-[20px] font-black text-slate-900 mb-3">Verifying Payment</h1>
            <p className="text-[14px] text-slate-500 font-medium">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-[20px] font-black text-slate-900 mb-3">Payment Successful!</h1>
            <p className="text-[14px] text-slate-500 font-medium">{message}</p>
            <p className="text-[12px] text-slate-400 mt-4">Redirecting to your dashboard...</p>
          </>
        )}
        {status === 'failed' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-[20px] font-black text-slate-900 mb-3">Payment Issue</h1>
            <p className="text-[14px] text-slate-500 font-medium">{message}</p>
            <p className="text-[12px] text-slate-400 mt-4">Redirecting back...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#166FBB] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
