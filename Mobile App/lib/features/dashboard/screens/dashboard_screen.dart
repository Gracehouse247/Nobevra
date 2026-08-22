import 'dart:ui';
import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/widgets/animated_interactive_card.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/expenses/controllers/expense_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/revenue_analytics_controller.dart';
import 'package:noble_invoice/features/dashboard/widgets/dashboard_header.dart';
import 'package:noble_invoice/features/dashboard/widgets/action_cards.dart';
import 'package:noble_invoice/features/dashboard/widgets/recent_activity_list.dart';
import 'package:noble_invoice/features/invoicing/widgets/dashboard/aging_report_widget.dart';
import 'package:noble_invoice/features/dashboard/widgets/predictive_action_hub.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final profileCtrl = context.read<ProfileController>();
      if (profileCtrl.profile == null && !profileCtrl.isLoading) profileCtrl.loadProfile();
      
      final invoiceCtrl = context.read<InvoiceController>();
      if (invoiceCtrl.summary.totalCount == 0) invoiceCtrl.fetchSummary();

      final expenseCtrl = context.read<ExpenseController>();
      if (expenseCtrl.expenses.isEmpty && !expenseCtrl.isLoading) expenseCtrl.loadAll();

      final revenueCtrl = context.read<RevenueAnalyticsController>();
      if (!revenueCtrl.isLoading) revenueCtrl.load();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: Stack(
        children: [
          // ── Aesthetic Background Gradients (Vibrant Noble Glass Backdrop) ──
          Positioned(
            top: -150, right: -100,
            child: Container(
              width: 400, height: 400, 
              decoration: BoxDecoration(
                shape: BoxShape.circle, 
                gradient: RadialGradient(colors: [AppColors.primary.withOpacity(0.18), Colors.transparent])
              )
            ),
          ),
          Positioned(
            top: 220, left: -150,
            child: Container(
              width: 380, height: 380, 
              decoration: BoxDecoration(
                shape: BoxShape.circle, 
                gradient: RadialGradient(colors: [const Color(0xFF8B5CF6).withOpacity(0.15), Colors.transparent])
              )
            ),
          ),
          Positioned(
            bottom: 120, right: -120,
            child: Container(
              width: 350, height: 350, 
              decoration: BoxDecoration(
                shape: BoxShape.circle, 
                gradient: RadialGradient(colors: [const Color(0xFF06B6D4).withOpacity(0.12), Colors.transparent])
              )
            ),
          ),

          // ── Scrollable Content Area ──────────────────────────────────────────
          Positioned.fill(
            child: RefreshIndicator(
              onRefresh: () async {
                await context.read<ProfileController>().loadProfile();
                await context.read<InvoiceController>().fetchSummary();
                await context.read<ExpenseController>().loadAll();
                await context.read<RevenueAnalyticsController>().load();
              },
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: EdgeInsets.only(
                  left: 24.0,
                  right: 24.0,
                  top: MediaQuery.of(context).padding.top + 96.0, // Space for floating Glass AppBar
                  bottom: 140.0,
                ),
                child: Consumer4<ProfileController, InvoiceController, ExpenseController, RevenueAnalyticsController>(
                  builder: (context, profileCtrl, invoiceCtrl, expenseCtrl, revenueCtrl, child) {
                    final summary = invoiceCtrl.summary;
                    
                    final totalRevenue = summary.paid;
                    final totalExpenses = expenseCtrl.expenses.fold(0.0, (sum, e) => sum + e.amount);
                    final netProfit = totalRevenue - totalExpenses;
                    
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // 1. Premium Revenue Card with Sparkline
                        FadeInDown(
                          delay: const Duration(milliseconds: 200),
                          child: DashboardHeader(
                            netProfit: netProfit,
                            revenue: totalRevenue,
                            expenses: totalExpenses,
                            revenueCtrl: revenueCtrl,
                          ),
                        ),
                        const SizedBox(height: 24),
                        
                        FadeInUp(
                          delay: const Duration(milliseconds: 300),
                          child: const PredictiveActionHub(),
                        ),
                        const SizedBox(height: 24),
                        
                        // 2.1 Advanced Business Insights: Aging Report
                        if (invoiceCtrl.agingSummary.totalOverdue > 0)
                          FadeInUp(
                            delay: const Duration(milliseconds: 350),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 0),
                              child: AgingReportWidget(aging: invoiceCtrl.agingSummary),
                            ),
                          ),
                        
                        const SizedBox(height: 20),

                        // 3. Quick Actions
                        FadeInUp(
                          delay: const Duration(milliseconds: 400),
                          child: const ActionCards(),
                        ),
                        const SizedBox(height: 24),
                        
                        // 3. Recent Activity
                        FadeInUp(
                          delay: const Duration(milliseconds: 600),
                          child: RecentActivityList(
                            invoiceCtrl: invoiceCtrl,
                            expenseCtrl: expenseCtrl,
                            limit: 3,
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),
          ),

          // ── Frosted Premium Floating AppBar (Noble Glass 2.0) ───────────────
          Positioned(
            top: 0, left: 0, right: 0,
            child: Consumer<ProfileController>(
              builder: (context, profileCtrl, _) {
                final profile = profileCtrl.profile;
                return ClipRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                    child: Container(
                      padding: EdgeInsets.only(
                        top: MediaQuery.of(context).padding.top + 16,
                        left: 24,
                        right: 24,
                        bottom: 16,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.65),
                        border: Border(
                          bottom: BorderSide(
                            color: Colors.white.withOpacity(0.6),
                            width: 1.5,
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  'WELCOME BACK,', 
                                  style: TextStyle(
                                    color: Colors.blueGrey.shade400, 
                                    fontSize: 9, 
                                    fontWeight: FontWeight.w900, 
                                    letterSpacing: 1.5,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  profile?.displayName ?? "Noble Entrepreneur", 
                                  style: const TextStyle(
                                    color: Color(0xFF0F172A), 
                                    fontSize: 22, 
                                    fontWeight: FontWeight.w900, 
                                    letterSpacing: -0.6,
                                    height: 1.1,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          _buildAvatar(profile),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FadeInUp(
        delay: const Duration(milliseconds: 1000),
        child: FloatingActionButton.extended(
          onPressed: () => Navigator.pushNamed(context, AppRoutes.aiAssistant),
          backgroundColor: AppColors.primaryDark,
          elevation: 4,
          icon: const Icon(Icons.auto_awesome_rounded, color: Colors.white),
          label: const Text('Ask Noble AI', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900)),
        ),
      ),
    );
  }

  Widget _buildAvatar(profile) {
    return AnimatedInteractiveCard(
      onTap: () => Navigator.pushNamed(context, AppRoutes.profileOverview),
      child: Container(
        width: 56, height: 56,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
          boxShadow: [BoxShadow(color: AppColors.primary.withOpacity(0.1), blurRadius: 20, offset: const Offset(0, 10))],
          border: Border.all(color: Colors.white, width: 3),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(28),
          child: profile?.avatarPath != null 
            ? Image.network(profile!.avatarPath!, fit: BoxFit.cover)
            : const Icon(Icons.person_rounded, color: AppColors.primary, size: 28),
        ),
      ),
    );
  }
}

