import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import betterTailwindcss from "eslint-plugin-better-tailwindcss";

export interface TailwindOptions {
  /**
   * Tailwind CSS v4: path to the CSS entry file that imports Tailwind
   * (e.g. `app/assets/css/main.css`).
   */
  entryPoint?: string;
  /**
   * Tailwind CSS v3: path to the JS/TS config file
   * (e.g. `tailwind.config.ts`).
   */
  tailwindConfig?: string;
  /**
   * Glob patterns to lint. Defaults to Vue SFCs and JS/TS sources where
   * Tailwind classes typically live in template strings or `cn()` helpers.
   */
  files?: string[];
}

const DEFAULT_FILES = [
  "**/*.vue",
  "**/*.{ts,tsx,mts,cts}",
  "**/*.{js,jsx,mjs,cjs}",
];

export default function tailwind(
  options: TailwindOptions,
): TypedFlatConfigItem {
  const settings: { entryPoint?: string; tailwindConfig?: string } = {};
  if (options.entryPoint) settings.entryPoint = options.entryPoint;
  if (options.tailwindConfig) settings.tailwindConfig = options.tailwindConfig;

  return {
    name: "ilyasso/tailwind",
    files: options.files ?? DEFAULT_FILES,
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    settings: {
      "better-tailwindcss": settings,
    },
    rules: {
      ...betterTailwindcss.configs.recommended.rules,
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-unknown-classes": "off",
    },
  };
}
