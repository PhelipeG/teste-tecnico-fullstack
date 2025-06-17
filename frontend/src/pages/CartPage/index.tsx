import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/util";
import { CheckoutForm } from "./components";
import { EmptyItensCart } from "./components/EmptyItensCart";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Finalizar Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lista de itens do carrinho */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Itens do Carrinho ({items.length})
              </h2>

              {items.length === 0 ? (
                <EmptyItensCart />
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.product.category}
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          {formatPrice(parseFloat(item.product.price))} cada
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.product.id)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Preço total do item */}
                        <div className="text-right min-w-[80px]">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(
                              parseFloat(item.product.price) * item.quantity
                            )}
                          </p>
                        </div>

                        {/* Botão remover */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Total e botão limpar carrinho */}
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {totalPrice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>

                    <button
                      onClick={clearCart}
                      className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
              )}
            </div>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
