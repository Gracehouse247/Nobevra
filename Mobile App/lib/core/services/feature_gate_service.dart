import 'package:supabase_flutter/supabase_flutter.dart';

/// FeatureGateService — Entitlement Platform Client (Flutter)
///
/// Maps directly to the `resolve_team_entitlements` Supabase RPC.
/// Returns a flat JSON map of feature IDs → limits (null = unlimited, 0 = no access).
///
/// Usage:
///   await FeatureGateService().initialize();
///   if (FeatureGateService().canUse('ai.voice')) { ... }
///   int? limit = FeatureGateService().getLimit('invoice.create'); // null = unlimited
class FeatureGateService {
  static final FeatureGateService _instance = FeatureGateService._internal();
  factory FeatureGateService() => _instance;
  FeatureGateService._internal();

  final _supabase = Supabase.instance.client;

  /// Raw entitlements map from resolve_team_entitlements RPC
  /// e.g. { "invoice.create": 10, "ai.voice": 5, "brand.studio": 1 }
  Map<String, dynamic>? _entitlements;
  bool _initialized = false;

  Future<void> initialize() async {
    final user = _supabase.auth.currentUser;
    if (user == null) {
      _reset();
      return;
    }

    try {
      // Step 1: Get the user's primary team
      final teamResponse = await _supabase
          .from('teams')
          .select('id')
          .eq('owner_id', user.id)
          .order('created_at', ascending: true)
          .limit(1)
          .maybeSingle();

      if (teamResponse == null) {
        print('FeatureGateService: No team found for user \${user.id}');
        _reset();
        return;
      }

      final teamId = teamResponse['id'] as String;

      // Step 2: Resolve entitlements for the team
      final response = await _supabase
          .rpc('resolve_team_entitlements', params: {'p_team_id': teamId});

      if (response != null) {
        _entitlements = Map<String, dynamic>.from(response as Map);
      }
      _initialized = true;
    } catch (e) {
      print('FeatureGateService: Error fetching entitlements: \$e');
      _reset();
    }
  }

  void _reset() {
    _entitlements = null;
    _initialized = false;
  }

  /// Returns true if the user has access to the given feature.
  /// - limit == null in DB means unlimited → true
  /// - limit > 0: has some quota → true
  /// - limit == 0 or not present: no access → false
  bool canUse(String featureId) {
    if (_entitlements == null) return false;
    final val = _entitlements![featureId];
    if (val == null) return true; // null = unlimited
    if (val is int) return val > 0;
    if (val is num) return val > 0;
    return false;
  }

  /// Returns the numeric limit for a feature.
  /// Returns null for unlimited, 0 for no access.
  int? getLimit(String featureId) {
    if (_entitlements == null) return 0;
    final val = _entitlements![featureId];
    if (val == null) return null; // unlimited
    if (val is int) return val;
    if (val is num) return val.toInt();
    return 0;
  }

  // ── Convenience Getters (backward-compatible) ─────────────────────────────
  int get maxInvoicesPerMonth => getLimit('invoice.create') ?? 10;
  int get maxClients => getLimit('client.create') ?? 5;
  bool get hasAdvancedEditing => canUse('invoice.advanced_editing');
  bool get hasBrandStudio => canUse('brand.studio');
  bool get hasWallet => canUse('wallet.payments');
  bool get hasAiVoice => canUse('ai.voice');
  bool get hasReceiptScan => canUse('receipt.scan');

  bool get isInitialized => _initialized;

  // Kept for backward-compat — now derived from entitlements, not a raw tier string
  bool get isProOrElite => canUse('ai.voice') || canUse('receipt.scan');
}
