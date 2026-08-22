import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/auth/controllers/auth_controller.dart';

class SecuritySettingsScreen extends StatefulWidget {
  const SecuritySettingsScreen({super.key});

  @override
  State<SecuritySettingsScreen> createState() => _SecuritySettingsScreenState();
}

class _SecuritySettingsScreenState extends State<SecuritySettingsScreen> {
  // Remvoed local state to use AuthController state

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.8),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Security', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHero(),
            _buildSettingsSection(
              'AUTHENTICATION',
              [
                _SecurityItem(
                  icon: Icons.lock_outline_rounded,
                  title: 'Update Password',
                  subtitle: 'Change your login credentials',
                  color: Colors.blue,
                  onTap: () => Navigator.pushNamed(context, AppRoutes.updatePassword),
                ),
                _SecurityItem(
                  icon: Icons.phonelink_lock_rounded,
                  title: 'Two-Factor Auth',
                  subtitle: 'Add an extra layer of security',
                  color: Colors.orange,
                  onTap: () => Navigator.pushNamed(context, AppRoutes.totpSetup),
                ),
              ],
            ),
            _buildSettingsSection(
              'BIOMETRICS',
              [
                _SecurityItem(
                  icon: Icons.fingerprint_rounded,
                  title: 'Touch / Face ID',
                  subtitle: 'Login with your biometrics',
                  color: AppColors.primary,
                  trailing: Switch.adaptive(
                    value: context.watch<AuthController>().isBiometricEnabled,
                    onChanged: (val) => _handleBiometricToggle(context, val),
                    activeTrackColor: AppColors.primary.withOpacity(0.5),
                    activeThumbColor: AppColors.primary,
                  ),
                  onTap: () {},
                ),
              ],
            ),
            _buildSettingsSection(
              'ACCOUNT MANAGEMENT',
              [
                _SecurityItem(
                  icon: Icons.delete_forever_rounded,
                  title: 'Delete Account',
                  subtitle: 'Permanently remove your data',
                  color: Colors.red,
                  onTap: () => Navigator.pushNamed(context, AppRoutes.deleteAccount),
                ),
              ],
            ),
            _buildSettingsSection(
              'DEVICE MANAGEMENT',
              [
                _SecurityItem(
                  icon: Icons.devices_rounded,
                  title: 'Recognized Devices',
                  subtitle: 'Manage your active sessions',
                  color: Colors.purple,
                  onTap: () => Navigator.pushNamed(context, AppRoutes.recognizedDevices),
                ),
              ],
            ),
            const SizedBox(height: 40),
            _buildSecurityBadge(),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Future<void> _handleBiometricToggle(BuildContext context, bool value) async {
    final authCtrl = context.read<AuthController>();
    if (value) {
      final success = await authCtrl.enableBiometric();
      if (!success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(authCtrl.errorMessage.isNotEmpty ? authCtrl.errorMessage : 'Biometric enrollment failed'),
            backgroundColor: Colors.red.shade800,
          ),
        );
      }
    } else {
      await authCtrl.disableBiometric();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Biometric access disabled for this device')),
        );
      }
    }
  }

  Widget _buildHero() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(bottomLeft: Radius.circular(40), bottomRight: Radius.circular(40)),
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), shape: BoxShape.circle),
            child: const Icon(Icons.shield_rounded, color: AppColors.primary, size: 48),
          ),
          const SizedBox(height: 24),
          const Text('Account Protection', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Text(
            'Keep your Nobevra business account secure with industry-standard encryption and security protocols.',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey.shade500, fontWeight: FontWeight.w500, height: 1.4),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsSection(String title, List<_SecurityItem> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(28, 32, 24, 12),
          child: Text(title, style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: AppColors.lightGrey.withOpacity(0.3)),
            ),
            child: Column(
              children: items.asMap().entries.map((entry) {
                final isLast = entry.key == items.length - 1;
                final item = entry.value;
                return Column(
                  children: [
                    ListTile(
                      onTap: item.onTap,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                      leading: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(color: item.color.withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
                        child: Icon(item.icon, color: item.color, size: 22),
                      ),
                      title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                      subtitle: Text(item.subtitle, style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
                      trailing: item.trailing ?? const Icon(Icons.chevron_right_rounded, color: AppColors.lightGrey),
                    ),
                    if (!isLast) Divider(height: 1, color: AppColors.lightGrey.withOpacity(0.3), indent: 70),
                  ],
                );
              }).toList(),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSecurityBadge() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(30), border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2))),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.verified_user_rounded, color: Color(0xFF10B981), size: 16),
          SizedBox(width: 8),
          Text('Secured by AES-256 Encryption', style: TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

class _SecurityItem {
  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final Widget? trailing;
  final VoidCallback onTap;

  _SecurityItem({required this.icon, required this.title, required this.subtitle, required this.color, this.trailing, required this.onTap});
}

