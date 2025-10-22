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

  // Disable Vue accessibility checks (not recommended)
  vue: {
    a11y: false,
  },

  // Pass any @antfu/eslint-config options
  stylistic: false, // Already disabled by default
  typescript: true, // Already enabled by default
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
