import SearchBar from "../../components/SearchBar";
import Filters from "../../components/Filters";
import ActiveFilters from "../../components/ActiveFilters";
import PaginationControls from "../../components/PaginationControls";
import ProductStats from "../../components/ProductStats";
import { useProductFilters } from "../../hooks/useProductFilters";
import ProductList from "../../components/ProductList";
import { Loading } from "../../components/Loading";
import EmptyState from "../../components/EmptyState";

export default function HomePage() {
  const {
    // Estados
    currentPage,
    search,
    category,
    provider,
    department,
    categories,
    departments,
    hasActiveFilters,

    // Dados
    productsData,
    isLoading,
    error,

    // Ações
    updateSearch,
    updateCategory,
    updateProvider,
    updateDepartment,
    clearAllFilters,
    goToPage,
  } = useProductFilters();

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Nossos Produtos
        </h1>

        {/* Área de Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="space-y-4">
            {/* Barra de Busca */}
            <SearchBar search={search} onSearchChange={updateSearch} />

            {/* Filtros */}
            <Filters
              category={category}
              provider={provider}
              department={department}
              categories={categories}
              departments={departments}
              onCategoryChange={updateCategory}
              onProviderChange={updateProvider}
              onDepartmentChange={updateDepartment}
              onClearFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>

        {/* Filtros Ativos */}
        <ActiveFilters
          search={search}
          category={category}
          provider={provider}
          department={department}
        />

        {/* Loading */}
        {isLoading && <Loading />}

        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
              <p className="text-red-600 font-medium">
                Erro ao carregar produtos
              </p>
            </div>
          </div>
        )}

        {productsData && !isLoading && (
          <>
            {productsData.products.length === 0 ? (
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={clearAllFilters}
              />
            ) : (
              <>
                <ProductList products={productsData.products} />

                {/* Estatísticas */}
                <ProductStats
                  totalItems={productsData.totalItems}
                  currentPage={currentPage}
                  itemsPerPage={12}
                  displayedItems={productsData.products.length}
                />

                {/* Paginação */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={productsData.totalPages}
                  hasPrev={productsData.hasPrev}
                  hasNext={productsData.hasNext}
                  onPageChange={goToPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
