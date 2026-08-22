// lib/features/invoicing/screens/invoice_details_screen.dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'package:provider/provider.dart';
import 'package:screenshot/screenshot.dart';
import 'package:share_plus/share_plus.dart';

import 'package:noble_invoice/core/services/client_portal_service.dart';
import 'package:noble_invoice/core/services/invoice_pdf_service.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/glass_widgets.dart';
import 'package:noble_invoice/features/expenses/controllers/expense_controller.dart';
import 'package:noble_invoice/features/expenses/models/expense_model.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart' as ctrl;
import 'package:noble_invoice/features/invoicing/controllers/invoice_operations.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart' as model;
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/features/invoicing/widgets/details/invoice_details_actions.dart';
import 'package:noble_invoice/features/invoicing/widgets/signature_modal.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/routes/app_routes.dart';

// ─────────────────────────────────────────────────────────────────────────────
// InvoiceDetailsScreen
// Displays the full detail view for a single invoice, with share/sign/pay
// actions and a project‑cost profitability section.
// ─────────────────────────────────────────────────────────────────────────────

class InvoiceDetailsScreen extends StatefulWidget {
  final int invoiceId;
  const InvoiceDetailsScreen({super.key, required this.invoiceId});

  @override
  State<InvoiceDetailsScreen> createState() => _InvoiceDetailsScreenState();
}

class _InvoiceDetailsScreenState extends State<InvoiceDetailsScreen> {
  final ScreenshotController _screenshotController = ScreenshotController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ctrl.InvoiceController>().getInvoiceDetails(widget.invoiceId);
    });
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  model.Invoice _mapToInvoice(ctrl.InvoiceDetails details) {
    return model.Invoice(
      id:            details.invoiceNumber,
      client:        details.client,
      items:         details.items,
      issueDate:     DateTime.tryParse(details.issueDate) ?? DateTime.now(),
      dueDate:       DateTime.tryParse(details.dueDate) ?? DateTime.now(),
      status:        _mapStatus(details.status),
      invoiceType:   details.invoiceType,
      notes:         details.notes,
      taxRate:       details.taxRate,
      taxType:       details.taxType,
      discountType:  details.discountType,
      discountValue: details.discountValue,
      currencyCode:  details.currencyCode ?? 'USD',
      metadata:      details.metadata,
    );
  }

  model.InvoiceStatus _mapStatus(String status) {
    switch (status.toLowerCase()) {
      case 'paid':    return model.InvoiceStatus.paid;
      case 'pending': return model.InvoiceStatus.pending;
      case 'overdue': return model.InvoiceStatus.overdue;
      case 'draft':   return model.InvoiceStatus.draft;
      default:        return model.InvoiceStatus.pending;
    }
  }

  BusinessInfo _getBusinessInfo() {
    final profile = context.read<ProfileController>().profile;
    return BusinessInfo(
      name:            profile?.businessName ?? profile?.displayName ?? 'My Business',
      businessAddress: profile?.businessAddress ?? '',
      businessPhone:   profile?.businessPhone ?? profile?.phone ?? '',
      businessEmail:   profile?.businessEmail ?? profile?.email ?? '',
      logoUrl:         profile?.brandLogoUrl,
    );
  }

  // ── Share ────────────────────────────────────────────────────────────────────

  Future<void> _sharePdf(ctrl.InvoiceDetails details, PdfTemplate template) async {
    try {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Preparing PDF…'), duration: Duration(seconds: 1)),
      );
      final business     = _getBusinessInfo();
      final invoiceModel = _mapToInvoice(details);
      final bytes        = await InvoicePdfService.generateBytes(invoiceModel, template: template, business: business);

      final tempDir = await getTemporaryDirectory();
      final file    = await File('${tempDir.path}/invoice_${details.invoiceNumber}.pdf').create();
      await file.writeAsBytes(bytes);

      final portalUrl = ClientPortalService.getPublicInvoiceUrl(invoiceModel);
      String shareText = 'Invoice ${details.invoiceNumber} from ${business.name}';
      if (portalUrl.isNotEmpty) shareText += '\n\nView and Pay Online: $portalUrl';

      await Share.shareXFiles([XFile(file.path)], text: shareText);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Share failed: $e')),
        );
      }
    }
  }

  Future<void> _shareImage(ctrl.InvoiceDetails details) async {
    try {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Generating image…'), duration: Duration(seconds: 1)),
      );
      final bytes = await _screenshotController.capture(delay: const Duration(milliseconds: 100));
      if (bytes == null) return;

      final tempDir = await getTemporaryDirectory();
      final file    = await File('${tempDir.path}/invoice_${details.invoiceNumber}.png').create();
      await file.writeAsBytes(bytes);

      final invoiceModel = _mapToInvoice(details);
      final portalUrl    = ClientPortalService.getPublicInvoiceUrl(invoiceModel);
      String shareText   = 'Invoice ${details.invoiceNumber}';
      if (portalUrl.isNotEmpty) shareText += '\n\nView Online: $portalUrl';

      await Share.shareXFiles([XFile(file.path)], text: shareText);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Share failed: $e')),
        );
      }
    }
  }

  void _copyShareLink(ctrl.InvoiceDetails details) {
    final portalUrl = ClientPortalService.getPublicInvoiceUrl(_mapToInvoice(details));
    if (portalUrl.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Portal link not available'), backgroundColor: Colors.orange),
      );
      return;
    }
    Clipboard.setData(ClipboardData(text: portalUrl));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Invoice link copied to clipboard'), backgroundColor: AppColors.primary),
    );
  }

  void _previewPortal(ctrl.InvoiceDetails details) {
    ClientPortalService.previewAsClient(_mapToInvoice(details));
  }

  void _showShareOptions(
    BuildContext context,
    ctrl.InvoiceController invoiceCtrl,
    ctrl.InvoiceDetails details,
  ) {
    final template = PdfTemplate.modern;
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (_) => Container(
        padding: const EdgeInsets.fromLTRB(20, 12, 20, 40),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40, height: 4,
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: const Color(0xFFCBD5E1),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            const Text('Share Invoice',
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18)),
            const SizedBox(height: 20),
            _shareOption(
              icon: Icons.picture_as_pdf_rounded,
              color: Colors.red,
              label: 'Share as PDF',
              onTap: () { Navigator.pop(context); _sharePdf(details, template); },
            ),
            const SizedBox(height: 12),
            _shareOption(
              icon: Icons.image_rounded,
              color: Colors.blue,
              label: 'Share as Image',
              onTap: () { Navigator.pop(context); _shareImage(details); },
            ),
            const SizedBox(height: 12),
            _shareOption(
              icon: Icons.link_rounded,
              color: AppColors.primary,
              label: 'Copy Client Portal Link',
              onTap: () { Navigator.pop(context); _copyShareLink(details); },
            ),
          ],
        ),
      ),
    );
  }

  Widget _shareOption({
    required IconData icon,
    required Color color,
    required String label,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: color.withOpacity(0.06),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: color.withOpacity(0.15)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withOpacity(0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 14),
            Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const Spacer(),
            Icon(Icons.chevron_right_rounded, color: Colors.grey[400], size: 20),
          ],
        ),
      ),
    );
  }

  // ── Build ────────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final invoiceCtrl = context.watch<ctrl.InvoiceController>();
    final sub         = context.watch<SubscriptionController>();
    final invoice     = invoiceCtrl.currentDetails;

    if (invoiceCtrl.isLoading && invoice == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: GlassAppBar(
        backgroundColor: Colors.white.withOpacity(0.85),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          invoice?.invoiceNumber != null ? 'INV-${invoice!.invoiceNumber}' : 'Details',
          style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        actions: [
          if (invoice != null)
            IconButton(
              icon: const Icon(Icons.edit_outlined, color: Colors.black),
              tooltip: 'Edit Invoice',
              onPressed: () => Navigator.pushNamed(
                context,
                AppRoutes.createInvoice,
                arguments: invoice,
              ),
            ),
        ],
      ),
      body: invoice == null
          ? const Center(child: Text('Invoice not found'))
          : Hero(
              tag: 'invoice-${invoice.invoiceNumber}',
              child: Material(
                color: Colors.transparent,
                child: Screenshot(
                  controller: _screenshotController,
                  child: ListView(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 160),
                    children: [
                      // ── Header Card ──────────────────────────────────────
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.05),
                              blurRadius: 20,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        invoice.client.name,
                                        style: const TextStyle(
                                          fontSize: 22,
                                          fontWeight: FontWeight.w900,
                                          letterSpacing: -0.5,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        'INV-${invoice.invoiceNumber}',
                                        style: TextStyle(
                                          fontSize: 13,
                                          color: Colors.grey[500],
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                _StatusBadge(status: invoice.status),
                              ],
                            ),
                            const SizedBox(height: 16),
                            const Divider(color: Color(0xFFF1F5F9)),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                _DetailItem(
                                  label: 'Total Amount',
                                  value: '${invoice.currencyCode ?? 'USD'} ${invoice.totalAmount.toStringAsFixed(2)}',
                                  valueStyle: const TextStyle(
                                    fontSize: 20,
                                    color: AppColors.primary,
                                    fontWeight: FontWeight.w900,
                                    letterSpacing: -0.5,
                                  ),
                                ),
                                _DetailItem(
                                  label: 'Due Date',
                                  value: DateFormat('MMM dd, yyyy').format(
                                    DateTime.tryParse(invoice.dueDate) ?? DateTime.now(),
                                  ),
                                  alignment: CrossAxisAlignment.end,
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                _DetailItem(
                                  label: 'Issue Date',
                                  value: DateFormat('MMM dd, yyyy').format(
                                    DateTime.tryParse(invoice.issueDate) ?? DateTime.now(),
                                  ),
                                ),
                                _DetailItem(
                                  label: 'Type',
                                  value: invoice.invoiceType.name.toUpperCase(),
                                  alignment: CrossAxisAlignment.end,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),

                      // ── Line Items ───────────────────────────────────────
                      if (invoice.items.isNotEmpty) ...[
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.04),
                                blurRadius: 16,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Line Items',
                                style: TextStyle(
                                  fontWeight: FontWeight.w900,
                                  fontSize: 15,
                                  letterSpacing: -0.5,
                                ),
                              ),
                              const SizedBox(height: 12),
                              ...invoice.items.map((item) => Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 6),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: [
                                              Text(item.description,
                                                  style: const TextStyle(
                                                      fontWeight: FontWeight.bold, fontSize: 13)),
                                              Text(
                                                '${item.quantity} × ${invoice.currencyCode ?? 'USD'} ${item.unitPrice.toStringAsFixed(2)}',
                                                style: TextStyle(
                                                    color: Colors.grey[500], fontSize: 12),
                                              ),
                                            ],
                                          ),
                                        ),
                                        Text(
                                          '${invoice.currencyCode ?? 'USD'} ${(item.quantity * item.unitPrice).toStringAsFixed(2)}',
                                          style: const TextStyle(
                                              fontWeight: FontWeight.bold, fontSize: 14),
                                        ),
                                      ],
                                    ),
                                  )),
                              const Divider(color: Color(0xFFF1F5F9)),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  Text(
                                    'Total: ${invoice.currencyCode ?? 'USD'} ${invoice.totalAmount.toStringAsFixed(2)}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w900,
                                      fontSize: 15,
                                      color: AppColors.primary,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 16),
                      ],

                      // ── Project Costs ────────────────────────────────────
                      _ProjectCostsSection(
                        invoiceId:    widget.invoiceId,
                        invoiceNumber: invoice.invoiceNumber,
                        invoiceTotal: invoice.totalAmount,
                        currencyCode: invoice.currencyCode ?? 'USD',
                      ),

                      // ── Notes ────────────────────────────────────────────
                      if (invoice.notes != null && invoice.notes!.isNotEmpty) ...[
                        const SizedBox(height: 16),
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.04),
                                blurRadius: 16,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Notes',
                                style: TextStyle(
                                  fontWeight: FontWeight.w900,
                                  fontSize: 15,
                                  letterSpacing: -0.5,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                invoice.notes!,
                                style: TextStyle(
                                  color: Colors.grey[600],
                                  fontSize: 13,
                                  height: 1.6,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
      bottomSheet: invoice != null
          ? InvoiceDetailsActions(
              invoice: invoice,
              onMarkPaid: () async {
                if (await invoiceCtrl.updateStatus(invoice.id, 'paid') && mounted) {
                  invoiceCtrl.getInvoiceDetails(invoice.id);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Invoice Marked as Paid'),
                      backgroundColor: Colors.green,
                    ),
                  );
                }
              },
              onShare:         () => _showShareOptions(context, invoiceCtrl, invoice),
              onCopyLink:      () => _copyShareLink(invoice),
              onPreviewPortal: () => _previewPortal(invoice),
              onConvert: () async {
                final success = await invoiceCtrl.convertToInvoice(invoice.id, sub);
                if (success && mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Converted to Invoice!'), backgroundColor: Colors.green),
                  );
                  Navigator.pop(context);
                }
              },
              onSign: () async {
                final result = await showSignatureModal(context);
                if (result != null && mounted) {
                  final success = await invoiceCtrl.updateMetadata(invoice.id, {
                    'signature':        signatureBytesToBase64(result.bytes),
                    'signature_source': result.source.name,
                    'signed_at':        DateTime.now().toIso8601String(),
                  });
                  if (success && mounted) {
                    invoiceCtrl.getInvoiceDetails(invoice.id);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Signature Applied!'), backgroundColor: Colors.green),
                    );
                  }
                }
              },
            )
          : null,
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Widgets
// ─────────────────────────────────────────────────────────────────────────────

class _StatusBadge extends StatelessWidget {
  final String status;
  const _StatusBadge({required this.status});

  Color get _color {
    switch (status.toLowerCase()) {
      case 'paid':    return Colors.green;
      case 'overdue': return Colors.red;
      case 'draft':   return Colors.grey;
      default:        return Colors.amber;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: _color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Text(
        status.toUpperCase(),
        style: TextStyle(
          color: _color,
          fontSize: 11,
          fontWeight: FontWeight.w900,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}

class _DetailItem extends StatelessWidget {
  final String label;
  final String value;
  final TextStyle? valueStyle;
  final CrossAxisAlignment alignment;

  const _DetailItem({
    required this.label,
    required this.value,
    this.valueStyle,
    this.alignment = CrossAxisAlignment.start,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: alignment,
      children: [
        Text(label, style: TextStyle(color: Colors.grey[500], fontSize: 11, fontWeight: FontWeight.w600)),
        const SizedBox(height: 2),
        Text(value, style: valueStyle ?? const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Costs Section
// Lazy-loads expenses linked to a specific invoice and shows a profit summary.
// ─────────────────────────────────────────────────────────────────────────────

class _ProjectCostsSection extends StatefulWidget {
  final int    invoiceId;
  final String invoiceNumber;
  final double invoiceTotal;
  final String currencyCode;

  const _ProjectCostsSection({
    required this.invoiceId,
    required this.invoiceNumber,
    required this.invoiceTotal,
    required this.currencyCode,
  });

  @override
  State<_ProjectCostsSection> createState() => _ProjectCostsSectionState();
}

class _ProjectCostsSectionState extends State<_ProjectCostsSection> {
  List<Expense> _expenses = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final results = await context
        .read<ExpenseController>()
        .loadExpensesForInvoice(widget.invoiceId);
    if (mounted) setState(() { _expenses = results; _isLoading = false; });
  }

  double get _totalCost => _expenses.fold(0.0, (s, e) => s + e.amount);
  double get _netProfit => widget.invoiceTotal - _totalCost;
  double get _margin    => widget.invoiceTotal > 0 ? (_netProfit / widget.invoiceTotal) * 100 : 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          leading: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.error.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(Icons.receipt_long_rounded, color: AppColors.error, size: 18),
          ),
          title: const Text(
            'Project Costs',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
          ),
          subtitle: _isLoading
              ? const Text('Loading…', style: TextStyle(fontSize: 12, color: AppColors.darkGrey))
              : Text(
                  _expenses.isEmpty
                    ? 'No costs logged yet'
                    : '${_expenses.length} item${_expenses.length > 1 ? 's' : ''} · \$${_totalCost.toStringAsFixed(2)}',
                  style: const TextStyle(fontSize: 12, color: AppColors.darkGrey),
                ),
          children: [
            if (_isLoading)
              const Padding(
                padding: EdgeInsets.all(16),
                child: Center(child: CircularProgressIndicator(strokeWidth: 2)),
              )
            else if (_expenses.isEmpty)
              _buildEmptyState()
            else ...[
              ..._expenses.map((exp) => _buildExpenseRow(exp)),
              const SizedBox(height: 12),
              _buildProfitCard(),
              const SizedBox(height: 12),
            ],
            // Log Expense CTA — always shown
            OutlinedButton.icon(
              onPressed: () async {
                await Navigator.pushNamed(
                  context,
                  AppRoutes.addExpense,
                  arguments: {
                    'preLinkedInvoiceId':    widget.invoiceId,
                    'preLinkedInvoiceLabel': widget.invoiceNumber,
                  },
                );
                _load(); // Refresh after returning
              },
              icon: const Icon(Icons.add_rounded, size: 16),
              label: const Text('Log Expense for this Invoice'),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.primary,
                side: BorderSide(color: AppColors.primary.withOpacity(0.4)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                minimumSize: const Size(double.infinity, 44),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(children: [
        Icon(Icons.inbox_rounded, size: 40, color: AppColors.lightGrey.withOpacity(0.5)),
        const SizedBox(height: 8),
        const Text('No costs linked to this invoice yet.',
            style: TextStyle(fontSize: 13, color: AppColors.darkGrey)),
        const Text('Log your costs to see your profit margin.',
            style: TextStyle(fontSize: 12, color: AppColors.lightGrey)),
        const SizedBox(height: 12),
      ]),
    );
  }

  Widget _buildExpenseRow(Expense exp) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(children: [
        Container(
          padding: const EdgeInsets.all(6),
          decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9), borderRadius: BorderRadius.circular(8)),
          child: const Icon(Icons.receipt_rounded, size: 14, color: AppColors.darkGrey),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(exp.vendorName ?? exp.categoryName ?? 'Expense',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          Text(DateFormat('MMM dd, yyyy').format(exp.date),
              style: const TextStyle(fontSize: 11, color: AppColors.darkGrey)),
        ])),
        Text('-\$${exp.amount.toStringAsFixed(2)}',
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.error)),
      ]),
    );
  }

  Widget _buildProfitCard() {
    final isProfit = _netProfit >= 0;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isProfit ? AppColors.success.withOpacity(0.05) : AppColors.error.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
            color: isProfit ? AppColors.success.withOpacity(0.2) : AppColors.error.withOpacity(0.2)),
      ),
      child: Column(children: [
        _profitRow('Invoice Total', '\$${widget.invoiceTotal.toStringAsFixed(2)}', AppColors.black),
        _profitRow('Total Costs',   '-\$${_totalCost.toStringAsFixed(2)}',        AppColors.error),
        const Divider(height: 16),
        Row(children: [
          Expanded(child: Text('Net Profit',
              style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                  color: isProfit ? AppColors.success : AppColors.error))),
          Text('\$${_netProfit.toStringAsFixed(2)}',
              style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                  color: isProfit ? AppColors.success : AppColors.error)),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: isProfit ? AppColors.success.withOpacity(0.1) : AppColors.error.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              '${_margin.toStringAsFixed(0)}%',
              style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  color: isProfit ? AppColors.success : AppColors.error),
            ),
          ),
        ]),
      ]),
    );
  }

  Widget _profitRow(String label, String value, Color valueColor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(children: [
        Expanded(child: Text(label,
            style: const TextStyle(fontSize: 13, color: AppColors.darkGrey))),
        Text(value,
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: valueColor)),
      ]),
    );
  }
}
