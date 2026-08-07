// lib/features/wallet/screens/advanced_reports_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:share_plus/share_plus.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/services/reporting_service.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/services/feature_gate_service.dart';

class AdvancedReportsScreen extends StatefulWidget {
  const AdvancedReportsScreen({super.key});

  @override
  State<AdvancedReportsScreen> createState() => _AdvancedReportsScreenState();
}

class _AdvancedReportsScreenState extends State<AdvancedReportsScreen> {
  DateTimeRange _dateRange = DateTimeRange(
    start: DateTime(DateTime.now().year, 1, 1),
    end: DateTime.now(),
  );

  FiscalSummary? _summary;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _loadReport());
  }

  Future<void> _loadReport() async {
    final teamId = context.read<TeamController>().activeTeam?.id;
    if (teamId == null) return;

    setState(() => _loading = true);
    try {
      final summary = await ReportingService.generateSummary(_dateRange.start, _dateRange.end, teamId);
      setState(() => _summary = summary);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error loading report: $e')));
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _pickDateRange() async {
    final picked = await showDateRangePicker(
      context: context,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
      initialDateRange: _dateRange,
      builder: (context, child) => Theme(
        data: Theme.of(context).copyWith(colorScheme: const ColorScheme.light(primary: AppColors.primary)),
        child: child!,
      ),
    );
    if (picked != null) {
      setState(() => _dateRange = picked);
      _loadReport();
    }
  }

  void _exportCsv() {
    if (_summary == null) return;
    final teamName = context.read<TeamController>().activeTeam?.name ?? 'Business';
    final csvData = ReportingService.generateCsvReport(_summary!, teamName, _dateRange.start, _dateRange.end);
    Share.share(csvData, subject: 'Fiscal Report $teamName');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Tax-Ready Reports', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        backgroundColor: Colors.white, elevation: 0,
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary), onPressed: () => Navigator.pop(context)),
        actions: [
          if (_summary != null)
            IconButton(icon: const Icon(Icons.share_rounded, color: AppColors.primary), onPressed: _exportCsv),
        ],
      ),
      body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // 1. Date Filter
        _buildDateHeader(),
        
        // 2. Summary Dashboard
        Expanded(child: _buildReportContent()),
      ]),
    );
  }

  Widget _buildReportContent() {
    final canUseReports = FeatureGateService().canUse('analytics.reports');

    if (_loading) return const Center(child: CircularProgressIndicator());
    if (_summary == null) return const Center(child: Text('No data for this period'));

    return Stack(
      children: [
        SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(children: [
            _buildProfitCard(),
            const SizedBox(height: 24),
            _buildStatGrid(),
            const SizedBox(height: 32),
            _buildExpenseBreakdown(),
          ]),
        ),
        if (!canUseReports) _buildSquadPaywall(),
      ],
    );
  }

  Widget _buildSquadPaywall() {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.white.withOpacity(0.1), Colors.white.withOpacity(0.9), Colors.white],
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: Colors.indigo.shade50, shape: BoxShape.circle),
            child: const Icon(Icons.analytics_rounded, size: 48, color: Colors.indigo),
          ),
          const SizedBox(height: 24),
          const Text('Noble Elite Exclusive', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 40),
            child: Text(
              'Tax-ready reports and fiscal intelligence are built for growing teams. Upgrade to the Elite tier to unlock business-wide revenue insights.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey, height: 1.5),
            ),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, AppRoutes.pricingPlans),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.indigo,
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text('Upgrade to Elite', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildDateHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: InkWell(
        onTap: _pickDateRange,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(color: AppColors.lightGrey.withOpacity(0.2), borderRadius: BorderRadius.circular(12)),
          child: Row(children: [
            const Icon(Icons.calendar_today_rounded, size: 18, color: AppColors.primary),
            const SizedBox(width: 12),
            Text(
              '${DateFormat.yMMMd().format(_dateRange.start)} - ${DateFormat.yMMMd().format(_dateRange.end)}',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const Spacer(),
            const Icon(Icons.keyboard_arrow_down_rounded, color: AppColors.primary),
          ]),
        ),
      ),
    );
  }

  Widget _buildProfitCard() {
    final isProfit = _summary!.netProfit >= 0;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: isProfit ? Colors.green.shade50 : Colors.red.shade50,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isProfit ? Colors.green.shade100 : Colors.red.shade100),
      ),
      child: Column(children: [
        Text(isProfit ? 'NET PROFIT' : 'NET LOSS', style: TextStyle(color: isProfit ? Colors.green : Colors.red, fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 1)),
        const SizedBox(height: 8),
        Text(
          NumberFormat.simpleCurrency().format(_summary!.netProfit),
          style: TextStyle(color: isProfit ? Colors.green.shade700 : Colors.red.shade700, fontWeight: FontWeight.bold, fontSize: 32),
        ),
        const SizedBox(height: 8),
        Text('Margin: ${_summary!.operatingMargin.toStringAsFixed(1)}%', style: TextStyle(color: Colors.grey.shade600, fontSize: 13)),
      ]),
    );
  }

  Widget _buildStatGrid() {
    return Row(children: [
      Expanded(child: _miniStat('Income', _summary!.totalIncome, Colors.blue)),
      const SizedBox(width: 16),
      Expanded(child: _miniStat('Expenses', _summary!.totalExpenses, Colors.orange)),
      const SizedBox(width: 16),
      Expanded(child: _miniStat('Est. Tax', _summary!.totalTaxCollected, Colors.purple)),
    ]);
  }

  Widget _miniStat(String label, double val, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, border: Border.all(color: AppColors.lightGrey), borderRadius: BorderRadius.circular(16)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey)),
        const SizedBox(height: 4),
        Text(NumberFormat.simpleCurrency().format(val), style: TextStyle(fontWeight: FontWeight.bold, color: color, fontSize: 14)),
      ]),
    );
  }

  Widget _buildExpenseBreakdown() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text('EXPENSE BREAKDOWN', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: AppColors.darkGrey, letterSpacing: 1.5)),
      const SizedBox(height: 16),
      if (_summary!.expenseByCategory.isEmpty) const Text('No expenses recorded', style: TextStyle(color: Colors.grey, fontSize: 13)),
      ..._summary!.expenseByCategory.entries.map((e) => Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Row(children: [
          Expanded(child: Text(e.key, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),
          Text(NumberFormat.simpleCurrency().format(e.value), style: const TextStyle(fontWeight: FontWeight.bold)),
        ]),
      )),
    ]);
  }
}
