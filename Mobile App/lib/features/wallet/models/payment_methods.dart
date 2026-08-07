import 'package:flutter/material.dart';

enum PaymentGateway { flutterwave }

class PaymentMethod {
  final String id;
  final String name;
  final String description;
  final IconData icon;
  final PaymentGateway gateway;
  final String currency;

  PaymentMethod({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    required this.gateway,
    required this.currency,
  });
}

class PaymentMapping {
  static List<PaymentMethod> getMethodsForCountry(String countryCode) {
    switch (countryCode.toUpperCase()) {
      // ... [Countries remain the same, all using flutterwave]

      // ── Nigeria ──────────────────────────────────────────────────────────
      case 'NG':
        return [
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard, Verve — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'USD',
          ),
          PaymentMethod(
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Get a dedicated account for direct transfer',
            icon: Icons.account_balance_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'USD',
          ),
          PaymentMethod(
            id: 'ussd',
            name: 'USSD',
            description: '*737#, *737#, *000# and more',
            icon: Icons.dialpad_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'USD',
          ),
        ];

      // ── Ghana ────────────────────────────────────────────────────────────
      case 'GH':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'MTN MoMo, Vodafone Cash, AirtelTigo Money',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'GHS',
          ),
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'GHS',
          ),
        ];

      // ── Kenya ────────────────────────────────────────────────────────────
      case 'KE':
        return [
          PaymentMethod(
            id: 'mpesa',
            name: 'M-Pesa',
            description: 'Safaricom M-Pesa via STK Push',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'KES',
          ),
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'KES',
          ),
        ];

      // ── South Africa ─────────────────────────────────────────────────────
      case 'ZA':
        return [
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'ZAR',
          ),
          PaymentMethod(
            id: 'bank_transfer',
            name: 'EFT / Bank Transfer',
            description: 'Direct electronic fund transfer',
            icon: Icons.account_balance_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'ZAR',
          ),
        ];

      // ── Uganda ───────────────────────────────────────────────────────────
      case 'UG':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'MTN MoMo, Airtel Money',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'UGX',
          ),
        ];

      // ── Tanzania ─────────────────────────────────────────────────────────
      case 'TZ':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'Vodacom M-Pesa, Airtel, Tigo',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'TZS',
          ),
        ];

      // ── Rwanda ───────────────────────────────────────────────────────────
      case 'RW':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'MTN MoMo Rwanda',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'RWF',
          ),
        ];

      // ── Zambia ───────────────────────────────────────────────────────────
      case 'ZM':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'MTN Zambia, Airtel Money',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'ZMW',
          ),
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'ZMW',
          ),
        ];

      // ── Senegal ──────────────────────────────────────────────────────────
      case 'SN':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'Orange Money, Wave, Free Money',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'XOF',
          ),
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'XOF',
          ),
        ];

      // ── Ivory Coast (Côte d'Ivoire) ───────────────────────────────────
      case 'CI':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'Orange Money, MTN MoMo, Wave',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'XOF',
          ),
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'XOF',
          ),
        ];

      // ── Cameroon ─────────────────────────────────────────────────────────
      case 'CM':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'MTN MoMo Cameroon, Orange Money',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'XAF',
          ),
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'XAF',
          ),
        ];

      // ── Egypt ─────────────────────────────────────────────────────────────
      case 'EG':
        return [
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'EGP',
          ),
          PaymentMethod(
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Direct EGP bank transfer',
            icon: Icons.account_balance_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'EGP',
          ),
        ];

      // ── Ethiopia ──────────────────────────────────────────────────────────
      case 'ET':
        return [
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'ETB',
          ),
        ];

      // ── Morocco ───────────────────────────────────────────────────────────
      case 'MA':
        return [
          PaymentMethod(
            id: 'card',
            name: 'Debit / Credit Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.credit_card_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'MAD',
          ),
          PaymentMethod(
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Direct MAD bank transfer',
            icon: Icons.account_balance_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'MAD',
          ),
        ];

      // ── Mozambique ────────────────────────────────────────────────────────
      case 'MZ':
        return [
          PaymentMethod(
            id: 'mobilemoney',
            name: 'Mobile Money',
            description: 'M-Pesa Mozambique, Airtel Money',
            icon: Icons.phone_android_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'MZN',
          ),
        ];

      // ── Global / Rest of World (USD fallback) ─────────────────────────
      default:
        return [
          PaymentMethod(
            id: 'card',
            name: 'International Card',
            description: 'Visa, Mastercard — powered by Flutterwave',
            icon: Icons.public_rounded,
            gateway: PaymentGateway.flutterwave,
            currency: 'USD',
          ),
        ];
    }
  }
}
