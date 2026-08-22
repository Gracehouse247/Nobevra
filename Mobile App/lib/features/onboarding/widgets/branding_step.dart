import 'dart:io';
import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class BrandingStep extends StatelessWidget {
  final File? logoPreview;
  final Color primaryColor;
  final Color secondaryColor;
  final int activeColorType;
  final String selectedVoice;
  final Function(File) onLogoChanged;
  final Function(Color) onPrimaryChanged;
  final Function(Color) onSecondaryChanged;
  final Function(int) onColorTypeChanged;
  final Function(String) onVoiceChanged;

  const BrandingStep({
    super.key,
    required this.logoPreview,
    required this.primaryColor,
    required this.secondaryColor,
    required this.activeColorType,
    required this.selectedVoice,
    required this.onLogoChanged,
    required this.onPrimaryChanged,
    required this.onSecondaryChanged,
    required this.onColorTypeChanged,
    required this.onVoiceChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: FadeInRight(
        duration: const Duration(milliseconds: 500),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Visual DNA', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, letterSpacing: -1.2)),
            const SizedBox(height: 8),
            Text('Sync your colors and logo across all client assets.', style: TextStyle(color: Colors.grey.shade600, fontSize: 16)),
            const SizedBox(height: 32),
            
            _buildLogoUploader(),
            const SizedBox(height: 32),
            
            _buildColorStrategy(),
            const SizedBox(height: 32),
            
            _buildVoicePicker(),
          ],
        ),
      ),
    );
  }

  Widget _buildLogoUploader() {
    return InkWell(
      onTap: () async {
        final img = await ImagePicker().pickImage(source: ImageSource.gallery);
        if (img != null) onLogoChanged(File(img.path));
      },
      child: _StepGlassContainer(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Container(
              width: 70, height: 70,
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(16),
                image: logoPreview != null ? DecorationImage(image: FileImage(logoPreview!), fit: BoxFit.cover) : null,
              ),
              child: logoPreview == null ? Icon(Icons.add_photo_alternate_rounded, color: primaryColor) : null,
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Brand Logo', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  Text(logoPreview == null ? 'Recommended: PNG with transparent background.' : 'Logo successfully added.', 
                       style: TextStyle(fontSize: 12, color: Colors.grey.shade500)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildColorStrategy() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('COLOR STRATEGY', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 1.2)),
        const SizedBox(height: 12),
        Row(
          children: [
            _buildInteractiveColorRow('Primary', primaryColor, activeColorType == 0, () => onColorTypeChanged(0)),
            const SizedBox(width: 12),
            _buildInteractiveColorRow('Accent', secondaryColor, activeColorType == 1, () => onColorTypeChanged(1)),
          ],
        ),
        const SizedBox(height: 16),
        _buildPaletteStrip(),
      ],
    );
  }

  Widget _buildInteractiveColorRow(String label, Color color, bool isActive, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: isActive ? color.withOpacity(0.1) : Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: isActive ? color : Colors.grey.shade200, width: 1.5),
          ),
          child: Row(
            children: [
              Container(width: 24, height: 24, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
              const SizedBox(width: 10),
              Text(label, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
              const Spacer(),
              if (isActive) Icon(Icons.check_circle_rounded, color: color, size: 16),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPaletteStrip() {
    final colors = [const Color(0xFF2563EB), const Color(0xFF059669), const Color(0xFF7C3AED), const Color(0xFFDC2626), const Color(0xFFD97706), const Color(0xFF475569)];
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: colors.map((c) => GestureDetector(
          onTap: () {
            if (activeColorType == 0) {
              onPrimaryChanged(c);
            } else {
              onSecondaryChanged(c);
            }
          },
          child: Container(
            margin: const EdgeInsets.only(right: 12),
            width: 40, height: 40,
            decoration: BoxDecoration(color: c, shape: BoxShape.circle, border: Border.all(color: Colors.white, width: 2)),
          ),
        )).toList(),
      ),
    );
  }

  Widget _buildVoicePicker() {
    final personas = const [
      _VoicePersona(
        name: 'Professional',
        tagline: 'Formal & Authoritative',
        emoji: '💼',
        preview: 'Please find attached Invoice #1042 for your review. Payment is due within 14 business days.',
      ),
      _VoicePersona(
        name: 'Modern',
        tagline: 'Clean & Tech-First',
        emoji: '🚀',
        preview: 'Your invoice is ready! Let’s keep building great things together.',
      ),
      _VoicePersona(
        name: 'Friendly',
        tagline: 'Warm & Approachable',
        emoji: '👋',
        preview: 'Thanks a bunch for working with us! Here is your quick invoice summary.',
      ),
      _VoicePersona(
        name: 'Luxury',
        tagline: 'Elegant & Refined',
        emoji: '💎',
        preview: 'It is our distinct honor to serve you. Your statement of account is enclosed.',
      ),
      _VoicePersona(
        name: 'Bold',
        tagline: 'Direct & High-Energy',
        emoji: '⚡',
        preview: 'Invoice ready. Let’s hit our targets and make moves!',
      ),
      _VoicePersona(
        name: 'Caring',
        tagline: 'Thoughtful & Supportive',
        emoji: '🤝',
        preview: 'We truly appreciate your partnership. Please reach out if you have any questions.',
      ),
      _VoicePersona(
        name: 'Minimal',
        tagline: 'Concise & No-Clutter',
        emoji: '🎯',
        preview: 'Invoice #1042 attached. Due net 14 days.',
      ),
      _VoicePersona(
        name: 'Expert',
        tagline: 'Insightful & Data-Driven',
        emoji: '🎓',
        preview: 'Enclosed is the comprehensive breakdown of deliverables for Q3.',
      ),
    ];

    final activePersona = personas.firstWhere(
      (p) => p.name.toLowerCase() == selectedVoice.toLowerCase(),
      orElse: () => personas.first,
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'BRAND VOICE & COMMUNICATION STYLE',
              style: TextStyle(
                fontFamily: 'Inter',
                fontWeight: FontWeight.w900,
                fontSize: 11,
                letterSpacing: 1.2,
                color: Color(0xFF64748B),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: const Color(0xFFE8F7FD),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                'AI Config',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF013948),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),

        // Persona Cards Grid
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            childAspectRatio: 2.3,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemCount: personas.length,
          itemBuilder: (context, index) {
            final p = personas[index];
            final isSelected = selectedVoice.toLowerCase() == p.name.toLowerCase();

            return InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () => onVoiceChanged(p.name),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 250),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: isSelected ? const Color(0xFF013948) : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isSelected ? const Color(0xFF013948) : const Color(0xFFE2E8F0),
                    width: isSelected ? 2 : 1,
                  ),
                  boxShadow: [
                    if (isSelected)
                      BoxShadow(
                        color: const Color(0xFF013948).withValues(alpha: 0.2),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                  ],
                ),
                child: Row(
                  children: [
                    Text(p.emoji, style: const TextStyle(fontSize: 22)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            p.name,
                            style: TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 13,
                              fontWeight: FontWeight.w800,
                              color: isSelected ? Colors.white : const Color(0xFF191C1D),
                            ),
                          ),
                          Text(
                            p.tagline,
                            style: TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 10,
                              fontWeight: FontWeight.w500,
                              color: isSelected ? Colors.white70 : const Color(0xFF64748B),
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    if (isSelected)
                      const Icon(Icons.check_circle_rounded, color: Colors.white, size: 16),
                  ],
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 16),

        // Live Quote Sample Preview Box (Dual-Coding Theory UX)
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFF8FAFC),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.auto_awesome_rounded, size: 16, color: Color(0xFF013948)),
                  const SizedBox(width: 6),
                  Text(
                    'LIVE CLIENT EMAIL PREVIEW (${activePersona.name.toUpperCase()})',
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.8,
                      color: Color(0xFF013948),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                '"${activePersona.preview}"',
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 13,
                  fontStyle: FontStyle.italic,
                  height: 1.4,
                  color: Color(0xFF334155),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _VoicePersona {
  final String name;
  final String tagline;
  final String emoji;
  final String preview;

  const _VoicePersona({
    required this.name,
    required this.tagline,
    required this.emoji,
    required this.preview,
  });
}

class _StepGlassContainer extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  const _StepGlassContainer({required this.child, this.padding});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.7),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white, width: 1.5),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 20, offset: const Offset(0, 8))],
      ),
      child: child,
    );
  }
}
