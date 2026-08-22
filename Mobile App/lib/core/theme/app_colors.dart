import 'package:flutter/material.dart';

// A class to hold all the color constants for the Nobevra app,
// derived directly from the brand logo for a consistent look and feel.
class AppColors {
  // This class is not meant to be instantiated.
  AppColors._();

  // --- Primary Brand Colors (From Official Brand Guidelines & Web App) ---
  static const Color primary = Color(0xFF01A0E2); // Noble Blue / Primary Brand Blue
  static const Color primaryDark = Color(0xFF013948); // Deep Navy / Dark Teal
  static const Color primaryOcean = Color(0xFF01779D); // Mid Blue / Ocean Teal
  static const Color primaryLight = Color(0xFFE8F7FD); // Soft ice blue tint
  static const Color cyanAccent = Color(0xFF00C7F2); // Vivid Cyan highlight

  // --- Secondary & Accent Colors ---
  static const Color secondary = Color(0xFF013948); // Deep Navy
  static const Color accent = Color(0xFF00C7F2);    // Brand Cyan accent

  // --- Neutral Colors ---
  static const Color black = Color(0xFF050B1A); // Consistent with brand navy
  static const Color white = Color(0xFFFFFFFF); 

  // --- Surface & Background Palette ---
  static const Color background = Color(0xFFFFFFFF); // Pure White #FFFFFF as requested
  static const Color surface = Color(0xFFFFFFFF);    // Panels default to pure white
  static const Color lightGrey = Color(0xFFF1F5F9); // Slate-100 for very subtle dividers
  static const Color darkGrey = Color(0xFF64748B);   // Slate-500 secondary text
  static const Color textBlack = Color(0xFF050B1A);   // Primary text
  static const Color textPrimary = Color(0xFF050B1A); // Added for consistency
  static const Color textSecondary = Color(0xFF64748B); // Added for consistency

  // --- Semantic Colors ---
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
}
