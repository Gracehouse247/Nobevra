import 'package:provider/provider.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/core/services/currency_service.dart';
import 'package:flutter/material.dart';

class PricingConverter {
  /// Base pricing in USD
  static const double baseProMonthlyUSD = 9.99;

  static double convertUSD(BuildContext context, double usdAmount) {
    try {
      final currency = Provider.of<InvoiceController>(context, listen: false).currencyCode;
      return CurrencyService.convert(usdAmount, 'USD', currency);
    } catch (_) {
      return usdAmount;
    }
  }

  static double getProPrice(BuildContext context) {
    return convertUSD(context, baseProMonthlyUSD);
  }
}
