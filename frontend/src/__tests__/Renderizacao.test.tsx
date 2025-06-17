import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Loading } from "../components/Loading";
import EmptyState from "../components/EmptyState";

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </CartProvider>
  );
};

// Mock 
const mockProduct = {
  id: "1",
  name: "Produto Teste",
  description: "Descrição do produto teste",
  price: "99.90",
  category: "Categoria Teste",
  image: "https://exemplo.com/produto.jpg",
  material: "Algodão",
  department: "Masculino",
  provider: "brazilian",
};

describe("Testes de Renderização", () => {
  describe("Header Component", () => {
    it("deve renderizar o título DevCommerce", () => {
      renderWithProviders(<Header />);

      const title = screen.getByText("DevCommerce");
      expect(title).toBeInTheDocument();
    });

    it("deve renderizar botão do carrinho", () => {
      renderWithProviders(<Header />);

      const cartButton = screen.getByTitle("Ir para o carrinho");
      expect(cartButton).toBeInTheDocument();
    });

    it("deve renderizar botão de pedidos", () => {
      renderWithProviders(<Header />);

      const ordersButton = screen.getByTitle("Ver meus pedidos");
      expect(ordersButton).toBeInTheDocument();
    });
  });

  describe("ProductCard Component", () => {
    it("deve renderizar informações do produto", () => {
      renderWithProviders(<ProductCard product={mockProduct} />);

      expect(screen.getByText("Produto Teste")).toBeInTheDocument();
      expect(
        screen.getByText("Descrição do produto teste")
      ).toBeInTheDocument();
      expect(screen.getByText("$99.90")).toBeInTheDocument();
    });

    it("deve renderizar botão de comprar", () => {
      renderWithProviders(<ProductCard product={mockProduct} />);

      const buyButton = screen.getByRole("button", {
        name: /adicionar ao carrinho/i,
      });
      expect(buyButton).toBeInTheDocument();
    });
  });

  describe("Loading Component", () => {
    it("deve renderizar componente de carregamento", () => {
      render(<Loading />);

      expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    });
  });
  describe("EmptyState Component", () => {
    it("deve renderizar estado vazio com filtros", () => {
      const mockClearFilters = vi.fn();
      render(
        <EmptyState hasFilters={true} onClearFilters={mockClearFilters} />
      );

      expect(
        screen.getByText(/nenhum produto encontrado/i)
      ).toBeInTheDocument();
    });
  });
});
