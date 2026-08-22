const fs = require('fs');

let route1 = 'C:/Projects/Nobevra/web-app/src/app/api/contracts/[id]/sign/route.ts';
if (fs.existsSync(route1)) {
  let c1 = fs.readFileSync(route1, 'utf8');
  c1 = c1.replace(/{ params }: { params: { id: string } }/g, '{ params }: { params: Promise<{ id: string }> }');
  c1 = c1.replace(/const { id } = params;/g, 'const { id } = await params;');
  c1 = c1.replace(/params\.id/g, '(await params).id');
  fs.writeFileSync(route1, c1);
}

let route2 = 'C:/Projects/Nobevra/web-app/src/app/nfc/[serial]/route.ts';
if (fs.existsSync(route2)) {
  let c2 = fs.readFileSync(route2, 'utf8');
  c2 = c2.replace(/{ params }: { params: { serial: string } }/g, '{ params }: { params: Promise<{ serial: string }> }');
  c2 = c2.replace(/params\.serial/g, '(await params).serial');
  fs.writeFileSync(route2, c2);
}

let postEd = 'C:/Projects/Nobevra/web-app/src/components/features/cms/PostEditor.tsx';
if (fs.existsSync(postEd)) {
  let c3 = fs.readFileSync(postEd, 'utf8');
  if (!c3.includes("import { Editor }")) {
    c3 = c3.replace(/import { EditorContent, useEditor } from '@tiptap\/react';/, "import { EditorContent, useEditor } from '@tiptap/react';\nimport type { Editor } from '@tiptap/core';");
  }
  c3 = c3.replace(/err: unknown\)/g, 'err: any)');
  fs.writeFileSync(postEd, c3);
}

let seo = 'C:/Projects/Nobevra/web-app/src/components/features/cms/AISeoAnalyzer.tsx';
if (fs.existsSync(seo)) {
  let c4 = fs.readFileSync(seo, 'utf8');
  c4 = c4.replace(/err: unknown\)/g, 'err: any)');
  fs.writeFileSync(seo, c4);
}

let soc = 'C:/Projects/Nobevra/web-app/src/components/features/cms/SocialPublishModal.tsx';
if (fs.existsSync(soc)) {
  let c5 = fs.readFileSync(soc, 'utf8');
  c5 = c5.replace(/err: unknown\)/g, 'err: any)');
  fs.writeFileSync(soc, c5);
}

['CTABlock.tsx', 'NoticeBlock.tsx', 'PricingTableBlock.tsx'].forEach(file => {
  let p = 'C:/Projects/Nobevra/web-app/src/components/features/cms/extensions/' + file;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    if (!c.includes('NodeViewProps')) {
        c = c.replace(/from '@tiptap\/react';/, "from '@tiptap/react';\nimport { NodeViewProps } from '@tiptap/react';");
    }
    fs.writeFileSync(p, c);
  }
});

let blog = 'C:/Projects/Nobevra/web-app/src/app/(public)/blog/[slug]/page.tsx';
if (fs.existsSync(blog)) {
  let c6 = fs.readFileSync(blog, 'utf8');
  c6 = c6.replace(/\{ node, ordered, children, \.\.\.props \}/g, '{ node, children, ...props }');
  c6 = c6.replace(/\{ node, inline, children, \.\.\.props \}/g, '{ node, children, ...props }');
  c6 = c6.replace(/src={src \|\| ""}/g, 'src={(src as string) || ""}');
  fs.writeFileSync(blog, c6);
}

console.log('Fixed TS errors');
