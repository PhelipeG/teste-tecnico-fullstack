import type { CartItem } from "../../../context/CartContext";
import { formatPrice } from "../../../utils/util";

export default function ResumeCheckout({
  items,
  totalPrice,
}: {
  items: CartItem[];
  totalPrice: number;
}) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Resumo</h3>
      <div className="flex justify-between text-sm">
        <span>Itens ({items.length})</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Frete</span>
        <span className="text-green-600">Grátis</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-blue-600">{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
