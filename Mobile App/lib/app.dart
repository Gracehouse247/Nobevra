import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/theme/theme.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/core/services/notification_service.dart';
import 'package:noble_invoice/core/arch/provider_registry.dart';

class NobevraApp extends StatelessWidget {
  const NobevraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: buildProviders(),
      child: Consumer<ProfileController>(
        builder: (context, profile, _) {
          return MaterialApp(
            navigatorKey: NotificationService.navigatorKey,
            scaffoldMessengerKey: NotificationService.messengerKey,
            title: 'Nobevra',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.lightTheme,
            themeMode: ThemeMode.light,
            locale: profile.locale,
            initialRoute: AppRoutes.splash,
            onGenerateRoute: AppRoutes.generateRoute,
          );
        },
      ),
    );
  }
}
