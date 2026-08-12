const fs = require('fs');
const path = require('path');

const functionsDir = __dirname;
const sharedPath = '../_shared/cors.ts';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== '_shared') {
        const indexPath = path.join(fullPath, 'index.ts');
        if (fs.existsSync(indexPath)) {
          processFile(indexPath);
        }
      }
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find CORS block
  // It usually looks like:
  // const corsHeaders = {
  //   "Access-Control-Allow-Origin": ...
  // };
  // or CORS_HEADERS
  
  const regex1 = /const\s+corsHeaders\s*=\s*\{[^}]+\};/s;
  const regex2 = /const\s+CORS_HEADERS\s*=\s*\{[^}]+\};/s;
  
  let modified = false;
  if (regex1.test(content)) {
    content = content.replace(regex1, `import { CORS_HEADERS as corsHeaders } from "../_shared/cors.ts";`);
    modified = true;
  } else if (regex2.test(content)) {
    content = content.replace(regex2, `import { CORS_HEADERS } from "../_shared/cors.ts";`);
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated CORS in', filePath);
  }
}

processDirectory(functionsDir);
