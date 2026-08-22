// lib/features/inventory/controllers/product_controller.dart
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/features/inventory/models/product_model.dart';

class ProductController extends ChangeNotifier {
  bool _loading = false;
  String _error = '';

  List<Product>         _products    = [];
  List<ProductCategory> _categories  = [];
  String?               _activeTeamId;

  void setActiveTeamId(String? id) {
    _activeTeamId = id;
    notifyListeners();
  }

  bool          get isLoading   => _loading;
  String        get error       => _error;
  List<Product> get products    => _products;
  List<ProductCategory> get categories => _categories;

  String _parseError(dynamic e) {
    if (e is PostgrestException) return e.message;
    return e.toString();
  }

  // ── Fetching Logic ─────────────────────────────────────────────────────────

  Future<void> loadProducts() async {
    _loading = true;
    _error   = '';
    notifyListeners();

    try {
      if (_activeTeamId == null) throw Exception('No active team selected.');

      // 1. Fetch Categories
      final catRes = await SupabaseService.client
          .from('product_categories')
          .select('*')
          .eq('team_id', _activeTeamId!)
          .order('name');
      _categories = (catRes as List).map((j) => ProductCategory.fromJson(j)).toList();

      // 2. Fetch Products
      final proRes = await SupabaseService.client
          .from('products')
          .select('*, product_categories(name)')
          .eq('team_id', _activeTeamId!)
          .order('name');
      _products = (proRes as List).map((j) => Product.fromJson(j)).toList();

    } catch (e) {
      _error = _parseError(e);
    }

    _loading = false;
    notifyListeners();
  }

  // ── Create/Update Logic ───────────────────────────────────────────────────

  Future<bool> addProduct({
    required String name,
    required double price,
    String? sku,
    String? description,
    String? categoryId,
    int initialStock = 0,
    bool trackInventory = true,
  }) async {
    _loading = true;
    _error   = '';
    notifyListeners();

    try {
      if (_activeTeamId == null) throw Exception('No active team selected.');

      // 1. Create Product
      final res = await SupabaseService.client.from('products').insert({
        'team_id':      _activeTeamId!,
        'user_id':      SupabaseService.currentUser?.id,
        'name':        name,
        'sku':         sku,
        'description': description,
        'unit_price': unitPriceToString(price),
        'category_id': categoryId,
        'track_inventory': trackInventory,
        'stock_quantity':  0, // Set initial via ledger for audit
      }).select().single();

      final productId = res['id'].toString();

      // 2. If initial stock > 0, create ledger entry
      if (initialStock != 0) {
        await adjustStock(productId, initialStock, 'Initial Stock Addition');
      }

      await loadProducts();
      return true;
    } catch (e) {
      _error = _parseError(e);
      notifyListeners();
      return false;
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  // ── Stock Management ──────────────────────────────────────────────────────

  Future<bool> adjustStock(String productId, int amount, String reason, {String? referenceId}) async {
    try {
      await SupabaseService.client.from('stock_ledger').insert({
        'product_id':    productId,
        'change_amount': amount,
        'reason':        reason,
        'reference_id':  referenceId,
      });

      // Update local product quantity without re-fetching all
      final i = _products.indexWhere((p) => p.id == productId);
      if (i != -1) {
        final p = _products[i];
        _products[i] = Product(
          id: p.id,
          userId: p.userId,
          teamId: p.teamId,
          name: p.name,
          unitPrice: p.unitPrice,
          stockQuantity: p.stockQuantity + amount,
          trackInventory: p.trackInventory,
          createdAt: p.createdAt,
          updatedAt: DateTime.now(),
          sku: p.sku,
          description: p.description,
          categoryId: p.categoryId,
          categoryName: p.categoryName,
        );
      }

      notifyListeners();
      return true;
    } catch (e) {
      _error = _parseError(e);
      notifyListeners();
      return false;
    }
  }

  // Helper
  String unitPriceToString(double price) => price.toStringAsFixed(2);
}
