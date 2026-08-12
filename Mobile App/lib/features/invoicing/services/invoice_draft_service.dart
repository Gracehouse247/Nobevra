// lib/features/invoicing/services/invoice_draft_service.dart
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';

const _kDraftKey = 'noble_draft_invoice';
const _storage = FlutterSecureStorage();

class InvoiceDraftService {
  static Future<void> save({
    required String invoiceTypeDb,
    required String notes,
    required String paymentLink,
    required String templateName,
    required Client? client,
    required List<InvoiceItem> items,
    required DateTime issueDate,
    required DateTime dueDate,
    required bool taxEnabled,
    required double taxRate,
    required String taxType,
    required String discountType,
    required double discountValue,
    required String currencyCode,
    required Map<String, dynamic> typeMetadata,
  }) async {
    final draft = {
      'timestamp':     DateTime.now().toIso8601String(),
      'invoiceType':   invoiceTypeDb,
      'notes':         notes,
      'paymentLink':   paymentLink,
      'template':      templateName,
      'client':        client != null ? {
        'id':           client.id,
        'name':         client.name,
        'email':        client.email,
        'phone':        client.phone,
        'country_code': client.countryCode,
        'address':      client.address,
      } : null,
      'items': items.map((i) => {
        'id':          i.id,
        'description': i.description,
        'product_id':  i.productId,
        'quantity':    i.quantity,
        'unit_price':  i.unitPrice,
      }).toList(),
      'issueDate':     issueDate.toIso8601String(),
      'dueDate':       dueDate.toIso8601String(),
      'taxEnabled':    taxEnabled,
      'taxRate':       taxRate,
      'taxType':       taxType,
      'discountType':  discountType,
      'discountValue': discountValue,
      'currencyCode':  currencyCode,
      'typeMetadata':  typeMetadata,
    };
    await _storage.write(key: _kDraftKey, value: jsonEncode(draft));
  }

  static Future<void> clear() async {
    await _storage.delete(key: _kDraftKey);
  }

  /// Returns the draft if it's valid (less than 1 day old), otherwise clears and returns null.
  static Future<Map<String, dynamic>?> load() async {
    final str = await _storage.read(key: _kDraftKey);
    if (str == null) return null;
    try {
      final draft = jsonDecode(str) as Map<String, dynamic>;
      final dt = DateTime.tryParse(draft['timestamp'] ?? '');
      if (dt == null || DateTime.now().difference(dt).inDays > 1) {
        await clear();
        return null;
      }
      return draft;
    } catch (_) {
      await clear();
      return null;
    }
  }

  static PdfTemplate parseTemplate(String? name) =>
      PdfTemplate.values.firstWhere(
        (e) => e.name == name,
        orElse: () => PdfTemplate.modern,
      );

  static InvoiceType parseInvoiceType(String? db) =>
      InvoiceTypeExtension.fromDb(db ?? 'standard');
}
