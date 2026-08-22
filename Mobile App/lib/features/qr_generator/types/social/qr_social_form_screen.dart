import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';

class QrSocialFormScreen extends StatefulWidget {
  const QrSocialFormScreen({super.key});

  @override
  State<QrSocialFormScreen> createState() => _QrSocialFormScreenState();
}

class _QrSocialFormScreenState extends State<QrSocialFormScreen> {
  String _selectedPlatform = 'Instagram';
  final _displayNameController = TextEditingController();
  final _handleController = TextEditingController();

  final List<Map<String, dynamic>> _platforms = [
    {'name': 'Instagram', 'icon': Icons.photo_camera_rounded},
    {'name': 'LinkedIn', 'icon': Icons.work_rounded},
    {'name': 'X', 'icon': Icons.close_rounded},
    {'name': 'Facebook', 'icon': Icons.facebook_rounded},
    {'name': 'WhatsApp', 'icon': Icons.chat_rounded},
    {'name': 'YouTube', 'icon': Icons.play_circle_rounded},
    {'name': 'TikTok', 'icon': Icons.music_note_rounded},
    {'name': 'Calendly', 'icon': Icons.calendar_today_rounded},
    {'name': 'Portfolio', 'icon': Icons.language_rounded},
  ];

  @override
  void dispose() {
    _displayNameController.dispose();
    _handleController.dispose();
    super.dispose();
  }

  void _handleGenerate() {
    final displayName = _displayNameController.text.trim();
    final handle = _handleController.text.trim();
    
    if (displayName.isEmpty || handle.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a display name and handle')),
      );
      return;
    }

    context.read<QrGeneratorController>().updateData(
      name: 'Social: $displayName',
      type: 'social',
      content: {
        'displayName': displayName,
        'platform': _selectedPlatform,
        'handle': handle,
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
          'Social QR Setup',
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
                  'Profile Info',
                  style: AppTextStyles.headlineMedium.copyWith(fontWeight: FontWeight.w900, fontSize: 24),
                ),
                const SizedBox(height: 8),
                Text(
                  'Help people find you across the social web with a single Nobevra scan.',
                  style: AppTextStyles.bodyMedium.copyWith(color: AppColors.darkGrey, height: 1.5),
                ),
                const SizedBox(height: 40),
                
                _buildLabel('Display Name', isRequired: true),
                TextField(
                  controller: _displayNameController,
                  decoration: const InputDecoration(hintText: 'e.g. John Doe / Nobevra'),
                ),
                const SizedBox(height: 32),
                
                _buildLabel('Select Platform', isRequired: true),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 1.1,
                  ),
                  itemCount: _platforms.length,
                  itemBuilder: (context, index) {
                    final platform = _platforms[index];
                    final isSelected = _selectedPlatform == platform['name'];
                    return InkWell(
                      onTap: () => setState(() => _selectedPlatform = platform['name']),
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        decoration: BoxDecoration(
                          color: isSelected ? AppColors.primary.withOpacity(0.1) : Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected ? AppColors.primary : AppColors.lightGrey,
                            width: 2,
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              platform['icon'],
                              color: isSelected ? AppColors.primary : Colors.grey,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              platform['name'],
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: isSelected ? AppColors.primary : Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
                
                const SizedBox(height: 32),
                
                _buildLabel('Handle / Username', isRequired: true),
                TextField(
                  controller: _handleController,
                  decoration: InputDecoration(
                    hintText: 'your_username',
                    prefixIcon: Container(
                      padding: const EdgeInsets.only(left: 16, top: 12, right: 8),
                      child: const Text('@', style: TextStyle(fontSize: 18, color: Colors.grey, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ),
                const SizedBox(height: 48),
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
}
