import { createContext, useContext, useState } from "react";
import type { Product } from "../@types/Product";
import toast from "react-hot-toast";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    toast.success("🛒 Produto adicionado ao carrinho", {
      duration: 3000,
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
    toast.success("🗑️ Produto removido do carrinho", {
      duration: 3000,
    });
  };

  const increaseQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const toggleCart = () => setIsOpen(!isOpen);

  const clearCart = () => {
    if (items.length > 0) {
      toast.success("🧹 Carrinho limpo!", {
        duration: 2000,
      });
    }
    setItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isOpen,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
