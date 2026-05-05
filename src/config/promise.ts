import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import promisePlugin from "eslint-plugin-promise";

export default {
  name: "ilyasso/promise",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  plugins: {
    promise: promisePlugin,
  },
  rules: {
    ...promisePlugin.configs["flat/recommended"].rules,
  },
} as TypedFlatConfigItem;
