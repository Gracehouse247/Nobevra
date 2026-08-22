import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/admin/controllers/admin_controller.dart';
import 'package:noble_invoice/core/utils/currency_formatter.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<AdminController>().loadStats();
    });
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<AdminController>();
    final stats = controller.stats;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: CircleAvatar(
          backgroundColor: AppColors.primary.withOpacity(0.1),
          radius: 18,
          child: const Icon(Icons.person_rounded, color: AppColors.primary, size: 20),
        ),
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Nobevra Admin', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 16)),
            Text('PLATFORM SCALING PANEL', style: TextStyle(color: Colors.grey, fontSize: 8, fontWeight: FontWeight.w900, letterSpacing: 1.0)),
          ],
        ),
        actions: [
          _buildActionIcon(Icons.notifications_none_rounded),
          _buildActionIcon(Icons.settings_outlined),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildLiveStatus(controller),
            const SizedBox(height: 24),
            _buildKPIGrid(stats),
            const SizedBox(height: 32),
            _buildPlatformControl(context),
            const SizedBox(height: 32),
            _buildFintechOps(stats),
            const SizedBox(height: 32),
            _buildGrowthChart(),
            const SizedBox(height: 32),
            _buildSystemFeed(context),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildActionIcon(IconData icon) {
    return Container(
      margin: const EdgeInsets.only(left: 12),
      decoration: BoxDecoration(color: Colors.white, shape: BoxShape.circle, border: Border.all(color: AppColors.lightGrey.withOpacity(0.5))),
      child: IconButton(
        icon: Icon(icon, color: Colors.grey.shade600, size: 20),
        onPressed: () {},
      ),
    );
  }

  Widget _buildLiveStatus(AdminController controller) {
    return Row(
      children: [
        Container(width: 8, height: 8, decoration: BoxDecoration(color: controller.isLoading ? Colors.orange : const Color(0xFF10B981), shape: BoxShape.circle)),
        const SizedBox(width: 8),
        Text(controller.isLoading ? 'SYNCING DATA...' : 'LIVE SYSTEM HEALTH', style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.0)),
        const Spacer(),
        Text('Last updated: Just now', style: TextStyle(color: Colors.grey.shade400, fontSize: 10)),
      ],
    );
  }

  Widget _buildKPIGrid(PlatformStats? stats) {
    final volume = stats?.totalVolume ?? 0;
    final formattedVolume = CurrencyFormatter.format(context, volume, compact: true);
    final formattedRevenue = CurrencyFormatter.format(context, stats?.platformRevenue ?? 0, compact: true);

    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      crossAxisSpacing: 16,
      mainAxisSpacing: 16,
      childAspectRatio: 1.2,
      children: [
        _buildKPICard('Active Merchants', stats?.merchantCount.toString() ?? '...', '+5%', Icons.store_rounded, Colors.blue),
        _buildKPICard('Total Volume', formattedVolume, '+12%', Icons.account_balance_wallet_rounded, const Color(0xFF10B981)),
        _buildKPICard('Platform Cut', formattedRevenue, '1%', Icons.token_rounded, Colors.purple),
        _buildKPICard('Invoices Issued', stats?.invoiceCount.toString() ?? '...', 'LIVE', Icons.description_rounded, AppColors.primary),
      ],
    );
  }

  Widget _buildKPICard(String title, String value, String trend, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: color, size: 20),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
                child: Text(trend, style: TextStyle(color: color, fontSize: 8, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const Spacer(),
          Text(title, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildGrowthChart() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Daily User Growth', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  Text('Performance over last 7 days', style: TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('+5%', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 16)),
                  Text('AVG TREND', style: TextStyle(color: Colors.grey, fontSize: 8, fontWeight: FontWeight.w900)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 32),
          SizedBox(
            height: 120,
            width: double.infinity,
            child: CustomPaint(painter: _ChartPainter()),
          ),
          const SizedBox(height: 16),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('MON', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text('TUE', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text('WED', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text('THU', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text('FRI', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text('SAT', style: TextStyle(color: AppColors.primary, fontSize: 9, fontWeight: FontWeight.bold)),
              Text('SUN', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSystemFeed(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('LIVE SYSTEM FEED', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.0)),
            TextButton(
              onPressed: () => Navigator.pushNamed(context, AppRoutes.systemLogs),
              child: const Text('View Logs', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 13)),
            ),
          ],
        ),
        const SizedBox(height: 8),
        _buildLogItem('New merchant onboarded: Global Mart v2', 'Just now • ID: #TR-9022', AppColors.primary),
        const SizedBox(height: 12),
        _buildLogItem('API Spike detected in Region-US-East', '4 mins ago • Auto-scaling initiated', Colors.orange),
        const SizedBox(height: 12),
        _buildLogItem('Payout successfully processed: \$12,400.00', '12 mins ago • Batch #8812', const Color(0xFF10B981)),
      ],
    );
  }

  Widget _buildFintechOps(PlatformStats? stats) {
    final revenue = stats?.platformRevenue ?? 0;
    final formattedRevenue = CurrencyFormatter.format(context, revenue);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('FINTECH OPERATIONS', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.0)),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [Color(0xFF1E293B), Color(0xFF0F172A)]),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('PLATFORM REVENUE', style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
                    const SizedBox(height: 8),
                    Text(formattedRevenue, style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    Text('Across ${stats?.invoiceCount ?? 0}+ invoices', style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 11)),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
                child: const Icon(Icons.show_chart_rounded, color: Colors.greenAccent, size: 32),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPlatformControl(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('PLATFORM CONTROL', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.0)),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildOperationCard(
                context,
                'Content Moderation',
                'Review flagged QR content',
                Icons.gavel_rounded,
                Colors.orange,
                AppRoutes.contentModeration,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: _buildOperationCard(
                context,
                'Business Reports',
                'Generate PDF/CSV analytics',
                Icons.analytics_rounded,
                Colors.blue,
                AppRoutes.businessReports,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildOperationCard(BuildContext context, String title, String subtitle, IconData icon, Color color, String route) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, route),
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(height: 16),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 4),
            Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 10, height: 1.2)),
          ],
        ),
      ),
    );
  }

  Widget _buildLogItem(String title, String subtitle, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(margin: const EdgeInsets.only(top: 4), width: 8, height: 8, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, height: 1.3)),
                const SizedBox(height: 4),
                Text(subtitle, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w500)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.primary
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;

    final path = Path();
    path.moveTo(0, size.height * 0.8);
    path.quadraticBezierTo(size.width * 0.1, size.height * 0.8, size.width * 0.2, size.height * 0.3);
    path.quadraticBezierTo(size.width * 0.3, size.height * 0.4, size.width * 0.4, size.height * 0.7);
    path.quadraticBezierTo(size.width * 0.5, size.height * 0.8, size.width * 0.6, size.height * 0.4);
    path.quadraticBezierTo(size.width * 0.7, size.height * 0.4, size.width * 0.8, size.height * 0.2);
    path.quadraticBezierTo(size.width * 0.9, size.height * 0.2, size.width, size.height * 0.1);

    canvas.drawPath(path, paint);

    final fillPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [AppColors.primary.withOpacity(0.2), AppColors.primary.withOpacity(0)],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    final fillPath = Path.from(path);
    fillPath.lineTo(size.width, size.height);
    fillPath.lineTo(0, size.height);
    fillPath.close();

    canvas.drawPath(fillPath, fillPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
