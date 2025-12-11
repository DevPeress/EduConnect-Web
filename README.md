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

## ✨ Funcionalidades Existentes

### 🔐 Autenticação
  - Login com validação estruturada.
  - Redirecionamento automático conforme nível de permissão.
  - Gestão de sessão segura utilizando tokens.
  - Notificações com **React Hot Toast**.

### 🧩 Arquitetura Modular
  - Baseada em **componentização** e **contextos globais**.
  - Permite fácil **manutenção**, **evolução** e **reutilização** de componentes.
  - Estrutura escalável voltada para projetos de médio e grande porte.

### 📊 Dashboard Administrativo
  - Exibe dados gerais de usuários, professores e alunos.
  - Gráficos analíticos interativos.
  - Painel de atividades recentes.
  - Indicadores e métricas em tempo real.
  - Calendário de eventos integrado utilizando **React Big Calendar**.

### 👨‍🏫 Gestão de Usuários
  - Listagem completa com filtros inteligentes.
  - Cadastro de novos usuários.
  - Organização por cargos e permissões.
  
Tem suporte para:
  - Alunos
  - Professores
  - Administradores

### 👥 Gestão Completa de Usuários
  - CRUD completo de Alunos e Professores.
  - Perfis individuais com dados detalhados.
  - Possibilidade de editar e excluir registros.
  - Upload de foto de perfil.


### 📘 Gerenciamento de Turmas e Disciplinas
  - Criar, editar e excluir turmas.
  - Atribuir professores e alunos a cada turma.
  - Criar e organizar disciplinas por período.

### 📝 Sistema de Notas e Frequência
  - Registro de notas por prova, trabalho ou período.
  - Histórico completo de rendimento por aluno.
  - Controle de presença/faltas por turma.
  - Dashboard de desempenho acadêmico.


### 🧑‍🏫 Painéis Personalizados
  Cada tipo de usuário possui um painel dedicado:

  - **Administrador:** visão geral, gráficos e gerenciamento completo.
  - **Professor:** lançamentos de notas, presença e comunicados.
  - **Aluno:** notas, faltas, calendário e avisos.
  - **Responsável:** acompanhamento de rendimento e frequência.

### 🔍 Busca Avançada e Filtros Inteligentes
  - Busca rápida por nome, turma, matrícula, disciplina.
  - Filtros dinâmicos por período, desempenho e categoria.

### 📱 UI/UX e Responsividade
  - Interface otimizada para desktop e mobile.
  - Layout totalmente responsivo via Tailwind.
  - Componentes modernos e intuitivos.

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
