import { ShoppingCart, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleOrdersClick = () => {
    navigate("/orders");
  };

  return (
    <header className="bg-white shadow border-b">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <h1
          className="text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => navigate("/")}
        >
          DevCommerce
        </h1>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleOrdersClick}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="Ver meus pedidos"
          >
            <ClipboardList className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              Pedidos
            </span>
          </button>

          <button
            onClick={handleCartClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="Ir para o carrinho"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
