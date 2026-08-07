// lib/features/invoicing/controllers/create_invoice_controller.dart
import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/services/currency_service.dart';
import 'package:noble_invoice/core/services/location_service.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_operations.dart';
import 'package:noble_invoice/features/invoicing/models/client_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_details_model.dart';
import 'package:noble_invoice/features/invoicing/models/business_info.dart';
import 'package:noble_invoice/features/invoicing/services/invoice_draft_service.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/invoicing/widgets/signature_modal.dart';

class CreateInvoiceController extends ChangeNotifier {
  final notesController = TextEditingController();
  final paymentLinkController = TextEditingController();
  final discountCtrl = TextEditingController();
  final bankNameController = TextEditingController();
  final accountNameController = TextEditingController();
  final accountNumberController = TextEditingController();
  
  Uint8List? _signatureBytes;
  Uint8List? get signatureBytes => _signatureBytes;
  
  PdfTemplate _selectedTemplate = PdfTemplate.modern;
  PdfTemplate get selectedTemplate => _selectedTemplate;
  set selectedTemplate(PdfTemplate value) {
    _selectedTemplate = value;
    _scheduleSave();
    notifyListeners();
  }

  Client? _selectedClient;
  Client? get selectedClient => _selectedClient;
  set selectedClient(Client? value) {
    _selectedClient = value;
    _scheduleSave();
    notifyListeners();
  }

  late InvoiceType _invoiceType;
  InvoiceType get invoiceType => _invoiceType;
  set invoiceType(InvoiceType value) {
    _invoiceType = value;
    _scheduleSave();
    notifyListeners();
  }

  final List<InvoiceItem> _items = [];
  List<InvoiceItem> get items => _items;

  DateTime _issueDate = DateTime.now();
  DateTime get issueDate => _issueDate;
  set issueDate(DateTime value) {
    _issueDate = value;
    _scheduleSave();
    notifyListeners();
  }

  DateTime _dueDate = DateTime.now().add(const Duration(days: 14));
  DateTime get dueDate => _dueDate;
  set dueDate(DateTime value) {
    _dueDate = value;
    _scheduleSave();
    notifyListeners();
  }

  Map<String, dynamic> _typeMetadata = {};
  Map<String, dynamic> get typeMetadata => _typeMetadata;

  bool _taxEnabled = false;
  bool get taxEnabled => _taxEnabled;
  set taxEnabled(bool value) {
    _taxEnabled = value;
    _scheduleSave();
    notifyListeners();
  }

  double _taxRate = 0;
  double get taxRate => _taxRate;
  set taxRate(double value) {
    _taxRate = value;
    _scheduleSave();
    notifyListeners();
  }

  String _taxType = 'exclusive';
  String get taxType => _taxType;
  set taxType(String value) {
    _taxType = value;
    _scheduleSave();
    notifyListeners();
  }

  String _discountType = 'none';
  String get discountType => _discountType;
  set discountType(String value) {
    _discountType = value;
    _scheduleSave();
    notifyListeners();
  }

  double _discountValue = 0;
  double get discountValue => _discountValue;
  set discountValue(double value) {
    _discountValue = value;
    _scheduleSave();
    notifyListeners();
  }

  String _currencyCode = 'USD';
  String get currencyCode => _currencyCode;
  set currencyCode(String value) {
    _currencyCode = value;
    _scheduleSave();
    notifyListeners();
  }

  Timer? _saveDebouncer;

  // ── Computed Totals ──────────────────────────────────────────────────────────
  double get subtotal => _items.fold(0, (s, i) => s + i.total);
  
  double get discountAmount {
    if (_discountType == 'flat') return _discountValue;
    if (_discountType == 'percentage') return subtotal * (_discountValue / 100);
    return 0;
  }
  
  double get taxableAmount => subtotal - discountAmount;
  
  double get taxAmount {
    if (!_taxEnabled) return 0;
    if (_taxType == 'exclusive') return taxableAmount * (_taxRate / 100);
    return taxableAmount - (taxableAmount / (1 + _taxRate / 100));
  }
  
  double get total => taxableAmount + taxAmount;

  // ── Init ───────────────────────────────────────────────────────────────────
  void initialize(
    InvoiceType initialInvoiceType,
    InvoiceDetails? initialInvoice,
    Client? initialClient,
    ProfileController pc,
    TeamController tc,
    InvoiceController ic,
  ) {
    _invoiceType = initialInvoiceType;
    
    // Add listener to discount controller
    discountCtrl.addListener(() {
      final val = double.tryParse(discountCtrl.text) ?? 0;
      if (val != _discountValue) {
        _discountValue = val;
        _scheduleSave();
        notifyListeners();
      }
    });

    if (initialInvoice != null) {
      _applyInitialInvoice(initialInvoice);
    } else if (initialClient != null) {
      _selectedClient = initialClient;
      _loadLastInvoiceDefaults(pc, tc, ic);
    } else {
      _checkAndResumeDraft(pc, tc, ic);
    }
  }

  void _applyInitialInvoice(InvoiceDetails inv) {
    notesController.text = inv.notes ?? '';
    _currencyCode = inv.currencyCode ?? 'USD';
    _taxRate = inv.taxRate;
    _taxEnabled = _taxRate > 0;
    _taxType = inv.taxType;
    _discountType = inv.discountType;
    _discountValue = inv.discountValue;
    if (_discountValue > 0) discountCtrl.text = _discountValue.toStringAsFixed(2);
    _issueDate = DateTime.tryParse(inv.issueDate) ?? DateTime.now();
    _dueDate = DateTime.tryParse(inv.dueDate) ?? DateTime.now().add(const Duration(days: 14));
    _selectedClient = inv.client;
    _items.clear();
    _items.addAll(inv.items.map((i) => i.copyWith(id: 0)));
    _typeMetadata = Map.from(inv.metadata);
    bankNameController.text = inv.metadata['bank_name'] ?? '';
    accountNameController.text = inv.metadata['account_name'] ?? '';
    accountNumberController.text = inv.metadata['account_number'] ?? '';
    
    if (inv.metadata['signature'] != null) {
      _signatureBytes = base64ToSignatureBytes(inv.metadata['signature']);
    }
    notifyListeners();
  }

  @override
  void dispose() {
    _saveDebouncer?.cancel();
    notesController.dispose();
    paymentLinkController.dispose();
    discountCtrl.dispose();
    bankNameController.dispose();
    accountNameController.dispose();
    accountNumberController.dispose();
    super.dispose();
  }

  // ── Draft Management (via InvoiceDraftService) ────────────────────────────────
  void _scheduleSave() {
    _saveDebouncer?.cancel();
    _saveDebouncer = Timer(const Duration(seconds: 1), saveDraft);
  }

  void updateState(VoidCallback fn) {
    fn();
    _scheduleSave();
    notifyListeners();
  }

  Future<void> saveDraft() => InvoiceDraftService.save(
    invoiceTypeDb: _invoiceType.dbValue,
    notes: notesController.text,
    paymentLink: paymentLinkController.text,
    templateName: _selectedTemplate.name,
    client: _selectedClient,
    items: _items,
    issueDate: _issueDate,
    dueDate: _dueDate,
    taxEnabled: _taxEnabled,
    taxRate: _taxRate,
    taxType: _taxType,
    discountType: _discountType,
    discountValue: _discountValue,
    currencyCode: _currencyCode,
    typeMetadata: {
      ..._typeMetadata,
      'bank_name': bankNameController.text,
      'account_name': accountNameController.text,
      'account_number': accountNumberController.text,
    },
  );

  Future<void> _checkAndResumeDraft(ProfileController pc, TeamController tc, InvoiceController ic) async {
    final draft = await InvoiceDraftService.load();
    if (draft == null) {
      _loadTeamDefaults(pc, tc);
      return;
    }
  }

  void applyDraft(Map<String, dynamic> draft) {
    notesController.text      = draft['notes'] ?? '';
    paymentLinkController.text = draft['paymentLink'] ?? '';
    _invoiceType   = InvoiceDraftService.parseInvoiceType(draft['invoiceType']);
    _selectedTemplate = InvoiceDraftService.parseTemplate(draft['template']);
    _currencyCode  = draft['currencyCode'] ?? 'USD';
    _taxEnabled    = draft['taxEnabled'] ?? false;
    _taxRate       = (draft['taxRate'] as num?)?.toDouble() ?? 0.0;
    _taxType       = draft['taxType'] ?? 'exclusive';
    _discountType  = draft['discountType'] ?? 'none';
    _discountValue = (draft['discountValue'] as num?)?.toDouble() ?? 0.0;
    if (_discountValue > 0) discountCtrl.text = _discountValue.toStringAsFixed(2);
    _issueDate     = DateTime.tryParse(draft['issueDate'] ?? '') ?? DateTime.now();
    _dueDate       = DateTime.tryParse(draft['dueDate'] ?? '') ?? DateTime.now().add(const Duration(days: 14));
    if (draft['client'] != null) _selectedClient = Client.fromJson(draft['client'] as Map<String, dynamic>);
    if (draft['items'] != null) {
      _items.clear();
      for (final j in (draft['items'] as List)) _items.add(InvoiceItem.fromJson(j as Map<String, dynamic>));
    }
    if (draft['typeMetadata'] != null) {
      _typeMetadata = Map<String, dynamic>.from(draft['typeMetadata']);
      bankNameController.text = _typeMetadata['bank_name'] ?? '';
      accountNameController.text = _typeMetadata['account_name'] ?? '';
      accountNumberController.text = _typeMetadata['account_number'] ?? '';
    }
    
    if (_typeMetadata['signature'] != null) {
      _signatureBytes = base64ToSignatureBytes(_typeMetadata['signature']);
    }
    notifyListeners();
  }

  void discardDraft(ProfileController pc, TeamController tc) {
    InvoiceDraftService.clear();
    _loadTeamDefaults(pc, tc);
  }

  void _loadTeamDefaults(ProfileController pc, TeamController tc) {
    final team = tc.activeTeam;
    if (pc.profile?.defaultInvoiceTemplate != null) {
      _selectedTemplate = InvoiceDraftService.parseTemplate(pc.profile!.defaultInvoiceTemplate);
    }
    if (team == null) {
      notifyListeners();
      return;
    }
    _currencyCode           = pc.preferredCurrency;
    _taxRate                = team.defaultVatRate;
    _taxEnabled             = team.defaultVatRate > 0;
    notesController.text   = team.defaultPaymentTerms;
    _typeMetadata['custom_prefix'] = team.invoicePrefix;
    
    // Auto-fill bank details from profile if available
    if (pc.profile != null) {
      bankNameController.text = pc.profile!.bankName ?? '';
      accountNameController.text = pc.profile!.accountName ?? '';
      accountNumberController.text = pc.profile!.accountNumber ?? '';
    }
    notifyListeners();
  }

  Future<void> _loadLastInvoiceDefaults(ProfileController pc, TeamController tc, InvoiceController ic) async {
    _loadTeamDefaults(pc, tc);
    try {
      final lastInvoice = await ic.getMostRecentInvoice();
      if (lastInvoice != null) {
        _selectedClient = lastInvoice.client;
        _currencyCode   = lastInvoice.currencyCode ?? _currencyCode;
        if (lastInvoice.items.isNotEmpty) {
          _items.addAll(lastInvoice.items.map((i) => i.copyWith(id: 0)));
        }
        notifyListeners();
      }
    } catch (e) {
      debugPrint('No previous invoice found to load defaults: $e');
    }
  }

  // ── Actions ───────────────────────────────────────────────────────────────────
  void setClient(Client client) {
    _selectedClient = client;
    _scheduleSave();
    notifyListeners();
  }

  void setSignature(Uint8List bytes, String sourceName) {
    _signatureBytes = bytes;
    _typeMetadata['signature'] = signatureBytesToBase64(bytes);
    _typeMetadata['signature_source'] = sourceName;
    _scheduleSave();
    notifyListeners();
  }

  void clearSignature() {
    _signatureBytes = null;
    _typeMetadata.remove('signature');
    _typeMetadata.remove('signature_source');
    _scheduleSave();
    notifyListeners();
  }

  void convertItemsCurrency(String targetCurrency) {
    if (targetCurrency == _currencyCode) return;
    final recalculated = CurrencyService.recalculateItems(_items, _currencyCode, targetCurrency);
    _items.clear();
    _items.addAll(recalculated);
    _currencyCode = targetCurrency;
    _scheduleSave();
    notifyListeners();
  }

  void addItem(InvoiceItem item) {
    _items.add(item);
    _scheduleSave();
    notifyListeners();
  }

  void editItem(int index, InvoiceItem item) {
    _items[index] = item;
    _scheduleSave();
    notifyListeners();
  }

  void removeItem(int index) {
    _items.removeAt(index);
    _scheduleSave();
    notifyListeners();
  }

  void updateDate(bool isIssueDate, DateTime date) {
    if (isIssueDate) {
      _issueDate = date;
      if (_dueDate.isBefore(date)) {
        _dueDate = date.add(const Duration(days: 14));
      }
    } else {
      _dueDate = date;
    }
    _scheduleSave();
    notifyListeners();
  }

  Invoice buildPreviewModel() => Invoice(
    id: 'PREVIEW', client: _selectedClient ?? Client(id: 0, name: 'Client Name', email: ''),
    items: _items, issueDate: _issueDate, dueDate: _dueDate,
    status: InvoiceStatus.draft, invoiceType: _invoiceType,
    notes: notesController.text.trim(), taxRate: _taxEnabled ? _taxRate : 0,
    taxType: _taxType, discountType: _discountType, discountValue: _discountValue,
    currencyCode: _currencyCode, metadata: _typeMetadata,
  );

  BusinessInfo buildBusinessInfo(ProfileController pc, TeamController tc) {
    final p = pc.profile;
    final t = tc.activeTeam;
    if (t != null) {
      return BusinessInfo(
        name: t.name,
        businessAddress: t.businessAddress,
        businessEmail: t.businessEmail,
        businessPhone: t.businessPhone,
        taxNumber: t.taxNumber,
        logoUrl: t.brandLogoUrl ?? p?.brandLogoUrl,
        brandColor: t.brandColor,
        signatureUrl: t.brandSignatureUrl ?? p?.brandSignatureUrl,
        footerText: t.invoiceFooter ?? p?.invoiceFooter,
        bankName: p?.bankName,
        accountName: p?.accountName,
        accountNumber: p?.accountNumber,
      );
    }
    if (p == null) return BusinessInfo.placeholder();
    return BusinessInfo(
      name: p.businessName ?? p.company ?? p.displayName ?? 'My Business',
      businessAddress: p.businessAddress,
      businessEmail: p.businessEmail ?? p.email,
      businessPhone: p.businessPhone,
      taxNumber: p.taxNumber,
      logoUrl: p.brandLogoUrl,
      brandColor: p.brandColor,
      signatureUrl: p.brandSignatureUrl,
      footerText: p.invoiceFooter,
      bankName: p.bankName,
      accountName: p.accountName,
      accountNumber: p.accountNumber,
    );
  }

  bool validate(void Function(String msg, {bool isError}) showSnack) {
    if (_selectedClient == null) { showSnack('Please select a client first', isError: true); return false; }
    if (_items.isEmpty) { showSnack('Please add at least one line item', isError: true); return false; }
    return true;
  }

  Future<bool> handleSave({
    required String status,
    required InvoiceController ic,
    required SubscriptionController sub,
    required void Function(String msg, {bool isError}) showSnack,
    InvoiceDetails? initialInvoice,
  }) async {
    if (!validate(showSnack)) return false;

    final payload = InvoiceCreatePayload(
      clientId: _selectedClient!.id,
      items: _items,
      dueDate: _dueDate,
      status: status,
      notes: notesController.text.trim(),
      invoiceType: _invoiceType,
      taxRate: _taxEnabled ? _taxRate : 0,
      taxType: _taxType,
      discountType: _discountType,
      discountValue: _discountValue,
      currencyCode: _currencyCode,
      metadata: {
        ..._typeMetadata,
        'bank_name': bankNameController.text,
        'account_name': accountNameController.text,
        'account_number': accountNumberController.text,
      },
    );

    final success = initialInvoice != null 
      ? await ic.updateInvoice(initialInvoice.id, payload, sub)
      : await ic.createInvoice(payload, sub);

    if (success) {
      await InvoiceDraftService.clear();
      return true;
    } else {
      showSnack(ic.errorMessage, isError: true);
      return false;
    }
  }
}
