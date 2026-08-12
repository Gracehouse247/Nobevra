'use client';

import React, { Suspense } from 'react';
import { NewClientForm } from '@/components/clients/NewClientForm';

export default function NewClientPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#060D1A]">
                <div className="w-10 h-10 border-4 border-[#0599D5] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <NewClientForm />
        </Suspense>
    );
}
