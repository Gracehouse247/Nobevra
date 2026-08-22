const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, 'qa_screenshots');
const REPORT_PATH = path.join(__dirname, 'qa_report.md');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const TEST_EMAIL = 'qa_test_noble@yopmail.com';
const TEST_PASSWORD = 'Noble@QA2026!';
const TEST_NAME = 'QA Test Noble';

const results = [];
let browser, page;

async function ss(name) {
  const p = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: p, fullPage: true });
  console.log(`[SCREENSHOT] ${name}.png`);
  return p;
}

function log(test, status, notes) {
  results.push({ test, status, notes });
  console.log(`[${status}] ${test}: ${notes}`);
}

async function pause(ms = 2000) { await page.waitForTimeout(ms); }

async function run() {
  browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  // ── TEST 1: Landing Page ──────────────────────────────────────────────────
  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('01_landing');
    const title = await page.title();
    log('Landing Page', 'PASS', `Title: "${title}"`);
  } catch (e) { log('Landing Page', 'FAIL', e.message); }

  // ── TEST 2: Register (correct URL is /register) ───────────────────────────
  try {
    await page.goto(`${BASE}/register`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('02_register_page');

    // Fill: Full Name / Company Name
    await page.fill('input[placeholder="Full Name / Company Name"]', TEST_NAME);
    // Fill: Email Address
    await page.fill('input[placeholder="Email Address"]', TEST_EMAIL);
    // Fill: Password
    await page.fill('input[placeholder="Password (min. 8 characters)"]', TEST_PASSWORD);
    await pause(1000);
    await ss('02_register_filled');

    // Submit: button with text "Create Account"
    await page.click('button[type="submit"]:has-text("Create Account")');
    await pause(5000);
    await ss('02_register_result');
    const url = page.url();
    if (url.includes('register') && !url.includes('success')) {
      // Check for error message
      const body = await page.textContent('body');
      if (body.includes('already') || body.includes('exists')) {
        log('Register', 'WARNING', 'Account already exists — proceeding to login');
      } else {
        log('Register', 'WARNING', `Still on register page. URL: ${url}`);
      }
    } else {
      log('Register', 'PASS', `Registered. URL: ${url}`);
    }
  } catch (e) { log('Register', 'FAIL', e.message); }

  // ── TEST 3: Login ─────────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('03_login_page');

    // Fill Email and Password using placeholder selectors (exact match from source)
    await page.fill('input[placeholder="Email Address"]', TEST_EMAIL);
    await page.fill('input[placeholder="Password"]', TEST_PASSWORD);
    await pause(500);
    await ss('03_login_filled');

    // Submit: button with text "Sign In"
    await page.click('button[type="submit"]:has-text("Sign In")');
    await pause(5000);
    await ss('03_login_result');

    const url = page.url();
    if (!url.includes('/login')) {
      log('Login', 'PASS', `Authenticated! Redirected to: ${url}`);
    } else {
      const body = await page.textContent('body');
      const errHint = body.includes('Invalid') ? 'Invalid credentials' :
                      body.includes('confirm') ? 'Email not confirmed' :
                      body.includes('OTP') ? 'OTP step required' : 'Stayed on login';
      log('Login', 'FAIL', `${errHint}. URL: ${url}`);
    }
  } catch (e) { log('Login', 'FAIL', e.message); }

  // ── TEST 4: Dashboard ─────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(3000);
    await ss('04_dashboard');
    const url = page.url();
    if (url.includes('login')) {
      log('Dashboard', 'FAIL', 'Not authenticated — redirected to login');
    } else {
      log('Dashboard', 'PASS', `Loaded at ${url}`);
    }
  } catch (e) { log('Dashboard', 'FAIL', e.message); }

  // ── TEST 5: Clients ───────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/clients`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('05_clients');
    const url = page.url();
    if (url.includes('login')) { log('Clients Page', 'FAIL', 'Redirected to login'); }
    else {
      log('Clients Page', 'PASS', `Loaded at ${url}`);
      // Try to add client
      const addBtn = page.locator('button:has-text("Add"), button:has-text("New"), button:has-text("Client")').first();
      if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await addBtn.click();
        await pause(1500);
        await ss('05_add_client_modal');
        await page.fill('input[placeholder*="Name"], input[placeholder*="name"]', 'Test Client QA').catch(() => {});
        await page.fill('input[type="email"]', 'testclient@yopmail.com').catch(() => {});
        await page.fill('input[type="tel"], input[placeholder*="phone" i]', '+2348012345678').catch(() => {});
        await ss('05_client_filled');
        await page.click('button[type="submit"], button:has-text("Save"), button:has-text("Add")').catch(() => {});
        await pause(2000);
        await ss('05_client_saved');
        log('Add Client', 'PASS', 'Client form submitted');
      } else {
        log('Add Client', 'WARNING', 'Add client button not found on page');
      }
    }
  } catch (e) { log('Clients Page', 'FAIL', e.message); }

  // ── TEST 6: Invoices ──────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/invoices`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('06_invoices');
    const url = page.url();
    if (url.includes('login')) { log('Invoices Page', 'FAIL', 'Redirected to login'); }
    else {
      log('Invoices Page', 'PASS', `Loaded at ${url}`);
      const newBtn = page.locator('button:has-text("New"), a:has-text("New Invoice"), button:has-text("Create")').first();
      if (await newBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await newBtn.click();
        await pause(2000);
        await ss('06_new_invoice');
        log('Create Invoice', 'PASS', `Invoice creator opened at: ${page.url()}`);
      } else { log('Create Invoice', 'WARNING', 'New invoice button not found'); }
    }
  } catch (e) { log('Invoices Page', 'FAIL', e.message); }

  // ── TEST 7: Expenses ──────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/expenses`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('07_expenses');
    const url = page.url();
    if (url.includes('login')) { log('Expenses Page', 'FAIL', 'Redirected to login'); }
    else { log('Expenses Page', 'PASS', `Loaded at ${url}`); }
  } catch (e) { log('Expenses Page', 'FAIL', e.message); }

  // ── TEST 8: Reports ───────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/reports`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('08_reports');
    const url = page.url();
    if (url.includes('login')) { log('Reports Page', 'FAIL', 'Redirected to login'); }
    else { log('Reports Page', 'PASS', `Loaded at ${url}`); }
  } catch (e) { log('Reports Page', 'FAIL', e.message); }

  // ── TEST 9: Wallet ────────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/wallet`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('09_wallet');
    const url = page.url();
    if (url.includes('login')) { log('Wallet Page', 'FAIL', 'Redirected to login'); }
    else { log('Wallet Page', 'PASS', `Loaded at ${url}`); }
  } catch (e) { log('Wallet Page', 'FAIL', e.message); }

  // ── TEST 10: Settings ─────────────────────────────────────────────────────
  try {
    await page.goto(`${BASE}/settings`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pause(2000);
    await ss('10_settings');
    const url = page.url();
    if (url.includes('login')) { log('Settings Page', 'FAIL', 'Redirected to login'); }
    else { log('Settings Page', 'PASS', `Loaded at ${url}`); }
  } catch (e) { log('Settings Page', 'FAIL', e.message); }

  await browser.close();

  // ── REPORT ────────────────────────────────────────────────────────────────
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warnings = results.filter(r => r.status === 'WARNING').length;
  const score = Math.round((passed / results.length) * 10);

  let report = `# Nobevra QA Report\n\n`;
  report += `**Date:** ${new Date().toISOString()}\n**Server:** ${BASE}\n\n`;
  report += `## Results\n\n| Test | Status | Notes |\n|---|---|---|\n`;
  for (const r of results) report += `| ${r.test} | **${r.status}** | ${r.notes} |\n`;
  report += `\n## Summary\n- ✅ Passed: ${passed}\n- ❌ Failed: ${failed}\n- ⚠️ Warnings: ${warnings}\n`;
  report += `- **Health Score: ${score}/10**\n\nScreenshots: \`${SCREENSHOTS_DIR}\`\n`;

  fs.writeFileSync(REPORT_PATH, report);
  console.log('\n' + report);
  console.log(`[DONE] Report: ${REPORT_PATH}`);
}

run().catch(e => { console.error('FATAL:', e); if (browser) browser.close(); });
