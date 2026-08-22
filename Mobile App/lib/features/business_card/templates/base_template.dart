import 'package:flutter/material.dart';
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';
import 'package:qr_flutter/qr_flutter.dart';

abstract class BusinessCardTemplate {
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile);
  Widget buildBack(BuildContext context, BrandKit kit, String teamName);

  // ── Common Helpers ─────────────────────────────────────────────────────────
  
  Widget info(IconData icon, String text, {Color color = Colors.black87}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 8, color: color.withOpacity(0.1)),
          const SizedBox(width: 6),
          Flexible(
            child: Text(
              text, 
              style: TextStyle(fontSize: 8, fontWeight: FontWeight.w600, color: color, letterSpacing: 0.5), 
              overflow: TextOverflow.ellipsis
            )
          ),
        ],
      ),
    );
  }

  Widget qr({String? profileId, double size = 40, bool dark = false, Color? border}) {
    final String url = profileId != null ? 'https://nobevra.com/card/$profileId' : 'https://nobevra.com';
    
    return Container(
      padding: const EdgeInsets.all(6),
      decoration: BoxDecoration(
        color: dark ? Colors.white.withOpacity(0.1) : Colors.white, 
        borderRadius: BorderRadius.circular(12), 
        border: Border.all(color: border ?? (dark ? Colors.white24 : Colors.grey.shade200), width: 1.5),
      ),
      child: QrImageView(
        data: url, 
        size: size,
        padding: EdgeInsets.zero,
        eyeStyle: QrEyeStyle(eyeShape: QrEyeShape.square, color: dark ? Colors.white : Colors.black),
        dataModuleStyle: QrDataModuleStyle(dataModuleShape: QrDataModuleShape.square, color: dark ? Colors.white : Colors.black),
      ),
    );
  }
}
