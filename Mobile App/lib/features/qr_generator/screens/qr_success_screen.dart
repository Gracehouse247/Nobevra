import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';
import 'package:provider/provider.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:screenshot/screenshot.dart';
import 'package:image_gallery_saver_plus/image_gallery_saver_plus.dart';
import 'package:share_plus/share_plus.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:io';
import 'package:intl/intl.dart';

class QrSuccessScreen extends StatefulWidget {
  const QrSuccessScreen({super.key});

  @override
  State<QrSuccessScreen> createState() => _QrSuccessScreenState();
}

class _QrSuccessScreenState extends State<QrSuccessScreen> {
  final ScreenshotController _screenshotController = ScreenshotController();
  bool _isDownloading = false;

  String _getQrData(String type, Map<String, dynamic> content) {
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

  Future<void> _downloadQr() async {
    setState(() => _isDownloading = true);
    try {
      // 1. Request Permission
      if (Platform.isAndroid) {
        final status = await Permission.storage.request();
        if (!status.isGranted) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Storage permission required'), backgroundColor: Colors.orange),
            );
          }
          return;
        }
      }

      // 2. Capture and Save
      final uint8list = await _screenshotController.capture();
      if (uint8list != null) {
        final result = await ImageGallerySaverPlus.saveImage(
          uint8list,
          quality: 100,
          name: "nobevra_qr_${DateTime.now().millisecondsSinceEpoch}",
        );
        if (mounted && result['isSuccess']) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('QR Code saved to gallery!'),
              backgroundColor: Colors.green,
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error saving QR: $e'), backgroundColor: Colors.redAccent),
        );
      }
    } finally {
      if (mounted) setState(() => _isDownloading = false);
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
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error sharing QR: $e'), backgroundColor: Colors.redAccent),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<QrGeneratorController>();

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.arrow_back_ios_rounded, size: 20),
        ),
        title: const Text(
          'Success!', 
          style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textBlack),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: _shareQr,
            icon: const Icon(Icons.share_rounded, size: 20, color: AppColors.primary),
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 0,
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(color: AppColors.lightGrey, height: 1),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          child: Column(
            children: [
              // Success Indicator
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.green[50],
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_circle_rounded, color: Colors.green, size: 48),
              ),
              const SizedBox(height: 16),
              Text(
                'Your QR Code is Live',
                style: AppTextStyles.headlineMedium.copyWith(fontWeight: FontWeight.w900, fontSize: 28),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'Scan it to preview your Nobevra experience or share it with your audience.',
                textAlign: TextAlign.center,
                style: AppTextStyles.bodyMedium.copyWith(
                  color: AppColors.textBlack.withOpacity(0.1), 
                  height: 1.4,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 48),
              
              // Smartphone Visualization (Captured Area)
              _buildSmartphoneVisual(controller),
              
              const SizedBox(height: 48),
              
              // Actions
              _buildActions(context),
              
              const SizedBox(height: 32),
              Text(
                controller.lastCreatedAt != null 
                  ? 'Created on ${DateFormat('MMM dd, yyyy • hh:mm a').format(controller.lastCreatedAt!)}'
                  : 'Created Successfully • Ready to Share',
                style: const TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSmartphoneVisual(QrGeneratorController controller) {
    final qrData = _getQrData(controller.type, controller.content);

    return Container(
      width: 240,
      height: 440,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(40),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 30,
            offset: const Offset(0, 20),
          ),
        ],
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Notch
          Positioned(
            top: 0,
            child: Container(
              width: 100,
              height: 18,
              decoration: const BoxDecoration(
                color: Color(0xFFE2E8F0),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(12),
                  bottomRight: Radius.circular(12),
                ),
              ),
            ),
          ),
          // Content
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Screenshot(
                controller: _screenshotController,
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFF1F5F9)),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10)],
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Colors.white, Color(0xFFF8FAFC)],
                    ),
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      QrImageView(
                        data: qrData,
                        version: QrVersions.auto,
                        size: 140.0,
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
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Container(
                          width: 20,
                          height: 20,
                          decoration: BoxDecoration(
                            color: controller.colorPrimary,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: const Icon(Icons.rocket_launch_rounded, color: Colors.white, size: 12),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Text(
                controller.name.toUpperCase(),
                style: const TextStyle(
                  color: Color(0xFF94A3B8), // slate 400
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.verified_rounded, color: controller.colorPrimary, size: 14),
                  const SizedBox(width: 4),
                  Text(
                    'Active Campaign',
                    style: TextStyle(color: controller.colorPrimary, fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActions(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: ElevatedButton.icon(
            onPressed: _isDownloading ? null : _downloadQr,
            icon: _isDownloading 
              ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
              : const Icon(Icons.download_rounded, size: 20),
            label: Text(_isDownloading ? 'Downloading...' : 'Download QR Code'),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 20),
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  // Implement copy dynamic link logic if needed
                },
                icon: const Icon(Icons.content_copy_rounded, size: 18),
                label: const Text('Copy Link'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  backgroundColor: AppColors.primary.withOpacity(0.1),
                  side: BorderSide(color: AppColors.primary.withOpacity(0.1)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, '/qr-performance');
                },
                icon: const Icon(Icons.bar_chart_rounded, size: 20),
                label: const Text('Analytics'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  backgroundColor: AppColors.lightGrey.withOpacity(0.1),
                  side: const BorderSide(color: AppColors.lightGrey),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
