# Edu Connect (Front-End)

![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)

## Descrição

O Edu Connect é o Front-End de um sistema escolar desenvolvido em React com TypeScript, voltado para a gestão e navegação intuitiva dentro de um ambiente educacional.

## 🧰 Tecnologias Utilizadas


### ⚛️ Front-End e Linguagens:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### 🎨 Estilização e Build
- [TailWind Css](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

### 🔗 Comunicação com API
- [Axios](https://axios-http.com/)

### 🧹 Qualidade de Código:
- [ESLint](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)

### 🚦 Gerenciamento de Rotas
- [React Router Dom](https://reactrouter.com/)

## ✨ Funcionalidades

- Página 404 personalizada: informa o usuário sobre rotas inexistentes e oferece redirecionamento intuitivo.
- Página 403 personalizada: informa o usuário sobre rotas não permitida para ele e oferece redirecionamento intuitivo.
- Arquitetura modularizada: facilita a manutenção, evolução e reutilização de componentes.
- Organização baseada em componentização e contextos globais: garante melhor separação de responsabilidades e gerenciamento de estado eficiente.
- Página de login funcional: permite autenticação segura e redirecionamento automático conforme o nível de acesso do usuário.
- Página inicial para administradores: exibe dados gerais como número de alunos, professores, turmas e presença; inclui gráfico analítico sobre esses dados, além de um painel com atividades recentes realizadas no sistema e um calendário informativo.
- Páginas de professores e alunos: permitem filtrar por tipos, exibem a lista completa de alunos e professores, e possibilitam o cadastro de novos registros diretamente pela interface.

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/DevPeress/EduConnect-Web
cd EduConnect-WEb

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
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