import { Package } from "lucide-react";

interface OrdersErrorProps {
  error: unknown;
  onRetry: () => void;
}

export default function OrdersError({ error, onRetry }: OrdersErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white border border-red-200 rounded-lg p-6 shadow-lg">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-red-800 font-semibold text-lg mb-2 text-center">
            Erro ao carregar pedidos
          </h2>
          <p className="text-red-600 text-center mb-4 text-sm">
            {error instanceof Error ? error.message : "Erro desconhecido"}
          </p>
          <button
            onClick={onRetry}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
