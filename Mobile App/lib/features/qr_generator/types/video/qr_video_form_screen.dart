import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';

class QrVideoFormScreen extends StatefulWidget {
  const QrVideoFormScreen({super.key});

  @override
  State<QrVideoFormScreen> createState() => _QrVideoFormScreenState();
}

class _QrVideoFormScreenState extends State<QrVideoFormScreen> {
  final _nameController = TextEditingController();
  final _urlController = TextEditingController();
  bool _isUrlSource = true;

  @override
  void dispose() {
    _nameController.dispose();
    _urlController.dispose();
    super.dispose();
  }

  void _handleGenerate() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a video title')),
      );
      return;
    }

    context.read<QrGeneratorController>().updateData(
      name: 'Video: $name',
      type: 'video',
      content: {
        'videoTitle': name,
        'videoUrl': _urlController.text.trim(),
        'isUrlSource': _isUrlSource,
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
          'Video QR Setup',
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
                  'Add Video',
                  style: AppTextStyles.headlineMedium.copyWith(fontWeight: FontWeight.w900, fontSize: 24),
                ),
                const SizedBox(height: 8),
                Text(
                  'Share your marketing video, tutorial, or personal message via QR code.',
                  style: AppTextStyles.bodyMedium.copyWith(color: AppColors.darkGrey, height: 1.5),
                ),
                const SizedBox(height: 40),
                
                _buildLabel('Video Title', isRequired: true),
                TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(hintText: 'e.g. Product Demo 2024'),
                ),
                const SizedBox(height: 32),
                
                _buildSourceToggle(),
                const SizedBox(height: 24),
                
                if (_isUrlSource) ...[
                  _buildLabel('Video URL (YouTube, Vimeo, etc.)'),
                  TextField(
                    controller: _urlController,
                    keyboardType: TextInputType.url,
                    decoration: const InputDecoration(
                      hintText: 'https://youtube.com/watch?v=...',
                      prefixIcon: Icon(Icons.link_rounded, size: 20),
                    ),
                  ),
                ] else ...[
                  _buildUploadSection(),
                ],
                
                const SizedBox(height: 48),
                _buildNoteCard(),
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

  Widget _buildSourceToggle() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: Row(
        children: [
          Expanded(
            child: _buildToggleButton(
              title: 'Link URL',
              isSelected: _isUrlSource,
              onTap: () => setState(() => _isUrlSource = true),
            ),
          ),
          Expanded(
            child: _buildToggleButton(
              title: 'Upload File',
              isSelected: !_isUrlSource,
              onTap: () => setState(() => _isUrlSource = false),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildToggleButton({required String title, required bool isSelected, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          boxShadow: isSelected
              ? [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 4, offset: const Offset(0, 2))]
              : null,
        ),
        child: Center(
          child: Text(
            title,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
              color: isSelected ? AppColors.primary : Colors.grey[600],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildUploadSection() {
    return Container(
      width: double.infinity,
      height: 180,
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.primary.withOpacity(0.1)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.video_library_outlined, color: AppColors.primary, size: 40),
          const SizedBox(height: 12),
          const Text('Tap to upload MP4/MOV', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 4),
          Text('Max file size 50MB', style: TextStyle(color: Colors.grey[400], fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildNoteCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: const Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.info_outline_rounded, color: AppColors.darkGrey, size: 18),
          SizedBox(width: 12),
          Expanded(
            child: Text(
              'Nobevra optimizes videos for mobile playback. For the best experience, we recommend using YouTube or Vimeo links.',
              style: TextStyle(color: AppColors.darkGrey, fontSize: 12, height: 1.4, fontStyle: FontStyle.italic),
            ),
          ),
        ],
      ),
    );
  }
}
