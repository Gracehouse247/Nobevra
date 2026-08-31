import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Business Expense Tracker & Management Software | Nobevra',
    description: 'Automate expense tracking with Nobevra. AI receipt scanner, automatic tax deductible categorization, real-time P&L analytics, and invoice cost linking.',
    alternates: {
        canonical: 'https://nobevra.noblesworld.com.ng/expense-management',
    },
    keywords: [
        'business expense tracker',
        'expense management software',
        'small business expense tracker',
        'small business expense tracking',
        'expense tracking software',
        'track business receipts',
        'AI receipt scanner',
        'business expense categorization',
        'tax deduction tracker',
        'p&l tracking software'
    ],
    openGraph: {
        title: 'Business Expense Tracker & Expense Management Software | Nobevra',
        description: 'Automate business expense tracking with Nobevra. AI receipt scanner, tax categorization, and real-time P&L visibility.',
        url: 'https://nobevra.noblesworld.com.ng/expense-management',
        type: 'website',
        images: ['/images/expense-management-hero.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Business Expense Tracker | Nobevra',
        description: 'AI receipt scanner, automatic tax categorization, and real-time P&L analytics.',
        images: ['/images/expense-management-hero.jpg'],
    },
};

export default function ExpenseManagementLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
