
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/api';


export default function HomePage() {
   const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Produtos</h2>
       {isLoading && <p>Carregando produtos...</p>}
        {isError && <p>Erro ao carregar produtos.</p>}
        {products && <ProductList products={products} />}
      </div>
    </div>
  );
}
