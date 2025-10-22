# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@yasso/eslint-config`, a shareable ESLint configuration package built on top of `@antfu/eslint-config`. It provides opinionated linting rules for TypeScript, Vue, Nuxt, Node.js projects with support for Drizzle ORM and security checks.

## Architecture

### Main Entry Point
- `src/index.ts` - Exports a factory function `yasso(options)` that composes all modular configs using the `@antfu/eslint-config` factory function
- Accepts `YassoOptions` to customize behavior (drizzle, ignores, and other @antfu options)
- By default: enables Vue a11y checking and TypeScript support
- Drizzle rules are **opt-in** (disabled by default, enable with `drizzle: true`)
- Default ignores: none (can be customized via `ignores` option)

### Usage

```typescript
// Basic usage with defaults (Drizzle disabled)
import yasso from '@yasso/eslint-config'
export default yasso()

// Enable Drizzle ORM rules
import yasso from '@yasso/eslint-config'
export default yasso({ drizzle: true })

// Customize multiple options
import yasso from '@yasso/eslint-config'
export default yasso({
  drizzle: true,
  ignores: ['server/database/migrations/', 'dist/'],
  // Pass additional @antfu/eslint-config options
  vue: { a11y: false },
  typescript: true
})
```

### Modular Configuration Structure
All rule configurations are in separate files under `src/config/`:

- **`antfu.ts`** - Rules for `@antfu/eslint-config` specific rules (indent-unindent, top-level-function, etc.)
- **`comments.ts`** - ESLint comment directive rules (unused disable warnings)
- **`drizzle.ts`** - Drizzle ORM rules requiring WHERE clauses on update/delete operations
- **`eslint.ts`** - Core ESLint rules (camelcase, no-console, no-magic-numbers, etc.) - largest ruleset
- **`imports.ts`** - Import restrictions enforcing `~/` and `~~/` over `@/`, `@@/`, and relative `../` paths
- **`markdown.ts`** - Overrides for `.md` files (disables filename-case, no-unused-vars)
- **`node.ts`** - Node.js specific rules for `server/**/*.ts` and `shared/**/*.ts` (prefer-node-protocol, no-process-env, etc.)
- **`nuxt.ts`** - Nuxt-specific rules (prefer-import-meta)
- **`security.ts`** - Security rules via `eslint-plugin-anti-trojan-source`
- **`tseslint.ts`** - TypeScript rules merging stylistic + strict configs from `typescript-eslint`
- **`unicorn.ts`** - All `eslint-plugin-unicorn` rules with selective overrides
- **`vue.ts`** - Vue rules for components (script-setup API, typed refs, accessibility via `vue-a11y`)
- **`vue-overrides.ts`** - Vue-specific rule adjustments for false positives

### Configuration Composition Order
The configs are applied in this order (later configs can override earlier ones):
1. Base `@antfu/eslint-config` with stylistic disabled and Vue a11y enabled
2. eslint → tseslint → unicorn → vue → vueOverrides → nuxt → antfuLint → imports → node → drizzle (optional, disabled by default) → security → markdown → comments
3. `eslint-config-prettier` for final compatibility
4. Override for `antfu/node/rules` to allow global process

## Project Structure

```
eslint-config/
├── src/
│   ├── index.ts          # Main entry point (exports ESLint config)
│   └── config/           # Modular rule configurations
│       ├── antfu.ts
│       ├── comments.ts
│       ├── drizzle.ts
│       ├── eslint.ts
│       ├── imports.ts
│       ├── markdown.ts
│       ├── node.ts
│       ├── nuxt.ts
│       ├── security.ts
│       ├── tseslint.ts
│       ├── unicorn.ts
│       ├── vue.ts
│       └── vue-overrides.ts
├── package.json
├── LICENSE               # MIT License
├── .gitignore
└── CLAUDE.md            # This file
```

## Commands

- `bun run lint` - Run ESLint on the codebase
- `bun run lint:fix` - Run ESLint with auto-fix

**Note:** This project uses Bun as its package manager (`packageManager: "bun@1.3.0"` in package.json)

## Key Design Decisions

- **Factory function pattern**: Exports a configurable factory function for flexibility
- **No stylistic rules**: Stylistic formatting is disabled (`stylistic: false`) - use Prettier instead
- **Import path enforcement**: Project enforces `~/` and `~~/` aliases over relative `../` paths
- **Security-first**: Includes anti-trojan-source checking by default
- **Vue-centric**: Designed for Vue 3 + Nuxt projects with script-setup API
- **TypeScript strict**: Uses both stylistic and strict TypeScript configs
- **Magic numbers**: `-1, 0, 1, 2, 10` are allowed as magic numbers
- **Drizzle safety**: Optional Drizzle ORM rules (opt-in via `drizzle: true`) that require WHERE clauses on database updates/deletes

## Adding New Rules

1. Identify the appropriate config file in `src/config/` based on the rule's plugin/category
2. Add the rule to the `rules` object
3. Most rules use `'warn'` severity, use `'error'` for critical issues
4. The config uses TypedFlatConfigItem from `@antfu/eslint-config` for type safety

## Package Information

- **Version**: 0.0.1
- **Package Manager**: Bun 1.3.0
- **License**: MIT (see LICENSE file)
- **Author**: Ilyas Turki
