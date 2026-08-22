import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/constants/env_constants.dart';
import 'package:provider/provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:screenshot/screenshot.dart';
import 'package:share_plus/share_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'package:image_gallery_saver_plus/image_gallery_saver_plus.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';

class QrPreviewScreen extends StatefulWidget {
  const QrPreviewScreen({super.key});

  @override
  State<QrPreviewScreen> createState() => _QrPreviewScreenState();
}

class _QrPreviewScreenState extends State<QrPreviewScreen> {
  final ScreenshotController _screenshotController = ScreenshotController();
  
  String _getQrData(String type, Map<String, dynamic> content, {String? qrId}) {
    // If we have a QR ID, use the tracking bridge for trackable types
    if (qrId != null && (type == 'website' || type == 'business' || type == 'social_media')) {
      return '${EnvConstants.supabaseUrl}/functions/v1/track-qr?id=$qrId';
    }

    switch (type) {
      case 'website':
        return content['url'] ?? '';
      case 'wifi':
        return 'WIFI:S:${content['ssid']};T:${content['encryption']};P:${content['password']};H:${content['isHidden'] == true ? 'true' : 'false'};;';
      case 'vcard':
        return 'BEGIN:VCARD\nVERSION:3.0\nN:${content['lastName']};${content['firstName']}\nFN:${content['firstName']} ${content['lastName']}\nORG:${content['organization']}\nTITLE:${content['jobTitle']}\nTEL;TYPE=CELL:${content['phone']}\nEMAIL:${content['email']}\nADR;TYPE=WORK:;;${content['address']}\nURL:${content['website']}\nEND:VCARD';
      case 'business':
        final slug = (content['name'] ?? 'business').toString().toLowerCase().trim().replaceAll(RegExp(r'\s+'), '-');
        return 'https://nobevra.noblesworld.com.ng/biz/$slug';
      case 'menu':
        final restaurant = (content['restaurantName'] ?? 'restaurant').toString().toLowerCase().trim().replaceAll(RegExp(r'\s+'), '-');
        return content['menuLink'] ?? 'https://nobevra.noblesworld.com.ng/menu/$restaurant';
      case 'social_media':
        // If there's a primary link, use it, otherwise link to a social hub
        final platforms = content['platforms'] as List?;
        if (platforms != null && platforms.isNotEmpty) {
          return platforms.first['link'] ?? '';
        }
        final username = content['username'] ?? 'user';
        return 'https://nobevra.noblesworld.com.ng/social/$username';
      case 'event':
        return 'BEGIN:VEVENT\nSUMMARY:${content['title']}\nLOCATION:${content['location']}\nDTSTART:${content['startDate']}T${content['startTime']}00Z\nDESCRIPTION:${content['notes']}\nEND:VEVENT';
      case 'bitcoin':
        return 'bitcoin:${content['address']}?amount=${content['amount']}&label=${content['label']}&message=${content['message']}';
      case 'email':
        return 'mailto:${content['email']}?subject=${Uri.encodeComponent(content['subject'] ?? '')}&body=${Uri.encodeComponent(content['body'] ?? '')}';
      case 'whatsapp':
        return 'https://wa.me/${content['phone']}?text=${Uri.encodeComponent(content['message'] ?? '')}';
      case 'sms':
        return 'smsto:${content['phoneNumber']}:${content['message']}';
      case 'location':
        return 'geo:${content['latitude']},${content['longitude']}';
      case 'text':
        return content['text'] ?? '';
      default:
        return 'https://nobevra.com';
    }
  }

  Future<void> _shareQr() async {
    try {
      final uint8list = await _screenshotController.capture();
      if (uint8list != null) {
        final tempDir = await getTemporaryDirectory();
        final file = await File('${tempDir.path}/nobevra_qr.png').create();
        await file.writeAsBytes(uint8list);
        await Share.shareXFiles([XFile(file.path)], text: 'Check out my Nobevra QR code!');
      }
    } catch (e) {
      debugPrint('Error sharing QR: $e');
    }
  }

  Future<void> _downloadQr() async {
    try {
      final uint8list = await _screenshotController.capture();
      if (uint8list != null) {
        final result = await ImageGallerySaverPlus.saveImage(
          uint8list,
          quality: 100,
          name: "nobevra_qr_${DateTime.now().millisecondsSinceEpoch}",
        );
        if (result['isSuccess']) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('QR Code saved to gallery!')),
          );
          Navigator.pushNamed(context, AppRoutes.qrSuccess);
        }
      }
    } catch (e) {
      debugPrint('Error downloading QR: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error saving QR: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<QrGeneratorController>();
    final qrData = _getQrData(controller.type, controller.content, qrId: controller.lastSavedId);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20, color: AppColors.primary),
        ),
        title: Text('QR Preview', style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold)),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            children: [
              const SizedBox(height: 24),
              
              // QR Code Card (Screenshot Area)
              Screenshot(
                controller: _screenshotController,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(32),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(32),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 30,
                        offset: const Offset(0, 15),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          QrImageView(
                            data: qrData,
                            version: QrVersions.auto,
                            size: 240.0,
                            gapless: false,
                            eyeStyle: QrEyeStyle(
                              eyeShape: QrEyeShape.circle,
                              color: controller.colorPrimary,
                            ),
                            dataModuleStyle: QrDataModuleStyle(
                              dataModuleShape: QrDataModuleShape.circle,
                              color: controller.colorPrimary,
                            ),
                          ),
                          // Small Logo Overlay
                          Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Container(
                              width: 36,
                              height: 36,
                              decoration: BoxDecoration(
                                color: controller.colorPrimary,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Icon(Icons.rocket_launch_rounded, color: Colors.white, size: 20),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      Text(
                        controller.name.toUpperCase(),
                        style: AppTextStyles.bodyMedium.copyWith(
                          color: AppColors.darkGrey,
                          fontWeight: FontWeight.w900,
                          fontSize: 12,
                          letterSpacing: 1.2,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Powered by Nobevra',
                        style: TextStyle(color: Colors.grey[400], fontSize: 10, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ),
              
              const SizedBox(height: 40),
              
              // Personalize Section
              _buildPersonalizeSection(controller),
              
              const Spacer(),
              
              // Action Buttons
              _buildActionButtons(context),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPersonalizeSection(QrGeneratorController controller) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'PERSONALIZE DESIGN',
          style: AppTextStyles.bodyMedium.copyWith(
            fontSize: 10,
            fontWeight: FontWeight.w900,
            color: AppColors.darkGrey.withOpacity(0.1),
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 20),
        Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Theme Color', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.blueGrey)),
                  const SizedBox(height: 12),
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        _buildColorOption(controller, AppColors.primary),
                        _buildColorOption(controller, Colors.black),
                        _buildColorOption(controller, const Color(0xFF10B981)),
                        _buildColorOption(controller, const Color(0xFFF43F5E)),
                        _buildColorOption(controller, const Color(0xFF8B5CF6)),
                        _buildColorOption(controller, const Color(0xFFF59E0B)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildColorOption(QrGeneratorController controller, Color color) {
    bool isSelected = controller.colorPrimary == color;
    return GestureDetector(
      onTap: () => controller.setColor(color),
      child: Container(
        margin: const EdgeInsets.only(right: 12),
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
          border: isSelected ? Border.all(color: Colors.white, width: 3) : null,
          boxShadow: isSelected 
              ? [BoxShadow(color: color.withOpacity(0.1), blurRadius: 12, offset: const Offset(0, 4))] 
              : null,
        ),
      ),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          height: 64,
          child: ElevatedButton.icon(
            onPressed: _downloadQr,
            icon: const Icon(Icons.file_download_outlined, size: 20),
            label: const Text('Download & Save Gallery'),
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 4,
              shadowColor: AppColors.primary.withOpacity(0.1),
            ),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: SizedBox(
                height: 56,
                child: OutlinedButton.icon(
                  onPressed: _shareQr,
                  icon: const Icon(Icons.share_rounded, size: 18),
                  label: const Text('Share QR'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.primary,
                    side: BorderSide(color: AppColors.primary.withOpacity(0.1)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: SizedBox(
                height: 56,
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.palette_outlined, size: 18),
                  label: const Text('Advanced'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.darkGrey,
                    side: const BorderSide(color: AppColors.lightGrey),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

