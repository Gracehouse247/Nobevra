const fs = require('fs');

const files = [
    'C:\\Users\\NOBLE WORLD\\.gemini\\antigravity\\brain\\665fe85c-25be-4e02-a84f-e650617fc807\\.system_generated\\steps\\103\\content.md',
    'C:\\Users\\NOBLE WORLD\\.gemini\\antigravity\\brain\\665fe85c-25be-4e02-a84f-e650617fc807\\.system_generated\\steps\\104\\content.md',
    'C:\\Users\\NOBLE WORLD\\.gemini\\antigravity\\brain\\665fe85c-25be-4e02-a84f-e650617fc807\\.system_generated\\steps\\110\\content.md'
];

function extractTags(html, tag) {
    const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'gis');
    let matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        matches.push(match[1].replace(/<[^>]+>/g, '').trim());
    }
    return matches.filter(t => t.length > 0);
}

function analyzeFile(file, index) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Remove script and style tags to get clean text
        const cleanContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                                    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                                    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
        
        const h2s = extractTags(cleanContent, 'h2');
        const h3s = extractTags(cleanContent, 'h3');
        
        // Simple word count
        const textOnly = cleanContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const wordCount = textOnly.split(' ').length;
        
        // Count images
        const imgRegex = /<img[^>]+>/gi;
        const imgs = cleanContent.match(imgRegex);
        const imgCount = imgs ? imgs.length : 0;
        
        console.log(`\n--- File ${index + 1} ---`);
        console.log(`Word Count: ${wordCount}`);
        console.log(`Images: ${imgCount}`);
        console.log(`H2s:`);
        h2s.forEach(h => console.log(`  - ${h}`));
        console.log(`H3s:`);
        h3s.forEach(h => console.log(`  - ${h}`));
        
    } catch (e) {
        console.log(`Error reading file ${index + 1}: ${e.message}`);
    }
}

files.forEach((f, i) => analyzeFile(f, i));
