const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
const outDir = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\templates\\footers';
const inputFile = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\templates\\FooterRenderers.tsx';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sourceFile = project.addSourceFileAtPath(inputFile);
const renderExtDecl = sourceFile.getVariableDeclaration('renderFooterExt');
const arrowFunc = renderExtDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrowFunction);
const block = arrowFunc.getBody();

const groups = {
  plat: [],
  prof: [],
  ess: [],
  geo: [],
  creative: [],
  default: [] // for the fallback switch and variable decls
};

const prefixMap = {
  plat: 'Platinum',
  prof: 'Professional',
  ess: 'Essential',
  geo: 'Geometric',
  creative: 'Creative',
  default: 'Default'
};

const statements = block.getStatements();

for (const stmt of statements) {
  if (stmt.getKind() === SyntaxKind.IfStatement) {
    const text = stmt.getText();
    if (text.includes("id === 'plat-") || text.includes('id === "plat-')) {
      groups.plat.push(text);
    } else if (text.includes("id === 'prof-") || text.includes('id === "prof-')) {
      groups.prof.push(text);
    } else if (text.includes("id === 'ess-") || text.includes('id === "ess-')) {
      groups.ess.push(text);
    } else if (text.includes("id === 'geo-") || text.includes('id === "geo-')) {
      groups.geo.push(text);
    } else if (text.includes("id === 'creative-") || text.includes('id === "creative-')) {
      groups.creative.push(text);
    } else {
      groups.default.push(text);
    }
  } else {
    groups.default.push(stmt.getText());
  }
}

// Write the separated files
for (const [prefix, stmts] of Object.entries(groups)) {
  const componentName = `${prefixMap[prefix]}Footer`;
  
  const fileContent = `
import React from 'react';
import { SharedEngineProps } from '../types';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';

export const ${componentName} = (props: SharedEngineProps) => {
  const { id, data, brand, containerRounding, isSerif, fontClass, renderLogo } = props;
  const { sender, client } = data;

  ${stmts.join('\n\n  ')}
  
  return null; // Fallback if no specific ID matched in this group
};
`.trim();

  fs.writeFileSync(path.join(outDir, `${prefixMap[prefix]}Footers.tsx`), fileContent);
}

// Write the Factory Dispatcher back
const factoryContent = `
import React, { Suspense } from 'react';
import { SharedEngineProps } from './types';

const renderers = {
  plat: React.lazy(() => import('./footers/PlatinumFooters').then(m => ({ default: m.PlatinumFooter }))),
  prof: React.lazy(() => import('./footers/ProfessionalFooters').then(m => ({ default: m.ProfessionalFooter }))),
  ess: React.lazy(() => import('./footers/EssentialFooters').then(m => ({ default: m.EssentialFooter }))),
  geo: React.lazy(() => import('./footers/GeometricFooters').then(m => ({ default: m.GeometricFooter }))),
  creative: React.lazy(() => import('./footers/CreativeFooters').then(m => ({ default: m.CreativeFooter }))),
  default: React.lazy(() => import('./footers/DefaultFooters').then(m => ({ default: m.DefaultFooter }))),
};

export const renderFooterExt = (props: SharedEngineProps) => {
  let prefix = props.id.split('-')[0];
  if (!renderers[prefix as keyof typeof renderers]) {
    prefix = 'default';
  }
  
  const Renderer = renderers[prefix as keyof typeof renderers];

  return (
    <Suspense fallback={<div className="animate-pulse h-32 bg-slate-100 rounded-xl mt-12 w-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Loading Template...</div>}>
      <Renderer {...props} />
    </Suspense>
  );
};
`.trim();

fs.writeFileSync(inputFile, factoryContent);

console.log('Successfully refactored FooterRenderers.tsx into ' + Object.keys(groups).length + ' modules!');
