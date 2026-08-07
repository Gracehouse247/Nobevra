const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
const outDir = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\lib\\templates\\categories';
const inputFile = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\lib\\templates\\invoiceTemplates.ts';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sourceFile = project.addSourceFileAtPath(inputFile);
const templatesDecl = sourceFile.getVariableDeclaration('INVOICE_TEMPLATES');
const arrayLiteral = templatesDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const groups = {
  plat: [],
  prof: [],
  ess: [],
  geo: [],
  creative: [],
  other: []
};

const prefixMap = {
  plat: 'platinum',
  prof: 'professional',
  ess: 'essentials',
  geo: 'geometric',
  creative: 'creative',
  other: 'other'
};

const elements = arrayLiteral.getElements();

for (const el of elements) {
  const text = el.getText();
  
  // Extract id roughly
  const idMatch = text.match(/"id":\s*"([^"]+)"/);
  const id = idMatch ? idMatch[1] : '';
  
  if (id.startsWith('plat-')) {
    groups.plat.push(text);
  } else if (id.startsWith('prof-')) {
    groups.prof.push(text);
  } else if (id.startsWith('ess-')) {
    groups.ess.push(text);
  } else if (id.startsWith('geo-')) {
    groups.geo.push(text);
  } else if (id.startsWith('creative-')) {
    groups.creative.push(text);
  } else {
    groups.other.push(text);
  }
}

// Write the separated files
const imports = [];
const spreadArray = [];

for (const [prefix, items] of Object.entries(groups)) {
  if (items.length === 0) continue;
  
  const arrayName = `${prefixMap[prefix].toUpperCase()}_TEMPLATES`;
  const fileName = `${prefixMap[prefix]}Templates`;
  
  imports.push(`import { ${arrayName} } from './categories/${fileName}';`);
  spreadArray.push(`...${arrayName}`);
  
  const fileContent = `
import { TemplateDefinition } from '../templateRegistry';

export const ${arrayName}: TemplateDefinition[] = [
  ${items.join(',\n  ')}
];
`.trim();

  fs.writeFileSync(path.join(outDir, `${fileName}.ts`), fileContent);
}

// Write the aggregator back to invoiceTemplates.ts
const aggregatorContent = `
import { TemplateDefinition } from './templateRegistry';
${imports.join('\n')}

export const INVOICE_TEMPLATES: TemplateDefinition[] = [
  ${spreadArray.join(',\n  ')}
];
`.trim();

fs.writeFileSync(inputFile, aggregatorContent);

console.log('Successfully refactored invoiceTemplates.ts into ' + Object.keys(groups).filter(k => groups[k].length > 0).length + ' modules!');
