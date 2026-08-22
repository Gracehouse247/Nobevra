// lib/core/services/pdf/templates/platinum_batch_6_c.dart
import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/core/services/pdf/pdf_widgets.dart';
import 'package:noble_invoice/core/services/pdf/utils/pdf_template_components.dart';

class PlatinumBatch6C {
  static pw.Widget platinumChadGibbonsTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final lightBrand = PdfColor(brandColor.red, brandColor.green, brandColor.blue, 0.05);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.black);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(40),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('Hey, ${invoice.client.name.split(' ').first}!', style: pw.TextStyle(font: bold, fontSize: 32, color: brandColor)),
            pw.SizedBox(height: 4),
            pw.Text('Here is your invoice from ${biz.name}.', style: pw.TextStyle(font: font, fontSize: 12, color: PdfColors.grey600)),
          ]),
          if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 60),
        ]),

        pw.SizedBox(height: 40),

        pw.Container(
          padding: const pw.EdgeInsets.all(32),
          decoration: pw.BoxDecoration(color: lightBrand, borderRadius: pw.BorderRadius.circular(24)),
          child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
            PdfTemplateComponents.chadInfoBlock('INVOICE NO', '#${invoice.id}', font, bold, brandColor),
            PdfTemplateComponents.chadInfoBlock('DUE DATE', PdfWidgets.fmt(invoice.dueDate), font, bold, brandColor),
            PdfTemplateComponents.chadInfoBlock('AMOUNT DUE', PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), font, bold, brandColor),
          ]),
        ),

        pw.SizedBox(height: 48),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),

        pw.SizedBox(height: 32),
        pw.Align(
          alignment: pw.Alignment.centerRight,
          child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
            pw.Text('Subtotal: ${PdfWidgets.money(invoice.subtotal, invoice.currencyCode)}', style: textStyle),
            pw.SizedBox(height: 8),
            pw.Text('Total Due:', style: pw.TextStyle(font: bold, fontSize: 10, color: PdfColors.grey500)),
            pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 24, color: brandColor)),
          ]),
        ),

        pw.SizedBox(height: 24),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.Spacer(),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
           pw.Text('Working with you is a pleasure!', style: pw.TextStyle(font: font, fontSize: 12, fontStyle: pw.FontStyle.italic, color: brandColor)),
           pw.Text(biz.businessEmail?.toUpperCase() ?? 'WWW.NOBEVRA.COM', style: pw.TextStyle(font: bold, fontSize: 10, color: brandColor)),
        ]),
      ]),
    );
  }

  static pw.Widget platinumShodweWindowTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    return pw.Column(children: [
      pw.Container(
        height: 64, 
        color: brandColor,
        padding: const pw.EdgeInsets.symmetric(horizontal: 24),
        child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
          pw.Row(children: [
            pw.Container(width: 14, height: 14, decoration: const pw.BoxDecoration(color: PdfColors.white, shape: pw.BoxShape.circle)),
            pw.SizedBox(width: 10),
            pw.Container(width: 14, height: 14, decoration: const pw.BoxDecoration(color: PdfColors.white, shape: pw.BoxShape.circle)),
            pw.SizedBox(width: 10),
            pw.Container(width: 14, height: 14, decoration: const pw.BoxDecoration(color: PdfColors.white, shape: pw.BoxShape.circle)),
          ]),
          pw.Text('BILLING_MODULE_${biz.name.replaceAll(' ', '_').toUpperCase()}.EXE', style: pw.TextStyle(font: bold, fontSize: 12, color: PdfWidgets.getContrastColor(brandColor), letterSpacing: 2)),
          pw.Text('X', style: pw.TextStyle(font: bold, color: PdfWidgets.getContrastColor(brandColor), fontSize: 20)),
        ]),
      ),

      pw.Expanded(child: pw.Padding(
        padding: const pw.EdgeInsets.all(60),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 48, color: brandColor)),
              pw.Text('TO ${invoice.client.name.toUpperCase()}', style: pw.TextStyle(font: bold, fontSize: 12, letterSpacing: 2)),
            ]),
            if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), height: 40),
          ]),

          pw.SizedBox(height: 60),
          PdfWidgets.itemsTable(invoice, font, bold, brandColor),

          pw.SizedBox(height: 40),
          pw.Align(
            alignment: pw.Alignment.centerRight,
            child: pw.Container(
              padding: const pw.EdgeInsets.all(20),
              color: brandColor,
              child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                pw.Text('TOTAL AMOUNT', style: pw.TextStyle(font: bold, fontSize: 9, color: PdfWidgets.getContrastColor(brandColor))),
                pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 24, color: PdfWidgets.getContrastColor(brandColor))),
              ]),
            ),
          ),

          pw.SizedBox(height: 24),
          PdfWidgets.paymentButton(invoice, brandColor),
          pw.Spacer(),
          pw.Center(child: pw.Text('STAY CREATIVE!', style: pw.TextStyle(font: bold, fontSize: 13, color: brandColor, letterSpacing: 6))),
          pw.SizedBox(height: 20),
          pw.Container(height: 4, color: brandColor, width: double.infinity),
        ]),
      )),
    ]);
  }

  static pw.Widget platinumBorcelleFlowerTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkText = PdfColor.fromHex('#332F2E');
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkText);
    final boldStyle = pw.TextStyle(font: bold, fontSize: 10, color: darkText);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(60),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.center, children: [
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 24, color: brandColor, letterSpacing: 2)),
              if (biz.taxNumber != null) pw.Text('TAX ID: ${biz.taxNumber}', style: pw.TextStyle(font: font, fontSize: 8, color: PdfColors.grey600, letterSpacing: 1)),
           ]),
           if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 50),
        ]),

        pw.SizedBox(height: 80),
        pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 48, color: darkText, letterSpacing: 4)),
        pw.Container(height: 2, width: 60, color: brandColor, margin: const pw.EdgeInsets.symmetric(vertical: 12)),

        pw.SizedBox(height: 48),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('BILL TO:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 1)),
            pw.SizedBox(height: 8),
            pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 14)),
            pw.Text(invoice.client.address ?? '', style: textStyle),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Text('INV NO:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
             pw.Text('#${invoice.id}', style: boldStyle),
             pw.SizedBox(height: 12),
             pw.Text('DATE:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
             pw.Text(PdfWidgets.fmt(invoice.issueDate), style: boldStyle),
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
                pw.Text(PdfWidgets.money(invoice.subtotal, invoice.currencyCode), style: boldStyle),
             ]),
             pw.SizedBox(height: 12),
             pw.Container(
               padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 12),
               color: brandColor,
               child: pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 16, color: PdfWidgets.getContrastColor(brandColor))),
             ),
          ]),
        ),

        pw.SizedBox(height: 24),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.Spacer(),
        pw.Divider(color: brandColor, thickness: 0.5),
        pw.Center(child: pw.Text(biz.footerText ?? 'THANK YOU FOR YOUR TRUST', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 2))),
      ]),
    );
  }

  static pw.Widget platinumMauveMinimalistTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final softBrand = PdfColor(brandColor.red, brandColor.green, brandColor.blue, 0.1);
    final darkText = PdfColor.fromHex('#3D2C31');
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkText);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(60),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.center, children: [
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 40)
              else pw.Container(
                width: 40, height: 40, 
                decoration: pw.BoxDecoration(color: softBrand, shape: pw.BoxShape.circle, border: pw.Border.all(color: brandColor, width: 0.5))
              ),
              pw.SizedBox(height: 12),
              pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 12, letterSpacing: 2, color: brandColor)),
           ]),
           pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 32, color: darkText, letterSpacing: 8)),
        ]),

        pw.SizedBox(height: 80),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Text('CLIENT:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
            pw.SizedBox(height: 8),
            pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
            pw.Text(invoice.client.address ?? '', style: textStyle),
          ]),
          pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
             pw.Text('DATE: ${PdfWidgets.fmt(invoice.issueDate)}', style: textStyle),
             pw.Text('NO: #${invoice.id}', style: textStyle),
          ]),
        ]),

        pw.SizedBox(height: 60),
        PdfWidgets.itemsTable(invoice, font, bold, brandColor),

        pw.SizedBox(height: 32),
        pw.Align(
          alignment: pw.Alignment.centerRight,
          child: pw.Container(
            padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: pw.BoxDecoration(border: pw.Border.all(color: brandColor, width: 1)),
            child: pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 20, color: darkText)),
          ),
        ),

        pw.SizedBox(height: 24),
        PdfWidgets.paymentButton(invoice, brandColor),
        pw.Spacer(),
        pw.Center(child: pw.Text('BLISSFUL BUSINESS EXPERIENCES', style: pw.TextStyle(font: font, fontSize: 10, color: brandColor, letterSpacing: 4))),
      ]),
    );
  }

  static pw.Widget platinumYellowLotusTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkText = PdfColor.fromHex('#1A1A1A');
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkText);

    return pw.Stack(children: [
      pw.Positioned(
        top: -100, right: -50,
        child: pw.Container(width: 300, height: 300, decoration: pw.BoxDecoration(color: brandColor, shape: pw.BoxShape.circle))
      ),
      pw.Padding(
        padding: const pw.EdgeInsets.all(60),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
           pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
              pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 32, letterSpacing: 4, color: darkText)),
                pw.Text(biz.industry?.toUpperCase() ?? 'INDUSTRY GROUP', style: pw.TextStyle(font: font, fontSize: 10, letterSpacing: 2, color: PdfColor(darkText.red, darkText.green, darkText.blue, 0.6))),
              ]),
              if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 60),
           ]),

           pw.SizedBox(height: 80),
           pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 60, color: darkText, letterSpacing: -2)),
           pw.Row(children: [
             pw.Container(height: 8, width: 40, color: brandColor),
             pw.SizedBox(width: 12),
             pw.Text('#${invoice.id} / ${PdfWidgets.fmt(invoice.issueDate)}', style: pw.TextStyle(font: bold, fontSize: 12)),
           ]),

           pw.SizedBox(height: 60),
           pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Text('CLIENT', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
               pw.SizedBox(height: 4),
               pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
               pw.SizedBox(height: 4),
               pw.Container(width: 150, child: pw.Text(invoice.client.address ?? '', style: textStyle)),
             ]),
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
             ]),
           ]),

           pw.SizedBox(height: 40),
           PdfWidgets.itemsTable(invoice, font, bold, brandColor),

           pw.SizedBox(height: 32),
           pw.Align(
             alignment: pw.Alignment.centerRight,
             child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                pw.Text('Amount to Pay', style: pw.TextStyle(font: font, fontSize: 12, color: PdfColors.grey700)),
                pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 32, color: darkText)),
             ]),
           ),

           pw.SizedBox(height: 24),
           PdfWidgets.paymentButton(invoice, brandColor),
           pw.Spacer(),
           pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
              pw.Text('THANK YOU FOR YOUR CONTINUED BUSINESS', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
              pw.Text('PAGE 01', style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey400)),
           ]),
        ]),
      ),
    ]);
  }

  static pw.Widget platinumBlueSkylineTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkBrand = PdfColor(brandColor.red * 0.8, brandColor.green * 0.8, brandColor.blue * 0.8);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.black);

    return pw.Padding(
      padding: const pw.EdgeInsets.all(0),
      child: pw.Column(children: [
        pw.Container(
          height: 180,
          decoration: pw.BoxDecoration(
            gradient: pw.LinearGradient(
              colors: [darkBrand, brandColor],
              begin: pw.Alignment.topLeft,
              end: pw.Alignment.bottomRight,
            ),
          ),
          padding: const pw.EdgeInsets.symmetric(horizontal: 60, vertical: 40),
          child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, mainAxisAlignment: pw.MainAxisAlignment.center, children: [
               pw.Text('INVOICE', style: pw.TextStyle(font: bold, fontSize: 40, color: PdfWidgets.getContrastColor(brandColor), letterSpacing: 4)),
               pw.Text('#${invoice.id} • ${PdfWidgets.fmt(invoice.issueDate)}', style: pw.TextStyle(font: font, fontSize: 12, color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.8))),
             ]),
             if (logoBytes != null) pw.Container(
               padding: const pw.EdgeInsets.all(12),
               decoration: pw.BoxDecoration(color: PdfColor(PdfColors.white.red, PdfColors.white.green, PdfColors.white.blue, 0.1), borderRadius: pw.BorderRadius.circular(12)),
               child: pw.Image(pw.MemoryImage(logoBytes), width: 60),
             ),
          ]),
        ),

        pw.Expanded(child: pw.Padding(
          padding: const pw.EdgeInsets.symmetric(horizontal: 60, vertical: 40),
          child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                 pw.Text('BILLING TO', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 1)),
                 pw.SizedBox(height: 8),
                 pw.Text(invoice.client.name, style: pw.TextStyle(font: bold, fontSize: 16)),
                 pw.Text(invoice.client.address ?? '', style: textStyle),
               ]),
               pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                 pw.Text('TOTAL DUE', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 1)),
                 pw.SizedBox(height: 8),
                 pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 24, color: brandColor)),
                 PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
               ]),
             ]),

             pw.SizedBox(height: 60),
             PdfWidgets.itemsTable(invoice, font, bold, brandColor),

             pw.SizedBox(height: 40),
             PdfWidgets.paymentButton(invoice, brandColor),

             pw.Spacer(),
             pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
                pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
                  pw.Text('PAYMENT TERMS', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
                  pw.Text(biz.footerText ?? 'Net 30 days. Late fees may apply.', style: pw.TextStyle(font: font, fontSize: 8, color: PdfColors.grey600)),
                ]),
                pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 10, letterSpacing: 2, color: brandColor)),
             ]),
          ]),
        )),
      ]),
    );
  }

  static pw.Widget platinumTealBlobsTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkBrand = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkBrand);

    return pw.Stack(children: [
      pw.Positioned(
        bottom: -50, left: -50,
        child: pw.Container(width: 200, height: 200, decoration: pw.BoxDecoration(color: PdfColor(brandColor.red, brandColor.green, brandColor.blue, 0.1), shape: pw.BoxShape.circle))
      ),
      pw.Padding(
        padding: const pw.EdgeInsets.all(60),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.center, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 14, color: darkBrand, letterSpacing: 1)),
               pw.Container(height: 3, width: 40, color: brandColor),
             ]),
             if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 50),
          ]),

          pw.SizedBox(height: 60),
          pw.Text('THE INVOICE', style: pw.TextStyle(font: bold, fontSize: 36, color: darkBrand, letterSpacing: 12)),
          pw.SizedBox(height: 8),
          pw.Row(children: [
            pw.Text('IDENTIFIER: #${invoice.id}', style: pw.TextStyle(font: font, fontSize: 10, color: PdfColor(darkBrand.red, darkBrand.green, darkBrand.blue, 0.6))),
            pw.SizedBox(width: 20),
            pw.Text('ISSUED: ${PdfWidgets.fmt(invoice.issueDate)}', style: pw.TextStyle(font: font, fontSize: 10, color: PdfColor(darkBrand.red, darkBrand.green, darkBrand.blue, 0.6))),
          ]),

          pw.SizedBox(height: 60),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Text('DESTINATION', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 2)),
               pw.SizedBox(height: 8),
               pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 16)),
               pw.Text(invoice.client.address ?? '', style: textStyle),
               pw.Text(invoice.client.email, style: textStyle),
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
            child: pw.Container(
              padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              decoration: pw.BoxDecoration(
                border: pw.Border(left: pw.BorderSide(color: brandColor, width: 4)),
                color: PdfColor(brandColor.red, brandColor.green, brandColor.blue, 0.05),
              ),
              child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
                 pw.Text('AGGREGATE TOTAL', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
                 pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 24, color: darkBrand)),
              ]),
            ),
          ),

          pw.SizedBox(height: 24),
          PdfWidgets.paymentButton(invoice, brandColor),
          pw.Spacer(),
          pw.Center(child: pw.Text('DESIGNED FOR DISTINCTION • ${biz.name.toUpperCase()}', style: pw.TextStyle(font: font, fontSize: 8, color: PdfColor(darkBrand.red, darkBrand.green, darkBrand.blue, 0.4), letterSpacing: 4))),
        ]),
      ),
    ]);
  }

  static pw.Widget platinumWarnerCopperTemplate(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold, PdfColor brandColor, Uint8List? logoBytes) {
    final darkBrand = PdfColor(brandColor.red * 0.4, brandColor.green * 0.4, brandColor.blue * 0.4);
    final lightBrand = PdfColor(brandColor.red, brandColor.green, brandColor.blue, 0.05);
    final textStyle = pw.TextStyle(font: font, fontSize: 10, color: darkBrand);

    return pw.Container(
      color: lightBrand,
      child: pw.Padding(
        padding: const pw.EdgeInsets.all(60),
        child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
               pw.Text(biz.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 24, color: darkBrand, letterSpacing: 4)),
               pw.SizedBox(height: 4),
               pw.Text('ESTABLISHED TRADITION OF EXCELLENCE', style: pw.TextStyle(font: font, fontSize: 8, color: brandColor, letterSpacing: 1)),
             ]),
             if (logoBytes != null) pw.Image(pw.MemoryImage(logoBytes), width: 50),
          ]),

          pw.SizedBox(height: 80),
          pw.Center(child: pw.Column(children: [
            pw.Text('STATEMENT OF ACCOUNT', style: pw.TextStyle(font: bold, fontSize: 12, color: brandColor, letterSpacing: 6)),
            pw.Container(height: 1, width: 200, color: brandColor, margin: const pw.EdgeInsets.symmetric(vertical: 8)),
            pw.Text('Reference: #${invoice.id}', style: pw.TextStyle(font: font, fontSize: 10)),
          ])),

          pw.SizedBox(height: 60),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              pw.Text('PREPARED FOR:', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor, letterSpacing: 1)),
              pw.SizedBox(height: 8),
              pw.Text(invoice.client.name.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 14)),
              pw.Text(invoice.client.address ?? '', style: textStyle),
            ]),
            pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
              pw.Text('ISSUANCE DATE', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
              pw.Text(PdfWidgets.fmt(invoice.issueDate), style: textStyle),
              pw.SizedBox(height: 12),
              PdfWidgets.buildTypeMetadataSection(invoice, font, bold, brandColor),
            ]),
          ]),

          pw.SizedBox(height: 48),
          PdfWidgets.itemsTable(invoice, font, bold, darkBrand),

          pw.SizedBox(height: 32),
          pw.Align(
            alignment: pw.Alignment.centerRight,
            child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
               pw.Text('TOTAL SETTLEMENT', style: pw.TextStyle(font: bold, fontSize: 9, color: brandColor)),
               pw.SizedBox(height: 4),
               pw.Text(PdfWidgets.money(invoice.totalAmount, invoice.currencyCode), style: pw.TextStyle(font: bold, fontSize: 32, color: darkBrand)),
            ]),
          ),

          pw.SizedBox(height: 24),
          PdfWidgets.paymentButton(invoice, brandColor),
          pw.Spacer(),
          pw.Divider(color: brandColor, thickness: 0.5),
          pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
             pw.Text('OFFICIAL DOCUMENT', style: pw.TextStyle(font: bold, fontSize: 8, color: brandColor)),
             pw.Text(biz.businessEmail ?? '', style: pw.TextStyle(font: font, fontSize: 8)),
          ]),
        ]),
      ),
    );
  }
}
