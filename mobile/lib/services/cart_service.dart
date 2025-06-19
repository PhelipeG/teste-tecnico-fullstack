// ignore_for_file: avoid_print
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product.dart';

class CartService {
  Future<bool> finalizarCompra({
    required String name,
    required String email,
    required Map<Product, int> cart,
    required double totalPrice,
  }) async {
    final url = Uri.parse('http://10.0.2.2:3000/orders');

    // Cada produto uma vez, com o campo quantity
    final List<Map<String, dynamic>> items = cart.entries.map((entry) {
      final product = entry.key;
      final quantity = entry.value;
      final productMap = product.toJson();

      productMap['quantity'] = quantity;

      // Garantir que o campo image seja sempre uma string, mesmo que vazia ou nula
      if (!productMap.containsKey('image') || productMap['image'] == null) {
        productMap['image'] = '';
      }

      return productMap;
    }).toList();

    final body = {
      'name': name,
      'email': email,
      'items': items,
      'totalPrice': totalPrice,
    };

    print('Enviando JSON: ${jsonEncode(body)}');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(body),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        return true;
      } else {
        print(
          'Erro ao finalizar compra: ${response.statusCode}\n${response.body}',
        );
        throw Exception(
          'Erro ao finalizar compra: ${response.statusCode}\n${response.body}',
        );
      }
    } catch (e) {
      print('Erro ao finalizar compra: $e');
      throw Exception('Erro ao finalizar compra: $e');
    }
  }
}
