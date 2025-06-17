import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getAllProducts } from "../api/api";

export function useProductFilters() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState<"brazilian" | "european" | "">("");
  const [department, setDepartment] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

   const filters = useMemo(() => ({
    search: debouncedSearch || undefined,
    category: category || undefined,
    provider: provider || undefined,
    department: department || undefined,
  }), [debouncedSearch, category, provider, department]);

   const { data: allProducts } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => getAllProducts(),
    staleTime: 10 * 60 * 1000,
  });

  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products', currentPage, debouncedSearch, category, provider, department],
    queryFn: () => getProducts(currentPage, 12, filters),
    staleTime: 1000 * 60 * 5, // 5 minutos em cache
    retry: 2, // Tentar novamente 2 vezes em caso de falha
  });

  const { categories, departments } = useMemo(() => {
    if (!allProducts) return { categories: [], departments: [] };

    const uniqueCategories = [
      ...new Set(allProducts.map((p) => p.category)),
    ].sort();
    const uniqueDepartments = [
      ...new Set(allProducts.map((p) => p.department)),
    ].sort();

    return {
      categories: uniqueCategories,
      departments: uniqueDepartments,
    };
  }, [allProducts]);
  // Verificar se há filtros ativos
  const hasActiveFilters = !!(search || category || provider || department);

  const updateSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const updateProvider = (value: "brazilian" | "european" | "") => {
    setProvider(value);
    setCurrentPage(1);
  };

  const updateDepartment = (value: string) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearch("");
    setCategory("");
    setProvider("");
    setDepartment("");
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
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
  };
}
