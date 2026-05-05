import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import securityPlugin from "eslint-plugin-security";

export default {
  name: "ilyasso/security-extra",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  plugins: {
    security: securityPlugin,
  },
  rules: {
    ...securityPlugin.configs.recommended.rules,
    // Already covered by eslint-plugin-anti-trojan-source in security.ts
    "security/detect-bidi-characters": "off",
  },
} as TypedFlatConfigItem;
