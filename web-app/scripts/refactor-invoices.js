const fs = require('fs');
const path = require('path');

const srcFile = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\TemplateEngine.tsx';
const outDir = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\templates';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let content = fs.readFileSync(srcFile, 'utf8');

const getSharedArgs = `
import React from 'react';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export interface SharedEngineProps {
  id: string;
  data: any;
  brand: any;
  containerRounding: string;
  isSerif?: boolean;
  fontClass?: string;
  renderLogo?: (size?: string, light?: boolean) => React.ReactNode;
}
`.trim();

fs.writeFileSync(path.join(outDir, 'types.ts'), getSharedArgs);

const extractFunction = (funcName, outFileName) => {
    let searchStr = `const ${funcName} = (`;
    let startIndex = content.indexOf(searchStr);
    if (startIndex === -1) {
        searchStr = `const ${funcName} = () =>`;
        startIndex = content.indexOf(searchStr);
    }
    
    if (startIndex === -1) return null;
    
    let braceStart = content.indexOf('{', startIndex);
    let braceCount = 1;
    let i = braceStart + 1;
    while (braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        i++;
    }
    
    let end = i;
    
    let body = content.substring(startIndex, end + 1); // includes closing brace
    
    // Convert to exported function with props
    let destruct = `const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;\n  const { sender, client } = data;`;
    
    let argsMatch = body.match(/const [a-zA-Z0-9_]+ = \(([^)]*)\) => \{/);
    let origArgs = argsMatch ? argsMatch[1] : '';
    
    // Replace signature
    let newBody = body.replace(/const [a-zA-Z0-9_]+ = \([^)]*\) => \{/, `export const ${funcName} = (props: SharedEngineProps${origArgs ? `, ${origArgs}` : ''}) => {\n  ${destruct}`);

    let fileContent = `
import React from 'react';
import { SharedEngineProps } from './types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

${newBody}
    `.trim();
    
    fs.writeFileSync(path.join(outDir, outFileName), fileContent);
    
    // Replace in original file
    let callArgs = `{\n      id,\n      data,\n      brand,\n      containerRounding,\n      isSerif,\n      fontClass,\n      renderLogo\n    }`;
    
    if (origArgs) {
        // Find how it is called, wait, if we are doing this, we need to pass props + args
        // Instead of replacing the call sites everywhere (which might be hard), 
        // we replace the implementation in TemplateEngine with a wrapper that calls our new function.
        let wrapper = `const ${funcName} = (${origArgs}) => ${funcName}Ext(${callArgs}${origArgs ? `, ${origArgs.split(',').map(a => a.split('=')[0].trim()).join(', ')}` : ''});`;
        
        content = content.substring(0, startIndex) + wrapper + content.substring(end + 1);
        return `${funcName}Ext as ${funcName}Ext`; // to import as different name so we don't conflict, wait, we can just name the exported function 'renderBackgroundExt' in the file.
    } else {
        let wrapper = `const ${funcName} = () => ${funcName}Ext(${callArgs});`;
        content = content.substring(0, startIndex) + wrapper + content.substring(end + 1);
        return `${funcName}Ext as ${funcName}Ext`;
    }
}

// Actually let's name the exported functions uniquely to avoid collisions in the original file
const extractFunctionV2 = (funcName, outFileName) => {
    let searchStr = `const ${funcName} = (`;
    let startIndex = content.indexOf(searchStr);
    let isNoArgs = false;
    if (startIndex === -1) {
        searchStr = `const ${funcName} = () =>`;
        startIndex = content.indexOf(searchStr);
        isNoArgs = true;
    }
    
    if (startIndex === -1) return null;
    
    let braceStart = content.indexOf('{', startIndex);
    let braceCount = 1;
    let i = braceStart + 1;
    while (braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        i++;
    }
    
    let end = i;
    let body = content.substring(startIndex, end + 1);
    
    let destruct = `const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;\n  const { sender, client } = data;`;
    
    // Get original arguments if any
    let argsStr = '';
    if (!isNoArgs) {
        let parenStart = searchStr.indexOf('(');
        let parenEnd = searchStr.indexOf(')');
        argsStr = searchStr.substring(parenStart + 1, parenEnd).trim();
    }
    
    // We will export the function as "export const renderBackgroundExt = (props, args...)"
    // Replace the definition
    let newBody = body.replace(/const [a-zA-Z0-9_]+ = \([^)]*\) => \{/, `export const ${funcName}Ext = (props: SharedEngineProps${argsStr ? `, ${argsStr}` : ''}) => {\n  ${destruct}`);

    let fileContent = `
import React from 'react';
import { SharedEngineProps } from './types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

${newBody}
    `.trim();
    
    fs.writeFileSync(path.join(outDir, outFileName), fileContent);
    
    let callArgs = `{\n      id, data, brand, containerRounding, isSerif, fontClass, renderLogo\n    }`;
    
    let passArgs = '';
    if (argsStr) {
        passArgs = ', ' + argsStr.split(',').map(a => a.split('=')[0].trim().split(':')[0].trim()).join(', ');
    }
    
    let wrapper = `const ${funcName} = (${argsStr}) => ${funcName}Ext(${callArgs}${passArgs});`;
    
    content = content.substring(0, startIndex) + wrapper + content.substring(end + 1);
    
    return `import { ${funcName}Ext } from './templates/${outFileName.replace('.tsx', '')}';`;
}


let imports = [];
let bg = extractFunctionV2('renderBackground', 'BackgroundRenderers.tsx');
if (bg) imports.push(bg);

let hr = extractFunctionV2('renderHeader', 'HeaderRenderers.tsx');
if (hr) imports.push(hr);

let fr = extractFunctionV2('renderFooter', 'FooterRenderers.tsx');
if (fr) imports.push(fr);

if (imports.length > 0) {
    // prepend imports
    content = imports.join('\n') + '\n' + content;
    fs.writeFileSync(srcFile, content);
    console.log('TemplateEngine refactored!');
} else {
    console.log('Failed to extract.');
}
