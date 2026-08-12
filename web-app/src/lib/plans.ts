export interface Plan {
  id: string;
  name: string;
  tier: 'explorer' | 'pulse' | 'elite' | 'payg';
  priceMonthly: number;
  priceYearly: number;
  monthlyPrice?: number;
  yearlyPrice?: number;
  earlyBirdPrice?: number;
  earlyBirdYearlyPrice?: number;
  features: string[];
  flutterwavePlanIdMonthly?: string;
  flutterwavePlanIdYearly?: string;
  flutterwavePlanIdEarlyBird?: string;
  flutterwaveOneTimeAmount?: number; // For PAYG one-time charge
  popular?: boolean;
  tagline?: string;
}

/** Represents the state of the user's PAYG bundles */
export interface PaygBundleState {
  // Credits available to use
  credits: {
    invoiceTemplates: number;
    businessCardTemplates: number;
    qrCodeTemplates: number;
    clientSlots: number;
  };
  // Specific templates that have been permanently unlocked
  unlockedTemplates: {
    invoices: string[];
    businessCards: string[];
    qrCodes: string[];
  };
  purchases: Array<{
    purchasedAt: string;
    transactionId?: string;
  }>;
}

export const PAYG_PRICE_USD = 1.00;
export const PAYG_PRICE_NGN = 1500; // ≈ $1 at current rates — update as needed

export const PLANS: Record<string, Plan> = {
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    tier: 'explorer',
    priceMonthly: 0,
    priceYearly: 0,
    monthlyPrice: 0,
    yearlyPrice: 0,
    tagline: 'For freelancers getting started',
    features: [
      'Up to 50 invoices/month',
      '5 active clients',
      '3 estimates/month',
      '10 invoice templates',
      '100 MB document storage',
      'Payment link generation',
      'Flutterwave payment integration',
      'Expense tracking',
      'Email support',
    ],
  },
  pulse: {
    id: 'pulse',
    name: 'Noble Pulse',
    tier: 'pulse',
    priceMonthly: 9.99,
    priceYearly: 99.00,
    monthlyPrice: 9.99,
    yearlyPrice: 99.00,
    popular: true,
    tagline: 'For growing businesses',
    features: [
      'Everything in Explorer, plus:',
      'Unlimited invoices & clients',
      '180+ premium invoice templates',
      'Advanced Invoice & Client Customization',
      'Recurring invoices & auto-reminders',
      'Client portal & Live Chat',
      'Inventory & product catalog',
      'Flutterwave payment integration',
      'Digital Business Cards (NFC & QR)',
      'Digital Product Passports (DPP)',
      'Financial analytics dashboard',
      '5 AI Voice uses/month',
      '10 Estimates/month',
      'Priority email support',
    ],
    flutterwavePlanIdMonthly: process.env.NEXT_PUBLIC_FLW_PLAN_PRO_MONTHLY,
    flutterwavePlanIdYearly: process.env.NEXT_PUBLIC_FLW_PLAN_PRO_YEARLY,
  },
  elite: {
    id: 'elite',
    name: 'Noble Elite',
    tier: 'elite',
    priceMonthly: 24.99,
    priceYearly: 240.00,
    monthlyPrice: 24.99,
    yearlyPrice: 240.00,
    earlyBirdPrice: 199.99,
    earlyBirdYearlyPrice: 199.99,
    tagline: 'For scaling enterprises',
    features: [
      'Everything in Pulse, plus:',
      'Multi-user team workspace',
      'Unlimited Estimates',
      'Advanced tax & compliance reporting',
      '15 AI Voice + Receipt uses/month',
      'Vendor management',
      'API access & webhooks',
      'Custom domain & White-label',
      'Dedicated account manager',
      'Custom contract & e-signature',
      'Priority 24/7 phone support',
      'Early access to new features',
    ],
    flutterwavePlanIdMonthly: process.env.NEXT_PUBLIC_FLW_PLAN_ELITE_MONTHLY,
    flutterwavePlanIdYearly: process.env.NEXT_PUBLIC_FLW_PLAN_ELITE_YEARLY,
    flutterwavePlanIdEarlyBird: process.env.NEXT_PUBLIC_FLW_PLAN_ELITE_EARLY_BIRD,
  },
};

export const SUBSCRIPTION_PLANS = Object.values(PLANS);

export type PlanTier = 'explorer' | 'pulse' | 'elite' | 'payg';

/** PAYG product — not a subscription, a one-time invoice template unlock */
export const PAYG_PLAN = {
  id: 'payg',
  name: 'Pay-As-You-Go',
  tier: 'payg' as const,
  priceUSD: PAYG_PRICE_USD,
  priceNGN: PAYG_PRICE_NGN,
  tagline: 'Unlock one premium template, one client, one QR card',
  features: [
    '1 premium invoice template (your choice)',
    '1 client slot',
    '1 QR business card (locked to that client)',
    '1 Digital Product Passport (up to 3 images)',
    'Professional PDF download',
    'Please note this plan is only capable to free user who does not have monthly or yearly subscription',
  ],
};

export const FEATURE_MATRIX = [
  {
    category: 'Core Invoicing',
    rows: [
      { feature: 'Invoices / Month',      tooltip: 'Resets on the 1st of each month', explorer: '50', pulse: 'Unlimited', elite: 'Unlimited' },
      { feature: 'Active Clients',         tooltip: 'Total clients in your account',   explorer: '5',  pulse: 'Unlimited', elite: 'Unlimited' },
      { feature: 'Estimates / Quotes',     tooltip: 'Resets monthly',                  explorer: '3',  pulse: '10/mo',     elite: 'Unlimited' },
      { feature: 'Recurring Invoices',     tooltip: 'Auto-send on a schedule',         explorer: false, pulse: true,       elite: true },
      { feature: 'Advanced Invoice Editing', tooltip: 'Versioning + custom fields',   explorer: false, pulse: true,       elite: true },
      { feature: 'Auto Payment Reminders', tooltip: null,                              explorer: false, pulse: true,       elite: true },
    ]
  },
  {
    category: 'Templates & Design',
    rows: [
      { feature: 'Basic Templates',       tooltip: null, explorer: '5',     pulse: 'All', elite: 'All' },
      { feature: 'Premium Templates (180+)', tooltip: null, explorer: false, pulse: true,  elite: true  },
      { feature: 'Remove Watermark',      tooltip: null, explorer: false,   pulse: true,  elite: true  },
      { feature: 'White-Label Branding',  tooltip: 'Custom logo, colors',  explorer: false, pulse: true, elite: true },
      { feature: 'Custom Domain',         tooltip: 'Use your own domain',  explorer: false, pulse: false, elite: true },
    ]
  },
  {
    category: 'CRM & Client Tools',
    rows: [
      { feature: 'Client Portal',         tooltip: null, explorer: false,   pulse: true,  elite: true },
      { feature: 'Client Portal Live Chat', tooltip: null, explorer: false, pulse: true,  elite: true },
      { feature: 'Full CRM Suite',        tooltip: null, explorer: false,   pulse: true,  elite: true },
      { feature: 'Inventory & Products',  tooltip: null, explorer: false,   pulse: true,  elite: true },
      { feature: 'Vendor Management',     tooltip: null, explorer: false,   pulse: false, elite: true },
      { feature: 'Multi-User Team',       tooltip: 'Add teammates',        explorer: false, pulse: false, elite: true },
      { feature: 'Contracts & E-Signature', tooltip: null, explorer: false, pulse: false, elite: true },
    ]
  },
  {
    category: 'Payments & Finance',
    rows: [
      { feature: 'Flutterwave Integration', tooltip: null, explorer: true,   pulse: true,  elite: true },
      { feature: 'Financial Analytics',   tooltip: null, explorer: false,   pulse: true,  elite: true },
      { feature: 'Multi-Currency',        tooltip: null, explorer: false,   pulse: true,  elite: true },
      { feature: 'Advanced Tax Reporting', tooltip: null, explorer: false,  pulse: false, elite: true },
      { feature: 'Expense Tracking',      tooltip: null, explorer: true,    pulse: true,  elite: true },
    ]
  },
  {
    category: 'AI & Automation',
    rows: [
      { feature: 'AI Voice Invoice Gen',  tooltip: 'Monthly usage allowance',  explorer: false, pulse: '5/mo', elite: '15/mo' },
      { feature: 'Receipt Scanning',      tooltip: 'Monthly usage allowance',  explorer: false, pulse: '5/mo', elite: '15/mo' },
      { feature: 'Digital Product Passports', tooltip: null,                   explorer: false, pulse: true,  elite: true },
      { feature: 'NFC & QR Business Cards', tooltip: null,                     explorer: false, pulse: true,  elite: true },
      { feature: 'Autonomous SEO',        tooltip: null, explorer: false,       pulse: false, elite: true },
    ]
  },
  {
    category: 'Platform & API',
    rows: [
      { feature: 'API Access',            tooltip: null, explorer: false,   pulse: false, elite: true },
      { feature: 'Webhooks',              tooltip: null, explorer: false,   pulse: false, elite: true },
      { feature: 'Document Storage',      tooltip: null, explorer: '100 MB', pulse: '1 GB', elite: '5 GB' },
    ]
  },
  {
    category: 'Support',
    rows: [
      { feature: 'Email Support',          tooltip: null, explorer: true,  pulse: true,  elite: true },
      { feature: 'Priority Support',       tooltip: null, explorer: false, pulse: true,  elite: true },
      { feature: 'Dedicated Account Manager', tooltip: null, explorer: false, pulse: false, elite: true },
      { feature: '24/7 Phone Support',     tooltip: null, explorer: false, pulse: false, elite: true },
    ]
  }
];
