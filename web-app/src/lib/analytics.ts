/**
 * Nobevra Unified Web Analytics Service
 * Manages Google Analytics 4 (GA4), custom event taxonomy, and conversion tracking.
 */

export interface EventParams {
  [key: string]: any;
}

export interface NobevraStandardEventParams extends EventParams {
  product_identity?: 'nobevra' | 'noble_invoice_legacy';
  app_platform?: 'web' | 'android' | 'ios';
  user_id?: string;
  workspace_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Safely send a custom event to GA4 via dataLayer / gtag.
 */
export function trackEvent(
  eventName: string,
  params: NobevraStandardEventParams = {}
): void {
  if (typeof window === 'undefined') return;

  const enrichedParams: NobevraStandardEventParams = {
    product_identity: 'nobevra',
    app_platform: 'web',
    ...getStoredUTMParams(),
    ...params,
  };

  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, enrichedParams);
  } else if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...enrichedParams,
    });
  }
}

/**
 * Helper methods for core Nobevra funnel events
 */

export function trackPageView(pagePath: string, pageTitle?: string): void {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
}

export function trackSignUp(method: string, userRole?: string): void {
  trackEvent('sign_up', {
    method,
    user_role: userRole || 'user',
  });
}

export function trackLogin(method: string): void {
  trackEvent('login', {
    method,
  });
}

export function trackInvoiceCreated(params: {
  invoiceId: string;
  currency: string;
  totalAmount: number;
  templateId?: string;
  itemCount?: number;
}): void {
  trackEvent('invoice_created', {
    invoice_id: params.invoiceId,
    currency: params.currency,
    total_amount: params.totalAmount,
    template_id: params.templateId || 'default',
    item_count: params.itemCount || 1,
  });
}

export function trackInvoiceSent(params: {
  invoiceId: string;
  deliveryChannel: 'email' | 'whatsapp' | 'link';
}): void {
  trackEvent('invoice_sent', {
    invoice_id: params.invoiceId,
    delivery_channel: params.deliveryChannel,
  });
}

export function trackPaymentReceived(params: {
  invoiceId: string;
  amount: number;
  currency: string;
  paymentGateway: 'flutterwave' | 'manual' | 'bank_transfer';
}): void {
  trackEvent('payment_received', {
    invoice_id: params.invoiceId,
    amount: params.amount,
    currency: params.currency,
    payment_gateway: params.paymentGateway,
  });
}

export function trackSubscriptionStarted(params: {
  planId: string;
  billingCycle: 'monthly' | 'annual';
  value: number;
  currency: string;
}): void {
  trackEvent('subscription_started', {
    plan_id: params.planId,
    billing_cycle: params.billingCycle,
    value: params.value,
    currency: params.currency,
  });
}

export function trackSubscriptionUpgraded(params: {
  previousPlan: string;
  newPlan: string;
  value: number;
  currency: string;
}): void {
  trackEvent('subscription_upgraded', {
    previous_plan: params.previousPlan,
    new_plan: params.newPlan,
    value: params.value,
    currency: params.currency,
  });
}

export function trackFeatureUsed(featureName: string, extraParams: EventParams = {}): void {
  trackEvent('feature_used', {
    feature_name: featureName,
    ...extraParams,
  });
}

/**
 * Retrieve UTM parameters stored in sessionStorage
 */
function getStoredUTMParams(): Partial<NobevraStandardEventParams> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem('nobevra_utm_params');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    // Ignore JSON parse errors
  }
  return {};
}
