import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/auth/controllers/auth_controller.dart';

class CreateNewPasswordScreen extends StatefulWidget {
  const CreateNewPasswordScreen({super.key});

  @override
  State<CreateNewPasswordScreen> createState() => _CreateNewPasswordScreenState();
}

class _CreateNewPasswordScreenState extends State<CreateNewPasswordScreen> {
  final _passwordController = TextEditingController();
  final _confirmController  = TextEditingController();
  bool _isPasswordVisible    = false;
  bool _isConfirmVisible     = false;

  int _passwordStrength = 0; // 0-4

  @override
  void initState() {
    super.initState();
    _passwordController.addListener(_updateStrength);
  }

  void _updateStrength() {
    final pass = _passwordController.text;
    int strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.contains(RegExp(r'[A-Z]'))) strength++;
    if (pass.contains(RegExp(r'[0-9]'))) strength++;
    if (pass.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) strength++;
    
    setState(() => _passwordStrength = strength);
  }

  Future<void> _handleUpdate(BuildContext context) async {
    final pass    = _passwordController.text;
    final confirm = _confirmController.text;

    if (pass.length < 8) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Password must be at least 8 characters')),
      );
      return;
    }

    if (pass != confirm) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Passwords do not match')),
      );
      return;
    }

    final authCtrl = context.read<AuthController>();
    final success  = await authCtrl.updatePassword(pass);

    if (mounted) {
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Password updated successfully!'), backgroundColor: AppColors.success),
        );
        // Usually, after a reset link click, the user is logged in or should relogin.
        // If Supabase reset flow auto-logs in, we can go to dashboard.
        // For security protocol, we'll send to login.
        Navigator.pushNamedAndRemoveUntil(context, AppRoutes.login, (route) => false);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(authCtrl.errorMessage), backgroundColor: AppColors.error),
        );
      }
    }
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final authCtrl = context.watch<AuthController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Nobevra',
          style: AppTextStyles.headlineSmall.copyWith(
            color: AppColors.darkGrey.withOpacity(0.4),
            fontWeight: FontWeight.w900,
            fontSize: 18,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              // Hero Icon
              Center(
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.lock_reset_rounded, color: AppColors.primary, size: 40),
                ),
              ),
              const SizedBox(height: 32),
              
              // Headline
              Text(
                'Secure Your Account',
                style: AppTextStyles.headlineLarge.copyWith(fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 12),
              Text(
                'Create a strong new password to protect your business data and toolkit access.',
                style: AppTextStyles.bodyMedium.copyWith(color: AppColors.darkGrey, height: 1.5),
              ),
              const SizedBox(height: 48),
              
              // Form
              _buildLabel('New Password'),
              TextField(
                controller: _passwordController,
                obscureText: !_isPasswordVisible,
                enabled: !authCtrl.isLoading,
                decoration: InputDecoration(
                  hintText: 'Min. 8 characters',
                  prefixIcon: const Icon(Icons.lock_rounded, size: 20),
                  suffixIcon: IconButton(
                    icon: Icon(_isPasswordVisible ? Icons.visibility_rounded : Icons.visibility_off_rounded, size: 20),
                    onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              
              // Strength Indicator
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'SECURITY LEVEL',
                    style: AppTextStyles.bodyMedium.copyWith(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: AppColors.darkGrey.withOpacity(0.4),
                      letterSpacing: 1.0,
                    ),
                  ),
                  Text(
                    _getStrengthText(),
                    style: AppTextStyles.bodyMedium.copyWith(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: _getStrengthColor(),
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: List.generate(4, (index) => Expanded(
                  child: Container(
                    height: 6,
                    margin: EdgeInsets.only(right: index < 3 ? 6 : 0),
                    decoration: BoxDecoration(
                      color: index < _passwordStrength ? _getStrengthColor() : AppColors.lightGrey,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                )),
              ),
              const SizedBox(height: 8),
              Text(
                'Use a mix of letters, numbers and symbols for better security.',
                style: AppTextStyles.bodyMedium.copyWith(
                  fontSize: 11,
                  fontStyle: FontStyle.italic,
                  color: AppColors.darkGrey.withOpacity(0.6),
                ),
              ),
              const SizedBox(height: 24),
              
              _buildLabel('Confirm New Password'),
              TextField(
                controller: _confirmController,
                obscureText: !_isConfirmVisible,
                enabled: !authCtrl.isLoading,
                decoration: InputDecoration(
                  hintText: 'Repeat your password',
                  prefixIcon: const Icon(Icons.verified_user_rounded, size: 20),
                  suffixIcon: IconButton(
                    icon: Icon(_isConfirmVisible ? Icons.visibility_rounded : Icons.visibility_off_rounded, size: 20),
                    onPressed: () => setState(() => _isConfirmVisible = !_isConfirmVisible),
                  ),
                ),
              ),
              
              const SizedBox(height: 64),
              
              // Action Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: authCtrl.isLoading ? null : () => _handleUpdate(context),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: authCtrl.isLoading 
                    ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                    : const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('Update Password'),
                          SizedBox(width: 8),
                          Icon(Icons.check_circle_outline_rounded, size: 20),
                        ],
                      ),
                ),
              ),
              const SizedBox(height: 16),
              Center(
                child: Text(
                  'Step 7 of 8: Finalizing account security',
                  style: AppTextStyles.bodyMedium.copyWith(
                    fontSize: 11,
                    color: AppColors.darkGrey.withOpacity(0.4),
                  ),
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  String _getStrengthText() {
    switch (_passwordStrength) {
      case 0: return 'WEAK';
      case 1: return 'FAIR';
      case 2: return 'GOOD';
      case 3: return 'STRONG';
      case 4: return 'EXCELLENT';
      default: return '';
    }
  }

  Color _getStrengthColor() {
    switch (_passwordStrength) {
      case 0: return AppColors.error;
      case 1: return AppColors.warning;
      case 2: return Colors.blue;
      case 3: return AppColors.primary;
      case 4: return AppColors.success;
      default: return AppColors.lightGrey;
    }
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0, left: 4.0),
      child: Text(
        text,
        style: AppTextStyles.bodyMedium.copyWith(fontWeight: FontWeight.bold),
      ),
    );
  }
}

