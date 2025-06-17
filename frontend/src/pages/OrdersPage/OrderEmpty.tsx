import { Link } from "react-router-dom";


export default function OrderEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Nenhum pedido encontrado</h2>
      <p className="text-gray-600 mb-6">Parece que você ainda não fez nenhum pedido.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Comece a comprar agora
      </Link>
    </div>
  );
}