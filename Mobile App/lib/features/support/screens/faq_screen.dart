// lib/features/support/screens/faq_screen.dart
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class FaqScreen extends StatelessWidget {
  const FaqScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Help Center', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHero(context),
            const SizedBox(height: 40),
            _buildFaqSection('Identity & Branding', [
              _FaqItem('How do I design my physical cards?', 'Head to the Identity Studio in your Profile. You can select between Standard, Square, or Slim formats and apply your Brand Kit instantly.'),
              _FaqItem('What is a Brand Kit?', 'The Brand Kit centralizes your logo, colors, and brand voice. Once set, Nobevra automatically applies them to all invoices and cards.'),
            ]),
            const SizedBox(height: 32),
            _buildFaqSection('Advanced Invoicing', [
              _FaqItem('Can I send invoices in other currencies?', 'Yes. In the Profile Overview, you can set your preferred local currency (USD, NGN, GBP, etc.) which will be used for all new invoices.'),
              _FaqItem('How do I track payment status?', 'The Invoicing Dashboard shows real-time analytics for Paid, Unpaid, and Overdue invoices, helping you manage cash flow.'),
            ]),
            const SizedBox(height: 32),
            _buildFaqSection('Security & Teams', [
              _FaqItem('How do I manage recognized devices?', 'In Security Settings, you can view all active sessions. If you spot an unknown device, you can revoke its access with one tap.'),
              _FaqItem('Can I invite my accountant?', 'Yes. Use Team Management to invite members and assign roles like "Admin" or "Staff" to control data access.'),
            ]),
            const SizedBox(height: 48),
            _buildStillNeedHelp(context),
            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }

  Widget _buildHero(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [AppColors.primary, Color(0xFF1E40AF)]),
        borderRadius: BorderRadius.circular(32),
      ),
      child: const Column(
        children: [
          Icon(Icons.help_center_rounded, color: Colors.white, size: 48),
          SizedBox(height: 16),
          Text('How can we help?', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          Text('Search our most frequently asked questions about the Nobevra ecosystem.', 
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white70, fontSize: 13, height: 1.5)),
        ],
      ),
    );
  }

  Widget _buildFaqSection(String title, List<_FaqItem> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppColors.primary, letterSpacing: 1.0)),
        const SizedBox(height: 16),
        ...items.map((item) => _buildFaqTile(item)),
      ],
    );
  }

  Widget _buildFaqTile(_FaqItem item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10)],
        border: Border.all(color: Colors.white, width: 2),
      ),
      child: ExpansionTile(
        title: Text(item.question, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.black)),
        childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        expandedAlignment: Alignment.topLeft,
        iconColor: AppColors.primary,
        children: [
          Text(item.answer, style: TextStyle(color: Colors.grey.shade600, fontSize: 13, height: 1.5)),
        ],
      ),
    );
  }

  Widget _buildStillNeedHelp(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          const Text('Still need help?', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const Text("Can't find the answer? Connect with a Nobevra specialist.", textAlign: TextAlign.center, style: TextStyle(color: Colors.grey, fontSize: 13)),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, AppRoutes.liveSupportChat),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 56),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 0,
            ),
            child: const Text('Live Support Chat', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}

class _FaqItem {
  final String question;
  final String answer;
  _FaqItem(this.question, this.answer);
}
