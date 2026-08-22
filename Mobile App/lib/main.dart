import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:noble_invoice/core/constants/env_constants.dart';
import 'package:noble_invoice/core/services/notification_service.dart';
import 'package:noble_invoice/core/services/currency_service.dart';
import 'package:noble_invoice/core/services/gemini_service.dart';
import 'package:noble_invoice/app.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
void main() async {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  EnvConstants.validate();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);

  // 1. Initialise Firebase (Required for FCM & optional for Google Sign-In)
  try {
    // Note: On web, this requires firebase_options.dart or explicit options.
    // For local testing in Chrome, we'll catch any "missing options" errors.
    await Firebase.initializeApp();
  } catch (e) {
    debugPrint("Firebase initialization failed (expected on Web if no options provided): $e");
  }

  // 2. Initialise Supabase
  await Supabase.initialize(
    url: EnvConstants.supabaseUrl,
    anonKey: EnvConstants.supabaseAnonKey,
  );

  // 3. Initialise Push Notifications
  await NotificationService.init();

  // 4. Initialise AI Service
  GeminiService.instance.init();

  // 5. Initialise Currency Rates (background sync)
  CurrencyService.initialize(); // non-blocking

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.white, // Pure white background
      statusBarIconBrightness: Brightness.dark, // Dark icons for visibility on white
      statusBarBrightness: Brightness.light, // iOS configuration for dark icons
    ),
  );

  runApp(const NobevraApp());
}
