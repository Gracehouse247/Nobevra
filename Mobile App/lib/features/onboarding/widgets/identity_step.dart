import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/widgets/country_picker_sheet.dart';
import 'package:noble_invoice/core/widgets/industry_picker_sheet.dart';

class IdentityStep extends StatelessWidget {
  final TextEditingController businessNameController;
  final String selectedIndustry;
  final String selectedCountry;
  final List<String> industries;
  final List<String> countries;
  final Function(String?) onIndustryChanged;
  final Function(String?) onCountryChanged;
  final Color activeColor;

  const IdentityStep({
    super.key,
    required this.businessNameController,
    required this.selectedIndustry,
    required this.selectedCountry,
    required this.industries,
    required this.countries,
    required this.onIndustryChanged,
    required this.onCountryChanged,
    required this.activeColor,
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
            const Text('The Identity', 
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, letterSpacing: -1.2)),
            const SizedBox(height: 8),
            Text('How should the world address your business?', 
              style: TextStyle(color: Colors.grey.shade600, fontSize: 16)),
            const SizedBox(height: 32),
            
            _buildStepInput(
              label: 'Business Name',
              controller: businessNameController,
              hint: 'e.g., Noble World Ltd.',
              icon: Icons.business_rounded,
            ),
            const SizedBox(height: 24),
            
            _buildIndustrySelector(
              context: context,
              label: 'Industry',
              value: selectedIndustry,
              onChanged: onIndustryChanged,
              activeColor: activeColor,
            ),
            const SizedBox(height: 24),
            
            _buildCountrySelector(
              context: context,
              label: 'Location',
              value: selectedCountry,
              onChanged: onCountryChanged,
              activeColor: activeColor,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStepInput({required String label, required TextEditingController controller, required String hint, required IconData icon}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label.toUpperCase(), style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 1.2, color: AppColors.darkGrey)),
        const SizedBox(height: 10),
        _StepGlassContainer(
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: hint,
              prefixIcon: Icon(icon, size: 20, color: activeColor),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildIndustrySelector({
    required BuildContext context,
    required String label,
    required String value,
    required void Function(String?) onChanged,
    required Color activeColor,
  }) {
    // Find matching industry data for category icon display
    final match = IndustryPickerSheet.allIndustries.firstWhere(
      (i) => i.name.toLowerCase() == value.toLowerCase(),
      orElse: () => const IndustryData(name: '', icon: '🏢', materialIcon: Icons.business_rounded),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            fontSize: 11,
            letterSpacing: 1.2,
            color: AppColors.darkGrey,
          ),
        ),
        const SizedBox(height: 10),
        _StepGlassContainer(
          child: InkWell(
            borderRadius: BorderRadius.circular(20),
            onTap: () {
              showModalBottomSheet(
                context: context,
                isScrollControlled: true,
                backgroundColor: Colors.transparent,
                builder: (_) => IndustryPickerSheet(
                  currentIndustry: value,
                  onSelect: onChanged,
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: Row(
                children: [
                  Text(match.icon, style: const TextStyle(fontSize: 20)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      value.isNotEmpty ? value : 'Select Industry / Field',
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF191C1D),
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  Icon(
                    Icons.keyboard_arrow_down_rounded,
                    color: activeColor,
                    size: 24,
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCountrySelector({
    required BuildContext context,
    required String label,
    required String value,
    required void Function(String?) onChanged,
    required Color activeColor,
  }) {
    // Find matching country data for flag emoji display
    final match = CountryPickerSheet.allCountries.firstWhere(
      (c) => c.name.toLowerCase() == value.toLowerCase(),
      orElse: () => const CountryData(name: '', code: '', flag: '🌐'),
    );
    final flagStr = match.flag.isNotEmpty ? match.flag : '🌐';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            fontSize: 11,
            letterSpacing: 1.2,
            color: AppColors.darkGrey,
          ),
        ),
        const SizedBox(height: 10),
        _StepGlassContainer(
          child: InkWell(
            borderRadius: BorderRadius.circular(20),
            onTap: () {
              showModalBottomSheet(
                context: context,
                isScrollControlled: true,
                backgroundColor: Colors.transparent,
                builder: (_) => CountryPickerSheet(
                  currentCountry: value,
                  onSelect: onChanged,
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: Row(
                children: [
                  Text(flagStr, style: const TextStyle(fontSize: 20)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      value.isNotEmpty ? value : 'Select Location',
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF191C1D),
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  Icon(
                    Icons.keyboard_arrow_down_rounded,
                    color: activeColor,
                    size: 24,
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _StepGlassContainer extends StatelessWidget {
  final Widget child;
  const _StepGlassContainer({required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
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
