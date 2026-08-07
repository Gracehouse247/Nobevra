const fs = require('fs');

function patchFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. Reports Page
patchFile('src/app/(user)/reports/page.tsx', [
    [
        '<h3 className="font-bold text-slate-900 text-[15px]">Quick Insights & Tax</h3>',
        '<div className="flex items-center gap-2"><h3 className="font-bold text-slate-900 text-[15px]">Quick Insights & Tax</h3><PremiumBadge tier="elite" iconOnly /></div>'
    ],
    [
        '<Download className="w-4 h-4" />\n                        Export Report',
        '<Download className="w-4 h-4" />\n                        Export Report\n                        <PremiumBadge tier="elite" iconOnly />'
    ]
]);

// 2. Products Page (Add Product button)
patchFile('src/app/(user)/products/page.tsx', [
    [
        '<Plus className="w-4 h-4" /> Add Product',
        '<Plus className="w-4 h-4" /> Add Product\n                        <PremiumBadge tier="pro" iconOnly />'
    ]
]);

// 3. Products New Page (DPP toggle)
patchFile('src/app/(user)/products/new/page.tsx', [
    [
        'label="Digital Product Passport (DPP)"',
        'label="Digital Product Passport (DPP)"\n                                premium="elite"'
    ]
]);

console.log("Patched successfully!");
