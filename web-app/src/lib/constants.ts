import { 
    LayoutDashboard, FileText, Users, Layers, Wallet,
    Settings, Network, BarChart3, CreditCard, Receipt,
    QrCode, Contact, LifeBuoy, ShieldCheck, Zap,
    Building2
} from 'lucide-react';

export const QUOTES = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston S. Churchill" },
    { text: "Excellence is not a destination but a continuous journey.", author: "Brian Tracy" },
    { text: "The way you do one thing is the way you do everything.", author: "NobleInvoice AI" },
    { text: "Productivity is never an accident. It is always the result of excellence.", author: "Paul J. Meyer" },
    { text: "Your focus determines your reality. Control the workflow.", author: "NobleInvoice AI" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
];

export const MENU_GROUPS = [
    {
        label: 'Core Operations',
        items: [
            { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
            { name: 'Invoices & Billing', icon: FileText, href: '/invoices' },
            { name: 'Customers', icon: Users, href: '/clients' },
            { name: 'Products & Services', icon: Layers, href: '/products' },
        ]
    },
    {
        label: 'Financials & Tracking',
        items: [
            { name: 'Expenses Hub', icon: Receipt, href: '/expenses' },
            { name: 'Wallet & Payments', icon: Wallet, href: '/wallet', featureId: 'wallet.payments' },
            { name: 'Growth Reports', icon: BarChart3, href: '/reports' },
        ]
    },
    {
        label: 'Networking & Identity',
        items: [
            { name: 'Professional Identity', icon: Contact, href: '/studio', featureId: 'networking.nfc' },
            { name: 'QR Code Engine', icon: QrCode, href: '/qr-generator' },
            { name: 'Smart Connect', icon: Zap, href: '/networking', featureId: 'networking.nfc' },
            { name: 'Enterprise Scaling', icon: Building2, href: '/enterprise/identity', featureId: 'brand.whitelabel' },
        ]
    },
    {
        label: 'System & Organization',
        items: [
            { name: 'Team Management', icon: ShieldCheck, href: '/settings/team', featureId: 'settings.team' },
            { name: 'Workspace Settings', icon: Settings, href: '/settings/brand' },
            { name: 'Billing & Plans', icon: CreditCard, href: '/upgrade' },
            { name: 'Support', icon: LifeBuoy, href: '/support' },
        ]
    }
];
