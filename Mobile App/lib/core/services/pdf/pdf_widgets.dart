// lib/core/services/pdf/pdf_widgets.dart
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/services.dart' show rootBundle;
import 'package:intl/intl.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';

class PdfWidgets {
  // --- Font Cache (FIX-12) ---
  static final Map<String, pw.Font> _fontCache = {};

  static Future<pw.Font> loadFont(String name) async {
    if (_fontCache.containsKey(name)) return _fontCache[name]!;
    final data = await rootBundle.load('assets/fonts/$name');
    final font = pw.Font.ttf(data);
    _fontCache[name] = font;
    return font;
  }

  // --- Formatting Helpers ---
  static String fmt(DateTime d) => DateFormat('MMM dd, yyyy').format(d);

  static String money(double amount, String currency) {
    final format = NumberFormat.currency(symbol: '', decimalDigits: 2);
    return '$currency ${format.format(amount)}';
  }

  static String typeLabel(InvoiceType type) {
    switch (type) {
      case InvoiceType.proforma:     return 'PROFORMA INVOICE';
      case InvoiceType.commercial:   return 'COMMERCIAL INVOICE';
      case InvoiceType.creditMemo:   return 'CREDIT MEMO';
      case InvoiceType.recurring:    return 'SUBSCRIPTION INVOICE';
      case InvoiceType.progress:     return 'PROGRESS BILLING';
      default:                      return 'TAX INVOICE';
    }
  }

  // --- Branding & Colors ---
  static PdfColor getContrastColor(PdfColor background) {
    // Standard YIQ formula for contrast
    final yiq = ((background.red * 255 * 299) + (background.green * 255 * 587) + (background.blue * 255 * 114)) / 1000;
    return (yiq >= 128) ? PdfColors.black : PdfColors.white;
  }

  static PdfColor applyOpacity(PdfColor color, double opacity) {
    return PdfColor(color.red, color.green, color.blue, opacity);
  }

  // --- Watermarks ---
  static bool needsWatermark(InvoiceType type) {
    return type != InvoiceType.standard && type != InvoiceType.recurring;
  }

  static pw.Widget watermark(InvoiceType type, PdfColor color) {
    return pw.Center(
      child: pw.Transform.rotate(
        angle: 45 * 3.14159 / 180,
        child: pw.Text(
          typeLabel(type),
          style: pw.TextStyle(
            fontSize: 100,
            color: applyOpacity(color, 0.1),
            fontWeight: pw.FontWeight.bold,
          ),
        ),
      ),
    );
  }

  // --- Table & Financial Blocks ---
  static pw.Widget itemsTable(Invoice invoice, pw.Font font, pw.Font bold, PdfColor accent, {bool isDark = false, bool isMixed = false}) {
    final contrastColor = getContrastColor(accent);
    final headerStyle = pw.TextStyle(font: bold, fontSize: 9, color: contrastColor);
    final cellStyle   = pw.TextStyle(font: font, fontSize: 10, color: isDark ? PdfColors.white : PdfColors.black);
    final boldCell    = pw.TextStyle(font: bold, fontSize: 10, color: isDark ? PdfColors.white : PdfColors.black);
    final creditStyle = pw.TextStyle(font: font, fontSize: 10, color: PdfColors.red700);

    final List<InvoiceItem> standardItems = [];
    final List<InvoiceItem> creditItems   = [];
    
    for (var item in invoice.items) {
      if (item.description.toUpperCase().startsWith('CREDIT:')) {
        creditItems.add(item);
      } else {
        standardItems.add(item);
      }
    }

    pw.TableRow buildRow(InvoiceItem item, int index, bool isCredit) {
      final even = index % 2 == 0;
      final rowColor = isDark 
          ? (even ? PdfColor.fromHex('#1F2937') : PdfColor.fromHex('#111827')) 
          : (even ? PdfColors.grey50 : PdfColors.white);
      
      final priceText = money(item.unitPrice, invoice.currencyCode);
      final totalText = isCredit ? '- ${money(item.total, invoice.currencyCode)}' : money(item.total, invoice.currencyCode);
      
      // Dynamic font size for long financial strings
      double financialFontSize = 10;
      if (priceText.length > 12 || totalText.length > 12) {
        financialFontSize = 8;
      } else if (priceText.length > 15 || totalText.length > 15) {
        financialFontSize = 7;
      }

      final style = (isCredit ? creditStyle : cellStyle).copyWith(fontSize: financialFontSize);
      final bStyle = boldCell.copyWith(fontSize: financialFontSize);
      
      return pw.TableRow(
        decoration: pw.BoxDecoration(color: rowColor),
        children: [
          pw.Padding(padding: const pw.EdgeInsets.symmetric(horizontal: 8, vertical: 10), child: pw.Text(item.description, style: cellStyle)),
          pw.Padding(padding: const pw.EdgeInsets.symmetric(horizontal: 8, vertical: 10), child: pw.Text('${item.quantity}', style: cellStyle, textAlign: pw.TextAlign.right)),
          pw.Padding(padding: const pw.EdgeInsets.symmetric(horizontal: 8, vertical: 10), child: pw.Text(priceText, style: style, textAlign: pw.TextAlign.right)),
          pw.Padding(padding: const pw.EdgeInsets.symmetric(horizontal: 8, vertical: 10), child: pw.Text(
            totalText, 
            style: isCredit ? creditStyle.copyWith(font: bold, fontSize: financialFontSize) : bStyle, 
            textAlign: pw.TextAlign.right
          )),
        ],
      );
    }

    return pw.Table(
      columnWidths: {
        0: const pw.FlexColumnWidth(4),
        1: const pw.FixedColumnWidth(50),
        2: const pw.FixedColumnWidth(70),
        3: const pw.FixedColumnWidth(80),
      },
      children: [
        pw.TableRow(
          decoration: pw.BoxDecoration(color: accent),
          children: ['Description', 'Qty', 'Unit Price', 'Total'].map((h) => 
            pw.Padding(
              padding: const pw.EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              child: pw.Text(h.toUpperCase(), style: headerStyle, textAlign: h == 'Description' ? pw.TextAlign.left : pw.TextAlign.right)
            )
          ).toList(),
        ),
        
        if (isMixed && standardItems.isNotEmpty)
          pw.TableRow(children: [
            pw.Padding(padding: const pw.EdgeInsets.all(8), child: pw.Text('NEW CHARGES & SERVICES', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.grey700))),
            pw.SizedBox(), pw.SizedBox(), pw.SizedBox(),
          ]),
          
        ...standardItems.asMap().entries.map((e) => buildRow(e.value, e.key, false)),
        
        if (isMixed && creditItems.isNotEmpty)
          pw.TableRow(children: [
            pw.Padding(padding: const pw.EdgeInsets.fromLTRB(8, 16, 8, 8), child: pw.Text('RECONCILIATIONS & CREDITS', style: pw.TextStyle(font: bold, fontSize: 8, color: PdfColors.red700))),
            pw.SizedBox(), pw.SizedBox(), pw.SizedBox(),
          ]),
          
        ...creditItems.asMap().entries.map((e) => buildRow(e.value, e.key, true)),
      ],
    );
  }

  static pw.Widget totalsRow(String label, String value, pw.TextStyle text, pw.TextStyle bold) {
    return pw.Padding(
      padding: const pw.EdgeInsets.symmetric(vertical: 3),
      child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
        pw.Text(label, style: text),
        pw.Text(value, style: bold),
      ]),
    );
  }

  static pw.Widget infoRow(String label, String value, pw.Font font, pw.Font bold, {PdfColor? color}) {
     return pw.Padding(padding: const pw.EdgeInsets.only(bottom: 6), child: pw.Row(children: [
        pw.SizedBox(width: 50, child: pw.Text(label, style: pw.TextStyle(font: bold, fontSize: 11, color: color ?? PdfColors.black))),
        pw.Text(value, style: pw.TextStyle(font: font, fontSize: 10, fontStyle: pw.FontStyle.italic, color: color ?? PdfColors.black)),
     ]));
  }

  static pw.Widget totalsBlock(Invoice invoice, pw.Font font, pw.Font bold, PdfColor accent) {
    final style     = pw.TextStyle(font: font, fontSize: 10);
    final boldStyle = pw.TextStyle(font: bold, fontSize: 11);
    final totalStyle = pw.TextStyle(font: bold, fontSize: 16, color: accent);
    final taxableAmount = invoice.subtotal - invoice.discountAmount;

    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.end, children: [
      _summaryRow('Subtotal', money(invoice.subtotal, invoice.currencyCode), style),
      if (invoice.discountAmount > 0) ...[
        _summaryRow('Discount', '- ${money(invoice.discountAmount, invoice.currencyCode)}', style, valueColor: PdfColors.green700),
        pw.Padding(
          padding: const pw.EdgeInsets.symmetric(vertical: 2),
          child: pw.Text('Taxable: ${money(taxableAmount, invoice.currencyCode)}', style: style.copyWith(fontSize: 8, color: PdfColors.grey600)),
        ),
      ],
      if (invoice.taxAmount > 0)
        _summaryRow('${invoice.taxType == 'inclusive' ? 'Inc. ' : ''}Tax (${invoice.taxRate}%)', money(invoice.taxAmount, invoice.currencyCode), style),
      pw.SizedBox(height: 4),
      pw.Container(width: 150, height: 1, color: PdfColors.grey300),
      pw.SizedBox(height: 8),
      pw.Row(mainAxisSize: pw.MainAxisSize.min, children: [
        pw.Text('Total Due', style: boldStyle),
        pw.SizedBox(width: 24),
        pw.Text(money(invoice.totalAmount, invoice.currencyCode), style: totalStyle),
      ]),
    ]);
  }

  static pw.Widget _summaryRow(String label, String value, pw.TextStyle style, {PdfColor? valueColor}) {
    return pw.Padding(
      padding: const pw.EdgeInsets.only(bottom: 2),
      child: pw.Row(mainAxisSize: pw.MainAxisSize.min, children: [
        pw.Text(label, style: style.copyWith(color: PdfColors.grey700)),
        pw.SizedBox(width: 20),
        pw.Text(value, style: style.copyWith(fontWeight: pw.FontWeight.bold, color: valueColor)),
      ]),
    );
  }

  static pw.Widget buildPaymentDetails(BusinessInfo biz, pw.Font font, pw.Font bold, {PdfColor? color}) {
    if (biz.bankName == null && biz.accountNumber == null) return pw.SizedBox();
    
    final textStyle = pw.TextStyle(font: font, fontSize: 8, color: PdfColors.grey700);
    final boldStyle = pw.TextStyle(font: bold, fontSize: 8);

    return pw.Container(
      padding: const pw.EdgeInsets.all(12),
      decoration: pw.BoxDecoration(
        color: color != null ? applyOpacity(color, 0.05) : PdfColors.grey50, 
        borderRadius: pw.BorderRadius.circular(4),
        border: color != null ? pw.Border.all(color: applyOpacity(color, 0.1)) : null,
      ),
      child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Text('PAYMENT INSTRUCTIONS', style: pw.TextStyle(font: bold, fontSize: 7, color: color ?? PdfColors.grey500, letterSpacing: 1)),
        pw.SizedBox(height: 8),
        pw.Row(children: [
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              if (biz.bankName != null) _pmtRow('Bank Name:', biz.bankName!, textStyle, boldStyle),
              if (biz.accountName != null) _pmtRow('Account Name:', biz.accountName!, textStyle, boldStyle),
           ]),
           pw.SizedBox(width: 40),
           pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
              if (biz.accountNumber != null) _pmtRow('Account No:', biz.accountNumber!, textStyle, boldStyle),
              if (biz.swiftCode != null) _pmtRow('SWIFT/BIC:', biz.swiftCode!, textStyle, boldStyle),
           ]),
        ]),
      ]),
    );
  }

  static pw.Widget _pmtRow(String label, String val, pw.TextStyle s, pw.TextStyle bs) {
    return pw.Padding(
      padding: const pw.EdgeInsets.only(bottom: 2),
      child: pw.Row(children: [
        pw.SizedBox(width: 65, child: pw.Text(label, style: s)),
        pw.Text(val, style: bs),
      ]),
    );
  }

  static pw.Widget infoRowColon(String label, String value, pw.Font font, pw.Font bold, PdfColor color) {
     return pw.Padding(padding: const pw.EdgeInsets.only(bottom: 4), child: pw.Row(children: [
        pw.SizedBox(width: 80, child: pw.Text(label, style: pw.TextStyle(font: bold, fontSize: 10, color: color))),
        pw.Text(' :  $value', style: pw.TextStyle(font: font, fontSize: 10, color: color)),
     ]));
  }

  static pw.Widget contactBox(pw.IconData icon, String text, pw.Font font) {
     return pw.Row(mainAxisSize: pw.MainAxisSize.min, children: [
        pw.Icon(icon, color: PdfColors.white, size: 10),
        pw.SizedBox(width: 8),
        pw.Text(text, style: pw.TextStyle(font: font, fontSize: 8, color: PdfColors.white)),
     ]);
  }

  static pw.Widget infoRowTotal(String label, String value, pw.Font font, pw.Font bold, PdfColor color, {bool isLarge = false}) {
     return pw.Padding(padding: const pw.EdgeInsets.symmetric(vertical: 4), child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.end, children: [
        pw.SizedBox(width: 100, child: pw.Text(label, style: pw.TextStyle(font: bold, fontSize: isLarge ? 10 : 8, color: color))),
        pw.SizedBox(width: 80, child: pw.Text(value, style: pw.TextStyle(font: bold, fontSize: isLarge ? 14 : 9, color: color), textAlign: pw.TextAlign.right)),
     ]));
  }

  static pw.Widget buildTypeMetadataSection(Invoice invoice, pw.Font font, pw.Font bold, PdfColor accent) {
    final meta = invoice.metadata;
    if (meta.isEmpty) return pw.SizedBox();
    final titleStyle = pw.TextStyle(font: bold, fontSize: 8, color: accent, letterSpacing: 1.2);

    if (invoice.invoiceType == InvoiceType.proforma) {
       return pw.Container(
         width: double.infinity,
         padding: const pw.EdgeInsets.all(12),
         margin: const pw.EdgeInsets.only(bottom: 32),
         decoration: pw.BoxDecoration(color: PdfColors.amber50, border: pw.Border.all(color: PdfColors.amber200)),
         child: pw.Text('PROFORMA QUOTATION — Valid Until: ${meta['valid_until'] ?? "Not specified"}',
           textAlign: pw.TextAlign.center,
           style: pw.TextStyle(font: bold, fontSize: 10, color: PdfColors.amber900)),
       );
    }

    if (invoice.invoiceType == InvoiceType.commercial) {
      return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Text('CUSTOMS & TRADE DECLARATION', style: titleStyle),
        pw.SizedBox(height: 8),
        pw.Container(
          padding: const pw.EdgeInsets.all(12),
          margin: const pw.EdgeInsets.only(bottom: 32),
          decoration: pw.BoxDecoration(color: PdfColors.grey100, border: pw.Border.all(color: PdfColors.grey300)),
          child: pw.Column(children: [
            pw.Row(children: [
              pw.Expanded(child: _pdfMetaRow('COUNTRY OF ORIGIN', meta['country_of_origin'] ?? 'N/A', font, bold)),
              pw.Expanded(child: _pdfMetaRow('TRANSPORT MODE', meta['mode_of_transport'] ?? 'N/A', font, bold)),
            ]),
            pw.SizedBox(height: 4),
            pw.Row(children: [
              pw.Expanded(child: _pdfMetaRow('NET WEIGHT', meta['net_weight'] != null ? '${meta['net_weight']} kg' : 'N/A', font, bold)),
              pw.Expanded(child: _pdfMetaRow('GROSS WEIGHT', meta['gross_weight'] != null ? '${meta['gross_weight']} kg' : 'N/A', font, bold)),
            ]),
            pw.SizedBox(height: 4),
            pw.Row(children: [
              pw.Expanded(child: _pdfMetaRow('INCOTERMS', meta['incoterms'] ?? 'FOB', font, bold)),
              pw.Expanded(child: _pdfMetaRow('HS TARIFF CODE', meta['hs_tariff_code'] ?? 'N/A', font, bold)),
            ]),
            pw.SizedBox(height: 4),
            _pdfMetaRow('PACKAGE MARKS', meta['package_marks'] ?? 'N/A', font, bold),
          ]),
        ),
      ]);
    }

    if (invoice.invoiceType == InvoiceType.recurring) {
      return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Text('RECURRING BILLING DETAILS', style: titleStyle),
        pw.SizedBox(height: 8),
        pw.Container(
          padding: const pw.EdgeInsets.all(12),
          margin: const pw.EdgeInsets.only(bottom: 32),
          decoration: pw.BoxDecoration(color: PdfColors.green50, border: pw.Border.all(color: PdfColors.green200)),
          child: pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
            _pdfMetaRow('FREQUENCY', meta['frequency'] ?? 'MONTHLY', font, bold),
            _pdfMetaRow('START DATE', meta['start_date'] ?? 'N/A', font, bold),
            _pdfMetaRow('AUTO-CHARGE', meta['auto_charge'] == true ? 'YES' : 'NO', font, bold),
          ]),
        ),
      ]);
    }

    if (invoice.invoiceType == InvoiceType.progress) {
      final billedPct = double.tryParse(meta['pct_previously_billed']?.toString() ?? '0') ?? 0;
      final currentPct = double.tryParse(meta['pct_current_billing']?.toString() ?? '0') ?? 0;
      final totalPct = (billedPct + currentPct).clamp(0.0, 100.0);

      return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
        pw.Text('PROJECT SETTLEMENT STATUS', style: titleStyle),
        pw.SizedBox(height: 8),
        pw.Row(mainAxisAlignment: pw.MainAxisAlignment.spaceBetween, children: [
           pw.Text('Cumulative Progress: ${totalPct.toStringAsFixed(0)}%', style: pw.TextStyle(font: bold, fontSize: 11)),
           if (meta['project_name'] != null) pw.Text('Project: ${meta['project_name']}', style: pw.TextStyle(font: font, fontSize: 10)),
        ]),
        pw.SizedBox(height: 8),
        pw.Container(
           height: 8, width: double.infinity,
           decoration: pw.BoxDecoration(color: PdfColors.grey200, borderRadius: pw.BorderRadius.circular(4)),
           child: pw.Align(
             alignment: pw.Alignment.centerLeft,
             child: pw.Container(
               child: pw.SizedBox(width: 520 * (totalPct / 100), height: 8),
               decoration: pw.BoxDecoration(color: accent, borderRadius: pw.BorderRadius.circular(4)),
             ),
           ),
        ),
        pw.SizedBox(height: 32),
      ]);
    }

    if (invoice.invoiceType == InvoiceType.creditMemo || invoice.invoiceType == InvoiceType.debitMemo) {
       final isCredit = invoice.invoiceType == InvoiceType.creditMemo;
       return pw.Container(
         width: double.infinity,
         padding: const pw.EdgeInsets.all(12),
         margin: const pw.EdgeInsets.only(bottom: 32),
         decoration: pw.BoxDecoration(
           color: isCredit ? PdfColors.red50 : PdfColors.orange50,
           border: pw.Border.all(color: isCredit ? PdfColors.red200 : PdfColors.orange200)
         ),
         child: pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
           pw.Text('MEMORANDUM DETAILS', style: pw.TextStyle(font: bold, fontSize: 8, color: isCredit ? PdfColors.red900 : PdfColors.orange900)),
           pw.SizedBox(height: 4),
           _pdfMetaRow('REF INVOICE', meta['original_invoice_ref'] ?? 'N/A', font, bold),
           _pdfMetaRow('REASON', meta['reason_code'] ?? meta['adjustment_reason'] ?? 'N/A', font, bold),
         ]),
       );
    }

    return pw.SizedBox();
  }

  static pw.Widget _pdfMetaRow(String label, String value, pw.Font font, pw.Font bold) {
    return pw.Padding(
      padding: const pw.EdgeInsets.only(bottom: 4),
      child: pw.Row(children: [
        pw.SizedBox(width: 100, child: pw.Text(label, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700))),
        pw.Text(value, style: pw.TextStyle(font: bold, fontSize: 9)),
      ]),
    );
  }

  static pw.Widget entInfoCol(String label, String value, pw.Font font, pw.Font bold) {
    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Text(label.toUpperCase(), style: pw.TextStyle(font: bold, fontSize: 7, color: PdfColors.grey600)),
      pw.SizedBox(height: 2),
      pw.Text(value, style: pw.TextStyle(font: bold, fontSize: 10, color: PdfColors.black)),
    ]);
  }
  static pw.Widget paymentButton(Invoice invoice, PdfColor color) {
    var link = '';
    if (invoice.metadata.containsKey('payment_link')) {
       link = invoice.metadata['payment_link']?.toString() ?? '';
    }
    if (link.isNotEmpty) {
      if (!link.startsWith('http')) link = 'https://$link';
      return pw.Padding(
        padding: const pw.EdgeInsets.only(top: 24),
        child: pw.UrlLink(
          destination: link,
          child: pw.Container(
            padding: const pw.EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            decoration: pw.BoxDecoration(
              color: color,
              borderRadius: pw.BorderRadius.circular(8),
            ),
            child: pw.Text("💳 PAY INVOICE ONLINE", style: pw.TextStyle(fontWeight: pw.FontWeight.bold, color: getContrastColor(color), fontSize: 14)),
          ),
        )
      );
    }
    return pw.SizedBox();
  }

  static pw.Widget signatureBlock(Invoice invoice, pw.Font font, pw.Font bold) {
    final sigStr = invoice.metadata['signature']?.toString();
    if (sigStr == null || !sigStr.contains(',')) return pw.SizedBox();

    final Uint8List? sigBytes = _decodeBase64Sig(sigStr);
    if (sigBytes == null) return pw.SizedBox();

    final source = invoice.metadata['signature_source']?.toString() ?? 'drawn';

    return pw.Padding(
      padding: const pw.EdgeInsets.only(top: 30),
      child: pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Container(
            width: 200,
            height: 1,
            color: PdfColors.grey400,
          ),
          pw.SizedBox(height: 6),
          pw.Image(pw.MemoryImage(sigBytes), width: 160, height: 60, fit: pw.BoxFit.contain),
          pw.SizedBox(height: 4),
          pw.Text(
            'Authorised Signature${source == 'uploaded' ? ' (Uploaded)' : ''}',
            style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey600),
          ),
        ],
      ),
    );
  }

  static Uint8List? _decodeBase64Sig(String base64Str) {
    try {
      final data = base64Str.split(',').last;
      return base64Decode(data);
    } catch (_) {
      return null;
    }
  }

  static pw.Widget buildBillFromBlock(BusinessInfo biz, pw.Font font, pw.Font bold, {PdfColor? color}) {
    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Text('BILL FROM', style: pw.TextStyle(font: bold, fontSize: 8, color: color ?? PdfColors.grey500, letterSpacing: 1.2)),
      pw.SizedBox(height: 6),
      pw.Text(biz.name, style: pw.TextStyle(font: bold, fontSize: 12, color: PdfColors.black)),
      if (biz.businessAddress != null) pw.Text(biz.businessAddress!, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700)),
      if (biz.businessEmail != null) pw.Text(biz.businessEmail!, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700)),
      if (biz.businessPhone != null) pw.Text(biz.businessPhone!, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700)),
      if (biz.taxNumber != null) pw.Padding(padding: const pw.EdgeInsets.only(top: 4), child: pw.Text('TAX ID: ${biz.taxNumber}', style: pw.TextStyle(font: bold, fontSize: 8))),
    ]);
  }

  static pw.Widget buildBillToBlock(Invoice invoice, pw.Font font, pw.Font bold, {PdfColor? color}) {
    final client = invoice.client;
    return pw.Column(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
      pw.Text('BILL TO', style: pw.TextStyle(font: bold, fontSize: 8, color: color ?? PdfColors.grey500, letterSpacing: 1.2)),
      pw.SizedBox(height: 6),
      pw.Text(client.name, style: pw.TextStyle(font: bold, fontSize: 12, color: PdfColors.black)),
      if (client.address != null) pw.Text(client.address!, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700)),
      pw.Text(client.email, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700)),
      if (client.phone != null) pw.Text(client.phone!, style: pw.TextStyle(font: font, fontSize: 9, color: PdfColors.grey700)),
    ]);
  }

  static pw.Widget buildFooter(Invoice invoice, BusinessInfo biz, pw.Font font, pw.Font bold) {
     return pw.Column(children: [
        if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[
          pw.Divider(color: PdfColors.grey300),
          pw.SizedBox(height: 8),
          pw.Row(crossAxisAlignment: pw.CrossAxisAlignment.start, children: [
             pw.Text('NOTES: ', style: pw.TextStyle(font: bold, fontSize: 8)),
             pw.Expanded(child: pw.Text(invoice.notes!, style: pw.TextStyle(font: font, fontSize: 8, color: PdfColors.grey700))),
          ]),
          pw.SizedBox(height: 12),
        ],
        pw.Center(child: pw.Text(biz.footerText ?? 'Thank you for your business!', 
          style: pw.TextStyle(font: font, fontSize: 8, color: PdfColors.grey500, fontStyle: pw.FontStyle.italic))),
        pw.SizedBox(height: 4),
        pw.Center(child: pw.Text('Generated by Nobevra — nobevra.com', 
          style: pw.TextStyle(font: bold, fontSize: 6, color: PdfColors.grey400, letterSpacing: 0.5))),
     ]);
  }
}
