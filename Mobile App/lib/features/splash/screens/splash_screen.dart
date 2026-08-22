import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/auth/controllers/auth_controller.dart';
import 'package:noble_invoice/features/profile/models/team_model.dart';
import 'package:animate_do/animate_do.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  
  bool _showBiometricRetry = false;
  String? _biometricError;

  @override
  void initState() {
    super.initState();

    // 1. Setup Premium Animations
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );

    // Bouncy elegant scale-in for the 3D logo
    _scaleAnimation = Tween<double>(begin: 0.6, end: 1.0).animate(
      CurvedAnimation(
        parent: _animationController,
        curve: Curves.elasticOut,
      ),
    );

    // Smooth staggered fade-in
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _animationController,
        curve: const Interval(0.2, 1.0, curve: Curves.easeOut),
      ),
    );

    // Subtle slide-up effect for the text
    _slideAnimation = Tween<Offset>(
            begin: const Offset(0.0, 0.4), end: Offset.zero)
        .animate(
      CurvedAnimation(
        parent: _animationController,
        curve: const Interval(0.3, 1.0, curve: Curves.easeOutCubic),
      ),
    );

    // 3. Start Animation and Navigation Process
    _animationController.forward();
    _navigateToNextScreen();
  }

  @override
  void dispose() {
    // Clean up animation on dispose
    _animationController.dispose();
    super.dispose();
  }

  Future<void> _navigateToNextScreen() async {
    // Remove native splash now that Flutter is rendering
    FlutterNativeSplash.remove();

    // 1. LOCAL check first — zero network cost
    final bool hasLocalSession = SupabaseService.isLoggedIn;

    if (!hasLocalSession) {
      await Future.delayed(const Duration(milliseconds: 1200)); // Short branding
      if (mounted) Navigator.pushReplacementNamed(context, AppRoutes.onboarding);
      return;
    }

    // 2. Session exists: load profile in parallel with short animation
    final results = await Future.wait([
      Future.delayed(const Duration(milliseconds: 1000)), // Branding minimum
      context.read<ProfileController>().loadProfile(),    // Background fetch
    ]);

    final activeTeam = results[1] as Team?;
    if (mounted && activeTeam != null) {
      context.read<TeamController>().setActiveTeam(activeTeam);
    }

    if (!mounted) return;

    final profileCtrl = context.read<ProfileController>();
    final authCtrl    = context.read<AuthController>();

    // ── Mandatory Biometric Re-authentication ─────────────────────────────
      if (authCtrl.isBiometricEnabled) {
        final success = await authCtrl.loginWithBiometric();
        if (!success) {
          setState(() {
            _showBiometricRetry = true;
            _biometricError = authCtrl.errorMessage.isNotEmpty 
                ? authCtrl.errorMessage 
                : 'Biometric authentication required to continue.';
          });
          return;
        }
      }

      if (profileCtrl.onboardingCompleted) {
        Navigator.pushReplacementNamed(context, AppRoutes.dashboard);
      } else {
        Navigator.pushReplacementNamed(context, AppRoutes.onboardingManager);
      }
  }

  Future<void> _handleDeepLogout() async {
    await context.read<AuthController>().logout();
    if (mounted) {
      Navigator.pushReplacementNamed(context, AppRoutes.onboarding);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        systemNavigationBarColor: Color(0xFF013948),
        statusBarIconBrightness: Brightness.light,
        statusBarBrightness: Brightness.dark,
        systemNavigationBarIconBrightness: Brightness.light,
      ),
      child: Scaffold(
        backgroundColor: const Color(0xFF013948), // Deep Navy from design
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Stack(
          children: [
            // Animated radial glow (mimics WebGL shader teal orb)
            AnimatedBuilder(
              animation: _animationController,
              builder: (_, __) {
                return Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: RadialGradient(
                        center: Alignment.center,
                        radius: 0.75,
                        colors: [
                          const Color(0xFF01779D).withOpacity(0.35 * _fadeAnimation.value),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            // Dot-grid overlay
            Positioned.fill(
              child: CustomPaint(painter: _SplashDotGridPainter()),
            ),
            // Main content column
            Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Spacer(),
            
            // --- Animated Logo ---
            FadeTransition(
              opacity: _fadeAnimation,
              child: ScaleTransition(
                scale: _scaleAnimation,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Glow behind logo
                    AnimatedBuilder(
                      animation: _fadeAnimation,
                      builder: (_, __) => Container(
                        width: 140,
                        height: 140,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: const Color(0xFF01A0E2)
                              .withOpacity(0.15 * _fadeAnimation.value),
                        ),
                      ),
                    ),
                    Image.asset(
                      'assets/images/nobevra_app_icon.png',
                      width: 120,
                      fit: BoxFit.contain,
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // --- Animated Text & Subtitle ---
            SlideTransition(
              position: _slideAnimation,
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'NOBEVRA',
                      style: Theme.of(context).textTheme.displayLarge?.copyWith(
                            color: AppColors.white,
                            fontWeight: FontWeight.w900, // Very bold
                            fontSize: 38,
                            letterSpacing: 1.5, 
                            height: 1.0,
                          ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'The Intelligent Business Operating System',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: AppColors.white,
                            fontWeight: FontWeight.w400,
                            fontSize: 16,
                            letterSpacing: 0.5,
                          ),
                    ),
                  ],
                ),
              ),
            ),
            
            const Spacer(),
            
            // --- Bottom UI (Tagline or Biometric Retry) ---
            Padding(
              padding: const EdgeInsets.only(bottom: 40.0),
              child: _showBiometricRetry ? _buildBiometricControls() : _buildTagline(),
            ),
          ],
        ),
      ],
    ),
  ),
));
  }

  Widget _buildTagline() {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Text(
        'THE NOBLE\'S TECHNOLOGY SERVICES',
        style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: AppColors.white,
              fontWeight: FontWeight.w500,
              fontSize: 13,
              letterSpacing: 1.5,
            ),
        textAlign: TextAlign.center,
      ),
    );
  }

  Widget _buildBiometricControls() {
    return FadeInUp(
      duration: const Duration(milliseconds: 500),
      child: Column(
        children: [
          Text(
            _biometricError ?? 'Authentication Required',
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextButton(
                onPressed: _navigateToNextScreen,
                style: TextButton.styleFrom(
                  backgroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('RETRY SCAN', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w800, fontSize: 13)),
              ),
              const SizedBox(width: 12),
              TextButton(
                onPressed: _handleDeepLogout,
                child: const Text('SWITCH ACCOUNT', style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 13)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SplashDotGridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.05)
      ..strokeWidth = 1.2
      ..style = PaintingStyle.fill;

    const spacing = 24.0;
    const radius = 1.0;
    for (double x = spacing / 2; x < size.width; x += spacing) {
      for (double y = spacing / 2; y < size.height; y += spacing) {
        canvas.drawCircle(Offset(x, y), radius, paint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

