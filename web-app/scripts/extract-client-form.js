const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/(user)/clients/new/page.tsx');
const compDir = path.join(__dirname, 'src/components/clients');
const compPath = path.join(compDir, 'NewClientForm.tsx');

if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
}

let content = fs.readFileSync(pagePath, 'utf8');

// Extract the imports and the NewClientForm function
let imports = content.substring(0, content.indexOf('function NewClientForm()'));
// Remove the 'use client' if it's there, we will add it manually
imports = imports.replace(/'use client';\s*/, '');

// We need to change how NewClientForm works to support modal usage.
// Add props: isModal?: boolean, onSuccess?: (client: any) => void, onCancel?: () => void
let formContent = content.substring(content.indexOf('function NewClientForm()'), content.indexOf('export default function NewClientPage()'));

formContent = formContent.replace('function NewClientForm() {', 'export function NewClientForm({ isModal, onSuccess, onCancel }: { isModal?: boolean, onSuccess?: (client: any) => void, onCancel?: () => void }) {');

// In handleSubmit:
formContent = formContent.replace(
    /if \(fromInvoice \|\| redirectToInvoice\) \{[\s\S]*?\} else \{[\s\S]*?\}/,
    `if (onSuccess) {
                onSuccess(saved);
            } else if (fromInvoice || redirectToInvoice) {
                router.push(\`/invoices/new?newClientId=\${saved.id}\`);
            } else {
                router.push('/clients');
            }`
);

// In Cancel button:
formContent = formContent.replace(
    /onClick=\{\(\) => router.back\(\)\}/,
    `onClick={() => onCancel ? onCancel() : router.back()}`
);

// In Back button at the top:
formContent = formContent.replace(
    /onClick=\{\(\) => fromInvoice \? router.push\('\/invoices\/new'\) : router.back\(\)\}/,
    `onClick={() => onCancel ? onCancel() : fromInvoice ? router.push('/invoices/new') : router.back()}`
);

// If it's a modal, we might want to hide the top header and Right Area
formContent = formContent.replace(
    /\{\/\* ── Top Header ── \*\/\}/,
    `{!isModal && (
                <>
                {/* ── Top Header ── */}`
);
formContent = formContent.replace(
    /\{\/\* ── Main Layout Grid ── \*\/\}/,
    `</>
            )}
            {/* ── Main Layout Grid ── */}`
);

formContent = formContent.replace(
    /<div className="xl:col-span-8 space-y-6">/,
    `<div className={isModal ? "xl:col-span-12 space-y-6" : "xl:col-span-8 space-y-6"}>`
);

formContent = formContent.replace(
    /\{\/\* Right Area \(4 cols\) \*\/\}/,
    `{!isModal && (
                        <>
                        {/* Right Area (4 cols) */}`
);

formContent = formContent.replace(
    /\{\/\* Import from Contacts Modal \*\/\}/,
    `</>
                    )}
                    {/* Import from Contacts Modal */}`
);

// Change the main container background if modal
formContent = formContent.replace(
    /<div className="h-full bg-\[#F4F5F7\] min-h-screen font-\[Inter,sans-serif\]">/,
    `<div className={\`h-full \${isModal ? 'bg-white' : 'bg-[#F4F5F7] min-h-screen'} font-[Inter,sans-serif]\`}>`
);

// Change form padding if modal
formContent = formContent.replace(
    /<form onSubmit=\{handleSubmit\} className="p-5 lg:p-8 max-w-7xl mx-auto space-y-6 pb-20">/,
    `<form onSubmit={handleSubmit} className={\`\${isModal ? 'p-0' : 'p-5 lg:p-8 max-w-7xl mx-auto'} space-y-6 pb-20\`}>`
);

const newComponentContent = `'use client';\n` + imports + formContent;
fs.writeFileSync(compPath, newComponentContent);

// Now update the original page to just import this component
const newPageContent = `'use client';

import React, { Suspense } from 'react';
import { NewClientForm } from '@/components/clients/NewClientForm';

export default function NewClientPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-10 h-10 border-4 border-[#0599D5] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <NewClientForm />
        </Suspense>
    );
}
`;

fs.writeFileSync(pagePath, newPageContent);
console.log('Extracted NewClientForm to components and updated page.tsx');
