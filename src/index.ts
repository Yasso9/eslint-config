import type { TypedFlatConfigItem } from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";
import antfu from "@antfu/eslint-config";

import antfuLint from "./config/antfu";
import checkFile from "./config/check-file";
import comments from "./config/comments";
import depend from "./config/depend";
import drizzle from "./config/drizzle";
import eslint from "./config/eslint";
import imports from "./config/imports";
import markdown from "./config/markdown";
import node from "./config/node";
import nuxt from "./config/nuxt";
import packageJson from "./config/package-json";
import promise from "./config/promise";
import security from "./config/security";
import securityExtra from "./config/security-extra";
import type { TailwindOptions } from "./config/tailwind";

import sonarjs from "./config/sonarjs";
import tailwind from "./config/tailwind";
import tseslint from "./config/tseslint";
import tseslintTypecheck from "./config/tseslint-typecheck";
import unicorn from "./config/unicorn";
import vue from "./config/vue";
import disableStrict from "./config/disable-strict";
import strict from "./config/strict";

export interface IlyassoOptions {
  typecheck?: {
    /**
     * Enable TypeScript type-checking rules
     * @default false
     */
    enable: boolean;
    /**
     * Path to TypeScript project configuration file
     * @default './tsconfig.json'
     */
    tsconfig?: string;
  };

  /**
   * Enable strict mode. Upgrades selected rules (no-console, no-magic-numbers,
   * no-param-reassign, no-await-in-loop, ts/ban-ts-comment, etc.) from warn to
   * error and keeps the looser non-strict defaults off.
   * @default false
   */
  strict?: boolean;

  /**
   * Enable Drizzle ORM linting rules.
   * Pass `true` to use the default database object names (`db`, `database`)
   * or an object with `objectNames` to customize (e.g. `{ objectNames: ['db', 'tx'] }`).
   * @default false
   */
  drizzle?: boolean | { objectNames?: string[] };

  /**
   * Enable Vue 3 linting rules (and accessibility via @antfu/eslint-config).
   * Disable for pure TS projects that don't use Vue.
   * @default true
   */
  vue?: boolean;

  /**
   * Enable Nuxt-specific linting rules (e.g. `nuxt/prefer-import-meta`).
   * Disable for plain Vue/Vite projects.
   * @default true
   */
  nuxt?: boolean;

  /**
   * Enable `eslint-plugin-better-tailwindcss` (class order, duplicate/conflicting/
   * unknown classes, deprecated utilities, etc.).
   * Pass `true` to enable with auto-detection, or an object to point the plugin
   * at your Tailwind v4 CSS entry (`entryPoint`) or v3 config (`tailwindConfig`).
   * @default false
   */
  tailwind?: boolean | TailwindOptions;

  /**
   * Scope of the Node.js linting rules.
   * Defaults to Nuxt-style layout (`server/**`, `shared/**`);
   * override `files` to match other frameworks.
   * @default { files: ['server/**\/*.ts', 'shared/**\/*.ts'] }
   */
  node?: { files?: string[] };

  /**
   * Enable eslint-plugin-security rules (ReDoS, non-literal fs paths,
   * child_process, eval, timing attacks, etc.). Noisy on some codebases.
   * @default false
   */
  security?: boolean;

  /**
   * Enable eslint-plugin-package-json rules on `package.json` files
   * (required fields, field order, valid SPDX, sorted deps, etc.).
   * @default false
   */
  packageJson?: boolean;

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

const DEFAULT_DRIZZLE_OBJECT_NAMES = ["db", "database"];

function resolveDrizzleObjectNames(
  option: boolean | { objectNames?: string[] },
): string[] {
  if (typeof option === "object") {
    return option.objectNames ?? DEFAULT_DRIZZLE_OBJECT_NAMES;
  }
  return DEFAULT_DRIZZLE_OBJECT_NAMES;
}

interface OptionalConfigFlags {
  enableVue: boolean;
  enableNuxt: boolean;
  enableTypecheck: boolean;
  typecheckProject: string;
  drizzleOption: boolean | { objectNames?: string[] };
  enableSecurity: boolean;
  enablePackageJson: boolean;
  enableStrict: boolean;
  tailwindOption: boolean | TailwindOptions;
}

function collectOptionalConfigs(
  flags: OptionalConfigFlags,
): TypedFlatConfigItem[] {
  const out: TypedFlatConfigItem[] = [];
  if (flags.enableVue) out.push(vue);
  if (flags.enableNuxt) out.push(nuxt);
  if (flags.enableTypecheck) out.push(tseslintTypecheck(flags.typecheckProject));
  if (flags.drizzleOption) {
    out.push(drizzle(resolveDrizzleObjectNames(flags.drizzleOption)));
  }
  if (flags.enableSecurity) out.push(securityExtra);
  if (flags.enablePackageJson) out.push(packageJson);
  if (flags.tailwindOption) {
    out.push(tailwind(typeof flags.tailwindOption === "object" ? flags.tailwindOption : {}));
  }
  out.push(flags.enableStrict ? strict : disableStrict);
  return out;
}

// https://github.com/antfu/eslint-config
export default function ilyasso(options: IlyassoOptions = {}) {
  const {
    typecheck,
    strict: enableStrict = false,
    drizzle: drizzleOption = false,
    security: enableSecurity = false,
    packageJson: enablePackageJson = false,
    vue: enableVue = true,
    nuxt: enableNuxt = true,
    tailwind: tailwindOption = false,
    node: nodeOption,
    ignores = [],
    rules: userRules,
    overrides: userOverrides,
    ...restOptions
  } = options;

  const {
    enable: enableTypecheck = false,
    tsconfig: typecheckProject = "./tsconfig.json",
  } = typecheck ?? {};

  const nodeFiles = nodeOption?.files ?? ["server/**/*.ts", "shared/**/*.ts"];

  const configs: TypedFlatConfigItem[] = [
    eslint,
    tseslint,
    unicorn,
    antfuLint,
    imports,
    node(nodeFiles),
    security,
    sonarjs,
    promise,
    depend,
    checkFile,
    markdown,
    comments,
    ...collectOptionalConfigs({
      enableVue,
      enableNuxt,
      enableTypecheck,
      typecheckProject,
      drizzleOption,
      enableSecurity,
      enablePackageJson,
      enableStrict,
      tailwindOption,
    }),
  ];

  if (userOverrides) {
    configs.push(...(Array.isArray(userOverrides) ? userOverrides : [userOverrides]));
  }

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
      vue: enableVue ? { a11y: true } : false,
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
