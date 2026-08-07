// lib/core/services/payment_gateway_service.dart
//
// CRITICAL DESIGN RULES (from Flutterwave docs):
//  1. `redirectUrl` must be your OWN app or website URL — NOT the webhook.
//     The webhook is configured separately in the Flutterwave Dashboard.
//  2. After .charge() returns, you MUST verify the transaction server-side
//     using the transactionId from ChargeResponse.
//  3. The app must refresh SubscriptionController after confirmed upgrade.
//
import 'package:flutter/material.dart';
import 'package:flutterwave_standard/flutterwave.dart';
import 'package:noble_invoice/core/constants/env_constants.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';

class PaymentGatewayService {
  /// Initiates a subscription payment via Flutterwave Standard SDK.
  ///
  /// Returns true only after:
  ///   1. The Flutterwave charge modal reports success.
  ///   2. The transaction is verified server-side via Supabase edge function.
  ///   3. The SubscriptionController is refreshed with the new tier.
  static Future<bool> processSubscription({
    required BuildContext context,
    required String userId,
    required String planName,
    required double amount,
    required String email,
    required String fullName,
    required String phoneNumber,
    required String billingPeriod,
  }) async {
    // Extract clean tier name: "Noble Pulse" -> "pulse", "Noble Elite" -> "elite"
    final String tier = planName.toLowerCase().replaceAll('noble ', '').trim();

    // Build a tx_ref that is parseable by the webhook.
    // FORMAT: sub_{tier}_{userId}_{shortUuid}
    // We put the tier BEFORE the userId so the webhook parser
    // doesn't split on UUID hyphens.
    final String shortId = const Uuid().v4().substring(0, 8);
    final String txRef = 'sub_${tier}_${billingPeriod}_${userId}_$shortId';

    final Customer customer = Customer(
      name: fullName,
      phoneNumber: phoneNumber.isNotEmpty ? phoneNumber : '0000000000',
      email: email,
    );

    // redirectUrl: where Flutterwave redirects the user's browser AFTER payment.
    // This is NOT the webhook. Must be a real URL or deep-link.
    // The webhook is separately configured in Flutterwave Dashboard -> Settings -> Webhooks.
    const String redirectUrl = 'https://NobleInvoice.app/payment-callback';

    final Flutterwave flutterwave = Flutterwave(
      publicKey: EnvConstants.flutterwavePublicKey,
      currency: 'USD',
      redirectUrl: redirectUrl,
      txRef: txRef,
      amount: amount.toStringAsFixed(2),
      customer: customer,
      paymentOptions: 'card, banktransfer, ussd',
      customization: Customization(
        title: 'NobleInvoice $planName',
        description: 'Professional Business Toolkit Subscription',
        logo: 'https://raw.githubusercontent.com/Noble-Go/brand/main/logo.png',
      ),
      isTestMode: EnvConstants.flutterwaveIsTestMode,
    );

    try {
      final ChargeResponse? response = await flutterwave.charge(context);

      // User cancelled or closed the modal
      if (response == null) {
        debugPrint('[PaymentGatewayService] User cancelled payment modal.');
        return false;
      }

      debugPrint('[PaymentGatewayService] Raw response — status: ${response.status}, transactionId: ${response.transactionId}, txRef: ${response.txRef}');

      // The client-side status can only be trusted as a hint.
      // We MUST verify server-side before granting any access.
      if (response.status == 'successful' || response.status == 'completed') {
        final transactionId = response.transactionId;
        if (transactionId == null || transactionId.isEmpty) {
          debugPrint('[PaymentGatewayService] No transactionId returned. Cannot verify.');
          return false;
        }

        // Server-side verification via Supabase Edge Function
        final verified = await _verifyAndUpgrade(
          transactionId: transactionId,
          txRef: txRef,
          userId: userId,
          tier: tier,
          amount: amount,
        );

        if (verified && context.mounted) {
          // Refresh the subscription state in the app immediately
          await context.read<SubscriptionController>().loadSubscription();
          debugPrint('[PaymentGatewayService] Subscription upgraded and refreshed.');
        }

        return verified;
      } else {
        debugPrint('[PaymentGatewayService] Payment not successful. Status: ${response.status}');
        return false;
      }
    } catch (e) {
      debugPrint('[PaymentGatewayService] Error: $e');
      return false;
    }
  }

  /// Calls the Supabase edge function to verify the transaction with Flutterwave's
  /// API and upgrade the user's subscription atomically.
  static Future<bool> _verifyAndUpgrade({
    required String transactionId,
    required String txRef,
    required String userId,
    required String tier,
    required double amount,
  }) async {
    try {
      final res = await SupabaseService.client.functions.invoke(
        'verify-and-upgrade-subscription',
        body: {
          'transaction_id': transactionId,
          'tx_ref': txRef,
          'user_id': userId,
          'tier': tier,
          'expected_amount': amount,
        },
      );

      final data = res.data as Map<String, dynamic>?;
      if (data == null) {
        debugPrint('[PaymentGatewayService] verify-and-upgrade: null response');
        return false;
      }

      final status = data['status'] as String?;
      debugPrint('[PaymentGatewayService] verify-and-upgrade response: $data');
      return status == 'upgraded';
    } catch (e) {
      debugPrint('[PaymentGatewayService] Verification error: $e');
      return false;
    }
  }
}
