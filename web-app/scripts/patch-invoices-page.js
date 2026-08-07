const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/app/(user)/invoices/page.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add import InvoiceTypeModal
if (!content.includes('import { InvoiceTypeModal }')) {
    content = content.replace(
        "import { toast } from 'react-hot-toast';", 
        "import { toast } from 'react-hot-toast';\nimport { InvoiceTypeModal } from '@/components/invoice/InvoiceTypeModal';"
    );
}

// 2. Add state inside InvoicesDashboard
if (!content.includes('showTypeModal')) {
    content = content.replace(
        "const [filter, setFilter] = useState<'all' | 'unpaid' | 'overdue'>('all');",
        "const [filter, setFilter] = useState<'all' | 'unpaid' | 'overdue'>('all');\n    const [showTypeModal, setShowTypeModal] = useState(false);"
    );
}

// 3. Replace the <Link href="/invoices/new"> with <button>
const oldLinkStr = `<Link href="/invoices/new" className="flex items-center gap-1.5 px-5 py-2.5 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #006970, #0599D5)' }}>
                                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                                Add New Invoice
                            </Link>`;
const newButtonStr = `<button onClick={() => setShowTypeModal(true)} className="flex items-center gap-1.5 px-5 py-2.5 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #006970, #0599D5)' }}>
                                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                                Add New Invoice
                            </button>`;
content = content.replace(oldLinkStr, newButtonStr);

// 4. Update the empty state action
content = content.replace(
    "actions={[{ label: '+ Create Invoice', onClick: () => router.push('/invoices/new') }]}",
    "actions={[{ label: '+ Create Invoice', onClick: () => setShowTypeModal(true) }]}"
);

// 5. Render the modal at the end before final closing div
const modalMarkup = `\n            {/* Invoice Type Selection Modal */}\n            <InvoiceTypeModal isOpen={showTypeModal} onClose={() => setShowTypeModal(false)} />\n`;
if (!content.includes('<InvoiceTypeModal isOpen={showTypeModal}')) {
    content = content.replace(
        "        </div>\n    );\n}",
        `${modalMarkup}        </div>\n    );\n}`
    );
}

fs.writeFileSync(targetPath, content);
console.log('invoices/page.tsx patched successfully');
