'use client';

import React, { Suspense } from 'react';
import { InvoiceCreatorProvider } from '@/components/invoice/creator/InvoiceCreatorContext';
import { InvoiceCreatorLayout } from '@/components/invoice/creator/InvoiceCreatorLayout';

// Suspense boundary is REQUIRED by Next.js App Router when any child uses
// useSearchParams() — without it, the hook can cause uncontrolled re-renders
// that re-trigger useEffect calls (causing the repeated "Error fetching team" logs)
function InvoiceCreatorApp() {
    return (
        <InvoiceCreatorProvider>
            <InvoiceCreatorLayout />
        </InvoiceCreatorProvider>
    );
}

export default function CreateInvoicePage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#060D1A]">
                <div className="w-10 h-10 border-4 border-[#166FBB] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <InvoiceCreatorApp />
        </Suspense>
    );
}
