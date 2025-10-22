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

export interface IlyassoOptions {
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
   * Override or add specific ESLint rules
   * Applied as the final config, giving it highest priority
   * @example
   * ```ts
   * { rules: { 'no-console': 'off', 'vue/multi-word-component-names': 'error' } }
   * ```
   */
  rules?: TypedFlatConfigItem["rules"];

  /**
   * Additional config objects for advanced customization
   * Can be a single config object or an array of config objects
   * @example
   * ```ts
   * { overrides: { files: ['*.test.ts'], rules: { 'no-magic-numbers': 'off' } } }
   * ```
   */
  overrides?: TypedFlatConfigItem | TypedFlatConfigItem[];

  /**
   * Additional options to pass to @antfu/eslint-config
   */
  [key: string]: unknown;
}

// https://github.com/antfu/eslint-config
export default function ilyasso(options: IlyassoOptions = {}) {
  const {
    drizzle: enableDrizzle = false,
    ignores = [],
    rules: userRules,
    overrides: userOverrides,
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

  configs.push(security, markdown, comments);

  // Apply user overrides if provided
  if (userOverrides) {
    if (Array.isArray(userOverrides)) {
      configs.push(...userOverrides);
    } else {
      configs.push(userOverrides);
    }
  }

  // Apply user rules if provided
  if (userRules) {
    configs.push({
      name: "ilyasso/user-rules",
      rules: userRules,
    });
  }

  configs.push({
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
