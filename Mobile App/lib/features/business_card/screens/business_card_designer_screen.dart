// lib/features/business_card/screens/business_card_designer_screen.dart
import 'dart:math' as math;
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/brand/controllers/brand_controller.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/business_card/controllers/business_card_controller.dart';
import 'package:noble_invoice/features/business_card/widgets/business_card_templates.dart';
import 'package:noble_invoice/core/services/business_card_export_service.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';
import 'package:noble_invoice/features/business_card/models/business_card_model.dart';
import 'package:share_plus/share_plus.dart';
import 'package:noble_invoice/features/wallet/controllers/subscription_controller.dart';
import 'package:noble_invoice/features/wallet/widgets/upgrade_prompt_sheet.dart';
import 'package:noble_invoice/core/services/nfc_service.dart';
import 'package:noble_invoice/features/business_card/widgets/edit_card_details_sheet.dart';

class BusinessCardDesignerScreen extends StatefulWidget {
  final bool showAppBar;
  const BusinessCardDesignerScreen({super.key, this.showAppBar = true});

  @override
  State<BusinessCardDesignerScreen> createState() => _BusinessCardDesignerScreenState();
}

class _BusinessCardDesignerScreenState extends State<BusinessCardDesignerScreen> with AutomaticKeepAliveClientMixin {
  BusinessCardFormat _selectedFormat = BusinessCardFormat.standard;
  Offset _cardRotation = Offset.zero;
  bool _isBackSide = false;
  bool _isExporting = false;
  final ScrollController _scrollController = ScrollController();
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<BrandController>().loadBrandKit();
      context.read<BusinessCardController>().loadCurrentCard();
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final cardCtrl = context.watch<BusinessCardController>();
    final brandKit = context.watch<BrandController>().brandKit;
    final profile = context.watch<ProfileController>().profile;
    final activeTeam = context.watch<TeamController>().activeTeam;

    final currentTemplate = TemplateRegistry.templates[cardCtrl.currentCard?.templateId ?? 'modern_minimal'] ?? ModernMinimalTemplate();
    final kit = brandKit ?? BrandKit(primaryColor: AppColors.primary, secondaryColor: AppColors.secondary, brandVoice: 'Professional');

    final resolvedProfile = _getEffectiveProfile(profile ?? UserProfile(id: '', email: ''), cardCtrl.currentCard);


    if (kit.primaryColor.value == 0xFF2563EB) { // If it's the default blue, but user wants million dollar design, we can use a more boutique color?
      // No, we stick to their brand kit but make the UI around it premium.
    }

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9), // Subtle Off-White/Grey
      extendBodyBehindAppBar: true,
      appBar: widget.showAppBar ? _buildAppBar(kit.primaryColor, kit, resolvedProfile, activeTeam, currentTemplate, cardCtrl) : null,
      body: Stack(
        children: [
          // ── Background Aesthetic ───────────────────────────────────────────
          Positioned(
            top: -150, right: -150,
            child: Container(
              width: 400, height: 400,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: kit.primaryColor.withOpacity(0.1),
              ),
            ),
          ),
          
          Column(
            children: [
              const SizedBox(height: kToolbarHeight + 40),
              
              // ── 3D Card Stage ────────────────────────────────────────────────
              Expanded(
                flex: 3,
                child: Container(
                  width: double.infinity,
                  margin: const EdgeInsets.symmetric(horizontal: 20),
                  child: Center(
                    child: AbsorbPointer(
                      absorbing: _isExporting,
                      child: GestureDetector(
                        onPanUpdate: (details) {
                          setState(() {
                            _cardRotation += details.delta * 0.01;
                          });
                        },
                        onDoubleTap: () => setState(() => _isBackSide = !_isBackSide),
                        child: Hero(
                          tag: 'card_design',
                          child: _build3DCard(kit, resolvedProfile, activeTeam, currentTemplate),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              
              // ── Designer Controls ──────────────────────────────────────────
              _buildBottomControls(kit, cardCtrl),
            ],
          ),
          
          if (_isExporting) // Global loading overlay
            BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
              child: Container(
                color: Colors.white.withOpacity(0.1),
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CircularProgressIndicator(color: kit.primaryColor, strokeWidth: 3),
                      const SizedBox(height: 20),
                      Text('GENERATING PRINT-READY FILE', style: TextStyle(color: kit.secondaryColor, fontWeight: FontWeight.bold, letterSpacing: 2, fontSize: 12)),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(Color brandColor, BrandKit kit, UserProfile? profile, dynamic team, BusinessCardTemplate template, BusinessCardController cardCtrl) {
    return AppBar(
      backgroundColor: Colors.transparent,
      elevation: 0,
      leading: Navigator.canPop(context) 
          ? Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 10)]),
                child: IconButton(
                  icon: const Icon(Icons.close_rounded, color: Colors.black87, size: 20),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            )
          : null,
      title: Column(
        children: [
          Text('PREMIUM BUILDER', style: TextStyle(color: brandColor.withOpacity(0.1), fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 2)),
          const Text('Noble Identity', style: TextStyle(color: Color(0xFF1E293B), fontSize: 16, fontWeight: FontWeight.w900)),
        ],
      ),
      centerTitle: true,
      actions: [
        Padding(
          padding: const EdgeInsets.only(right: 16, top: 8, bottom: 8),
          child: _isExporting 
              ? const SizedBox(width: 80, child: Center(child: SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2))))
              : ElevatedButton(
            onPressed: () => _handleExport(kit, profile, team, template),
            style: ElevatedButton.styleFrom(
              backgroundColor: brandColor,
              foregroundColor: Colors.white,
              elevation: 4,
              shadowColor: brandColor.withOpacity(0.1),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              padding: const EdgeInsets.symmetric(horizontal: 24),
            ),
            child: const Text('Export', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13)),
          ),
        ),
      ],
    );
  }

  Future<void> _handleExport(BrandKit kit, UserProfile? profile, dynamic team, BusinessCardTemplate template) async {
    final sub = context.read<SubscriptionController>();
    if (!sub.canUse('business_card_print')) {
      UpgradePromptSheet.show(context, 'PDF Export & Print-Ready Cards');
      return;
    }

    setState(() => _isExporting = true);
    try {
      final file = await BusinessCardExportService.exportToPdf(
        context: context,
        template: template,
        kit: kit,
        profile: profile ?? UserProfile(id: '', email: ''),
        teamName: team?.name,
        format: _selectedFormat,
      );
      
      if (mounted) {
        await Share.shareXFiles(
          [XFile(file.path)], 
          text: 'Print-ready business card for ${profile?.displayName ?? 'User'}',
          subject: 'Business Card - ${profile?.displayName ?? 'User'}',
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Export failed: $e')));
      }
    } finally {
      if (mounted) setState(() => _isExporting = false);
    }
  }

  UserProfile _getEffectiveProfile(UserProfile profile, BusinessCard? card) {
    if (card == null) return profile;
    return profile.copyWith(
      displayName: (card.customName != null && card.customName!.isNotEmpty) ? card.customName : profile.displayName,
      company:     (card.customTitle != null && card.customTitle!.isNotEmpty) ? card.customTitle : profile.company, // Using company as title placeholder if needed, or mapping correctly
      phone:       (card.customPhone != null && card.customPhone!.isNotEmpty) ? card.customPhone : profile.phone,
      email:       (card.customEmail != null && card.customEmail!.isNotEmpty) ? card.customEmail : profile.email,
      businessAddress: (card.customAddress != null && card.customAddress!.isNotEmpty) ? card.customAddress : profile.businessAddress,
    );
  }

  Widget _build3DCard(BrandKit kit, UserProfile profile, dynamic team, BusinessCardTemplate template) {
    final teamName = team?.name ?? 'NOBLE VENTURES';
    double cardWidth = 320;
    double cardHeight = cardWidth * (_selectedFormat.height / _selectedFormat.width);

    return TweenAnimationBuilder<double>(
      tween: Tween<double>(begin: 0, end: _isBackSide ? math.pi : 0),
      duration: const Duration(milliseconds: 800),
      curve: Curves.elasticOut,
      builder: (context, flipProgress, _) {
        final isBack = flipProgress.abs() > (math.pi / 2);
        
        return Transform(
          transform: Matrix4.identity()
            ..setEntry(3, 2, 0.001)
            ..rotateY(flipProgress + _cardRotation.dx)
            ..rotateX(_cardRotation.dy),
          alignment: Alignment.center,
          child: isBack
              ? Transform(
                  transform: Matrix4.identity()..rotateY(math.pi),
                  alignment: Alignment.center,
                  child: _buildCardContainer(
                    template.buildBack(context, kit, teamName),
                    cardWidth, cardHeight, kit.primaryColor,
                  ),
                )
              : _buildCardContainer(
                  template.buildFront(context, kit, profile ?? UserProfile(id: '', email: '')),
                  cardWidth, cardHeight, kit.primaryColor,
                ),
        );
      },
    );
  }

  Widget _buildCardContainer(Widget child, double w, double h, Color accent) {
    final double logicalWidth = 400.0;
    final double logicalHeight = logicalWidth * (h / w);

    return Container(
      width: w, height: h,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 40, offset: const Offset(0, 20)),
          BoxShadow(color: accent.withOpacity(0.1), blurRadius: 24, spreadRadius: -8),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: FittedBox(
        fit: BoxFit.fill,
        child: SizedBox(
          width: logicalWidth,
          height: logicalHeight,
          child: child,
        ),
      ),
    );
  }


  Widget _buildBottomControls(BrandKit kit, BusinessCardController cardCtrl) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(28, 32, 28, 48),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.only(topLeft: Radius.circular(40), topRight: Radius.circular(40)),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.1), blurRadius: 40, offset: const Offset(0, -10)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('FORMAT SIZE', style: TextStyle(color: Colors.black45, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
              TextButton.icon(
                onPressed: () => _handleNfcWrite(),
                icon: const Icon(Icons.nfc_rounded, size: 16),
                label: const Text('Write NFC', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                style: TextButton.styleFrom(foregroundColor: kit.primaryColor),
              ),
            ],
          ),
          const SizedBox(height: 8),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            child: Row(
              children: [
                ...BusinessCardFormat.values.map((f) => _buildFormatChip(f, kit)),
                const SizedBox(width: 12),
                _buildActionChip(
                  icon: Icons.edit_note_rounded,
                  label: 'CUSTOMIZE INFO',
                  kit: kit,
                  onTap: () {
                    if (cardCtrl.currentCard == null) return;
                    showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      backgroundColor: Colors.transparent,
                      builder: (_) => EditCardDetailsSheet(card: cardCtrl.currentCard!),
                    );
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          const Text('PREMIUM TEMPLATES', style: TextStyle(color: Colors.black45, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
          const SizedBox(height: 16),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            child: Row(
              children: TemplateRegistry.getAllIds().map((id) => _buildTemplateChip(id, kit)).toList(),
            ),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () => setState(() => _isBackSide = !_isBackSide),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1E293B), // Navy/Slate
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 64),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              elevation: 4,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(_isBackSide ? Icons.view_sidebar_rounded : Icons.flip_rounded, size: 20),
                const SizedBox(width: 12),
                Text(_isBackSide ? 'REVEAL FRONT' : 'REVEAL BACK', style: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFormatChip(BusinessCardFormat f, BrandKit kit) {
    final isSelected = _selectedFormat == f;
    return GestureDetector(
      onTap: () => setState(() => _selectedFormat = f),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        margin: const EdgeInsets.only(right: 12),
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        decoration: BoxDecoration(
          color: isSelected ? kit.primaryColor : Colors.black.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: isSelected ? kit.primaryColor : Colors.transparent, width: 2),
        ),
        child: Column(
          children: [
            Text(f.name.toUpperCase(), style: TextStyle(color: isSelected ? Colors.white : Colors.black87, fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 1)),
            Text('${f.width}" x ${f.height}"', style: TextStyle(color: isSelected ? Colors.white70 : Colors.black45, fontSize: 10, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildTemplateChip(String id, BrandKit kit) {
    final cardCtrl = context.read<BusinessCardController>();
    final isSelected = cardCtrl.currentCard?.templateId == id;
    
    return GestureDetector(
      onTap: () {
        if (cardCtrl.currentCard == null) return;
        final updated = cardCtrl.currentCard!.copyWith(templateId: id);
        cardCtrl.updateLocal(updated);
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        margin: const EdgeInsets.only(right: 12),
        width: 120,
        height: 72,
        decoration: BoxDecoration(
          color: isSelected ? kit.primaryColor : Colors.black.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: isSelected ? kit.primaryColor : Colors.transparent, width: 2),
          boxShadow: isSelected ? [BoxShadow(color: kit.primaryColor.withOpacity(0.1), blurRadius: 10, offset: const Offset(0, 4))] : null,
        ),
        child: Center(
          child: Text(
            id.split('_').map((e) => e[0].toUpperCase() + e.substring(1)).join(' '),
            textAlign: TextAlign.center,
            style: TextStyle(color: isSelected ? Colors.white : Colors.black87, fontSize: 10, fontWeight: FontWeight.w900),
          ),
        ),
      ),
    );
  }

  void _handleNfcWrite() {
    final profile = context.read<ProfileController>().profile;
    if (profile == null) return;

    final String profileUrl = 'https://nobevra.com/card/${profile.id}';

    NfcService.instance.writeUrlToTag(
      url: profileUrl,
      onStart: () {
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (ctx) => AlertDialog(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            content: const Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.nfc_rounded, size: 60, color: AppColors.primary),
                SizedBox(height: 20),
                Text('Ready to Write', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
                SizedBox(height: 10),
                Text('Hold your NFC card near the back of your phone.', textAlign: TextAlign.center, style: TextStyle(color: Colors.black54)),
                SizedBox(height: 20),
                CircularProgressIndicator(),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Cancel'),
              ),
            ],
          ),
        );
      },
      onSuccess: () {
        if (mounted) {
          Navigator.pop(context); // Close dialog
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('NFC Tag successfully written!'), backgroundColor: AppColors.success),
          );
        }
      },
      onError: (err) {
        if (mounted) {
          Navigator.pop(context); // Close dialog
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('NFC Error: $err'), backgroundColor: AppColors.error),
          );
        }
      },
    );
  }
  Widget _buildActionChip({required IconData icon, required String label, required BrandKit kit, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        decoration: BoxDecoration(
          color: kit.secondaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: kit.secondaryColor.withOpacity(0.2), width: 1.5),
        ),
        child: Row(
          children: [
            Icon(icon, size: 16, color: kit.secondaryColor),
            const SizedBox(width: 8),
            Text(label, style: TextStyle(color: kit.secondaryColor, fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 1)),
          ],
        ),
      ),
    );
  }
}
