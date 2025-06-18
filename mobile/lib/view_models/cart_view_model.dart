import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/product.dart';

class CartViewModel extends ChangeNotifier {
  final Map<Product, int> _cart = {};

  Map<Product, int> get cart => _cart;

  int get itemCount => _cart.values.fold(0, (sum, quantity) => sum + quantity);
  CartViewModel() {
    loadCartLocal();
  }

  void addToCart(Product product) {
    if (_cart.containsKey(product)) {
      _cart[product] = _cart[product]! + 1;
    } else {
      _cart[product] = 1;
    }
    saveCart();
    notifyListeners();
  }

  void removeFromCart(Product product) {
    if (_cart.containsKey(product)) {
      if (_cart[product]! > 1) {
        _cart[product] = _cart[product]! - 1;
      } else {
        _cart.remove(product);
      }
      saveCart();
      notifyListeners();
    }
  }

  void removeProductCompletely(Product product) {
    if (_cart.containsKey(product)) {
      _cart.remove(product);
      saveCart();
      notifyListeners();
    }
  }

  void clearCart() {
    _cart.clear();
    saveCart();
    notifyListeners();
  }

  Future<void> saveCart() async {
    final prefs = await SharedPreferences.getInstance();
    // Serializa produtos e quantidades como lista de mapas
    final cartList = _cart.entries
        .map((e) => {'product': e.key.toJson(), 'quantity': e.value})
        .toList();
    prefs.setString('cart', jsonEncode(cartList));
  }

  Future<void> loadCartLocal() async {
    final prefs = await SharedPreferences.getInstance();
    final cartString = prefs.getString('cart') ?? '[]';
    final List decoded = jsonDecode(cartString) as List;
    _cart.clear();
    for (var item in decoded) {
      final product = Product.fromJson(item['product']);
      final quantity = item['quantity'] as int;
      _cart[product] = quantity;
    }
    notifyListeners();
  }

  double get total => _cart.entries.fold(
    0,
    (sum, entry) =>
        sum +
        (double.parse(entry.key.price.replaceAll(',', '.')) * entry.value),
  );
}
