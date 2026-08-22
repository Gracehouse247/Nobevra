'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { FileText, CreditCard, CheckCircle, ExternalLink, Calendar } from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   Embeddable Invoice Viewer
   Route: /embed?token=xyz
   Designed for iframe embedding on external websites.
   ──────────────────────────────────────────────────────────── */

interface InvoiceData {
  id: string;
  invoice_number: string;
  status: string;
  due_date: string;
  total_amount: number;
  currency_code: string;
  teams?: { business_name?: string; name?: string };
  clients?: { email?: string; name?: string };
}

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  paid:    { label: 'Paid',    bg: 'bg-emerald-50',  text: 'text-emerald-600', border: 'border-emerald-200' },
  pending: { label: 'Pending', bg: 'bg-amber-50',    text: 'text-amber-600',   border: 'border-amber-200'   },
  overdue: { label: 'Overdue', bg: 'bg-rose-50',     text: 'text-rose-600',    border: 'border-rose-200'    },
  sent:    { label: 'Sent',    bg: 'bg-sky-50',      text: 'text-sky-600',     border: 'border-sky-200'     },
  viewed:  { label: 'Viewed',  bg: 'bg-[#f0fafa]',   text: 'text-[#006970]',  border: 'border-[#b9cacb]'  },
  draft:   { label: 'Draft',   bg: 'bg-slate-50',    text: 'text-slate-500',   border: 'border-slate-200'   },
};

const getStatus = (s: string) =>
  statusConfig[s] || { label: s, bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200' };

const formatCurrency = (amount: number, code: string) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code || 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${code} ${amount.toFixed(2)}`;
  }
};

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

/* ── Inner Component Using SearchParams ───────────────────── */

function EmbedInvoiceContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [flutterwaveReady, setFlutterwaveReady] = useState(false);

  /* ── Fetch invoice ───────────────────────────────────── */
  useEffect(() => {
    if (!token) {
      setError('No invoice token provided.');
      setLoading(false);
      return;
    }

    const fetchInvoice = async () => {
      try {
        const res = await fetch(`/api/portal/invoice/${token}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || 'Invoice not found');
        }
        const { invoice: inv } = await res.json();
        setInvoice(inv);
      } catch (err: any) {
        setError(err.message || 'Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [token]);

  /* ── Flutterwave payment checkout ─────────────────────── */
  const handlePayment = () => {
    if (!invoice || !(window as any).FlutterwaveCheckout) return;

    (window as any).FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || '',
      tx_ref: `embed_pay_${invoice.id}_${Date.now()}`,
      amount: invoice.total_amount,
      currency: invoice.currency_code || 'USD',
      payment_options: 'card, banktransfer, ussd, qr',
      customer: {
        email: invoice.clients?.email || 'customer@example.com',
        name: invoice.clients?.name || 'Valued Client',
      },
      customizations: {
        title: invoice.teams?.business_name || invoice.teams?.name || 'Nobevra Payment',
        description: `Payment for Invoice #${invoice.invoice_number}`,
        logo: 'https://nobevra.noblesworld.com.ng/images/logo.png',
      },
      callback: async (data: any) => {
        if (data.status === 'successful' || data.charge_response_code === '00') {
          try {
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-and-upgrade-subscription`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  transaction_id: data.transaction_id,
                  tx_ref: data.tx_ref,
                  tier: 'payg',
                  expected_amount: invoice.total_amount
                })
              }
            );

            if (verifyRes.ok) {
              setPaymentSuccess(true);
              setInvoice(prev => prev ? { ...prev, status: 'paid' } : null);
            }
          } catch (err) {
            console.error('Payment callback verification failed', err);
          }
        }
      },
      onclose: () => {},
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).FlutterwaveCheckout) {
      setFlutterwaveReady(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-2xl border border-slate-100 min-h-[300px]">
        <div className="w-8 h-8 border-[3px] border-slate-200 border-t-[#01A0E2] rounded-full animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading invoice...</span>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-2xl border border-rose-100 min-h-[300px]">
        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 text-rose-500 mb-3">
          <FileText className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Invoice Error</span>
        <p className="text-xs text-rose-500 text-center font-medium max-w-[200px] leading-relaxed">{error || 'Invoice not found'}</p>
      </div>
    );
  }

  const isPaid = invoice.status === 'paid' || paymentSuccess;
  const status = getStatus(invoice.status);
  const businessName = invoice.teams?.business_name || invoice.teams?.name || 'Business';

  return (
    <>
      {/* Flutterwave SDK */}
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="lazyOnload"
        onLoad={() => setFlutterwaveReady(true)}
      />

      {/* Google Fonts – Inter */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      />

      <div
        className="flex items-start justify-center min-h-[260px] p-4 bg-transparent"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative max-w-md w-full
            bg-white/90 backdrop-blur-xl
            border border-white/60
            rounded-[24px]
            shadow-[0_20px_40px_rgba(0,0,0,0.08)]
            overflow-hidden
            group
          "
        >
          {/* ── Gradient border glow on hover ────────── */}
          <div
            className="
              pointer-events-none absolute -inset-[1px] rounded-[25px] opacity-0
              group-hover:opacity-100 transition-opacity duration-500
              bg-[linear-gradient(135deg,#01A0E2_0%,#00F0FF_50%,#01A0E2_100%)]
              -z-10
            "
          />

          {/* ── Card Content ─────────────────────────── */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[24px] p-6">

            {/* Business Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#01A0E2] to-[#00F0FF] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span
                  className="text-sm font-extrabold text-slate-800 tracking-tight truncate"
                  style={{ fontFamily: "'Clash Display', 'Syne', 'Inter', sans-serif" }}
                >
                  {businessName}
                </span>
              </div>
              <span
                className={`
                  flex-shrink-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em]
                  rounded-lg border
                  ${isPaid ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : `${status.bg} ${status.text} ${status.border}`}
                `}
              >
                {isPaid ? 'Paid' : status.label}
              </span>
            </div>

            {/* Invoice Meta Row */}
            <div className="flex items-center gap-4 mb-5 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-400">
                <FileText className="w-3 h-3" />
                <span className="font-bold text-slate-600">{invoice.invoice_number}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3 h-3" />
                <span className="font-medium text-slate-500">Due {formatDate(invoice.due_date)}</span>
              </div>
            </div>

            {/* Total Amount Due Block */}
            <div
              className="
                bg-slate-50/50 border border-slate-100 rounded-2xl p-5 mb-5
                flex flex-col items-center justify-center text-center
              "
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
                Amount Outstanding
              </span>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                {formatCurrency(invoice.total_amount, invoice.currency_code)}
              </h3>
            </div>

            {/* Pay Button / Success Block */}
            {isPaid ? (
              <div
                className="
                  bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4
                  flex items-center gap-3.5
                "
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-500/20">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs text-emerald-800 font-extrabold block">Invoice Paid</strong>
                  <span className="text-[10px] text-emerald-600 font-medium">Thank you for your business.</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePayment}
                disabled={!flutterwaveReady}
                className={`
                  w-full py-3.5 px-6 rounded-2xl font-extrabold text-xs text-white uppercase tracking-wider
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${flutterwaveReady 
                    ? 'bg-[#01A0E2] hover:bg-[#0484b8] shadow-md shadow-[#01A0E2]/10 hover:-translate-y-0.5 active:translate-y-0' 
                    : 'bg-slate-200 cursor-not-allowed text-slate-400'
                  }
                `}
              >
                <CreditCard className="w-4.5 h-4.5" />
                Pay Invoice
              </button>
            )}

            {/* Portal Redirect Link */}
            <div className="mt-5 text-center">
              <a
                href={`/portal?token=${token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1.5 text-[11px] font-bold
                  text-slate-400 hover:text-[#01A0E2] transition-colors
                "
              >
                View Full Invoice Details
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Powered By Footer */}
            <div className="mt-5 pt-4 border-t border-slate-100/60 flex items-center justify-center">
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.15em]">
                Powered by{' '}
                <span className="text-slate-400 font-extrabold">Nobevra</span>
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ── Export Wrapped in Suspense Boundary ─────────────────── */

export default function EmbedInvoicePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-8 bg-white/80 rounded-2xl border border-slate-100 min-h-[300px]">
        <div className="w-8 h-8 border-[3px] border-slate-200 border-t-[#01A0E2] rounded-full animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initialising Secure Portal...</span>
      </div>
    }>
      <EmbedInvoiceContent />
    </Suspense>
  );
}
