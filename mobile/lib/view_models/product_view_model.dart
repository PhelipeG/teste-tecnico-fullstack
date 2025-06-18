import 'package:flutter/material.dart';
import '../models/product.dart';
import '../services/product_service.dart';

class ProductViewModel extends ChangeNotifier {
  final ProductService _productService = ProductService();
  List<Product> _products = [];
  bool _isLoading = false;

  List<Product> get products => _products;
  bool get isLoading => _isLoading;

  Future<void> fetchProducts({String? name, String? category}) async {
    _isLoading = true;
    notifyListeners(); // Avisa a UI que está carregando

    try {
      _products = await _productService.fetchProducts(
        name: name,
        category: category,
      );
    } catch (e) {
      // Apenas relança o erro para a HomePage tratar a mensagem
      rethrow;
    } finally {
      // Este bloco é executado SEMPRE (sucesso ou erro)
      _isLoading = false;
      notifyListeners(); // Avisa a UI que parou de carregar
    }
  }

  // Para pegar todas as categorias únicas dos produtos
  List<String> get categories {
    final set = <String>{};
    for (final p in _products) {
      if (p.category.isNotEmpty) set.add(p.category);
    }
    return set.toList();
  }

  Future<void> searchProductsByName(String name) async {
    _isLoading = true;
    notifyListeners();
    try {
      _products = await _productService.fetchProducts(name: name);
    } catch (e) {
      throw Exception('Erro ao buscar produtos por nome: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
