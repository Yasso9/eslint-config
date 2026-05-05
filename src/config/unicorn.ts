import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default {
  name: "ilyasso/unicorn",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  rules: {
    ...eslintPluginUnicorn.configs.all.rules,
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/switch-case-braces": ["warn", "avoid"],
    "unicorn/no-useless-undefined": [
      "warn",
      {
        checkArguments: false,
      },
    ],
    "unicorn/filename-case": [
      "warn",
      {
        case: "kebabCase",
        // Allow Nuxt/Next dynamic route filenames like [id].vue, [...slug].ts
        ignore: [String.raw`\[.*\]`],
      },
    ],
  },
} as TypedFlatConfigItem;
