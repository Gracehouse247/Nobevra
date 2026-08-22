
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/lib/seoData.ts");
let content = fs.readFileSync(filePath, "utf-8");

const newFeatures = `
  "crm-engine": {
    slug: "crm-engine",
    title: "Client CRM Engine | Built for High-Performance Service Businesses",
    metaDescription: "Stop losing track of client communication. Manage clients, track historical revenue, and accelerate your cash flow with a focused CRM engine.",
    primaryKeyword: "client crm software",
    hero: {
      headline: "Know Exactly Who Pays On Time",
      subheadline: "A CRM built entirely around your revenue. Stop digging through emails—see every client interaction, outstanding balance, and project history in one command center.",
      ctaText: "Start Managing Clients",
      image: "/images/features/crm.png",
    },
    benefits: [
      {
        title: "Revenue-Focused Insights",
        description: "See lifetime value, average time to pay, and outstanding balances for every client instantly.",
        icon: "BarChart3"
      },
      {
        title: "Automated Communication",
        description: "Set it and forget it. Automated payment reminders mean you never have to chase invoices manually again.",
        icon: "Zap"
      },
      {
        title: "Centralized History",
        description: "Every invoice, estimate, and receipt tied to a client profile for rapid auditing and retrieval.",
        icon: "Shield"
      }
    ],
    socialProof: [
      {
        quote: "I used to spend 5 hours a week just figuring out who owed me what. The CRM engine organizes it automatically.",
        author: "Marcus T.",
        company: "Digital Agency Founder"
      }
    ],
    faqs: [
      {
        question: "Can I import my existing clients?",
        answer: "Yes. You can bulk import client data via CSV or sync directly from Stripe."
      },
      {
        question: "Does it track email opens?",
        answer: "Our system logs exactly when a client views your invoice and when they initiate payment."
      }
    ]
  },
  "inventory-hub": {
    slug: "inventory-hub",
    title: "Inventory Management Software | Track Stock & Scale Fast",
    metaDescription: "Control your stock levels in real-time. Automated low-stock alerts, fast product importing, and instant syncing with your invoices.",
    primaryKeyword: "inventory management software",
    hero: {
      headline: "Never Sell What You Don't Have",
      subheadline: "Real-time inventory tracking that syncs directly with your invoices. Prevent stockouts and automate your reordering process.",
      ctaText: "Organize Inventory",
      image: "/images/features/inventory.png",
    },
    benefits: [
      {
        title: "Automated Deductions",
        description: "Every time an invoice is paid, inventory levels update automatically. No manual reconciliation.",
        icon: "Zap"
      },
      {
        title: "Low Stock Alerts",
        description: "Get notified before you run out of your best-selling items so you never miss a sale.",
        icon: "Eye"
      },
      {
        title: "Profit Margin Tracking",
        description: "Input unit costs to instantly see your exact profit margins on every single invoice.",
        icon: "BarChart3"
      }
    ],
    socialProof: [
      {
        quote: "The low stock alerts have saved us from stockouts during our busiest season. It just works.",
        author: "Elena R.",
        company: "E-commerce Retailer"
      }
    ],
    faqs: [
      {
        question: "Does it handle product variants?",
        answer: "Yes, you can track different sizes, colors, and SKUs under a single master product."
      },
      {
        question: "Can I hide inventory levels from clients?",
        answer: "Your clients only see the item name and price. Stock levels are strictly internal."
      }
    ]
  },
  "settlements": {
    slug: "settlements",
    title: "Global Settlements & Payments | Get Paid Across Borders",
    metaDescription: "Accept credit cards, bank transfers, and mobile money globally. Faster settlements and lower fees designed for modern businesses.",
    primaryKeyword: "global business payments",
    hero: {
      headline: "Get Paid Faster. Anywhere on Earth.",
      subheadline: "Remove friction from your checkout. Accept international cards, local bank transfers, and USSD directly on your invoices.",
      ctaText: "Setup Global Payments",
      image: "/images/features/settlements.png",
    },
    benefits: [
      {
        title: "Multi-Currency Support",
        description: "Bill clients in USD, GBP, or EUR while settling in your local currency. We handle the conversion math.",
        icon: "Globe"
      },
      {
        title: "Instant Reconciliation",
        description: "When an invoice is paid, it automatically marks itself as Paid in your dashboard. Zero manual data entry.",
        icon: "Zap"
      },
      {
        title: "Bank-Grade Security",
        description: "PCI-DSS compliant infrastructure ensures your funds and your clients' data remain strictly protected.",
        icon: "Shield"
      }
    ],
    socialProof: [
      {
        quote: "Switching to Nobevra cut our international payment delays from weeks to minutes.",
        author: "James W.",
        company: "Software Exporter"
      }
    ],
    faqs: [
      {
        question: "How long do settlements take?",
        answer: "Most local payments settle within 24 hours. International card payments typically settle in T+2 to T+5 days."
      },
      {
        question: "Are there hidden currency fees?",
        answer: "No. You see the exact exchange rate and settlement amount before the transaction processes."
      }
    ]
  },
  "expense-manager": {
    slug: "expense-manager",
    title: "Business Expense Manager | Track Spending & Maximize Deductions",
    metaDescription: "Automate your expense tracking. Upload receipts, categorize spending, and generate ready-to-file tax reports.",
    primaryKeyword: "business expense manager",
    hero: {
      headline: "Stop Losing Money to Untracked Expenses",
      subheadline: "Every lost receipt is lost revenue. Capture expenses instantly, categorize them automatically, and simplify your tax season.",
      ctaText: "Track Your Expenses",
      image: "/images/features/expenses.png",
    },
    benefits: [
      {
        title: "Smart Categorization",
        description: "Automatically group expenses by tax category so you know exactly where your capital is flowing.",
        icon: "Palette"
      },
      {
        title: "Receipt Vault",
        description: "Upload photos of physical receipts. We store them securely in the cloud so you survive any audit.",
        icon: "Shield"
      },
      {
        title: "Cash Flow Reality",
        description: "Compare your expenses directly against your invoice revenue for a true picture of your profit margins.",
        icon: "BarChart3"
      }
    ],
    socialProof: [
      {
        quote: "Tax season used to be a nightmare of shoebox receipts. Now I just hand my accountant the Nobevra expense export.",
        author: "Linda K.",
        company: "Freelance Designer"
      }
    ],
    faqs: [
      {
        question: "Can I export my expenses for my accountant?",
        answer: "Yes, generate instant CSV or PDF exports filtered by date, category, or project."
      },
      {
        question: "Does it support multiple currencies for travel?",
        answer: "Yes, you can log expenses in the local currency and we convert it back to your base currency."
      }
    ]
  },
  "team-workspace": {
    slug: "team-workspace",
    title: "Team Workspace | Multi-User Collaboration for Agencies",
    metaDescription: "Scale your operations with team workspaces. Assign roles, restrict permissions, and collaborate on client accounts securely.",
    primaryKeyword: "team invoicing software",
    hero: {
      headline: "Scale Your Operations Without Chaos",
      subheadline: "Bring your accountant, sales team, and managers into one workspace. Granular permissions mean they only see what you allow.",
      ctaText: "Upgrade to Elite",
      image: "/images/features/team.png",
    },
    benefits: [
      {
        title: "Role-Based Access",
        description: "Give accountants read-only access to financials while letting sales reps create estimates without seeing total revenue.",
        icon: "Shield"
      },
      {
        title: "Audit Trails",
        description: "Know exactly who created, edited, or sent an invoice with comprehensive activity logs.",
        icon: "Eye"
      },
      {
        title: "Unified Billing",
        description: "Manage your entire team under one simple Elite subscription instead of paying per-seat software licenses.",
        icon: "CreditCard"
      }
    ],
    socialProof: [
      {
        quote: "Adding my CPA to the workspace means they grab the reports they need without bothering me. Huge time saver.",
        author: "Robert F.",
        company: "Construction Firm"
      }
    ],
    faqs: [
      {
        question: "How many team members can I add?",
        answer: "The Elite plan supports unlimited team members to accommodate your business scale."
      },
      {
        question: "Can team members change payment settings?",
        answer: "Only users assigned the Admin role can modify bank accounts or payment gateways."
      }
    ]
  },
  "ai-voice-assistant": {
    slug: "ai-voice-assistant",
    title: "AI Voice Assistant | Voice-Controlled Business Operations",
    metaDescription: "Manage your invoices and check revenue using just your voice. The Noble AI Assistant acts as your autonomous financial co-pilot.",
    primaryKeyword: "ai voice invoicing",
    hero: {
      headline: "Command Your Business With Your Voice",
      subheadline: "Driving? Walking? Just speak. Ask Noble AI to check outstanding balances, draft an invoice, or summarize your monthly revenue.",
      ctaText: "Meet Your AI Assistant",
      image: "/images/features/voice.png",
    },
    benefits: [
      {
        title: "Hands-Free Operations",
        description: "Dictate invoice line items or log expenses purely through voice commands.",
        icon: "Smartphone"
      },
      {
        title: "Intelligent Summaries",
        description: "Ask 'How much did we make last week?' and get an instant, data-backed verbal report.",
        icon: "Zap"
      },
      {
        title: "Contextual Awareness",
        description: "The AI understands your business history, learning your frequent clients and recurring items.",
        icon: "Crown"
      }
    ],
    socialProof: [
      {
        quote: "I draft invoices while stuck in traffic using the Voice Assistant. It feels like having a real executive assistant.",
        author: "Michael P.",
        company: "Field Service Contractor"
      }
    ],
    faqs: [
      {
        question: "Does it work on mobile?",
        answer: "Yes, the AI Voice Assistant is fully optimized for mobile devices and progressive web apps."
      },
      {
        question: "Is my voice data stored?",
        answer: "Voice commands are processed in real-time and immediately discarded. We do not store raw audio files."
      }
    ]
  },
  "products-services": {
    slug: "products-services",
    title: "Products & Services Catalog | Standardize Your Billing",
    metaDescription: "Stop retyping line items. Build a reusable catalog of your products and services for lightning-fast invoice creation.",
    primaryKeyword: "invoice line item catalog",
    hero: {
      headline: "Bill Faster. Erase Errors.",
      subheadline: "Store your standard services, physical products, and recurring retainers in a centralized catalog. Add them to invoices in one click.",
      ctaText: "Build Your Catalog",
      image: "/images/features/products.png",
    },
    benefits: [
      {
        title: "One-Click Billing",
        description: "Select items from your catalog to instantly populate prices, descriptions, and tax rates on the invoice.",
        icon: "Zap"
      },
      {
        title: "Consistent Pricing",
        description: "Ensure your team always charges the correct, up-to-date rates for your core services.",
        icon: "Shield"
      },
      {
        title: "Sales Analytics",
        description: "See exactly which services generate the most revenue and optimize your offerings based on hard data.",
        icon: "BarChart3"
      }
    ],
    socialProof: [
      {
        quote: "Having all our packages pre-configured means creating a complex proposal now takes 30 seconds instead of 10 minutes.",
        author: "Sarah L.",
        company: "Marketing Consultant"
      }
    ],
    faqs: [
      {
        question: "Can I override a catalog price on an invoice?",
        answer: "Yes, you can adjust the price or description on a specific invoice without altering the master catalog."
      },
      {
        question: "Does this handle different tax rates?",
        answer: "You can assign default tax profiles to individual products so taxes apply automatically."
      }
    ]
  },
  "professional-identity": {
    slug: "professional-identity",
    title: "Professional Brand Identity | Premium Invoice Customization",
    metaDescription: "Elevate your brand with highly customizable invoice templates, custom color palettes, and bespoke branding settings.",
    primaryKeyword: "custom invoice branding",
    hero: {
      headline: "Look Like a Fortune 500 Company",
      subheadline: "Your invoice is often the final touchpoint with a client. Make it stunning. Customize every pixel to match your brand identity.",
      ctaText: "Design Your Brand",
      image: "/images/features/brand.png",
    },
    benefits: [
      {
        title: "Custom Brand Kits",
        description: "Upload your logo, set your hex codes, and define your typography so every document feels uniquely yours.",
        icon: "Palette"
      },
      {
        title: "Premium Templates",
        description: "Move away from boring spreadsheets. Our templates are crafted by top-tier designers for maximum visual impact.",
        icon: "Crown"
      },
      {
        title: "White-Label Delivery",
        description: "Send invoices from your own custom domain, removing our branding entirely (available on Elite).",
        icon: "Eye"
      }
    ],
    socialProof: [
      {
        quote: "Clients constantly compliment our invoices. It elevates our perceived value before we even start the project.",
        author: "David O.",
        company: "Design Studio"
      }
    ],
    faqs: [
      {
        question: "Can I upload custom fonts?",
        answer: "You can choose from a curated selection of premium Google Fonts designed for maximum readability on digital documents."
      },
      {
        question: "Does the branding apply to the Client Portal?",
        answer: "Yes, your brand kit automatically styles the secure Client Portal where clients view and pay."
      }
    ]
  },
  "lead-intelligence": {
    slug: "lead-intelligence",
    title: "Lead Intelligence | Convert Prospects to Paying Clients",
    metaDescription: "Track leads, monitor estimate views, and close deals faster with our integrated sales pipeline and lead intelligence tools.",
    primaryKeyword: "sales lead tracking",
    hero: {
      headline: "Turn Prospects Into Paid Invoices",
      subheadline: "Stop losing leads in your inbox. Track potential deals, monitor when prospects view your estimates, and know exactly when to follow up.",
      ctaText: "Capture More Leads",
      image: "/images/features/leads.png",
    },
    benefits: [
      {
        title: "Estimate Tracking",
        description: "Get a real-time notification the exact second a potential client opens your proposal.",
        icon: "Eye"
      },
      {
        title: "Pipeline Visualization",
        description: "See your entire sales pipeline at a glance to forecast upcoming revenue.",
        icon: "BarChart3"
      },
      {
        title: "Smart Follow-ups",
        description: "Automated reminders ensure you never forget to follow up on a high-value proposal.",
        icon: "Zap"
      }
    ],
    socialProof: [
      {
        quote: "Knowing exactly when a client is looking at my estimate allows me to call them while I have their full attention. It feels like magic.",
        author: "Thomas H.",
        company: "B2B Sales Agent"
      }
    ],
    faqs: [
      {
        question: "Can clients accept estimates online?",
        answer: "Yes, clients can digitally sign and approve estimates, which automatically converts them into payable invoices."
      },
      {
        question: "Does it track cold leads?",
        answer: "You can manually add leads or connect your website form via API to automatically populate your CRM."
      }
    ]
  },
  "enterprise-scaling": {
    slug: "enterprise-scaling",
    title: "Enterprise Scaling | High-Volume Billing Infrastructure",
    metaDescription: "API access, custom integrations, dedicated support, and high-volume processing designed for companies processing $1M+ annually.",
    primaryKeyword: "enterprise billing software",
    hero: {
      headline: "Infrastructure That Scales With Your Revenue",
      subheadline: "For high-growth companies that demand reliability. Get API access, massive volume limits, and priority engineering support.",
      ctaText: "Explore Enterprise",
      image: "/images/features/enterprise.png",
    },
    benefits: [
      {
        title: "Developer API",
        description: "Integrate Nobevra directly into your custom SaaS application or internal ERP systems.",
        icon: "Zap"
      },
      {
        title: "High-Volume Processing",
        description: "Generate and dispatch tens of thousands of invoices simultaneously without rate limits.",
        icon: "BarChart3"
      },
      {
        title: "Priority Node Support",
        description: "Skip the queue. Get direct access to our engineering team for technical integration and emergency support.",
        icon: "Shield"
      }
    ],
    socialProof: [
      {
        quote: "We needed a billing engine that could handle 10,000 monthly transactions without breaking. Nobevra delivered.",
        author: "Amanda S.",
        company: "SaaS Platform CTO"
      }
    ],
    faqs: [
      {
        question: "Do you offer SLA guarantees?",
        answer: "Yes, Enterprise customers receive a 99.99% uptime SLA and dedicated account management."
      },
      {
        question: "Can you build custom features for us?",
        answer: "Our enterprise team can scope and develop custom integrations specific to your business workflow."
      }
    ]
  },
  "growth-reports": {
    slug: "growth-reports",
    title: "Growth Reports & Analytics | Data-Driven Financial Decisions",
    metaDescription: "Move beyond basic accounting. Get deep visual insights into your revenue growth, client acquisition, and profit margins.",
    primaryKeyword: "business financial analytics",
    hero: {
      headline: "Stop Guessing. Start Scaling.",
      subheadline: "Turn raw financial data into clear, actionable visual reports. Know your most profitable services and identify revenue leaks instantly.",
      ctaText: "View Your Analytics",
      image: "/images/features/analytics.png",
    },
    benefits: [
      {
        title: "Revenue Forecasting",
        description: "Predict next month's cash flow based on historical payment patterns and upcoming recurring invoices.",
        icon: "BarChart3"
      },
      {
        title: "Client Value Analysis",
        description: "Identify your top 20% most profitable clients so you know exactly where to focus your attention.",
        icon: "Crown"
      },
      {
        title: "Tax-Ready Exports",
        description: "Generate clean P&L statements and category breakdowns to hand directly to your accountant.",
        icon: "Download"
      }
    ],
    socialProof: [
      {
        quote: "The growth reports showed me that a service I thought was profitable was actually draining my resources. I adjusted my pricing the next day.",
        author: "Jessica B.",
        company: "Agency Owner"
      }
    ],
    faqs: [
      {
        question: "Can I export these charts?",
        answer: "Yes, you can export reports as PDFs for board meetings or CSVs for deep spreadsheet analysis."
      },
      {
        question: "Are the reports real-time?",
        answer: "Yes, the dashboard updates the millisecond an invoice is paid or an expense is logged."
      }
    ]
  }
};
`;

if (content.trim().endsWith("};")) {
  content = content.replace(/};$/, "," + newFeatures + "};");
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("Successfully appended new features to seoData.ts");
} else {
  console.error("Could not find ending brace in seoData.ts");
}

