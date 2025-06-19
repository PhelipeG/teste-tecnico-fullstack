interface ProductStatsProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  displayedItems: number;
}

export default function ProductStats({
  totalItems,
  currentPage,
  itemsPerPage,
  displayedItems,
}: ProductStatsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + displayedItems - 1, totalItems);

  return (
    <div className="text-center mt-4 space-y-2">
      <p className="text-gray-600">
        Mostrando {startItem} - {endItem} de {totalItems} produtos
      </p>
    </div>
  );
}
