import type { Product } from "../@types/Product";
import { ProductCard } from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id + product.provider} product={product} />
      ))}
    </div>
  );
}
