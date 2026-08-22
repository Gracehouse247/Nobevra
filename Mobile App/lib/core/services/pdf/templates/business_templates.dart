// lib/core/services/pdf/templates/business_templates.dart
import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/core/services/pdf/pdf_widgets.dart';

class BusinessTemplates {
  static pw.Widget minimalistAlphaTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.grey900);

    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Text(PdfWidgets.typeLabel(invoice.invoiceType).toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 8, letterSpacing: 2, color: brandColor)),
          pw.SizedBox(height: 8),
          pw.Text(biz.name, style: pw.TextStyle(font: bold, fontSize: 24, letterSpacing: -0.5)),
        ]),
        pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
          pw.Text('REF: #${invoice.id}', style: pw.TextStyle(font: bold, fontSize: 12)),
          pw.Text('DATE: ${PdfWidgets.fmt(invoice.issueDate)}', style: textStyle),
        ]),
      ]),
      pw.SizedBox(height: 60),
      pw.Text('BILL TO', style: pw.TextStyle(font: bold, fontSize: 8, letterSpacing: 1.5, color: PdfColors.grey500)),
      pw.SizedBox(height: 6),
      pw.Text(invoice.client.name, style: pw.TextStyle(font: bold, fontSize: 13)),
      pw.Text(invoice.client.email, style: textStyle.copyWith(color: PdfColors.grey700)),
      if (invoice.client.address != null) pw.Text(invoice.client.address!, style: textStyle.copyWith(color: PdfColors.grey700)),

      pw.SizedBox(height: 60),
      PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
      PdfWidgets.itemsTable(invoice, font, bold, PdfColors.black),
      pw.SizedBox(height: 40),
      pw.Align(alignment: pw.Alignment.centerRight, child: PdfWidgets.totalsBlock(invoice, font, bold, brandColor)),
      
      pw.SizedBox(height: 60), 

      if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[
        pw.Text('NOTES', style: pw.TextStyle(font: bold, fontSize: 8, letterSpacing: 1.5, color: PdfColors.grey500)),
        pw.SizedBox(height: 4),
        pw.Text(invoice.notes!, style: textStyle.copyWith(lineSpacing: 4)),
        pw.SizedBox(height: 40),
      ],
      PdfWidgets.paymentButton(invoice, brandColor),
      PdfWidgets.signatureBlock(invoice, font, bold),
      pw.Text(biz.footerText ?? 'Thank you for your business.', style: textStyle.copyWith(fontStyle: pw.FontStyle.italic, color: PdfColors.grey600)),
      pw.SizedBox(height: 24),
      PdfWidgets.buildPaymentDetails(biz, font, bold),
    ]);
  }

  static pw.Widget enterpriseStandardTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkAccent = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);
    final textStyle = pw.TextStyle(font: font, fontSize: 9);

    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Container(
        color: darkAccent,
        padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
          pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 14, color: PdfWidgets.getContrastColor(darkAccent), letterSpacing: 1)),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
            pw.Text(PdfWidgets.typeLabel(invoice.invoiceType).toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 10, color: brandColor)),
            pw.Text('No. ${invoice.id}', style: pw.TextStyle(font: font, fontSize: 10, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(darkAccent), 0.7))),
          ]),
        ]),
      ),
      pw.Container(
        color: PdfColors.grey100,
        padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        child: pw.Row(children: [
          _entInfoCol('Issued Date', PdfWidgets.fmt(invoice.issueDate), font, bold),
          pw.SizedBox(width: 40),
          _entInfoCol('Due Date', PdfWidgets.fmt(invoice.dueDate), font, bold),
          pw.SizedBox(width: 40),
          _entInfoCol('Currency', invoice.currencyCode, font, bold),
          if (biz.taxNumber != null) ...[
            pw.SizedBox(width: 40),
            _entInfoCol('VAT/TAX ID', biz.taxNumber!, font, bold),
          ],
        ]),
      ),
      pw.Padding(
        padding: const pw.EdgeInsets.all(24),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Text('BILLING INFORMATION', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.grey500)),
          pw.SizedBox(height: 8),
          pw.Text(invoice.client.name, style: pw.TextStyle(font: bold, fontSize: 12)),
          pw.Text(invoice.client.email, style: textStyle),
          if (invoice.client.address != null) pw.Text(invoice.client.address!, style: textStyle),

          pw.SizedBox(height: 32),
          PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
          PdfWidgets.itemsTable(invoice, font, bold, brandColor),
          pw.SizedBox(height: 24),
          pw.Align(alignment: pw.Alignment.centerRight, child: PdfWidgets.totalsBlock(invoice, font, bold, darkAccent)),
          pw.SizedBox(height: 40),
          if (invoice.notes != null) ...[
            pw.Text('TERMS & CONDITIONS', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.grey500)),
            pw.SizedBox(height: 4),
            pw.Text(invoice.notes!, style: textStyle.copyWith(color: PdfColors.grey700)),
          ],
          PdfWidgets.paymentButton(invoice, brandColor),
          PdfWidgets.signatureBlock(invoice, font, bold),
          pw.SizedBox(height: 40),
          pw.Divider(color: PdfColors.grey300),
          pw.SizedBox(height: 12),
          pw.Center(child: pw.Text(biz.footerText ?? 'Nobevra Invoice Distribution', style: textStyle.copyWith(color: PdfColors.grey500))),
          pw.SizedBox(height: 24),
          PdfWidgets.buildPaymentDetails(biz, font, bold),
        ]),
      ),
    ]);
  }

  static pw.Widget creativeBoldTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final textStyle = pw.TextStyle(font: font, fontSize: 10);

    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Container(
        width: double.infinity,
        padding: const pw.EdgeInsets.all(32),
        decoration: pw.BoxDecoration(color: brandColor),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
            pw.Text(biz.name, style: pw.TextStyle(font: bold, fontSize: 22, color: PdfWidgets.getContrastColor(brandColor))),
            pw.Text(PdfWidgets.typeLabel(invoice.invoiceType).toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 10, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(brandColor), 0.7))),
          ]),
          pw.SizedBox(height: 32),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('BILLED TO', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(brandColor), 0.6))),
              pw.SizedBox(height: 4),
              pw.Text(invoice.client.name, style: pw.TextStyle(font: bold, fontSize: 16, color: PdfWidgets.getContrastColor(brandColor))),
              pw.Text(invoice.client.email, style: pw.TextStyle(font: font, fontSize: 11, color: PdfWidgets.getContrastColor(brandColor))),
            ]),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Text('TOTAL DUE', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(brandColor), 0.6))),
              pw.SizedBox(height: 4),
              pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 26, color: PdfWidgets.getContrastColor(brandColor))),
            ]),
          ]),
        ]),
      ),
      pw.Padding(padding: const pw.EdgeInsets.all(32), child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('INVOICE NO.', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.grey500)),
              pw.Text('#${invoice.id}', style: pw.TextStyle(font: bold, fontSize: 11)),
            ]),
            pw.SizedBox(width: 48),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('DATED', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.grey500)),
              pw.Text(PdfWidgets.fmt(invoice.issueDate), style: pw.TextStyle(font: bold, fontSize: 11)),
            ]),
        ]),
        pw.SizedBox(height: 32),
        PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),
        pw.SizedBox(height: 32),
        pw.Align(alignment: pw.Alignment.centerRight, child: PdfWidgets.totalsBlock(invoice, font, bold, brandColor)),
        pw.SizedBox(height: 48),
        pw.Text('THANKS FOR YOUR BUSINESS', style: pw.TextStyle(font: bold, fontSize: 10, color: brandColor, letterSpacing: 1)),
        pw.SizedBox(height: 8),
        pw.Text(biz.footerText ?? 'Looking forward to working with you again.', style: textStyle.copyWith(color: PdfColors.grey700)),
        pw.SizedBox(height: 12),
        PdfWidgets.paymentButton(invoice, brandColor),
      ])),
    ]);
  }

  static pw.Widget modernCurveTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    return pw.Stack(children: [
      pw.Positioned(
        top: -40, right: -40,
        child: pw.CustomPaint(
          size: const PdfPoint(400, 300),
          painter: (PdfGraphics canvas, PdfPoint size) {
            canvas.moveTo(0, 0);
            canvas.curveTo(40, 200, 150, 280, 400, 280);
            canvas.lineTo(400, 0);
            canvas.setFillColor(brandColor);
            canvas.fillPath();
          },
        ),
      ),
      pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.SizedBox(height: 20),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 100)
            else pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16, color: PdfWidgets.getContrastColor(brandColor))),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
            pw.Text(PdfWidgets.typeLabel(invoice.invoiceType).toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 36, color: PdfWidgets.getContrastColor(brandColor), letterSpacing: 2)),
            pw.Text('REF: #${invoice.id}', style: pw.TextStyle(font: font, fontSize: 14, color: PdfWidgets.getContrastColor(brandColor))),
          ]),
        ]),
        pw.SizedBox(height: 60),
        pw.Text('Invoice To :', style: pw.TextStyle(font: bold, fontSize: 16, color: brandColor)),
        pw.SizedBox(height: 8),
        pw.Text(invoice.client.name, style: pw.TextStyle(font: bold, fontSize: 11)),
        pw.Text(invoice.client.email, style: pw.TextStyle(font: font, fontSize: 10)),
        if (invoice.client.address != null) pw.Text(invoice.client.address!, style: pw.TextStyle(font: font, fontSize: 10)),
        pw.SizedBox(height: 32),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),
        pw.SizedBox(height: 32),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('Payment Method', style: pw.TextStyle(font: bold, fontSize: 14, color: brandColor)),
            pw.SizedBox(height: 12),
            PdfWidgets.buildPaymentDetails(biz, font, bold),
            pw.SizedBox(height: 32),
            pw.Text('Thank You!', style: pw.TextStyle(font: bold, fontSize: 24, color: PdfColors.black)),
          ]),
          pw.SizedBox(width: 200, child: PdfWidgets.totalsBlock(invoice, font, bold, brandColor)),
        ]),
        pw.SizedBox(height: 12),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.SizedBox(height: 40), 
      ]),
    ]);
  }

  static pw.Widget waveCorporateTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkAccent = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.black);

    return pw.Stack(children: [
      pw.Positioned(
        top: -40, left: -40, right: -40,
        child: pw.CustomPaint(
          size: const PdfPoint(600, 180),
          painter: (PdfGraphics canvas, PdfPoint size) {
            canvas.moveTo(0, 0);
            canvas.lineTo(600, 0);
            canvas.lineTo(600, 100);
            canvas.curveTo(450, 180, 200, 80, 0, 180);
            canvas.setFillColor(darkAccent);
            canvas.fillPath();
          },
        ),
      ),
      pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.SizedBox(height: 20),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
          pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 32, color: PdfWidgets.getContrastColor(darkAccent), letterSpacing: 1.5)),
          pw.Text('NO: #${invoice.id}', style: pw.TextStyle(font: bold, fontSize: 12, color: PdfWidgets.getContrastColor(darkAccent))),
        ]),
        pw.SizedBox(height: 100),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('Bill To:', style: pw.TextStyle(font: bold, fontSize: 16, color: brandColor)),
            pw.SizedBox(height: 4),
            pw.Text(invoice.client.name, style: textStyle),
            if (invoice.client.address != null) pw.Text(invoice.client.address!, style: textStyle),
            pw.Text(invoice.client.email, style: textStyle),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
            pw.Text('From:', style: pw.TextStyle(font: bold, fontSize: 16, color: brandColor)),
            pw.SizedBox(height: 4),
            pw.Text(biz.name, style: textStyle),
            if (biz.businessAddress != null) pw.Text(biz.businessAddress!, style: textStyle),
            if (biz.businessEmail != null) pw.Text(biz.businessEmail!, style: textStyle),
          ]),
        ]),
        pw.SizedBox(height: 32),
        pw.Text('Date: ${PdfWidgets.fmt(invoice.issueDate)}', style: textStyle),
        pw.SizedBox(height: 20),
        PdfWidgets.itemsTable(invoice, font, bold, darkAccent),
        pw.SizedBox(height: 12),
        pw.Align(
          alignment: pw.Alignment.centerRight,
          child: pw.Container(
            color: darkAccent,
            padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 8),
            width: 250,
            child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
              pw.Text('Grand Total', style: pw.TextStyle(font: font, fontSize: 10, color: PdfWidgets.getContrastColor(darkAccent))),
              pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 10, color: PdfWidgets.getContrastColor(darkAccent))),
            ]),
          )
        ),
        pw.SizedBox(height: 60), 
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('Payment Information:', style: pw.TextStyle(font: bold, fontSize: 11, color: brandColor)),
            pw.SizedBox(height: 8),
            PdfWidgets.buildPaymentDetails(biz, font, bold),
          ]),
          pw.Text('Thank You!', style: pw.TextStyle(font: font, fontSize: 28, color: darkAccent)),
        ]),
      ]),
    ]);
  }

  static pw.Widget _entInfoCol(String label, String value, pw.Font font, pw.Font bold) {
    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Text(label.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 7, color: PdfColors.grey500)),
      pw.SizedBox(height: 2),
      pw.Text(value, style: pw.TextStyle(font: bold, fontSize: 9)),
    ]);
  }
}
