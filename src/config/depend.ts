import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import dependPlugin from "eslint-plugin-depend";

export default {
  name: "ilyasso/depend",
  plugins: {
    depend: dependPlugin,
  },
  rules: {
    ...dependPlugin.configs["flat/recommended"].rules,
  },
} as TypedFlatConfigItem;
