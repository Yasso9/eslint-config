import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import checkFilePlugin from "eslint-plugin-check-file";

export default {
  name: "ilyasso/check-file",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  plugins: {
    "check-file": checkFilePlugin,
  },
  rules: {
    "check-file/folder-naming-convention": [
      "warn",
      {
        "**/*": "KEBAB_CASE",
      },
    ],
  },
} as TypedFlatConfigItem;
