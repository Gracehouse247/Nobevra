import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/routes/app_routes.dart';

class QrCustomizationScreen extends StatefulWidget {
  const QrCustomizationScreen({super.key});

  @override
  State<QrCustomizationScreen> createState() => _QrCustomizationScreenState();
}

class _QrCustomizationScreenState extends State<QrCustomizationScreen> {
  final TextEditingController _dataController = TextEditingController(text: 'https://nobevra.com/p/summer-sale');
  Color _selectedColor = AppColors.primary;
  String _selectedFrame = 'Modern';

  final List<Color> _themeColors = [
    AppColors.primary,
    const Color(0xFF101922),
    const Color(0xFFF43F5E), // Rose Accent
    Colors.amber,
    Colors.teal,
    Colors.indigo,
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.1),
        elevation: 0,
        leading: TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.w600)),
        ),
        title: const Text('Edit QR Code', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          Column(
            children: [
              _buildQrPreview(),
              Expanded(
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.vertical(top: Radius.circular(40)),
                    boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 40, offset: Offset(0, -10))],
                  ),
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(24, 32, 24, 120),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildSectionHeader('Link / Data Source'),
                        _buildDataInput(),
                        const SizedBox(height: 32),
                        _buildColorThemeSection(context),
                        const SizedBox(height: 32),
                        _buildLogoSection(context),
                        const SizedBox(height: 32),
                        _buildFrameSection(),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: _buildFooterAction(),
          ),
        ],
      ),
    );
  }

  Widget _buildQrPreview() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
      child: Column(
        children: [
          Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: 220,
                height: 220,
                decoration: BoxDecoration(
                  color: _selectedColor.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
              ),
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(color: _selectedColor.withOpacity(0.1), blurRadius: 30, offset: const Offset(0, 10)),
                  ],
                ),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Image.network(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTanjsDtu-canF8jowniWBdcJKXSdjHnU36Xbps6jM5eFi-h3tH5eBVk2bhgScQfrZgNzMwzOM5ExigLTX2Jy4Zmj9PJG5oz0WfyRIrIHbPvMUzUDVVEtkYfedYlDlG8ClmfEPxgqPsrPgoHX_k7OsUSBA8Fm2DRIWFdvLFLbc7aTEDTNjtB7OPNiuqY1hPzMsLMvt6sS2-w7pTboHdjiZYiFedrwFBy1TnfnfNF1bL9k4nBXuMG6ODedxflf_6NXmpqqQAY8HdtY',
                      width: 160,
                      height: 160,
                      color: _selectedColor,
                    ),
                    Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),
                      child: Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(color: _selectedColor, borderRadius: BorderRadius.circular(8)),
                        child: const Icon(Icons.bolt_rounded, color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFF10B981).withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF10B981).withOpacity(0.1)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.verified_rounded, color: Color(0xFF10B981), size: 14),
                SizedBox(width: 8),
                Text('HIGH SCANABILITY', style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.2)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showUpgradeDialog(String feature) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text('Unlock $feature with Pro'),
        content: const Text('Custom branding, unique QR styles, and advanced analytics are only available on the Noble Pro plan. Upgrade now to stand out.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Later', style: TextStyle(color: Colors.grey)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, AppRoutes.pricingPlans);
            },
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryDark, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
            child: const Text('View Plans', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, {Widget? trailing, bool isPro = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Text(title.toUpperCase(), style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
              if (isPro) ...[
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(color: Colors.amber, borderRadius: BorderRadius.circular(4)),
                  child: const Text('PRO', style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold)),
                ),
              ],
            ],
          ),
          if (trailing != null) trailing,
        ],
      ),
    );
  }

  Widget _buildDataInput() {
    return Container(
      decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(16)),
      child: TextField(
        controller: _dataController,
        decoration: InputDecoration(
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          suffixIcon: TextButton(
            onPressed: () {},
            child: const Text('PASTE', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w900, fontSize: 11)),
          ),
        ),
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
      ),
    );
  }

  Widget _buildColorThemeSection(BuildContext context) {
    final sub = context.read<SubscriptionController>();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(
          'Color Theme',
          isPro: !sub.isPulseOrElite,
          trailing: Text(
            'Custom Hex: #${_selectedColor.toARGB32().toRadixString(16).substring(2).toUpperCase()}',
            style: const TextStyle(color: AppColors.primary, fontSize: 11, fontWeight: FontWeight.bold),
          ),
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              ..._themeColors.asMap().entries.map((entry) {
                int index = entry.key;
                Color color = entry.value;
                bool isSelected = _selectedColor == color;
                bool isPremium  = index > 1; // Primary and Dark are free

                return GestureDetector(
                  onTap: () {
                    if (isPremium && !sub.isPulseOrElite) {
                      _showUpgradeDialog('Custom Colors');
                    } else {
                      setState(() => _selectedColor = color);
                    }
                  },
                  child: Container(
                    width: 48,
                    height: 48,
                    margin: const EdgeInsets.only(right: 12),
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                      border: Border.all(color: isSelected ? Colors.white : Colors.transparent, width: 3),
                      boxShadow: isSelected ? [BoxShadow(color: color.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))] : null,
                    ),
                    child: isPremium && !sub.isPulseOrElite 
                      ? const Icon(Icons.lock_rounded, color: Colors.white30, size: 16) 
                      : null,
                  ),
                );
              }),
              GestureDetector(
                onTap: () => !sub.isPulseOrElite ? _showUpgradeDialog('Color Picker') : null,
                child: Container(
                  width: 48,
                  height: 48,
                  decoration: const BoxDecoration(color: AppColors.background, shape: BoxShape.circle),
                  child: const Icon(Icons.colorize_rounded, color: Colors.grey),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildLogoSection(BuildContext context) {
    final sub = context.read<SubscriptionController>();
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader('Central Logo', isPro: true),
        GestureDetector(
          onTap: () => !sub.isPulseOrElite ? _showUpgradeDialog('Logo Integration') : null,
          child: AbsorbPointer(
            absorbing: !sub.isPulseOrElite,
            child: Opacity(
              opacity: sub.isPulseOrElite ? 1.0 : 0.6,
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.lightGrey, style: BorderStyle.solid),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(color: _selectedColor, borderRadius: BorderRadius.circular(8)),
                            child: const Icon(Icons.bolt_rounded, color: Colors.white),
                          ),
                          const SizedBox(width: 12),
                          const Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('logo_v2.png', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12), overflow: TextOverflow.ellipsis),
                                Text('REMOVE', style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.w900, fontSize: 10)),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Container(
                    width: 80,
                    height: 64,
                    decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(16)),
                    child: const Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.upload_rounded, color: Colors.grey, size: 20),
                        Text('CHANGE', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFrameSection() {
    final frames = ['Modern', 'Classic', 'Abstract', 'None'];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader('Frame Style'),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: frames.map((frame) {
              bool isSelected = _selectedFrame == frame;
              return GestureDetector(
                onTap: () => setState(() => _selectedFrame = frame),
                child: Container(
                  width: 90,
                  margin: const EdgeInsets.only(right: 16),
                  child: Column(
                    children: [
                      Container(
                        width: 80,
                        height: 100,
                        decoration: BoxDecoration(
                          color: AppColors.background,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSelected ? _selectedColor : Colors.transparent, width: 2),
                        ),
                        child: _buildFrameIcon(frame),
                      ),
                      const SizedBox(height: 8),
                      Text(frame.toUpperCase(), style: TextStyle(color: isSelected ? _selectedColor : Colors.grey, fontWeight: FontWeight.w900, fontSize: 10)),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }

  Widget _buildFrameIcon(String frame) {
    switch (frame) {
      case 'Modern':
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(width: 40, height: 40, decoration: BoxDecoration(border: Border.all(color: _selectedColor, width: 2), borderRadius: BorderRadius.circular(4))),
              const SizedBox(height: 8),
              Container(width: 48, height: 6, decoration: BoxDecoration(color: _selectedColor, borderRadius: BorderRadius.circular(3))),
            ],
          ),
        );
      case 'Classic':
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(width: 40, height: 40, decoration: BoxDecoration(border: Border.all(color: Colors.grey.withOpacity(0.1), width: 2), shape: BoxShape.circle)),
              const SizedBox(height: 8),
              Container(width: 32, height: 4, decoration: BoxDecoration(color: Colors.grey.withOpacity(0.1), borderRadius: BorderRadius.circular(2))),
            ],
          ),
        );
      case 'Abstract':
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Transform.rotate(angle: 0.78, child: Container(width: 36, height: 36, decoration: BoxDecoration(border: Border.all(color: Colors.grey.withOpacity(0.1), width: 2)))),
              const SizedBox(height: 12),
              Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.grey.withOpacity(0.1), borderRadius: BorderRadius.circular(2))),
            ],
          ),
        );
      default:
        return const Icon(Icons.block_rounded, color: Colors.grey);
    }
  }

  Widget _buildFooterAction() {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 48),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.white.withOpacity(0.1), Colors.white.withOpacity(0.1), Colors.white],
        ),
      ),
      child: ElevatedButton.icon(
        onPressed: () => Navigator.pop(context),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 60),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          elevation: 8,
          shadowColor: AppColors.primary.withOpacity(0.1),
        ),
        icon: const Icon(Icons.check_circle_rounded),
        label: const Text('Save Changes', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
      ),
    );
  }
}
