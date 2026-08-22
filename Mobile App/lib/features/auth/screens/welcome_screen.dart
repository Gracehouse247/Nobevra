import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/auth/controllers/auth_controller.dart';
import '../widgets/social_auth_button.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  Future<void> _handleGoogleSignIn(BuildContext context) async {
    final auth = context.read<AuthController>();
    final ok = await auth.signInWithGoogle();
    if (!context.mounted) return;
    if (ok) Navigator.pushReplacementNamed(context, AppRoutes.dashboard);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Decorative Background Shapes
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.05),
                shape: BoxShape.circle,
              ),
            ),
          ),
          Positioned(
            bottom: -100,
            left: -100,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.05),
                shape: BoxShape.circle,
              ),
            ),
          ),
          
          // Main Content
          SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32.0),
                child: Column(
                children: [
                  const SizedBox(height: 64),
                  // Top Section: Logo & Identity
                  Column(
                    children: [
                      Image.asset(
                        'assets/images/nobevra_logo.png',
                        height: 120,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Your business toolkit, simplified for growth.',
                        textAlign: TextAlign.center,
                        style: AppTextStyles.bodyLarge.copyWith(
                          color: AppColors.darkGrey,
                          fontSize: 18,
                        ),
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 32),
                  
                  // Center Visual (Abstract)
                  const Opacity(
                    opacity: 0.1,
                    child: Icon(
                      Icons.blur_on_rounded,
                      size: 160,
                      color: AppColors.primary,
                    ),
                  ),
                  
                  const SizedBox(height: 32),
                  
                  // Bottom Section: Actions
                  Column(
                    children: [
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () => Navigator.pushNamed(context, AppRoutes.signUp),
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            shape: const StadiumBorder(),
                          ),
                          child: Text(
                            'Create Account',
                            style: AppTextStyles.button.copyWith(fontSize: 18),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: OutlinedButton(
                          onPressed: () => Navigator.pushNamed(context, AppRoutes.login),
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            side: const BorderSide(color: AppColors.primaryDark, width: 2),
                            shape: const StadiumBorder(),
                          ),
                          child: Text(
                            'Sign In',
                            style: AppTextStyles.button.copyWith(
                              color: AppColors.primaryDark,
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ),
                      
                      const SizedBox(height: 32),
                      
                      // Social Separator
                      Row(
                        children: [
                          const Expanded(child: Divider(color: AppColors.lightGrey)),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16.0),
                            child: Text(
                              'Or continue with',
                              style: AppTextStyles.bodyMedium.copyWith(
                                color: AppColors.darkGrey.withOpacity(0.6),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          const Expanded(child: Divider(color: AppColors.lightGrey)),
                        ],
                      ),
                      
                      const SizedBox(height: 24),
                      
                      // Continue with Google (full-width)
                      const SocialAuthButton(isLogin: false),
                      
                      const SizedBox(height: 32),
                      
                      // Footer Legal
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Wrap(
                          alignment: WrapAlignment.center,
                          children: [
                            Text(
                              'By continuing, you agree to our ',
                              style: AppTextStyles.bodyMedium.copyWith(fontSize: 12),
                            ),
                            GestureDetector(
                              onTap: () => Navigator.pushNamed(context, AppRoutes.termsOfService),
                              child: Text(
                                'Terms of Service',
                                style: AppTextStyles.bodyMedium.copyWith(
                                  fontSize: 12,
                                  color: AppColors.primary,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Text(
                              ' and ',
                              style: AppTextStyles.bodyMedium.copyWith(fontSize: 12),
                            ),
                            GestureDetector(
                              onTap: () => Navigator.pushNamed(context, AppRoutes.privacyPolicy),
                              child: Text(
                                'Privacy Policy',
                                style: AppTextStyles.bodyMedium.copyWith(
                                  fontSize: 12,
                                  color: AppColors.primary,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Text(
                              '.',
                              style: AppTextStyles.bodyMedium.copyWith(fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 16),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    ),
  );
}

}

