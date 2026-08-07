const fs = require('fs');

// 1. Remove Flutterwave from root layout
const rootLayoutPath = 'c:/Projects/NobleInvoice Web App Project/web-app/src/app/layout.tsx';
let rootLayout = fs.readFileSync(rootLayoutPath, 'utf8');
rootLayout = rootLayout.replace(/<Script\s*src="https:\/\/checkout\.flutterwave\.com\/v3\.js"\s*strategy="lazyOnload"\s*\/>/g, '');
rootLayout = rootLayout.replace(/import Script from "next\/script";\n/g, ''); // Optionally remove import if not used elsewhere, but let's just remove the tag.
fs.writeFileSync(rootLayoutPath, rootLayout, 'utf8');
console.log('Removed from root layout');

// 2. Add Flutterwave to user layout
const userLayoutPath = 'c:/Projects/NobleInvoice Web App Project/web-app/src/app/(user)/layout.tsx';
let userLayout = fs.readFileSync(userLayoutPath, 'utf8');
if (!userLayout.includes("import Script from 'next/script';") && !userLayout.includes('import Script from "next/script";')) {
    userLayout = userLayout.replace(/import { AnimatePresence } from 'framer-motion';/g, "import { AnimatePresence } from 'framer-motion';\nimport Script from 'next/script';");
}
if (!userLayout.includes("checkout.flutterwave.com")) {
    userLayout = userLayout.replace(/<\/RealtimeProvider>/g, "    <Script src=\"https://checkout.flutterwave.com/v3.js\" strategy=\"lazyOnload\" />\n        </RealtimeProvider>");
}
fs.writeFileSync(userLayoutPath, userLayout, 'utf8');
console.log('Added to user layout');
