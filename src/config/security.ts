import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import antiTrojanPlugin from 'eslint-plugin-anti-trojan-source'

export default <TypedFlatConfigItem>{
    name: 'yasso/security',
    plugins: {
        'anti-trojan-source': antiTrojanPlugin,
    },
    rules: {
        ...antiTrojanPlugin.configs.recommended.rules,
    },
}
