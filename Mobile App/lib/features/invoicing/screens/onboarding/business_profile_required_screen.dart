import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/invoicing/screens/onboarding/invoice_onboarding_carousel.dart';

class BusinessProfileRequiredScreen extends StatelessWidget {
  const BusinessProfileRequiredScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final profile = context.watch<ProfileController>().profile;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final hasProfile = profile != null &&
          (profile.businessName?.isNotEmpty == true ||
           profile.company?.isNotEmpty == true);
      if (hasProfile) {
        Navigator.pushReplacementNamed(context, AppRoutes.clientSelection);
      }
    });

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close_rounded, color: AppColors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Premium Invoicing',
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: AppColors.black, letterSpacing: -0.5),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Column(
              children: [
                const SizedBox(height: 12),
                
                // ── Premium Carousel ──────────────────────────────────────────
                const InvoiceOnboardingCarousel(),
                
                const SizedBox(height: 32),

                // ── Title ────────────────────────────────────────────────────
                const Text(
                  'Build Your Million-Dollar Brand',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 22,
                    color: AppColors.black,
                    letterSpacing: -0.8,
                  ),
                ),
                const SizedBox(height: 12),

                // ── Description ──────────────────────────────────────────────
                Text(
                  'Nobevra provides professional, high-end invoice templates designed to help you get paid faster and look world-class.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 14,
                    height: 1.5,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 48),

                // ── Primary CTA ──────────────────────────────────────────────
                SizedBox(
                  width: double.infinity,
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.primary.withOpacity(0.2),
                          blurRadius: 12,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    child: ElevatedButton(
                      onPressed: () => Navigator.pushNamed(
                        context,
                        AppRoutes.invoiceBranding,
                        arguments: {'fromInvoicing': true},
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(24),
                        ),
                        elevation: 0,
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Start My Business Profile',
                            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                          ),
                          SizedBox(width: 12),
                          Icon(Icons.arrow_forward_rounded, size: 20),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // ── Feature Badge ───────────────────────────────────────────
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.verified_user_rounded, color: Colors.green, size: 14),
                      SizedBox(width: 8),
                      Text(
                        'Secure • Compliant • Professional',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF64748B)),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
