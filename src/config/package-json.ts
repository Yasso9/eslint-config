import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import packageJsonPlugin from "eslint-plugin-package-json";

export default {
  ...packageJsonPlugin.configs.recommended,
  name: "ilyasso/package-json",
} as TypedFlatConfigItem;
