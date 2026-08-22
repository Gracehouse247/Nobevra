import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/theme/app_text_styles.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/features/qr_generator/controllers/qr_generator_controller.dart';

class QrVCardFormScreen extends StatefulWidget {
  const QrVCardFormScreen({super.key});

  @override
  State<QrVCardFormScreen> createState() => _QrVCardFormScreenState();
}

class _QrVCardFormScreenState extends State<QrVCardFormScreen> {
  final _nameController = TextEditingController();
  final _jobController = TextEditingController();
  final _companyController = TextEditingController();
  final _phoneController = TextEditingController();
  final _emailController = TextEditingController();
  final _websiteController = TextEditingController();
  final _addressController = TextEditingController();

  void _handleContinue() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a full name')),
      );
      return;
    }

    // Split name into First and Last for vCard format compatibility
    final nameParts = name.split(' ');
    final firstName = nameParts.first;
    final lastName = nameParts.length > 1 ? nameParts.sublist(1).join(' ') : '';

    context.read<QrGeneratorController>().updateData(
      name: name,
      type: 'vcard',
      content: {
        'firstName': firstName,
        'lastName': lastName,
        'jobTitle': _jobController.text.trim(),
        'organization': _companyController.text.trim(), // Match engine key 'organization'
        'phone': _phoneController.text.trim(),
        'email': _emailController.text.trim(),
        'website': _websiteController.text.trim(),
        'address': _addressController.text.trim(),
      },
    );

    Navigator.pushNamed(context, AppRoutes.qrPreview);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.arrow_back_ios_rounded, color: AppColors.primary, size: 20),
        ),
        title: Text(
          'vCard Setup',
          style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(1),
          child: Divider(color: AppColors.lightGrey, height: 1),
        ),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 120, left: 24, right: 24, top: 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Personal Identity',
                  style: AppTextStyles.headlineMedium.copyWith(fontWeight: FontWeight.w900, fontSize: 24),
                ),
                const SizedBox(height: 8),
                Text(
                  'Create a digital business card that anyone can save to their contacts instantly.',
                  style: AppTextStyles.bodyMedium.copyWith(color: AppColors.darkGrey, height: 1.5),
                ),
                const SizedBox(height: 40),
                
                _buildLabel('Full Name', isRequired: true),
                TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(hintText: 'e.g. Alexander Noble'),
                ),
                const SizedBox(height: 24),
                
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Job Title'),
                          TextField(
                            controller: _jobController,
                            decoration: const InputDecoration(hintText: 'e.g. Designer'),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Company'),
                          TextField(
                            controller: _companyController,
                            decoration: const InputDecoration(hintText: 'e.g. Nobevra'),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 32),
                Text(
                  'Contact Information',
                  style: AppTextStyles.bodyLarge.copyWith(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                
                _buildLabel('Phone Number'),
                TextField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    hintText: '+1 (555) 000-0000',
                    prefixIcon: Icon(Icons.phone_rounded, size: 20),
                  ),
                ),
                const SizedBox(height: 16),
                
                _buildLabel('Email Address'),
                TextField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    hintText: 'hello@nobevra.com',
                    prefixIcon: Icon(Icons.email_rounded, size: 20),
                  ),
                ),
                const SizedBox(height: 16),
                
                _buildLabel('Website'),
                TextField(
                  controller: _websiteController,
                  keyboardType: TextInputType.url,
                  decoration: const InputDecoration(
                    hintText: 'https://nobevra.com',
                    prefixIcon: Icon(Icons.language_rounded, size: 20),
                  ),
                ),
                const SizedBox(height: 32),
                
                _buildLabel('Office Address'),
                TextField(
                  controller: _addressController,
                  maxLines: 3,
                  decoration: const InputDecoration(
                    hintText: '123 Innovation Drive, Tech City, TC 12345',
                    prefixIcon: Icon(Icons.location_on_rounded, size: 20),
                  ),
                ),
              ],
            ),
          ),
          
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(top: BorderSide(color: AppColors.lightGrey, width: 0.5)),
              ),
              child: SafeArea(
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _handleContinue,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 20),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Generate Preview'),
                        SizedBox(width: 8),
                        Icon(Icons.qr_code_2_rounded, size: 20),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLabel(String text, {bool isRequired = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0, left: 4.0),
      child: RichText(
        text: TextSpan(
          text: text,
          style: AppTextStyles.bodyMedium.copyWith(fontWeight: FontWeight.bold, color: AppColors.textBlack),
          children: isRequired
              ? [
                  const TextSpan(
                    text: ' *',
                    style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold),
                  ),
                ]
              : [],
        ),
      ),
    );
  }
}
