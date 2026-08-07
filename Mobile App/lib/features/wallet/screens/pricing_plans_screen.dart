import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/services/payment_gateway_service.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';

class PricingPlansScreen extends StatefulWidget {
  const PricingPlansScreen({super.key});

  @override
  State<PricingPlansScreen> createState() => _PricingPlansScreenState();
}

class _PricingPlansScreenState extends State<PricingPlansScreen> {
  bool _isYearly = true;
  bool _isFetchingOfferings = false;

  @override
  Widget build(BuildContext context) {
    final sub = context.watch<SubscriptionController>();
    final isPremium = sub.currentTier == SubscriptionTier.pulse || sub.currentTier == SubscriptionTier.elite;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: CustomScrollView(
        slivers: [
          _buildAppBar(context),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                children: [
                  const SizedBox(height: 12),
                  _buildHeader(),
                  const SizedBox(height: 32),
                  _buildToggle(),
                  const SizedBox(height: 40),
                  
                  if (!isPremium) ...[
                    _buildConsumptionPlan(context),
                    const SizedBox(height: 24),
                  ],
                  _buildPulsePlan(context),
                  const SizedBox(height: 24),
                  _buildElitePlan(context),
                  const SizedBox(height: 60),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConsumptionPlan(BuildContext context) {
    return _buildPlanCard(
      context,
      tier:    SubscriptionTier.consumption,
      title:   'Pulse GO',
      price:   '\$0',
      subtitle: 'Consumption Based (Pay-As-You-Go)',
      features: [
        'Pay per Invoice (\$1.00 each)',
        'Full Client Portal Access',
        'E-Signature Integration',
        'AI Sentiment Analysis',
        'Basic QR Code Branding',
      ],
      color: Colors.blueGrey,
      buttonText: 'Get Started',
    );
  }

  Widget _buildPulsePlan(BuildContext context) {
    return _buildPlanCard(
      context,
      tier:    SubscriptionTier.pulse,
      title:   'Noble Pulse',
      price:   _isYearly ? '\$99' : '\$9.99',
      subtitle: 'Scale your brand & visibility',
      features: [
        '12 Invoices per Month',
        'Unlimited AI CRM Insights',
        'Premium Client Portal',
        'Custom QR Branding',
        'Advanced Business Analytics',
        'Priority Multi-Currency Support',
      ],
      color: AppColors.primary,
      isPopular: true,
      buttonText: 'Upgrade to Pulse',
    );
  }

  Widget _buildElitePlan(BuildContext context) {
    return _buildPlanCard(
      context,
      tier:    SubscriptionTier.elite,
      title:   'Noble Elite',
      price:   _isYearly ? '\$240' : '\$24.99',
      subtitle: 'Maximum Power for Small Teams',
      features: [
        'Unlimited Everything',
        'Team Workspace (Up to 3)',
        'Global Signature Vault',
        'White-label Portal Domain',
        'Financial Intelligence Hub',
        'Dedicated Support Manager',
      ],
      color: const Color(0xFF6366F1), // Premium Indigo
      buttonText: 'Become Elite',
    );
  }

  Widget _buildAppBar(BuildContext context) {
    return SliverAppBar(
      expandedHeight: 0,
      backgroundColor: const Color(0xFFF8FAFC),
      elevation: 0,
      leading: IconButton(
        icon: const Icon(Icons.close_rounded, color: Colors.black),
        onPressed: () => Navigator.pop(context),
      ),
      pinned: true,
      centerTitle: true,
      title: const Text('Pricing Plans', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 16)),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        ShaderMask(
          shaderCallback: (bounds) => const LinearGradient(
            colors: [AppColors.primary, Color(0xFF6366F1)],
          ).createShader(bounds),
          child: const Text('Scale Your Business', 
            style: TextStyle(fontSize: 34, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -1.5)),
        ),
        const SizedBox(height: 12),
        const Text('Choose the plan that fits your growth stage.',
          textAlign: TextAlign.center,
          style: TextStyle(color: Color(0xFF64748B), fontSize: 16, fontWeight: FontWeight.w500)),
      ],
    );
  }

  Widget _buildToggle() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFE2E8F0),
        borderRadius: BorderRadius.circular(20),
      ),
      padding: const EdgeInsets.all(4),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _toggleItem('Monthly', !_isYearly),
          _toggleItem('Yearly (Save 20%)', _isYearly),
        ],
      ),
    );
  }

  Widget _toggleItem(String label, bool active) {
    return GestureDetector(
      onTap: () => setState(() => _isYearly = (label.contains('Yearly'))),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        decoration: BoxDecoration(
          color: active ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(16),
          boxShadow: active ? [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))] : [],
        ),
        child: Text(label, style: TextStyle(fontWeight: active ? FontWeight.w900 : FontWeight.w700, color: active ? AppColors.primary : const Color(0xFF64748B))),
      ),
    );
  }

  Widget _buildPlanCard(BuildContext context, {
    required SubscriptionTier tier,
    required String title,
    required String price,
    required String subtitle,
    required List<String> features,
    required Color color,
    required String buttonText,
    bool isPopular = false,
  }) {
    final sub = context.read<SubscriptionController>();
    final bool isCurrent = sub.currentTier == tier;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: isPopular ? color.withOpacity(0.3) : const Color(0xFFE2E8F0), width: 2),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.05),
            blurRadius: 40,
            offset: const Offset(0, 20),
          )
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (isPopular)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 10),
              decoration: BoxDecoration(
                color: color,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
              ),
              child: const Text('MOST RECOMMENDED', 
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
            ),
          Padding(
            padding: const EdgeInsets.all(28),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(title, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w900, letterSpacing: -0.5)),
                    if (isCurrent)
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: Colors.green.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                        child: const Text('ACTIVE', style: TextStyle(color: Colors.green, fontSize: 10, fontWeight: FontWeight.w900)),
                      ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(subtitle, style: const TextStyle(color: Color(0xFF64748B), fontSize: 14, fontWeight: FontWeight.w500)),
                const SizedBox(height: 24),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  children: [
                    Text(price, style: const TextStyle(fontSize: 42, fontWeight: FontWeight.w900, letterSpacing: -1)),
                    const SizedBox(width: 4),
                    if (tier != SubscriptionTier.consumption)
                      Text(_isYearly ? '/year' : '/month', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 16, fontWeight: FontWeight.w600)),
                  ],
                ),
                const SizedBox(height: 32),
                const Text('Includes:', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: Color(0xFF1E293B))),
                const SizedBox(height: 16),
                ...features.map((f) => Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: Row(
                    children: [
                      Icon(Icons.verified_rounded, color: color, size: 18),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(f, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Color(0xFF334155))),
                      ),
                    ],
                  ),
                )),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  height: 60,
                  child: ElevatedButton(
                    onPressed: isCurrent ? null : () async {
                      final profile = context.read<ProfileController>().profile;
                      if (profile == null) return;

                      final success = await PaymentGatewayService.processSubscription(
                        context: context,
                        userId: profile.id,
                        planName: title,
                        amount: double.parse(price.replaceAll('\$', '')),
                        email: profile.email,
                        fullName: profile.displayName ?? 'Noble User',
                        phoneNumber: profile.phone ?? '',
                        billingPeriod: _isYearly ? 'yearly' : 'monthly',
                      );

                      if (!mounted) return;
                      if (success) Navigator.pushReplacementNamed(context, '/upgrade-success');
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isCurrent ? const Color(0xFFF1F5F9) : color,
                      foregroundColor: isCurrent ? const Color(0xFF94A3B8) : Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                      elevation: 0,
                    ),
                    child: Text(isCurrent ? 'Current Plan' : buttonText, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
}
