import 'package:flutter/material.dart';
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';
import 'base_template.dart';

// ── 1. CEO ELITE ────────────────────────────────────────────────────────────
class CEOEliteTemplate extends BusinessCardTemplate {
  @override
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile) {
    return Container(
      color: const Color(0xFF1E293B),
      child: Stack(
        children: [
          Positioned(bottom: -50, right: -50, child: Opacity(opacity: 0.05, child: Icon(Icons.shield, size: 250, color: kit.primaryColor))),
          Padding(
            padding: const EdgeInsets.all(28),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text((profile?.businessName ?? 'NOBLE VENTURES').toUpperCase(), style: TextStyle(color: kit.primaryColor, fontWeight: FontWeight.w900, letterSpacing: 3, fontSize: 10)),
                const Spacer(),
                Text(profile?.displayName ?? 'Name', style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900, letterSpacing: -1)),
                Text('CHIEF EXECUTIVE OFFICER', style: TextStyle(color: kit.primaryColor, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(child: info(Icons.phone, profile?.phone ?? '+234 800 000 0000', color: Colors.white70)),
                    Expanded(child: info(Icons.public, 'www.nobevra.com', color: Colors.white70)),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget buildBack(BuildContext context, BrandKit kit, String teamName) {
    return Container(
      color: Colors.black,
      child: Stack(
        children: [
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                qr(size: 60, dark: true, border: kit.primaryColor),
                const SizedBox(height: 16),
                Text(teamName.toUpperCase(), style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w900, letterSpacing: 4)),
                const SizedBox(height: 4),
                Container(width: 20, height: 2, color: kit.primaryColor),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ── 2. MIDNIGHT GOLD ────────────────────────────────────────────────────────
class MidnightGoldTemplate extends BusinessCardTemplate {
  @override
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile) {
    const gold = Color(0xFFD4AF37);
    return Container(
      color: Colors.black,
      child: Stack(
        children: [
           Positioned(top: -40, left: -40, child: Container(width: 150, height: 150, decoration: BoxDecoration(border: Border.all(color: gold.withOpacity(0.1), width: 1)))),
           Padding(
             padding: const EdgeInsets.all(28),
             child: Column(
               crossAxisAlignment: CrossAxisAlignment.start,
               children: [
                  Text(profile?.displayName ?? 'Name', style: const TextStyle(color: gold, fontSize: 32, fontWeight: FontWeight.w900, letterSpacing: -1)),
                  const SizedBox(height: 8),
                  Container(width: 40, height: 3, color: gold),
                  const Spacer(),
                  info(Icons.mail, profile?.email ?? '', color: Colors.white60),
                  info(Icons.location_on, 'Noble Identity HQ', color: Colors.white60),
               ],
             ),
           ),
        ],
      ),
    );
  }

  @override
  Widget buildBack(BuildContext context, BrandKit kit, String teamName) {
    const gold = Color(0xFFD4AF37);
    return Container(
      color: const Color(0xFF1A1A1A),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            qr(size: 50, dark: true, border: gold),
            const SizedBox(height: 16),
            Text(teamName, style: const TextStyle(color: gold, fontSize: 16, fontWeight: FontWeight.w900, letterSpacing: 4)),
          ],
        ),
      ),
    );
  }
}

// ── 3. PRESIDENTIAL ──────────────────────────────────────────────────────────
class PresidentialTemplate extends BusinessCardTemplate {
  @override
  Widget buildFront(BuildContext context, BrandKit kit, UserProfile? profile) {
    return Container(
      color: Colors.white,
      child: Column(
        children: [
          Container(height: 32, color: const Color(0xFF0F172A)),
          Expanded(child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text((profile?.displayName ?? '').toUpperCase(), style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Color(0xFF0F172A), letterSpacing: -0.5)),
                const Text('OFFICIAL REPRESENTATIVE', style: TextStyle(fontSize: 8, letterSpacing: 2, color: Colors.grey, fontWeight: FontWeight.bold)),
                const Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    info(Icons.phone, profile?.phone ?? 'Direct Line'),
                    info(Icons.email, profile?.email ?? 'Official Email'),
                  ],
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }
  @override
  Widget buildBack(BuildContext context, BrandKit kit, String teamName) {
    return Container(
      color: const Color(0xFF0F172A), 
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            qr(size: 50, dark: true, border: kit.primaryColor),
            const SizedBox(height: 12),
            Icon(Icons.account_balance, color: kit.primaryColor, size: 32),
          ],
        ),
      )
    );
  }
}
