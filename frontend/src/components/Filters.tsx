interface FiltersProps {
  category: string;
  provider: string;
  department: string;
  categories: string[];
  departments: string[];
  onCategoryChange: (value: string) => void;
  onProviderChange: (value: "brazilian" | "european" | "") => void;
  onDepartmentChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function Filters({
  category,
  provider,
  department,
  categories,
  departments,
  onCategoryChange,
  onProviderChange,
  onDepartmentChange,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Categoria */}
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>{" "}
      {/* Fornecedor */}
      <select
        value={provider}
        onChange={(e) =>
          onProviderChange(e.target.value as "brazilian" | "european" | "")
        }
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos os fornecedores</option>
        <option value="brazilian">Fornecedor Brasileiro</option>
        <option value="european">Fornecedor Europeu</option>
      </select>
      {/* Departamento */}
      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos os departamentos</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      {/* Botão limpar filtros */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
