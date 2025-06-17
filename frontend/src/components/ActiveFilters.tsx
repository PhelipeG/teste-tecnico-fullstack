interface ActiveFiltersProps {
  search: string;
  category: string;
  provider: string;
  department: string;
}

export default function ActiveFilters({ search, category, provider, department }: ActiveFiltersProps) {
  const hasFilters = search || category || provider || department;

  if (!hasFilters) return null;

  const getProviderName = (providerValue: string) => {
    if (providerValue === 'brazilian') return 'Brasileiro';
    if (providerValue === 'european') return 'Europeu';
    return providerValue;
  };

  return (
    <div className="mb-4 text-sm text-gray-600">
      <span className="font-medium">Filtros ativos:</span>
      {search && (
        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Busca: "{search}"
        </span>
      )}
      {category && (
        <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
          Categoria: {category}
        </span>
      )}
      {provider && (
        <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          Fornecedor: {getProviderName(provider)}
        </span>
      )}
      {department && (
        <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded">
          Departamento: {department}
        </span>
      )}
    </div>
  );
}
