import 'package:flutter/material.dart';
import 'package:mobile/views/cart_page.dart';
import 'package:provider/provider.dart';
import '../view_models/product_view_model.dart';
import '../widgets/cart_icon_badge.dart';
import '../widgets/category_badge.dart';
import '../widgets/provider_filter_widget.dart';
import '../widgets/product_card.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? errorMessage;
  String search = '';
  String? selectedCategory;
  String? selectedProvider;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadProducts();
    });
  }

  void _onSearchChanged() {
    final name = _searchController.text;
    Provider.of<ProductViewModel>(context, listen: false).searchProductsByName(
      name,
      provider: selectedProvider,
      category: selectedCategory,
    );
  }

  Future<void> _loadProducts() async {
    final productVM = Provider.of<ProductViewModel>(context, listen: false);
    try {
      await productVM.fetchProducts(
        name: search.isNotEmpty ? search : null,
        category: selectedCategory,
        provider: selectedProvider,
      );
      setState(() {
        errorMessage = null;
      });
    } catch (e) {
      setState(() {
        errorMessage = e.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final productVM = Provider.of<ProductViewModel>(context);
    final categories = productVM.categories;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Produtos'),
        backgroundColor: Theme.of(context).primaryColor,
        elevation: 2,
        actions: [
          CartIconBadge(
            onTap: () {
              Navigator.of(
                context,
              ).push(MaterialPageRoute(builder: (context) => const CartPage()));
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Filtro de provedor
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Buscar produto pelo nome...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  vertical: 0,
                  horizontal: 12,
                ),
              ),
              onChanged: (value) {
                setState(() {
                  search = value;
                });
                _loadProducts();
              },
            ),
          ),
          if (categories.isNotEmpty)
            SizedBox(
              height: 50,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                children: [
                  CategoryBadge(
                    category: 'Todos',
                    selected: selectedCategory == null,
                    onTap: () {
                      setState(() {
                        selectedCategory = null;
                      });
                      _loadProducts();
                    },
                  ),
                  ...categories.map(
                    (cat) => CategoryBadge(
                      category: cat,
                      selected: selectedCategory == cat,
                      onTap: () {
                        setState(() {
                          selectedCategory = cat;
                        });
                        _loadProducts();
                      },
                    ),
                  ),
                ],
              ), // Closing parenthesis for ListView
            ), // Closing parenthesis for SizedBox
          Padding(
            padding: const EdgeInsets.only(top: 12, bottom: 4),
            child: ProviderFilterWidget(
              selectedProvider: selectedProvider,
              onChanged: (provider) {
                setState(() {
                  selectedProvider = provider;
                });
                _loadProducts();
              },
            ),
          ),
          Expanded(
            child: errorMessage != null
                ? Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.error_outline,
                          color: Colors.red[400],
                          size: 48,
                        ),
                        const SizedBox(height: 12),
                        Text(
                          errorMessage!,
                          style: const TextStyle(
                            color: Colors.red,
                            fontSize: 16,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {
                            setState(() {
                              errorMessage = null;
                            });
                            _loadProducts();
                          },
                          child: const Text('Tentar novamente'),
                        ),
                      ],
                    ),
                  )
                : productVM.isLoading
                ? const Center(child: CircularProgressIndicator())
                : productVM.products.isEmpty
                ? const Center(child: Text('Nenhum produto encontrado.'))
                : Container(
                    color: Colors.grey[100],
                    child: GridView.builder(
                      padding: const EdgeInsets.all(12),
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            childAspectRatio: 0.68,
                            crossAxisSpacing: 14,
                            mainAxisSpacing: 14,
                          ),
                      itemCount: productVM.products.length,
                      itemBuilder: (context, index) {
                        final product = productVM.products[index];
                        return ProductCard(product: product);
                      },
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
