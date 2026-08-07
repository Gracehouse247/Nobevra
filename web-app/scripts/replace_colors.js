const fs = require('fs');
const path = require('path');

const directoryPath = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src';

const replacements = {
  'bg-indigo-50': 'bg-[#f0fafa]',
  'bg-indigo-100': 'bg-[#e0f5f5]',
  'bg-indigo-200': 'bg-[#b9cacb]',
  'bg-indigo-300': 'bg-[#006970]',
  'bg-indigo-400': 'bg-[#006970]',
  'bg-indigo-500': 'bg-[#006970]',
  'bg-indigo-600': 'bg-[#006970]',
  'bg-indigo-700': 'bg-[#005a60]',
  'bg-indigo-800': 'bg-[#005a60]',
  'bg-indigo-900': 'bg-[#005a60]',
  
  'text-indigo-50': 'text-[#f0fafa]',
  'text-indigo-100': 'text-[#e0f5f5]',
  'text-indigo-200': 'text-[#b9cacb]',
  'text-indigo-300': 'text-[#006970]',
  'text-indigo-400': 'text-[#006970]',
  'text-indigo-500': 'text-[#006970]',
  'text-indigo-600': 'text-[#006970]',
  'text-indigo-700': 'text-[#005a60]',
  'text-indigo-800': 'text-[#005a60]',
  'text-indigo-900': 'text-[#005a60]',
  
  'border-indigo-50': 'border-[#f0fafa]',
  'border-indigo-100': 'border-[#d0eded]',
  'border-indigo-200': 'border-[#b9cacb]',
  'border-indigo-300': 'border-[#006970]',
  'border-indigo-400': 'border-[#006970]',
  'border-indigo-500': 'border-[#006970]',
  'border-indigo-600': 'border-[#006970]',
  'border-indigo-700': 'border-[#005a60]',
  'border-indigo-800': 'border-[#005a60]',
  'border-indigo-900': 'border-[#005a60]',
  
  'ring-indigo-500/20': 'ring-[#006970]/20',
  'ring-indigo-500': 'ring-[#006970]',
  
  'from-indigo-100': 'from-[#e0f5f5]',
  'from-indigo-600': 'from-[#006970]',
  
  'to-indigo-50': 'to-[#f0fafa]',
  'to-violet-700': 'to-[#0599D5]',
  '#4f46e5': '#006970',
  '#6366f1': '#0599D5',
  
  'font-outfit': 'font-sans'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Sort keys by length descending to replace longer match first (e.g. bg-indigo-500 before bg-indigo-50)
      const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
      
      for (const key of keys) {
        // use regex to replace all occurrences
        const regex = new RegExp(key, 'g');
        content = content.replace(regex, replacements[key]);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
