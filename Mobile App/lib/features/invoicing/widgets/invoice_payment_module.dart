// lib/features/invoicing/widgets/invoice_payment_module.dart
// Extracted from invoice_type_modules.dart to enforce the 600-line modular rule.
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/invoicing/widgets/invoice_type_modules.dart' show buildModuleCard;

// ══════════════════════════════════════════════════════════════════════════════
// SHARED PAYMENT MANAGEMENT MODULE (Phase 6 — Flutterwave Integration)
// ══════════════════════════════════════════════════════════════════════════════
class PaymentManagementModule extends StatelessWidget {
  final Map<String, dynamic> metadata;
  final ValueChanged<Map<String, dynamic>> onChanged;
  const PaymentManagementModule({super.key, required this.metadata, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    final bool isEnabled = metadata['enable_flutterwave'] == true;

    return buildModuleCard(
      accentColor: const Color(0xFFFB923C),
      icon: Icons.account_balance_wallet_outlined,
      title: 'PAYMENT MANAGEMENT',
      subtitle: 'Securely collect payments and track settlements',
      children: [
        Row(children: [
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Enable Flutterwave Checkout', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            Text('Generates a "Pay Now" link for the client.', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
          ])),
          Switch.adaptive(
            value: isEnabled,
            onChanged: (v) {
              final u = Map<String, dynamic>.from(metadata);
              u['enable_flutterwave'] = v;
              if (!v) { u['auto_charge'] = false; u['pass_fees'] = false; }
              onChanged(u);
            },
            activeColor: const Color(0xFFFB923C),
          ),
        ]),
        if (isEnabled) ...[
          const SizedBox(height: 12),
          Row(children: [
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('Pass Processing Fee to Client', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              Text('Adds 3.8% convenience fee as a line item.', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
            ])),
            Switch.adaptive(
              value: metadata['pass_fees'] == true,
              onChanged: (v) {
                final u = Map<String, dynamic>.from(metadata);
                u['pass_fees'] = v;
                onChanged(u);
              },
              activeColor: const Color(0xFFFB923C),
            ),
          ]),
          const SizedBox(height: 16),
          const Divider(),
          const SizedBox(height: 12),
          const Row(children: [
            Icon(Icons.lock_outline_rounded, color: Colors.green, size: 14),
            SizedBox(width: 6),
            Text('SECURE FLUTTERWAVE GATEWAY', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 0.5, color: Colors.green)),
          ]),
          const SizedBox(height: 8),
          const Text('When you issue this invoice, Nobevra will automatically request a unique payment URL from Flutterwave and embed it into the PDF.', style: TextStyle(fontSize: 12, color: AppColors.darkGrey)),
        ],
      ],
    );
  }
}
