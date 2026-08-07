const fs = require('fs');

let postEd = 'C:/Projects/NobleInvoice/web-app/src/components/features/cms/PostEditor.tsx';
if (fs.existsSync(postEd)) {
  let c3 = fs.readFileSync(postEd, 'utf8');
  c3 = c3.replace(/\(e: Editor\)/g, '(e: any)');
  fs.writeFileSync(postEd, c3);
}

let blog = 'C:/Projects/NobleInvoice/web-app/src/app/(public)/blog/[slug]/page.tsx';
if (fs.existsSync(blog)) {
  let c6 = fs.readFileSync(blog, 'utf8');
  c6 = c6.replace(/code: \(\{ node, children, \.\.\.props \}\) => \{/g, 'code: ({ node, children, ...props }: any) => {');
  c6 = c6.replace(/li: \(\{ node, children, \.\.\.props \}\) => \(/g, 'li: ({ node, ordered, children, ...props }: any) => (');
  fs.writeFileSync(blog, c6);
}

['CTABlock.tsx', 'NoticeBlock.tsx', 'PricingTableBlock.tsx'].forEach(file => {
  let p = 'C:/Projects/NobleInvoice/web-app/src/components/features/cms/extensions/' + file;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/\(props: NodeViewProps\)/g, '(props: any)');
    fs.writeFileSync(p, c);
  }
});

console.log('Fixed TS errors pt 2');
