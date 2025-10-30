import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignora a pasta de build
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist", "node_modules"],

    extends: [
      js.configs.recommended,               // Regras JS padrão
      tseslint.configs.recommended,         // Regras TS
      reactHooks.configs["recommended-latest"], // Boas práticas de hooks
      reactRefresh.configs.vite,            // Regras específicas do Vite
    ],

    plugins: {
      prettier, // Integra o Prettier
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      // Regras Prettier
      "prettier/prettier": [
        "error",
        {
          semi: true,             // exige ponto e vírgula
          singleQuote: false,     // usa aspas duplas
          trailingComma: "es5",   // vírgula em objetos/arrays multilinha
          printWidth: 80,         // quebra de linha
          tabWidth: 2,
          bracketSpacing: true,
          endOfLine: "auto",
        },
      ],

      // Outras boas práticas
      "no-unused-vars": "warn",
      "react-refresh/only-export-components": "off", // opcional para dev
    },
  },
]);
