import PDFDocument from 'pdfkit';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit';

// Brand colors
const BRAND_BLUE = '#166FBB';
const NEAR_BLACK = '#0D0D0D';
const SLATE_50 = '#F8FAFC';
const SLATE_200 = '#E2E8F0';
const SLATE_400 = '#94A3B8';
const SLATE_600 = '#475569';
const SLATE_900 = '#0F172A';
const SUCCESS_GREEN = '#10B981';

export async function GET(req: NextRequest) {
  // ── Auth Gate ──────────────────────────────────────────────────────
  const supabaseResponse = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // ── Rate Limiting (10 PDF downloads per minute per user) ──────────
  const { allowed, resetMs } = await rateLimit(`proforma-dl:${user.id}`, 10, 60_000);
  if (!allowed) return rateLimitResponse(resetMs);

  // ── Build PDF ──────────────────────────────────────────────────────
  const chunks: Buffer[] = [];
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    info: {
      Title: 'NobleInvoice — Proforma Invoice Template',
      Author: 'NobleInvoice',
      Subject: 'Professional Proforma Invoice Template',
      Keywords: 'proforma invoice template, business invoice',
    },
  });

  doc.on('data', (chunk: Buffer) => chunks.push(chunk));

  await new Promise<void>((resolve, reject) => {
    doc.on('end', resolve);
    doc.on('error', reject);

    const W = 595.28; // A4 width in pts
    const H = 841.89; // A4 height in pts
    const margin = 40;
    const contentW = W - margin * 2;

    // ── HEADER BAND ──────────────────────────────────────────────
    doc.rect(0, 0, W, 110).fill(BRAND_BLUE);

    // Subtle diagonal stripe accent
    doc.save();
    doc.rect(0, 0, W, 110).clip();
    doc.fillOpacity(0.06);
    doc.strokeOpacity(0.06);
    for (let i = -10; i < 20; i++) {
      doc.moveTo(W - i * 40, 0).lineTo(W - i * 40 + 200, 110).stroke('#FFFFFF');
    }
    doc.fillOpacity(1);
    doc.strokeOpacity(1);
    doc.restore();

    // Company name / logo area
    doc.fontSize(22).font('Helvetica-Bold').fillColor('#FFFFFF')
      .text('NobleInvoice', margin, 32, { lineBreak: false });

    doc.fontSize(8).font('Helvetica').fillColor('rgba(255,255,255,0.65)')
      .text('www.nobleinvoice.com', margin, 58, { lineBreak: false });

    // PROFORMA INVOICE label (right side)
    doc.fontSize(9).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.55)')
      .text('PROFORMA INVOICE', 0, 36, { align: 'right', width: W - margin, lineBreak: false });

    doc.fontSize(22).font('Helvetica-Bold').fillColor('#FFFFFF')
      .text('NOT A DEMAND FOR PAYMENT', 0, 54, { align: 'right', width: W - margin, lineBreak: false });

    // ── INVOICE META BAR ─────────────────────────────────────────
    doc.rect(0, 110, W, 48).fill('#F0F7FF');

    const metaY = 124;
    const metaFields = [
      { label: 'Invoice No.', value: 'PRF-0001' },
      { label: 'Issue Date', value: '__ / __ / ____' },
      { label: 'Valid Until', value: '__ / __ / ____' },
      { label: 'Currency', value: 'USD  ▾' },
    ];
    const metaColW = contentW / metaFields.length;

    metaFields.forEach((field, i) => {
      const x = margin + i * metaColW;
      doc.fontSize(7).font('Helvetica-Bold').fillColor(BRAND_BLUE)
        .text(field.label.toUpperCase(), x, metaY, { width: metaColW - 10, lineBreak: false });
      doc.fontSize(10).font('Helvetica').fillColor(SLATE_900)
        .text(field.value, x, metaY + 13, { width: metaColW - 10, lineBreak: false });
    });

    // ── DIVIDER ───────────────────────────────────────────────────
    let y = 170;

    // ── FROM / TO SECTION ─────────────────────────────────────────
    const colW = contentW / 2 - 16;

    // FROM box
    doc.roundedRect(margin, y, colW, 130, 6).fillAndStroke('#F8FAFC', SLATE_200);
    doc.fontSize(7).font('Helvetica-Bold').fillColor(BRAND_BLUE)
      .text('FROM (SELLER)', margin + 14, y + 14);
    const fromLines = [
      { label: 'Business Name', w: colW - 28 },
      { label: 'Address Line 1', w: colW - 28 },
      { label: 'City, State / Country', w: colW - 28 },
      { label: 'Tax / VAT Number', w: (colW - 36) / 2 },
      { label: 'Phone Number', w: (colW - 36) / 2 },
      { label: 'Email Address', w: colW - 28 },
    ];
    let fy = y + 30;
    fromLines.forEach((line, i) => {
      const lx = i === 3 ? margin + 14 : i === 4 ? margin + 14 + (colW - 36) / 2 + 8 : margin + 14;
      if (i <= 2 || i === 5) {
        doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(line.label, lx, fy, { width: line.w });
        doc.rect(lx, fy + 10, line.w, 0.5).fill(SLATE_200);
        fy += 22;
      } else if (i === 3) {
        doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(line.label, lx, fy, { width: line.w });
        doc.rect(lx, fy + 10, line.w, 0.5).fill(SLATE_200);
      } else if (i === 4) {
        doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(line.label, lx, fy, { width: line.w });
        doc.rect(lx, fy + 10, line.w, 0.5).fill(SLATE_200);
        fy += 22;
      }
    });

    // TO box
    const toX = margin + colW + 32;
    doc.roundedRect(toX, y, colW, 130, 6).fillAndStroke('#F0F7FF', '#BFDBFE');
    doc.fontSize(7).font('Helvetica-Bold').fillColor(BRAND_BLUE)
      .text('BILL TO (BUYER)', toX + 14, y + 14);
    let ty = y + 30;
    fromLines.forEach((line, i) => {
      const lx = i === 3 ? toX + 14 : i === 4 ? toX + 14 + (colW - 36) / 2 + 8 : toX + 14;
      if (i <= 2 || i === 5) {
        doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(line.label, lx, ty, { width: line.w });
        doc.rect(lx, ty + 10, line.w, 0.5).fill('#93C5FD');
        ty += 22;
      } else if (i === 3) {
        doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(line.label, lx, ty, { width: line.w });
        doc.rect(lx, ty + 10, line.w, 0.5).fill('#93C5FD');
      } else if (i === 4) {
        doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(line.label, lx, ty, { width: line.w });
        doc.rect(lx, ty + 10, line.w, 0.5).fill('#93C5FD');
        ty += 22;
      }
    });

    y += 148;

    // ── LINE ITEMS TABLE ─────────────────────────────────────────
    // Table header
    const cols = [
      { label: '#', x: margin, w: 24 },
      { label: 'Description of Goods / Services', x: margin + 24, w: 210 },
      { label: 'Qty', x: margin + 234, w: 44 },
      { label: 'Unit', x: margin + 278, w: 50 },
      { label: 'Unit Price', x: margin + 328, w: 76 },
      { label: 'Tax %', x: margin + 404, w: 52 },
      { label: 'Amount', x: margin + 456, w: contentW - 456 },
    ];

    doc.rect(margin, y, contentW, 22).fill(NEAR_BLACK);
    cols.forEach(col => {
      doc.fontSize(7).font('Helvetica-Bold').fillColor('#FFFFFF')
        .text(col.label, col.x + 4, y + 7, { width: col.w - 8, align: col.label === 'Amount' || col.label === 'Unit Price' || col.label === 'Tax %' ? 'right' : 'left', lineBreak: false });
    });
    y += 22;

    // 8 empty rows
    for (let row = 0; row < 8; row++) {
      const rowBg = row % 2 === 0 ? '#FFFFFF' : SLATE_50;
      doc.rect(margin, y, contentW, 22).fill(rowBg);

      // Row number
      doc.fontSize(8).font('Helvetica').fillColor(SLATE_400)
        .text(String(row + 1), margin + 4, y + 7, { width: 20, align: 'center', lineBreak: false });

      // Dashed line fields
      cols.slice(1).forEach(col => {
        doc.moveTo(col.x + 4, y + 16).lineTo(col.x + col.w - 8, y + 16)
          .dash(2, { space: 2 }).strokeColor(SLATE_200).lineWidth(0.5).stroke();
        doc.undash();
      });

      // Row separator
      doc.rect(margin, y + 21, contentW, 0.5).fill(SLATE_200);
      y += 22;
    }

    // ── TOTALS SECTION ───────────────────────────────────────────
    y += 10;
    const totalsX = margin + contentW - 220;
    const totalsW = 220;

    const totalsRows = [
      { label: 'Subtotal', value: '$ ___________', bold: false },
      { label: 'Discount', value: '($ __________)', bold: false },
      { label: 'Shipping / Handling', value: '$ ___________', bold: false },
      { label: 'Tax / VAT', value: '$ ___________', bold: false },
    ];

    totalsRows.forEach(row => {
      doc.fontSize(8).font('Helvetica').fillColor(SLATE_600)
        .text(row.label, totalsX, y, { width: 110, lineBreak: false });
      doc.fontSize(8).font('Helvetica').fillColor(SLATE_900)
        .text(row.value, totalsX + 110, y, { width: 110, align: 'right', lineBreak: false });
      y += 16;
    });

    doc.rect(totalsX, y, totalsW, 0.5).fill(SLATE_400);
    y += 8;

    // Total row
    doc.roundedRect(totalsX - 4, y - 4, totalsW + 8, 28, 4).fill(BRAND_BLUE);
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#FFFFFF')
      .text('TOTAL DUE', totalsX, y + 5, { width: 100, lineBreak: false });
    doc.fontSize(13).font('Helvetica-Bold').fillColor('#FFFFFF')
      .text('$ ___________', totalsX + 100, y + 3, { width: 116, align: 'right', lineBreak: false });
    y += 36;

    // ── TERMS & NOTES ────────────────────────────────────────────
    y += 10;
    const halfW = (contentW - 16) / 2;

    // Payment Terms
    doc.roundedRect(margin, y, halfW, 70, 6).fillAndStroke(SLATE_50, SLATE_200);
    doc.fontSize(7).font('Helvetica-Bold').fillColor(BRAND_BLUE)
      .text('PAYMENT TERMS', margin + 12, y + 12);
    const terms = ['Bank Transfer', 'Credit Card', 'PayPal', 'Other: ________'];
    terms.forEach((term, i) => {
      const tx = margin + 12 + (i % 2) * (halfW / 2 - 12);
      const ty2 = y + 26 + Math.floor(i / 2) * 16;
      doc.rect(tx, ty2 + 1, 8, 8).stroke(SLATE_400);
      doc.fontSize(7.5).font('Helvetica').fillColor(SLATE_600).text(term, tx + 12, ty2, { lineBreak: false });
    });

    // Notes
    const notesX = margin + halfW + 16;
    doc.roundedRect(notesX, y, halfW, 70, 6).fillAndStroke(SLATE_50, SLATE_200);
    doc.fontSize(7).font('Helvetica-Bold').fillColor(BRAND_BLUE)
      .text('NOTES & SPECIAL INSTRUCTIONS', notesX + 12, y + 12);
    doc.fontSize(7.5).font('Helvetica').fillColor(SLATE_400)
      .text('(e.g. delivery schedule, special conditions, etc.)', notesX + 12, y + 26, { width: halfW - 24, lineBreak: false });
    // Lined paper effect
    for (let l = 0; l < 2; l++) {
      doc.moveTo(notesX + 12, y + 44 + l * 14).lineTo(notesX + halfW - 12, y + 44 + l * 14)
        .dash(2, { space: 2 }).strokeColor(SLATE_200).lineWidth(0.5).stroke().undash();
    }

    y += 88;

    // ── BANK DETAILS ─────────────────────────────────────────────
    doc.roundedRect(margin, y, contentW, 58, 6).fillAndStroke('#EFF6FF', '#BFDBFE');
    doc.fontSize(7).font('Helvetica-Bold').fillColor(BRAND_BLUE)
      .text('BANK / PAYMENT DETAILS', margin + 14, y + 12);

    const bankFields = [
      { label: 'Bank Name', w: 120 },
      { label: 'Account Name', w: 140 },
      { label: 'Account No.', w: 120 },
      { label: 'Routing / SWIFT', w: 120 },
    ];
    let bx = margin + 14;
    bankFields.forEach(field => {
      doc.fontSize(7).font('Helvetica').fillColor(SLATE_400).text(field.label, bx, y + 26, { width: field.w, lineBreak: false });
      doc.rect(bx, y + 38, field.w - 8, 0.5).fill('#93C5FD');
      bx += field.w + 10;
    });

    y += 76;

    // ── SIGNATURE LINE ───────────────────────────────────────────
    const sigColW = (contentW - 32) / 3;
    ['Prepared By', 'Approved By', 'Client Acknowledgement'].forEach((label, i) => {
      const sx = margin + i * (sigColW + 16);
      doc.fontSize(7).font('Helvetica-Bold').fillColor(SLATE_600).text(label, sx, y);
      doc.moveTo(sx, y + 28).lineTo(sx + sigColW - 4, y + 28).strokeColor(SLATE_400).lineWidth(0.5).stroke();
      doc.fontSize(7).font('Helvetica').fillColor(SLATE_400)
        .text('Signature & Stamp', sx, y + 32, { width: sigColW - 4, lineBreak: false });
    });
    y += 52;

    // ── FOOTER ───────────────────────────────────────────────────
    const footerY = H - 44;
    doc.rect(0, footerY, W, 44).fill(NEAR_BLACK);

    doc.fontSize(8).font('Helvetica-Bold').fillColor('#FFFFFF')
      .text('Generated with NobleInvoice', margin, footerY + 10, { lineBreak: false });
    doc.fontSize(7).font('Helvetica').fillColor('rgba(255,255,255,0.45)')
      .text('This document is a proforma invoice and does NOT constitute a legally binding demand for payment.', margin, footerY + 24, { width: contentW - 120, lineBreak: false });
    doc.fontSize(8).font('Helvetica-Bold').fillColor(BRAND_BLUE)
      .text('www.nobleinvoice.com', 0, footerY + 14, { align: 'right', width: W - margin, lineBreak: false });

    doc.end();
  });

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="NobleInvoice-Proforma-Template.pdf"',
      'Content-Length': pdfBuffer.length.toString(),
      'Cache-Control': 'no-store',
    },
  });
}
