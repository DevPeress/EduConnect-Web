# 🏫 Edu Connect — Front-End

![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E)

## 📘 Descrição

O **Edu Connect** é o front-end de um sistema escolar moderno desenvolvido com **React e TypeScript**, projetado para oferecer uma **gestão educacional prática, intuitiva e visualmente atraente**.

## 🖥️ Tecnologias Utilizadas

### ⚛️ Framework e Linguagem

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### 🎨 Estilização e Build

- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### 💬 Notificações e Feedbacks

- [React Hot Toast](https://react-hot-toast.com/)

### 🔗 Comunicação com API

- [Axios](https://axios-http.com/)

### 🚦 Gerenciamento de Rotas

- [React Router DOM](https://reactrouter.com/)

### 🛡️ Validação de Dados

- [Zod](https://zod.dev)

### 🧹 Qualidade de Código

- [ESLint](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/)

### 📅 Calendário e Datas

- [React Big Calendar](https://github.com/jquense/react-big-calendar)
- [Date-fns](https://date-fns.org/)

## ✨ Funcionalidades

- **Páginas personalizadas**

  - Página 404: informa sobre rotas inexistentes com redirecionamento intuitivo.
  - Página 403: informa sobre rotas sem permissão de acesso.

- **Autenticação**

  - Página de login funcional com redirecionamento automático conforme o nível de acesso.

- **Dashboard Administrativo**

  - Exibição de dados gerais (alunos, professores, turmas e presença).
  - Gráfico analítico dinâmico.
  - Painel de atividades recentes.
  - Aba com Calendário interativo com eventos, integrado via React Big Calendar e Date-fns.

- **Gestão de Usuários**

  - Páginas específicas para **alunos** e **professores**.
  - Filtro por tipo.
  - Cadastro direto via interface.

- **Arquitetura Modular**
  - Baseada em componentização e contextos globais.
  - Facilita manutenção, evolução e reutilização de componentes.

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/DevPeress/EduConnect-Web
cd EduConnect-Web

# Instale as dependências
npm install

# Execute o ambiente de desenvolvimento
npm run dev
```

## 🗂 Estrutura do Projeto

```
📁 EduConnect
 ┣ 📂 src
    ┣ 📂 assets         # Imagens e ícones utilizados no site
    ┣ 📂 components     # Componentes reutilizáveis
    ┣ 📂 context        # Contextos globais
    ┣ 📂 paginas        # Páginas principais do site
       ┣ 📂 pagina      # Configuração específica de cada página
    ┣ 📂 types          # Tipagens TypeScript do projeto.
    ┣ 📂 utils          # Funções utilitárias e helpers que podem ser usadas em várias partes do projeto
    ┣ 📄 App.tsx        # Roteamento principal com React Router DOM
    ┣ 📄 Index.css      # Tailwind CSS, animações e temas
    ┣ 📄 main.tsx       # Ponto de entrada principal do projeto React
```
