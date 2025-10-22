import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import tseslint from 'typescript-eslint'

const rulesArray = [
    ...tseslint.configs.stylistic,
    ...tseslint.configs.strict,
].map((i) => i.rules)
const mergedRules = Object.assign({}, ...rulesArray.filter(Boolean))

export default <TypedFlatConfigItem>{
    name: 'yasso/typescript',
    files: ['**/*.ts', '**/*.vue'],
    // ignores: ['eslint.config.ts', 'config/**/*.ts'],
    rules: {
        ...mergedRules,
        'ts/no-unnecessary-condition': 'off',
        'ts/no-unused-vars': [
            'warn',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        'ts/no-loop-func': 'warn',
        'ts/no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2, 10] }],
        'ts/no-shadow': 'warn',
        'ts/no-useless-empty-export': 'warn',
    },
}
