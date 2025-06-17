import { useQuery } from "@tanstack/react-query";
import { Package, Calendar, User, DollarSign } from "lucide-react";
import { getOrders } from "../../api/api";
import { Loading } from "../../components/Loading";
import { formatDate, formatPrice } from "../../utils/util";
import OrderEmpty from "./OrderEmpty";

export default function OrdersPage() {
  // Buscar pedidos com React Query
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  // Estado de loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading />
      </div>
    );
  } 

  // Estado de erro
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">Erro ao carregar pedidos</h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "Erro desconhecido"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
        <p className="text-gray-600">
          Histórico dos seus pedidos realizados
        </p>
      </div>

      {/* Lista de pedidos */}
      {orders.length === 0 ? (
        <OrderEmpty />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Pedido #{order.id}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatPrice(order.totalPrice)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              {/* Informações do cliente */}
              <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{order.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatPrice(order.totalPrice)}</span>
                </div>
              </div>

              {/* Itens do pedido */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Itens ({order.items.length})
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatPrice(parseFloat(item.price))}
                        </p>
                        <p className="text-gray-500">Qtd: 1</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
