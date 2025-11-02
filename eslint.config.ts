import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist", "node_modules"],

    extends: [
      js.configs.recommended,            
      tseslint.configs.recommended,         
      reactHooks.configs["recommended-latest"], 
      reactRefresh.configs.vite,           
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      "no-unused-vars": "warn",
      "react-refresh/only-export-components": "off",
    },
  },
]);
