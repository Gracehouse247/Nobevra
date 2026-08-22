// lib/core/services/pdf/templates/platinum_batch_6_b.dart
import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/core/services/pdf/pdf_widgets.dart';

class PlatinumBatch6B {
  static pw.Widget platinumArowwaiNavyTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkAccent = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.black);

    return pw.Column(children: [
      pw.Container(
        color: darkAccent,
        width: double.infinity,
        padding: const pw.EdgeInsets.symmetric(horizontal: 40, vertical: 40),
        child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 40, color: PdfWidgets.getContrastColor(darkAccent), letterSpacing: 2)),
            pw.SizedBox(height: 4),
            pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: font, fontSize: 11, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(darkAccent), 0.3), letterSpacing: 4)),
          ]),
          if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 60),
        ]),
      ),

      pw.Padding(
        padding: const pw.EdgeInsets.all(40),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('FROM:', style: pw.TextStyle(font: bold, fontSize: 8, color: brandColor)),
              pw.SizedBox(height: 8),
              pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 12)),
              pw.Text(biz.businessPhone ?? '', style: textStyle),
              pw.Text(biz.businessEmail ?? '', style: textStyle),
            ]),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Text('TO:', style: pw.TextStyle(font: bold, fontSize: 8, color: brandColor)),
              pw.SizedBox(height: 8),
              pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 12)),
              pw.Text(invoice.client.address ?? '', style: textStyle),
            ]),
          ]),

          pw.SizedBox(height: 40),
          pw.Row(children: [
            _arowwaiInfo('Invoice No', '#${invoice.id}', font, bold, brandColor),
            pw.SizedBox(width: 40),
            _arowwaiInfo('Date', PdfWidgets.fmt(invoice.issueDate), font, bold, brandColor),
            pw.SizedBox(width: 40),
            _arowwaiInfo('Total Amount', PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), font, bold, brandColor),
          ]),

          pw.SizedBox(height: 40),
          PdfWidgets.itemsTable(invoice, font, bold, brandColor),

          pw.SizedBox(height: 32),
          pw.Align(
            alignment: pw.Alignment.centerRight,
            child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
               pw.Text('GRAND TOTAL', style: pw.TextStyle(font: bold, fontSize: 11, color: brandColor)),
               pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 28, color: darkAccent)),
            ]),
          ),
          
          pw.SizedBox(height: 20),
          PdfWidgets.paymentButton(invoice, brandColor),
          pw.Spacer(),
          pw.Divider(color: brandColor),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
             pw.Text(biz.footerText ?? 'THANK YOU FOR YOUR BUSINESS', style: pw.TextStyle(font: bold, fontSize: 9, letterSpacing: 1.5)),
             pw.Text('NOBEVRA', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
          ]),
        ]),
      ),
    ]);
  }

  static pw.Widget platinumBoldDesignTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkAccent = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.black);

    return pw.Stack(children: [
      pw.Positioned(top: 0, left: 0, right: 0, child: pw.SizedBox(height: 12, child: pw.Container(color: brandColor))),
      
      pw.Padding(
        padding: const pw.EdgeInsets.all(40),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.SizedBox(height: 20),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.center, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 32, color: darkAccent, letterSpacing: -1)),
            ]),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Text('INVOICE', style: pw.TextStyle(font: font, fontSize: 13, letterSpacing: 8, color: darkAccent)),
              pw.Text('#${invoice.id}', style: pw.TextStyle(font: bold, fontSize: 16)),
              pw.Text(PdfWidgets.fmt(invoice.issueDate), style: textStyle),
            ]),
          ]),

          pw.SizedBox(height: 80),

          pw.Container(
            padding: const pw.EdgeInsets.all(32),
            decoration: pw.BoxDecoration(border: pw.Border.all(color: brandColor, width: 3)),
            child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
              pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                pw.Text('BILL TO:', style: pw.TextStyle(font: bold, fontSize: 9, color: PdfColors.grey500)),
                pw.SizedBox(height: 8),
                pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 18, color: darkAccent)),
                pw.Text(invoice.client.address ?? '', style: textStyle),
              ]),
              pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                pw.Text('TOTAL DUE', style: pw.TextStyle(font: bold, fontSize: 9, color: PdfColors.grey500)),
                pw.SizedBox(height: 8),
                pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 32, color: darkAccent)),
              ]),
            ]),
          ),

          pw.SizedBox(height: 48),
          PdfWidgets.itemsTable(invoice, font, bold, darkAccent),

          pw.SizedBox(height: 32),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Text('PAYMENT TERMS:', style: pw.TextStyle(font: bold, fontSize: 9, color: darkAccent)),
               pw.Text('Please pay within 30 days.', style: textStyle),
            ]),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
               pw.Row(mainAxisSize: pw.MainAxisSize.min, children: [
                  pw.Text('SUBTOTAL', style: textStyle),
                  pw.SizedBox(width: 40),
                  pw.Text(PdfWidgets.money(invoice.subtotal, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 10)),
               ]),
               pw.SizedBox(height: 8),
               pw.Container(
                 padding: const pw.EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                 color: brandColor,
                 child: pw.Text('TOTAL ${PdfWidgets.money(invoice.totalAmount, invoice.currencyCode)}', style: pw.TextStyle(font: bold, fontSize: 14, color: PdfWidgets.getContrastColor(brandColor))),
               ),
            ]),
          ]),

          pw.SizedBox(height: 24),
          PdfWidgets.paymentButton(invoice, darkAccent),
          pw.Spacer(),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
            pw.Text(biz.businessPhone ?? '', style: textStyle),
            pw.Text(biz.businessEmail ?? '', style: textStyle),
          ]),
        ]),
      ),
    ]);
  }

  static pw.Widget platinumTSCompanyTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkAccent = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);

    return pw.Column(children: [
      pw.Container(
        color: darkAccent,
        padding: const pw.EdgeInsets.all(40),
        child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 13, color: brandColor, letterSpacing: 2)),
            pw.SizedBox(height: 8),
            pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 44, color: PdfWidgets.getContrastColor(darkAccent))),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Text('INVOICE #${invoice.id}', style: pw.TextStyle(font: font, fontSize: 10, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(darkAccent), 0.7))),
             pw.Text('DATE: ${PdfWidgets.fmt(invoice.issueDate)}', style: pw.TextStyle(font: font, fontSize: 10, color: PdfWidgets.applyOpacity(PdfWidgets.getContrastColor(darkAccent), 0.7))),
          ]),
        ]),
      ),

      pw.Expanded(child: pw.Padding(
        padding: const pw.EdgeInsets.all(40),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('BILL TO:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
              pw.SizedBox(height: 8),
              pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
              pw.Text(invoice.client.address ?? '', style: pw.TextStyle(font: font, fontSize: 10)),
            ]),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Text('TOTAL DUE:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
              pw.SizedBox(height: 8),
              pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 28, color: darkAccent)),
            ]),
          ]),

          pw.SizedBox(height: 48),
          PdfWidgets.itemsTable(invoice, font, bold, brandColor),

          pw.SizedBox(height: 32),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                pw.Text('PAYMENT INFO', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
                pw.SizedBox(height: 4),
                pw.Text('Bank: ${biz.bankName ?? "N/A"}', style: pw.TextStyle(font: font, fontSize: 9)),
                pw.Text('Acc: ${biz.accountNumber ?? "N/A"}', style: pw.TextStyle(font: font, fontSize: 9)),
             ]),
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                pw.Row(mainAxisSize: pw.MainAxisSize.min, children: [
                   pw.Text('SUBTOTAL', style: pw.TextStyle(font: font, fontSize: 10)),
                   pw.SizedBox(width: 40),
                   pw.Text(PdfWidgets.money(invoice.subtotal, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 10)),
                ]),
                pw.SizedBox(height: 8),
                pw.Container(
                  padding: const pw.EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  color: darkAccent,
                  child: pw.Text('TOTAL ${PdfWidgets.money(invoice.totalAmount, invoice.currencyCode)}', style: pw.TextStyle(font: bold, fontSize: 14, color: PdfWidgets.getContrastColor(darkAccent))),
                ),
             ]),
          ]),

          pw.SizedBox(height: 24),
          PdfWidgets.paymentButton(invoice, brandColor),
          pw.Spacer(),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
            pw.Text(biz.businessEmail ?? '', style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey500)),
            pw.Text(biz.businessPhone ?? '', style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey500)),
            pw.Text('NOBEVRA', style: pw.TextStyle(font: bold, fontSize: 10, color: brandColor)),
          ]),
        ]),
      )),
    ]);
  }

  static pw.Widget _arowwaiInfo(String label, String value, pw.Font font, pw.Font bold, PdfColor brandColor) {
    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Text(label.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 7, color: PdfColors.grey500, letterSpacing: 1)),
      pw.SizedBox(height: 4),
      pw.Text(value, style: pw.TextStyle(font: bold, fontSize: 11, color: brandColor)),
    ]);
  }
}
