import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class HelpCenterScreen extends StatelessWidget {
  const HelpCenterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildPremiumHeader(context),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 32),
                  const Text(
                    'QUICK CATEGORIES',
                    style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5),
                  ),
                  const SizedBox(height: 16),
                  _buildCategoriesGrid(context),
                  const SizedBox(height: 32),
                  const Text(
                    'COMMON RESOURCES',
                    style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5),
                  ),
                  const SizedBox(height: 16),
                  _buildResourceItem(Icons.menu_book_rounded, 'App Guides & Docs', 'Read our detailed instructions', Colors.indigo, () {}),
                  const SizedBox(height: 12),
                  _buildResourceItem(Icons.security_rounded, 'Privacy & Security', 'Your data protection settings', Colors.green, () => Navigator.pushNamed(context, AppRoutes.privacyPolicy)),
                  const SizedBox(height: 32),
                  const Text(
                    'DIRECT SUPPORT',
                    style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5),
                  ),
                  const SizedBox(height: 16),
                  _buildSupportActionRow(
                    context,
                    Icons.chat_bubble_rounded,
                    'Live Support Chat',
                    'Real-time help from our active agents',
                    AppRoutes.liveSupportChat,
                    Colors.blue,
                  ),
                  const SizedBox(height: 12),
                  _buildSupportActionRow(
                    context,
                    Icons.bug_report_rounded,
                    'Report Technical Issue',
                    'Submit bugs or app errors securely',
                    AppRoutes.reportIssue,
                    Colors.red,
                  ),
                  const SizedBox(height: 12),
                  _buildSupportActionRow(
                    context,
                    Icons.tips_and_updates_rounded,
                    'Suggest a Feature',
                    'Help us build the ultimate toolkit',
                    AppRoutes.featureSuggestion,
                    Colors.orange,
                  ),
                  const SizedBox(height: 32),
                  _buildSupportActions(context),
                  const SizedBox(height: 48),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPremiumHeader(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.primary,
            AppColors.primaryDark,
          ],
        ),
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(40),
          bottomRight: Radius.circular(40),
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.1),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
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
                  color: Colors.white.withOpacity(0.1),
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
                  color: Colors.white.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 16, 24, 40),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildHeaderIconButton(
                          icon: Icons.chevron_left_rounded,
                          onTap: () => Navigator.pop(context),
                        ),
                        Text(
                          'HELP CENTER',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.8),
                            fontWeight: FontWeight.w900,
                            fontSize: 12,
                            letterSpacing: 2.0,
                          ),
                        ),
                        _buildHeaderIconButton(
                          icon: Icons.notifications_none_rounded,
                          onTap: () {},
                          size: 18,
                        ),
                      ],
                    ),
                    const SizedBox(height: 32),
                    const Text(
                      'Nobevra Support\nHow can we help you?',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        height: 1.2,
                        fontWeight: FontWeight.w900,
                        letterSpacing: -0.5,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: Colors.white.withOpacity(0.1)),
                      ),
                      child: TextField(
                        style: const TextStyle(color: Colors.white, fontSize: 14),
                        decoration: InputDecoration(
                          hintText: 'Search for articles, guides, or features...',
                          hintStyle: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 14),
                          border: InputBorder.none,
                          icon: const Icon(Icons.search_rounded, color: Colors.white, size: 20),
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
          color: Colors.white.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: Colors.white, size: size),
      ),
    );
  }

  Widget _buildCategoriesGrid(BuildContext context) {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 3,
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      childAspectRatio: 0.9,
      children: [
        _buildCategoryCard(Icons.rocket_launch_rounded, 'Onboarding', AppColors.primary, () => Navigator.pushNamed(context, AppRoutes.faq)),
        _buildCategoryCard(Icons.receipt_long_rounded, 'Invoicing', const Color(0xFF10B981), () => Navigator.pushNamed(context, AppRoutes.faq)),
        _buildCategoryCard(Icons.qr_code_scanner_rounded, 'QR Tools', Colors.orange, () => Navigator.pushNamed(context, AppRoutes.faq)),
        _buildCategoryCard(Icons.auto_awesome_rounded, 'AI Engine', Colors.purple, () => Navigator.pushNamed(context, AppRoutes.faq)),
        _buildCategoryCard(Icons.inventory_2_rounded, 'Inventory', Colors.teal, () {}),
        _buildCategoryCard(Icons.groups_rounded, 'Teams', Colors.indigo, () {}),
      ],
    );
  }

  Widget _buildCategoryCard(IconData icon, String title, Color color, VoidCallback onTap) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      color.withOpacity(0.1),
                      color.withOpacity(0.1),
                    ],
                  ),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 22),
              ),
              const SizedBox(height: 12),
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textBlack,
                  letterSpacing: -0.2,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildResourceItem(IconData icon, String title, String subtitle, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.lightGrey.withOpacity(0.1)),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
              child: Icon(icon, color: color, size: 20),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: TextStyle(color: Colors.grey.shade500, fontSize: 11, fontWeight: FontWeight.w500)),
                ],
              ),
            ),
            Icon(Icons.chevron_right_rounded, color: Colors.grey.shade300),
          ],
        ),
      ),
    );
  }

  Widget _buildSupportActionRow(BuildContext context, IconData icon, String title, String subtitle, String route, Color color) {
    return _buildResourceItem(icon, title, subtitle, color, () => Navigator.pushNamed(context, route));
  }

  Widget _buildSupportActions(BuildContext context) {
    return Column(
      children: [
        ElevatedButton.icon(
          onPressed: () => Navigator.pushNamed(context, AppRoutes.contactSupport),
          icon: const Icon(Icons.forum_rounded),
          label: const Text('Initiate Live Support', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            minimumSize: const Size(double.infinity, 60),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            elevation: 8,
            shadowColor: AppColors.primary.withOpacity(0.1),
          ),
        ),
        const SizedBox(height: 16),
        TextButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.groups_rounded, color: Colors.grey),
          label: const Text('Join the Community', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
          style: TextButton.styleFrom(
            minimumSize: const Size(double.infinity, 56),
          ),
        ),
      ],
    );
  }
}
