import type { TypedFlatConfigItem } from "@antfu/eslint-config";

export default {
  name: "ilyasso/imports",
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  rules: {
    // 'import/no-default-export': 'warn',

    "perfectionist/sort-imports": [
      "error",
      {
        type: "natural",
        order: "asc",
        newlinesBetween: 1,
        internalPattern: ["^~/", "^~~/", "^@/", "^@@/"],
        groups: [
          "type",
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
          "side-effect",
        ],
      },
    ],

    // Always uses @ or ./ for import
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@/*"],
            message: "❌ Please import from '~/…' instead of '@/…'",
          },
          {
            group: ["@@/*"],
            message: "❌ Please import from '~~/…' instead of '@@/…'",
          },
          {
            group: ["../*"],
            message: "❌ Please use '~/…' imports rather than relative paths",
          },
        ],
      },
    ],
  },
} as TypedFlatConfigItem;
