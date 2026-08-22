import 'package:supabase_flutter/supabase_flutter.dart';

/// Central Supabase client wrapper for the Nobevra App.
/// Replaces the legacy ApiService Node.js REST calls.
class SupabaseService {
  // Expose the raw Supabase client
  static final SupabaseClient client = Supabase.instance.client;

  // ── Auth Helpers ─────────────────────────────────────────────────────────────
  
  /// Get the currently logged-in Supabase user
  static User? get currentUser => client.auth.currentUser;

  /// Check if a user session exists
  static bool get isLoggedIn => client.auth.currentSession != null;

  /// Logs out the user from Supabase
  static Future<void> signOut() async {
    await client.auth.signOut();
  }
}
