# @yasso/eslint-config

> Opinionated ESLint configuration for TypeScript, Vue, and Nuxt projects

A comprehensive, shareable ESLint configuration built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config). Designed specifically for TypeScript projects with Vue 3, Nuxt, and modern tooling.

## Features

- **TypeScript-first** - Strict TypeScript rules with full type checking
- **Vue 3 optimized** - Script setup API, accessibility rules via `vue-a11y`
- **Nuxt support** - Nuxt-specific rules and conventions
- **Security-first** - Anti-trojan-source protection built-in
- **Import enforcement** - Enforces `~/` and `~~/` aliases over relative `../` paths
- **Optional Drizzle ORM** - Opt-in database safety rules (require WHERE clauses)
- **Flexible overrides** - Easy rule customization with `rules` and `overrides` options
- **Prettier-compatible** - Stylistic rules disabled, use Prettier for formatting
- **Unicorn rules** - All `eslint-plugin-unicorn` rules with sensible overrides

## Installation

```bash
# Using Bun (recommended)
bun add -D @yasso/eslint-config eslint typescript

# Using pnpm
pnpm add -D @yasso/eslint-config eslint typescript

# Using npm
npm install -D @yasso/eslint-config eslint typescript
```

## Quick Start

### Basic Usage

Create an `eslint.config.ts` (or `.js`) file in your project root:

```typescript
import yasso from "@yasso/eslint-config";

export default yasso();
```

### Enable Drizzle ORM Rules

If you're using Drizzle ORM and want to enforce WHERE clauses on updates/deletes:

```typescript
import yasso from "@yasso/eslint-config";

export default yasso({
  drizzle: true,
});
```

### Advanced Configuration

#### Full Configuration Example

```typescript
import yasso from "@yasso/eslint-config";

export default yasso({
  // Enable Drizzle ORM rules
  drizzle: true,

  // Custom ignore patterns
  ignores: [
    "dist/",
    "server/database/migrations/",
    "*.config.ts",
  ],
});
```

#### Override Specific Rules

You can override or disable any rule using the `rules` option:

```typescript
import yasso from "@yasso/eslint-config";

export default yasso({
  rules: {
    // Disable console warnings in development
    'no-console': 'off',

    // Enforce multi-word component names
    'vue/multi-word-component-names': 'error',

    // Allow magic numbers in specific cases
    'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2, 10, 100] }],

    // Disable underscore dangle warnings
    'no-underscore-dangle': 'off',
  },
});
```

#### File-Specific Overrides

Use the `overrides` option for more advanced customization with file patterns:

```typescript
import yasso from "@yasso/eslint-config";

export default yasso({
  overrides: {
    files: ['*.test.ts', '*.spec.ts'],
    rules: {
      // Allow magic numbers in tests
      'no-magic-numbers': 'off',
      // Allow console in tests
      'no-console': 'off',
    },
  },
});
```

#### Multiple Override Configs

You can pass an array of override configs for different file patterns:

```typescript
import yasso from "@yasso/eslint-config";

export default yasso({
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts'],
      rules: {
        'no-magic-numbers': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
        'node/prefer-global/process': 'off',
      },
    },
    {
      files: ['*.config.ts', '*.config.js'],
      rules: {
        'no-magic-numbers': 'off',
      },
    },
  ],
});
```

## Requirements

- **TypeScript** >= 5.0.0 (required)
- **ESLint** >= 9.0.0 (required)
- **Node.js** >= 24.0.0 (recommended)

**Note:** This package is designed for TypeScript projects only. JavaScript projects are not supported.

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
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## License

[MIT](./LICENSE) © 2025 [Ilyas Turki](https://github.com/Yasso9)

## Credits

Built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config) by [Anthony Fu](https://github.com/antfu).

## Contributing

Issues and pull requests are welcome! This is a personal configuration but feedback is appreciated.
