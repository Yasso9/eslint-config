import type { TypedFlatConfigItem } from "@antfu/eslint-config";
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

export interface YassoOptions {
  /**
   * Enable Drizzle ORM linting rules
   * @default false
   */
  drizzle?: boolean;
  /**
   * Files and directories to ignore
   * @default []
   */
  ignores?: string[];

  /**
   * Additional options to pass to @antfu/eslint-config
   */
  [key: string]: unknown;
}

// https://github.com/antfu/eslint-config
export default function yasso(options: YassoOptions = {}) {
  const {
    drizzle: enableDrizzle = false,
    ignores = [],
    ...restOptions
  } = options;

  const configs: TypedFlatConfigItem[] = [
    eslint,
    tseslint,
    unicorn,
    vue,
    vueOverrides,
    nuxt,
    antfuLint,
    imports,
    node,
  ];

  if (enableDrizzle) {
    configs.push(drizzle);
  }

  configs.push(security, markdown, comments, {
    ...eslintConfigPrettier,
    name: "prettier-compat",
  });

  return antfu(
    {
      stylistic: false,
      vue: {
        a11y: true,
      },
      typescript: true,

      ignores,
      ...restOptions,
    },
    ...configs,
  ).override("antfu/node/rules", {
    rules: {
      "node/prefer-global/process": ["warn", "always"],
    },
  });
}
