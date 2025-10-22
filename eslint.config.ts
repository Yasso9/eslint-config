import eslintConfigPrettier from "eslint-config-prettier";
import antfu from "@antfu/eslint-config";

import antfuLint from "./config/antfu";
import comments from "./config/comments";
import drizzle from "./config/drizzle";
import eslint from "./config/eslint";
import imports from "./config/imports";
import markdown from "./config/markdown";
import node from "./config/node";
import nuxt from "./config/nuxt";
import security from "./config/security";
import tseslint from "./config/tseslint";
import unicorn from "./config/unicorn";
import vue from "./config/vue";
import vueOverrides from "./config/vue-overrides";

// https://github.com/antfu/eslint-config
export default antfu(
  {
    stylistic: false,

    vue: {
      a11y: true,
    },
    typescript: true,

    ignores: [
      "server/database/migrations/",
      "eslint.config.ts",
      "config/**/*.ts",
    ],
  },
  eslint,
  tseslint,
  unicorn,
  vue,
  vueOverrides,
  nuxt,
  antfuLint,
  imports,
  node,
  drizzle,
  security,
  markdown,
  comments,
  { ...eslintConfigPrettier, name: "prettier-compat" },
).override("antfu/node/rules", {
  rules: {
    "node/prefer-global/process": ["warn", "always"],
  },
});
