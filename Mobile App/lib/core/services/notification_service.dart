// lib/core/services/notification_service.dart
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';

/// Background message handler — must be a top-level function.
@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // Handle background messages silently
  if (kDebugMode) {
    debugPrint('Background FCM: ${message.messageId}');
  }
}

class NotificationService {
  static final GlobalKey<NavigatorState>        navigatorKey  = GlobalKey<NavigatorState>();
  static final GlobalKey<ScaffoldMessengerState> messengerKey  = GlobalKey<ScaffoldMessengerState>();

  static FirebaseMessaging get _fcm => FirebaseMessaging.instance;

  static Future<void> init() async {
    try {
      final settings = await _fcm.requestPermission(
        alert: true, badge: true, sound: true,
      );

      if (settings.authorizationStatus != AuthorizationStatus.authorized &&
          settings.authorizationStatus != AuthorizationStatus.provisional) {
        return;
      }

      // Get & persist FCM token (to both profiles and fcm_tokens table)
      final token = await _fcm.getToken();
      if (token != null) await _saveToken(token);
      _fcm.onTokenRefresh.listen(_saveToken);

      // Tap on notification when app was TERMINATED → re-launch into correct screen
      final initial = await _fcm.getInitialMessage();
      if (initial != null) _routeMessage(initial);

      // Tap on notification when app is in BACKGROUND
      FirebaseMessaging.onMessageOpenedApp.listen(_routeMessage);

      // Foreground in-app banner
      FirebaseMessaging.onMessage.listen((msg) {
        final notif = msg.notification;
        if (notif != null) {
          _showBanner(
            title: notif.title ?? 'Nobevra',
            body:  notif.body  ?? '',
            data:  msg.data,
          );
        }
      });
    } catch (e) {
      if (kDebugMode) debugPrint('NotificationService.init error: $e');
    }
  }

  // ── Deep-Link Router ────────────────────────────────────────────────────────
  static void _routeMessage(RemoteMessage message) {
    final data = message.data;
    final type   = data['type']   as String?;
    final screen = data['screen'] as String?; // sent by reminder Edge Function

    // Reminder Edge Function sends screen: 'invoice_detail'
    if (screen == 'invoice_detail') {
      final invoiceId = int.tryParse(data['invoiceId'] ?? '');
      if (invoiceId != null) {
        navigatorKey.currentState?.pushNamed(AppRoutes.invoiceDetails, arguments: invoiceId);
      } else {
        navigatorKey.currentState?.pushNamed(AppRoutes.invoiceDashboard);
      }
      return;
    }

    switch (type) {
      case 'invoice':
      case 'overdue_invoices':
        final invoiceId = int.tryParse(data['invoice_id'] ?? '');
        if (invoiceId != null) {
          navigatorKey.currentState?.pushNamed(AppRoutes.invoiceDetails, arguments: invoiceId);
        } else {
          navigatorKey.currentState?.pushNamed(AppRoutes.invoiceDashboard);
        }
        break;

      case 'qr_scan':
        navigatorKey.currentState?.pushNamed(AppRoutes.qrPerformance);
        break;

      default:
        break;
    }
  }

  // ── In-App Banner ───────────────────────────────────────────────────────────
  static void _showBanner({
    required String title,
    required String body,
    required Map<String, dynamic> data,
  }) {
    final type = data['type'] as String?;

    messengerKey.currentState?.showSnackBar(
      SnackBar(
        content: Row(children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), shape: BoxShape.circle),
            child: Icon(
              _iconForType(type),
              color: Colors.white, size: 18,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              Text(body,  style: const TextStyle(fontSize: 12, color: Colors.white70)),
            ],
          )),
        ]),
        action: SnackBarAction(
          label: 'View',
          textColor: Colors.white,
          onPressed: () {
            final msg = RemoteMessage(data: data);
            _routeMessage(msg);
          },
        ),
        behavior: SnackBarBehavior.floating,
        margin: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        backgroundColor: _colorForType(type),
        duration: const Duration(seconds: 5),
      ),
    );
  }

  static IconData _iconForType(String? type) {
    switch (type) {
      case 'overdue_invoices': return Icons.warning_amber_rounded;
      case 'invoice':          return Icons.receipt_long_rounded;
      case 'qr_scan':          return Icons.qr_code_scanner_rounded;
      default:                 return Icons.notifications_rounded;
    }
  }

  static Color _colorForType(String? type) {
    switch (type) {
      case 'overdue_invoices': return AppColors.error;
      case 'invoice':          return AppColors.primary;
      case 'qr_scan':          return AppColors.secondary;
      default:                 return AppColors.primary;
    }
  }

  // ── Token Persistence ──────────────────────────────────────────────────────
  static Future<void> _saveToken(String token) async {
    try {
      if (!SupabaseService.isLoggedIn) return;
      final userId = SupabaseService.currentUser?.id;
      if (userId == null) return;

      // 1. Save to profiles (legacy/fallback)
      await SupabaseService.client.from('profiles').upsert({
        'id':        userId,
        'fcm_token': token,
      });

      if (kDebugMode) debugPrint('FCM token saved to profile');
    } catch (e) {
      if (kDebugMode) debugPrint('FCM token save error: $e');
    }
  }

  /// Syncs the current FCM token to a specific team. 
  /// This must be called once the active team is known (e.g. in ProfileController).
  static Future<void> syncTokenToTeam(String teamId) async {
    try {
      final token = await _fcm.getToken();
      final userId = SupabaseService.currentUser?.id;
      if (token == null || userId == null) return;

      final platform = Platform.isIOS ? 'ios' : 'android';

      await SupabaseService.client.from('fcm_tokens').upsert({
        'user_id':  userId,
        'team_id':  teamId,
        'token':    token,
        'platform': platform,
        'updated_at': DateTime.now().toIso8601String(),
      });
      
      if (kDebugMode) debugPrint('FCM token synced to team: $teamId');
    } catch (e) {
      if (kDebugMode) debugPrint('FCM team sync error: $e');
    }
  }
}
