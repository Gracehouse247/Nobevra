import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class OnboardingPage3 extends StatefulWidget {
  const OnboardingPage3({super.key});

  @override
  State<OnboardingPage3> createState() => _OnboardingPage3State();
}

class _OnboardingPage3State extends State<OnboardingPage3>
    with TickerProviderStateMixin {
  late AnimationController _particleController;
  late AnimationController _waveController;
  late AnimationController _nodePulseController;

  final List<_Particle> _particles = [];
  final math.Random _rng = math.Random();

  @override
  void initState() {
    super.initState();

    // Generate particles
    for (int i = 0; i < 14; i++) {
      _particles.add(_Particle(
        startX: 0.2 + _rng.nextDouble() * 0.6,
        startY: 0.75 + _rng.nextDouble() * 0.2,
        size: 2.0 + _rng.nextDouble() * 3.0,
        delay: _rng.nextDouble(),
        isCircle: _rng.nextBool(),
      ));
    }

    _particleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat();

    _waveController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    )..repeat();

    _nodePulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _particleController.dispose();
    _waveController.dispose();
    _nodePulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          _buildVisualCard(),
          const SizedBox(height: 28),
          _buildTextSection(),
          const SizedBox(height: 24),
          _buildCTAButtons(context),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildVisualCard() {
    return AspectRatio(
      aspectRatio: 1.0,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Container(
          color: const Color(0xFF00324B),
          child: AnimatedBuilder(
            animation: Listenable.merge([
              _particleController,
              _waveController,
              _nodePulseController,
            ]),
            builder: (_, __) {
              return CustomPaint(
                painter: _GrowthVisualPainter(
                  particleProgress: _particleController.value,
                  waveProgress: _waveController.value,
                  nodePulse: _nodePulseController.value,
                  particles: _particles,
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildTextSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Turn Business Activity\nInto Growth.',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: Color(0xFF191C1D),
              height: 1.25,
              letterSpacing: -0.24,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            'Use AI-powered insights, financial intelligence and connected data to make smarter decisions and grow with confidence.',
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

  Widget _buildCTAButtons(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        children: [
          // Get Started
          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton.icon(
              onPressed: () => Navigator.pushReplacementNamed(
                  context, AppRoutes.onboardingManager),
              icon: const Icon(Icons.arrow_forward_rounded,
                  color: Colors.white, size: 20),
              label: const Text(
                'Get Started',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF013948),
                foregroundColor: Colors.white,
                elevation: 3,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          // Log In
          SizedBox(
            width: double.infinity,
            height: 52,
            child: TextButton(
              onPressed: () =>
                  Navigator.pushReplacementNamed(context, AppRoutes.login),
              style: TextButton.styleFrom(
                foregroundColor: const Color(0xFF006590),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text(
                'Log In',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF006590),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Particle data ────────────────────────────────────────────────────────────
class _Particle {
  final double startX;
  final double startY;
  final double size;
  final double delay;
  final bool isCircle;

  const _Particle({
    required this.startX,
    required this.startY,
    required this.size,
    required this.delay,
    required this.isCircle,
  });
}

// ── Custom painter for the growth animation ──────────────────────────────────
class _GrowthVisualPainter extends CustomPainter {
  final double particleProgress;
  final double waveProgress;
  final double nodePulse;
  final List<_Particle> particles;

  _GrowthVisualPainter({
    required this.particleProgress,
    required this.waveProgress,
    required this.nodePulse,
    required this.particles,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final cx = size.width / 2;
    final cy = size.height / 2;

    // ── Network geometry background lines ──
    final bgPaint = Paint()
      ..color = Colors.white.withOpacity(0.06)
      ..strokeWidth = 0.8
      ..style = PaintingStyle.stroke;

    // Cross-diagonal lines
    canvas.drawLine(Offset(0, size.height * 0.2), Offset(size.width, size.height * 0.8), bgPaint);
    canvas.drawLine(Offset(0, size.height * 0.5), Offset(size.width, size.height * 0.5), bgPaint);
    canvas.drawLine(Offset(0, size.height * 0.8), Offset(size.width, size.height * 0.2), bgPaint);
    canvas.drawLine(Offset(size.width * 0.3, 0), Offset(size.width * 0.7, size.height), bgPaint);
    canvas.drawLine(Offset(size.width * 0.7, 0), Offset(size.width * 0.3, size.height), bgPaint);

    // Outer circle
    canvas.drawCircle(Offset(cx, cy), size.width * 0.3, bgPaint);
    canvas.drawCircle(Offset(cx, cy), size.width * 0.15, bgPaint);

    // ── Particles flowing up to center node ──
    for (final particle in particles) {
      // Adjust progress with delay (0.0 → 1.0 over 4 seconds, looped)
      final p = ((particleProgress - particle.delay * 0.3) % 1.0 + 1.0) % 1.0;

      // Phase 1 (0..0.4): particles visible, moving toward center
      // Phase 2 (0.4..0.6): fade out near node
      // Phase 3 (0.6..1.0): invisible, reset to start
      double opacity;
      Offset position;

      if (p < 0.4) {
        final t = p / 0.4;
        opacity = 0.6;
        final startX = particle.startX * size.width;
        final startY = particle.startY * size.height;
        position = Offset(
          startX + (cx - startX) * t,
          startY + (cy - startY) * t,
        );
      } else if (p < 0.6) {
        final t = (p - 0.4) / 0.2;
        opacity = 0.6 * (1.0 - t);
        position = Offset(
          particle.startX * size.width + (cx - particle.startX * size.width) * 1.0,
          particle.startY * size.height + (cy - particle.startY * size.height) * 1.0,
        );
      } else {
        opacity = 0.0;
        position = Offset(particle.startX * size.width, particle.startY * size.height);
      }

      if (opacity <= 0) continue;

      final particlePaint = Paint()
        ..color = const Color(0xFF7DD1FB).withOpacity(opacity)
        ..style = PaintingStyle.fill;

      if (particle.isCircle) {
        canvas.drawCircle(position, particle.size, particlePaint);
      } else {
        canvas.drawRect(
          Rect.fromCenter(center: position, width: particle.size * 2.5, height: particle.size * 0.6),
          particlePaint,
        );
      }
    }

    // ── Growth waves (radiate out from center when node pulses) ──
    final waveP = waveProgress;
    if (waveP > 0.375) {
      // Wave 1
      _drawWave(canvas, cx, cy, size, (waveP - 0.375) / 0.625, 0.8);
    }
    if (waveP > 0.45) {
      _drawWave(canvas, cx, cy, size, (waveP - 0.45) / 0.55, 0.5);
    }
    if (waveP > 0.525) {
      _drawWave(canvas, cx, cy, size, (waveP - 0.525) / 0.475, 0.35);
    }

    // ── Intelligence node (diamond shape) ──
    final nodeScale = 1.0 + nodePulse * 0.05;
    final nodePaint = Paint()
      ..color = const Color(0xFF01A0E2)
      ..style = PaintingStyle.fill;

    canvas.save();
    canvas.translate(cx, cy);
    canvas.scale(nodeScale);

    // Outer diamond
    final diamondPath = Path()
      ..moveTo(0, -25)
      ..lineTo(20, 0)
      ..lineTo(0, 25)
      ..lineTo(-20, 0)
      ..close();
    canvas.drawPath(diamondPath, nodePaint);

    // Inner white diamond
    final innerPaint = Paint()
      ..color = Colors.white.withOpacity(0.9)
      ..style = PaintingStyle.fill;
    final innerPath = Path()
      ..moveTo(0, -15)
      ..lineTo(12, 0)
      ..lineTo(0, 15)
      ..lineTo(-12, 0)
      ..close();
    canvas.drawPath(innerPath, innerPaint);

    // Center dot
    canvas.drawCircle(Offset.zero, 4, nodePaint);

    canvas.restore();

    // ── Gradient overlay: dark at bottom for depth ──
    final gradientPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          Colors.transparent,
          const Color(0xFF00324B).withOpacity(0.8),
        ],
        stops: const [0.4, 1.0],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), gradientPaint);
  }

  void _drawWave(Canvas canvas, double cx, double cy, Size size, double t, double maxOpacity) {
    final opacity = (math.sin(t * math.pi) * maxOpacity).clamp(0.0, 1.0);
    if (opacity <= 0) return;

    final wavePaint = Paint()
      ..color = const Color(0xFFC8E6FF).withOpacity(opacity)
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    // Wave 1: top-right arc
    final path1 = Path()
      ..moveTo(cx, cy - 10 + t * -50)
      ..quadraticBezierTo(
        cx + 30 + t * 60, cy - 30 - t * 40,
        cx + 60 + t * 110, cy - 40 - t * 60,
      );
    canvas.drawPath(path1, wavePaint..strokeWidth = 1.5);

    // Wave 2: top-left arc
    final path2 = Path()
      ..moveTo(cx, cy - 10 + t * -50)
      ..quadraticBezierTo(
        cx - 30 - t * 40, cy - 30 - t * 20,
        cx - 80 - t * 80, cy - 40 - t * 60,
      );
    canvas.drawPath(path2, wavePaint..strokeWidth = 1.0);

    // Wave 3: right arc
    final path3 = Path()
      ..moveTo(cx, cy - 10 + t * -30)
      ..quadraticBezierTo(
        cx + 50 + t * 80, cy - 10 - t * 30,
        cx + 90 + t * 110, cy - 20 - t * 30,
      );
    canvas.drawPath(path3, wavePaint..strokeWidth = 0.75);
  }

  @override
  bool shouldRepaint(_GrowthVisualPainter old) =>
      old.particleProgress != particleProgress ||
      old.waveProgress != waveProgress ||
      old.nodePulse != nodePulse;
}
