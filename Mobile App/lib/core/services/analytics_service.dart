import 'package:flutter/foundation.dart';
import 'package:firebase_analytics/firebase_analytics.dart';

/// Nobevra Mobile Analytics Service
/// Centralized service for logging typed analytics events on iOS & Android.
class AnalyticsService {
  static final AnalyticsService _instance = AnalyticsService._internal();
  factory AnalyticsService() => _instance;
  AnalyticsService._internal();

  final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  /// Log a custom event enriched with Nobevra taxonomy parameters
  Future<void> logEvent({
    required String name,
    Map<String, Object>? parameters,
  }) async {
    try {
      final Map<String, Object> enriched = {
        'product_identity': 'nobevra',
        'app_platform': defaultTargetPlatform.name,
        ...?parameters,
      };

      await _analytics.logEvent(
        name: name,
        parameters: enriched,
      );
    } catch (e) {
      debugPrint('AnalyticsService error: $e');
    }
  }

  // --- Funnel Helper Methods ---

  Future<void> logPageView({required String screenName, String? screenClass}) async {
    await _analytics.logScreenView(
      screenName: screenName,
      screenClass: screenClass ?? screenName,
      parameters: {'product_identity': 'nobevra'},
    );
  }

  Future<void> logSignUp({required String method}) async {
    await logEvent(
      name: 'sign_up',
      parameters: {'method': method},
    );
  }

  Future<void> logLogin({required String method}) async {
    await logEvent(
      name: 'login',
      parameters: {'method': method},
    );
  }

  Future<void> logInvoiceCreated({
    required String invoiceId,
    required String currency,
    required double totalAmount,
    String? templateId,
  }) async {
    await logEvent(
      name: 'invoice_created',
      parameters: {
        'invoice_id': invoiceId,
        'currency': currency,
        'total_amount': totalAmount,
        'template_id': templateId ?? 'default',
      },
    );
  }

  Future<void> logInvoiceSent({
    required String invoiceId,
    required String deliveryChannel,
  }) async {
    await logEvent(
      name: 'invoice_sent',
      parameters: {
        'invoice_id': invoiceId,
        'delivery_channel': deliveryChannel,
      },
    );
  }

  Future<void> logPaymentReceived({
    required String invoiceId,
    required double amount,
    required String currency,
    required String paymentGateway,
  }) async {
    await logEvent(
      name: 'payment_received',
      parameters: {
        'invoice_id': invoiceId,
        'amount': amount,
        'currency': currency,
        'payment_gateway': paymentGateway,
      },
    );
  }

  Future<void> logFeatureUsed({
    required String featureName,
    Map<String, Object>? extra,
  }) async {
    await logEvent(
      name: 'feature_used',
      parameters: {
        'feature_name': featureName,
        ...?extra,
      },
    );
  }
}
