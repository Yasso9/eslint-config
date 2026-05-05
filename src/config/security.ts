import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import antiTrojanPlugin from "eslint-plugin-anti-trojan-source";
import noSecretsPlugin from "eslint-plugin-no-secrets";

export default {
  name: "ilyasso/security",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  plugins: {
    "anti-trojan-source": antiTrojanPlugin,
    "no-secrets": noSecretsPlugin,
  },
  rules: {
    ...antiTrojanPlugin.configs.recommended.rules,
    "no-secrets/no-secrets": "error",
  },
} as TypedFlatConfigItem;
