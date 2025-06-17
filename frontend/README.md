# DevCommerce - Frontend

E-commerce simples feito com React, TypeScript e Tailwind CSS.

## 📥 Como baixar o projeto

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd devnology-ecommerce/frontend
```

## 🚀 Como Rodar

1. **Instale as dependências**
   ```bash
   npm install
   ```
2. **Configure o backend**
   - O backend deve estar rodando em http://localhost:3000
   - Configure o arquivo `.env`:
     ```bash
     VITE_BASE_URL_API=http://localhost:3000/api
     ```
3. **Inicie o projeto**
   ```bash
   npm run dev
   ```
4. **Acesse**
   - http://localhost:5173

## 🛠️ Tecnologias utilizadas e motivos

- **React**: biblioteca moderna, componentização e reatividade.
- **TypeScript**: segurança de tipos, menos bugs e melhor manutenção.
- **Vite**: build rápido, hot reload eficiente e configuração simples.
- **Tailwind CSS**: estilização rápida, responsiva e consistente.
- **React Query**: gerenciamento de dados de API com cache e estados automáticos.
- **React Hook Form + Zod**: formulários performáticos e validação robusta.
- **Axios**: requisições HTTP simples e tipadas.
- **Vitest + Testing Library**: testes rápidos, focados em comportamento real do usuário.

Essas escolhas garantem produtividade, código limpo, fácil manutenção e ótima experiência para desenvolvedores e usuários.

## 🧪 Testes

### Como rodar os testes

```bash
npm run test           # Executa todos os testes
npm run test:watch     # Executa em modo watch
```

### Tipos de testes implementados

- **Renderização**: verifica se os componentes aparecem corretamente na tela.
- **Interação**: simula cliques, digitação e navegação do usuário.
- **Performance**: mede tempo de renderização e re-renderização dos componentes.
- **API**: valida tipos, estrutura e integração das funções de API (sem mock de rede).

Os testes ficam na pasta `src/__tests__` e usam [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/).

## 📁 Estrutura Resumida

```
src/
  components/    # Componentes reutilizáveis
  pages/         # Páginas principais
  context/       # Contextos React
  api/           # Funções de API
  __tests__/     # Testes automatizados
```

## 🛠️ Scripts úteis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm run lint     # Lint do código
npm run test     # Testes automatizados
```

---
Desenvolvido com React + TypeScript