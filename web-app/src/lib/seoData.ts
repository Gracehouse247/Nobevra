export interface SEOFeature {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    image: string;
  };
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  socialProof: {
    quote: string;
    author: string;
    company: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface SEOKeyword {
  id?: string;
  keyword: string;
  intent: 'Informational' | 'Transactional' | 'Commercial' | 'Navigational' | 'Local';
  volume: number;
  cpc: number;
  pd: number;
  seo_difficulty: number;
  cluster_parent?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at?: string;
}

export interface SEOArticle {
  id?: string;
  keyword_id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  content_markdown: string;
  featured_image_url?: string;
  status: 'draft' | 'published';
  word_count: number;
  seo_score: number;
  human_score: number;
  schema_markup?: Record<string, any>;
  published_at?: string;
}

export interface RankingsTracker {
  id?: string;
  keyword_id: string;
  keyword?: string;
  google_rank: number;
  serps_snapshot_url?: string;
  tracked_at: string;
}

export interface SEOSettings {
  default_meta_title: string;
  default_meta_description: string;
  og_defaults: Record<string, any>;
  auto_publish: boolean;
  cron_expression: string;
}

export const SEO_FEATURES: Record<string, SEOFeature> = {
  'ai-invoice-generator': {
    slug: 'ai-invoice-generator',
    title: 'Best AI Invoice Generator Free — Create Invoices in Seconds | Nobevra',
    metaDescription: 'The best AI invoice generator free online. Turn notes, PDFs, or voice into professional invoices instantly. Export AI invoice generator PDF. Try free — no card needed.',
    primaryKeyword: 'ai invoice generator',
    hero: {
      headline: 'Stop Typing Invoices. Let AI Do It in Seconds.',
      subheadline: 'The best AI invoice generator free for freelancers, agencies, and growing businesses. Drop a note, a PDF receipt, or type a quick description — and get a polished, tax-compliant invoice ready to send and get paid.',
      ctaText: 'Start Generating Free',
      image: '/images/hero-dashboard-actual.png',
    },
    benefits: [
      {
        title: 'OCR Receipt-to-Invoice Matching',
        description: 'Generic OCR tools read text. Our AI invoice generator pdf engine understands meaning. Drop a crumpled receipt and it distinguishes a tip from a regional tax from a base service fee — with 99.8% extraction accuracy.',
        icon: 'document_scanner'
      },
      {
        title: 'Predictive Cash Flow Modeling',
        description: 'Generating the document is step one. Our AI invoice generator online goes further — it analyzes each client\'s historical payment behavior and flags invoices at risk of being paid late before you even click send.',
        icon: 'monitoring'
      },
      {
        title: 'AI text-to-invoice generation',
        description: 'Line items, taxes, client details, due dates, and your branding — all formatted automatically. AI invoice generator PDF export is ready in seconds.',
        icon: 'auto_awesome'
      }
    ],
    socialProof: [
      {
        quote: "I used to spend my Sunday evenings organizing bills. I switched to Nobevra, set up automated recurring profiles, and bought my weekends back.",
        author: "Sarah T.",
        company: "Design Agency Founder"
      }
    ],
    faqs: [
      {
        question: "Is the AI invoice generator free?",
        answer: "Yes. Nobevra's AI invoice generator free plan lets you create up to 10 invoices per month at zero cost. No credit card needed to start."
      },
      {
        question: "Can I download my invoice as a PDF?",
        answer: "Every invoice made with our AI invoice generator PDF engine is instantly downloadable. Professional layout, branded, and ready to send."
      }
    ]
  },
  'how-to-make-an-invoice-for-free': {
    slug: 'how-to-make-an-invoice-for-free',
    title: 'How to Make an Invoice for Free — Free Invoice Generator Online | Nobevra',
    metaDescription: 'Learn how to make an invoice for free with Nobevra. Create invoice online free PDF, use 180+ templates, and get paid faster with our best free invoice maker.',
    primaryKeyword: 'how to make an invoice for free',
    hero: {
      headline: 'Create Professional Invoices in Seconds',
      subheadline: 'Stop wasting time with Word and Excel. Generate beautiful, client-ready invoices that get you paid 2x faster.',
      ctaText: 'Generate Free Invoice Now',
      image: '/images/features/invoice-generator.png',
    },
    benefits: [
      {
        title: '180+ Premium Templates',
        description: 'Choose from hundreds of professionally designed templates that match your brand identity perfectly.',
        icon: 'Palette'
      },
      {
        title: 'Automated Payment Collection',
        description: 'Integrated with Flutterwave so clients can pay you instantly via Card, Bank Transfer, or USSD.',
        icon: 'CreditCard'
      },
      {
        title: 'Real-time Tracking',
        description: 'Know exactly when your client opens the invoice and when the payment hits your account.',
        icon: 'Eye'
      }
    ],
    socialProof: [
      {
        quote: "Nobevra cut my billing time from 3 hours a week down to 10 minutes. The templates are gorgeous.",
        author: "Sarah J.",
        company: "Creative Agency Director"
      }
    ],
    faqs: [
      {
        question: "Is the invoice generator really free?",
        answer: "Yes! Our Explorer plan allows you to generate up to 10 free invoices per month with basic templates at zero cost."
      },
      {
        question: "Can I add my own logo to the invoice?",
        answer: "Absolutely. You can customize the invoice with your company logo, brand colors, and custom terms."
      },
      {
        question: "How do I get paid?",
        answer: "We integrate seamlessly with Flutterwave, allowing your clients to pay directly from the invoice using their preferred local payment method."
      }
    ]
  },
  'client-portal': {
    slug: 'client-portal',
    title: 'Billing Software Online — White-Label Client Portal | Nobevra',
    metaDescription: 'Powerful billing software online for freelancers and small businesses. Give clients a branded portal to view invoices, track payments, and manage billing history — all free.',
    primaryKeyword: 'billing software online',
    hero: {
      headline: 'A Professional Client Portal That Builds Trust',
      subheadline: 'Provide your clients with a secure, branded dashboard to view their invoices, track project expenses, and make payments 24/7.',
      ctaText: 'Setup Your Portal Free',
      image: '/images/features/client-portal.png',
    },
    benefits: [
      {
        title: '100% White-Labeled',
        description: 'Your logo, your brand colors, and your custom domain (coming soon on Elite plan).',
        icon: 'Crown'
      },
      {
        title: 'Self-Service Billing',
        description: 'Clients can download past invoices and receipts without having to email you.',
        icon: 'Download'
      },
      {
        title: 'Secure Access',
        description: 'Magic-link authentication ensures only authorized clients can view sensitive financial documents.',
        icon: 'Shield'
      }
    ],
    socialProof: [
      {
        quote: "Having a dedicated client portal makes my freelance business look like a Fortune 500 agency.",
        author: "David M.",
        company: "Independent Consultant"
      }
    ],
    faqs: [
      {
        question: "Do clients need to create an account to view their portal?",
        answer: "No, we use secure magic links sent directly to their email, eliminating password fatigue for your clients."
      },
      {
        question: "Can clients pay multiple invoices at once?",
        answer: "Yes, the portal allows clients to select multiple outstanding invoices and settle them in a single transaction."
      }
    ]
  },
  'digital-business-cards': {
    slug: 'digital-business-cards',
    title: 'Free Business Card Creation — Digital NFC & QR Cards | Nobevra',
    metaDescription: 'Free business card creation online with QR codes and NFC technology. Design visiting cards, share your portfolio, and collect payments — all from one AI business card generator.',
    primaryKeyword: 'business card creation free',
    hero: {
      headline: 'The Last Business Card You Will Ever Need',
      subheadline: 'Share your contact details, portfolio links, and instant payment methods with a single tap using our smart digital business cards.',
      ctaText: 'Create Your Digital Card',
      image: '/images/features/digital-card.png',
    },
    benefits: [
      {
        title: 'QR & NFC Ready',
        description: 'Instantly generate a scannable QR code or link it to physical NFC cards for tap-to-share networking.',
        icon: 'Smartphone'
      },
      {
        title: 'Instant Payment Links',
        description: 'Embed your secure Flutterwave payment links directly on your card to collect retainers on the spot.',
        icon: 'Zap'
      },
      {
        title: 'Networking Analytics',
        description: 'Track how many times your card was viewed and which links were clicked the most.',
        icon: 'BarChart3'
      }
    ],
    socialProof: [
      {
        quote: "I closed a deal at a networking event because I was able to share my portfolio and collect a deposit immediately through my digital card.",
        author: "Emmanuel K.",
        company: "Event Photographer"
      }
    ],
    faqs: [
      {
        question: "Do people need an app to scan my card?",
        answer: "No, anyone with a modern smartphone camera can scan your QR code or tap your NFC card without installing any apps."
      },
      {
        question: "Can I update my details later?",
        answer: "Yes, your digital card is dynamic. You can change your phone number or links anytime, and the QR code will remain the same."
      }
    ]
  },
  'crm-engine': {
    slug: 'crm-engine',
    title: 'What is Invoicing Software? — CRM & Client Management | Nobevra',
    metaDescription: 'Discover what invoicing software is and how it transforms client management. Nobevra CRM Engine for small business offers invoicing for freelancers, contractors & agencies.',
    primaryKeyword: 'what is invoicing software',
    hero: {
      headline: 'The Command Center for Client Relationships',
      subheadline: 'Empower your sales and support teams with real-time tracking, unified contact histories, and automated retention loops.',
      ctaText: 'Activate CRM Engine',
      image: '/images/features/crm-engine.png',
    },
    benefits: [
      {
        title: 'Unified Communication Ledger',
        description: 'See every email, meeting note, and invoice sent to a client in a clean, chronological timeline.',
        icon: 'Shield'
      },
      {
        title: 'Automated Lifecycle Reminders',
        description: 'Never let a client go cold. Get smart notifications to reach out when a touchpoint is due.',
        icon: 'Zap'
      },
      {
        title: 'Frictionless Pipeline Funnels',
        description: 'Visualize leads moving from initial contact to proposed agreements and completed payments.',
        icon: 'BarChart3'
      }
    ],
    socialProof: [
      {
        quote: "Nobevra's CRM Engine completely streamlined how we onboard and retain our high-value corporate partners.",
        author: "Marcus T.",
        company: "B2B SaaS Founder"
      }
    ],
    faqs: [
      {
        question: "Can I import existing contacts into the CRM Engine?",
        answer: "Yes, you can easily upload CSV files or sync with external contact lists in a few clicks."
      },
      {
        question: "Does this sync with invoices sent to the client?",
        answer: "Absolutely. The CRM timeline displays all transaction records and payment statuses automatically."
      }
    ]
  },
  'shopify-invoice-generator': {
    slug: 'shopify-invoice-generator',
    title: 'Free Invoice Generator for Shopify | Nobevra',
    metaDescription: 'Stop waiting 14 days for B2B payments. Use the best free invoice generator for Shopify to automate billing and get paid instantly via Apple Pay and Google Pay.',
    primaryKeyword: 'invoice generator shopify',
    hero: {
      headline: 'Best Invoice Generator Shopify',
      subheadline: 'Generate automated, professional invoices that embed direct payment links. Get your B2B clients to pay you in minutes, not weeks.',
      ctaText: 'Start Free Today',
      image: '/images/features/inventory-hub.png',
    },
    benefits: [
      {
        title: 'Custom Shopify Invoice Template',
        description: 'Professional, tax-compliant templates that match your brand perfectly.',
        icon: 'FileText'
      },
      {
        title: 'Instant QR Payments',
        description: 'Clients scan your invoice and pay instantly via Apple Pay, Google Pay, or card.',
        icon: 'CreditCard'
      },
      {
        title: 'Automated Reconciliation',
        description: 'When a payment hits, the invoice is automatically marked as paid in your dashboard.',
        icon: 'Zap'
      }
    ],
    socialProof: [
      {
        quote: "We were manually exporting Shopify orders to spreadsheets to generate wholesale invoices. Switching to Nobevra completely automated the workflow.",
        author: "Ayasha Khan",
        company: "Marketing Director, NobleMart"
      }
    ],
    faqs: [
      {
        question: "Is this a free invoice generator for Shopify?",
        answer: "Yes. Our core invoicing platform is completely free to use. You only pay standard processing fees when a client uses our integrated payment gateway to pay you."
      },
      {
        question: "Do the QR payment links expire?",
        answer: "No. Nobevra creates permanent payment links. The QR code on your invoice remains valid until the specific invoice is settled in full."
      }
    ]
  },
  'best-free-invoice-app': {
    slug: 'best-free-invoice-app',
    title: 'Best Free Invoice App — Global Multi-Currency Settlements | Nobevra',
    metaDescription: 'Looking for the best free invoice app? Nobevra offers instant global settlements, multi-currency payouts, and a simple invoice app free for iPhone and Android.',
    primaryKeyword: 'what is the best free invoice app',
    hero: {
      headline: 'Global Commerce. Local Settlements.',
      subheadline: 'Bridge international borders with instant multi-currency payouts, secure escrow options, and compliant localized banking rails.',
      ctaText: 'Start Settling Globally',
      image: '/images/features/settlements.png',
    },
    benefits: [
      {
        title: 'Interbank Conversion Rates',
        description: 'Exchange foreign client payments into your local currency with minimal spread and zero hidden fees.',
        icon: 'Zap'
      },
      {
        title: 'High-Speed Clearance',
        description: 'Funds cleared globally land in your local bank account within hours, not business days.',
        icon: 'Shield'
      },
      {
        title: 'Compliant Inflow Reports',
        description: 'Every settlement generates clear compliance paperwork to make international banking simple.',
        icon: 'BarChart3'
      }
    ],
    socialProof: [
      {
        quote: "Settling USD invoices into our local currency used to take days. With Nobevra, it takes hours and saves us thousands in fees.",
        author: "Elena R.",
        company: "Agency Finance Lead"
      }
    ],
    faqs: [
      {
        question: "Which currencies are supported?",
        answer: "We support settlements in over 40 global and local currencies, including USD, GBP, EUR, NGN, KES, and GHS."
      },
      {
        question: "How secure is the global transfer?",
        answer: "All settlement rails are fully PCI-compliant, utilizing banking-grade encryption and audited financial routing."
      }
    ]
  },
  'qr-business-cards': {
    slug: 'qr-business-cards',
    title: 'How to Generate a QR Code — Free QR Code Generator | Nobevra',
    metaDescription: 'Learn how to generate a QR code for free. Create scannable QR codes for payments, invoices, and business cards. Works on iPhone & Android — no app needed.',
    primaryKeyword: 'how to generate a qr code',
    hero: {
      headline: 'Scan to Pay. Instant & Frictionless.',
      subheadline: 'Turn any smartphone screen or print asset into a secure payment terminal. Accept cards, bank transfers, and mobile money in one tap.',
      ctaText: 'Generate QR Terminal',
      image: '/images/features/qr-payments.png',
    },
    benefits: [
      {
        title: 'Static & Dynamic Codes',
        description: 'Create static codes for fixed counters or generate unique dynamic codes for specific invoice values.',
        icon: 'Smartphone'
      },
      {
        title: 'Immediate Checkout Loops',
        description: 'Scanning directs clients to a high-speed mobile checkout page optimized for Apple Pay, Cards, and local banks.',
        icon: 'Zap'
      },
      {
        title: 'Real-time Audio Alerting',
        description: 'Get immediate visual and audio confirmations as soon as a client checkout is authorized.',
        icon: 'Eye'
      }
    ],
    socialProof: [
      {
        quote: "Generating dynamic QR codes for my event stand has increased my checkout conversion rate by 35%. No hardware required.",
        author: "Kenji S.",
        company: "Visual Artist & Retailer"
      }
    ],
    faqs: [
      {
        question: "Do clients need to install the Nobevra app to scan?",
        answer: "No, clients simply use their native iOS or Android camera app to scan and execute their payment securely."
      },
      {
        question: "Can I print the QR codes on invoices?",
        answer: "Yes, dynamic QR codes are automatically generated and embedded onto the PDF invoices sent to your customers."
      }
    ]
  },
  'how-to-make-an-invoice-on-my-phone': {
    slug: 'how-to-make-an-invoice-on-my-phone',
    title: 'How to Make an Invoice on My Phone — Smart Expense Manager | Nobevra',
    metaDescription: 'Learn how to make an invoice on your phone for free. Nobevra expense manager works on iPhone, Samsung & Android — create invoices, scan receipts, track expenses.',
    primaryKeyword: 'how to make an invoice on my phone',
    hero: {
      headline: 'Automate Spending, Maximize Deductions',
      subheadline: 'Capture receipts with AI scanning, categorize write-offs automatically, and export tax-ready reports with a single click.',
      ctaText: 'Manage Expenses Free',
      image: '/images/features/expense-manager.png',
    },
    benefits: [
      {
        title: 'AI OCR Receipt Parser',
        description: 'Drop any photo or PDF receipt and let our smart AI extract vendor details, tax amounts, and dates instantly.',
        icon: 'Smartphone'
      },
      {
        title: 'Direct Tax Grouping',
        description: 'Expenses are automatically aligned to standard tax brackets, preparing you for audit seasons ahead of time.',
        icon: 'Shield'
      },
      {
        title: 'Real-time Runway Charts',
        description: 'Track burn rate, profitability, and project expenses alongside invoicing cash flows in one unified dashboard.',
        icon: 'BarChart3'
      }
    ],
    socialProof: [
      {
        quote: "No more shoe boxes full of receipts. I snap photos of bills as they come in, and Nobevra does all the logging.",
        author: "Chidi N.",
        company: "Consulting Engineer"
      }
    ],
    faqs: [
      {
        question: "Can I connect my bank account to auto-sync transactions?",
        answer: "Yes, you can securely link bank feeds to automatically pull, match, and categorize expenses (available on Pro and Elite)."
      },
      {
        question: "Is it possible to attach receipts to invoices for client reimbursement?",
        answer: "Absolutely, you can link specific expenses to an invoice so your clients can view and approve the receipts they are paying for."
      }
    ]
  },
  'team-workspace': {
    slug: 'team-workspace',
    title: 'Best Invoice Maker — Elite Team Workspace & Collaboration | Nobevra',
    metaDescription: 'What is the best invoice maker for small business? Nobevra team workspace offers multi-user collaboration, role-based permissions, and the best invoice app free.',
    primaryKeyword: 'what is the best invoice maker',
    hero: {
      headline: 'Unify Your Team, Scale Your Operations',
      subheadline: 'Assign roles, share templates, and review actions with absolute precision. Designed for modern multi-user enterprises.',
      ctaText: 'Create Team Workspace',
      image: '/images/features/team-workspace.png',
    },
    benefits: [
      {
        title: 'Role-Based Access Control',
        description: 'Define specific scopes for billers, view-only support agents, analysts, and system administrators.',
        icon: 'Crown'
      },
      {
        title: 'Unified Billing Flow',
        description: 'Let multiple draft makers create invoices while retaining final approval power in the primary admin hub.',
        icon: 'Zap'
      },
      {
        title: 'Immutable Audit Ledgers',
        description: 'Every template change, invoice export, and settlement trigger is securely logged for enterprise governance.',
        icon: 'Shield'
      }
    ],
    socialProof: [
      {
        quote: "Managing roles across a 15-person finance team used to be an administrative nightmare. Nobevra solved this overnight.",
        author: "Amina Y.",
        company: "Fintech Controller"
      }
    ],
    faqs: [
      {
        question: "Is there a limit on how many users I can add?",
        answer: "The Team plan supports up to 5 members, while our Elite enterprise tier offers unlimited seats and custom role capabilities."
      },
      {
        question: "Can we restrict member access by client or region?",
        answer: "Yes, administrators can specify visibility permissions so team members only view clients allocated to them."
      }
    ]
  },
  
  'products-services': {
    slug: 'products-services',
    title: 'How to Make a Proforma Invoice | Nobevra',
    metaDescription: 'Learn how to make a proforma invoice online, in Word, or Excel. Use our free proforma invoice template and get paid faster — no spreadsheets needed.',
    primaryKeyword: 'how to make a proforma invoice',
    hero: {
      headline: 'Stop Sending Estimates. Start Sending Proformas.',
      subheadline: 'Learn how to make a proforma invoice online. Replace manual Word and Excel spreadsheets with a professional proforma invoice generator that gets you paid faster.',
      ctaText: 'Create Free Proforma Now',
      image: '/images/features/products-services.png',
    },
    benefits: [
      {
        title: 'One-Click Line Items',
        description: 'Add complex service plans or physical inventory to any invoice template instantly without typing details repeatedly.',
        icon: 'Palette'
      },
      {
        title: 'Smart Tax Standardizing',
        description: 'Assign default vat/sales tax definitions to items so invoice calculations remain perfectly compliant by default.',
        icon: 'Shield'
      },
      {
        title: 'Flexible Billing Rules',
        description: 'Manage flat rates, hourly billables, unit weights, or recurring retainer scopes within a single item ledger.',
        icon: 'Zap'
      }
    ],
    socialProof: [
      {
        quote: "Having all our digital catalog items and consulting packages standardized saves our billing desks hours of manual input.",
        author: "Grace H.",
        company: "Creative Studio Operations Manager"
      }
    ],
    faqs: [
      {
        question: "Can I override item details inside an invoice draft?",
        answer: "Yes, pulling a catalog item adds its preset attributes, which can then be freely customized for specific clients before sending."
      },
      {
        question: "Can I import items via spreadsheet?",
        answer: "Yes, you can upload products and services in bulk using CSV templates."
      }
    ]
  },
  'professional-identity': {
    slug: 'professional-identity',
    title: 'How to Create a Business Card for Free — Professional Branding | Nobevra',
    metaDescription: 'Learn how to create a business card for free online. Use our AI business card generator for visiting card designs, 3D cards, and professional branding — all free.',
    primaryKeyword: 'how to create a business card for free',
    hero: {
      headline: 'Your Brand. Front and Center.',
      subheadline: 'Remove all Nobevra branding. Customize layout schemes, typography, domain routing, and emails to reflect your exact brand identity.',
      ctaText: 'Elevate Your Brand',
      image: '/images/features/branding.png',
    },
    benefits: [
      {
        title: 'Custom Domain Routing',
        description: 'Serve client portals and invoices from your own subdomain like portal.yourdomain.com for consistent trust.',
        icon: 'Crown'
      },
      {
        title: 'Dynamic Style Styling',
        description: 'Tailor color themes, fonts, and invoice layouts using a premium glassmorphic builder or custom styling variables.',
        icon: 'Palette'
      },
      {
        title: 'Branded SMTP Mail',
        description: 'Deliver invoice notifications and receipts directly from your corporate email address to minimize spam filters.',
        icon: 'Shield'
      }
    ],
    socialProof: [
      {
        quote: "Our clients have no idea we use a third-party billing platform. The custom domains and matching colors look extremely polished.",
        author: "Julian G.",
        company: "Premium Consulting Group"
      }
    ],
    faqs: [
      {
        question: "Is SSL included for custom domains?",
        answer: "Yes, we automatically provision and renew secure SSL certificates for any custom domains linked to your portals."
      },
      {
        question: "Can I configure custom email templates?",
        answer: "Absolutely. You can edit email templates to match your company communication voice and styling guidelines."
      }
    ]
  },
  'lead-intelligence': {
    slug: 'lead-intelligence',
    title: 'How to Make a QR Code for a Website — Lead Intelligence | Nobevra',
    metaDescription: 'Learn how to make a QR code for a website for free. Track prospects, score intent, and convert leads with Nobevra free QR code generator and lead intelligence.',
    primaryKeyword: 'how to make a QR code for a website',
    hero: {
      headline: 'Turn Cold Prospects Into Cleared Funds',
      subheadline: 'Map customer paths, score intent, and trigger automated reminders. Lead intelligence that connects marketing to revenue.',
      ctaText: 'Unlock Lead Intelligence',
      image: '/images/features/leads.png',
    },
    benefits: [
      {
        title: 'Intent Interaction Logs',
        description: 'See when prospects interact with proposal links or proposal emails prior to invoice signing.',
        icon: 'Eye'
      },
      {
        title: 'Smart Conversion AI',
        description: 'Score client reliability based on historical invoice clearances and follow-up response frequencies.',
        icon: 'Zap'
      },
      {
        title: 'Automated Reminders',
        description: 'Configure intelligent push alerts or emails as leads move through onboarding phases.',
        icon: 'Shield'
      }
    ],
    socialProof: [
      {
        quote: "Lead Intelligence gave us transparency on client intent, allowing us to focus follow-ups on the highest-probability prospects.",
        author: "Devon C.",
        company: "Global Logistics VP"
      }
    ],
    faqs: [
      {
        question: "How does the intent scoring work?",
        answer: "We analyze multiple data signals, including invoice open counts, link click triggers, and historical transaction clearance speeds."
      },
      {
        question: "Can we connect external CRM pipelines?",
        answer: "Yes, you can integrate with Salesforce, HubSpot, or other endpoints via our advanced Webhooks."
      }
    ]
  },
  'enterprise-scaling': {
    slug: 'enterprise-scaling',
    title: 'Automated Invoicing Software — Enterprise Infrastructure | Nobevra',
    metaDescription: 'Best automated invoicing software for small business and enterprise. Free download, dedicated clusters, 99.99% uptime, and SOC2-compliant invoicing software.',
    primaryKeyword: 'automated invoicing software',
    hero: {
      headline: 'High-Performance Infrastructure for Scale',
      subheadline: 'Handle millions of monthly invoices with 99.99% uptime, dedicated database shards, and custom enterprise compliance structures.',
      ctaText: 'Request Enterprise Demo',
      image: '/images/features/enterprise.png',
    },
    benefits: [
      {
        title: 'Isolated Database Clusters',
        description: 'Host sensitive transaction ledgers on dedicated clusters with strict security rules and zero noise tenants.',
        icon: 'Shield'
      },
      {
        title: 'Unlimited API Throttle',
        description: 'Execute thousands of system transactions per minute without rate limitations, fully synced across regions.',
        icon: 'Zap'
      },
      {
        title: 'SOC2 & HIPAA Compliant',
        description: 'Ensure transactions conform to critical industry governance structures with custom backup policies.',
        icon: 'Crown'
      }
    ],
    socialProof: [
      {
        quote: "Nobevra's enterprise infrastructure comfortably manages our high-volume retail transactions with zero delay.",
        author: "Theresa P.",
        company: "E-Retail Conglomerate VP"
      }
    ],
    faqs: [
      {
        question: "Do you offer SLA agreements?",
        answer: "Yes, our Elite Enterprise contracts include formal Service Level Agreements with guaranteed uptime and 24/7 dedicated support."
      },
      {
        question: "Can we request local database locations?",
        answer: "Yes, we support local hosting distributions to align with local data sovereignty laws (e.g., GDPR, NDPA)."
      }
    ]
  },
  'growth-reports': {
    slug: 'growth-reports',
    title: 'How Do I Make an Invoice? — Data-Driven Growth Reports | Nobevra',
    metaDescription: 'How do I make an invoice? Use Nobevra to create invoices online free, generate PDF templates, analyze cash flow trends, and visualize business growth reports.',
    primaryKeyword: 'how do I make an invoice',
    hero: {
      headline: 'Visualize Cash Flow. Command Growth.',
      subheadline: 'Identify high-value clients, seasonal trends, and payment latency with visually striking, actionable reporting suites.',
      ctaText: 'Generate Growth Report',
      image: '/images/features/reports.png',
    },
    benefits: [
      {
        title: 'Predictive Cash Modeling',
        description: 'Visualize future payment arrivals using intelligent tracking of client billing patterns and seasonal factors.',
        icon: 'BarChart3'
      },
      {
        title: 'Lifetime Value (LTV) Mapping',
        description: 'Understand customer profitability over time and focus client outreach on highly profitable cohorts.',
        icon: 'Crown'
      },
      {
        title: 'Seamless Export Formats',
        description: 'Generate audit-ready spreadsheets, CSVs, or premium slide assets for leadership and board presentations.',
        icon: 'Download'
      }
    ],
    socialProof: [
      {
        quote: "The visual clarity of the Growth Reports has given our leadership team instant clarity on where to allocate sales resources.",
        author: "Alistair G.",
        company: "Tech VC Partner"
      }
    ],
    faqs: [
      {
        question: "Can we schedule reports to be emailed weekly?",
        answer: "Yes, you can schedule automated email summaries to keep stakeholders or accounting teams updated."
      },
      {
        question: "Can I isolate metrics by product group?",
        answer: "Yes, the advanced filters allow you to segment growth metrics by product line, sales manager, or client region."
      }
    ]
  }
};

