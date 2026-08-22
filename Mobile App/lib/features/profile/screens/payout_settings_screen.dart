// lib/features/profile/screens/payout_settings_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';

class PayoutSettingsScreen extends StatefulWidget {
  const PayoutSettingsScreen({super.key});

  @override
  State<PayoutSettingsScreen> createState() => _PayoutSettingsScreenState();
}

class _PayoutSettingsScreenState extends State<PayoutSettingsScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _accountNumberController;
  late TextEditingController _accountNameController;
  String? _selectedBank;

  // Mock list of Nigerian Banks (Flutterwave compatible)
  final List<String> _banks = [
    'Access Bank', 'Access Bank (Diamond)', 'Ecobank Nigeria', 'Fidelity Bank', 
    'First Bank of Nigeria', 'First City Monument Bank', 'Guaranty Trust Bank', 
    'Heritage Bank', 'Keystone Bank', 'Kuda Bank', 'Moniepoint MFB', 'Opay',
    'Palmpay', 'Polaris Bank', 'Providus Bank', 'Stanbic IBTC Bank', 
    'Standard Chartered Bank', 'Sterling Bank', 'Union Bank of Nigeria', 
    'United Bank For Africa', 'Unity Bank', 'Wema Bank', 'Zenith Bank'
  ];

  @override
  void initState() {
    super.initState();
    final profile = context.read<ProfileController>().profile;
    _accountNumberController = TextEditingController(text: profile?.accountNumber ?? '');
    _accountNameController = TextEditingController(text: profile?.accountName ?? '');
    _selectedBank = profile?.bankName;
  }

  @override
  void dispose() {
    _accountNumberController.dispose();
    _accountNameController.dispose();
    super.dispose();
  }

  Future<void> _handleSave() async {
    if (!_formKey.currentState!.validate() || _selectedBank == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please complete all bank details')),
      );
      return;
    }

    final success = await context.read<ProfileController>().updateBranding(
      bankName: _selectedBank,
      accountName: _accountNameController.text.trim(),
      accountNumber: _accountNumberController.text.trim(),
    );

    if (mounted && success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Bank details updated successfully')),
      );
    }
  }

  Future<void> _linkFlutterwave() async {
    // Stage 1: Basic validation
    if (_selectedBank == null || _accountNumberController.text.length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please save valid bank details first')),
      );
      return;
    }

    // Stage 2: Animation & Mock Request
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
    );

    await Future.delayed(const Duration(seconds: 2)); // Simulating API call

    if (!mounted) return;
    Navigator.pop(context); // Close loading

    // For now, we mock the success of linking
    // In production, this would call the 'create-flutterwave-subaccount' edge function
    final mockSubaccountId = 'RS_MOCK_${DateTime.now().millisecondsSinceEpoch}';
    
    // Attempt to update the controller (assuming it will be fixed)
    try {
      await context.read<TeamController>().updateTeamSubaccount(mockSubaccountId);
    } catch(e) {
      debugPrint("Warning: Controller update failed, but UI proceeding for demo: $e");
    }

    if (mounted) {
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Account Linked!'),
          content: Text('Your business is now ready to receive automated payouts via Flutterwave.\n\nSubaccount ID: $mockSubaccountId'),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('Awesome')),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final teamCtrl = context.watch<TeamController>();
    final team = teamCtrl.activeTeam;
    final isLinked = team?.flutterwaveSubaccountId != null;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('Payout Settings', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black)),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: const BackButton(color: Colors.black),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSettlementCard(isLinked, team?.flutterwaveSubaccountId),
              const SizedBox(height: 32),
              const Text('BANK ACCOUNT DETAILS', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 11, color: Colors.grey, letterSpacing: 1.5)),
              const SizedBox(height: 16),
              _buildBankForm(),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: context.read<ProfileController>().isSaving ? null : _handleSave,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: context.watch<ProfileController>().isSaving 
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text('Save Bank Details', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              ),
              const SizedBox(height: 16),
              if (!isLinked) 
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: OutlinedButton.icon(
                    onPressed: _linkFlutterwave,
                    icon: const Icon(Icons.link_rounded),
                    label: const Text('Link to Nobevra Payments', style: TextStyle(fontWeight: FontWeight.bold)),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFFFB923C),
                      side: const BorderSide(color: Color(0xFFFB923C), width: 2),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSettlementCard(bool isLinked, String? subaccountId) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isLinked 
              ? [const Color(0xFF065F46), const Color(0xFF059669)] 
              : [const Color(0xFF1E293B), const Color(0xFF334155)],
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('SETTLEMENT STATUS', style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isLinked ? Colors.white24 : Colors.amber.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  isLinked ? 'VERIFIED' : 'PENDING LINK',
                  style: TextStyle(color: isLinked ? Colors.white : Colors.amber, fontSize: 9, fontWeight: FontWeight.w900),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            isLinked ? 'Payments Active' : 'Payouts Paused',
            style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            isLinked 
                ? 'Subaccount: $subaccountId' 
                : 'Link your bank account to enable automatic split payments and receive income directly.',
            style: const TextStyle(color: Colors.white70, fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildBankForm() {
    return Column(
      children: [
        DropdownButtonFormField<String>(
          initialValue: _selectedBank,
          decoration: _inputDecoration('Bank Name', Icons.account_balance_rounded),
          items: _banks.map((b) => DropdownMenuItem(value: b, child: Text(b))).toList(),
          onChanged: (v) => setState(() => _selectedBank = v),
          validator: (v) => v == null ? 'Required' : null,
        ),
        const SizedBox(height: 16),
        TextFormField(
          controller: _accountNumberController,
          keyboardType: TextInputType.number,
          decoration: _inputDecoration('Account Number', Icons.numbers_rounded),
          validator: (v) => (v == null || v.length < 10) ? 'Enter valid account number' : null,
        ),
        const SizedBox(height: 16),
        TextFormField(
          controller: _accountNameController,
          decoration: _inputDecoration('Account Name', Icons.badge_rounded),
          validator: (v) => (v == null || v.isEmpty) ? 'Required' : null,
        ),
      ],
    );
  }

  InputDecoration _inputDecoration(String label, IconData icon) {
    return InputDecoration(
      labelText: label,
      prefixIcon: Icon(icon, color: AppColors.primary),
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFFE2E8F0))),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: Color(0xFFE2E8F0))),
    );
  }
}
