# NobleInvoice QA Report

**Date:** 2026-07-31T07:00:15.676Z
**Server:** http://localhost:3000

## Results

| Test | Status | Notes |
|---|---|---|
| Landing Page | **PASS** | Title: "Invoice Software Small Business | NobleInvoice" |
| Register | **WARNING** | Still on register page. URL: http://localhost:3000/register |
| Login | **FAIL** | Stayed on login. URL: http://localhost:3000/login |
| Dashboard | **FAIL** | Not authenticated — redirected to login |
| Clients Page | **FAIL** | Redirected to login |
| Invoices Page | **FAIL** | Redirected to login |
| Expenses Page | **FAIL** | Redirected to login |
| Reports Page | **FAIL** | Redirected to login |
| Wallet Page | **FAIL** | Redirected to login |
| Settings Page | **FAIL** | Redirected to login |

## Summary
- ✅ Passed: 1
- ❌ Failed: 8
- ⚠️ Warnings: 1
- **Health Score: 1/10**

Screenshots: `C:\Projects\NobleInvoice\web-app\qa_screenshots`
