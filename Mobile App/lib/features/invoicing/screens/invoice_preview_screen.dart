// lib/features/invoicing/screens/invoice_preview_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/services/invoice_pdf_service.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_operations.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:collection/collection.dart';
import 'package:noble_invoice/features/invoicing/widgets/invoice_preview_widgets.dart';
import 'package:printing/printing.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:url_launcher/url_launcher.dart';


class InvoicePreviewScreen extends StatefulWidget {
  final Invoice invoice;
  final PdfTemplate? initialTemplate;
  const InvoicePreviewScreen({super.key, required this.invoice, this.initialTemplate});

  @override
  State<InvoicePreviewScreen> createState() => _InvoicePreviewScreenState();
}

class _InvoicePreviewScreenState extends State<InvoicePreviewScreen> {
  late PdfTemplate _template;
  bool _isGenerating   = false;
  Color? _liveBrandColor;

  final List<Color> _brandColors = [
    const Color(0xFF2563EB), // Noble Blue
    const Color(0xFF0F172A), // Slate
    const Color(0xFF16A34A), // Emerald
    const Color(0xFFDC2626), // Rose
    const Color(0xFF7C3AED), // Violet
    const Color(0xFFEA580C), // Orange
  ];

  @override
  void initState() {
    super.initState();
    final profile = context.read<ProfileController>().profile;
    final team = context.read<TeamController>().activeTeam;
    PdfTemplate? defaultT;
    final defaultTemplateStr = team?.defaultInvoiceTemplate ?? profile?.defaultInvoiceTemplate;
    if (defaultTemplateStr != null) {
      defaultT = PdfTemplate.values.firstWhereOrNull((t) => t.name == defaultTemplateStr);
    }
    _template = widget.initialTemplate ?? defaultT ?? PdfTemplate.modern;
  }

  Invoice get inv => widget.invoice;

  // Brand color matching invoiceType
  Color _accentColor() {
    switch (inv.invoiceType) {
      case InvoiceType.creditMemo:   return const Color(0xFF10B981);
      case InvoiceType.debitMemo:    return const Color(0xFFEF4444);
      case InvoiceType.proforma:     return const Color(0xFFF59E0B);
      case InvoiceType.commercial:   return const Color(0xFF0D9488);
      case InvoiceType.progress:     return const Color(0xFF7C3AED);
      case InvoiceType.recurring:    return const Color(0xFF16A34A);
      case InvoiceType.mixed:        return const Color(0xFFEA580C);
      default:                       return AppColors.primary;
    }
  }

  String _fmtMoney(double v) {
    const symbols = {'USD':'\$','EUR':'€','GBP':'£','NGN':'₦','GHS':'₵','KES':'KSh ','ZAR':'R ','CAD':'CA\$','AUD':'AU\$'};
    final symbol = symbols[inv.currencyCode] ?? '${inv.currencyCode} ';
    return '$symbol${v.toStringAsFixed(2)}';
  }

  BusinessInfo _getBusinessInfo() {
    final pc = context.read<ProfileController>();
    final tc = context.read<TeamController>();
    final p  = pc.profile;
    final t  = tc.activeTeam;

    String? hexColor;
    if (_liveBrandColor != null) {
      hexColor = '#${_liveBrandColor!.value.toRadixString(16).padLeft(8, '0').substring(2).toUpperCase()}';
    }

    if (t != null) {
      return BusinessInfo(
        name:          t.name,
        industry:      p?.industry,
        businessAddress: t.businessAddress,
        businessEmail:   t.businessEmail,
        businessPhone:   t.businessPhone,
        taxNumber:       t.taxNumber,
        logoUrl:         t.brandLogoUrl,
        brandColor:      hexColor ?? t.brandColor,
        footerText:      t.invoiceFooter,
        bankName:      p?.bankName,
        accountName:   p?.accountName,
        accountNumber: p?.accountNumber,
        defaultTemplate: t.defaultInvoiceTemplate,
      );
    }

    if (p == null) return BusinessInfo.placeholder();

    return BusinessInfo(
      name:          p.businessName ?? p.company ?? p.displayName ?? 'My Business',
      industry:      p.industry,
      businessAddress: p.businessAddress,
      businessEmail:   p.businessEmail ?? p.email,
      businessPhone:   p.businessPhone,
      taxNumber:       p.taxNumber,
      logoUrl:         p.brandLogoUrl,
      brandColor:      hexColor ?? p.brandColor,
      footerText:      p.invoiceFooter,
      bankName:      p.bankName,
      accountName:   p.accountName,
      accountNumber: p.accountNumber,
      defaultTemplate: p.defaultInvoiceTemplate,
    );
  }

  Future<void> _savePdf() async {
    setState(() => _isGenerating = true);
    try {
      await InvoicePdfService.generateAndOpen(inv,
        template: _template,
        business: _getBusinessInfo(),
      );
    } catch (e) {
      if (mounted) _showSnack('Could not generate PDF: $e', error: true);
    }
    if (mounted) setState(() => _isGenerating = false);
  }

  Future<void> _sharePdf() async {
    setState(() => _isGenerating = true);
    try {
      await InvoicePdfService.generateAndShare(inv,
        template: _template,
        business: _getBusinessInfo(),
      );
    } catch (e) {
      if (mounted) _showSnack('Could not share PDF: $e', error: true);
    }
    if (mounted) setState(() => _isGenerating = false);
  }

  // Opens WhatsApp pre-filled with the invoice message.
  // If the client has a phone number saved, it opens a direct chat.
  // If not, it opens WhatsApp without a number so the user can pick any contact.
  Future<void> _sendViaWhatsApp() async {
    final senderName = context.read<ProfileController>().profile?.businessName
        ?? context.read<ProfileController>().profile?.displayName
        ?? 'Nobevra';

    final amount = _fmtMoney(inv.totalAmount);
    final clientName = inv.client.name.isNotEmpty ? inv.client.name : 'there';
    final invoiceNum = inv.invoiceNumber;

    final message =
        'Hello $clientName,\n\n'
        'Please find your Invoice *#$invoiceNum* for *$amount* from *$senderName*.\n\n'
        'Kindly review and make payment at your earliest convenience.\n\n'
        'Thank you for your business! 🙏';

    final encoded = Uri.encodeComponent(message);

    // Strip non-numeric characters from phone, then build the URL.
    // If no phone is saved, open generic WhatsApp (user picks the contact).
    final rawPhone = inv.client.phone?.replaceAll(RegExp(r'\D'), '') ?? '';
    final waUrl = rawPhone.isNotEmpty
        ? 'https://wa.me/$rawPhone?text=$encoded'
        : 'https://wa.me/?text=$encoded';

    final uri = Uri.parse(waUrl);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      if (mounted) _showSnack('Could not open WhatsApp. Please make sure it is installed.', error: true);
    }
  }

  Future<void> _confirmAndIssue() async {
    final ctrl = context.read<InvoiceController>();
    final sub = context.read<SubscriptionController>();
    final success = await ctrl.createInvoice(InvoiceCreatePayload(
      clientId:      inv.client.id,
      items:         inv.items,
      dueDate:       inv.dueDate,
      status:        'pending',
      notes:         inv.notes,
      invoiceType:   inv.invoiceType,
      taxRate:       inv.taxRate,
      taxType:       inv.taxType,
      discountType:  inv.discountType,
      discountValue: inv.discountValue,
      currencyCode:  inv.currencyCode,
    ), sub);
    if (!mounted) return;
    if (success) {
      _showSnack('Invoice issued successfully!');
      Navigator.of(context).popUntil((r) => r.isFirst);
    } else {
      _showSnack(ctrl.errorMessage, error: true);
    }
  }

  void _showSnack(String msg, {bool error = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(msg),
      backgroundColor: error ? AppColors.error : AppColors.success,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.all(16),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF0F4F8),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text('Preview', style: TextStyle(fontWeight: FontWeight.bold)),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          // WhatsApp send button
          IconButton(
            icon: const Icon(Icons.chat_rounded, color: Color(0xFF25D366)),
            onPressed: _sendViaWhatsApp,
            tooltip: 'Send via WhatsApp',
          ),
          // PDF share button
          IconButton(
            icon: const Icon(Icons.share_rounded, color: AppColors.primary),
            onPressed: _isGenerating ? null : _sharePdf,
            tooltip: 'Share PDF',
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: ListView(children: [
        TemplateSwitcher(selected: _template, onSelect: (t) => setState(() => _template = t)),
        _buildLiveStyleEditor(),
        const SizedBox(height: 12),
        Center(child: TypeBadge(type: inv.invoiceType, accent: _accentColor())),
        const SizedBox(height: 16),
        const SizedBox(height: 16),
        TweenAnimationBuilder<double>(
          tween: Tween(begin: 0.95, end: 1.0),
          duration: const Duration(milliseconds: 600),
          curve: Curves.easeOutCubic,
          builder: (context, scale, child) {
            return Transform.scale(
              scale: scale,
              child: Opacity(
                opacity: (scale - 0.95) * 20, // 0.0 to 1.0 mapping
                child: Container(
                  height: 500,
                  margin: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 15,
                        offset: const Offset(0, 5),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: PdfPreview(
                      build: (format) => InvoicePdfService.generateBytes(
                        inv,
                        template: _template,
                        business: _getBusinessInfo(),
                      ),
                      useActions: false,
                      canChangePageFormat: false,
                      canChangeOrientation: false,
                      canDebug: false,
                      loadingWidget: const Center(child: CircularProgressIndicator()),
                    ),
                  ),
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 16),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.lightGrey),
            ),
            child: const Row(children: [
              Icon(Icons.info_outline_rounded, color: AppColors.primary, size: 18),
              SizedBox(width: 10),
              Expanded(child: Text(
                'Review all details before issuing. Once issued, the invoice number is locked and will be sent to your client.',
                style: TextStyle(fontSize: 12, color: AppColors.darkGrey, height: 1.5),
              )),
            ]),
          ),
        ),
        const SizedBox(height: 120),
      ]),
      bottomSheet: PreviewBottomBar(
        isGenerating: _isGenerating,
        onSave: _savePdf,
        onIssue: _confirmAndIssue,
      ),
    );
  }

  Widget _buildLiveStyleEditor() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.palette_outlined, size: 16, color: AppColors.primary),
              SizedBox(width: 8),
              Text('LIVE BRANDING', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AppColors.primary, letterSpacing: 1.2)),
            ],
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 36,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _brandColors.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (context, index) {
                final color = _brandColors[index];
                final isSelected = (_liveBrandColor ?? _accentColor()) == color;
                return GestureDetector(
                  onTap: () => setState(() => _liveBrandColor = color),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    width: 36, height: 36,
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                      border: Border.all(color: isSelected ? Colors.white : Colors.transparent, width: 3),
                      boxShadow: isSelected ? [BoxShadow(color: color.withOpacity(0.4), blurRadius: 8, offset: const Offset(0, 4))] : [],
                    ),
                    child: isSelected ? const Icon(Icons.check, color: Colors.white, size: 18) : null,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
