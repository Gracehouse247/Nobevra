import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/core/utils/currency_formatter.dart';
import 'package:noble_invoice/features/wallet/controllers/revenue_analytics_controller.dart';

class DashboardHeader extends StatelessWidget {
  final double netProfit;
  final double revenue;
  final double expenses;
  final RevenueAnalyticsController revenueCtrl;

  const DashboardHeader({
    super.key,
    required this.netProfit,
    required this.revenue,
    required this.expenses,
    required this.revenueCtrl,
  });

  @override
  Widget build(BuildContext context) {
    final spots = List.generate(revenueCtrl.monthlyPoints.length, (i) => FlSpot(i.toDouble(), revenueCtrl.monthlyPoints[i].net));
    final total = revenue + revenueCtrl.totalPending;
    final paidPercent = total > 0 ? (revenue / total) * 100 : 0.0;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF012836), // Deep Dark Teal Navy
            Color(0xFF013948), // Nobevra Deep Navy
            Color(0xFF016282), // Rich Ocean Navy Blue
          ],
        ),
        borderRadius: BorderRadius.circular(28),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF012836).withOpacity(0.35),
            blurRadius: 25,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(28),
        child: Stack(
          children: [
            Positioned(
              top: -30, right: -30,
              child: Container(width: 100, height: 100, decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.white.withOpacity(0.1))),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('NET PROFIT PERFORMANCE', style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 1.2)),
                            const SizedBox(height: 4),
                            FittedBox(
                              fit: BoxFit.scaleDown,
                              child: Text(
                                CurrencyFormatter.format(context, netProfit),
                                style: const TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.w900, letterSpacing: -0.5),
                              ),
                            ),
                          ],
                        ),
                      ),
                      _buildRadialProgress(paidPercent),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      _buildStatRow(context, 'INCOME', revenue, Colors.greenAccent),
                      const SizedBox(width: 20),
                      _buildStatRow(context, 'RECEIVABLES', revenueCtrl.totalPending, Colors.orangeAccent),
                      const Spacer(),
                      if (spots.isNotEmpty)
                        SizedBox(
                          width: 60, height: 30,
                          child: LineChart(
                            LineChartData(
                              gridData: const FlGridData(show: false),
                              titlesData: const FlTitlesData(show: false),
                              borderData: FlBorderData(show: false),
                              lineBarsData: [
                                LineChartBarData(
                                  spots: spots,
                                  isCurved: true,
                                  color: Colors.white.withOpacity(0.5),
                                  barWidth: 2,
                                  dotData: const FlDotData(show: false),
                                  belowBarData: BarAreaData(show: false),
                                ),
                              ],
                            ),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRadialProgress(double percentage) {
    return SizedBox(
      width: 50, height: 50,
      child: Stack(
        alignment: Alignment.center,
        children: [
          PieChart(
            PieChartData(
              sectionsSpace: 0,
              centerSpaceRadius: 18,
              startDegreeOffset: -90,
              sections: [
                PieChartSectionData(color: Colors.white, value: percentage, radius: 5, showTitle: false),
                PieChartSectionData(color: Colors.white.withOpacity(0.2), value: 100 - percentage, radius: 5, showTitle: false),
              ],
            ),
          ),
          Text('${percentage.toInt()}%', style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }

  Widget _buildStatRow(BuildContext context, String label, double amount, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 8, fontWeight: FontWeight.w900)),
        Text(
          CurrencyFormatter.format(context, amount).split('.')[0],
          style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w800),
        ),
      ],
    );
  }
}
