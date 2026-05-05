import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import tseslint from "typescript-eslint";

const rulesArray = [
  ...tseslint.configs.stylistic,
  ...tseslint.configs.strict,
].map((i) => i.rules);
const mergedRules = Object.assign({}, ...rulesArray.filter(Boolean));

export default {
  name: "ilyasso/typescript",
  files: ["**/*.ts", "**/*.vue"],
  rules: {
    ...mergedRules,
    "ts/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "ts/no-loop-func": "warn",
    "no-magic-numbers": "off",
    "ts/no-magic-numbers": [
      "warn",
      {
        ignore: [-1, 0, 1, 2, 10],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
      },
    ],
  },
} as TypedFlatConfigItem;
