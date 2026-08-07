const fs = require('fs');
const files = [
  'c:/Projects/NobleInvoice Web App Project/web-app/src/app/(public)/features/best-free-invoice-app/page.tsx',
  'c:/Projects/NobleInvoice Web App Project/web-app/src/app/(public)/features/how-to-make-an-invoice-on-my-phone/page.tsx'
];

const H1 = 'text-[30px] md:text-[50px] leading-[1.05] tracking-tight font-black text-slate-900';
const H2 = 'text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight';
const H3 = 'text-2xl font-black tracking-tight';
const H4 = 'text-xl font-black tracking-tight text-slate-900';
const H5 = 'text-lg font-black tracking-tight text-slate-900';
const H6 = 'text-base font-black tracking-tight text-slate-900';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace h1
  content = content.replace(/<h1([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h1>/gis, (match, before, p1, after, p2) => {
    let classes = p1;
    classes = classes.replace(/text-[^\s]+(\s|$)/g, '').replace(/md:text-[^\s]+(\s|$)/g, '').replace(/lg:text-[^\s]+(\s|$)/g, '');
    classes = classes.replace(/leading-[^\s]+(\s|$)/g, '').replace(/tracking-[^\s]+(\s|$)/g, '').replace(/font-[^\s]+(\s|$)/g, '');
    let newClasses = (H1 + ' ' + classes.trim()).trim();
    return `<h1${before}className="${newClasses}"${after}>${p2}</h1>`;
  });

  // Replace h2
  content = content.replace(/<h2([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h2>/gis, (match, before, p1, after, p2) => {
    let classes = p1;
    classes = classes.replace(/text-[^\s]+(\s|$)/g, '').replace(/md:text-[^\s]+(\s|$)/g, '').replace(/lg:text-[^\s]+(\s|$)/g, '');
    classes = classes.replace(/leading-[^\s]+(\s|$)/g, '').replace(/tracking-[^\s]+(\s|$)/g, '').replace(/font-[^\s]+(\s|$)/g, '');
    let newClasses = (H2 + ' ' + classes.trim()).trim();
    return `<h2${before}className="${newClasses}"${after}>${p2}</h2>`;
  });

  // Replace h3
  content = content.replace(/<h3([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h3>/gis, (match, before, p1, after, p2) => {
    let classes = p1;
    classes = classes.replace(/text-[^\s]+(\s|$)/g, '').replace(/md:text-[^\s]+(\s|$)/g, '').replace(/lg:text-[^\s]+(\s|$)/g, '');
    classes = classes.replace(/leading-[^\s]+(\s|$)/g, '').replace(/tracking-[^\s]+(\s|$)/g, '').replace(/font-[^\s]+(\s|$)/g, '');
    let newClasses = (H3 + ' ' + classes.trim()).trim();
    return `<h3${before}className="${newClasses}"${after}>${p2}</h3>`;
  });

  // Replace h4
  content = content.replace(/<h4([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h4>/gis, (match, before, p1, after, p2) => {
    let classes = p1;
    classes = classes.replace(/text-[^\s]+(\s|$)/g, '').replace(/md:text-[^\s]+(\s|$)/g, '').replace(/lg:text-[^\s]+(\s|$)/g, '');
    classes = classes.replace(/leading-[^\s]+(\s|$)/g, '').replace(/tracking-[^\s]+(\s|$)/g, '').replace(/font-[^\s]+(\s|$)/g, '');
    let newClasses = (H4 + ' ' + classes.trim()).trim();
    return `<h4${before}className="${newClasses}"${after}>${p2}</h4>`;
  });

  fs.writeFileSync(file, content);
});
