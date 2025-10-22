import type { TypedFlatConfigItem } from "@antfu/eslint-config";

export default <TypedFlatConfigItem>{
  name: "ilyasso/antfu",
  rules: {
    "antfu/indent-unindent": "warn",
    "antfu/no-ts-export-equal": "warn",
    "antfu/top-level-function": "warn",
  },
};
