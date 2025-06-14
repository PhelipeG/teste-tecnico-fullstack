# 🛒 Devnology E-commerce API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">API REST desenvolvida em NestJS para o teste técnico da Devnology. Esta API unifica produtos de dois fornecedores distintos e gerencia o fluxo completo de pedidos de um e-commerce.</p>## 📋 **Índice**

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Instalação e Execução](#-instalação-e-execução)
- [Documentação da API](#-documentação-da-api)
- [Endpoints](#-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Decisões Técnicas](#-decisões-técnicas)
- [Testes](#-testes)

## 🚀 **Tecnologias Utilizadas**

- **Node.js** v18+
- **NestJS** - Framework para aplicações escaláveis
- **TypeScript** - Tipagem estática
- **Prisma** - ORM type-safe
- **SQLite** - Banco de dados (desenvolvimento)
- **Swagger** - Documentação automática da API
- **class-validator** - Validação de DTOs
- **axios** - Cliente HTTP para consumo de APIs externas
- **helmet** - Segurança HTTP headers
- **@nestjs/terminus** - Health checks

## 🎯 **Funcionalidades**

### **Produtos**
- ✅ Unificação de produtos de dois fornecedores (Brasileiro e Europeu)
- ✅ Listagem de todos os produtos
- ✅ Busca de produto por ID
- ✅ Padronização de dados entre fornecedores

### **Pedidos**
- ✅ Criação de novos pedidos
- ✅ Listagem de todos os pedidos
- ✅ Persistência no banco de dados
- ✅ Validação de dados de entrada

### **Monitoramento**
- ✅ Health check da aplicação
- ✅ Verificação de conectividade com APIs externas
- ✅ Métricas de sistema

## 🔧 **Instalação e Execução**

### **Pré-requisitos**
```bash
Node.js v18+
npm ou yarn
```

### **1. Clone o repositório**
```bash
git clone [URL_DO_REPOSITORIO]
cd devnology-ecommerce/backend
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Configure o banco de dados**
```bash
# Execute as migrações (SQLite será criado automaticamente)
npx prisma migrate dev
npx prisma generate
```

### **4. Inicie a aplicação**

```bash
# Desenvolvimento (modo watch)
npm run start:dev

# Desenvolvimento (modo normal)
npm run start

# Produção
npm run build
npm run start:prod
```

A API estará disponível em: `http://localhost:3000`

## 📚 **Documentação da API**

A documentação interativa da API está disponível via Swagger:

**URL:** `http://localhost:3000/api`

## 🛠 **Endpoints**

### **Produtos**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/products` | Lista todos os produtos unificados |
| `GET` | `/products/:id` | Busca produto por ID |

### **Pedidos**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/orders` | Cria um novo pedido |
| `GET` | `/orders` | Lista todos os pedidos |

### **Monitoramento**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Health check completo |
| `GET` | `/health/simple` | Health check básico |

## 📝 **Exemplos de Uso**

### **Listar Produtos**
```bash
curl -X GET http://localhost:3000/products
```

**Resposta:**
```json
[
  {
    "id": "1",
    "name": "Produto Exemplo",
    "description": "Descrição do produto",
    "price": "99.99",
    "category": "Categoria",
    "image": "http://exemplo.com/imagem.jpg",
    "material": "Material",
    "department": "Departamento",
    "provider": "brazilian"
  }
]
```

### **Criar Pedido**
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "items": [
      {
        "id": "1",
        "name": "Produto",
        "description": "Descrição",
        "price": "99.99",
        "category": "Categoria",
        "image": "url",
        "material": "Material",
        "department": "Departamento",
        "provider": "brazilian"
      }
    ],
    "totalPrice": 99.99
  }'
```

## 📁 **Estrutura do Projeto**

```
backend/
├── src/
│   ├── health/              # Health checks
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── orders/              # Módulo de pedidos
│   │   ├── dtos/
│   │   │   └── create-order-dto.ts
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   ├── products/            # Módulo de produtos
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── utils/               # Utilitários
│   │   └── utils.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   ├── dev.db              # SQLite database
│   └── migrations/          # Migrações
├── package.json
└── README.md
```

## 🎯 **Decisões Técnicas**

### **Por que NestJS?**
- **Arquitetura modular**: Facilita manutenção e escalabilidade
- **Decorators**: Sintaxe limpa e expressiva
- **TypeScript nativo**: Type safety em todo o projeto
- **Ecossistema robusto**: Integração fácil com Swagger, Prisma, etc.

### **Por que Prisma?**
- **Type safety**: Modelos tipados automaticamente
- **Migrations**: Controle de versão do schema
- **Query builder**: Sintaxe intuitiva e segura

### **Unificação de APIs**
```typescript
// Mapeamento padronizado entre fornecedores
private mapBrazilianProduct(item: ApiProductBR): Product {
  return {
    id: item.id,
    name: item.nome,        // PT -> EN
    description: item.descricao,
    price: item.preco,
    // ...outros campos
    provider: 'brazilian'
  };
}

private mapEuropeanProduct(item: ApiProductEU): Product {
  return {
    id: item.id,
    name: item.name,        // Já em inglês
    description: item.description,
    price: item.price,
    image: item.gallery?.[0] ?? '', // Primeira imagem da galeria
    material: item.details?.material ?? '',
    // ...outros campos
    provider: 'european'
  };
}
```

### **Validação e Segurança**
- **class-validator**: Validação automática de DTOs
- **helmet**: Headers de segurança
- **CORS**: Configurado para permitir acesso do frontend
- **ValidationPipe global**: Validação automática em todos os endpoints

### **Tratamento de Erros**
```typescript
// Exemplo de tratamento seguro de JSON
export default function safeParse<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
```

## 🧪 **Testes**

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🌍 **APIs Externas Utilizadas**

### **Fornecedor Brasileiro**
- **Base URL**: `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider`
- **Formato**: Campos em português (nome, descricao, preco, etc.)

### **Fornecedor Europeu**
- **Base URL**: `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider`
- **Formato**: Campos em inglês (name, description, price, etc.)
- **Diferencial**: Possui galeria de imagens e estrutura de detalhes aninhada

## 🚀 **Recursos Implementados**

### **Requisitos Obrigatórios ✅**
- ✅ Backend em Node.js com NestJS
- ✅ Endpoint unificado de produtos
- ✅ Registro de compras no banco via API
- ✅ Listagem de produtos vindos de dois fornecedores

### **Diferenciais Implementados ✅**
- ✅ Documentação Swagger automática
- ✅ Validação robusta de dados com DTOs
- ✅ Health checks para monitoramento
- ✅ Tratamento de erros padronizado
- ✅ Estrutura modular e escalável
- ✅ Type safety com TypeScript
- ✅ Headers de segurança com Helmet
---
