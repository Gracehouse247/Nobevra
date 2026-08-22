import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import 'package:noble_invoice/features/wallet/controllers/payment_controller.dart';
import 'package:noble_invoice/features/wallet/models/payment_methods.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'payment_webview_screen.dart';

class PaymentSelectionModal extends StatelessWidget {
  final String planId;
  final double basePrice; // in USD — backend converts to local currency

  const PaymentSelectionModal({
    super.key,
    required this.planId,
    required this.basePrice,
  });

  @override
  Widget build(BuildContext context) {
    final profileCtrl = context.read<ProfileController>();
    final profile = profileCtrl.profile;
    // UserProfile doesn't have countryCode yet, so we'll default to US or infer from locale optionally.
    const countryCode = 'US';
    final methods = PaymentMapping.getMethodsForCountry(countryCode);
    final ctrl = context.watch<PaymentController>();

    return Container(
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 32,
        bottom: MediaQuery.of(context).viewInsets.bottom + 32,
      ),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Header ────────────────────────────────────────────────────
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Choose Payment Method',
                      style: AppTextStyles.bodyLarge.copyWith(
                        fontWeight: FontWeight.w900,
                        fontSize: 20,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Showing options for your region (${countryCode.toUpperCase()})',
                      style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close_rounded),
                visualDensity: VisualDensity.compact,
              ),
            ],
          ),

          const SizedBox(height: 24),

          // ── Order Summary ──────────────────────────────────────────────
          _buildOrderSummary(basePrice),

          const SizedBox(height: 24),

          // ── Error Banner ───────────────────────────────────────────────
          if (ctrl.status == PaymentStatus.error && ctrl.errorMessage.isNotEmpty)
            _buildErrorBanner(ctrl.errorMessage),

          // ── Payment Methods ────────────────────────────────────────────
          ...methods.map((method) => _buildMethodTile(context, method, ctrl)),

          const SizedBox(height: 20),

          // ── Security Footer ────────────────────────────────────────────
          _buildSecurityFooter(),
        ],
      ),
    );
  }

  Widget _buildOrderSummary(double price) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary.withOpacity(0.06), AppColors.primary.withOpacity(0.02)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.primary.withOpacity(0.15)),
      ),
      child: Column(
        children: [
          _summaryRow('Nobevra Pro (Monthly)', '\$${price.toStringAsFixed(2)}'),
          const SizedBox(height: 12),
          Divider(color: AppColors.primary.withOpacity(0.15)),
          const SizedBox(height: 12),
          _summaryRow(
            'Total',
            '\$${price.toStringAsFixed(2)}',
            isBold: true,
          ),
        ],
      ),
    );
  }

  Widget _summaryRow(String label, String value, {bool isBold = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            color: isBold ? Colors.black : Colors.grey.shade700,
            fontWeight: isBold ? FontWeight.bold : FontWeight.w500,
            fontSize: isBold ? 16 : 13,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            color: isBold ? AppColors.primary : Colors.black87,
            fontWeight: isBold ? FontWeight.w900 : FontWeight.w600,
            fontSize: isBold ? 18 : 13,
          ),
        ),
      ],
    );
  }

  Widget _buildErrorBanner(String message) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red.shade50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.red.shade200),
      ),
      child: Row(
        children: [
          Icon(Icons.error_outline_rounded, color: Colors.red.shade600, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              message,
              style: TextStyle(color: Colors.red.shade700, fontSize: 13, fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMethodTile(BuildContext context, PaymentMethod method, PaymentController ctrl) {
    final isGatewayFlw = method.gateway == PaymentGateway.flutterwave;
    final gatewayLabel = isGatewayFlw ? 'Flutterwave' : 'Paystack';
    final gatewayColor = isGatewayFlw ? const Color(0xFFF5A623) : const Color(0xFF00C3F7);
    final isLoading = ctrl.isInitiating;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.6)),
        borderRadius: BorderRadius.circular(18),
      ),
      child: InkWell(
        onTap: isLoading ? null : () => _handlePayment(context, method),
        borderRadius: BorderRadius.circular(18),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              // Icon
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Icon(method.icon, color: AppColors.primary, size: 24),
              ),
              const SizedBox(width: 16),

              // Labels
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      method.name,
                      style: AppTextStyles.bodyMedium.copyWith(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      method.description,
                      style: TextStyle(color: Colors.grey.shade500, fontSize: 11.5),
                    ),
                  ],
                ),
              ),

              // Gateway Badge
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: gatewayColor.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      gatewayLabel,
                      style: TextStyle(
                        color: gatewayColor,
                        fontSize: 9,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 0.3,
                      ),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Icon(
                    Icons.arrow_forward_ios_rounded,
                    color: Colors.grey.shade400,
                    size: 14,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSecurityFooter() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.lock_rounded, size: 13, color: Colors.grey.shade400),
        const SizedBox(width: 6),
        Text(
          'End-to-end encrypted · Flutterwave & Paystack secured',
          style: TextStyle(
            color: Colors.grey.shade400,
            fontSize: 11,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  // ── Core logic ─────────────────────────────────────────────────────────

  Future<void> _handlePayment(BuildContext context, PaymentMethod method) async {
    final ctrl = context.read<PaymentController>();
    final profile = context.read<ProfileController>().profile;

    // 1. Hit backend → get in-app checkout URL + tx_ref
    final initResult = await ctrl.beginPayment(
      planId: planId,
      amount: basePrice,
      method: method,
      userEmail: profile?.email ?? '',
      userName: profile?.displayName ?? '',
      userPhone: profile?.phone ?? '',
    );

    if (initResult == null || !context.mounted) return;

    // 2. Open in-app WebView (never opens a browser)
    final result = await Navigator.push<PaymentResult>(
      context,
      MaterialPageRoute(
        fullscreenDialog: true,
        builder: (_) => PaymentWebViewScreen(
          checkoutUrl: initResult.checkoutUrl,
          txRef: initResult.txRef,
          gateway: initResult.gateway,
        ),
      ),
    );

    if (!context.mounted) return;

    // 3. Handle result
    final paymentResult = result ?? PaymentResult(
      isSuccess: false,
      txRef: initResult.txRef,
      gateway: initResult.gateway,
      failureReason: 'Payment window closed unexpectedly.',
    );

    ctrl.handleWebViewResult(paymentResult);

    if (paymentResult.isSuccess) {
      Navigator.pop(context, true); // Signal success to caller (e.g. PricingPlansScreen)
    }
    // On failure the error banner in the modal will display the reason
  }
}
