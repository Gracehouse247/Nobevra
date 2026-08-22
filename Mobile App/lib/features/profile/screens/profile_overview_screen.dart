import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/shared/widgets/logout_confirmation_modal.dart';
import 'package:noble_invoice/features/shared/widgets/pro_badge_avatar.dart';
import 'package:animate_do/animate_do.dart';
import 'package:noble_invoice/core/widgets/currency_picker_sheet.dart';

class ProfileOverviewScreen extends StatefulWidget {
  const ProfileOverviewScreen({super.key});

  @override
  State<ProfileOverviewScreen> createState() => _ProfileOverviewScreenState();
}

class _ProfileOverviewScreenState extends State<ProfileOverviewScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ProfileController>().loadProfile();
      context.read<SubscriptionController>().loadSubscription();
    });
  }

  @override
  Widget build(BuildContext context) {
    final profileCtrl = context.watch<ProfileController>();
    
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildPremiumHeader(context, profileCtrl),
            const SizedBox(height: 32),
            
            _buildSettingsSection(context, title: 'ACCOUNT SETTINGS', items: [
              _SettingsItem(icon: Icons.person_outline_rounded, title: 'Personal Info', color: Colors.blue, onTap: () => Navigator.pushNamed(context, AppRoutes.editProfile)),
              _SettingsItem(icon: Icons.business_outlined, title: 'Invoicing Defaults', color: Colors.indigo, onTap: () => Navigator.pushNamed(context, AppRoutes.invoiceModuleSettings)),
              _SettingsItem(icon: Icons.shield_outlined, title: 'Security', color: Colors.green, onTap: () => Navigator.pushNamed(context, AppRoutes.securitySettings)),
              _SettingsItem(icon: Icons.wallet_rounded, title: 'Payments', color: Colors.amber.shade600, onTap: () => Navigator.pushNamed(context, AppRoutes.paymentMethods)),
              _SettingsItem(icon: Icons.people_alt_rounded, title: 'Team', color: Colors.indigo.shade400, onTap: () => Navigator.pushNamed(context, AppRoutes.teamManagement)),
            ]),
            
            _buildSettingsSection(context, title: 'BUSINESS TOOLKIT', items: [
              _SettingsItem(icon: Icons.palette_rounded, title: 'Brand Kit', color: Colors.orange, onTap: () => Navigator.pushNamed(context, AppRoutes.brandKit)),
              _SettingsItem(icon: Icons.account_balance_rounded, title: 'Bank Info', color: Colors.blue.shade800, onTap: () => Navigator.pushNamed(context, AppRoutes.payoutSettings)),
              _SettingsItem(icon: Icons.badge_rounded, title: 'Identity', color: Colors.pink, onTap: () => Navigator.pushNamed(context, AppRoutes.businessCardDesigner)),
              _SettingsItem(icon: Icons.analytics_rounded, title: 'Analytics', color: Colors.blue.shade600, onTap: () => Navigator.pushNamed(context, AppRoutes.revenueAnalytics)),
              _SettingsItem(icon: Icons.collections_rounded, title: 'Gallery', color: Colors.teal, onTap: () => Navigator.pushNamed(context, AppRoutes.assetGallery)),
            ]),
            
            _buildSettingsSection(context, title: 'APP PREFERENCES', items: [
              _SettingsItem(icon: Icons.notifications_none_rounded, title: 'Alerts', color: Colors.pink, onTap: () => Navigator.pushNamed(context, AppRoutes.notificationSettings)),
              _SettingsItem(icon: Icons.palette_outlined, title: 'Appearance', color: Colors.blueGrey, onTap: () => Navigator.pushNamed(context, AppRoutes.appearanceSettings)),
              _SettingsItem(icon: Icons.currency_exchange_rounded, title: 'Currency', color: Colors.green.shade600, onTap: () => _showCurrencyPicker(context, profileCtrl)),
            ]),
            
            _buildSettingsSection(context, title: 'SUPPORT & LEGAL', items: [
              _SettingsItem(icon: Icons.help_outline_rounded, title: 'Help Center', color: Colors.blue.shade400, onTap: () => Navigator.pushNamed(context, AppRoutes.helpCenter)),
              _SettingsItem(icon: Icons.description_outlined, title: 'Terms', color: Colors.grey.shade700, onTap: () => Navigator.pushNamed(context, AppRoutes.legal, arguments: 'Terms of Service')),
              _SettingsItem(icon: Icons.privacy_tip_outlined, title: 'Privacy', color: Colors.teal.shade600, onTap: () => Navigator.pushNamed(context, AppRoutes.legal, arguments: 'Privacy Policy')),
            ]),
            
            _buildLogoutButton(context),
            const SizedBox(height: 120),
          ],
        ),
      ),
    );
  }

  Widget _buildPremiumHeader(BuildContext context, ProfileController ctrl) {
    final profile = ctrl.profile;
    final sub = context.watch<SubscriptionController>();
    final isPremium = sub.isPulseOrElite;
    final planName = sub.isElite ? 'Elite' : (sub.isPulseOrElite ? 'Pulse' : 'Solo');
    
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.primary.withOpacity(0.15),
            AppColors.primary.withOpacity(0.05),
          ],
        ),
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(40),
          bottomRight: Radius.circular(40),
        ),
      ),
      child: ClipRRect(
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(40),
          bottomRight: Radius.circular(40),
        ),
        child: Stack(
          children: [
            Positioned(
              top: -50,
              right: -50,
              child: Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.05),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            Positioned(
              bottom: -30,
              left: -20,
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.05),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            
            SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const SizedBox(width: 40), 
                        FadeInDown(
                          duration: const Duration(milliseconds: 600),
                          child: Text(
                            'PREFERENCES',
                            style: TextStyle(
                              color: AppColors.primary.withOpacity(0.6),
                              fontWeight: FontWeight.w900,
                              fontSize: 10,
                              letterSpacing: 3.0,
                            ),
                          ),
                        ),
                        _buildHeaderIconButton(
                          icon: Icons.refresh_rounded,
                          onTap: () {
                            context.read<SubscriptionController>().init();
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Syncing subscription status...'), behavior: SnackBarBehavior.floating),
                            );
                          },
                          size: 18,
                        ),
                        _buildHeaderIconButton(
                          icon: Icons.qr_code_scanner_rounded,
                          onTap: () => Navigator.pushNamed(context, AppRoutes.qrTypeSelection),
                          size: 18,
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    
                    FadeInUp(
                      duration: const Duration(milliseconds: 500),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Stack(
                            alignment: Alignment.center,
                            children: [
                              ProBadgeAvatar(
                                imageUrl: profile?.avatarPath,
                                initials: profile?.initials ?? '?',
                                isPro: isPremium,
                                radius: 40,
                              ),
                              Positioned(
                                bottom: 0, right: 0,
                                child: Hero(
                                  tag: 'profile_edit_fab',
                                  child: Material(
                                    color: Colors.white,
                                    elevation: 4,
                                    shape: const CircleBorder(),
                                    child: InkWell(
                                      onTap: () => Navigator.pushNamed(context, AppRoutes.editProfile),
                                      borderRadius: BorderRadius.circular(20),
                                      child: const Padding(
                                        padding: EdgeInsets.all(6),
                                        child: Icon(Icons.mode_edit_outline_rounded, color: AppColors.primary, size: 14),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                if (ctrl.isLoading)
                                  const SizedBox(height: 28, width: 140, child: LinearProgressIndicator(color: AppColors.primary))
                                else ...[
                                  Text('Hi, ${profile?.displayName ?? 'Noble User'}',
                                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppColors.textBlack, letterSpacing: -0.5),
                                    maxLines: 1, overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 4),
                                  Text(profile?.email ?? 'Verification Pending',
                                    style: const TextStyle(color: AppColors.darkGrey, fontSize: 13, fontWeight: FontWeight.w600),
                                    maxLines: 1, overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    const SizedBox(height: 24),
                    if (!isPremium)
                      Center(
                        child: ElevatedButton(
                          onPressed: () => Navigator.pushNamed(context, AppRoutes.pricingPlans),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary, foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                            elevation: 0,
                          ),
                          child: const Text('Upgrade to Pro', style: TextStyle(fontWeight: FontWeight.w900)),
                        ),
                      )
                    else 
                      Center(
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: AppColors.primary.withOpacity(0.2)),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.workspace_premium_rounded, color: AppColors.primary, size: 16),
                              const SizedBox(width: 8),
                              Text(
                                'Noble $planName Active',
                                style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.w800, fontSize: 12),
                              ),
                            ],
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeaderIconButton({required IconData icon, required VoidCallback onTap, double size = 28}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.primary.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: AppColors.primary, size: size),
      ),
    );
  }

  Widget _buildSettingsSection(BuildContext context, {required String title, required List<_SettingsItem> items}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(28, 8, 24, 16),
          child: Text(
            title,
            style: const TextStyle(
              color: Colors.grey,
              fontSize: 11,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.5,
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: GridView.count(
            shrinkWrap: true,
            padding: EdgeInsets.zero,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 3,
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            childAspectRatio: 0.9,
            children: items.map((item) => _buildTypeCard(item)).toList(),
          ),
        ),
        const SizedBox(height: 32),
      ],
    );
  }

  Widget _buildTypeCard(_SettingsItem item) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: item.onTap,
          borderRadius: BorderRadius.circular(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 52,
                height: 52,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      item.color.withOpacity(0.1),
                      item.color.withOpacity(0.05),
                    ],
                  ),
                  shape: BoxShape.circle,
                ),
                child: Icon(item.icon, color: item.color, size: 26),
              ),
              const SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Text(
                  item.title,
                  textAlign: TextAlign.center,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textBlack,
                    height: 1.15,
                    letterSpacing: -0.2,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogoutButton(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(children: [
        ElevatedButton.icon(
          onPressed: () {
            showModalBottomSheet(
              context: context,
              backgroundColor: Colors.transparent,
              builder: (context) => const LogoutConfirmationModal(),
            );
          },
          icon: const Icon(Icons.logout_rounded, size: 20),
          label: const Text('Logout Account', style: TextStyle(fontWeight: FontWeight.bold)),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red.shade50, foregroundColor: Colors.red,
            minimumSize: const Size(double.infinity, 60),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)), elevation: 0),
        ),
        const SizedBox(height: 16),
        const Text('Nobevra v1.0.0', style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w500)),
      ]),
    );
  }

  void _showCurrencyPicker(BuildContext context, ProfileController ctrl) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => FractionallySizedBox(
        heightFactor: 0.85,
        child: CurrencyPickerSheet(
          currentCurrency: ctrl.preferredCurrency,
          onSelect: (newCurrency) {
            ctrl.updateCurrency(newCurrency);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Currency updated to $newCurrency')),
            );
          },
        ),
      ),
    );
  }
}

class _SettingsItem {
  final IconData icon;
  final String title;
  final Color color;
  final VoidCallback onTap;
  _SettingsItem({required this.icon, required this.title, required this.color, required this.onTap});
}
