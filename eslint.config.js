// eslint.config.js
import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
  },
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    ignores: ["src/ignore.js"],
  },
];
