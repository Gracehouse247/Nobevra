const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/components/invoice/creator/InvoiceWizardForm.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add import NewClientForm
if (!content.includes('import { NewClientForm }')) {
    content = content.replace("import { toast } from 'react-hot-toast';", "import { toast } from 'react-hot-toast';\nimport { NewClientForm } from '@/components/clients/NewClientForm';");
}

// 2. In InvoiceDetailsStep, add state and use setClients
if (!content.includes('isNewClientModalOpen')) {
    content = content.replace(
        "const {",
        "const {\n        setClients,"
    );
    
    content = content.replace(
        "const [open, setOpen] = useState(false);",
        "const [open, setOpen] = useState(false);\n    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);"
    );
    
    // Replace window.open and window.location.href
    content = content.replace(
        "onClick={() => window.open('/clients/new?from=invoice', '_blank')}",
        "onClick={() => setIsNewClientModalOpen(true)}"
    );
    content = content.replace(
        "onMouseDown={() => window.location.href = '/clients/new?from=invoice'}",
        "onMouseDown={() => { setOpen(false); setIsNewClientModalOpen(true); }}"
    );
    
    // Inject the modal before the final return of InvoiceDetailsStep
    const modalMarkup = `
            {/* New Client Modal Overlay */}
            {isNewClientModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200 custom-scrollbar shadow-2xl">
                        <button 
                            type="button"
                            onClick={() => setIsNewClientModalOpen(false)}
                            className="absolute top-6 right-6 z-[110] w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="pt-2 pb-6">
                            <NewClientForm 
                                isModal={true} 
                                onCancel={() => setIsNewClientModalOpen(false)}
                                onSuccess={(client) => {
                                    setClients((prev: any) => [...prev, client]);
                                    setSelectedClientId(String(client.id));
                                    setIsNewClientModalOpen(false);
                                    toast.success('Client selected for invoice');
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}`;
            
    content = content.replace(
        "        </div>\n    );\n};\n\n// ── Step 2:",
        `${modalMarkup}\n        </div>\n    );\n};\n\n// ── Step 2:`
    );
}

fs.writeFileSync(targetPath, content);
console.log('InvoiceWizardForm patched');
