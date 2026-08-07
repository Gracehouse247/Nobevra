const fs = require('fs');
const path = require('path');

const seoDataPath = path.join(__dirname, 'src', 'lib', 'seoData.ts');
let content = fs.readFileSync(seoDataPath, 'utf8');

// Use regex to remove the ai-voice-assistant block from SEO_FEATURES.
// We look for 'ai-voice-assistant': { ... }, ensuring we match until the next key (e.g. 'products-services': {)
const regex = /'ai-voice-assistant':\s*\{[\s\S]*?(?=\s*'products-services':)/;
content = content.replace(regex, '');

fs.writeFileSync(seoDataPath, content);
console.log('Removed ai-voice-assistant from seoData.ts');

// Now, search and replace /features/ai-voice-assistant with /features/ai-invoice-generator in all .tsx and .ts files
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let fileContent = fs.readFileSync(fullPath, 'utf8');
            if (fileContent.includes('/features/ai-voice-assistant')) {
                fileContent = fileContent.replace(/\/features\/ai-voice-assistant/g, '/features/ai-invoice-generator');
                fs.writeFileSync(fullPath, fileContent);
                console.log(`Updated links in ${fullPath}`);
            }
        }
    }
}

walkDir(path.join(__dirname, 'src'));
console.log('Link updates complete.');
