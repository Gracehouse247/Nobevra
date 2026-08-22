import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/wallet/controllers/payment_controller.dart';
import 'package:provider/provider.dart';

class PaymentMethodsScreen extends StatefulWidget {
  const PaymentMethodsScreen({super.key});

  @override
  State<PaymentMethodsScreen> createState() => _PaymentMethodsScreenState();
}

class _PaymentMethodsScreenState extends State<PaymentMethodsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PaymentController>().loadPaymentMethods();
    });
  }

  @override
  Widget build(BuildContext context) {
    final payment = context.watch<PaymentController>();
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Payment Methods', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: payment.isLoading 
        ? const Center(child: CircularProgressIndicator())
        : SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('SAVED CARDS', style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
                const SizedBox(height: 16),
                if (payment.savedMethods.isEmpty)
                  _buildEmptyState()
                else
                  ...payment.savedMethods.map((m) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _buildPaymentItem(
                      id: m.id,
                      icon: Icons.credit_card_rounded,
                      title: '${m.type.toUpperCase()} ending in ${m.last4}',
                      subtitle: 'Expires ${m.expiry}',
                      isDefault: m.isDefault,
                      cardColor: Colors.blueGrey,
                      onDelete: () => payment.removePaymentMethod(m.id),
                    ),
                  )),
                const SizedBox(height: 16),
                _buildApplePayItem(),
                const SizedBox(height: 32),
                _buildAddCardButton(context),
                const SizedBox(height: 48),
                _buildTrustIndicators(),
              ],
            ),
          ),
    );
  }

  Widget _buildEmptyState() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
      ),
      child: Column(
        children: [
          Icon(Icons.credit_card_off_rounded, size: 48, color: Colors.grey.shade300),
          const SizedBox(height: 16),
          const Text('No cards saved yet', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(height: 8),
          Text('Add a card to enable one-click business payments', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey.shade400, fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildPaymentItem({
    required String id,
    required IconData icon,
    required String title,
    required String subtitle,
    bool isDefault = false,
    required Color cardColor,
    required VoidCallback onDelete,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10, offset: const Offset(0, 4))],
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 32,
            decoration: BoxDecoration(color: cardColor.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
            child: Icon(icon, color: cardColor, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                    if (isDefault) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(4)),
                        child: const Text('DEFAULT', style: TextStyle(color: AppColors.primary, fontSize: 8, fontWeight: FontWeight.w900)),
                      ),
                    ],
                  ],
                ),
                Text(subtitle, style: TextStyle(color: Colors.grey.shade500, fontSize: 12)),
              ],
            ),
          ),
          IconButton(
            icon: Icon(isDefault ? Icons.check_circle_rounded : Icons.delete_outline_rounded, color: isDefault ? AppColors.primary : Colors.red.shade300, size: 20),
            onPressed: isDefault ? null : onDelete,
          ),
        ],
      ),
    );
  }

  Widget _buildApplePayItem() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 32,
            decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(6)),
            child: const Icon(Icons.apple_rounded, color: Colors.white, size: 24),
          ),
          const SizedBox(width: 16),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Apple Pay', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                Text('Secured with FaceID', style: TextStyle(color: Colors.grey, fontSize: 12)),
              ],
            ),
          ),
          const Icon(Icons.chevron_right_rounded, color: AppColors.lightGrey),
        ],
      ),
    );
  }

  Widget _buildAddCardButton(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () => _showAddCardDialog(context),
      icon: const Icon(Icons.add_rounded),
      label: const Text('Add New Card', style: TextStyle(fontWeight: FontWeight.bold)),
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 60),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        elevation: 0,
      ),
    );
  }

  void _showAddCardDialog(BuildContext context) {
    final cardCtrl = TextEditingController();
    final expiryCtrl = TextEditingController();
    final cvvCtrl = TextEditingController();
    final nameCtrl = TextEditingController();
    final formKey = GlobalKey<FormState>();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: EdgeInsets.fromLTRB(24, 24, 24, MediaQuery.of(context).viewInsets.bottom + 40),
        decoration: const BoxDecoration(color: Colors.white, borderRadius: BorderRadius.vertical(top: Radius.circular(32))),
        child: Form(
          key: formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Add New Card', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.close_rounded)),
                ],
              ),
              const SizedBox(height: 24),
              _buildTextField(label: 'Cardholder Name', controller: nameCtrl, hint: 'e.g. John Doe', icon: Icons.person_outline_rounded),
              const SizedBox(height: 16),
              _buildTextField(
                label: 'Card Number', 
                controller: cardCtrl, 
                hint: '0000 0000 0000 0000', 
                icon: Icons.credit_card_rounded,
                keyboardType: TextInputType.number,
                validator: (v) => (v?.length ?? 0) < 16 ? 'Invalid card number' : null,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(child: _buildTextField(
                    label: 'Expiry', 
                    controller: expiryCtrl, 
                    hint: 'MM/YY', 
                    icon: Icons.calendar_today_rounded,
                    keyboardType: TextInputType.number,
                    validator: (v) => (v?.length ?? 0) < 4 ? 'Invalid' : null,
                  )),
                  const SizedBox(width: 16),
                  Expanded(child: _buildTextField(
                    label: 'CVV', 
                    controller: cvvCtrl, 
                    hint: 'XXX', 
                    icon: Icons.lock_outline_rounded,
                    keyboardType: TextInputType.number,
                    obscureText: true,
                    validator: (v) => (v?.length ?? 0) < 3 ? 'Invalid' : null,
                  )),
                ],
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () async {
                  if (formKey.currentState?.validate() ?? false) {
                    final last4 = cardCtrl.text.substring(cardCtrl.text.length - 4);
                    final success = await context.read<PaymentController>().addPaymentMethod(
                      type: _getCardType(cardCtrl.text),
                      last4: last4,
                      expiry: expiryCtrl.text,
                      setDefault: context.read<PaymentController>().savedMethods.isEmpty,
                    );
                    
                    if (mounted && success) {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                        backgroundColor: AppColors.success,
                        content: Text('Card saved securely to your profile'),
                      ));
                    }
                  }
                },
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 60), 
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  backgroundColor: AppColors.primary,
                ),
                child: const Text('Save Card Securely', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _getCardType(String number) {
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    return 'card';
  }

  Widget _buildTextField({
    required String label, 
    required TextEditingController controller, 
    required String hint, 
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.grey)),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          obscureText: obscureText,
          validator: validator,
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
          decoration: InputDecoration(
            prefixIcon: Icon(icon, color: AppColors.primary, size: 20),
            hintText: hint,
            hintStyle: TextStyle(color: Colors.grey.shade300, fontWeight: FontWeight.normal),
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: AppColors.lightGrey)),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: AppColors.lightGrey.withOpacity(0.5))),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: AppColors.primary, width: 2)),
            errorBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: AppColors.error)),
          ),
        ),
      ],
    );
  }

  Widget _buildTrustIndicators() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildTrustIcon(Icons.verified_user_rounded),
            const SizedBox(width: 24),
            _buildTrustIcon(Icons.lock_rounded),
            const SizedBox(width: 24),
            _buildTrustIcon(Icons.shield_rounded),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          'Your payment information is encrypted and securely stored by our PCI-compliant partners. Nobevra does not store your full card details.',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.grey.shade400, fontSize: 11, height: 1.5),
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.enhanced_encryption_rounded, color: Colors.grey.shade400, size: 14),
            const SizedBox(width: 6),
            Text('SECURE 256-BIT SSL CONNECTION', style: TextStyle(color: Colors.grey.shade400, fontSize: 9, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
          ],
        ),
      ],
    );
  }

  Widget _buildTrustIcon(IconData icon) {
    return Icon(icon, color: Colors.grey.shade300, size: 32);
  }
}
