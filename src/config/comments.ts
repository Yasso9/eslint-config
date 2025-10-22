import type { TypedFlatConfigItem } from "@antfu/eslint-config";

export default <TypedFlatConfigItem>{
  name: "ilyasso/comments",
  rules: {
    // 'eslint-comments/disable-enable-pair': 'warn',
    "eslint-comments/no-unused-disable": "warn",
    "eslint-comments/no-unlimited-disable": "off",
  },
};
