// lib/features/invoicing/screens/settings/invoice_branding_screen.dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/features/profile/controllers/team_controller.dart';
import 'package:noble_invoice/features/invoicing/widgets/signature_modal.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/core/utils/color_utils.dart';

class InvoiceBrandingScreen extends StatefulWidget {
  const InvoiceBrandingScreen({super.key});

  @override
  State<InvoiceBrandingScreen> createState() => _InvoiceBrandingScreenState();
}

class _InvoiceBrandingScreenState extends State<InvoiceBrandingScreen> {
  final _picker          = ImagePicker();
  final _nameCtrl        = TextEditingController();
  final _addressCtrl     = TextEditingController();
  final _emailCtrl       = TextEditingController();
  final _phoneCtrl       = TextEditingController();
  final _taxCtrl         = TextEditingController();
  final _footerCtrl      = TextEditingController();

  String _selectedColor  = '#2563EB';
  File?  _localLogoFile; // For instant preview
  bool   _fieldsPopulated = false; // tracks if fields have been filled this session

  final List<String> _premiumColors = [
    '#2563EB', // Noble Blue
    '#7C3AED', // Royal Purple
    '#DB2777', // Rose
    '#DC2626', // Crimson
    '#EA580C', // Orange
    '#16A34A', // Emerald
    '#0891B2', // Cyan
    '#1E293B', // Slate
  ];

  @override
  void initState() {
    super.initState();
    // Always reload fresh profile data when this screen opens
    // This ensures saved data is never stale when user returns
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<ProfileController>().loadProfile();
      _populateFields();
    });
  }

  void _populateFields() {
    if (!mounted) return;
    final p = context.read<ProfileController>().profile;
    if (p != null) {
      _nameCtrl.text    = p.businessName ?? p.company ?? p.displayName ?? '';
      _addressCtrl.text = p.businessAddress ?? '';
      _emailCtrl.text   = p.businessEmail   ?? p.email;
      _phoneCtrl.text   = p.businessPhone   ?? p.phone ?? '';
      _taxCtrl.text     = p.taxNumber       ?? '';
      _footerCtrl.text  = p.invoiceFooter   ?? '';
      setState(() {
        _selectedColor   = p.brandColor;
        _fieldsPopulated = true;
      });
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Re-populate only once per load cycle, but allow reset after save
    if (!_fieldsPopulated) {
      final p = context.read<ProfileController>().profile;
      if (p != null) {
        _nameCtrl.text    = p.businessName ?? p.company ?? p.displayName ?? '';
        _addressCtrl.text = p.businessAddress ?? '';
        _emailCtrl.text   = p.businessEmail   ?? p.email;
        _phoneCtrl.text   = p.businessPhone   ?? p.phone ?? '';
        _taxCtrl.text     = p.taxNumber       ?? '';
        _footerCtrl.text  = p.invoiceFooter   ?? '';
        _selectedColor    = p.brandColor;
        _fieldsPopulated  = true;
      }
    }
  }

  @override
  void dispose() {
    _nameCtrl.dispose(); _addressCtrl.dispose(); _emailCtrl.dispose();
    _phoneCtrl.dispose(); _taxCtrl.dispose(); _footerCtrl.dispose();
    super.dispose();
  }

  Future<void> _pickLogo() async {
    final image = await _picker.pickImage(source: ImageSource.gallery, maxWidth: 600);
    if (image != null && mounted) {
      setState(() => _localLogoFile = File(image.path));
      final url = await context.read<TeamController>().uploadLogo(File(image.path));
      if (url != null) {
        _snack('Logo updated successfully!');
      } else {
        _snack('Failed to upload logo.');
      }
    }
  }

  Future<void> _manageSignature() async {
    final result = await showSignatureModal(context);
    if (result != null && mounted) {
      // Create a temporary file to upload
      final tempDir = await getTemporaryDirectory();
      final file = await File('${tempDir.path}/signature_temp.png').create();
      await file.writeAsBytes(result.bytes);
      
      final url = await context.read<TeamController>().uploadSignature(file);
      if (url != null) {
        _snack('Global signature updated!');
      } else {
        _snack('Failed to upload signature.');
      }
    }
  }

  Future<void> _save() async {
    final ok = await context.read<ProfileController>().updateBranding(
      businessName:    _nameCtrl.text.trim(),
      businessAddress: _addressCtrl.text.trim(),
      businessEmail:   _emailCtrl.text.trim(),
      businessPhone:   _phoneCtrl.text.trim(),
      taxNumber:       _taxCtrl.text.trim(),
      brandColor:      _selectedColor,
      invoiceFooter:   _footerCtrl.text.trim(),
    );

    // Sync to Team if active
    final teamCtrl = context.read<TeamController>();
    if (teamCtrl.activeTeam != null) {
      await teamCtrl.updateTeamSettings(
        brandColor:      _selectedColor,
        businessName:    _nameCtrl.text.trim(),
        businessAddress: _addressCtrl.text.trim(),
        businessEmail:   _emailCtrl.text.trim(),
        businessPhone:   _phoneCtrl.text.trim(),
      );
    }

    if (ok && mounted) {
      // Allow fields to re-populate fresh from Supabase on next open
      setState(() => _fieldsPopulated = false);
      _snack('Success! Your business profile is ready.');

      final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
      final fromInvoicing = args?['fromInvoicing'] ?? false;

      Future.delayed(const Duration(milliseconds: 1200), () {
        if (!mounted) return;
        if (fromInvoicing) {
          // Pop ALL screens until we reach the invoice dashboard,
          // then push client selection cleanly — no ghost screens in stack
          Navigator.of(context).popUntil(
            (route) => route.settings.name == AppRoutes.invoiceDashboard || route.isFirst,
          );
          Navigator.pushNamed(context, AppRoutes.clientSelection);
        } else {
          Navigator.pop(context);
        }
      });
    }
  }

  void _snack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(msg),
      backgroundColor: AppColors.success,
      behavior: SnackBarBehavior.floating,
      margin: const EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final ctrl = context.watch<ProfileController>();
    final teamCtrl = context.watch<TeamController>();
    final p    = ctrl.profile;
    final team = teamCtrl.activeTeam;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white, elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Invoice Branding', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          if (ctrl.isSaving)
            const Center(child: Padding(padding: EdgeInsets.only(right: 16), child: SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2))))
          else
            TextButton(
              onPressed: _save,
              child: const Text('Save', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary)),
            ),
        ],
      ),
      body: ListView(padding: const EdgeInsets.all(20), children: [
        // 1. Logo Section
        const _SectionHeader('BUSINESS LOGO'),
        const SizedBox(height: 12),
        _LogoUploader(
          logoUrl: p?.brandLogoUrl, 
          localFile: _localLogoFile,
          onUpload: _pickLogo
        ),
        const SizedBox(height: 32),

        // 2. Brand Color Section
        const _SectionHeader('BRAND PRIMARY COLOR'),
        const SizedBox(height: 12),
        _ColorPicker(
          selected: _selectedColor,
          colors: _premiumColors,
          onSelect: (c) => setState(() => _selectedColor = c),
        ),
        const SizedBox(height: 32),

        // 3. Business Identity Section
        const _SectionHeader('BUSINESS IDENTITY'),
        const SizedBox(height: 12),
        _Input(controller: _nameCtrl, label: 'Business Name', hint: 'e.g. Acme Tech LLC', icon: Icons.business_rounded),
        _Input(controller: _addressCtrl, label: 'Address', hint: '123 Business St, Lagos, Nigeria', icon: Icons.location_on_rounded, maxLines: 2),
        _Input(controller: _emailCtrl, label: 'Business Email', hint: 'billing@mycompany.com', icon: Icons.email_rounded, keyboardType: TextInputType.emailAddress),
        _Input(controller: _phoneCtrl, label: 'Business Phone', hint: '+234 800 000 0000', icon: Icons.phone_rounded),
        _Input(controller: _taxCtrl, label: 'Tax / VAT Number (Optional)', hint: 'e.g. RC-12345678', icon: Icons.receipt_long_rounded),
        const SizedBox(height: 20),

        // 4. Signature Section
        const _SectionHeader('GLOBAL SIGNATURE'),
        const SizedBox(height: 12),
        _SignaturePreview(
          signatureUrl: (team?.brandSignatureUrl?.isNotEmpty == true) ? team!.brandSignatureUrl : null,
          onTap: _manageSignature,
          isLoading: teamCtrl.isLoading,
        ),
        const SizedBox(height: 32),

        // 5. Footer Section
        const _SectionHeader('PDF FOOTER NOTES'),
        const SizedBox(height: 12),
        _Input(controller: _footerCtrl, label: 'Custom Footer', hint: 'Thank you for your business. Payment due within 14 days.', icon: Icons.notes_rounded, maxLines: 3),

        const SizedBox(height: 80),
      ]),
    );
  }
}

// ── Sub-Widgets ────────────────────────────────────────────────────────────────

class _SectionHeader extends StatelessWidget {
  final String text;
  const _SectionHeader(this.text);
  @override
  Widget build(BuildContext context) => Text(text, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: AppColors.darkGrey, letterSpacing: 1.5));
}

class _LogoUploader extends StatelessWidget {
  final String? logoUrl;
  final File?   localFile;
  final VoidCallback onUpload;
  const _LogoUploader({required this.logoUrl, this.localFile, required this.onUpload});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(children: [
        Container(
          width: 120, height: 120,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AppColors.lightGrey),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4))],
          ),
          child: localFile != null
            ? ClipRRect(borderRadius: BorderRadius.circular(24), child: Image.file(localFile!, fit: BoxFit.contain))
            : logoUrl != null
              ? ClipRRect(borderRadius: BorderRadius.circular(24), child: Image.network(logoUrl!, fit: BoxFit.contain))
              : const Icon(Icons.business_rounded, size: 48, color: AppColors.lightGrey),
        ),
        Positioned(
          bottom: 0, right: 0,
          child: GestureDetector(
            onTap: onUpload,
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
              child: const Icon(Icons.camera_alt_rounded, color: Colors.white, size: 18),
            ),
          )
        ),
      ]),
    );
  }
}

class _ColorPicker extends StatelessWidget {
  final String selected;
  final List<String> colors;
  final ValueChanged<String> onSelect;
  const _ColorPicker({required this.selected, required this.colors, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        const double spacing = 8.0;
        final double availableWidth = constraints.maxWidth;
        final int count = colors.length;
        
        // Calculate diameter to fit all colors in one line
        final double diameter = (availableWidth - (spacing * (count - 1))) / count;
        // Clamp to ensure visual consistency on very large/small screens
        final double size = diameter.clamp(24.0, 52.0);

        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: colors.map((c) {
            final isSelected = selected.toUpperCase() == c.toUpperCase();
            final color      = ColorUtils.fromHex(c);
            return GestureDetector(
              onTap: () => onSelect(c),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                width: size, height: size,
                decoration: BoxDecoration(
                  color: color,
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: isSelected ? Colors.black : Colors.transparent, 
                    width: isSelected ? (size > 40 ? 3 : 2) : 0
                  ),
                  boxShadow: [BoxShadow(color: color.withOpacity(0.3), blurRadius: 8, offset: const Offset(0, 4))],
                ),
                child: isSelected 
                  ? Icon(Icons.check_rounded, color: Colors.white, size: size * 0.5) 
                  : null,
              ),
            );
          }).toList(),
        );
      },
    );
  }
}

class _Input extends StatelessWidget {
  final TextEditingController controller;
  final String   label, hint;
  final IconData icon;
  final int      maxLines;
  final TextInputType keyboardType;

  const _Input({required this.controller, required this.label, required this.hint, required this.icon, this.maxLines = 1, this.keyboardType = TextInputType.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextField(
        controller: controller, maxLines: maxLines,
        keyboardType: keyboardType,
        decoration: InputDecoration(
          labelText: label, hintText: hint,
          prefixIcon: Icon(icon, size: 18, color: AppColors.darkGrey),
          fillColor: Colors.white, filled: true,
          labelStyle: const TextStyle(color: AppColors.darkGrey, fontSize: 13),
          hintStyle: const TextStyle(color: AppColors.lightGrey, fontSize: 13),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: AppColors.lightGrey)),
          enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: AppColors.lightGrey)),
          focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: const BorderSide(color: AppColors.primary)),
        ),
      ),
    );
  }
}

class _SignaturePreview extends StatelessWidget {
  final String? signatureUrl;
  final VoidCallback onTap;
  final bool isLoading;
  const _SignaturePreview({this.signatureUrl, required this.onTap, this.isLoading = false});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 100,
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.lightGrey),
        ),
        child: isLoading
            ? const Center(child: CircularProgressIndicator(strokeWidth: 2))
            : signatureUrl != null
                ? Center(child: Padding(padding: const EdgeInsets.all(12), child: Image.network(signatureUrl!, fit: BoxFit.contain)))
                : const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.draw_rounded, color: AppColors.lightGrey, size: 32),
                      SizedBox(height: 4),
                      Text('Set default signature', style: TextStyle(color: AppColors.darkGrey, fontSize: 13)),
                    ],
                  ),
      ),
    );
  }
}
