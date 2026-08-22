import 'dart:math' as math;
import 'package:flutter/material.dart';

class OnboardingPage2 extends StatefulWidget {
  const OnboardingPage2({super.key});

  @override
  State<OnboardingPage2> createState() => _OnboardingPage2State();
}

class _OnboardingPage2State extends State<OnboardingPage2>
    with TickerProviderStateMixin {
  late AnimationController _floatController;
  late AnimationController _pulseController;
  late AnimationController _lineController;

  @override
  void initState() {
    super.initState();

    _floatController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat(reverse: true);

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat();

    _lineController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _floatController.dispose();
    _pulseController.dispose();
    _lineController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const SizedBox(height: 16),
          _buildHeadlineSection(),
          const SizedBox(height: 8),
          _buildEcosystemVisual(context),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildHeadlineSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        children: [
          const Text(
            'Everything Connected.\nNothing Scattered.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 28,
              fontWeight: FontWeight.w700,
              color: Color(0xFF191C1D),
              height: 1.25,
              letterSpacing: -0.01 * 28,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            'Bring customers, payments, products, teams and business relationships together in one connected workspace.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 15,
              fontWeight: FontWeight.w400,
              color: const Color(0xFF3E4850),
              height: 1.55,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEcosystemVisual(BuildContext context) {
    return SizedBox(
      height: 340,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Ambient blobs
          Positioned(
            top: -20,
            left: -30,
            child: Container(
              width: 180,
              height: 180,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0x1501A0E2),
              ),
            ),
          ),
          Positioned(
            bottom: -20,
            right: -30,
            child: Container(
              width: 180,
              height: 180,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0x1501779D),
              ),
            ),
          ),

          // Animated connection lines
          AnimatedBuilder(
            animation: _lineController,
            builder: (_, __) => CustomPaint(
              size: const Size(double.infinity, 340),
              painter: _ConnectionLinesPainter(_lineController.value),
            ),
          ),

          // Center logo
          AnimatedBuilder(
            animation: _pulseController,
            builder: (_, __) {
              return Stack(
                alignment: Alignment.center,
                children: [
                  // Ping ring
                  Opacity(
                    opacity: (1.0 - _pulseController.value) * 0.3,
                    child: Container(
                      width: 96 + (_pulseController.value * 40),
                      height: 96 + (_pulseController.value * 40),
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Color(0x2001A0E2),
                      ),
                    ),
                  ),
                  // Logo container
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: const Color(0xFFE1E3E4),
                      border: Border.all(color: Colors.white, width: 4),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.12),
                          blurRadius: 20,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    padding: const EdgeInsets.all(10),
                    child: Image.asset(
                      'assets/images/nobevra_app_icon.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              );
            },
          ),

          // Floating node chips
          ..._buildFloatingNodes(),
        ],
      ),
    );
  }

  List<Widget> _buildFloatingNodes() {
    final nodes = [
      _NodeData('Customer', Icons.person_rounded, const Color(0xFF006590), -0.5, -1.0, 0.0),
      _NodeData('Team', Icons.group_rounded, const Color(0xFF006687), 0.9, -0.8, 0.5),
      _NodeData('Payment', Icons.payments_rounded, const Color(0xFF386474), -1.1, 0.0, 1.0),
      _NodeData('Product', Icons.inventory_2_rounded, const Color(0xFF006590), 1.1, 0.2, 0.2),
      _NodeData('Identity', Icons.storefront_rounded, const Color(0xFF006687), -0.6, 1.0, 0.8),
      _NodeData('Reminders', Icons.notifications_rounded, const Color(0xFF386474), 0.7, 1.0, 1.2),
    ];

    return nodes.map((node) {
      return AnimatedBuilder(
        animation: _floatController,
        builder: (context, _) {
          final animVal = ((_floatController.value + node.delay * 0.2) % 1.0);
          final offsetY = math.sin(animVal * math.pi * 2) * 8.0;

          const radius = 125.0;
          return Positioned(
            left: 170 + (node.dx * radius) - 45,
            top: 170 + (node.dy * radius) - 16,
            child: Transform.translate(
              offset: Offset(0, offsetY),
              child: _buildChip(node),
            ),
          );
        },
      );
    }).toList();
  }

  Widget _buildChip(_NodeData node) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
      decoration: BoxDecoration(
        color: const Color(0xFFE6E8E9),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE1E3E4)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(node.icon, color: node.color, size: 14),
          const SizedBox(width: 5),
          Text(
            node.label,
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: Color(0xFF191C1D),
              letterSpacing: 0.05 * 10,
            ),
          ),
        ],
      ),
    );
  }
}

class _NodeData {
  final String label;
  final IconData icon;
  final Color color;
  final double dx;
  final double dy;
  final double delay;
  const _NodeData(this.label, this.icon, this.color, this.dx, this.dy, this.delay);
}

class _ConnectionLinesPainter extends CustomPainter {
  final double progress;
  _ConnectionLinesPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = 170.0;
    const radius = 125.0;

    final nodes = [
      Offset(cx + (-0.5 * radius), cy + (-1.0 * radius)),
      Offset(cx + (0.9 * radius), cy + (-0.8 * radius)),
      Offset(cx + (-1.1 * radius), cy + (0.0 * radius)),
      Offset(cx + (1.1 * radius), cy + (0.2 * radius)),
      Offset(cx + (-0.6 * radius), cy + (1.0 * radius)),
      Offset(cx + (0.7 * radius), cy + (1.0 * radius)),
    ];

    final colors = [
      const Color(0xFF006590),
      const Color(0xFF006687),
      const Color(0xFF386474),
      const Color(0xFF006590),
      const Color(0xFF006687),
      const Color(0xFF386474),
    ];

    for (int i = 0; i < nodes.length; i++) {
      final opacity = 0.1 + (math.sin((progress + i * 0.15) * math.pi * 2).abs() * 0.7);
      final strokeWidth = 0.5 + math.sin((progress + i * 0.15) * math.pi * 2).abs() * 1.0;
      _drawDashedLine(canvas, Offset(cx, cy), nodes[i], colors[i].withOpacity(opacity), strokeWidth);
    }
  }

  void _drawDashedLine(Canvas canvas, Offset start, Offset end, Color color, double width) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = width
      ..style = PaintingStyle.stroke;

    const dashLength = 5.0;
    const gapLength = 4.0;
    final totalLength = (end - start).distance;
    final direction = (end - start) / totalLength;
    double drawn = 0.0;

    while (drawn < totalLength) {
      final segStart = start + direction * drawn;
      final segEnd = start + direction * math.min(drawn + dashLength, totalLength);
      canvas.drawLine(segStart, segEnd, paint);
      drawn += dashLength + gapLength;
    }
  }

  @override
  bool shouldRepaint(_ConnectionLinesPainter old) => old.progress != progress;
}
