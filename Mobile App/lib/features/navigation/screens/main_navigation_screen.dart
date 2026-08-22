import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:ui';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/features/dashboard/screens/dashboard_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/invoice_dashboard_screen.dart';
import 'package:noble_invoice/features/analytics/screens/financial_intelligence_dashboard.dart';
import 'package:noble_invoice/features/identity/screens/identity_vault_screen.dart';
import 'package:noble_invoice/features/profile/screens/profile_overview_screen.dart';
import 'package:noble_invoice/features/navigation/widgets/side_menu.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/widgets/glass_container.dart';
import 'package:noble_invoice/core/widgets/animated_interactive_card.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/expenses/controllers/expense_controller.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;
  bool _isSpeedDialOpen = false;

  @override
  void initState() {
    super.initState();
    // ── Phase 2: Start Subscription Engine ─────────────────────────────────────
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SubscriptionController>().init();
    });
  }

  final List<Widget> _screens = [
    const DashboardScreen(),
    const InvoiceDashboardScreen(),
    const FinancialIntelligenceDashboard(),
    const IdentityVaultScreen(),
    const ProfileOverviewScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      drawer: const SideMenu(),
      body: Stack(
        children: [
          IndexedStack(
            index: _currentIndex,
            children: _screens,
          ),
          
          if (_isSpeedDialOpen) _buildSpeedDialOverlay(),

          // Bottom Navigation
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: _buildBottomNav(),
          ),

          // Noble Action FAB
          Positioned(
            bottom: 100,
            right: 20,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                if (!_isSpeedDialOpen)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 8, right: 4),
                    child: Text(
                      'Quick Action',
                      style: AppTextStyles.bodySmall.copyWith(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w900,
                        fontSize: 10,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                _buildNobleFAB(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNav() {
    return Padding(
      padding: const EdgeInsets.only(left: 20, right: 20, bottom: 20),
      child: GlassContainer(
        borderRadius: BorderRadius.circular(40),
        blur: 20.0,
        opacity: 0.85,
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.9),
          borderRadius: BorderRadius.circular(40),
          border: Border.all(color: AppColors.lightGrey, width: 1.5),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 30,
              offset: const Offset(0, 10),
            )
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildNavItem(0, Icons.dashboard_rounded, 'Home'),
            _buildNavItem(1, Icons.receipt_long_rounded, 'Billing'),
            _buildNavItem(2, Icons.auto_graph_rounded, 'Intelligence'),
            _buildNavItem(3, Icons.vignette_rounded, 'Identity'),
            _buildNavItem(4, Icons.person_rounded, 'Settings'),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    bool isActive = _currentIndex == index;
    return AnimatedInteractiveCard(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(20),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOutBack,
        padding: EdgeInsets.symmetric(horizontal: isActive ? 12 : 6, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? AppColors.primaryDark : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: isActive ? Colors.white : AppColors.darkGrey,
              size: isActive ? 24 : 22,
            ),
            if (isActive) ...[
              const SizedBox(width: 6),
              Text(
                label,
                style: AppTextStyles.bodyMedium.copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ]
          ],
        ),
      ),
    );
  }

  Widget _buildNobleFAB() {
    return GestureDetector(
      onTap: () => setState(() => _isSpeedDialOpen = !_isSpeedDialOpen),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.elasticOut,
        width: 64,
        height: 64,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [AppColors.primaryDark, AppColors.primaryOcean],
          ),
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: AppColors.primaryDark.withOpacity(0.35),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: AnimatedRotation(
          turns: _isSpeedDialOpen ? 0.125 : 0,
          duration: const Duration(milliseconds: 300),
          child: const Icon(Icons.add_rounded, color: Colors.white, size: 36),
        ),
      ),
    );
  }

  Widget _buildSpeedDialOverlay() {
    return GestureDetector(
      onTap: () => setState(() => _isSpeedDialOpen = false),
      child: Container(
        color: Colors.black54.withOpacity(0.1),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
          child: Stack(
            children: [
              Positioned(
                bottom: 170,
                left: 0,
                right: 0,
                child: Column(
                  children: [
                    _buildDialItem(Icons.receipt_long_rounded, 'New Invoice', AppColors.primary, () {
                      Navigator.pushNamed(context, AppRoutes.invoiceTypeSelection);
                    }),
                    const SizedBox(height: 16),
                    _buildDialItem(Icons.local_fire_department_rounded, 'Log Expense', Colors.redAccent, () {
                      final teamId = context.read<TeamController>().activeTeamId;
                      context.read<ExpenseController>().setActiveTeamId(teamId);
                      Navigator.pushNamed(context, AppRoutes.addExpense);
                    }),
                    const SizedBox(height: 16),
                    _buildDialItem(Icons.qr_code_2_rounded, 'Quick QR', Colors.amber, () {
                      Navigator.pushNamed(context, AppRoutes.qrTypeSelection);
                    }),
                    const SizedBox(height: 16),
                    _buildDialItem(Icons.badge_rounded, 'Business Card', Colors.teal, () {
                      Navigator.pushNamed(context, AppRoutes.businessCardDesigner);
                    }),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDialItem(IconData icon, String label, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: () {
        setState(() => _isSpeedDialOpen = false);
        onTap();
      },
      child: Padding(
        padding: const EdgeInsets.only(right: 24),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10)],
              ),
              child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            ),
            const SizedBox(width: 16),
            Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                color: color,
                shape: BoxShape.circle,
                boxShadow: [BoxShadow(color: color.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 4))],
              ),
              child: Icon(icon, color: Colors.white, size: 24),
            ),
          ],
        ),
      ),
    );
  }
}
