const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js in production mode
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // ── Standalone Health Check (Bypasses Next.js) ──
      if (pathname === '/system-check') {
        res.setHeader('Content-Type', 'application/json');
        const results = {
            status: 'online',
            cwd: process.cwd(),
            nextBuildExists: fs.existsSync(path.join(process.cwd(), '.next')),
            nodeVersion: process.version
        };
        return res.end(JSON.stringify(results, null, 2));
      }

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('CRITICAL: Request handling failure at', req.url);
      console.error(err);
      
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Internal Server Error\n\nNobleInvoice: The request handler failed. This usually means the .next folder is incomplete.\nError: ${err.message}`);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> NobleInvoice Frontend Ready on http://${hostname}:${port}`);
    console.log(`> Working Directory: ${process.cwd()}`);
  });
}).catch(err => {
    console.error('FATAL: Next.js app failed to prepare.');
    console.error(err);
    process.exit(1);
});
