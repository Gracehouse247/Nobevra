const fs = require('fs');
const path = require('path');

const dir = 'C:\\Projects\\NobleInvoice\\web-app\\src\\components\\identity\\templates\\cards\\';
const files = fs.readdirSync(dir);

for (const file of files) {
    if (!file.endsWith('.tsx')) continue;
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes('api.qrserver.com')) {
        if (!content.includes('SharedQRCode')) {
            const lastImportIndex = content.lastIndexOf('import ');
            const endOfLastImport = content.indexOf('\n', lastImportIndex);
            content = content.slice(0, endOfLastImport + 1) + "import { SharedQRCode } from '../../SharedQRCode';\n" + content.slice(endOfLastImport + 1);
        }

        content = content.replace(/<img[\s\S]*?api\.qrserver\.com[\s\S]*?\/>/g, (match) => {
            let size = 200;
            const sizeMatch = match.match(/size=(\d+)x\d+/);
            if (sizeMatch) size = parseInt(sizeMatch[1]);
            
            let colorStr = "";
            const colorMatch = match.match(/color=\${([^}]+)}/);
            if (colorMatch) {
                let colorVar = colorMatch[1].replace(/\.replace\(['"]#['"],\s*['"]['"]\)/, '');
                colorStr = ` color={${colorVar}}`;
            }

            let classNameStr = "";
            const classMatch = match.match(/className=({[^}]+}|["'][^"']+["'])/);
            if (classMatch) {
                classNameStr = ` className=${classMatch[1]}`;
            }

            return `<SharedQRCode url={data.qrCodeUrl || ''}${colorStr} size={${size}}${classNameStr} />`;
        });
        
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
    }
}
