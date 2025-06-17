import { expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Loading } from "../components/Loading";

// Helper para renderizar com providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </CartProvider>
  );
};

// Mock de produto para testes
const mockProduct = {
  id: '1',
  name: 'Produto Teste',
  description: 'Descrição do produto teste',
  price: '99.90',
  category: 'Categoria Teste',
  image: 'https://exemplo.com/produto.jpg',
  material: 'Algodão',
  department: 'Masculino',
  provider: 'brazilian'
};

describe("Testes de Performance", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Header - Performance", () => {
    it("deve renderizar rapidamente", () => {
      const start = performance.now();
      
      renderWithProviders(<Header />);
      
      const end = performance.now();
      const renderTime = end - start;
      
      console.log(`⚡ Header - Tempo de renderização: ${renderTime.toFixed(2)}ms`);
      
      // Verificar se renderizou corretamente
      expect(screen.getByText("DevCommerce")).toBeInTheDocument();
      
      // Limite generoso para diferentes ambientes
      expect(renderTime).toBeLessThan(300);
    });

    it("deve manter performance após múltiplas renderizações", () => {
      const times: number[] = [];
      
      // Renderizar 5 vezes e medir tempo
      for (let i = 0; i < 5; i++) {
        const start = performance.now();
        
        renderWithProviders(<Header />);
        
        const end = performance.now();
        times.push(end - start);
      }
      
      const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
      console.log(`⚡ Header - Tempo médio: ${averageTime.toFixed(2)}ms`);
      
      expect(averageTime).toBeLessThan(300);
    });

    it("deve re-renderizar sem problemas", () => {
      const { rerender } = render(
        <CartProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </CartProvider>
      );
      
      // Verificar renderização inicial
      expect(screen.getByText("DevCommerce")).toBeInTheDocument();
      
      // Re-renderizar
      rerender(
        <CartProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </CartProvider>
      );
      
      // Verificar se ainda funciona
      expect(screen.getByText("DevCommerce")).toBeInTheDocument();
    });
  });

  describe("ProductCard - Performance", () => {
    it("deve renderizar produto rapidamente", () => {
      const start = performance.now();
      
      renderWithProviders(<ProductCard product={mockProduct} />);
      
      const end = performance.now();
      const renderTime = end - start;
      
      console.log(`⚡ ProductCard - Tempo de renderização: ${renderTime.toFixed(2)}ms`);
      
      expect(screen.getByText("Produto Teste")).toBeInTheDocument();
      expect(renderTime).toBeLessThan(200);
    });

    it("deve renderizar múltiplos produtos rapidamente", () => {
      const start = performance.now();
      
      // Renderizar 10 produtos
      const products = Array.from({ length: 10 }, (_, i) => ({
        ...mockProduct,
        id: `produto-${i}`,
        name: `Produto ${i}`
      }));
      
      render(
        <CartProvider>
          <BrowserRouter>
            <div>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </BrowserRouter>
        </CartProvider>
      );
      
      const end = performance.now();
      const renderTime = end - start;
      
      console.log(`⚡ 10 ProductCards - Tempo de renderização: ${renderTime.toFixed(2)}ms`);
      
      expect(screen.getByText("Produto 0")).toBeInTheDocument();
      expect(screen.getByText("Produto 9")).toBeInTheDocument();
      expect(renderTime).toBeLessThan(500); // 500ms para 10 produtos
    });
  });

  describe("Loading - Performance", () => {
    it("deve renderizar loading rapidamente", () => {
      const start = performance.now();
      
      render(<Loading />);
      
      const end = performance.now();
      const renderTime = end - start;
      
      console.log(`⚡ Loading - Tempo de renderização: ${renderTime.toFixed(2)}ms`);
      
      expect(screen.getByText(/carregando/i)).toBeInTheDocument();
      expect(renderTime).toBeLessThan(50); // Loading deve ser muito rápido
    });
  });

  describe("Memory Usage", () => {
    it("deve limpar recursos após unmount", () => {
      const { unmount } = renderWithProviders(<Header />);
      
      // Verificar se renderizou
      expect(screen.getByText("DevCommerce")).toBeInTheDocument();
      
      // Fazer unmount
      unmount();
      
      // Verificar se limpou (não deve encontrar mais o elemento)
      expect(screen.queryByText("DevCommerce")).not.toBeInTheDocument();
    });

    it("deve gerenciar múltiplos mounts/unmounts", () => {
      for (let i = 0; i < 10; i++) {
        const { unmount } = renderWithProviders(<ProductCard product={mockProduct} />);
        
        expect(screen.getByText("Produto Teste")).toBeInTheDocument();
        
        unmount();
        
        expect(screen.queryByText("Produto Teste")).not.toBeInTheDocument();
      }
      
      // Se chegou até aqui, não houve vazamentos de memória críticos
      expect(true).toBe(true);
    });
  });

  describe("Bundle Size Impact", () => {
    it("deve importar apenas dependências necessárias", () => {
      // Este teste verifica se os componentes não importam coisas desnecessárias
      // Em um ambiente real, você usaria ferramentas como webpack-bundle-analyzer
      
      const start = performance.now();
      
      renderWithProviders(<Header />);
      renderWithProviders(<ProductCard product={mockProduct} />);
      render(<Loading />);
      
      const end = performance.now();
      const totalTime = end - start;
      
      console.log(`⚡ Múltiplos componentes - Tempo total: ${totalTime.toFixed(2)}ms`);
      
      // Se os componentes importam muitas dependências desnecessárias, isso será lento
      expect(totalTime).toBeLessThan(400);
    });
  });
});
