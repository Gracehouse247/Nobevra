import 'dart:io';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';

class BrandKitScreen extends StatefulWidget {
  const BrandKitScreen({super.key});

  @override
  State<BrandKitScreen> createState() => _BrandKitScreenState();
}

class _BrandKitScreenState extends State<BrandKitScreen> {
  Color _primaryColor = const Color(0xFF2563EB);
  Color _secondaryColor = const Color(0xFF1E293B);
  int _selectedColorType = 0; // 0 for primary, 1 for secondary
  String _brandVoice = 'Professional & Trusted';
  File? _logoFile;
  final _picker = ImagePicker();

  static const List<_ColorSwatch> _swatches = [
    _ColorSwatch('Ocean', Color(0xFF2563EB)),
    _ColorSwatch('Emerald', Color(0xFF059669)),
    _ColorSwatch('Violet', Color(0xFF7C3AED)),
    _ColorSwatch('Crimson', Color(0xFFDC2626)),
    _ColorSwatch('Amber', Color(0xFFD97706)),
    _ColorSwatch('Slate', Color(0xFF475569)),
  ];

  static const List<_VoiceOption> _voices = [
    _VoiceOption('Professional & Trusted', Icons.verified_user_rounded, 'Perfect for corporate, legal, or financial brands.'),
    _VoiceOption('Friendly & Approachable', Icons.sentiment_satisfied_alt_rounded, 'Ideal for retail, local services, and apps.'),
    _VoiceOption('Minimalist & Modern', Icons.layers_rounded, 'Clean, direct, and noise-free communication.'),
    _VoiceOption('Caring & Empathetic', Icons.volunteer_activism_rounded, 'Great for healthcare, wellness, and NGOs.'),
  ];
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final brandKit = context.read<BrandController>().brandKit;
      if (brandKit != null) {
        setState(() {
          _primaryColor = brandKit.primaryColor;
          _secondaryColor = brandKit.secondaryColor;
          _brandVoice = brandKit.brandVoice;
        });
      }
    });
  }

  Future<void> _handleSave() async {
    final brandCtrl = context.read<BrandController>();
    final success = await brandCtrl.saveBrandKit(
      BrandKit(
        primaryColor: _primaryColor,
        secondaryColor: _secondaryColor,
        brandVoice: _brandVoice,
        logoUrl: brandCtrl.brandKit?.logoUrl, // Handle logo upload separately if needed
      ),
    );

    if (success && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Identity Kit saved successfully'), backgroundColor: Colors.green),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // ── Mesh Background ──────────────────────────────────────────────────
          Positioned.fill(
            child: Container(
              decoration: const BoxDecoration(
                color: Color(0xFFF8FAFC),
              ),
            ),
          ),
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    _primaryColor.withOpacity(0.1),
                    _primaryColor.withOpacity(0.1),
                  ],
                ),
              ),
            ),
          ),
          
          // ── Main Content ─────────────────────────────────────────────────────
          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              _buildAppBar(),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 100),
                sliver: SliverList(
                  delegate: SliverChildListDelegate([
                    _buildHeader(),
                    const SizedBox(height: 32),
                    _buildGlassCard(
                      title: 'Visual Identity',
                      subtitle: 'Your logo is the heart of your brand.',
                      child: _buildLogoSection(),
                    ),
                    const SizedBox(height: 24),
                    _buildGlassCard(
                      title: 'Colour System',
                      subtitle: 'Set the emotional tone of your business.',
                      child: _buildColorSection(),
                    ),
                    const SizedBox(height: 24),
                    _buildGlassCard(
                      title: 'Communication',
                      subtitle: 'How your AI speaks to your customers.',
                      child: _buildVoiceSection(),
                    ),
                    const SizedBox(height: 32),
                    _buildAssetGalleryBanner(),
                  ]),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAppBar() {
    return SliverAppBar(
      floating: true,
      backgroundColor: Colors.white.withOpacity(0.1),
      elevation: 0,
      stretch: true,
      leading: IconButton(
        icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.black, size: 20),
        onPressed: () => Navigator.pop(context),
      ),
      flexibleSpace: ClipRRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: Container(color: Colors.transparent),
        ),
      ),
      title: const Text(
        'Identity Studio',
        style: TextStyle(color: Colors.black, fontWeight: FontWeight.w900, fontSize: 18, letterSpacing: -0.5),
      ),
      centerTitle: true,
      actions: [
        Padding(
          padding: const EdgeInsets.only(right: 12),
          child: Center(
            child: Consumer<BrandController>(
              builder: (context, brand, _) {
                return TextButton(
                  onPressed: brand.isLoading ? null : _handleSave,
                  style: TextButton.styleFrom(
                    backgroundColor: _primaryColor,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: brand.isLoading 
                    ? const SizedBox(height: 14, width: 14, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Save Kit', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                );
              }
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Brand Kit',
          style: TextStyle(
            fontSize: 34,
            fontWeight: FontWeight.w900,
            color: Colors.black.withOpacity(0.1),
            letterSpacing: -1.2,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Define your business aesthetic once, and let Nobevra automate the rest.',
          style: TextStyle(
            fontSize: 15,
            height: 1.5,
            color: Colors.grey.shade600,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildGlassCard({required String title, required String subtitle, required Widget child}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title.toUpperCase(), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5, color: Colors.black54)),
              const SizedBox(height: 2),
              Text(subtitle, style: TextStyle(fontSize: 13, color: Colors.grey.shade500, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
        Container(
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(28),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 24,
                offset: const Offset(0, 8),
              ),
            ],
            border: Border.all(color: Colors.white, width: 1.5),
          ),
          child: child,
        ),
      ],
    );
  }

  Widget _buildLogoSection() {
    return InkWell(
      onTap: () async {
        final img = await _picker.pickImage(source: ImageSource.gallery);
        if (img != null) setState(() => _logoFile = File(img.path));
      },
      borderRadius: BorderRadius.circular(28),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Row(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(20),
                image: _logoFile != null ? DecorationImage(image: FileImage(_logoFile!), fit: BoxFit.cover) : null,
              ),
              child: _logoFile == null ? Icon(Icons.add_photo_alternate_rounded, color: _primaryColor, size: 32) : null,
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Company Logo', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  const SizedBox(height: 4),
                  Text(
                    _logoFile != null ? 'Logo uploaded' : 'Upload your primary logo',
                    style: TextStyle(color: Colors.grey.shade500, fontSize: 13),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _logoFile != null ? 'Change Logo' : 'Browse Files',
                    style: TextStyle(color: _primaryColor, fontWeight: FontWeight.w700, fontSize: 13),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildColorSection() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          InkWell(
            onTap: () => setState(() => _selectedColorType = 0),
            borderRadius: BorderRadius.circular(16),
            child: _buildColorRow('Primary Brand', _primaryColor, _selectedColorType == 0),
          ),
          const SizedBox(height: 16),
          InkWell(
            onTap: () => setState(() => _selectedColorType = 1),
            borderRadius: BorderRadius.circular(16),
            child: _buildColorRow('Secondary Accent', _secondaryColor, _selectedColorType == 1),
          ),
          const SizedBox(height: 24),
          const Divider(height: 1),
          const SizedBox(height: 20),
          SizedBox(
            height: 48,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _swatches.length,
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemBuilder: (_, i) {
                final s = _swatches[i];
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      if (_selectedColorType == 0) {
                        _primaryColor = s.color;
                      } else {
                        _secondaryColor = s.color;
                      }
                    });
                  },
                  child: Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: s.color,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                      boxShadow: [
                        BoxShadow(color: s.color.withOpacity(0.1), blurRadius: 8, offset: const Offset(0, 4))
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildColorRow(String label, Color color, bool isSelected) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isSelected ? color.withOpacity(0.1) : Colors.transparent,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isSelected ? color.withOpacity(0.1) : Colors.transparent,
          width: 1.5,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 42,
            height: 42,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: color.withOpacity(0.1),
                  blurRadius: isSelected ? 12 : 8,
                  offset: const Offset(0, 4),
                )
              ],
            ),
            child: isSelected ? const Icon(Icons.check_rounded, color: Colors.white, size: 20) : null,
          ),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: TextStyle(fontWeight: isSelected ? FontWeight.w800 : FontWeight.w700, fontSize: 13, color: Colors.black87)),
              Text('#${color.value.toRadixString(16).substring(2).toUpperCase()}', style: TextStyle(fontSize: 12, color: Colors.grey.shade500)),
            ],
          ),
          const Spacer(),
          Icon(Icons.edit_rounded, color: isSelected ? color : Colors.grey.shade400, size: 18),
        ],
      ),
    );
  }

  Widget _buildVoiceSection() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(
        children: _voices.map((v) {
          final isSelected = _brandVoice == v.label;
          return InkWell(
            onTap: () => setState(() => _brandVoice = v.label),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              color: isSelected ? _primaryColor.withOpacity(0.1) : Colors.transparent,
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: isSelected ? _primaryColor.withOpacity(0.1) : const Color(0xFFF1F5F9),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(v.icon, color: isSelected ? _primaryColor : Colors.grey.shade600, size: 18),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(v.label, style: TextStyle(fontWeight: isSelected ? FontWeight.w800 : FontWeight.w700, fontSize: 14)),
                        const SizedBox(height: 2),
                        Text(v.description, style: TextStyle(color: Colors.grey.shade500, fontSize: 11)),
                      ],
                    ),
                  ),
                  if (isSelected) Icon(Icons.check_circle_rounded, color: _primaryColor, size: 20),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildAssetGalleryBanner() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [_primaryColor, _primaryColor.withBlue(220)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(
            color: _primaryColor.withOpacity(0.1),
            blurRadius: 30,
            offset: const Offset(0, 15),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 28),
          const SizedBox(height: 20),
          const Text(
            'Central Asset Gallery',
            style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: -0.5),
          ),
          const SizedBox(height: 8),
          const Text(
            'Keep all your product images and marketing assets in one cloud-synced studio.',
            style: TextStyle(color: Colors.white70, fontSize: 14, height: 1.4, fontWeight: FontWeight.w500),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, AppRoutes.assetGallery),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: _primaryColor,
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text('Access Inventory Studio', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14)),
          ),
        ],
      ),
    );
  }
}

class _ColorSwatch {
  final String name;
  final Color color;
  const _ColorSwatch(this.name, this.color);
}

class _VoiceOption {
  final String label;
  final IconData icon;
  final String description;
  const _VoiceOption(this.label, this.icon, this.description);
}
