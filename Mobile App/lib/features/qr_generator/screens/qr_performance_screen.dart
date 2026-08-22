import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'dart:math' as math;

class QrPerformanceScreen extends StatelessWidget {
  const QrPerformanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              _buildKeyMetrics(),
              _buildScanTrendsChart(),
              _buildGeographicDistribution(),
              _buildRealTimeActivity(),
              const SizedBox(height: 100),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Nobevra QR TOOLKIT', style: TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
                  SizedBox(height: 4),
                  Text('QR Performance', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, letterSpacing: -0.5)),
                ],
              ),
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), shape: BoxShape.circle),
                child: const Icon(Icons.calendar_today_rounded, color: AppColors.primary, size: 20),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
            child: Row(
              children: [
                Expanded(child: _buildFilterBtn('7 Days', isActive: true)),
                Expanded(child: _buildFilterBtn('30 Days')),
                Expanded(child: _buildFilterBtn('All Time')),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterBtn(String label, {bool isActive = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        color: isActive ? AppColors.primary : Colors.transparent,
        borderRadius: BorderRadius.circular(10),
        boxShadow: isActive ? [BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))] : null,
      ),
      child: Center(
        child: Text(
          label,
          style: TextStyle(color: isActive ? Colors.white : Colors.grey.shade600, fontSize: 12, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  Widget _buildKeyMetrics() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: GridView.count(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        crossAxisCount: 2,
        mainAxisSpacing: 12,
        crossAxisSpacing: 12,
        childAspectRatio: 1.4,
        children: [
          _buildMetricCard('Total Scans', '12,840', '+12%', Colors.green),
          _buildMetricCard('Unique Users', '8,201', '+8%', Colors.green),
          _buildTopQrCard(),
        ],
      ),
    );
  }

  Widget _buildMetricCard(String title, String value, String growth, Color growthColor) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const SizedBox(height: 4),
          Text(title, style: const TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.w500)),
          const SizedBox(height: 4),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900)),
              const SizedBox(width: 4),
              Text(growth, style: TextStyle(color: growthColor, fontSize: 10, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTopQrCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AppColors.lightGrey)),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8), border: Border.all(color: AppColors.lightGrey)),
            child: Image.network('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SummerPromo2024'),
          ),
          const SizedBox(width: 12),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Top QR', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
              Text('Summer Promo', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            ],
          ),
        ],
      ),
    );
  }

  // Fixing the GridView issue by using a Column for metrics instead
  Widget _buildKeyMetricsColumn() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(child: _buildMetricCard('Total Scans', '12,840', '+12%', Colors.green)),
              const SizedBox(width: 12),
              Expanded(child: _buildMetricCard('Unique Users', '8,201', '+8%', Colors.green)),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AppColors.lightGrey)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Top Performing QR', style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.w500)),
                    SizedBox(height: 4),
                    Text('Summer Promo 2024', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  ],
                ),
                Container(
                  width: 44,
                  height: 44,
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8), border: Border.all(color: AppColors.lightGrey)),
                  child: Image.network('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SummerPromo2024'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildScanTrendsChart() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: AppColors.lightGrey)),
        child: Column(
          children: [
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    CircleAvatar(radius: 4, backgroundColor: AppColors.primary),
                    SizedBox(width: 8),
                    Text('Scan Trends', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  ],
                ),
                Text('HOURLY AVG: 53.5', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
              ],
            ),
            const SizedBox(height: 32),
            SizedBox(
              height: 140,
              width: double.infinity,
              child: CustomPaint(painter: LineChartPainter()),
            ),
            const SizedBox(height: 16),
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Mon', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
                Text('Wed', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
                Text('Fri', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
                Text('Sun', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildGeographicDistribution() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: AppColors.lightGrey)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Geographic Distribution', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 24),
            Row(
              children: [
                SizedBox(
                  width: 110,
                  height: 110,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      const Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('12', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            Text('REGIONS', style: TextStyle(color: Colors.grey, fontSize: 8, fontWeight: FontWeight.w900)),
                          ],
                        ),
                      ),
                      CustomPaint(size: const Size(110, 110), painter: SimplePiePainter()),
                    ],
                  ),
                ),
                const SizedBox(width: 32),
                Expanded(
                  child: Column(
                    children: [
                      _buildDistributionItem('United States', '45%', AppColors.primary),
                      const SizedBox(height: 12),
                      _buildDistributionItem('United Kingdom', '20%', AppColors.primary.withOpacity(0.1)),
                      const SizedBox(height: 12),
                      _buildDistributionItem('Germany', '15%', AppColors.primary.withOpacity(0.1)),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDistributionItem(String country, String percent, Color color) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(width: 8, height: 8, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
            const SizedBox(width: 12),
            Text(country, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
          ],
        ),
        Text(percent, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
      ],
    );
  }

  Widget _buildRealTimeActivity() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24), border: Border.all(color: AppColors.lightGrey)),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Real-time Activity', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                Container(width: 4, height: 4, decoration: const BoxDecoration(color: Colors.green, shape: BoxShape.circle)),
              ],
            ),
            const SizedBox(height: 12),
            _buildActivityItem('New scan in New York, US', '2 minutes ago • iPhone 15 Pro', Icons.location_on_rounded),
            const Divider(height: 24, color: AppColors.lightGrey),
            _buildActivityLink('View Full Map Scans', 'See geographic heat map', Icons.map_rounded),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(String title, String subtitle, IconData icon) {
    return Row(
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: const BoxDecoration(color: AppColors.background, shape: BoxShape.circle),
          child: const Icon(Icons.qr_code_2_rounded, color: AppColors.primary, size: 20),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 2),
              Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
        const Icon(Icons.chevron_right_rounded, color: Colors.grey, size: 20),
      ],
    );
  }

  Widget _buildActivityLink(String title, String subtitle, IconData icon) {
    return Row(
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), shape: BoxShape.circle),
          child: Icon(icon, color: AppColors.primary, size: 20),
        ),
        const SizedBox(width: 16),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primary)),
            const SizedBox(height: 2),
            Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w500)),
          ],
        ),
      ],
    );
  }

}

class LineChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path();
    path.moveTo(0, size.height * 0.8);
    path.quadraticBezierTo(size.width * 0.1, size.height * 0.7, size.width * 0.2, size.height * 0.4);
    path.quadraticBezierTo(size.width * 0.3, size.height * 0.2, size.width * 0.4, size.height * 0.3);
    path.quadraticBezierTo(size.width * 0.5, size.height * 0.4, size.width * 0.6, size.height * 0.5);
    path.quadraticBezierTo(size.width * 0.7, size.height * 0.6, size.width * 0.8, size.height * 0.2);
    path.quadraticBezierTo(size.width * 0.9, size.height * 0.1, size.width, size.height * 0.3);

    final fillPath = Path.from(path);
    fillPath.lineTo(size.width, size.height);
    fillPath.lineTo(0, size.height);
    fillPath.close();

    final gradient = LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [AppColors.primary.withOpacity(0.1), AppColors.primary.withOpacity(0.1)],
    );

    canvas.drawPath(fillPath, Paint()..shader = gradient.createShader(Rect.fromLTWH(0, 0, size.width, size.height)));
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class SimplePiePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 10;

    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 5;

    // Background
    paint.color = AppColors.lightGrey;
    canvas.drawCircle(center, radius, paint);

    // US (45%)
    paint.color = AppColors.primary;
    canvas.drawArc(Rect.fromCircle(center: center, radius: radius), -math.pi / 2, 2 * math.pi * 0.45, false, paint);

    // UK (20%)
    paint.color = AppColors.primary.withOpacity(0.1);
    canvas.drawArc(Rect.fromCircle(center: center, radius: radius), -math.pi / 2 + 2 * math.pi * 0.45, 2 * math.pi * 0.2, false, paint);

    // Germany (15%)
    paint.color = AppColors.primary.withOpacity(0.1);
    canvas.drawArc(Rect.fromCircle(center: center, radius: radius), -math.pi / 2 + 2 * math.pi * 0.65, 2 * math.pi * 0.15, false, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
