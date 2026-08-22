import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:provider/provider.dart';

class AppearanceSettingsScreen extends StatefulWidget {
  const AppearanceSettingsScreen({super.key});

  @override
  State<AppearanceSettingsScreen> createState() => _AppearanceSettingsScreenState();
}

class _AppearanceSettingsScreenState extends State<AppearanceSettingsScreen> {
  final String _selectedLanguage = 'English';
  final List<Map<String, String>> _languages = [
    {
      'name': 'English',
      'label': 'English (Default)',
      'flag': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCdFDx0hcAo5DFuwcCUDaSS0QxPniHCvJdWIrOO4pJPRGIxhzilqriGIyfdjLiyafSkjKPkZtUYx3VbyxwN6ISo-0ZhHL3e5uCCpi2G989K-7Z4C9k_piF8PU5BkJXkhu9KxeL9FewUwqMUAkE7ne6r1nPBEXrZMaD16T2WjvKicAhb0b-onGAdq9EZr5IClhP57foaBkeVTehYEcVtE1xoakrMvgVpJpATPa7qT7CWdg15ptBfZgO11O7uDCyB2aitQez6A5VWE4'
    },
    {
      'name': 'French',
      'label': 'Français',
      'flag': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJpbCI9gSvBvi0G1v8RgfsufPmtGH4IIsjENR9rJAzCHC9MYPTEqYnzxIZnfxpMb2vLH5S3vAjjB9KGEabmlU7Acz3xY5_OuGjo7uo-Aqrm_d6meKGvd2nsHlipODjN1PPP3LeZBBsDn4ASuilA2KXB6RQWCWi1WW8B9GLtjAIYJTsy26zXQ34uSSTvbf2-kFkrFDZ7-HwCAE4dIPTiucm5aXEZx34WpmCN0I2OdnGxBoNRxVfcF3bJu9cXz_hi16tYJAzJSbVUBM'
    },
    {
      'name': 'Spanish',
      'label': 'Español',
      'flag': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqrJoq2Eiqwe6If_3ctOuPUg9Pko-jU6S3xgjm5z4RKS7FOkhT4EBtZ-dLS0_uRMbGj1h4Eky8btShoNKiELjR4dNEQaeP4W-Pjfvuwy5M8IgAOl2EWmAUnK6hSGLSt839SigMfGh7qYoEWUMUYQ8FkHrISjKTRAtvcn7KlZ18TwnWBIRN8wMV6yabObvqaflI2iPSxoe9xzcigpa7m3fF0ENsML9ydlXf6XetlKsZJNXkPMykiDJXpp4L3MTath_p4MIMpJ0832s'
    },
    {
      'name': 'German',
      'label': 'Deutsch',
      'flag': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYcegJO5M9VtJE6FJzmYFVsHogxcc4PMcaoxMn-Vj_866eLpP4ZAhBd_UkN3XXUkg7NGClSH1Ic8YkM84pp4mZnrgS-hiTLQCla4UdkI0zpfablIvP9Zh5V3WJIiu4XsUboxrIs0TZnf7sc8bQvzTCxESSodXO9IGKVlV9_JTjHTbUI2c-DHE8retMPwjoDd0_mO8H7B-HHOdmK0HEfnPnGY23b0NLFlJ4FFWVIwwlcAuk_vVadTc_-FZonbhs4Sw-w10UV_ALCDw'
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.8),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Appearance & Language', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 17)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionHeader('LANGUAGE', 'Select your preferred language for the interface.'),
            _buildLanguagePicker(),
            const SizedBox(height: 48),
            const Center(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 40),
                child: Text(
                  'Language changes will be applied instantly across the entire Nobevra platform.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w500, height: 1.5),
                ),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title, String subtitle) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 32, 24, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(color: Colors.grey, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
          const SizedBox(height: 4),
          Text(subtitle, style: TextStyle(color: Colors.grey.shade500, fontSize: 13, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }



  Widget _buildLanguagePicker() {
    final profile = context.watch<ProfileController>();
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.lightGrey.withOpacity(0.5)),
        ),
        child: Column(
          children: List.generate(_languages.length, (index) {
            final lang = _languages[index];
            final String langCode = lang['name'] == 'English' ? 'en' : (lang['name'] == 'French' ? 'fr' : (lang['name'] == 'Spanish' ? 'es' : 'de'));
            final bool isSelected = profile.locale?.languageCode == langCode;
            final bool isLast = index == _languages.length - 1;

            return Column(
              children: [
                ListTile(
                  onTap: () => profile.setLocale(Locale(langCode)),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
                  leading: Container(
                    width: 32,
                    height: 22,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(4),
                      image: DecorationImage(image: NetworkImage(lang['flag']!), fit: BoxFit.cover),
                      border: Border.all(color: Colors.grey.withOpacity(0.1)),
                    ),
                  ),
                  title: Text(lang['label']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  trailing: isSelected ? const Icon(Icons.radio_button_checked_rounded, color: AppColors.primary) : const Icon(Icons.radio_button_off_rounded, color: AppColors.lightGrey),
                ),
                if (!isLast) Divider(height: 1, color: AppColors.lightGrey.withOpacity(0.3), indent: 64),
              ],
            );
          }),
        ),
      ),
    );
  }
}

