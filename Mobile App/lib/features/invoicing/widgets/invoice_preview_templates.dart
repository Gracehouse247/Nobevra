// lib/features/invoicing/widgets/invoice_preview_templates.dart
// Template renderers extracted from PaperDocument to enforce the 600-line rule.
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/features/invoicing/widgets/invoice_preview_widgets.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/core/utils/color_utils.dart';

/// Shared template builder mixin — provides shared sub-widgets used by every template.
mixin InvoiceTemplateHelpers {
  Invoice   get invoice;
  BusinessInfo get business;
  String Function(double) get fmtMoney;

  Color get accent => ColorUtils.fromHex(business.brandColor);

  Widget buildBillTo() => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    Text('BILL TO', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: accent, letterSpacing: 1.5)),
    const SizedBox(height: 6),
    Text(invoice.client.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
    Text(invoice.client.email, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, color: AppColors.darkGrey)),
    if (invoice.client.address != null)
      Text(invoice.client.address!, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, color: AppColors.darkGrey)),
  ]);

  Widget buildItemsTable() => Column(children: [
    const Row(children: [
      Expanded(flex: 4, child: ColHead(text: 'DESCRIPTION')),
      Expanded(child: ColHead(text: 'QTY', right: true)),
      Expanded(child: ColHead(text: 'UNIT', right: true)),
      Expanded(child: ColHead(text: 'TOTAL', right: true)),
    ]),
    const SizedBox(height: 8),
    const Divider(height: 1),
    ...invoice.items.asMap().entries.map((e) {
      final item = e.value; final odd = e.key % 2 != 0;
      return Container(
        color: odd ? AppColors.lightGrey.withOpacity(0.1) : Colors.transparent,
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Row(children: [
          Expanded(flex: 4, child: Text(item.description, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12))),
          Expanded(child: FittedBox(fit: BoxFit.scaleDown, alignment: Alignment.centerRight, child: Text('${item.quantity}', textAlign: TextAlign.right, style: const TextStyle(fontSize: 12)))),
          Expanded(child: FittedBox(fit: BoxFit.scaleDown, alignment: Alignment.centerRight, child: Text(fmtMoney(item.unitPrice), textAlign: TextAlign.right, style: const TextStyle(fontSize: 12)))),
          Expanded(child: FittedBox(fit: BoxFit.scaleDown, alignment: Alignment.centerRight, child: Text(fmtMoney(item.total), textAlign: TextAlign.right, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)))),
        ]),
      );
    }),
  ]);

  Widget buildTotals() => Align(alignment: Alignment.centerRight, child: SizedBox(width: 210, child: Column(children: [
    TotalLine(label: 'Subtotal', value: fmtMoney(invoice.subtotal)),
    if (invoice.discountAmount > 0) TotalLine(label: 'Discount (${invoice.discountType})', value: '- ${fmtMoney(invoice.discountAmount)}', color: AppColors.success),
    if (invoice.taxRate > 0) TotalLine(label: 'Tax (${invoice.taxRate.toStringAsFixed(1)}% ${invoice.taxType})', value: fmtMoney(invoice.taxAmount)),
    const Padding(padding: EdgeInsets.symmetric(vertical: 10), child: Divider(height: 1)),
    Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      const Text('Total', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
      const SizedBox(width: 8),
      Flexible(
        child: FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(fmtMoney(invoice.totalAmount), style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20, color: accent)),
        ),
      ),
    ]),
  ])));

  Widget buildTypeMetadata() {
    final meta = invoice.metadata;
    if (meta.isEmpty) return const SizedBox.shrink();
    
    if (invoice.invoiceType == InvoiceType.proforma) {
      return Container(width: double.infinity, padding: const EdgeInsets.all(12), margin: const EdgeInsets.only(bottom: 20),
        decoration: BoxDecoration(color: Colors.amber.shade50, borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.amber.shade300)),
        child: Text('PROFORMA / NOT A TAX INVOICE — Valid Until: ${meta['valid_until'] ?? 'Not specified'}',
          textAlign: TextAlign.center, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.amber.shade800, letterSpacing: 0.5)));
    }
    
    if (invoice.invoiceType == InvoiceType.commercial) {
      return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const SectionLabel(text: 'CUSTOMS DECLARATION'), const SizedBox(height: 8),
        Container(padding: const EdgeInsets.all(12), margin: const EdgeInsets.only(bottom: 20),
          decoration: BoxDecoration(color: Colors.teal.shade50, borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.teal.shade200)),
          child: Column(children: [
            if (meta['country_of_origin'] != null) MetaRow(label: 'Country of Origin', value: meta['country_of_origin']),
            if (meta['hs_tariff_code']    != null) MetaRow(label: 'HS / Tariff Code',  value: meta['hs_tariff_code']),
            if (meta['incoterms']         != null) MetaRow(label: 'Incoterms',         value: meta['incoterms']),
          ])),
      ]);
    }

    if (invoice.invoiceType == InvoiceType.estimate || invoice.invoiceType == InvoiceType.quote) {
      final isQuote = invoice.invoiceType == InvoiceType.quote;
      return Container(width: double.infinity, padding: const EdgeInsets.all(12), margin: const EdgeInsets.only(bottom: 20),
        decoration: BoxDecoration(
          color: isQuote ? Colors.indigo.shade50 : Colors.blueGrey.shade50, 
          borderRadius: BorderRadius.circular(8), 
          border: Border.all(color: isQuote ? Colors.indigo.shade300 : Colors.blueGrey.shade300)
        ),
        child: Column(children: [
          Text(isQuote ? 'OFFICIAL QUOTATION' : 'PROJECT ESTIMATE',
            textAlign: TextAlign.center, 
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isQuote ? Colors.indigo.shade800 : Colors.blueGrey.shade800, letterSpacing: 0.5)),
          if (meta['valid_until'] != null)
            Padding(
              padding: const EdgeInsets.only(top: 4), 
              child: Text('Valid Until: ${meta['valid_until']}', style: TextStyle(fontSize: 10, color: isQuote ? Colors.indigo.shade600 : Colors.blueGrey.shade600))
            ),
        ]));
    }
    
    return const SizedBox.shrink();
  }

  Widget buildNotes() => Container(
    width: double.infinity, padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(color: AppColors.lightGrey.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text('NOTES & TERMS', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.darkGrey, letterSpacing: 1)),
      const SizedBox(height: 6),
      Text(invoice.notes!, style: const TextStyle(fontSize: 12, color: AppColors.darkGrey, height: 1.5)),
    ]),
  );

  Widget buildPaymentDetails() {
    if (business.accountNumber == null || business.accountNumber!.isEmpty) return const SizedBox.shrink();
    return Container(margin: const EdgeInsets.only(top: 24), padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppColors.lightGrey.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('PAYMENT INFORMATION', style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: accent, letterSpacing: 1.2)),
        const SizedBox(height: 12),
        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
          _payCol('BANK',         business.bankName      ?? 'N/A'),
          _payCol('ACCOUNT NAME', business.accountName   ?? 'N/A'),
          _payCol('ACCOUNT NO.',  business.accountNumber!),
        ]),
      ]));
  }

  Widget buildFooter() {
    final sigBase64 = invoice.metadata['signature']?.toString();
    final sigUrl = business.signatureUrl;
    
    return Column(children: [
      if (sigBase64 != null || sigUrl != null) ...[
        Row(mainAxisAlignment: MainAxisAlignment.end, children: [
          Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
            SizedBox(
              height: 48, width: 130,
              child: sigBase64 != null
                  ? Image.memory(base64Decode(sigBase64.split(',').last), fit: BoxFit.contain, errorBuilder: (_, __, ___) => const SizedBox())
                  : Image.network(sigUrl!, fit: BoxFit.contain, errorBuilder: (_, __, ___) => const SizedBox()),
            ),
            Container(width: 130, height: 1, color: AppColors.darkGrey.withOpacity(0.5)),
            const SizedBox(height: 4),
            const Text('AUTHORIZED SIGNATURE', style: TextStyle(fontSize: 7, fontWeight: FontWeight.w700, letterSpacing: 0.5, color: AppColors.darkGrey)),
          ]),
        ]),
        const SizedBox(height: 16),
      ],
      const Divider(height: 1), const SizedBox(height: 12),
      Text(business.footerText ?? 'Thank you for your business.', style: const TextStyle(fontSize: 10, color: AppColors.darkGrey, fontStyle: FontStyle.italic), textAlign: TextAlign.center),
      const SizedBox(height: 12),
      Row(mainAxisAlignment: MainAxisAlignment.center, children: [
        Icon(Icons.verified_rounded, size: 12, color: accent), const SizedBox(width: 4),
        Text('Verified by Nobevra', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: accent, letterSpacing: 1)),
      ]),
    ]);
  }

  Widget buildWatermark() {
    if (business.logoUrl == null) return const SizedBox.shrink();
    return Positioned.fill(child: Center(child: Opacity(opacity: 0.04, child: Image.network(business.logoUrl!, width: 250, height: 250, fit: BoxFit.contain, errorBuilder: (_, __, ___) => const SizedBox.shrink()))));
  }

  Widget _payCol(String label, String value) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    Text(label, style: const TextStyle(fontSize: 7, color: AppColors.darkGrey, fontWeight: FontWeight.bold)),
    const SizedBox(height: 2),
    Text(value, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
  ]);

  String typeLabel() {
    switch (invoice.invoiceType) {
      case InvoiceType.proforma:   return 'PROFORMA INVOICE';
      case InvoiceType.commercial: return 'COMMERCIAL INVOICE';
      case InvoiceType.progress:   return 'PROGRESS INVOICE';
      case InvoiceType.estimate:   return 'ESTIMATE';
      case InvoiceType.quote:      return 'QUOTE';
      default:                     return 'INVOICE';
    }
  }
}

// ── Creative Bold Template ────────────────────────────────────────────────────
class CreativeBoldTemplate extends StatelessWidget with InvoiceTemplateHelpers {
  @override final Invoice invoice;
  @override final BusinessInfo business;
  @override final String Function(double) fmtMoney;
  const CreativeBoldTemplate({super.key, required this.invoice, required this.business, required this.fmtMoney});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 24, offset: const Offset(0, 12))]),
      child: Stack(children: [
        buildWatermark(),
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(gradient: LinearGradient(colors: [accent, accent.withOpacity(0.1)], begin: Alignment.topLeft, end: Alignment.bottomRight), borderRadius: const BorderRadius.vertical(top: Radius.circular(16))),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text(business.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 20)),
                Text(typeLabel(), style: const TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 11)),
              ]),
              const SizedBox(height: 16),
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  const Text('BILLED TO', style: TextStyle(color: Colors.white60, fontSize: 10, letterSpacing: 1.2)),
                  const SizedBox(height: 4),
                  Text(invoice.client.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                  Text(invoice.client.email, style: const TextStyle(color: Colors.white70, fontSize: 11)),
                ]),
                Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                  const Text('TOTAL DUE', style: TextStyle(color: Colors.white60, fontSize: 10, letterSpacing: 1.2)),
                  const SizedBox(height: 4),
                  Text(fmtMoney(invoice.totalAmount), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 22)),
                ]),
              ]),
            ]),
          ),
          Padding(padding: const EdgeInsets.all(24), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            buildTypeMetadata(), buildItemsTable(), const SizedBox(height: 16), buildTotals(), buildPaymentDetails(),
            if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[const SizedBox(height: 20), buildNotes()],
            const SizedBox(height: 24), buildFooter(),
          ])),
        ]),
      ]),
    );
  }
}

// ── Enterprise Standard Template ──────────────────────────────────────────────
class EnterpriseStandardTemplate extends StatelessWidget with InvoiceTemplateHelpers {
  @override final Invoice invoice;
  @override final BusinessInfo business;
  @override final String Function(double) fmtMoney;
  const EnterpriseStandardTemplate({super.key, required this.invoice, required this.business, required this.fmtMoney});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(4), border: Border.all(color: Colors.grey.shade300, width: 1.5), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 8)]),
      child: Stack(children: [
        buildWatermark(),
        Column(children: [
          Container(padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16), color: const Color(0xFF0F172A), child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text(business.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 16, letterSpacing: 0.5)),
            Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
              Text(typeLabel(), style: TextStyle(color: accent, fontWeight: FontWeight.bold, fontSize: 11, letterSpacing: 1)),
              Text('No. ${invoice.id}', style: const TextStyle(color: Colors.white70, fontSize: 11)),
            ]),
          ])),
          Container(padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10), color: const Color(0xFFF1F5F9), child: Row(children: [
            EntInfo(label: 'Issued',    value: DateFormat('MMM dd, yyyy').format(invoice.issueDate)),
            const SizedBox(width: 32),
            EntInfo(label: 'Due',      value: DateFormat('MMM dd, yyyy').format(invoice.dueDate)),
            const SizedBox(width: 32),
            EntInfo(label: 'Currency', value: invoice.currencyCode),
            if (invoice.invoiceType != InvoiceType.standard) ...[const SizedBox(width: 32), EntInfo(label: 'Type', value: invoice.invoiceType.label)],
          ])),
          Padding(padding: const EdgeInsets.all(24), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            buildBillTo(), const SizedBox(height: 20), buildTypeMetadata(), buildItemsTable(),
            const SizedBox(height: 16), buildTotals(), buildPaymentDetails(),
            if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[const SizedBox(height: 20), buildNotes()],
            const SizedBox(height: 24), buildFooter(),
          ])),
        ]),
      ]),
    );
  }
}

// ── Minimalist Alpha Template ─────────────────────────────────────────────────
class MinimalistAlphaTemplate extends StatelessWidget with InvoiceTemplateHelpers {
  @override final Invoice invoice;
  @override final BusinessInfo business;
  @override final String Function(double) fmtMoney;
  const MinimalistAlphaTemplate({super.key, required this.invoice, required this.business, required this.fmtMoney});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20), padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(4), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 30, offset: const Offset(0, 10))]),
      child: Stack(children: [
        buildWatermark(),
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(typeLabel(), style: TextStyle(fontSize: 9, letterSpacing: 2.5, fontWeight: FontWeight.bold, color: accent)),
              const SizedBox(height: 6),
              Text(business.name, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 24, letterSpacing: -0.5)),
            ]),
            Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
              Text('No. ${invoice.id}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppColors.black)),
              const SizedBox(height: 4),
              Text(DateFormat('MMM dd, yyyy').format(invoice.issueDate), style: const TextStyle(color: AppColors.darkGrey, fontSize: 11)),
            ]),
          ]),
          const SizedBox(height: 40), buildBillTo(), const SizedBox(height: 40), buildTypeMetadata(), buildItemsTable(),
          const SizedBox(height: 40), buildTotals(), buildPaymentDetails(),
          if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[const SizedBox(height: 40), buildNotes()],
          const SizedBox(height: 48),
          Text(business.footerText ?? 'Thank you.', style: const TextStyle(fontSize: 11, color: AppColors.darkGrey, fontStyle: FontStyle.italic)),
        ]),
      ]),
    );
  }
}
// ── Creative Batch Preview ──────────────────────────────────────────────────
class CreativeBatchPreview extends StatelessWidget with InvoiceTemplateHelpers {
  @override final Invoice invoice;
  @override final BusinessInfo business;
  @override final String Function(double) fmtMoney;
  final PdfTemplate template;

  const CreativeBatchPreview({super.key, required this.invoice, required this.business, required this.fmtMoney, required this.template});

  @override
  Widget build(BuildContext context) {
    final theme = _getPreviewTheme(template);
    
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.15), blurRadius: 30, offset: const Offset(0, 15))],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Stack(children: [
          // 1. Theme-based background decoration
          if (theme.background != null) theme.background!,
          
          // 2. Content
          FittedBox(
            fit: BoxFit.contain,
            alignment: Alignment.topCenter,
            child: SizedBox(
              width: 300, // Standardize width for scaling
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Header Section (3 Columns) with Background
            Container(
              decoration: BoxDecoration(
                gradient: _headerGradient(template),
              ),
              child: Stack(children: [
                if (theme.background != null) theme.background!,
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Col 1: Logo
                      Expanded(
                        flex: 1,
                        child: business.logoUrl != null
                          ? Container(
                              alignment: Alignment.centerLeft,
                              padding: const EdgeInsets.all(3),
                              decoration: BoxDecoration(color: Colors.white, border: Border.all(color: Colors.grey.shade200), borderRadius: BorderRadius.circular(4)),
                              child: Image.network(business.logoUrl!, width: 35, height: 35, fit: BoxFit.contain, errorBuilder: (_, __, ___) => const SizedBox())
                            )
                          : const SizedBox(),
                      ),
                      const SizedBox(width: 8),
                      
                      // Col 2: Company Info
                      Expanded(
                        flex: 3,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(business.name.toUpperCase(), style: TextStyle(fontWeight: FontWeight.w900, fontSize: 8, color: theme.titleColor)),
                            const SizedBox(height: 1),
                            Text(business.businessAddress ?? '', style: TextStyle(fontSize: 6, color: theme.bodyColor)),
                            Text(business.businessEmail ?? '', style: TextStyle(fontSize: 6, color: theme.bodyColor)),
                            Text(business.businessPhone ?? '', style: TextStyle(fontSize: 6, color: theme.bodyColor)),
                          ],
                        ),
                      ),
                      
                      // Col 3: INVOICE + Gold Diamond Badge
                      Expanded(
                        flex: 2,
                        child: Container(
                          alignment: Alignment.centerRight,
                          child: Stack(
                            clipBehavior: Clip.none,
                            children: [
                              FittedBox(
                                fit: BoxFit.scaleDown,
                                child: Text('INVOICE', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: theme.titleColor, letterSpacing: 0.5)),
                              ),
                              // Gold diamond badge
                              Positioned(
                                top: -7, right: -8,
                                child: Transform.rotate(
                                  angle: 0.785398,
                                  child: Container(
                                    width: 14, height: 14,
                                    color: const Color(0xFFF4A500),
                                    child: Transform.rotate(
                                      angle: -0.785398,
                                      child: const Center(
                                        child: Text('✓', style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold)),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ]),
            ),
            
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                // Standard 2-Column Info Bar
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Col 1: Bill To
                    Expanded(
                      flex: 2,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('BILL TO:', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 8, color: theme.accent, letterSpacing: 1.2)),
                          const SizedBox(height: 4),
                          Text(invoice.client.name, style: TextStyle(fontWeight: FontWeight.w900, fontSize: 9, color: theme.titleColor)),
                          if (invoice.client.companyName != null && invoice.client.companyName!.isNotEmpty)
                            Text(invoice.client.companyName!, style: TextStyle(fontSize: 7, color: theme.bodyColor)),
                          if (invoice.client.address != null)
                            Text(invoice.client.address!, style: TextStyle(fontSize: 7, color: theme.bodyColor)),
                          if (invoice.client.phone != null && invoice.client.phone!.isNotEmpty)
                            Text(invoice.client.phone!, style: TextStyle(fontSize: 7, color: theme.bodyColor)),
                        ],
                      ),
                    ),
                    
                    // Col 2: Info Table
                    Expanded(
                      flex: 2,
                      child: Column(
                        children: [
                          _previewKVRow('INVOICE:', 'INV - ${invoice.id.toString().padLeft(7, '0')}', theme.titleColor),
                          _previewKVRow('DATE:', DateFormat('yyyy-MM-dd').format(invoice.issueDate), theme.titleColor),
                          _previewKVRow('DUE DATE:', DateFormat('yyyy-MM-dd').format(invoice.dueDate), theme.titleColor),
                          if (invoice.metadata['po_number'] != null) 
                            _previewKVRow('P.O. #:', invoice.metadata['po_number'].toString(), theme.titleColor),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                const SizedBox(height: 12),
                buildTypeMetadata(),
                
                // Items Table (Description, Qty, Price, Amount)
                Column(children: [
                   Container(
                     padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                     decoration: BoxDecoration(color: theme.tableHeaderColor, borderRadius: BorderRadius.circular(4)),
                     child: const Row(children: [
                       Expanded(flex: 4, child: Text('DESCRIPTION', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 9))),
                       Expanded(child: Text('QTY', textAlign: TextAlign.right, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 9))),
                       Expanded(flex: 2, child: Text('PRICE', textAlign: TextAlign.right, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 9))),
                       Expanded(flex: 2, child: Text('AMOUNT', textAlign: TextAlign.right, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 9))),
                     ]),
                   ),
                   const SizedBox(height: 4),
                   ...invoice.items.asMap().entries.map((e) {
                     final item = e.value;
                     final odd = e.key % 2 != 0;
                     return Container(
                       padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                       color: odd ? theme.accent.withOpacity(0.05) : Colors.transparent,
                       child: Row(children: [
                         Expanded(flex: 4, child: Text(item.description, style: const TextStyle(fontSize: 10))),
                         Expanded(child: Text('${item.quantity}', textAlign: TextAlign.right, style: const TextStyle(fontSize: 10))),
                         Expanded(flex: 2, child: Text(fmtMoney(item.unitPrice), textAlign: TextAlign.right, style: const TextStyle(fontSize: 10))),
                         Expanded(flex: 2, child: Text(fmtMoney(item.total), textAlign: TextAlign.right, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10))),
                       ]),
                     );
                   }),
                ]),
                                const SizedBox(height: 16),
                 // Subtotals (right aligned)
                 Row(
                   children: [
                     // Payment method (left)
                     Expanded(
                       child: Column(
                         crossAxisAlignment: CrossAxisAlignment.start,
                         children: [
                           Text('Payment Method', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 8, color: theme.accent)),
                           const SizedBox(height: 2),
                           Text(business.bankName ?? 'Bank Transfer', style: TextStyle(fontSize: 7, color: theme.bodyColor)),
                         ],
                       ),
                     ),
                     // Subtotals (right)
                     Column(
                       crossAxisAlignment: CrossAxisAlignment.end,
                       children: [
                         _previewKVRow('Subtotal', fmtMoney(invoice.subtotal), theme.bodyColor),
                         if (invoice.discountAmount > 0)
                           _previewKVRow('Discount', '-${fmtMoney(invoice.discountAmount)}', theme.bodyColor),
                         _previewKVRow('Tax (${invoice.taxRate.toInt()}%)', fmtMoney(invoice.taxAmount), theme.bodyColor),
                       ],
                     ),
                   ],
                 ),
                 const SizedBox(height: 8),
                 // Full-width TOTAL bar
                 Container(
                   padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                   color: theme.tableHeaderColor,
                   child: Row(
                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                     children: [
                       const Text('TOTAL', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 9, letterSpacing: 1)),
                       Text(fmtMoney(invoice.totalAmount), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 9)),
                     ],
                   ),
                 ),
                 const SizedBox(height: 12),
                 // Terms & Conditions
                 Text('Terms & Policy', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 7, color: theme.bodyColor)),
                 const SizedBox(height: 2),
                 Text(invoice.notes ?? 'All payments must be received within 30 days.', style: TextStyle(fontSize: 6, color: theme.bodyColor), maxLines: 2, overflow: TextOverflow.ellipsis),

              ]),
            ),
          ]),
        ),
      ),
      
      // Bottom border
      Positioned(bottom: 0, left: 0, right: 0, child: Container(height: 6, color: theme.accent)),
    ]),
      ),
    );
  }

  Widget _previewInfoRow(String label, String val, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(fontWeight: FontWeight.w900, fontSize: 8, color: color.withOpacity(0.5))),
          const SizedBox(height: 1),
          Text(val, style: TextStyle(fontSize: 10, color: color)),
        ],
      ),
    );
  }

  Widget _previewKVRow(String label, String val, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 2),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontWeight: FontWeight.w900, fontSize: 8, color: color)),
          Text(val, style: TextStyle(fontSize: 8, color: color)),
        ],
      ),
    );
  }

  LinearGradient _headerGradient(PdfTemplate t) {
    switch (t) {
      case PdfTemplate.creative01: return const LinearGradient(colors: [Color(0xFF0D1B2A), Color(0xFF0D3043)]);
      case PdfTemplate.creative02: return const LinearGradient(colors: [Color(0xFF2C3E6A), Color(0xFF4A6FA5)]);
      case PdfTemplate.creative03: return const LinearGradient(colors: [Color(0xFF1D4ED8), Color(0xFF60A5FA)]);
      case PdfTemplate.creative04: return const LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [Color(0xFFF9A8D4), Color(0xFFBAE6FD)]);
      case PdfTemplate.creative05: return const LinearGradient(colors: [Color(0xFF111827), Color(0xFF374151)]);
      case PdfTemplate.creative06: return const LinearGradient(colors: [Color(0xFFF8F9FA), Color(0xFFE9ECEF)]);
      case PdfTemplate.creative07: return const LinearGradient(colors: [Color(0xFF5B21B6), Color(0xFF7C3AED)]);
      case PdfTemplate.creative08: return const LinearGradient(colors: [Color(0xFF1E3A8A), Color(0xFF3B82F6)]);
      case PdfTemplate.creative09: return const LinearGradient(colors: [Color(0xFFF1F5F9), Color(0xFFE2E8F0)]);
      case PdfTemplate.creative10: return const LinearGradient(colors: [Color(0xFF0F766E), Color(0xFF2DD4BF)]);
      default: return const LinearGradient(colors: [Colors.blue, Colors.blue]);
    }
  }

  _PreviewTheme _getPreviewTheme(PdfTemplate template) {
    switch (template) {
      case PdfTemplate.creative01: // Dark Teal Net
        return _PreviewTheme(
          accent: const Color(0xFF00BCD4),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF111111),
        );
      case PdfTemplate.creative02: // Blue Low-Poly
        return _PreviewTheme(
          accent: const Color(0xFF4A6FA5),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF4A6FA5),
        );
      case PdfTemplate.creative03: // Blue Diamond
        return _PreviewTheme(
          accent: const Color(0xFF3B82F6),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF3B82F6),
        );
      case PdfTemplate.creative04: // Soft Pink/Blue Gradient
        return _PreviewTheme(
          accent: const Color(0xFF7DD3FC),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF7DD3FC),
        );
      case PdfTemplate.creative05: // Dark Architecture
        return _PreviewTheme(
          accent: const Color(0xFF374151),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF1F2937),
        );
      case PdfTemplate.creative06: // Luxury Gold Marble
        return _PreviewTheme(
          accent: const Color(0xFFD4AF37),
          titleColor: const Color(0xFF1A1A1A),
          tableHeaderColor: const Color(0xFFD4AF37),
        );
      case PdfTemplate.creative07: // Glassmorphism
        return _PreviewTheme(
          accent: const Color(0xFF7C3AED),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF7C3AED),
        );
      case PdfTemplate.creative08: // Isometric
        return _PreviewTheme(
          accent: const Color(0xFF2563EB),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF1E40AF),
        );
      case PdfTemplate.creative09: // Vintage
        return _PreviewTheme(
          accent: const Color(0xFF0F172A),
          titleColor: const Color(0xFF0F172A),
          tableHeaderColor: const Color(0xFF0F172A),
        );
      case PdfTemplate.creative10: // Illustration
        return _PreviewTheme(
          accent: const Color(0xFF0D9488),
          titleColor: Colors.white,
          tableHeaderColor: const Color(0xFF0D9488),
        );
      default:
        return _PreviewTheme(accent: Colors.blue, titleColor: Colors.white, tableHeaderColor: Colors.blue);
    }
  }
}

class _PreviewTheme {
  final Color accent;
  final Color titleColor;
  final Color bodyColor;
  final Color tableHeaderColor;
  final Widget? background;
  _PreviewTheme({
    required this.accent, 
    required this.titleColor, 
    required this.tableHeaderColor, 
    this.bodyColor = Colors.black87,
    this.background
  });
}
