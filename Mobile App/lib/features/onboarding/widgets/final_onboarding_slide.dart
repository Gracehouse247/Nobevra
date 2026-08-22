import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class FinalOnboardingSlide extends StatelessWidget {
  const FinalOnboardingSlide({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Subtle Background Pattern
        Positioned.fill(
          child: Opacity(
            opacity: 0.03,
            child: Transform.scale(
              scale: 1.5,
              child: Transform.rotate(
                angle: 0.2,
                child: Wrap(
                  spacing: 48,
                  runSpacing: 48,
                  alignment: WrapAlignment.center,
                  runAlignment: WrapAlignment.center,
                  children: List.generate(12, (index) {
                    final icons = [Icons.rocket_launch, Icons.insights, Icons.account_balance_wallet];
                    return Icon(
                      icons[index % icons.length],
                      size: 80,
                      color: AppColors.primary,
                    );
                  }),
                ),
              ),
            ),
          ),
        ),
        
        Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16),
              child: Center(
                child: Text(
                  'Nobevra',
                  style: AppTextStyles.headlineSmall.copyWith(
                    fontSize: 12,
                    letterSpacing: 2,
                    color: AppColors.primary,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            
            Expanded(
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Business Hero Illustration
                      ClipRRect(
                        borderRadius: BorderRadius.circular(24),
                        child: Image.asset(
                          'assets/images/business_welcome_hero.png',
                          height: 220,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(height: 32),
                    
                      Text(
                        'Elevate Your Business Today',
                        textAlign: TextAlign.center,
                        maxLines: 1,
                        style: AppTextStyles.headlineLarge.copyWith(height: 1.2, fontWeight: FontWeight.w800, fontSize: 22),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        "Join thousands of entrepreneurs scaling their ventures with Nobevra's smart toolkit.",
                        textAlign: TextAlign.center,
                        style: AppTextStyles.bodyLarge.copyWith(color: Colors.grey.shade500, height: 1.6, fontWeight: FontWeight.w500),
                      ),
                      
                      const SizedBox(height: 40),
                      
                      _buildActionButtons(context),
                      const SizedBox(height: 48),
                      
                      _buildTrustedSection(),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }



  Widget _buildActionButtons(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => Navigator.pushReplacementNamed(context, AppRoutes.welcome),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 20),
              elevation: 8,
              shadowColor: AppColors.primary.withOpacity(0.3),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Get Started', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                SizedBox(width: 8),
                Icon(Icons.arrow_forward_rounded, size: 20),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton(
            onPressed: () => Navigator.pushReplacementNamed(context, AppRoutes.login),
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 20),
              side: BorderSide(color: AppColors.primary.withOpacity(0.2), width: 2),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text('Log In', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 18)),
          ),
        ),
      ],
    );
  }

  Widget _buildTrustedSection() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(3, (i) {
            return Transform.translate(
              offset: Offset(i * -10.0, 0),
              child: Container(
                width: 36, height: 36,
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1 * (i + 1)),
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 2),
                ),
                child: const Icon(Icons.person, size: 18, color: AppColors.primary),
              ),
            );
          }),
        ),
        const SizedBox(height: 12),
        Text(
          'TRUSTED BY 10K+ BUSINESSES',
          style: AppTextStyles.bodySmall.copyWith(
            letterSpacing: 1.5,
            fontWeight: FontWeight.w900,
            color: Colors.grey.shade400,
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}
