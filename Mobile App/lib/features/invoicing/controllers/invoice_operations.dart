// lib/features/invoicing/controllers/invoice_operations.dart
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_details_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/services/invoice_ledger_service.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';


/// Extension to keep InvoiceController under 600 lines.
/// Contains all mutation logic (Create, Update, Delete, Convert).
extension InvoiceOperations on InvoiceController {
  
  // ── Invoice Creation ────────────────────────────────────────────────────────
  // All business logic (subscription quota, fee injection, financials calculation,
  // inventory deduction, ledger updates, audit logs, and domain events) is now
  // handled atomically and securely by the `create-invoice` Edge Function.
  // This method is intentionally thin: build the payload, call the function, refresh.
  Future<bool> createInvoice(InvoiceCreatePayload payload, SubscriptionController sub) async {
    setSaving(true);
    try {
      final edgePayload = {
        'client_id':      payload.clientId,
        'due_date':       payload.dueDate.toIso8601String().split('T')[0],
        'status':         payload.status,
        'invoice_type':   payload.invoiceType.dbValue,
        'currency_code':  payload.currencyCode,
        'notes':          payload.notes,
        'tax_rate':       payload.taxRate,
        'tax_type':       payload.taxType,
        'discount_type':  payload.discountType,
        'discount_value': payload.discountValue,
        'metadata':       payload.metadata ?? {},
        'items': payload.items.map((i) => {
          'description': i.description,
          'quantity':    i.quantity,
          'unit_price':  i.unitPrice,
          if (i.productId != null) 'product_id': int.tryParse(i.productId!),
        }).toList(),
      };

      final response = await SupabaseService.client.functions.invoke(
        'create-invoice',
        body: edgePayload,
      );

      if (response.status != 201) {
        final errorMsg = (response.data as Map<String, dynamic>?)?['error'] ?? 'Failed to create invoice';
        setError(errorMsg.toString());
        return false;
      }

      // Edge function handles subscription usage tracking internally.
      // Refresh the local dashboard to pick up the new invoice.
      await loadDashboard();
      return true;

    } catch (e) {
      setError(parseError(e));
      return false;
    } finally {
      setSaving(false);
    }
  }


  // ── Invoice Update ──────────────────────────────────────────────────────────
  Future<bool> updateInvoice(int invoiceId, InvoiceCreatePayload payload, SubscriptionController sub) async {
    final limitMsg = sub.checkEditLimit('invoices');
    if (limitMsg != null) {
      setError('SUBSCRIPTION_LIMIT: $limitMsg');
      return false;
    }

    setSaving(true);
    try {
      final oldRes = await SupabaseService.client.from('invoices').select('status, client_id').eq('id', invoiceId).single();
      if (InvoiceLedgerService.isActiveStatus(oldRes['status'])) {
        final oldItemsRes = await SupabaseService.client.from('invoice_items').select('*').eq('invoice_id', invoiceId);
        final oldItems = (oldItemsRes as List).map((j) => InvoiceItem.fromJson(j)).toList();
        await InvoiceLedgerService.restockItems(teamId: activeTeamId, invoiceId: invoiceId, items: oldItems, reason: 'Invoice Updated');
        await InvoiceLedgerService.reverseLedgerEntry(teamId: activeTeamId, invoiceId: invoiceId);
      }

      final financials = _calculateFinancials(payload.items, payload.taxType, payload.taxRate, payload.discountType, payload.discountValue);

      await SupabaseService.client.from('invoices').update({
        'client_id':      payload.clientId,
        'invoice_type':   payload.invoiceType.dbValue,
        'due_date':       payload.dueDate.toIso8601String().split('T')[0],
        'notes':          payload.notes,
        'status':         payload.status,
        'currency_code':  payload.currencyCode,
        'tax_rate':       payload.taxRate,
        'tax_type':       payload.taxType,
        'tax_amount':     financials.taxAmount,
        'discount_type':  payload.discountType,
        'discount_value': payload.discountValue,
        'discount_amount': financials.discountAmount,
        'subtotal':       financials.subtotal,
        'total_amount':   financials.totalAmount,
        'metadata':       payload.metadata,
      }).eq('id', invoiceId);

      await sub.trackUsage('invoices', isEdit: true);
      await SupabaseService.client.from('invoice_items').delete().eq('invoice_id', invoiceId);
      await SupabaseService.client.from('invoice_items').insert(
        payload.items.map((i) => {
          'invoice_id':  invoiceId,
          'description': i.description,
          'quantity':    i.quantity,
          'unit_price':  i.unitPrice,
          'total':       i.quantity * i.unitPrice,
        }).toList(),
      );

      if (InvoiceLedgerService.isActiveStatus(payload.status)) {
        await InvoiceLedgerService.deductStock(teamId: activeTeamId, invoiceId: invoiceId, items: payload.items);
        await InvoiceLedgerService.updateClientLedger(
          teamId:    activeTeamId,
          invoiceId: invoiceId,
          clientId:  payload.clientId,
          amount:    payload.invoiceType == InvoiceType.creditMemo ? -financials.totalAmount : financials.totalAmount,
          type:      payload.invoiceType == InvoiceType.creditMemo ? 'credit_memo' : 'invoice',
        );
      }

      await loadDashboard();
      return true;
    } catch (e) {
      setError(parseError(e));
      return false;
    } finally {
      setSaving(false);
    }
  }

  // ── Convert Estimate to Invoice ──────────────────────────────────────────────
  Future<bool> convertToInvoice(int estimateId, SubscriptionController sub) async {
    setSaving(true);
    try {
      final res = await SupabaseService.client.from('invoices').select('*, clients(*), invoice_items(*)').eq('id', estimateId).single();
      final estimate = InvoiceDetails.fromJson(res);
      
      final payload = InvoiceCreatePayload(
        clientId:      estimate.client.id,
        items:         estimate.items,
        dueDate:       DateTime.now().add(const Duration(days: 14)),
        notes:         estimate.notes,
        status:        'pending',
        invoiceType:   InvoiceType.standard,
        taxRate:       estimate.taxRate,
        taxType:       estimate.taxType,
        discountType:  estimate.discountType,
        discountValue: estimate.discountValue,
        currencyCode:  estimate.currencyCode ?? 'USD',
        metadata:      { ...estimate.metadata, 'converted_from': estimateId, 'conversion_date': DateTime.now().toIso8601String() },
      );
      
      final success = await createInvoice(payload, sub);
      if (success) {
        await SupabaseService.client.from('invoices').update({'status': 'accepted'}).eq('id', estimateId);
      }
      return success;
    } catch (e) {
      setError(parseError(e));
      return false;
    } finally {
      setSaving(false);
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  String _generateInvoiceNumber(String? prefix, DateTime ts) {
    final pre = prefix ?? 'NGO';
    final suffix = (ts.millisecondsSinceEpoch % 9000 + 1000).toString();
    return '$pre-${ts.year}${ts.month.toString().padLeft(2,'0')}${ts.day.toString().padLeft(2,'0')}-$suffix';
  }

  _Financials _calculateFinancials(List<InvoiceItem> items, String taxType, double taxRate, String discType, double discVal) {
    final subtotal = items.fold<double>(0, (s, i) => s + (i.quantity * i.unitPrice));
    final discAmt  = discType == 'flat' ? discVal : discType == 'percentage' ? subtotal * (discVal / 100) : 0.0;
    final taxable  = subtotal - discAmt;
    final taxAmt   = taxType == 'exclusive' ? taxable * (taxRate / 100) : taxable - (taxable / (1 + taxRate / 100));
    return _Financials(subtotal, discAmt, taxAmt, taxType == 'exclusive' ? taxable + taxAmt : taxable);
  }

  Future<void> _invokePaymentLink(int id) async {
    try {
      await SupabaseService.client.functions.invoke('create-flutterwave-payment', body: { 'invoice_id': id });
    } catch (e) {
      debugPrint('Payment link error: $e');
    }
  }
}

class _Financials {
  final double subtotal, discountAmount, taxAmount, totalAmount;
  _Financials(this.subtotal, this.discountAmount, this.taxAmount, this.totalAmount);
}
