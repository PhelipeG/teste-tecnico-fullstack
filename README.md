# Devnology E-commerce - Fullstack

Sistema completo de e-commerce com frontend web (React), aplicativo mobile (Flutter) e API backend (Node.js), integrando produtos de múltiplos fornecedores com carrinho, filtros e finalização de compra.

## 🏗️ Arquitetura do Projeto

```
devnology-ecommerce/
├── frontend/          # React + TypeScript (Web)
├── mobile/            # Flutter (iOS/Android)
├── backend/           # Node.js + NestJS (API)
└── README.md          # Este arquivo
```

## 🚀 Como rodar o projeto completo

### 1. **Clone o repositório:**
```bash
git clone https://github.com/PhelipeG/teste-tecnico-fullstack.git
cd teste-tecnico-fullstack
```

### 2. **Backend (API) - RODE PRIMEIRO:**
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```
- **URL:** http://localhost:3000
- **Swagger:** http://localhost:3000/api

### 3. **Frontend (Web):**
```bash
cd frontend
npm install
npm run dev
```
- **URL:** http://localhost:5173

### 4. **Mobile (Flutter):**
```bash
cd mobile
flutter pub get
flutter run
```
- **Emulador/Dispositivo:** Configurado no Flutter

---

## 🛠️ Tecnologias e Decisões Técnicas

### 🖥️ **Frontend (React + TypeScript)**

**Tecnologias escolhidas:**
- **React + TypeScript**: Componentização robusta com tipagem estática
- **Vite**: Build extremamente rápido e hot reload eficiente
- **Tailwind CSS**: Estilização rápida e responsiva, fácil manutenção
- **React Query**: Cache inteligente e sincronização de dados da API
- **React Hook Form + Zod**: Formulários performáticos com validação robusta
- **Context API**: Gerenciamento de estado global simples para carrinho

**Por que essas escolhas:**
- **Produtividade**: Stack moderna que acelera desenvolvimento
- **Manutenibilidade**: TypeScript previne bugs, Tailwind facilita CSS
- **Performance**: Vite + React Query otimizam carregamento e dados
- **UX**: Formulários validados, loading states, cache para navegação fluida

### 📱 **Mobile (Flutter)**

**Tecnologias escolhidas:**
- **Flutter**: Framework multiplataforma (iOS + Android) com uma única base de código
- **Provider**: Gerenciamento de estado simples e eficiente
- **HTTP**: Requisições REST para integração com backend
- **SharedPreferences**: Persistência local para carrinho de compras

**Por que essas escolhas:**
- **Multiplataforma**: Um código para iOS e Android, reduzindo tempo/custo
- **Performance nativa**: Flutter compila para código nativo
- **Produtividade**: Hot reload, widgets ricos, comunidade ativa
- **Simplicidade**: Provider é suficiente para app de médio porte no caso deste projeto

### ⚙️ **Backend (Node.js + NestJS)**

**Tecnologias escolhidas:**
- **NestJS**: Framework enterprise com arquitetura modular e decorators
- **TypeScript**: Tipagem estática end-to-end (frontend ↔ backend)
- **Prisma**: ORM moderno com migrações, typesafety e Prisma Studio
- **SQLite**: Banco leve para desenvolvimento, fácil setup
- **Swagger**: Documentação automática da API

**Por que essas escolhas:**
- **Escalabilidade**: NestJS permite arquitetura robusta e testável
- **Produtividade**: Prisma gera tipos automaticamente, reduz boilerplate
- **Consistência**: TypeScript em todo stack garante contratos entre camadas
- **Developer Experience**: Swagger documenta API, SQLite não requer configuração

---

## ✨ Funcionalidades Implementadas

### 🔄 **Integração Completa**
- API única servindo dados para web e mobile
- Sincronização de carrinho e pedidos entre plataformas
- Filtros por categoria e fornecedor (brasileiro/europeu)

### 🛒 **E-commerce Core**
- **Produtos**: Listagem, busca, filtros por categoria/provedor
- **Carrinho**: Adicionar/remover produtos, persistir localmente
- **Checkout**: Formulário validado, cálculo de totais
- **Pedidos**: Registro via API, histórico consultável

### 📱 **Responsividade**
- **Web**: Design responsivo com Tailwind CSS
- **Mobile**: Interface nativa Flutter adaptada para touch

---

## 🧪 Testes e Qualidade

### **Frontend:**
- Vitest + Testing Library para componentes
- Testes de integração com API mockada
- Coverage de componentes críticos

### **Backend:**
- Validação de DTOs e endpoints
- Health checks para monitoramento

### **Mobile:**
- Validação de integração com API

---

## 📁 Estrutura de cada projeto

### **Frontend:**
```
src/
├── components/        # Componentes reutilizáveis
├── pages/             # Páginas (Home, Cart, Orders)
├── context/           # Context API (CartContext)
├── api/               # Funções de API (Axios)
├── __tests__/         # Testes automatizados
└── utils/             # Helpers e formatação
```

### **Backend:**
```
src/
├── products/          # Módulo de produtos
├── orders/            # Módulo de pedidos
├── health/            # Health checks
└── utils/             # Utilities compartilhadas
```

### **Mobile:**
```
lib/
├── models/            # Modelos de dados
├── services/          # Integração com API
├── view_models/       # Lógica de negócio
├── views/             # Telas da aplicação
└── widgets/           # Widgets reutilizáveis
```

---

## 🎯 Decisões de Arquitetura

### **1. Monorepo Simples**
- **Facilita**: Versionamento conjunto, deploys coordenados
- **Organiza**: Frontend, mobile e backend em uma estrutura clara

### **2. API-First**
- Backend desenvolvido primeiro, definindo contratos
- Frontend e mobile consomem mesma API REST
- Documentação Swagger como fonte de verdade

### **3. TypeScript End-to-End**
- Tipagem consistente entre frontend ↔ backend
- Reduz bugs em tempo de desenvolvimento
- Melhora produtividade com autocomplete

### **4. Estado Local vs Global**
- **Frontend**: Context API para carrinho, React Query para dados remotos
- **Mobile**: Provider para estado, SharedPreferences para persistência
- **Backend**: Stateless, dados sempre vindos do banco

---

## 🚀 Deploy e Produção

### **Frontend:**
```bash
npm run build    # Build estático
npm run preview  # Teste local do build
```

### **Backend:**
```bash
npm run build    # Compilação TypeScript
npm run start    # Produção
```

### **Mobile:**
```bash
flutter build apk      # Android APK
flutter build ios      # iOS (requer Xcode)
```

**Desenvolvido com foco em boas práticas, escalabilidade e experiência do usuário.** 

Stack moderna, código limpo e arquitetura que permite evolução contínua do produto. 🚀
