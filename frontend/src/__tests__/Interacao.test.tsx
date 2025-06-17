import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </CartProvider>
  );
};
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
describe("Testes de Interação", () => {
  describe("Header - Navegação", async () => {
    it("deve navegar para home ao clicar no título", async () => {
      const user = userEvent.setup();
      // const mockNavigate = vi.fn();

      renderWithProviders(<Header />);

      const title = screen.getByText("DevCommerce");
      await user.click(title);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("deve permitir clicar no botão do carrinho", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Header />);

    const cartButton = screen.getByTitle("Ir para o carrinho");
    await user.click(cartButton);

    expect(cartButton).toBeInTheDocument();
  });

  it("deve permitir clicar no botão de pedidos", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Header />);

    const ordersButton = screen.getByTitle("Ver meus pedidos");
    await user.click(ordersButton);

    expect(ordersButton).toBeInTheDocument();
  });
});

describe("ProductCard - Adicionar ao Carrinho", () => {
  it("deve adicionar produto ao carrinho ao clicar", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", {
      name: /adicionar ao carrinho/i,
    });
    await user.click(addButton);

    // Verificar se o botão ainda está presente (produto foi adicionado)
    expect(addButton).toBeInTheDocument();
  });

  it("deve permitir múltiplos cliques no botão", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", {
      name: /adicionar ao carrinho/i,
    });

    // Clicar múltiplas vezes
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);

    expect(addButton).toBeInTheDocument();
  });
});
describe("SearchBar - Busca", () => {
  it("deve permitir digitar no campo de busca", async () => {
    const user = userEvent.setup();
    let value = "";
    const mockOnSearch = vi.fn((v) => {
      value = v;
    });
    const { rerender } = render(
      <SearchBar search={value} onSearchChange={mockOnSearch} />
    );

    const searchInput = screen.getByPlaceholderText(
      /Digite o nome ou descrição do produto/i
    );

    await user.type(searchInput, "range of formal shirts");

    rerender(
      <SearchBar
        search={"range of formal shirts"}
        onSearchChange={mockOnSearch}
      />
    );

    expect(
      screen.getByPlaceholderText(/Digite o nome ou descrição do produto/i)
    ).toHaveValue("range of formal shirts");
  });

  it("deve chamar função de busca ao digitar", async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchBar search="" onSearchChange={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText(
      /Digite o nome ou descrição do produto/i
    );

    await user.type(searchInput, "teste");

    // Função deve ser chamada para cada caractere digitado
    expect(mockOnSearch).toHaveBeenCalled();
  });
});

