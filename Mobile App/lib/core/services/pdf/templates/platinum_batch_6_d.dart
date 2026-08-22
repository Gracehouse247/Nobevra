// lib/core/services/pdf/templates/platinum_batch_6_d.dart
import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/core/services/pdf/pdf_widgets.dart';

class PlatinumBatch6D {
  static pw.Widget platinumBorcelleModernTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkText = PdfColor.fromHex('#1E293B');
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkText);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(60),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 24, color: brandColor, letterSpacing: 4)),
             pw.Text(biz.industry?.toUpperCase() ?? 'MODERN SOLUTIONS', style: pw.TextStyle(font: font, fontSize: 8, color: PdfColors.grey600)),
           ]),
           if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 50),
        ]),

        pw.SizedBox(height: 60),
        pw.Row(children: [
          pw.Container(width: 4, height: 100, color: brandColor),
          pw.SizedBox(width: 24),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 40, color: darkText, letterSpacing: 2)),
             pw.Text('REF: #${invoice.id} • ${PdfWidgets.fmt(invoice.issueDate)}', style: pw.TextStyle(font: font, fontSize: 12, color: PdfColors.grey500)),
          ]),
        ]),

        pw.SizedBox(height: 60),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('PREPARED FOR', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 1)),
            pw.SizedBox(height: 8),
            pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
            pw.Text(invoice.client.address ?? '', style: textStyle),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
          ]),
        ]),

        pw.SizedBox(height: 48),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),

        pw.SizedBox(height: 32),
        pw.Align(
          alignment: pw.Alignment.centerRight,
          child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Text('TOTAL DUE', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
             pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 32, color: darkText)),
          ]),
        ),

        pw.SizedBox(height: 24),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.Spacer(),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
           pw.Text(biz.footerText?.toUpperCase() ?? 'FAST-PACED SOLUTIONS FOR MODERN BRANDS', style: pw.TextStyle(font: font, fontSize: 8, color: brandColor)),
           pw.Text(biz.businessEmail?.toUpperCase() ?? 'WWW.NOBEVRA.COM', style: pw.TextStyle(font: bold, fontSize: 8)),
        ]),
      ]),
    );
  }

  static pw.Widget platinumLaranaStudioTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkBrown = PdfColor.fromHex('#431407');
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkBrown);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(60),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
           if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 60)
           else pw.Container(width: 60, height: 60, decoration: pw.BoxDecoration(color: PdfColor(brandColor.red, brandColor.green, brandColor.blue, 0.1), shape: pw.BoxShape.circle)),
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 24, color: brandColor, letterSpacing: 4)),
             pw.Text(biz.industry?.toUpperCase() ?? 'STUDIO & CO', style: pw.TextStyle(font: font, fontSize: 8, color: darkBrown)),
           ]),
        ]),

        pw.SizedBox(height: 80),
        pw.Text('INVOICE STATEMENT', style: pw.TextStyle(font: bold, fontSize: 12, color: darkBrown, letterSpacing: 8)),
        pw.SizedBox(height: 12),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
           pw.Text('#${invoice.id}', style: pw.TextStyle(font: bold, fontSize: 48, color: brandColor, letterSpacing: -2)),
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Text('DATE OF ISSUE', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.grey500)),
              pw.Text(PdfWidgets.fmt(invoice.issueDate), style: pw.TextStyle(font: bold, fontSize: 10)),
           ]),
        ]),

        pw.SizedBox(height: 60),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('STAKEHOLDER', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
            pw.SizedBox(height: 8),
            pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
            pw.Text(invoice.client.address ?? '', style: textStyle),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
          ]),
        ]),

        pw.SizedBox(height: 48),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),

        pw.SizedBox(height: 32),
        pw.Align(
          alignment: pw.Alignment.centerRight,
          child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Row(mainAxisSize: pw.MainAxisSize.min, children: [
                pw.Text('SUBTOTAL', style: textStyle),
                pw.SizedBox(width: 40),
                pw.Text(PdfWidgets.money(invoice.subtotal, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 10)),
             ]),
             pw.SizedBox(height: 8),
             pw.Container(
               padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 12),
               decoration: pw.BoxDecoration(color: darkBrown, borderRadius: pw.BorderRadius.circular(4)),
               child: pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 20, color: PdfColors.white)),
             ),
          ]),
        ),

        pw.SizedBox(height: 24),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.Spacer(),
        pw.Center(child: pw.Text(biz.footerText?.toUpperCase() ?? 'CRAFTING EXPERIENCES WITH NOBEVRA', style: pw.TextStyle(font: font, fontSize: 8, color: brandColor, letterSpacing: 2))),
      ]),
    );
  }

  static pw.Widget platinumSalfordGreenTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkText = PdfColor(brandColor.red * 0.8, brandColor.green * 0.8, brandColor.blue * 0.8);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkText);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(60),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.center, children: [
           pw.Row(children: [
             pw.Container(width: 30, height: 30, decoration: pw.BoxDecoration(color: brandColor, borderRadius: pw.BorderRadius.circular(4))),
             pw.SizedBox(width: 12),
             pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 24, color: brandColor, letterSpacing: 2)),
           ]),
           if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 50),
        ]),

        pw.SizedBox(height: 60),
        pw.Container(
          width: double.infinity,
          height: 120,
          color: brandColor,
          padding: const pw.EdgeInsets.all(32),
          child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, mainAxisAlignment: pw.MainAxisAlignment.center, children: [
               pw.Text('INVOICE STATEMENT', style: pw.TextStyle(font: bold, fontSize: 9, color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.6))),
               pw.Text('#${invoice.id}', style: pw.TextStyle(font: bold, fontSize: 24, color: PdfColors.white)),
             ]),
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, mainAxisAlignment: pw.MainAxisAlignment.center, children: [
               pw.Text('TOTAL AMOUNT', style: pw.TextStyle(font: bold, fontSize: 9, color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.6))),
               pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 24, color: PdfColors.white)),
             ]),
          ]),
        ),

        pw.SizedBox(height: 48),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Text('BILL TO:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
             pw.SizedBox(height: 8),
             pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
             pw.Text(invoice.client.address ?? '', style: textStyle),
           ]),
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Text('DATE:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
             pw.Text(PdfWidgets.fmt(invoice.issueDate), style: textStyle),
             PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
           ]),
        ]),

        pw.SizedBox(height: 48),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),

        pw.SizedBox(height: 40),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.Spacer(),
        pw.Divider(color: brandColor, thickness: 0.5),
        pw.Center(child: pw.Text(biz.footerText?.toUpperCase() ?? 'PROFESSIONAL ENTERPRISE SOLUTIONS BY ${biz.name.toUpperCase()}', style: pw.TextStyle(font: font, fontSize: 8, color: brandColor, letterSpacing: 2))),
      ]),
    );
  }

  static pw.Widget platinumFaugetAgencyDarkTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final dark = PdfColor.fromHex('#111827');
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.white);

    return pw.Container(
      color: dark,
      child: pw.Padding(
        padding: const pw.EdgeInsets.all(60),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
           pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 32, color: brandColor, letterSpacing: 4)),
                pw.Text(biz.industry?.toUpperCase() ?? 'PREMIERE DESIGN AGENCY', style: pw.TextStyle(font: font, fontSize: 10, color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.5))),
              ]),
              if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 60),
           ]),

           pw.SizedBox(height: 80),
           pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 64, color: PdfColors.white, letterSpacing: -2)),
           pw.Container(height: 4, width: 80, color: brandColor, margin: const pw.EdgeInsets.symmetric(vertical: 12)),

           pw.SizedBox(height: 48),
           pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Text('CLIENT', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 2)),
               pw.SizedBox(height: 8),
               pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16, color: PdfColors.white)),
               pw.Text(invoice.client.address ?? '', style: textStyle),
             ]),
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
               pw.Text('REF NO', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
               pw.Text('#${invoice.id}', style: textStyle),
               pw.SizedBox(height: 12),
               pw.Text('DATE', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
               pw.Text(PdfWidgets.fmt(invoice.issueDate), style: textStyle),
               PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
             ]),
           ]),

           pw.SizedBox(height: 48),
           PdfWidgets.itemsTable(invoice, font, bold, brandColor, isDark: true),

           pw.SizedBox(height: 40),
           pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                 pw.Text('THANK YOU', style: pw.TextStyle(font: bold, fontSize: 12, color: brandColor)),
                 pw.Text('For choosing excellence.', style: pw.TextStyle(font: font, fontSize: 10, color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.5))),
              ]),
              pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                pw.Text('TOTAL AMOUNT', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
                pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 32, color: PdfColors.white)),
              ]),
           ]),

           pw.SizedBox(height: 32),
           PdfWidgets.paymentButton(invoice, brandColor),
           pw.Spacer(),
           pw.Center(child: pw.Text('${biz.name.toUpperCase()} • EST 2024 • THE NEW STANDARD', style: pw.TextStyle(font: font, fontSize: 8, color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.3), letterSpacing: 2))),
        ]),
      ),
    );
  }
}
