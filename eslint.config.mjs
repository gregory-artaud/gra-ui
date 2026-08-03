import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "dist/**",
    "apps/docs/.next/**",
    "apps/docs/out/**",
    "apps/docs/next-env.d.ts",
  ]),
  {
    files: ["src/**/*.{ts,tsx}", "vite.config.ts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["apps/docs/**/*.{js,mjs,cjs,ts,tsx}"],
    extends: [nextVitals, nextTypeScript],
    settings: {
      next: {
        rootDir: "apps/docs",
      },
    },
  },
]);
