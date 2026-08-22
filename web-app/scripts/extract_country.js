const fs = require('fs');
const path = 'C:/Projects/Nobevra/web-app/src/components/clients/NewClientForm.tsx';
let code = fs.readFileSync(path, 'utf8');

const selectRegex = /<select[\s\S]*?className="w-full h-10 pl-9 pr-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-\[13px\] focus:outline-none focus:border-\[\#0599D5\] focus:ring-2 focus:ring-\[\#0599D5\]\/10 transition-all font-medium font-\[Inter,sans-serif\] appearance-none cursor-pointer"[\s\S]*?onChange=\{\(e\) => setFormData\(\{\.\.\.formData, country_code: e\.target\.value\}\)\}[\s\S]*?>([\s\S]*?)<\/select>/;

const match = code.match(selectRegex);
if(match) {
    const options = match[1];
    const componentCode = `import React from 'react';
export const CountrySelect = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    return (
        <select 
            className="w-full h-10 pl-9 pr-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all font-medium font-[Inter,sans-serif] appearance-none cursor-pointer"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
${options}
        </select>
    );
};`;
    
    fs.writeFileSync('C:/Projects/Nobevra/web-app/src/components/clients/CountrySelect.tsx', componentCode);
    
    let newCode = code.replace(selectRegex, '<CountrySelect value={formData.country_code} onChange={(val) => setFormData({...formData, country_code: val})} />');
    newCode = newCode.replace("import { toast } from 'react-hot-toast';", "import { toast } from 'react-hot-toast';\nimport { CountrySelect } from './CountrySelect';");
    
    fs.writeFileSync(path, newCode);
    console.log('Successfully extracted CountrySelect');
} else {
    console.log('Could not find select');
}
