import 'package:flutter/material.dart';
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';
import 'base_template.dart';

// ── 4. GLASS ALPHA ──────────────────────────────────────────────────────────
class GlassAlphaTemplate extends BusinessCardTemplate {
  @override
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [kit.primaryColor.withOpacity(0.1), kit.secondaryColor.withOpacity(0.1)]),
      ),
      child: Stack(
        children: [
          _circles(),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const CircleAvatar(backgroundColor: Colors.white24, child: Icon(Icons.person, color: Colors.white)),
                const Spacer(),
                Text(profile?.displayName ?? 'Name', style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                Text(profile?.email ?? '', style: const TextStyle(color: Colors.white70, fontSize: 10)),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    info(Icons.link, 'nobevra.com/${profile?.id ?? ''}', color: Colors.white),
                    qr(size: 35),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _circles() {
    return Positioned(top: -50, right: -50, child: Container(width: 200, height: 200, decoration: const BoxDecoration(shape: BoxShape.circle, color: Colors.white10)));
  }

  @override
  Widget buildBack(BuildContext context, BrandKit kit, String teamName) {
    return Container(color: Colors.white, child: Center(child: Text(teamName, style: TextStyle(color: kit.primaryColor, fontSize: 20, fontWeight: FontWeight.w900))));
  }
}

// ── 5. ORGANIC WAVE ─────────────────────────────────────────────────────────
class OrganicWaveTemplate extends BusinessCardTemplate {
  @override
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile) {
    return Container(
      color: const Color(0xFFFDFCFB),
      child: Stack(
        children: [
          Positioned(top: -20, right: -20, child: _blob(kit.primaryColor.withOpacity(0.1))),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(profile?.displayName ?? 'Name', style: TextStyle(color: kit.primaryColor, fontSize: 22, fontWeight: FontWeight.w300)),
                const SizedBox(height: 8),
                Text('CREATIVE DIRECTOR', style: TextStyle(color: Colors.grey.shade400, fontSize: 9, letterSpacing: 2)),
                const Spacer(),
                info(Icons.web, 'www.nobevra.com' ?? 'portfolio.design'),
                info(Icons.mail_outline, profile?.email ?? ''),
              ],
            ),
          ),
          Positioned(bottom: 24, right: 24, child: qr(size: 40)),
        ],
      ),
    );
  }

  Widget _blob(Color color) {
    return Container(width: 150, height: 150, decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(100)));
  }

  @override
  Widget buildBack(BuildContext context, BrandKit kit, String teamName) {
    return Container(color: kit.primaryColor, child: Center(child: Icon(Icons.waves, color: Colors.white.withOpacity(0.1), size: 100)));
  }
}

// ── 6. POP ART ───────────────────────────────────────────────────────────────
class PopArtTemplate extends BusinessCardTemplate {
  @override
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile) {
    return Container(
      color: Colors.yellow,
      child: Stack(
        children: [
          Positioned(right: 0, bottom: 0, child: Container(width: 100, height: 100, color: Colors.cyan)),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(padding: const EdgeInsets.all(4), color: Colors.black, child: Text((profile?.displayName ?? '').toUpperCase(), style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w900))),
                const SizedBox(height: 4),
                const Text('ARTIST & VISIONARY', style: TextStyle(backgroundColor: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                const Spacer(),
                info(Icons.phone_android, profile?.phone ?? 'Direct', color: Colors.black),
              ],
            ),
          ),
        ],
      ),
    );
  }
  @override
  Widget buildBack(BuildContext context, BrandKit kit, String teamName) {
    return Container(color: Colors.pink, child: const Center(child: Text('BOOM!', style: TextStyle(fontSize: 40, fontWeight: FontWeight.w900, fontStyle: FontStyle.italic, color: Colors.white))));
  }
}
