// lib/features/invoicing/controllers/invoice_controller.dart
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/core/services/currency_service.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_details_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_list_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_summary_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/services/invoice_ledger_service.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/core/cache/isar_service.dart';
import 'package:noble_invoice/core/cache/schemas/invoice_cache.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

// Re-export models for UI convenience (e.g., ctrl.InvoiceDetails)
export 'package:noble_invoice/features/invoicing/models/client_model.dart';
export 'package:noble_invoice/features/invoicing/models/invoice_details_model.dart';
export 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
export 'package:noble_invoice/features/invoicing/models/invoice_list_item_model.dart';
export 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
export 'package:noble_invoice/features/invoicing/models/invoice_summary_model.dart';
export 'package:noble_invoice/features/invoicing/models/invoice_type.dart';

// ── Invoice Create Payload ────────────────────────────────────────────────────

class InvoiceCreatePayload {
  final int          clientId;
  final List<InvoiceItem> items;
  final DateTime     dueDate;
  final String?      notes;
  final String       status;       // 'draft' | 'pending'
  final InvoiceType  invoiceType;
  final double       taxRate;
  final String       taxType;      // 'exclusive' | 'inclusive'
  final String       discountType; // 'none' | 'flat' | 'percentage'
  final double       discountValue;
  final String       currencyCode;
  final Map<String, dynamic> metadata;

  InvoiceCreatePayload({
    required this.clientId,
    required this.items,
    required this.dueDate,
    this.notes,
    required this.status,
    this.invoiceType   = InvoiceType.standard,
    this.taxRate       = 0,
    this.taxType       = 'exclusive',
    this.discountType  = 'none',
    this.discountValue = 0,
    this.currencyCode  = 'USD',
    this.metadata      = const {},
  });
}

// ── State Enum ────────────────────────────────────────────────────────────────

enum InvoiceLoadState { idle, loading, loaded, saving, error }
enum InvoiceViewType { invoices, estimates }

class AgingSummary {
  final double current;
  final double days1to30;
  final double days31to60;
  final double days61to90;
  final double daysOver90;

  AgingSummary({
    this.current = 0,
    this.days1to30 = 0,
    this.days31to60 = 0,
    this.days61to90 = 0,
    this.daysOver90 = 0,
  });

  double get totalOverdue => days1to30 + days31to60 + days61to90 + daysOver90;
}

// ── Controller ────────────────────────────────────────────────────────────────

class InvoiceController extends ChangeNotifier {
  InvoiceLoadState       _status         = InvoiceLoadState.idle;
  InvoiceSummary         _summary        = InvoiceSummary.empty();
  AgingSummary           _agingSummary   = AgingSummary();
  List<InvoiceListItem>  _invoices       = [];
  InvoiceDetails?        _currentInvoice;
  String                 _currencyCode   = 'USD'; // Default to USD for global context
  String                 _errorMessage   = '';
  String?                _activeTeamId;
  InvoiceViewType        _viewType       = InvoiceViewType.invoices;
  String                 _filterStatus   = 'all';

  // ── Getters ─────────────────────────────────────────────────────────────────
  InvoiceLoadState      get status          => _status;
  InvoiceSummary        get summary         => _summary;
  AgingSummary          get agingSummary    => _agingSummary;
  List<InvoiceListItem> get invoices        => _invoices;
  InvoiceDetails?       get currentInvoice  => _currentInvoice;
  InvoiceDetails?       get currentDetails  => _currentInvoice;
  String                get currencyCode    => _currencyCode;
  String                get errorMessage    => _errorMessage;
  String                get filterStatus    => _filterStatus;
  String?               get activeTeamId    => _activeTeamId;
  InvoiceViewType       get viewType        => _viewType;
  bool                  get isLoading       => _status == InvoiceLoadState.loading;
  bool                  get isSaving        => _status == InvoiceLoadState.saving;

  void setViewType(InvoiceViewType type) {
    if (_viewType != type) {
      _viewType = type;
      loadDashboard();
      notifyListeners();
    }
  }

  void setActiveTeamId(String? id) {
    if (_activeTeamId != id) {
      _activeTeamId = id;
      if (id != null) {
        // Auto-refresh data when a team is finally selected/provisioned
        loadDashboard();
        _setupRealtimeListeners();
      }
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _syncChannel?.unsubscribe();
    super.dispose();
  }

  // ── Helper Methods for Extensions ──────────────────────────────────────────
  void setError(String msg) {
    _errorMessage = msg;
    notifyListeners();
  }

  void setSaving(bool val) {
    _status = val ? InvoiceLoadState.saving : InvoiceLoadState.loaded;
    notifyListeners();
  }

  String parseError(dynamic e) => _parseError(e);

  String calculateNextDate(DateTime from, String freq) => _calculateNextDate(from, freq);

  // ── Realtime Subscription ──────────────────────────────────────────────────
  RealtimeChannel? _syncChannel;

  void _setupRealtimeListeners() {
    if (_activeTeamId == null) return;
    
    _syncChannel?.unsubscribe();
    
    _syncChannel = SupabaseService.client
      .channel('public:sync:$_activeTeamId')
      .onPostgresChanges(
        event: PostgresChangeEvent.all,
        schema: 'public',
        table: 'invoices',
        callback: (payload) {
          debugPrint('Realtime: Invoices changed on remote. Refreshing...');
          loadDashboard();
        },
      )
      .onPostgresChanges(
        event: PostgresChangeEvent.all,
        schema: 'public',
        table: 'clients',
        callback: (payload) {
          debugPrint('Realtime: Clients changed on remote. Refreshing...');
          loadDashboard();
        },
      )
      .subscribe();
  }

  // ── Error Parsing ────────────────────────────────────────────────────────────
  String _parseError(dynamic e) {
    if (e is PostgrestException) return e.message;
    if (e is AuthException) return e.message;
    return e.toString();
  }

  // ── Aging Calculation ────────────────────────────────────────────────────────
  void _calculateAging() {
    double current = 0, d30 = 0, d60 = 0, d90 = 0, dover90 = 0;
    final now = DateTime.now();

    for (final inv in _invoices) {
      if (inv.status == 'paid' || inv.status == 'draft' || inv.status == 'cancelled') continue;
      
      final dueDate = DateTime.tryParse(inv.dueDate);
      if (dueDate == null) continue;

      if (dueDate.isAfter(now)) {
        current += inv.totalAmount;
      } else {
        final diff = now.difference(dueDate).inDays;
        if (diff <= 30) {
          d30 += inv.totalAmount;
        } else if (diff <= 60) {
          d60 += inv.totalAmount;
        } else if (diff <= 90) {
          d90 += inv.totalAmount;
        } else {
          dover90 += inv.totalAmount;
        }
      }
    }

    _agingSummary = AgingSummary(
      current: current,
      days1to30: d30,
      days31to60: d60,
      days61to90: d90,
      daysOver90: dover90,
    );
  }

  // ── Load Dashboard ────────────────────────────────────────────────────────────
  Future<void> loadDashboard({String? targetCurrency}) async {
    if (targetCurrency != null) _currencyCode = targetCurrency;
    _status = InvoiceLoadState.loading;
    notifyListeners();
    try {
      if (_activeTeamId == null) {
        _status = InvoiceLoadState.loaded;
        return;
      }

      // ── Step 1: Load from Cache (Instant Load) ──────────────────────────
      final cached = await IsarService.getCachedInvoices(_activeTeamId!);
      if (cached.isNotEmpty && _invoices.isEmpty) {
        _invoices = cached.map((c) => InvoiceListItem(
          id: c.remoteId,
          invoiceNumber: c.invoiceNumber,
          clientName: c.clientName,
          clientEmail: '', // Cached summary doesn't need email usually, or we can add it to schema
          status: c.status,
          invoiceType: InvoiceTypeExtension.fromDb(c.type),
          issueDate: c.issueDate.toIso8601String(),
          dueDate: c.dueDate.toIso8601String(),
          totalAmount: c.totalAmount,
          currencyCode: c.currencyCode,
        )).toList();
        _calculateSummaryLocally();
        notifyListeners();
      }

      // ── Step 2: Background Fetch from Supabase ──────────────────────────
      var query = SupabaseService.client
          .from('invoices')
          .select('*, clients(name, email)')
          .eq('team_id', _activeTeamId!);

      if (_filterStatus != 'all') {
        query = query.eq('status', _filterStatus);
      }

      if (_viewType == InvoiceViewType.estimates) {
        query = query.filter('invoice_type', 'in', ['estimate', 'quote']);
      } else {
        query = query.not('invoice_type', 'in', ['estimate', 'quote']);
      }

      final invoiceData = await query.order('created_at', ascending: false);
      final freshInvoices = (invoiceData as List)
          .map((j) => InvoiceListItem.fromJson(j as Map<String, dynamic>))
          .toList();

      // ── Step 3: Update State & Cache ────────────────────────────────────
      _invoices = freshInvoices;
      _calculateSummaryLocally();

      // Background cache update (don't await to keep UI fast)
      IsarService.cacheInvoices(freshInvoices.map((inv) => InvoiceCache()
        ..remoteId = inv.id
        ..teamId = _activeTeamId!
        ..invoiceNumber = inv.invoiceNumber
        ..clientName = inv.clientName
        ..status = inv.status
        ..type = inv.invoiceType.dbValue
        ..issueDate = DateTime.parse(inv.issueDate)
        ..dueDate = DateTime.parse(inv.dueDate)
        ..totalAmount = inv.totalAmount
        ..currencyCode = inv.currencyCode
        ..updatedAt = DateTime.now()
      ).toList());

      _status = InvoiceLoadState.loaded;
    } catch (e) {
      _errorMessage = _parseError(e);
      _status       = InvoiceLoadState.error;
    }
    notifyListeners();
  }

  void _calculateSummaryLocally() {
    double paid        = 0;
    double outstanding = 0;
    double overdue     = 0;
    double draft       = 0;
    int    overdueCount = 0;
    int    pendingCount = 0;

    for (final inv in _invoices) {
      final amountInBaseCurrency = CurrencyService.convert(inv.totalAmount, inv.currencyCode, _currencyCode);
      
      switch (inv.status) {
        case 'paid':    paid        += amountInBaseCurrency; break;
        case 'overdue': 
          overdue     += amountInBaseCurrency; 
          outstanding += amountInBaseCurrency; 
          overdueCount++;
          break;
        case 'pending': 
          outstanding += amountInBaseCurrency; 
          pendingCount++;
          break;
        case 'draft':   draft       += amountInBaseCurrency; break;
      }
    }

    _summary = InvoiceSummary(
      paid:        paid,
      outstanding: outstanding,
      totalCount:  _invoices.length,
      overdue:     overdue,
      draft:       draft,
      overdueCount: overdueCount,
      pendingCount: pendingCount,
    );

    if (_viewType == InvoiceViewType.invoices) {
      _calculateAging();
    }
  }

  // Alias so old callers don't break during refactor
  Future<void> fetchSummary() => loadDashboard();

  void setCurrency(String code) {
    _currencyCode = code;
    notifyListeners();
  }

  // ── Client Analytics (Phase 4 Automation) ──────────────────────────────
  Future<Map<String, double>> fetchClientStats(int clientId) async {
    try {
      final res = await SupabaseService.client
          .from('invoices')
          .select('total_amount, status, currency_code')
          .eq('client_id', clientId)
          .eq('team_id', _activeTeamId!);

      double totalBilled = 0;
      double totalPaid   = 0;

      for (final inv in (res as List)) {
        final amt = (inv['total_amount'] as num).toDouble();
        final code = inv['currency_code'] ?? 'USD';
        final status = inv['status'];

        final converted = CurrencyService.convert(amt, code, _currencyCode);
        
        if (status != 'draft' && status != 'voided') {
          totalBilled += converted;
        }
        if (status == 'paid') {
          totalPaid += converted;
        }
      }

      return {
        'totalBilled': totalBilled,
        'totalPaid':   totalPaid,
        'outstanding': totalBilled - totalPaid,
      };
    } catch (e) {
      debugPrint('Error fetching client stats: $e');
      return {'totalBilled': 0, 'totalPaid': 0, 'outstanding': 0};
    }
  }

  // ── Invoice Details ───────────────────────────────────────────────────────────
  Future<bool> updateMetadata(int id, Map<String, dynamic> newMetadata) async {
    try {
      final res = await SupabaseService.client.from('invoices').select('metadata').eq('id', id).single();
      final existingMeta = res['metadata'] as Map<String, dynamic>? ?? {};
      
      final merged = {
        ...existingMeta,
        ...newMetadata,
      };

      await SupabaseService.client.from('invoices').update({'metadata': merged}).eq('id', id);
      return true;
    } catch (e) {
      _errorMessage = _parseError(e);
      notifyListeners();
      return false;
    }
  }

  Future<void> getInvoiceDetails(int id) async {
    _status = InvoiceLoadState.loading;
    _currentInvoice = null;
    notifyListeners();
    try {
      final res = await SupabaseService.client
          .from('invoices')
          .select('*, clients(*), invoice_items(*)')
          .eq('id', id)
          .single();

      _currentInvoice = InvoiceDetails.fromJson(res);
      _status = InvoiceLoadState.loaded;
    } catch (e) {
      _errorMessage = _parseError(e);
      _status = InvoiceLoadState.error;
    }
    notifyListeners();
  }

  // CRUD logic moved to InvoiceOperations extension.

  // ── Operations ────────────────────────────────────────────────────────────────
  Future<void> setFilter(String status) async {
    _filterStatus = status;
    await loadDashboard();
  }

  Future<bool> deleteInvoice(int id) async {
    try {
      final idx = _invoices.indexWhere((i) => i.id == id);
      if (idx == -1) return false;
      final invoice = _invoices[idx];

      // Fetch items to potentially restock before deletion
      final res = await SupabaseService.client.from('invoice_items').select('*').eq('invoice_id', id);
      final items = (res as List).map((j) => InvoiceItem.fromJson(j)).toList();

      // DB has ON DELETE CASCADE on invoice_items, so only delete the parent.
      await SupabaseService.client.from('invoices').delete().eq('id', id);
      _invoices.removeAt(idx);

      if (InvoiceLedgerService.isActiveStatus(invoice.status)) {
        await InvoiceLedgerService.restockItems(teamId: _activeTeamId, invoiceId: id, items: items, reason: 'Invoice Deleted');
        await InvoiceLedgerService.reverseLedgerEntry(teamId: _activeTeamId, invoiceId: id);
      }

      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = _parseError(e);
      notifyListeners();
      return false;
    }
  }

  Future<bool> updateStatus(int id, String newStatus) async {
    try {
      await SupabaseService.client
          .from('invoices')
          .update({'status': newStatus})
          .eq('id', id);

      final idx = _invoices.indexWhere((i) => i.id == id);
      if (idx != -1) {
        final old = _invoices[idx];
        _invoices[idx] = InvoiceListItem(
          id:            old.id,
          invoiceNumber: old.invoiceNumber,
          clientName:    old.clientName,
          clientEmail:   old.clientEmail,
          status:        newStatus,
          invoiceType:   old.invoiceType,
          issueDate:     old.issueDate,
          dueDate:       old.dueDate,
          totalAmount:   old.totalAmount,
          currencyCode:  old.currencyCode,
        );
        
        final wasActive = InvoiceLedgerService.isActiveStatus(old.status);
        final isNowActive = InvoiceLedgerService.isActiveStatus(newStatus);

        if (wasActive != isNowActive) {
          final res = await SupabaseService.client.from('invoice_items').select('*').eq('invoice_id', id);
          final items = (res as List).map((j) => InvoiceItem.fromJson(j)).toList();

          if (!wasActive && isNowActive) {
            await InvoiceLedgerService.deductStock(teamId: _activeTeamId, invoiceId: id, items: items);
            final details = await SupabaseService.client.from('invoices').select('client_id, total_amount, invoice_type').eq('id', id).single();
            final typeStr = details['invoice_type'] ?? 'standard';
            final amount  = (details['total_amount'] as num).toDouble();
            await InvoiceLedgerService.updateClientLedger(teamId: _activeTeamId, invoiceId: id, clientId: details['client_id'], amount: typeStr == 'credit_memo' ? -amount : amount, type: typeStr);
          } else if (wasActive && !isNowActive) {
            await InvoiceLedgerService.restockItems(teamId: _activeTeamId, invoiceId: id, items: items, reason: 'Invoice Status: $newStatus');
            await InvoiceLedgerService.reverseLedgerEntry(teamId: _activeTeamId, invoiceId: id);
          }
        }

        final wasPaid  = old.status == 'paid';
        final isNowPaid = newStatus == 'paid';
        if (!wasPaid && isNowPaid) {
          final details = await SupabaseService.client.from('invoices').select('client_id, total_amount').eq('id', id).single();
          await InvoiceLedgerService.updateClientLedger(teamId: _activeTeamId, invoiceId: id, clientId: details['client_id'], amount: -(details['total_amount'] as num).toDouble(), type: 'payment');
        } else if (wasPaid && !isNowPaid) {
          await InvoiceLedgerService.reverseLedgerEntry(teamId: _activeTeamId, invoiceId: id);
        }

        notifyListeners();
      }
      return true;
    } catch (e) {
      _errorMessage = _parseError(e);
      notifyListeners();
      return false;
    }
  }

  // Stock & Ledger logic is delegated to InvoiceLedgerService.

  Future<bool> recordPayment(int invoiceId, double amount, String method) async {
    try {
      final invRes  = await SupabaseService.client.from('invoices').select('client_id').eq('id', invoiceId).single();
      await InvoiceLedgerService.updateClientLedger(teamId: _activeTeamId, invoiceId: invoiceId, clientId: invRes['client_id'], amount: -amount, type: 'payment');
      await updateStatus(invoiceId, 'paid');
      return true;
    } catch (e) {
      debugPrint('Record payment failed: $e');
      return false;
    }
  }

  // Parse a status string → InvoiceStatus (strongly typed, no dynamic)
  static InvoiceStatus parseStatus(String s) {
    switch (s) {
      case 'paid':     return InvoiceStatus.paid;
      case 'pending':  return InvoiceStatus.pending;
      case 'overdue':  return InvoiceStatus.overdue;
      case 'voided':   return InvoiceStatus.voided;
      case 'accepted': return InvoiceStatus.accepted;
      case 'rejected': return InvoiceStatus.rejected;
      default:         return InvoiceStatus.draft;
    }
  }

  void reset() {
    _status       = InvoiceLoadState.idle;
    _errorMessage = '';
    notifyListeners();
  }

  String _calculateNextDate(DateTime from, String frequency) {
    DateTime next = from;
    switch (frequency.toLowerCase()) {
      case 'daily':   next = from.add(const Duration(days: 1)); break;
      case 'weekly':  next = from.add(const Duration(days: 7)); break;
      case 'monthly': next = DateTime(from.year, from.month + 1, from.day); break;
      case 'yearly':  next = DateTime(from.year + 1, from.month, from.day); break;
      default:        next = from.add(const Duration(days: 30));
    }
    return next.toIso8601String().split('T')[0];
  }

  // ── Pre-population Support ───────────────────────────────────────────────────
  Future<InvoiceDetails?> getMostRecentInvoice() async {
    if (_activeTeamId == null) return null;
    
    try {
      final response = await SupabaseService.client
          .from('invoices')
          .select('*, clients(*), invoice_items(*)')
          .eq('team_id', _activeTeamId!)
          .order('created_at', ascending: false)
          .limit(1)
          .maybeSingle();
      
      if (response == null) return null;
      return InvoiceDetails.fromJson(response);
    } catch (e) {
      debugPrint('Error fetching most recent invoice: $e');
      return null;
    }
  }
}
