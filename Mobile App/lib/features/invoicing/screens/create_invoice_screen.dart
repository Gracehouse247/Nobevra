// lib/features/invoicing/screens/create_invoice_screen.dart
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/utils/currency_formatter.dart';
import 'package:noble_invoice/core/services/location_service.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/controllers/create_invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/models/client_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_details_model.dart';
import 'package:noble_invoice/features/invoicing/widgets/builder_financials.dart';
import 'package:noble_invoice/features/invoicing/widgets/create_invoice_widgets.dart';
import 'package:noble_invoice/features/invoicing/widgets/create_invoice_modular_widgets.dart';
import 'package:noble_invoice/features/invoicing/widgets/live_invoice_preview.dart';
import 'package:noble_invoice/features/invoicing/widgets/signature_modal.dart';
import 'package:noble_invoice/features/invoicing/widgets/signature_strip.dart';
import 'package:noble_invoice/features/invoicing/services/invoice_draft_service.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/invoicing/screens/add_invoice_item_screen.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class CreateInvoiceScreen extends StatelessWidget {
  final InvoiceType invoiceType;
  final InvoiceDetails? initialInvoice;
  final Client? initialClient;

  const CreateInvoiceScreen({
    super.key,
    required this.invoiceType,
    this.initialInvoice,
    this.initialClient,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CreateInvoiceController()
        ..initialize(
          invoiceType,
          initialInvoice,
          initialClient,
          context.read<ProfileController>(),
          context.read<TeamController>(),
          context.read<InvoiceController>(),
        ),
      child: _CreateInvoiceScreenBody(initialInvoice: initialInvoice),
    );
  }
}

class _CreateInvoiceScreenBody extends StatefulWidget {
  final InvoiceDetails? initialInvoice;
  const _CreateInvoiceScreenBody({this.initialInvoice});

  @override
  State<_CreateInvoiceScreenBody> createState() => _CreateInvoiceScreenBodyState();
}

class _CreateInvoiceScreenBodyState extends State<_CreateInvoiceScreenBody> {
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _checkAndPromptDraft();
    });
  }

  Future<void> _checkAndPromptDraft() async {
    if (widget.initialInvoice != null) return; // Don't prompt draft if editing
    final controller = context.read<CreateInvoiceController>();
    final draft = await InvoiceDraftService.load();
    if (draft == null || !mounted) return;

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Resume Draft?', style: TextStyle(fontWeight: FontWeight.bold)),
        content: const Text('We found an unsaved invoice. Resume it?'),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        actions: [
          TextButton(
            onPressed: () {
              controller.discardDraft(context.read<ProfileController>(), context.read<TeamController>());
              Navigator.pop(context);
            },
            child: const Text('Discard', style: TextStyle(color: Colors.red)),
          ),
          ElevatedButton(
            onPressed: () {
              controller.applyDraft(draft);
              Navigator.pop(context);
            },
            child: const Text('Resume'),
          ),
        ],
      ),
    );
  }

  Future<void> _selectClient(CreateInvoiceController controller) async {
    HapticFeedback.mediumImpact();
    if (context.read<TeamController>().activeTeamId == null) {
      await Navigator.pushNamed(context, AppRoutes.businessProfileRequired);
      return;
    }
    final result = await ClientSelectorSheet.show(context);
    if (result == null || !mounted) return;

    controller.setClient(result);

    final profile = context.read<ProfileController>().profile;
    final isCrossBorder = LocationService.isCrossBorder(profile?.country, result.country);
    if (isCrossBorder) {
      final suggested = LocationService.suggestCurrency(profile?.country, result.country, controller.currencyCode);
      if (suggested != controller.currencyCode) _showCrossBorderPrompt(controller, suggested);
    }

    if (controller.invoiceType == InvoiceType.finalInvoice || controller.invoiceType == InvoiceType.progress) {
      final stats = await context.read<InvoiceController>().fetchClientStats(result.id);
      controller.updateState(() {
        controller.typeMetadata['contract_value']         = stats['totalBilled'] ?? 0.0;
        controller.typeMetadata['previously_paid']        = stats['totalPaid'] ?? 0.0;
        controller.typeMetadata['remaining_balance']      = stats['outstanding'] ?? 0.0;
        controller.typeMetadata['pct_previously_billed']  = (stats['totalBilled'] ?? 0) > 0
            ? ((stats['totalPaid'] ?? 0) / (stats['totalBilled'] ?? 1) * 100).toStringAsFixed(0) : '0';
      });
      _showSnack('Project history synced for ${result.name}');
    }
  }

  void _showCrossBorderPrompt(CreateInvoiceController controller, String targetCurrency) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Row(children: [Icon(Icons.public_rounded, color: AppColors.primary), SizedBox(width: 12), Text('International Client', style: TextStyle(fontWeight: FontWeight.bold))]),
        content: Text('Invoice in $targetCurrency to match their local currency?'),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Keep')),
          ElevatedButton(
            onPressed: () { Navigator.pop(ctx); controller.convertItemsCurrency(targetCurrency); },
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryDark, foregroundColor: Colors.white),
            child: Text('Use $targetCurrency'),
          ),
        ],
      ),
    );
  }

  Future<void> _addItem(CreateInvoiceController controller) async {
    HapticFeedback.lightImpact();
    final result = await showModalBottomSheet<InvoiceItem>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withOpacity(0.2),
      builder: (_) => FractionallySizedBox(
        heightFactor: 0.92,
        child: ClipRRect(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          child: const ClientSelectorSheet(), // ClipRRect backdrop filter widget
        ),
      ),
    );
    if (result != null && mounted) controller.addItem(result);
  }

  // Fallback Add Item bottom sheet using AddInvoiceItemScreen directly
  Future<void> _addItemSheet(CreateInvoiceController controller) async {
    HapticFeedback.lightImpact();
    final result = await showModalBottomSheet<InvoiceItem>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withOpacity(0.2),
      builder: (_) => const FractionallySizedBox(
        heightFactor: 0.92,
        child: ClipRRect(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          child: AddInvoiceItemScreen(),
        ),
      ),
    );
    if (result != null && mounted) controller.addItem(result);
  }

  Future<void> _editItem(CreateInvoiceController controller, int index) async {
    HapticFeedback.lightImpact();
    final existing = controller.items[index];
    final result = await showModalBottomSheet<InvoiceItem>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withOpacity(0.2),
      builder: (_) => FractionallySizedBox(
        heightFactor: 0.92,
        child: ClipRRect(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          child: AddInvoiceItemScreen(existingItem: existing),
        ),
      ),
    );
    if (result != null && mounted) {
      controller.editItem(index, result);
    }
  }

  Future<void> _selectDate(CreateInvoiceController controller, bool isIssueDate) async {
    final picked = await showDatePicker(
      context: context,
      initialDate: isIssueDate ? controller.issueDate : controller.dueDate,
      firstDate: DateTime(2020), lastDate: DateTime(2035),
    );
    if (picked == null) return;
    controller.updateDate(isIssueDate, picked);
  }

  Future<void> _openSignatureModal(CreateInvoiceController controller) async {
    final result = await showSignatureModal(context);
    if (result != null && mounted) {
      controller.setSignature(result.bytes, result.source.name);
    }
  }

  void _showSnack(String msg, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(msg),
      backgroundColor: isError ? AppColors.error : AppColors.success,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.all(16),
    ));
  }

  Future<void> _handleSave(CreateInvoiceController controller, String status) async {
    if (_formKey.currentState?.validate() == false) return;
    
    final ic = context.read<InvoiceController>();
    final sub = context.read<SubscriptionController>();

    final success = await controller.handleSave(
      status: status,
      ic: ic,
      sub: sub,
      showSnack: (msg, {bool isError = false}) => _showSnack(msg, isError: isError),
      initialInvoice: widget.initialInvoice,
    );

    if (success && mounted) {
      _showSnack('Invoice ${status == 'draft' ? 'saved as draft' : 'issued'} successfully!');
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<CreateInvoiceController>();
    final icWatch = context.watch<InvoiceController>();
    final pcWatch = context.watch<ProfileController>();
    final tcWatch = context.watch<TeamController>();
    
    final isLoading = icWatch.isSaving;

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: const Color(0xFFF1F5F9),
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_rounded, color: Color(0xFF0F172A)),
            onPressed: () => Navigator.pop(context),
          ),
          title: const TabBar(
            isScrollable: true,
            labelColor: AppColors.primary,
            unselectedLabelColor: Color(0xFF64748B),
            labelStyle: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            indicatorColor: AppColors.primary,
            indicatorWeight: 3,
            tabs: [
              Tab(text: 'Invoice Form'),
              Tab(text: 'Preview'),
            ],
          ),
          actions: [
            IconButton(icon: const Icon(Icons.help_outline_rounded, color: Color(0xFF0F172A), size: 20), onPressed: () {}),
            IconButton(icon: const Icon(Icons.more_vert_rounded, color: Color(0xFF0F172A), size: 20), onPressed: () {}),
          ],
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(60),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              color: Colors.white,
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      controller.typeMetadata['custom_prefix'] != null 
                        ? '${controller.typeMetadata['custom_prefix']}1' 
                        : 'INV1',
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Color(0xFF0F172A)),
                    ),
                  ),
                  InkWell(
                    onTap: () => _selectDate(controller, true),
                    child: Row(
                      children: [
                        const Icon(Icons.calendar_today_rounded, size: 14, color: Color(0xFF64748B)),
                        const SizedBox(width: 6),
                        Text(
                          DateFormat('MM-dd-yyyy').format(controller.issueDate),
                          style: const TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.w600, fontSize: 13),
                        ),
                        const Icon(Icons.keyboard_arrow_down_rounded, size: 18, color: Color(0xFF64748B)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        body: Form(
          key: _formKey,
          child: TabBarView(
            children: [
              // Tab 1: Invoice Form
              _buildFormTab(controller, isLoading, pcWatch, tcWatch),

              // Tab 2: Preview
              _buildPreviewTab(controller, pcWatch, tcWatch),
            ],
          ),
        ),
        bottomNavigationBar: BottomActionBar(
          isLoading: isLoading,
          onDraft: () => _handleSave(controller, 'draft'),
          onIssue: () => _handleSave(controller, 'pending'),
        ),
      ),
    );
  }

  Widget _buildFormTab(
    CreateInvoiceController controller,
    bool isLoading,
    ProfileController pc,
    TeamController tc,
  ) {
    return ListView(
      children: [
        _AccordionTile(
          icon: Icons.person_outline_rounded,
          title: 'Bill To',
          required: true,
          subtitle: controller.selectedClient?.name,
          onTap: () => _selectClient(controller),
          children: [
            if (controller.selectedClient != null)
              Padding(
                padding: const EdgeInsets.all(16),
                child: ClientSelector(client: controller.selectedClient, onTap: () => _selectClient(controller)),
              )
            else
              ListTile(
                title: const Text('Select a client'),
                onTap: () => _selectClient(controller),
                trailing: const Icon(Icons.chevron_right_rounded),
              ),
          ],
        ),
        _AccordionTile(
          icon: Icons.shopping_cart_outlined,
          title: 'Add Items',
          required: true,
          trailing: Text('(+) ${CurrencyFormatter.format(context, controller.subtotal, currency: controller.currencyCode)}', 
            style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: InvoiceItemsList(
                items: controller.items,
                currencyCode: controller.currencyCode,
                onAdd: () => _addItemSheet(controller),
                onRemove: (i) => controller.removeItem(i),
                onEdit: (i) => _editItem(controller, i),
              ),
            ),
          ],
        ),
        _AccordionTile(
          icon: Icons.local_offer_outlined,
          title: 'Discount & Taxes',
          trailing: Text('(+) ${CurrencyFormatter.format(context, controller.discountAmount + controller.taxAmount, currency: controller.currencyCode)}',
            style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: BuilderFinancials(
                currencyCode: controller.currencyCode,
                taxEnabled: controller.taxEnabled,
                taxRate: controller.taxRate,
                taxType: controller.taxType,
                discountType: controller.discountType,
                discountValue: controller.discountValue,
                discountCtrl: controller.discountCtrl,
                subtotal: controller.subtotal,
                discountAmount: controller.discountAmount,
                taxAmount: controller.taxAmount,
                total: controller.total,
                onTaxEnabledChanged: (v) => controller.taxEnabled = v,
                onTaxRateChanged: (v) => controller.taxRate = v,
                onTaxTypeChanged: (v) => controller.taxType = v,
                onDiscountTypeChanged: (v) => controller.discountType = v,
                onDiscountValueChanged: (v) => controller.discountValue = v,
              ),
            ),
          ],
        ),
        
        // Total Summary Card (Modular total card)
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: TotalSummaryCard(
            subtotal: controller.subtotal,
            discountAmount: controller.discountAmount,
            taxAmount: controller.taxAmount,
            total: controller.total,
            currencyCode: controller.currencyCode,
          ),
        ),

        _AccordionTile(
          icon: Icons.payments_outlined,
          title: 'Payments',
          trailing: Text('(-) ${CurrencyFormatter.format(context, 0, currency: controller.currencyCode)}',
            style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Payment Instructions', 
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF64748B))),
                  const SizedBox(height: 12),
                  _buildPaymentField(
                    controller: controller.bankNameController,
                    label: 'Bank Name',
                    hint: 'e.g., Access Bank',
                    icon: Icons.account_balance_rounded,
                    createCtrl: controller,
                  ),
                  const SizedBox(height: 12),
                  _buildPaymentField(
                    controller: controller.accountNameController,
                    label: 'Account Name',
                    hint: 'e.g., Noble World Technology',
                    icon: Icons.person_outline_rounded,
                    createCtrl: controller,
                  ),
                  const SizedBox(height: 12),
                  _buildPaymentField(
                    controller: controller.accountNumberController,
                    label: 'Account Number',
                    hint: '0123456789',
                    icon: Icons.numbers_rounded,
                    keyboardType: TextInputType.number,
                    createCtrl: controller,
                  ),
                  const SizedBox(height: 16),
                  const Divider(),
                  const SizedBox(height: 8),
                  const Text('Payment history will appear here once issued.', 
                    style: TextStyle(fontSize: 12, color: Color(0xFF94A3B8), fontStyle: FontStyle.italic)),
                ],
              ),
            ),
          ],
        ),

        // Balance Summary Row
        _SummaryRow(
          title: 'Invoice Balance',
          value: CurrencyFormatter.format(context, controller.total, currency: controller.currencyCode),
          backgroundColor: const Color(0xFFE2E8F0),
          textColor: const Color(0xFF0F172A),
        ),

        _AccordionTile(
          icon: Icons.description_outlined,
          title: 'Signature & Payment Instructions',
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  SignatureStrip(
                    signatureBytes: controller.signatureBytes,
                    signatureSource: controller.typeMetadata['signature_source'],
                    onTap: () => _openSignatureModal(controller),
                    onClear: () => controller.clearSignature(),
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: controller.notesController,
                    maxLines: 3,
                    onChanged: (_) => controller.saveDraft(),
                    decoration: InputDecoration(
                      labelText: 'Notes / Instructions',
                      fillColor: Colors.white,
                      filled: true,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),

        _AccordionTile(
          icon: Icons.image_outlined,
          title: 'Image',
          children: [
            ListTile(
              leading: const Icon(Icons.add_circle_outline_rounded, color: AppColors.primary),
              title: const Text('Add Image', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
              onTap: () {},
            ),
          ],
        ),

        _AccordionTile(
          icon: Icons.note_outlined,
          title: 'Terms & Conditions',
          children: [
             ListTile(
              leading: const Icon(Icons.add_circle_outline_rounded, color: AppColors.primary),
              title: const Text('Add Terms', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
              onTap: () {},
            ),
          ],
        ),

        _AccordionTile(
          icon: Icons.edit_note_rounded,
          title: 'Internal Notes (Private)',
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: TextFormField(
                decoration: InputDecoration(
                  labelText: 'Internal Note',
                  fillColor: Colors.white,
                  filled: true,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ),
          ],
        ),

        const SizedBox(height: 8),
        _ActionLink(
          icon: Icons.settings_outlined,
          title: 'Configure "Custom Fields on Invoice"',
          onTap: () {},
        ),
        _ActionLink(
          icon: Icons.format_list_bulleted_rounded,
          title: 'Customize Form',
          onTap: () {},
          showUnderline: true,
        ),
        const SizedBox(height: 40),
      ],
    );
  }

  Widget _buildPaymentField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    required CreateInvoiceController createCtrl,
    TextInputType? keyboardType,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
      onChanged: (_) => createCtrl.saveDraft(),
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        prefixIcon: Icon(icon, size: 18, color: AppColors.primary),
        fillColor: Colors.white,
        filled: true,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey.shade200)),
        enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey.shade200)),
      ),
    );
  }

  Widget _buildPreviewTab(CreateInvoiceController controller, ProfileController pc, TeamController tc) {
    return Container(
      color: const Color(0xFFF1F5F9),
      padding: const EdgeInsets.all(16),
      child: LiveInvoicePreview(
        invoice: controller.buildPreviewModel(),
        template: controller.selectedTemplate,
        business: controller.buildBusinessInfo(pc, tc),
      ),
    );
  }
}

class _AccordionTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final bool required;
  final String? subtitle;
  final Widget? trailing;
  final VoidCallback? onTap;
  final List<Widget> children;

  const _AccordionTile({
    required this.icon,
    required this.title,
    this.required = false,
    this.subtitle,
    this.trailing,
    this.onTap,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 1),
      color: Colors.white,
      child: ExpansionTile(
        onExpansionChanged: (expanded) {
          if (expanded && onTap != null) onTap!();
        },
        leading: Icon(icon, color: const Color(0xFF64748B), size: 22),
        title: Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: Color(0xFF0F172A)),
                overflow: TextOverflow.ellipsis,
              ),
            ),
            if (required)
              const Text(' *', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
          ],
        ),
        subtitle: subtitle != null ? Text(subtitle!, style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 11)) : null,
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (trailing != null) trailing!,
            const SizedBox(width: 8),
            const Icon(Icons.keyboard_arrow_down_rounded, color: Color(0xFF64748B)),
          ],
        ),
        shape: const Border(),
        childrenPadding: EdgeInsets.zero,
        children: children,
      ),
    );
  }
}

class _SummaryRow extends StatelessWidget {
  final String title;
  final String value;
  final Color backgroundColor;
  final Color textColor;

  const _SummaryRow({
    required this.title,
    required this.value,
    required this.backgroundColor,
    required this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      color: backgroundColor,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.w900, color: textColor, fontSize: 15)),
          Text(value, style: TextStyle(fontWeight: FontWeight.w900, color: textColor, fontSize: 16)),
        ],
      ),
    );
  }
}

class _ActionLink extends StatelessWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final bool showUnderline;

  const _ActionLink({
    required this.icon,
    required this.title,
    required this.onTap,
    this.showUnderline = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        color: Colors.white,
        child: Row(
          children: [
            Icon(icon, color: AppColors.primary, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                title,
                style: TextStyle(
                  color: AppColors.primary,
                  fontWeight: FontWeight.bold,
                  fontSize: 13,
                  decoration: showUnderline ? TextDecoration.underline : null,
                  decorationStyle: TextDecorationStyle.dashed,
                ),
              ),
            ),
            const Icon(Icons.chevron_right_rounded, color: AppColors.primary, size: 20),
          ],
        ),
      ),
    );
  }
}
