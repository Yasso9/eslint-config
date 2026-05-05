# @ilyasso/eslint-config

> Opinionated ESLint configuration for TypeScript, Vue, and Nuxt projects

A strict and opinionated ESLint configuration built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config). The goal of this configuration is to provide a specific set of rules and conventions that are tailored to the needs of TypeScript projects with Vue 3, Nuxt, and modern tooling.

## Features

- **TypeScript-first** - Opt-in type checking with TypeScript
- **Vue and Nuxt** - Vue 3 optimized, script setup api, Nuxt-specific rules and conventions
- **Import enforcement** - Enforces `~/` and `~~/` aliases over relative `../` paths or `@/` paths
- **Unicorn rules** - All `eslint-plugin-unicorn` rules with sensible overrides
- **Security-first** - Anti-trojan-source and secret-detection baseline; opt-in `eslint-plugin-security` for ReDoS, unsafe fs paths, and `child_process` detection
- **Code quality** - `eslint-plugin-sonarjs` and `eslint-plugin-promise` bundled for complexity, duplicated-branch, and async-correctness checks
- **Flexible overrides** - Easy rule customization with `rules` and `overrides` options
- **Prettier-compatible** - Stylistic rules disabled, use Prettier for formatting
- **Drizzle ORM** - database safety rules (require WHERE clauses)
- **Tailwind CSS** - opt-in `eslint-plugin-better-tailwindcss` (class order, duplicate/conflicting/unknown classes, deprecated utilities)
- **Repo hygiene** - `eslint-plugin-depend` (flags deprecated deps) and `eslint-plugin-check-file` (kebab-case folders) always on; `eslint-plugin-package-json` behind a flag

## Installation

Using Bun (recommended)

```bash
bun add -D @ilyasso/eslint-config eslint typescript
```

Using pnpm

```bash
pnpm add -D @ilyasso/eslint-config eslint typescript
```

Using npm

```bash
npm install -D @ilyasso/eslint-config eslint typescript
```

## Quick Start

### Basic Usage

Create an `eslint.config.ts` (or `.js`) file in your project root:

```typescript
import ilyasso from "@ilyasso/eslint-config";

export default ilyasso();
```

### Advanced Configuration

#### Configuration Options

The `ilyasso()` function accepts an options object with the following properties:

```typescript
interface IlyassoOptions {
  /**
   * TypeScript type-checking configuration
   */
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
   * Enable strict mode, some rules may slow you down
   * @default false
   */
  strict?: boolean;

  /**
   * Enable Drizzle ORM linting rules
   * @default false
   */
  drizzle?: boolean;

  /**
   * Enable `eslint-plugin-better-tailwindcss` (class order, duplicate/conflicting/
   * unknown classes, deprecated utilities, etc.).
   * Pass `true` for auto-detection, or an object to point the plugin at your
   * Tailwind v4 CSS entry (`entryPoint`) or v3 config (`tailwindConfig`).
   * @default false
   */
  tailwind?:
    | boolean
    | {
        entryPoint?: string;
        tailwindConfig?: string;
        files?: string[];
      };

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
   */
  rules?: TypedFlatConfigItem["rules"];

  /**
   * Additional config objects for advanced customization
   * Can be a single config object or an array of config objects
   */
  overrides?: TypedFlatConfigItem | TypedFlatConfigItem[];

  /**
   * Additional options to pass to @antfu/eslint-config
   * (e.g., vue, typescript, markdown, etc.)
   */
  [key: string]: unknown;
}
```

#### Configuration Examples

**Using the `rules` option to override or disable rules:**

```typescript
import ilyasso from "@ilyasso/eslint-config";

export default ilyasso({
  rules: {
    // Disable console warnings in development
    "no-console": "off",

    // Enforce multi-word component names
    "vue/multi-word-component-names": "error",

    // Allow magic numbers in specific cases
    "no-magic-numbers": ["warn", { ignore: [-1, 0, 1, 2, 10, 100] }],
  },
});
```

**Using the `overrides` option for file-specific rules:**

```typescript
import ilyasso from "@ilyasso/eslint-config";

export default ilyasso({
  overrides: {
    files: ["*.test.ts", "*.spec.ts"],
    rules: {
      "no-magic-numbers": "off",
      "no-console": "off",
    },
  },
});
```

#### Multiple Override Configs

You can pass an array of override configs for different file patterns:

```typescript
import ilyasso from "@ilyasso/eslint-config";

export default ilyasso({
  overrides: [
    {
      files: ["*.test.ts", "*.spec.ts"],
      rules: {
        "no-magic-numbers": "off",
        "no-console": "off",
      },
    },
    {
      files: ["scripts/**/*.ts"],
      rules: {
        "no-console": "off",
        "node/prefer-global/process": "off",
      },
    },
    {
      files: ["*.config.ts", "*.config.js"],
      rules: {
        "no-magic-numbers": "off",
      },
    },
  ],
});
```

#### Tailwind CSS

Enable `eslint-plugin-better-tailwindcss` and point it at your Tailwind config so
the plugin can resolve your custom theme:

```typescript
import ilyasso from "@ilyasso/eslint-config";

// Tailwind v4 (CSS-first config)
export default ilyasso({
  tailwind: { entryPoint: "app/assets/css/main.css" },
});

// Tailwind v3 (JS config)
export default ilyasso({
  tailwind: { tailwindConfig: "tailwind.config.ts" },
});
```

The recommended preset enables class-order, duplicate, conflicting,
deprecated, and unknown-class rules. Stylistic rules report as warnings;
correctness rules as errors. Lints `**/*.vue` and `**/*.{ts,tsx,js,jsx}` by
default — pass `files` to override.

> If you also use `prettier-plugin-tailwindcss`, disable
> `better-tailwindcss/enforce-consistent-class-order` via the `rules` option to
> avoid the two formatters fighting over class order.

#### TypeScript Type Checking with Nuxt

If you want to enable type checking rules in a Nuxt project, you'll need to create a custom `tsconfig.eslint.json` file. This is required because Nuxt generates its TypeScript configuration dynamically.

Create a `tsconfig.eslint.json` file in your project root:

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "include": ["app/**/*", "server/**/*", "shared/**/*", "*.ts", "*.vue"],
  "exclude": ["node_modules", ".nuxt", ".output", "dist"]
}
```

Then reference it in your ESLint configuration:

```typescript
import ilyasso from "@ilyasso/eslint-config";

export default ilyasso({
  typecheck: {
    enable: true,
    tsconfig: "./tsconfig.eslint.json",
  },
});
```

## Requirements

- **TypeScript** >= 5.0.0 (required)
- **ESLint** >= 9.0.0 (required)
- **Node.js** >= 24.0.0 (recommended)

**Note:** This package is designed for TypeScript projects only. JavaScript projects are not supported.

## File scope conventions

This config is tailored for Nuxt projects. A few rule groups only apply to Nuxt-specific directories:

- **Node rules** (`node/no-sync`, `node/no-process-env`, `node/prefer-global/*`, etc.) apply only to files under `server/**/*.ts` and `shared/**/*.ts` — the Nuxt/Nitro convention. If your project uses a different layout (e.g., `src/server/`), these rules will not fire; use the `overrides` option to broaden the scope.
- **Vue rules** apply to `**/*.vue` only.
- **Markdown rules** apply to `**/*.md` and fenced code blocks inside markdown.

## Strict mode

`strict: true` upgrades selected rules from `warn` to `error` (notably `no-console`, `no-magic-numbers`, `no-param-reassign`, `no-await-in-loop`, `ts/ban-ts-comment`) and enforces `interface` over `type` for type definitions. Use it when you want the config to block commits rather than just flag problems.

## Recommended Setup

### With Prettier

This config disables all stylistic rules to avoid conflicts with Prettier. Install Prettier separately:

```bash
bun add -D prettier
```

### Package Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## License

[MIT](./LICENSE) © 2025 [Ilyas Turki](https://github.com/ilyasso)

## Credits

Built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config) by [Anthony Fu](https://github.com/antfu).

## Contributing

Issues and pull requests are welcome! This is a personal configuration but feedback is appreciated.
