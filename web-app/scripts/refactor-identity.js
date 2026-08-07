const fs = require('fs');
const path = require('path');

const srcFile = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\identity\\BusinessCardEngine.tsx';
const outDir = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\identity\\templates\\cards';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let content = fs.readFileSync(srcFile, 'utf8');

// Regex to find all renderer functions
// Matches: const render[Name] = () => { ... };
// We need a robust parser for this. Since it's hard to parse balanced braces with regex,
// we'll split by "const render" and find matching braces.

const typesFile = path.join(outDir, '..', 'types.ts');
fs.writeFileSync(typesFile, `
import { IdentityData } from '@/types';
import React from 'react';

export interface CardRendererProps {
  data: IdentityData;
  side: 'front' | 'back';
  brandAccent: string;
  brandDark: string;
  brandLight: string;
  brandMid: string;
  ON_COLOR: string;
  ON_WHITE: string;
  effectiveAccent: string;
  fs: (baseSize: number) => string;
  DraggableElement: React.FC<{ elementKey: any, children: React.ReactNode, className?: string, style?: any }>;
  renderAvatar: (borderColor?: string, size?: number) => React.ReactNode;
}
`.trim());

// A simple stack-based parser to extract functions
let renderers = [];
let currentIndex = 0;

while (true) {
    let match = content.indexOf('const render', currentIndex);
    if (match === -1) break;

    // Check if it's one of the target renderers (we don't want to extract renderTemplateBackground or renderAvatar)
    let endOfLine = content.indexOf('=', match);
    let funcName = content.substring(match + 6, endOfLine).trim();

    if (funcName === 'renderAvatar' || funcName === 'renderBespokeTemplate' || funcName === 'renderTemplateBackground') {
        currentIndex = endOfLine + 1;
        continue;
    }

    let braceStart = content.indexOf('{', endOfLine);
    let arrowIndex = content.indexOf('=>', endOfLine);

    // If there is no brace (e.g. const renderThynkAzure = () => renderWilsonDynamic('#0055A4');)
    if (content.substring(arrowIndex, braceStart).includes('renderWilsonDynamic')) {
        let semicolon = content.indexOf(';', arrowIndex);
        let body = content.substring(match, semicolon + 1);
        renderers.push({ name: funcName, body: body, start: match, end: semicolon + 1, isOneLiner: true });
        currentIndex = semicolon + 1;
        continue;
    }

    let braceCount = 1;
    let i = braceStart + 1;
    while (braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        i++;
    }

    let body = content.substring(match, i);
    // Include following semicolon if present
    if (content[i] === ';') i++;

    renderers.push({ name: funcName, body: content.substring(match, i), start: match, end: i, isOneLiner: false });
    currentIndex = i;
}

console.log(`Found ${renderers.length} renderers.`);

let importStatements = [];
let replacementMap = [];

for (let renderer of renderers) {
    if (renderer.name === 'renderBespokeTemplate') continue;

    let componentName = renderer.name.replace('render', '') + 'Card';
    let fileName = `${componentName}.tsx`;
    let filePath = path.join(outDir, fileName);

    let componentCode = '';
    if (renderer.isOneLiner) {
        // e.g. const renderThynkAzure = () => renderWilsonDynamic('#0055A4');
        // Convert to component
        componentCode = `
import React from 'react';
import { CardRendererProps } from '../types';
import { WilsonDynamicCard } from './WilsonDynamicCard';

export const ${componentName}: React.FC<CardRendererProps> = (props) => {
    return <WilsonDynamicCard {...props} defaultColor="#0055A4" />;
};
        `.trim();
    } else {
        // Rewrite body to accept props and destructure them
        // Original: const renderLaranaInc = () => { ... }
        // New: export const LaranaIncCard: React.FC<CardRendererProps> = (props) => { const { data, side, ... } = props; ... }
        
        // Sometimes the original takes a default arg: const renderWilsonDynamic = (defaultColor = '#00B4DB') => {
        let hasArgs = renderer.body.includes('(defaultColor');
        
        let destruct = `const { data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, fs, DraggableElement, renderAvatar, effectiveAccent } = props;`;
        
        let newBody = renderer.body.replace(/const render[a-zA-Z0-9_]+ = \([^)]*\) => {/, `export const ${componentName}: React.FC<CardRendererProps & { defaultColor?: string }> = (props) => {\n  ${destruct}`);
        
        if (hasArgs) {
             // Handle defaultColor if present in original code
             newBody = newBody.replace('export const', `export const`);
             newBody = newBody.replace(destruct, destruct + `\n  const defaultColor = props.defaultColor || '#00B4DB';`);
        }

        // Add imports
        componentCode = `
import React from 'react';
import { CardRendererProps } from '../types';
import { Phone, Mail, Globe, MapPin, Briefcase, Camera, Box, Leaf } from 'lucide-react';

${newBody}
        `.trim();
    }

    fs.writeFileSync(filePath, componentCode);
    importStatements.push(`import { ${componentName} } from './templates/cards/${componentName}';`);
    replacementMap.push({ name: renderer.name, component: componentName });
}

console.log('Finished writing components. Now rewriting engine...');

// Now remove the extracted functions from the engine and replace calls with component rendering
// We iterate from end to start so indices don't shift
for (let i = renderers.length - 1; i >= 0; i--) {
    let r = renderers[i];
    content = content.substring(0, r.start) + content.substring(r.end);
}

// Prepend imports
let importsBlock = importStatements.join('\n');
content = content.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\n" + importsBlock);

// Update renderBespokeTemplate to return the components instead of calling the functions
// Replace `if (isLaranaInc) return renderLaranaInc();` with `if (isLaranaInc) return <LaranaIncCard {...props} />;`
let propsObj = `{ data, side, brandAccent, brandDark, brandLight, brandMid, ON_COLOR, ON_WHITE, effectiveAccent, fs, DraggableElement, renderAvatar }`;

let dispatchStart = content.indexOf('const renderBespokeTemplate = () => {');
let dispatchEnd = content.indexOf('};', dispatchStart) + 2;

let dispatchBody = content.substring(dispatchStart, dispatchEnd);

for (let rep of replacementMap) {
    // Some are called like renderWilsonDynamic()
    dispatchBody = dispatchBody.replace(new RegExp(`return ${rep.name}\\(\\);`, 'g'), `return <${rep.component} {...sharedProps} />;`);
}

dispatchBody = dispatchBody.replace('const renderBespokeTemplate = () => {', `const renderBespokeTemplate = () => {\n    const sharedProps = ${propsObj};`);
content = content.substring(0, dispatchStart) + dispatchBody + content.substring(dispatchEnd);

fs.writeFileSync(srcFile, content);
console.log('BusinessCardEngine.tsx has been refactored.');
