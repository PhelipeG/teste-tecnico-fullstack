interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m6-2v2" />
        </svg>
      </div>
      
      {hasFilters ? (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Tente ajustar ou remover alguns filtros para ver mais resultados.
          </p>
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Limpar todos os filtros
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum produto disponível
          </h3>
          <p className="text-gray-500">
            Não há produtos cadastrados no momento.
          </p>
        </>
      )}
    </div>
  );
}