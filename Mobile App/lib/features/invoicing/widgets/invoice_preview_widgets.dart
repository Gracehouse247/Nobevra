// lib/features/invoicing/widgets/invoice_preview_widgets.dart
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/features/invoicing/widgets/invoice_preview_templates.dart';
import 'package:noble_invoice/core/utils/color_utils.dart';
import 'package:intl/intl.dart';

// ── Template Switcher ─────────────────────────────────────────────────────────

class TemplateSwitcher extends StatelessWidget {
  final PdfTemplate selected;
  final ValueChanged<PdfTemplate> onSelect;
  const TemplateSwitcher({super.key, required this.selected, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('Template', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
        const SizedBox(height: 10),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(children: PdfTemplate.values.map((t) {
            final isActive = selected == t;
            return GestureDetector(
              onTap: () => onSelect(t),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                margin: const EdgeInsets.only(right: 10),
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 9),
                decoration: BoxDecoration(
                  color: isActive ? (t.isPremium ? Colors.amber.shade600 : AppColors.primary) : Colors.transparent,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: isActive ? (t.isPremium ? Colors.amber.shade600 : AppColors.primary) : AppColors.lightGrey),
                ),
                child: Text(t.label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: isActive ? Colors.white : (t.isPremium ? Colors.amber.shade700 : AppColors.darkGrey))),
              ),
            );
          }).toList()),
        ),
      ]),
    );
  }
}

// ── Type Badge ────────────────────────────────────────────────────────────────

class TypeBadge extends StatelessWidget {
  final InvoiceType type;
  final Color       accent;
  const TypeBadge({super.key, required this.type, required this.accent});

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
    decoration: BoxDecoration(color: accent.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
    child: Text(type.label.toUpperCase(), style: TextStyle(color: accent, fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1.5)),
  );
}

// ── Preview Bottom Bar ────────────────────────────────────────────────────────

class PreviewBottomBar extends StatelessWidget {
  final bool         isGenerating;
  final VoidCallback onSave;
  final VoidCallback onIssue;
  const PreviewBottomBar({super.key, required this.isGenerating, required this.onSave, required this.onIssue});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(100),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.7),
              borderRadius: BorderRadius.circular(100),
              border: Border.all(color: Colors.white.withOpacity(0.5)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                )
              ]
            ),
            child: Row(children: [
              Expanded(child: OutlinedButton.icon(
                onPressed: isGenerating ? null : onSave,
                style: OutlinedButton.styleFrom(
                  backgroundColor: Colors.white.withOpacity(0.5),
                  padding: const EdgeInsets.symmetric(vertical: 16), 
                  side: BorderSide.none, 
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(100))
                ),
                icon: isGenerating ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2)) : const Icon(Icons.download_rounded, color: AppColors.primary, size: 18),
                label: Text(isGenerating ? 'Working...' : 'Save PDF', style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
              )),
              const SizedBox(width: 8),
              Expanded(flex: 2, child: ElevatedButton.icon(
                onPressed: isGenerating ? null : onIssue,
                style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryDark, padding: const EdgeInsets.symmetric(vertical: 16), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(100)), elevation: 0),
                icon: const Icon(Icons.send_rounded, color: Colors.white, size: 18),
                label: const Text('Confirm & Issue', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
              )),
            ]),
          ),
        ),
      ),
    );
  }
}

// ── Paper Document (Dispatcher) ───────────────────────────────────────────────
// Template rendering is fully delegated to InvoicePreviewTemplates.
// This widget simply dispatches to the correct template class.

class PaperDocument extends StatelessWidget {
  final Invoice      invoice;
  final PdfTemplate  template;
  final BusinessInfo business;
  final String Function(double) fmtMoney;

  const PaperDocument({super.key, required this.invoice, required this.template, required this.business, required this.fmtMoney});

  Color get accent => ColorUtils.fromHex(business.brandColor);

  @override
  Widget build(BuildContext context) {
    if (template.name.startsWith('creative') && template != PdfTemplate.creativeBold) {
      return CreativeBatchPreview(invoice: invoice, business: business, fmtMoney: fmtMoney, template: template);
    }
    if (template == PdfTemplate.creativeBold)      return CreativeBoldTemplate(invoice: invoice, business: business, fmtMoney: fmtMoney);
    if (template == PdfTemplate.enterpriseStandard) return EnterpriseStandardTemplate(invoice: invoice, business: business, fmtMoney: fmtMoney);
    if (template == PdfTemplate.minimalistAlpha)   return MinimalistAlphaTemplate(invoice: invoice, business: business, fmtMoney: fmtMoney);
    return _DefaultTemplate(invoice: invoice, template: template, business: business, fmtMoney: fmtMoney, accent: accent);
  }
}

// ── Default Template ──────────────────────────────────────────────────────────

class _DefaultTemplate extends StatelessWidget with InvoiceTemplateHelpers {
  @override final Invoice invoice;
  @override final BusinessInfo business;
  @override final String Function(double) fmtMoney;
  final PdfTemplate template;
  final Color accent;

  const _DefaultTemplate({required this.invoice, required this.template, required this.business, required this.fmtMoney, required this.accent});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 24, offset: const Offset(0, 12))]),
      child: Stack(children: [
        buildWatermark(),
        Column(children: [
          if (template == PdfTemplate.modern || template == PdfTemplate.bold)
            Container(height: 6, decoration: BoxDecoration(color: accent, borderRadius: const BorderRadius.vertical(top: Radius.circular(16)))),
          Padding(padding: const EdgeInsets.all(24), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            _buildHeader(), const Padding(padding: EdgeInsets.symmetric(vertical: 20), child: Divider(height: 1)),
            buildBillTo(), const SizedBox(height: 24), buildTypeMetadata(), buildItemsTable(),
            const SizedBox(height: 16), buildTotals(), buildPaymentDetails(),
            if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[const SizedBox(height: 20), buildNotes()],
            if (template == PdfTemplate.modern || template == PdfTemplate.bold) ...[const SizedBox(height: 24), _buildQrSection()],
            const SizedBox(height: 32), buildFooter(),
          ])),
        ]),
      ]),
    );
  }

  Widget _buildHeader() => Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, crossAxisAlignment: CrossAxisAlignment.start, children: [
    Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (business.logoUrl != null)
        Container(width: 50, height: 50, margin: const EdgeInsets.only(bottom: 8), decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), image: DecorationImage(image: NetworkImage(business.logoUrl!), fit: BoxFit.contain)))
      else
        Container(width: 44, height: 44, decoration: BoxDecoration(color: accent, borderRadius: BorderRadius.circular(10)), child: const Icon(Icons.token_rounded, color: Colors.white, size: 28)),
      const SizedBox(height: 12),
      Text(business.name, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16)),
      Text(business.businessEmail ?? '', style: const TextStyle(fontSize: 11, color: AppColors.darkGrey)),
    ]),
    Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
      Text(typeLabel(), style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, color: accent, letterSpacing: 0.5)),
      const SizedBox(height: 6),
      Text('No. ${invoice.id}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
      const SizedBox(height: 12),
      Text('Issued: ${DateFormat('MMM dd, yyyy').format(invoice.issueDate)}', style: const TextStyle(fontSize: 11, color: AppColors.darkGrey)),
      Text('Due:    ${DateFormat('MMM dd, yyyy').format(invoice.dueDate)}', style: const TextStyle(fontSize: 11, color: Colors.redAccent, fontWeight: FontWeight.bold)),
    ]),
  ]);

  Widget _buildQrSection() => Row(children: [
    Container(width: 64, height: 64, decoration: BoxDecoration(color: AppColors.lightGrey, borderRadius: BorderRadius.circular(8), border: Border.all(color: AppColors.lightGrey)), child: const Icon(Icons.qr_code_2_rounded, size: 40, color: AppColors.darkGrey)),
    const SizedBox(width: 14),
    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('SCAN TO PAY', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: accent, letterSpacing: 1.2)),
      const SizedBox(height: 4),
      const Text('Your client can scan this QR code to view and pay this invoice instantly via the Nobevra portal.', style: TextStyle(fontSize: 11, color: AppColors.darkGrey, height: 1.4)),
    ])),
  ]);
}

// ── Shared Micro-Widgets ──────────────────────────────────────────────────────

class SectionLabel extends StatelessWidget {
  final String text;
  const SectionLabel({super.key, required this.text});
  @override
  Widget build(BuildContext context) => Text(text, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.darkGrey, letterSpacing: 1.5));
}

class ColHead extends StatelessWidget {
  final String text;
  final bool   right;
  const ColHead({super.key, required this.text, this.right = false});
  @override
  Widget build(BuildContext context) => Text(text, textAlign: right ? TextAlign.right : TextAlign.left, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppColors.darkGrey, letterSpacing: 1));
}

class TotalLine extends StatelessWidget {
  final String label, value;
  final Color? color;
  const TotalLine({super.key, required this.label, required this.value, this.color});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 6),
    child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(label, style: const TextStyle(fontSize: 12, color: AppColors.darkGrey)),
      Text(value, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: color ?? AppColors.black)),
    ]),
  );
}

class MetaRow extends StatelessWidget {
  final String label, value;
  const MetaRow({super.key, required this.label, required this.value});
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 6),
    child: Row(children: [
      SizedBox(width: 140, child: Text(label, style: const TextStyle(fontSize: 11, color: AppColors.darkGrey, fontWeight: FontWeight.w600))),
      Expanded(child: Text(value, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold))),
    ]),
  );
}

class EntInfo extends StatelessWidget {
  final String label, value;
  const EntInfo({super.key, required this.label, required this.value});
  @override
  Widget build(BuildContext context) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    Text(label, style: const TextStyle(fontSize: 9, color: AppColors.darkGrey, fontWeight: FontWeight.bold, letterSpacing: 1)),
    const SizedBox(height: 2),
    Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
  ]);
}
