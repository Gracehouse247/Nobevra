import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/auth/controllers/auth_controller.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: MediaQuery.of(context).size.width * 0.85,
      backgroundColor: Colors.white,
      child: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Row(
                children: [
                   Image.asset(
                    'assets/images/nobevra_logo.png',
                    height: 40, 
                  ),
                ],
              ),
            ),
            
            // Navigation
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _buildNavItem(Icons.dashboard_rounded, 'Dashboard', isActive: true, onTap: () => Navigator.pop(context)),
                  _buildNavItem(Icons.qr_code_2_rounded, 'Scan QR', onTap: () => Navigator.pushNamed(context, AppRoutes.qrTypeSelection)),
                  _buildNavItem(Icons.show_chart_rounded, 'QR Monitor', onTap: () => Navigator.pushNamed(context, AppRoutes.qrActivityMonitor)),
                  _buildNavItem(Icons.bar_chart_rounded, 'QR Performance', onTap: () => Navigator.pushNamed(context, AppRoutes.qrPerformanceInsights)),
                  _buildNavItem(Icons.folder_special_rounded, 'Saved Folders', onTap: () => Navigator.pushNamed(context, AppRoutes.qrFolders)),
                  _buildNavItem(Icons.palette_rounded, 'Brand Kit', onTap: () => Navigator.pushNamed(context, AppRoutes.brandKit)),
                  _buildNavItem(Icons.receipt_long_rounded, 'Invoices', onTap: () => Navigator.pushNamed(context, AppRoutes.invoiceDashboard)),
                  _buildNavItem(Icons.people_alt_rounded, 'Client CRM', onTap: () => Navigator.pushNamed(context, AppRoutes.crmDashboard)),
                  _buildNavItem(Icons.analytics_rounded, 'Analytics & Reports', onTap: () => Navigator.pushNamed(context, AppRoutes.exportReports)),
                  _buildNavItem(Icons.stars_rounded, 'Milestone', onTap: () => Navigator.pushNamed(context, AppRoutes.qrMilestone)),
                  _buildNavItem(Icons.card_giftcard_rounded, 'Refer a Friend', onTap: () => Navigator.pushNamed(context, AppRoutes.referral)),
                  _buildNavItem(Icons.help_outline_rounded, 'Help Center', onTap: () => Navigator.pushNamed(context, AppRoutes.helpCenter)),
                  _buildNavItem(Icons.admin_panel_settings_rounded, 'Admin Dashboard', onTap: () => Navigator.pushNamed(context, AppRoutes.adminDashboard)),
                  _buildNavItem(Icons.group_rounded, 'User Management', onTap: () => Navigator.pushNamed(context, AppRoutes.userManagement)),
                  _buildNavItem(Icons.security_rounded, 'Security Portal', onTap: () => Navigator.pushNamed(context, AppRoutes.adminSecurityPortal)),
                  _buildNavItem(Icons.settings_suggest_rounded, 'Invoice Settings', onTap: () => Navigator.pushNamed(context, AppRoutes.invoiceModuleSettings)),
                  _buildNavItem(Icons.settings_rounded, 'Business Identity', onTap: () => Navigator.pushNamed(context, AppRoutes.profileOverview)),
                ],
              ),
            ),
            
            // Promo & Profile
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  // Go Premium Card
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.primary.withOpacity(0.1)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Go Premium',
                          style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Unlock advanced analytics and bulk QR generation.',
                          style: TextStyle(color: AppColors.darkGrey, fontSize: 11),
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () => Navigator.pushNamed(context, AppRoutes.pricingPlans),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            ),
                            child: const Text('Upgrade Now', style: TextStyle(fontSize: 12)),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  
                  // Profile
                  Consumer<ProfileController>(
                    builder: (context, profileCtrl, _) {
                      final profile = profileCtrl.profile;
                      return Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.lightGrey.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Container(
                                width: 40,
                                height: 40,
                                color: AppColors.lightGrey.withOpacity(0.5),
                                  child: profile?.avatarPath != null 
                                    ? Image.network(profile!.avatarPath!, fit: BoxFit.cover)
                                    : const Icon(Icons.person_rounded, color: AppColors.darkGrey),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    profile?.displayName ?? 'User',
                                    style: const TextStyle(color: AppColors.black, fontSize: 14, fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    profile?.email ?? 'Not logged in',
                                    style: const TextStyle(color: AppColors.darkGrey, fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                            Icon(Icons.more_vert_rounded, color: AppColors.darkGrey.withOpacity(0.3)),
                          ],
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  
                  // Logout
                  SizedBox(
                    width: double.infinity,
                    child: TextButton.icon(
                      onPressed: () {
                        context.read<AuthController>().logout();
                        Navigator.pushNamedAndRemoveUntil(context, AppRoutes.welcome, (route) => false);
                      },
                      icon: const Icon(Icons.logout_rounded, color: Colors.redAccent, size: 20),
                      label: const Text(
                        'Logout',
                        style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold),
                      ),
                      style: TextButton.styleFrom(
                        backgroundColor: Colors.redAccent.withOpacity(0.1),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String title, {bool isActive = false, String? badge, required VoidCallback onTap}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: isActive ? AppColors.primary.withOpacity(0.1) : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            border: isActive ? Border.all(color: AppColors.primary.withOpacity(0.15)) : null,
          ),
          child: Row(
            children: [
              Icon(
                icon,
                color: isActive ? AppColors.primary : AppColors.darkGrey.withOpacity(0.6),
                size: 24,
              ),
              const SizedBox(width: 16),
              Text(
                title,
                style: TextStyle(
                  color: isActive ? AppColors.primary : AppColors.black.withOpacity(0.8),
                  fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
                  fontSize: 14,
                ),
              ),
              if (badge != null) ...[
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    badge,
                    style: const TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
              if (isActive) ...[
                const Spacer(),
                Container(
                  width: 6,
                  height: 6,
                  decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
