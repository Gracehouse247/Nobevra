const fs = require('fs');
const path = 'C:/Projects/NobleInvoice/web-app/src/components/invoice/creator/InvoiceWizardForm.tsx';
let code = fs.readFileSync(path, 'utf8');

const step1Match = code.match(/const InvoiceDetailsStep = \(\) => \{[\s\S]*?\n\};\n/);
const step2Match = code.match(/const AddItemsStep = \(\) => \{[\s\S]*?\n\};\n/);

if (step1Match) {
    fs.writeFileSync('C:/Projects/NobleInvoice/web-app/src/components/invoice/creator/steps/InvoiceDetailsStep.tsx',
        '\'use client\';\nimport React, { useState } from \'react\';\nimport { Search, Plus, X, ChevronDown, User, FileCheck, MoreHorizontal, CreditCard, FileText } from \'lucide-react\';\nimport { useInvoiceCreator } from \'../InvoiceCreatorContext\';\nimport { NewClientForm } from \'@/components/clients/NewClientForm\';\n\n' +
        'const inputClass = `w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]`;\n' +
        'const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider font-[Inter,sans-serif]";\n' +
        'const cardClass = "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-3";\n' +
        'const cardHeaderClass = "px-5 py-3 border-b border-slate-100 bg-slate-50/50";\n\n' +
        'const ToggleRow = ({ label, description, icon, iconBg }: any) => { const [on, setOn] = useState(false); return (<div className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/70 cursor-pointer transition-colors" onClick={() => setOn(!on)}><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>{icon}</div><div><p className="text-[13px] font-semibold text-slate-800 font-[Inter,sans-serif]">{label}</p><p className="text-[11px] text-slate-500 mt-0.5 font-[Inter,sans-serif]">{description}</p></div></div><div className={`relative w-10 h-5 rounded-full transition-all duration-200 ${on ? "bg-[#0599D5]" : "bg-slate-200"}`}><div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${on ? "left-5" : "left-0.5"}`} /></div></div>);};\n\n' +
        'export ' + step1Match[0]
    );
}

if (step2Match) {
    fs.writeFileSync('C:/Projects/NobleInvoice/web-app/src/components/invoice/creator/steps/AddItemsStep.tsx',
        '\'use client\';\nimport React from \'react\';\nimport { FileText, Trash2, Plus, ChevronDown } from \'lucide-react\';\nimport { useInvoiceCreator } from \'../InvoiceCreatorContext\';\n\n' +
        'const inputClass = `w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]`;\n' +
        'const labelClass = "text-[11px] font-bold text-slate-500 mb-1 block uppercase tracking-wider font-[Inter,sans-serif]";\n' +
        'const cardClass = "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-3";\n' +
        'const cardHeaderClass = "px-5 py-3 border-b border-slate-100 bg-slate-50/50";\n\n' +
        'export ' + step2Match[0]
    );
}

if (step1Match && step2Match) {
    let newCode = code.replace(step1Match[0], '').replace(step2Match[0], '');
    newCode = newCode.replace(
        'import { NewClientForm } from \'@/components/clients/NewClientForm\';',
        'import { NewClientForm } from \'@/components/clients/NewClientForm\';\nimport { InvoiceDetailsStep } from \'./steps/InvoiceDetailsStep\';\nimport { AddItemsStep } from \'./steps/AddItemsStep\';'
    );
    fs.writeFileSync(path, newCode);
    console.log('Split successful');
}
