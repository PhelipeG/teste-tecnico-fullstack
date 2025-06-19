import { useState } from "react";
import { Package, Calendar, User, ChevronDown, ChevronUp } from "lucide-react";
import type { Order } from "../../../api/api";
import { formatDate, formatPrice } from "../../../utils/util";
import { ProductItem } from "./ProductItem";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Cabeçalho do card */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Pedido #{order.id}
              </h3>
              <p className="text-xs text-gray-500">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-green-600">
                {formatPrice(order.totalPrice)}
              </p>
              <p className="text-xs text-gray-500">
                {order.items.length} produtos
              </p>
            </div>
            <button
              onClick={toggleExpanded}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Informações básicas */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600">{order.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600">
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Acordeon com produtos */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">
            Produtos ({order.items.length})
          </h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <ProductItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
