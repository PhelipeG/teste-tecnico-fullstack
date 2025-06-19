// services/product_service.dart
// ignore_for_file: curly_braces_in_flow_control_structures

import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/product.dart';

class ProductService {
  static const String _url = 'http://10.0.2.2:3000/products';

  Future<List<Product>> fetchProducts({
    String? name,
    String? category,
    String? provider,
  }) async {
    try {
      String url = _url;
      final params = <String, String>{};
      if (name != null && name.isNotEmpty) {
        params['search'] = name;
      }
      if (category != null && category.isNotEmpty)
        params['category'] = category;
      if (provider != null && provider.isNotEmpty)
        params['provider'] = provider;
      if (params.isNotEmpty) {
        url += '?';
        url += params.entries
            .map((e) => '${e.key}=${Uri.encodeComponent(e.value)}')
            .join('&');
      }
      final response = await http
          .get(Uri.parse(url))
          .timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonData = jsonDecode(response.body);
        final List productsJson = jsonData['products'];
        return productsJson.map((json) => Product.fromJson(json)).toList();
      } else {
        throw Exception('Erro ao buscar produtos: ${response.statusCode}');
      }
    } on http.ClientException catch (e) {
      throw Exception('Erro de conexão com a API: $e');
    } on TimeoutException {
      throw Exception(
        'A conexão com a API expirou. Tente novamente mais tarde.',
      );
    } catch (e) {
      throw Exception('Erro inesperado: $e');
    }
  }
}
