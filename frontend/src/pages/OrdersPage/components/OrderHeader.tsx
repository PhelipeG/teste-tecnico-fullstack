import { Package, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate, formatPrice } from "../../../utils/util";
import type { Order } from "../../../api/api";

interface OrderHeaderProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

export function OrderHeader({ order, isExpanded, onToggle }: OrderHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <Package className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Pedido #{order.id}</h3>
          <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold text-green-600">
            {formatPrice(order.totalPrice)}
          </p>
          <p className="text-xs text-gray-500">{order.items.length} produtos</p>
        </div>
        <button
          onClick={onToggle}
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
  );
}
