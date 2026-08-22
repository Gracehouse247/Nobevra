import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/utils/currency_formatter.dart';
import 'package:noble_invoice/features/wallet/controllers/revenue_analytics_controller.dart';

class YearInReviewScreen extends StatefulWidget {
  const YearInReviewScreen({super.key});

  @override
  State<YearInReviewScreen> createState() => _YearInReviewScreenState();
}

class _YearInReviewScreenState extends State<YearInReviewScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<RevenueAnalyticsController>().load(months: 12);
    });
  }

  @override
  Widget build(BuildContext context) {
    final ctrl = context.watch<RevenueAnalyticsController>();
    final year = DateTime.now().year.toString();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.1),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close_rounded, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text('$year in Review', style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: ctrl.isLoading && ctrl.monthlyPoints.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Column(
                children: [
                  _buildHeroSection(year),
                  _buildAchievementBanner(ctrl),
                  _buildDataGrid(ctrl),
                  _buildImpactSummary(ctrl),
                  const SizedBox(height: 150),
                ],
              ),
            ),
      bottomSheet: _buildBottomActions(),
    );
  }

  Widget _buildHeroSection(String year) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        height: 320,
        width: double.infinity,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [AppColors.primary, Color(0xFF4FACFE)],
          ),
          boxShadow: [BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 20, offset: const Offset(0, 10))],
        ),
        child: Stack(
          children: [
            Positioned(
              top: 24,
              right: 24,
              child: Opacity(
                opacity: 0.2,
                child: Icon(Icons.auto_awesome_rounded, size: 120, color: Colors.white.withOpacity(0.1)),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
                    child: const Text('Nobevra WRAPPED', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                  ),
                  const SizedBox(height: 12),
                  const Text('Your Year in Business', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900, height: 1.1)),
                  const SizedBox(height: 8),
                  Text('A look back at everything you\'ve achieved in $year.', style: TextStyle(color: Colors.white.withOpacity(0.1), fontSize: 14, fontWeight: FontWeight.w500)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAchievementBanner(RevenueAnalyticsController ctrl) {
    final isPerformingWell = ctrl.growthRate > 0;
    
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.primary.withOpacity(0.1),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppColors.primary.withOpacity(0.1)),
        ),
        child: Row(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), shape: BoxShape.circle),
              child: const Icon(Icons.emoji_events_rounded, color: AppColors.primary, size: 28),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                   Text(
                    isPerformingWell ? 'Positive Growth!' : 'New Horizons Await',
                    style: const TextStyle(color: AppColors.primary, fontSize: 18, fontWeight: FontWeight.bold)
                  ),
                  const SizedBox(height: 4),
                  Text(
                    isPerformingWell 
                      ? 'Your business net profit grew by ${ctrl.growthRate.toStringAsFixed(1)}% this period. Keep pushing!'
                      : 'Every challenge is a setup for a comeback. We\'re here to help you scale next year.',
                    style: const TextStyle(color: Colors.grey, fontSize: 12, height: 1.4)
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDataGrid(RevenueAnalyticsController ctrl) {
    String bestMonth = 'N/A';
    if (ctrl.monthlyPoints.isNotEmpty) {
      bestMonth = ctrl.monthlyPoints.reduce((a, b) => a.paid > b.paid ? a : b).label;
    }

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.count(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        crossAxisCount: 2,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        childAspectRatio: 1.1,
        children: [
          _buildDataCard(CurrencyFormatter.format(context, ctrl.totalRevenue), 'Total Invoiced', Icons.receipt_long_rounded, Colors.green),
          _buildDataCard(bestMonth, 'Best Month', Icons.star_rounded, Colors.amber),
          _buildDataCard(CurrencyFormatter.format(context, ctrl.totalExpenses), 'Total Expenses', Icons.money_off_rounded, Colors.red),
          _buildDataCard(ctrl.clientShares.length.toString(), 'Active Clients', Icons.people_rounded, Colors.blue),
        ],
      ),
    );
  }

  Widget _buildDataCard(String value, String label, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
            child: Icon(icon, color: color, size: 20),
          ),
          const Spacer(),
          Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900), overflow: TextOverflow.ellipsis),
          const SizedBox(height: 4),
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
        ],
      ),
    );
  }

  Widget _buildImpactSummary(RevenueAnalyticsController ctrl) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.primary.withOpacity(0.1),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppColors.primary.withOpacity(0.1)),
        ),
        child: Stack(
          children: [
            const Positioned(
              bottom: -20,
              right: -20,
              child: Opacity(
                opacity: 0.1,
                child: Icon(Icons.trending_up_rounded, size: 100, color: Colors.white),
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Financial impact', style: TextStyle(color: AppColors.primary, fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text(
                  'Your business generated ${CurrencyFormatter.format(context, ctrl.netProfit)} in estimated net profit this year.',
                  style: const TextStyle(color: AppColors.darkGrey, fontSize: 13)
                ),
                const SizedBox(height: 20),
                if (ctrl.clientShares.isNotEmpty)
                  Row(
                    children: [
                      _buildAvatarGroup(ctrl),
                      const SizedBox(width: 12),
                      if (ctrl.clientShares.length > 3)
                        Text('+${ctrl.clientShares.length - 3} more', style: const TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),
                    ],
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAvatarGroup(RevenueAnalyticsController ctrl) {
    final topClients = ctrl.clientShares.take(3).toList();
    return SizedBox(
      height: 32,
      width: 80,
      child: Stack(
        children: List.generate(topClients.length, (index) {
          final client = topClients[index];
          final initials = client.name.isNotEmpty ? client.name.substring(0, 1).toUpperCase() : '?';
          return Positioned(
            left: index * 20.0,
            child: Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: [Colors.blueGrey, AppColors.primary, Colors.grey][index % 3],
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white, width: 2),
              ),
              child: Center(child: Text(initials, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold))),
            ),
          );
        }),
      ),
    );
  }

  Widget _buildBottomActions() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        border: const Border(top: BorderSide(color: AppColors.lightGrey)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ElevatedButton.icon(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 60),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 0,
            ),
            icon: const Icon(Icons.share_rounded),
            label: const Text('Share Your Success', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ),
          const SizedBox(height: 12),
          TextButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.file_download_rounded, size: 18),
            label: const Text('Download Full Report', style: TextStyle(fontWeight: FontWeight.bold)),
            style: TextButton.styleFrom(foregroundColor: Colors.grey, minimumSize: const Size(double.infinity, 44)),
          ),
        ],
      ),
    );
  }
}
