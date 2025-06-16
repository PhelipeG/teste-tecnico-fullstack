import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🛍️Store</h1>
      <Link to="/cart" className="text-white relative">
        Carrinho
        <span className="ml-2 bg-white text-blue-600 rounded-full px-2 py-1 text-sm font-bold">
         3
        </span>
      </Link>
    </header>
  );
}
