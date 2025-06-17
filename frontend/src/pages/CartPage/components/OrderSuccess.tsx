import { CheckCircle } from "lucide-react";

interface OrderSuccessProps {
  onNewOrder: () => void;
}

export default function OrderSuccess({ onNewOrder }: OrderSuccessProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Pedido Realizado!
        </h2>
        <p className="text-gray-600 mb-4">
          Seu pedido foi processado com sucesso!
        </p>

        <button
          onClick={onNewOrder}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Fazer Novo Pedido
        </button>
      </div>
    </div>
  );
}
