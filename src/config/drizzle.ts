import type { TypedFlatConfigItem } from "@antfu/eslint-config";

import drizzlePlugin from "eslint-plugin-drizzle";

export default function drizzle(objectNames: string[]): TypedFlatConfigItem {
  return {
    // https://github.com/drizzle-team/drizzle-orm/issues/2491
    name: "ilyasso/drizzle",
    files: ["**/*.ts"],
    plugins: {
      drizzle: drizzlePlugin,
    },
    rules: {
      ...drizzlePlugin.configs.all.rules,
      "drizzle/enforce-update-with-where": [
        "error",
        {
          drizzleObjectName: objectNames,
        },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        {
          drizzleObjectName: objectNames,
        },
      ],
    },
  };
}
