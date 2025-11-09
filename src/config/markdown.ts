import type { TypedFlatConfigItem } from "@antfu/eslint-config";

export default <TypedFlatConfigItem>{
  name: "ilyasso/markdown",
  files: ["**/*.md"],
  rules: {
    "ts/no-unused-vars": "off",
  },
};
