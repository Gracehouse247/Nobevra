const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/fix') {
        const zipFile = 'frontend_deployment_v2.zip';
        const zipPath = path.join(process.cwd(), zipFile);

        if (!fs.existsSync(zipPath)) {
            res.setHeader('Content-Type', 'text/html');
            return res.end(`<h2>Error!</h2><p>Could not find ${zipFile} in ${process.cwd()}. Please upload it first.</p>`);
        }

        exec(`unzip -o ${zipFile}`, (error, stdout, stderr) => {
            res.setHeader('Content-Type', 'text/html');
            if (error) {
                return res.end(`
                    <h2>Extraction Failed</h2>
                    <pre style="background: #f8d7da; padding: 10px; border: 1px solid #f5c6cb;">${stderr || error.message}</pre>
                    <p>Try running it again or contact support.</p>
                    <a href="/">Go Back</a>
                `);
            }
            res.end(`
                <h2>Success!</h2>
                <pre style="background: #d4edda; padding: 10px; border: 1px solid #c3e6cb;">${stdout}</pre>
                <p>Extraction complete. Please visit /system-check to verify the heartbeat.</p>
                <a href="/">Go Back</a>
            `);
        });
    } else if (req.url === '/system-check') {
        res.setHeader('Content-Type', 'application/json');
        const results = {
            status: 'online',
            cwd: process.cwd(),
            nextBuildExists: fs.existsSync(path.join(process.cwd(), '.next')),
            nodeVersion: process.version,
            managePageExists: fs.existsSync(path.join(process.cwd(), '.next/server/app/(user)/pro/manage/page.js'))
        };
        res.end(JSON.stringify(results, null, 2));
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <html>
                <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                    <h1>NobleMind Production Fix Tool</h1>
                    <p>Click the button below to force a high-reliability extraction of your production build.</p>
                    <form action="/fix" method="GET">
                        <button type="submit" style="background: #007bff; color: white; border: none; padding: 15px 30px; font-size: 16px; border-radius: 5px; cursor: pointer;">
                            Fix Production Paths
                        </button>
                    </form>
                    <div style="margin-top: 30px; color: #666;">
                        Current Dir: ${process.cwd()}
                    </div>
                </body>
            </html>
        `);
    }
});

server.listen(port, () => {
    console.log(`Fix tool listening on port ${port}`);
});
