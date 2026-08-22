import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class QrActivityMonitorScreen extends StatelessWidget {
  const QrActivityMonitorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.1),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          children: [
            const Text('QR Monitor', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
            Text('Nobevra ADMIN', style: TextStyle(color: Colors.grey.withOpacity(0.1), fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.2)),
          ],
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.search_rounded, color: Colors.grey),
            onPressed: () {},
          ),
          const Padding(
            padding: EdgeInsets.only(right: 8),
            child: CircleAvatar(
              radius: 18,
              backgroundColor: AppColors.primary,
              child: Icon(Icons.sync_rounded, color: Colors.white, size: 20),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            _buildMetricsGrid(),
            const SizedBox(height: 24),
            _buildViralSection(),
            const SizedBox(height: 24),
            _buildFlaggedSection(),
            const SizedBox(height: 24),
            _buildRecentActivitySection(),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildMetricsGrid() {
    return Row(
      children: [
        Expanded(child: _buildMetricCard('Total Scans', '1.2M', '+12%', Colors.green)),
        const SizedBox(width: 12),
        Expanded(child: _buildMetricCard('Active QRs', '45.2K', '+5%', Colors.green)),
        const SizedBox(width: 12),
        Expanded(child: _buildMetricCard('Alerts', '12', 'Action Req.', Colors.redAccent, isAlert: true)),
      ],
    );
  }

  Widget _buildMetricCard(String title, String value, String change, Color changeColor, {bool isAlert = false}) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isAlert ? changeColor.withOpacity(0.1) : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isAlert ? changeColor.withOpacity(0.1) : AppColors.lightGrey),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title.toUpperCase(), style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
          const SizedBox(height: 4),
          Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: isAlert ? changeColor : Colors.black)),
          const SizedBox(height: 2),
          Text(change, style: TextStyle(color: changeColor, fontSize: 10, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildViralSection() {
    return Column(
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Top Viral QRs', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('View All', style: TextStyle(color: AppColors.primary, fontSize: 12, fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 16),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildViralCard('Summer Campaign', 'Retail / Global', '12.4K', '+45%'),
              const SizedBox(width: 16),
              _buildViralCard('Promo Batch A', 'Events / US', '8.9K', '+28%'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildViralCard(String title, String category, String count, String growth) {
    return Container(
      width: 280,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  Text(category, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: Colors.green.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                child: Text(growth, style: const TextStyle(color: Colors.green, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(count, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900)),
              const SizedBox(width: 8),
              const Padding(
                padding: EdgeInsets.only(bottom: 6),
                child: Text('scans/24h', style: TextStyle(color: Colors.grey, fontSize: 12)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 40,
            width: double.infinity,
            child: CustomPaint(painter: _MiniChartPainter(AppColors.primary)),
          ),
        ],
      ),
    );
  }

  Widget _buildFlaggedSection() {
    return Column(
      children: [
        Row(
          children: [
            const Icon(Icons.warning_amber_rounded, color: Colors.redAccent, size: 20),
            const SizedBox(width: 8),
            const Text('Flagged Content', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const Spacer(),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(color: Colors.redAccent, borderRadius: BorderRadius.circular(8)),
              child: const Text('3 Critical', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.redAccent.withOpacity(0.1),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.redAccent.withOpacity(0.1)),
          ),
          child: Row(
            children: [
              Container(
                width: 56,
                height: 56,
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.redAccent.withOpacity(0.1))),
                child: Image.network('https://lh3.googleusercontent.com/aida-public/AB6AXuDUY-M9h1KwKO83VH-xsxcdZU93dFpPL2ppyRS8ohrIJF11CT0xe_yjJTN2O3rLIBFKRzfnzA_oXsixd2qt0k4gyg0qpf-w7qCaulL6MzoP-WF7KQw5toKqhWnSj1w0ztxYFGCCDDXTlTJ5h2fYup1_304GF-jg5eSiX7IZ_BZG6zb8GzOr1ZmDbiT4ScEEaxl1-hCsBg1sXS_lH19ThdvqEjH9Lq7qdOzTpWRd04xRPwph8lHqAQEgC4-qlJkXkkMOTf1zoSUOPag', color: Colors.redAccent),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Malicious Redirect', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    const Text('ID: QR-99281 • 45 reports', style: TextStyle(color: Colors.grey, fontSize: 11)),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _buildSmallButton('Disable', Colors.redAccent, Colors.white),
                        const SizedBox(width: 8),
                        _buildSmallButton('Review', Colors.white, Colors.black, hasBorder: true),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSmallButton(String label, Color bg, Color text, {bool hasBorder = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
        border: hasBorder ? Border.all(color: AppColors.lightGrey) : null,
      ),
      child: Text(label.toUpperCase(), style: TextStyle(color: text, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
    );
  }

  Widget _buildRecentActivitySection() {
    return Column(
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Recent QR Activity', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Icon(Icons.filter_list_rounded, color: Colors.grey),
          ],
        ),
        const SizedBox(height: 16),
        _buildActivityItem('Menu_Spring_v2.pdf', '2m ago', 'user_882'),
        _buildActivityItem('Discount_Code_50OFF', '12m ago', 'marketing_lead'),
        _buildActivityItem('Wifi_Guest_Access', '1h ago', 'facility_mgr'),
        const SizedBox(height: 12),
        SizedBox(
          width: double.infinity,
          child: TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(
              backgroundColor: AppColors.primary.withOpacity(0.1),
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text('Load More Activity', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
          ),
        ),
      ],
    );
  }

  Widget _buildActivityItem(String name, String time, String user) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(10)),
            child: Image.network('https://lh3.googleusercontent.com/aida-public/AB6AXuD8AfoCGdWkodAGSEomHZkEbotmWuKU2weqUyh8Q7_b-Domob-580apco3dppt5rHhP77n1oXP49XYHDYw8tU3zw1ds9RgLlM52LgtqmXmwNseXBUCN6ZcTAf1IO8R-uKlLvg9w_4PX7ueXvpliadW27wdlxSev6u3Ka4uDUgI9dQFhHDf7Y0HvOvaT_JEsuCWjX98k3VJWGPM-Ju_Dm2BQh_l06FwdzyUq4bJmVeHxx7EwsXcKwED_hNT9DwN5zTPZfE4KgXDB2tU', color: Colors.grey.withOpacity(0.1)),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    Text(time, style: const TextStyle(color: Colors.grey, fontSize: 11)),
                  ],
                ),
                Text.rich(
                  TextSpan(
                    text: 'Created by: ',
                    style: const TextStyle(color: Colors.grey, fontSize: 11),
                    children: [
                      TextSpan(text: user, style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Row(
            children: [
              _buildIconButton(Icons.visibility_rounded, Colors.grey),
              const SizedBox(width: 4),
              _buildIconButton(Icons.block_rounded, Colors.redAccent),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildIconButton(IconData icon, Color color) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(8)),
      child: Icon(icon, size: 18, color: color),
    );
  }
}

class _MiniChartPainter extends CustomPainter {
  final Color color;
  _MiniChartPainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path()
      ..moveTo(0, size.height * 0.8)
      ..quadraticBezierTo(size.width * 0.25, size.height * 0.7, size.width * 0.5, size.height * 0.4)
      ..quadraticBezierTo(size.width * 0.75, size.height * 0.2, size.width, size.height * 0.1);

    canvas.drawPath(path, paint);

    final fillPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [color.withOpacity(0.1), color.withOpacity(0.1)],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    final fillPath = Path.from(path)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();

    canvas.drawPath(fillPath, fillPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
