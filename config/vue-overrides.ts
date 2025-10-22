import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export default <TypedFlatConfigItem>{
    name: 'yasso/vue-overrides',
    files: ['**/*.vue'],
    rules: {
        // False positive because doesn't check the template
        'no-useless-assignment': 'off',
        // Allow void in vue for defineSlots
        'ts/no-invalid-void-type': 'off',
    },
}
