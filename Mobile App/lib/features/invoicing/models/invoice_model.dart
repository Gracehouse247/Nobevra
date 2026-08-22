import 'package:noble_invoice/features/invoicing/models/client_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_item_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';

enum InvoiceStatus { paid, pending, overdue, draft, voided, accepted, rejected }

/// Core domain model — used in preview and PDF generation.
class Invoice {
  final String         id;
  final Client         client;
  final List<InvoiceItem> items;
  final DateTime       issueDate;
  final DateTime       dueDate;
  final InvoiceStatus  status;
  final InvoiceType    invoiceType;
  final String?        notes;
  final double         taxRate;        // e.g. 7.5 for 7.5%
  final String         taxType;        // 'inclusive' | 'exclusive'
  final String         discountType;   // 'none' | 'flat' | 'percentage'
  final double         discountValue;  // % or flat amount
  final String         currencyCode;
  
  /// Holds polymorphic data unique to specific invoice types (e.g. hs_tariff_codes, deposit_required_pct).
  final Map<String, dynamic> metadata;

  const Invoice({
    required this.id,
    required this.client,
    required this.items,
    required this.issueDate,
    required this.dueDate,
    required this.status,
    this.invoiceType   = InvoiceType.standard,
    this.notes,
    this.taxRate       = 0,
    this.taxType       = 'exclusive',
    this.discountType  = 'none',
    this.discountValue = 0,
    this.currencyCode  = 'USD',
    this.metadata      = const {},
  });

  double get subtotal => items.fold(0.0, (sum, item) => sum + item.total);

  double get discountAmount {
    if (discountType == 'flat') return discountValue;
    if (discountType == 'percentage') return subtotal * (discountValue / 100);
    return 0;
  }

  double get taxableAmount => subtotal - discountAmount;

  double get taxAmount {
    if (taxType == 'exclusive') return taxableAmount * (taxRate / 100);
    // Inclusive: tax is embedded — extract it
    return taxableAmount - (taxableAmount / (1 + taxRate / 100));
  }

  double get totalAmount => taxableAmount + taxAmount;

  String? get trackingToken => metadata['tracking_token'] as String?;
  String get invoiceNumber => metadata['invoice_number'] as String? ?? (id.length > 8 ? id.substring(0, 8) : id);
  String get clientName => client.name;

  Invoice copyWith({
    String? id,
    Client? client,
    List<InvoiceItem>? items,
    DateTime? issueDate,
    DateTime? dueDate,
    InvoiceStatus? status,
    InvoiceType? invoiceType,
    String? notes,
    double? taxRate,
    String? taxType,
    String? discountType,
    double? discountValue,
    String? currencyCode,
    Map<String, dynamic>? metadata,
  }) {
    return Invoice(
      id: id ?? this.id,
      client: client ?? this.client,
      items: items ?? this.items,
      issueDate: issueDate ?? this.issueDate,
      dueDate: dueDate ?? this.dueDate,
      status: status ?? this.status,
      invoiceType: invoiceType ?? this.invoiceType,
      notes: notes ?? this.notes,
      taxRate: taxRate ?? this.taxRate,
      taxType: taxType ?? this.taxType,
      discountType: discountType ?? this.discountType,
      discountValue: discountValue ?? this.discountValue,
      currencyCode: currencyCode ?? this.currencyCode,
      metadata: metadata ?? this.metadata,
    );
  }
}

