import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';

class QrAppStoreFormScreen extends StatefulWidget {
  const QrAppStoreFormScreen({super.key});

  @override
  State<QrAppStoreFormScreen> createState() => _QrAppStoreFormScreenState();
}

class _QrAppStoreFormScreenState extends State<QrAppStoreFormScreen> {
  final _nameController = TextEditingController();
  final _iosController = TextEditingController();
  final _androidController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _iosController.dispose();
    _androidController.dispose();
    super.dispose();
  }

  void _handleGenerate() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter an app name')),
      );
      return;
    }

    context.read<QrGeneratorController>().updateData(
      name: 'App: $name',
      type: 'app_store',
      content: {
        'appName': name,
        'iosUrl': _iosController.text.trim(),
        'androidUrl': _androidController.text.trim(),
      },
    );

    Navigator.pushNamed(context, AppRoutes.qrPreview);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.arrow_back_ios_rounded, color: AppColors.primary, size: 20),
        ),
        title: Text(
          'App QR Setup',
          style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(color: AppColors.lightGrey, height: 1),
        ),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 120, left: 24, right: 24, top: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'App Identity',
                  style: AppTextStyles.headlineMedium.copyWith(fontWeight: FontWeight.w900, fontSize: 24),
                ),
                const SizedBox(height: 8),
                Text(
                  'One QR code for both stores. Users will be redirected based on their device OS.',
                  style: AppTextStyles.bodyMedium.copyWith(color: AppColors.darkGrey, height: 1.5),
                ),
                const SizedBox(height: 40),
                
                _buildLabel('App Name', isRequired: true),
                TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(hintText: 'e.g. Nobevra Express'),
                ),
                const SizedBox(height: 32),
                
                Text(
                  'Store Links',
                  style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                
                _buildLabel('iOS App Store URL'),
                TextField(
                  controller: _iosController,
                  keyboardType: TextInputType.url,
                  decoration: const InputDecoration(
                    hintText: 'https://apps.apple.com/...',
                    prefixIcon: Icon(Icons.apple_rounded, size: 20),
                  ),
                ),
                const SizedBox(height: 20),
                
                _buildLabel('Android Play Store URL'),
                TextField(
                  controller: _androidController,
                  keyboardType: TextInputType.url,
                  decoration: const InputDecoration(
                    hintText: 'https://play.google.com/...',
                    prefixIcon: Icon(Icons.android_rounded, size: 20),
                  ),
                ),
                const SizedBox(height: 48),
                
                _buildInfoCard(),
              ],
            ),
          ),
          
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(top: BorderSide(color: AppColors.lightGrey, width: 0.5)),
              ),
              child: SafeArea(
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _handleGenerate,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 20),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Generate Preview'),
                        SizedBox(width: 8),
                        Icon(Icons.qr_code_2_rounded, size: 20),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLabel(String text, {bool isRequired = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0, left: 4.0),
      child: RichText(
        text: TextSpan(
          text: text,
          style: AppTextStyles.bodyMedium.copyWith(fontWeight: FontWeight.bold, color: AppColors.textBlack),
          children: isRequired
              ? [
                  const TextSpan(
                    text: ' *',
                    style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold),
                  ),
                ]
              : [],
        ),
      ),
    );
  }

  Widget _buildInfoCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withOpacity(0.1)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.auto_awesome_rounded, color: AppColors.primary, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Smart Routing', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                const SizedBox(height: 4),
                Text(
                  'Nobevra detects if the user is on an iPhone or Android and opens the correct store automatically.',
                  style: TextStyle(color: Colors.grey[600], fontSize: 12, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
