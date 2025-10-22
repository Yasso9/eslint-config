import type { TypedFlatConfigItem } from "@antfu/eslint-config";

export default <TypedFlatConfigItem>{
  name: "ilyasso/vue",
  rules: {
    "vue/block-lang": ["warn", { script: { lang: "ts" } }],
    "vue/camelcase": "warn",
    "vue/component-api-style": ["warn", ["script-setup"]],
    "vue/define-emits-declaration": "warn",
    "vue/define-props-declaration": "warn",
    "vue/define-props-destructuring": ["warn", { destructure: "never" }],
    "vue/enforce-style-attribute": [
      "warn",
      {
        allow: ["scoped", "plain"],
      },
    ],
    "vue/html-button-has-type": "warn",
    "vue/match-component-import-name": "warn",
    "vue/next-tick-style": "warn",
    "vue/no-boolean-default": "warn",
    "vue/no-console": "warn",
    "vue/no-constant-condition": "warn",
    "vue/no-custom-modifiers-on-v-model": "warn",
    "vue/no-duplicate-attr-inheritance": [
      "warn",
      {
        checkMultiRootNodes: false,
      },
    ],
    "vue/no-implicit-coercion": "warn",
    "vue/no-import-compiler-macros": "warn",
    "vue/no-empty-component-block": "warn",
    "vue/no-multiple-objects-in-class": "warn",
    "vue/no-negated-condition": "warn",
    "vue/no-negated-v-if-condition": "warn",
    "vue/no-ref-object-reactivity-loss": "warn",
    "vue/no-root-v-if": "warn",
    "vue/no-static-inline-styles": "warn",
    "vue/no-template-target-blank": "warn",
    "vue/no-undef-components": "warn",
    "vue/no-undef-properties": ["error", { ignores: [String.raw`/^\$/`] }],
    "vue/no-unused-emit-declarations": "warn",
    "vue/no-unused-properties": "warn",
    "vue/no-use-v-else-with-v-for": "warn",
    "vue/no-useless-concat": "warn",
    "vue/no-useless-mustaches": "warn",
    "vue/no-v-text": "warn",
    "vue/padding-line-between-blocks": "warn",
    "vue/prefer-define-options": "warn",
    "vue/prefer-true-attribute-shorthand": ["warn", "never"],
    "vue/prefer-use-template-ref": "warn",
    "vue/require-explicit-slots": "warn",
    "vue/require-macro-variable-name": "warn",
    "vue/require-typed-ref": "warn",
    "vue/slot-name-casing": ["warn", "kebab-case"],
    "vue/v-for-delimiter-style": "warn",
    // 'vue/v-on-handler-style': ['warn', ['method', 'inline']],

    // overrides
    "vue/define-macros-order": [
      "warn",
      {
        order: [
          "defineOptions",
          "defineModel",
          "defineProps",
          "defineEmits",
          "defineSlots",
        ],
        defineExposeLast: true,
      },
    ],
    "vue/return-in-computed-property": [
      "warn",
      {
        treatUndefinedAsUnspecified: false,
      },
    ],

    // Accessibility
    "vue-a11y/form-control-has-label": [
      "error",
      {
        labelComponents: ["Label"],
        controlComponents: [
          "Input",
          "InputField",
          "NumberField",
          "Textarea",
          "Select",
        ],
      },
    ],
    // false positive
    "vue-a11y/label-has-for": "off",
    "vue-a11y/heading-has-content": "off",
  },
};
