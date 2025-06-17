# DevCommerce - E-commerce Frontend

Um e-commerce moderno desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Backend rodando na porta 3000

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd devnology-ecommerce/frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
VITE_BASE_URL_API=http://localhost:3000/api
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

## 🏗️ Decisões Técnicas

### Arquitetura e Organização

**React com TypeScript**
- Escolhido para garantir type safety e melhor experiência de desenvolvimento
- Estrutura de pastas organizada por features/páginas

**Vite**
- Build tool moderno e rápido
- Hot reload eficiente para desenvolvimento

**Tailwind CSS**
- Framework CSS utility-first para estilização rápida
- Design system consistente e responsivo

### Gerenciamento de Estado

**React Query (TanStack Query)**
- Gerenciamento de estado servidor (API calls)
- Cache inteligente e revalidação automática
- Estados de loading/error simplificados

**Context API**
- Usado apenas para o carrinho de compras
- Estado local simples e performático

### Estrutura de Componentes

**Componentes Funcionais**
- Hooks para lógica reutilizável
- Componentes pequenos e focados em uma responsabilidade

**Separação por Páginas**
```
pages/
├── HomePage/           # Lista de produtos
├── CartPage/           # Finalização de compra
│   └── components/     # Componentes específicos
└── OrdersPage/         # Histórico de pedidos
```

### Validação e Formulários

**React Hook Form + Zod**
- Validação type-safe de formulários
- Performance otimizada com re-renders mínimos
- Mensagens de erro claras

### Integração com API

**Axios**
- Cliente HTTP configurado com base URL
- Interceptadores para tratamento de erros
- TypeScript interfaces para type safety

**Estrutura de API**
```typescript
// GET /products - Lista produtos com filtros e paginação
// POST /orders - Cria novo pedido
// GET /orders - Lista pedidos do usuário
```

### UI/UX

**Design Responsivo**
- Mobile-first approach
- Componentes adaptáveis

**Estados de Interface**
- Loading states com spinners
- Empty states informativos
- Error handling amigável

**Acessibilidade**
- Navegação por teclado
- Labels semânticos
- Contraste adequado

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
├── pages/             # Páginas da aplicação
├── context/           # Contextos React
├── api/               # Integração com APIs
├── hooks/             # Custom hooks
├── schemas/           # Validações Zod
├── utils/             # Funções utilitárias
└── @types/            # Tipos TypeScript
```

## 🎯 Funcionalidades

### HomePage
- ✅ Lista de produtos com paginação
- ✅ Filtros por categoria, fornecedor, departamento
- ✅ Busca por nome
- ✅ Adicionar produtos ao carrinho
- ✅ Fallback de imagem com ícone

### CartPage
- ✅ Visualização dos itens do carrinho
- ✅ Controles de quantidade (+/-)
- ✅ Remoção de itens
- ✅ Formulário de checkout (nome/email)
- ✅ Validação de formulário
- ✅ Integração com API para criar pedidos
- ✅ Tela de confirmação

### OrdersPage
- ✅ Lista de pedidos realizados
- ✅ Detalhes de cada pedido
- ✅ Estados de loading/error/empty

### Geral
- ✅ Header com navegação
- ✅ Carrinho persistente
- ✅ Design responsivo
- ✅ TypeScript em todo o projeto

## 🛠️ Scripts Disponíveis

```bash
npm run dev         # Desenvolvimento
npm run build       # Build para produção
npm run preview     # Preview do build
npm run lint        # Linting do código
```

## 📦 Dependências Principais

- **React 19** - Framework principal
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Query** - Estado servidor
- **React Hook Form** - Formulários
- **Zod** - Validação
- **Axios** - HTTP client
- **Lucide React** - Ícones
- **React Router** - Roteamento

## 🔧 Configurações

### Tailwind CSS
Configurado com classes utilitárias personalizadas para o design system do projeto.

### TypeScript
Configurado com strict mode para máxima type safety.

### ESLint
Regras configuradas para manter consistência de código.

## 📱 Responsividade

O projeto é totalmente responsivo, funcionando bem em:
- 📱 Mobile (320px+)
- 📟 Tablet (768px+)
- 🖥️ Desktop (1024px+)


---

Desenvolvido com ❤️ usando React + TypeScript