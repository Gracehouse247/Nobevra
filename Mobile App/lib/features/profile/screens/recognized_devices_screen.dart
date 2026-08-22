// lib/features/profile/screens/recognized_devices_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/session_controller.dart';
import 'package:noble_invoice/features/profile/models/session_model.dart';
import 'package:intl/intl.dart';

class RecognizedDevicesScreen extends StatefulWidget {
  const RecognizedDevicesScreen({super.key});

  @override
  State<RecognizedDevicesScreen> createState() => _RecognizedDevicesScreenState();
}

class _RecognizedDevicesScreenState extends State<RecognizedDevicesScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SessionController>().loadSessions();
    });
  }

  @override
  Widget build(BuildContext context) {
    final sessionCtrl = context.watch<SessionController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Recognized Devices', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: RefreshIndicator(
        onRefresh: sessionCtrl.loadSessions,
        child: sessionCtrl.isLoading && sessionCtrl.sessions.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : ListView(
                padding: const EdgeInsets.all(24),
                children: [
                  _buildSectionHeader('CURRENT DEVICE'),
                  ...sessionCtrl.sessions.where((s) => s.isCurrent).map((s) => _buildDeviceCard(s)),
                  const SizedBox(height: 32),
                  _buildSectionHeader('OTHER ACTIVE SESSIONS'),
                  ...sessionCtrl.sessions.where((s) => !s.isCurrent).map((s) => _buildDeviceCard(s)),
                  if (sessionCtrl.sessions.where((s) => !s.isCurrent).isEmpty)
                    _buildEmptyState(),
                  const SizedBox(height: 48),
                  _buildSecurityTip(),
                  const SizedBox(height: 48),
                ],
              ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 16),
      child: Text(
        title,
        style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5),
      ),
    );
  }

  Widget _buildDeviceCard(UserSession session) {
    final isDesktop = session.deviceName.contains(RegExp(r'Mac|Windows|Desktop', caseSensitive: false));

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.1)),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4)),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(
              isDesktop ? Icons.desktop_mac_rounded : Icons.smartphone_rounded,
              color: AppColors.primary,
              size: 28,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(session.deviceName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                    if (session.isCurrent) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: Colors.green.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                        child: const Text('THIS DEVICE', style: TextStyle(color: Colors.green, fontSize: 9, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  '${session.location} • ${DateFormat('MMM d, hh:mm a').format(session.lastActive)}',
                  style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                ),
              ],
            ),
          ),
          if (!session.isCurrent)
            IconButton(
              icon: const Icon(Icons.logout_rounded, color: Colors.red),
              onPressed: () => _confirmRevoke(session),
            ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 40),
      child: Column(
        children: [
          Icon(Icons.devices_other_rounded, size: 48, color: Colors.grey.shade200),
          const SizedBox(height: 16),
          const Text('No other active sessions', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }

  Widget _buildSecurityTip() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.amber.withOpacity(0.1),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.amber.withOpacity(0.1)),
      ),
      child: Row(
        children: [
          const Icon(Icons.info_outline_rounded, color: Colors.amber, size: 24),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              'If you see a device you don\'t recognize, revoke the session immediately and update your password.',
              style: TextStyle(color: Colors.amber.shade900, fontSize: 13, fontWeight: FontWeight.w500, height: 1.4),
            ),
          ),
        ],
      ),
    );
  }

  void _confirmRevoke(UserSession session) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Text('Revoke Session?'),
        content: Text('This will log you out from ${session.deviceName}. You will need to sign in again to use Nobevra on that device.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel', style: TextStyle(color: Colors.grey)),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await context.read<SessionController>().revokeSession(session.id);
              if (success && mounted) {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Session revoked successfully')));
              }
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
            child: const Text('Revoke'),
          ),
        ],
      ),
    );
  }
}
