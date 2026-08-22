import 'package:flutter/material.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';

// A class to hold all the text styles for the Nobevra app.
// This ensures a consistent typography system across the application.
class AppTextStyles {
  // This class is not meant to be instantiated.
  AppTextStyles._();

  // --- Font Families ---
  static const String _fontFamilyHeading = 'Montserrat';
  static const String _fontFamilyBody = 'Roboto';

  // --- Heading Styles (Montserrat) ---

  /// Style for large page titles.
  /// Usage: Onboarding titles, main feature titles.
  static const TextStyle headlineLarge = TextStyle(
    fontFamily: _fontFamilyHeading,
    fontSize: 24.0, // Strict rule applied
    fontWeight: FontWeight.bold,
    color: AppColors.textBlack,
    letterSpacing: -0.5,
  );

  /// Style for section titles.
  /// Usage: Titles for sections within a page like "Business Information".
  static const TextStyle headlineMedium = TextStyle(
    fontFamily: _fontFamilyHeading,
    fontSize: 24.0,
    fontWeight: FontWeight.bold,
    color: AppColors.textBlack,
    letterSpacing: -0.5,
  );

  /// Style for smaller headings or important labels.
  /// Usage: Card titles, important form field labels.
  static const TextStyle headlineSmall = TextStyle(
    fontFamily: _fontFamilyHeading,
    fontSize: 18.0, // Secondary Size
    fontWeight: FontWeight.bold,
    color: AppColors.textBlack,
    letterSpacing: -0.5,
  );

  // --- Body & General Text Styles (Roboto) ---

  /// Standard body text style for paragraphs and descriptions.
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: _fontFamilyBody,
    fontSize: 14.0, // Unified Body Size
    fontWeight: FontWeight.normal,
    color: AppColors.textBlack,
    height: 1.5,
  );

  /// Slightly smaller body text for less emphasis.
  /// Usage: Captions, helper text below form fields.
  static const TextStyle bodyMedium = TextStyle(
    fontFamily: _fontFamilyBody,
    fontSize: 14.0,
    fontWeight: FontWeight.normal,
    color: AppColors.darkGrey,
  );

  /// Smallest body text for secondary information.
  /// Usage: Timestamps, fine print.
  static const TextStyle bodySmall = TextStyle(
    fontFamily: _fontFamilyBody,
    fontSize: 14.0, // Unified Body Size
    fontWeight: FontWeight.normal,
    color: AppColors.darkGrey,
  );

  // --- Button Text Style (Roboto) ---

  /// Style for text on buttons.
  static const TextStyle button = TextStyle(
    fontFamily: _fontFamilyBody,
    fontSize: 16.0,
    fontWeight: FontWeight.bold,
    color: AppColors.white,
    letterSpacing: 1.2,
  );

  // --- Form Field Text Style (Roboto) ---

  /// Style for text inside text fields.
  static const TextStyle textField = TextStyle(
    fontFamily: _fontFamilyBody,
    fontSize: 14.0, // Unified with body size
    fontWeight: FontWeight.normal,
    color: AppColors.textBlack,
  );
}
