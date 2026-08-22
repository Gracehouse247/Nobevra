import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class CountryData {
  final String name;
  final String code;
  final String flag;

  const CountryData({required this.name, required this.code, required this.flag});
}

class CountryPickerSheet extends StatefulWidget {
  final String currentCountry;
  final ValueChanged<String> onSelect;

  const CountryPickerSheet({
    super.key,
    required this.currentCountry,
    required this.onSelect,
  });

  static const List<CountryData> allCountries = [
    CountryData(name: 'United Kingdom', code: 'GB', flag: '🇬🇧'),
    CountryData(name: 'United States', code: 'US', flag: '🇺🇸'),
    CountryData(name: 'Canada', code: 'CA', flag: '🇨🇦'),
    CountryData(name: 'Nigeria', code: 'NG', flag: '🇳🇬'),
    CountryData(name: 'Ghana', code: 'GH', flag: '🇬🇭'),
    CountryData(name: 'Kenya', code: 'KE', flag: '🇰🇪'),
    CountryData(name: 'South Africa', code: 'ZA', flag: '🇿🇦'),
    CountryData(name: 'Australia', code: 'AU', flag: '🇦🇺'),
    CountryData(name: 'Germany', code: 'DE', flag: '🇩🇪'),
    CountryData(name: 'France', code: 'FR', flag: '🇫🇷'),
    CountryData(name: 'India', code: 'IN', flag: '🇮🇳'),
    CountryData(name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪'),
    CountryData(name: 'Singapore', code: 'SG', flag: '🇸🇬'),
    CountryData(name: 'China', code: 'CN', flag: '🇨🇳'),
    CountryData(name: 'Japan', code: 'JP', flag: '🇯🇵'),
    CountryData(name: 'Brazil', code: 'BR', flag: '🇧🇷'),
    CountryData(name: 'Mexico', code: 'MX', flag: '🇲🇽'),
    CountryData(name: 'Spain', code: 'ES', flag: '🇪🇸'),
    CountryData(name: 'Italy', code: 'IT', flag: '🇮🇹'),
    CountryData(name: 'Netherlands', code: 'NL', flag: '🇳🇱'),
    CountryData(name: 'Switzerland', code: 'CH', flag: '🇨🇭'),
    CountryData(name: 'Sweden', code: 'SE', flag: '🇸🇪'),
    CountryData(name: 'Norway', code: 'NO', flag: '🇳🇴'),
    CountryData(name: 'Denmark', code: 'DK', flag: '🇩🇰'),
    CountryData(name: 'Ireland', code: 'IE', flag: '🇮🇪'),
    CountryData(name: 'New Zealand', code: 'NZ', flag: '🇳🇿'),
    CountryData(name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦'),
    CountryData(name: 'Egypt', code: 'EG', flag: '🇪🇬'),
    CountryData(name: 'Rwanda', code: 'RW', flag: '🇷🇼'),
    CountryData(name: 'Uganda', code: 'UG', flag: '🇺🇬'),
    CountryData(name: 'Tanzania', code: 'TZ', flag: '🇹🇿'),
    CountryData(name: 'Ethiopia', code: 'ET', flag: '🇪🇹'),
    CountryData(name: 'Zambia', code: 'ZM', flag: '🇿🇲'),
    CountryData(name: 'Zimbabwe', code: 'ZW', flag: '🇿🇼'),
    CountryData(name: 'Cameroon', code: 'CM', flag: '🇨🇲'),
    CountryData(name: 'Senegal', code: 'SN', flag: '🇸🇳'),
    CountryData(name: 'Ivory Coast', code: 'CI', flag: '🇨🇮'),
    CountryData(name: 'Morocco', code: 'MA', flag: '🇲🇦'),
    CountryData(name: 'Algeria', code: 'DZ', flag: '🇩🇿'),
    CountryData(name: 'Tunisia', code: 'TN', flag: '🇹🇳'),
    CountryData(name: 'Mauritius', code: 'MU', flag: '🇲🇺'),
    CountryData(name: 'Argentina', code: 'AR', flag: '🇦🇷'),
    CountryData(name: 'Chile', code: 'CL', flag: '🇨🇱'),
    CountryData(name: 'Colombia', code: 'CO', flag: '🇨🇴'),
    CountryData(name: 'Peru', code: 'PE', flag: '🇵🇪'),
    CountryData(name: 'Belgium', code: 'BE', flag: '🇧🇪'),
    CountryData(name: 'Austria', code: 'AT', flag: '🇦🇹'),
    CountryData(name: 'Portugal', code: 'PT', flag: '🇵🇹'),
    CountryData(name: 'Greece', code: 'GR', flag: '🇬🇷'),
    CountryData(name: 'Poland', code: 'PL', flag: '🇵🇱'),
    CountryData(name: 'Czech Republic', code: 'CZ', flag: '🇨🇿'),
    CountryData(name: 'Hungary', code: 'HU', flag: '🇭🇺'),
    CountryData(name: 'Romania', code: 'RO', flag: '🇷🇴'),
    CountryData(name: 'Finland', code: 'FI', flag: '🇫🇮'),
    CountryData(name: 'Turkey', code: 'TR', flag: '🇹🇷'),
    CountryData(name: 'Ukraine', code: 'UA', flag: '🇺🇦'),
    CountryData(name: 'Israel', code: 'IL', flag: '🇮🇱'),
    CountryData(name: 'Qatar', code: 'QA', flag: '🇶🇦'),
    CountryData(name: 'Kuwait', code: 'KW', flag: '🇰🇼'),
    CountryData(name: 'Oman', code: 'OM', flag: '🇴🇲'),
    CountryData(name: 'Bahrain', code: 'BH', flag: '🇧🇭'),
    CountryData(name: 'Hong Kong', code: 'HK', flag: '🇭🇰'),
    CountryData(name: 'Taiwan', code: 'TW', flag: '🇹🇼'),
    CountryData(name: 'South Korea', code: 'KR', flag: '🇰🇷'),
    CountryData(name: 'Malaysia', code: 'MY', flag: '🇲🇾'),
    CountryData(name: 'Thailand', code: 'TH', flag: '🇹🇭'),
    CountryData(name: 'Vietnam', code: 'VN', flag: '🇻🇳'),
    CountryData(name: 'Indonesia', code: 'ID', flag: '🇮🇩'),
    CountryData(name: 'Philippines', code: 'PH', flag: '🇵🇭'),
    CountryData(name: 'Pakistan', code: 'PK', flag: '🇵🇰'),
    CountryData(name: 'Bangladesh', code: 'BD', flag: '🇧🇩'),
    CountryData(name: 'Sri Lanka', code: 'LK', flag: '🇱🇰'),
  ];

  static const List<CountryData> popularCountries = [
    CountryData(name: 'United Kingdom', code: 'GB', flag: '🇬🇧'),
    CountryData(name: 'United States', code: 'US', flag: '🇺🇸'),
    CountryData(name: 'Nigeria', code: 'NG', flag: '🇳🇬'),
    CountryData(name: 'Canada', code: 'CA', flag: '🇨🇦'),
    CountryData(name: 'South Africa', code: 'ZA', flag: '🇿🇦'),
    CountryData(name: 'Germany', code: 'DE', flag: '🇩🇪'),
    CountryData(name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪'),
    CountryData(name: 'Singapore', code: 'SG', flag: '🇸🇬'),
  ];

  @override
  State<CountryPickerSheet> createState() => _CountryPickerSheetState();
}

class _CountryPickerSheetState extends State<CountryPickerSheet> {
  final TextEditingController _searchController = TextEditingController();
  List<CountryData> _filteredCountries = CountryPickerSheet.allCountries;

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.removeListener(_onSearchChanged);
    _searchController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    final query = _searchController.text.trim().toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _filteredCountries = CountryPickerSheet.allCountries;
      } else {
        _filteredCountries = CountryPickerSheet.allCountries.where((c) {
          return c.name.toLowerCase().contains(query) ||
              c.code.toLowerCase().contains(query);
        }).toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          // Drag indicator
          Container(
            margin: const EdgeInsets.only(top: 12, bottom: 8),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: AppColors.lightGrey,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Select Country / Location',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w800,
                    fontSize: 18,
                    color: AppColors.primaryDark,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close_rounded, color: AppColors.darkGrey),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          // Search Field
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: TextField(
              controller: _searchController,
              autofocus: false,
              decoration: InputDecoration(
                hintText: 'Search country or code...',
                hintStyle: TextStyle(
                  color: Colors.grey.shade400,
                  fontSize: 14,
                ),
                prefixIcon: const Icon(Icons.search_rounded,
                    color: AppColors.primaryDark, size: 22),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.cancel_rounded,
                            size: 18, color: AppColors.darkGrey),
                        onPressed: () => _searchController.clear(),
                      )
                    : null,
                filled: true,
                fillColor: const Color(0xFFF1F5F9),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
          const SizedBox(height: 14),

          // Popular Chips (only show when not searching)
          if (_searchController.text.isEmpty) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'POPULAR BUSINESS HUBS',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.0,
                    color: Colors.grey.shade500,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 38,
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                itemCount: CountryPickerSheet.popularCountries.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final c = CountryPickerSheet.popularCountries[i];
                  final isSelected = c.name == widget.currentCountry;
                  return ActionChip(
                    avatar: Text(c.flag, style: const TextStyle(fontSize: 14)),
                    label: Text(
                      c.name,
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 12,
                        fontWeight: isSelected ? FontWeight.w800 : FontWeight.w600,
                        color: isSelected ? Colors.white : AppColors.primaryDark,
                      ),
                    ),
                    backgroundColor: isSelected
                        ? AppColors.primaryDark
                        : const Color(0xFFF1F5F9),
                    side: BorderSide(
                      color: isSelected
                          ? AppColors.primaryDark
                          : const Color(0xFFE2E8F0),
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    onPressed: () {
                      widget.onSelect(c.name);
                      Navigator.pop(context);
                    },
                  );
                },
              ),
            ),
            const SizedBox(height: 14),
          ],

          // Divider
          const Divider(height: 1, color: Color(0xFFE2E8F0)),

          // Country List
          Expanded(
            child: _filteredCountries.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.public_off_rounded,
                            size: 48, color: Colors.grey.shade300),
                        const SizedBox(height: 12),
                        Text(
                          'No country found',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    itemCount: _filteredCountries.length,
                    separatorBuilder: (_, __) =>
                        const Divider(height: 1, indent: 64, color: Color(0xFFF1F5F9)),
                    itemBuilder: (context, index) {
                      final country = _filteredCountries[index];
                      final isSelected = country.name == widget.currentCountry;

                      return ListTile(
                        contentPadding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 2),
                        leading: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: isSelected
                                ? const Color(0xFFE8F7FD)
                                : const Color(0xFFF8FAFC),
                            shape: BoxShape.circle,
                          ),
                          alignment: Alignment.center,
                          child: Text(
                            country.flag,
                            style: const TextStyle(fontSize: 20),
                          ),
                        ),
                        title: Text(
                          country.name,
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 15,
                            fontWeight:
                                isSelected ? FontWeight.w800 : FontWeight.w500,
                            color: isSelected
                                ? AppColors.primaryDark
                                : const Color(0xFF191C1D),
                          ),
                        ),
                        subtitle: Text(
                          country.code,
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 12,
                            color: Colors.grey.shade500,
                          ),
                        ),
                        trailing: isSelected
                            ? const Icon(Icons.check_circle_rounded,
                                color: AppColors.primaryDark, size: 22)
                            : null,
                        onTap: () {
                          widget.onSelect(country.name);
                          Navigator.pop(context);
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
