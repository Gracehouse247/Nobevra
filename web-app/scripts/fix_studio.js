const fs = require('fs');

function fixStudio(file) {
  let content = fs.readFileSync(file, 'utf8');

  // PropertiesPanel.tsx
  content = content.replace(/value:\s*any\)/g, 'value: string | number | boolean)');
  
  // catch (err: any)
  content = content.replace(/catch\s*\(err:\s*any\)/g, 'catch (err: unknown)');

  fs.writeFileSync(file, content);
}

['C:/Projects/NobleInvoice/web-app/src/components/identity/studio/PropertiesPanel.tsx',
 'C:/Projects/NobleInvoice/web-app/src/components/identity/studio/SidebarLibrary.tsx'].forEach(fixStudio);

console.log('Fixed studio any types');
