import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export default <TypedFlatConfigItem>{
    name: 'yasso/markdown',
    files: ['**/*.md'],
    rules: {
        'unicorn/filename-case': 'off',
        'ts/no-unused-vars': 'off',
    },
}
