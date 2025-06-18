import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/cart_view_model.dart';

class CartIconBadge extends StatelessWidget {
  final VoidCallback? onTap;
  const CartIconBadge({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    final cartVM = Provider.of<CartViewModel>(context);
    return Stack(
      children: [
        IconButton(
          icon: const Icon(Icons.shopping_bag_outlined, size: 28),
          onPressed: onTap,
        ),
        if (cartVM.cart.isNotEmpty)
          Positioned(
            right: 4,
            top: 4,
            child: Container(
              padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(10),
              ),
              constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
              child: Text(
                cartVM.cart.length > 99 ? '99+' : cartVM.cart.length.toString(),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
      ],
    );
  }
}
