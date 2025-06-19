# Devnology E-commerce - Mobile

Aplicativo Flutter para e-commerce, consumindo produtos de dois fornecedores via API, com busca, filtro, carrinho persistente e finalização de compra.

## 🚀 Como rodar

1. **Pré-requisitos:**
   - Flutter 3.32.0+
   - Android Studio ou VSCode com plugin Flutter

2. **Instale as dependências:**
   ```bash
   flutter pub get
   ```

3. **Execute o app:**
   ```bash
   flutter run
   ```
   > O backend deve estar rodando em http://10.0.2.2:3000 (emulador Android)

## 🛠️ Tecnologias utilizadas
- **Flutter**: desenvolvimento multiplataforma nativo.
- **Provider**: gerenciamento de estado simples e eficiente.
- **HTTP**: requisições REST.
- **Shared Preferences**: persistência local do carrinho.

## 📐 Arquitetura e decisões técnicas
- **MVVM Simples**: Separação em Models, ViewModels, Services e Views para facilitar manutenção e testes.
- **Provider**: Escolhido por ser leve, fácil de usar e suficiente para apps de pequeno/médio porte.
- **Persistência local**: O carrinho é salvo localmente para melhor experiência do usuário.
- **Componentização**: Widgets reutilizáveis para produtos, categorias, filtro de provedor, etc.
- **Performance**: Busca e filtros são feitos via API, evitando processamento local pesado.

## ✨ Funcionalidades
- Listagem de produtos de dois fornecedores
- Busca por nome
- Filtro por categoria e provedor (brasileiro/europeu)
- Carrinho de compras persistente
- Formulário de finalização de compra
- Integração com backend próprio para registrar pedidos
- Tratamento de erros e feedback ao usuário

## 📁 Estrutura resumida
```
lib/
  models/         # Modelos de dados
  services/       # Serviços de API e persistência
  view_models/    # Lógica de estado (Provider)
  views/          # Telas principais
  widgets/        # Componentes reutilizáveis
```
---
Desenvolvido em Flutter com foco em simplicidade, clareza e boas práticas para projetos júnior.
