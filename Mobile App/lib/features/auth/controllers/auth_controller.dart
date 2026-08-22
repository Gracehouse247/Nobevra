import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/services/biometric_service.dart';
import '../../../core/services/notification_service.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/core/constants/env_constants.dart';
import 'package:noble_invoice/core/services/auth_service.dart';

enum AuthStatus { idle, loading, success, error, authenticated }

class AuthController extends ChangeNotifier {
  AuthStatus _status = AuthStatus.idle;
  String _errorMessage = '';
  String _pendingEmail = ''; // carried between screens (register → OTP)

  AuthStatus get status => _status;
  String get errorMessage => _errorMessage;
  String get pendingEmail => _pendingEmail;
  bool get isLoading => _status == AuthStatus.loading;
  User? get currentUser => SupabaseService.client.auth.currentUser;

  bool _isBiometricEnabled = false;
  bool get isBiometricEnabled => _isBiometricEnabled;

  AuthController() {
    _initBiometrics();
    AuthService.initAuthStateListener();
  }

  Future<void> _initBiometrics() async {
    _isBiometricEnabled = await BiometricService.isBiometricEnabled();
    notifyListeners();
  }

  void _setLoading()              { _status = AuthStatus.loading; _errorMessage = ''; notifyListeners(); }
  void _setError(String msg)      { _status = AuthStatus.error; _errorMessage = msg; notifyListeners(); }
  void _setSuccess()              { _status = AuthStatus.success; notifyListeners(); }
  void reset()                    { _status = AuthStatus.idle; _errorMessage = ''; notifyListeners(); }

  Future<void> _finalizeLogin() async {
    // 1. Save login timestamp for 24h security check
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('last_login_timestamp', DateTime.now().toIso8601String());
    
    // 2. Sync FCM token
    NotificationService.init();
    
    // 3. Mark as authenticated
    _status = AuthStatus.authenticated;
    notifyListeners();
  }

  Future<void> finalizeLoginFromMfa() async {
    await _finalizeLogin();
  }

  // ── Register ───────────────────────────────────────────────────────────────
  /// Returns true on success → navigate to OTP screen
  Future<bool> register({required String name, required String email, required String password}) async {
    _setLoading();
    try {
      await SupabaseService.client.auth.signUp(
        email: email,
        password: password,
        data: {
          'name': name,
          'full_name': name,         // Standard for social providers
          'display_name': name,      // Modern key used in profiles table
        },
      );
      _pendingEmail = email;
      _setSuccess();
      return true;
    } catch (e) {
      _setError(e is AuthException ? e.message : 'Registration failed. Try again.');
      return false;
    }
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  /// Returns 'success', 'mfa_required', or 'error'
  Future<String> login({required String email, required String password}) async {
    _setLoading();
    try {
      await SupabaseService.client.auth.signInWithPassword(
        email: email,
        password: password,
      );
      
      // Check MFA requirement
      final aalResponse = await SupabaseService.client.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalResponse.nextLevel?.toString().contains('aal2') == true) {
        // User needs to verify MFA (TOTP). We keep the AAL1 session active.
        _setSuccess();
        return 'mfa_required';
      }
      
      await _finalizeLogin();
      return 'success';
    } catch (e) {
      _setError(e is AuthException ? e.message : 'Login failed. Try again.');
      return 'error';
    }
  }
  
  // ── Google Sign-In ────────────────────────────────────────────────────────
  Future<bool> signInWithGoogle() async {
    _setLoading();
    try {
      final googleSignIn = GoogleSignIn(
        serverClientId: EnvConstants.googleWebClientId,
        scopes: ['email', 'profile'],
      );
      
      // ── Force Account Picker ────────────────────────────────────────────────
      // We sign out from the local Google instance first so the OS is forced
      // to show the Gmail selection list again.
      try {
        if (await googleSignIn.isSignedIn()) {
          await googleSignIn.signOut();
        }
      } catch (e) {
        debugPrint('Google SignOut error (Safe to ignore): $e');
      }

      final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
      if (googleUser == null) {
        _status = AuthStatus.idle;
        notifyListeners();
        return false;
      }

      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
      final String? idToken = googleAuth.idToken;
      final String? accessToken = googleAuth.accessToken;

      if (idToken == null) {
        _setError('Failed to get Google ID token');
        return false;
      }

      // Sync with Supabase Auth
      await SupabaseService.client.auth.signInWithIdToken(
        provider: OAuthProvider.google,
        idToken: idToken,
        accessToken: accessToken,
      );
      
      await _finalizeLogin();
      return true;
    } catch (e) {
      debugPrint('Google Sign-In Error: $e');
      _setError(e is AuthException ? e.message : 'Google Sign-In failed: $e');
      return false;
    }
  }

  // ── Verify OTP ────────────────────────────────────────────────────────────
  /// Pass the 6-digit OTP; returns true on success
  Future<bool> verifyOtp({required String email, required String otp}) async {
    _setLoading();
    try {
      await SupabaseService.client.auth.verifyOTP(
        email: email,
        token: otp,
        type: OtpType.signup,
      );
      _setSuccess();
      return true;
    } catch (e) {
      _setError(e is AuthException ? e.message : 'Invalid OTP. Please try again.');
      return false;
    }
  }

  // ── Resend OTP ────────────────────────────────────────────────────────────
  Future<bool> resendOtp(String email) async {
    _setLoading();
    try {
      await SupabaseService.client.auth.resend(
        type: OtpType.signup,
        email: email,
      );
      _setSuccess();
      return true;
    } catch (e) {
      _setError(e is AuthException ? e.message : 'Failed to resend OTP.');
      return false;
    }
  }

  // ── Forgot Password ───────────────────────────────────────────────────────
  Future<bool> forgotPassword(String email) async {
    _setLoading();
    try {
      _pendingEmail = email;
      await SupabaseService.client.auth.resetPasswordForEmail(email);
      _setSuccess();
      return true;
    } catch (e) {
      _setError(e is AuthException ? e.message : 'Failed to send reset email.');
      return false;
    }
  }

  // ── Update Password ───────────────────────────────────────────────────────
  Future<bool> updatePassword(String newPassword) async {
    _setLoading();
    try {
      await SupabaseService.client.auth.updateUser(
        UserAttributes(password: newPassword),
      );
      _setSuccess();
      return true;
    } catch (e) {
      _setError(e is AuthException ? e.message : 'Failed to update password.');
      return false;
    }
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  // ── Deep Logout ────────────────────────────────────────────────────────────
  /// Performs a full logout by clearing Supabase sessions and disconnecting Google.
  /// This ensures that 'Auto-Login' does not occur and the user is taken to the Login screen.
  Future<void> logout() async {
    _status = AuthStatus.loading;
    notifyListeners();
    try {
      // 1. Purge Biometrics
      await BiometricService.purge();
      _isBiometricEnabled = false;

      // 2. Sign out from Supabase (Clears local JWT)
      await SupabaseService.client.auth.signOut();

      // 3. Disconnect Google (Forces account picker next time)
      final googleSignIn = GoogleSignIn();
      if (await googleSignIn.isSignedIn()) {
        await googleSignIn.disconnect();
      }

      _status = AuthStatus.idle;
    } catch (e) {
      debugPrint('Logout Error: $e');
      _status = AuthStatus.idle; // Always revert to idle
    } finally {
      notifyListeners();
    }
  }

  /// Validates if the current session is still alive and the user exists in the DB.
  /// If the user was deleted from the backend, this will force a logout.
  Future<bool> validateSession() async {
    try {
      // 1. Basic JWT Presence
      final session = SupabaseService.client.auth.currentSession;
      if (session == null) return false;

      // 2. Time-Based Security (Force re-auth after 24h)
      final prefs = await SharedPreferences.getInstance();
      final lastLoginStr = prefs.getString('last_login_timestamp');
      if (lastLoginStr != null) {
        final lastLogin = DateTime.parse(lastLoginStr);
        if (DateTime.now().difference(lastLogin).inHours >= 24) {
          debugPrint('Session older than 24h. Forcing re-auth.');
          await logout();
          return false;
        }
      }

      // 3. Server-Side Existence Check
      final userResponse = await SupabaseService.client.auth.getUser();
      if (userResponse.user == null) {
        await logout();
        return false;
      }
      return true;
    } catch (e) {
      debugPrint('Session validation failed: $e');
      await logout();
      return false;
    }
  }

  // ── Check if still logged in ──────────────────────────────────────────────
  Future<bool> checkAuth() async => SupabaseService.isLoggedIn;

  // ── Biometrics ────────────────────────────────────────────────────────────
  Future<bool> enableBiometric() async {
    final supportsFingerprint = await BiometricService.isFingerprintAvailable();
    if (!supportsFingerprint) {
      _setError('Fingerprint authentication is not available on this device.');
      return false;
    }

    final ok = await BiometricService.authenticate(reason: 'Scan fingerprint to enable biometric login');
    if (ok) {
      await BiometricService.setBiometricEnabled(true);
      _isBiometricEnabled = true;
      notifyListeners();
      return true;
    }
    return false;
  }

  Future<void> disableBiometric() async {
    await BiometricService.setBiometricEnabled(false);
    _isBiometricEnabled = false;
    notifyListeners();
  }

  Future<bool> loginWithBiometric() async {
    // 1. First verify the device biometric scan
    final ok = await BiometricService.authenticate(reason: 'Scan fingerprint to login');
    if (!ok) return false;

    // 2. Check if there's still a valid stored token
    final hasSession = SupabaseService.isLoggedIn;
    if (!hasSession) {
      _setError('Session expired. Please log in with your password.');
      // Disable biometrics since the session is gone
      await BiometricService.setBiometricEnabled(false);
      _isBiometricEnabled = false;
      notifyListeners();
      return false;
    }

    // 3. Do a lightweight ping to confirm the token is still valid on the server
    try {
      await SupabaseService.client.auth.getUser();
    } catch (e) {
      // If we get an error, the session is expired
      _setError('Session expired. Please log in with your password.');
      await SupabaseService.signOut();
      await BiometricService.setBiometricEnabled(false);
      _isBiometricEnabled = false;
      notifyListeners();
      return false;
    }

    await _finalizeLogin();
    return true;
  }
}
