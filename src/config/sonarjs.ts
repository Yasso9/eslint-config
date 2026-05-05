import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import sonarjsPlugin from "eslint-plugin-sonarjs";

export default {
  name: "ilyasso/sonarjs",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  plugins: {
    sonarjs: sonarjsPlugin,
  },
  rules: {
    ...sonarjsPlugin.configs.recommended.rules,
    // Duplicates unused-imports/no-unused-imports and ts/no-unused-vars
    "sonarjs/unused-import": "off",
    "sonarjs/no-unused-vars": "off",
    // Duplicates ts/prefer-nullish-coalescing (the TS version is type-aware)
    "sonarjs/prefer-nullish-coalescing": "off",
  },
} as TypedFlatConfigItem;
