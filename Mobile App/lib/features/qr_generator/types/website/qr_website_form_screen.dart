import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';

class QrWebsiteFormScreen extends StatefulWidget {
  const QrWebsiteFormScreen({super.key});

  @override
  State<QrWebsiteFormScreen> createState() => _QrWebsiteFormScreenState();
}

class _QrWebsiteFormScreenState extends State<QrWebsiteFormScreen> {
  final _urlController = TextEditingController();
  final _titleController = TextEditingController();
  final _descController = TextEditingController();

  @override
  void initState() {
    super.initState();
    final gen = context.read<QrGeneratorController>();
    if (gen.isEditing && gen.type == 'website') {
      _urlController.text = gen.content['url'] ?? '';
      _titleController.text = gen.name;
      _descController.text = gen.content['description'] ?? '';
    }
  }

  @override
  void dispose() {
    _urlController.dispose();
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }

  void _handleGeneratePreview() {
    final url = _urlController.text.trim();
    if (url.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a website URL')),
      );
      return;
    }

    // Update the global QR controller with Website-specific data
    context.read<QrGeneratorController>().updateData(
      name: _titleController.text.isNotEmpty ? _titleController.text : 'Website QR',
      type: 'website',
      content: {
        'url': url,
        'description': _descController.text,
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
          'Website QR Setup',
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
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  context.read<QrGeneratorController>().isEditing ? 'Update Website QR' : 'Create Website QR',
                  style: AppTextStyles.headlineMedium.copyWith(fontWeight: FontWeight.w900, fontSize: 24),
                ),
                const SizedBox(height: 8),
                Text(
                  'Enter the destination link for your Nobevra module. This QR code will redirect users instantly when scanned.',
                  style: AppTextStyles.bodyMedium.copyWith(color: AppColors.darkGrey, height: 1.5),
                ),
                const SizedBox(height: 40),
                
                // URL Field
                _buildLabel('Website URL', isRequired: true),
                TextField(
                  controller: _urlController,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  decoration: InputDecoration(
                    hintText: 'https://yourwebsite.com',
                    contentPadding: const EdgeInsets.all(20),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFF1F5F9), width: 2),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: AppColors.primary, width: 2),
                    ),
                    filled: true,
                    fillColor: const Color(0xFFF8FAFC),
                  ),
                  keyboardType: TextInputType.url,
                ),
                
                const SizedBox(height: 32),
                
                // Analytics Section
                Row(
                  children: [
                    Icon(Icons.analytics_outlined, color: AppColors.darkGrey.withOpacity(0.1), size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'ANALYTICS & TRACKING',
                      style: AppTextStyles.bodyMedium.copyWith(
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                        color: AppColors.darkGrey.withOpacity(0.1),
                        letterSpacing: 1.0,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                
                _buildSmallLabel('Page Title (Optional)'),
                TextField(
                  controller: _titleController,
                  decoration: const InputDecoration(hintText: 'e.g. Summer Campaign'),
                ),
                const SizedBox(height: 20),
                
                _buildSmallLabel('Short Description (Optional)'),
                TextField(
                  controller: _descController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: 'Add a note to help identify this link in your dashboard reports later.',
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Note: Title and description are only visible within your Nobevra analytics dashboard.',
                  style: AppTextStyles.bodyMedium.copyWith(
                    fontSize: 11,
                    fontStyle: FontStyle.italic,
                    color: AppColors.darkGrey.withOpacity(0.1),
                  ),
                ),
                const SizedBox(height: 140), // Spacer for footer
              ],
            ),
          ),
          
          // Fixed Footer
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.1),
                border: const Border(top: BorderSide(color: AppColors.lightGrey, width: 0.5)),
              ),
              child: SafeArea(
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _handleGeneratePreview,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 20),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(context.read<QrGeneratorController>().isEditing ? 'Update Preview' : 'Generate Preview'),
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
      padding: const EdgeInsets.only(bottom: 12.0, left: 4.0),
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

  Widget _buildSmallLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0, left: 4.0),
      child: Text(
        text,
        style: AppTextStyles.bodyMedium.copyWith(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: AppColors.darkGrey,
        ),
      ),
    );
  }
}
