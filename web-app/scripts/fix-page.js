const fs = require('fs');
const path = 'c:/Projects/NobleInvoice Web App Project/web-app/src/app/(public)/features/how-to-make-an-invoice-for-free/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Contrast fixes
content = content.replace(/text-near-black\/40/g, 'text-near-black/60');
content = content.replace(/text-near-black\/50/g, 'text-near-black/70');
content = content.replace(/text-noble-blue\/20/g, 'text-noble-blue/50');
content = content.replace(/text-slate-300/g, 'text-slate-500');

// Image tags replacements
if (!content.includes("import Image from 'next/image';")) {
    content = content.replace(/import Link from 'next\/link';/, "import Link from 'next/link';\nimport Image from 'next/image';");
}

content = content.replace(/<img src="\/images\/features\/invoice-checklist-diagram.png" alt="Invoice Field Checklist Diagram" className="w-full h-auto object-cover" \/>/g, '<Image src="/images/features/invoice-checklist-diagram.png" alt="Invoice Field Checklist Diagram" width={1024} height={1024} className="w-full h-auto object-cover" />');

content = content.replace(/<img src="\/images\/features\/invoice-editor-mockup.png" alt="NobleInvoice App Editor UI Mockup" className="w-full h-auto object-cover" \/>/g, '<Image src="/images/features/invoice-editor-mockup.png" alt="NobleInvoice App Editor UI Mockup" width={1024} height={600} className="w-full h-auto object-cover" />');

content = content.replace(/<img src="\/images\/features\/mobile-invoice-app.png" alt="NobleInvoice Mobile App UI" className="w-full h-auto object-cover rounded-\\[32px\\]" \/>/g, '<Image src="/images/features/mobile-invoice-app.png" alt="NobleInvoice Mobile App UI" width={800} height={1600} className="w-full h-auto object-cover rounded-[32px]" />');

fs.writeFileSync(path, content, 'utf8');
console.log('Updated page.tsx');
