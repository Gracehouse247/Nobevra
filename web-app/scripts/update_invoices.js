const fs = require('fs');
const path = require('path');

const file = 'C:/Projects/NobleInvoice/web-app/src/app/(user)/invoices/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert import
const importStr = "import { MiniBarChart, SkeletonRow, ClientAvatar, StatusBadge, ActionBtn } from '@/components/invoice/InvoiceShared';\n";
content = content.replace("import { teamService } from '@/lib/services/supabaseService';", "import { teamService } from '@/lib/services/supabaseService';\n" + importStr);

// Use a regex to match and remove the components block
// From `// ─── Mini Bar Sparkline ──────────────────────────────────────────────────────` 
// down to `// ─── Main Page ────────────────────────────────────────────────────────────────`
const blockRegex = /\/\/ ─── Mini Bar Sparkline ──────────────────────────────────────────────────────[\s\S]*?\/\/ ─── Main Page ────────────────────────────────────────────────────────────────/m;

if (blockRegex.test(content)) {
  content = content.replace(blockRegex, "// ─── Main Page ────────────────────────────────────────────────────────────────");
  fs.writeFileSync(file, content);
  console.log("Successfully extracted shared components.");
} else {
  console.log("Could not find the block to replace.");
}
