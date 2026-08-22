import 'dart:io';
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';

class MaintenanceScreen extends StatefulWidget {
  const MaintenanceScreen({super.key});

  @override
  State<MaintenanceScreen> createState() => _MaintenanceScreenState();
}

class _MaintenanceScreenState extends State<MaintenanceScreen> {
  bool _isChecking = false;

  Future<void> _checkStatus() async {
    setState(() {
      _isChecking = true;
    });

    try {
      // Simulate/Perform a connectivity and service check
      // For a real app, this would be a call to a health-check endpoint
      final result = await InternetAddress.lookup('google.com').timeout(
        const Duration(seconds: 5),
      );
      
      if (mounted) {
        if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
           ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('System is still undergoing scheduled maintenance.'),
              backgroundColor: AppColors.primary,
            ),
          );
        } else {
           ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Still unable to connect to our servers.'),
              backgroundColor: AppColors.error,
            ),
          );
        }
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Connection error. Please try again later.'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isChecking = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Stack(
        children: [
          // Main Content
          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(32.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Illustration Container
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      // Background Decorative Blur (Simulated)
                      Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          color: AppColors.primary.withOpacity(0.05),
                          shape: BoxShape.circle,
                        ),
                      ),
                      // The "Gears/Construction" Visual
                      Container(
                        width: 240,
                        height: 240,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(32),
                          border: Border.all(
                            color: AppColors.primary.withOpacity(0.1),
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withOpacity(0.05),
                              blurRadius: 30,
                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),
                        child: GridView.count(
                          physics: const NeverScrollableScrollPhysics(),
                          shrinkWrap: true,
                          crossAxisCount: 2,
                          padding: const EdgeInsets.all(40),
                          mainAxisSpacing: 16,
                          crossAxisSpacing: 16,
                          children: [
                            _buildIconBox(Icons.settings_rounded, AppColors.primary.withOpacity(0.1), 0),
                            _buildIconBox(Icons.build_rounded, AppColors.primary.withOpacity(0.2), 16),
                            _buildIconBox(Icons.layers_rounded, AppColors.primary.withOpacity(0.2), -16),
                            _buildIconBox(Icons.precision_manufacturing_rounded, AppColors.primary.withOpacity(0.1), 0),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 48),
                  
                  // Text Content
                  RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(
                      style: AppTextStyles.headlineLarge.copyWith(height: 1.2),
                      children: const [
                        TextSpan(text: 'System Upgrade\n'),
                        TextSpan(
                          text: 'in Progress',
                          style: TextStyle(color: AppColors.primary),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'We\'re currently enhancing your experience with new features and better performance. We\'ll be back online shortly.',
                    textAlign: TextAlign.center,
                    style: AppTextStyles.bodyLarge.copyWith(
                      color: AppColors.darkGrey,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 48),
                  
                  // Action Area
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(
                      onPressed: _isChecking ? null : _checkStatus,
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 18),
                        side: const BorderSide(color: AppColors.primary, width: 2),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      child: _isChecking
                        ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary))
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.monitor_heart_rounded, color: AppColors.primary, size: 20),
                              const SizedBox(width: 8),
                              Text(
                                'Check Status',
                                style: AppTextStyles.button.copyWith(color: AppColors.primary),
                              ),
                            ],
                          ),
                    ),
                  ),
                  const SizedBox(height: 32),
                  
                  // Expected Time
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(width: 32, height: 1, color: AppColors.lightGrey),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12.0),
                        child: Text(
                          'EXPECTED: 10:00 AM EST',
                          style: AppTextStyles.bodyMedium.copyWith(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.2,
                            color: AppColors.darkGrey.withOpacity(0.5),
                          ),
                        ),
                      ),
                      Container(width: 32, height: 1, color: AppColors.lightGrey),
                    ],
                  ),
                ],
              ),
            ),
          ),
          
          // Branding Footer
          Positioned(
            bottom: 48,
            left: 0,
            right: 0,
            child: Opacity(
              opacity: 0.4,
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Icon(Icons.bolt_rounded, color: Colors.white, size: 14),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Nobevra',
                        style: AppTextStyles.headlineSmall.copyWith(
                          fontSize: 14,
                          letterSpacing: -1,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'SME TOOLKIT V4.2.0',
                    style: AppTextStyles.bodyMedium.copyWith(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIconBox(IconData icon, Color bgColor, double offset) {
    return Transform.translate(
      offset: Offset(0, offset),
      child: Container(
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Center(
          child: Icon(icon, color: AppColors.primary, size: 32),
        ),
      ),
    );
  }
}

