import { formatPrice } from "../../../utils/util";
import type { Product } from "../../../@types/Product";

interface ProductItemProps {
  item: Product;
  index: number;
}

export function ProductItem({ item, index }: ProductItemProps) {
  return (
    <div
      key={index}
      className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100"
    >
      <div className="flex-1">
        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
            {item.category}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
            {item.provider}
          </span>
        </div>
      </div>
      <div className="text-right ml-3">
        <p className="font-semibold text-gray-900 text-sm">
          {formatPrice(parseFloat(item.price))}
        </p>
        {item.quantity && item.quantity > 1 && (
          <p className="text-xs text-gray-600 bg-yellow-100 px-2 py-1 rounded mt-1">
            Qtd: {item.quantity}
          </p>
        )}
      </div>
    </div>
  );
}
