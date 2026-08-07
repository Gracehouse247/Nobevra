const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/components/invoice/creator/InvoiceCreatorContext.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Initial state setup based on search params
if (!content.includes("const initialType = searchParams?.get('type') || 'standard';")) {
    content = content.replace(
        "const [step, setStep] = useState<'select-type' | 'form' | 'success'>('select-type');",
        "const initialType = searchParams?.get('type');\n    const [step, setStep] = useState<'select-type' | 'form' | 'success'>(initialType ? 'form' : 'select-type');"
    );
    
    content = content.replace(
        "const [invoiceType, setInvoiceType] = useState('standard');",
        "const [invoiceType, setInvoiceType] = useState(initialType || 'standard');"
    );
}

fs.writeFileSync(targetPath, content);
console.log('InvoiceCreatorContext patched');
