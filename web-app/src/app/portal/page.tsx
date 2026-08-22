'use client';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  CreditCard,
  Building,
  User,
  Mail,
  Hash,
  Calendar
} from 'lucide-react';

import { ConfettiExplosion } from '@/components/portal/ConfettiExplosion';
import { LoadingSpinner } from '@/components/portal/LoadingSpinner';
import { InvoiceNotFound } from '@/components/portal/InvoiceNotFound';
import { PaymentSuccessCard } from '@/components/portal/PaymentSuccessCard';
import { Toast } from '@/components/portal/Toast';

/* ─── Types ─────────────────────────────────────────────────────────── */

import { Invoice, LineItem } from '@/types';

/* ─── Status Badge Config ───────────────────────────────────────────── */

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; ring: string; dot: string; label: string }
> = {
  paid: {
    bg: 'bg-emerald-50/80',
    text: 'text-emerald-700',
    ring: 'ring-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'Paid',
  },
  overdue: {
    bg: 'bg-rose-50/80',
    text: 'text-rose-700',
    ring: 'ring-rose-500/20',
    dot: 'bg-rose-500',
    label: 'Overdue',
  },
  viewed: {
    bg: 'bg-blue-50/80',
    text: 'text-blue-700',
    ring: 'ring-blue-500/20',
    dot: 'bg-blue-500',
    label: 'Viewed',
  },
  draft: {
    bg: 'bg-slate-50/80',
    text: 'text-slate-700',
    ring: 'ring-slate-500/20',
    dot: 'bg-slate-500',
    label: 'Draft',
  },
  sent: {
    bg: 'bg-amber-50/80',
    text: 'text-amber-700',
    ring: 'ring-amber-500/20',
    dot: 'bg-amber-500',
    label: 'Sent',
  },
};

/* ─── Currency Formatter ────────────────────────────────────────────── */

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ─── Stagger Animation Variants ────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
};

/* ─── Main Portal Content ───────────────────────────────────────────── */

function PortalContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  /* Fetch invoice */
  useEffect(() => {
    if (!token) {
      setError(true);
      setLoading(false);
      return;
    }

    async function fetchInvoice() {
      try {
        const res = await fetch(`/api/portal/invoice/${token}`);
        if (!res.ok) throw new Error('Invoice not found');
        const data = await res.json();
        setInvoice(data.invoice);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInvoice();
  }, [token]);

  /* Dynamic page title */
  useEffect(() => {
    if (invoice) {
      document.title = `Invoice ${invoice.invoice_number} | Nobevra`;
    }
  }, [invoice]);

  const [payingNow, setPayingNow] = useState(false);

  /* Payment handler — routes through backend to ensure commission is collected */
  const handlePayNow = async () => {
    if (!invoice || payingNow) return;
    setPayingNow(true);

    try {
      // Call our backend edge function which adds the correct gateway fee
      // and will credit the vendor wallet when the webhook fires.
      const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/create-flutterwave-payment?invoice_id=${invoice.id}`,
        {
          method: 'GET',
          headers: {
            apikey: SUPABASE_ANON_KEY!,
          },
        }
      );

      // The backend returns 302 redirect to FLW payment link.
      // fetch() follows redirects automatically, so we get the FLW page URL from response.url.
      if (res.ok || res.redirected) {
        // Redirect the browser to the payment page
        window.location.href = res.url;
      } else {
        const errData = await res.json().catch(() => ({}));
        setToastMessage((errData as any).error || 'Failed to initiate payment. Please try again.');
        setPayingNow(false);
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      setToastMessage('Network error. Please check your connection and try again.');
      setPayingNow(false);
    }
  };

  /* PDF download handler */
  const handleDownloadPdf = () => {
    if (invoice?.pdf_url) {
      window.open(invoice.pdf_url, '_blank', 'noopener,noreferrer');
    } else {
      setToastMessage('PDF is being generated. Please try again shortly.');
    }
  };

  /* Render states */
  if (loading) return <LoadingSpinner />;
  if (error || !invoice) return <InvoiceNotFound />;

  const statusStyle = STATUS_STYLES[invoice.status] || STATUS_STYLES.draft;
  const canPay = invoice.status !== 'paid' && invoice.status !== 'draft';
  const currency = invoice.currency_code || 'USD';

  return (
    <>
      {/* No client-side FLW script needed — payment now flows through backend */}

      {/* Confetti */}
      <AnimatePresence>{showConfetti && <ConfettiExplosion />}</AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <Toast
            message={toastMessage}
            onClose={() => setToastMessage(null)}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#F0F4F8]">
        {/* ── Ambient Mesh Gradients ───────────────────────────────── */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-60 -top-60 h-[700px] w-[700px] rounded-full bg-[#01A0E2]/[0.06] blur-[140px]" />
          <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00F0FF]/[0.05] blur-[120px]" />
          <div className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full bg-[#01A0E2]/[0.04] blur-[130px]" />
        </div>

        {/* ── Content ──────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16"
        >
          {/* ── Invoice Card ─────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-[40px] border border-white/60 bg-white/60 shadow-[0_40px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="relative border-b border-slate-100/60 px-8 pb-8 pt-10 sm:px-12"
            >
              {/* Status badge — top right */}
              <div className="absolute right-6 top-6 sm:right-10 sm:top-8">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {statusStyle.label}
                  </span>
                </div>
              </div>

              {/* Business branding */}
              <div className="flex items-start gap-5">
                {((invoice.teams as any)?.brand_logo_url || (invoice.teams as any)?.logo_url) ? (
                  <img
                    src={(invoice.teams as any)?.brand_logo_url || (invoice.teams as any)?.logo_url}
                    alt={(invoice.teams as any)?.business_name || (invoice.teams as any)?.name || 'Business'}
                    className="h-14 w-14 rounded-2xl object-contain shadow-sm"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#01A0E2] to-[#00F0FF] shadow-lg">
                    <Building className="h-7 w-7 text-white" />
                  </div>
                )}
                <div>
                  <h1
                    className="text-2xl font-black tracking-tighter text-slate-900 sm:text-3xl"
                    style={{
                      fontFamily: 'Clash Display, Syne, Inter, sans-serif',
                    }}
                  >
                    {invoice.teams?.business_name || 'Invoice'}
                  </h1>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Invoice
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Invoice Meta ────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 border-b border-slate-100/60 px-8 py-8 sm:grid-cols-4 sm:px-12"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Hash className="h-3 w-3 text-slate-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Invoice No.
                  </span>
                </div>
                <p
                  className="text-sm font-black tracking-tight text-slate-800"
                  style={{
                    fontFamily: 'Clash Display, Syne, Inter, sans-serif',
                  }}
                >
                  {invoice.invoice_number}
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Issue Date
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {formatDate(invoice.issue_date)}
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Due Date
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {formatDate(invoice.due_date)}
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <User className="h-3 w-3 text-slate-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Bill To
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {invoice.clients?.name || '—'}
                </p>
                {invoice.clients?.email && (
                  <div className="mt-1 flex items-center gap-1">
                    <Mail className="h-3 w-3 text-slate-300" />
                    <p className="text-xs text-slate-500">
                      {invoice.clients.email}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Line Items Table ────────────────────────────────── */}
            <motion.div variants={itemVariants} className="px-8 py-8 sm:px-12">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#01A0E2]" />
                <h2
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                  style={{
                    fontFamily: 'Clash Display, Syne, Inter, sans-serif',
                  }}
                >
                  Line Items
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100/80">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100/80 bg-slate-50/50">
                      <th className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Description
                      </th>
                      <th className="px-5 py-3.5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Qty
                      </th>
                      <th className="px-5 py-3.5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Unit Price
                      </th>
                      <th className="px-5 py-3.5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(invoice.invoice_items || []).map((item, idx) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className={`border-b border-slate-50 transition-colors ${
                          idx % 2 === 0 ? 'bg-white/30' : 'bg-slate-50/30'
                        }`}
                      >
                        <td className="px-5 py-4 font-medium text-slate-700">
                          {item.description}
                        </td>
                        <td className="px-5 py-4 text-right tabular-nums text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="px-5 py-4 text-right tabular-nums text-slate-600">
                          {formatCurrency(item.unit_price, currency)}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold tabular-nums text-slate-800">
                          {formatCurrency(item.total, currency)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── Totals ─────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="border-t border-slate-100/60 px-8 py-8 sm:px-12"
            >
              <div className="ml-auto max-w-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-slate-700">
                    {formatCurrency(invoice.subtotal, currency)}
                  </span>
                </div>

                {invoice.tax_amount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Tax
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-slate-600">
                      +{formatCurrency(invoice.tax_amount, currency)}
                    </span>
                  </div>
                )}

                {invoice.discount_amount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Discount
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-emerald-600">
                      -{formatCurrency(invoice.discount_amount, currency)}
                    </span>
                  </div>
                )}

                <div className="!mt-5 border-t border-dashed border-slate-200 pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Grand Total
                    </span>
                    <span
                      className="text-3xl font-black tracking-tighter text-slate-900"
                      style={{
                        fontFamily: 'Clash Display, Syne, Inter, sans-serif',
                      }}
                    >
                      {formatCurrency(invoice.total_amount, currency)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Notes ──────────────────────────────────────────── */}
            {invoice.notes && (
              <motion.div
                variants={itemVariants}
                className="border-t border-slate-100/60 px-8 py-8 sm:px-12"
              >
                <p className="mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Notes
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                  {invoice.notes}
                </p>
              </motion.div>
            )}

            {/* ── Actions ────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-stretch gap-4 border-t border-slate-100/60 px-8 py-10 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-12"
            >
              {/* Download PDF */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPdf}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/60 bg-white/70 px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-md"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </motion.button>

              {/* Pay Now */}
              {canPay && !paymentSuccess && (
                <motion.button
                  whileHover={{ scale: payingNow ? 1 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePayNow}
                  disabled={payingNow}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#01A0E2] px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_rgba(5,153,213,0.25)] transition-all hover:shadow-[0_24px_48px_rgba(5,153,213,0.35)] disabled:opacity-60 disabled:cursor-wait"
                >
                  {payingNow ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Redirecting to Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Pay Now — {formatCurrency(invoice.total_amount, currency)}
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>

            {/* ── Payment Success ─────────────────────────────────── */}
            {paymentSuccess && (
              <div className="px-8 pb-10 sm:px-12">
                <PaymentSuccessCard />
              </div>
            )}
          </motion.div>

          {/* ── Footer ───────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300">
              Powered by
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-black tracking-tight text-[#01A0E2]/60 transition-colors hover:text-[#01A0E2]"
              style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}
            >
              Nobevra
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

/* ─── Page Wrapper with Suspense ────────────────────────────────────── */

export default function PortalPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PortalContent />
    </Suspense>
  );
}
