const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'lib', 'templates', 'categories');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

// A small list of templates to explicitly keep free to act as the "freemium hook".
// We want ~10-15% free, which is about 20-25 templates total out of 180+.
const freeKeywords = [
    'clean', 'minimal', 'basic', 'standard', 'simple', 'white', 'classic', 'plain', 'essential', 'core'
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const templateRegex = /{\s*"id":\s*"([^"]+)",[\s\S]*?"isPremium":\s*(true|false),[\s\S]*?}/g;

    content = content.replace(templateRegex, (match, id) => {
        let isPremium = true; // default to true to maximize conversion

        const lowerId = id.toLowerCase();
        
        // Platinum and Geometric are ALWAYS 100% premium
        if (file === 'platinumTemplates.ts' || file === 'geometricTemplates.ts') {
            isPremium = true;
        } 
        // For the other categories, we make them premium UNLESS they match our basic keywords
        else {
            const isBasicName = freeKeywords.some(keyword => lowerId.includes(keyword));
            const isBasicHeader = match.includes('"headerStyle": "minimal"') || match.includes('"headerStyle": "stripe"');
            const isBasicFooter = match.includes('"footerStyle": "minimal"') || match.includes('"footerStyle": "none"');
            
            // It only becomes free if it's explicitly a very basic design
            if (isBasicName && isBasicHeader && isBasicFooter) {
                isPremium = false;
            } else {
                // If we need to randomly make a few more free just to hit ~15%, we could, 
                // but relying on the basic keywords is better for business logic.
                isPremium = true;
            }
        }

        return match.replace(/"isPremium":\s*(true|false)/, `"isPremium": ${isPremium}`);
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
});
