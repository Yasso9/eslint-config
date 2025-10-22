import type { TypedFlatConfigItem } from "@antfu/eslint-config";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default <TypedFlatConfigItem>{
  name: "yasso/unicorn",
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
  },
};
