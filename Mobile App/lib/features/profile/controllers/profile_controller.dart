// lib/features/profile/controllers/profile_controller.dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/features/profile/models/profile_model.dart';
import 'package:noble_invoice/features/profile/models/team_model.dart';
import 'package:noble_invoice/core/services/image_processing_service.dart';
import 'package:noble_invoice/core/services/session_service.dart';
import 'package:noble_invoice/core/services/location_service.dart';

class ProfileController extends ChangeNotifier {
  UserProfile? _profile;
  bool _isLoading = false;
  bool _isSaving  = false;
  String _errorMessage = '';

  UserProfile? get profile => _profile;
  bool get isLoading => _isLoading;
  bool get isSaving  => _isSaving;
  String get errorMessage => _errorMessage;
  bool get onboardingCompleted => _profile?.onboardingCompleted ?? false;

  // Helpers for UI
  ThemeMode get themeMode => ThemeMode.light;

  Locale? get locale => _profile?.locale != null ? Locale(_profile!.locale) : null;
  String get preferredCurrency => _profile?.preferredCurrency ?? LocationService.defaultCurrency;

  // Notification Getters
  bool get invoicingUpdates => _getPref('invoicingUpdates');
  bool get qrScans          => _getPref('qrScans');
  bool get aiNews           => _getPref('aiNews');
  bool get marketingOffers    => _getPref('marketingOffers');

  bool _getPref(String key) {
    if (_profile == null) return true; // Default to true
    final prefs = (_profile!.toJson()['notification_preferences'] as Map?) ?? {};
    return prefs[key] ?? true;
  }

  /// Initial entry point to load all user data
  Future<Team?> loadProfile() async {
    final user = SupabaseService.currentUser;
    if (user == null) return null;

    _isLoading = true;
    Team? activeTeam;

    try {
      final results = await Future.wait<dynamic>([
        SupabaseService.client.from('profiles').select().eq('id', user.id).maybeSingle(),
        SupabaseService.client.from('team_members').select('*, teams(*)').eq('user_id', user.id),
      ]);

      var profileData = results[0];
      if (profileData == null) {
        final newProfileMap = {
          'id': user.id,
          'email': user.email,
          'display_name': user.userMetadata?['full_name'] ?? user.email?.split('@').first ?? 'User',
          'onboarding_completed': false,
        };
        await SupabaseService.client.from('profiles').insert(newProfileMap);
        profileData = newProfileMap;
      }
      _profile = UserProfile.fromJson(profileData as Map<String, dynamic>);

      final myTeams = results[1] as List;
      if (myTeams.isNotEmpty) {
        final preferredTeamId = _profile?.toJson()['last_active_team_id'];
        final preferred = preferredTeamId != null
            ? myTeams.firstWhere((t) => t['team_id'] == preferredTeamId, orElse: () => myTeams[0])
            : myTeams[0];

        activeTeam = Team.fromJson(preferred['teams']);
      } else {
        final newTeamData = await SupabaseService.client.from('teams').insert({
          'owner_id': user.id,
          'name': _profile?.businessName ?? 'My Business',
        }).select().single();
        
        activeTeam = Team.fromJson(newTeamData);
        await SupabaseService.client.from('team_members').insert({
          'team_id': activeTeam.id,
          'user_id': user.id,
          'role': 'owner',
        });
      }

      // Check if we need to auto-detect currency
      if (profileData['preferred_currency'] == null) {
        String detectedCurrency = LocationService.defaultCurrency;
        try {
          final countryCode = await LocationService.detectUserCountryCode();
          if (countryCode != null) {
            detectedCurrency = LocationService.getCurrencyForCountryCode(countryCode);
          } else if (Platform.localeName.isNotEmpty) {
            final locParts = Platform.localeName.split('_');
            if (locParts.length > 1) {
              detectedCurrency = LocationService.getCurrencyForCountryCode(locParts[1]);
            }
          }
        } catch (_) {}

        if (detectedCurrency != _profile?.preferredCurrency) {
          _profile = _profile?.copyWith(preferredCurrency: detectedCurrency);
          await SupabaseService.client.from('profiles').update({
            'preferred_currency': detectedCurrency,
          }).eq('id', user.id);
          
          if (activeTeam != null) {
            await SupabaseService.client.from('teams').update({
              'preferred_currency': detectedCurrency,
            }).eq('id', activeTeam.id);
          }
        }
      }

      await SessionService.upsertCurrentSession(user.id);
    } catch (e) {
      debugPrint('Error loading profile: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
    return activeTeam;
  }


  /// Update user currency preference
  Future<void> updateCurrency(String code) async {
    if (_profile == null) return;
    try {
      await SupabaseService.client
          .from('profiles')
          .update({'preferred_currency': code})
          .eq('id', _profile!.id);
      
      _profile = _profile!.copyWith(preferredCurrency: code);
      notifyListeners();
    } catch (e) {
      debugPrint('Error updating currency: $e');
    }
  }

  Future<bool> updateProfile({
    String? name,
    String? email,
    String? phone,
    String? businessName,
    String? bankName,
    String? accountName,
    String? accountNumber,
  }) async {
    if (_profile == null) return false;
    _isSaving = true;
    _errorMessage = '';
    notifyListeners();
 
    try {
      final updates = {
        if (name != null) 'display_name': name,
        if (email != null) 'email': email,
        if (phone != null) 'phone': phone,
        if (businessName != null) 'business_name': businessName,
        if (bankName != null) 'bank_name': bankName,
        if (accountName != null) 'account_name': accountName,
        if (accountNumber != null) 'account_number': accountNumber,
      };
 
      await SupabaseService.client
          .from('profiles')
          .update(updates)
          .eq('id', _profile!.id);
 
      _profile = _profile!.copyWith(
        displayName: name,
        email: email,
        phone: phone,
        businessName: businessName,
        bankName: bankName,
        accountName: accountName,
        accountNumber: accountNumber,
      );
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      return false;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Update user notification preference
  Future<void> updateNotificationPreference(String key, bool value) async {
    if (_profile == null) return;
    try {
      // Assuming we have a 'notification_preferences' jsonb column or separate table
      // For now, let's assume it's a JSON column in profiles
      final currentPrefs = Map<String, dynamic>.from((_profile?.toJson()['notification_preferences'] as Map?) ?? {});
      currentPrefs[key] = value;

      await SupabaseService.client
          .from('profiles')
          .update({'notification_preferences': currentPrefs})
          .eq('id', _profile!.id);
      
      // Update local state if needed (this depends on how the model is structured)
      // For simplicity, we assume the model handles it or we'll just reload
      await loadProfile();
    } catch (e) {
      debugPrint('Error updating notification preference: $e');
    }
  }

  /// Update detailed business branding / identity data
  Future<bool> updateBranding({
    String? businessName,
    String? businessAddress,
    String? businessEmail,
    String? businessPhone,
    String? taxNumber,
    String? brandColor,
    String? invoiceFooter,
    String? bankName,
    String? accountName,
    String? accountNumber,
  }) async {
    if (_profile == null) return false;
    _isSaving = true;
    _errorMessage = '';
    notifyListeners();
 
    try {
      final updates = {
        'business_name':    businessName,
        'business_address': businessAddress,
        'business_email':   businessEmail,
        'business_phone':   businessPhone,
        'tax_number':       taxNumber,
        'brand_color':      brandColor,
        'invoice_footer':   invoiceFooter,
        if (bankName != null) 'bank_name': bankName,
        if (accountName != null) 'account_name': accountName,
        if (accountNumber != null) 'account_number': accountNumber,
      };
 
      await SupabaseService.client
          .from('profiles')
          .update(updates)
          .eq('id', _profile!.id);

      // SYNC TO TEAMS
      await SupabaseService.client
          .from('teams')
          .update({
            'brand_color': brandColor,
            'name': businessName,
            'business_address': businessAddress,
            'business_email': businessEmail,
            'business_phone': businessPhone,
            'tax_number': taxNumber,
          })
          .eq('owner_id', _profile!.id);
 
      _profile = _profile!.copyWith(
        businessName:    businessName,
        businessAddress: businessAddress,
        businessEmail:   businessEmail,
        businessPhone:   businessPhone,
        taxNumber:       taxNumber,
        brandColor:      brandColor,
        invoiceFooter:   invoiceFooter,
        bankName:        bankName,
        accountName:     accountName,
        accountNumber:   accountNumber,
      );
      
      return true;
    } catch (e) {
      _errorMessage = e.toString();
      return false;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Update the default invoice template preference
  Future<bool> updateDefaultTemplate(String templateId) async {
    if (_profile == null) return false;
    _isSaving = true;
    notifyListeners();
    try {
      await SupabaseService.client
          .from('profiles')
          .update({'default_invoice_template': templateId})
          .eq('id', _profile!.id);
      
      _profile = _profile!.copyWith(defaultInvoiceTemplate: templateId);
      return true;
    } catch (e) {
      debugPrint('Error updating default template: $e');
      return false;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Complete the onboarding flow and save identity/branding
  Future<bool> completeOnboarding({
    required String businessName,
    required String industry,
    required String country,
    required String brandColor,
    String? secondaryColor,
    String? brandVoice,
    String? logoUrl,
    String? taxNumber,
    String? invoiceFooter,
  }) async {
    if (_profile == null) {
      _errorMessage = 'Profile session lost. Please restart the app once more.';
      notifyListeners();
      return false;
    }
    _isSaving = true;
    _errorMessage = '';
    notifyListeners();

    try {
      final updates = {
        'business_name':   businessName,
        'industry':        industry,
        'country':         country,
        'brand_color':     brandColor,
        'secondary_color': secondaryColor,
        'brand_voice':     brandVoice,
        'brand_logo_url':  logoUrl,
        'tax_number':      taxNumber,
        'invoice_footer':  invoiceFooter,
        'onboarding_completed': true,
      };

      await SupabaseService.client
          .from('profiles')
          .update(updates)
          .eq('id', _profile!.id);

      // SYNC TO TEAMS (Initial Brand Setup)
      await SupabaseService.client
          .from('teams')
          .update({
            'name': businessName,
            'brand_color': brandColor,
            'secondary_color': secondaryColor,
            'brand_voice': brandVoice,
            'brand_logo_url': logoUrl,
            'tax_number': taxNumber,
            'invoice_footer': invoiceFooter,
          })
          .eq('owner_id', _profile!.id);

      _profile = _profile!.copyWith(
        businessName:   businessName,
        industry:       industry,
        country:        country,
        brandColor:     brandColor,
        brandLogoUrl:   logoUrl,
        taxNumber:      taxNumber,
        invoiceFooter:  invoiceFooter,
        onboardingCompleted: true,
      );
      
      return true;
    } catch (e) {
      debugPrint('🚨 CUSTOM ERROR - ONBOARDING FAILED: $e');
      _errorMessage = e.toString();
      return false;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Upload a profile avatar to Supabase storage and persist the URL
  Future<String?> uploadAvatar(File file) async {
    if (_profile == null) return null;
    _isSaving = true;
    _errorMessage = '';
    notifyListeners();
    try {
      // Use userId as the first folder for RLS matching
      final path = '${_profile!.id}/avatar.jpg';
      final bytes = await file.readAsBytes();

      // Upsert so re-uploads overwrite cleanly
      await SupabaseService.client.storage
          .from('avatars')
          .uploadBinary(
            path,
            bytes,
            fileOptions: const FileOptions(
              upsert: true,
              contentType: 'image/jpeg',
            ),
          );

      // Get public URL and bust cache with timestamp
      final rawUrl = SupabaseService.client.storage
          .from('avatars')
          .getPublicUrl(path);
      final avatarUrl = '$rawUrl?t=${DateTime.now().millisecondsSinceEpoch}';

      // Persist to profiles table
      await SupabaseService.client
          .from('profiles')
          .update({'avatar_url': rawUrl})
          .eq('id', _profile!.id);

      _profile = _profile!.copyWith(avatarPath: avatarUrl);
      notifyListeners();
      return avatarUrl;
    } catch (e) {
      debugPrint('❌ Avatar upload error: $e');
      // Surface the real error so it shows in the snackbar
      _errorMessage = 'Photo upload failed: ${e.toString().replaceAll('StorageException: ', '')}';
      return null;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Upload a business logo to Supabase storage with automated background removal
  Future<String?> uploadLogo(File file) async {
    if (_profile == null) return null;
    _isSaving = true;
    notifyListeners();
    try {
      // Automated Background Removal for a professional "remove.bg" effect
      final processedBytes = await ImageProcessingService.removeLogoBackground(file);
      
      final path = '${_profile!.id}/logo_${DateTime.now().millisecondsSinceEpoch}.png';
      
      if (processedBytes != null) {
        await SupabaseService.client.storage.from('avatars').uploadBinary(
          path, 
          processedBytes,
          fileOptions: const FileOptions(contentType: 'image/png'),
        );
      } else {
        // Fallback to original if processing fails
        await SupabaseService.client.storage.from('avatars').upload(path, file);
      }
      
      final url = SupabaseService.client.storage.from('avatars').getPublicUrl(path);
      
      // Persist to profiles
      await SupabaseService.client
          .from('profiles')
          .update({'brand_logo_url': url})
          .eq('id', _profile!.id);
          
      // SYNC TO TEAMS (so they appear in invoices immediately)
      await SupabaseService.client
          .from('teams')
          .update({'brand_logo_url': url})
          .eq('owner_id', _profile!.id);
          
      _profile = _profile!.copyWith(brandLogoUrl: url);
      notifyListeners();
      
      return url;
    } catch (e) {
      debugPrint('Error uploading logo: $e');
      return null;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  /// Upload a business signature to Supabase storage with automated background removal
  Future<String?> uploadSignature(File file) async {
    if (_profile == null) return null;
    _isSaving = true;
    notifyListeners();
    try {
      // Use the same professional background removal for the signature
      final processedBytes = await ImageProcessingService.removeLogoBackground(file);
      
      final path = '${_profile!.id}/signature_${DateTime.now().millisecondsSinceEpoch}.png';
      
      if (processedBytes != null) {
        await SupabaseService.client.storage.from('avatars').uploadBinary(
          path, 
          processedBytes,
          fileOptions: const FileOptions(contentType: 'image/png'),
        );
      } else {
        await SupabaseService.client.storage.from('avatars').upload(path, file);
      }
      
      final url = SupabaseService.client.storage.from('avatars').getPublicUrl(path);
      
      // Persist to profile
      await SupabaseService.client
          .from('profiles')
          .update({'brand_signature_url': url})
          .eq('id', _profile!.id);
          
      // SYNC TO TEAMS
      await SupabaseService.client
          .from('teams')
          .update({'brand_signature_url': url})
          .eq('owner_id', _profile!.id);
          
      _profile = _profile!.copyWith(brandSignatureUrl: url);
      
      return url;
    } catch (e) {
      debugPrint('Error uploading signature: $e');
      return null;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }


  /// Update user locale preference
  Future<void> setLocale(Locale locale) async {
    if (_profile == null) return;
    try {
      await SupabaseService.client
          .from('profiles')
          .update({'locale': locale.languageCode})
          .eq('id', _profile!.id);
      
      _profile = _profile!.copyWith(locale: locale.languageCode);
      notifyListeners();
    } catch (e) {
      debugPrint('Error updating locale: $e');
    }
  }


}
