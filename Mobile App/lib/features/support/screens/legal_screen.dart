import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class LegalScreen extends StatelessWidget {
  final String title;

  const LegalScreen({super.key, required this.title});

  // Live hosted URLs — update these if domain changes
  static const String _privacyUrl = 'https://nobevra.noblesworld.com.ng/privacy';
  static const String _termsUrl   = 'https://nobevra.noblesworld.com.ng/terms';

  @override
  Widget build(BuildContext context) {
    final isPrivacy = title.toLowerCase().contains('privacy');
    final liveUrl   = isPrivacy ? _privacyUrl : _termsUrl;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(title, style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
        actions: [
          // Open full version in browser
          IconButton(
            icon: const Icon(Icons.open_in_browser_rounded, color: AppColors.primary),
            tooltip: 'Open in browser',
            onPressed: () => _openBrowser(context, liveUrl),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Live URL Banner ────────────────────────────────────────────
            _buildLiveBanner(context, liveUrl),
            const SizedBox(height: 28),

            Text(
              'Last updated: February 20, 2026',
              style: TextStyle(color: Colors.grey.shade500, fontSize: 13, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 32),

            if (isPrivacy) ..._buildPrivacySections()
            else           ..._buildTermsSections(),

            const SizedBox(height: 40),
            Center(
              child: Text(
                'Nobevra © ${DateTime.now().year}. A product of The Noble\'s Technology Services.',
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.grey, fontSize: 12),
              ),
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  // ── Live URL Banner ──────────────────────────────────────────────────────────
  Widget _buildLiveBanner(BuildContext context, String url) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.06),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          const Icon(Icons.language_rounded, color: AppColors.primary, size: 22),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Full version hosted at:', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold)),
                const SizedBox(height: 2),
                Text(url, style: const TextStyle(color: AppColors.primary, fontSize: 11, fontWeight: FontWeight.w600), maxLines: 1, overflow: TextOverflow.ellipsis),
              ],
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: () => _openBrowser(context, url),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(8)),
              child: const Text('OPEN', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  // ── Section Builder ──────────────────────────────────────────────────────────
  Widget _buildSection(String heading, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(heading, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900)),
          const SizedBox(height: 10),
          Text(content, style: TextStyle(color: Colors.grey.shade700, fontSize: 14, height: 1.7)),
        ],
      ),
    );
  }

  // ── Privacy Policy Sections ───────────────────────────────────────────────
  List<Widget> _buildPrivacySections() => [
    _buildSection('1. Information We Collect',
      'We collect account data (name, email, hashed password), profile data (company, phone, avatar), '
      'business data (invoices, QR codes, clients), AI caption history, brand assets you upload, '
      'subscription status, and your device FCM token for push notifications. We do not store card numbers.'),
    _buildSection('2. How We Use Your Information',
      'To provide app features, send transactional emails (OTP, invoices, password resets), '
      'process subscription payments through Paystack, Flutterwave, or PayPal, generate AI captions '
      'via Google Gemini API, and send push notifications if enabled.'),
    _buildSection('3. Third-Party Services',
      'We share data only with: Paystack, Flutterwave, PayPal (payments), Google Gemini AI (captions), '
      'Firebase by Google (push notifications), and Google Sign-In (optional login). Each has its own privacy policy.'),
    _buildSection('4. Data Storage & Security',
      'Your data is stored on secure, encrypted cloud infrastructure. Passwords are bcrypt-hashed. All API communication '
      'uses HTTPS/SSL. Authentication uses signed JWT tokens with expiry.'),
    _buildSection('5. Your Rights',
      'You may access, correct, or request deletion of your data at any time by contacting us at '
      'support@nobevra.com or through the app settings. Account deletion removes all data within 30 days.'),
    _buildSection('6. Children\'s Privacy',
      'Nobevra is not intended for children under 13. We do not knowingly collect data from children under 13.'),
  ];

  // ── Terms of Service Sections ─────────────────────────────────────────────
  List<Widget> _buildTermsSections() => [
    _buildSection('1. Acceptance of Terms',
      'By downloading, installing, or using the Nobevra mobile application, you agree to be bound by these Terms of Service. If you do not agree, do not use the app.'),
    _buildSection('2. Description of Service',
      'Nobevra is an all-in-one business toolkit providing: QR Code Generator (19 types), Invoice Generator with PDF export, AI Social Media Caption Generator, Brand Kit management, and Asset Gallery.'),
    _buildSection('3. Subscription Plans',
      'Free Plan: Standard features with usage limits. Pro Plan (₦4,999/month): Unlimited access to all features. '
      'Subscriptions renew monthly unless cancelled. No refunds for partial months.'),
    _buildSection('4. Acceptable Use',
      'You agree not to use Nobevra for illegal or fraudulent content, to violate intellectual property rights, '
      'to attempt hacking or reverse engineering, or to send unsolicited communications.'),
    _buildSection('5. Limitation of Liability',
      'Nobevra is provided "as is". We are not liable for any indirect or consequential damages arising from '
      'your use of the app. Our liability is limited to the amount you paid in the last 3 months.'),
    _buildSection('6. Termination',
      'We may suspend accounts that violate these terms. You may delete your account at any time from Profile settings.'),
  ];

  // ── Open Browser ──────────────────────────────────────────────────────────
  Future<void> _openBrowser(BuildContext context, String url) async {
    final Uri uri = Uri.parse(url);
    try {
      if (await canLaunchUrl(uri)) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
      } else {
        if (context.mounted) {
           ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Could not open browser for $url')),
          );
        }
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }
}
