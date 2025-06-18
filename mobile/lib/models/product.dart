// models/product.dart
class Product {
  final String id;
  final String name;
  final String description;
  final String price;
  final String category;
  final String material;
  final String department;
  final String provider;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.category,
    required this.material,
    required this.department,
    required this.provider,
  });

  // Método para converter Product em Map (JSON)
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'price': price,
      'category': category,
      'material': material,
      'department': department,
      'provider': provider,
    };
  }

  // Método para criar Product a partir de Map (JSON)
  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      price: json['price'] ?? '',
      category: json['category'] ?? '',
      material: json['material'] ?? '',
      department: json['department'] ?? '',
      provider: json['provider'] ?? '',
    );
  }
}
