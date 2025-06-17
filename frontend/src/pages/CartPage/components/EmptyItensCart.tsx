import { ShoppingBag } from "lucide-react";




export const EmptyItensCart = () => {
  return (
    <div className="text-center py-8">
      <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <p className="text-gray-500 text-lg">
        Seu carrinho está vazio
      </p>
      <p className="text-gray-400">
        Adicione alguns produtos para continuar
      </p>
    </div>
  );
};
