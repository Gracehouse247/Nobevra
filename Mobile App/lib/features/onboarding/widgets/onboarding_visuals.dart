import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class PremiumVisual extends StatelessWidget {
  final int index;

  const PremiumVisual({super.key, required this.index});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 320),
        child: Stack(
          alignment: Alignment.center,
          clipBehavior: Clip.none,
          children: [
            // Background Glow
            Positioned(
              top: 40,
              child: Container(
                width: 240,
                height: 240,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary.withOpacity(0.05),
                ),
              ),
            ),
            
            // Slide Specific Visuals
            if (index == 0) ...[
              const SmartphoneMockup(),
              const FloatingIcon(icon: Icons.qr_code_2_rounded, color: AppColors.primary, top: 60, left: -30, rotation: -0.2),
              const FloatingIcon(icon: Icons.auto_awesome_rounded, color: Colors.purple, top: 30, right: -40, rotation: 0.1, isLarge: true),
              const FloatingInvoicingCard(bottom: 60, right: -20, rotation: -0.05),
            ] else if (index == 1) ...[
              const TabletInvoicingMockup(),
              const FloatingIcon(icon: Icons.check_circle, color: Colors.green, bottom: -10, left: -10, rotation: 0),
            ] else if (index == 2) ...[
              const BusinessCardMockup(),
              const MenuMockup(),
            ] else if (index == 3) ...[
              const FinalCelebrationMockup(),
              const FloatingIcon(icon: Icons.verified_rounded, color: AppColors.primary, bottom: 40, right: -10, rotation: 0, isLarge: true),
            ],
          ],
        ),
      ),
    );
  }
}

class SmartphoneMockup extends StatelessWidget {
  const SmartphoneMockup({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160,
      height: 320,
      decoration: BoxDecoration(
        color: const Color(0xFF101922),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: const Color(0xFF1F2937), width: 4),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 30, offset: const Offset(0, 20))],
      ),
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [
          Container(width: 70, height: 14, decoration: BoxDecoration(color: const Color(0xFF1F2937), borderRadius: BorderRadius.circular(10)), margin: const EdgeInsets.only(bottom: 10)),
          Expanded(
            child: Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18)),
              padding: const EdgeInsets.all(10),
              child: SingleChildScrollView(
                physics: const NeverScrollableScrollPhysics(),
                child: Column(
                  children: [
                    Container(width: double.infinity, height: 30, decoration: BoxDecoration(color: Colors.grey.shade50, borderRadius: BorderRadius.circular(6))),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(child: Container(height: 40, decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(8)))),
                        const SizedBox(width: 8),
                        Expanded(child: Container(height: 40, decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(8)))),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Container(width: double.infinity, height: 60, decoration: BoxDecoration(color: Colors.grey.shade50, borderRadius: BorderRadius.circular(8))),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class BusinessCardMockup extends StatelessWidget {
  const BusinessCardMockup({super.key});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: -20,
      bottom: 40,
      child: Transform.rotate(
        angle: -0.2,
        child: Container(
          width: 220,
          height: 140,
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 20, offset: const Offset(0, 10))],
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Container(width: 80, height: 12, decoration: BoxDecoration(color: Colors.white.withOpacity(0.3), borderRadius: BorderRadius.circular(6))),
                    const SizedBox(height: 8),
                    Container(width: 50, height: 8, decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(4))),
                  ]),
                  Container(width: 32, height: 32, decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(8)), child: const Icon(Icons.stars, color: Colors.white, size: 16)),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),
                    padding: const EdgeInsets.all(4),
                    child: const Icon(Icons.qr_code_2_rounded, color: AppColors.primary, size: 40),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MenuMockup extends StatelessWidget {
  const MenuMockup({super.key});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: -20,
      top: 40,
      child: Transform.rotate(
        angle: 0.1,
        child: Container(
          width: 180,
          height: 240,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.shade100),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 20, offset: const Offset(4, 10))],
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(width: 100, height: 16, decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(8))),
              const SizedBox(height: 12),
              Container(width: double.infinity, height: 8, decoration: BoxDecoration(color: Colors.grey.shade50, borderRadius: BorderRadius.circular(4))),
              const SizedBox(height: 8),
              Container(width: 120, height: 8, decoration: BoxDecoration(color: Colors.grey.shade50, borderRadius: BorderRadius.circular(4))),
              const Spacer(),
              Center(
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(border: Border.all(color: AppColors.primary, width: 2), borderRadius: BorderRadius.circular(12)),
                  padding: const EdgeInsets.all(8),
                  child: const Icon(Icons.qr_code_2_rounded, color: AppColors.primary, size: 60),
                ),
              ),
              const Spacer(),
              Center(child: Container(width: 60, height: 10, decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(5)))),
            ],
          ),
        ),
      ),
    );
  }
}

class TabletInvoicingMockup extends StatelessWidget {
  const TabletInvoicingMockup({super.key});

  @override
  Widget build(BuildContext context) {
    return Transform.rotate(
      angle: -0.05,
      child: Container(
        width: 240,
        height: 180,
        decoration: BoxDecoration(
          color: const Color(0xFF101922),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.blueGrey.shade800, width: 2),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 30, offset: const Offset(0, 15))],
        ),
        padding: const EdgeInsets.all(12),
        child: Container(
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
          padding: const EdgeInsets.all(12),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(width: 40, height: 8, decoration: BoxDecoration(color: AppColors.primary.withOpacity(0.2), borderRadius: BorderRadius.circular(4))),
                  Container(width: 30, height: 8, decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(4))),
                ],
              ),
              const SizedBox(height: 20),
              ...List.generate(3, (i) => Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Container(width: double.infinity, height: 6, decoration: BoxDecoration(color: Colors.grey.shade50, borderRadius: BorderRadius.circular(3))),
              )),
              const Spacer(),
              Container(
                width: double.infinity,
                height: 32,
                decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(8), boxShadow: [BoxShadow(color: AppColors.primary.withOpacity(0.2), blurRadius: 10, offset: const Offset(0, 4))]),
                child: const Row(mainAxisAlignment: MainAxisAlignment.center, children: [Icon(Icons.send, color: Colors.white, size: 14), SizedBox(width: 8), Text('SEND INVOICE', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold))]),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FinalCelebrationMockup extends StatelessWidget {
  const FinalCelebrationMockup({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      height: 280,
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Stack(
          alignment: Alignment.center,
          children: [
            const Icon(Icons.rocket_launch_rounded, color: AppColors.primary, size: 120),
            ...List.generate(8, (i) {
              final angle = (i * 45) * 3.14159 / 180;
              return Transform.translate(
                offset: Offset(80 * (angle % 2 == 0 ? 1 : 0.8) * (angle > 1.5 ? -1 : 1), 80 * (angle < 0.8 ? -1 : 1)),
                child: Icon(Icons.star, color: AppColors.primary.withOpacity(0.3), size: 24),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class FloatingIcon extends StatelessWidget {
  final IconData icon;
  final Color color;
  final double? top, left, right, bottom;
  final double rotation;
  final bool isLarge;

  const FloatingIcon({
    super.key,
    required this.icon,
    required this.color,
    this.top,
    this.left,
    this.right,
    this.bottom,
    required this.rotation,
    this.isLarge = false,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      child: Transform.rotate(
        angle: rotation,
        child: Container(
          width: isLarge ? 80 : 64,
          height: isLarge ? 80 : 64,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.8),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: color.withOpacity(0.2)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: color, size: isLarge ? 32 : 24),
              if (isLarge) ...[
                const SizedBox(height: 4),
                Container(
                  width: 32,
                  height: 4,
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class FloatingInvoicingCard extends StatelessWidget {
  final double? top, left, right, bottom;
  final double rotation;

  const FloatingInvoicingCard({
    super.key,
    this.top,
    this.left,
    this.right,
    this.bottom,
    required this.rotation,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      child: Transform.rotate(
        angle: rotation,
        child: Container(
          width: 100,
          height: 60,
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.8),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.receipt_long_rounded, color: Color(0xFF10B981), size: 16),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      height: 4,
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      width: 20,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
