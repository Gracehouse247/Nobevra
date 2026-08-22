import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:provider/provider.dart';

class NotificationSettingsScreen extends StatefulWidget {
  const NotificationSettingsScreen({super.key});

  @override
  State<NotificationSettingsScreen> createState() => _NotificationSettingsScreenState();
}

class _NotificationSettingsScreenState extends State<NotificationSettingsScreen> {
  // Logic moved to ProfileController

  @override
  Widget build(BuildContext context) {
    final profile = context.watch<ProfileController>();
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.8),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Notifications', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildInfoBox(),
            _buildSectionHeader('ACTIVITY UPDATES'),
            _buildSettingsGroup([
              _buildToggleItem(
                Icons.receipt_long_rounded,
                'Invoicing Updates',
                'Billing and payment confirmations',
                profile.invoicingUpdates,
                (val) => profile.updateNotificationPreference('invoicingUpdates', val),
              ),
              _buildToggleItem(
                Icons.qr_code_2_rounded,
                'QR Code Scans',
                'Alerts when your codes are scanned',
                profile.qrScans,
                (val) => profile.updateNotificationPreference('qrScans', val),
              ),
            ]),
            _buildSectionHeader('KNOWLEDGE & NEWS'),
            _buildSettingsGroup([
              _buildToggleItem(
                Icons.smart_toy_rounded,
                'AI Tool News',
                'Feature launches and AI tips',
                profile.aiNews,
                (val) => profile.updateNotificationPreference('aiNews', val),
              ),
            ]),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              child: Text(
                'Get the most out of Nobevra with monthly AI-driven productivity insights.',
                style: TextStyle(color: Colors.grey.shade500, fontSize: 11, fontWeight: FontWeight.w500),
              ),
            ),
            _buildSectionHeader('COMMUNICATION'),
            _buildSettingsGroup([
              _buildToggleItem(
                Icons.campaign_rounded,
                'Marketing Offers',
                'Promotions, discounts, and events',
                profile.marketingOffers,
                (val) => profile.updateNotificationPreference('marketingOffers', val),
              ),
            ]),
            _buildFooterHelp(),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoBox() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.primary.withOpacity(0.05),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.primary.withOpacity(0.1)),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.info_outline_rounded, color: AppColors.primary, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Control how Nobevra reaches you. These settings sync across all your mobile devices.',
                style: TextStyle(color: Colors.grey.shade700, fontSize: 13, height: 1.4, fontWeight: FontWeight.w500),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 12),
      child: Text(
        title,
        style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5),
      ),
    );
  }

  Widget _buildSettingsGroup(List<Widget> items) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.lightGrey.withOpacity(0.3)),
        ),
        child: Column(
          children: List.generate(items.length, (index) {
            return Column(
              children: [
                items[index],
                if (index < items.length - 1)
                  Divider(height: 1, color: AppColors.lightGrey.withOpacity(0.3), indent: 60),
              ],
            );
          }),
        ),
      ),
    );
  }

  Widget _buildToggleItem(IconData icon, String title, String subtitle, bool value, ValueChanged<bool> onChanged) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
            child: Icon(icon, color: AppColors.primary, size: 22),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                Text(subtitle, style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
              ],
            ),
          ),
          Switch.adaptive(
            value: value,
            onChanged: onChanged,
            activeTrackColor: AppColors.primary.withOpacity(0.5),
            activeThumbColor: AppColors.primary,
          ),
        ],
      ),
    );
  }

  Widget _buildFooterHelp() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(40, 48, 40, 40),
      child: Text(
        'You can manage email preferences separately in Account Security. Changes may take up to 24 hours to apply across all delivery channels.',
        textAlign: TextAlign.center,
        style: TextStyle(color: Colors.grey.shade400, fontSize: 11, height: 1.5, fontWeight: FontWeight.w500),
      ),
    );
  }
}

