import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import pluginNuxt from '@nuxt/eslint-plugin'

export default <TypedFlatConfigItem>{
    name: 'nuxt',
    plugins: {
        nuxt: pluginNuxt,
    },
    rules: {
        'nuxt/prefer-import-meta': 'error',
    },
}
