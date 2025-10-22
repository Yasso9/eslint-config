import type { TypedFlatConfigItem } from "@antfu/eslint-config";

export default <TypedFlatConfigItem>{
  name: "ilyasso/imports",
  // ignores: ['eslint.config.ts', 'config/**/*.ts'],
  rules: {
    // 'import/no-default-export': 'warn',

    // Always uses @ or ./ for import
    "no-restricted-imports": [
      "warn",
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
};
