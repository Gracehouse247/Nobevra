import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

class FeatureSuggestionScreen extends StatefulWidget {
  const FeatureSuggestionScreen({super.key});

  @override
  State<FeatureSuggestionScreen> createState() => _FeatureSuggestionScreenState();
}

class _FeatureSuggestionScreenState extends State<FeatureSuggestionScreen> {
  String? _selectedCategory;
  final _titleController = TextEditingController();
  final _descController = TextEditingController();

  final List<String> _categories = ['QR Customization', 'AI Writing Tools', 'Analytics', 'Invoicing Hub', 'Integrations', 'Security'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Colors.black, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Suggest a Feature', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 16)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Shape the Future', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
                  const SizedBox(height: 8),
                  const Text('Have an idea to make Nobevra better? We want to hear it!', style: TextStyle(color: Colors.grey, fontSize: 14)),
                  const SizedBox(height: 32),
                  
                  _buildSectionHeader('I HAVE AN IDEA FOR...'),
                  const SizedBox(height: 12),
                  _buildCategoryChips(),
                  const SizedBox(height: 32),
                  
                  _buildSectionHeader('IDEA TITLE'),
                  const SizedBox(height: 12),
                  _buildTitleInput(),
                  const SizedBox(height: 24),
                  
                  _buildSectionHeader('DETAILS'),
                  const SizedBox(height: 12),
                  _buildDescriptionInput(),
                  const SizedBox(height: 32),
                  
                  _buildSubmitButton(),
                ],
              ),
            ),
            const Divider(),
            _buildCommunitySection(),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(title, style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5));
  }

  Widget _buildCategoryChips() {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: _categories.map((cat) {
        final isSelected = _selectedCategory == cat;
        return ChoiceChip(
          label: Text(cat, style: TextStyle(fontSize: 12, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),
          selected: isSelected,
          onSelected: (val) => setState(() => _selectedCategory = val ? cat : null),
          selectedColor: AppColors.primary,
          labelStyle: TextStyle(color: isSelected ? Colors.white : Colors.black87),
          backgroundColor: Colors.white,
          elevation: 0,
          pressElevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: isSelected ? AppColors.primary : AppColors.lightGrey)),
        );
      }).toList(),
    );
  }

  Widget _buildTitleInput() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.lightGrey.withOpacity(0.5))),
      child: TextField(
        controller: _titleController,
        decoration: const InputDecoration(hintText: 'e.g., Export to Excel', hintStyle: TextStyle(fontSize: 14, color: Colors.grey), border: InputBorder.none),
      ),
    );
  }

  Widget _buildDescriptionInput() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.lightGrey.withOpacity(0.5))),
      child: TextField(
        controller: _descController,
        maxLines: 4,
        decoration: const InputDecoration(hintText: 'Briefly explain how this feature would help you.', hintStyle: TextStyle(fontSize: 14, color: Colors.grey), border: InputBorder.none),
      ),
    );
  }

  Widget _buildSubmitButton() {
    return ElevatedButton(
      onPressed: () {
        if (_selectedCategory == null || _titleController.text.isEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Category and Title are required.')));
          return;
        }
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Success! Your idea has been added to our board.')));
        Navigator.pop(context);
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 60),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        elevation: 0,
      ),
      child: const Text('Post Idea', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildCommunitySection() {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('TOP COMMUNITY IDEAS', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
              TextButton(onPressed: () {}, child: const Text('View Board', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 13))),
            ],
          ),
          const SizedBox(height: 16),
          _buildIdeaCard('Custom Domain for QR Landing Pages', 'Marketing', 142),
          const SizedBox(height: 12),
          _buildIdeaCard('Native Apple Watch App', 'Integrations', 88),
          const SizedBox(height: 12),
          _buildIdeaCard('Multi-currency Invoice Support', 'Invoicing Hub', 65),
        ],
      ),
    );
  }

  Widget _buildIdeaCard(String title, String tag, int votes) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AppColors.lightGrey.withOpacity(0.5))),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, height: 1.3)),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(6)),
                  child: Text(tag, style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Column(
            children: [
              const Icon(Icons.arrow_drop_up_rounded, color: AppColors.primary, size: 32),
              Text(votes.toString(), style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14, color: AppColors.primary)),
            ],
          ),
        ],
      ),
    );
  }
}
