const fs = require('fs');

const API_KEY = 'c355cd7c9ff40a3bce7af5235b2391e71370ec2128242f1e4ff02bdc32b984d3';

const pages = [
  { page: 'Home (/)', keyword: 'invoice generator program' },
  { page: 'About (/about)', keyword: 'invoice maker app free' },
  { page: 'Pricing (/pricing)', keyword: 'how much does invoicing software cost?' },
  { page: 'Contact (/contact)', keyword: 'where to make business cards?' },
  { page: 'Login/Register', keyword: 'is there an app for making invoices?' },
  { page: 'invoice-generator', keyword: 'how to make an invoice for free?' },
  { page: 'client-portal', keyword: 'billing software online' },
  { page: 'digital-business-cards', keyword: 'business card creation free' },
  { page: 'crm-engine', keyword: 'what is invoicing software?' },
  { page: 'inventory-hub', keyword: 'invoice generator shopify' },
  { page: 'settlements', keyword: 'what is the best free invoice app?' },
  { page: 'qr-business-cards', keyword: 'how to generate a qr code?' },
  { page: 'expense-manager', keyword: 'how to make an invoice on my phone?' },
  { page: 'team-workspace', keyword: 'what is the best invoice maker?' },
  { page: 'ai-voice-assistant', keyword: 'ai invoice generator' },
  { page: 'products-services', keyword: 'how to make a proforma invoice?' },
  { page: 'professional-identity', keyword: 'how to create a business card for free?' },
  { page: 'lead-intelligence', keyword: 'how to make a QR code for a website?' },
  { page: 'enterprise-scaling', keyword: 'automated invoicing software' },
  { page: 'growth-reports', keyword: 'how do I make an invoice?' }
];

async function fetchKeywords() {
  const results = [];
  
  for (const item of pages) {
    try {
      console.log(`Fetching for: ${item.keyword}`);
      const res = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(item.keyword)}&api_key=${API_KEY}`);
      const data = await res.json();
      
      let semantic = [];
      if (data.related_searches) {
        semantic = data.related_searches.map(s => s.query).slice(0, 10);
      } else if (data.related_questions) {
        semantic = data.related_questions.map(q => q.question).slice(0, 10);
      }
      
      // Fallback if API doesn't return enough semantic keywords
      if (semantic.length === 0) {
        semantic = [
            `${item.keyword} tool`,
            `${item.keyword} software`,
            `best ${item.keyword}`,
            `${item.keyword} online`,
            `${item.keyword} for small business`
        ];
      }
      
      results.push({
        page: item.page,
        focus_keyword: item.keyword,
        semantic_keywords: semantic
      });
      
    } catch (e) {
      console.error(e);
    }
  }
  
  fs.writeFileSync('c:\\Projects\\NobleInvoice Web App Project\\web-app\\serp_results.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

fetchKeywords();
