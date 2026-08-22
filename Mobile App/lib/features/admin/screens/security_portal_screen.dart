import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class SecurityPortalScreen extends StatefulWidget {
  const SecurityPortalScreen({super.key});

  @override
  State<SecurityPortalScreen> createState() => _SecurityPortalScreenState();
}

class _SecurityPortalScreenState extends State<SecurityPortalScreen> {
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
          child: Column(
            children: [
              const SizedBox(height: 48),
              _buildHeader(),
              const SizedBox(height: 48),
              _buildLoginForm(),
              const SizedBox(height: 32),
              _buildAdditionalLinks(),
              const SizedBox(height: 48),
              _buildFooterBranding(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.primary.withOpacity(0.1),
            borderRadius: BorderRadius.circular(24),
          ),
          child: const Icon(Icons.security_rounded, color: AppColors.primary, size: 48),
        ),
        const SizedBox(height: 24),
        const Text(
          'Nobevra Admin Console',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, fontFamily: 'Montserrat'),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        const Text(
          'Authorized Personnel Only. Secure session required for platform management.',
          style: TextStyle(color: Colors.grey, fontSize: 13, height: 1.5, fontWeight: FontWeight.w500),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildLoginForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildInputField(
          label: 'Administrator Email',
          hint: 'admin@nobevra.com',
          icon: Icons.mail_outline_rounded,
        ),
        const SizedBox(height: 20),
        _buildInputField(
          label: 'Password',
          hint: '••••••••••••',
          icon: Icons.lock_outline_rounded,
          isPassword: true,
          obscure: _obscurePassword,
          onToggleObscure: () => setState(() => _obscurePassword = !_obscurePassword),
        ),
        const SizedBox(height: 20),
        _buildInputField(
          label: 'Security Key / 2FA Code',
          hint: '000 000',
          icon: Icons.key_outlined,
          isNumeric: true,
          hasVerification: true,
        ),
        const SizedBox(height: 8),
        const Padding(
          padding: EdgeInsets.only(left: 4),
          child: Text(
            'Enter the 6-digit code from your hardware key or authenticator app.',
            style: TextStyle(color: Colors.grey, fontSize: 11),
          ),
        ),
        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            minimumSize: const Size(double.infinity, 56),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            elevation: 4,
            shadowColor: AppColors.primary.withOpacity(0.3),
          ),
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Authorize & Enter', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              SizedBox(width: 8),
              Icon(Icons.login_rounded, size: 20),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInputField({
    required String label,
    required String hint,
    required IconData icon,
    bool isPassword = false,
    bool obscure = false,
    VoidCallback? onToggleObscure,
    bool isNumeric = false,
    bool hasVerification = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(label.toUpperCase(), style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1)),
        ),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.lightGrey),
          ),
          child: TextField(
            obscureText: obscure,
            keyboardType: isNumeric ? TextInputType.number : TextInputType.text,
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: const TextStyle(color: Colors.grey),
              prefixIcon: Icon(icon, color: Colors.grey, size: 22),
              suffixIcon: isPassword
                  ? IconButton(
                      icon: Icon(obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined, color: Colors.grey, size: 20),
                      onPressed: onToggleObscure,
                    )
                  : (hasVerification ? const Icon(Icons.verified_user_rounded, color: AppColors.primary, size: 20) : null),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAdditionalLinks() {
    return Column(
      children: [
        TextButton(
          onPressed: () {},
          child: const Text('Forgot Password?', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 14)),
        ),
        const SizedBox(height: 8),
        const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.support_agent_rounded, size: 16, color: Colors.grey),
            SizedBox(width: 8),
            Text('Contact IT Support', style: TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.w500)),
          ],
        ),
      ],
    );
  }

  Widget _buildFooterBranding() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.verified_user_rounded, color: Colors.grey, size: 14),
            const SizedBox(width: 8),
            Text(
              'Nobevra Secure Infrastructure'.toUpperCase(),
              style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1),
            ),
          ],
        ),
        const SizedBox(height: 4),
        const Text('v1.0.6 | Session encrypted via AES-256', style: TextStyle(color: Colors.grey, fontSize: 9)),
      ],
    );
  }
}
