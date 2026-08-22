const fs = require('fs');

function replaceAny(file) {
  let content = fs.readFileSync(file, 'utf8');

  // React component icons
  content = content.replace(/icon:\s*any/g, 'icon: React.ElementType');
  
  // catch (err: any)
  content = content.replace(/catch\s*\(err:\s*any\)/g, 'catch (err: unknown)');

  // PostEditor Tiptap actions
  if (file.includes('PostEditor.tsx')) {
    if (!content.includes("import { Editor } from '@tiptap/core';")) {
      content = content.replace("import { EditorContent, useEditor } from '@tiptap/react';", "import { EditorContent, useEditor } from '@tiptap/react';\nimport type { Editor } from '@tiptap/core';");
    }
    content = content.replace(/\(e:\s*any\)\s*=>/g, '(e: Editor) =>');
  }

  // Extensions props
  if (file.includes('extensions/')) {
    if (!content.includes("NodeViewProps")) {
      content = content.replace("import { NodeViewWrapper } from '@tiptap/react';", "import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';");
    }
    content = content.replace(/\(props:\s*any\)/g, '(props: NodeViewProps)');
  }

  fs.writeFileSync(file, content);
}

['C:/Projects/Nobevra/web-app/src/components/features/cms/AISeoAnalyzer.tsx',
 'C:/Projects/Nobevra/web-app/src/components/features/cms/PostEditor.tsx',
 'C:/Projects/Nobevra/web-app/src/components/features/cms/SocialPublishModal.tsx',
 'C:/Projects/Nobevra/web-app/src/components/features/cms/extensions/CTABlock.tsx',
 'C:/Projects/Nobevra/web-app/src/components/features/cms/extensions/NoticeBlock.tsx',
 'C:/Projects/Nobevra/web-app/src/components/features/cms/extensions/PricingTableBlock.tsx'].forEach(replaceAny);

console.log('Fixed cms any types');
