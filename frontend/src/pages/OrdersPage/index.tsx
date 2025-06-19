import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../api/api";
import {
  PageHeader,
  OrdersLoading,
  OrdersError,
  OrdersList,
} from "./components";

export default function OrdersPage() {
  // Buscar pedidos com React Query
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchInterval: 30000, // Atualiza a cada 30 segundos
    refetchOnWindowFocus: true, // Atualiza quando a janela ganha foco
    staleTime: 0, // Considera dados sempre desatualizados para garantir atualizações
  });

  if (isLoading) {
    return <OrdersLoading />;
  }

  if (isError) {
    return <OrdersError error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <PageHeader
          isFetching={isFetching}
          onRefresh={refetch}
          isLoading={isLoading}
        />
        <OrdersList orders={orders} />
      </div>
    </div>
  );
}
