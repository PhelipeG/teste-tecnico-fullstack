import { Package } from "lucide-react";
import { Loading } from "../../../components/Loading";

export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
          <Package className="w-6 h-6 text-white" />
        </div>
        <Loading />
        <p className="text-gray-600 mt-2">Carregando seus pedidos...</p>
      </div>
    </div>
  );
}
