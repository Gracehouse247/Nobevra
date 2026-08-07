const fs = require('fs');
const file = 'C:/Projects/NobleInvoice/web-app/src/app/(public)/blog/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import ReactMarkdown from 'react-markdown';",
  "import ReactMarkdown, { Components } from 'react-markdown';\nimport Image from 'next/image';"
);

content = content.replace(
  "const markdownComponents: any = {",
  "const markdownComponents: Components = {"
);

content = content.replace(/:\s*any\s*\)\s*=>/g, ') =>');

content = content.replace(
  '<img src={src} alt={alt} className="w-full object-cover" loading="lazy" {...props} />',
  '<Image src={src || ""} alt={alt || ""} width={1200} height={600} className="w-full object-cover" loading="lazy" />'
);

content = content.replace(
  /<img\s*\n\s*src={getImageUrl\(post\.featured_image_url\) as string}\s*\n\s*alt={post\.title}\s*\n\s*className="w-full h-full object-cover" \/>/g,
  '<Image src={getImageUrl(post.featured_image_url) as string} alt={post.title} width={1200} height={675} className="w-full h-full object-cover" />'
);

content = content.replace(
  /<img src={getImageUrl\(related\.featured_image_url\) as string} alt={related\.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" \/>/g,
  '<Image src={getImageUrl(related.featured_image_url) as string} alt={related.title} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />'
);

fs.writeFileSync(file, content);
console.log('Fixed');
