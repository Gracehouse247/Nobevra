const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
const outDir = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\templates\\backgrounds';
const inputFile = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\templates\\BackgroundRenderers.tsx';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sourceFile = project.addSourceFileAtPath(inputFile);
const renderExtDecl = sourceFile.getVariableDeclaration('renderBackgroundExt');
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
  const componentName = `${prefixMap[prefix]}Background`;
  
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

  fs.writeFileSync(path.join(outDir, `${prefixMap[prefix]}Backgrounds.tsx`), fileContent);
}

// Write the Factory Dispatcher back
const factoryContent = `
import React, { Suspense } from 'react';
import { SharedEngineProps } from './types';

const renderers = {
  plat: React.lazy(() => import('./backgrounds/PlatinumBackgrounds').then(m => ({ default: m.PlatinumBackground }))),
  prof: React.lazy(() => import('./backgrounds/ProfessionalBackgrounds').then(m => ({ default: m.ProfessionalBackground }))),
  ess: React.lazy(() => import('./backgrounds/EssentialBackgrounds').then(m => ({ default: m.EssentialBackground }))),
  geo: React.lazy(() => import('./backgrounds/GeometricBackgrounds').then(m => ({ default: m.GeometricBackground }))),
  creative: React.lazy(() => import('./backgrounds/CreativeBackgrounds').then(m => ({ default: m.CreativeBackground }))),
  default: React.lazy(() => import('./backgrounds/DefaultBackgrounds').then(m => ({ default: m.DefaultBackground }))),
};

export const renderBackgroundExt = (props: SharedEngineProps) => {
  let prefix = props.id.split('-')[0];
  if (!renderers[prefix as keyof typeof renderers]) {
    prefix = 'default';
  }
  
  const Renderer = renderers[prefix as keyof typeof renderers];

  return (
    <Suspense fallback={null}>
      <Renderer {...props} />
    </Suspense>
  );
};
`.trim();

fs.writeFileSync(inputFile, factoryContent);

console.log('Successfully refactored BackgroundRenderers.tsx into ' + Object.keys(groups).length + ' modules!');
