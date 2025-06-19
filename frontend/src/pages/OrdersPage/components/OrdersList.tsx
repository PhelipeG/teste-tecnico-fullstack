import type { Order } from "../../../api/api";
import OrderCard from "./OrderCard";
import OrderEmpty from "./OrderEmpty";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return <OrderEmpty />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
