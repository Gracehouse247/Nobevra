// lib/core/services/reporting_service.dart
import 'package:noble_invoice/core/services/supabase_service.dart';

class FiscalSummary {
  final double totalIncome;
  final double totalExpenses;
  final double totalTaxCollected;
  final double netProfit;
  final Map<String, double> incomeByCategory;
  final Map<String, double> expenseByCategory;

  FiscalSummary({
    required this.totalIncome,
    required this.totalExpenses,
    required this.totalTaxCollected,
    required this.netProfit,
    required this.incomeByCategory,
    required this.expenseByCategory,
  });

  double get operatingMargin => totalIncome == 0 ? 0 : (netProfit / totalIncome) * 100;
}

class ReportingService {
  static Future<FiscalSummary> generateSummary(DateTime start, DateTime end, String teamId) async {
    try {
      // 1. Fetch Invoices for Income
      final invoiceRes = await SupabaseService.client
          .from('invoices')
          .select('total_amount, status')
          .eq('team_id', teamId)
          .gte('issue_date', start.toIso8601String())
          .lte('issue_date', end.toIso8601String());

      // 2. Fetch Expenses
      final expenseRes = await SupabaseService.client
          .from('expenses')
          .select('amount, category')
          .eq('team_id', teamId)
          .gte('date', start.toIso8601String())
          .lte('date', end.toIso8601String());

      double totalIncome = 0;
      double totalTax = 0;
      double totalExpenses = 0;
      Map<String, double> expenseCats = {};

      for (final inv in invoiceRes) {
        // Only count paid or issued invoices for income depending on accounting method (accrual)
        if (inv['status'] != 'draft' && inv['status'] != 'cancelled') {
          final amt = (inv['total_amount'] as num).toDouble();
          totalIncome += amt;
          // Approximate tax (assuming 15% VAT for estimate if not stored separately yet)
          // Ideally check the invoice table for a tax_amount column if it exists.
          totalTax += amt * 0.15; 
        }
      }

      for (final exp in expenseRes) {
        final amt = (exp['amount'] as num).toDouble();
        final cat = exp['category'] ?? 'General';
        totalExpenses += amt;
        expenseCats[cat] = (expenseCats[cat] ?? 0) + amt;
      }

      return FiscalSummary(
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        totalTaxCollected: totalTax,
        netProfit: totalIncome - totalExpenses,
        incomeByCategory: {'Sales': totalIncome},
        expenseByCategory: expenseCats,
      );
    } catch (e) {
      rethrow;
    }
  }

  static String generateCsvReport(FiscalSummary summary, String teamName, DateTime start, DateTime end) {
    String csv = "Nobevra Fiscal Report,$teamName\n";
    csv += "Period,${start.toLocal().toString().split(' ')[0]} to ${end.toLocal().toString().split(' ')[0]}\n\n";
    
    csv += "Overview\n";
    csv += "Total Income,${summary.totalIncome.toStringAsFixed(2)}\n";
    csv += "Total Expenses,${summary.totalExpenses.toStringAsFixed(2)}\n";
    csv += "Estimated Tax Collected,${summary.totalTaxCollected.toStringAsFixed(2)}\n";
    csv += "Net Profit,${summary.netProfit.toStringAsFixed(2)}\n\n";

    csv += "Expenses Breakdown\n";
    summary.expenseByCategory.forEach((cat, amt) {
      csv += "$cat,${amt.toStringAsFixed(2)}\n";
    });

    return csv;
  }
}
