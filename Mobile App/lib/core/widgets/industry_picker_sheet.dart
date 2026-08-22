import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class IndustryData {
  final String name;
  final String icon;
  final IconData materialIcon;

  const IndustryData({
    required this.name,
    required this.icon,
    required this.materialIcon,
  });
}

class IndustryPickerSheet extends StatefulWidget {
  final String currentIndustry;
  final ValueChanged<String> onSelect;

  const IndustryPickerSheet({
    super.key,
    required this.currentIndustry,
    required this.onSelect,
  });

  static const List<IndustryData> allIndustries = [
    IndustryData(name: 'Technology & Software', icon: '💻', materialIcon: Icons.computer_rounded),
    IndustryData(name: 'Retail & E-Commerce', icon: '🛒', materialIcon: Icons.shopping_bag_rounded),
    IndustryData(name: 'Creative & Design Services', icon: '🎨', materialIcon: Icons.palette_rounded),
    IndustryData(name: 'Consulting & Strategy', icon: '📈', materialIcon: Icons.trending_up_rounded),
    IndustryData(name: 'Healthcare & Medical', icon: '🏥', materialIcon: Icons.medical_services_rounded),
    IndustryData(name: 'Financial Services & Banking', icon: '💳', materialIcon: Icons.account_balance_wallet_rounded),
    IndustryData(name: 'Construction & Real Estate', icon: '🏗️', materialIcon: Icons.foundation_rounded),
    IndustryData(name: 'Education & E-Learning', icon: '🎓', materialIcon: Icons.school_rounded),
    IndustryData(name: 'Legal & Compliance Services', icon: '⚖️', materialIcon: Icons.gavel_rounded),
    IndustryData(name: 'Marketing & Advertising', icon: '📢', materialIcon: Icons.campaign_rounded),
    IndustryData(name: 'Hospitality, Travel & Tourism', icon: '🏨', materialIcon: Icons.hotel_rounded),
    IndustryData(name: 'Food, Beverage & Dining', icon: '🍽️', materialIcon: Icons.restaurant_rounded),
    IndustryData(name: 'Manufacturing & Industrial', icon: '🏭', materialIcon: Icons.precision_manufacturing_rounded),
    IndustryData(name: 'Logistics & Supply Chain', icon: '🚚', materialIcon: Icons.local_shipping_rounded),
    IndustryData(name: 'Energy & Clean Tech', icon: '⚡', materialIcon: Icons.bolt_rounded),
    IndustryData(name: 'Entertainment & Media', icon: '🎬', materialIcon: Icons.movie_rounded),
    IndustryData(name: 'Architecture & Engineering', icon: '📐', materialIcon: Icons.architecture_rounded),
    IndustryData(name: 'Accounting & Tax Services', icon: '📊', materialIcon: Icons.calculate_rounded),
    IndustryData(name: 'Beauty, Salon & Wellness', icon: '💅', materialIcon: Icons.spa_rounded),
    IndustryData(name: 'Fitness & Sports', icon: '🏋️', materialIcon: Icons.fitness_center_rounded),
    IndustryData(name: 'Events & Catering', icon: '🎉', materialIcon: Icons.event_rounded),
    IndustryData(name: 'Automotive & Mobility', icon: '🚗', materialIcon: Icons.directions_car_rounded),
    IndustryData(name: 'Agriculture & Farming', icon: '🚜', materialIcon: Icons.agriculture_rounded),
    IndustryData(name: 'Fashion & Apparel', icon: '👗', materialIcon: Icons.dry_cleaning_rounded),
    IndustryData(name: 'Non-Profit & NGO', icon: '🤝', materialIcon: Icons.volunteer_activism_rounded),
    IndustryData(name: 'Telecommunications', icon: '📡', materialIcon: Icons.cell_tower_rounded),
    IndustryData(name: 'Cybersecurity & IT Infrastructure', icon: '🔒', materialIcon: Icons.security_rounded),
    IndustryData(name: 'HR & Recruitment Services', icon: '👥', materialIcon: Icons.badge_rounded),
    IndustryData(name: 'Property Management & Housing', icon: '🏠', materialIcon: Icons.home_work_rounded),
    IndustryData(name: 'Import, Export & Trade', icon: '🌐', materialIcon: Icons.public_rounded),
    IndustryData(name: 'Printing & Publishing', icon: '🖨️', materialIcon: Icons.print_rounded),
    IndustryData(name: 'Facility & Cleaning Services', icon: '🧹', materialIcon: Icons.cleaning_services_rounded),
    IndustryData(name: 'Freelance & Independent Work', icon: '💼', materialIcon: Icons.work_outline_rounded),
    IndustryData(name: 'Other / Specialized Field', icon: '🏢', materialIcon: Icons.domain_rounded),
  ];

  static const List<IndustryData> popularIndustries = [
    IndustryData(name: 'Technology & Software', icon: '💻', materialIcon: Icons.computer_rounded),
    IndustryData(name: 'Retail & E-Commerce', icon: '🛒', materialIcon: Icons.shopping_bag_rounded),
    IndustryData(name: 'Creative & Design Services', icon: '🎨', materialIcon: Icons.palette_rounded),
    IndustryData(name: 'Consulting & Strategy', icon: '📈', materialIcon: Icons.trending_up_rounded),
    IndustryData(name: 'Healthcare & Medical', icon: '🏥', materialIcon: Icons.medical_services_rounded),
    IndustryData(name: 'Financial Services & Banking', icon: '💳', materialIcon: Icons.account_balance_wallet_rounded),
  ];

  @override
  State<IndustryPickerSheet> createState() => _IndustryPickerSheetState();
}

class _IndustryPickerSheetState extends State<IndustryPickerSheet> {
  final TextEditingController _searchController = TextEditingController();
  List<IndustryData> _filteredIndustries = IndustryPickerSheet.allIndustries;

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
        _filteredIndustries = IndustryPickerSheet.allIndustries;
      } else {
        _filteredIndustries = IndustryPickerSheet.allIndustries.where((i) {
          return i.name.toLowerCase().contains(query);
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
          // Drag handle
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
                  'Select Industry / Field',
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
              decoration: InputDecoration(
                hintText: 'Search industry or category...',
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

          // Popular Chips (only show when search is empty)
          if (_searchController.text.isEmpty) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'TOP BUSINESS CATEGORIES',
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
                itemCount: IndustryPickerSheet.popularIndustries.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, i) {
                  final ind = IndustryPickerSheet.popularIndustries[i];
                  final isSelected = ind.name == widget.currentIndustry;
                  return ActionChip(
                    avatar: Text(ind.icon, style: const TextStyle(fontSize: 14)),
                    label: Text(
                      ind.name,
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
                      widget.onSelect(ind.name);
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

          // Industry List
          Expanded(
            child: _filteredIndustries.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.search_off_rounded,
                            size: 48, color: Colors.grey.shade300),
                        const SizedBox(height: 12),
                        Text(
                          'No industry matches found',
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
                    itemCount: _filteredIndustries.length,
                    separatorBuilder: (_, __) =>
                        const Divider(height: 1, indent: 64, color: Color(0xFFF1F5F9)),
                    itemBuilder: (context, index) {
                      final item = _filteredIndustries[index];
                      final isSelected = item.name == widget.currentIndustry;

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
                            item.icon,
                            style: const TextStyle(fontSize: 18),
                          ),
                        ),
                        title: Text(
                          item.name,
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
                        trailing: isSelected
                            ? const Icon(Icons.check_circle_rounded,
                                color: AppColors.primaryDark, size: 22)
                            : null,
                        onTap: () {
                          widget.onSelect(item.name);
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
