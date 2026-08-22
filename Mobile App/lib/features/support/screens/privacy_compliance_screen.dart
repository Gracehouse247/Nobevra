import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class PrivacyComplianceScreen extends StatelessWidget {
  const PrivacyComplianceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          _buildSliverAppBar(context),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSearchBar(),
                  const SizedBox(height: 32),
                  _buildIntroduction(),
                  const SizedBox(height: 40),
                  _buildSection(
                    '1. Information We Collect',
                    'We collect information to provide better services to all our users. We collect data in two main categories:',
                    Icons.storage_rounded,
                    [
                      {
                        'title': 'Personal Information',
                        'desc': 'When you register, we collect your name, email address, and encrypted credentials to secure your account.',
                      },
                      {
                        'title': 'Usage Metadata',
                        'desc': 'Automated data regarding your device type, IP address, and interaction patterns with our app to improve performance.',
                      },
                    ],
                  ),
                  const SizedBox(height: 40),
                  _buildSection(
                    '2. Data Security & Storage',
                    'Nobevra employs industry-standard AES-256 encryption for all data at rest. Our servers are located in highly secure, SOC2-compliant data centers.',
                    Icons.security_rounded,
                    [],
                    hasTip: true,
                  ),
                  const SizedBox(height: 40),
                  _buildRightsSection(),
                  const SizedBox(height: 48),
                  _buildFooterAction(),
                  const SizedBox(height: 48),
                  _buildComplianceBadges(),
                  const SizedBox(height: 60),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSliverAppBar(BuildContext context) {
    return SliverAppBar(
      expandedHeight: 100,
      pinned: true,
      backgroundColor: Colors.white.withOpacity(0.9),
      elevation: 0,
      leading: IconButton(
        icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
        onPressed: () => Navigator.pop(context),
      ),
      title: const Text('Privacy Policy', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
      centerTitle: true,
      actions: [
        IconButton(icon: const Icon(Icons.picture_as_pdf_rounded, color: AppColors.primary), onPressed: () {}),
      ],
      bottom: const PreferredSize(
        preferredSize: Size.fromHeight(4),
        child: LinearProgressIndicator(
          value: 0.35,
          backgroundColor: AppColors.lightGrey,
          valueColor: AlwaysStoppedAnimation(AppColors.primary),
          minHeight: 4,
        ),
      ),
    );
  }

  Widget _buildSearchBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: const TextField(
        decoration: InputDecoration(
          icon: Icon(Icons.search_rounded, color: Colors.grey, size: 20),
          hintText: 'Search privacy terms...',
          hintStyle: TextStyle(color: Colors.grey, fontSize: 14),
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(vertical: 16),
        ),
      ),
    );
  }

  Widget _buildIntroduction() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Nobevra Data Commitment',
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, height: 1.1),
        ),
        const SizedBox(height: 16),
        const Text(
          'At Nobevra, we believe privacy is a fundamental human right. This document outlines our transparent approach to data safety, compliance with international standards, and how we empower you to control your digital footprint.',
          style: TextStyle(color: Colors.grey, fontSize: 14, height: 1.6),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            const Icon(Icons.schedule_rounded, size: 14, color: Colors.grey),
            const SizedBox(width: 8),
            Text('Last Updated: October 24, 2023', style: TextStyle(color: Colors.grey.shade500, fontSize: 12, fontStyle: FontStyle.italic)),
          ],
        ),
      ],
    );
  }

  Widget _buildSection(String title, String content, IconData icon, List<Map<String, String>> points, {bool hasTip = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
              child: Icon(icon, color: AppColors.primary, size: 22),
            ),
            const SizedBox(width: 16),
            Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 16),
        Text(content, style: const TextStyle(color: Colors.grey, fontSize: 14, height: 1.6)),
        if (points.isNotEmpty) ...[
          const SizedBox(height: 20),
          ...points.map((p) => Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.check_circle_rounded, color: AppColors.primary, size: 18),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(p['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      const SizedBox(height: 4),
                      Text(p['desc']!, style: const TextStyle(color: Colors.grey, fontSize: 13, height: 1.4)),
                    ],
                  ),
                ),
              ],
            ),
          )),
        ],
        if (hasTip) ...[
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.primary.withOpacity(0.1)),
            ),
            child: const Text(
              'Pro-tip: You can enable Two-Factor Authentication (2FA) in your profile settings for an extra layer of protection.',
              style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildRightsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
              child: const Icon(Icons.person_pin_rounded, color: AppColors.primary, size: 22),
            ),
            const SizedBox(width: 16),
            const Text('3. Your Privacy Rights', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 16),
        const Text('Regardless of your location, we provide the following tools to manage your information:', style: TextStyle(color: Colors.grey, fontSize: 14)),
        const SizedBox(height: 20),
        _buildRightItem(Icons.download_rounded, 'Request Data Export', Colors.black87),
        const SizedBox(height: 12),
        _buildRightItem(Icons.delete_forever_rounded, 'Delete My Account', Colors.redAccent),
      ],
    );
  }

  Widget _buildRightItem(IconData icon, String label, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: Row(
        children: [
          Icon(icon, color: color.withOpacity(0.7), size: 20),
          const SizedBox(width: 16),
          Text(label, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 14)),
          const Spacer(),
          const Icon(Icons.chevron_right_rounded, color: Colors.grey, size: 20),
        ],
      ),
    );
  }

  Widget _buildFooterAction() {
    return Column(
      children: [
        const Text('Have privacy questions?', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        const Text('Our dedicated privacy team is here to help you understand your data.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey, fontSize: 13)),
        const SizedBox(height: 24),
        ElevatedButton.icon(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            minimumSize: const Size(double.infinity, 56),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          ),
          icon: const Icon(Icons.mail_outline_rounded),
          label: const Text('Contact Privacy Officer', style: TextStyle(fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }

  Widget _buildComplianceBadges() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildBadge(Icons.verified_user_rounded, 'GDPR'),
        const SizedBox(width: 32),
        _buildBadge(Icons.lock_rounded, 'CCPA'),
        const SizedBox(width: 32),
        _buildBadge(Icons.policy_rounded, 'ISO 27001'),
      ],
    );
  }

  Widget _buildBadge(IconData icon, String label) {
    return Column(
      children: [
        Icon(icon, color: Colors.grey.shade400, size: 28),
        const SizedBox(height: 4),
        Text(label, style: TextStyle(color: Colors.grey.shade400, fontSize: 9, fontWeight: FontWeight.bold)),
      ],
    );
  }
}
