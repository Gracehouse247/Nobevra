// Central data store for all Help Center categories and articles.
// This is what powers category pages, article pages, search, and the homepage.

export interface Article {
    slug: string;
    title: string;
    summary: string;
    readTime: string;
    keywords?: string[];
    content: ArticleSection[];
}

export interface ArticleSection {
    heading?: string;
    body: string;
    steps?: string[];
    tip?: string;
    warning?: string;
}

export interface Category {
    slug: string;
    title: string;
    desc: string;
    icon: string; // lucide icon name
    color: string;
    bg: string;
    articleCount: number;
    articles: Article[];
}

export const helpCategories: Category[] = [
    {
        slug: 'getting-started',
        title: 'Getting Started',
        desc: 'Set up your account, brand your invoices, and send your first bill in under 10 minutes.',
        icon: 'Rocket',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50 border-indigo-100',
        articleCount: 6,
        articles: [
            {
                slug: 'create-your-account',
                title: 'How to create your Nobevra account',
                summary: 'A step-by-step guide to signing up and activating your account.',
                readTime: '2 min read',
                keywords: ['invoice software help center support guide', 'AI invoicing software', 'best software to use for invoicing'],
                content: [
                    {
                        heading: 'Overview',
                        body: 'Creating a Nobevra account is free and takes less than 2 minutes. You can sign up with an email address or via Google OAuth.',
                    },
                    {
                        heading: 'Step-by-step',
                        body: 'Follow these steps to create your account:',
                        steps: [
                            'Go to nobevra.noblesworld.com.ng and click "Start Free Today" in the top navigation.',
                            'Enter your full name, email address, and a secure password (minimum 8 characters).',
                            'Alternatively, click "Continue with Google" to skip the email/password step entirely.',
                            'Check your inbox for a verification email and click the confirm link.',
                            'You will be redirected to your dashboard immediately after confirmation.',
                        ],
                        tip: 'If you do not see the verification email within 2 minutes, check your spam folder. You can also request a new verification link from the login page.',
                    },
                    {
                        heading: 'What happens after sign-up?',
                        body: 'You will land on the onboarding wizard which asks for your business name, currency, and tax settings. Completing this takes about 3 minutes and ensures your first invoice is ready to send the moment you finish.',
                    },
                ],
            },
            {
                slug: 'brand-your-invoices',
                title: 'How to brand your invoices with your logo and colors',
                summary: 'Upload your logo, set your brand colors, and choose a professional template.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Your invoice is often the last touchpoint a client has with you before paying. Nobevra lets you fully brand your invoices so they look like they were designed by an agency.',
                    },
                    {
                        heading: 'Upload your logo',
                        body: 'Navigate to Settings in your dashboard:',
                        steps: [
                            'Click your profile icon in the top-right corner and select "Settings".',
                            'Go to the "Brand & Identity" tab.',
                            'Click "Upload Logo" and select a PNG or SVG file. Recommended size: 400x150px.',
                            'The logo will appear on all future invoices immediately.',
                        ],
                    },
                    {
                        heading: 'Set brand colors',
                        body: 'Directly below the logo uploader, you will find the color picker. Enter your exact hex code (e.g., #166FBB) or use the visual color picker. This color is applied to invoice headers, accent lines, and CTA buttons in your client portal.',
                        tip: 'Use your brand\'s primary color for maximum recognition. Your clients will associate the color with your business, not with Nobevra.',
                    },
                    {
                        heading: 'Choose an invoice template',
                        body: 'Go to Invoices > Templates and choose from our gallery of professionally designed templates. Each template is fully editable. Select one and click "Set as Default" to apply it to all new invoices.',
                    },
                ],
            },
            {
                slug: 'send-first-invoice',
                title: 'How to create and send your first invoice',
                summary: 'Build and send a professional invoice in under 3 minutes.',
                readTime: '3 min read',
                keywords: ['how to resolve invoice discrepancies', 'invoice software help center support guide', 'best software to use for invoicing'],
                content: [
                    {
                        heading: 'Overview',
                        body: 'Sending your first invoice is a 3-step process: create a client, add line items, and send.',
                    },
                    {
                        heading: 'Creating the invoice',
                        body: 'Follow these steps:',
                        steps: [
                            'Click "New Invoice" from the dashboard or the Invoices section.',
                            'In the "Client" field, type your client\'s name. If they don\'t exist yet, click "Add New Client" to create their profile.',
                            'Set an Issue Date and Due Date. Common payment terms are Net 7, Net 14, or Net 30.',
                            'Add line items. Each line item has a Description, Quantity, and Rate. The total is calculated automatically.',
                            'Add any applicable tax rate (e.g., 20% VAT or 10% GST) using the tax settings.',
                            'Add an optional note at the bottom (e.g., payment instructions, bank details).',
                        ],
                    },
                    {
                        heading: 'Sending the invoice',
                        body: 'Once the invoice is ready, click "Review & Send". You can preview exactly what your client will see, edit the email subject line and message, then click "Send Invoice". Your client receives a branded email with a secure payment link.',
                        tip: 'Enable "Read Receipts" in your invoice settings to be notified the exact moment your client opens the invoice.',
                    },
                ],
            },
            {
                slug: 'add-team-members',
                title: 'How to add team members and set permissions',
                summary: 'Invite staff, set roles, and control who can create or view invoices.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Nobevra supports team collaboration with role-based access control. You can have unlimited team members on paid plans.',
                    },
                    {
                        heading: 'Inviting a team member',
                        body: 'Follow these steps:',
                        steps: [
                            'Go to Settings > Team & Workspace.',
                            'Click "Invite Member".',
                            'Enter their email address and select their role: Admin, Manager, or Staff.',
                            'Click "Send Invite". They will receive an email to join your workspace.',
                        ],
                    },
                    {
                        heading: 'Understanding roles',
                        body: 'There are three roles available:',
                        steps: [
                            'Admin: Full access to all settings, team management, billing, and financial reports.',
                            'Manager: Can create and send invoices, manage clients, and view reports. Cannot change billing or add team members.',
                            'Staff: Can create draft invoices and log time entries. Cannot send invoices or view financial reports.',
                        ],
                        tip: 'For agencies, we recommend giving Account Managers the "Manager" role and junior creatives the "Staff" role.',
                    },
                ],
            },
            {
                slug: 'setup-payment-methods',
                title: 'How to set up payment methods (Stripe, bank transfer)',
                summary: 'Accept credit cards, ACH, and bank transfers from clients.',
                readTime: '4 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Nobevra supports multiple payment methods. The faster you make it for a client to pay, the faster you get paid. We recommend setting up at least Stripe and a bank transfer option.',
                    },
                    {
                        heading: 'Connecting Stripe',
                        body: 'Stripe handles credit/debit card payments and ACH bank transfers.',
                        steps: [
                            'Go to Settings > Payments.',
                            'Under "Stripe", click "Connect Stripe Account".',
                            'You will be redirected to Stripe\'s onboarding. Complete the identity verification and bank account details.',
                            'Once verified, return to Nobevra. Stripe will appear as "Connected" and your clients can pay immediately.',
                        ],
                        tip: 'Stripe deposits funds to your bank account within 2 business days for card payments and 1-3 business days for ACH.',
                    },
                    {
                        heading: 'Adding bank transfer / wire instructions',
                        body: 'For clients who prefer wire transfers:',
                        steps: [
                            'Go to Settings > Payments > Bank Transfer.',
                            'Enter your bank name, account number, routing/sort code, and any reference instructions.',
                            'Enable "Show on invoices". Your bank details will automatically appear in the invoice footer and in the client portal.',
                        ],
                        warning: 'Never share bank details over chat or email outside of the secure Nobevra invoice. Clients should always pay through the secure portal link.',
                    },
                ],
            },
            {
                slug: 'customize-invoice-numbering',
                title: 'How to customize your invoice numbering format',
                summary: 'Set a custom prefix, starting number, and auto-increment style.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'By default, invoices are numbered INV-001, INV-002, etc. You can change the prefix, separator, and starting number to match your business style.',
                    },
                    {
                        heading: 'Changing your invoice number format',
                        body: 'Go to Settings > Invoices > Numbering. You will see these options:',
                        steps: [
                            'Prefix: Enter a custom text (e.g., your initials "TK-", your company code "NI-", or a year "2025-").',
                            'Starting Number: Set what number the next invoice begins from. Useful if you are migrating from another system.',
                            'Padding: Choose how many digits to pad the number (e.g., 3 digits = 001, 4 digits = 0001).',
                            'Click "Save" to apply. All future invoices will use the new format.',
                        ],
                        tip: 'If you are migrating from another tool, set the starting number higher than your last invoice number to avoid duplicate references.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'billing-and-subscriptions',
        title: 'Billing & Subscriptions',
        desc: 'Manage invoices, automate retainers, track project profitability, and collect payments.',
        icon: 'CreditCard',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-100',
        articleCount: 6,
        articles: [
            {
                slug: 'set-up-recurring-retainer',
                title: 'How to set up an automated monthly retainer',
                summary: 'Configure Nobevra to auto-generate and send retainer invoices on the 1st of every month.',
                readTime: '4 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Retainer billing is one of the most powerful features in Nobevra. You configure a billing schedule once, and the system handles generation, sending, and reminders automatically every month.',
                    },
                    {
                        heading: 'Creating a recurring retainer',
                        body: 'Follow these steps:',
                        steps: [
                            'Open the client profile you want to bill on retainer.',
                            'Click "Add Retainer" or go to Invoices > New Recurring Invoice.',
                            'Set the retainer amount (e.g., $4,500/month).',
                            'Set the billing frequency: Monthly, Quarterly, or Annually.',
                            'Set the billing date (e.g., 1st of every month).',
                            'Set the payment terms (e.g., Due in 7 days from invoice date).',
                            'Click "Activate Retainer".',
                        ],
                        tip: 'You can set the retainer to start from a future date if the project hasn\'t kicked off yet. The first invoice will only generate on the start date.',
                    },
                    {
                        heading: 'What happens automatically',
                        body: 'On each billing date, Nobevra will: (1) Generate the invoice with the correct amounts and dates; (2) Send it to the client via email with a secure payment link; (3) If the client does not pay, send automated reminders based on your configured schedule.',
                    },
                    {
                        heading: 'Pausing or cancelling a retainer',
                        body: 'Go to the client profile > Retainers tab. Click the active retainer and select "Pause" or "Cancel". Pausing stops the next invoice from generating but keeps the retainer profile intact. Cancelling ends the retainer permanently.',
                    },
                ],
            },
            {
                slug: 'add-scope-overages',
                title: 'How to bill for out-of-scope work and project overages',
                summary: 'Log extra billable hours and automatically append them to the next retainer invoice.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Scope creep is the silent margin killer for service businesses. When clients request extra work, you should log it immediately. Nobevra can automatically include logged overages in the next month\'s retainer invoice.',
                    },
                    {
                        heading: 'Logging an overage',
                        body: 'There are two ways to log an overage:',
                        steps: [
                            'Method 1 (Quick): Open the client profile and click "Log Overage". Enter the description, hours, and hourly rate. Click "Save".',
                            'Method 2 (Detailed): Go to Invoices > New Invoice, select the client, and add a line item for the out-of-scope work.',
                        ],
                    },
                    {
                        heading: 'Auto-appending to retainer invoices',
                        body: 'In Settings > Retainers, enable "Auto-append logged overages to retainer invoices". When active, any overages logged during the billing cycle will automatically appear as separate line items on the next monthly invoice.',
                        tip: 'Give the overage a clear description like "Additional revision rounds (3hrs @ $150/hr) — Jan 15, 2025" so clients know exactly what they are being billed for.',
                    },
                ],
            },
            {
                slug: 'payment-reminders',
                title: 'How to set up automated payment reminders',
                summary: 'Configure a dunning schedule so Nobevra follows up on unpaid invoices for you.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Chasing unpaid invoices manually is awkward and time-consuming. Nobevra\'s automated reminder system sends polite, professional follow-ups on a schedule you define, so you never have to be the bad guy.',
                    },
                    {
                        heading: 'Setting up your reminder schedule',
                        body: 'Go to Settings > Invoices > Payment Reminders:',
                        steps: [
                            'Enable "Automated Reminders".',
                            'Add up to 5 reminder triggers. Each trigger has a timing rule (e.g., "3 days before due", "On due date", "5 days after due") and a custom email message.',
                            'Click "Save Schedule".',
                        ],
                        tip: 'A proven sequence for agencies: Reminder 1 at 3 days before due (friendly reminder), Reminder 2 on due date (invoice is due today), Reminder 3 at 5 days late (overdue notice), Reminder 4 at 14 days late (escalation).',
                    },
                    {
                        heading: 'Customizing the reminder email',
                        body: 'Each reminder can have its own subject line and body. Use merge tags to personalize automatically: {{client_name}}, {{invoice_number}}, {{amount_due}}, {{due_date}}. Keep the tone professional but human.',
                    },
                ],
            },
            {
                slug: 'apply-late-fees',
                title: 'How to apply automatic late fees to overdue invoices',
                summary: 'Set a percentage or fixed late fee that applies automatically after the due date.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Late fees incentivize on-time payment and compensate you for the cash flow impact of late payments. Nobevra can apply them automatically.',
                    },
                    {
                        heading: 'Configuring late fees',
                        body: 'Go to Settings > Invoices > Late Fees:',
                        steps: [
                            'Enable "Automatic Late Fees".',
                            'Choose the fee type: Percentage (e.g., 1.5% per month) or Fixed Amount (e.g., $50 flat fee).',
                            'Set the grace period: the number of days after the due date before the fee kicks in (e.g., 5 days).',
                            'Click "Save".',
                        ],
                        warning: 'Late fee laws vary by country and state. Before enabling late fees, verify that your jurisdiction allows them and check the maximum legal rate. Always disclose late fee terms in your contract and on the invoice.',
                    },
                ],
            },
            {
                slug: 'credit-notes-refunds',
                title: 'How to issue a credit note or process a refund',
                summary: 'Reduce an invoice balance or issue a partial/full refund to a client.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'A credit note (also called a credit memo) is a document that reduces the amount a client owes. Use it when you need to adjust a paid or unpaid invoice without deleting it.',
                    },
                    {
                        heading: 'Creating a credit note',
                        body: 'Open the original invoice and click "Create Credit Note":',
                        steps: [
                            'Select which line items to credit, or enter a custom credit amount.',
                            'Add an internal note explaining the reason for the credit.',
                            'Click "Issue Credit Note".',
                            'The client will receive a credit note via email, and the balance on their account will be updated.',
                        ],
                    },
                    {
                        heading: 'Processing a cash refund',
                        body: 'If a payment was made via Stripe and you need to refund cash (not just issue a credit):',
                        steps: [
                            'Open the paid invoice.',
                            'Click "Refund Payment".',
                            'Enter the refund amount (partial or full).',
                            'Click "Process Refund". The refund will reach the client\'s card within 5-10 business days.',
                        ],
                        tip: 'Stripe refunds the transaction fee only if you issue a full refund. Partial refunds do not include a fee reversal.',
                    },
                ],
            },
            {
                slug: 'multi-currency-invoicing',
                title: 'How to invoice clients in multiple currencies',
                summary: 'Set a per-client currency and send invoices in USD, GBP, EUR, NGN, and 100+ more.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Nobevra supports 100+ currencies. You can set a default currency for your account and override it on a per-client basis for international contracts.',
                    },
                    {
                        heading: 'Setting a currency per client',
                        body: 'Follow these steps:',
                        steps: [
                            'Open the client profile.',
                            'Click "Edit Client".',
                            'Under "Billing Settings", change the "Invoice Currency" to the client\'s preferred currency.',
                            'Save. All future invoices for this client will use the selected currency.',
                        ],
                        tip: 'Your reports will automatically convert all foreign-currency invoices to your home currency using live exchange rates, so your total revenue is always displayed accurately.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'client-portals-and-crm',
        title: 'Client Portals & CRM',
        desc: 'Set up white-label client portals, manage client relationships, and track accounts receivable.',
        icon: 'Users',
        color: 'text-violet-600',
        bg: 'bg-violet-50 border-violet-100',
        articleCount: 5,
        articles: [
            {
                slug: 'setup-client-portal',
                title: 'How to set up a white-label client portal',
                summary: 'Give clients a branded portal at your own domain where they can view and pay invoices.',
                readTime: '5 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'The Nobevra client portal lets your clients log in to a fully branded experience hosted on your custom domain. They can view their invoice history, download PDFs, and pay outstanding balances. Nobevra is completely invisible.',
                    },
                    {
                        heading: 'Enabling the client portal',
                        body: 'Go to Settings > Client Portal:',
                        steps: [
                            'Toggle "Enable Client Portal" on.',
                            'Upload your logo (PNG or SVG, recommended 400x150px).',
                            'Set your primary brand color using the hex code picker.',
                            'Write a custom welcome message that clients see when they first log in.',
                        ],
                    },
                    {
                        heading: 'Adding a custom domain',
                        body: 'By default, your portal is at portal.nobevra.noblesworld.com.ng/yourname. To use your own domain:',
                        steps: [
                            'In Settings > Client Portal > Custom Domain, enter your desired subdomain (e.g., billing.youragency.com).',
                            'Log into your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap).',
                            'Create a CNAME record: Name = billing, Value = portal.nobevra.noblesworld.com.ng.',
                            'Return to Nobevra and click "Verify Domain". DNS changes can take up to 48 hours.',
                        ],
                        tip: 'Cloudflare users: ensure the DNS record is set to "DNS only" (grey cloud) during verification, then you can enable proxying afterwards.',
                    },
                    {
                        heading: 'How clients access the portal',
                        body: 'Every invoice email includes a "View Invoice" button that takes the client directly to their portal. On first access, they set a password. On subsequent visits, they log in with email and password to see their full invoice history.',
                    },
                ],
            },
            {
                slug: 'add-manage-clients',
                title: 'How to add and manage clients in the CRM',
                summary: 'Create client profiles, store contacts, and track every engagement.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Every client in Nobevra has a dedicated profile that stores their contact details, billing history, overages, notes, and active retainers. A complete client profile makes billing faster and more accurate.',
                    },
                    {
                        heading: 'Adding a new client',
                        body: 'Go to Clients > Add New Client:',
                        steps: [
                            'Enter the company name and primary contact name.',
                            'Add the billing email address (this is where all invoices will be sent).',
                            'Optional: Add phone number, website, physical address, and tax ID (VAT/EIN).',
                            'Under "Billing Settings", set their preferred currency and default payment terms.',
                            'Click "Save Client".',
                        ],
                    },
                    {
                        heading: 'Viewing client history',
                        body: 'Open any client profile to see a complete timeline: all invoices sent, payments received, outstanding balances, and any logged notes. This gives you a full picture of the relationship without switching between tools.',
                    },
                ],
            },
            {
                slug: 'invoice-read-receipts',
                title: 'How invoice read receipts work',
                summary: 'Get notified the exact moment a client opens your invoice.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Invoice read receipts are one of the most practical features in Nobevra. Instead of guessing whether your client received the invoice, you get a real-time notification the moment they open it.',
                    },
                    {
                        heading: 'Enabling read receipts',
                        body: 'Go to Settings > Invoices > Read Receipts and toggle on "Email Notification on Invoice Open". You will receive an email notification with the client name, invoice number, and the exact time they opened it.',
                        tip: 'Use read receipts to time your follow-up perfectly. If a client opened an invoice 3 days ago and hasn\'t paid, it\'s a great time to send a polite check-in.',
                    },
                ],
            },
            {
                slug: 'accounts-receivable-aging',
                title: 'Understanding the accounts receivable aging report',
                summary: 'Use the AR aging report to identify overdue invoices before they become a problem.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'The AR aging report shows all your outstanding invoices grouped by how overdue they are: Current (not yet due), 1-30 days late, 31-60 days, 61-90 days, and 90+ days. This is the single most important report for managing your agency\'s cash flow.',
                    },
                    {
                        heading: 'Accessing the report',
                        body: 'Go to Reports > Accounts Receivable Aging. You can filter by date range and export to CSV for accounting purposes.',
                    },
                    {
                        heading: 'What to do with the report',
                        body: 'Review your AR aging report weekly:',
                        steps: [
                            'Any invoice in the 1-30 day bucket should get an automated reminder (set up in Settings > Payment Reminders).',
                            'Invoices in the 31-60 day bucket warrant a personal email or call.',
                            'Invoices in the 61+ day bucket may require a credit hold — stop new work until the account is settled.',
                        ],
                        tip: 'The AR aging report is also a critical input for your cash flow forecast. A large "90+ days" bucket is a warning sign that should be addressed before it affects payroll.',
                    },
                ],
            },
            {
                slug: 'client-portal-access',
                title: 'How clients access and pay through the portal',
                summary: 'A guide to the client experience from email notification to payment confirmation.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Understanding the client-side experience helps you support your clients when they have questions. Here is exactly what your clients see.',
                    },
                    {
                        heading: 'The client journey',
                        body: 'Here is the exact sequence a client follows:',
                        steps: [
                            'Client receives a branded email with your logo and colors. The email contains the invoice summary and a "View Invoice" button.',
                            'Clicking "View Invoice" takes them to your white-label portal (at your custom domain if configured).',
                            'First-time clients create a password. Returning clients log in with their email and password.',
                            'Inside the portal, they see the full invoice PDF, all line items, and payment options.',
                            'They select a payment method (card via Stripe, or bank transfer) and click "Pay Now".',
                            'A payment confirmation email is sent to both the client and you.',
                        ],
                    },
                    {
                        heading: 'Payment timeline',
                        body: 'Card payments: Funds arrive in your bank account within 2 business days. ACH bank transfers: 3-5 business days. Wire transfers: Varies by bank, typically 1-3 business days.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'integrations-and-api',
        title: 'Integrations & API',
        desc: 'Connect Nobevra to Stripe, Shopify, WooCommerce, Zapier, and your custom tools.',
        icon: 'Plug',
        color: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-100',
        articleCount: 5,
        articles: [
            {
                slug: 'connect-stripe',
                title: 'How to connect Stripe to your account',
                summary: 'Accept credit cards and ACH payments by connecting your Stripe account.',
                readTime: '4 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Stripe is the recommended payment gateway for Nobevra. It handles credit cards, debit cards, ACH bank transfers, and many local payment methods globally. Connecting takes about 5 minutes.',
                    },
                    {
                        heading: 'Connecting your Stripe account',
                        body: 'Go to Settings > Payments > Stripe:',
                        steps: [
                            'Click "Connect with Stripe".',
                            'You will be redirected to Stripe\'s onboarding flow.',
                            'Create a new Stripe account or log into an existing one.',
                            'Complete Stripe\'s identity verification (government ID + business details).',
                            'Add your bank account for payouts.',
                            'Click "Authorize Access" to return to Nobevra.',
                        ],
                        tip: 'Stripe verification usually takes 2-24 hours. You can still send invoices during this time; payments will be held and released once verification completes.',
                    },
                    {
                        heading: 'Stripe fees',
                        body: 'Stripe charges a processing fee per transaction: 2.9% + $0.30 per card charge in the US, and 1.5% + €0.25 per card charge in Europe. ACH transfers are 0.8% capped at $5.00. These fees are deducted from your payouts by Stripe, not by Nobevra. Nobevra does not take a percentage of your transactions.',
                    },
                ],
            },
            {
                slug: 'connect-shopify',
                title: 'How to connect Shopify and automate order invoicing',
                summary: 'Automatically generate invoices for every new Shopify order.',
                readTime: '4 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'The Shopify integration turns every new order into a professional invoice automatically. This is ideal for B2B wholesale stores that need a proper invoice (not just a Shopify order receipt) for their wholesale buyers.',
                    },
                    {
                        heading: 'Connecting your Shopify store',
                        body: 'Go to Settings > Integrations > Shopify:',
                        steps: [
                            'Enter your Shopify store URL (e.g., yourstore.myshopify.com).',
                            'Click "Connect Shopify". You will be redirected to Shopify to authorize the app.',
                            'Grant the required permissions: Read orders, Read customers.',
                            'Return to Nobevra. Your store is now connected.',
                        ],
                    },
                    {
                        heading: 'What happens for each new order',
                        body: 'When a new order is placed in Shopify, Nobevra will automatically: (1) Create a new client profile (or match to an existing one) using the buyer\'s email; (2) Generate a branded PDF invoice for the order; (3) Send the invoice to the buyer via email with a payment link (for B2B net terms orders) or mark it as paid (for upfront card orders).',
                    },
                ],
            },
            {
                slug: 'connect-woocommerce',
                title: 'How to connect WooCommerce to Nobevra',
                summary: 'Automatically generate professional invoices for WooCommerce orders via the REST API.',
                readTime: '4 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Unlike Shopify, WooCommerce uses an API key method for integration. This gives you a secure, direct connection that works with any WooCommerce store regardless of hosting.',
                    },
                    {
                        heading: 'Generating your WooCommerce API Key',
                        body: 'In your WordPress admin:',
                        steps: [
                            'Go to WooCommerce > Settings > Advanced > REST API.',
                            'Click "Add key".',
                            'Set Description to "Nobevra Integration", User to your admin account, and Permissions to "Read".',
                            'Click "Generate API Key".',
                            'Copy the Consumer Key and Consumer Secret — you will need these in the next step.',
                        ],
                        warning: 'The Consumer Secret is only shown once. Copy and store it securely before leaving the page.',
                    },
                    {
                        heading: 'Connecting in Nobevra',
                        body: 'Go to Settings > Integrations > WooCommerce. Enter your store URL, Consumer Key, and Consumer Secret, then click "Connect". Nobevra will verify the connection and begin syncing new orders automatically.',
                    },
                ],
            },
            {
                slug: 'zapier-integration',
                title: 'How to connect Nobevra to Zapier',
                summary: 'Automate workflows between Nobevra and 7,000+ other apps using Zapier.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Zapier lets you connect Nobevra to thousands of other tools without writing code. Common use cases: auto-create a Nobevra client when a new lead is added in your CRM, or send a Slack message when an invoice is paid.',
                    },
                    {
                        heading: 'Getting your API Key',
                        body: 'Go to Settings > Integrations > API & Zapier. Click "Generate API Key" and copy the key. You will enter this in Zapier when setting up the connection.',
                    },
                    {
                        heading: 'Available Nobevra Zapier triggers and actions',
                        body: 'Triggers (things Nobevra can watch for): Invoice Sent, Invoice Paid, Invoice Overdue, New Client Added. Actions (things Nobevra can do): Create Invoice, Create Client, Add Payment.',
                        tip: 'A popular Zap for agencies: When a new project is created in Asana or Monday.com (Trigger), Create a new client and send a welcome invoice in Nobevra (Action).',
                    },
                ],
            },
            {
                slug: 'api-documentation',
                title: 'Nobevra REST API overview',
                summary: 'Use the Nobevra API to programmatically create invoices, clients, and payments.',
                readTime: '5 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'The Nobevra REST API allows developers to build custom integrations. You can create invoices, manage clients, and query financial data programmatically. All API requests use standard HTTP methods and return JSON.',
                    },
                    {
                        heading: 'Authentication',
                        body: 'All API requests must include your API key in the Authorization header:',
                        steps: [
                            'Get your API key from Settings > Integrations > API & Zapier.',
                            'Include the key in every request: Authorization: Bearer YOUR_API_KEY',
                            'All requests must use HTTPS. HTTP requests will be rejected.',
                        ],
                    },
                    {
                        heading: 'Key endpoints',
                        body: 'The most commonly used endpoints are:',
                        steps: [
                            'GET /api/v1/invoices — List all invoices with optional filters.',
                            'POST /api/v1/invoices — Create a new invoice.',
                            'GET /api/v1/clients — List all clients.',
                            'POST /api/v1/clients — Create a new client.',
                            'GET /api/v1/payments — List all recorded payments.',
                        ],
                        tip: 'The full API reference with request/response examples is available at nobevra.noblesworld.com.ng/api-docs.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'account-settings',
        title: 'Account Settings',
        desc: 'Manage your subscription, security, team members, and notification preferences.',
        icon: 'Settings',
        color: 'text-slate-600',
        bg: 'bg-slate-100 border-slate-200',
        articleCount: 5,
        articles: [
            {
                slug: 'upgrade-downgrade-plan',
                title: 'How to upgrade, downgrade, or cancel your subscription',
                summary: 'Change your Nobevra plan or cancel at any time.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Upgrading your plan',
                        body: 'Go to Settings > Billing & Subscription > Change Plan:',
                        steps: [
                            'Select the plan you want to upgrade to.',
                            'Review the price difference — you are charged the prorated difference immediately.',
                            'Enter or confirm your payment method.',
                            'Click "Confirm Upgrade". New features are available instantly.',
                        ],
                    },
                    {
                        heading: 'Downgrading your plan',
                        body: 'Downgrading takes effect at the end of your current billing period. You will retain access to your current plan\'s features until then. If your data (e.g., number of clients) exceeds the lower plan\'s limits, you will be prompted to reduce it before the downgrade takes effect.',
                    },
                    {
                        heading: 'Cancelling your subscription',
                        body: 'Go to Settings > Billing & Subscription > Cancel Plan. Your data is retained for 90 days after cancellation. During this period, you can re-subscribe and regain full access. After 90 days, your data is permanently deleted.',
                        warning: 'Cancellation takes effect immediately for monthly plans. There are no refunds for unused days. Annual plan cancellations are non-refundable.',
                    },
                ],
            },
            {
                slug: 'change-password-2fa',
                title: 'How to change your password and enable two-factor authentication',
                summary: 'Secure your account with a strong password and 2FA.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Changing your password',
                        body: 'Go to Settings > Security > Change Password:',
                        steps: [
                            'Enter your current password to verify identity.',
                            'Enter your new password (minimum 12 characters, must include a number and a symbol).',
                            'Confirm the new password.',
                            'Click "Update Password".',
                        ],
                    },
                    {
                        heading: 'Enabling two-factor authentication (2FA)',
                        body: 'We strongly recommend enabling 2FA. Go to Settings > Security > Two-Factor Authentication:',
                        steps: [
                            'Click "Enable 2FA".',
                            'Download an authenticator app on your phone (Google Authenticator, Authy, or 1Password).',
                            'Scan the QR code shown on screen with your authenticator app.',
                            'Enter the 6-digit code from your app to verify.',
                            'Store the backup codes in a safe place. These allow you to log in if you lose your phone.',
                        ],
                        tip: 'If you are on a team plan, consider requiring 2FA for all team members from Settings > Team & Workspace > Security Policy.',
                    },
                ],
            },
            {
                slug: 'update-business-details',
                title: 'How to update your business name, address, and tax ID',
                summary: 'Update the legal details that appear on your invoices.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Your business name, address, and tax ID appear on every invoice you send. Keeping them accurate is essential for professional credibility and tax compliance.',
                    },
                    {
                        heading: 'Updating your details',
                        body: 'Go to Settings > Business Profile:',
                        steps: [
                            'Edit your Legal Business Name (as it appears on official documents).',
                            'Update your business address (this appears in the invoice header).',
                            'Enter your Tax ID (VAT number, EIN, or ABN depending on your country).',
                            'Click "Save Changes". All future invoices will display the updated information.',
                        ],
                        warning: 'Changing your business name does not retroactively update previously sent invoices. If a correction is needed on a past invoice, you will need to void it and reissue.',
                    },
                ],
            },
            {
                slug: 'notification-preferences',
                title: 'How to manage email notification preferences',
                summary: 'Choose which events trigger email notifications and which ones you want to silence.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Nobevra can notify you about a range of events: invoice opens, payments received, failed payments, new client sign-ups to the portal, and team activity. You control exactly which ones you receive.',
                    },
                    {
                        heading: 'Managing notifications',
                        body: 'Go to Settings > Notifications:',
                        steps: [
                            'Toggle on or off each notification type.',
                            'For payment notifications, you can choose to receive them instantly or in a daily digest.',
                            'Click "Save Preferences".',
                        ],
                        tip: 'At minimum, we recommend keeping "Invoice Paid" and "Invoice Overdue" notifications enabled so you are always aware of your cash flow status.',
                    },
                ],
            },
            {
                slug: 'export-your-data',
                title: 'How to export your invoice and payment data',
                summary: 'Download your financial data as CSV or PDF for accounting or tax purposes.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'You can export all your invoices, payments, and client data at any time. This is useful for annual tax preparation, sharing data with your accountant, or migrating to another system.',
                    },
                    {
                        heading: 'Exporting your data',
                        body: 'Go to Reports > Export Data:',
                        steps: [
                            'Select the data type: Invoices, Payments, Clients, or All.',
                            'Set a date range.',
                            'Choose the format: CSV (for spreadsheets/accounting software) or PDF (for records).',
                            'Click "Export". The file will be emailed to your account email within a few minutes.',
                        ],
                        tip: 'Most accountants prefer the CSV format as it imports directly into QuickBooks, Xero, and other accounting tools.',
                    },
                ],
            },
        ],
    },
    {
        slug: 'templates-and-customization',
        title: 'Templates & Customization',
        desc: 'Design beautiful invoice templates that match your brand and impress clients.',
        icon: 'FileText',
        color: 'text-rose-600',
        bg: 'bg-rose-50 border-rose-100',
        articleCount: 4,
        articles: [
            {
                slug: 'choose-invoice-template',
                title: 'How to choose and customize an invoice template',
                summary: 'Browse the template gallery and set a default for all new invoices.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Nobevra offers a library of professionally designed invoice templates suited to different industries: clean modern designs for tech/SaaS, warm creative layouts for design agencies, and formal structured templates for legal/finance firms.',
                    },
                    {
                        heading: 'Browsing and selecting a template',
                        body: 'Go to Invoices > Templates:',
                        steps: [
                            'Browse the template gallery. Each template shows a live preview with your brand colors and logo applied.',
                            'Click any template to see a full-size preview.',
                            'Click "Use This Template" to apply it to the current invoice, or "Set as Default" to use it for all future invoices.',
                        ],
                    },
                    {
                        heading: 'Customizing the template',
                        body: 'After selecting a template, click "Customize" to access the template editor:',
                        steps: [
                            'Drag and drop sections to reorder them (e.g., move the payment terms block to the top).',
                            'Show/hide optional sections: QR code, bank details, digital signature, notes field.',
                            'Adjust font sizes and spacing using the sidebar controls.',
                        ],
                    },
                ],
            },
            {
                slug: 'add-digital-signature',
                title: 'How to add a digital signature to invoices and proposals',
                summary: 'Request a legally binding e-signature from clients on invoices or estimates.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'The digital signature feature allows clients to sign invoices and proposals directly through the client portal. This is particularly useful for proposals, project agreements, and large-value invoices where you want documented client approval.',
                    },
                    {
                        heading: 'Enabling signatures on an invoice',
                        body: 'When creating or editing an invoice:',
                        steps: [
                            'Scroll to the bottom of the invoice editor.',
                            'Toggle on "Require Client Signature".',
                            'Add an optional signature instruction (e.g., "By signing, you approve the project scope and payment terms.").',
                            'Send the invoice. The client will see a signature pad in the portal before they can pay.',
                        ],
                        tip: 'Signed invoices are stored as a permanent record. Go to any invoice and click "View Signature" to see the signed PDF with timestamp and IP address.',
                    },
                ],
            },
            {
                slug: 'add-qr-code-payment',
                title: 'How to add a QR code payment to your invoices',
                summary: 'Let clients scan a QR code on a printed invoice to pay instantly from their phone.',
                readTime: '2 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'Adding a QR code to printed or PDF invoices makes payment frictionless for clients who receive physical copies. Scanning the code takes them directly to the secure payment page.',
                    },
                    {
                        heading: 'Enabling QR codes',
                        body: 'Go to Settings > Invoices > QR Code Payments and toggle on "Add QR Code to Invoices". A unique QR code pointing to the invoice payment page will be automatically embedded in all future invoices.',
                        tip: 'QR codes are especially useful for contractors and field service businesses who hand over paper invoices on-site. Clients can pay before you even leave.',
                    },
                ],
            },
            {
                slug: 'create-invoice-estimate',
                title: 'How to create an estimate or quote',
                summary: 'Send a professional estimate and convert it to an invoice when approved.',
                readTime: '3 min read',
                content: [
                    {
                        heading: 'Overview',
                        body: 'An estimate (also called a quote or proposal) lets clients approve the scope and cost before work begins. When approved, you can convert it to an invoice with one click — no re-entering data.',
                    },
                    {
                        heading: 'Creating an estimate',
                        body: 'Go to Estimates > New Estimate. The process is identical to creating an invoice, with two key differences:',
                        steps: [
                            'The document is labeled "Estimate" or "Quote" instead of "Invoice".',
                            'It has an "Expiry Date" field instead of a due date.',
                        ],
                    },
                    {
                        heading: 'Getting approval and converting to invoice',
                        body: 'Send the estimate to your client via the portal. The client can review it and click "Approve" directly in their portal. You receive an approval notification. To convert to invoice:',
                        steps: [
                            'Open the approved estimate.',
                            'Click "Convert to Invoice".',
                            'Review and set the invoice due date.',
                            'Click "Send Invoice".',
                        ],
                        tip: 'All line items, amounts, and client details are carried over automatically. This eliminates double data-entry and invoice errors.',
                    },
                ],
            },
        ],
    },
];

// Flat list of all articles for search
export const allArticles = helpCategories.flatMap(cat =>
    cat.articles.map(article => ({
        ...article,
        categorySlug: cat.slug,
        categoryTitle: cat.title,
    }))
);
