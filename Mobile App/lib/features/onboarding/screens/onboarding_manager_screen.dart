import 'dart:io';
import 'dart:ui';
import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import '../widgets/identity_step.dart';
import '../widgets/branding_step.dart';
import '../widgets/invoicing_step.dart';
import 'package:noble_invoice/core/services/location_service.dart';

class OnboardingManagerScreen extends StatefulWidget {
  const OnboardingManagerScreen({super.key});

  @override
  State<OnboardingManagerScreen> createState() => _OnboardingManagerScreenState();
}

class _OnboardingManagerScreenState extends State<OnboardingManagerScreen> {
  final PageController _pageController = PageController();
  int _currentStep = 0;
  bool _isSaving = false;

  // Step 1 Data: Identity
  final _businessNameController = TextEditingController();
  String _selectedIndustry = 'Technology';
  String _selectedCountry = 'United Kingdom';

  // Step 2 Data: Branding
  File? _logoPreview;
  Color _primaryColor = AppColors.primaryDark;
  Color _secondaryColor = const Color(0xFF1E293B);
  int _activeColorType = 0; // 0: primary, 1: secondary
  String _selectedVoice = 'Professional';

  // Step 3 Data: Invoicing
  final _taxNumberController = TextEditingController();
  final _footerController = TextEditingController();

  final List<String> _industries = ['Technology', 'Retail', 'Creative Services', 'Consulting', 'Healthcare', 'Education', 'Construction', 'Other'];
  final List<String> _countries = LocationService.worldCountries;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final profile = Provider.of<ProfileController>(context, listen: false).profile;
      if (profile != null && (profile.displayName?.isNotEmpty ?? false)) {
        _businessNameController.text = profile.displayName!;
      }
      _detectLocation();
    });
  }

  Future<void> _detectLocation() async {
    final detected = await LocationService.detectUserCountry();
    if (detected != null && mounted) {
      setState(() => _selectedCountry = detected);
    }
  }

  void _nextStep() {
    if (_currentStep < 2) {
      _pageController.nextPage(duration: const Duration(milliseconds: 600), curve: Curves.easeInOutCubic);
      setState(() => _currentStep++);
    } else {
      _finishOnboarding();
    }
  }

  Future<void> _finishOnboarding() async {
    if (_businessNameController.text.trim().isEmpty) {
      _pageController.animateToPage(0, duration: const Duration(milliseconds: 500), curve: Curves.ease);
      setState(() => _currentStep = 0);
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please enter your business name')));
      return;
    }

    setState(() => _isSaving = true);
    final profileCtrl = Provider.of<ProfileController>(context, listen: false);
    
    String? logoUrl;
    if (_logoPreview != null) {
      logoUrl = await profileCtrl.uploadLogo(_logoPreview!);
    }

    final success = await profileCtrl.completeOnboarding(
      businessName: _businessNameController.text.trim(),
      industry: _selectedIndustry,
      country: _selectedCountry,
      brandColor: '#${_primaryColor.value.toRadixString(16).substring(2).toUpperCase()}',
      secondaryColor: '#${_secondaryColor.value.toRadixString(16).substring(2).toUpperCase()}',
      brandVoice: _selectedVoice,
      logoUrl: logoUrl,
      taxNumber: _taxNumberController.text.trim(),
      invoiceFooter: _footerController.text.trim(),
    );

    if (mounted) {
      setState(() => _isSaving = false);
      if (success) {
        Navigator.pushReplacementNamed(context, AppRoutes.dashboard);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Setup Failed: ${profileCtrl.errorMessage}'), backgroundColor: Colors.red.shade800),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(child: _buildMeshBackground()),
          SafeArea(
            child: Column(
              children: [
                _buildTopProgress(),
                Expanded(
                  child: PageView(
                    controller: _pageController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      IdentityStep(
                        businessNameController: _businessNameController,
                        selectedIndustry: _selectedIndustry,
                        selectedCountry: _selectedCountry,
                        industries: _industries,
                        countries: _countries,
                        onIndustryChanged: (v) => setState(() => _selectedIndustry = v!),
                        onCountryChanged: (v) => setState(() => _selectedCountry = v!),
                        activeColor: _primaryColor,
                      ),
                      BrandingStep(
                        logoPreview: _logoPreview,
                        primaryColor: _primaryColor,
                        secondaryColor: _secondaryColor,
                        activeColorType: _activeColorType,
                        selectedVoice: _selectedVoice,
                        onLogoChanged: (f) => setState(() => _logoPreview = f),
                        onPrimaryChanged: (c) => setState(() => _primaryColor = c),
                        onSecondaryChanged: (c) => setState(() => _secondaryColor = c),
                        onColorTypeChanged: (t) => setState(() => _activeColorType = t),
                        onVoiceChanged: (v) => setState(() => _selectedVoice = v),
                      ),
                      InvoicingStep(
                        taxNumberController: _taxNumberController,
                        footerController: _footerController,
                        activeColor: _primaryColor,
                      ),
                    ],
                  ),
                ),
                _buildBottomActions(),
              ],
            ),
          ),
          if (_isSaving) _buildLoadingOverlay(),
        ],
      ),
    );
  }

  Widget _buildMeshBackground() {
    return Container(
      decoration: const BoxDecoration(color: Color(0xFFF8FAFC)),
      child: Stack(
        children: [
          Positioned(
            top: -150, right: -100,
            child: FadeInDown(
              duration: const Duration(seconds: 3),
              child: Container(
                width: 400, height: 400,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(colors: [_primaryColor.withOpacity(0.1), Colors.transparent]),
                ),
              ),
            ),
          ),
          Positioned(
            bottom: -50, left: -100,
            child: FadeInUp(
              duration: const Duration(seconds: 4),
              child: Container(
                width: 350, height: 350,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(colors: [const Color(0xFF7C3AED).withOpacity(0.1), Colors.transparent]),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopProgress() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Image.asset('assets/images/nobevra_logo.png', height: 28),
              Text('STEP ${_currentStep + 1} OF 3', 
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 1.2, color: AppColors.darkGrey)),
            ],
          ),
          const SizedBox(height: 16),
          _ProgressBar(currentStep: _currentStep, activeColor: AppColors.primaryDark),
        ],
      ),
    );
  }

  Widget _buildBottomActions() {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Row(
        children: [
          if (_currentStep > 0)
            IconButton(
              onPressed: () {
                _pageController.previousPage(duration: const Duration(milliseconds: 600), curve: Curves.easeInOutCubic);
                setState(() => _currentStep--);
              },
              icon: const Icon(Icons.arrow_back_ios_new_rounded),
              style: IconButton.styleFrom(
                backgroundColor: Colors.white,
                padding: const EdgeInsets.all(16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
              ),
            ),
          const SizedBox(width: 12),
          Expanded(
            child: ElevatedButton(
              onPressed: _nextStep,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryDark,
                padding: const EdgeInsets.symmetric(vertical: 20),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                elevation: 12,
                shadowColor: AppColors.primaryDark.withOpacity(0.3),
              ),
              child: Text(
                _currentStep == 2 ? 'FINALIZE SETUP' : 'CONTINUE',
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 15, letterSpacing: 0.5),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingOverlay() {
    return Positioned.fill(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          color: Colors.white.withOpacity(0.8),
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircularProgressIndicator(color: _primaryColor),
                const SizedBox(height: 20),
                const Text('Syncing your business DNA...', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ProgressBar extends StatelessWidget {
  final int currentStep;
  final Color activeColor;
  const _ProgressBar({required this.currentStep, required this.activeColor});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(3, (i) {
        final isActive = i <= currentStep;
        return Expanded(
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 500),
            margin: EdgeInsets.only(right: i < 2 ? 8 : 0),
            height: 6,
            decoration: BoxDecoration(
              color: isActive ? activeColor : Colors.grey.shade200,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
        );
      }),
    );
  }
}
