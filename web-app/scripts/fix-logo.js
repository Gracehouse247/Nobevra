const fs = require('fs');

function fixLogo(file) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes("import Image from 'next/image';") && !content.includes('import Image from "next/image";')) {
        content = content.replace(/import Link from 'next\/link';/g, "import Link from 'next/link';\nimport Image from 'next/image';");
    }
    
    // Convert logo img tag
    // <img src="/images/logo.png" alt="NobleInvoice Logo" className="h-10 w-auto" />
    content = content.replace(/<img[^>]*src="\/images\/logo.png"[^>]*\/>/g, (match) => {
        let className = match.match(/className="([^"]+)"/) ? match.match(/className="([^"]+)"/)[1] : "";
        return `<Image src="/images/logo.png" alt="NobleInvoice Logo" width={155} height={64} className="${className}" priority />`;
    });
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
}

fixLogo('c:/Projects/NobleInvoice Web App Project/web-app/src/components/shared/Navbar.tsx');
fixLogo('c:/Projects/NobleInvoice Web App Project/web-app/src/components/shared/Footer.tsx');
