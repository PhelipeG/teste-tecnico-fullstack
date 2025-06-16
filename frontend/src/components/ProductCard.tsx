import type { Product } from "../@types/Product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
        </div>
        
        <div className="space-y-1 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Material:</span>
            <span className="font-medium">{product.material}</span>
          </div>
          <div className="flex justify-between">
            <span>Departamento:</span>
            <span className="font-medium">{product.department}</span>
          </div>
          <div className="flex justify-between">
            <span>Fornecedor:</span>
            <span className="font-medium">{product.provider}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}