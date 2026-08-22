import 'dart:math' as math;
import 'package:flutter/material.dart';

class OnboardingPage1 extends StatefulWidget {
  const OnboardingPage1({super.key});

  @override
  State<OnboardingPage1> createState() => _OnboardingPage1State();
}

class _OnboardingPage1State extends State<OnboardingPage1>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _orbitController;
  late AnimationController _floatController;

  @override
  void initState() {
    super.initState();

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);

    _orbitController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 20),
    )..repeat();

    _floatController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _orbitController.dispose();
    _floatController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const SizedBox(height: 16),
          _buildHeroCard(),
          const SizedBox(height: 32),
          _buildText(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildHeroCard() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 0),
      child: AspectRatio(
        aspectRatio: 1.0,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(28),
          child: Container(
            color: const Color(0xFF013948),
            child: Stack(
              children: [
                // Radial glow background
                Positioned.fill(
                  child: Container(
                    decoration: const BoxDecoration(
                      gradient: RadialGradient(
                        center: Alignment.center,
                        radius: 0.7,
                        colors: [
                          Color(0x6601A0E2),
                          Color(0x00013948),
                        ],
                      ),
                    ),
                  ),
                ),

                // Dot-grid overlay
                Positioned.fill(
                  child: CustomPaint(painter: _DotGridPainter()),
                ),

                // Orbiting dashed circles
                Positioned.fill(
                  child: AnimatedBuilder(
                    animation: _orbitController,
                    builder: (_, __) => CustomPaint(
                      painter: _OrbitPainter(_orbitController.value),
                    ),
                  ),
                ),

                // Floating glass: Invoice fragment (top-left)
                _buildFloatingFragment(
                  top: 0.12,
                  left: 0.06,
                  delay: 0.0,
                  child: _buildInvoiceFragment(),
                ),

                // Floating glass: Data chart (top-right)
                _buildFloatingFragment(
                  top: 0.20,
                  right: 0.10,
                  delay: 0.3,
                  reverseDir: true,
                  child: _buildChartFragment(),
                ),

                // Floating glass: Expense (bottom-right)
                _buildFloatingFragment(
                  bottom: 0.15,
                  right: 0.06,
                  delay: 0.6,
                  child: _buildExpenseFragment(),
                ),

                // Central animated node
                Center(
                  child: AnimatedBuilder(
                    animation: _pulseController,
                    builder: (_, __) {
                      final scale = 1.0 + (_pulseController.value * 0.05);
                      return Transform.scale(
                        scale: scale,
                        child: _buildCentralNode(),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFloatingFragment({
    double? top,
    double? bottom,
    double? left,
    double? right,
    required Widget child,
    double delay = 0.0,
    bool reverseDir = false,
  }) {
    return AnimatedBuilder(
      animation: _floatController,
      builder: (context, _) {
        final size = MediaQuery.of(context).size.width - 40;
        double animValue = _floatController.value;
        // Stagger with delay
        animValue = ((animValue + delay) % 1.0);
        final offsetY = math.sin(animValue * math.pi * 2) * 10.0;
        final effectiveOffset = reverseDir ? -offsetY : offsetY;

        double? topPx = top != null ? top * size : null;
        double? bottomPx = bottom != null ? bottom * size : null;
        double? leftPx = left != null ? left * size : null;
        double? rightPx = right != null ? right * size : null;

        return Positioned(
          top: topPx,
          bottom: bottomPx,
          left: leftPx,
          right: rightPx,
          child: Transform.translate(
            offset: Offset(0, effectiveOffset),
            child: child,
          ),
        );
      },
    );
  }

  Widget _buildInvoiceFragment() {
    return _GlassCard(
      width: 110,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                width: 14,
                height: 14,
                decoration: const BoxDecoration(
                  color: Color(0xBB00C7F2),
                  shape: BoxShape.circle,
                ),
              ),
              Container(height: 4, width: 40, decoration: BoxDecoration(color: Colors.white38, borderRadius: BorderRadius.circular(8))),
            ],
          ),
          const SizedBox(height: 8),
          Container(height: 4, decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(8))),
          const SizedBox(height: 4),
          Container(height: 4, width: 60, decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(8))),
        ],
      ),
    );
  }

  Widget _buildChartFragment() {
    return _GlassCard(
      width: 80,
      child: Column(
        children: [
          const Icon(Icons.bar_chart_rounded, color: Color(0xFF00C7F2), size: 20),
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              _Bar(height: 8, color: Colors.white38),
              const SizedBox(width: 3),
              _Bar(height: 16, color: const Color(0xFF00C7F2)),
              const SizedBox(width: 3),
              _Bar(height: 12, color: Colors.white60),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildExpenseFragment() {
    return _GlassCard(
      width: 120,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.receipt_long, color: Color(0xFF01779D), size: 14),
              const SizedBox(width: 6),
              Container(height: 4, width: 40, decoration: BoxDecoration(color: Colors.white38, borderRadius: BorderRadius.circular(8))),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(height: 4, width: 36, decoration: BoxDecoration(color: Colors.white24, borderRadius: BorderRadius.circular(8))),
              const Text('\$420', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: -0.5)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCentralNode() {
    return SizedBox(
      width: 80,
      height: 80,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Glow
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF01A0E2).withOpacity(0.5),
                  blurRadius: 30,
                  spreadRadius: 4,
                ),
              ],
            ),
          ),
          // Diamond shape via Transform.rotate
          Transform.rotate(
            angle: math.pi / 4,
            child: Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFF01A0E2), Color(0xFF01779D)],
                ),
                border: Border.all(color: Colors.white24, width: 1),
              ),
            ),
          ),
          // Inner white square (un-rotated)
          Transform.rotate(
            angle: 0,
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.white, width: 2),
              ),
              child: Center(
                child: Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildText() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            'Run Your Business,\nYour Way.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: Color(0xFF013948),
              height: 1.25,
              letterSpacing: -0.01 * 24,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            'Create invoices, manage expenses, track products and keep your everyday operations organized — all from one intelligent platform.',
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
}

// ── Supporting widgets ──────────────────────────────────────────────────────

class _GlassCard extends StatelessWidget {
  final Widget child;
  final double width;
  const _GlassCard({required this.child, required this.width});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.2)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.15),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: child,
    );
  }
}

class _Bar extends StatelessWidget {
  final double height;
  final Color color;
  const _Bar({required this.height, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 7,
      height: height,
      decoration: BoxDecoration(
        color: color,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
      ),
    );
  }
}

// Dot grid painter
class _DotGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.08)
      ..strokeWidth = 1.5
      ..style = PaintingStyle.fill;

    const spacing = 20.0;
    const radius = 1.0;
    for (double x = 0; x < size.width; x += spacing) {
      for (double y = 0; y < size.height; y += spacing) {
        canvas.drawCircle(Offset(x, y), radius, paint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// Orbiting dashed circles painter
class _OrbitPainter extends CustomPainter {
  final double progress;
  _OrbitPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;

    // Inner orbit
    _drawDashedCircle(canvas, cx, cy, size.width * 0.3,
        const Color(0x4D01A0E2), progress);

    // Outer orbit (reverse)
    _drawDashedCircle(canvas, cx, cy, size.width * 0.4,
        const Color(0x3300C7F2), -progress * 0.7,
        strokeWidth: 0.5);
  }

  void _drawDashedCircle(Canvas canvas, double cx, double cy, double radius,
      Color color, double rotationProgress,
      {double strokeWidth = 1.0}) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke;

    const dashCount = 24;
    const dashAngle = (2 * math.pi) / dashCount;
    const gapFraction = 0.4;
    final rotation = rotationProgress * 2 * math.pi;

    for (int i = 0; i < dashCount; i++) {
      final startAngle = (i * dashAngle) + rotation;
      final sweepAngle = dashAngle * (1 - gapFraction);
      canvas.drawArc(
        Rect.fromCircle(center: Offset(cx, cy), radius: radius),
        startAngle,
        sweepAngle,
        false,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(_OrbitPainter old) => old.progress != progress;
}
