import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

const rulesArray = [
  ...tseslint.configs.stylisticTypeCheckedOnly,
  ...tseslint.configs.strictTypeCheckedOnly,
].map((i) => i.rules);
const mergedRules = Object.assign({}, ...rulesArray.filter(Boolean));

export default function tseslintTypecheck(
  project: string,
): TypedFlatConfigItem {
  return {
    name: "ilyasso/typescript-typecheck",
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    ignores: [
      "eslint.config.ts",
      "**/*.md",
      "**/*.md/*.ts",
      "**/*.md/*.tsx",
      "**/*.md/*.vue",
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        project,
        parser: tsParser,
      },
    },
    rules: {
      ...mergedRules,
      "ts/strict-boolean-expressions": "error",
      "ts/switch-exhaustiveness-check": "error",
      "ts/require-array-sort-compare": "error",
      "ts/promise-function-async": "error",
      "ts/prefer-readonly": "warn",
      "ts/consistent-type-exports": "error",
      "ts/no-unnecessary-condition": "error",
      "prefer-destructuring": "off",
      "ts/prefer-destructuring": "error",
      "node/no-sync": "warn",
    },
  };
}
