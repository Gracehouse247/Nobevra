import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import '../controllers/auth_controller.dart';
import '../widgets/social_auth_button.dart';

// Matches any non-alphanumeric character (symbols, punctuation, etc.)
final _specialCharRegex = RegExp(r'[^a-zA-Z0-9]');

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  bool _isPasswordVisible = false;
  bool _agreeToTerms      = false;
  final _nameController     = TextEditingController();
  final _emailController    = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey            = GlobalKey<FormState>();

  // ── Strength helpers ───────────────────────────────────────────────────────
  int _strength(String p) {
    int s = 0;
    if (p.length >= 8)                      s++;
    if (RegExp(r'[A-Z]').hasMatch(p))       s++;
    if (RegExp(r'[a-z]').hasMatch(p))       s++;
    if (RegExp(r'[0-9]').hasMatch(p))       s++;
    if (_specialCharRegex.hasMatch(p))      s++;
    return s;
  }

  Color _strengthColor(int s) {
    if (s <= 1) return Colors.red;
    if (s == 2) return Colors.orange;
    if (s == 3) return Colors.amber;
    if (s == 4) return Colors.lightGreen;
    return Colors.green;
  }

  String _strengthLabel(int s) {
    if (s <= 1) return 'Too weak';
    if (s == 2) return 'Weak';
    if (s == 3) return 'Fair';
    if (s == 4) return 'Strong';
    return 'Very strong';
  }

  // ── Validator ──────────────────────────────────────────────────────────────
  String? _validatePassword(String? v) {
    if (v == null || v.isEmpty)           return 'Password is required';
    if (v.length < 8)                     return 'At least 8 characters required';
    if (!RegExp(r'[A-Z]').hasMatch(v))    return 'Add an uppercase letter (A-Z)';
    if (!RegExp(r'[a-z]').hasMatch(v))    return 'Add a lowercase letter (a-z)';
    if (!RegExp(r'[0-9]').hasMatch(v))    return 'Add a number (0-9)';
    if (!_specialCharRegex.hasMatch(v))   return 'Add a special character (!@#\$...)';
    return null;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignUp() async {
    if (!_formKey.currentState!.validate()) return;
    if (!_agreeToTerms) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: const Text('Please agree to the Terms & Privacy Policy'),
        backgroundColor: Colors.orange.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ));
      return;
    }
    final auth = context.read<AuthController>();
    final ok = await auth.register(
      name: _nameController.text.trim(),
      email: _emailController.text.trim(),
      password: _passwordController.text,
    );
    if (!mounted) return;
    if (ok) {
      Navigator.pushNamed(context, AppRoutes.otpVerification,
          arguments: {'email': _emailController.text.trim()});
    }
  }

  // Google Sign-In handled by SocialAuthButton widget

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthController>();
    final pwd  = _passwordController.text;
    final s    = _strength(pwd);

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
                const SizedBox(height: 28),

                // ── Header ───────────────────────────────────────────────────
                Center(
                  child: Column(children: [
                    Image.asset('assets/images/nobevra_logo.png', height: 68),
                    const SizedBox(height: 10),
                    Text('Create Account',
                        style: AppTextStyles.headlineLarge
                            .copyWith(fontWeight: FontWeight.w900, fontSize: 24)),
                    const SizedBox(height: 3),
                    Text('Join Nobevra and simplify your business.',
                        textAlign: TextAlign.center,
                        style: AppTextStyles.bodyMedium
                            .copyWith(color: AppColors.darkGrey, fontSize: 13)),
                  ]),
                ),
                const SizedBox(height: 20),

                // ── Error Banner ──────────────────────────────────────────────
                if (auth.status == AuthStatus.error) ...[
                  _buildErrorBanner(auth.errorMessage, auth),
                  const SizedBox(height: 12),
                ],

                // ── Full Name ─────────────────────────────────────────────────
                _buildLabel('Full Name'),
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(
                    hintText: 'John Doe',
                    prefixIcon: Icon(Icons.person_outline_rounded, size: 20),
                  ),
                  validator: (v) =>
                      v == null || v.trim().length < 2 ? 'Enter your full name' : null,
                ),
                const SizedBox(height: 14),

                // ── Email ─────────────────────────────────────────────────────
                _buildLabel('Email Address'),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    hintText: 'name@company.com',
                    prefixIcon: Icon(Icons.mail_outline_rounded, size: 20),
                  ),
                  validator: (v) =>
                      v == null || !v.contains('@') ? 'Enter a valid email' : null,
                ),
                const SizedBox(height: 14),

                // ── Password ──────────────────────────────────────────────────
                _buildLabel('Password'),
                TextFormField(
                  controller: _passwordController,
                  obscureText: !_isPasswordVisible,
                  onChanged: (_) => setState(() {}),
                  decoration: InputDecoration(
                    hintText: 'Min 8 chars, A-Z, a-z, 0-9, symbol',
                    prefixIcon: const Icon(Icons.lock_outline_rounded, size: 20),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _isPasswordVisible
                            ? Icons.visibility_rounded
                            : Icons.visibility_off_rounded,
                        size: 20,
                      ),
                      onPressed: () =>
                          setState(() => _isPasswordVisible = !_isPasswordVisible),
                    ),
                  ),
                  validator: _validatePassword,
                ),

                // ── Strength bar ──────────────────────────────────────────────
                const SizedBox(height: 8),
                Row(
                  children: List.generate(5, (i) {
                    final filled = pwd.isNotEmpty && i < s;
                    return Expanded(
                      child: Container(
                        margin: EdgeInsets.only(right: i < 4 ? 5 : 0),
                        height: 3,
                        decoration: BoxDecoration(
                          color: filled ? _strengthColor(s) : AppColors.lightGrey,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                    );
                  }),
                ),
                if (pwd.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(_strengthLabel(s),
                          style: TextStyle(
                              color: _strengthColor(s),
                              fontSize: 10,
                              fontWeight: FontWeight.w700)),
                      Text('$s/5',
                          style: const TextStyle(
                              color: AppColors.darkGrey, fontSize: 10)),
                    ],
                  ),
                ],

                // ── Compact requirement chips (single wrapped row) ─────────────
                const SizedBox(height: 8),
                _buildRequirementChips(pwd),
                const SizedBox(height: 16),

                // ── Terms checkbox ────────────────────────────────────────────
                Row(children: [
                  SizedBox(
                    width: 22,
                    height: 22,
                    child: Checkbox(
                      value: _agreeToTerms,
                      onChanged: (val) =>
                          setState(() => _agreeToTerms = val ?? false),
                      fillColor: WidgetStateProperty.all(AppColors.primary),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4)),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Wrap(children: [
                      Text('I agree to the ',
                          style: AppTextStyles.bodyMedium.copyWith(fontSize: 12)),
                      GestureDetector(
                        onTap: () => Navigator.pushNamed(context, AppRoutes.legal,
                            arguments: 'Terms of Service'),
                        child: Text('Terms of Service',
                            style: AppTextStyles.bodyMedium.copyWith(
                                fontSize: 12,
                                color: AppColors.primary,
                                fontWeight: FontWeight.bold)),
                      ),
                      Text(' and ',
                          style: AppTextStyles.bodyMedium.copyWith(fontSize: 12)),
                      GestureDetector(
                        onTap: () => Navigator.pushNamed(context, AppRoutes.legal,
                            arguments: 'Privacy Policy'),
                        child: Text('Privacy Policy',
                            style: AppTextStyles.bodyMedium.copyWith(
                                fontSize: 12,
                                color: AppColors.primary,
                                fontWeight: FontWeight.bold)),
                      ),
                      Text('.',
                          style: AppTextStyles.bodyMedium.copyWith(fontSize: 12)),
                    ]),
                  ),
                ]),
                const SizedBox(height: 20),

                // ── Sign Up button ───────────────────────────────────────────
                ElevatedButton(
                  onPressed: auth.isLoading ? null : _handleSignUp,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
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
                      : const Text('Sign Up'),
                ),
                const SizedBox(height: 18),

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
                const SizedBox(height: 14),

                const SocialAuthButton(isLogin: false),
                const SizedBox(height: 20),

                // ── Footer ────────────────────────────────────────────────────
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Already have an account? ',
                        style: AppTextStyles.bodyMedium
                            .copyWith(color: AppColors.darkGrey)),
                    GestureDetector(
                      onTap: () => Navigator.pushNamed(context, AppRoutes.login),
                      child: Text('Sign In',
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

  // ── Compact chips: all in one Wrap row ────────────────────────────────────
  Widget _buildRequirementChips(String password) {
    final checks = [
      ('8+ chars', password.length >= 8),
      ('A-Z',      RegExp(r'[A-Z]').hasMatch(password)),
      ('a-z',      RegExp(r'[a-z]').hasMatch(password)),
      ('0-9',      RegExp(r'[0-9]').hasMatch(password)),
      ('Symbol',   _specialCharRegex.hasMatch(password)),
    ];
    return Wrap(
      spacing: 6,
      runSpacing: 6,
      children: checks.map((c) {
        final label = c.$1;
        final met   = c.$2;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
          decoration: BoxDecoration(
            color:  met ? Colors.green.shade50  : Colors.grey.shade100,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: met ? Colors.green.shade400 : Colors.grey.shade300,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                met ? Icons.check_rounded : Icons.circle_outlined,
                size: 11,
                color: met ? Colors.green.shade600 : Colors.grey.shade400,
              ),
              const SizedBox(width: 4),
              Text(
                label,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: met ? FontWeight.w700 : FontWeight.w500,
                  color: met ? Colors.green.shade700 : Colors.grey.shade500,
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

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
        Expanded(child: Text(message,
            style: TextStyle(color: Colors.red.shade700, fontSize: 13))),
        GestureDetector(
            onTap: auth.reset,
            child: Icon(Icons.close_rounded, color: Colors.red.shade400, size: 18)),
      ]),
    );
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 7.0, left: 4.0),
      child: Text(text.toUpperCase(),
          style: AppTextStyles.bodyMedium.copyWith(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              color: AppColors.darkGrey.withOpacity(0.6),
              letterSpacing: 1.0)),
    );
  }
}
