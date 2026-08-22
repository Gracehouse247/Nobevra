const fs = require('fs');
const path = require('path');

// Directories to sweep for a11y issues
const dirsToSweep = [
    'C:/Projects/Nobevra/web-app/src/components/invoice',
    'C:/Projects/Nobevra/web-app/src/components/clients',
    'C:/Projects/Nobevra/web-app/src/components/identity',
];

let totalFixed = 0;
let filesFixed = [];

function fixA11y(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Add aria-label to icon-only delete/remove buttons with Trash/X/Delete icons
    content = content.replace(
        /(<button\s+)([^>]*)(onClick=\{[^}]*(?:remove|delete|onDelete|onRemove)[^}]*\}[^>]*>)\s*(<(?:Trash2?|X|Delete)[^/]*\/>)/g,
        (match, btnStart, attrs, onClick, icon) => {
            if (!attrs.includes('aria-label')) {
                return `${btnStart}aria-label="Remove item" ${attrs}${onClick}\n                ${icon}`;
            }
            return match;
        }
    );

    // 2. Add aria-expanded to dropdown toggle buttons (pattern: onClick -> setIsOpen / setOpen / setShowX)
    content = content.replace(
        /(<button\s)([^>]*?)onClick=\{\(\) => (set(?:IsOpen|Open|ShowDropdown|ShowMenu))\(!(?:isOpen|open|showDropdown|showMenu)\)\}([^>]*>)/g,
        (match, btnStart, preAttrs, setter, postAttrs) => {
            if (!preAttrs.includes('aria-expanded') && !postAttrs.includes('aria-expanded')) {
                const varName = setter.replace('set', '').charAt(0).toLowerCase() + setter.replace('set', '').slice(1);
                return `${btnStart}${preAttrs}aria-expanded={${varName}} aria-haspopup="listbox" onClick={() => ${setter}(!${varName})}${postAttrs}`;
            }
            return match;
        }
    );

    // 3. Add role="listbox" to dropdown menus
    content = content.replace(
        /(<div\s[^>]*className="absolute[^"]*(?:top-full|mt-1|mt-2)[^"]*(?:bg-white|shadow-xl|shadow-lg)[^"]*z-\d+[^"]*"[^>]*>)/g,
        (match) => {
            if (!match.includes('role=')) {
                return match.replace('>', ' role="listbox">');
            }
            return match;
        }
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        filesFixed.push(filePath.split('/').pop());
        totalFixed++;
    }
}

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath);
        } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
            fixA11y(fullPath);
        }
    }
}

dirsToSweep.forEach(walkDir);
console.log(`A11y sweep complete. Fixed ${totalFixed} files: ${filesFixed.join(', ')}`);
