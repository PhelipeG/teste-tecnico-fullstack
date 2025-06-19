import { Package, RefreshCw } from "lucide-react";

interface PageHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function PageHeader({
  isFetching,
  onRefresh,
  isLoading,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            Meus Pedidos
            {isFetching && (
              <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
            )}
          </h1>
          <p className="text-gray-600 text-sm">
            Histórico dos seus pedidos • Atualização a cada 30s
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading || isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm"
        >
          <Package className="w-4 h-4" />
          {isFetching ? "Atualizando..." : "Atualizar"}
        </button>
      </div>
    </div>
  );
}
