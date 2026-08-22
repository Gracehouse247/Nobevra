import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import '../widgets/onboarding_page1.dart';
import '../widgets/onboarding_page2.dart';
import '../widgets/onboarding_page3.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  static const int _pageCount = 3;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _goToNext() {
    if (_currentPage < _pageCount - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 450),
        curve: Curves.easeOutCubic,
      );
    }
  }

  void _goBack() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeOutCubic,
      );
    }
  }

  void _skip() {
    Navigator.pushReplacementNamed(context, AppRoutes.onboardingManager);
  }

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        statusBarBrightness: Brightness.light,
      ),
      child: Scaffold(
        backgroundColor: const Color(0xFFF8FAFB),
        body: SafeArea(
          child: Column(
            children: [
              _buildHeader(),
              Expanded(
                child: PageView(
                  controller: _pageController,
                  onPageChanged: (i) => setState(() => _currentPage = i),
                  children: const [
                    _PagePadding(child: OnboardingPage1()),
                    _PagePadding(child: OnboardingPage2()),
                    _PagePadding(child: OnboardingPage3()),
                  ],
                ),
              ),
              // Bottom button — only visible on pages 0 and 1
              if (_currentPage < 2) _buildBottomButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      height: 56,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFB).withOpacity(0.92),
        border: const Border(
          bottom: BorderSide(color: Color(0x08000000), width: 1),
        ),
      ),
      child: Row(
        children: [
          // Back button (hidden on page 0)
          SizedBox(
            width: 44,
            height: 44,
            child: _currentPage > 0
                ? IconButton(
                    icon: const Icon(Icons.arrow_back_rounded,
                        color: Color(0xFF191C1D)),
                    onPressed: _goBack,
                    padding: EdgeInsets.zero,
                  )
                : const SizedBox.shrink(),
          ),

          // Progress bar
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: _buildProgressBar(),
            ),
          ),

          // Skip / page counter
          SizedBox(
            width: 44,
            child: TextButton(
              onPressed: _skip,
              style: TextButton.styleFrom(padding: EdgeInsets.zero),
              child: const Text(
                'Skip',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF013948),
                  letterSpacing: 0.05 * 11,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgressBar() {
    return Row(
      children: List.generate(_pageCount, (i) {
        final isFilled = i <= _currentPage;
        return Expanded(
          child: Padding(
            padding: EdgeInsets.only(left: i == 0 ? 0 : 4),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              height: 4,
              decoration: BoxDecoration(
                color: isFilled
                    ? const Color(0xFF88CEFF)
                    : const Color(0xFFBEC8D1),
                borderRadius: BorderRadius.circular(100),
              ),
            ),
          ),
        );
      }),
    );
  }

  Widget _buildBottomButton() {
    final isPage1 = _currentPage == 0;
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 20),
      child: SizedBox(
        width: double.infinity,
        height: 56,
        child: ElevatedButton(
          onPressed: _goToNext,
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF013948),
            foregroundColor: Colors.white,
            elevation: 0,
            shape: const StadiumBorder(),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                isPage1 ? 'Next' : 'Continue',
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 8),
              const Icon(
                Icons.arrow_forward_rounded,
                size: 18,
                color: Colors.white,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PagePadding extends StatelessWidget {
  final Widget child;
  const _PagePadding({required this.child});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: child,
    );
  }
}
