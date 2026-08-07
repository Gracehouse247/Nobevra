import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/wallet/controllers/revenue_analytics_controller.dart';
import 'package:noble_invoice/core/utils/currency_formatter.dart';
import 'package:noble_invoice/features/wallet/widgets/revenue_bar_chart.dart';
import 'package:noble_invoice/features/wallet/widgets/revenue_line_chart.dart';
import 'package:noble_invoice/features/wallet/widgets/client_donut_chart.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/services/feature_gate_service.dart';

class RevenueAnalyticsScreen extends StatefulWidget {
  const RevenueAnalyticsScreen({super.key});

  @override
  State<RevenueAnalyticsScreen> createState() => _RevenueAnalyticsScreenState();
}

class _RevenueAnalyticsScreenState extends State<RevenueAnalyticsScreen> {
  static const _ranges    = ['1M', '3M', '6M', '1Y'];
  static const _rangeMths = {'1M': 1, '3M': 3, '6M': 6, '1Y': 12};
  String _selectedRange = '6M';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<RevenueAnalyticsController>().load(months: 6);
    });
  }

  void _onRangeChange(String range) {
    setState(() => _selectedRange = range);
    context.read<RevenueAnalyticsController>().load(months: _rangeMths[range]!);
  }

  String _fmt(double v) => CurrencyFormatter.format(context, v);

  @override
  Widget build(BuildContext context) {
    if (!FeatureGateService().canUse('analytics.reports')) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          backgroundColor: Colors.transparent, elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
            onPressed: () => Navigator.pop(context),
          ),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.bar_chart_rounded, size: 64, color: Colors.grey),
              const SizedBox(height: 16),
              const Text('Advanced Analytics Locked', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
              const SizedBox(height: 8),
              const Text('Upgrade to Pulse or Elite to access advanced revenue analytics and insights.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey)),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, AppRoutes.pricingPlans),
                child: const Text('View Pricing Plans'),
              ),
            ],
          ),
        ),
      );
    }

    final ctrl = context.watch<RevenueAnalyticsController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent, elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Revenue & Analytics',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: AppColors.black)),
        centerTitle: false,
      ),
      body: ctrl.isLoading && ctrl.monthlyPoints.isEmpty
        ? const Center(child: CircularProgressIndicator())
        : ctrl.error.isNotEmpty && ctrl.monthlyPoints.isEmpty
          ? _buildError(ctrl)
          : RefreshIndicator(
              onRefresh: () => ctrl.load(months: _rangeMths[_selectedRange]!),
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  const SizedBox(height: 12),
                  _buildRangeSelector(),
                  const SizedBox(height: 16),
                  if (ctrl.pendingCount > 0) ...[
                    _buildPendingAlert(ctrl),
                    const SizedBox(height: 16),
                  ],
                  _buildMetricCards(ctrl),
                  const SizedBox(height: 12),
                  // Expense History entry point — prominent shortcut for decision-making
                  _buildExpenseHistoryCard(ctrl),
                  const SizedBox(height: 20),
                  if (ctrl.monthlyPoints.isNotEmpty) ...[
                    RevenueBarChart(points: ctrl.monthlyPoints, parentContext: context),
                    const SizedBox(height: 20),
                    RevenueTrendChart(points: ctrl.monthlyPoints, parentContext: context),
                    const SizedBox(height: 20),
                  ],
                  if (ctrl.clientShares.isNotEmpty) ...[
                    ClientDonutChart(shares: ctrl.clientShares, parentContext: context),
                    const SizedBox(height: 20),
                  ],
                  if (ctrl.forecastNextMonth != 0) ...[
                    _buildForecastCard(ctrl),
                    const SizedBox(height: 20),
                  ],
                  const SizedBox(height: 80),
                ],
              ),
            ),
    );
  }

  Widget _buildPendingAlert(RevenueAnalyticsController ctrl) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFFBBF24).withOpacity(0.1)),
      ),
      child: Row(
        children: [
          const Icon(Icons.warning_amber_rounded, color: Color(0xFFF59E0B), size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              '${ctrl.pendingCount} unpaid invoice${ctrl.pendingCount > 1 ? 's' : ''} totalling ${_fmt(ctrl.totalPending)}',
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF92400E)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRangeSelector() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(color: AppColors.lightGrey, borderRadius: BorderRadius.circular(16)),
      child: Row(children: _ranges.map((r) {
        final sel = _selectedRange == r;
        return Expanded(child: GestureDetector(
          onTap: () => _onRangeChange(r),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(vertical: 10),
            decoration: BoxDecoration(
              color: sel ? AppColors.primary : Colors.transparent,
              borderRadius: BorderRadius.circular(12),
              boxShadow: sel ? [BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 8, offset: const Offset(0, 4))] : null,
            ),
            child: Center(child: Text(r,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: sel ? Colors.white : AppColors.darkGrey))),
          ),
        ));
      }).toList()),
    );
  }

  Widget _buildMetricCards(RevenueAnalyticsController ctrl) {
    final growthRate = ctrl.growthRate;
    final isPositiveGrowth = growthRate >= 0;

    return Column(children: [
      Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppColors.lightGrey),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('Estimated Net Profit',
              style: TextStyle(color: AppColors.darkGrey, fontWeight: FontWeight.bold, fontSize: 13)),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Text(_fmt(ctrl.netProfit),
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900,
                        color: ctrl.netProfit >= 0 ? AppColors.success : AppColors.error)),
              ),
              if (ctrl.monthlyPoints.length >= 2)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isPositiveGrowth ? AppColors.success.withOpacity(0.1) : AppColors.error.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${isPositiveGrowth ? '+' : ''}${growthRate.toStringAsFixed(1)}%',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: isPositiveGrowth ? AppColors.success : AppColors.error,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 4),
          Text('Revenue (${_fmt(ctrl.totalRevenue)}) - Expenses (${_fmt(ctrl.totalExpenses)})',
              style: const TextStyle(color: AppColors.darkGrey, fontSize: 11)),
        ]),
      ),
      const SizedBox(height: 12),
      Row(children: [
        Expanded(child: _MetricCard(title: 'Total Income',   value: _fmt(ctrl.totalRevenue),  sub: 'Paid invoices',     color: AppColors.primary)),
        const SizedBox(width: 12),
        Expanded(child: _MetricCard(title: 'Total Expenses', value: _fmt(ctrl.totalExpenses), sub: 'All business costs', color: AppColors.error)),
      ]),
      const SizedBox(height: 12),
      Row(children: [
        Expanded(child: _MetricCard(title: 'Avg. Invoice',  value: _fmt(ctrl.avgInvoice),   sub: 'Per paid invoice',   color: Colors.indigo)),
        const SizedBox(width: 12),
        Expanded(child: _MetricCard(title: 'Total Pending', value: _fmt(ctrl.totalPending), sub: '${ctrl.pendingCount} invoices', color: const Color(0xFFF59E0B))),
      ]),
    ]);
  }

  Widget _buildExpenseHistoryCard(RevenueAnalyticsController ctrl) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, AppRoutes.expenseHistory),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Row(children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: AppColors.error.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.receipt_long_rounded, color: AppColors.error, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Expense Log', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppColors.black)),
            Text('Total spent: ${_fmt(ctrl.totalExpenses)}', style: const TextStyle(fontSize: 12, color: AppColors.darkGrey)),
          ])),
          const Icon(Icons.chevron_right_rounded, color: AppColors.lightGrey),
        ]),
      ),
    );
  }

  Widget _buildForecastCard(RevenueAnalyticsController ctrl) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary.withOpacity(0.1), AppColors.primary.withOpacity(0.1)],
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.primary.withOpacity(0.1)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), shape: BoxShape.circle),
            child: const Icon(Icons.trending_up_rounded, color: AppColors.primary, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('NEXT MONTH FORECAST', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900,
                    color: AppColors.darkGrey, letterSpacing: 1.2)),
                const SizedBox(height: 4),
                Text(_fmt(ctrl.forecastNextMonth),
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.primary)),
                const Text('3-month moving average', style: TextStyle(fontSize: 10, color: AppColors.darkGrey)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildError(RevenueAnalyticsController ctrl) {
    return Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      const Icon(Icons.cloud_off_rounded, size: 64, color: AppColors.lightGrey),
      const SizedBox(height: 12),
      Text(ctrl.error, style: const TextStyle(color: AppColors.darkGrey)),
      const SizedBox(height: 20),
      ElevatedButton(onPressed: () => ctrl.load(), child: const Text('Retry')),
    ]));
  }
}

class _MetricCard extends StatelessWidget {
  final String title, value, sub;
  final Color  color;
  const _MetricCard({required this.title, required this.value, required this.sub, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white, borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: const TextStyle(color: AppColors.darkGrey, fontWeight: FontWeight.bold, fontSize: 12)),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color)),
        Text(sub,   style: const TextStyle(color: AppColors.darkGrey, fontSize: 11)),
      ]),
    );
  }
}
