const fs = require('fs');
const path = require('path');

console.log('--- NOBLEMIND PRODUCTION DIAGNOSTICS ---');
console.log(`Current dir: ${process.cwd()}`);
console.log(`Node version: ${process.version}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const criticalPaths = [
    '.next',
    '.next/server',
    '.next/static',
    '.next/server/app/(user)/pro/manage/page.js', // The reported missing file
    'public',
    'server.js',
    'package.json'
];

criticalPaths.forEach(p => {
    const abs = path.join(process.cwd(), p);
    const exists = fs.existsSync(abs);
    console.log(`[${exists ? 'OK' : 'MISSING'}] ${p}`);
});

console.log('----------------------------------------');
if (!fs.existsSync(path.join(process.cwd(), '.next'))) {
    console.warn('CRITICAL: .next folder is missing. Run npm run build or extract the build folder.');
}
console.log('Suggestion: If modules are missing, use cPanel Terminal: `unzip -o frontend_deployment.zip`');
