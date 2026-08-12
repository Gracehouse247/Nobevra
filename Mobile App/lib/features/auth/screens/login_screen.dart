import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import '../controllers/auth_controller.dart';
import '../widgets/social_auth_button.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isPasswordVisible = false;
  final _emailController    = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey            = GlobalKey<FormState>();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    if (!_formKey.currentState!.validate()) return;
    final auth = context.read<AuthController>();
    final result = await auth.login(
      email: _emailController.text.trim(),
      password: _passwordController.text,
    );
    if (!mounted) return;
    if (result == 'mfa_required') {
      Navigator.pushNamed(context, AppRoutes.totpVerification);
    } else if (result == 'success') {
      final profileCtrl = context.read<ProfileController>();
      await profileCtrl.loadProfile();
      if (!mounted) return;
      if (profileCtrl.onboardingCompleted) {
        Navigator.pushReplacementNamed(context, AppRoutes.dashboard);
      } else {
        Navigator.pushReplacementNamed(context, AppRoutes.onboardingManager);
      }
    }
  }

  // Google Sign-In handled by SocialAuthButton widget

  Future<void> _handleBiometricLogin() async {
    final auth = context.read<AuthController>();
    final ok = await auth.loginWithBiometric();
    if (!mounted) return;
    if (ok) {
      final profileCtrl = context.read<ProfileController>();
      await profileCtrl.loadProfile();
      if (!mounted) return;
      if (profileCtrl.onboardingCompleted) {
        Navigator.pushReplacementNamed(context, AppRoutes.dashboard);
      } else {
        Navigator.pushReplacementNamed(context, AppRoutes.onboardingManager);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 40),

                // ── Header ───────────────────────────────────────────────────
                Center(
                  child: Column(children: [
                    Image.asset('assets/images/nobleinvoice_logo.png', height: 72),
                    const SizedBox(height: 12),
                    Text('Welcome Back',
                        style: AppTextStyles.headlineLarge.copyWith(
                            fontWeight: FontWeight.w900, fontSize: 26)),
                    const SizedBox(height: 4),
                    Text('Sign in to continue to your NobleInvoice account.',
                        textAlign: TextAlign.center,
                        style: AppTextStyles.bodyMedium.copyWith(
                            color: AppColors.darkGrey, fontSize: 13)),
                  ]),
                ),
                const SizedBox(height: 28),

                // ── Error Banner ──────────────────────────────────────────────
                if (auth.status == AuthStatus.error) ...[
                  _buildErrorBanner(auth.errorMessage, auth),
                  const SizedBox(height: 14),
                ],

                // ── Email ─────────────────────────────────────────────────────
                _buildLabel('Email Address'),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    hintText: 'name@company.com',
                    prefixIcon: Icon(Icons.alternate_email_rounded,
                        color: AppColors.darkGrey, size: 20),
                  ),
                  validator: (v) =>
                      v == null || !v.contains('@') ? 'Enter a valid email' : null,
                ),
                const SizedBox(height: 16),

                // ── Password ──────────────────────────────────────────────────
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _buildLabel('Password', bottomPad: false),
                    GestureDetector(
                      onTap: () =>
                          Navigator.pushNamed(context, AppRoutes.forgotPassword),
                      child: Text('Forgot Password?',
                          style: AppTextStyles.bodyMedium.copyWith(
                              color: AppColors.primary,
                              fontWeight: FontWeight.bold,
                              fontSize: 12)),
                    ),
                  ],
                ),
                const SizedBox(height: 7),
                TextFormField(
                  controller: _passwordController,
                  obscureText: !_isPasswordVisible,
                  decoration: InputDecoration(
                    hintText: '••••••••',
                    prefixIcon: const Icon(Icons.lock_outline_rounded,
                        color: AppColors.darkGrey, size: 20),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _isPasswordVisible
                            ? Icons.visibility_rounded
                            : Icons.visibility_off_rounded,
                        color: AppColors.darkGrey,
                        size: 20,
                      ),
                      onPressed: () =>
                          setState(() => _isPasswordVisible = !_isPasswordVisible),
                    ),
                  ),
                  validator: (v) =>
                      v == null || v.length < 6 ? 'Password too short' : null,
                ),
                const SizedBox(height: 24),

                // ── Login Button (+ optional fingerprint) ─────────────────────
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: auth.isLoading ? null : _handleLogin,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 17),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16)),
                          disabledBackgroundColor:
                              AppColors.primary.withOpacity(0.3),
                        ),
                        child: auth.isLoading
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                    strokeWidth: 2, color: Colors.white))
                            : const Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text('Login'),
                                  SizedBox(width: 8),
                                  Icon(Icons.arrow_forward_rounded, size: 18),
                                ],
                              ),
                      ),
                    ),
                    // Fingerprint tile — only shown when biometric is enabled
                    if (auth.isBiometricEnabled) ...[
                      const SizedBox(width: 14),
                      InkWell(
                        onTap: auth.isLoading ? null : _handleBiometricLogin,
                        borderRadius: BorderRadius.circular(16),
                        child: Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withOpacity(0.08),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                                color: AppColors.primary.withOpacity(0.25)),
                          ),
                          child: const Icon(Icons.fingerprint_rounded,
                              color: AppColors.primary, size: 24),
                        ),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 24),

                // ── OR divider ────────────────────────────────────────────────
                Row(children: [
                  const Expanded(child: Divider(color: AppColors.lightGrey)),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    child: Text('OR',
                        style: AppTextStyles.bodyMedium.copyWith(
                            color: AppColors.darkGrey.withOpacity(0.5),
                            fontWeight: FontWeight.w800,
                            fontSize: 11,
                            letterSpacing: 1.2)),
                  ),
                  const Expanded(child: Divider(color: AppColors.lightGrey)),
                ]),
                const SizedBox(height: 16),

                const SocialAuthButton(isLogin: true),
                const SizedBox(height: 28),

                // ── Footer ────────────────────────────────────────────────────
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Don't have an account? ",
                        style: AppTextStyles.bodyMedium
                            .copyWith(color: AppColors.darkGrey)),
                    GestureDetector(
                      onTap: () => Navigator.pushNamed(context, AppRoutes.signUp),
                      child: Text('Sign Up',
                          style: AppTextStyles.bodyMedium.copyWith(
                              color: AppColors.primary,
                              fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // ── Continue with Google button ───────────────────────────────────────────
  // _buildGoogleButton removed and replaced by SocialAuthButton

  Widget _buildErrorBanner(String message, AuthController auth) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.red.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.red.shade200),
      ),
      child: Row(children: [
        Icon(Icons.error_outline_rounded, color: Colors.red.shade600, size: 20),
        const SizedBox(width: 10),
        Expanded(
            child: Text(message,
                style: TextStyle(color: Colors.red.shade700, fontSize: 13))),
        GestureDetector(
            onTap: auth.reset,
            child:
                Icon(Icons.close_rounded, color: Colors.red.shade400, size: 18)),
      ]),
    );
  }

  /// Shared label builder — [bottomPad] controls whether bottom padding is added
  Widget _buildLabel(String text, {bool bottomPad = true}) {
    final widget = Text(
      text.toUpperCase(),
      style: AppTextStyles.bodyMedium.copyWith(
          fontSize: 10,
          fontWeight: FontWeight.w900,
          color: AppColors.darkGrey.withOpacity(0.6),
          letterSpacing: 1.0),
    );
    if (!bottomPad) return widget;
    return Padding(
      padding: const EdgeInsets.only(bottom: 7.0, left: 4.0),
      child: widget,
    );
  }
}
